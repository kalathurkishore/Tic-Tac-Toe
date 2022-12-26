export const calculateWinner=(squares) => {
    const winningVariations=[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]
    for (let i=0; i < winningVariations.length; i++){
        const [a, b, c]= winningVariations[i]
        if(squares[a] && squares[a] === squares[b] && squares[b] === squares[c])
            return { 
                winner: squares[a],
                winningSquares: winningVariations[i]
            }
    }
    return {
        winner: null,
        winningSquares: null
    }
}