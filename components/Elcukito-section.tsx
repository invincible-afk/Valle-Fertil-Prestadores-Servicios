"use client"

import { useState, useEffect, useRef } from "react"
import { Instagram, MessageCircle, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const images = [
  "/Supermarket-ElCukito/elcukito1.jpeg",
  "/Supermarket-ElCukito/elcukito2.jpeg",
  "/Supermarket-ElCukito/elcukito3.jpeg",
  "/Supermarket-ElCukito/elcukito4.jpeg",
]

const COMERCIO = {
  nombre: "Supermarket El Cukito",
  categoria: "Supermercado",
  direccion: "Rivadavia entre Gral Acha y Tucumán - San Agustín",
  localidad: "Valle Fértil - San Juan",

 

  logoPath: "/Supermarket-ElCukito/El-Cukito-11.svg",

  fraseCarousel: "La variedad que buscás, con la calidez de siempre.",

  descripcion: {
    titulo: "La variedad que buscás,",
    sub: "con la calidez de siempre.",
    p1:
      "El Cukito es un supermercado familiar que creció con la gente del Valle y para la gente del Valle.",
    p2_highlight:
      "Fiambrería, verdulería, carnicería, bazar y despensa:",
    p3_closing:
      "todo en un solo lugar, con productos frescos, buenos precios y una atención cercana que marca la diferencia."
  },

  cierre:
    "Supermarket El Cukito: el súper más completo del Valle, atendido por una familia que te conoce y te cuida."
}

export function ElCukitoSection() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const startX = useRef<number | null>(null)

  useEffect(() => {
    if (paused) return
    const interval = setInterval(() => nextImage(), 4000)
    return () => clearInterval(interval)
  }, [paused, current])

  const nextImage = () => setCurrent((prev) => (prev + 1) % images.length)
  const prevImage = () => setCurrent((prev) => (prev - 1 + images.length) % images.length)

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) =>
    (startX.current = e.touches[0].clientX)

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!startX.current) return
    const diff = startX.current - e.changedTouches[0].clientX
    if (diff > 50) nextImage()
    if (diff < -50) prevImage()
    startX.current = null
  }

  return (
    <section className="py-24 bg-amber-500/90 relative overflow-hidden">

      <div className="absolute top-0 left-0 w-1/3 h-full bg-amber-100/40 skew-x-12 -translate-x-20" />

      <div className="container px-4 mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">

          {/* LEFT */}
          <div className="w-full lg:w-1/2 order-2 lg:order-1">

            <Image
              src={COMERCIO.logoPath}
              alt={COMERCIO.nombre}
              width={800}
              height={300}
              className="w-auto h-52 mb-8"
            />

            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-zinc-900 leading-[1.1]">
              {COMERCIO.descripcion.titulo} <br />
              <span className="text-amber-800">{COMERCIO.descripcion.sub}</span>
            </h2>

            <div className="flex flex-wrap gap-3 mb-6 text-amber-800">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-100 border border-amber-700 rounded-full text-sm">
                <MapPin className="w-4 h-4" />
                {COMERCIO.direccion}
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-100 border border-amber-700 rounded-full text-sm">
                {COMERCIO.localidad}
              </div>
            </div>

            <p className="text-lg text-stone-800 mb-6 leading-relaxed max-w-xl">
              {COMERCIO.descripcion.p1}
            </p>

            <p className="text-lg text-stone-800 mb-6 leading-relaxed max-w-xl">
              <span className="font-semibold text-amber-800">
                {COMERCIO.descripcion.p2_highlight}
              </span>{" "}
              {COMERCIO.descripcion.p3_closing}
            </p>

            <p className="text-lg font-semibold text-zinc-900 mb-8 max-w-xl">
              {COMERCIO.cierre}
            </p>

            

          </div>

          {/* RIGHT */}
          <div
            className="w-full lg:w-1/2 order-1 lg:order-2 relative"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >

            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
              {images.map((img, i) => (
                <Image
                  key={img}
                  src={img}
                  alt={`El Cukito ${i + 1}`}
                  fill
                  className={`absolute inset-0 object-cover transition-all duration-[1500ms] ${
                    i === current ? "opacity-100 scale-105" : "opacity-0 scale-100"
                  }`}
                />
              ))}
            </div>

            <div className="absolute top-8 -right-8 bg-white py-3 px-6 rounded-l-full shadow-lg border-r-4 border-amber-700 hidden md:block">
              <p className="font-bold text-zinc-900">{COMERCIO.categoria}</p>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}
