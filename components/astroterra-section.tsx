"use client"

import { useState, useEffect, useRef } from "react"
import { Instagram, MessageCircle, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const images = [
  "/astroterra/ASTROTERRA-01.jpg",
  "/astroterra/ASTROTERRA-02.jpg",
  "/astroterra/ASTROTERRA-03.jpeg",
  "/astroterra/ASTROTERRA-04.jpeg",
  "/astroterra/ASTROTERRA-05.jpeg",
]

export function AstroterraSection() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const startX = useRef<number | null>(null)

  useEffect(() => {
    if (paused) return
    const interval = setInterval(() => {
      nextImage()
    }, 4000)
    return () => clearInterval(interval)
  }, [paused, current])

  const nextImage = () => setCurrent((prev) => (prev + 1) % images.length)
  const prevImage = () => setCurrent((prev) => (prev - 1 + images.length) % images.length)

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    startX.current = e.touches[0].clientX
  }
  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!startX.current) return
    const endX = e.changedTouches[0].clientX
    const diff = startX.current - endX

    if (diff > 50) nextImage()
    if (diff < -50) prevImage()

    startX.current = null
  }

  return (
    <section className="py-24 bg-[#f8d9c4] relative overflow-hidden">

      {/* Fondo durazno pastel + brillo cálido */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #fbe3d5 0%, #f8d9c4 40%, #f4c7ae 100%)",
        }}
      />

      {/* acentos suaves (peach + coral light) */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(255, 227, 205, 0.7), transparent 50%), radial-gradient(circle at 80% 80%, rgba(255, 204, 178, 0.5), transparent 50%)",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">

          {/* ==== TEXTO IZQUIERDA ==== */}
          <div className="w-full lg:w-1/2 order-2 lg:order-1">

            {/* Logo */}
            <div className="mb-8">
              <img
                src="/astroterra/ASTROTERRA.svg"
                alt="Astroterra"
                className="w-auto h-48"
              />
            </div>

            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-[#5b3b2e] leading-[1.1]">
              La tierra que cuenta, <br />
              <span className="text-[#d26d4d]">El cielo que guía.</span>
            </h2>

            <p className="text-lg text-[#6d4c3f] mb-6 leading-relaxed max-w-lg">
              En Valle Fértil, la magia sigue viva. Historias que nacen de la tierra, 
              leyendas que susurran los abuelos y un cielo tan puro que parece recién encendido.
            </p>

            <p className="text-lg text-[#6d4c3f] mb-8 leading-relaxed max-w-lg">
              <span className="font-semibold text-[#d26d4d]">
                Caminás entre mitos. Cenás bajo constelaciones. Descubrís un universo único.
              </span>
            </p>

            {/* Botones */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-[#d26d4d] hover:bg-[#b95f44] text-white rounded-full px-8 shadow-md"
                onClick={() => window.open("https://wa.me/5492645417428", "_blank")}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Reservar por WhatsApp
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-[#d26d4d] text-[#b95f44] hover:bg-[#f3c5ae]/40 rounded-full px-8"
                onClick={() => window.open("https://instagram.com/astroterra.sj", "_blank")}
              >
                <Instagram className="w-5 h-5 mr-2" />
                @astroterra.sj
              </Button>
            </div>
          </div>

          {/* ==== CARRUSEL DERECHA ==== */}
          <div className="w-full lg:w-1/2 order-1 lg:order-2 relative">
            <div
              className="relative aspect-[4/5] md:aspect-square lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-xl group"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {/* Fade + Zoom */}
              {images.map((img, index) => (
                <img
                  key={img}
                  src={img}
                  alt="Astroterra Astroturismo"
                  className={`
                    object-cover absolute inset-0 w-full h-full transition-all duration-[1500ms] ease-out
                    ${index === current ? "opacity-100 scale-105" : "opacity-0 scale-100"}
                  `}
                />
              ))}

              {/* Oscurecido inferior suave */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#00000070] via-transparent to-transparent" />

              {/* Frase */}
              <div className="absolute bottom-8 left-8 right-8 text-white drop-shadow">
                <p className="font-serif italic text-2xl">
                  "Mirá el cielo con nuevos ojos."
                </p>
              </div>

              {/* Botón izquierda */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[#5b3b2e] p-3 rounded-full shadow-md"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Botón derecha */}
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[#5b3b2e] p-3 rounded-full shadow-md"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Dots */}
              <div className="absolute bottom-4 w-full flex justify-center gap-2">
                {images.map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 w-2 rounded-full transition-all ${
                      current === i ? "bg-white w-4" : "bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Badge lateral */}
            <div className="absolute top-8 -left-8 bg-white py-3 px-6 rounded-r-full shadow-lg border-l-4 border-[#d26d4d] hidden md:block">
              <p className="font-bold text-[#5b3b2e]">Astroturismo</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
