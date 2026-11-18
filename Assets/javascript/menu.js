/*
 * Menu de navegacao mobile.
 *
 * O menu funciona sem JavaScript: e um checkbox + label controlado por CSS
 * (.menu-alternar:checked ~ .navegacao). Este script e melhoria progressiva e
 * apenas acrescenta o que o CSS nao alcanca:
 *   - anuncia o estado como "botao recolhido/expandido" (aria-expanded) em vez
 *     de "caixa de selecao marcada", que confunde em um menu;
 *   - fecha com a tecla Esc, devolvendo o foco ao botao;
 *   - fecha ao escolher um link ou ao clicar fora.
 *
 * O role/aria-expanded sao definidos aqui, e nao no HTML, para que sem JS o
 * elemento mantenha a semantica nativa e correta de checkbox.
 */
document.addEventListener("DOMContentLoaded", function () {
    var alternar = document.getElementById("menu-alternar");
    var navegacao = document.getElementById("navegacao-principal");
    if (!alternar || !navegacao) return;

    alternar.setAttribute("role", "button");

    function sincronizarEstado() {
        alternar.setAttribute("aria-expanded", alternar.checked ? "true" : "false");
    }

    function fechar(devolverFoco) {
        if (!alternar.checked) return;
        alternar.checked = false;
        sincronizarEstado();
        if (devolverFoco) alternar.focus();
    }

    sincronizarEstado();
    alternar.addEventListener("change", sincronizarEstado);

    // Esc fecha e devolve o foco ao botao, para nao perder a posicao no teclado
    document.addEventListener("keydown", function (evento) {
        if (evento.key === "Escape" || evento.key === "Esc") fechar(true);
    });

    // escolher um link fecha o menu (importante para links de ancora na mesma pagina)
    navegacao.addEventListener("click", function (evento) {
        if (evento.target.closest("a")) fechar(false);
    });

    // clicar fora do cabecalho fecha o menu
    document.addEventListener("click", function (evento) {
        if (!alternar.checked) return;
        if (!evento.target.closest(".cabecalho")) fechar(false);
    });
});
