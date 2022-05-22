import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import stripHtml from "../utils/stripHtml";
import secondToHms from "../utils/secondsToHms";
import TimeDialog from "../components/TimeDialog";
import { Button } from "@mui/material";
import ResultDialog from "../components/ResultDialog";
import "../assets/css/qbank.css";
import { useLocation, Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import useResponsive from "../hooks/useResponsive";
import NavBar from "../components/NavBar";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open, drawerWidth, isDesktop }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: "rgba(25, 118, 210, 0.08)",
    minHeight: "100vh",
    height: "100%",
    marginLeft: isDesktop ? `-${drawerWidth}px` : `-${drawerWidth}`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open, drawerWidth }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "space-between",
}));

export default function QBank() {
  const theme = useTheme();

  const isDesktop = useResponsive("up", "sm");

  const drawerWidth = isDesktop ? 240 : "100%";

  const { state } = useLocation();

  let data;
  let secondsPerQuestion;

  if (state === null) {
    data = [];
  } else {
    data = state.data;
    secondsPerQuestion = state.secondsPerQuestion;
  }

  React.useEffect(() => {
    setLoading(false);
  }, [data]);

  const [open, setOpen] = useState(isDesktop ? true : false);
  const [currentQuestion, setCurrentQuestion] = useState(
    data == "" ? "" : data[0]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [answerValue, setAnswerValue] = useState("");
  const [showSubmitButton, setShowSubmitButton] = useState(true);
  const [attemptedQuestions, setAttemptedQuestions] = useState([]);
  const [counter, setCounter] = useState(
    data === [] ? 0 : data.length * secondsPerQuestion
  );
  const [openDialog, setOpenDialog] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(true);
  const [timeSpent, setTimeSpent] = useState(counter);
  const [testComplete, setTestComplete] = useState(false);

  const handleRadioChange = (event) => {
    setAnswerValue(event.target.value);
  };

  React.useEffect(() => {}, [attemptedQuestions]);

  React.useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);

    if (counter === 0) setOpenDialog(true);
    return () => clearInterval(timer);
  }, [counter]);

  if (data.length < 1) {
    return (
      <Box>
        <NavBar />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            my: 25,
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h2">Internal Server Error!</Typography>
          <Link to="/">
            <Button variant="outlined" sx={{ my: 4 }}>
              See Courses
            </Button>
          </Link>
        </Box>
      </Box>
    );
  }

  if (loading) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ClipLoader
          size={50}
          css={{ display: "block", margin: "auto" }}
          color={theme.palette.primary.main}
          speedMultiplier={1.5}
        />
      </Box>
    );
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    setShowSubmitButton(false);
    if (parseInt(event.target.value) === currentQuestion.correctAnswer) {
      setAttemptedQuestions([
        ...attemptedQuestions,
        {
          question: currentQuestion,
          answerCorrect: true,
          answerChoice:
            currentQuestion.answerChoiceList[parseInt(event.target.value) - 1]
              .choice,
          answerIndex: parseInt(event.target.value),
        },
      ]);
    } else {
      setAttemptedQuestions([
        ...attemptedQuestions,
        {
          question: currentQuestion,
          answerCorrect: false,
          answerChoice:
            currentQuestion.answerChoiceList[parseInt(event.target.value) - 1]
              .choice,
          answerIndex: parseInt(event.target.value),
        },
      ]);
    }

    setAnswerValue(null);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const selectQuestion = (index) => {
    let selectedQuestion = data.find((x) => data.indexOf(x) === index);

    setCurrentQuestion(selectedQuestion);
    if (!!attemptedQuestions.find((ele) => ele.question === selectedQuestion)) {
      setShowSubmitButton(false);
    } else {
      if (!testComplete) {
        setShowSubmitButton(true);
      }
    }
    if (!isDesktop) {
      setOpen(false);
    }
  };

  const handleListItemClick = (event, index) => {
    if (index >= 0 && index < data.length) {
      setSelectedIndex(index);
      selectQuestion(index);
    }
  };

  const finshTestHandler = (handleClose) => {
    if (typeof handleClose === "function") {
      handleClose();
    }

    setTestComplete(true);

    !testComplete &&
      setTimeSpent(
        secondToHms(data.length * state.secondsPerQuestion - counter)
      );
    setShowSubmitButton(false);
    setShowResults((prev) => !prev);
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {openDialog && (
        <TimeDialog finshTestHandler={finshTestHandler} dialogOpen={true} />
      )}

      <AppBar position="fixed" open={open} drawerWidth={drawerWidth}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              STEP2 CK QBank{" "}
              {isDesktop && (
                <sup>{capitalizeFirstLetter(state.courseMode)} Mode</sup>
              )}{" "}
            </Typography>
          </Box>
          {isDesktop && (
            <Box>
              {!testComplete ? (
                <Box
                  sx={{ display: "flex", alignItems: "center", columnGap: 3 }}
                >
                  {counter < 3600 ? (
                    <Typography variant="p" noWrap component="div">
                      Block Time Remaining:{" "}
                      {new Date(counter * 1000).toISOString().substr(14, 8)}{" "}
                    </Typography>
                  ) : (
                    <Typography variant="p" noWrap component="div">
                      Block Time Remaining:{" "}
                      {new Date(counter * 1000).toISOString().substr(11, 8)}{" "}
                    </Typography>
                  )}
                  <Button
                    variant="contained"
                    size="medium"
                    onClick={finshTestHandler}
                  >
                    Finish Test
                  </Button>
                </Box>
              ) : (
                <Box
                  sx={{ display: "flex", alignItems: "center", columnGap: 3 }}
                >
                  {timeSpent < 3600 ? (
                    <Typography variant="p" noWrap component="div">
                      Total Time Spent: {timeSpent}{" "}
                    </Typography>
                  ) : (
                    <Typography variant="p" noWrap component="div">
                      Total Time Spent: {timeSpent}{" "}
                    </Typography>
                  )}
                  <Button
                    variant="contained"
                    size="medium"
                    onClick={finshTestHandler}
                  >
                    See Results
                  </Button>
                </Box>
              )}
            </Box>
          )}
          {!isDesktop && (
            <Box>
              {!testComplete ? (
                <Button
                  variant="contained"
                  size="medium"
                  onClick={finshTestHandler}
                >
                  Finish Test
                </Button>
              ) : (
                <Button
                  variant="contained"
                  size="medium"
                  onClick={finshTestHandler}
                >
                  See Results
                </Button>
              )}
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <AppBar
        position="fixed"
        color="primary"
        sx={{ top: "auto", bottom: 0 }}
        open={open}
        drawerWidth={drawerWidth}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "center" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              sx={{ fontSize: 20 }}
              variant="contained"
              onClick={(event) => handleListItemClick(event, selectedIndex - 1)}
              size="large"
              startIcon={<ChevronLeftIcon fontSize="large" />}
            >
              Prev
            </Button>

            <Button
              variant="contained"
              sx={{ fontSize: 20 }}
              size="large"
              onClick={(event) => handleListItemClick(event, selectedIndex + 1)}
              endIcon={<ChevronRightIcon fontSize="large" />}
            >
              Next
            </Button>
          </Box>
          {!isDesktop && (
            <Box>
              {!testComplete ? (
                <Box
                  sx={{ display: "flex", alignItems: "center", columnGap: 3 }}
                >
                  {counter < 3600 ? (
                    <Typography variant="p" noWrap component="div">
                      {new Date(counter * 1000).toISOString().substr(14, 8)}{" "}
                    </Typography>
                  ) : (
                    <Typography variant="p" noWrap component="div">
                      {new Date(counter * 1000).toISOString().substr(11, 8)}{" "}
                    </Typography>
                  )}
                </Box>
              ) : (
                <Box
                  sx={{ display: "flex", alignItems: "center", columnGap: 3 }}
                >
                  {timeSpent < 3600 ? (
                    <Typography variant="p" noWrap component="div">
                      {timeSpent}{" "}
                    </Typography>
                  ) : (
                    <Typography variant="p" noWrap component="div">
                      {timeSpent}{" "}
                    </Typography>
                  )}
                </Box>
              )}
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <Typography variant="h6" sx={{ fontWeight: "bolder" }}>
            QBANK
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List component="nav" sx={{ fontWeight: "bold" }} aria-label="">
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

      <Main open={open} drawerWidth={drawerWidth} isDesktop={isDesktop}>
        <DrawerHeader />
        {showResults && (
          <ResultDialog
            homepageLink={`/course/${state.course.id}`}
            setShowResults={setShowResults}
            timeSpent={timeSpent}
            correct={
              attemptedQuestions.filter((e) => e.answerCorrect == true).length
            }
            incorrect={
              attemptedQuestions.filter((e) => e.answerCorrect == false).length
            }
            unanswerd={data.length - attemptedQuestions.length}
          />
        )}
        <Card
          sx={{
            mb: 5,
            boxShadow:
              "rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px",
          }}
        >
          <CardContent>
            <Typography
              paragraph
              dangerouslySetInnerHTML={{
                __html: currentQuestion.questionText.replaceAll("&nbsp;", ""),
              }}
            ></Typography>
          </CardContent>
        </Card>
        <Box>
          <form onSubmit={handleSubmit}>
            <div className="answers">
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">
                  Answer Choices
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                  value=" "
                >
                  {currentQuestion.answerChoiceList.map((answer, index) => (
                    <div>
                        {!testComplete && <div>
                            {attemptedQuestions.find(
                          (ele) => ele.question === currentQuestion
                        ) === undefined ? (
                        <FormControlLabel
                          key={index}
                          value={answer.choiceNumber}
                          onChange={handleSubmit}
                          control={<Radio required={true} disabled={false} />}
                          label={stripHtml(answer.choice)}
                        />
                      ) : (
                        <FormControlLabel
                          key={index}
                          value={answer.choiceNumber}
                          onChange={handleSubmit}
                          control={
                            <Radio
                              disabled={true}
                              checked={answer.choice === attemptedQuestions.find(e => e.question === currentQuestion).answerChoice}
                            />
                          }
                          label={stripHtml(answer.choice)}
                        />
                      )}
                      
                        </div>}
                        {testComplete && 
                        <div>
                        {attemptedQuestions.find(
                          (ele) => ele.question === currentQuestion
                        ) !== undefined ? (
                        <FormControlLabel
                          key={index}
                          value={answer.choiceNumber}
                          onChange={handleSubmit}
                          control={<Radio disabled={true} checked={answer.choice === attemptedQuestions.find(e => e.question === currentQuestion).answerChoice} />}
                          label={stripHtml(answer.choice)}
                        />) :
                        <FormControlLabel
                          key={index}
                          value={answer.choiceNumber}
                          onChange={handleSubmit}
                          control={<Radio disabled={true} />}
                          label={stripHtml(answer.choice)}
                        /> 
                      }
                        </div>
                        }
                     
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
            </div>
            {state.courseMode === "study" && showSubmitButton && (
              <Button
                variant="outlined"
                type="submit"
                size="medium"
                sx={{ mt: 4 }}
              >
                Submit
              </Button>
            )}
          </form>
        </Box>
        
        {testComplete && !!attemptedQuestions.find(
              (x) => x.question === currentQuestion
            ) && (
              <Box>
                {attemptedQuestions.find((x) => x.question === currentQuestion)
                  .answerCorrect ? (
                  <Typography mt={3} variant="h6" color={"green"}>
                    Correct <CheckIcon />
                  </Typography>
                ) : (
                  <Typography mt={3} variant="h6" color={"red"}>
                    Incorrect <ClearIcon />
                  </Typography>
                )}
              </Box>
            )}
        {state.courseMode === "test" && testComplete && (
          <Box>
            {testComplete && (
              <Box>
                <Typography mt={3} variant="h6" color={"green"}>
                  Answer:{" "}
                  {
                    currentQuestion.answerChoiceList[
                      parseInt(currentQuestion.correctAnswer) - 1
                    ].choice
                  }
                </Typography>
              </Box>
            )}


            <Card
              sx={{
                mt: 5,
                boxShadow:
                  "rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px",
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{
                    color: theme.palette.text.primary,
                    textAlign: "center",
                    pb: 2,
                  }}
                >
                  Explaination Text
                </Typography>
                <Typography
                  paragraph
                  dangerouslySetInnerHTML={{
                    __html: currentQuestion.explanationText.replaceAll(
                      "&nbsp;",
                      ""
                    ),
                  }}
                ></Typography>
              </CardContent>
            </Card>
          </Box>
        )}
        {state.courseMode === "study" &&
          !!attemptedQuestions.find((ele) => ele.question === currentQuestion) |
            testComplete && (
            <Box>
              {!!attemptedQuestions.find(
                (x) => x.question === currentQuestion
              ) && (
                <Box>
                  {attemptedQuestions.find(
                    (x) => x.question === currentQuestion
                  ).answerCorrect ? (
                    <Typography mt={3} variant="h6" color={"green"}>
                      Correct Answer
                    </Typography>
                  ) : (
                    <Typography mt={3} variant="h6" color={"red"}>
                      Incorrect Answer
                    </Typography>
                  )}
                </Box>
              )}

              <Card
                sx={{
                  mt: 5,
                  boxShadow:
                    "rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px",
                }}
              >
                <CardContent>
                  <Typography
                    paragraph
                    dangerouslySetInnerHTML={{
                      __html: currentQuestion.explanationText,
                    }}
                  ></Typography>
                </CardContent>
              </Card>
            </Box>
          )}
        <Box sx={{ mb: 8 }}></Box>
      </Main>
    </Box>
  );
}
