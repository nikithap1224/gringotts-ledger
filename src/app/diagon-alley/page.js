import { createClient } from '@/utils/supabase/server'
import { addTransaction } from './actions'
import NavBar from '@/app/components/NavBar'
import TransactionRow from './TransactionRow'

export default async function DiagonAlleyPage() {
  const supabase = await createClient()
  const { data: categories } = await supabase.from('categories').select('*').order('name')
  const { data: transactions } = await supabase
    .from('transactions')
    .select('*, categories(name, icon)')
    .order('transaction_date', { ascending: false })
    .limit(50)

  const today = new Date().toISOString().slice(0, 10)

  return (
    <>
      <NavBar />
      <main className="mx-auto max-w-3xl p-6 text-[var(--house-text)]">
        <h1 className="mb-6 font-serif text-3xl">Diagon Alley Ledger</h1>

        <form action={addTransaction} className="mb-8 grid grid-cols-2 gap-3 rounded-lg border border-[var(--house-accent)]/30 p-4">
          <input name="description" placeholder="Item / transaction" required className="col-span-2 rounded bg-black/30 px-3 py-2" />
          <select name="category_id" className="rounded bg-black/30 px-3 py-2">
            {categories?.map((c) => (
              <option key={c.id} value={c.id}>{c.icon} {c.name}</option>
            ))}
          </select>
          <select name="type" className="rounded bg-black/30 px-3 py-2">
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
          <input name="amount" type="number" step="0.01" placeholder="Amount (₹)" required className="rounded bg-black/30 px-3 py-2" />
          <input name="transaction_date" type="date" defaultValue={today} required className="rounded bg-black/30 px-3 py-2" />
          <button type="submit" className="col-span-2 rounded bg-[var(--house-accent)] px-3 py-2 font-semibold text-[var(--house-bg)]">Add Entry</button>
        </form>

        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-[var(--house-accent)]">
              <th className="pb-2">Date</th><th>Item</th><th>Category</th><th>Amount</th><th>Galleons</th><th></th>
            </tr>
          </thead>
          <tbody>
            {transactions?.map((t) => (
              <TransactionRow key={t.id} t={t} categories={categories} />
            ))}
          </tbody>
        </table>
      </main>
    </>
  )
}