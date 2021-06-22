let currentPlayer = "X" 
let playerXscore = 0
let playerOscore = 0
let tieGame = false
let turnCount = 0
let isWinner = false
let isComputer = false

const PVP =()=>{
    setDisplay()
    setClickOptions(true)
}

const PVC =()=>{
    setDisplay()
    isComputer = true
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
   return (currentPlayer === "X" ? "O" : "X");
}

const MoveClick =(id)=>{
    currentSelection = document.getElementById(id);
    if(!(currentSelection.innerHTML.length) && !isWinner){
        currentSelection.innerHTML = currentPlayer
        if(turnCount > 4){
            isWinner = isWinningPlay()
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
    if(isComputer && currentPlayer == "O"){
        setClickOptions(false)
        //computer makes move
    }
}

const resetBoard =()=>{
    let optionBoxes = document.querySelectorAll(".option-box")
    for(let opt of optionBoxes){
        opt.innerHTML = ""
        document.getElementById(opt.id).classList.remove("highlight")
    }
    resetDisplay()
}

const setPlayerDisplay =(msg)=>{
    document.getElementById("currentPlayer").innerHTML = msg
}

const incrementTurnCountDisplay =()=>{
    turnCount <= 9 ? turnCount++ : turnCount    
    document.getElementById("turnCount").innerHTML = `Round: ${turnCount}`
}

const resetDisplay =()=>{
    if(turnCount != 0){
        turnCount = 0
        currentPlayer = "X" 
        isWinner = false
        setDisplay()
    }
}

const setDisplay =()=>{
    incrementTurnCountDisplay()
    setPlayerDisplay(`Player ${currentPlayer}'s turn`)
    setScores()
}

const setScores =()=>{
    document.getElementById("X_score").innerHTML = `Player X Score: ${playerXscore}`
    document.getElementById("O_score").innerHTML = `Player O Score: ${playerOscore}`
}

const isWinningPlay =()=>{
    const setsOfThree = ["row-1", "row-2", "row-3", "column-1", "column-2", "column-3", "horz-1", "horz-2"]
    for (set of setsOfThree){
        let setArray = document.querySelectorAll(`.${set}`)
        if((setArray[0].innerHTML === setArray[1].innerHTML && setArray[1].innerHTML === setArray[2].innerHTML) && setArray[0].innerHTML.length){
            console.log(`${set} ${setArray[0].innerHTML}, ${setArray[1].innerHTML}, ${setArray[2].innerHTML}`)
            currentPlayer === "X" ? playerXscore++ : playerOscore++
            setScores()
            for (i of setArray){
                document.getElementById(i.id).classList.add("highlight")
            }
            return true
        }
    }
    return false
}
