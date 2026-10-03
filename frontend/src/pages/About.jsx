import SEO from '../components/SEO'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import SectionHeading from '../components/SectionHeading'
import ParticleField from '../components/ParticleField'

const domains = [
  {
    number: '01',
    title: 'Web Development',
    description: 'Modern websites, applications and digital experiences.',
  },
  {
    number: '02',
    title: 'AI / ML',
    description: 'Machine learning, intelligent systems and experimentation.',
  },
  {
    number: '03',
    title: 'Cloud Computing',
    description: 'Scalable infrastructure, deployment and cloud technologies.',
  },
  {
    number: '04',
    title: 'Cyber Security',
    description: 'Security awareness, ethical hacking and digital protection.',
  },
  {
    number: '05',
    title: 'App Development',
    description: 'Building useful mobile experiences and applications.',
  },
  {
    number: '06',
    title: 'Data & Analytics',
    description: 'Turning data into insights, decisions and ideas.',
  },
]

const values = [
  {
    number: '01',
    title: 'Stay Curious',
    text: 'Ask better questions. Explore unfamiliar technologies. Keep learning.',
  },
  {
    number: '02',
    title: 'Build Things',
    text: 'Ideas become meaningful when we turn them into something people can use.',
  },
  {
    number: '03',
    title: 'Collaborate',
    text: 'Different perspectives create better solutions and stronger teams.',
  },
  {
    number: '04',
    title: 'Keep Experimenting',
    text: 'Try, fail, improve and build again. Progress comes from experimentation.',
  },
]

export default function About() {
  return (
    <>
    <SEO
    title="About"
    description="Learn about Amity Tech Society, our mission, technical domains, values, and student community."
/>
    <main className="overflow-hidden bg-[#f5f3ee]">

      {/* HERO */}
      <section className="bg-black px-5 py-24 text-white md:px-10 md:py-32">
        <ParticleField count={35} />
        <div className="mx-auto max-w-[1440px]">

          <div className="mb-16 flex items-center justify-between border-b border-white/20 pb-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-orange-400">
              About ATS
            </span>

            <span className="font-mono text-[10px] text-neutral-500">
              01 / 04
            </span>
          </div>

          <p className="mb-8 text-xs font-bold uppercase tracking-[0.3em] text-orange-400">
            Amity Tech Society
          </p>

          <h1 className="max-w-[1200px] text-[clamp(4rem,10vw,10rem)] font-black uppercase leading-[0.78] tracking-[-0.07em]">
            We
            <br />
            Build.
            <br />
            <span className="text-orange-500">Together.</span>
          </h1>

          <div className="mt-16 flex flex-col justify-between gap-10 border-t border-white/20 pt-8 md:flex-row md:items-end">
            <p className="max-w-xl text-lg leading-8 text-neutral-400">
              ATS is a student-led technical community built around curiosity,
              experimentation and collaboration.
            </p>

            <ArrowDownRight
              size={42}
              strokeWidth={1.5}
              className="text-orange-500"
            />
          </div>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section className="px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-[1440px]">

          <div className="grid gap-16 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange-600">
                02 / Who we are
              </p>
            </div>

            <div>
              <h2 className="max-w-5xl text-4xl font-black uppercase leading-[0.9] tracking-tight md:text-6xl lg:text-8xl">
                Technology
                <br />
                is a way
                <br />
                of <span className="text-orange-600">thinking.</span>
              </h2>

              <p className="mt-10 max-w-2xl text-base leading-8 text-neutral-600 md:text-lg">
                Amity Tech Society brings together students who want to explore
                technology beyond the classroom. We create opportunities to
                learn, experiment, build projects and collaborate with people
                who share the same curiosity.
              </p>

              <p className="mt-6 max-w-2xl text-base leading-8 text-neutral-600 md:text-lg">
                From workshops and hackathons to technical projects and
                competitions, ATS is designed to turn learning into practical
                experience.
              </p>

              <Link
                to="/events"
                className="mt-10 inline-flex items-center gap-2 border-b-2 border-black pb-2 text-sm font-bold uppercase tracking-wider"
              >
                Explore our events
                <ArrowUpRight size={16} />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* DOMAINS */}
      <section className="bg-[#d9ccff] px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[1440px]">

          <SectionHeading
            eyebrow="03 / Our playground"
            title="Explore. Learn. Build."
            description="Technology is bigger than a single discipline. ATS gives students space to explore different directions."
          />

          <div className="mt-16 grid border-l border-t border-black md:grid-cols-2 lg:grid-cols-3">
            {domains.map((domain) => (
              <div
                key={domain.number}
                className="group min-h-[240px] border-b border-r border-black p-6 transition-colors duration-300 hover:bg-black hover:text-white md:p-8"
              >
                <div className="flex items-start justify-between">
                  <span className="font-mono text-xs font-bold">
                    {domain.number}
                  </span>

                  <ArrowUpRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </div>

                <div className="mt-16">
                  <h3 className="text-2xl font-black uppercase leading-none md:text-3xl">
                    {domain.title}
                  </h3>

                  <p className="mt-4 text-sm leading-6 text-neutral-600 transition-colors group-hover:text-neutral-300">
                    {domain.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* MISSION */}
      <section className="bg-white px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-[1440px]">

          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

            <div>
              <p className="mb-6 text-xs font-bold uppercase tracking-[0.25em] text-orange-600">
                Our mission
              </p>

              <h2 className="text-5xl font-black uppercase leading-[0.88] tracking-tight md:text-7xl">
                Learn
                <br />
                beyond
                <br />
                <span className="text-orange-600">the classroom.</span>
              </h2>
            </div>

            <div className="border-2 border-black p-8 shadow-[10px_10px_0px_#000] md:p-12">
              <p className="text-xl font-medium leading-8 md:text-2xl">
                We want every student to have a place where they can ask
                questions, build projects, meet collaborators and discover
                what they are capable of creating with technology.
              </p>

              <div className="mt-10 border-t border-black pt-5">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-orange-600">
                  Learn → Experiment → Build → Share
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="bg-black px-5 py-24 text-white md:px-10 md:py-32">
        <div className="mx-auto max-w-[1440px]">

          <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="04 / What we believe"
              title="How we build."
              description="The principles that shape the ATS community."
              light
            />

            <span className="font-mono text-xs text-neutral-500">
              ATS / VALUES
            </span>
          </div>

          <div className="mt-20 border-t border-white/20">
            {values.map((value) => (
              <div
                key={value.number}
                className="group grid gap-6 border-b border-white/20 py-8 transition-colors hover:bg-white hover:px-5 hover:text-black md:grid-cols-[100px_1fr_1fr] md:items-center"
              >
                <span className="font-mono text-xs text-orange-400">
                  {value.number}
                </span>

                <h3 className="text-3xl font-black uppercase tracking-tight md:text-5xl">
                  {value.title}
                </h3>

                <p className="max-w-md text-sm leading-6 text-neutral-400 transition-colors group-hover:text-neutral-600">
                  {value.text}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-orange-500 px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-[1440px]">

          <p className="text-xs font-bold uppercase tracking-[0.25em]">
            Ready to build?
          </p>

          <div className="mt-8 flex flex-col justify-between gap-10 lg:flex-row lg:items-end">

            <h2 className="max-w-5xl text-5xl font-black uppercase leading-[0.85] tracking-[-0.04em] md:text-7xl lg:text-9xl">
              Find your
              <br />
              people.
            </h2>

            <Link
              to="/contact">
              <p
                className="group flex w-fit items-center gap-3 bg-black px-7 py-4 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-white hover:text-black"
              >
                Join ATS
                <ArrowUpRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </p>
            </Link>

          </div>
        </div>
      </section>

    </main>
    </>
  )
}
