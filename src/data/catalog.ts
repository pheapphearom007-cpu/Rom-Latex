import type { Achievement, Course, LatexCommand } from '@/types'

export const COURSES: Course[] = [
  {
    id: 'fundamentals',
    slug: 'latex-fundamentals',
    title: 'LaTeX Fundamentals',
    subtitle: 'Beginner document basics',
    description: 'Set up LaTeX and learn the structure of a professional document: sections, lists, figures, tables, and citations.',
    level: 1,
    difficulty: 'beginner',
    estimatedHours: 8,
    color: '#1f3d5c',
    lessonIds: [
      'l01', 'l02', 'l03', 'l04', 'l05', 'l06', 'l07', 'l08', 'l09', 'l10',
    ],
  },
  {
    id: 'mathematics',
    slug: 'mathematics-in-latex',
    title: 'Mathematics in LaTeX',
    subtitle: 'From inline math to advanced equations',
    description: 'Typeset fractions, Greek letters, matrices, calculus, limits, integrals, and multi-line aligned equations.',
    level: 2,
    difficulty: 'intermediate',
    estimatedHours: 10,
    color: '#0f766e',
    lessonIds: ['l11', 'l12', 'l13', 'l14', 'l15', 'l16', 'l17', 'l18', 'l19', 'l20'],
    lockedUntilCourseId: 'fundamentals',
  },
  {
    id: 'academic',
    slug: 'academic-writing',
    title: 'Academic Writing',
    subtitle: 'Papers, theses, and Beamer',
    description: 'Build bibliographies, cross-references, captions, thesis structure, research papers, and presentation slides.',
    level: 3,
    difficulty: 'intermediate',
    estimatedHours: 9,
    color: '#7c2d12',
    lessonIds: ['l21', 'l22', 'l23', 'l24', 'l25', 'l26', 'l27', 'l28', 'l29', 'l30'],
    lockedUntilCourseId: 'mathematics',
  },
  {
    id: 'advanced',
    slug: 'advanced-latex',
    title: 'Advanced LaTeX',
    subtitle: 'Packages, TikZ, and professional projects',
    description: 'Create commands, environments, layouts, TikZ figures, advanced tables, templates, and debugging workflows.',
    level: 4,
    difficulty: 'advanced',
    estimatedHours: 12,
    color: '#4c1d95',
    lessonIds: ['l31', 'l32', 'l33', 'l34', 'l35', 'l36', 'l37', 'l38', 'l39', 'l40'],
    lockedUntilCourseId: 'academic',
  },
]

export const ROADMAP = [
  { id: 'beginner', label: 'Beginner' },
  { id: 'document-basics', label: 'Document basics' },
  { id: 'mathematics', label: 'Mathematics' },
  { id: 'academic-writing', label: 'Academic writing' },
  { id: 'advanced-latex', label: 'Advanced LaTeX' },
  { id: 'real-projects', label: 'Real projects' },
] as const

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'first-lesson', title: 'First Lesson', description: 'Complete your first lesson.', icon: 'BookOpen' },
  { id: 'first-exercise', title: 'First Exercise', description: 'Solve your first exercise.', icon: 'CheckCircle2' },
  { id: 'latex-beginner', title: 'LaTeX Beginner', description: 'Finish LaTeX Fundamentals.', icon: 'GraduationCap' },
  { id: 'math-master', title: 'Math Master', description: 'Finish Mathematics in LaTeX.', icon: 'Sigma' },
  { id: 'academic-writer', title: 'Academic Writer', description: 'Finish Academic Writing.', icon: 'FileText' },
  { id: 'ten-lessons', title: '10 Lessons Completed', description: 'Complete 10 lessons.', icon: 'ListChecks' },
  { id: 'twenty-five-lessons', title: '25 Lessons Completed', description: 'Complete 25 lessons.', icon: 'Trophy' },
  { id: 'course-completed', title: 'Course Completed', description: 'Finish any full course.', icon: 'Award' },
]

export const COMMANDS: LatexCommand[] = [
  { id: 'textbf', command: '\\textbf{text}', description: 'Bold text.', category: 'Text', example: '\\textbf{Important}', keywords: ['bold', 'text'] },
  { id: 'textit', command: '\\textit{text}', description: 'Italic text.', category: 'Text', example: '\\textit{emphasis}', keywords: ['italic'] },
  { id: 'emph', command: '\\emph{text}', description: 'Emphasized text that adapts to context.', category: 'Formatting', example: '\\emph{key idea}', keywords: ['emphasis'] },
  { id: 'texttt', command: '\\texttt{text}', description: 'Monospace / typewriter text.', category: 'Formatting', example: '\\texttt{filename.tex}', keywords: ['mono', 'code'] },
  { id: 'section', command: '\\section{title}', description: 'Creates a numbered section.', category: 'Sections', example: '\\section{Introduction}', keywords: ['section', 'heading'] },
  { id: 'subsection', command: '\\subsection{title}', description: 'Creates a subsection.', category: 'Sections', example: '\\subsection{Background}', keywords: ['subsection'] },
  { id: 'frac', command: '\\frac{a}{b}', description: 'Creates a fraction.', category: 'Mathematics', example: '$$\\frac{a}{b}$$', keywords: ['fraction', 'math'] },
  { id: 'sum', command: '\\sum_{i=1}^{n}', description: 'Summation symbol with limits.', category: 'Mathematics', example: '$$\\sum_{i=1}^{n} i$$', keywords: ['sum'] },
  { id: 'int', command: '\\int_{a}^{b}', description: 'Integral with bounds.', category: 'Mathematics', example: '$$\\int_{0}^{1} x^2\\,dx$$', keywords: ['integral', 'calculus'] },
  { id: 'lim', command: '\\lim_{x \\to a}', description: 'Limit expression.', category: 'Mathematics', example: '$$\\lim_{x \\to 0} \\frac{\\sin x}{x}$$', keywords: ['limit'] },
  { id: 'sqrt', command: '\\sqrt{x}', description: 'Square root.', category: 'Mathematics', example: '$\\sqrt{2}$', keywords: ['root'] },
  { id: 'mathbf', command: '\\mathbf{v}', description: 'Bold math symbol, often a vector.', category: 'Mathematics', example: '$\\mathbf{v}$', keywords: ['vector', 'bold'] },
  { id: 'begin-matrix', command: '\\begin{matrix}', description: 'Unfenced matrix environment.', category: 'Mathematics', example: '$$\\begin{pmatrix}1&0\\\\0&1\\end{pmatrix}$$', keywords: ['matrix'] },
  { id: 'itemize', command: '\\begin{itemize}', description: 'Bulleted list.', category: 'Lists', example: '\\begin{itemize}\\item One\\end{itemize}', keywords: ['list', 'bullet'] },
  { id: 'enumerate', command: '\\begin{enumerate}', description: 'Numbered list.', category: 'Lists', example: '\\begin{enumerate}\\item First\\end{enumerate}', keywords: ['list', 'numbered'] },
  { id: 'tabular', command: '\\begin{tabular}{lcr}', description: 'Table with column alignment.', category: 'Tables', example: '\\begin{tabular}{ll}\\hline A & B \\\\\\hline\\end{tabular}', keywords: ['table'] },
  { id: 'hline', command: '\\hline', description: 'Horizontal rule inside a table.', category: 'Tables', example: '\\hline', keywords: ['table', 'line'] },
  { id: 'includegraphics', command: '\\includegraphics{file}', description: 'Insert an image (graphicx).', category: 'Images', example: '\\includegraphics[width=\\linewidth]{plot.png}', keywords: ['image', 'figure'] },
  { id: 'caption', command: '\\caption{text}', description: 'Caption for a figure or table.', category: 'Images', example: '\\caption{Experimental setup.}', keywords: ['caption'] },
  { id: 'cite', command: '\\cite{key}', description: 'In-text citation.', category: 'References', example: '\\cite{knuth1984}', keywords: ['citation'] },
  { id: 'ref', command: '\\ref{label}', description: 'Cross-reference a label.', category: 'References', example: 'See Section~\\ref{sec:intro}', keywords: ['reference', 'label'] },
  { id: 'label', command: '\\label{id}', description: 'Anchor for later references.', category: 'References', example: '\\label{eq:euler}', keywords: ['label'] },
  { id: 'bibliography', command: '\\bibliography{refs}', description: 'Insert a BibTeX bibliography.', category: 'References', example: '\\bibliography{references}', keywords: ['bibtex'] },
  { id: 'usepackage', command: '\\usepackage{name}', description: 'Load a package in the preamble.', category: 'Packages', example: '\\usepackage{amsmath}', keywords: ['package'] },
  { id: 'newcommand', command: '\\newcommand{\\cmd}{}', description: 'Define a custom command.', category: 'Formatting', example: '\\newcommand{\\R}{\\mathbb{R}}', keywords: ['macro', 'command'] },
  { id: 'tikz', command: '\\begin{tikzpicture}', description: 'Start a TikZ drawing.', category: 'TikZ', example: '\\begin{tikzpicture}\\draw (0,0)--(1,1);\\end{tikzpicture}', keywords: ['tikz', 'graphics'] },
  { id: 'draw', command: '\\draw', description: 'Draw paths in TikZ.', category: 'TikZ', example: '\\draw[->] (0,0) -- (2,0);', keywords: ['tikz', 'draw'] },
]

export const DEFAULT_PLAYGROUND = `\\documentclass{article}
\\usepackage{amsmath}
\\title{Hello from Learn LaTeX}
\\author{You}
\\date{\\today}

\\begin{document}
\\maketitle

\\section{Introduction}
Hello \\LaTeX! This playground renders a structured HTML preview of common commands and typesets mathematics with KaTeX.

Inline math: $E = mc^2$.

Display math:
$$
\\int_{0}^{1} x^2 \\, dx = \\frac{1}{3}
$$

\\begin{itemize}
  \\item Edit the source on the left
  \\item Preview updates on the right
  \\item Download a \\texttt{.tex} file when you are ready
\\end{itemize}
\\end{document}
`
