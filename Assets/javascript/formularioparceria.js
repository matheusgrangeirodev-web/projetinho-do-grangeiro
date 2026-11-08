document.addEventListener("DOMContentLoaded", function () {
    var formulario = document.querySelector(".formulario-parceria form");
    if (!formulario) return;

    var botaoEnviar = formulario.querySelector("button[type='submit']");
    var textoOriginal = botaoEnviar.textContent;

    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();

        if (!formulario.checkValidity()) {
            formulario.reportValidity();
            return;
        }

        botaoEnviar.disabled = true;
        botaoEnviar.textContent = "Enviando...";

        var dados = new FormData(formulario);

        fetch("https://formsubmit.co/ajax/hortagrangeiro@gmail.com", {
            method: "POST",
            headers: { "Accept": "application/json" },
            body: dados
        })
        .then(function (resposta) {
            if (resposta.ok) {
                formulario.reset();
                mostrarMensagem("Proposta enviada com sucesso! Retornaremos em até 2 dias úteis.", "sucesso");
            } else {
                mostrarMensagem("Não foi possível enviar. Tente novamente ou entre em contato pelo WhatsApp.", "erro");
            }
        })
        .catch(function () {
            mostrarMensagem("Erro de conexão. Verifique sua internet e tente novamente, ou entre em contato pelo WhatsApp.", "erro");
        })
        .finally(function () {
            botaoEnviar.disabled = false;
            botaoEnviar.textContent = textoOriginal;
        });
    });

    function mostrarMensagem(texto, tipo) {
        var mensagemAnterior = formulario.querySelector(".mensagem-envio");
        if (mensagemAnterior) mensagemAnterior.remove();

        var mensagem = document.createElement("p");
        mensagem.className = "mensagem-envio mensagem-" + tipo;
        mensagem.setAttribute("role", "alert");
        mensagem.textContent = texto;

        botaoEnviar.insertAdjacentElement("afterend", mensagem);
    }
});
