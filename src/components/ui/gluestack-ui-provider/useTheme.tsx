import {tailwindColors} from './colors';

export function useTheme() {
  const getColor = (colorKey: string): string => {
    const match = colorKey.match(/^([a-zA-Z]+)(\d{1,3})$/);
    if (!match) {return '';}

    const [, colorName, shade] = match;
    const group = tailwindColors[colorName.toLowerCase() as keyof typeof tailwindColors];

    if (!group) {return '';}

    return group[shade as keyof typeof group];
  };

  return {getColor};
}
