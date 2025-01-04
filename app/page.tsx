'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { DestinationCard } from '@/components/DestinationCard'
import { useDebounce } from '@/hooks/useDebounce'
import useSWR from 'swr'
import { Navbar } from '@/components/Navbar'
import { Loader2 } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'
import { Toaster } from '@/components/ui/toaster'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 300)
  const { toast } = useToast()

  const { data: destinations, error, isLoading } = useSWR(
    `/api/destinations?search=${debouncedSearchTerm}`,
    fetcher
  )

  if (error) {
    console.error('Error fetching destinations:', error);
    toast({
      title: "Error",
      description: "Failed to load destinations. Please try again later.",
      variant: "destructive",
    })
  }

  console.log('Destinations data:', destinations);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Explore Travel Destinations</h1>
        <Input
          type="search"
          placeholder="Search destinations..."
          className="mb-6"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center text-red-500">
            Failed to load destinations. Please try again later.
          </div>
        ) : Array.isArray(destinations) && destinations.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {destinations.map((destination) => (
              <DestinationCard
                key={destination.id}
                id={destination.id}
                name={destination.name}
                image={destination.image}
                shortDescription={destination.shortDescription}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500">
            No destinations found. Try adjusting your search.
          </div>
        )}
      </main>
      <Toaster />
    </div>
  )
}

