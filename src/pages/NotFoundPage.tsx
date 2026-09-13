import { Link } from 'react-router-dom'
import { ArrowLeft, Home, Search } from 'lucide-react'
import { Seo } from '@/components/Seo'
import { Button } from '@/components/ui/button'

export function NotFoundPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center text-center">
      <Seo title="404 — Page Not Found" description="The requested page could not be found." />

      <div className="w-full rounded-xl border border-destructive/30 bg-destructive/10 p-5 text-left font-mono text-xs">
        <p className="font-bold text-destructive">! LaTeX Error: Page not found.</p>
        <p className="mt-1 text-muted-foreground">l.404 \input&#123;unknown-route.tex&#125;</p>
        <p className="mt-2 text-foreground/80">
          ? Here is how much of TeX&apos;s memory you used:
          <br />
          &nbsp;&nbsp;1 string out of 494586
          <br />
          &nbsp;&nbsp;Emergency stop.
        </p>
      </div>

      <h1 className="mt-6 font-serif text-3xl font-bold">404: Page Not Found</h1>
      <p className="mt-2 text-muted-foreground">
        The document or section you are looking for does not exist or has been moved.
      </p>

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Button asChild>
          <Link to="/learn">
            <Home className="mr-1.5 h-4 w-4" />
            Curriculum
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/search">
            <Search className="mr-1.5 h-4 w-4" />
            Search
          </Link>
        </Button>
        <Button asChild variant="ghost">
          <Link to="/">
            <ArrowLeft className="mr-1.5 h-4 w-4" />
            Home
          </Link>
        </Button>
      </div>
    </div>
  )
}
