export const mockAuthAPI = () => {
  const originalFetch = window.fetch;

  window.fetch = async (url: RequestInfo | URL, options?: RequestInit) => {
    const urlString = url.toString();

    if (urlString.includes('/api/auth') && options?.method === 'POST') {
      await new Promise(resolve => setTimeout(resolve, 800));

      const body = JSON.parse(options.body as string);
      
      if (body.login === 'test@example.com') {
        return new Response(
          JSON.stringify({
            token: 'mock-jwt-token-12345',
            user: {
              id: '1',
              email: 'test@example.com',
              name: 'Test User'
            }
          }),
          {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          }
        );
      }

      return new Response(
        JSON.stringify({ error: 'Invalid credentials' }),
        {
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    return originalFetch(url, options);
  };
};

