export function formatString(type: string) {
  return type
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

export const hexToRgba = (hex: string, opacity: number) => {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export const pokemonTypeColors: Record<string, string> = {
  Normal: '#C8C8A8',
  Fire: '#F8B890',
  Water: '#A5D8E8',
  Electric: '#F5E98E',
  Grass: '#B8E8B8',
  Ice: '#B2E0E8',
  Fighting: '#D89090',
  Poison: '#D1A3D8',
  Ground: '#E8D8A8',
  Flying: '#C5C8F8',
  Psychic: '#F8C8C8',
  Bug: '#D0E890',
  Rock: '#D8C8A8',
  Ghost: '#B8A8D8',
  Dragon: '#A5A5E8',
  Dark: '#A8A890',
  Steel: '#C8C8D8',
  Fairy: '#F8D8E8',
};
