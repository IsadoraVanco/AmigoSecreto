let amigos = [];

// ********** FUNÇÕES ************************************

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