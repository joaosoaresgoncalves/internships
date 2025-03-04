import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Test database connection
    const internshipCount = await prisma.internship.count();
    
    return NextResponse.json({ 
      success: true, 
      message: `Database connection successful. Found ${internshipCount} internships.` 
    });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
} 