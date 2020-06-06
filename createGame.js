// Módulo Factory de criação dos objetos básicos do jogo
export default function createGame() {
    // Guarda as posições dos players e da fruta
    const state = {
        players: {},
        fruits: {}
    }

    // Função para adicionar players
    function addPlayer(command) {
        const playerId = command.playerId
        const playerX = command.playerX
        const playerY = command.playerY

        state.players[playerId] = {
            x: playerX,
            y: playerY
        }
    }

    // Função para adicionar frutas
    function addFruit(command) {
        const fruitId = command.fruitId
        const fruitX = command.fruitX
        const fruitY = command.fruitY

        state.fruits[fruitId] = {
            x: fruitX,
            y: fruitY
        }
    }

    // Função para remover players
    function removePlayer(command) {
        const playerId = command.playerId

        delete state.players[playerId]
    }

    // Função para remover frutas
    function removeFruit(command) {
        const fruitId = command.fruitId

        delete state.fruits[fruitId]
        console.log(`${fruitId} removed`)
    }

    // Função de movimentação do player e regra de negócio para limitação das parades 
    function movePlayer(command) {
        // Função das regras de negócio da movimentação do player
        const acceptedMoves = {
            ArrowUp(player) {
                if (player.y - 1 >= 0) {
                    player.y = player.y - 1
                    return
                }
            },
            ArrowLeft(player) {
                if (player.x - 1 >= 0) {
                    player.x = player.x - 1
                    return
                }
            },
            ArrowDown(player) {
                if (player.y + 1 < screen.height) {
                    player.y = player.y + 1
                    return
                }
            },
            ArrowRight(player) {
                if (player.x + 1 < screen.width) {
                    player.x = player.x + 1
                    return
                }
            }
        }


        const keyPressed = command.keyPressed
        const playerId = command.playerId
        const player = state.players[command.playerId]
        const moveFunction = acceptedMoves[keyPressed]

        // Filtro para para não rodar funções desnecessárias
        // como quando uma tecla não programada é pressionada
        if (player && moveFunction) {
            moveFunction(player)
            checkForFuitCollision(playerId)
        }
    }

    // Algoritmo de colisão para players e frutas
    function checkForFuitCollision(playerId) {
        const player = state.players[playerId]

        for (const fruitId in state.fruits) {
            const fruit = state.fruits[fruitId]
            console.log(`Checking ${playerId} and ${fruitId}`)

            playerX = player.x
            playerY = player.y
            if (playerX === fruit.x && playerY === fruit.y) {
                console.log(`COLLISION between ${playerId} and ${fruitId}`)
                removeFruit({
                    fruitId: fruitId
                })
            }
        }
    }

    // Torna pública as funções, as quais, estão dentro da factory createGame()
    return {
        state,
        addPlayer,
        removePlayer,
        movePlayer,
        removeFruit,
        checkForFuitCollision
    }
}