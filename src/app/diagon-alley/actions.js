'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'

export async function addTransaction(formData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  await supabase.from('transactions').insert({
    user_id: user.id,
    category_id: formData.get('category_id'),
    type: formData.get('type'),
    amount: Number(formData.get('amount')),
    description: formData.get('description'),
    transaction_date: formData.get('transaction_date'),
  })

  revalidatePath('/diagon-alley')
  revalidatePath('/dashboard')
}

export async function deleteTransaction(formData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  const transactionId = formData.get('transaction_id')

  await supabase
    .from('transactions')
    .delete()
    .eq('id', transactionId)
    .eq('user_id', user.id)

  revalidatePath('/diagon-alley')
  revalidatePath('/dashboard')
}