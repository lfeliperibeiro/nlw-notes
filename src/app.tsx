import nlwLogo from './assets/logo-nlw-experts.svg'
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
        <div className="space-y-3 rounded-md bg-slate-700 p-5">
          <span className="text-sm font-medium text-slate-200">
            Adicionar nota
          </span>
          <p className="text-sm leading-6 text-slate-400">
            Grave uma nota em áudio que será convertida para texto
            automaticamente.
          </p>
        </div>
        <NoteCard
          date="2"
          content=" Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi
            impedit corrupti recusandae! Necessitatibus fugiat recusandae, est
            autem qui minus nisi, rerum consectetur placeat nobis iure sed in
            dignissimos, sint nihil."
        />
        <NoteCard
          date="4"
          content=" Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi
            impedit corrupti recusandae! Necessitatibus fugiat recusandae, est
            autem qui minus nisi, rerum consectetur placeat nobis iure sed in
            dignissimos, sint nihil."
        />
      </div>
    </div>
  )
}
