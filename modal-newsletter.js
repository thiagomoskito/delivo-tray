(function() {
    // Para testar se o arquivo carregou, ele vai logar isso no console
    console.log("Arquivo da Modal carregado com sucesso!");

    if (!localStorage.getItem('newsletter_checkout_seen')) {
        var modal = document.createElement('div');
        modal.id = 'news-modal-tray';
        modal.innerHTML = '<div style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);z-index:999999;display:flex;align-items:center;justify-content:center;">' +
            '<div style="background:#fff;padding:30px;width:90%;max-width:400px;border-radius:10px;position:relative;text-align:center;font-family:sans-serif;">' +
              '<span id="close-modal-news" style="position:absolute;right:15px;top:10px;cursor:pointer;font-size:25px;font-weight:bold;color:#000;">&times;</span>' +
              '<h2 style="margin-top:10px;color:#333;">Ganhe 10% de desconto</h2>' +
              '<p style="color:#666;">Assine nossa newsletter antes de finalizar sua compra!</p>' +
              '<input type="email" id="modal-email" placeholder="Seu melhor e-mail" style="width:100%;padding:12px;margin:15px 0;border:1px solid #ccc;border-radius:4px;box-sizing:border-box;">' +
              '<button id="btn-save-news" style="width:100%;padding:12px;background:#28a745;color:#fff;border:none;border-radius:5px;cursor:pointer;font-weight:bold;">QUERO MEU DESCONTO</button>' +
            '</div>' +
          '</div>';
        
        document.body.appendChild(modal);

        document.getElementById('close-modal-news').onclick = function() { modal.remove(); };

        document.getElementById('btn-save-news').onclick = function() {
            var email = document.getElementById('modal-email').value;
            if(email && email.indexOf('@') > -1) {
                localStorage.setItem('newsletter_checkout_seen', 'true');
                alert('Desconto aplicado! Use o cupom: BEMVINDO10');
                modal.remove();
            } else {
                alert('Por favor, digite um e-mail válido.');
            }
        };
    }
})();
