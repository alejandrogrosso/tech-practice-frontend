import React from "react"
import { DevicePhoneMobileIcon, CpuChipIcon, CameraIcon, WifiIcon, FingerPrintIcon } from "@heroicons/react/24/outline";

interface ProductSpecsProps {
  specs: {
    [key: string]: string | number
  }
}


const icons: { [key: string]: React.ReactNode } = {
  "Tamaño de la pantalla": <DevicePhoneMobileIcon className="w-5 h-5 text-gray-400" />,
  "Memoria interna": <CpuChipIcon className="w-5 h-5 text-gray-400" />,
  "Cámara trasera principal": <CameraIcon className="w-5 h-5 text-gray-400" />,
  "Cámara frontal principal": <CameraIcon className="w-5 h-5 text-gray-400" />,
  "Con NFC": <WifiIcon className="w-5 h-5 text-gray-400" />,
  "Desbloqueo": <FingerPrintIcon className="w-5 h-5 text-gray-400" />,
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

  const left = order.slice(0, 4)
  const right = order.slice(4)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
      
      <div className="flex flex-col gap-6">
        {left.map((key) => (
          key === "Tamaño de la pantalla" && specs[key] ? (
            <div key={key} className="flex items-start gap-3">
              <span className="flex items-center justify-center w-9 h-9 rounded-full bg-[#f5f6fa]">{icons[key]}</span>
              <div className="flex-1">
                <div className="text-gray-800 text-[15px]">Tamaño de la pantalla: <span className="font-bold text-black">{specs[key]}</span></div>
                <div className="text-xs text-gray-500 mb-1">(16.71 cm x 77.4 cm x 8.2 mm)</div>
                
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
