import { useState } from 'react'

const matchups = {
  Fire: { accent: 'bg-orange-500', text: 'Fire types hit Grass, Ice, Bug, and Steel for super effective damage.' },
  Water: { accent: 'bg-sky-500', text: 'Water types hit Fire, Ground, and Rock for super effective damage.' },
  Grass: { accent: 'bg-emerald-500', text: 'Grass types hit Water, Ground, and Rock for super effective damage.' },
  Ground: { accent: 'bg-amber-600', text: 'Ground types hit Fire, Electric, Poison, Rock, and Steel for super effective damage.' },
}

function App() {
  const [selectedType, setSelectedType] = useState('Fire')
  const [matchupData, setMatchupData] = useState(null)
  const matchup = matchups[selectedType]

  async function getMatchup(type) {
    try {
      const response = await fetch(`http://localhost:3000/api/type/${encodeURIComponent(type)}`)

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Unable to load matchup:', error)
      return null
    }
  }

  async function handleTypeClick(type) {
    setSelectedType(type)
    setMatchupData(await getMatchup(type))
  }

  return (
    <main className="min-h-screen bg-[#f6f1df] px-5 py-8 text-slate-950 sm:px-8">
      <section className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-3xl flex-col justify-between">
        <header className="flex items-center justify-between border-b-2 border-slate-950 pb-5">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-full border-2 border-slate-950 bg-[#e63946] shadow-[3px_3px_0_#111827]">
              <span className="size-4 rounded-full border-2 border-slate-950 bg-white" aria-hidden="true" />
            </div>
            <span className="text-sm font-black uppercase tracking-[0.2em]">Battle Lab</span>
          </div>
          <span className="rounded-full border border-slate-950 bg-[#ffcb05] px-3 py-1 text-xs font-bold uppercase tracking-wider">Trainer tool</span>
        </header>

        <div className="py-14 sm:py-20">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-[#d62828]">Pokemon Battle Assistant</p>
          <h1 className="max-w-2xl text-5xl font-black leading-[0.95] tracking-tight sm:text-7xl">
            Find your <span className="text-[#d62828]">type advantage.</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-7 text-slate-700">Choose the opposing type and get a quick reminder of what to bring into battle.</p>

          <div className="mt-10 rounded-2xl border-2 border-slate-950 bg-white p-5 shadow-[6px_6px_0_#111827] sm:p-7">
            <p className="text-sm font-bold uppercase tracking-widest text-slate-500">What type are you fighting?</p>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {Object.keys(matchups).map((type) => (
                <button
                  className={`rounded-xl border-2 border-slate-950 px-4 py-3 text-left font-black transition-transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-[#ffcb05] ${
                    selectedType === type
                      ? 'bg-[#ffcb05] shadow-[3px_3px_0_#111827]'
                      : 'bg-slate-50'
                  }`}
                  key={type}
                  onClick={() => handleTypeClick(type)}
                  type="button"
                >
                  {type}
                </button>
              ))}
            </div>

            <div className="mt-6 flex items-start gap-4 border-t-2 border-dashed border-slate-300 pt-6">
              <span className={`mt-1 size-4 shrink-0 rounded-full ${matchup.accent}`} aria-hidden="true" />
              <div>
                <p className="text-lg font-black">Selected type: {selectedType}</p>
                <p className="font-black">Best match for {selectedType}</p>
                {matchupData ? (
                  <>
                    <p className="mt-1 leading-6 text-slate-600">
                      Half damage to: {matchupData.half_damage_to.join(', ')}
                    </p>
                    <p className="leading-6 text-slate-600">
                      Double damage from: {matchupData.double_damage_from.join(', ')}
                    </p>
                  </>
                ) : (
                  <p className="mt-1 leading-6 text-slate-600">{matchup.text}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <footer className="flex items-center justify-between border-t-2 border-slate-950 pt-5 text-xs font-bold uppercase tracking-wider text-slate-500">
          <span>Gotta think smart</span>
          <span>01 / 04</span>
        </footer>
      </section>
    </main>
  )
}

export default App