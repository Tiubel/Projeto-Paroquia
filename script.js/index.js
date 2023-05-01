self.addEventListener('fetch', event => {
    if (event.request.method === 'GET' && event.request.headers.get('accept').includes('text/html')) {
      event.respondWith(
        fetch(event.request).then(response => {
          const clonedResponse = response.clone();
          event.waitUntil(
            caches.open('my-cache').then(cache => {
              cache.put(event.request, clonedResponse);
            })
          );
          return response;
        }).catch(() => {
          return caches.match(event.request);
        })
      );
    } else {
      event.respondWith(fetch(event.request));
    }
  });
  