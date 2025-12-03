import { Button } from "@/components/ui/button"
import {
  MapPin,
  Navigation,
  LucideNavigation as LocalGasStation,
  LucideHospital as LocalHospital,
  CakeSlice as LocalPolice,
  Megaphone as AttachMoney,
} from "lucide-react"

// Servicios cercanos
const services = [
  { name: "Hospital", icon: LocalHospital || MapPin },
  { name: "Policía", icon: LocalPolice || MapPin },
  { name: "Estación de Servicio", icon: LocalGasStation || MapPin },
  { name: "Cajero Automático", icon: AttachMoney || MapPin },
]

export function PracticalInfoSection() {
  return (
    <section className="py-24 bg-zinc-900 text-white">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          
          {/* Distances */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-emerald-500/10 rounded-full">
                <Navigation className="w-6 h-6 text-emerald-400" />
              </div>
              <h2 className="text-3xl font-bold">Planificá tu Viaje</h2>
            </div>

            <p className="text-zinc-400 mb-8">
              Ubicación estratégica para recorrer las maravillas de San Juan.
            </p>

            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                <span className="text-lg font-medium">San Juan Capital</span>
                <span className="text-emerald-400 font-mono">250 km</span>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-emerald-900/20 border border-emerald-500/30">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-lg font-bold text-white">Ischigualasto</span>
                </div>
                <span className="text-emerald-400 font-mono font-bold">72 km</span>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                <span className="text-lg font-medium">La Rioja Capital</span>
                <span className="text-emerald-400 font-mono">140 km</span>
              </div>
            </div>
          </div>

          {/* Map + Services */}
          <div className="flex flex-col justify-between">
            
            {/* Google My Maps embed */}
            <div className="w-full h-64 bg-zinc-800 rounded-2xl overflow-hidden mb-8 relative group">
              <iframe
                src="https://www.google.com/maps/d/embed?mid=1-eK-EuiC1ZSMjCBCxRhFqDrIkjy9qo4&hl=es&ehbc=2E312F"
                className="w-full h-full opacity-60 group-hover:opacity-80 transition-opacity border-0"
                loading="lazy"
              />
            </div>

            {/* Services grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: "Hospital", icon: "🏥" },
                { label: "Policía", icon: "👮" },
                { label: "Combustible", icon: "⛽" },
                { label: "Cajero", icon: "🏧" },
              ].map((service, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-center"
                >
                  <span className="text-2xl mb-2" role="img" aria-label={service.label}>
                    {service.icon}
                  </span>
                  <span className="text-sm text-zinc-300">{service.label}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
