import { Component, type ErrorInfo, type ReactNode } from 'react'
import { Button } from '@/components/ui/button'

type Props = { children: ReactNode }
type State = { message?: string }

export class ErrorBoundary extends Component<Props, State> {
  state: State = {}

  static getDerivedStateFromError(error: Error): State {
    return { message: error.message }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info)
  }

  render() {
    if (!this.state.message) return this.props.children
    return (
      <div className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center gap-4 p-8 text-center">
        <h1 className="font-serif text-2xl">Something went wrong</h1>
        <p className="text-muted-foreground">The page failed to render. You can reload and continue learning.</p>
        <Button onClick={() => window.location.assign('/learn')}>Back to dashboard</Button>
      </div>
    )
  }
}
