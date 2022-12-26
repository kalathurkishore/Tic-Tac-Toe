import React from'react'
import Square from './Square'
import styles from './styles'
import { withStyles } from '@material-ui/core'

const Board=({winningSquares, squares, clickHandler, classes}) =>{

    return (
    <div className={classes.boardStyle}>
        {squares && squares.map((squareValue, i) => (
            <Square isWinningSquare={winningSquares && winningSquares.includes(i)} key={i} value={squareValue} clickHandler={() => clickHandler(i)}/>
        ))}
    </div>
    )
        }
export default withStyles(styles)(Board)