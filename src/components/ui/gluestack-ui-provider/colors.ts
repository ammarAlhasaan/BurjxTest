export function convertColorsToVars(colors: Record<string, Record<string, string>>) {
  const hexToRgb = (hex: string): string => {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r} ${g} ${b}`;
  };

  const vars: Record<string, string> = {};

  Object.entries(colors).forEach(([colorName, shades]) => {
    Object.entries(shades).forEach(([shade, hex]) => {
      vars[`--color-${colorName}-${shade}`] = hexToRgb(hex);
    });
  });

  return vars;
}
export const tailwindColors = {
  'primary': {
    '0': '#FEFFF2',
    '50': '#FEFFF2',
    '100': '#FCFFE6',
    '200': '#F7FFBF',
    '300': '#F1FF99',
    '400': '#E1FF4D',
    '500': '#CDFF00',
    '600': '#B0E600',
    '700': '#86BF00',
    '800': '#619900',
    '900': '#437300',
    '950': '#264A00',
  },
  'secondary': {
    '0': '#F5FCFF',
    '50': '#F5FCFF',
    '100': '#EBF8FF',
    '200': '#CCEBFF',
    '300': '#ADDAFF',
    '400': '#70B0FF',
    '500': '#347AFF',
    '600': '#2968E6',
    '700': '#1D4DBF',
    '800': '#123999',
    '900': '#0A2473',
    '950': '#04154A',
  },
  'tertiary': {
    '0': '#543112',
    '50': '#6c3d13',
    '100': '#824917',
    '200': '#b4621a',
    '300': '#d7751f',
    '400': '#e78128',
    '500': '#fb9d4b',
    '600': '#fdb474',
    '700': '#fed1aa',
    '800': '#ffe9d5',
    '900': '#fff2e5',
    '950': '#fffaf5',
  },
  'error': {
    '0': '#531313',
    '50': '#7f1d1d',
    '100': '#991b1b',
    '200': '#b91c1c',
    '300': '#dc2626',
    '400': '#e63535',
    '500': '#ef4444',
    '600': '#f96160',
    '700': '#e55b5a',
    '800': '#fecaca',
    '900': '#fee2e2',
    '950': '#fee9e9',
  },
  'success': {
    '0': '#1b3224',
    '50': '#14532d',
    '100': '#166534',
    '200': '#206f3e',
    '300': '#2a7948',
    '400': '#348352',
    '500': '#489766',
    '600': '#66b584',
    '700': '#84d3a2',
    '800': '#a2f1c0',
    '900': '#caffe8',
    '950': '#e4fff4',
  },
  'warning': {
    '0': '#542d12',
    '50': '#6c3813',
    '100': '#824417',
    '200': '#b45a1a',
    '300': '#d76c1f',
    '400': '#e77828',
    '500': '#fb954b',
    '600': '#fdad74',
    '700': '#fecdaa',
    '800': '#ffe7d5',
    '900': '#fff4ed',
    '950': '#fff9f5',
  },
  'info': {
    '0': '#032638',
    '50': '#05405d',
    '100': '#075a83',
    '200': '#0973a8',
    '300': '#0b8dcd',
    '400': '#0da6f2',
    '500': '#32b4f4',
    '600': '#57c2f6',
    '700': '#7ccff8',
    '800': '#a2ddfa',
    '900': '#c7ebfc',
    '950': '#ecf8fe',
  },
  'typography': {
    '0': '#171717',
    '50': '#262627',
    '100': '#404040',
    '200': '#525252',
    '300': '#737373',
    '400': '#8c8c8c',
    '500': '#a3a3a3',
    '600': '#d4d4d4',
    '700': '#dbdbdc',
    '800': '#e5e5e5',
    '900': '#f5f5f5',
    '950': '#ffffff',
  },
  'outline': {
    '0': '#1a1717',
    '50': '#272624',
    '100': '#414141',
    '200': '#535252',
    '300': '#737474',
    '400': '#8c8d8d',
    '500': '#a5a3a3',
    '600': '#d3d3d3',
    '700': '#dddcdb',
    '800': '#e6e6e6',
    '900': '#f3f3f3',
    '950': '#fdfefe',
  },
  'background': {
    '0': '#121212',
    '50': '#2B2B2B',
    '100': '#414040',
    '200': '#535252',
    '300': '#747474',
    '400': '#8e8e8e',
    '500': '#a2a3a3',
    '600': '#d5d4d4',
    '700': '#e5e4e4',
    '800': '#f2f1f1',
    '900': '#f6f6f6',
    '950': '#ffffff',
    error: '#422b2b',
    info: '#1a282e',
    muted: '#333333',
    success: '#1c2b21',
    warning: '#412f23',
  },

  indicator: {
    error: '#e84645',
    info: '#a1c7f5',
    primary: '#f7f7f7',
  },
};

export const colorsRGP = convertColorsToVars(tailwindColors);
