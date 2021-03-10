/*----- constants -----*/

const PLAYERS = {
    //we use 1 and -1 because we can easily switch turns by multiplying by -1
    '1':'X',
    '-1':'O',
    //important to have a default third player
    'null':''
};

const COMBOS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

/*----- app's state (variables) -----*/

let winner, turn, gameboard;

/*----- cached element references -----*/

const $squareEls = $('.square');
const $messageEl = $('h2');
const $buttonEl = $('button');
const $gameboardEl = $('#gameboard');

/*----- event listeners -----*/

$buttonEl.click(init); //click to reset game
$gameboardEl.on('click', '.square', handleClick); //only when square is clicked on

/*----- functions -----*/

init(); //initial load of game

function init() {
    winner = false;
    turn = 1;
    gameboard = new Array(9).fill(null); //this creates an array with 9 null values - very powerful trick 
    render();
}

function getWinner(){
    //we just need to iterate over combos and find a winner
    //3 scenarios win, keep playing, tie
    for(let i =0; i<COMBOS.length; i++) {
        //if we have the absolute value of one of the arrays = 3 we have a winner
        if(Math.abs(gameboard[COMBOS[i][0]] + 
                    gameboard[COMBOS[i][1]] +
                    gameboard[COMBOS[i][2]]) === 3) return gameboard[COMBOS[i][0]]
    }
    if(gameboard.includes(null)) return false;
    return 'T';
}

function handleClick(evt) {
    const position = evt.target.dataset.index;
    if(gameboard[position] || winner) return; //exits function if square is truthy i.e. there is a move in that square
    gameboard[position] = turn; //this will set the position within the gameboard array to either an x (1) or an o(-1), using the dataset position to map into the gameboard array
    turn *= -1;
    //get winner returns three possible value and that will be assigned to winner
    winner = getWinner();
    render();
}

function render () {
    //main job is to transfer game data to the dom
    //step 1 loop over gameboard
    gameboard.forEach(function(value, index){
        $squareEls.eq(index).text(PLAYERS[value]) //we are going to use the value to look up whether value is X, O or null in our players object. this will loop through our gameboard, identify at each square, what is the value, and use the index value pair of the gameboard to write in an X or O
    });
    //best to start with falses and work way towards winner
    if(!winner) {
        $messageEl.text(`${PLAYERS[turn]}'s Turn!`);
    } else if ( winner === 'T'){
        $messageEl.text('Tie Game!');
    }else{
        $messageEl.text(`${PLAYERS[winner]} Wins!`);
    }
    
}

