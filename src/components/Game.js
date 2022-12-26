/* eslint-disable react-hooks/exhaustive-deps */
import React, {  useState, useEffect } from'react'
import Board from './Board'
import { connect } from 'react-redux'
import { calculateWinner } from '../calculateWinner'
import { confetti } from '../confetti'
import styles from './styles'
import { withStyles, Button }  from '@material-ui/core'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Slide from '@material-ui/core/Slide';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import firebase from 'firebase'

const Game=(props) => {

    const { token }= props.match.params
    const [snackBarOpen, setSnackBarOpen]= useState(true)
    const [newGameStarted, setNewGameStarted]= useState(false)
    const [loader, setLoader]=useState(false)
    const [gameData, setGameData]= useState({
        boardState: Array(9).fill(null),
        creatorToken: null,
        joineeToken: null,
        xIsNext: true,
        gamers: []
    })
    const { boardState, xIsNext, joineeName, creatorName, joineeToken, creatorToken  }= gameData
    const { winner, winningSquares }= calculateWinner(boardState)
    useEffect(()=>{
        firebase
            .firestore()
            .collection('games')
            .where('gamers','array-contains',token)
            .onSnapshot(res=>{
                const gameData= res && res.docs && res.docs.length > 0 && res.docs[0].data()
                setGameData(gameData)
                gameData && setNewGameStarted(gameData.newGameStarted)
            })
    }, [])

    const clickHandler= (index) => {
        //if there is already a winner or square is already clicked and have a value inside it, or player not
        //eligible is clicking squares dont do anything
        if(winner || boardState[index] || (xIsNext && gameData.joineeToken === token) || 
            (!xIsNext && gameData.creatorToken === token) || joineeName === 'noname')
            return;
        xIsNext ? boardState[index] = 'X' : boardState[index] = 'O'
        firebase
            .firestore()
            .collection('games')
            .doc(`${gameData.creatorToken}:${gameData.joineeToken}`)
            .update({
                boardState: boardState,
                xIsNext: !xIsNext
            })
    }

    const checkAllNull=(arr) => {
        //checking all elements are null or not
        const allNull= arr.every((v) => { return v === null; })
        return allNull
    }

    const newGameStartedMessageCloseToDataBase=async() => {
        await firebase
            .firestore()
            .collection('games')
            .doc(`${gameData.creatorToken}:${gameData.joineeToken}`)
            .update({
                newGameStarted: false
            })
    }

    const resetGame=async () => {
        await firebase
            .firestore()
            .collection('games')
            .doc(`${gameData.creatorToken}:${gameData.joineeToken}`)
            .update({
                boardState: Array(9).fill(null),
                xIsNext: true,
                newGameStarted: true
            })
    }

    const titleText=() => {
        let text= 'WAITING FOR YOUR FRIEND'
        if(joineeName === 'noname')
            return text
        //checking whose name should be displayed for next turn
        if((xIsNext && (token === creatorToken)) || (!xIsNext && ( token === joineeToken)))
            text = `YOUR TURN: ${xIsNext?'X':'O'}`
        else if(xIsNext && (token !== creatorToken) && creatorName)
            text = `${creatorName.toUpperCase()}'s TURN: ${xIsNext?'X':'O'}`
        else if(!xIsNext && (token !== joineeToken) && joineeName)
            text = `${joineeName.toUpperCase()}'s TURN: ${xIsNext?'X':'O'}`
        return text
    }

    const winnerText=(winnerIcon) => {
        if(!boardState.includes(null) && !winnerIcon){
            return 'GAME TIED!'
        }
        const winner= winnerIcon === 'X' ? creatorName : joineeName
        const winnerText = winnerIcon ? `${winner.toUpperCase()} WON!` : null
        return winnerText
    }

    const snackBarMessage=()=> {
        const message= creatorToken === token ? 
            `${joineeName && joineeName.toUpperCase()} JOINED THE GAME!` 
                : `YOU JOINED ${creatorName && creatorName.toUpperCase()}'s GAME!`
        return message
    }

    const SlideTransition=(props) => {
        return <Slide {...props} direction="down" />;
      }
    const { classes }=  props
    winner ? confetti.start() : confetti.stop()
    
    return (
        <div className={classes.container}>
            {        
                loader ?
                    <Backdrop className={classes.backdrop} open={true}>
                        <CircularProgress color="inherit" />
                    </Backdrop>  
                :
                <React.Fragment>
                    <h3 className={classes.header}>
                        {   //doing creatorName check here to avoid 'waiting for friend to join' showing, before backend data for 'shareDiv' loads
                            winnerText(winner) ? winnerText(winner) : creatorName && titleText() 
                        }       
                    </h3>
                    {   //snackbar for freind joined
                        joineeName && creatorName && joineeName !== 'noname' && checkAllNull(boardState)  ? 
                       <Snackbar
                            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                            autoHideDuration={6000}
                            open={snackBarOpen}
                            TransitionComponent={SlideTransition}
                            onClose={()=>setSnackBarOpen(false)}
                        >
                            <MuiAlert elevation={6} variant="filled" severity="success">
                                {snackBarMessage()}
                            </MuiAlert>
                        </Snackbar>
                       : null

                    }
                   {    //snackbar for new game started ie, someone clicked on start new game
                        <Snackbar
                            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                            autoHideDuration={6000}
                            open={newGameStarted}
                            onClose={newGameStartedMessageCloseToDataBase}
                        >
                            <MuiAlert elevation={6} variant="filled" severity="success">
                                NEW GAME STARTED
                            </MuiAlert>
                        </Snackbar>
                    }
                    {   //show this button only if game got finished either by tie or having a winner
                        joineeName && joineeName === 'noname' ? 
                            <div className={classes.shareDiv}>
                                <div className={classes.shareText}>GAME ID:
                                    <span className={classes.gameID}>  {joineeToken}</span>
                                </div>
                                <div>SHARE WITH YOUR FRIEND</div>
                            </div>
                            : 
                        (joineeName !== undefined && (!boardState.includes(null) || winner )  ? 
                        <Button onClick={resetGame} variant="outlined" color="secondary" className={classes.newGameButton}>
                            Start New Game
                        </Button>  :  null )
                    }
                    {   //doing check to avoid loading this block (board and exit icon) before firebase data loads
                        creatorName && joineeToken ?
                        <React.Fragment>
                            <Board squares={boardState} winningSquares={winningSquares} clickHandler={clickHandler}/>
                            <ExitToAppIcon className={classes.exitIcon} onClick={()=>props.history.push('/')}/>
                        </React.Fragment>  :
                        <Backdrop className={classes.backdrop} open={true}>
                            <CircularProgress color="inherit" />
                        </Backdrop> 
                    } 
                </React.Fragment>
            }
        </div>
    )

}
const mapStateToProps=(state) => {
    return {
        creatorToken: state.creatorToken,
        joineeToken: state.joineeToken
    }
}

export default connect(mapStateToProps)(withStyles(styles)(Game))