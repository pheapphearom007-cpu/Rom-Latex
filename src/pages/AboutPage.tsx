import { Link } from 'react-router-dom'
import {
  BookOpen,
  Code,
  Download,
  GraduationCap,
  Layers,
  Sparkles,
  Terminal,
} from 'lucide-react'
import { Seo } from '@/components/Seo'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { COURSES } from '@/data/catalog'

export function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-12 py-4">
      <Seo
        title="About Learn LaTeX — Modern, Interactive LaTeX Education"
        description="Learn LaTeX was built to make mathematical and academic document preparation clear, accessible, and enjoyable."
      />

      <div className="space-y-4 text-center sm:text-left">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">The Mission</p>
        <h1 className="font-serif text-4xl font-bold tracking-tight md:text-5xl">
          Making LaTeX Accessible to Every Learner
        </h1>
        <p className="max-w-3xl text-lg text-muted-foreground leading-relaxed">
          Traditional LaTeX guides rely on hundreds of pages of static PDFs or dense wikis. We believe the best way to
          master LaTeX is by reading concise explanations, inspecting live examples, and solving interactive drills
          right in your browser.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        <Card>
          <CardHeader>
            <Terminal className="h-6 w-6 text-accent" />
            <CardTitle className="text-lg">Zero Installation</CardTitle>
            <CardDescription>
              Start learning immediately in your browser without installing multi-gigabyte distributions.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <Code className="h-6 w-6 text-accent" />
            <CardTitle className="text-lg">Real Code Drills</CardTitle>
            <CardDescription>
              Fix broken syntax, write equations from scratch, and predict typeset output with instant feedback.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <Layers className="h-6 w-6 text-accent" />
            <CardTitle className="text-lg">Structured Curriculum</CardTitle>
            <CardDescription>
              Forty curated lessons spanning beginner document structure up through TikZ and thesis writing.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      <section className="space-y-6">
        <div className="border-b border-border pb-3">
          <h2 className="font-serif text-2xl font-bold">Curriculum Roadmap</h2>
          <p className="text-sm text-muted-foreground">Four progressively challenging courses</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {COURSES.map((course) => (
            <Card key={course.id} className="flex flex-col justify-between">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wide text-accent">
                    Level {course.level} · {course.difficulty}
                  </span>
                  <span className="text-xs text-muted-foreground">~{course.estimatedHours} hours</span>
                </div>
                <CardTitle className="mt-1 font-serif text-xl">{course.title}</CardTitle>
                <CardDescription>{course.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link to={`/learn/${course.slug}`}>Explore Course ({course.lessonIds.length} lessons)</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-6 rounded-2xl border border-border bg-card/60 p-6 sm:p-8">
        <div className="flex items-center gap-2 text-accent">
          <Download className="h-5 w-5" />
          <h2 className="font-serif text-2xl font-bold text-foreground">When You Need a Real PDF Engine</h2>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Learn LaTeX uses KaTeX and lightweight parsing for fast, immediate feedback in the browser. When you are ready
          to compile your final thesis, research paper, or book into a publication-ready PDF, we recommend:
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-4">
            <h3 className="font-serif text-base font-semibold">Local TeX Distributions</h3>
            <ul className="mt-2 space-y-1.5 text-xs text-muted-foreground">
              <li>• <strong>TeX Live:</strong> Cross-platform standard for Linux and Windows.</li>
              <li>• <strong>MacTeX:</strong> Complete bundle for macOS with TeXShop.</li>
              <li>• <strong>MiKTeX:</strong> Windows and Linux distribution with on-demand package installer.</li>
            </ul>
          </div>

          <div className="rounded-xl border border-border bg-card p-4">
            <h3 className="font-serif text-base font-semibold">Cloud & Modern Editors</h3>
            <ul className="mt-2 space-y-1.5 text-xs text-muted-foreground">
              <li>• <strong>Overleaf:</strong> Collaborative web-based LaTeX editor with real-time compilation.</li>
              <li>• <strong>VS Code + LaTeX Workshop:</strong> Top local setup with linting and SyncTeX reverse search.</li>
              <li>• <strong>Texmaker / TeXstudio:</strong> Dedicated, battle-tested open source IDEs.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="text-center space-y-4 py-6">
        <Sparkles className="mx-auto h-8 w-8 text-accent" />
        <h2 className="font-serif text-3xl font-bold">Ready to master LaTeX?</h2>
        <p className="text-muted-foreground">Begin with Lesson 1 or experiment freely in our playground.</p>
        <div className="flex justify-center gap-3 pt-2">
          <Button asChild size="lg">
            <Link to="/learn">
              <GraduationCap className="mr-2 h-5 w-5" />
              Go to Curriculum
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/playground">
              <BookOpen className="mr-2 h-5 w-5" />
              Open Playground
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
