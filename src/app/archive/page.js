import { createClient } from '@/utils/supabase/server'
import { archiveCurrentMonth } from './actions'
import NavBar from '@/app/components/NavBar'

export default async function ArchivePage() {
  const supabase = await createClient()
  const { data: archives } = await supabase
    .from('archives')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <>
      <NavBar />
      <main className="mx-auto max-w-4xl p-6 text-[var(--house-text)]">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="font-serif text-3xl">The Archive</h1>
          <form action={archiveCurrentMonth}>
            <button type="submit" className="rounded bg-[var(--house-accent)] px-4 py-2 text-sm font-semibold text-[var(--house-bg)]">
              Archive Current Month
            </button>
          </form>
        </div>

        {(!archives || archives.length === 0) && (
          <p className="text-sm text-[var(--house-text)]/60">No archived months yet. Once you close out a month, it&apos;ll appear here.</p>
        )}

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {archives?.map((a) => {
            const net = a.total_income - a.total_expense
            return (
              <div key={a.id} className="rounded-lg border border-[var(--house-accent)]/30 p-4">
                <h2 className="mb-3 font-serif text-lg">{a.month_label}</h2>
                <div className="space-y-1 text-sm">
                  <p className="text-emerald-400">Income: ₹{a.total_income.toFixed(2)}</p>
                  <p className="text-red-400">Spent: ₹{a.total_expense.toFixed(2)}</p>
                  <p className={`font-semibold ${net < 0 ? 'text-red-400' : 'text-[var(--house-accent)]'}`}>
                    Net: ₹{net.toFixed(2)}
                  </p>
                </div>
                {a.category_breakdown && (
                  <div className="mt-3 space-y-1 border-t border-[var(--house-accent)]/10 pt-2 text-xs text-[var(--house-text)]/70">
                    {Object.entries(a.category_breakdown).map(([cat, amt]) => (
                      <p key={cat}>{cat}: ₹{Number(amt).toFixed(2)}</p>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </main>
    </>
  )
}
