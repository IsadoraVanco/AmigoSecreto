let amigos = [];

// ***********************************

function adicionarAmigo() {
    let campoNome = document.getElementById('amigo');
    let nome = campoNome.value;
    
    console.log(`Amigo '${nome}'`);

    if(nome == ''){
        alert("Por favor, insira um nome");
    }else{
        amigos.push(nome);
        campoNome.value = "";
    }
}