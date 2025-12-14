"use client"

import { useState, useEffect, useRef } from "react"
import { MessageCircle, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const images = [
  "/La-Catalina-Cabañas/LaCatalina1.jpg",
  "/La-Catalina-Cabañas/LaCatalina2.jpg",
  "/La-Catalina-Cabañas/LaCatalina3.jpeg",
  "/La-Catalina-Cabañas/LaCatalina4.jpeg",
  "/La-Catalina-Cabañas/LaCatalina5.jpeg",
]

const CATALINA = {
  nombre: "La Catalina Cabañas",
  categoria: "Cabañas & Eventos",
  direccion: "Ruta 510 a 200 mts de ACA",
  telefonos: "264 4992659 · 264 4511052",
  whatsappLink: "https://wa.me/5492644992659",
  logoPath: "/La-Catalina-Cabañas/LaCatalina-10.svg",

  descripcion: {
    titulo: "Tradición familiar.",
    sub: "Espacio para disfrutar y celebrar.",
    p1:
      "Con más de 10 años en Valle Fértil, La Catalina es un emprendimiento familiar con la mejor predisposición para recibir al turista.",
    p2_highlight:
      "Complejo cerrado de 4 cabañas, con capacidad total para 26 plazas,",
    p3_closing:
      "y un predio amplio que también se alquila para eventos sociales y familiares."
  },

  extras:
    "Ofrecemos servicio de lunch completo y carpa para aproximadamente 300 personas.",

  cierre:
    "La Catalina Cabañas: tu lugar para descansar… y celebrar."
}

export function LaCatalinaSection() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const startX = useRef<number | null>(null)

  useEffect(() => {
    if (paused) return
    const interval = setInterval(() => nextImage(), 4000)
    return () => clearInterval(interval)
  }, [paused, current])

  const nextImage = () => setCurrent((prev) => (prev + 1) % images.length)
  const prevImage = () =>
    setCurrent((prev) => (prev - 1 + images.length) % images.length)

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
    <section className="py-24 bg-emerald-600/90 relative overflow-hidden">

      <div className="absolute top-0 right-0 w-1/3 h-full bg-emerald-100/40 -skew-x-12 translate-x-20" />

      <div className="container px-4 mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">

          {/* LEFT */}
          <div className="w-full lg:w-1/2 order-2 lg:order-1">

            <Image
              src={CATALINA.logoPath}
              alt={CATALINA.nombre}
              width={800}
              height={300}
              className="w-auto h-52 mb-8"
            />

            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-zinc-900 leading-[1.1]">
              {CATALINA.descripcion.titulo} <br />
              <span className="text-emerald-900">
                {CATALINA.descripcion.sub}
              </span>
            </h2>

            <div className="flex flex-wrap gap-3 mb-6 text-emerald-900">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-100 border border-emerald-700 rounded-full text-sm">
                <MapPin className="w-4 h-4" />
                {CATALINA.direccion}
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-100 border border-emerald-700 rounded-full text-sm">
                <Phone className="w-4 h-4" />
                {CATALINA.telefonos}
              </div>
            </div>

            <p className="text-lg text-stone-800 mb-6 leading-relaxed max-w-xl">
              {CATALINA.descripcion.p1}
            </p>

            <p className="text-lg text-stone-800 mb-6 leading-relaxed max-w-xl">
              <span className="font-semibold text-emerald-900">
                {CATALINA.descripcion.p2_highlight}
              </span>{" "}
              {CATALINA.descripcion.p3_closing}
            </p>

            <p className="text-lg text-stone-800 mb-6 max-w-xl">
              {CATALINA.extras}
            </p>

            <p className="text-lg font-semibold text-zinc-900 mb-8 max-w-xl">
              {CATALINA.cierre}
            </p>

            <Button
              onClick={() => window.open(CATALINA.whatsappLink, "_blank")}
              className="bg-emerald-800 hover:bg-emerald-900 text-white rounded-full px-8"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Consultar disponibilidad
            </Button>
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
                  alt={`La Catalina ${i + 1}`}
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={`absolute inset-0 object-cover transition-all duration-[1500ms] ${
                    i === current
                      ? "opacity-100 scale-105"
                      : "opacity-0 scale-100"
                  }`}
                />
              ))}
            </div>

            <div className="absolute top-8 -left-8 bg-white py-3 px-6 rounded-r-full shadow-lg border-l-4 border-emerald-700 hidden md:block">
              <p className="font-bold text-zinc-900">
                {CATALINA.categoria}
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
