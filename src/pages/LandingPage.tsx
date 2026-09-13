import { Link } from 'react-router-dom'
import { Seo } from '@/components/Seo'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { COURSES, ROADMAP } from '@/data/catalog'
import { ArrowRight, BookOpenCheck, LineChart, PenLine, Sparkles } from 'lucide-react'

const faqs = [
  {
    q: 'Do I need a TeX distribution installed?',
    a: 'Not to learn here. The playground renders common markup and mathematics in the browser. Install TeX Live or MiKTeX when you need a production PDF.',
  },
  {
    q: 'Is this a full TeX engine?',
    a: 'No. Browser preview typesets math with KaTeX and maps frequent document commands to HTML. Unsupported features are explained rather than faked as PDF output.',
  },
  {
    q: 'Can I keep my progress?',
    a: 'Yes. Progress is stored in this browser. Connect Supabase Auth to sync across devices.',
  },
  {
    q: 'Who is the curriculum for?',
    a: 'Beginners writing their first article, students in STEM courses, and researchers who need reliable mathematics and bibliographies.',
  },
]

export function LandingPage() {
  return (
    <div>
      <Seo
        title="Learn LaTeX. Write Beautiful Documents."
        description="Master LaTeX from your first document to advanced mathematical, academic, and research writing."
      />
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 lg:grid-cols-2 lg:py-24">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">Interactive LaTeX school</p>
          <h1 className="mt-4 font-serif text-4xl leading-tight tracking-tight md:text-5xl">
            Learn LaTeX. Write Beautiful Documents.
          </h1>
          <p className="mt-4 max-w-xl text-lg text-muted-foreground">
            Master LaTeX from your first document to advanced mathematical, academic, and research writing.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/learn">Start Learning</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/playground">Try LaTeX Playground</Link>
            </Button>
          </div>
        </div>
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle className="text-base">Editor preview</CardTitle>
            <CardDescription>Source on the left, typeset output on the right.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-2">
            <pre className="rounded-lg bg-muted p-3 font-mono text-xs leading-5">{`\\section{Introduction}
Inline: $E=mc^2$
$$\\frac{a}{b}$$`}</pre>
            <div className="rounded-lg border border-border p-3 font-serif">
              <h2 className="text-xl">Introduction</h2>
              <p className="mt-2 text-sm">
                Inline: <em>E = mc²</em>
              </p>
              <p className="mt-3 text-center text-2xl">a/b</p>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="border-y border-border bg-card/60 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="font-serif text-3xl">Why learn LaTeX?</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              ['Stable structure', 'Sections, figures, and equations keep their numbers as the paper evolves.'],
              ['Mathematics that scales', 'Fractions, matrices, and aligned proofs stay readable in print.'],
              ['Academic defaults', 'Bibliographies, cross-references, and templates match journal expectations.'],
            ].map(([title, body]) => (
              <Card key={title}>
                <CardHeader>
                  <CardTitle>{title}</CardTitle>
                  <CardDescription>{body}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="font-serif text-3xl">Beginner → Advanced learning path</h2>
        <ol className="mt-8 space-y-3">
          {ROADMAP.map((step, index) => (
            <li key={step.id} className="flex items-center gap-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm text-primary-foreground">
                {index + 1}
              </span>
              <span className="font-medium">{step.label}</span>
              {index < ROADMAP.length - 1 ? <ArrowRight className="h-4 w-4 text-muted-foreground" /> : null}
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16">
        <h2 className="font-serif text-3xl">Course categories</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {COURSES.map((course) => (
            <Card key={course.id}>
              <CardHeader>
                <CardTitle>{course.title}</CardTitle>
                <CardDescription>
                  {course.lessonIds.length} lessons · {course.difficulty} · {course.estimatedHours} hours
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{course.description}</p>
                <Button asChild className="mt-4" variant="outline">
                  <Link to={`/learn/${course.slug}`}>View course</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-y border-border py-16">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 md:grid-cols-3">
          <Feature icon={PenLine} title="Interactive learning" body="Read an explanation, inspect source, and open any example in the playground." />
          <Feature icon={BookOpenCheck} title="Practice exercises" body="Multiple choice, fill-in, write-code, repair, and predict-the-output drills." />
          <Feature icon={LineChart} title="Progress tracking" body="Lessons, exercises, streaks, and professional achievements stay on your dashboard." />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="font-serif text-3xl">LaTeX Playground</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          A real editor with line numbers, syntax highlighting, live preview, copy, and .tex download. Mathematics is typeset with KaTeX; document commands map to a structured preview.
        </p>
        <Button asChild className="mt-6">
          <Link to="/playground">Open playground</Link>
        </Button>
      </section>

      <section className="bg-card/60 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="font-serif text-3xl">From learners</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              ['Graduate student', 'The section on citations finally made BibTeX feel mechanical instead of magical.'],
              ['TA for calculus', 'Being able to open every matrix example in the playground saved hours of office-hours markup.'],
              ['Industry researcher', 'I used the academic path to rebuild our internal report template without fighting Word.'],
            ].map(([role, quote]) => (
              <Card key={role}>
                <CardHeader>
                  <CardDescription>“{quote}”</CardDescription>
                  <CardTitle className="text-base">{role}</CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16">
        <h2 className="font-serif text-3xl">FAQ</h2>
        <Accordion type="single" collapsible className="mt-6">
          {faqs.map((item) => (
            <AccordionItem key={item.q} value={item.q}>
              <AccordionTrigger>{item.q}</AccordionTrigger>
              <AccordionContent>{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <section className="border-t border-border py-16 text-center">
        <Sparkles className="mx-auto h-6 w-6 text-accent" />
        <h2 className="mt-4 font-serif text-3xl">Start with lesson one</h2>
        <p className="mt-2 text-muted-foreground">Forty lessons, a playground, and exercises that actually check your markup.</p>
        <Button asChild size="lg" className="mt-6">
          <Link to="/learn/latex-fundamentals/introduction-to-latex">Start Learning</Link>
        </Button>
      </section>
    </div>
  )
}

function Feature({
  icon: Icon,
  title,
  body,
}: {
  icon: typeof PenLine
  title: string
  body: string
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <Icon className="h-5 w-5 text-accent" />
      <h3 className="mt-3 font-serif text-xl">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{body}</p>
    </div>
  )
}
