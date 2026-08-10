import { createClient } from '@/utils/supabase/server'
import { houseStatus } from '@/lib/wizard'
import { SpendingChart } from './SpendingChart'
import NavBar from '@/app/components/NavBar'

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data: categories } = await supabase.from('categories').select('*').order('name')

  const startOfMonth = new Date()
  startOfMonth.setDate(1)
  const startDateStr = startOfMonth.toISOString().slice(0, 10)

  const { data: transactions } = await supabase
    .from('transactions')
    .select('*')
    .eq('type', 'expense')
    .gte('transaction_date', startDateStr)

  const spendByCategory = {}
  transactions?.forEach((t) => {
    if (!t.category_id) return
    spendByCategory[t.category_id] = (spendByCategory[t.category_id] || 0) + Number(t.amount)
  })

  const totalSpent = Object.values(spendByCategory).reduce((sum, v) => sum + v, 0)
  const totalBudget = categories?.reduce((sum, c) => sum + Number(c.monthly_budget), 0) || 0
  const status = houseStatus(totalSpent, totalBudget)

  const toneColor = {
    good: 'text-emerald-400',
    warn: 'text-yellow-400',
    danger: 'text-red-400',
    neutral: 'text-[var(--house-text)]',
  }[status.tone]

  const chartData = categories?.map((c) => ({
  name: c.name.length > 12 ? c.name.split(' ').map(w => w[0]).join('') : c.name,
  fullName: c.name,
  amount: spendByCategory[c.id] || 0,
})) || []

  return (
    <>
      <NavBar />
      <main className="mx-auto max-w-4xl p-6 text-[var(--house-text)]">
        <h1 className="mb-2 font-serif text-3xl">The Sorting Hat Dashboard</h1>
        <p className={`mb-6 text-lg font-semibold ${toneColor}`}>{status.message}</p>

        <div className="mb-8 grid grid-cols-2 gap-4">
          <div className="rounded-lg border border-[var(--house-accent)]/30 p-4">
            <p className="text-sm text-[var(--house-accent)]">This Month&apos;s Spend</p>
            <p className="text-2xl font-bold">₹{totalSpent.toFixed(2)}</p>
          </div>
          <div className="rounded-lg border border-[var(--house-accent)]/30 p-4">
            <p className="text-sm text-[var(--house-accent)]">Total Monthly Budget</p>
            <p className="text-2xl font-bold">₹{totalBudget.toFixed(2)}</p>
          </div>
        </div>

        <h2 className="mb-4 font-serif text-xl">House Cup Leaderboard — Spend by Category</h2>
        <SpendingChart data={chartData} />

        <div className="mt-8 space-y-3">
          {categories?.map((c) => {
            const spent = spendByCategory[c.id] || 0
            const budget = Number(c.monthly_budget)
            const pct = budget > 0 ? Math.min(100, (spent / budget) * 100) : 0
            return (
              <div key={c.id} className="rounded-lg border border-[var(--house-accent)]/30 p-3">
                <div className="mb-1 flex justify-between text-sm">
                  <span>{c.icon} {c.name}</span>
                  <span>₹{spent.toFixed(2)} / ₹{budget.toFixed(2)}</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-black/30">
                  <div
                    className={`h-full ${pct >= 100 ? 'bg-red-500' : pct >= 80 ? 'bg-yellow-500' : 'bg-[var(--house-accent)]'}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </main>
    </>
  )
}