import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-4 py-8">
      <p className="mb-4 max-w-sm text-center text-xs text-zinc-500">
        Google でログインする場合は、Clerk ダッシュボードの{' '}
        <strong className="text-zinc-400">User &amp; Authentication → Social connections</strong>{' '}
        で Google を有効にしてください。
      </p>
      <SignIn routing="path" path="/sign-in" signUpUrl="/sign-up" />
    </div>
  )
}
