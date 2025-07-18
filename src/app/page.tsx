'use client';
import { redirect } from 'next/navigation';

export default function Home() {
  redirect('./login/iniciar-sesion');
  return null;
}
