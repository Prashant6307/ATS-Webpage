export default function TechSketch() {
    return (
        <div className="relative h-[360px] w-full max-w-[520px]">

            {/* Main orbit */}
            <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 animate-[spin_18s_linear_infinite] rounded-full border border-orange-500/50">
                <div className="absolute -left-2 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-orange-500" />
            </div>

            {/* Second orbit */}
            <div className="absolute left-1/2 top-1/2 h-72 w-40 -translate-x-1/2 -translate-y-1/2 animate-[spin_24s_linear_infinite_reverse] rotate-45 rounded-[50%] border border-white/20" />

            {/* Core */}
            <div className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 rotate-3 items-center justify-center border-2 border-orange-500 bg-black shadow-[10px_10px_0px_#f97316]">

                <div className="text-center">
                    <span className="block text-3xl font-black tracking-[-0.08em]">
                        ATS
                    </span>

                    <span className="mt-1 block text-[7px] font-bold uppercase tracking-[0.3em] text-orange-400">
                        Tech Society
                    </span>
                </div>
            </div>

            {/* Connection lines */}
            <div className="absolute left-[12%] top-[25%] h-px w-[25%] rotate-[18deg] bg-white/30" />

            <div className="absolute right-[8%] top-[30%] h-px w-[28%] rotate-[-20deg] bg-orange-500/60" />

            <div className="absolute bottom-[25%] left-[15%] h-px w-[22%] rotate-[-15deg] bg-white/20" />

            <div className="absolute bottom-[20%] right-[12%] h-px w-[24%] rotate-[18deg] bg-orange-500/50" />

            {/* Technical nodes */}
            <span className="absolute left-[8%] top-[22%] h-2 w-2 rounded-full border border-orange-500" />

            <span className="absolute right-[7%] top-[27%] h-3 w-3 border border-orange-500" />

            <span className="absolute bottom-[22%] left-[13%] h-2 w-2 bg-orange-500" />

            <span className="absolute bottom-[18%] right-[10%] h-2 w-2 rounded-full border border-white/50" />

            {/* Labels */}
            <span className="absolute left-0 top-8 font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-500">
                Build
            </span>

            <span className="absolute right-0 top-16 font-mono text-[9px] uppercase tracking-[0.2em] text-orange-400">
                Create
            </span>

            <span className="absolute bottom-10 left-5 font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-500">
                Learn
            </span>

            <span className="absolute bottom-16 right-0 font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-500">
                Explore
            </span>

            {/* Coordinates */}
            <span className="absolute left-1/2 top-2 -translate-x-1/2 font-mono text-[8px] text-neutral-600">
                26.8467° N
            </span>

            <span className="absolute bottom-2 left-1/2 -translate-x-1/2 font-mono text-[8px] text-neutral-600">
                80.9462° E
            </span>
        </div>
    )
}