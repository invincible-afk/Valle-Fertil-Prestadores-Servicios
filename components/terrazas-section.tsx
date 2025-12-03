"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Wifi, Droplets, Utensils, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

const images = [
  "Terrazas-De-La-Luna/terrazas-pool.jpg",
  "Terrazas-De-La-Luna/terrazas-aerial.jpg",
  "Terrazas-De-La-Luna/terrazas-exterior.jpg",
  "Terrazas-De-La-Luna/terrazas-pool-2.jpg",
  "Terrazas-De-La-Luna/terrazas-kitchen.jpg",
]

export function TerrazasSection() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const startX = useRef<number | null>(null)

  // Autoplay
  useEffect(() => {
    if (paused) return
    const interval = setInterval(() => {
      setCurrent((p) => (p + 1) % images.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [paused, current])

  const nextImage = () => setCurrent((p) => (p + 1) % images.length)
  const prevImage = () => setCurrent((p) => (p - 1 + images.length) % images.length)

  // Swipe mobile
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    startX.current = e.touches[0].clientX
  }
  
  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!startX.current) return
    const end = e.changedTouches[0].clientX
    const diff = startX.current - end
    if (diff > 50) nextImage()
    if (diff < -50) prevImage()
    startX.current = null
  }

  return (
    <section className="py-24 bg-[#be3c1b] overflow-hidden relative">
      {/* Background decorative */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-emerald-100/30 -skew-x-12 translate-x-20" />

      <div className="container px-4 mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">

          {/* LEFT: CONTENT */}
          <div className="w-full lg:w-1/2 order-2 lg:order-1">

            {/* Logo - CORREGIDO */}
            <div className="mb-8">
              <Image
                src="Terrazas-De-La-Luna/TERRAZASDELALUNA-06-01.svg"
                alt="Terrazas de la Luna"
                width={800}
                height={200}
                className="w-auto h-64"
              />
            </div>

            <h3 className="text-3xl md:text-4xl font-bold text-[#f2e672] mb-4 leading-tight">

              Vacaciones que  
              <br />
              <span className="text-[#24294E]">iluminan tu descanso.</span>
            </h3>

            <p className="text-lg text-[#24294E] mb-6 leading-relaxed max-w-lg">
              Bienvenido a un lugar donde el descanso se eleva.{" "}
              <span className="font-semibold text-[#f2e672]">Terrazas de la Luna</span>, recientemente
              inaugurado, te invita a disfrutar unas vacaciones distintas: cálidas, tranquilas y rodeadas de la auténtica
              hospitalidad de Valle Fértil.
            </p>

            <p className="text-lg text-[#f2e672] mb-8 leading-relaxed max-w-lg">
              Cabañas que miran al cielo, noches serenas y la sensación de haber encontrado tu lugar perfecto para desconectar.
            </p>

            {/* FEATURES */}
            <div className="flex flex-wrap gap-3 mb-8 text-stone-500">
              <div className="flex items-center gap-2 text-sm bg-white px-3 py-1.5 rounded-full border border-stone-200">
                <Wifi className="w-4 h-4" /> <span>Wi-Fi Gratis</span>
              </div>
              <div className="flex items-center gap-2 text-sm bg-white px-3 py-1.5 rounded-full border border-stone-200">
                <Droplets className="w-4 h-4" /> <span>Piscina</span>
              </div>
              <div className="flex items-center gap-2 text-sm bg-white px-3 py-1.5 rounded-full border border-stone-200">
                <Utensils className="w-4 h-4" /> <span>Cocina Equipada</span>
              </div>
              <div className="flex items-center gap-2 text-sm bg-white px-3 py-1.5 rounded-full border border-stone-200">
                <MapPin className="w-4 h-4" /> <span>Excelente Ubicación</span>
              </div>
            </div>



{/* CONTACT BUTTONS - NUEVOS */}
<div className="flex flex-wrap gap-4">

  {/* WhatsApp */}
  <a
    href="https://wa.me/5492645424177"
    target="_blank"
    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-md transition"
  >
    WhatsApp
  </a>

  {/* Instagram */}
  <a
    href="https://www.instagram.com/terrazasvf"
    target="_blank"
    className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-md transition"
  >
    Instagram
  </a>

  {/* Dirección */}
  <a
    href="https://www.google.com/maps/search/?api=1&query=Entre+R%C3%ADos+1081,+San+Agust%C3%ADn,+San+Juan"
    target="_blank"
    className="bg-[#24294E] hover:bg-[#1b1f3a] text-white px-6 py-2 rounded-full text-sm font-semibold shadow-md transition"
  >
    Cómo llegar
  </a>

</div>
          </div>

          {/* RIGHT: CAROUSEL PRO */}
          <div className="w-full lg:w-1/2 order-1 lg:order-2 relative">
            <div
              className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl group"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {/* IMÁGENES con fade + zoom */}
              {images.map((src, i) => (
                <Image
                  key={i}
                  src={src}
                  alt={`Terrazas de la Luna ${i + 1}`}
                  fill
                  className={`
                    object-cover absolute inset-0 
                    transition-all duration-[1500ms] ease-out
                    ${i === current ? "opacity-100 scale-105" : "opacity-0 scale-100"}
                  `}
                />
              ))}

              {/* Overlay suave */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* MINI FRASE */}
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <p className="font-serif italic text-2xl">"Tu descanso más cerca del cielo."</p>
              </div>

              {/* BOTONES NAVEGACIÓN */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-black p-3 rounded-full shadow-lg transition"
                aria-label="Imagen anterior"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-black p-3 rounded-full shadow-lg transition"
                aria-label="Siguiente imagen"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* INDICADORES */}
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

            {/* BADGE FLOTANTE */}
            <div className="absolute top-8 -left-8 bg-white py-3 px-6 rounded-r-full shadow-lg border-l-4 border-emerald-700 hidden md:block">
              <p className="font-bold text-stone-900">Cabañas Premium</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}