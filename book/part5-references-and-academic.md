# PART 5 — References and Academic Writing
## ផ្នែកទី ៥ — ការភ្ជាប់យោង និងការសរសេរឯកសារស្រាវជ្រាវ

---

# Chapter 13: Cross-References
## ជំពូកទី ១៣: ការភ្ជាប់យោងខាងក្នុង (Cross-References)

### 1. Learning Objectives / គោលបំណងមេរៀន
By the end of this chapter, you will be able to:
- Understand the automated two-pass compilation mechanism of LaTeX cross-referencing.
- Apply consistent labeling naming conventions (`sec:`, `fig:`, `tab:`, `eq:`, `thm:`).
- Reference sections, figures, tables, and equations without hardcoding numbers.
- Print page locations dynamically using `\pageref`.
- Automate noun labels using the modern `cleveref` package.
- Make all references clickable in PDF readers using `hyperref`.

---

### 2. English Explanation
In a word processor, if you delete Section 2 or insert a new table, you must manually hunt through your entire manuscript to renumber "Figure 4" to "Figure 5" and update every mention in the body text. In LaTeX, **hardcoding numbers is strictly forbidden**. Every structural element receives a programmatic `\label{key}`, and is cited dynamically via `\ref{key}` or `\eqref{key}`.

#### 1. Label Naming Conventions
Always prefix your label keys logically to prevent accidental collisions in large books:
- `sec:intro` — For sections and subsections
- `fig:loss_curve` — For figures and graphics
- `tab:accuracy` — For tables
- `eq:schrodinger` — For mathematical equations
- `thm:pythagoras` — For theorems and lemmas

#### 2. How the Two-Pass Compiler Works
1. **Pass 1 (`pdflatex`)**: LaTeX scans the document, generates the structural numbering, and records all labels and page numbers into an auxiliary file (`document.aux`). References appear as `??`.
2. **Pass 2 (`pdflatex`)**: LaTeX reads `document.aux` and substitutes every `\ref{key}` with the resolved integer number.

#### 3. Hyperlinks with `hyperref`
Importing `\usepackage{hyperref}` turns every citation, table of contents entry, and `\ref` into a vibrant, clickable navigation link in your PDF:
```latex
\usepackage[colorlinks=true, linkcolor=blue, citecolor=magenta, urlcolor=teal]{hyperref}
```

#### 4. Smart References with `cleveref`
Instead of repeatedly typing `Figure~\ref{fig:model}` or `Table~\ref{tab:data}`, load `cleveref`:
```latex
\usepackage{cleveref}
```
Now, writing `\cref{fig:model}` automatically typesets **Figure 1**, and `\cref{fig:a,fig:b}` typesets **Figures 1 and 2**!

---

### 3. Khmer Explanation (ការពន្យល់ជាភាសាខ្មែរ)
នៅក្នុងកម្មវិធីសរសេរទូទៅ ប្រសិនបើអ្នកបន្ថែម ឬលុបរូបភាពណាមួយ អ្នកត្រូវចំណាយពេលដើរកែប្រែលេខសម្គាល់រូបភាព និងអត្ថបទយោងតាមទំព័រនានាដោយដៃ។ នៅក្នុង LaTeX **យើងមិនដែលសរសេរលេខរៀងដោយដៃឡើយ**។

LaTeX ប្រើប្រព័ន្ធភ្ជាប់យោងស្វ័យប្រវត្តិ (Automated Cross-Referencing)៖
1. **ដាក់ស្លាកសម្គាល់ (`\label{...}`)**៖ ដាក់នៅក្រោមចំណងជើងផ្នែក រូបភាព តារាង ឬសមីការ។
2. **ហៅយោងក្នុងអត្ថបទ (`\ref{...}` ឬ `\eqref{...}`)**៖ នៅពេលសរសេរអត្ថបទ គ្រាន់តែហៅឈ្មោះស្លាកនោះ នោះ LaTeX នឹងទាញយកលេខរៀងមកបង្ហាញដោយស្វ័យប្រវត្តិ។

#### ស្តង់ដារកំណត់ឈ្មោះស្លាក (Naming Conventions)
- ផ្នែក/ជំពូក៖ `\label{sec:ឈ្មោះ}`
- រូបភាព៖ `\label{fig:ឈ្មោះ}`
- តារាង៖ `\label{tab:ឈ្មោះ}`
- សមីការ៖ `\label{eq:ឈ្មោះ}`

[IMPORTANT]
ត្រូវចងចាំថា នៅពេលអ្នកបង្កើតស្លាកយោងថ្មី អ្នកត្រូវចុច **Compile ចំនួន ២ ដង** ដើម្បីឱ្យ LaTeX កត់ត្រាលេខរៀងចូលក្នុង file `.aux` រួចទើបបំប្លែងសញ្ញា `??` ទៅជាលេខពិតប្រាកដ។

---

### 4. Code Example: Dynamic Cross-Referencing with `hyperref`
```latex
\documentclass[12pt, a4paper]{article}
\usepackage[utf8]{inputenc}
\usepackage{amsmath}
\usepackage{graphicx}
\usepackage{booktabs}
\usepackage[colorlinks=true, linkcolor=blue, urlcolor=cyan]{hyperref}
\usepackage[capitalize]{cleveref}

\begin{document}

\section{Introduction}
\label{sec:introduction}

In this document, we investigate machine learning metrics. 
As introduced in \cref{sec:introduction}, foundational concepts are defined early. 
Detailed experimental outcomes appear in \cref{tab:results} on page~\pageref{tab:results}.

\section{Mathematical Formulation}
\label{sec:math}

The optimization loss is defined in \cref{eq:loss}:
\begin{equation}
    \mathcal{L}(\theta) = \frac{1}{N} \sum_{i=1}^N (y_i - f(x_i; \theta))^2 + \lambda \|\theta\|^2
    \label{eq:loss}
\end{equation}

By minimizing \cref{eq:loss}, the parameters converge to global stability.

\section{Empirical Evaluation}
\label{sec:evaluation}

\begin{table}[htbp]
    \centering
    \caption{Empirical error rates across test folds}
    \label{tab:results}
    \begin{tabular}{lrr}
        \toprule
        \textbf{Fold Index} & \textbf{Mean Squared Error} & \textbf{Latency (s)} \\
        \midrule
        Fold 1 & 0.042 & 1.25 \\
        Fold 2 & 0.038 & 1.18 \\
        Fold 3 & 0.039 & 1.20 \\
        \bottomrule
    \end{tabular}
\end{table}

\end{document}
```

---

### 5. Line-by-Line Breakdown
- `\usepackage{hyperref}`: Converts cross-references and external web links into interactive, clickable PDF hyperlinks.
- `\usepackage[capitalize]{cleveref}`: Automates context-aware capitalization ("Section", "Equation", "Table").
- `\label{sec:introduction}`: Anchors Section 1.
- `\cref{sec:introduction}`: Automatically outputs "Section 1" as a clickable blue hyperlink.
- `page~\pageref{tab:results}`: Prints the exact page number where Table 1 resides. If the table shifts to another page, this page number updates dynamically.
- `\label{eq:loss}`: Anchors equation (1).
- `\cref{eq:loss}`: Evaluates to "Equation (1)".

---

### 6. Expected Output
- Seamlessly numbered cross-references throughout the text.
- Every reference (Section 1, Table 1, Equation (1), page 1) is rendered in bright blue font.
- Clicking on "Equation (1)" in Adobe Acrobat or any web browser smoothly jumps the viewer directly to that formula.

---

### 7. Exercises / លំហាត់អនុវត្ត
1. Create a 3-section document. In Section 3, insert a sentence referencing Section 1 and Section 2 simultaneously using `\cref{sec:one,sec:two}`.
2. Add a figure with a label, and reference both its figure number and its page number using `\ref` and `\pageref`.

---
---

# Chapter 14: Citations and Bibliography
## ជំពូកទី ១៤: ការស្រាវជ្រាវ និងការគ្រប់គ្រងឯកសារយោង (BibTeX & BibLaTeX)

### 1. Learning Objectives / គោលបំណងមេរៀន
By the end of this chapter, you will be able to:
- Distinguish between traditional BibTeX and modern `biblatex` with the `biber` backend.
- Author standard `.bib` database files containing articles, books, conference proceedings, and websites.
- Format author names accurately according to international bib-parsing standards.
- Execute in-text citations (`\cite`, `\parencite`, `\textcite`).
- Switch effortlessly between citation styles (APA, IEEE numeric, Chicago author-year).

---

### 2. English Explanation
Academic research integrity relies on citing prior literature. In LaTeX, bibliographic records are cleanly separated from document presentation into a database file with the `.bib` extension.

#### Modern Standard: `biblatex` + `biber`
Historically, TeX used an 8-bit program called `bibtex`. Today, the worldwide academic standard is `biblatex` powered by the modern Unicode-compliant `biber` compilation engine:
```latex
\usepackage[style=apa, backend=biber]{biblatex}
\addbibresource{references.bib}
```
Common citation styles:
- `style=numeric` (Standard in Computer Science, Mathematics, Physics; e.g., `[1]`)
- `style=ieee` (Official IEEE conference and transaction format)
- `style=apa` (Standard in Social Sciences, Psychology, Education; e.g., `(Turing, 1950)`)
- `style=alphabetic` (e.g., `[Tur50]`)

#### Anatomy of a `.bib` Entry
```bibtex
@article{turing1950computing,
    author  = {Turing, Alan M.},
    title   = {Computing Machinery and Intelligence},
    journal = {Mind},
    volume  = {59},
    number  = {236},
    pages   = {433--460},
    year    = {1950},
    publisher = {Oxford University Press}
}

@book{knuth1984texbook,
    author    = {Knuth, Donald E.},
    title     = {The {\TeX}book},
    year      = {1984},
    publisher = {Addison-Wesley},
    address   = {Reading, Massachusetts}
}
```

[IMPORTANT]
Always format author names as: `Lastname, Firstname and Lastname, Firstname`. Use the English keyword `and` to separate multiple authors. Never use commas to separate multiple authors!

#### In-Text Citation Commands
- `\cite{key}`: Standard citation (e.g., `[1]` or `Turing 1950`).
- `\parencite{key}`: Enclosed in parentheses (e.g., `(Turing, 1950)`).
- `\textcite{key}`: Integrated into sentence prose (e.g., *"As demonstrated by Turing (1950)..."*).

---

### 3. Khmer Explanation (ការពន្យល់ជាភាសាខ្មែរ)
ការរៀបចំឯកសារយោង (References / Bibliography) គឺជាកិច្ចការស្មុគស្មាញបំផុតក្នុងការសរសេរសារណា ឬអត្ថបទស្រាវជ្រាវ ប្រសិនបើប្រើកម្មវិធី Word។ ប៉ុន្តែក្នុង LaTeX កិច្ចការនេះក្លាយជាការងារស្វ័យប្រវត្តិ ១០០%។

#### របៀបដំណើរការ៖
1. យើងបង្កើតឯកសារទិន្នន័យមួយឈ្មោះ `references.bib`។ ឯកសារនេះទុកព័ត៌មានអំពីសៀវភៅ ឬអត្ថបទស្រាវជ្រាវ (អ្នកនិពន្ធ ឆ្នាំបោះពុម្ព ចំណងជើង រោងពុម្ព...)។
2. ក្នុងឯកសារអត្ថបទ `.tex` យើងគ្រាន់តែហៅឈ្មោះកូដកាត់ ដូចជា `\cite{turing1950}` ឬ `\textcite{knuth1984}`។
3. នៅចុងបញ្ចប់នៃឯកសារ យើងសរសេរតែមួយបន្ទាត់គត់គឺ `\printbibliography` នោះ LaTeX នឹងប្រមូលឯកសារទាំងអស់ដែលយើងបាន cite ក្នុងអត្ថបទ មកតម្រៀបតាមលំដាប់អក្ខរក្រម (A-Z) ឬតាមលេខរៀង (1, 2, 3...) យ៉ាងត្រឹមត្រូវឥតខ្ចោះតាមស្តង់ដារអន្តរជាតិ (APA ឬ IEEE)។

---

### 4. Code Example: Complete Academic Document with BibLaTeX
Save your references in `references.bib`:
```bibtex
@article{vaswani2017attention,
    author    = {Vaswani, Ashish and Shazeer, Noam and Parmar, Niki and Uszkoreit, Jakob and Jones, Llion and Gomez, Aidan N. and Kaiser, {\L}ukasz and Polosukhin, Illia},
    title     = {Attention Is All You Need},
    journal   = {Advances in Neural Information Processing Systems},
    volume    = {30},
    year      = {2017}
}

@book{goodfellow2016deep,
    author    = {Goodfellow, Ian and Bengio, Yoshua and Courville, Aaron},
    title     = {Deep Learning},
    publisher = {MIT Press},
    year      = {2016}
}
```

Now, write your document in `paper.tex`:
```latex
\documentclass[12pt, a4paper]{article}
\usepackage[utf8]{inputenc}
\usepackage[style=numeric, sorting=none, backend=biber]{biblatex}
\usepackage[colorlinks=true, citecolor=teal]{hyperref}

% Link the external .bib database
\addbibresource{references.bib}

\title{Advances in Deep Sequence Modeling}
\author{Sokunthea Keo}
\date{\today}

\begin{document}

\maketitle

\section{Introduction}
Deep learning architectures have revolutionized artificial intelligence and natural 
language processing over the last decade~\cite{goodfellow2016deep}. 
The introduction of the Transformer architecture by \textcite{vaswani2017attention} 
eliminated recurrence in favor of self-attention mechanisms.

Subsequent empirical studies verified that Transformers scale effectively with massive compute 
and dataset volume~\cite{vaswani2017attention, goodfellow2016deep}.

% Print formatted bibliography automatically
\printbibliography[title={References}]

\end{document}
```

---

### 5. Line-by-Line Breakdown
- `\usepackage[style=numeric, sorting=none, backend=biber]{biblatex}`: Selects numeric bracket style `[1]`, sorted in order of appearance in the text.
- `\addbibresource{references.bib}`: Registers the database.
- `\cite{goodfellow2016deep}`: Produces numeric citation `[1]`.
- `\textcite{vaswani2017attention}`: Inlines the authors' names: *"Vaswani et al. [2]"*.
- `\printbibliography[title={References}]`: Generates the complete, alphabetized, and standardized references section at the bottom of the paper.

#### Modern Compilation Sequence
To compile a document with citations locally in terminal:
```bash
pdflatex paper
biber paper
pdflatex paper
pdflatex paper
```
*(On Overleaf, this four-step sequence is executed automatically whenever you click Recompile!)*

---

### 6. Exercises / លំហាត់អនុវត្ត
1. Find three real research papers on Google Scholar in your area of study. Click **Cite** -> **BibTeX** and copy their entries into your `references.bib` file.
2. Cite all three papers in an introductory paragraph using `\textcite` and `\cite`.
3. Change `style=numeric` to `style=apa` in your `biblatex` options. Recompile and observe how references immediately transform into author-year format `(Author, Year)` without changing a single line of your body text!

---
---

# Chapter 15: Writing Academic Documents
## ជំពូកទី ១៥: ការរៀបចំឯកសារសិក្សា សារណា និងអត្ថបទស្រាវជ្រាវ

### 1. Learning Objectives / គោលបំណងមេរៀន
By the end of this chapter, you will be able to:
- Structure multi-chapter graduation theses and major academic reports.
- Implement the formal three-tier document division: **Front Matter**, **Main Matter**, and **Back Matter**.
- Design university title pages, abstracts, author declarations, and acknowledgments.
- Create automated lists of figures (`\listoffigures`) and tables (`\listoftables`).
- Include supplementary appendices with customized numbering (`Appendix A`, `Appendix B`).

---

### 2. English Explanation
High-stakes academic manuscripts—such as Master's theses, doctoral dissertations, and technical institute reports—must follow stringent institutional typography guidelines.

#### The Three-Part Academic Manuscript Architecture
The `book` and `report` classes provide native architectural macros for dividing large manuscripts:
1. **Front Matter (`\frontmatter`)**:
   - Title page, Abstract, Acknowledgments, Declaration of originality.
   - Table of contents, List of figures, List of tables.
   - Page numbers typeset in lowercase Roman numerals (`i, ii, iii, iv...`).
2. **Main Matter (`\mainmatter`)**:
   - The primary technical chapters (Introduction, Literature Review, Methodology, Results, Discussion, Conclusion).
   - Page counter resets automatically to Arabic numeral `1, 2, 3...`.
3. **Back Matter (`\backmatter`)**:
   - Appendices (`\appendix`), Bibliography, Glossary, Index.
   - Numbering remains unnumbered or letter-based (`A.1, B.1`).

```
+-------------------------------------------------------------+
| FRONT MATTER (\frontmatter)                                 |
| - Title Page / Signature Approvals                          |
| - Abstract & Acknowledgments                                |
| - Table of Contents, Lists of Figures & Tables              |
| -> Roman Numerals: i, ii, iii...                            |
+-------------------------------------------------------------+
| MAIN MATTER (\mainmatter)                                   |
| - Chapter 1: Introduction                                   |
| - Chapter 2: Literature Review                              |
| - Chapter 3: Methodology & Experimental Design              |
| - Chapter 4: Results & Evaluation                           |
| - Chapter 5: Conclusion & Future Scope                      |
| -> Arabic Numerals: 1, 2, 3, 4...                           |
+-------------------------------------------------------------+
| BACK MATTER (\backmatter & \appendix)                       |
| - Appendix A: Extended Proofs & Code                        |
| - References & Bibliography                                 |
+-------------------------------------------------------------+
```

---

### 3. Khmer Explanation (ការពន្យល់ជាភាសាខ្មែរ)
ការរៀបចំសារណាបញ្ចប់ការសិក្សាថ្នាក់បរិញ្ញាបត្រ ឬអនុបណ្ឌិត (Thesis/Dissertation) ទាមទាររចនាសម្ព័ន្ធស្ដង់ដារចំនួន ៣ ផ្នែក៖

1. **Front Matter (ផ្នែកក្បាលឯកសារ)**៖
   - ទំព័រក្របមុខ, ទំព័របញ្ជាក់ពីគណៈកម្មការ, មូលន័យសង្ខេប (Abstract), និងទំព័រថ្លែងអំណរគុណ។
   - តារាងមាតិកា (Table of Contents), បញ្ជីរូបភាព (`\listoffigures`), និងបញ្ជីតារាង (`\listoftables`)។
   - ទំព័រទាំងអស់ក្នុងផ្នែកនេះត្រូវបានផ្ដល់លេខជាអក្សររ៉ូម៉ាំងតូច (`i, ii, iii, iv...`) ដោយស្វ័យប្រវត្តិ។
2. **Main Matter (ផ្នែកតួសេចក្ដីចម្បង)**៖
   - ជំពូកទី ១ សេចក្តីផ្តើម រហូតដល់ជំពូកបញ្ចប់។
   - លេខទំព័រចាប់ផ្ដើមរាប់ពីលេខ **1, 2, 3...** ឡើងវិញដោយស្វ័យប្រវត្តិ។
3. **Back Matter (ផ្នែកកន្ទុយឯកសារ)**៖
   - ឧបសម្ព័ន្ធ (Appendix A, B), បញ្ជីឯកសារយោង (Bibliography) និងជីវប្រវត្តិសង្ខេប។

---

### 4. Code Example: Complete Multi-Chapter Thesis Scaffold
```latex
\documentclass[12pt, a4paper, twoside]{book}
\usepackage[utf8]{inputenc}
\usepackage{amsmath, amssymb}
\usepackage{graphicx}
\usepackage{booktabs}
\usepackage[style=ieee, backend=biber]{biblatex}
\usepackage[colorlinks=true, linkcolor=black, citecolor=blue]{hyperref}

\begin{document}

% ---------------- FRONT MATTER ----------------
\frontmatter

\begin{titlepage}
    \centering
    \vspace*{1.5cm}
    {\Huge \bfseries Autonomous Navigation in GPS-Denied Environments\par}
    \vspace{1.5cm}
    {\Large \textbf{Vireak Meas}\par}
    \vspace{0.5cm}
    {\large Supervised by Dr. Elena Rostova\par}
    \vfill
    A thesis submitted in partial fulfillment of the requirements\\
    for the degree of Bachelor of Science in Electrical Engineering\par
    \vspace{1cm}
    Faculty of Engineering\\
    Institute of Technology of Cambodia\\
    \vspace{0.5cm}
    September 2026
\end{titlepage}

\chapter*{Abstract}
Autonomous mobile robotics requires resilient localization in environments where 
satellite signals are degraded or unavailable. This thesis presents a visual-inertial 
odometry framework capable of real-time state estimation on lightweight hardware.

\chapter*{Acknowledgments}
I express my deepest appreciation to my advisor and family for their unwavering encouragement.

\tableofcontents
\listoffigures
\listoftables

% ---------------- MAIN MATTER ----------------
\mainmatter

\chapter{Introduction}
\section{Motivation and Problem Context}
Unmanned aerial and ground vehicles operate extensively in urban canyons, subterranean mines, 
and indoor industrial facilities.

\chapter{Methodology}
\section{Visual-Inertial Fusion Algorithm}
State estimation merges high-rate inertial measurements with optical keypoints.

\chapter{Experimental Results}
\section{Trajectory Error Benchmarks}
Benchmarking demonstrates a 40\% reduction in drift error.

% ---------------- BACK MATTER ----------------
\appendix
\chapter{Hardware Schematics}
Supplementary schematics for the custom flight controller board.

\backmatter
% In a full project: \printbibliography

\end{document}
```

---

### 5. Exercises / លំហាត់អនុវត្ត
1. Compile the thesis scaffold. Notice how `\frontmatter` numbers pages with Roman numerals `i, ii, iii`, and `\mainmatter` resets cleanly to Arabic numeral `1`.
2. Add a sample table to Chapter 2 and verify that it automatically appears in the `\listoftables`.
3. Add a second appendix titled `Source Code Listings` using `\chapter{Source Code Listings}` within the appendix zone.

---

### 6. Chapter Summary / សង្ខេបជំពូក
- Cross-referencing via `\label` and `\ref` guarantees deterministic, error-free numbering across edits.
- Modern academic bibliographies use `biblatex` and `biber` with `.bib` databases, providing painless style switches between APA, IEEE, and Chicago.
- Master theses and dissertations are structured using `\frontmatter`, `\mainmatter`, and `\backmatter` in the `book` or `report` classes.
