import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const dataDirectory = path.join(process.cwd(), 'data')

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const search = searchParams.get('search')?.toLowerCase() || ''

  try {
    // Check if the data directory exists
    try {
      await fs.access(dataDirectory)
    } catch (error) {
      console.error('Data directory not found:', error)
      return NextResponse.json({ error: 'No destinations available' }, { status: 404 })
    }

    const files = await fs.readdir(dataDirectory)
    const jsonFiles = files.filter(file => file.endsWith('.json'))

    if (jsonFiles.length === 0) {
      return NextResponse.json({ error: 'No destinations available' }, { status: 404 })
    }

    const destinations = await Promise.all(
      jsonFiles.map(async (file) => {
        const filePath = path.join(dataDirectory, file)
        try {
          const fileContent = await fs.readFile(filePath, 'utf-8')
          return JSON.parse(fileContent)
        } catch (error) {
          console.error(`Error reading file ${file}:`, error)
          return null
        }
      })
    )

    const validDestinations = destinations.filter(destination => destination !== null)

    const filteredDestinations = validDestinations.filter(destination =>
      destination.name.toLowerCase().includes(search) ||
      destination.shortDescription.toLowerCase().includes(search)
    )

    return NextResponse.json(filteredDestinations)
  } catch (error) {
    console.error('Error reading destination files:', error)
    return NextResponse.json({ error: 'Failed to fetch destinations' }, { status: 500 })
  }
}

