// === utils/authUtils.ts ===
export function getUserRol(): 'alumno' | 'artista' | 'admin' {
  // Este valor se tomará más adelante del contexto de autenticación
  return 'artista';
}

export function getUserPlan(): number {
  // Este también vendrá de algún estado global o del user
  return 1;
}
