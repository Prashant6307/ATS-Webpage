import { RefreshCw } from 'lucide-react'

export default function ErrorState({
    message = 'Something went wrong.',
    onRetry,
}) {
    return (
        <div className="flex min-h-[240px] items-center justify-center bg-[#f5f3ee] px-6">
            <div className="w-full max-w-md border-2 border-black bg-white p-8 text-center shadow-[6px_6px_0px_#000]">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600">
                    Error / 500
                </p>

                <h2 className="mt-4 text-2xl font-black uppercase tracking-tight">
                    Unable to load this.
                </h2>

                <p className="mt-3 text-sm leading-6 text-neutral-600">
                    {message}
                </p>

                {onRetry && (
                    <button
                        type="button"
                        onClick={onRetry}
                        className="group mt-6 inline-flex items-center gap-2 bg-black px-5 py-3 text-xs font-bold uppercase tracking-[0.15em] text-white transition-colors hover:bg-orange-500 hover:text-black"
                    >
                        <RefreshCw
                            size={14}
                            className="transition-transform duration-300 group-hover:rotate-180"
                        />
                        Try again
                    </button>
                )}
            </div>
        </div>
    )
}