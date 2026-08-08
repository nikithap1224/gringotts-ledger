'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'

export async function addGoal(formData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  await supabase.from('savings_goals').insert({
    user_id: user.id,
    name: formData.get('name'),
    icon: formData.get('icon') || '🏆',
    target_amount: Number(formData.get('target_amount')),
    saved_amount: 0,
  })

  revalidatePath('/vault-713')
}

export async function updateSavedAmount(formData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  const goalId = formData.get('goal_id')
  const newAmount = Number(formData.get('saved_amount'))

  await supabase
    .from('savings_goals')
    .update({ saved_amount: newAmount })
    .eq('id', goalId)
    .eq('user_id', user.id)

  revalidatePath('/vault-713')
}

export async function deleteGoal(formData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  const goalId = formData.get('goal_id')

  await supabase
    .from('savings_goals')
    .delete()
    .eq('id', goalId)
    .eq('user_id', user.id)

  revalidatePath('/vault-713')
}