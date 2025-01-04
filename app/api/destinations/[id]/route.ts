import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const dataDirectory = path.join(process.cwd(), 'data')

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id

  try {
    const filePath = path.join(dataDirectory, `${id}.json`)
    
    // Check if the file exists
    try {
      await fs.access(filePath)
    } catch (error) {
      // File doesn't exist
      console.error(`Destination file not found for id ${id}`, error)
      return NextResponse.json(
        { error: 'Destination not found' },
        { status: 404 }
      )
    }

    const fileContent = await fs.readFile(filePath, 'utf-8')
    const destination = JSON.parse(fileContent)

    return NextResponse.json(destination)
  } catch (error) {
    console.error(`Error reading destination file for id ${id}:`, error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

