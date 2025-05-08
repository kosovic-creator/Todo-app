import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.pathname.split('/').pop(); // Treat `id` as a string

  if (!id) {
    return NextResponse.json({ error: 'ID nije prosleđen.' }, { status: 400 });
  }

  const { title, priority, details, done } = await request.json();

  const todo = await prisma.todo.update({
    where: { id }, // Use `id` as a string
    data: { title, priority, details, done },
  });

  return NextResponse.json(todo);
}

export async function DELETE(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.pathname.split('/').pop(); // Treat `id` as a string

  if (!id) {
    return NextResponse.json({ message: 'ID nije prosleđen.' }, { status: 400 });
  }

  await prisma.todo.delete({ where: { id } }); // Use `id` as a string
  return NextResponse.json({ message: 'Deleted' });
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.pathname.split('/').pop(); // Treat `id` as a string

  if (!id) {
    return NextResponse.json({ message: 'Invalid ID' }, { status: 400 });
  }

  const todo = await prisma.todo.findUnique({
    where: { id }, // Use `id` as a string
  });

  if (!todo) {
    return NextResponse.json({ message: 'Todo not found' }, { status: 404 });
  }

  return NextResponse.json(todo);
}