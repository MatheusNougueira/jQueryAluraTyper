var tempoIncial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");

//função que espera o carregamento para página para chamar funções
$(function () {
    atualizaTamanhoFrase();
    incializaContadores();
    incializaCronometro();
    //atalho para o evento click
    $("#botao-reiniciar").click(reiniciaJogo);
    inicializaMarcadores();
});

function atualizaTamanhoFrase() {

    var frase = $(".frase").text();
    //quebrando os espaços da frase e retornando o tamanho dela
    var numPalavras = frase.split(" ").length;
    var tamanhoFrase = $("#tamanho-frase");
    //trocando o texto pelo valor indicado
    tamanhoFrase.text(numPalavras);
}

function incializaContadores() {

    //enquanto eu digito ele escuta o evento input e executa a função
    campo.on("input", function () {
        //.val nos da acesso ao que está dentro do input
        var conteudo = campo.val();
        //adicionando a quantidade de palavras
        var qtdPalavras = conteudo.split(/\s+/).length - 1;//tirando espaços vazios com expressão regular
        //a expressão regular será responsável por buscar qualquer caractere, exceto espaço vazio
        $("#contador-palavras").text(qtdPalavras);

        var qtdCaracteres = conteudo.length;
        $("#contador-caracteres").text(qtdCaracteres);
    });
}

function incializaCronometro() {

    var tempoRestante = $("#tempo-digitacao").text();
    //detectando quando o marcador de texto está no campo, quando ganhou foco
    //.one dispara o evento somente pela primeira vez
    campo.one("focus", function () {
        //todo setInterval retornar seu próprio ID
        var cronometroID = setInterval(function () {
            tempoRestante--;

            $("#tempo-digitacao").text(tempoRestante);
            if (tempoRestante == 0) {
                //attr modifica o atributo
                //adicionando disabled na textArea
                campo.attr("disabled", true);
                //clearInterval ira parar o intervalo quando a condição for verdadeira
                clearInterval(cronometroID);
                //chamando um class CSS
                campo.addClass("campo-desativado")
            }
        }, 1000)
    });
}

// $("#botao-reiniciar").on("click", function(){
//     console.log("Jogo reiniciado");
// })

function inicializaMarcadores() {

    var frase = $(".frase").text();
    campo.on("input", function () {
        var digitado = campo.val();
        var comparavel = frase.substr(0, digitado.length);
        console.log("Digitado:" + digitado);
        console.log("Frase C:" + comparavel);

        if (digitado == comparavel) {
            campo.addClass("borda-verde")
            campo.removeClass("borda-vermelha")
        } else {
            campo.addClass("borda-vermelha")
        }
    })
}

function reiniciaJogo() {
    //passando atributo para reiniciar o campo
    campo.attr("disabled", false);
    //zerando valores ao reiniciar o campo
    campo.val("");
    //zerando o contador de palavras
    $("#contador-palavras").text("0");
    //zerando o contador de caracteres
    $("#contador-caracteres").text("0");
    //zerando o tempo de digitação
    $("#tempo-digitacao").text(tempoIncial);
    incializaCronometro();
    //removendo class
    campo.removeClass("campo-desativado");
    campo.removeClass("borda-vermelha");
    campo.removeClass("borda-verde")
}

