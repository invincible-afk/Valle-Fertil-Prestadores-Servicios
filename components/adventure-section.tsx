"use client"

import { useState, useEffect, useRef } from "react"
import { Mountain, Compass, MapPin, ArrowRight, ChevronLeft, ChevronRight, InstagramIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

const images = [
  "Las-Tumanas-Extremo/LASTUMANASEXTREMO-01.jpg",
  "Las-Tumanas-Extremo/LASTUMANASEXTREMO-02.jpg",
  "Las-Tumanas-Extremo/LASTUMANASEXTREMO-03.jpg",
  "Las-Tumanas-Extremo/LASTUMANASEXTREMO-04.jpg",
  "Las-Tumanas-Extremo/LASTUMANASEXTREMO-05.jpg",
]

export function AdventureSection() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const startX = useRef<number | null>(null)

  // Autoplay con pausa al hover
  useEffect(() => {
    if (paused) return
    const interval = setInterval(() => {
      nextImage()
    }, 4000)
    return () => clearInterval(interval)
  }, [paused, current])

  const nextImage = () => setCurrent((prev) => (prev + 1) % images.length)
  const prevImage = () => setCurrent((prev) => (prev - 1 + images.length) % images.length)

  // Swipe en móviles
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    startX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!startX.current) return
    const endX = e.changedTouches[0].clientX
    const diff = startX.current - endX

    if (diff > 50) nextImage() // swipe izquierda → siguiente
    if (diff < -50) prevImage() // swipe derecha → anterior

    startX.current = null
  }

  return (
    <section className="py-24 bg-[#7EC8E3] overflow-hidden relative">
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-amber-100/30 skew-x-12 -translate-x-20" />

      <div className="container px-4 mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">

          {/* ==== LEFT SIDE CAROUSEL ==== */}
          <div className="w-full lg:w-1/2 order-1 lg:order-1 relative">
            <div
              className="relative aspect-[4/5] md:aspect-square lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl group"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {/* IMÁGENES FADE + ZOOM */}
              {images.map((img, index) => (
                <img
                  key={img}
                  src={img}
                  alt="Las Tumanas Extremo"
                  className={`
                    object-cover absolute inset-0 w-full h-full transition-all duration-[1500ms] ease-out
                    ${index === current ? "opacity-100 scale-105" : "opacity-0 scale-100"}
                  `}
                />
              ))}

              {/* Overlay oscuro */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />

              {/* Contenido inferior */}
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <p className="text-amber-400 font-bold text-sm tracking-widest uppercase mb-2">Próxima Salida</p>
                <p className="font-serif italic text-2xl">Circuito Las Tumanas</p>
              </div>

              {/* ==== BOTONES DE NAVEGACIÓN ==== */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-black p-3 rounded-full shadow-lg transition"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-black p-3 rounded-full shadow-lg transition"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* ==== INDICADORES (puntos) ==== */}
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

            {/* Badge flotante */}
            <div className="absolute top-8 -right-8 bg-white py-3 px-6 rounded-l-full shadow-lg border-r-4 border-amber-500 hidden md:block">
              <p className="font-bold text-zinc-900">Turismo Aventura</p>
            </div>
          </div>

          {/* ==== RIGHT SIDE CONTENT ==== */}
          <div className="w-full lg:w-1/2 order-2 lg:order-2">
            <div className="mb-8">
              <img
                src="Las-Tumanas-Extremo/LASTUMANASEXTREMO-07.svg"
                alt="Las Tumanas Extremo"
                className="w-auto h-48"
              />
            </div>

            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-zinc-900 leading-[1.1]">
              Sentí la <br />
              <span className="text-amber-600">Adrenalina.</span>
            </h2>

            <p className="text-lg text-zinc-600 mb-6 leading-relaxed max-w-lg">
              Turismo aventura con Las Tumanas Extremo. Descubrí los rincones más salvajes del Valle a través de
              trekking, escalada y recorridos exclusivos.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-100">
                <Compass className="w-6 h-6 text-amber-600 mb-2" />
                <h4 className="font-bold text-zinc-900">Trekking</h4>
                <p className="text-sm text-zinc-500">Senderos vírgenes</p>
              </div>
              <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-100">
                <MapPin className="w-6 h-6 text-amber-600 mb-2" />
                <h4 className="font-bold text-zinc-900">Expediciones</h4>
                <p className="text-sm text-zinc-500">Guiadas por expertos</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-amber-600 hover:bg-amber-700 text-white rounded-full px-8"
                onClick={() => window.open("https://wa.me/5492645172411", "_blank")}
              >
                Consultar Salidas
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-amber-600 text-amber-700 hover:bg-amber-50 rounded-full px-8 bg-transparent"
                onClick={() => window.open("https://instagram.com/lastumanas_extremo", "_blank")}
              >
                <InstagramIcon className="w-5 h-5 mr-2" />
                @lastumanas_extremo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
