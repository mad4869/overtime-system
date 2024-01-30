import Background from "./Background"

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main>
      <Background />
      <section
        className="absolute top-0 left-0 flex items-center justify-center w-full h-full bg-primary-700/40 backdrop-blur-sm">
        {children}
      </section>
    </main>
  )
}
