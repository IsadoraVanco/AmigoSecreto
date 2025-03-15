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

/**
 * @brief Adiciona um amigo na lista
 */
function adicionarAmigo() {
    let campoNome = document.getElementById('amigo');
    let nome = campoNome.value;
    
    if(nome == ''){
        alert("Por favor, insira um nome.");
    }else{
        nome = capitalizarTexto(nome);
        inserirOrdenado(amigos, nome);
        campoNome.value = "";
        campoNome.focus();
        
        atualizarLista();
    }
}

/**
 * @brief Inicia o sorteio dos amigos adicionados
 */
function iniciarSorteio() {
    if(amigos.length == 0){
        alert("Não há nomes inseridos na lista!");
        return;
    }
    
    // Limpa a lista visível
    let campoLista = document.getElementById('listaAmigos');
    campoLista.innerHTML = "";
    
    // Deixa o botão de adicionar desativado
    let botaoAdicionar = document.getElementById('adicionarAmigo');
    botaoAdicionar.disabled = true;

    // Deixa o botão de sortear visível
    let botaoSortear = document.getElementById('botaoSortear');
    botaoSortear.removeAttribute("disabled");
    
    // Deixa o botão de iniciar invisível
    let botaoIniciar = document.getElementById('botaoIniciar');
    botaoIniciar.disabled = true;

    mostrarAmigosRestantes();
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
    }
    
    campoRestantes.innerHTML = mensagem;
}

/**
 * @brief Sorteia um amigo que está na lista
*/
function sortearAmigo() {
    let indice = Math.floor(Math.random() * amigos.length);
    let nomeSorteado = amigos[indice];
    
    // Mostra o resultado
    let campoResultado = document.getElementById('resultado');
    campoResultado.innerHTML = `O amigo secreto sorteado é: ${nomeSorteado}`;
    
    // Adiciona os nomes em sorteados
    inserirOrdenado(sorteados, nomeSorteado);
    
    // Retira da lista de amigos
    amigos.splice(indice, 1);
    
    mostrarAmigosRestantes();
    
    if(amigos.length == 0){
        // Desativa o botão de sortear
        let botaoSortear = document.getElementById('botaoSortear');
        botaoSortear.disabled = true;
    }
}

// ***********************************************************

let amigos = [];
let sorteados = [];