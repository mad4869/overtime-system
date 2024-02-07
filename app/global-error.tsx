'use client'

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <html>
            <body className="text-white bg-primary">
                <div className="flex flex-col items-center justify-center w-screen min-h-screen gap-4">
                    <h2 className="text-2xl font-bold">Terjadi Error</h2>
                    <p className="text-center text-danger">{error.message}</p>
                    <button onClick={() => reset()} className="cursor-pointer text-secondary hover:underline">
                        Coba lagi
                    </button>
                </div>
            </body>
        </html>
    )
}