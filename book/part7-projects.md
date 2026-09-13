# PART 7 — Practical Projects
## ផ្នែកទី ៧ — គម្រោងអនុវត្តជាក់ស្ដែងចំនួន ៧

---

# Project 1: Simple Student Report
## គម្រោងទី ១: របាយការណ៍សិស្ស/និស្សិតទូទៅ

### 1. Project Requirements / លក្ខខណ្ឌតម្រូវនៃគម្រោង
- A clean, 2-to-4 page academic laboratory or course report.
- Standard A4 margins with author name, student ID, course name, and instructor name.
- Numbered sections, a structured table, and an inline calculation.
- Beginner-friendly, compilable using standard `pdflatex` with zero external dependencies.

---

### 2. Complete Compilable LaTeX Source Code
```latex
\documentclass[12pt, a4paper]{article}
\usepackage[utf8]{inputenc}
\usepackage[top=2.5cm, bottom=2.5cm, left=2.5cm, right=2.5cm]{geometry}
\usepackage{amsmath}
\usepackage{booktabs}
\usepackage[colorlinks=true, linkcolor=blue]{hyperref}

\title{\textbf{Physics Laboratory Report: Hooke's Law and Elasticity}}
\author{
    \textbf{Student Name:} Sovannary Lim \quad (\textbf{ID:} e20260451)\\
    \textbf{Course:} General Physics I (PHYS101)\\
    \textbf{Instructor:} Dr. K. Seng
}
\date{September 14, 2026}

\begin{document}

\maketitle

\begin{abstract}
This laboratory experiment investigates the relationship between the tensile force 
applied to a helical spring and its resulting elongation. In accordance with Hooke's Law, 
the spring constant was empirically determined through static load measurements. 
The experimental spring constant was calculated as $k = 24.8 \pm 0.3\text{ N/m}$.
\end{abstract}

\section{Introduction and Theoretical Principles}
Hooke's Law posits that the force $F$ required to extend or compress a spring by some 
distance $x$ scales linearly with respect to that distance:
\begin{equation}
    F = -k \cdot x
    \label{eq:hooke}
\end{equation}
where $k$ represents the spring stiffness constant (N/m), and $x$ is displacement from equilibrium.

\section{Experimental Methodology}
A precision helical spring was suspended vertically from a rigid support clamp. 
Standard calibrated brass masses ranging from $50\text{ g}$ to $500\text{ g}$ were attached sequentially. 
The vertical elongation was recorded using a millimeter optical vernier scale.

\section{Data Collection and Analysis}
Table~\ref{tab:measurements} documents the empirical force values alongside recorded displacements.

\begin{table}[htbp]
    \centering
    \caption{Empirical spring elongation under static gravitational loads}
    \label{tab:measurements}
    \begin{tabular}{cccc}
        \toprule
        \textbf{Trial} & \textbf{Mass (kg)} & \textbf{Force $F = mg$ (N)} & \textbf{Elongation $x$ (m)} \\
        \midrule
        1 & 0.050 & 0.490 & 0.020 \\
        2 & 0.100 & 0.981 & 0.039 \\
        3 & 0.200 & 1.962 & 0.079 \\
        4 & 0.300 & 2.943 & 0.119 \\
        5 & 0.500 & 4.905 & 0.198 \\
        \bottomrule
    \end{tabular}
\end{table}

\section{Conclusion}
The experimental results exhibit a strict linear correlation between gravitational load and displacement, 
confirming the validity of Hooke's Law within elastic limits.

\end{document}
```

---

### 3. Code Walkthrough / ការពន្យល់កូដ
- `\author{...}`: Demonstrates multi-line metadata formatting using `\quad` (horizontal spacing) and `\\` linebreaks.
- `\begin{abstract}`: Centers an academic summary paragraph with indented margins.
- `Table~\ref{tab:measurements}`: Automatically links text to the measured data table.

### 4. How to Compile / របៀបបកប្រែ
Run `pdflatex report.tex` in your terminal or click **Recompile** in Overleaf.

### 5. How to Customize / របៀបកែច្នៃ
- Change `PHYS101` and the laboratory topic to match your specific university assignment.
- Add additional columns to the table by updating `{cccc}` to `{ccccc}` and inserting another `&`.

---
---

# Project 2: Mathematics Assignment
## គម្រោងទី ២: កិច្ចការស្រាវជ្រាវគណិតវិទ្យា

### 1. Project Requirements / លក្ខខណ្ឌតម្រូវនៃគម្រោង
- An assignment sheet featuring formal Problem/Solution blocks.
- Advanced multi-line equations, aligned integrals, and matrix calculations.
- Clean box formatting for final answers using `amsthm` and `amsmath`.

---

### 2. Complete Compilable LaTeX Source Code
```latex
\documentclass[12pt, a4paper]{article}
\usepackage[utf8]{inputenc}
\usepackage[margin=2.5cm]{geometry}
\usepackage{amsmath, amssymb, amsthm}
\usepackage{tcolorbox}

% Define problem and solution environments
\theoremstyle{definition}
\newtheorem{problem}{Problem}

\newenvironment{solution}
    {\par\noindent\textbf{\textit{Solution:}}\space\ignorespaces}
    {\hfill $\blacksquare$\par\vspace{1em}}

\newcommand{\R}{\mathbb{R}}

\begin{document}

\begin{center}
    {\LARGE \textbf{MATH 201: Multivariable Calculus}}\\[0.3em]
    {\large Problem Set 3: Double Integrals and Linear Systems}\\[0.3em]
    \textbf{Student:} Piseth Samnang \quad | \quad \textbf{Due Date:} September 20, 2026
\end{center}
\hrule\vspace{1.5em}

\begin{problem}
Evaluate the definite double integral:
\[
    I = \iint_D (2x + y) \, dA
\]
where $D$ is the rectangular region defined by $0 \le x \le 2$ and $1 \le y \le 3$.
\end{problem}

\begin{solution}
By Fubini's Theorem, we set up the iterated integral with respect to $y$, then $x$:
\begin{align*}
    I &= \int_{x=0}^{2} \left[ \int_{y=1}^{3} (2x + y) \, dy \right] dx \\
      &= \int_{x=0}^{2} \left[ 2xy + \frac{y^2}{2} \right]_{y=1}^{3} dx \\
      &= \int_{x=0}^{2} \left( (6x + 4.5) - (2x + 0.5) \right) dx \\
      &= \int_{x=0}^{2} (4x + 4) \, dx \\
      &= \left[ 2x^2 + 4x \right]_{0}^{2} = (8 + 8) - 0 = 16.
\end{align*}
\begin{tcolorbox}[colback=blue!5, colframe=blue!40, arc=2mm, width=5cm]
    \centering \textbf{Answer:} $I = 16$
\end{tcolorbox}
\end{solution}

\begin{problem}
Determine the eigenvalues $\lambda$ of the matrix $A$:
\[
    A = \begin{pmatrix} 4 & 2 \\ 1 & 3 \end{pmatrix}
\]
\end{problem}

\begin{solution}
The characteristic polynomial is obtained from $\det(A - \lambda I) = 0$:
\begin{align*}
    \det \begin{pmatrix} 4 - \lambda & 2 \\ 1 & 3 - \lambda \end{pmatrix} &= 0 \\
    (4 - \lambda)(3 - \lambda) - (2)(1) &= 0 \\
    \lambda^2 - 7\lambda + 10 &= 0 \\
    (\lambda - 5)(\lambda - 2) &= 0
\end{align*}
Hence, the eigenvalues are $\lambda_1 = 5$ and $\lambda_2 = 2$.
\end{solution}

\end{document}
```

---

### 3. How to Compile
Run `pdflatex assignment.tex` (requires `tcolorbox` package included in all standard distributions).

---
---

# Project 3: Computer Science Report with Code Listings
## គម្រោងទី ៣: របាយការណ៍វិទ្យាសាស្ត្រកុំព្យូទ័រមានកូដប្រភព

### 1. Project Requirements / លក្ខខណ្ឌតម្រូវនៃគម្រោង
- Two-column academic formatting.
- Formatted Python/C++ code listings with syntax coloring, line numbers, and dark framing.
- Algorithmic Big-O time complexity analysis table.

---

### 2. Complete Compilable LaTeX Source Code
```latex
\documentclass[10pt, a4paper, twocolumn]{article}
\usepackage[utf8]{inputenc}
\usepackage[margin=2cm]{geometry}
\usepackage{amsmath}
\usepackage{booktabs}
\usepackage[dvipsnames]{xcolor}
\usepackage{listings}
\usepackage[colorlinks=true, linkcolor=NavyBlue]{hyperref}

% Code listing appearance
\definecolor{codeBackground}{HTML}{F8FAFC}
\lstdefinestyle{csStyle}{
    backgroundcolor=\color{codeBackground},
    basicstyle=\ttfamily\scriptsize,
    keywordstyle=\color{NavyBlue}\bfseries,
    commentstyle=\color{ForestGreen}\itshape,
    stringstyle=\color{BrickRed},
    numbers=left,
    numberstyle=\tiny\color{gray},
    stepnumber=1,
    frame=single,
    breaklines=true,
    tabsize=4
}

\title{\textbf{Empirical Analysis of Quicksort vs. Mergesort in Modern Cache Architectures}}
\author{Kosal Chhum\\ Department of Computer Science\\ Royal University of Phnom Penh}
\date{\today}

\begin{document}

\maketitle

\begin{abstract}
Sorting algorithms exhibit variable performance influenced by memory hierarchy 
and CPU cache locality. This paper examines Quicksort's partition overhead 
against Mergesort on modern x86-64 hardware.
\end{abstract}

\section{Introduction}
Sorting constitutes up to 25\% of compute cycles in production database engines. 
While both algorithms possess theoretical asymptotes in $\mathcal{O}(n \log n)$, 
cache effects cause substantial runtime divergence.

\section{Algorithm Implementation}
Listing~\ref{lst:quicksort} illustrates the recursive Lomuto-partitioning routine.

\begin{lstlisting}[style=csStyle, language=Python, caption={In-place Quicksort in Python}, label={lst:quicksort}]
def quicksort(arr: list, low: int, high: int) -> None:
    if low < high:
        # Partition index
        pi = partition(arr, low, high)
        quicksort(arr, low, pi - 1)
        quicksort(arr, pi + 1, high)

def partition(arr: list, low: int, high: int) -> int:
    pivot = arr[high]
    i = low - 1
    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1
\end{lstlisting}

\section{Complexity Benchmarks}
Table~\ref{tab:complexity} outlines worst and average bounds.

\begin{table}[htbp]
    \centering
    \caption{Asymptotic Complexity}
    \label{tab:complexity}
    \begin{tabular}{lcc}
        \toprule
        \textbf{Algorithm} & \textbf{Average} & \textbf{Space} \\
        \midrule
        Quicksort & $\mathcal{O}(n \log n)$ & $\mathcal{O}(\log n)$ \\
        Mergesort & $\mathcal{O}(n \log n)$ & $\mathcal{O}(n)$ \\
        Heapsort  & $\mathcal{O}(n \log n)$ & $\mathcal{O}(1)$ \\
        \bottomrule
    \end{tabular}
\end{table}

\section{Discussion}
Quicksort exhibits superior temporal cache locality despite worst-case $\mathcal{O}(n^2)$ behavior.

\end{document}
```

---
---

# Project 4: Peer-Reviewed Research Paper
## គម្រោងទី ៤: អត្ថបទស្រាវជ្រាវកម្រិតទស្សនាវដ្ដី IEEE

### 1. Project Requirements / លក្ខខណ្ឌតម្រូវនៃគម្រោង
- Formal IEEE Transactions conference format.
- Two-column layout with author affiliations and indexing keywords.
- Mathematics, automated citations, and structured references using `biblatex`.

---

### 2. Complete Compilable LaTeX Source Code
```latex
\documentclass[10pt, conference, a4paper]{IEEEtran}
\usepackage[utf8]{inputenc}
\usepackage{amsmath, amssymb}
\usepackage{graphicx}
\usepackage{booktabs}
\usepackage[style=ieee, backend=biber]{biblatex}

% Inline sample biblio resource
\begin{filecontents*}{\jobname.bib}
@article{vaswani2017,
  author = {Vaswani, Ashish and others},
  title = {Attention is All You Need},
  journal = {NeurIPS},
  year = {2017}
}
@book{bishop2006,
  author = {Bishop, Christopher M.},
  title = {Pattern Recognition and Machine Learning},
  publisher = {Springer},
  year = {2006}
}
\end{filecontents*}

\addbibresource{\jobname.bib}

\title{Self-Supervised Representation Learning for Edge IoT Microcontrollers}

\author{
    \IEEEauthorblockN{Sopheap Chea}
    \IEEEauthorblockA{Faculty of Electronic Engineering\\
    Institute of Technology of Cambodia\\
    Phnom Penh, Cambodia\\
    Email: sopheap.chea@itc.edu.kh}
    \and
    \IEEEauthorblockN{Dr. Aris Thorne}
    \IEEEauthorblockA{Department of Robotics\\
    Kyoto University\\
    Kyoto, Japan\\
    Email: thorne@kyoto-u.ac.jp}
}

\begin{document}

\maketitle

\begin{abstract}
Deploying deep learning on ultra-low-power microcontrollers is constrained by strict 
memory limits ($<256\text{ KB}$ SRAM). This study demonstrates a quantized 4-bit self-supervised 
representation framework operating under $15\text{ mW}$ total power envelope.
\end{abstract}

\begin{IEEEkeywords}
Edge AI, Microcontrollers, Quantization, Self-Supervised Learning, IoT.
\end{IEEEkeywords}

\section{Introduction}
Deep sensory perception has migrated from central cloud clusters to low-power edge nodes~\cite{bishop2006}. 
Recent attention mechanisms~\cite{vaswani2017} require millions of operations, demanding extreme pruning 
for bare-metal microcontrollers.

\section{Proposed Architecture}
Our compression optimizes the feature mapping $f_\theta: \mathbb{R}^D \to \mathbb{R}^d$ through 
integer arithmetic:
\begin{equation}
    q = \text{clamp}\left( \left\lfloor \frac{w}{S} \right\rceil + Z, -8, 7 \right)
\end{equation}
where $S$ is the scaling factor and $Z$ is the zero-point offset.

\section{Conclusion}
Experimental trials confirm 91.4\% accuracy with an 8x memory footprint reduction.

\printbibliography

\end{document}
```

---
---

# Project 5: Professional University Thesis
## គម្រោងទី ៥: គំរូសារណាបញ្ចប់ការសិក្សាថ្នាក់បរិញ្ញាបត្រ/អនុបណ្ឌិត

### 1. Project Requirements / លក្ខខណ្ឌតម្រូវនៃគម្រោង
- Complete multi-chapter architecture (`frontmatter`, `mainmatter`, `backmatter`).
- Official institutional title page with supervisor signatures.
- Roman numeral front matter, Arabic chapter pagination.
- Table of Contents, List of Figures, List of Tables, and Appendix.

---

### 2. Complete Compilable LaTeX Source Code
```latex
\documentclass[12pt, a4paper, twoside]{report}
\usepackage[utf8]{inputenc}
\usepackage[top=3cm, bottom=3cm, left=3.5cm, right=2.5cm]{geometry}
\usepackage{amsmath, amssymb}
\usepackage{booktabs}
\usepackage{fancyhdr}
\usepackage[colorlinks=true, linkcolor=black, citecolor=blue, urlcolor=teal]{hyperref}

% Header and footer layout
\pagestyle{fancy}
\fancyhf{}
\fancyhead[RE]{\slshape\nouppercase{\leftmark}}
\fancyhead[LO]{\slshape\nouppercase{\rightmark}}
\fancyhead[LE,RO]{\bfseries\thepage}
\renewcommand{\headrulewidth}{0.4pt}

\begin{document}

% ----------------- TITLE PAGE -----------------
\begin{titlepage}
    \centering
    \vspace*{1cm}
    {\large \textbf{INSTITUTE OF TECHNOLOGY OF CAMBODIA}}\\[0.5cm]
    {\large Faculty of Applied Mathematics and Informatics}\\[2.5cm]
    
    {\LARGE \bfseries Predictive Modeling of Urban Flood Inundation Using Physics-Informed Neural Networks\par}
    \vspace{2cm}
    
    {\large By: \textbf{Rithy Chan}}\\[0.3cm]
    {\normalsize Student ID: ITC-2022-MATH-091}\\[2cm]
    
    \begin{minipage}{0.85\textwidth}
        \centering
        A Thesis Submitted in Partial Fulfillment of the Requirements\\
        for the Degree of Bachelor of Engineering in Applied Mathematics\\[1.5cm]
        \textbf{Thesis Supervisor:} Prof. Dr. Sopheak Vong\\
        \textbf{Head of Department:} Dr. Sokly Heng
    \end{minipage}
    
    \vfill
    {\large Phnom Penh, Cambodia\\ September 2026}
\end{titlepage}

% ----------------- PREFACES -----------------
\pagenumbering{roman}
\setcounter{page}{2}

\chapter*{Abstract}
Urban flooding represents a persistent environmental risk in Southeast Asian metropolitan areas. 
This thesis develops a physics-informed neural network (PINN) that embeds shallow water hydrodynamic 
equations directly into the optimization loss function.

\chapter*{Acknowledgments}
I would like to express my sincere appreciation to my supervisor, whose rigorous feedback 
shaped this investigation.

\tableofcontents
\listoffigures
\listoftables

\clearpage
% ----------------- MAIN CHAPTERS -----------------
\pagenumbering{arabic}
\setcounter{page}{1}

\chapter{Introduction}
\section{Background and Motivation}
Rapid urban surface sealing has heightened rainfall runoff volumes across the Mekong basin.

\section{Problem Statement and Research Objectives}
Conventional hydrodynamic models require extensive compute times, hindering real-time warning systems.

\chapter{Methodology}
\section{Governing Fluid Dynamics Equations}
Two-dimensional shallow water equations govern surface runoff:
\begin{equation}
    \frac{\partial h}{\partial t} + \frac{\partial (hu)}{\partial x} + \frac{\partial (hv)}{\partial y} = 0
\end{equation}

\chapter{Experimental Analysis}
\section{Validation against Field Gauges}
Simulation accuracy reached $R^2 = 0.942$ against field telemetry sensors.

\chapter{Conclusions and Recommendations}
PINN frameworks reduce inference latency by a factor of 120 with negligible accuracy loss.

% ----------------- APPENDICES -----------------
\appendix
\chapter{Telemetry Sensor Calibrations}
Detailed calibration logs for optical depth sensors across 14 municipal stations.

\end{document}
```

---
---

# Project 6: Professional CV/Resume using LaTeX
## គម្រោងទី ៦: ប្រវត្តិរូបសង្ខេបស្អាតប្រណីតសម្រាប់ដាក់ពាក្យធ្វើការ

### 1. Project Requirements / លក្ខខណ្ឌតម្រូវនៃគម្រោង
- Modern 1-page software engineer / data scientist resume.
- Clean margins with contact headers, GitHub/LinkedIn links, and bullet points.
- ATS (Applicant Tracking System) friendly structure.

---

### 2. Complete Compilable LaTeX Source Code
```latex
\documentclass[11pt, a4paper]{article}
\usepackage[utf8]{inputenc}
\usepackage[margin=1.5cm]{geometry}
\usepackage{enumitem}
\usepackage{titlesec}
\usepackage[dvipsnames]{xcolor}
\usepackage[colorlinks=true, urlcolor=NavyBlue]{hyperref}

% Clean section line divider
\titleformat{\section}{\Large\bfseries\color{NavyBlue}}{}{0em}{}[\titlerule]
\titlespacing*{\section}{0pt}{1.2ex}{1ex}

\pagestyle{empty} % No page numbers on single-page CV

\begin{document}

% ----------------- HEADER -----------------
\begin{center}
    {\Huge \textbf{DARA PHAN}}\\[0.4em]
    {\color{darkgray} Full-Stack Software Engineer \& Data Scientist}\\[0.4em]
    \href{mailto:dara.phan@example.com}{dara.phan@example.com} \quad | \quad
    +855 12 345 678 \quad | \quad
    \href{https://linkedin.com}{linkedin.com/in/daraphan} \quad | \quad
    \href{https://github.com}{github.com/daraphan}
\end{center}

\section{Education}
\textbf{Institute of Technology of Cambodia} \hfill Phnom Penh, Cambodia\\
\textit{Bachelor of Science in Computer Science \& Software Engineering} \hfill 2022 -- 2026\\
\textbf{GPA:} 3.85 / 4.00 (Ranked Top 5\%)

\section{Technical Skills}
\begin{itemize}[noitemsep, leftmargin=1.5em]
    \item \textbf{Languages:} Python, TypeScript, C++, Go, SQL, LaTeX
    \item \textbf{Frameworks \& Tools:} React, Next.js, FastAPI, PyTorch, Docker, PostgreSQL, Git
    \item \textbf{Specializations:} High-performance computing, distributed databases, REST APIs
\end{itemize}

\section{Professional Experience}
\textbf{Software Engineering Intern} \hfill June 2025 -- Sept 2025\\
\textit{Cambodia Tech Solutions Co., Ltd.} \hfill Phnom Penh, Cambodia
\begin{itemize}[noitemsep, leftmargin=1.5em]
    \item Optimized microservice SQL queries, reducing API response latency by 35\%.
    \item Implemented automated CI/CD pipeline using GitHub Actions, cutting deployment time from 40m to 8m.
    \item Collaborated in an agile team of 8 engineers delivering enterprise customer portals.
\end{itemize}

\section{Selected Projects}
\textbf{ROM-LaTeX: Real-Time Academic Typesetting Platform} \hfill \href{https://github.com}{[Code Repository]}
\begin{itemize}[noitemsep, leftmargin=1.5em]
    \item Architected responsive web application for LaTeX education featuring KaTeX rendering engine.
    \item Integrated Supabase cloud synchronization for student progress tracking and exercises.
\end{itemize}

\textbf{Automated License Plate Recognition System} \hfill \href{https://github.com}{[Demo Link]}
\begin{itemize}[noitemsep, leftmargin=1.5em]
    \item Trained YOLOv8 deep learning model on 10,000 traffic camera images, achieving 96.4\% mAP.
    \item Deployed inference pipeline on Raspberry Pi 4 edge device at 18 FPS.
\end{itemize}

\section{Honors \& Awards}
\begin{itemize}[noitemsep, leftmargin=1.5em]
    \item \textbf{1st Place Winner}, National University Hackathon Cambodia (2025)
    \item \textbf{Academic Excellence Full Scholarship}, Ministry of Education (2022 -- 2026)
\end{itemize}

\end{document}
```

---
---

# Project 7: Presentation using Beamer
## គម្រោងទី ៧: ស្លាយបទបង្ហាញសិក្ខាសាលាដោយប្រើ Beamer

### 1. Project Requirements / លក្ខខណ្ឌតេរូវនៃគម្រោង
- Academic digital slide presentation.
- Theme styling, progress bar, multi-column slide, bullet reveals (`\pause`).
- Clean mathematical equation slide.

---

### 2. Complete Compilable LaTeX Source Code
```latex
\documentclass[aspectratio=169]{beamer}
\usepackage[utf8]{inputenc}
\usepackage{amsmath, amssymb}
\usepackage{booktabs}

% Beamer theme configuration
\usetheme{Madrid}
\usecolortheme{beaver}

\title[Autonomous Robotics]{State Estimation in GPS-Denied Environments}
\subtitle{Visual-Inertial Odometry Algorithms}
\author[V. Meas]{Vireak Meas}
\institute[ITC]{Institute of Technology of Cambodia\\ Department of Electrical Engineering}
\date{Annual Science Symposium 2026}

\begin{document}

% Title Slide
\begin{frame}
    \titlepage
\end{frame}

% Outline Slide
\begin{frame}{Presentation Outline}
    \tableofcontents
\end{frame}

\section{Motivation}
\begin{frame}{Why GPS-Denied Navigation?}
    \begin{itemize}
        \item Satellite navigation fails in critical environments:
        \begin{itemize}
            \item Underground mining operations
            \item Deep urban canyons between skyscrapers
            \item Indoor warehouses and search-and-rescue ruins
        \end{itemize}
        \pause
        \item \textbf{Solution:} Sensor fusion combining high-rate IMU and stereo cameras.
    \end{itemize}
\end{frame}

\section{Mathematical Formulation}
\begin{frame}{Extended Kalman Filter (EKF) Formulation}
    State vector incorporates position, velocity, and orientation quaternion:
    \[
        \mathbf{x}_t = \begin{bmatrix} \mathbf{p}_t & \mathbf{v}_t & \mathbf{q}_t & \mathbf{b}_a & \mathbf{b}_g \end{bmatrix}^T
    \]
    \pause
    \begin{block}{Prediction Update}
        \[
            \hat{\mathbf{x}}_{t|t-1} = f(\hat{\mathbf{x}}_{t-1}, \mathbf{u}_t)
        \]
        \[
            \mathbf{P}_{t|t-1} = \mathbf{F}_t \mathbf{P}_{t-1} \mathbf{F}_t^T + \mathbf{Q}_t
        \]
    \end{block}
\end{frame}

\section{Experimental Results}
\begin{frame}{Benchmark Performance}
    \begin{columns}
        \column{0.48\textwidth}
        \textbf{Key Observations:}
        \begin{itemize}
            \item 40\% reduction in drift.
            \item 60 FPS real-time throughput on embedded ARM CPU.
        \end{itemize}
        
        \column{0.48\textwidth}
        \begin{table}
            \centering
            \caption{Trajectory Drift Comparison}
            \begin{tabular}{lrr}
                \toprule
                \textbf{Method} & \textbf{RMSE (m)} & \textbf{FPS} \\
                \midrule
                Pure IMU & 4.82 & 200 \\
                Pure Vision & 1.45 & 30 \\
                \textbf{Proposed} & \textbf{0.32} & \textbf{60} \\
                \bottomrule
            \end{tabular}
        \end{table}
    \end{columns}
\end{frame}

\begin{frame}{Conclusion and Next Steps}
    \begin{itemize}
        \item Fused visual-inertial odometry guarantees drift-free state estimation.
        \item Ongoing work: integration of onboard LiDAR SLAM loop-closure.
    \end{itemize}
    \vspace{1cm}
    \centering
    {\Large \textbf{Thank you! Questions \& Comments?}}
\end{frame}

\end{document}
```

---

### 3. Chapter Summary / សង្ខេបជំពូក
- Projects 1 through 7 provide ready-to-run templates covering every primary genre of LaTeX document: laboratory reports, mathematical problem sets, computer science code papers, IEEE publications, graduation theses, ATS resumes, and Beamer conference slides.
- You can copy any of these templates into Overleaf or your local TeX editor and immediately customize them for your own courses and assignments!
