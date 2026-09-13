# PART 4 — Images and Figures
## ផ្នែកទី ៤ — រូបភាព និងដ្យាក្រាមក្នុង LaTeX

---

# Chapter 11: Working with Images
## ជំពូកទី ១១: ការបញ្ចូលរូបភាព និងការគ្រប់គ្រងទំហំរូបភាព

### 1. Learning Objectives / គោលបំណងមេរៀន
By the end of this chapter, you will be able to:
- Import raster and vector graphic files using the `graphicx` package.
- Scale, constrain, and rotate images dynamically relative to text width (`\textwidth`).
- Position images inside the floating `figure` environment.
- Create numbered captions, cross-referencing labels, and lists of figures.
- Arrange multiple sub-images side-by-side using the `subcaption` package.

---

### 2. English Explanation
To include external images (such as `.png`, `.jpg`, or vector `.pdf` files) in LaTeX, you must import the standard `graphicx` package in your preamble:
```latex
\usepackage{graphicx}
```

#### 1. The `\includegraphics` Command
The primary command for inserting graphics is:
```latex
\includegraphics[key=value, ...]{filename}
```

Common optional parameters:
- `width=0.8\textwidth`: Scales the graphic to 80% of the printable page width.
- `width=5cm`: Sets an absolute width of 5 centimeters.
- `height=4cm`: Sets an absolute height.
- `scale=0.5`: Scales the original image to 50% of its native dimensions.
- `angle=90`: Rotates the image counter-clockwise by 90 degrees.
- `keepaspectratio`: Preserves image proportions when both width and height are declared.

[TIP]
Always prefer relative sizing (e.g., `width=0.7\textwidth`) over absolute sizing (`width=10cm`). If you later modify the page margins, relatively sized images automatically adapt to fit the new layout without overflowing!

#### 2. The Floating `figure` Environment
Never insert raw `\includegraphics` in the middle of a paragraph without a wrapper environment. Instead, place it inside a floating `figure` container:
```latex
\begin{figure}[htbp]
    \centering
    \includegraphics[width=0.75\textwidth]{images/architecture.png}
    \caption{Overview of System Architecture}
    \label{fig:system_arch}
\end{figure}
```
The figure environment:
1. Prevents the image from splitting awkwardly across page boundaries.
2. Centers the graphic via `\centering`.
3. Adds a standard numbered title (**Figure 1: Overview of System Architecture**).
4. Enables cross-referencing via `\label` and `\ref`.

#### 3. Side-by-Side Subfigures with `subcaption`
To present multiple related images side-by-side (e.g., Figure 1(a) and Figure 1(b)):
```latex
\usepackage{subcaption}
```
Inside the `figure`, embed individual `subfigure` blocks:
```latex
\begin{figure}[htbp]
    \centering
    \begin{subfigure}[b]{0.45\textwidth}
        \centering
        \includegraphics[width=\textwidth]{fig_a.png}
        \caption{Baseline Model}
        \label{fig:sub_a}
    \end{subfigure}
    \hfill % Horizontal space pushing the two subfigures apart
    \begin{subfigure}[b]{0.45\textwidth}
        \centering
        \includegraphics[width=\textwidth]{fig_b.png}
        \caption{Optimized Model}
        \label{fig:sub_b}
    \end{subfigure}
    \caption{Comparative analysis of training curves}
    \label{fig:comparison}
\end{figure}
```

---

### 3. Khmer Explanation (ការពន្យល់ជាភាសាខ្មែរ)
ដើម្បីបញ្ចូលរូបភាព (ដូចជា file `.png`, `.jpg`, ឬ `.pdf`) ទៅក្នុងឯកសារ LaTeX យើងត្រូវប្រើកញ្ចប់ `\usepackage{graphicx}`។

#### ១. ពាក្យបញ្ជាបញ្ចូលរូបភាព
ពាក្យបញ្ជាចម្បងគឺ `\includegraphics[ជម្រើស]{ឈ្មោះរូបភាព}`។
- កំណត់ទំហំតាមទទឹងក្រដាស៖ `width=0.8\textwidth` (មានន័យថា យក ៨០% នៃទទឹងផ្ទៃសរសេរ)។ វិធីនេះល្អបំផុត ព្រោះបើប្ដូរទំហំក្រដាស រូបភាពនឹងបង្រួម/ពង្រីកតាមដោយស្វ័យប្រវត្តិ មិនធ្លាយចេញក្រៅក្រដាសឡើយ។
- បង្វិលរូបភាព៖ `angle=45` (បង្វិល ៤៥ ដឺក្រេ)។

#### ២. បរិស្ថាន `figure`
យើងមិនត្រូវដាក់រូបភាពទទេៗក្នុងកថាខណ្ឌឡើយ។ យើងត្រូវដាក់រូបភាពនៅក្នុង `\begin{figure} ... \end{figure}`៖
- `\centering`៖ ដាក់រូបភាពនៅចំកណ្ដាលទំព័រ។
- `\caption{ចំណងជើង}`៖ ផ្ដល់ចំណងជើងរូបភាព និងលេខរៀងស្វ័យប្រវត្តិ (**Figure 1: ...** ឬ **រូបភាពទី ១៖ ...**)។
- `\label{fig:my_image}`៖ ដាក់ស្លាកសម្គាល់ដើម្បីងាយស្រួលហៅយោងក្នុងអត្ថបទ។

[WARNING]
ត្រូវដាក់ `\label` នៅ **បន្ទាប់ពី** `\caption` ជានិច្ច! បើដាក់មុន `\caption` លេខយោងនឹងច្រឡំជាមួយលេខជំពូក ឬលេខផ្នែក។

---

### 4. Code Example: Single Figure and Side-by-Side Subfigures
```latex
\documentclass[12pt, a4paper]{article}
\usepackage[utf8]{inputenc}
\usepackage{graphicx}
\usepackage{subcaption}

\begin{document}

\section{Visual Performance Analysis}

As demonstrated in Figure~\ref{fig:model_convergence}, the proposed algorithm 
exhibits rapid convergence compared to the baseline approach.

\begin{figure}[htbp]
    \centering
    % In a real project, replace 'example-image' with your image file path
    \includegraphics[width=0.7\textwidth]{example-image}
    \caption{Convergence loss curve over 100 training epochs}
    \label{fig:model_convergence}
\end{figure}

Furthermore, Figure~\ref{fig:ablation_study} provides a side-by-side comparison 
between Figure~\ref{fig:ablation_a} (precision) and Figure~\ref{fig:ablation_b} (recall).

\begin{figure}[htbp]
    \centering
    \begin{subfigure}[b]{0.46\textwidth}
        \centering
        \includegraphics[width=\textwidth]{example-image-a}
        \caption{Precision over training steps}
        \label{fig:ablation_a}
    \end{subfigure}
    \hfill
    \begin{subfigure}[b]{0.46\textwidth}
        \centering
        \includegraphics[width=\textwidth]{example-image-b}
        \caption{Recall over training steps}
        \label{fig:ablation_b}
    \end{subfigure}
    \caption{Ablation evaluation of precision and recall metrics}
    \label{fig:ablation_study}
\end{figure}

\end{document}
```

---

### 5. Line-by-Line Breakdown
- `\includegraphics[width=0.7\textwidth]{example-image}`: Uses standard TeX graphic placeholder `example-image` (built into modern distributions for testing) scaled to 70% of text width.
- `Figure~\ref{fig:model_convergence}`: Creates a non-breaking tie `~` followed by the automatically evaluated figure number (e.g., "Figure 1").
- `\begin{subfigure}[b]{0.46\textwidth}`: Allocates 46% of horizontal page space to each sub-panel.
- `\hfill`: Fills the horizontal void between the two subfigures, pushing them neatly to opposite page margins.
- `\caption{...}` inside `subfigure`: Produces automated sub-labels: (a) and (b).

---

### 6. Exercises / លំហាត់អនុវត្ត
1. Create a `figure` displaying a screenshot or photo from your computer, scaled to `0.6\textwidth`. Add an informative caption and label.
2. Construct a three-panel subfigure comparison (e.g., three images side-by-side, each sized `0.31\textwidth`). Reference each sub-panel in the text.

---
---

# Chapter 12: Figures and Diagrams with TikZ
## ជំពូកទី ១២: ការគូរដ្យាក្រាម និងប្លង់វិស្វកម្មដោយប្រើ TikZ

### 1. Learning Objectives / គោលបំណងមេរៀន
By the end of this chapter, you will be able to:
- Understand the programmatic vector drawing philosophy of **TikZ** (*"TikZ ist kein Zeichenprogramm"*).
- Define coordinates, draw lines, arrows, rectangles, and circles with crisp vector clarity.
- Create styled nodes with background fills, borders, text alignment, and shadows.
- Construct professional computer science flowcharts and neural network diagrams directly in LaTeX source code.

---

### 2. English Explanation
While raster images (PNG, JPG) can become pixelated when zoomed or printed, **TikZ** allows you to draw vector graphics directly inside LaTeX using declarative code. Every element is typeset with mathematical precision, matches the document's native fonts, and scales infinitely without quality loss.

To use TikZ, import the package in the preamble:
```latex
\usepackage{tikz}
\usetikzlibrary{shapes.geometric, arrows.meta, positioning}
```

#### 1. Fundamental TikZ Syntax
Every TikZ instruction must be written inside a `tikzpicture` environment and terminate with a semicolon (`;`):
```latex
\begin{tikzpicture}
    \draw (0,0) -- (4,0); % Draws a horizontal line from (0,0) to (4,0)
    \draw[->, thick, blue] (0,0) -- (0,3); % Blue arrow along y-axis
    \draw[fill=red!20] (2,2) circle (1cm); % Circle with 20% red fill
\end{tikzpicture}
```

#### 2. Nodes: Adding Labeled Boxes
In TikZ, a **node** represents a shape with text:
```latex
\node[draw, rounded corners, fill=blue!10] (myNode) at (2,1) {Data Input};
```
- `draw`: Draws the shape outline.
- `fill=blue!10`: Fills the background with 10% saturated blue.
- `(myNode)`: Assigns a name to this coordinate, enabling other arrows to connect to it seamlessly:
  `\draw[->] (myNode) -- (anotherNode);`

#### 3. Professional Flowchart Construction
Using `positioning` and `arrows.meta`, nodes can be arranged relative to each other (e.g., `below=of myNode`) without hardcoding manual numerical coordinates.

---

### 3. Khmer Explanation (ការពន្យល់ជាភាសាខ្មែរ)
**TikZ** គឺជាឧបករណ៍គូរគំនូសតាង ក្រាហ្វិក និងដ្យាក្រាមបែប Vector ដ៏មានឥទ្ធិពលបំផុតនៅក្នុង LaTeX។

#### ហេតុអ្វីត្រូវគូរដ្យាក្រាមជាមួយ TikZ?
1. **ច្បាស់កម្រិតកំពូល (Vector Quality)**៖ រូបដែលគូរដោយ TikZ មិនដែលបែករូបភាព (Pixelate) ឡើយ ទោះជាអ្នកពង្រីក (Zoom) ១០០០% ឬបោះពុម្ពលើផ្ទាំងប៉ាណូធំយ៉ាងណាក្ដី។
2. **ពុម្ពអក្សរស៊ីគ្នា ១០០%**៖ អក្សរ និងរូបមន្តគណិតវិទ្យាក្នុងដ្យាក្រាមប្រើប្រាស់ font តែមួយជាមួយអត្ថបទនៃសៀវភៅរបស់អ្នក។
3. **កែប្រែងាយស្រួល**៖ បើចង់ប្ដូរពាក្យ ឬប្ដូរទិសដៅព្រួញ គ្រាន់តែកែកូដអក្សរ ដោយមិនបាច់បើក Photoshop ឬ Illustrator មកគូរឡើងវិញឡើយ។

[IMPORTANT]
រាល់បន្ទាត់កូដបញ្ជានីមួយៗនៅក្នុង TikZ ត្រូវតែ **បញ្ចប់ដោយសញ្ញាចុចក្បៀស (`;`)** ជានិច្ច! ប្រសិនបើភ្លេចសញ្ញា `;` នោះកម្មវិធីនឹងរាយការណ៍កំហុសធ្ងន់ធ្ងរ។

---

### 4. Code Example: Complete Computer Science System Flowchart
```latex
\documentclass[12pt, a4paper]{article}
\usepackage[utf8]{inputenc}
\usepackage{tikz}
\usetikzlibrary{shapes.geometric, arrows.meta, positioning}

% Configure reusable flowchart styles in preamble
\tikzset{
    startstop/.style = {
        rectangle, rounded corners, minimum width=3cm, minimum height=1cm,
        text centered, draw=black, fill=red!15, font=\bfseries
    },
    process/.style = {
        rectangle, minimum width=3.2cm, minimum height=1cm,
        text centered, draw=black, fill=blue!10
    },
    decision/.style = {
        diamond, aspect=2, text centered, draw=black, fill=green!15, font=\small
    },
    arrow/.style = {
        thick, ->, >=Stealth
    }
}

\begin{document}

\section{Algorithm Execution Flowchart}

Figure~\ref{fig:flowchart} illustrates the decision lifecycle of the authentication service.

\begin{figure}[htbp]
    \centering
    \begin{tikzpicture}[node distance=1.8cm]
        % Define nodes
        \node (start) [startstop] {User Requests Access};
        \node (input) [process, below=of start] {Verify Credentials};
        \node (decide) [decision, below=of input] {Valid Password?};
        \node (success) [process, below=of decide, fill=emerald!20] {Grant Access Token};
        \node (stop) [startstop, below=of success, fill=emerald!30] {Session Active};
        \node (fail) [process, right=2.5cm of decide, fill=rose!20] {Increment Retry Count};

        % Connect nodes with arrows
        \draw [arrow] (start) -- (input);
        \draw [arrow] (input) -- (decide);
        \draw [arrow] (decide) -- node[anchor=east] {Yes} (success);
        \draw [arrow] (success) -- (stop);
        \draw [arrow] (decide) -- node[anchor=south] {No} (fail);
        \draw [arrow] (fail) |- (input);
    \end{tikzpicture}
    \caption{Architectural authentication flow of the secure login system}
    \label{fig:flowchart}
\end{figure}

\end{document}
```

---

### 5. Line-by-Line Breakdown
- `\usetikzlibrary{shapes.geometric, arrows.meta, positioning}`: Imports rounded boxes, diamonds, modern sharp arrowheads (`Stealth`), and relational positioning.
- `\tikzset{...}`: Pre-defines visual styles (`startstop`, `process`, `decision`, `arrow`) ensuring consistent colors, line thicknesses, and fonts across all diagrams.
- `node (decide) [decision, below=of input]`: Dynamically places the decision diamond directly underneath the credentials block.
- `\draw [arrow] (decide) -- node[anchor=east] {Yes} (success)`: Draws an arrow downward while annotating the pathway with the text label "Yes".
- `\draw [arrow] (fail) |- (input)`: The `|-` syntax draws a smart orthogonal right-angle path (horizontal then vertical) returning the user to the verification loop.

---

### 6. Expected Output
- A publication-ready vector flowchart:
  - An initial soft-red rounded box: **User Requests Access**.
  - A clean downward arrow leading to a blue processing box: **Verify Credentials**.
  - A green diamond decision node: **Valid Password?**.
  - If "Yes", an arrow proceeds downward to **Grant Access Token** and **Session Active**.
  - If "No", an arrow branches to the right to **Increment Retry Count**, then turns at 90 degrees back to re-prompt credentials.

---

### 7. Exercises / លំហាត់អនុវត្ត
1. Draw a basic coordinate axes system in TikZ with an x-axis ranging from -3 to 3 and a y-axis from -3 to 3 with arrows at the tips.
2. Draw a circle of radius 2cm at the origin $(0,0)$ and plot a tangent line at $(0,2)$.
3. Construct a three-step data science pipeline flowchart: `Data Cleaning` $\to$ `Feature Extraction` $\to$ `Model Training`.

---

### 8. Chapter Summary / សង្ខេបជំពូក
- Use `\usepackage{graphicx}` and `\includegraphics[width=...]{filename}` to insert external photos and graphics.
- Always encapsulate floating images inside `\begin{figure}[htbp]`, providing a `\caption{}` and `\label{}`.
- Use `subcaption` and `subfigure` environments for structured side-by-side image matrices.
- Use **TikZ** to construct mathematically precise, infinitely scalable vector diagrams and flowcharts directly inside LaTeX.
