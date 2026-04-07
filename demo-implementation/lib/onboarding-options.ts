/** オンボーディング選択肢（クライアント・サーバー共通。座標はサーバーでのみ信頼して解決する） */

export const LIKES_OPTIONS: { value: string; label: string }[] = [
  { value: 'ビール', label: 'ビール' },
  { value: 'コーヒー', label: 'コーヒー' },
  { value: '銭湯・サウナ', label: '銭湯・サウナ' },
  { value: '音楽を聴きたい', label: '音楽を聴きたい' },
  { value: '静かに走りたい', label: '静かに走りたい' },
  { value: '仲間と話しながら', label: '仲間と話しながら' },
  { value: '自然が好き', label: '自然が好き' },
  { value: '街の風景が好き', label: '街の風景が好き' },
]

export const PURPOSE_OPTIONS: { value: string; label: string }[] = [
  { value: '健康維持', label: '健康維持' },
  { value: 'ダイエット', label: 'ダイエット' },
  { value: 'ストレス発散', label: 'ストレス発散' },
  { value: 'レースに向けた練習', label: 'レースに向けた練習' },
  { value: '気分転換', label: '気分転換' },
  { value: '記録を伸ばしたい', label: '記録を伸ばしたい' },
]

export const DISTANCE_OPTIONS_KM = [3, 5, 10, 15, 21.0975, 42.195] as const

export const DISTANCE_OPTION_LABELS: Record<string, string> = {
  '3': '3 km',
  '5': '5 km',
  '10': '10 km',
  '15': '15 km',
  '21.0975': 'ハーフマラソン（約21 km）',
  '42.195': 'フルマラソン（約42 km）',
}

export const DURATION_OPTIONS_MIN = [20, 30, 45, 60, 90, 120] as const

export const DURATION_OPTION_LABELS: Record<number, string> = {
  20: '20 分',
  30: '30 分',
  45: '45 分',
  60: '60 分',
  90: '90 分',
  120: '120 分',
}

export const COURSE_PRESETS: {
  id: string
  label: string
  lat: number
  lng: number
}[] = [
  {
    id: 'imperial-palace',
    label: '皇居外苑',
    lat: 35.681236,
    lng: 139.752291,
  },
  {
    id: 'yoyogi-park',
    label: '代々木公園',
    lat: 35.6698,
    lng: 139.7,
  },
  {
    id: 'komazawa-park',
    label: '駒沢公園',
    lat: 35.6335,
    lng: 139.6615,
  },
  {
    id: 'tamagawa-riverside',
    label: '多摩川河川敷（二子付近）',
    lat: 35.6089,
    lng: 139.6224,
  },
  {
    id: 'odaiba-seaside',
    label: 'お台場海浜公園',
    lat: 35.6295,
    lng: 139.7753,
  },
]
