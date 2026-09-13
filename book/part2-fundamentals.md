# PART 2 — LaTeX Fundamentals
## ផ្នែកទី ២ — មូលដ្ឋានគ្រឹះនៃ LaTeX

---

# Chapter 4: Text Formatting & Typography
## ជំពូកទី ៤: ទម្រង់អក្សរ និងសិល្បៈនៃការរៀបតួអក្សរ

### 1. Learning Objectives / គោលបំណងមេរៀន
By the end of this chapter, you will be able to:
- Apply font styles (bold, italic, slanted, small caps, monospace, underline).
- Control relative font sizes dynamically from `\tiny` to `\Huge`.
- Manage text alignment (center, flushleft, flushright).
- Master paragraph breaks, explicit line breaks, and whitespace rules.
- Escape reserved special characters safely in LaTeX source code.

---

### 2. English Explanation
In LaTeX, text styling is declared semantically using commands. Rather than highlighting words with a mouse, you wrap words in commands that describe how they should be rendered.

#### 1. Font Styling Commands
| Style | Command | Visual Result |
| :--- | :--- | :--- |
| **Bold** | `\textbf{text}` | **text** |
| *Italic* | `\textit{text}` | *text* |
| *Emphasis* | `\emph{text}` | Context-aware emphasis (italic in roman, upright in italic) |
| Monospace / Code | `\texttt{text}` | `text` (Typewriter font) |
| Small Capitals | `\textsc{text}` | <span style="font-variant: small-caps">Small Caps</span> |
| Underline | `\underline{text}` | <u>text</u> (Note: use sparingly in typography) |
| Sans-Serif | `\textsf{text}` | Sans-serif font family |

#### 2. Relative Font Sizes
Font sizes in LaTeX scale proportionately according to the base document font size (e.g., `10pt`, `11pt`, or `12pt` declared in `\documentclass`):
- `\tiny` — Extremely small
- `\scriptsize` — Footnote sub-indices
- `\footnotesize` — Standard footnote size
- `\small` — Slightly smaller than normal
- `\normalsize` — Default document body size
- `\large` — Minor section headings
- `\Large` — Major section headings
- `\LARGE` — Chapter titles
- `\huge` — Title banners
- `\Huge` — Maximum prominent headings

#### 3. Paragraphs and Line Breaks
- **New Paragraph**: Leave one completely blank line in your source code. LaTeX will automatically indent the first line of the new paragraph according to academic conventions.
- **Manual Line Break**: Use `\\` or `\newline` to break to the next line without starting a new indented paragraph.
- **Do not indent manually**: Never use consecutive spaces to indent; LaTeX controls paragraph indentation globally via `\parindent`.

#### 4. The 10 Reserved Special Characters
LaTeX reserves ten characters for formatting and syntactic macros. To print them literally in text, you must escape them:
| Character | Purpose in LaTeX | How to Print Literally |
| :---: | :--- | :--- |
| `%` | Comment indicator (ignores rest of line) | `\%` |
| `$` | Math mode toggle | `\$` |
| `&` | Table column separator | `\&` |
| `#` | Macro parameter indicator | `\#` |
| `_` | Subscript indicator in math | `\_` |
| `{` `}`| Argument grouping braces | `\{` and `\}` |
| `~` | Non-breaking unbreakable space | `\textasciitilde` |
| `^` | Superscript indicator in math | `\textasciicircum` |
| `\` | Command prefix | `\textbackslash` |

[WARNING]
Never write `\\` to print a backslash! `\\` creates a line break. To print a backslash character, always use `\textbackslash`.

---

### 3. Khmer Explanation (ការពន្យល់ជាភាសាខ្មែរ)
នៅក្នុង LaTeX ការកែប្រែទម្រង់អក្សរត្រូវបានធ្វើឡើងតាមរយៈពាក្យបញ្ជា (Commands) ច្បាស់លាស់៖

#### ១. ការកំណត់រចនាប័ទ្មអក្សរ
- `\textbf{អត្ថបទ}`៖ ធ្វើឱ្យអក្សរ**ដិត** (Bold)។
- `\textit{អត្ថបទ}`៖ ធ្វើឱ្យអក្សរ*ទ្រេត* (Italic)។
- `\emph{អត្ថបទ}`៖ សង្កត់ធ្ងន់លើពាក្យសំខាន់ (Emphasis)។
- `\texttt{អត្ថបទ}`៖ អក្សរបែបកូដកុំព្យូទ័រ (Monospace / Code font)។
- `\underline{អត្ថបទ}`៖ គូសបន្ទាត់ពីក្រោមពាក្យ។

#### ២. ការចុះបន្ទាត់ និងកថាខណ្ឌ
- **បង្កើតកថាខណ្ឌថ្មី (New Paragraph)**៖ គ្រាន់តែចុះបន្ទាត់ដោយទុក **បន្ទាត់ទទេមួយ** ក្នុងកូដរបស់អ្នក។ LaTeX នឹងចូលបន្ទាត់ដំបូងនៃកថាខណ្ឌថ្មីដោយស្វ័យប្រវត្តិតាមក្បួនខ្នាតសៀវភៅ។
- **ចុះបន្ទាត់ធម្មតាដោយមិនចូលកថាខណ្ឌ**៖ ប្រើសញ្ញា `\\` នៅចុងបន្ទាត់។

#### ៣. តួអក្សរពិសេសទាំង ១០ ដែលត្រូវប្រយ័ត្ន
សញ្ញាទាំងនេះមានតួនាទីពិសេសក្នុងកូដ LaTeX។ ប្រសិនបើអ្នកចង់វាយឱ្យចេញសញ្ញាទាំងនេះនៅលើក្រដាស អ្នកត្រូវប្រើសញ្ញា `\` នៅពីមុខ៖
- ចង់សរសេរ 100% ត្រូវសរសេរ៖ `100\%`
- ចង់សរសេរ $50 ត្រូវសរសេរ៖ `\$50`
- ចង់សរសេរ R&D ត្រូវសរសេរ៖ `R\&D`

---

### 4. Code Example: Typography & Special Characters
```latex
\documentclass[12pt, a4paper]{article}
\usepackage[utf8]{inputenc}

\begin{document}

\section{Typography Demonstration}

This is normal text. We can write \textbf{bold text} for emphasis, 
\textit{italic text} for book titles, and \texttt{code snippets} for programming.

You can also combine styles: \textbf{\textit{bold-italic text}}.

\subsection{Font Sizing}
{\tiny Tiny text}, {\small Small text}, {\normalsize Normal text}, 
{\large Large text}, {\Large Very Large}, and {\huge Huge text}.

\subsection{Escaping Special Characters}
The financial report showed a growth of 15\% with total profits exceeding \$50,000.
We collaborated with the R\&D team on project \#402\_Alpha.

\subsection{Text Alignment}
\begin{center}
    This text is perfectly centered on the page.
\end{center}

\begin{flushright}
    Phnom Penh, Cambodia\\
    September 2026
\end{flushright}

\end{document}
```

---

### 5. Line-by-Line Breakdown
- `\textbf{bold text}`: Encloses the target words in a bold typeface group.
- `{\large Large text}`: Enclosing the size command and words inside curly braces `{...}` scopes the size change to those words only, preventing the entire document from becoming large.
- `15\%` and `\$50,000`: Escapes the percentage and dollar characters so they print verbatim instead of initiating comments or math mode.
- `\begin{center} ... \end{center}`: Centers the enclosed text horizontally.
- `\begin{flushright} ... \end{flushright}`: Aligns the text to the right margin, ideal for signature blocks or dates.

---

### 6. Expected Output
- Section heading **1 Typography Demonstration**.
- A paragraph exhibiting crisp typography: bold, italic, monospace, and nested bold-italic text.
- Visually proportional font size variations in a single flowing line.
- Correctly escaped symbols: "15%", "$50,000", "R&D", and "#402_Alpha".
- A cleanly centered notice and a right-aligned date block.

---

### 7. Common Mistakes / កំហុសទូទៅ
[WARNING]
- **Forgetting to scope font size commands**: Writing `\large This is a title` without enclosing braces causes *all subsequent text in your entire document* to remain large! Always scope: `{\large This is a title}`.
- **Accidentally typing `%` unescaped**: Writing `Profit was 20% this quarter` causes LaTeX to treat `this quarter` as a comment and discard it from the PDF!

---

### 8. Best Practices / ការអនុវត្តល្អបំផុត
[TIP]
- Use `\emph{...}` instead of `\textit{...}` for linguistic emphasis. `\emph` intelligently detects whether surrounding text is already italicized and switches back to upright Roman font automatically.
- Do not overuse underlining (`\underline`); in classical academic typography, italics are preferred for titles and emphasis.

---

### 9. Exercises / លំហាត់អនុវត្ត
1. Write a paragraph introducing yourself with your name in bold, your major in italics, and a quote with quotation marks (hint: in LaTeX, use backticks `` ` `` for opening quotes and single quotes `'` for closing quotes).
2. Typeset the following sentence exactly: `John purchased item #12 for $25.50 (a 10% discount & free shipping)!`
3. Center a three-line poem using the `center` environment.

---
---

# Chapter 5: Document Structure
## ជំពូកទី ៥: រចនាសម្ព័ន្ធឯកសារ និងជំពូក

### 1. Learning Objectives / គោលបំណងមេរៀន
By the end of this chapter, you will be able to:
- Organize academic manuscripts using LaTeX's hierarchical heading commands.
- Distinguish between numbered headings and unnumbered headings.
- Generate an automated Table of Contents with a single command.
- Configure page numbering styles (`arabic`, `roman`, `Roman`).

---

### 2. English Explanation
LaTeX provides built-in structural commands that automatically handle section numbering, heading fonts, page breaks, and table-of-contents registration.

#### The Structural Hierarchy
```
\part{...}              Level -1 (books & reports only)
  \chapter{...}         Level  0 (books & reports only)
    \section{...}       Level  1 (articles, reports, books)
      \subsection{...}  Level  2
        \subsubsection{...} Level 3
          \paragraph{...}   Level 4
```

#### Numbered vs. Unnumbered Headings
- By default, `\section{Overview}` produces numbered headings: **1 Overview**, **1.1 Background**, etc.
- Adding an asterisk `*` creates an **unnumbered** heading: `\section*{Overview}`. Unnumbered sections are not included in the Table of Contents by default.

#### Automated Table of Contents
Issuing `\tableofcontents` instructs LaTeX to scan the structural hierarchy and generate a clean, dotted-leader Table of Contents with precise page numbers.
Because LaTeX reads the document sequentially, you must compile your `.tex` file **twice** whenever section titles or page positions change so LaTeX can resolve the cross-page numbers accurately.

---

### 3. Khmer Explanation (ការពន្យល់ជាភាសាខ្មែរ)
LaTeX មានប្រព័ន្ធបែងចែករចនាសម្ព័ន្ធឯកសារយ៉ាងមានរបៀបរៀបរយ ដែលជួយផ្ដល់លេខកូដជំពូក និងផ្នែកដោយស្វ័យប្រវត្តិ៖

- `\chapter{...}`៖ ជំពូកធំ (ប្រើបានសម្រាប់តែប្រភេទ `report` និង `book` ប៉ុណ្ណោះ)។
- `\section{...}`៖ ចំណងជើងផ្នែកធំ (ឧទាហរណ៍៖ **1**, **2**, **3**...)។
- `\subsection{...}`៖ ចំណងជើងរងកម្រិតទី ២ (ឧទាហរណ៍៖ **1.1**, **1.2**...)។
- `\subsubsection{...}`៖ ចំណងជើងរងកម្រិតទី ៣ (ឧទាហរណ៍៖ **1.1.1**, **1.1.2**...)។

#### ការបង្កើតមាតិកាស្វ័យប្រវត្តិ (Table of Contents)
គ្រាន់តែសរសេរពាក្យបញ្ជា `\tableofcontents` នៅកន្លែងដែលអ្នកចង់បង្ហាញមាតិកា នោះ LaTeX នឹងប្រមូលចំណងជើងទាំងអស់មកបង្កើតជាទំព័រមាតិកាប្រកបដោយរបៀបរៀបរយ និងភ្ជាប់លេខទំព័រត្រឹមត្រូវ ១០០% ដោយស្វ័យប្រវត្តិ។

[IMPORTANT]
នៅពេលបន្ថែមជំពូកថ្មី ឬប្ដូរចំណងជើង អ្នកត្រូវចុច **Recompile ចំនួន ២ ដង** ដើម្បីឱ្យ LaTeX អាចទាញយកលេខទំព័រចុងក្រោយមកដាក់ក្នុងតារាងមាតិកាបានត្រឹមត្រូវ។

---

### 4. Code Example: Complete Structured Article
```latex
\documentclass[12pt, a4paper]{article}
\usepackage[utf8]{inputenc}
\usepackage{hyperref} % Enables clickable links in Table of Contents

\title{A Comprehensive Study on Renewable Energy}
\author{Panha Rath}
\date{\today}

\begin{document}

\maketitle

\tableofcontents
\newpage

\section{Introduction}
Renewable energy sources have garnered significant global attention over the past 
three decades due to climate change challenges.

\subsection{Historical Background}
Early energy production relied primarily on combustible biomass and coal.

\subsection{Global Trends}
Modern investments prioritize wind, solar photovoltaics, and hydroelectric systems.

\section{Methodology}
This section outlines the experimental framework and simulation parameters.

\subsection{Data Collection}
Field sensors recorded solar irradiance across 12 meteorological stations.

\subsubsection{Sensor Calibration}
High-precision pyranometers were calibrated prior to data acquisition.

\section*{Acknowledgments}
The authors express sincere gratitude to the Ministry of Environment for funding support.

\end{document}
```

---

### 5. Line-by-Line Breakdown
- `\usepackage{hyperref}`: Converts your Table of Contents entries and cross-references into clickable hyperlinks inside the PDF.
- `\tableofcontents`: Instructs the engine to compile and insert the table of contents.
- `\newpage`: Forces a hard page break so the first section starts cleanly on page 2.
- `\section{...}`, `\subsection{...}`, `\subsubsection{...}`: Automatically numbered sequentially (1, 1.1, 1.2, 2, 2.1, 2.1.1).
- `\section*{Acknowledgments}`: The `*` creates an unnumbered section ideal for prefaces, abstracts, or acknowledgments.

---

### 6. Expected Output
- **Page 1**: Document Title, Author, Date, followed by an elegant **Contents** listing with section titles, dotted leader lines, and page numbers.
- **Page 2**:
  - **1 Introduction**
  - **1.1 Historical Background**
  - **1.2 Global Trends**
  - **2 Methodology**
  - **2.1 Data Collection**
  - **2.1.1 Sensor Calibration**
  - **Acknowledgments** (Unnumbered heading)

---

### 7. Exercises / លំហាត់អនុវត្ត
1. Convert the example document class from `article` to `report`. Add two chapters (`\chapter{Literature Review}` and `\chapter{Experimental Results}`). Compile and inspect the visual difference.
2. Experiment with page numbering styles: insert `\pagenumbering{roman}` before `\tableofcontents`, and `\pagenumbering{arabic}` after `\newpage` at the start of Chapter 1.

---
---

# Chapter 6: Lists
## ជំពូកទី ៦: ការបង្កើតបញ្ជី (Lists)

### 1. Learning Objectives / គោលបំណងមេរៀន
By the end of this chapter, you will be able to:
- Construct unordered bulleted lists using the `itemize` environment.
- Construct numbered ordered lists using the `enumerate` environment.
- Construct glossary and dictionary lists using the `description` environment.
- Nest multi-level lists up to four levels deep.
- Customize bullets, numbers, and indentation spacing using the `enumitem` package.

---

### 2. English Explanation
LaTeX provides three fundamental list environments:
1. `itemize`: For unordered lists with bullets.
2. `enumerate`: For sequential numbered or lettered lists.
3. `description`: For key-value terms, glossaries, and definitions.

Each item in a list is declared using the `\item` command.

#### Customizing Lists with `enumitem`
The modern, recommended package for controlling list spacing, bullet shapes, and numbering styles is `enumitem`:
```latex
\usepackage{enumitem}
```
With `enumitem`, you can easily customize list indicators:
- `\begin{enumerate}[label=\alph*)]` produces a), b), c)...
- `\begin{enumerate}[label=(\roman*)]` produces (i), (ii), (iii)...
- `\begin{itemize}[label=$\star$]` produces custom star bullets.
- Add `noitemsep` to remove vertical blank gaps between items for compact lists.

---

### 3. Khmer Explanation (ការពន្យល់ជាភាសាខ្មែរ)
ការរៀបចំបញ្ជីចំណុចក្នុង LaTeX មាន ៣ ប្រភេទចម្បង៖
1. `itemize`៖ ប្រើសម្រាប់បញ្ជីចំណុចដែលមិនមានលេខរៀង (Bullet points)។
2. `enumerate`៖ ប្រើសម្រាប់បញ្ជីដែលមានលេខរៀងតាមលំដាប់លំដោយ (1, 2, 3... ឬ a, b, c...)។
3. `description`៖ ប្រើសម្រាប់បញ្ជីពាក្យគន្លឹះ និងការពន្យល់ន័យ (Term and Definition)។

រាល់ចំណុចនីមួយៗត្រូវផ្ដើមដោយពាក្យបញ្ជា `\item`។

[TIP]
ដើម្បីប្ដូរទម្រង់លេខរៀង ឬបន្ថយគម្លាតរវាងចំណុចនីមួយៗឱ្យកាន់តែស្អាត សូមប្រើប្រាស់កញ្ចប់ `\usepackage{enumitem}` នៅក្នុង Preamble។

---

### 4. Code Example: All List Types & Nested Lists
```latex
\documentclass[12pt, a4paper]{article}
\usepackage[utf8]{inputenc}
\usepackage{enumitem} % Advanced list customization

\begin{document}

\section{Standard Bulleted List (Itemize)}
Essential skills for modern software engineers:
\begin{itemize}
    \item Version control with Git and GitHub
    \item Data structures and algorithm design
    \item Linux command line mastery
    \item Typesetting technical reports with LaTeX
\end{itemize}

\section{Nested Numbered List (Enumerate)}
Step-by-step scientific research protocol:
\begin{enumerate}
    \item Formulate research hypothesis
    \item Conduct experiments
    \begin{enumerate}[label=\alph*)]
        \item Prepare laboratory equipment
        \item Record baseline observations
        \item Execute treatment runs
    \end{enumerate}
    \item Analyze statistical data
    \item Publish findings in peer-reviewed journal
\end{enumerate}

\section{Term Description List}
\begin{description}
    \item[Compiler] A software program translating human-readable source code into machine code or PDF.
    \item[Preamble] The configuration section of a LaTeX file preceding the document body.
    \item[Macro] A reusable command shortcut defined to save typing and ensure consistency.
\end{description}

\section{Compact List with Custom Icons}
\begin{itemize}[label=$\bullet$, noitemsep]
    \item Compact entry one
    \item Compact entry two
    \item Compact entry three
\end{itemize}

\end{document}
```

---

### 5. Line-by-Line Breakdown
- `\begin{itemize} ... \end{itemize}`: Instantiates an unordered bullet list.
- `\item`: Declares a new bullet entry.
- `\begin{enumerate}[label=\alph*)]`: Uses `enumitem` to format nested items as a), b), c) instead of default Roman numerals.
- `\begin{description}`: Begins a key-definition list.
- `\item[Compiler]`: Declares the term "Compiler" in bold, followed immediately by its descriptive body.
- `noitemsep`: Compresses vertical padding between list items for tighter layout.

---

### 6. Expected Output
- A clean bulleted list with circular discs ($\bullet$).
- A two-level numbered list: Main items marked 1., 2., 3., 4.; nested items marked a), b), c).
- A description block where terms appear in bold followed by their explanation text.
- A compact list with zero extraneous blank space between entries.

---

### 7. Common Mistakes / កំហុសទូទៅ
[WARNING]
- Writing plain text directly inside `\begin{itemize}` without putting `\item` first. This triggers the error: `LaTeX Error: Something's wrong--perhaps a missing \item`.
- Nesting lists more than 4 levels deep without custom packages (standard LaTeX supports a maximum of 4 nested list levels).

---

### 8. Exercises / លំហាត់អនុវត្ត
1. Create an `enumerate` list showing your weekly university study schedule from Monday to Friday.
2. Inside each day, nest an `itemize` list displaying the specific subjects you study.
3. Build a `description` list defining five core computer science or mathematics terms in both English and Khmer.

---
---

# Chapter 7: Tables & Professional Tabulars
## ជំពូកទី ៧: ការបង្កើតតារាង និងតារាងវិជ្ជាជីវៈកម្រិតស្តង់ដារ

### 1. Learning Objectives / គោលបំណងមេរៀន
By the end of this chapter, you will be able to:
- Construct basic tables using the `tabular` environment.
- Master column specifiers (`l`, `c`, `r`, `p{width}`).
- Distinguish between the inline `tabular` environment and the floating `table` environment.
- Add titles (`\caption`) and cross-referencing labels (`\label`).
- Create high-impact, publication-grade academic tables using the `booktabs` package.

---

### 2. English Explanation
In LaTeX, tables are built using two complementary concepts:
1. **The `tabular` environment**: The grid engine that aligns data in rows and columns.
2. **The `table` environment**: A "floating wrapper" that prevents page-break disruption, centers the table, and provides an official numbered caption (`Table 1: ...`).

#### Column Specifiers in `tabular`
Inside `\begin{tabular}{specifiers}`:
- `l`: Left-aligned column.
- `c`: Centered column.
- `r`: Right-aligned column (ideal for numeric data).
- `p{3cm}`: Fixed-width paragraph column (automatically wraps long text across multiple lines).
- `|`: Draws a vertical dividing line between columns.

#### Table Syntax Markers
- Columns are separated by the ampersand symbol: `&`.
- Rows are terminated by a double backslash: `\\`.
- Horizontal lines are drawn using `\hline` (or `booktabs` commands).

#### Professional Academic Tables with `booktabs`
[IMPORTANT]
Top academic journals (e.g., IEEE, Nature, Springer) strictly discourage vertical lines (`|`) and excessive gridlines in tables. Instead, modern typography relies on the `booktabs` package, which provides:
- `\toprule`: Heavy line at the top of the table.
- `\midrule`: Dividing line separating table headers from data rows.
- `\bottomrule`: Heavy line at the bottom of the table.

---

### 3. Khmer Explanation (ការពន្យល់ជាភាសាខ្មែរ)
ការបង្កើតតារាងក្នុង LaTeX ត្រូវបានបែងចែកជាពីរចំណុចសំខាន់៖
1. **`tabular`**៖ គឺជាកូដសម្រាប់កំណត់ចំនួនជួរឈរ (Columns) និងជួរដេក (Rows) ព្រមទាំងការតម្រឹមទិន្នន័យ (ឆ្វេង កណ្ដាល ឬស្ដាំ)។
2. **`table`**៖ គឺជាប្រអប់អណ្ដែត (Float environment) ដែលជួយដាក់តារាងនៅកណ្ដាលទំព័រ និងផ្ដល់ចំណងជើងស្វ័យប្រវត្តិតាមលំដាប់ (`Table 1: ...`, `Table 2: ...`)។

#### និមិត្តសញ្ញាគ្រឹះក្នុងតារាង
- សញ្ញា `&`៖ ប្រើសម្រាប់ខណ្ឌចែកជួរឈរនីមួយៗ (Column separator)។
- សញ្ញា `\\`៖ ប្រើសម្រាប់ចុះបន្ទាត់ជួរដេកថ្មី (End of row)។
- សញ្ញា `\hline`៖ គូសបន្ទាត់ដេក។

#### គន្លឹះរៀបចំតារាងបែបអាជីពកម្រិតអន្តរជាតិ (Booktabs)
នៅក្នុងទស្សនាវដ្ដីវិទ្យាសាស្ត្រ និងសារណាបញ្ចប់ការសិក្សា គេកម្រប្រើបន្ទាត់ឈរ (`|`) ណាស់ ព្រោះវាធ្វើឱ្យតារាងមើលទៅចង្អៀត និងពិបាកអាន។ គេនិយមប្រើប្រាស់កញ្ចប់ `\usepackage{booktabs}` ដែលផ្ដល់បន្ទាត់ដេកយ៉ាងស្រស់ស្អាត៖
- `\toprule` (បន្ទាត់ខាងលើបង្អស់)
- `\midrule` (បន្ទាត់ខណ្ឌក្បាលតារាង)
- `\bottomrule` (បន្ទាត់បិទខាងក្រោម)

---

### 4. Code Example: Basic vs. Professional Academic Table
```latex
\documentclass[12pt, a4paper]{article}
\usepackage[utf8]{inputenc}
\usepackage{booktabs} % Essential for publication-quality tables

\begin{document}

\section{Experimental Results}

Table~\ref{tab:benchmarks} summarizes the benchmark performance across four algorithms.

\begin{table}[htbp]
    \centering
    \caption{Performance Comparison of Optimization Algorithms}
    \label{tab:benchmarks}
    \begin{tabular}{llrrr}
        \toprule
        \textbf{Algorithm} & \textbf{Category} & \textbf{Iterations} & \textbf{Time (ms)} & \textbf{Accuracy (\%)} \\
        \midrule
        Gradient Descent    & First-order       & 1,200               & 45.2               & 94.8 \\
        Adam                & Adaptive          & 450                 & 18.6               & 98.2 \\
        RMSprop             & Adaptive          & 520                 & 21.3               & 97.5 \\
        L-BFGS              & Quasi-Newton      & 180                 & 62.4               & 99.1 \\
        \bottomrule
    \end{tabular}
\end{table}

\end{document}
```

---

### 5. Line-by-Line Breakdown
- `\begin{table}[htbp]`: Declares a floating table with positioning preference:
  - `h` = here (if space allows)
  - `t` = top of page
  - `b` = bottom of page
  - `p` = on a dedicated page of floats
- `\centering`: Centers the table horizontally on the page.
- `\caption{...}`: Prints the numbered caption: **Table 1: Performance Comparison of Optimization Algorithms**.
- `\label{tab:benchmarks}`: Creates an internal anchor allowing the text to reference `Table~\ref{tab:benchmarks}`.
- `\begin{tabular}{llrrr}`: Creates 5 columns: the first two left-aligned (`l`), and the last three right-aligned (`r`) for clean numeric alignment.
- `\toprule`, `\midrule`, `\bottomrule`: Draws horizontal lines with balanced typographic thickness and vertical spacing.

---

### 6. Expected Output
The compiled PDF displays:
- A text sentence referencing Table 1.
- A centered, publication-grade academic table with:
  - Bold headers cleanly separated from numeric data rows.
  - Right-aligned numerical columns where decimal places and comma separators align neatly.
  - Zero cluttered vertical lines, creating an open, modern aesthetic.

---

### 7. Common Mistakes / កំហុសទូទៅ
[WARNING]
- **Mismatched column counts**: If you declare `{l c r}` (3 columns), but put 4 values separated by 3 ampersands on a row (`A & B & C & D \\`), LaTeX will error with: `Extra alignment tab has been converted to \cr`.
- **Placing `\label` before `\caption`**: Always place `\label` **after** `\caption` (or inside the caption argument). If placed before, `\ref` will erroneously pick up the current section number instead of the table number!

---

### 8. Exercises / លំហាត់អនុវត្ត
1. Typeset a grade report table containing 4 columns: Course Code, Course Title, Credits, and Grade, using `booktabs`.
2. Experiment with text wrapping: Create a 3-column table where the third column is declared as `p{6cm}` containing a long paragraph of text. Observe how LaTeX automatically wraps lines within that cell.
3. Reference your table in a sentence using `Table~\ref{...}` and verify the number in the compiled PDF.

---

### 9. Chapter Summary / សង្ខេបជំពូក
- Use `\textbf{...}`, `\textit{...}`, and `\texttt{...}` for semantic font styling.
- Structure documents hierarchically using `\section`, `\subsection`, and generate Table of Contents with `\tableofcontents`.
- Use `itemize` for bullets, `enumerate` for numbered lists, and `enumitem` for custom spacing and labels.
- Build clean, publishable tables using `booktabs` (`\toprule`, `\midrule`, `\bottomrule`) without vertical lines.
