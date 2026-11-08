document.addEventListener("DOMContentLoaded", function () {
    var botaoMenu = document.querySelector(".menu-botao");
    var navegacao = document.querySelector(".navegacao");

    if (!botaoMenu || !navegacao) return;

    botaoMenu.addEventListener("click", function () {
        var expandido = botaoMenu.getAttribute("aria-expanded") === "true";
        botaoMenu.setAttribute("aria-expanded", String(!expandido));
        navegacao.classList.toggle("navegacao-aberta");
    });
});
