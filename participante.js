//Array JavScript
let participantes = [
    {
        nome: "Jaco Alfaia",
        email: "alfaiajaco@gmail.com",
        dataInscricao: new Date(2024, 2, 23, 20, 20),
        dataCheckIn: null,
    },
    {
        nome: "Luana Moraes",
        email: "luana@gmail.com",
        dataInscricao: new Date(2024, 1, 28, 16, 30),
        dataCheckIn: new Date(2024, 2, 27, 20, 40)
    },
    {
        nome: "Alice Silva",
        email: "alice.silva@email.com",
        dataInscricao: new Date(2024, 2, 10, 10, 0),
        dataCheckIn: new Date(2024, 2, 12, 14, 30),
    },
    {
        nome: "Bernardo Oliveira",
        email: "bernardo.oliveira@email.com",
        dataInscricao: new Date(2024, 2, 12, 15, 15),
        dataCheckIn: null,
    },
    {
        nome: "Camila Fernandes",
        email: "camila.fernandes@email.com",
        dataInscricao: new Date(2024, 2, 15, 8, 30),
        dataCheckIn: new Date(2024, 2, 17, 12, 15),
    },
    {
        nome: "Daniel Santos",
        email: "daniel.santos@email.com",
        dataInscricao: new Date(2024, 2, 17, 11, 0),
        dataCheckIn: new Date(2024, 2, 19, 15, 45),
    },
    {
        nome: "Eduardo Costa",
        email: "eduardo.costa@email.com",
        dataInscricao: new Date(2024, 2, 19, 14, 30),
        dataCheckIn: new Date(2024, 2, 21, 17, 15),
    },
    {
        nome: "Fernanda Souza",
        email: "fernanda.souza@email.com",
        dataInscricao: new Date(2024, 2, 22, 9, 0),
        dataCheckIn: null,
    },
    {
        nome: "Gabriel Pereira",
        email: "gabriel.pereira@email.com",
        dataInscricao: new Date(2024, 2, 24, 12, 15),
        dataCheckIn: new Date(2024, 2, 26, 16, 0),
    },
    {
        nome: "Helena Rocha",
        email: "helena.rocha@email.com",
        dataInscricao: new Date(2024, 2, 26, 15, 30),
        dataCheckIn: new Date(2024, 2, 28, 18, 15),
    },
];

const criarNovoParticipante = (participante) => {
    const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)
    let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)

    //Condicional
    if (participante.dataCheckIn == null) {
        dataCheckIn = `
            <button
            data-email="${participante.email}"
            onclick="fazerCheckIn(event)">
                Confirmar Check-In
            </button>
        `
    }

    return `
        <tr>
            <td>
                <strong>${participante.nome}</strong><br>
                <small>${participante.email}</small>
            </td>
            <td>${dataInscricao}</td>
            <td>${dataCheckIn}</td>
        </tr>
            `
}

const atualizarLista = (participantes) => {
    let output = ""

    // Loop - estrutura de repetição
    for (let participante of participantes) {
        output = output + criarNovoParticipante(participante)
    }

    //Substituir informação no HTML
    document.querySelector('tbody').innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
    event.preventDefault()

    const dadosDoFormulario = new FormData(event.target)

    const participante = {
        nome: dadosDoFormulario.get('nome'),
        email: dadosDoFormulario.get('email'),
        dataInscricao: new Date(),
        dataCheckIn: null
    }

    //Verificar se participante já existe
    const participanteExiste = participantes.find((p) => {
        return p.email == participante.email
    })

    if (participanteExiste) {
        alert('Email já cadastrado!!')
        return
    }

    participantes = [participante, ...participantes]
    atualizarLista(participantes)

    //Limpar o formulário
    event.target.querySelector('[name="nome"]').value = ""
    event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {
    //Confirmar se realmente quer o Check-In
    const messageConfirm = 'Tem certeza que deseja fazer o Check-In?'
    if (confirm(messageConfirm) == false) {
        return
    }

    //Encontrar o participante dentro da lista
    const participante = participantes.find((p) => {
        return p.email == event.target.dataset.email
    })

    //Atualizar o Check-In do participante
    participante.dataCheckIn = new Date()

    //Atualizar a Lista de participantes
    atualizarLista(participantes)
}