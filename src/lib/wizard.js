export const GALLEON_RATE = 10 // Rs per Galleon — tweak to taste

export function toGalleons(usd) {
  return (usd / GALLEON_RATE).toFixed(1)
}

export function houseStatus(spent, budget) {
  if (budget <= 0) return { message: 'No budget set for this vault yet.', tone: 'neutral' }
  const pct = spent / budget
  if (pct < 0.8) return { message: '100 Points to Gryffindor! Your vault is overflowing.', tone: 'good' }
  if (pct < 1) return { message: "Careful — the Devil's Snare is creeping closer.", tone: 'warn' }
  return { message: "WARNING: Devil's Snare in your finances! Cut back on Butterbeer.", tone: 'danger' }
}