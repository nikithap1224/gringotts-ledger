import './globals.css'
import { createClient } from '@/utils/supabase/server'
import { getHouseTheme } from '@/lib/houses'

export const metadata = {
  title: 'Gringotts Wizarding Ledger',
  description: 'A wizarding-themed budget tracker',
}

export default async function RootLayout({ children }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  let house = null
  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('house')
      .eq('id', user.id)
      .single()
    house = profile?.house
  }

  const theme = getHouseTheme(house)

  return (
    <html lang="en">
      <body
        style={{
          '--house-primary': theme.primary,
          '--house-accent': theme.accent,
          '--house-bg': theme.bg,
          '--house-text': theme.text,
        }}
      >
        {children}
      </body>
    </html>
  )
}