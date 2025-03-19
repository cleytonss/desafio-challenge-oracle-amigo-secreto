//O principal objetivo deste desafio é fortalecer suas habilidades em lógica de programação. Aqui você deverá desenvolver a lógica para resolver o problema.

// Função para embaralhar um array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Função para atribuir amigos secretos
function assignSecretSanta(participants) {
    let shuffledParticipants = shuffle([...participants]);
    let assignments = {};

    for (let i = 0; i < participants.length; i++) {
        assignments[participants[i]] = shuffledParticipants[i];
    }

    // Verifica se alguém tirou a si mesmo e reatribui se necessário
    for (let i = 0; i < participants.length; i++) {
        if (participants[i] === assignments[participants[i]]) {
            return assignSecretSanta(participants);
        }
    }

    return assignments;
}

let participants = [];

// Função para resetar a lista de amigos e resultados
function resetarLista() {
    participants = [];
    atualizarListaAmigos();
    document.getElementById('resultado').innerHTML = '';
}

// Função para adicionar um amigo à lista
function adicionarAmigo() {
    const input = document.getElementById('amigo');
    const nome = input.value.trim();
    if (nome && !participants.includes(nome)) {
        participants.push(nome);
        atualizarListaAmigos();
        input.value = '';
    }
}

// Função para atualizar a lista de amigos no HTML
function atualizarListaAmigos() {
    const lista = document.getElementById('listaAmigos');
    lista.innerHTML = '';
    participants.forEach((amigo) => {
        const li = document.createElement('li');
        li.textContent = amigo;
        lista.appendChild(li);
    });
}

// Função para sortear amigos secretos e exibir o resultado
function sortearAmigo() {
    if (participants.length < 2) {
        alert('Adicione pelo menos 2 amigos para sortear.');
        return;
    }
    const assignments = assignSecretSanta(participants);
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = '';
    for (const [amigo, amigoSecreto] of Object.entries(assignments)) {
        const li = document.createElement('li');
        li.textContent = `${amigo} tirou ${amigoSecreto}`;
        resultado.appendChild(li);
    }
}
