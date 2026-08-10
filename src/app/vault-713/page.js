import { createClient } from '@/utils/supabase/server'
import { addGoal, updateSavedAmount, deleteGoal, addDeposit, deleteDeposit } from './actions'
import NavBar from '@/app/components/NavBar'

function ProgressBar({ saved, target }) {
  const pct = Math.min(100, (saved / target) * 100)
  return (
    <div className="h-3 w-full overflow-hidden rounded-full bg-black/30">
      <div className="h-full bg-[var(--house-accent)] transition-all" style={{ width: `${pct}%` }} />
    </div>
  )
}

export default async function Vault713Page() {
  const supabase = await createClient()
  const { data: goals } = await supabase
    .from('savings_goals')
    .select('*')
    .order('created_at', { ascending: false })

  const { data: deposits } = await supabase
    .from('vault_deposits')
    .select('*')
    .order('deposit_date', { ascending: false })

  const totalSaved = deposits?.reduce((sum, d) => sum + Number(d.amount), 0) || 0
  const today = new Date().toISOString().slice(0, 10)

  return (
    <>
      <NavBar />
      <main className="mx-auto max-w-3xl p-6 text-[var(--house-text)]">
        <h1 className="mb-6 font-serif text-3xl">Vault 713</h1>

        {/* Savings Log */}
        <div className="mb-10 rounded-lg border border-[var(--house-accent)]/30 p-4">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-serif text-xl">Your Savings</h2>
            <span className="text-lg font-bold text-[var(--house-accent)]">₹{totalSaved.toFixed(2)}</span>
          </div>
          <form action={addDeposit} className="mb-4 grid grid-cols-2 gap-3">
            <input name="amount" type="number" step="0.01" placeholder="Amount (₹)" required className="rounded bg-black/30 px-3 py-2" />
            <input name="deposit_date" type="date" defaultValue={today} required className="rounded bg-black/30 px-3 py-2" />
            <input name="note" placeholder="Note (optional)" className="col-span-2 rounded bg-black/30 px-3 py-2" />
            <button type="submit" className="col-span-2 rounded bg-[var(--house-accent)] px-3 py-2 font-semibold text-[var(--house-bg)]">
              Add to Savings
            </button>
          </form>
          <div className="space-y-2 text-sm">
            {deposits?.map((d) => (
              <div key={d.id} className="flex items-center justify-between border-t border-[var(--house-accent)]/10 pt-2">
                <span>{d.deposit_date} {d.note && `— ${d.note}`}</span>
                <div className="flex items-center gap-3">
                  <span className="text-[var(--house-accent)]">+₹{d.amount}</span>
                  <form action={deleteDeposit}>
                    <input type="hidden" name="deposit_id" value={d.id} />
                    <button type="submit" className="text-xs text-red-400 hover:underline">Delete</button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Savings Goals */}
        <h2 className="mb-4 font-serif text-xl">Savings Goals</h2>
        <form action={addGoal} className="mb-8 grid grid-cols-2 gap-3 rounded-lg border border-[var(--house-accent)]/30 p-4">
          <input name="name" placeholder="Goal name (e.g. Nimbus 2000)" required className="col-span-2 rounded bg-black/30 px-3 py-2" />
          <input name="icon" placeholder="Icon (e.g. 🧹)" className="rounded bg-black/30 px-3 py-2" />
          <input name="target_amount" type="number" step="0.01" placeholder="Target (₹)" required className="rounded bg-black/30 px-3 py-2" />
          <button type="submit" className="col-span-2 rounded bg-[var(--house-accent)] px-3 py-2 font-semibold text-[var(--house-bg)]">Create Vault Goal</button>
        </form>

        <div className="space-y-6">
          {goals?.map((g) => (
            <div key={g.id} className="rounded-lg border border-[var(--house-accent)]/30 p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="font-serif text-lg">{g.icon} {g.name}</span>
                <span className="text-sm">₹{g.saved_amount} / ₹{g.target_amount}</span>
              </div>
              <ProgressBar saved={g.saved_amount} target={g.target_amount} />
              <div className="mt-3 flex items-center gap-2">
                <form action={updateSavedAmount} className="flex gap-2">
                  <input type="hidden" name="goal_id" value={g.id} />
                  <input name="saved_amount" type="number" step="0.01" defaultValue={g.saved_amount} className="w-32 rounded bg-black/30 px-3 py-1 text-sm" />
                  <button type="submit" className="rounded bg-[var(--house-accent)]/80 px-3 py-1 text-sm font-semibold text-[var(--house-bg)]">Update</button>
                </form>
                <form action={deleteGoal}>
                  <input type="hidden" name="goal_id" value={g.id} />
                  <button type="submit" className="rounded border border-red-400/50 px-3 py-1 text-sm text-red-400 hover:bg-red-400/10">Delete</button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}