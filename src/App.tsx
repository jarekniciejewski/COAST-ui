import { ButtonShowcase } from "@/showcase/ButtonShowcase"
import { InputShowcase } from "@/showcase/InputShowcase"

const COMPONENTS = [
  ["button", "Button"],
  ["input", "Input"],
] as const

export default function App() {
  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-16 px-4 py-10 md:px-6">
      <header className="flex flex-col gap-4">
        <p className="font-mono text-xs tracking-wider text-zinc-500 uppercase">Design system</p>
        <h1 className="text-4xl font-bold tracking-tight text-balance">COAST UI</h1>
        <p className="max-w-[64ch] text-zinc-600">
          COAST components built with React, shadcn/ui and Tailwind CSS from the COAST Figma file. Colors, spacing and
          type come from the same tokens as the Figma variables.
        </p>
        <nav aria-label="Components" className="flex flex-wrap items-center gap-2 text-sm">
          {COMPONENTS.map(([id, name]) => (
            <a
              key={id}
              href={`#${id}`}
              className="rounded-md border border-zinc-200 px-3 py-1.5 font-medium hover:border-zinc-400"
            >
              {name}
            </a>
          ))}
          <a
            className="ml-auto text-zinc-500 underline underline-offset-2 hover:text-foreground"
            href="https://github.com/jarekniciejewski/COAST-ui"
          >
            Source on GitHub
          </a>
        </nav>
      </header>

      <ButtonShowcase />
      <hr className="border-zinc-200" />
      <InputShowcase />
      <hr className="border-zinc-200" />

      <section className="flex flex-col gap-4" aria-labelledby="run-locally">
        <h2 id="run-locally" className="text-xl font-semibold">
          Run it locally
        </h2>
        <pre className="overflow-x-auto rounded-xl bg-zinc-50 p-4 font-mono text-[13px] leading-relaxed">
          {`git clone https://github.com/jarekniciejewski/COAST-ui.git
cd COAST-ui
npm install
npm run dev`}
        </pre>
      </section>
    </main>
  )
}
