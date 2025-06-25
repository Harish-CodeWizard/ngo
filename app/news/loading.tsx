import { Card, CardContent } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="grid md:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="watercolor-card border-0 overflow-hidden">
            <div className="relative overflow-hidden">
              <div className="w-full h-48 bg-gray-200 loading-shimmer"></div>
            </div>
            <CardContent className="p-6">
              <div className="serif-title text-xl font-semibold text-gray-800 mb-3 loading-shimmer w-3/4 h-6"></div>
              <div className="sans-body text-gray-600 mb-4 leading-relaxed loading-shimmer w-full h-4"></div>
              <div className="sans-body text-gray-600 mb-4 leading-relaxed loading-shimmer w-1/2 h-4"></div>
              <div className="sans-body text-gray-600 mb-4 leading-relaxed loading-shimmer w-2/3 h-4"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
