self.addEventListener('fetch', (event) => {
    let pedido = event.request
    console.log('tentou carregar')
   let pro = caches.open('ceep-imagens')
    .then(cache => cache.match(pedido))
    .then(response => response)
    event.respondWith(pro)
})