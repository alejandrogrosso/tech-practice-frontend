import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface ProductSpecsProps {
  specs: {
    [key: string]: string | number
  }
}

export default function ProductSpecs({ specs }: ProductSpecsProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="font-medium mb-4">Características principales</h3>
        
        <div className="space-y-2">
          {Object.entries(specs).map(([key, value], index) => (
            <div key={key}>
              <div className="flex gap-4 py-2">
                <div className="w-1/3 text-gray-500">{key}</div>
                <div className="w-2/3">{value}</div>
              </div>
              {index < Object.entries(specs).length - 1 && (
                <Separator />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
