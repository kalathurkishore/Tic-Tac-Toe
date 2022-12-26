import React, { useState } from 'react'
import { withStyles, FormControl, Button, TextField } from '@material-ui/core'
import generate from 'meaningful-string'
import { connect } from 'react-redux'
import styles from './styles'
import '../fonts.css'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import firebase from 'firebase'

const Home=(props) => {

    const { classes }= props
    const [gameCollectionInfo, setGameCollectionInfo]= useState({ state: false})
    const [errorMessage, setErrorMessage]= useState(null)
    const [loader, setLoader]=useState(false)
    const [gamerInfo, setGamerInfo]= useState({})
    const [joinTokenInfo, setJoinTokenInfo]= useState({})
    // const [joinGameToken, setJoinGameToken]= useState(null)

    const createNewGame= async() => {  
        const options= {
            min: 5,
            max: 5,
            capsWithNumbers: true
        }
        const newGame={
            p1_token: generate.random(options),
            p2_token: generate.random(options)
        }
        await firebase.firestore()
            .collection('games')
            .doc(`${newGame.p1_token}:${newGame.p2_token}`)
            .set({
                boardState: Array(9).fill(null),
                xIsNext: true,
                creatorToken: newGame.p1_token,
                creatorName: gamerInfo.name,
                joineeName: 'noname',
                joineeToken: newGame.p2_token,
                gamers:[newGame.p1_token, newGame.p2_token],
                newGameStarted: false
            })
            .then(()=>{
                props.history.push(`/game/${newGame.p1_token}`)
            })
            .catch((err)=>{
                setLoader(false)
                console.log(err)
            })
    }

    const joinGame= async() => {
        await firebase
            .firestore()
            .collection('games')
            .where('gamers','array-contains', joinTokenInfo.joineeToken)
            .onSnapshot(async (res) => {
                const dataArray= res.docs.map(doc => doc.data())
                if(dataArray.length === 0){
                    setLoader(false)
                    return setErrorMessage('Invalid token, please try again')
                }
                await firebase
                    .firestore()
                    .collection('games')
                    .doc(`${dataArray[0].creatorToken}:${dataArray[0].joineeToken}`)
                    .set({
                        ...dataArray[0],
                        joineeName: gamerInfo.name
                    })
                    .catch((err)=>{
                        setLoader(false)
                        console.log(err)
                    })
                    props.history.push(`/game/${joinTokenInfo.joineeToken}`)
            })
        
    }

    const handleChange=(event) => {
        setErrorMessage(null)
        const { name, value }= event.target
        setGamerInfo({
            [name]: value
        })
    }

    const handleIdChange=(event) =>{
        setErrorMessage(null)
        const { name, value }= event.target
        setJoinTokenInfo({
            [name]: value
        })
    }

    const handleSubmit=(e) => {
        e.preventDefault()
        gameCollectionInfo.type === 'creator' ? createNewGame() : joinGame()
    }

    const resetHomePage=() => {
        setGameCollectionInfo({state:false})
        setErrorMessage(null)
    }

    const infoCollection= (
        <React.Fragment>
            <form onSubmit={handleSubmit}>
                <FormControl className={classes.input}>
                    <TextField autoFocus name='name' onChange={handleChange}  label='Enter your Name' variant="outlined" color="secondary" required/>
                </FormControl>
                { gameCollectionInfo.type === 'joinee' ?  
                <FormControl className={classes.input}>
                    <TextField name='joineeToken' onChange={handleIdChange} label='Enter Game ID' variant="outlined" color="secondary"
                        helperText="*Enter id shared by your friend"required/>
                </FormControl> : null }
                <Button type='submit' className={classes.startGameButton} variant='outlined' color='secondary' >
                    { gameCollectionInfo.type  === 'creator' ? 'Start Game' : 'Join Game' }
                </Button>
                {
                    errorMessage ? <div><span className={classes.error}>{errorMessage}</span></div> : null
                }
                <Button className={classes.cancelGameButton} variant='outlined' color='secondary' onClick={resetHomePage}>
                    Cancel
                </Button>
            </form>
        </React.Fragment>
    )

    return (
        <React.Fragment>
            { 
                loader ?
                <Backdrop className={classes.backdrop} open={ loader } >
                    <CircularProgress color="inherit" />
                </Backdrop>  :  
                <div className={classes.homeContainer}>
                    <div className={classes.paper}> 
                    { gameCollectionInfo.state  ?  
                            infoCollection  : 
                            <React.Fragment>
                            <h1 style={{fontFamily: 'Permanent Marker'}} className={classes.mainHeader}>TIC TAC TOE</h1>
                            <Button className={classes.buttonContainer} variant='outlined' color='secondary' 
                                onClick={()=> setGameCollectionInfo({
                                    state: true, 
                                    type: 'creator'
                                    })
                                }>
                                Create New Game
                            </Button>
                            <Button className={classes.buttonContainer} variant='outlined' color='secondary' 
                                onClick={()=> setGameCollectionInfo({
                                    state: true, 
                                    type: 'joinee'
                                    })
                                }>
                                Join Friend's Game
                            </Button>
                            </React.Fragment> 
                        }
                        </div>
                </div>
            } 
        </React.Fragment>
        
    )
}

const mapDispatchToProps=(dispatch)=>{
    return {
            dispatchTokens: (tokenObj) => {
                dispatch({
                type:'tokens',
                payload: tokenObj
            })}
    }
}

export default connect(null, mapDispatchToProps)(withStyles(styles)(Home))