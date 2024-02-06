interface NoteCardProps {
  date: string
  content: string
}

export function NoteCard({ date, content }: NoteCardProps) {
  return (
    <button className="relative space-y-3 rounded-md bg-slate-800 p-5 text-left outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
      <span className=" overflow-hidden text-sm font-medium text-slate-300">
        há {date} dias
      </span>
      <p className="text-sm leading-6 text-slate-400">{content}</p>
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0" />
    </button>
  )
}
