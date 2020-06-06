// Módulo subject contendo as 3 principais etapas
export default function createKeyboardListener() {
    // Array que armazena os observers
    const state = {
        observers: []
    }

    // Função usada para inscrever os observers na "lista de contatos" do subject
    function subscribe(observerFunction) {
        state.observers.push(observerFunction)
    }

    // Função que notifica os objects com o command (saída do subject)
    function notifyAll(command) {
        for (const observerFunction of state.observers) {
            observerFunction(command)
        }
    }

    // Função SUBJECT (Teclas pressionadas pelo usuário)
    document.addEventListener('keydown', handleKeydown)

    function handleKeydown(event) {
        const keyPressed = event.key

        const command = {
            playerId: 'player1',
            keyPressed
        }

        // Notifica os observers
        notifyAll(command)
    }

    // Torna pública as funções, as quais, estão dentro da factory createGame()
    return {
        subscribe,
        notifyAll,
        handleKeydown
    }
}