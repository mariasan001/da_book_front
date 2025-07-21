'use client';
import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/auth/login'); // o /auth/login/iniciar-sesion si es más específico
  return null;
}
