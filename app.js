/**
 * @brief Adiciona um amigo na lista
 */
function adicionarAmigo() {
    let campoNome = document.getElementById('amigo');
    let nome = campoNome.value;
    
    console.log(`Amigo '${nome}'`);
    
    if(nome == ''){
        alert("Por favor, insira um nome");
    }else{
        amigos.push(nome);
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