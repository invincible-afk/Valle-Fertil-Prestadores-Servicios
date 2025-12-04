"use client"

import { useState, useEffect, useRef } from "react"
import { Instagram, MessageCircle, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const images = [
  "/Hotel-Francisquito/HOTELFRANCISQUITO-01.jpg",
  "/Hotel-Francisquito/HOTELFRANCISQUITO-02.jpg",
  "/Hotel-Francisquito/HOTELFRANCISQUITO-03.jpg",
  "/Hotel-Francisquito/HOTELFRANCISQUITO-04.jpg",
  "/Hotel-Francisquito/HOTELFRANCISQUITO-05.jpg",
  
]

const HOTEL = {
  nombre: "Hotel Francisquito",
  categoria: "Hospedaje",
  direccion: "Córdoba y Rawson - San Agustín",
  telefono: "2644503149",
  whatsappLink: "https://wa.me/5492644503149",
  instagramLink: "https://instagram.com/hotelfrancisquito",
  logoPath: "/Hotel-Francisquito/HOTELFRANCISQUITO-00.svg",

  fraseCarousel: "Bienestar que se nota. Hospitalidad que se recuerda.",

  descripcion: {
    titulo: "Bienestar que se nota.",
    sub: "Hospitalidad que se recuerda.",
    p1:
      "Nuestro objetivo es simple: que cada huésped se sienta realmente cómodo.",
    p2_highlight:
      "En Hotel Francisquito te recibimos con un espacio cálido, funcional y con ese toque familiar que transforma la estadía en un buen recuerdo.",
    p3_closing:
      "Descanso, comodidad y atención cercana. Todo lo que buscás, en un solo lugar."
  }
}

export function HotelFrancisquitoSection() {
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
    <section className="py-24 bg-[#669a26]/90 relative overflow-hidden">

      <div className="absolute top-0 right-0 w-1/3 h-full bg-sky-100/40 -skew-x-12 translate-x-20" />

      <div className="container px-4 mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">

          {/* LEFT */}
          <div className="w-full lg:w-1/2 order-2 lg:order-1">

            <Image
              src={HOTEL.logoPath}
              alt={HOTEL.nombre}
              width={800}
              height={300}
              className="w-auto h-52 mb-8"
            />

            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-zinc-900 leading-[1.1]">
              {HOTEL.descripcion.titulo} <br />
              <span className="text-sky-800">{HOTEL.descripcion.sub}</span>
            </h2>

            <div className="flex flex-wrap gap-3 mb-6 text-sky-700">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-sky-100 border border-sky-700 rounded-full text-sm">
                <MapPin className="w-4 h-4" />
                {HOTEL.direccion}
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-sky-100 border border-sky-700 rounded-full text-sm">
                <Phone className="w-4 h-4" />
                {HOTEL.telefono}
              </div>
            </div>

            <p className="text-lg text-stone-700 mb-6 leading-relaxed max-w-xl">
              {HOTEL.descripcion.p1}
            </p>

            <p className="text-lg text-stone-700 mb-8 leading-relaxed max-w-xl">
              <span className="font-semibold text-sky-700">
                {HOTEL.descripcion.p2_highlight}
              </span>
              <br />
              <span className="text-zinc-700 font-medium">
                {HOTEL.descripcion.p3_closing}
              </span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => window.open(HOTEL.whatsappLink, "_blank")}
                className="bg-sky-800 hover:bg-sky-900 text-white rounded-full px-8"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Consultar disponibilidad
              </Button>
              <Button
                variant="outline"
                onClick={() => window.open(HOTEL.instagramLink, "_blank")}
                className="border-sky-700 text-sky-800 hover:bg-sky-50 rounded-full px-8"
              >
                <Instagram className="w-5 h-5 mr-2" />
                @hotelfrancisquito
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
                  alt={`Hotel Francisquito ${i + 1}`}
                  fill
                  className={`absolute inset-0 object-cover transition-all duration-[1500ms] ${
                    i === current ? "opacity-100 scale-105" : "opacity-0 scale-100"
                  }`}
                />
              ))}
            </div>

            <div className="absolute top-8 -left-8 bg-white py-3 px-6 rounded-r-full shadow-lg border-l-4 border-sky-600 hidden md:block">
              <p className="font-bold text-zinc-900">{HOTEL.categoria}</p>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}
