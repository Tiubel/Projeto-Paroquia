self.addEventListener('fetch', event => {
    event.respondWith(
      caches.open('my-cache')
        .then(cache => cache.match(event.request))
        .then(response => {
          if (response) {
            return response;
          }
  
          return fetch(event.request)
            .then(response => {
              const clonedResponse = response.clone();
              caches.open('my-cache')
                .then(cache => cache.put(event.request, clonedResponse));
              return response;
            });
        })
    );
  });
  