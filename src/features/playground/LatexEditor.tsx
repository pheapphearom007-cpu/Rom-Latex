import Editor, { type OnMount } from '@monaco-editor/react'
import { useThemeStore } from '@/stores/theme-store'

export function LatexEditor({
  value,
  onChange,
  height = '100%',
}: {
  value: string
  onChange: (value: string) => void
  height?: string | number
}) {
  const preference = useThemeStore((state) => state.preference)
  const dark =
    preference === 'dark' ||
    (preference === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)

  const handleMount: OnMount = (editor, monaco) => {
    monaco.languages.register({ id: 'latex' })
    monaco.languages.setMonarchTokensProvider('latex', {
      tokenizer: {
        root: [
          [/%.*$/, 'comment'],
          [/\\[a-zA-Z@]+/, 'keyword'],
          [/[{}]/, 'delimiter.bracket'],
          [/\$.*?\$/, 'string'],
        ],
      },
    })
    editor.updateOptions({
      minimap: { enabled: false },
      fontSize: 14,
      lineNumbers: 'on',
      automaticLayout: true,
      tabSize: 2,
      wordWrap: 'on',
      scrollBeyondLastLine: false,
    })
  }

  return (
    <Editor
      height={height}
      language="latex"
      theme={dark ? 'vs-dark' : 'vs'}
      value={value}
      onChange={(next) => onChange(next ?? '')}
      onMount={handleMount}
      loading={<div className="p-4 text-sm text-muted-foreground">Loading editor…</div>}
      options={{ fontFamily: 'IBM Plex Mono, ui-monospace, monospace' }}
    />
  )
}
