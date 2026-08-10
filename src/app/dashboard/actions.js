'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'

export async function updateBudget(formData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  const categoryId = formData.get('category_id')
  const newBudget = Number(formData.get('monthly_budget'))

  await supabase
    .from('categories')
    .update({ monthly_budget: newBudget })
    .eq('id', categoryId)
    .eq('user_id', user.id)

  revalidatePath('/dashboard')
}