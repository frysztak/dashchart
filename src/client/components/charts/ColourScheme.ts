export enum ColourScheme {
  Ocean = 'Ocean',
  Spectral = 'Spectral',
}

export const ColourSchemeMap: Record<ColourScheme, string> = {
  [ColourScheme.Ocean]: 'Ocean',
  [ColourScheme.Spectral]: 'Spectral',
};

const ColourSchemeValues: Record<ColourScheme, Array<string>> = {
  [ColourScheme.Ocean]: ['#193945', '#40849F', '#79A6AE', '#A1B5B2', '#B8C9BF'],
  [ColourScheme.Spectral]: [
    '#cf384d',
    '#ed6345',
    '#fa9a58',
    '#fdce7c',
    '#fef1a7',
    '#f3faad',
    '#d1ec9c',
    '#96d5a4',
    '#5bb6a9',
    '#3682ba',
  ],
};

export function getColour(scheme: ColourScheme, idx: number): string {
  const colours: Array<string> = ColourSchemeValues[scheme];
  return colours[idx % colours.length];
}
