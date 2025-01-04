import { Navbar } from '@/components/Navbar'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">About Travel Destinations</h1>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p>At Travel Destinations, we&apos;re passionate about inspiring and enabling people to explore the world. Our mission is to provide comprehensive, up-to-date information about various destinations to help travelers make informed decisions and create unforgettable experiences.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>What We Offer</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                <li>Detailed information on popular and off-the-beaten-path destinations</li>
                <li>Travel tips and best practices for various types of trips</li>
                <li>Curated lists of must-see attractions and hidden gems</li>
                <li>Seasonal travel recommendations</li>
                <li>User-friendly interface for easy navigation and search</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Our Team</CardTitle>
              <CardDescription>Meet the passionate travelers behind Travel Destinations</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Our team consists of experienced travelers, writers, and developers who are dedicated to bringing you the best travel content and user experience. We&apos;re constantly updating our database and improving our platform to ensure you have access to the most current and relevant information for your travel planning needs.</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

