// ****** TEXTO *****************************************************

/**
 * @brief Capitaliza (deixa a primeira letra maiúscula e o resto minúsculo) cada palavra de um texto
 * @param texto O texto a ser capitalizado
 * @returns O texto capitalizado
*/
function capitalizarTexto(texto) {
    let simbolos = /[\.\+ ,!?:;'_-]+/;
    let palavras = texto.split(simbolos);

    let contador = 0;
    while(contador < palavras.length){
        palavras[contador] = palavras[contador].charAt(0).toUpperCase() + palavras[contador].slice(1).toLowerCase();
        
        contador++;
    }
    
    let textoAtualizado = palavras.join(" ");
    return textoAtualizado;
}

// ****** ARRAYS *****************************************************

/**
 * @brief Remove um elemento do array
 * @param array O array a ser atualizado
 * @param elemento O elemento a ser retirado
*/
function removerOrdenado(array, elemento) {
    let contador = 0;

    while(contador < array.length){
        if(array[contador] == elemento){
            array.splice(contador, 1);
            break;
        }

        contador++;
    }
}

/**
 * @brief Insere um elemento no array de forma ordenada, sem repetir elementos
 * @param array O array que será atualizado
 * @param elemento O elemento que será inserido
 */
function inserirOrdenado(array, elemento) {
    // Primeiro elemento
    if(array.length == 0){
        array.push(elemento);
    }else{
        let contador = 0;
        
        while(contador < array.length){
            let relacao = array[contador].localeCompare(elemento);
            
            if(relacao > 0){
                // Insere a frente do elemento do contador
                array.splice(contador, 0, elemento);
                break;
            }else if(relacao == 0){
                // Elementos iguais
                break;
            }
    
            contador++;
        }

        // Insere no fim
        if(contador == array.length){
            array.push(elemento);
        }
    }
}

// ****** SORTEIOS *****************************************************

/**
 * @brief Sorteia um amigo que está na lista
*/
function fazerSorteio() {
    let indice = Math.floor(Math.random() * amigos.length);
    amigoSorteado = amigos[indice];
    
    // Adiciona os nomes em sorteados
    inserirOrdenado(sorteados, amigoSorteado);
    
    // Retira da lista de amigos
    amigos.splice(indice, 1);
}

// ****************************************************************************
// ****** CAMPOS VISIVEIS *****************************************************
// ****************************************************************************

/**
 * @brief Esconde um elemento visível utilizando propriedades
 * @param id O id do elemento
 */
function esconderElemento(id) {
    let elemento = document.getElementById(id);
    elemento.disabled = true;
}

/**
 * @brief Mostra um elemento visível utilizando propriedades
 * @param id O id do elemento
*/
function mostrarElemento(id) {
    let elemento = document.getElementById(id);
    elemento.removeAttribute("disabled");
}

// ****** MENSAGEM DE ALERTA *****************************************************

/**
 * @brief Esconde a mensagem de alerta
*/
function esconderMensagem() {
    let campoMensagens = document.getElementById('mensagens');
    campoMensagens.innerHTML = "";
}

/**
 * @brief Mostra uma mensagem de alerta
 * @param mensagem A mensagem a ser mostrada
*/
function mostrarMensagem(mensagem) {
    let campoMensagens = document.getElementById('mensagens');
    campoMensagens.innerHTML = mensagem;
    
    let tempoSegundosEspera = 3 * 1000;
    setTimeout(esconderMensagem, tempoSegundosEspera);
}

// ****** LISTA VISIVEL *****************************************************

/**
 * @brief Atualiza a lista visível de amigos que serão sorteados
*/
function atualizarLista() {    
    let campoLista = document.getElementById('listaAmigos');
    campoLista.innerHTML = "";
    
    let elementosLista = "";
    let contador = 0;
    
    while(contador < amigos.length){
        elementosLista += `<li>${amigos[contador]}</li>`;
        contador++;
    }
    
    campoLista.innerHTML = elementosLista;
}

// ****** RESULTADO DO SORTEIO *****************************************************

/**
 * @brief Esconde o resultado do nome sorteado
*/
function esconderResultado() {
    // Limpa o campo de resultado
    let campoResultado = document.getElementById('resultado');
    campoResultado.innerHTML = "";
    
    // Desativa o botão de resortear
    esconderElemento('botaoResortear');
    
    // Desativa o botão de confirmar
    esconderElemento('botaoConfirmar');
}

/**
 * @brief Mostra o resultado do nome sorteado
 * @param nome O nome sorteado
*/
function mostrarResultado(nome) {
    // Mostra o resultado
    let campoResultado = document.getElementById('resultado');
    campoResultado.innerHTML = `O amigo secreto sorteado é: <strong>${nome}</strong>`;
    
    let botaoResortear = document.getElementById('botaoResortear');
    if(amigos.length <= 0){
        // Desativa o botão de resortear
        esconderElemento('botaoResortear');
    }else{
        // Ativa o botão de resortear
        mostrarElemento('botaoResortear');
    }
    
    // Mostra o botão de confirmar
    mostrarElemento('botaoConfirmar');
}

// ****** AMIGOS RESTANTES *****************************************************

/**
 * @brief Esconde a quantidade de amigos restantes
*/
function esconderAmigosRestantes() {
    let campoRestantes = document.getElementById('amigosRestantes');
    campoRestantes.innerHTML = "";
}

/**
 * @brief Mostra a quantidade de amigos restantes para sortear
*/
function mostrarAmigosRestantes() {
    let campoRestantes = document.getElementById('amigosRestantes');
    let mensagem = "";
    
    if(amigos.length > 0){
        mensagem = `Amigos restantes: ${amigos.length}`;
    }else{
        mensagem = `Todos os amigos já foram sorteados!`;

        // Desativa o botão de sortear
        esconderElemento('botaoSortear');
    }
    
    campoRestantes.innerHTML = mensagem;
}

// ******************************************************************************
// ****** FUNÇÕES DE BOTÕES *****************************************************
// ******************************************************************************

/**
 * @brief Adiciona um amigo na lista
*/
function adicionarAmigo() {    
    let campoNome = document.getElementById('amigo');
    let nome = campoNome.value;
    let expressao = /[A-Za-z][A-Za-z\. ]*$/;
    
    if(!expressao.test(nome)){
        mostrarMensagem("Por favor, insira um nome.");
    }else{
        nome = capitalizarTexto(nome);
        inserirOrdenado(amigos, nome);
        campoNome.value = "";
        campoNome.focus();
        
        atualizarLista();
    }
}

/**
 * @brief Faz o sorteio de um novo amigo, fazendo a reposição do sorteado anteriormente
 */
function resortearAmigo() {    
    // Salva o nome e indice sorteados anteriormente
    let sorteado = amigoSorteado;
    
    fazerSorteio();
    
    // Adiciona o sorteado anteriormente novamente
    inserirOrdenado(amigos, sorteado);

    // Retira o sorteado anteriormente da lista de sorteados
    removerOrdenado(sorteados, sorteado);
    
    // Mostra o resultado
    mostrarResultado(amigoSorteado);
    mostrarAmigosRestantes();
}

/**
 * @brief Confirma o resultado de um amigo sorteado
 */
function confirmarAmigo() {
    // Esconde o resultado
    esconderResultado();

    // Ativa o botão de sortear novo amigo
    if(amigos.length > 0){
        mostrarElemento('botaoSortear');
    }
}

/**
 * @brief Inicia o sorteio dos amigos adicionados
*/
function iniciarSorteio() {
    esconderMensagem();
    
    if(amigos.length == 0){
        mostrarMensagem("Não há nomes inseridos na lista!");
        return;
    }
    
    // Limpa a lista visível
    let campoLista = document.getElementById('listaAmigos');
    campoLista.innerHTML = "";
    
    // Desativa o botão de adicionar amigo
    esconderElemento('adicionarAmigo');
    
    // Desativa o botão de iniciar sorteio
    esconderElemento('botaoIniciar');
    
    // Ativa o botão de sortear
    mostrarElemento('botaoSortear');
    
    // Ativa o botão de reiniciar sorteio
    mostrarElemento('botaoReiniciar');

    mostrarAmigosRestantes();
}

/**
 * @brief Realiza o sorteio de um amigo e mostra os resultados
 */
function sortearAmigo() {
    fazerSorteio();
    
    // Mostra o resultado
    mostrarResultado(amigoSorteado);
    mostrarAmigosRestantes();

    // Desativa botão de sortear
    esconderElemento('botaoSortear');
}


/**
 * @brief Reinicia o sorteio dos amigos adicionados
*/
function reiniciarSorteio() {
    // Adiciona todos os elementos sorteados de volta
    while(sorteados.length > 0){
        inserirOrdenado(amigos, sorteados[0]);
        sorteados.splice(0, 1);
    }
    
    // Mostra a lista de amigos
    atualizarLista();

    // Esconde a lista de amigos restantes e resultado
    esconderAmigosRestantes();
    esconderResultado();
    
    // Desativa o botão de reiniciar
    esconderElemento('botaoReiniciar');
    
    // Desativa o botão de sortear
    esconderElemento('botaoSortear');
    
    // Ativa o botão de iniciar sorteio
    mostrarElemento('botaoIniciar');
    
    // Ativa o botão de adicionar
    mostrarElemento('adicionarAmigo');
}

// ***********************************************************

let amigos = [];
let sorteados = [];
let amigoSorteado = "";