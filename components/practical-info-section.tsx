export function PracticalInfoSection() {
  return (
    <section className="py-24 bg-zinc-900 text-white">
      <div className="container px-4 mx-auto">
        <div className="w-full max-w-4xl mx-auto">
          <div className="w-full h-96 bg-zinc-800 rounded-2xl overflow-hidden relative group">
            <iframe
              src="https://www.google.com/maps/d/embed?mid=18izMvy9pTyz6Qu7Bv97MyAAk4aw2zdA&hl=es&ehbc=2E312F"
              className="w-full h-full opacity-60 group-hover:opacity-80 transition-opacity border-0"
              loading="lazy"
              title="Mapa de Valle Fértil"
            />
          </div>
        </div>
      </div>
    </section>
  )
}