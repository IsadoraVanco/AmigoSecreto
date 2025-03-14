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
 * @brief Adiciona um amigo na lista
 */
function adicionarAmigo() {
    let campoNome = document.getElementById('amigo');
    let nome = campoNome.value;
    
    if(nome == ''){
        alert("Por favor, insira um nome");
    }else{
        nome = capitalizarTexto(nome);
        inserirOrdenado(amigos, nome);
        campoNome.value = "";
        
        atualizarLista();
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
 * @brief Sorteia um amigo que está na lista
 */
function sortearAmigo() {
    if(amigos == ""){
        return;
    }
    
    let indice = Math.floor(Math.random() * amigos.length);
    let nomeSorteado = amigos[indice];
    
    let campoResultado = document.getElementById('resultado');
    
    campoResultado.innerHTML = nomeSorteado;
}

// ***********************************************************

let amigos = [];