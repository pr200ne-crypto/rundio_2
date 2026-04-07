/** /lp-1 は Client だがビルド時の静的生成で落ちるのを避ける */
export const dynamic = 'force-dynamic'

export default function Lp1Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
