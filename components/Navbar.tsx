import Link from 'next/link'
import { Home } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Navbar() {
  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Home className="h-6 w-6" />
          <span className="font-bold text-lg">Travel Destinations</span>
        </Link>
        <div className="space-x-4">
          <Button asChild variant="ghost">
            <Link href="/about">About</Link>
          </Button>
        </div>
      </div>
    </nav>
  )
}

