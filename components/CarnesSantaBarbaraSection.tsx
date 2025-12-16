"use client"

import { useState, useEffect, useRef } from "react"
import { Instagram, MessageCircle, MapPin, Phone, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const images: string[] = [
  "/Carnes-Santa-Barbara/Santa-Barbara00.jpg",
  "/Carnes-Santa-Barbara/Santa-Barbara01.jpg",
  "/Carnes-Santa-Barbara/Santa-Barbara2.jpg",
  "/Carnes-Santa-Barbara/Santa-Barbara3.jpg",
  "/Carnes-Santa-Barbara/Santa-Barbara4.jpg",
  "/Carnes-Santa-Barbara/Santa-Barbara5.jpg",
  "/Carnes-Santa-Barbara/Santa-Barbara6.jpg",
]

const CARNES = {
  nombre: "Carnes Santa Bárbara",
  categoria: "Supermercado",
  direccion: "Mitre 1342 entre Jujuy y Aberastain - San Agustín",
  telefono: "2646619680",
  whatsappLink: "https://wa.me/5492646619680",
  instagramLink: "https://instagram.com/carnes.santa.barbara",
  logoPath: "/Carnes-Santa-Barbara/CARNESSANTABARBARA-09.svg",

  fraseCarousel: "Calidad que se siente, tradición que se comparte.",

  descripcion: {
    titulo: "Calidad que se siente.",
    sub: "Tradición que se comparte.",
    p1: "En Carnes Santa Bárbara llevamos la tradición en cada producto: carnes de primera calidad, frutas frescas y verduras de la huerta, seleccionadas con el cuidado de siempre.",
    p2_highlight:
      "Somos una carnicería de espíritu familiar, donde lo simple, lo natural y lo auténtico siguen presentes todos los días.",
    p3_closing: "Carnes Santa Bárbara: sabor de campo, calidad de hogar.",
  },
}

export function CarnesSantaBarbaraSection() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const startX = useRef<number | null>(null)

  useEffect(() => {
    if (paused || images.length === 0) return
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [paused])

  const nextImage = () => {
    setCurrent((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length)
  }

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
    <section className="py-24 bg-white/80 overflow-hidden relative">
      <div className="container px-4 mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">

          {/* LEFT */}
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            <div className="mb-8">
              <Image
                src={CARNES.logoPath}
                alt={CARNES.nombre}
                width={800}
                height={200}
                className="w-auto h-64"
                priority
              />
            </div>

            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-zinc-900 leading-[1.1]">
              {CARNES.descripcion.titulo} <br />
              <span className="text-red-700">{CARNES.descripcion.sub}</span>
            </h2>

            <div className="flex flex-wrap gap-3 mb-6 text-red-700">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-red-100/70 border border-red-600 rounded-full text-sm">
                <MapPin className="w-4 h-4" />
                {CARNES.direccion}
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-red-100/70 border border-red-600 rounded-full text-sm">
                <Phone className="w-4 h-4" />
                {CARNES.telefono}
              </div>
            </div>

            <p className="text-lg text-stone-700 mb-6 leading-relaxed max-w-lg">
              {CARNES.descripcion.p1}
            </p>

            <p className="text-lg text-stone-700 mb-8 leading-relaxed max-w-lg">
              <span className="font-semibold text-red-700">
                {CARNES.descripcion.p2_highlight}
              </span>
              <br />
              <span className="text-zinc-700 font-medium">
                {CARNES.descripcion.p3_closing}
              </span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-red-700 hover:bg-red-800 text-white rounded-full px-8"
                onClick={() => window.open(CARNES.whatsappLink, "_blank")}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Consultar pedidos
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-red-600 text-red-700 hover:bg-red-50 rounded-full px-8"
                onClick={() => window.open(CARNES.instagramLink, "_blank")}
              >
                <Instagram className="w-5 h-5 mr-2" />
                @carnes.santa.barbara
              </Button>
            </div>
          </div>

          {/* RIGHT – CAROUSEL */}
          <div className="w-full lg:w-1/2 order-1 lg:order-2 relative">
            <div
              className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {images.map((src, index) => (
                <Image
                  key={src}
                  src={src}
                  alt={`Carnes Santa Bárbara ${index + 1}`}
                  fill
                  className={`object-cover transition-opacity duration-700 ${
                    index === current ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}

              {/* Controls */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-red-700 rounded-full p-2 shadow-md"
              >
                <ChevronLeft />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-red-700 rounded-full p-2 shadow-md"
              >
                <ChevronRight />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
