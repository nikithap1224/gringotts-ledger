'use client'

import { useState } from 'react'
import { updateBudget } from './actions'

export default function BudgetEditor({ categoryId, budget }) {
  const [editing, setEditing] = useState(false)

  if (!editing) {
    return (
      <button
        onClick={() => setEditing(true)}
        className="text-xs text-[var(--house-accent)] hover:underline"
      >
        {budget > 0 ? 'Edit budget' : 'Set budget'}
      </button>
    )
  }

  return (
    <form
      action={async (formData) => {
        await updateBudget(formData)
        setEditing(false)
      }}
      className="flex gap-2"
    >
      <input type="hidden" name="category_id" value={categoryId} />
      <input
        name="monthly_budget"
        type="number"
        step="0.01"
        defaultValue={budget}
        placeholder="Set budget (₹)"
        autoFocus
        className="w-32 rounded bg-black/30 px-2 py-1 text-xs"
      />
      <button type="submit" className="rounded bg-[var(--house-accent)]/80 px-2 py-1 text-xs font-semibold text-[var(--house-bg)]">
        Set
      </button>
      <button type="button" onClick={() => setEditing(false)} className="text-xs text-[var(--house-text)]/60">
        Cancel
      </button>
    </form>
  )
}