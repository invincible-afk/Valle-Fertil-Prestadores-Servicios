'use client'

import { useEffect, useRef } from "react"

const logos = [
  { id: "glamping", src: "/Glamping-Las-Higueras/GLAMPINGLASHIGUERAS-08.svg", label: "Glamping" },
  { id: "terrazas", src: "/Terrazas-De-La-Luna/TERRAZASDELALUNA-06-01.svg", label: "Terrazas" },
  { id: "cabanamadrid", src: "/Cabaña-Madrid/CABAÑAMADRID.svg", label: "Cabaña Madrid" },
  { id: "fincaelsa", src: "/Finca-Elsa/FINCAELSA-00.svg", label: "Finca Elsa" },
  { id: "francisquito", src: "/Hotel-Francisquito/HOTELFRANCISQUITO-00.svg", label: "Hotel Francisquito" },
  { id: "carnes-sb", src: "/Carnes-Santa-Barbara/CARNESSANTABARBARA-09.svg", label: "Carnes Santa Bárbara" },
  { id: "escape-aventura", src: "/Escape-Aventura/ESCAPEAVENTURA-05.svg", label: "Escape Aventura" },
  { id: "asrtoterra", src: "/astroterra/ASTROTERRA.svg", label: "Astroterra" },
  { id: "adventure-tumanas", src: "/Las-Tumanas-Extremo/LASTUMANASEXTREMO-07.svg", label: "Las Tumanas Extremo" },
]

export function LogosCarousel() {
  const trackRef = useRef<HTMLDivElement | null>(null)

  // Scroll automático infinito
  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    let pos = 0
    let animationFrame: number

    const scroll = () => {
      pos -= 0.5 // velocidad
      track.style.transform = `translateX(${pos}px)`
      if (Math.abs(pos) >= track.scrollWidth / 2) {
        pos = 0
      }
      animationFrame = requestAnimationFrame(scroll)
    }

    scroll()

    return () => cancelAnimationFrame(animationFrame)
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 80,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="w-full overflow-hidden py-8">
      <div
        ref={trackRef}
        className="flex gap-16 whitespace-nowrap will-change-transform select-none"
      >
        {[...logos, ...logos].map((logo, i) => (
          <img
            key={i}
            src={logo.src}
            alt={logo.label}
            onClick={() => scrollTo(logo.id)}
            className="
              w-32 h-32 object-contain cursor-pointer 
              
              transition-all duration-300 
              hover:scale-110
            "
          />
        ))}
      </div>
    </div>
  )
}
