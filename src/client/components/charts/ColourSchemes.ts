import { Dictionary } from 'shared/utils';

export enum ColourSchemes {
  Ocean = 'Ocean',
}

const ColourSchemesValues: Dictionary<Array<string>> = {
  [ColourSchemes.Ocean]: ['#193945', '#40849F', '#79A6AE', '#A1B5B2', '#B8C9BF'],
};

export function getColour(scheme: ColourSchemes, idx: number): string {
  const colours: Array<string> = ColourSchemesValues[scheme];
  return colours[idx % colours.length];
}
