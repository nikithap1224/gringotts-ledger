'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function saveHouse(formData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  const house = formData.get('house')

  await supabase
    .from('profiles')
    .update({ house })
    .eq('id', user.id)

  redirect('/dashboard')
}