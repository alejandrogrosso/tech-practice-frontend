import { Seller } from "@/types/product"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

interface SellerInfoProps {
  seller: Seller
}

export default function SellerInfo({ seller }: SellerInfoProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-4">
          <Image
            src={seller.logo}
            alt={seller.name}
            width={40}
            height={40}
            className="rounded-full"
          />
          <div>
            <h3 className="font-medium">{seller.name}</h3>
            <span className="text-sm text-gray-500">Vendedor oficial</span>
          </div>
        </div>

        <div className="text-sm text-gray-600">
          <div className="mb-2">
            <span className="font-medium">Transacciones completadas:</span>{" "}
            {seller.seller_reputation.transactions.completed}
          </div>
          <div>
            <span className="font-medium">Nivel del vendedor:</span>{" "}
            {seller.seller_reputation.power_seller_status}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
