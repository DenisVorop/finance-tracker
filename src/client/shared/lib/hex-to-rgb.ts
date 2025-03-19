export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const hexNumber = parseInt(hex.replace(/^#/, ""), 16);
  const r = (hexNumber >> 16) & 255;
  const g = (hexNumber >> 8) & 255;
  const b = hexNumber & 255;
  return { r, g, b };
}
