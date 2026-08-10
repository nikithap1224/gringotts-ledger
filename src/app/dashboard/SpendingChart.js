'use client'
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'

export function SpendingChart({ data }) {
  return (
    <BarChart width={500} height={300} data={data}>
      <XAxis dataKey="name" stroke="var(--house-accent)" />
      <YAxis stroke="var(--house-accent)" />
      <Tooltip
        contentStyle={{ backgroundColor: 'var(--house-bg)', border: '1px solid var(--house-accent)' }}
        labelFormatter={(label, payload) => payload?.[0]?.payload?.fullName || label}
      />
      <Bar dataKey="amount" fill="var(--house-accent)" />
    </BarChart>
  )
}