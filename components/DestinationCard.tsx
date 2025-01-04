import Link from 'next/link'
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card'

interface DestinationCardProps {
  id: string
  name: string
  image: string
  shortDescription: string
}

export function DestinationCard({ id, name, shortDescription }: DestinationCardProps) {
  return (
    <Card className="h-full">
      <CardContent className="p-4">
        <CardTitle className="text-xl mb-2">{name}</CardTitle>
        <p className="text-sm text-gray-600 dark:text-gray-400">{shortDescription}</p>
      </CardContent>
      <CardFooter>
        <Link href={`/destination/${id}`} className="text-blue-600 hover:underline">
          Learn More
        </Link>
      </CardFooter>
    </Card>
  )
}

