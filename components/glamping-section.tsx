"use client"

import { useState, useEffect, useRef } from "react"
import { Instagram, MessageCircle, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const images = [
  "Glamping-Las-Higueras/GLAMPINGLASHIGUERAS-00.jpg",
  "Glamping-Las-Higueras/GLAMPINGLASHIGUERAS-01.jpg",
  "Glamping-Las-Higueras/GLAMPINGLASHIGUERAS-02.jpg",
  "Glamping-Las-Higueras/GLAMPINGLASHIGUERAS-03.jpg",
  "Glamping-Las-Higueras/GLAMPINGLASHIGUERAS-04.jpg",
]

export function GlampingSection() {
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
    <section className="py-24 bg-emerald-50/50 overflow-hidden relative">
      {/* Decoración */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-emerald-100/30 -skew-x-12 translate-x-20" />

      <div className="container px-4 mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">

          {/* ==== LEFT SIDE → CARRUSEL ==== */}
          <div className="w-full lg:w-1/2 order-1">
            <div
              className="relative aspect-[4/5] md:aspect-square lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl group"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {/* IMÁGENES */}
              {images.map((img, index) => (
                <Image
                  key={img}
                  src={img}
                  alt="Glamping Las Higueras"
                  fill
                  className={`
                    object-cover absolute inset-0 transition-all duration-[1500ms] ease-out
                    ${index === current ? "opacity-100 scale-105" : "opacity-0 scale-100"}
                  `}
                />
              ))}

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />

              <div className="absolute bottom-8 left-8 right-8 text-white">
                <p className="font-serif italic text-2xl">"Donde la naturaleza te abraza."</p>
              </div>

              {/* Flechas */}
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

              {/* Indicadores */}
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
            <div className="absolute top-8 -left-8 bg-white py-3 px-6 rounded-l-full shadow-lg border-r-4 border-amber-500 hidden md:block">
              <p className="font-bold text-zinc-900">Glamping Exclusivo</p>
            </div>
          </div>

          {/* ==== RIGHT SIDE → TEXTO ==== */}
          <div className="w-full lg:w-1/2 order-2">
            <div className="mb-8">
              <Image
                src="Glamping-Las-Higueras/GLAMPINGLASHIGUERAS-08.svg"
                alt="Las Higueras Glamping"
                width={800}
                height={200}
                className="w-auto h-48"
              />
            </div>

            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-zinc-900 leading-[1.1]">
              Tu refugio bajo <br />
              <span className="text-emerald-600">las estrellas.</span>
            </h2>

            <p className="text-lg text-zinc-600 mb-6 max-w-lg">
              En un rincón que había quedado en silencio, decidimos crear algo nuevo: domos que abrazan la naturaleza
              y devuelven vida a un lugar que merecía renacer...
            </p>

            <p className="text-lg text-zinc-600 mb-8 max-w-lg">
              <span className="font-semibold text-emerald-700">
                Glamping Las Higueras: una nueva forma de vivir Valle Fértil.
              </span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-8"
                onClick={() => window.open("https://wa.me/5492646605092", "_blank")}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Reservar por WhatsApp
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-emerald-600 text-emerald-700 hover:bg-emerald-50 rounded-full px-8 bg-transparent"
                onClick={() =>
                  window.open(
                    "https://instagram.com/glamping_lashigueras?IGSH=MWg2bmV3ZTZwOTIzZw==",
                    "_blank"
                  )
                }
              >
                <Instagram className="w-5 h-5 mr-2" />
                @glamping.lashigueras
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
