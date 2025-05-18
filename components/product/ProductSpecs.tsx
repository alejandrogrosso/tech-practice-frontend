import React from "react"

interface ProductSpecsProps {
  specs: {
    [key: string]: string | number
  }
}

// Mapeo de íconos SVG para cada característica
const icons: { [key: string]: React.ReactNode } = {
  "Tamaño de la pantalla": (
    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="3" strokeWidth="1.2"/><rect x="9" y="18" width="6" height="1.2" rx="0.6" fill="#ccc"/></svg>
  ),
  "Memoria interna": (
    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24"><rect x="6" y="6" width="12" height="12" rx="2"/><rect x="10" y="10" width="4" height="4" rx="1" fill="#ccc"/></svg>
  ),
  "Cámara trasera principal": (
    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3" fill="#ccc"/></svg>
  ),
  "Cámara frontal principal": (
    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3" fill="#ccc"/></svg>
  ),
  "Con NFC": (
    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24"><rect x="6" y="6" width="12" height="12" rx="2"/><path d="M12 8v8" stroke="#ccc" strokeWidth="1.2"/></svg>
  ),
  "Desbloqueo": (
    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 3" stroke="#ccc" strokeWidth="1.2"/></svg>
  ),
}

const order = [
  "Tamaño de la pantalla",
  "Memoria interna",
  "Cámara trasera principal",
  "Con NFC",
  "Cámara frontal principal",
  "Desbloqueo"
]

export default function ProductSpecs({ specs }: ProductSpecsProps) {
  // Separar en dos columnas
  const left = order.slice(0, 4)
  const right = order.slice(4)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
      {/* Columna izquierda */}
      <div className="flex flex-col gap-6">
        {left.map((key) => (
          key === "Tamaño de la pantalla" && specs[key] ? (
            <div key={key} className="flex items-start gap-3">
              <span className="flex items-center justify-center w-9 h-9 rounded-full bg-[#f5f6fa]">{icons[key]}</span>
              <div className="flex-1">
                <div className="text-gray-800 text-[15px]">Tamaño de la pantalla: <span className="font-bold text-black">{specs[key]}</span></div>
                <div className="text-xs text-gray-500 mb-1">(16.71 cm x 77.4 cm x 8.2 mm)</div>
                {/* Barra visual */}
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-gray-400 min-w-[48px] text-left">PEQUEÑO</span>
                  <div className="flex-1 flex gap-0.5 h-1 max-w-[220px]">
                    <div className="flex-1 bg-gray-200 rounded"></div>
                    <div className="flex-1 bg-gray-200 rounded"></div>
                    <div className="flex-1 bg-blue-500 rounded"></div>
                    <div className="flex-1 bg-gray-200 rounded"></div>
                    <div className="flex-1 bg-gray-200 rounded"></div>
                  </div>
                  <span className="text-[11px] text-gray-400 min-w-[48px] text-right">GRANDE</span>
                </div>
              </div>
            </div>
          ) : (
            specs[key] && (
              <div key={key} className="flex items-center gap-3">
                <span className="flex items-center justify-center w-9 h-9 rounded-full bg-[#f5f6fa]">{icons[key]}</span>
                <span className="text-gray-800 text-[15px]">{key}: <span className="font-bold text-black">{specs[key]}</span></span>
              </div>
            )
          )
        ))}
      </div>
      {/* Columna derecha */}
      <div className="flex flex-col gap-6">
        {right.map((key) => (
          specs[key] && (
            <div key={key} className="flex items-center gap-3">
              <span className="flex items-center justify-center w-9 h-9 rounded-full bg-[#f5f6fa]">{icons[key]}</span>
              <span className="text-gray-800 text-[15px]">{key}: <span className="font-bold text-black">{specs[key]}</span></span>
            </div>
          )
        ))}
      </div>
    </div>
  )
}
