# PART 6 — Advanced LaTeX
## ផ្នែកទី ៦ — បច្ចេកទេសកម្រិតខ្ពស់ក្នុង LaTeX

---

# Chapter 16: Packages & Package Management
## ជំពូកទី ១៦: កញ្ចប់បន្ថែម (Packages) និងការគ្រប់គ្រង Packages

### 1. Learning Objectives / គោលបំណងមេរៀន
By the end of this chapter, you will be able to:
- Understand the role of **CTAN** (The Comprehensive TeX Archive Network) and package ecosystems.
- Import and pass configuration flags to packages using `\usepackage[options]{package}`.
- Identify essential packages across typography, mathematics, graphics, and layout domains.
- Diagnose and resolve package loading order collisions (e.g., `hyperref` loading etiquette).

---

### 2. English Explanation
Base LaTeX is intentionally minimal. Thousands of advanced capabilities—from drawing electrical circuit schematics to typesetting music notation—are provided by **packages** contributed by mathematicians, typographers, and software engineers worldwide via **CTAN** ([ctan.org](https://www.ctan.org)).

#### Package Import Syntax
In the preamble:
```latex
\usepackage[options]{package_name}
```

#### Directory of Indispensable Packages
| Category | Recommended Package | Key Purpose |
| :--- | :--- | :--- |
| **Mathematics** | `amsmath`, `amssymb`, `mathtools` | Advanced equations, matrices, extra symbols |
| **Theorems** | `amsthm` | Rigorous theorem, definition, proof environments |
| **Geometry** | `geometry` | Setting custom margins, paper dimensions, binding offsets |
| **Graphics** | `graphicx` | Image importing, scaling, and rotation |
| **Diagrams** | `tikz` | Programmatic vector drawing and flowcharts |
| **Tables** | `booktabs`, `tabularx`, `multirow` | High-grade professional publication tables |
| **Hyperlinks** | `hyperref` | Interactive PDF hyperlinks, metadata, bookmarks |
| **Code Listings**| `listings` or `minted` | Syntax-highlighted Python, C++, Java source code |
| **Colors** | `xcolor` | Rich RGB, CMYK, and Hex color customization |
| **Headers/Footers**| `fancyhdr` | Custom running headers, chapter breadcrumbs |

[IMPORTANT]
**The `hyperref` Loading Rule**: As a universal rule of thumb, always load `hyperref` as the **last package** in your preamble (with rare exceptions like `cleveref` which must be loaded after `hyperref`). Loading `hyperref` too early causes conflicts with other packages that re-implement internal LaTeX macros.

---

### 3. Khmer Explanation (ការពន្យល់ជាភាសាខ្មែរ)
**Package** គឺជាកញ្ចប់បន្ថែមដែលផ្ដល់មុខងារថ្មីៗ និងការរចនាទម្រង់ប្លែកៗដែលប្រព័ន្ធដើមរបស់ LaTeX មិនទាន់មាន។ បច្ចុប្បន្ន មាន packages ជាង ៦,០០០ លើបណ្ដាញ **CTAN** (The Comprehensive TeX Archive Network)។

#### របៀបប្រើប្រាស់៖
យើងសរសេរ `\usepackage[ជម្រើស]{ឈ្មោះ_package}` នៅក្នុង Preamble (មុន `\begin{document}`)។

#### ច្បាប់មាសនៃការផ្ទុក Packages (Loading Order):
កញ្ចប់ `hyperref` (សម្រាប់បង្កើត link ចុចបានក្នុង PDF) ត្រូវតែ **ដាក់នៅបន្ទាត់ក្រោមគេបង្អស់** ក្នុងចំណោម packages ទាំងអស់ លើកលែងតែ `cleveref` មួយគត់ដែលត្រូវនៅក្រោម `hyperref`។

---

### 4. Exercises / លំហាត់អនុវត្ត
1. Explore [ctan.org](https://www.ctan.org) and search for the `microtype` package. Read its description and explain how it improves text margin protrusion.
2. Construct a preamble importing `geometry`, `amsmath`, `graphicx`, `booktabs`, `xcolor`, and `hyperref` in the correct, conflict-free order.

---
---

# Chapter 17: Custom Commands & Environments
## ជំពូកទី ១៧: ការបង្កើតពាក្យបញ្ជា និងបរិស្ថានផ្ទាល់ខ្លួន (Custom Macros)

### 1. Learning Objectives / គោលបំណងមេរៀន
By the end of this chapter, you will be able to:
- Define shorthand macro commands with `\newcommand` to accelerate authoring speed.
- Build parametrized commands accepting single or multiple input arguments.
- Create commands with optional default parameters.
- Override pre-existing LaTeX macros safely with `\renewcommand`.
- Construct custom environments using `\newenvironment`.

---

### 2. English Explanation
If you find yourself repeatedly typing `\mathbb{R}` or formatting author affiliations over and over, you should define a custom macro. Custom commands make your code cleaner, faster to write, and vastly simpler to modify later.

#### 1. Defining Shorthand Commands
```latex
\newcommand{\name}{definition}
```
*Examples*:
- `\newcommand{\R}{\mathbb{R}}` $\to$ Now typing `\R` outputs $\mathbb{R}$.
- `\newcommand{\norm}[1]{\left\| #1 \right\|}` $\to$ Defines a 1-argument vector norm.

#### 2. Commands with Arguments
The syntax for arguments is:
```latex
\newcommand{\commandname}[number_of_args]{definition using #1, #2, ...}
```
*Example*:
```latex
\newcommand{\innerprod}[2]{\left\langle #1, #2 \right\rangle}
```
Calling `\innerprod{u}{v}` typesets $\langle u, v \rangle$.

#### 3. Defining Custom Environments with `\newenvironment`
```latex
\newenvironment{envname}[num_args]{before_code}{after_code}
```
*Example*:
```latex
\newenvironment{importantbox}
    {\begin{center}\begin{minipage}{0.9\textwidth}\itshape}
    {\end{minipage}\end{center}}
```

---

### 3. Khmer Explanation (ការពន្យល់ជាភាសាខ្មែរ)
នៅពេលយើងសរសេរកូដដដែលៗច្រើនដង LaTeX អនុញ្ញាតឱ្យយើងបង្កើត **ពាក្យបញ្ជាកាត់ (Macro / Shortcut)** ដោយខ្លួនឯងតាមរយៈ `\newcommand`៖

- ចង់សរសេរ `\mathbb{R}` ឱ្យខ្លីត្រឹម `\R`៖
  `\newcommand{\R}{\mathbb{R}}`
- បង្កើតពាក្យបញ្ជាដែលមានអថេរ (Arguments) ដូចជាការគូសប្រអប់ចំណាំ៖
  `\newcommand{\note}[1]{\textbf{ចំណាំ៖} \textit{#1}}`

នៅពេលយើងហៅប្រើ `\note{កុំភ្លេចរក្សាទុកឯកសារ}` នោះវានឹងចេញ៖ **ចំណាំ៖** *កុំភ្លេចរក្សាទុកឯកសារ* ដោយស្វ័យប្រវត្តិ។

---

### 4. Code Example: Custom Commands and Environments
```latex
\documentclass[12pt, a4paper]{article}
\usepackage[utf8]{inputenc}
\usepackage{amsmath, amssymb}
\usepackage{xcolor}

% 1. Simple math shorthands
\newcommand{\R}{\mathbb{R}}
\newcommand{\N}{\mathbb{N}}
\newcommand{\Z}{\mathbb{Z}}

% 2. Parametrized mathematical commands
\newcommand{\norm}[1]{\left\| #1 \right\|}
\newcommand{\inner}[2]{\left\langle #1, #2 \right\rangle}
\newcommand{\deriv}[2]{\frac{d #1}{d #2}}

% 3. Highlighted academic callout environment
\newenvironment{takeaway}
    {\begin{center}
     \begin{minipage}{0.92\textwidth}
     \color{darkgray}
     \rule{\linewidth}{1pt}\par
     \textbf{Key Takeaway:}\space\ignorespaces}
    {\par\rule{\linewidth}{1pt}
     \end{minipage}
     \end{center}}

\begin{document}

\section{Testing Custom Macros}

Let vector $\mathbf{u}, \mathbf{v} \in \R^n$. 
The inner product is denoted by $\inner{\mathbf{u}}{\mathbf{v}}$, 
and the induced Euclidean norm is $\norm{\mathbf{u}} = \sqrt{\inner{\mathbf{u}}{\mathbf{u}}}$.

Computing the instantaneous velocity yields:
\[
    v(t) = \deriv{x}{t}
\]

\begin{takeaway}
Custom macros ensure typographic uniformity throughout large collaborative projects. 
If notation changes from $\langle u, v \rangle$ to $(u, v)$, you only need to change 
one single line in the preamble!
\end{takeaway}

\end{document}
```

---

### 5. Line-by-Line Breakdown
- `\newcommand{\R}{\mathbb{R}}`: Maps `\R` to blackboard bold real numbers.
- `\newcommand{\norm}[1]{\left\| #1 \right\|}`: `[1]` specifies exactly one argument, referenced internally as `#1`.
- `\newcommand{\inner}[2]{...}`: `[2]` specifies two parameters, referenced as `#1` and `#2`.
- `\newenvironment{takeaway}{before}{after}`: Wraps content in a centered 92% width block bounded by subtle horizontal dividing rules (`\rule{\linewidth}{1pt}`).

---

### 6. Exercises / លំហាត់អនុវត្ត
1. Create a custom macro `\vect{x}` that renders the letter in bold with a small arrow above it.
2. Define a custom environment `\begin{warningbox} ... \end{warningbox}` that renders warning text in dark red with bold lead text.

---
---

# Chapter 18: Page Layout & Geometry
## ជំពូកទី ១៨: ប្លង់ទំព័រ គម្លាតគែម និងក្បាលទំព័រ (Geometry & Fancyhdr)

### 1. Learning Objectives / គោលបំណងមេរៀន
By the end of this chapter, you will be able to:
- Configure custom page margins, header heights, and paper orientations using `geometry`.
- Account for two-sided book binding gutters using `bindingoffset`.
- Design running headers and footers with dynamic chapter titles using `fancyhdr`.
- Apply distinct page styles (`empty`, `plain`, `fancy`).

---

### 2. English Explanation
By default, LaTeX leaves generous margins (approx. 1.5 to 1.75 inches) based on classical European typographic studies showing that the human eye reads 60–75 characters per line with minimal fatigue. However, modern universities often mandate specific margins (e.g., exactly 1 inch or 2.5 cm).

#### 1. Setting Margins with `geometry`
```latex
\usepackage[
    a4paper,
    top=2.5cm,
    bottom=2.5cm,
    left=3.0cm,    % Extra space on left for ring-binding
    right=2.5cm,
    bindingoffset=5mm
]{geometry}
```

#### 2. Running Headers and Footers with `fancyhdr`
To create modern running headers (displaying current chapter title at top and page number at bottom):
```latex
\usepackage{fancyhdr}
\pagestyle{fancy}
\fancyhf{} % Clear default header and footer fields

% In two-sided documents: E = Even page, O = Odd page, L = Left, R = Right, C = Center
\fancyhead[LE,RO]{\thepage}
\fancyhead[RE]{\nouppercase{\leftmark}}  % Chapter title on even pages
\fancyhead[LO]{\nouppercase{\rightmark}} % Section title on odd pages
\renewcommand{\headrulewidth}{0.5pt}     % Thin decorative dividing line
\renewcommand{\footrulewidth}{0pt}
```

---

### 3. Khmer Explanation (ការពន្យល់ជាភាសាខ្មែរ)
ក្នុងការរៀបចំសារណាបញ្ចប់ការសិក្សា សាកលវិទ្យាល័យនីមួយៗតែងតែកំណត់ខ្នាតគែមក្រដាស (Margins) ច្បាស់លាស់ (ឧទាហរណ៍៖ ខាងឆ្វេង ៣ សង់ទីម៉ែត្រសម្រាប់ដេរកាតាឡុកចងក្បាល និងខាងស្ដាំ ២.៥ សង់ទីម៉ែត្រ)។

- **កញ្ចប់ `geometry`**៖ ជួយឱ្យយើងកំណត់គែមក្រដាសបានយ៉ាងជាក់លាក់បំផុត (`top`, `bottom`, `left`, `right`) ព្រមទាំងបន្ថែមគម្លាតសម្រាប់កៀបចងក្រងសៀវភៅ (`bindingoffset=5mm`)។
- **កញ្ចប់ `fancyhdr`**៖ ជួយបង្កើតក្បាលទំព័រ (Header) និងបាតទំព័រ (Footer) យ៉ាងប្រណីត ដោយបង្ហាញចំណងជើងជំពូក និងលេខទំព័រស្វ័យប្រវត្តិ។

---

### 4. Code Example: Professional Geometry & Fancy Header Configuration
```latex
\documentclass[12pt, a4paper, twoside]{report}
\usepackage[utf8]{inputenc}
\usepackage[
    top=2.5cm,
    bottom=2.5cm,
    left=3cm,
    right=2.5cm,
    headheight=15pt
]{geometry}
\usepackage{fancyhdr}
\usepackage{lipsum} % For dummy placeholder paragraphs

\pagestyle{fancy}
\fancyhf{}
\fancyhead[LE,RO]{\bfseries\thepage}
\fancyhead[RE]{\slshape\nouppercase{\leftmark}}
\fancyhead[LO]{\slshape\nouppercase{\rightmark}}
\renewcommand{\headrulewidth}{0.4pt}

\begin{document}

\chapter{Theoretical Framework}
\section{Foundations of Quantum Information}
\lipsum[1-5]

\section{Quantum Teleportation Protocols}
\lipsum[6-10]

\end{document}
```

---

### 5. Exercises / លំហាត់អនុវត្ត
1. Configure a one-sided document layout with equal 1-inch margins on all four sides.
2. In the footer, place the university name on the left and the page number on the right using `\fancyfoot[L]{...}` and `\fancyfoot[R]{\thepage}`.

---
---

# Chapter 19: Colors, Fonts & Modern Typography
## ជំពូកទី ១៩: ពណ៌ ពុម្ពអក្សរ និងការរចនាបែបទំនើប (Colors & Typography)

### 1. Learning Objectives / គោលបំណងមេរៀន
By the end of this chapter, you will be able to:
- Define and apply custom RGB, CMYK, and Hexadecimal colors with `xcolor`.
- Colorize text, section headings, backgrounds, and table rows.
- Understand the modern font compilation engines: `pdfLaTeX` vs. `XeLaTeX` / `LuaLaTeX` with `fontspec`.
- Typeset syntax-highlighted source code listings using the `listings` package.

---

### 2. English Explanation
Professional documents use color judiciously to guide reader attention without causing visual distraction.

#### 1. Working with `xcolor`
```latex
\usepackage[dvipsnames]{xcolor}
```
- Built-in named colors: `NavyBlue`, `ForestGreen`, `RubineRed`, `TealBlue`.
- Defining custom colors:
  ```latex
  \definecolor{primaryNavy}{RGB}{31, 61, 92}
  \definecolor{brandTeal}{HTML}{0f766e}
  ```
- Applying colors:
  - Text: `\textcolor{primaryNavy}{This text is in deep navy.}`
  - Box background: `\colorbox{yellow!20}{Highlighted note}`

#### 2. Typesetting Computer Source Code with `listings`
To present software source code with syntax highlighting, line numbers, and clean monospace formatting:
```latex
\usepackage{listings}

\lstset{
    backgroundcolor=\color{gray!8},
    basicstyle=\ttfamily\small,
    keywordstyle=\color{blue}\bfseries,
    commentstyle=\color{ForestGreen}\itshape,
    stringstyle=\color{purple},
    numbers=left,
    numberstyle=\tiny\color{gray},
    frame=single,
    breaklines=true
}
```

---

### 3. Khmer Explanation (ការពន្យល់ជាភាសាខ្មែរ)
ការរចនាឯកសារឱ្យមានសោភ័ណភាពស្រស់ស្អាត ទាមទារការប្រើប្រាស់ពណ៌ឱ្យបានសមរម្យតាមលក្ខណៈវិទ្យាសាស្ត្រ៖

- **កញ្ចប់ `xcolor`**៖ ជួយឱ្យយើងកំណត់ពណ៌តាមលេខកូដ RGB ឬ HEX (ដូចក្នុង Web Design)៖
  `\definecolor{MyBlue}{HTML}{1A365D}`
- **កញ្ចប់ `listings`**៖ ប្រើសម្រាប់ដាក់កូដសរសេរកម្មវិធី (ដូចជា Python, C++, Java) នៅក្នុងរបាយការណ៍ ដោយមានការផ្ដល់លេខជួរកូដ (Line numbers) និងការប្ដូរពណ៌ពាក្យគន្លឹះ (Syntax Highlighting) ស្អាតឥតខ្ចោះ។

---

### 4. Code Example: Colored Architecture & Code Snippets
```latex
\documentclass[12pt, a4paper]{article}
\usepackage[utf8]{inputenc}
\usepackage[dvipsnames]{xcolor}
\usepackage{listings}

\definecolor{brandNavy}{HTML}{1F3D5C}
\definecolor{codeBg}{HTML}{F8FAFC}

\lstdefinestyle{pythonStyle}{
    backgroundcolor=\color{codeBg},
    basicstyle=\ttfamily\footnotesize,
    keywordstyle=\color{NavyBlue}\bfseries,
    commentstyle=\color{OliveGreen}\itshape,
    stringstyle=\color{BrickRed},
    numberstyle=\tiny\color{gray},
    numbers=left,
    stepnumber=1,
    frame=lines,
    rulecolor=\color{brandNavy},
    breaklines=true
}

\begin{document}

\section{\textcolor{brandNavy}{Machine Learning Training Script}}

Below is the verified implementation of our optimization objective:

\begin{lstlisting}[style=pythonStyle, language=Python]
import torch
import torch.nn as nn

class LinearRegressionModel(nn.Module):
    def __init__(self, input_dim: int, output_dim: int):
        super().__init__()
        # Initialize linear transformation weights
        self.linear = nn.Linear(input_dim, output_dim)

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        return self.linear(x)
\end{lstlisting}

\end{document}
```

---

### 5. Exercises / លំហាត់អនុវត្ត
1. Define a brand color scheme using your university's colors.
2. Embed an algorithm written in C++ or JavaScript formatted with `listings`.

---
---

# Chapter 20: Creating Complete Professional Documents
## ជំពូកទី ២០: ការរៀបចំឯកសារអាជីពពេញលេញមួយចប់ចុងចប់ដើម

### 1. Learning Objectives / គោលបំណងមេរៀន
By the end of this chapter, you will be able to:
- Assemble all structural elements into a production-grade academic monograph.
- Design bespoke institutional title pages with university emblems and signatures.
- Style chapter titles and section banners using the `titlesec` package.
- Generate synchronized indexes, lists of acronyms, and glossaries.

---

### 2. English Explanation
A truly professional document is characterized by harmonized typography, balanced proportions, and seamless front-to-back cohesion.

#### Modern Section Styling with `titlesec`
Instead of default plain LaTeX chapter headings, `titlesec` allows you to craft stylish modern headers with colored rules and customized number boxes:
```latex
\usepackage{titlesec}

\titleformat{\chapter}[display]
  {\normalfont\huge\bfseries\color{brandNavy}}
  {\filleft\Huge\textbf{\chaptertitlename}\space\Huge\thechapter}
  {1ex}
  {\titlerule\vspace{1ex}\filright}
```

---

### 3. Khmer Explanation (ការពន្យល់ជាភាសាខ្មែរ)
ជំពូកនេះជាការបូកសរុបចំណេះដឹងទាំងអស់ដែលបានរៀនពីជំពូកមុនៗ ដើម្បីបង្កើតជាឯកសារមួយដែលមានរចនាសម្ព័ន្ធពេញលេញ៖
- ទំព័រក្របមុខប្រកបដោយវិជ្ជាជីវៈ (Professional Title Page)
- ការរៀបចំក្បាលជំពូកស្អាតប្រណីតដោយប្រើ `\usepackage{titlesec}`
- ការភ្ជាប់មាតិកា បញ្ជីរូបភាព និងបញ្ជីតារាងឱ្យស៊ីចង្វាក់គ្នា ១០០%។

---

### 4. Chapter Summary / សង្ខេបជំពូក
- Packages from CTAN extend LaTeX infinitely; always load `hyperref` near the very end.
- `\newcommand` and `\newenvironment` eliminate tedious repetitive typing and centralize stylistic decisions.
- `geometry` and `fancyhdr` provide pixel-perfect control over margins, headers, and footers.
- `xcolor` and `listings` transform raw code reports into publication-grade documents.
