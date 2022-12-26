
const styles= (theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        background: '#FCE6ED',
        color: '#F50057',
    },
    container: {
        textAlign: 'center'
    },
    homeContainer: {
        textAlign: 'center',
        width: '30%',
        margin: '10% auto',
        [theme.breakpoints.between('xs','md')]: {
            width:'95%',
            marginTop: '20%'
        }
    },
    input: {
        width: '226px',
        marginTop: '20px',
        borderRadius: '26px',
        [theme.breakpoints.between('xs','md')]:{
            width: '260px',
            height: '72px'
        }
    },
    error: {
        color: 'red',
        fontWeight: 'bold',
        marginTop: '5%',
        display: 'inline-block'
    },
    startGameButton: {
        marginTop: '20px',
        height: '45px',
        width: '225px',
        color: '#60BA02',
        borderRadius: '26px',
        border: '1px solid #60BA02',
        background: 'white',
        '&:hover': {
            background: '#F1F9E9',
            border: '1px solid #60BA02'
        },
        [theme.breakpoints.between('xs','md')]:{
            marginTop: '30px',
            height: '70px',
            width: '260px',
        }
    },
    cancelGameButton: {
        marginTop: '20px',
        height: '45px',
        width: '225px',
        color: 'red',
        borderRadius: '26px',
        border: '1px solid red',
        background: 'white',
        '&:hover': {
            background: '#F97382',
            border: '1px solid red'
        },
        [theme.breakpoints.between('xs','md')]:{
            height: '70px',
            width: '260px',
        }
    },
    buttonContainer: {
        marginTop: '30px',
        borderRadius: '30px',
        height: '85px',
        width: '230px',
        [theme.breakpoints.between('xs','md')]: {
            height: '72px'
        }
    },
    textField: {
        height: '10px'
    },
    paper:{
        padding: '20px',
        [theme.breakpoints.between('xs','md')]: {
            marginTop: '30%',
            padding: '5%'
        }
    },
    buttonNewGame: {
        color: '#e1b382',
        border: '1px solid #e1b382'
    },
    inputContainer:{
        display: 'block',
        padding: '10px',
        paddingTop: '35px'
    },
    shareText: {
        marginBottom: '10px'
    },
    gameID:{
        color: 'darkblue',
        fontWeight: 'bold',
    },
    mainHeader: {
        color: '#f50057',
        fontWeight: 'bold',
        fontSize: '50px'
    },
    shareDiv: {
        margin: '10px auto',
        width: 'fit-content',
        padding: '10px',
        color: '#f50057',
        border: '1px solid rgba(245, 0, 87, 0.5)',
        background: 'white',
        borderRadius: '17px',
        '&:hover': {
            border: '1px solid #EE1C66'
        },
        [theme.breakpoints.between('xs','md')]:{
            height: '54px',
            width: 'fit-content',
        }
    },
    header: {
        width: 'fit-content',
        height: '50px',
        margin: '0 auto',
        fontWeight: 600,
        color: '#f50057',
        marginTop: '3%',
        [theme.breakpoints.between('xs','md')]: {
            marginTop: '30%'
        }
    },
    joineeHeader:{
        width: 'fit-content',
        height: '50px',
        margin: '0 auto',
        fontWeight: 600,
        color: '#f50057',
        marginTop: '3%',
        [theme.breakpoints.between('xs','md')]: {
            margnTop: '0%'
        }
    },
    newGameButton: {
        height: '67px',
        width: '233px',
        borderRadius: '17px',
        marginTop: '1%',
        [theme.breakpoints.between('xs','md')]: {
            marginTop: '5%',
            height: '76px',
            width: '239px'
        }
    },
    boardStyle: {
        border: '5px solid #EB3374',
        borderRadius: '10px',
        width: '500px',
        height: '500px',
        margin: '20px auto',
        display: 'grid',
        marginTop: '3%',
        gridTemplate: 'repeat(3, 1fr) / repeat(3, 1fr)',
        [theme.breakpoints.between('xs','md')]: {
            width: '300px',
            height: '300px',
            marginTop: '12%'
        }
    },
    exitIcon:{
        color: '#f50057',
        fontSize: '100px',
        '-moz-transform': 'scale(-1, -1)',
        '-o-transform': 'scale(-1, -1)',
        '-webkit-transform': 'scale(-1, -1)',
        transform: 'scale(-1, -1)',
        [theme.breakpoints.between('xs','md')]:{
            fontSize: '75px',
            marginTop: '20px'
        }
    }
})


export default styles