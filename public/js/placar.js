function inserePlacar() {
    var corpoTabela = $(".placar").find("tbody");
    var usuario = "Matheus";
    var numPalavras = $("#contador-palavras").text();

    var linha = novaLinha(usuario, numPalavras);
    linha.find(".botao-remover").click(removeLinha);

    //adicionando linha dentro do corpo da tabela
    corpoTabela.prepend(linha);
}

function novaLinha(usuario, palavras) {
    //criando elemento
    var linha = $("<tr>");
    var colunaUsuario = $("<td>").text(usuario);
    var colunaPalavras = $("<td>").text(palavras);
    var colunaRemover = $("<td>");

    var link = $("<a>").addClass("botao-remover").attr("href", "#");
    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

    link.append(icone);

    colunaRemover.append(link);

    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);

    return linha;

}

function removeLinha() {
    event.preventDefault();
    //subindo para o pai do pai (tr)
    $(this).parent().parent().remove();
}