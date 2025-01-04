'use client'

import { useParams } from 'next/navigation'
import useSWR from 'swr'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function DestinationPage() {
  const { id } = useParams()
  const { data: destination, error } = useSWR(`/api/destinations/${id}`, fetcher)

  if (error) return <div className="text-center text-red-500">Failed to load destinations. Please try again later.</div>
  if (!destination) return <div className="flex justify-center items-center h-64"><Loader2 className="h-8 w-8 animate-spin" /></div>

  return (
    <div className="container mx-auto px-4 py-8">
      <Button asChild className="mb-4">
        <Link href="/">Back to Destinations</Link>
      </Button>
      <h1 className="text-3xl font-bold mb-6">{destination.name}</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <p className="text-lg mb-4">{destination.description}</p>
          <h2 className="text-2xl font-semibold mb-2">Highlights</h2>
          <ul className="list-disc list-inside mb-4">
            {destination.highlights.map((highlight: string, index: number) => (
              <li key={index}>{highlight}</li>
            ))}
          </ul>
          <p className="text-gray-600 dark:text-gray-400">
            Best time to visit: {destination.bestTimeToVisit}
          </p>
        </div>
      </div>
    </div>
  )
}

