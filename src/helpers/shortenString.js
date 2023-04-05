export function shortenString(string, maxChar) {
  if (string.length > maxChar)
    return string.slice(0, maxChar - 3) + '...';
  return string;
}