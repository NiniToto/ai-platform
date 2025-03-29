export function getHeaders(includeAuth = false) {
  const headers: Record<string, string> = {
    'Accept': 'application/json'
  };

  if (includeAuth) {
    const token = localStorage.getItem('access_token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  return headers;
} 