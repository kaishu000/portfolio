'use client'
import { useState } from 'react'

const ButtonBestShot = () => {
    const [loading, setLoading] = useState(false)

    const handleDownload = async () => {
        setLoading(true)
        try {
            const res = await fetch('/api/download-slideshow')
            const blob = await res.blob()
            const url = URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = 'best-shots.zip'
            a.click()
            URL.revokeObjectURL(url)
        } finally {
            setLoading(false)
        }
    }

    return (
        <button
            onClick={handleDownload}
            disabled={loading}
            className="absolute bottom-4 right-4 px-6 py-2 font-bold border transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {loading ? 'Preparing...' : 'Download Best Shots'}
        </button>
    )
}

export default ButtonBestShot
