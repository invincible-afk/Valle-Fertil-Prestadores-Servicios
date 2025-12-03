import { HeroSection } from "@/components/hero-section"
import { GlampingSection } from "@/components/glamping-section"
import { TerrazasSection } from "@/components/terrazas-section"
import { AdventureSection } from "@/components/adventure-section"
import { AstroterraSection } from "@/components/astroterra-section"
import { PracticalInfoSection } from "@/components/practical-info-section"
import { CabanaMadridSection } from "@/components/madrid-section"
import { CarnesSantaBarbaraSection } from "@/components/CarnesSantaBarbaraSection"
import { EscapeAventuraSection } from "@/components/EscapeAventuraSection"
import { FincaElsaSection } from "@/components/FincaElsaSection"
import { HotelFrancisquitoSection } from "@/components/HotelFrancisquitoSection"
import { LogosCarousel } from "@/components/carrusel"

export default function Page() {
  return (
    <main className="min-h-screen bg-white">

      <HeroSection />

      <div id="glamping">
        <GlampingSection />
      </div>

      <div id="terrazas">
        <TerrazasSection />
      </div>

      <div id="adventure">
        <AdventureSection />
      </div>

      <div id="astroterra">
        <AstroterraSection />
      </div>

      <div id="cabanamadrid">
        <CabanaMadridSection />
      </div>

      {/* NUEVAS SECCIONES */}
      <div id="carnes-sb">
        <CarnesSantaBarbaraSection />
      </div>

      <div id="escape-aventura">
        <EscapeAventuraSection />
      </div>

      <div id="finca-elsa">
        <FincaElsaSection />
      </div>

      <div id="hotel-francisquito">
        <HotelFrancisquitoSection />
      </div>

      <PracticalInfoSection />
      

      
     <footer className="bg-[#a88031]/80 text-zinc-100 py-12 text-center text-sm border-t">

  <div className="container mx-auto px-4">

    <p className="mb-6">© 2025 Valle Fértil - San Juan - Prestadores. Todos los derechos reservados.</p>

    <LogosCarousel />
  </div>
</footer>
    </main>
  )
}
