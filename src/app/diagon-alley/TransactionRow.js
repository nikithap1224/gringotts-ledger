'use client'

import { useState } from 'react'
import { toGalleons } from '@/lib/wizard'
import { updateTransaction, deleteTransaction } from './actions'

export default function TransactionRow({ t, categories }) {
  const [editing, setEditing] = useState(false)

  if (editing) {
    return (
      <tr className="border-t border-[var(--house-accent)]/10">
        <td colSpan={6} className="py-3">
          <form action={updateTransaction} className="flex flex-wrap items-center gap-2">
            <input type="hidden" name="transaction_id" value={t.id} />
            <input name="description" defaultValue={t.description} required className="rounded bg-black/30 px-2 py-1 text-sm" />
            <select name="category_id" defaultValue={t.category_id || ''} className="rounded bg-black/30 px-2 py-1 text-sm">
              {categories?.map((c) => (
                <option key={c.id} value={c.id}>{c.icon} {c.name}</option>
              ))}
            </select>
            <select name="type" defaultValue={t.type} className="rounded bg-black/30 px-2 py-1 text-sm">
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
            <input name="amount" type="number" step="0.01" defaultValue={t.amount} required className="w-24 rounded bg-black/30 px-2 py-1 text-sm" />
            <input name="transaction_date" type="date" defaultValue={t.transaction_date} required className="rounded bg-black/30 px-2 py-1 text-sm" />
            <button type="submit" className="rounded bg-[var(--house-accent)] px-2 py-1 text-xs font-semibold text-[var(--house-bg)]">Save</button>
            <button type="button" onClick={() => setEditing(false)} className="rounded border border-[var(--house-accent)]/40 px-2 py-1 text-xs">Cancel</button>
          </form>
        </td>
      </tr>
    )
  }

  return (
    <tr className="border-t border-[var(--house-accent)]/10">
      <td className="py-2">{t.transaction_date}</td>
      <td>{t.description}</td>
      <td>{t.categories?.icon} {t.categories?.name}</td>
      <td className={t.type === 'income' ? 'text-emerald-400' : t.amount > 100 ? 'text-red-400' : ''}>
        {t.type === 'income' ? '+' : '-'}₹{t.amount}
      </td>
      <td>{toGalleons(t.amount)} 🪙</td>
      <td className="space-x-3 text-right">
        <button onClick={() => setEditing(true)} className="text-xs text-[var(--house-accent)] hover:underline">Edit</button>
        <form action={deleteTransaction} className="inline">
          <input type="hidden" name="transaction_id" value={t.id} />
          <button type="submit" className="text-xs text-red-400 hover:underline">Delete</button>
        </form>
      </td>
    </tr>
  )
}