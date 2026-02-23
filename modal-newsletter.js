    (function() {
        // 1. Localiza o nonce que a Tray gerou para esta sessão específica
        var scriptElement = document.querySelector('script[nonce]');
        var currentNonce = scriptElement ? scriptElement.getAttribute('nonce') : '';
        
        if (currentNonce) {
            // 2. Cria o carregador do script externo usando o nonce dinâmico
            var script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/gh/thiagomoskito/delivo-tray@latest/modal-newsletter.js';
            script.setAttribute('nonce', currentNonce);
            script.defer = true;
            
            // 3. Injeta o script na página
            document.head.appendChild(script);
        } else {
            console.warn("Nonce não encontrado, tentando carregamento simples...");
            var s = document.createElement('script');
            s.src = 'https://cdn.jsdelivr.net/gh/thiagomoskito/delivo-tray@latest/modal-newsletter.js';
            document.head.appendChild(s);
        }
    })();
