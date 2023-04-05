export function formatDate(dateString, type) {
  const date = new Date(dateString);
  const locale = 'id-ID';
  let options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  };
  if (type === 'long') {
    options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
  }
  return date.toLocaleDateString(locale, options);
};