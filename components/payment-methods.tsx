import { Card, CardContent } from "@/components/ui/card"
import { CreditCard, Building, Wallet } from "lucide-react"

interface PaymentMethodsProps {
  acceptsCredit: boolean
  acceptsDebit: boolean
  acceptsTransfer: boolean
}

export default function PaymentMethods({ 
  acceptsCredit, 
  acceptsDebit, 
  acceptsTransfer 
}: PaymentMethodsProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="font-medium mb-4">Medios de pago</h3>
        
        <div className="space-y-4">
          {acceptsCredit && (
            <div className="flex items-center gap-3">
              <CreditCard className="w-5 h-5 text-gray-500" />
              <div>
                <div className="font-medium">Tarjeta de crédito</div>
                <div className="text-sm text-gray-500">¡Paga en hasta 12 cuotas!</div>
              </div>
            </div>
          )}

          {acceptsDebit && (
            <div className="flex items-center gap-3">
              <Wallet className="w-5 h-5 text-gray-500" />
              <div>
                <div className="font-medium">Tarjeta de débito</div>
                <div className="text-sm text-gray-500">Pago inmediato</div>
              </div>
            </div>
          )}

          {acceptsTransfer && (
            <div className="flex items-center gap-3">
              <Building className="w-5 h-5 text-gray-500" />
              <div>
                <div className="font-medium">Transferencia bancaria</div>
                <div className="text-sm text-gray-500">Pago seguro</div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
