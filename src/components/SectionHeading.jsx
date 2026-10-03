
export default function SectionHeading({
  eyebrow,
  title,
  description,
  light = false,
}) {
  return (
    <div className="max-w-3xl">
      <p
        className={`mb-4 text-xs font-bold uppercase tracking-[0.25em] ${
          light ? 'text-orange-400' : 'text-orange-600'
        }`}
      >
        {eyebrow}
      </p>

      <h2
        className={`text-4xl font-black leading-[1.05] tracking-tight md:text-6xl ${
          light ? 'text-white' : 'text-black'
        }`}
      >
        {title}
      </h2>

      {description && (
        <p
          className={`mt-5 max-w-xl text-base leading-7 md:text-lg ${
            light ? 'text-neutral-300' : 'text-neutral-600'
          }`}
        >
          {description}
        </p>
      )}
    </div>
  )
}