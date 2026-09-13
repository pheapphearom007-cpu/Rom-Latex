import { useEffect } from 'react'

export function Seo({ title, description }: { title: string; description: string }) {
  useEffect(() => {
    document.title = title
    const selector = 'meta[name="description"]'
    let tag = document.querySelector(selector)
    if (!tag) {
      tag = document.createElement('meta')
      tag.setAttribute('name', 'description')
      document.head.appendChild(tag)
    }
    tag.setAttribute('content', description)
  }, [title, description])
  return null
}
