export default function LoadingState({
    label = 'Loading...',
}) {
    return (
        <div className="flex min-h-[240px] items-center justify-center bg-[#f5f3ee] px-6">
            <div className="flex flex-col items-center gap-5 text-center">
                <div className="relative h-10 w-10">
                    <div className="absolute inset-0 animate-spin border-2 border-black/10 border-t-orange-500" />
                    <div className="absolute inset-2 border border-black" />
                </div>

                <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-black">
                        {label}
                    </p>

                    <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.15em] text-neutral-400">
                        ATS / Please wait
                    </p>
                </div>
            </div>
        </div>
    )
}