import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { ChangeEvent, useState } from 'react'
import { toast } from 'sonner'

interface NewNoteCardProps {
  onNoteCreated: (content: string) => void
}

let speechRecognition: SpeechRecognition | null = null

export function NewNoteCard({ onNoteCreated }: NewNoteCardProps) {
  const [shouldShowOnboard, setShouldShowOnboard] = useState(true)
  const [content, setContent] = useState('')
  const [isRecording, setIsRecording] = useState(false)

  function handleStartEditor() {
    setShouldShowOnboard(false)
  }

  function handleContentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setContent(event.target.value)
    if (event.target.value === '') setShouldShowOnboard(true)
  }

  const handleSaveNote: React.MouseEventHandler<HTMLButtonElement> = (
    event,
  ) => {
    event.preventDefault()
    if (content === '') return

    onNoteCreated(content)
    setContent('')
    toast.success('Nota criada com sucesso!')
    setShouldShowOnboard(true)
  }

  function handleStartRecording() {
    const isSpeechRecognitionSupported =
      'webkitSpeechRecognition' in window || 'SpeechRecognition' in window

    if (!isSpeechRecognitionSupported) {
      toast.error('Seu navegador não suporta gravação de áudio.')
      setIsRecording(false)
    }

    setIsRecording(true)
    setShouldShowOnboard(false)

    const SpeechRecognitionAPI =
      window.SpeechRecognition || window.webkitSpeechRecognition

    speechRecognition = new SpeechRecognitionAPI()

    speechRecognition.lang = 'pt-BR'
    speechRecognition.continuous = true
    speechRecognition.maxAlternatives = 1
    speechRecognition.interimResults = true

    speechRecognition.onresult = (event) => {
      const transcription = Array.from(event.results).reduce((text, result) => {
        return text.concat(result[0].transcript)
      }, '')

      setContent(transcription)
    }

    speechRecognition.onerror = (event) => {
      console.error(event.error)
    }

    speechRecognition.start()
  }

  function handleStopRecording() {
    setIsRecording(false)
    speechRecognition?.stop()
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="flex flex-col gap-3 rounded-md bg-slate-700 p-5 text-left outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
          <span className="text-sm font-medium text-slate-200">
            Adicionar nota
          </span>
          <p className="text-sm leading-6 text-slate-400">
            Grave uma nota em áudio que será convertida para texto
            automaticamente.
          </p>
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed inset-0 flex w-full flex-col overflow-hidden bg-slate-700 outline-none md:inset-auto md:left-1/2 md:top-1/2 md:h-[60vh] md:max-w-[640px] md:-translate-x-1/2 md:-translate-y-1/2 md:rounded">
          <Dialog.Close className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100">
            <X className="size-5" />
          </Dialog.Close>
          <form className="flex flex-1 flex-col">
            <div className="flex flex-1 flex-col gap-3 p-5 ">
              <span className="text-sm font-medium text-slate-300">
                Adicionar nota
              </span>
              {shouldShowOnboard ? (
                <p className="text-sm leading-6 text-slate-400">
                  Comece{' '}
                  <button
                    className="font-medium text-lime-400 hover:underline"
                    onClick={handleStartRecording}
                    type="button"
                  >
                    {' '}
                    gravando uma nota
                  </button>{' '}
                  em áudio ou se preferir{' '}
                  <button
                    className="font-medium text-lime-400 hover:underline"
                    onClick={handleStartEditor}
                    type="button"
                  >
                    utilize apenas texto.
                  </button>
                </p>
              ) : (
                <textarea
                  autoFocus
                  className="flex-1 resize-none bg-transparent text-sm leading-6 text-slate-400 outline-none"
                  onChange={handleContentChange}
                  value={content}
                />
              )}
            </div>

            {isRecording ? (
              <button
                type="button"
                className="hover:text: flex w-full items-center justify-center gap-2 bg-slate-900 py-4 text-center text-sm font-medium text-slate-300 outline-none hover:text-slate-100"
                onClick={handleStopRecording}
              >
                <div className="size-3 animate-pulse rounded-full bg-red-500" />
                Gravando! (Clique para interromper)
              </button>
            ) : (
              <button
                type="button"
                className="w-full bg-lime-400 py-4 text-center text-sm font-medium text-lime-900 outline-none hover:bg-lime-500"
                onClick={handleSaveNote}
              >
                Salvar nota
              </button>
            )}
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
