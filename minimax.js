let count = 0

let scores = {
    X: -10,
    O: 10,
    tie: 0
}

const compBestMove =(options)=>{
    let bestScore = -Infinity
    let compMove
    for (let opt of options){
        if(opt.innerHTML.length < 1){
            opt.innerHTML = p2
            let score = minimax(options, 0, false)
            opt.innerHTML = ""
            if(score > bestScore){
                bestScore = score;
                compMove = opt.id
            }
        }
    }
    console.log("count", count)
    count = 0
    return compMove
}

const minimax =(options, depth, isMax)=>{
    result = isWinningPlayer()
    if(result != null){
        count++
        return scores[result]
    }
    if(isMax){
        let bestScore = -Infinity
        for (let opt1 of options){
            let currentSelection = document.getElementById(opt1.id);
            if(currentSelection.innerHTML === ""){
                currentSelection.innerHTML = p2
                let score = minimax(options, depth+1, false)
                currentSelection.innerHTML = ""
                bestScore = Math.max(bestScore,score)
            }
            
        }
        return bestScore
    }else{
        let bestScore = +Infinity
        for (let opt2 of options){
            let currentSelection = document.getElementById(opt2.id);
            if(currentSelection.innerHTML === ""){
                currentSelection.innerHTML = p1
                score = minimax(options, depth+1, true)
                currentSelection.innerHTML = ""
                bestScore = Math.min(bestScore,score)
            }
        }
        return bestScore
    }
}

const isWinningPlayer =()=>{
    let openSpots = false
    const winningThree = ["row-1", "row-2", "row-3", "column-1", "column-2", "column-3", "horz-1", "horz-2",]
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

// options - return an array of remaining ids of options available
// depth - remaining moves available
// isMax - max or min for recursion