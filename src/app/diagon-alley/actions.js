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
  })

  revalidatePath('/diagon-alley')
  revalidatePath('/dashboard')
}