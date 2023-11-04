/* resumo do funcionamento:      (tambem tem nas linhas do codigo oque cada uma é)

o jogo começa como ativo, com o jogador atual sendo o X, e com todos os quadrados vazios;
tem uma lista das condições de vitorias, as combinações de quadrados que precisam estar iguais para alguem ganhar;

quando você clicka num quadrado, o codigo verifica: se o jogo está ativo, se o quadrado está vazio, se sim ele
coloca no quadrado o simbolo do jogador atual, x ou o, roda a checagem se alguem ganhou ou empatou e passa a vez
se não, não acontece nada, pq se o jogo ja acabou ou o qudrado ja ta preenchido n temq mecher ali.
se ele detectar empate ou que alguem ganhou ele desativa o jogo e anuncia o resultado na caixinha ali,

o btotão de reset deixa tudo nas condições iniciais de novo
e tem um quadrinho com a frase "vez do (variável do player atual)", que mostra de quem é a vez.

quase um GTA5
*/

const tiles = Array.from(document.querySelectorAll('.tile'));  //seleciona a lista dos bloquinhos
const playerDisplay = document.querySelector('.display-player'); //é o baguio que mostra de quem é a vez
const resetButton = document.querySelector('#reset'); //seleciona o botão de reset
const announcer = document.querySelector('.announcer'); //seleciona a caixinha que mostra o resultado

let board = ['', '', '', '', '', '', '', '', '']; //define todos os quadradinhos como vazios
let currentPlayer = 'X'; //o jogo começa com o X
let isGameActive = true; //define o jogo como ativo, quando alguem ganha o jogo desativa e n da pra fazer anda até resetar

const PLAYERX_WON = 'PLAYERX_WON';//os resultados
const PLAYERO_WON = 'PLAYERO_WON';
const TIE = 'TIE';

//condições de vitória, possibilidades de quadrados que precisam estar preenchidos com a mesma letra para alguem ganhar
const winningConditions = [
   [0, 1, 2],
   [3, 4, 5],
   [6, 7, 8],
   [0, 3, 6],
   [1, 4, 7],
   [2, 5, 8],
   [0, 4, 8],
   [2, 4, 6]
];
//se já tiver alguma letra no quadrado, não da pra clickar nele
const isValidAction = (tile) => {
    if (tile.innerText === 'X' || tile.innerText === 'O'){
        return false;
    }
//se não tiver nada, da pra marcar o quadrado
    return true;
};

const updateBoard =  (index) => {
   board[index] = currentPlayer;
}
//toda vez que alguem marca um quadrado, muda a vez do player, troca todas as variáveis de qual player ta jogando
const changePlayer = () => {
    playerDisplay.classList.remove(`player${currentPlayer}`);
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    playerDisplay.innerText = currentPlayer;
    playerDisplay.classList.add(`player${currentPlayer}`);
}
//quando um dos players ganha,ou empata, ele mostra na caixinha la o resultado
const announce = (type) => {
    switch(type){
       case PLAYERO_WON:
            announcer.innerHTML = 'Player <span class="playerO">O</span> ganhou';
            break;
       case PLAYERX_WON:
            announcer.innerHTML = 'Player <span class="playerX">X</span> ganhou';
            break;
       case TIE:
            announcer.innerText = 'Empatouuououoo';
        }
    announcer.classList.remove('hide');
};

function handleResultValidation() {  //verifica se todos os 3 quadrados da condição de vitória estão iguais, se não, o jogo continua, se sim o jogo acaba
  let roundWon = false;
  for (let i = 0; i <= 7; i++) {
    const winCondition = winningConditions[i];
    const a = board[winCondition[0]];
    const b = board[winCondition[1]];
    const c = board[winCondition[2]];
    if (a === "" || b === "" || c === "") {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    announce(currentPlayer === "X" ? PLAYERX_WON : PLAYERO_WON); //o jogo para quando alguem ganha e mostra o resulado
    isGameActive = false;
    return;
  }
//se todas os quadrados tiverem sido preenchidos, sem que alguem tenha ganhado, ele da empate
  if (!board.includes("")) announce(TIE);
}

const userAction = (tile, index) => {    //quando você clicka num quadrado ele checa se o jogo está ativo, se o quadrado esta vazio
  if (isValidAction(tile) && isGameActive) {//se sim ele muda o texto para o do jogador atual, confere se alguem ganhou e muda a vez
    tile.innerText = currentPlayer;
    tile.classList.add(`player${currentPlayer}`);
    updateBoard(index);
    handleResultValidation();//roda o negocio q verifica se alguem ganhou ou empatou
    changePlayer();//muda a vez
  }
};

tiles.forEach( (tile, index) => {
    tile.addEventListener('click', () => userAction(tile, index));// quando aguem clicka no quadrado chama função de cima pra esse quadrado
});

const resetBoard = () => {  //esvazia os quadrados, liga o jogo, some com o anúncio de vitoria, deixa o jogador atual como x
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    announcer.classList.add('hide');

    if (currentPlayer === 'O') {
        changePlayer();
    }
//ele reseta tudo
    tiles.forEach(tile => {
        tile.innerText = '';
        tile.classList.remove('playerX');
        tile.classList.remove('playerO');
    });
}

resetButton.addEventListener('click', resetBoard);//qnd o reset e clickado ativa a função ali de cima e reseta tudo