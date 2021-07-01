let p1 = "X"
let p2 = "O"
let currentPlayer = p1 
let playerXscore = 0
let playerOscore = 0
let tieGame = false
let turnCount = 0
let isWinner = false
let isComputer = false

const startMatch =(player)=>{
     resetDisplay()
     isComputer = player
}

let setClickOptions =(allowClicks)=>{
    let optionBoxes = document.getElementsByClassName("option-box")
    for(let opt of optionBoxes){
        opt.addEventListener('click', ()=>{
            (allowClicks ? MoveClick(opt.id) : "")
        });
    }
}

const switchPlayer =()=>{
   return (currentPlayer === p1 ? p2 : p1);
}

const MoveClick =(id)=>{
    setClickOptions(true)
    currentSelection = document.getElementById(id);
    if(!(currentSelection.innerHTML.length) && !isWinner){
        currentSelection.innerHTML = currentPlayer
        currentSelection.value = currentPlayer
        console.log(currentSelection.value)
        if(turnCount > 4){
            isWinner = isWinningPlay(document.getElementById(id))
        }

        if(!isWinner){
            currentPlayer = switchPlayer()
            setDisplay()
        }
        else{
            setPlayerDisplay(`Player ${currentPlayer} WON!!!!`)
        }
        if(!isWinner && turnCount > 9){
            setPlayerDisplay(`TIE GAME!!!!`)
        }
    }
    if((isComputer && currentPlayer == p2) && (!isWinner && turnCount < 10)){
        setClickOptions(false)
        let  options = document.querySelectorAll(".option-box")
        MoveClick(compBestMove(options))
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
    turnCount <= 8 ? turnCount++ : turnCount    
    document.getElementById("turnCount").innerHTML = `Round: ${turnCount}`
}

const resetDisplay =()=>{
    turnCount = 0
    currentPlayer = p1 
    isWinner = false
    resetBoard()
    setDisplay()
}

const setDisplay =()=>{
    setClickOptions(true)
    incrementTurnCountDisplay()
    setPlayerDisplay(`Player ${currentPlayer}'s turn`)
    setScores()
}

const setScores =()=>{
    document.getElementById("X_score").innerHTML = `Player X Score: ${playerXscore}`
    document.getElementById("O_score").innerHTML = `Player O Score: ${playerOscore}`
}

const isWinningPlay =(id)=>{
    const potentialWinningTrio = (id.className).split(" ")
    console.log(potentialWinningTrio)
    for (set of potentialWinningTrio){
        let setArray = document.querySelectorAll(`.${set}`)
        if((setArray[0].innerHTML === setArray[1].innerHTML && setArray[1].innerHTML === setArray[2].innerHTML) && setArray[0].innerHTML.length){
            console.log(`${set} ${setArray[0].innerHTML}, ${setArray[1].innerHTML}, ${setArray[2].innerHTML}`)
            currentPlayer === p1 ? playerXscore++ : playerOscore++
            setScores()
            for (i of setArray){
                document.getElementById(i.id).classList.add("highlight")
            }
            return true
        }
    }
    return false
}
