import { readdir, readFile } from 'fs/promises'
import path from 'path'
import JSZip from 'jszip'

export async function GET() {
    const dir = path.join(process.cwd(), 'public', 'img', 'slideshow')
    const files = await readdir(dir)
    const imageFiles = files.filter((f) => /\.(png|jpe?g|webp)$/i.test(f))

    const zip = new JSZip()
    for (const file of imageFiles) {
        const data = await readFile(path.join(dir, file))
        zip.file(file, data)
    }

    const buffer = await zip.generateAsync({ type: 'arraybuffer' })
    const blob = new Blob([buffer], { type: 'application/zip' })

    return new Response(blob, {
        headers: {
            'Content-Disposition': 'attachment; filename="best-shots.zip"',
        },
    })
}
