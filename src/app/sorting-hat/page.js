'use client'

import { useState } from 'react'
import { saveHouse } from './actions'
import { HOUSES } from '@/lib/houses'

const QUESTIONS = [
  {
    q: 'A locked door stands in your way. You:',
    options: [
      { text: 'Charge through it', house: 'gryffindor' },
      { text: 'Pick the lock quietly', house: 'slytherin' },
      { text: 'Look for another way round, patiently', house: 'hufflepuff' },
      { text: 'Study the lock until you understand it', house: 'ravenclaw' },
    ],
  },
  {
    q: 'What matters most in a friend?',
    options: [
      { text: 'Courage', house: 'gryffindor' },
      { text: 'Ambition', house: 'slytherin' },
      { text: 'Loyalty', house: 'hufflepuff' },
      { text: 'Wit', house: 'ravenclaw' },
    ],
  },
  {
    q: 'Pick a subject to master:',
    options: [
      { text: 'Defence Against the Dark Arts', house: 'gryffindor' },
      { text: 'Potions', house: 'slytherin' },
      { text: 'Herbology', house: 'hufflepuff' },
      { text: 'Arithmancy', house: 'ravenclaw' },
    ],
  },
  {
    q: 'Your ideal weekend:',
    options: [
      { text: 'An adventure with no plan', house: 'gryffindor' },
      { text: 'Working toward a big goal', house: 'slytherin' },
      { text: 'Quiet time with close friends', house: 'hufflepuff' },
      { text: 'Lost in a good book', house: 'ravenclaw' },
    ],
  },
  {
    q: 'A talent you'd want:',
    options: [
      { text: 'Fearlessness', house: 'gryffindor' },
      { text: 'Persuasion', house: 'slytherin' },
      { text: 'Steadiness', house: 'hufflepuff' },
      { text: 'Sharp memory', house: 'ravenclaw' },
    ],
  },
]

export default function SortingHatPage() {
  const [step, setStep] = useState(0)
  const [scores, setScores] = useState({ gryffindor: 0, slytherin: 0, hufflepuff: 0, ravenclaw: 0 })
  const [result, setResult] = useState(null)

  function answer(house) {
    const newScores = { ...scores, [house]: scores[house] + 1 }
    setScores(newScores)

    if (step + 1 < QUESTIONS.length) {
      setStep(step + 1)
    } else {
      const winner = Object.entries(newScores).sort((a, b) => b[1] - a[1])[0][0]
      setResult(winner)
    }
  }

  if (result) {
    const theme = HOUSES[result]
    return (
      <div className="flex min-h-screen items-center justify-center px-4" style={{ backgroundColor: theme.bg }}>
        <div className="w-full max-w-md space-y-4 rounded-lg border p-8 text-center" style={{ borderColor: theme.accent, color: theme.text }}>
          <h1 className="font-serif text-2xl">The Sorting Hat has decided...</h1>
          <p className="font-serif text-4xl font-bold" style={{ color: theme.accent }}>{theme.name}!</p>
          <p className="text-sm opacity-80">{theme.motto}</p>
          <form action={saveHouse}>
            <input type="hidden" name="house" value={result} />
            <button type="submit" className="mt-4 w-full rounded py-2 font-semibold" style={{ backgroundColor: theme.accent, color: theme.bg }}>
              Enter the Vault
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#141118] px-4">
      <div className="w-full max-w-md space-y-6 rounded-lg border border-[#C9A227]/30 bg-[#1E1A26] p-8 text-[#E8D9A0]">
        <p className="text-sm text-[#C9A227]">Question {step + 1} of {QUESTIONS.length}</p>
        <h1 className="font-serif text-xl">{QUESTIONS[step].q}</h1>
        <div className="space-y-2">
          {QUESTIONS[step].options.map((opt) => (
            <button
              key={opt.text}
              onClick={() => answer(opt.house)}
              className="w-full rounded border border-[#C9A227]/30 px-4 py-2 text-left hover:bg-[#C9A227]/10"
            >
              {opt.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}