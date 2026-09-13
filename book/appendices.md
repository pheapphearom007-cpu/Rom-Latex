# APPENDICES & CHEAT SHEETS
## ឧបសម្ព័ន្ធ និងតារាងសង្ខេបជំនួយស្មារតី

---

# Appendix A: Complete LaTeX Command Cheat Sheet
## តារាងសង្ខេបពាក្យបញ្ជាសំខាន់ៗបំផុត

### 1. Document Anatomy & Environments
| Command / Environment | Purpose (English) | គោលបំណង (ភាសាខ្មែរ) |
| :--- | :--- | :--- |
| `\documentclass[options]{class}` | Declares document type | កំណត់ប្រភេទឯកសារ (article, report, book) |
| `\usepackage[options]{package}` | Imports external package | ទាញយកកញ្ចប់បន្ថែមក្នុង Preamble |
| `\begin{document} ... \end{document}` | Printable document boundary | ព្រំដែននៃតួសេចក្ដីដែលអាចមើលឃើញក្នុង PDF |
| `\maketitle` | Formats title banner | បង្កើតទំព័រ ឬចំណងជើងធំស្វ័យប្រវត្តិ |
| `\tableofcontents` | Auto-generates Table of Contents | បង្កើតទំព័រមាតិកាស្វ័យប្រវត្តិ |
| `\newpage` or `\clearpage` | Forces page break | បង្ខំឱ្យចុះទៅទំព័រថ្មី |

### 2. Sectional Hierarchy
| Command | Numbering Level | Availability |
| :--- | :--- | :--- |
| `\part{Title}` | Level -1 | `report`, `book` |
| `\chapter{Title}` | Level 0 | `report`, `book` |
| `\section{Title}` | Level 1 | All classes |
| `\subsection{Title}` | Level 2 | All classes |
| `\subsubsection{Title}` | Level 3 | All classes |
| `\paragraph{Title}` | Level 4 | All classes |
| `\section*{Unnumbered}` | No number, excluded from TOC | All classes |

### 3. Font Styling
| Command | Result | Syntax Note |
| :--- | :--- | :--- |
| `\textbf{text}` | **Bold text** | អក្សរដិត |
| `\textit{text}` | *Italic text* | អក្សរទ្រេត |
| `\emph{text}` | Context-aware emphasis | សង្កត់ន័យឆ្លាតវៃ |
| `\texttt{text}` | `Typewriter / Code` | អក្សរបែបកូដកុំព្យូទ័រ |
| `\underline{text}` | <u>Underlined text</u> | គូសបន្ទាត់ក្រោម |
| `\textsc{text}` | <span style="font-variant: small-caps">Small Caps</span> | អក្សរធំខ្នាតតូច |

---

# Appendix B: Mathematics Cheat Sheet
## តារាងសង្ខេបរូបមន្តគណិតវិទ្យា

### 1. Fundamental Math Syntax
| Symbol / Expression | LaTeX Syntax | Output |
| :--- | :--- | :--- |
| **Superscript** | `x^2`, `e^{2x+1}` | $x^2$, $e^{2x+1}$ |
| **Subscript** | `x_i`, `a_{n+1}` | $x_i$, $a_{n+1}$ |
| **Fraction** | `\frac{a}{b}` | $\frac{a}{b}$ |
| **Square Root** | `\sqrt{x}`, `\sqrt[3]{8}` | $\sqrt{x}$, $\sqrt[3]{8}$ |
| **Summation** | `\sum_{i=1}^{n} i` | $\sum_{i=1}^n i$ |
| **Product** | `\prod_{i=1}^{n} x_i` | $\prod_{i=1}^n x_i$ |
| **Integral** | `\int_{a}^{b} f(x)\,dx` | $\int_a^b f(x)\,dx$ |
| **Limit** | `\lim_{x \to 0} \frac{\sin x}{x}` | $\lim_{x \to 0} \frac{\sin x}{x}$ |
| **Infinity** | `\infty` | $\infty$ |
| **Plus-Minus** | `\pm` | $\pm$ |
| **Multiplication** | `\times`, `\cdot` | $\times$, $\cdot$ |
| **Partial Derivative** | `\frac{\partial f}{\partial x}` | $\frac{\partial f}{\partial x}$ |

### 2. Greek Letters Directory
| Name | Lowercase | Uppercase | Name | Lowercase | Uppercase |
| :--- | :---: | :---: | :--- | :---: | :---: |
| Alpha | `\alpha` ($\alpha$) | $A$ | Beta | `\beta` ($\beta$) | $B$ |
| Gamma | `\gamma` ($\gamma$) | `\Gamma` ($\Gamma$) | Delta | `\delta` ($\delta$) | `\Delta` ($\Delta$) |
| Epsilon | `\epsilon` / `\varepsilon` ($\varepsilon$) | $E$ | Theta | `\theta` ($\theta$) | `\Theta` ($\Theta$) |
| Lambda | `\lambda` ($\lambda$) | `\Lambda` ($\Lambda$) | Mu | `\mu` ($\mu$) | $M$ |
| Pi | `\pi` ($\pi$) | `\Pi` ($\Pi$) | Sigma | `\sigma` ($\sigma$) | `\Sigma` ($\Sigma$) |
| Phi | `\phi` / `\varphi` ($\varphi$) | `\Phi` ($\Phi$) | Omega | `\omega` ($\omega$) | `\Omega` ($\Omega$) |

### 3. Matrices Quick Reference
```latex
% Parentheses Matrix
\begin{pmatrix} a & b \\ c & d \end{pmatrix}

% Bracket Matrix
\begin{bmatrix} a & b \\ c & d \end{bmatrix}

% Determinant
\begin{vmatrix} a & b \\ c & d \end{vmatrix}
```

---

# Appendix C: Table & Figure Cheat Sheet
## តារាងសង្ខេបការបង្កើតតារាង និងរូបភាព

### 1. Professional Table Pattern (`booktabs`)
```latex
\begin{table}[htbp]
    \centering
    \caption{Table title goes here}
    \label{tab:my_table}
    \begin{tabular}{llr}
        \toprule
        \textbf{Header A} & \textbf{Header B} & \textbf{Header C} \\
        \midrule
        Item 1 & Description & 42.50 \\
        Item 2 & Description & 18.25 \\
        \bottomrule
    \end{tabular}
\end{table}
```

### 2. Floating Figure Pattern
```latex
\begin{figure}[htbp]
    \centering
    \includegraphics[width=0.75\textwidth]{path/to/image.png}
    \caption{Descriptive figure title}
    \label{fig:my_figure}
\end{figure}
```

### 3. Float Positioning Specifiers
- `h` (Here): Place float near the point in text where it is declared.
- `t` (Top): Place at the top of the current or next page.
- `b` (Bottom): Place at the bottom of the page.
- `p` (Page): Place on a dedicated page reserved exclusively for floating figures/tables.
- `!` (Override): Force LaTeX to relax strict typographic aesthetic constraints.

---

# Appendix D: Citation & Bibliography Cheat Sheet
## តារាងសង្ខេបឯកសារយោង (BibLaTeX)

### Setup in Preamble:
```latex
\usepackage[style=ieee, backend=biber]{biblatex}
\addbibresource{references.bib}
```

### Common Entry Formats in `.bib`:
```bibtex
@article{cite_key,
    author  = {Lastname, Firstname and Coauthor, Firstname},
    title   = {Article Title},
    journal = {Journal Name},
    year    = {2026},
    volume  = {12},
    pages   = {100--115}
}

@book{book_key,
    author    = {Author, Name},
    title     = {Book Title},
    publisher = {Academic Press},
    year      = {2024}
}
```

### In-Text Citation Commands:
- `\cite{cite_key}` $\to$ `[1]` (numeric) or `Author 2026`
- `\parencite{cite_key}` $\to$ `(Author, 2026)`
- `\textcite{cite_key}` $\to$ `Author (2026)`
- Print complete list: `\printbibliography`

---

# Appendix E: Troubleshooting & Common Errors Guide
## មគ្គុទ្ទេសក៍ដោះស្រាយកំហុសទូទៅ (Troubleshooting)

| Error Message | Probable Root Cause | Resolution |
| :--- | :--- | :--- |
| `! Undefined control sequence` | Misspelled command name or missing package import | Check spelling (e.g. `\textb` $\to$ `\textbf`) or ensure package is loaded in preamble. |
| `! Missing $ inserted` | Mathematical character (like `_`, `^`) typed in plain text | Wrap math expressions in `$ ... $`, or escape literal characters (`\_`). |
| `! Missing \begin{document}` | Printable text written in the preamble zone | Move all visible text below `\begin{document}`. |
| `! File ... not found` | Image or `.bib` filename misspelled or path incorrect | Ensure file is placed in project folder and check file extension (`.png`, `.jpg`). |
| `! Extra alignment tab has been converted to \cr` | More ampersands `&` in table row than columns declared | Count columns in `\begin{tabular}{...}` and verify row entries. |
| References show `??` | Auxiliary references not yet resolved | Recompile the document a second time (`pdflatex` $\to$ `pdflatex`). |
| `! LaTeX Error: Something's wrong--perhaps a missing \item` | Text written in `itemize`/`enumerate` before declaring `\item` | Put `\item` before list text entries. |

---

# Appendix F: 8-Week Beginner-to-Advanced Study Roadmap
## ផែនការសិក្សា ៨ សប្តាហ៍ពីមូលដ្ឋានដល់កម្រិតខ្ពស់

```
Week 1: Document Basics (Preamble, documentclass, sections, text styling)
Week 2: Lists & Tables (itemize, enumerate, booktabs, professional tables)
Week 3: Elementary Mathematics (Inline math, fractions, subscripts, Greek letters)
Week 4: Advanced Mathematics (align, matrices, calculus, theorem environments)
Week 5: Figures & TikZ (graphicx, figure floats, subfigures, basic TikZ diagrams)
Week 6: Academic Referencing (Cross-references, BibTeX, biblatex, citation styles)
Week 7: Thesis Architecture (frontmatter, mainmatter, geometry, fancyhdr layouts)
Week 8: Capstone Mastery (Completing a full conference paper, CV, and Beamer slides)
```

---

# Appendix G: Final Capstone Project
## គម្រោងបញ្ចប់ការសិក្សា (Capstone Assignment)

To graduate to complete LaTeX mastery, execute this comprehensive capstone assignment:
1. **Manuscript**: Author a 6-page academic research paper in your chosen field.
2. **Components Required**:
   - Institutional title banner with author affiliations and abstract.
   - At least three sections with subsection hierarchies.
   - At least two mathematical derivations using `align` and matrices.
   - One professional `booktabs` table with aligned numeric data.
   - One TikZ system architecture flowchart or vector diagram.
   - At least five cited references stored in an external `.bib` file managed by `biblatex`.
   - Complete cross-references linking text to all sections, figures, tables, and equations without any hardcoded numbers.
3. **Compilation**: Verify that the document compiles with zero fatal errors and zero unresolved `??` warnings.

---

# Appendix H: Comprehensive English–Khmer LaTeX Glossary
## វចនានុក្រមបច្ចេកទេសទ្វេភាសា (English – ភាសាខ្មែរ)

- **Backslash (`\`)**: សញ្ញាត្រេបញ្រ្ចាស ជាសញ្ញាផ្ដើមនៃរាល់ពាក្យបញ្ជាក្នុង LaTeX។
- **Body**: តួសេចក្ដីនៃឯកសារដែលស្ថិតនៅចន្លោះ `\begin{document}` និង `\end{document}`។
- **BibTeX / BibLaTeX**: កម្មវិធី និងកញ្ចប់គ្រប់គ្រងឯកសារយោង និងការធ្វើ Citation ដោយស្វ័យប្រវត្តិ។
- **Compiler**: កម្មវិធីកុំព្យូទ័រដែលបកប្រែកូដ `.tex` ឱ្យក្លាយជាឯកសារ `.pdf` (ដូចជា pdflatex, xelatex)។
- **Cross-Reference**: ការភ្ជាប់យោងផ្ទៃក្នុងរវាងអត្ថបទ ទៅកាន់រូបភាព តារាង ឬសមីការ (`\ref`, `\label`)។
- **CTAN**: បណ្ណាល័យកណ្ដាលពិភពលោកសម្រាប់ទាញយក packages របស់ TeX និង LaTeX (The Comprehensive TeX Archive Network)។
- **Delimiter**: សញ្ញាវង់ក្រចក ឬរបាំងខណ្ឌ (ដូចជា `( )`, `[ ]`, `\{ \}`) ដែលអាចពង្រីកទំហំតាមរយៈ `\left` និង `\right`។
- **Display Math**: ការសរសេររូបមន្តគណិតវិទ្យាដាច់ដោយឡែកនៅកណ្ដាលទំព័រ (`\[ ... \]`)។
- **Document Class**: ប្រភេទឯកសារដែលកំណត់ទ្រង់ទ្រាយរួម (`article`, `report`, `book`, `beamer`)។
- **Environment**: បរិស្ថានកូដដែលចាប់ផ្ដើមដោយ `\begin{...}` និងបញ្ចប់ដោយ `\end{...}`។
- **Float**: ប្រអប់ផ្ទុករូបភាព ឬតារាងដែល LaTeX អនុញ្ញាតឱ្យអណ្ដែតស្វែងរកទីតាំងស្អាតបំផុតលើទំព័រ (`table`, `figure`)។
- **Inline Math**: រូបមន្តគណិតវិទ្យាក្នុងបន្ទាត់អត្ថបទធម្មតាដែលព័ទ្ធជុំវិញដោយសញ្ញាដុល្លារ `$ ... $`។
- **Kerning**: គម្លាតចន្លោះរវាងតួអក្សរពីរដែលត្រូវបានគណនាដោយក្បួនខ្នាតសោភ័ណភាពពុម្ព។
- **Macro**: ពាក្យបញ្ជាកាត់ដែលអ្នកនិពន្ធបង្កើតឡើងដោយខ្លួនឯងតាមរយៈ `\newcommand`។
- **Overleaf**: កម្មវិធីសរសេរកូដ LaTeX លើប្រព័ន្ធ Internet (Cloud-based) ដែលមិនចាំបាច់ដំឡើងលើកុំព្យូទ័រ។
- **Package**: កញ្ចប់បន្ថែមដែលផ្ដល់មុខងារ ឬការរចនាថ្មីៗដែលត្រូវទាញយកតាមរយៈ `\usepackage`។
- **Preamble**: ផ្នែកក្បាលឯកសារ (នៅពីលើ `\begin{document}`) សម្រាប់កំណត់ការកំណត់ទូទៅ។
- **TikZ**: កញ្ចប់គូរគំនូសតាង ដ្យាក្រាម និងក្រាហ្វិកបែប Vector កម្រិតខ្ពស់ក្នុង LaTeX។
- **Typesetting**: សិល្បៈនិងវិទ្យាសាស្ត្រនៃការរៀបចំតួអក្សរ កថាខណ្ឌ និងទំព័រឱ្យមានសោភ័ណភាពកម្រិតបោះពុម្ព។
- **WYSIWYM**: "What You See Is What You Mean" — ទស្សនវិជ្ជារបស់ LaTeX ដែលផ្ដោតលើអត្ថន័យនៃរចនាសម្ព័ន្ធ ជាជាងការកែរូបរាងដោយដៃផ្ទាល់។
