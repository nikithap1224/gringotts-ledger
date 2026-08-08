'use client'
import { BarChart, Bar, XAxis, YAxis } from 'recharts'

export function SpendingChart({ data }) {
  return (
    <BarChart width={500} height={300} data={data}>
      <XAxis dataKey="name" stroke="#C9A227" />
      <YAxis stroke="#C9A227" />
      <Bar dataKey="amount" fill="#C9A227" />
    </BarChart>
  )
}