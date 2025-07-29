'use client';

import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import CvDinamicoInvitacion from './cv/invitacion/page';

export default function DashboardPage() {
  useEffect(() => {
    // 🎯 Versión para pruebas: confeti SIEMPRE
    confetti({ particleCount: 100, spread: 60, origin: { x: 0.1, y: 0.7 } });
    confetti({ particleCount: 100, spread: 60, origin: { x: 0.9, y: 0.7 } });
    confetti({ particleCount: 200, spread: 120, origin: { y: 0.4 } });

    // Versión para producción: confeti SOLO UNA VEZ (cuando se registre)
    /*
    const alreadyShown = localStorage.getItem('cvWelcomeShown');
    if (!alreadyShown) {
      confetti({ particleCount: 100, spread: 60, origin: { x: 0.1, y: 0.7 } });
      confetti({ particleCount: 100, spread: 60, origin: { x: 0.9, y: 0.7 } });
      confetti({ particleCount: 200, spread: 120, origin: { y: 0.4 } });
      localStorage.setItem('cvWelcomeShown', 'true');
    }
    */
  }, []);

  return <CvDinamicoInvitacion />;
}
