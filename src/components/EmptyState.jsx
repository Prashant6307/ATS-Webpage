import { Plus } from 'lucide-react'

export default function EmptyState({
    eyebrow = 'Nothing here yet',
    title = 'No results found.',
    description = 'There is currently nothing to display in this section.',
}) {
    return (
        <div className="flex min-h-[240px] items-center justify-center bg-[#f5f3ee] px-6">
            <div className="w-full max-w-lg border-2 border-black bg-[#d9ccff] p-8 shadow-[6px_6px_0px_#000]">
                <div className="flex items-start justify-between gap-6">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600">
                            {eyebrow}
                        </p>

                        <h2 className="mt-4 text-3xl font-black uppercase leading-none tracking-tight">
                            {title}
                        </h2>

                        <p className="mt-4 max-w-md text-sm leading-6 text-black/60">
                            {description}
                        </p>
                    </div>

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center border-2 border-black bg-white">
                        <Plus size={20} />
                    </div>
                </div>
            </div>
        </div>
    )
}