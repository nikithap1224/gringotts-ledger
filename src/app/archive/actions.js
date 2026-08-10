'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'

export async function archiveCurrentMonth() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  const { data: transactions } = await supabase
    .from('transactions')
    .select('*, categories(name, icon)')
    .eq('archived', false)

  if (!transactions || transactions.length === 0) return

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((s, t) => s + Number(t.amount), 0)
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + Number(t.amount), 0)

  const breakdown = {}
  transactions.forEach((t) => {
    if (t.type !== 'expense' || !t.categories) return
    const key = t.categories.name
    breakdown[key] = (breakdown[key] || 0) + Number(t.amount)
  })

  const now = new Date()
  const monthLabel = now.toLocaleString('en-IN', { month: 'long', year: 'numeric' })

  await supabase.from('archives').insert({
    user_id: user.id,
    month_label: monthLabel,
    total_income: totalIncome,
    total_expense: totalExpense,
    category_breakdown: breakdown,
  })

  const ids = transactions.map(t => t.id)
  await supabase.from('transactions').update({ archived: true }).in('id', ids)

  revalidatePath('/archive')
  revalidatePath('/diagon-alley')
  revalidatePath('/dashboard')
}