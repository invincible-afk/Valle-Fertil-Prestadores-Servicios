"use client"

import { useState, useEffect, useRef } from "react"
import { Instagram, MessageCircle, ChevronLeft, ChevronRight, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const images = [
  "/Cabaña-Madrid/CABAÑAMADRID-01.jpg",
  "/Cabaña-Madrid/CABAÑAMADRID-02.jpg",
  "/Cabaña-Madrid/CABAÑAMADRID-03.jpg",
  "/Cabaña-Madrid/CABAÑAMADRID-04.jpg"
]

const CABANA_MADRID = {
  nombre: "Cabaña Madrid",
  categoria: "Hospedaje",
  direccion: "Callejón Moreno s/n - Bajo Astica",
  telefono: "2644446709",
  whatsappLink: "https://wa.me/5492644446709",
  instagramLink: "https://instagram.com/cabanamadridvallefertil?igshid=MTdlMjFhZjNmZg==",
  logoPath: "/Cabaña-Madrid/CABAÑAMADRID.svg",

  fraseCarousel: "Un espacio tranquilo, privado y rodeado de la esencia del Valle.",
  descripcion: {
    titulo: "Un lugar hecho con historia.",
    sub: "Pensado para vos.",
    p1: "Desde hace más de 15 años recibimos viajeros que llegan a Valle Fértil buscando descanso, naturaleza y un trato cálido. Somos una familia que disfruta de hospedar, acompañar y hacerte sentir en casa.",
    p2_highlight:
      "Nuestro predio cuenta con una sola cabaña, exclusiva para hasta 5 personas, equipada con todo lo necesario para una estadía cómoda y relajada.",
    p3_closing:
      "Acá, cada visita se convierte en un recuerdo. Bienvenido a un hospedaje con alma.",
  },
}

export function CabanaMadridSection() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const startX = useRef<number | null>(null)

  // Autoplay
  useEffect(() => {
    if (paused) return
    const interval = setInterval(() => nextImage(), 4000)
    return () => clearInterval(interval)
  }, [paused, current])

  const nextImage = () => setCurrent((prev) => (prev + 1) % images.length)
  const prevImage = () => setCurrent((prev) => (prev - 1 + images.length) % images.length)

  // Swipe móvil
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
    <section className="py-24 bg-[#f2e672]/80 overflow-hidden relative">

      {/* Background decorativo */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-red-100/30 -skew-x-12 translate-x-20" />

      <div className="container px-4 mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">

          {/* ==== LEFT SIDE (Texto) ==== */}
          <div className="w-full lg:w-1/2 order-2 lg:order-1">

            {/* Logo */}
            <div className="mb-8">
              <Image
                src={CABANA_MADRID.logoPath}
                alt={CABANA_MADRID.nombre}
                width={800}
                height={200}
                className="w-auto h-64"
              />
            </div>

            {/* Título  */}
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-zinc-900 leading-[1.1]">
              {CABANA_MADRID.descripcion.titulo} <br />
              <span className="text-red-700">{CABANA_MADRID.descripcion.sub}</span>
            </h2>

            {/* Badges ubicación y teléfono */}
            <div className="flex flex-wrap gap-3 mb-6 text-red-700">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-red-100/70 border border-red-600 rounded-full text-sm">
                <MapPin className="w-4 h-4" />
                {CABANA_MADRID.direccion}
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-red-100/70 border border-red-600 rounded-full text-sm">
                <Phone className="w-4 h-4" />
                {CABANA_MADRID.telefono}
              </div>
            </div>

            {/* Párrafos */}
            <p className="text-lg text-stone-700 mb-6 leading-relaxed max-w-lg">
              {CABANA_MADRID.descripcion.p1}
            </p>

            <p className="text-lg text-stone-700 mb-8 leading-relaxed max-w-lg">
              <span className="font-semibold text-red-700">
                {CABANA_MADRID.descripcion.p2_highlight}
              </span>
              <br />
              <span className="text-zinc-700 font-medium">
                {CABANA_MADRID.descripcion.p3_closing}
              </span>
            </p>

            {/* Botones  */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-red-700 hover:bg-red-800 text-white rounded-full px-8"
                onClick={() => window.open(CABANA_MADRID.whatsappLink, "_blank")}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Consultar disponibilidad
              </Button>

              
            </div>
          </div>

          {/* ==== RIGHT SIDE (Carrusel) ==== */}
          <div className="w-full lg:w-1/2 order-1 lg:order-2 relative">
            <div
              className="relative aspect-[4/5] md:aspect-square lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl group"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {images.map((img, index) => (
                <Image
                  key={img}
                  src={img}
                  alt={`${CABANA_MADRID.nombre} ${index + 1}`}
                  fill
                  className={`
                    object-cover absolute inset-0 transition-all duration-[1500ms] ease-out
                    ${index === current ? "opacity-100 scale-105" : "opacity-0 scale-100"}
                  `}
                />
              ))}

              {/* Degradado + frase */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

              <div className="absolute bottom-8 left-8 right-8 text-white">
                <p className="font-serif italic text-xl md:text-2xl">
                  "{CABANA_MADRID.fraseCarousel}"
                </p>
              </div>

              {/* Botones izquierda/derecha */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full shadow-lg transition opacity-0 group-hover:opacity-100"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full shadow-lg transition opacity-0 group-hover:opacity-100"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Indicadores */}
              <div className="absolute bottom-4 w-full flex justify-center gap-2">
                {images.map((_, i) => (
                  <div
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`h-2 w-2 rounded-full cursor-pointer transition-all ${
                      current === i ? "bg-white w-4" : "bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Badge flotante */}
            <div className="absolute top-8 -left-8 bg-white py-3 px-6 rounded-r-full shadow-lg border-l-4 border-red-500 hidden md:block">
              <p className="font-bold text-zinc-900">{CABANA_MADRID.categoria} Exclusivo</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
