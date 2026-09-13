import { Link } from 'react-router-dom'
import { Seo } from '@/components/Seo'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useProgressStore } from '@/stores/progress-store'

export function BookmarksPage() {
  const bookmarks = useProgressStore((s) => s.bookmarks)
  const toggle = useProgressStore((s) => s.toggleBookmark)

  return (
    <div className="space-y-6">
      <Seo title="Bookmarks — Learn LaTeX" description="Saved lessons, commands, and examples." />
      <h1 className="font-serif text-3xl">Bookmarks</h1>
      {bookmarks.length === 0 ? (
        <p className="text-muted-foreground">Bookmark a lesson, command, or example to collect it here.</p>
      ) : (
        <div className="grid gap-3">
          {bookmarks.map((item) => (
            <Card key={item.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
                <div>
                  <p className="text-xs uppercase text-muted-foreground">{item.type}</p>
                  <CardTitle className="text-base">{item.title}</CardTitle>
                </div>
                <div className="flex gap-2">
                  <Button asChild size="sm">
                    <Link to={item.href}>Open</Link>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      toggle({ type: item.type, targetId: item.targetId, title: item.title, href: item.href })
                    }
                  >
                    Remove
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0 text-xs text-muted-foreground">
                Saved {new Date(item.createdAt).toLocaleDateString()}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
