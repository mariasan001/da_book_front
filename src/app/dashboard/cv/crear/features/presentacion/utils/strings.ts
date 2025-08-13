export const formatNumberMX = (n: number) =>
  n.toLocaleString('es-MX');

export const articulosLabel = (n: number) =>
  `${n} ${n === 1 ? 'artículo' : 'artículos'} publicados`;
