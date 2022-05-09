import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemText from '@mui/material/ListItemText';
// import data from '../mock/data'
import ListItemButton from '@mui/material/ListItemButton';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import stripHtml from '../utils/stripHtml';
import secondToHms from '../utils/secondsToHms'
import TimeDialog from '../components/TimeDialog'
import { Button } from '@mui/material';
import ResultDialog from '../components/ResultDialog'
import '../assets/css/qbank.css'
import { useLocation, useNavigate } from 'react-router-dom'
import ClipLoader from "react-spinners/ClipLoader";

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        backgroundColor: "rgba(25, 118, 210, 0.08)",
        minHeight: "100vh",
        height: "100%",
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'space-between',
}));

export default function QBank() {

    const {state} = useLocation();
    const navigate = useNavigate();

    let data = state

    if (data === null){
        data = []
    }

    React.useEffect(() => {
        console.log(data);
        setLoading(false)
    }, [data])

    const theme = useTheme()
    const [open, setOpen] = useState(true);
    const [currentQuestion, setCurrentQuestion] = useState(data == "" ? "" : data[0] )
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedAnsCoice, setSelectedChoice] = useState("")
    const [answerValue, setAnswerValue] = useState("")
    const [helperText, setHelperText] = useState("")
    const [error, setError] = useState(false)
    const [showSubmitButton, setShowSubmitButton] = useState(true)
    const [attemptedQuestions, setAttemptedQuestions] = useState([])
    const [counter, setCounter] = useState(data.length * 60);
    const [openDialog, setOpenDialog] = useState(false)
    const [showResults, setShowResults] = useState(false)
    const [loading, setLoading] = useState(true)
    
    const handleRadioChange = (event) => {
        setAnswerValue(event.target.value)
    }

    React.useEffect(() => {
        console.log(attemptedQuestions);
    }, [attemptedQuestions])

    React.useEffect(() => {
        const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);

        if(counter === 0) setOpenDialog(true) 
        return () => clearInterval(timer);
        
      }, [counter]);
    
    
    
    if (loading){
        return (
        <Box sx={{ height: "100vh", display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <ClipLoader size={50} css={{ display: 'block', margin: "auto" }} color={"#123abc"} speedMultiplier={1.5} />
        </Box>
        )
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        setShowSubmitButton(false)

        if (answerValue === currentQuestion.correctAnswer) {
            setAttemptedQuestions([...attemptedQuestions, {question: currentQuestion, answerCorrect: true}])
            setHelperText("Correct Answer!")
        }else{
            setError(true)
            setHelperText("Wrong Answer!")
            setAttemptedQuestions([...attemptedQuestions, {question: currentQuestion, answerCorrect: false}])
        }
    }

    const handleDrawerOpen = () => { setOpen(true) };

    const handleDrawerClose = () => { setOpen(false) };

    const selectQuestion = (index) => {
        let selectedQuestion = data.find(x => x.id === index + 1)
        
        setCurrentQuestion(selectedQuestion)
        
        if(attemptedQuestions.find((ele) => ele.question === selectedQuestion) === undefined){
            setShowSubmitButton(false)
            setError(false)
            setHelperText("")
        }else{
            setShowSubmitButton(true)
            setError(false)
            setHelperText("")
        }
    }

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
        selectQuestion(index);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            {openDialog &&  <TimeDialog dialogOpen={true} />}

            <AppBar position="fixed" open={open}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center'}}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">STEP2 CK QBank</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', columnGap: 3 }}>
                    {counter < 3600 ? 
                    <Typography variant="p" noWrap component="div">Block Time Remaining: {new Date(counter * 1000).toISOString().substr(14, 8)} </Typography>: 
                    <Typography variant="p" noWrap component="div">Block Time Remaining: {new Date(counter * 1000).toISOString().substr(11, 8)} </Typography> }  
                    <Button variant="contained" size="medium" onClick={() => setShowResults(!showResults) }>Finish Test</Button>
                    
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <Typography variant="h6" sx={{ fontWeight: 'bolder' }}>QBANK</Typography>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List component="nav" sx={{ fontWeight: 'bold' }}  aria-label="main mailbox folders">
                    {data.map((text, index) => (
                        <ListItemButton 
                            key={index}
                            selected={selectedIndex === index}
                            onClick={(event) => handleListItemClick(event, index)}
                        >
                            <ListItemText primary={`Question - ${index + 1}`} />
                        </ListItemButton>
                    ))}
                </List>

            </Drawer>

            <Main open={open}>
                <DrawerHeader />
            
            {showResults && 
                <ResultDialog 
                    timeSpent={secondToHms((data.length * 60) - counter)} 
                    correct={attemptedQuestions.filter(e => e.answerCorrect == true).length} 
                    incorrect={attemptedQuestions.filter(e => e.answerCorrect == false).length} 
                    unanswerd={data.length - attemptedQuestions.length} 
                /> 
            }

                <Card sx={{ mb: 5, boxShadow: "rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px" }}>
                    <CardContent>
                        <Typography paragraph dangerouslySetInnerHTML={{ __html: currentQuestion.questionText }}></Typography>
                    </CardContent>
                </Card>
                <form onSubmit={handleSubmit}>
                    <div className="answers">
                        <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">Answer Choices</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue={selectedAnsCoice}
                                name="radio-buttons-group"
                                onChange={handleRadioChange}
                            >
                                {currentQuestion.answerChoiceList.map((answer, index) =>
                                    <div>
                                    {
                                    attemptedQuestions.find((ele) => ele.question === currentQuestion) === undefined ?<FormControlLabel key={index} value={answer.choiceNumber} control={<Radio required={true} disabled={false} />} label={stripHtml(answer.choice)} /> : <FormControlLabel key={index} value={answer.choiceNumber} control={<Radio disabled={true} />} label={stripHtml(answer.choice)}/>
                                    }
                                    
                                    </div>
                                )}
                            </RadioGroup>
                        </FormControl>
                    </div>
                    {showSubmitButton && <Button variant="outlined" type="submit" size="medium" sx={{ mt: 4 }}>Submit</Button>}
                </form>
                <Typography mt={3} variant="h6" color={error ? "red" : "green"}>{helperText}</Typography>
                {attemptedQuestions.find((ele) => ele.question === currentQuestion) !== undefined && 
                
                <Card sx={{ mt: 5, boxShadow: "rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px" }}>
                    <CardContent>
                        <Typography paragraph dangerouslySetInnerHTML={{ __html: currentQuestion.explanationText }}></Typography>
                    </CardContent>
                </Card>
                }
            </Main>
        </Box>
    );
}
