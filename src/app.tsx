import nlwLogo from './assets/logo-nlw-experts.svg'
import { NewNoteCard } from './components/new-note-card'
import { NoteCard } from './components/note-card'

export function App() {
  return (
    <div className="mx-auto my-12 max-w-6xl space-y-6">
      <img src={nlwLogo} alt="NLW Experts" />
      <form className="w-full">
        <input
          type="text"
          placeholder="Busque em suas notas..."
          className="w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500"
        />
      </form>
      <div className="h-px bg-slate-700" />

      <div className="grid auto-rows-[250px] grid-cols-3 gap-6">
        <NewNoteCard />
        <NoteCard
          note={{
            date: new Date().toISOString(),
            content:
              'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi impedit corrupti recusandae! Necessitatibus fugiat recusandae, est autem qui minus nisi, rerum consectetur placeat nobis iure sed in dignissimos, sint nihil.',
          }}
        />
      </div>
    </div>
  )
}
