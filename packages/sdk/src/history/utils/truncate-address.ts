export function truncateAddress(address: string): string {
  return address.replace(/^(.{0,4}).+?(.{0,4})$/, '$1...$2');
}
