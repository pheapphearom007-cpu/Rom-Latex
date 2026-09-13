# PART 3 — Mathematics
## ផ្នែកទី ៣ — គណិតវិទ្យាក្នុង LaTeX

---

# Chapter 8: Mathematical Expressions
## ជំពូកទី ៨: កន្សោមគណិតវិទ្យាបឋម

### 1. Learning Objectives / គោលបំណងមេរៀន
By the end of this chapter, you will be able to:
- Distinguish between **inline math mode** and **display math mode**.
- Typeset fractions, powers, subscripts, and square roots.
- Use the complete Greek alphabet ($\alpha, \beta, \gamma, \Gamma, \pi, \Omega$).
- Apply standard mathematical operators ($\sin, \cos, \log, \ln, \lim$) without font distortion.
- Produce clean parentheses that scale dynamically with expression height.

---

### 2. English Explanation
Typesetting mathematics is the crowning glory of TeX and LaTeX. No other software matches its precision, typographical elegance, and automated spacing rules.

#### 1. The Two Fundamental Math Modes
1. **Inline Math**: Embedded directly within a flowing sentence between single dollar signs `$ ... $` or `\( ... \)`.
   *Example*: `The formula $E = mc^2$ represents mass-energy equivalence.`
2. **Display Math**: Centered on its own independent line with dedicated vertical spacing:
   - Unnumbered display math: `\[ ... \]`
   - Numbered display math: `\begin{equation} ... \end{equation}`

#### 2. Essential Mathematical Syntax
| Concept | LaTeX Syntax | Rendered Output |
| :--- | :--- | :--- |
| **Superscript / Power** | `x^2`, `e^{i\pi}` | $x^2$, $e^{i\pi}$ |
| **Subscript** | `x_1`, `a_{n+1}` | $x_1$, $a_{n+1}$ |
| **Combined** | `x_i^2`, `A_{i,j}^{(k)}` | $x_i^2$, $A_{i,j}^{(k)}$ |
| **Fraction** | `\frac{numerator}{denominator}` | $\frac{a+b}{c+d}$ |
| **Square Root** | `\sqrt{x}`, `\sqrt[n]{x}` | $\sqrt{x}$, $\sqrt[n]{x}$ |

#### 3. Greek Letters
- **Lowercase**: `\alpha` ($\alpha$), `\beta` ($\beta$), `\gamma` ($\gamma$), `\delta` ($\delta$), `\theta` ($\theta$), `\lambda` ($\lambda$), `\mu` ($\mu$), `\pi` ($\pi$), `\sigma` ($\sigma$), `\omega` ($\omega$).
- **Uppercase**: Capitalize the first letter: `\Gamma` ($\Gamma$), `\Delta` ($\Delta$), `\Theta` ($\Theta$), `\Lambda` ($\Lambda$), `\Sigma` ($\Sigma$), `\Omega` ($\Omega$).

#### 4. Named Operators vs. Variables
[IMPORTANT]
Never type trigonometric or logarithmic functions as plain text (e.g., `sin(x)`), because LaTeX will treat each character as a multiplied variable ($s \cdot i \cdot n \cdot x$). Always use the dedicated backslash operator commands:
- `\sin`, `\cos`, `\tan`, `\arcsin`, `\arccos`
- `\ln`, `\log`, `\exp`
- `\lim`, `\min`, `\max`, `\sup`, `\inf`

#### 5. Dynamically Scaling Delimiters
When fractions or tall expressions are wrapped in regular parentheses `( \frac{a}{b} )`, the parentheses remain small and look awkward. Use `\left(` and `\right)` so LaTeX automatically resizes the brackets to match the exact height of the enclosed expression:
```latex
\left( \frac{x^2 + 1}{y_k - 3} \right)
```

---

### 3. Khmer Explanation (ការពន្យល់ជាភាសាខ្មែរ)
ការសរសេររូបមន្តគណិតវិទ្យា គឺជាចំណុចខ្លាំងបំផុតដែលគ្មានកម្មវិធីណាអាចប្រៀបផ្ទឹមជាមួយ LaTeX បានឡើយ។

#### ទម្រង់សរសេរគណិតវិទ្យាទាំង ២ បែប៖
1. **Inline Math (រូបមន្តក្នុងបន្ទាត់អត្ថបទ)**៖ ស្ថិតនៅក្នុងបន្ទាត់ជាមួយអក្សរធម្មតា ដោយប្រើសញ្ញា `$ ... $`។
   - ឧទាហរណ៍៖ `យើងដឹងថា $a^2 + b^2 = c^2$ ជាទ្រឹស្ដីបទពីតាករ។`
2. **Display Math (រូបមន្តដាច់ដោយឡែកនៅកណ្ដាលទំព័រ)**៖
   - ប្រសិនបើមិនចង់បានលេខសម្គាល់សមីការ៖ ប្រើ `\[ ... \]`
   - ប្រសិនបើចង់បានលេខសម្គាល់សមីការ `(1)`៖ ប្រើ `\begin{equation} ... \end{equation}`

#### និមិត្តសញ្ញាសំខាន់ៗ៖
- **ស្វ័យគុណ**៖ ប្រើសញ្ញា `^` ដូចជា `x^2` ឬបើមានច្រើនតួត្រូវដាក់វង់ក្រចក `e^{2x+1}`។
- **សន្ទស្សន៍ (ជើងក្រោម)**៖ ប្រើសញ្ញា `_` ដូចជា `x_1` ឬ `a_{n+1}`។
- **ប្រភាគ**៖ ប្រើពាក្យបញ្ជា `\frac{ភាគយក}{ភាគបែង}` ដូចជា `\frac{1}{2}`។
- **រ៉ាឌីកាល់ (ឫស)**៖ ប្រើ `\sqrt{x}` ឬឫសទី n `\sqrt[3]{8}`។

[WARNING]
កុំវាយ `sin(x)` ដោយគ្មានសញ្ញា `\` ពីមុខឱ្យសោះ ព្រោះ LaTeX នឹងគិតថាវាជាអក្សរគុណគ្នា ($s \times i \times n$)។ ត្រូវសរសេរ `\sin(x)`, `\cos(x)`, `\ln(x)` ជានិច្ច!

---

### 4. Code Example: Fundamental Math Expressions
```latex
\documentclass[12pt, a4paper]{article}
\usepackage[utf8]{inputenc}
\usepackage{amsmath, amssymb} % Standard AMS math libraries

\begin{document}

\section{Fundamental Mathematical Expressions}

\subsection{Inline Mathematics}
In any right-angled triangle with sides $a$, $b$, and hypotenuse $c$, 
the relationship is defined by $a^2 + b^2 = c^2$. 
The golden ratio is denoted by the Greek letter $\phi = \frac{1 + \sqrt{5}}{2} \approx 1.618$.

\subsection{Numbered Display Equations}
The famous Gaussian probability density function is defined as:
\begin{equation}
    f(x) = \frac{1}{\sigma \sqrt{2\pi}} \exp\left( -\frac{(x - \mu)^2}{2\sigma^2} \right)
    \label{eq:gaussian}
\end{equation}

Equation~\eqref{eq:gaussian} is characterized by mean $\mu$ and variance $\sigma^2$.

\subsection{Trigonometric and Logarithmic Identities}
Euler's formula connects complex exponentials with trigonometric functions:
\[
    e^{i\theta} = \cos\theta + i\sin\theta
\]
When evaluated at $\theta = \pi$, we obtain Euler's identity:
\[
    e^{i\pi} + 1 = 0
\]

\end{document}
```

---

### 5. Line-by-Line Breakdown
- `\usepackage{amsmath, amssymb}`: Imports standard American Mathematical Society packages providing extended symbols like `\mathbb{R}` and delimiter autoscaling.
- `$\phi = \frac{1 + \sqrt{5}}{2}$`: Renders inline Greek letter $\phi$ with a square root and fraction cleanly aligned on the text baseline.
- `\begin{equation} ... \end{equation}`: Centers the formula and assigns equation number `(1)`.
- `\label{eq:gaussian}`: Labels the equation for cross-referencing.
- `Equation~\eqref{eq:gaussian}`: Formats the reference with parentheses automatically: "Equation (1)".
- `\exp\left( -\frac{...}{...} \right)`: Uses `\left(` and `\right)` so parentheses stretch to wrap the inner fraction without clipping.

---

### 6. Expected Output
- Text with smoothly integrated inline Greek letters and fractions.
- A display equation centered on the page with a clean right-aligned `(1)`.
- Correctly sized outer parentheses embracing the fractional exponent in the exponential term.
- Euler's equations centered in elegant serif mathematical type.

---

### 7. Exercises / លំហាត់អនុវត្ត
1. Typeset the quadratic formula: $x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$ (Hint: the plus-minus sign is `\pm`).
2. Typeset the volume of a sphere: $V = \frac{4}{3}\pi r^3$ in display math mode.
3. Write an equation referencing the trigonometric identity $\sin^2\theta + \cos^2\theta = 1$.

---
---

# Chapter 9: Advanced Mathematics
## ជំពូកទី ៩: គណិតវិទ្យាកម្រិតខ្ពស់

### 1. Learning Objectives / គោលបំណងមេរៀន
By the end of this chapter, you will be able to:
- Align multi-line equations with precision using the `align` and `align*` environments.
- Typeset matrices and determinants using `pmatrix`, `bmatrix`, and `vmatrix`.
- Define piecewise and conditional functions using the `cases` environment.
- Construct limits, derivatives, partial derivatives, and definite integrals.
- Format summations ($\sum$), products ($\prod$), set theory notations, and blackboard bold sets ($\mathbb{R}, \mathbb{C}, \mathbb{Z}, \mathbb{N}$).

---

### 2. English Explanation
Advanced mathematical documents require structuring multi-step derivations, systems of equations, linear algebra matrices, and calculus integrals.

#### 1. Multi-line Aligned Equations (`amsmath`)
Do not use `eqnarray` (which has defective spacing). Always use the `align` environment from `amsmath`:
- Use `&` to mark the horizontal alignment point (typically before `=`).
- Use `\\` to break lines.
- `align` numbers every line; `align*` numbers no lines.
- To number only one specific line, add `\nonumber` to the unnumbered lines.

```latex
\begin{align}
    f(x) &= (x + 3)^2 - 4 \\
         &= x^2 + 6x + 9 - 4 \\
         &= x^2 + 6x + 5
\end{align}
```

#### 2. Matrices in LaTeX
LaTeX provides several matrix environments inside `amsmath`:
- `matrix`: Plain matrix without enclosing delimiters.
- `pmatrix`: Matrix enclosed in parentheses `( )`.
- `bmatrix`: Matrix enclosed in square brackets `[ ]`.
- `vmatrix`: Determinant enclosed in vertical bars `| |`.
- `Vmatrix`: Matrix norm enclosed in double vertical bars `|| ||`.

Syntax: Elements are separated by `&`, and rows are separated by `\\`.

#### 3. Calculus: Integrals, Limits, and Derivatives
- **Definite Integral**: `\int_{a}^{b} f(x)\,dx` (Notice `\,` which adds a thin typographic space before the differential $dx$).
- **Double / Triple Integral**: `\iint_{D}`, `\iiint_{V}`, `\oint_C` (contour integral).
- **Limit**: `\lim_{x \to 0} \frac{\sin x}{x} = 1`.
- **Derivatives**: `\frac{df}{dx}`, `\frac{d^2f}{dx^2}`.
- **Partial Derivatives**: Use `\partial`: `\frac{\partial^2 u}{\partial x^2} + \frac{\partial^2 u}{\partial y^2} = 0`.

#### 4. Summations and Products
- `\sum_{k=1}^{n} k^2 = \frac{n(n+1)(2n+1)}{6}`
- `\prod_{i=1}^{\infty} \left( 1 - \frac{1}{p_i^2} \right)`

#### 5. Sets and Blackboard Bold
With `\usepackage{amssymb}`:
- Sets of numbers: `\mathbb{R}` ($\mathbb{R}$), `\mathbb{C}` ($\mathbb{C}$), `\mathbb{Z}` ($\mathbb{Z}$), `\mathbb{N}` ($\mathbb{N}$).
- Set relations: `\in` ($\in$), `\notin` ($\notin$), `\subset` ($\subset$), `\subseteq` ($\subseteq$).
- Set operations: `\cup` ($\cup$), `\cap` ($\cap$), `\emptyset` ($\emptyset$), `\forall` ($\forall$), `\exists` ($\exists$).

---

### 3. Khmer Explanation (ការពន្យល់ជាភាសាខ្មែរ)
នៅក្នុងគណិតវិទ្យាកម្រិតខ្ពស់ យើងត្រូវជួបប្រទះការដោះស្រាយសមីការច្រើនបន្ទាត់ ម៉ាទ្រីស លីមីត ដេរីវេ និងអាំងតេក្រាល៖

#### ១. ការតម្រឹមសមីការច្រើនបន្ទាត់ (`align`)
- ប្រើ `\begin{align} ... \end{align}`។
- ដាក់សញ្ញា `&` នៅពីមុខសញ្ញាស្មើ `=` ដើម្បីឱ្យសញ្ញាស្មើត្រង់ជួរគ្នាយ៉ាងស្អាតពីលើចុះក្រោម។
- ប្រើសញ្ញា `\\` នៅចុងបន្ទាត់នីមួយៗដើម្បីចុះបន្ទាត់។

#### ២. ម៉ាទ្រីស (Matrices)
- ម៉ាទ្រីសវង់ក្រចកមូល៖ `\begin{pmatrix} a & b \\ c & d \end{pmatrix}`
- ម៉ាទ្រីសវង់ក្រចកជ្រុង៖ `\begin{bmatrix} a & b \\ c & d \end{bmatrix}`
- ដេទែមីណង់៖ `\begin{vmatrix} a & b \\ c & d \end{vmatrix}`

#### ៣. អាំងតេក្រាល និងលីមីត
- **អាំងតេក្រាល**៖ `\int_{a}^{b} f(x)\,dx` (សូមចំណាំ៖ ត្រូវដាក់ `\,` នៅពីមុខ `dx` ដើម្បីឱ្យមានចន្លោះភ្លោះស្អាតតាមក្បួនខ្នាត)។
- **លីមីត**៖ `\lim_{x \to \infty} f(x)`។
- **ផលបូកគ្រឹះ**៖ `\sum_{i=1}^{n} x_i`។
- **សំណុំលេខ**៖ `\mathbb{R}` (សំណុំចំនួនពិត), `\mathbb{N}` (សំណុំចំនួនគត់ធម្មជាតិ)។

---

### 4. Code Example: Advanced Calculus, Linear Algebra & Alignments
```latex
\documentclass[12pt, a4paper]{article}
\usepackage[utf8]{inputenc}
\usepackage{amsmath, amssymb}

\begin{document}

\section{Linear Algebra: Matrix Transformation}
Consider a linear system $A\mathbf{x} = \mathbf{b}$, where matrix $A \in \mathbb{R}^{3 \times 3}$:
\[
    A = \begin{pmatrix}
        2 & -1 & 0 \\
        -1 & 2 & -1 \\
        0 & -1 & 2
    \end{pmatrix}, \quad
    \det(A) = \begin{vmatrix}
        2 & -1 & 0 \\
        -1 & 2 & -1 \\
        0 & -1 & 2
    \end{vmatrix} = 4
\]

\section{Calculus: Multi-line Derivation}
We compute the Taylor expansion of $f(x) = \ln(1 + x)$ around $x_0 = 0$:
\begin{align}
    f(x) &= f(0) + f'(0)x + \frac{f''(0)}{2!}x^2 + \frac{f'''(0)}{3!}x^3 + \dots \nonumber \\
         &= 0 + 1\cdot x - \frac{1}{2}x^2 + \frac{2}{6}x^3 - \dots \\
         &= \sum_{n=1}^{\infty} \frac{(-1)^{n-1}}{n} x^n \quad \text{for } |x| < 1
\end{align}

\section{Piecewise Defined Function}
The absolute value function $f(x) = |x|$ is defined formally as:
\begin{equation}
    f(x) = \begin{cases}
        x,  & \text{if } x \ge 0, \\
        -x, & \text{if } x < 0.
    \end{cases}
\end{equation}

\section{Definite Multivariable Integral}
The volume under the paraboloid $z = x^2 + y^2$ over the circular region $D$ is:
\[
    V = \iint_D (x^2 + y^2) \, dx \, dy = \int_0^{2\pi} \int_0^R r^3 \, dr \, d\theta = \frac{\pi R^4}{2}
\]

\end{document}
```

---

### 5. Line-by-Line Breakdown
- `\mathbb{R}^{3 \times 3}`: Prints real numbers in blackboard bold font $\mathbb{R}$.
- `\begin{pmatrix}`: Typesets a matrix enclosed in standard smooth parentheses.
- `\begin{vmatrix}`: Typesets the matrix enclosed in straight vertical determinant bars.
- `\begin{align}`: Aligns the mathematical derivation at each `&=` sign across all three lines.
- `\nonumber`: Suppresses the equation number on the first line while preserving numbering on equations (1) and (2).
- `\begin{cases}`: Creates an aligned conditional function with a large left brace $\{$.
- `\, dx \, dy`: Adds the standard thin typographic space between the integrand and differentials.

---

### 6. Expected Output
- A $3 \times 3$ matrix and its determinant typeset with perfect vertical and horizontal column spacing.
- A 3-step Taylor series expansion aligned at the equals signs.
- A piecewise definition with a large left brace.
- A double integral with limits placed above and below the integral signs.

---

### 7. Exercises / លំហាត់អនុវត្ត
1. Typeset the $2 \times 2$ inverse matrix formula:
   $A^{-1} = \frac{1}{ad - bc} \begin{pmatrix} d & -b \\ -c & a \end{pmatrix}$.
2. Typeset the Cauchy-Schwarz Inequality:
   $\left( \sum_{i=1}^n a_i b_i \right)^2 \le \left( \sum_{i=1}^n a_i^2 \right) \left( \sum_{i=1}^n b_i^2 \right)$.
3. Define the Heaviside step function $H(x)$ using `cases`.

---
---

# Chapter 10: Mathematical Theorems & Proofs
## ជំពូកទី ១០: ទ្រឹស្ដីបទ និយមន័យ និងការបង្ហាញបំណកស្រាយ (Theorems & Proofs)

### 1. Learning Objectives / គោលបងបំណងមេរៀន
By the end of this chapter, you will be able to:
- Configure theorem, definition, lemma, and corollary environments using `amsthm`.
- Apply distinct typographic theorem styles (`plain`, `definition`, `remark`).
- Implement the `proof` environment with automated Q.E.D. ($\square$) end-of-proof symbols.
- Control theorem numbering tied to chapters or sections.

---

### 2. English Explanation
In rigorous academic mathematics, computer science, and physics, statements are categorized into formal declarations: **Theorems**, **Definitions**, **Lemmas**, **Corollaries**, and **Proofs**.

The AMS theorem package (`amsthm`) provides the universal standard for declaring theorem environments:
```latex
\usepackage{amsthm}
```

#### Theorem Styles
`amsthm` defines three typographic styles:
1. `plain` (Default): Bold title, italic body text. Used for: **Theorem**, **Lemma**, **Corollary**, **Proposition**.
2. `definition`: Bold title, upright (roman) body text. Used for: **Definition**, **Condition**, **Problem**, **Example**.
3. `remark`: Italic title, upright body text. Used for: **Remark**, **Note**, **Notation**, **Conclusion**.

#### Syntax for Declaring Environments
In the preamble:
```latex
\theoremstyle{plain}
\newtheorem{theorem}{Theorem}[section] % Numbered as Theorem 1.1, 1.2
\newtheorem{lemma}[theorem]{Lemma}     % Shares the same counter as theorem
\newtheorem{corollary}[theorem]{Corollary}

\theoremstyle{definition}
\newtheorem{definition}{Definition}[section]

\theoremstyle{remark}
\newtheorem*{remark}{Remark}           % Asterisk means unnumbered
```

#### The `proof` Environment
`amsthm` provides the `proof` environment out-of-the-box. It begins with an italicized *"Proof."* and terminates automatically with an open tombstone Q.E.D. symbol ($\square$) aligned to the right margin.

---

### 3. Khmer Explanation (ការពន្យល់ជាភាសាខ្មែរ)
ក្នុងការសរសេរអត្ថបទគណិតវិទ្យា កិច្ចការស្រាវជ្រាវ និងសារណា យើងត្រូវបែងចែកឱ្យច្បាស់រវាង **ទ្រឹស្ដីបទ (Theorem)**, **និយមន័យ (Definition)**, **បទពិសោធ/លក្ខណៈ (Lemma)**, និង **សម្រាយបញ្ជាក់ (Proof)**។

កញ្ចប់ `\usepackage{amsthm}` ជួយបង្កើតបរិស្ថានទាំងនេះដោយស្វ័យប្រវត្តិ៖
- **Theorem / Lemma**៖ ចំណងជើងដិត អក្សរខាងក្នុងមានទម្រង់ទ្រេត។
- **Definition**៖ ចំណងជើងដិត អក្សរខាងក្នុងត្រង់ធម្មតា។
- **Proof**៖ ចាប់ផ្ដើមដោយពាក្យ *Proof.* និងបញ្ចប់ទៅវិញដោយសញ្ញាការ៉េ $\square$ (Q.E.D.) នៅខាងស្ដាំបង្អស់នៃបន្ទាត់ដោយស្វ័យប្រវត្តិ។

---

### 4. Code Example: Theorems, Lemmas, and Proofs
```latex
\documentclass[12pt, a4paper]{article}
\usepackage[utf8]{inputenc}
\usepackage{amsmath, amssymb, amsthm}

% Theorem setup in preamble
\theoremstyle{plain}
\newtheorem{theorem}{Theorem}[section]
\newtheorem{lemma}[theorem]{Lemma}
\newtheorem{corollary}[theorem]{Corollary}

\theoremstyle{definition}
\newtheorem{definition}{Definition}[section]
\newtheorem{example}{Example}[section]

\theoremstyle{remark}
\newtheorem*{remark}{Remark}

\begin{document}

\section{Prime Numbers and Divisibility}

\begin{definition}[Prime Number]
An integer $p > 1$ is called a \textbf{prime number} if its only positive 
divisors are $1$ and $p$.
\end{definition}

\begin{theorem}[Euclid's Theorem on Infinitude of Primes]
There are infinitely many prime numbers.
\label{thm:euclid}
\end{theorem}

\begin{proof}
Assume, for contradiction, that there are only finitely many primes, 
denoted by $p_1, p_2, \dots, p_n$. 

Consider the integer:
\[
    N = (p_1 \cdot p_2 \cdots p_n) + 1
\]
The integer $N$ is strictly greater than $1$, so it must have at least one prime divisor $q$. 
If $q$ were one of our listed primes $p_i$, then $q$ would divide both the product 
$(p_1 \cdots p_n)$ and $N$. Consequently, $q$ would have to divide their difference:
\[
    N - (p_1 \cdots p_n) = 1
\]
However, no prime number divides $1$. This is a direct contradiction. 
Therefore, the number of primes must be infinite.
\end{proof}

\begin{corollary}
For any integer $k \ge 2$, there exists a prime $p > k$.
\end{corollary}

\begin{remark}
Euclid's proof is one of the earliest examples of proof by contradiction in recorded mathematics.
\end{remark}

\end{document}
```

---

### 5. Line-by-Line Breakdown
- `\newtheorem{theorem}{Theorem}[section]`: Configures the `theorem` environment to be prefixed by section number (e.g., **Theorem 1.1**).
- `\newtheorem{lemma}[theorem]{Lemma}`: The `[theorem]` argument ensures Lemmas and Theorems share one unified counter sequence (Theorem 1.1, Lemma 1.2, Theorem 1.3), preventing confusing duplicate numbers.
- `\begin{definition}[Prime Number]`: The optional brackets provide a descriptive name printed in bold parentheses next to the definition number.
- `\begin{proof} ... \end{proof}`: Typesets the proof body and automatically positions the Q.E.D. box symbol ($\square$) on the final line.

---

### 6. Expected Output
- A distinct, indented **Definition 1.1 (Prime Number)** with upright text.
- **Theorem 1.1 (Euclid's Theorem on Infinitude of Primes)** in bold with italicized body text.
- An indented proof starting with *Proof.* and concluding with a right-aligned open tombstone $\square$.
- **Corollary 1.2** automatically taking the next sequential number.
- An unnumbered italicized *Remark.* block.

---

### 7. Exercises / លំហាត់អនុវត្ត
1. Write a theorem statement for the Pythagorean Theorem, followed by a formal proof.
2. Define the concept of a "Continuous Function" in a `definition` environment.
3. Label your theorem and reference it in a separate paragraph using `Theorem~\ref{...}`.

---

### 8. Chapter Summary / សង្ខេបជំពូក
- Inline math is written with `$ ... $`, and display math is written with `\[ ... \]` or `equation`.
- Always use operator macros (`\sin`, `\ln`, `\lim`) rather than typing raw variable names.
- Multi-line derivations should be written using `amsmath`'s `align` environment with `&` alignment.
- Formal academic mathematics is organized cleanly using `amsthm` (`theorem`, `definition`, `proof`).
