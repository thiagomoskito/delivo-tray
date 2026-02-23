// alterado em: 23-02-2026 15h30 THM
(function() {
    const GITHUB_URL = 'https://cdn.jsdelivr.net/gh/thiagomoskito/delivo-tray@latest/modal-aviso.html';
    let modalLoaded = false;

    function initObserver() {
        const targetNode = document.querySelector('.cart-header');
        if (!targetNode) return;

        // Observa mudanças de classe no carrinho do topo
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    const isVisible = targetNode.classList.contains('active');
                    if (isVisible && !modalLoaded) {
                        checkAndShowModal();
                    }
                }
            });
        });

        observer.observe(targetNode, { attributes: true });
    }

    async function checkAndShowModal() {
        try {
            const response = await fetch(GITHUB_URL);
            const text = await response.text();
            
            // Criar um elemento temporário para ler o data-versao
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = text;
            const config = tempDiv.querySelector('#delivo-config');
            const version = config ? config.getAttribute('data-versao') : '1.0';
            if (version === 'off') return; // SE ESTIVER "OFF", NÃO EXECUTA NADA.
            const storageKey = `delivo_aviso_v_${version}`;


            // Se o cara já marcou "não exibir" para ESTA versão, cancela
            if (localStorage.getItem(storageKey)) return;

            // Injeta na página
            const modalContainer = document.createElement('div');
            modalContainer.id = 'container-modal-delivo';
            modalContainer.innerHTML = text;
            document.body.appendChild(modalContainer);
            modalLoaded = true;

            const closeAction = () => {
                if (document.getElementById('js-dont-show').checked) {
                    localStorage.setItem(storageKey, 'true');
                }
                modalContainer.remove();
                // Resetamos o modalLoaded para false caso queira que apareça 
                // na próxima abertura (se não marcou o checkbox)
                modalLoaded = false; 
            };

            document.getElementById('js-close-x').onclick = closeAction;
            document.getElementById('js-close-btn').onclick = closeAction;

        } catch (e) {
            console.error("Erro modal:", e);
        }
    }

    // Inicializa
    if (document.readyState === 'complete') {
        initObserver();
    } else {
        window.addEventListener('load', initObserver);
    }
})();
