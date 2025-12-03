"use client"

import { useState, useEffect, useRef } from "react"
import { Instagram, MessageCircle, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const images = [
  "/Finca-Elsa/FINCAELSA-01.jpg",
  "/Finca-Elsa/FINCAELSA-02.jpg",
  "/Finca-Elsa/FINCAELSA-03.jpg",
  "/Finca-Elsa/FINCAELSA-04.jpg",
]

const FINCA = {
  nombre: "Finca Elsa",
  categoria: "Hospedaje y productos regionales",
  direccion: "Ruta 511 s/n Balde de las Chilcas",
  telefono: "2645098211",
  whatsappLink: "https://wa.me/5492645098211",
  instagramLink: "https://instagram.com/fincaelsa",
  logoPath: "/Finca-Elsa/FINCAELSA-00.svg",

  fraseCarousel: "Una vida simple. Una tierra que inspira.",

  descripcion: {
    titulo: "Una vida simple.",
    sub: "Una tierra que inspira.",
    p1:
      "Finca Elsa es una finca orgánica nacida del sueño de una familia cordobesa que eligió dejar la ciudad para vivir en este paraíso llamado Valle Fértil.",
    p2_highlight:
      "Aquí, la tierra se trabaja con respeto, la naturaleza marca el ritmo y cada día comienza con la calma del campo.",
    p3_closing:
      "Un proyecto de vida convertido en un lugar auténtico, donde lo natural es protagonista y todo se siente más real."
  }
}

export function FincaElsaSection() {
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
    <section className="py-24 bg-[#f2e672]/80 relative overflow-hidden">

      <div className="absolute top-0 right-0 w-1/3 h-full bg-emerald-100/30 -skew-x-12 translate-x-20" />

      <div className="container px-4 mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">

          {/* LEFT */}
          <div className="w-full lg:w-1/2 order-2 lg:order-1">

            <Image
              src={FINCA.logoPath}
              alt={FINCA.nombre}
              width={800}
              height={300}
              className="w-auto h-52 mb-8"
            />

            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-zinc-900 leading-[1.1]">
              {FINCA.descripcion.titulo} <br />
              <span className="text-emerald-800">{FINCA.descripcion.sub}</span>
            </h2>

            <div className="flex flex-wrap gap-3 mb-6 text-emerald-700">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-100 border border-emerald-700 rounded-full text-sm">
                <MapPin className="w-4 h-4" />
                {FINCA.direccion}
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-100 border border-emerald-700 rounded-full text-sm">
                <Phone className="w-4 h-4" />
                {FINCA.telefono}
              </div>
            </div>

            <p className="text-lg text-stone-700 mb-6 leading-relaxed max-w-xl">
              {FINCA.descripcion.p1}
            </p>

            <p className="text-lg text-stone-700 mb-8 leading-relaxed max-w-xl">
              <span className="font-semibold text-emerald-700">
                {FINCA.descripcion.p2_highlight}
              </span>
              <br />
              <span className="text-zinc-700 font-medium">
                {FINCA.descripcion.p3_closing}
              </span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => window.open(FINCA.whatsappLink, "_blank")}
                className="bg-emerald-800 hover:bg-emerald-900 text-white rounded-full px-8"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Consultar disponibilidad
              </Button>
              <Button
                variant="outline"
                onClick={() => window.open(FINCA.instagramLink, "_blank")}
                className="border-emerald-700 text-emerald-800 hover:bg-emerald-50 rounded-full px-8"
              >
                <Instagram className="w-5 h-5 mr-2" />
                @fincaelsa
              </Button>
            </div>
          </div>

          {/* RIGHT */}
          <div className="w-full lg:w-1/2 order-1 lg:order-2 relative"
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
                  alt={`Finca Elsa ${i + 1}`}
                  fill
                  className={`absolute inset-0 object-cover transition-all duration-[1500ms] ${
                    i === current ? "opacity-100 scale-105" : "opacity-0 scale-100"
                  }`}
                />
              ))}
            </div>

            <div className="absolute top-8 -left-8 bg-white py-3 px-6 rounded-r-full shadow-lg border-l-4 border-emerald-600 hidden md:block">
              <p className="font-bold text-zinc-900">{FINCA.categoria}</p>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}
