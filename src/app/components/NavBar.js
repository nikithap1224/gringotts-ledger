import Link from 'next/link'
import { logout } from '@/app/login/actions'

export default function NavBar() {
  return (
    <nav className="border-b border-[var(--house-accent)]/30 px-6 py-4">
      <div className="mx-auto flex max-w-4xl items-center justify-between">
        <div className="flex gap-6 text-sm">
          <Link href="/dashboard" className="hover:text-[var(--house-accent)]">Dashboard</Link>
          <Link href="/diagon-alley" className="hover:text-[var(--house-accent)]">Diagon Alley</Link>
          <Link href="/vault-713" className="hover:text-[var(--house-accent)]">Vault 713</Link>
          <Link href="/archive" className="hover:text-[var(--house-accent)]">Archive</Link>
          <Link href="/sorting-hat" className="hover:text-[var(--house-accent)]">Re-sort</Link>
        </div>
        <form action={logout}>
          <button type="submit" className="text-sm text-[var(--house-accent)]">Logout</button>
        </form>
      </div>
    </nav>
  )
}