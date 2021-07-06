//let count = 0

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
            opt.innerHTML = player_2.symbol
            let score = minimax(options, 0, scores.X, scores.O, false)
            opt.innerHTML = ""
            if(score > bestScore){
                bestScore = score;
                compMove = opt.id
            }
        }
    }
    //console.log("count", count)
    //count = 0
    return compMove
}

const minimax =(options, depth, alpha, beta, isMax)=>{
    result = isWinningPlay()
    if(result != null){
        //count++
        return scores[result]
    }
    if(isMax){
        let bestScore = -Infinity
        for (let opt1 of options){
            let currentSelection = document.getElementById(opt1.id);
            if(currentSelection.innerHTML === ""){
                currentSelection.innerHTML = player_2.symbol
                let score = minimax(options, depth+1, alpha, beta, false)
                currentSelection.innerHTML = ""
                bestScore = Math.max(bestScore,score)
                alpha = Math.max(alpha,score)
                if(beta <= alpha){
                    break
                }
            }
        }
        return bestScore
    }else{
        let bestScore = +Infinity
        for (let opt2 of options){
            let currentSelection = document.getElementById(opt2.id);
            if(currentSelection.innerHTML === ""){
                currentSelection.innerHTML = player_1.symbol
                score = minimax(options, depth+1, alpha, beta, true)
                currentSelection.innerHTML = ""
                bestScore = Math.min(bestScore,score)
            }
        }
        return bestScore
    }
}

// options - return an array of remaining ids of options available
// depth - remaining moves available
// isMax - max or min for recursion