"use client"

import { useState, useEffect, useRef } from "react"
import { Facebook, MessageCircle, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const images = [
  "/Escape-Aventura/ESCAPEAVENTURA-01.jpg",
  "/Escape-Aventura/ESCAPEAVENTURA-02.jpg",
  "/Escape-Aventura/ESCAPEAVENTURA-03.jpg",
  "/Escape-Aventura/ESCAPEAVENTURA-04.jpg",
]

const ESCAPE = {
  nombre: "Escape Aventura",
  categoria: "Agencia de viajes y excursiones",
  direccion: "Atención Virtual",
  telefono: "2645633824",
  whatsappLink: "https://wa.me/5492645633824",
  facebookLink: "https://www.facebook.com/share/17ibnk2jar/",
  logoPath: "/Escape-Aventura/ESCAPEAVENTURA-05.svg",

  fraseCarousel:
    "La aventura empieza cuando te animás.",

  descripcion: {
    titulo: "Aventura que inspira.",
    sub: "Recorridos que se viven.",
    p1: "En Escape Aventura te guiamos a descubrir lo mejor de nuestro querido San Juan: paisajes que sorprenden, historias que inspiran y experiencias que se guardan para siempre.",
    p2_highlight:
      "Cada recorrido es una invitación a explorar, sentir y vivir el viaje con el corazón abierto.",
    p3_closing:
      "Escape Aventura: tu próxima historia empieza acá.",
  },
}

export function EscapeAventuraSection() {
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

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    startX.current = e.touches[0].clientX
  }
  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!startX.current) return
    const diff = startX.current - e.changedTouches[0].clientX
    if (diff > 50) nextImage()
    if (diff < -50) prevImage()
    startX.current = null
  }

  return (
    <section className="py-24 bg-[#a88031]/80 overflow-hidden relative">
      <div className="container px-4 mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">

          {/* LEFT */}
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            <div className="mb-8">
              <Image
                src={ESCAPE.logoPath}
                alt={ESCAPE.nombre}
                width={800}
                height={200}
                className="w-auto h-64"
              />
            </div>

            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-zinc-900 leading-[1.1]">
              {ESCAPE.descripcion.titulo} <br />
              <span className="text-red-700">{ESCAPE.descripcion.sub}</span>
            </h2>

            <div className="flex flex-wrap gap-3 mb-6 text-red-700">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-red-100/70 border border-red-600 rounded-full text-sm">
                <MapPin className="w-4 h-4" />
                {ESCAPE.direccion}
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-red-100/70 border border-red-600 rounded-full text-sm">
                <Phone className="w-4 h-4" />
                {ESCAPE.telefono}
              </div>
            </div>

            <p className="text-lg text-stone-700 mb-6 leading-relaxed max-w-lg">
              {ESCAPE.descripcion.p1}
            </p>

            <p className="text-lg text-stone-700 mb-8 leading-relaxed max-w-lg">
              <span className="font-semibold text-red-700">
                {ESCAPE.descripcion.p2_highlight}
              </span>
              <br />
              <span className="text-zinc-700 font-medium">
                {ESCAPE.descripcion.p3_closing}
              </span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-red-700 hover:bg-red-800 text-white rounded-full px-8"
                onClick={() => window.open(ESCAPE.whatsappLink, "_blank")}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Consultar excursiones
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-red-600 text-red-700 hover:bg-red-50 rounded-full px-8"
                onClick={() => window.open(ESCAPE.facebookLink, "_blank")}
              >
                <Facebook className="w-5 h-5 mr-2" />
                Síguenos en Facebook
              </Button>
            </div>
          </div>

          {/* RIGHT */}
          <div className="w-full lg:w-1/2 order-1 lg:order-2 relative">
            <div
              className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl group"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {images.map((img, index) => (
                <Image
                  key={img}
                  src={img}
                  alt={`${ESCAPE.nombre} ${index + 1}`}
                  fill
                  className={`object-cover absolute inset-0 transition-all duration-[1500ms] 
                  ${index === current ? "opacity-100 scale-105" : "opacity-0 scale-100"}`}
                />
              ))}

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

              <div className="absolute bottom-8 left-8 right-8 text-white">
                <p className="font-serif italic text-xl md:text-2xl">
                  "{ESCAPE.fraseCarousel}"
                </p>
              </div>
            </div>

            <div className="absolute top-8 -left-8 bg-white py-3 px-6 rounded-r-full shadow-lg border-l-4 border-red-500 hidden md:block">
              <p className="font-bold text-zinc-900">{ESCAPE.categoria}</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
