import { createClient } from '@/utils/supabase/server'
import { addGoal, updateSavedAmount } from './actions'

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

  return (
    <main className="mx-auto max-w-3xl p-6 text-[var(--house-text)]">
      <h1 className="mb-6 font-serif text-3xl">Vault 713</h1>

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
            <form action={updateSavedAmount} className="mt-3 flex gap-2">
              <input type="hidden" name="goal_id" value={g.id} />
              <input
                name="saved_amount"
                type="number"
                step="0.01"
                defaultValue={g.saved_amount}
                className="w-32 rounded bg-black/30 px-3 py-1 text-sm"
              />
              <button type="submit" className="rounded bg-[var(--house-accent)]/80 px-3 py-1 text-sm font-semibold text-[var(--house-bg)]">
                Update
              </button>
            </form>
          </div>
        ))}
      </div>
    </main>
  )
}