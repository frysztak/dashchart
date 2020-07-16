export function quantify(noun: string, quantity: number): string {
  switch (quantity) {
    case 0:
      return `No ${noun}s`;
    case 1:
      return `One ${noun}`;
    default:
      return `${quantity} ${noun}s`;
  }
}
