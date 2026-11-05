"use client"

import { useRef, useState } from "react"
import { Check, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type Answer = { text: string; isCorrect: boolean }

interface AnswersEditorProps {
  value: Answer[]
  onChange: (answers: Answer[]) => void
  error?: string
}

export function AnswersEditor({ value, onChange, error }: AnswersEditorProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [draft, setDraft] = useState("")

  function addAnswer() {
    const text = draft.trim()
    if (!text) {
      inputRef.current?.focus()
      return
    }
    onChange([...value, { text, isCorrect: false }])
    setDraft("")
  }

  return (
    <div>
      <div className="flex items-center justify-between bg-gray-200 px-4 py-2 text-xs font-medium text-gray-700">
        Body
        <Button
          type="button"
          size="sm"
          className="h-7 rounded-none gap-1 bg-emerald-500 px-3 text-xs text-white hover:bg-emerald-600"
          onClick={addAnswer}
        >
          <Plus className="size-3" />
          Add Answer
        </Button>
      </div>

      {value.map((answer, index) => (
        <div
          key={index}
          className="flex items-center gap-3 border-b border-gray-100 px-4 py-2 text-sm"
        >
          <button
            type="button"
            onClick={() => onChange(value.filter((_, i) => i !== index))}
            className="text-red-500 hover:text-red-600"
            aria-label={`Delete answer ${index + 1}`}
          >
            <Trash2 className="size-4" />
          </button>
          <span className="min-w-0 flex-1 truncate text-gray-800">{answer.text}</span>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className={cn(
              "h-7 rounded-none gap-1 px-3 text-xs",
              answer.isCorrect
                ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-50"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            )}
            onClick={() =>
              onChange(value.map((item, i) => ({ ...item, isCorrect: i === index })))
            }
          >
            <Check className="size-3" />
            {answer.isCorrect ? "Correct Answer" : "Mark Correct"}
          </Button>
        </div>
      ))}

      <div className="flex items-center gap-3 px-4 py-2">
        <Plus className="size-4 shrink-0 text-emerald-500" />
        <Input
          ref={inputRef}
          value={draft}
          placeholder="Enter answer body"
          className="h-9 border-emerald-400 focus-visible:border-emerald-500"
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault()
              addAnswer()
            }
          }}
        />
        <Button
          type="button"
          className="h-9 rounded-none gap-1 bg-emerald-500 px-5 text-xs text-white hover:bg-emerald-600"
          onClick={addAnswer}
        >
          <Plus className="size-3" />
          Add
        </Button>
      </div>

      {error && <p className="px-4 pb-3 text-xs text-red-500">{error}</p>}
    </div>
  )
}
