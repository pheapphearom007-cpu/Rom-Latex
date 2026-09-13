import katex from 'katex'
import 'katex/dist/katex.min.css'

export type PreviewError = {
  message: string
  hint?: string
}

export type PreviewResult = {
  html: string
  errors: PreviewError[]
  warnings: string[]
}

const MATH_PLACEHOLDER = '@@MATH'
const VERBATIM_PLACEHOLDER = '@@VERB'

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

function renderMath(source: string, displayMode: boolean): { html: string; error?: string } {
  try {
    return {
      html: katex.renderToString(source, {
        displayMode,
        throwOnError: true,
        strict: 'ignore',
        output: 'html',
      }),
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Invalid mathematics.'
    return {
      html: `<span class="text-destructive font-mono text-sm">${escapeHtml(source)}</span>`,
      error: message.replace(/^KaTeX parse error:\s*/i, ''),
    }
  }
}

function extractMath(source: string) {
  const math: Array<{ html: string; error?: string }> = []
  const errors: PreviewError[] = []

  const replace = (input: string, pattern: RegExp, displayMode: boolean) =>
    input.replace(pattern, (_match, body: string) => {
      const result = renderMath(body.trim(), displayMode)
      if (result.error) {
        errors.push({
          message: result.error,
          hint: 'Check braces, missing arguments, and command names in this formula.',
        })
      }
      const index = math.push(result) - 1
      return `${MATH_PLACEHOLDER}${index}@@`
    })

  let next = source
  next = replace(next, /\$\$([\s\S]+?)\$\$/g, true)
  next = replace(next, /\\\[([\s\S]+?)\\\]/g, true)
  next = replace(next, /\\begin\{(equation\*?|align\*?|displaymath)\}([\s\S]+?)\\end\{\1\}/g, true)
  next = next.replace(
    /\\begin\{(equation\*?|align\*?|displaymath)\}([\s\S]+?)\\end\{\1\}/g,
    (_m, _env, body: string) => {
      const result = renderMath(body.trim(), true)
      if (result.error) {
        errors.push({ message: result.error, hint: 'This display environment could not be typeset.' })
      }
      const index = math.push(result) - 1
      return `${MATH_PLACEHOLDER}${index}@@`
    },
  )
  next = replace(next, /\\\(([\s\S]+?)\\\)/g, false)
  next = replace(next, /(?<!\\)\$([^$\n]+)\$/g, false)
  return { text: next, math, errors }
}

function extractVerbatim(source: string) {
  const blocks: string[] = []
  const text = source.replace(/\\begin\{verbatim\}([\s\S]*?)\\end\{verbatim\}/g, (_m, body: string) => {
    const index = blocks.push(escapeHtml(body.replace(/^\n/, ''))) - 1
    return `${VERBATIM_PLACEHOLDER}${index}@@`
  })
  return { text, blocks }
}

function applyCommand(source: string, command: string, wrap: (inner: string) => string) {
  const token = `\\${command}`
  let output = ''
  let i = 0
  while (i < source.length) {
    if (source.startsWith(token, i) && source[i + token.length] === '{') {
      i += token.length + 1
      let depth = 1
      let inner = ''
      while (i < source.length && depth > 0) {
        const ch = source[i]
        if (ch === '{') depth += 1
        else if (ch === '}') depth -= 1
        if (depth > 0) inner += ch
        i += 1
      }
      output += wrap(inner)
    } else {
      output += source[i]
      i += 1
    }
  }
  return output
}

function parseTabular(body: string) {
  const rows = body
    .trim()
    .split(/\\\\/)
    .map((row) => row.replace(/\\hline/g, '').trim())
    .filter(Boolean)
  if (!rows.length) return '<p>Empty table.</p>'
  const htmlRows = rows.map((row, index) => {
    const cells = row.split('&').map((cell) => cell.trim())
    const tag = index === 0 ? 'th' : 'td'
    return `<tr>${cells.map((cell) => `<${tag}>${cell}</${tag}>`).join('')}</tr>`
  })
  return `<table><tbody>${htmlRows.join('')}</tbody></table>`
}

function parseList(body: string, ordered: boolean) {
  const items = body
    .split(/\\item\s*/)
    .map((item) => item.trim())
    .filter(Boolean)
  const tag = ordered ? 'ol' : 'ul'
  return `<${tag}>${items.map((item) => `<li>${item}</li>`).join('')}</${tag}>`
}

function restorePlaceholders(source: string, math: Array<{ html: string }>, verbatim: string[]) {
  return source
    .replace(new RegExp(`${VERBATIM_PLACEHOLDER}(\\d+)@@`, 'g'), (_m, idx: string) => {
      return `<pre class="font-mono text-sm overflow-x-auto rounded-lg bg-muted p-3">${verbatim[Number(idx)] ?? ''}</pre>`
    })
    .replace(new RegExp(`${MATH_PLACEHOLDER}(\\d+)@@`, 'g'), (_m, idx: string) => {
      return math[Number(idx)]?.html ?? ''
    })
}

function countChar(source: string, char: string) {
  return [...source].filter((item) => item === char).length
}

export function previewLatex(source: string): PreviewResult {
  const errors: PreviewError[] = []
  const warnings: string[] = []
  const trimmed = source.trim()
  if (!trimmed) {
    return { html: '<p class="text-muted-foreground">Write LaTeX on the left to preview it here.</p>', errors, warnings }
  }

  if (countChar(trimmed, '{') !== countChar(trimmed, '}')) {
    errors.push({
      message: 'Unbalanced braces.',
      hint: 'Every opening { needs a matching closing }.',
    })
  }

  let body = trimmed
  const beginDoc = body.indexOf('\\begin{document}')
  const endDoc = body.indexOf('\\end{document}')
  if (beginDoc !== -1) {
    body = body.slice(beginDoc + '\\begin{document}'.length, endDoc === -1 ? undefined : endDoc)
    if (endDoc === -1) {
      errors.push({
        message: 'Missing \\end{document}.',
        hint: 'Document environments should be closed.',
      })
    }
  }

  if (/\\includepdf|\\tikz|\\usepackage\{tikz\}|\\addplot/.test(trimmed)) {
    warnings.push('TikZ, PDF inclusion, and some packages are shown as structured HTML, not a full TeX engine output.')
  }

  body = body.replace(/%.*$/gm, '')
  const verbatim = extractVerbatim(body)
  const math = extractMath(verbatim.text)
  errors.push(...math.errors)

  let text = math.text
  text = text.replace(/\\documentclass(\[[^\]]*\])?\{[^}]+\}/g, '')
  text = text.replace(/\\usepackage(\[[^\]]*\])?\{[^}]+\}/g, '')
  text = text.replace(/\\maketitle/g, '')

  const title = text.match(/\\title\{([^}]+)\}/)?.[1]
  const author = text.match(/\\author\{([^}]+)\}/)?.[1]
  const date = text.match(/\\date\{([^}]+)\}/)?.[1]
  text = text.replace(/\\title\{[^}]+\}/g, '')
  text = text.replace(/\\author\{[^}]+\}/g, '')
  text = text.replace(/\\date\{[^}]+\}/g, '')

  text = text.replace(/\\begin\{abstract\}([\s\S]*?)\\end\{abstract\}/g, (_m, inner: string) => {
    return `<section class="abstract"><strong>Abstract.</strong> ${inner.trim()}</section>`
  })
  text = text.replace(/\\begin\{center\}([\s\S]*?)\\end\{center\}/g, '<p style="text-align:center">$1</p>')
  text = text.replace(/\\begin\{quote\}([\s\S]*?)\\end\{quote\}/g, '<blockquote>$1</blockquote>')
  text = text.replace(/\\begin\{itemize\}([\s\S]*?)\\end\{itemize\}/g, (_m, inner: string) => parseList(inner, false))
  text = text.replace(/\\begin\{enumerate\}([\s\S]*?)\\end\{enumerate\}/g, (_m, inner: string) => parseList(inner, true))
  text = text.replace(
    /\\begin\{tabular\}\{[^}]*\}([\s\S]*?)\\end\{tabular\}/g,
    (_m, inner: string) => parseTabular(inner),
  )
  text = text.replace(
    /\\includegraphics(?:\[[^\]]*\])?\{([^}]+)\}/g,
    (_m, file: string) =>
      `<div class="figure-placeholder">Figure: <span class="font-mono">${escapeHtml(file)}</span></div>`,
  )
  text = text.replace(/\\caption\{([^}]+)\}/g, '<p><em>Figure: $1</em></p>')
  text = text.replace(/\\label\{([^}]+)\}/g, '<span class="sr-only">label $1</span>')
  text = text.replace(/\\ref\{([^}]+)\}/g, '<span class="font-medium">[$1]</span>')
  text = text.replace(/\\cite\{([^}]+)\}/g, '<sup>[$1]</sup>')
  text = text.replace(/\\footnote\{([^}]+)\}/g, '<sup title="$1">*</sup>')

  text = applyCommand(text, 'section', (inner) => `<h2>${inner}</h2>`)
  text = applyCommand(text, 'subsection', (inner) => `<h3>${inner}</h3>`)
  text = applyCommand(text, 'subsubsection', (inner) => `<h4 class="font-semibold mt-4">${inner}</h4>`)
  text = applyCommand(text, 'textbf', (inner) => `<strong>${inner}</strong>`)
  text = applyCommand(text, 'textit', (inner) => `<em>${inner}</em>`)
  text = applyCommand(text, 'emph', (inner) => `<em>${inner}</em>`)
  text = applyCommand(text, 'underline', (inner) => `<span class="underline">${inner}</span>`)
  text = applyCommand(text, 'texttt', (inner) => `<code class="font-mono text-[0.95em]">${inner}</code>`)
  text = applyCommand(text, 'text', (inner) => inner)

  text = text.replace(/\\LaTeX\{\}|\\LaTeX/g, '<span class="font-serif font-semibold">L<sup>a</sup>T<sub>e</sub>X</span>')
  text = text.replace(/\\newline|\\\\/g, '<br />')
  text = text.replace(/\\par\b/g, '</p><p>')
  text = text.replace(/~/g, '&nbsp;')
  text = text.replace(/``/g, '“').replace(/''/g, '”')
  text = text.replace(/\\&/g, '&amp;')
  text = text.replace(/\\%/g, '%')
  text = text.replace(/\\_/g, '_')
  text = text.replace(/\\item\s*/g, '• ')

  const paragraphs = text
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      if (block.startsWith('<')) return block
      return `<p>${block.replaceAll('\n', ' ')}</p>`
    })

  let html = paragraphs.join('\n')
  if (title || author) {
    html = `<header class="title-block">${title ? `<h1>${title}</h1>` : ''}${author ? `<p>${author}</p>` : ''}${date ? `<p>${date}</p>` : ''}</header>${html}`
  }

  html = restorePlaceholders(html, math.math, verbatim.blocks)

  if (/\\[a-zA-Z@]+/.test(html.replace(/<[^>]+>/g, ' '))) {
    warnings.push('Some commands are not compiled by the browser preview. Unsupported TeX primitives are left visible.')
  }

  return { html, errors, warnings }
}

export function extractBodySource(source: string) {
  const beginDoc = source.indexOf('\\begin{document}')
  if (beginDoc === -1) return source
  const endDoc = source.indexOf('\\end{document}')
  return source.slice(beginDoc + '\\begin{document}'.length, endDoc === -1 ? undefined : endDoc).trim()
}
