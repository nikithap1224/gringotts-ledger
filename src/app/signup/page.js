import { signup } from '../login/actions'

export default async function SignupPage({ searchParams }) {
  const { error } = await searchParams

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#141118] px-4">
      <form action={signup} className="w-full max-w-sm space-y-4 rounded-lg border border-[#C9A227]/30 bg-[#1E1A26] p-8">
        <h1 className="text-center font-serif text-2xl text-[#E8D9A0]">Open a Gringotts Vault</h1>
        {error && <p className="text-sm text-red-400">{error}</p>}
        <input name="email" type="email" placeholder="Email" required
          className="w-full rounded border border-[#C9A227]/30 bg-transparent px-3 py-2 text-[#E8D9A0]" />
        <input name="password" type="password" placeholder="Password" required
          className="w-full rounded border border-[#C9A227]/30 bg-transparent px-3 py-2 text-[#E8D9A0]" />
        <button type="submit" className="w-full rounded bg-[#C9A227] py-2 font-semibold text-[#141118]">
          Create Account
        </button>
        <a href="/login" className="block text-center text-sm text-[#C9A227]">Already have a vault? Log in</a>
      </form>
    </div>
  )
}