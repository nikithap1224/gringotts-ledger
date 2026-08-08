'use client'
import { BarChart, Bar, XAxis, YAxis } from 'recharts'

export function SpendingChart({ data }) {
  return (
    <BarChart width={500} height={300} data={data}>
      <XAxis dataKey="name" stroke="var(--house-accent)" />
      <YAxis stroke="var(--house-accent)" />
      <Bar dataKey="amount" fill="var(--house-accent)" />
    </BarChart>
  )
}