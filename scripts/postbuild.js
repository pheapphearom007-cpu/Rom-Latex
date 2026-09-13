import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')

const distDir = path.join(rootDir, 'dist')
const buildDir = path.join(rootDir, 'build')
const publicDir = path.join(rootDir, 'public')

function copyDirRecursive(src, dest) {
  fs.mkdirSync(dest, { recursive: true })
  const entries = fs.readdirSync(src, { withFileTypes: true })
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)
    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath)
    } else {
      fs.copyFileSync(srcPath, destPath)
    }
  }
}

// 1. Create 404.html in dist (Render static SPA fallback)
const distIndex = path.join(distDir, 'index.html')
const dist404 = path.join(distDir, '404.html')
if (fs.existsSync(distIndex)) {
  fs.copyFileSync(distIndex, dist404)
  console.log('Created dist/404.html (SPA fallback for Render)')
}

// 2. Mirror dist to build
copyDirRecursive(distDir, buildDir)
console.log('Mirrored dist/ -> build/')

// 3. Mirror index.html and 404.html to public as extra safety
if (fs.existsSync(distIndex)) {
  fs.copyFileSync(distIndex, path.join(publicDir, 'index.html'))
  fs.copyFileSync(distIndex, path.join(publicDir, '404.html'))
  console.log('Copied index.html and 404.html to public/')
}

console.log('Postbuild complete! Deployable to dist, build, or public.')
