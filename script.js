const MAX_TURNS = 9
let currentPlayer
let turnCount = 0
let isWinner = false

const startMatch =(rival)=>{
    player_1 = new Player("X", 0, "human")
    player_2 = new Player("O", 0, rival)
    resetDisplay()
}

const randomSelection =()=>{
    let randomPick = Math.random()
    randomPick > 0.5 ? currentPlayer = "X" : currentPlayer = "O"
    if(currentPlayer === "O" && player_2.type === "robot"){
        compMove()
    }
}

let setClickOptions =(allowClicks)=>{
    let optionBoxes = document.getElementsByClassName("option-box")
    for(let opt of optionBoxes){
        opt.addEventListener('click', ()=>{
            (allowClicks ? MoveClick(opt.id) : "")
        });
    }
}

const compMove =()=>{
    //setClickOptions(false)
    let  options = document.querySelectorAll(".option-box")
    MoveClick(compBestMove(options))
}

const switchPlayer =()=>{
   return (currentPlayer === player_1.symbol ? player_2.symbol : player_1.symbol);
}

const MoveClick =(id)=>{
    //setClickOptions(true)
    let currentSelection = document.getElementById(id);
    if(!(currentSelection.innerHTML.length) && !isWinner){
        currentSelection.innerHTML = currentPlayer
        if(turnCount > 4){
            isWinner = isWinningPlay()
        }

        if(!isWinner){
            currentPlayer = switchPlayer()
            setDisplay()
        }
        else if(isWinner != "tie"){
            highlightWinner()
            currentPlayer === "X" ? player_1.incrementScore() : player_2.incrementScore()
            setPlayerDisplay(`Player ${currentPlayer} WON!!!!`)
        }
        else{
            setPlayerDisplay(`TIE GAME!!!!`)
        }
    }
    if((player_2.type === "robot" && currentPlayer == "O") && (!isWinner && turnCount < MAX_TURNS)){
        compMove()
    }
}

const resetBoard =()=>{
    let optionBoxes = document.querySelectorAll(".option-box")
    for(let opt of optionBoxes){
        opt.innerHTML = ""
        document.getElementById(opt.id).classList.remove("highlight")
    }
}

const setPlayerDisplay =(msg)=>{
    document.getElementById("currentPlayer").innerHTML = msg
}

const incrementTurnCountDisplay =()=>{
    turnCount <= MAX_TURNS ? turnCount++ : turnCount    
    document.getElementById("turnCount").innerHTML = `Round: ${turnCount}`
}

const resetDisplay =()=>{
    turnCount = 0
    currentPlayer = player_1.symbol
    //randomSelection() 
    isWinner = false
    resetBoard()
    setDisplay()
}

const setDisplay =()=>{
    //setClickOptions(true)
    incrementTurnCountDisplay()
    setPlayerDisplay(`Player ${currentPlayer}'s turn`)
    setScores()
}

const setScores =()=>{
    document.getElementById("X_score").innerHTML = `Player X Score: ${player_1.score}`
    document.getElementById("O_score").innerHTML = `Player O Score: ${player_2.score}`
}

const isWinningPlay =()=>{
    let openSpots = false
    const winningThree = ["row-1", "row-2", "row-3", "column-1", "column-2", "column-3", "horz-1", "horz-2"]
    for (set of winningThree){
        let setArray = document.querySelectorAll(`.${set}`)
        if(setArray[0].innerHTML === "" || setArray[1].innerHTML === "" || setArray[2].innerHTML === ""){
            openSpots = true
        }
        else if((setArray[0].innerHTML === setArray[1].innerHTML && setArray[1].innerHTML === setArray[2].innerHTML) && setArray[0].innerHTML.length){
            return setArray[0].innerHTML
        }
    }
    if(!openSpots){
        return "tie"
    }
    return null
}

const highlightWinner =()=>{
    const winningThree = ["row-1", "row-2", "row-3", "column-1", "column-2", "column-3", "horz-1", "horz-2"]
    for (set of winningThree){
        let setArray = document.querySelectorAll(`.${set}`)
        if((setArray[0].innerHTML === setArray[1].innerHTML && setArray[1].innerHTML === setArray[2].innerHTML) && setArray[0].innerHTML.length){
           for(let opt of setArray){
                document.getElementById(opt.id).classList.add("highlight")
           }
        }
    }
}
