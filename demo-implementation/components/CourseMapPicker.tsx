'use client'

import { useEffect, useRef, useState } from 'react'
import type { CircleMarker, Map as LeafletMap } from 'leaflet'
import 'leaflet/dist/leaflet.css'

const DEFAULT_CENTER: [number, number] = [35.681236, 139.767125]

type Props = {
  /** 未クリックのときは空で、サーバー側でも検証する */
  initialLat?: number | null
  initialLng?: number | null
}

export function CourseMapPicker({ initialLat, initialLng }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<LeafletMap | null>(null)
  const markerRef = useRef<CircleMarker | null>(null)
  const [lat, setLat] = useState<number | ''>(initialLat ?? '')
  const [lng, setLng] = useState<number | ''>(initialLng ?? '')

  useEffect(() => {
    const el = containerRef.current
    if (!el || mapInstanceRef.current) return

    let cancelled = false

    void import('leaflet').then((L) => {
      if (cancelled || !containerRef.current) return

      const map = L.map(el, {
        zoomControl: true,
        attributionControl: true,
      }).setView(
        initialLat != null && initialLng != null ? [initialLat, initialLng] : DEFAULT_CENTER,
        13
      )

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map)

      map.on('click', (e) => {
        const la = e.latlng.lat
        const ln = e.latlng.lng
        setLat(la)
        setLng(ln)
        if (markerRef.current) {
          map.removeLayer(markerRef.current)
        }
        markerRef.current = L.circleMarker([la, ln], {
          radius: 9,
          color: '#22d3ee',
          weight: 2,
          fillColor: '#22d3ee',
          fillOpacity: 0.35,
        }).addTo(map)
      })

      if (initialLat != null && initialLng != null) {
        markerRef.current = L.circleMarker([initialLat, initialLng], {
          radius: 9,
          color: '#22d3ee',
          weight: 2,
          fillColor: '#22d3ee',
          fillOpacity: 0.35,
        }).addTo(map)
      }

      mapInstanceRef.current = map
    })

    return () => {
      cancelled = true
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
      markerRef.current = null
    }
  }, [initialLat, initialLng])

  return (
    <div className="space-y-2">
      <span className="text-xs text-zinc-500">コースの起点（地図をタップ）</span>
      <p className="text-xs text-zinc-500">
        OpenStreetMap を表示しています。走るコースの目安となる位置を選んでください。
      </p>
      <div
        ref={containerRef}
        className="relative z-0 h-60 w-full overflow-hidden rounded-xl border border-zinc-700 bg-zinc-900"
      />
      <input type="hidden" name="course_lat" value={lat === '' ? '' : String(lat)} />
      <input type="hidden" name="course_lng" value={lng === '' ? '' : String(lng)} />
      {lat === '' || lng === '' ? (
        <p className="text-xs text-amber-500/90">地図をタップして位置を指定してください。</p>
      ) : null}
    </div>
  )
}
