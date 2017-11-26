const Mural = (function(_render, Filtro){
    "use strict"

    var cartoes = pegaCartoes();
    cartoes.forEach(cartao => preparaCartao(cartao))
    
    function pegaCartoes() {
       let cartoesLocal = JSON.parse(localStorage.getItem(usuario)) || []
        return cartoesLocal !== []
        ? cartoesLocal.map(cartaoLocal => new Cartao(cartaoLocal.conteudo, cartaoLocal.tipo))
        : []
    }
    

    const render = () => _render({cartoes: cartoes, filtro: Filtro.tagsETexto});
    render() 

    Filtro.on("filtrado", render)

    function preparaCartao(cartao) {
        const urlImagens = Cartao.pegaImagens(cartao)
        urlImagens.forEach((url) => {
            fetch(url).then(response => {
                caches.open('ceep-imagens')
                .then(cache => cache.put(url, response))
            })
        })

        cartao.on("mudanca.**", salvaCartoes)
        cartao.on("remocao", ()=> {
            cartoes = cartoes.slice(0)
            cartoes.splice(cartoes.indexOf(cartao),1)
            salvaCartoes()
            render()
        })
    }

    function salvaCartoes() {
        localStorage.setItem(usuario, JSON.stringify(
            cartoes.map(cartao => ({
                conteudo: cartao.conteudo,
                tipo: cartao.tipo
            }))
        ))
    }

    login.on('login', () => {
        cartoes  = pegaCartoes()
        render()
    })

    login.on('logout', () => {
        cartoes = []
        render()
    })


    function adiciona(cartao){
        if(!logado) {
            return;
        }
        cartoes.push(cartao)
        salvaCartoes()
        cartao.on("mudanca.**", render)
        preparaCartao(cartao)
        render()

        return true
    }

    return Object.seal({
        adiciona
    })

})(Mural_render, Filtro)
