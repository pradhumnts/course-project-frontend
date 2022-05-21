import React, {useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Grid, Divider } from '@mui/material'
import TextField from '@mui/material/TextField';
import NavBar from '../components/NavBar'
import { useParams, useNavigate } from 'react-router-dom'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Chip from '@mui/material/Chip';
import axios from 'axios'
import ClipLoader from "react-spinners/ClipLoader";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import useResponsive from '../hooks/useResponsive';
import { useTheme } from '@mui/material'

function TabPanel(props) {

  const { children, value, index, ...other } = props;
 
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const isDesktop = useResponsive('up', 'sm');

  const theme = useTheme()

  const { id } = useParams()
  const [courseContent, setCourseContent] = useState({})
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate();
  const [courseMode, setCourseMode] = useState("test")
  const [maxQuestion, setMaxQuestion] = useState(40)
  const [secondsPerQuestion, setSecondsPerQuestion] = useState(60)

  useEffect(() => {
    const get_course_content = async () => {
      try{
        const response = await axios.get("https://pradhumnts.pythonanywhere.com/courses/")
        const data = response.data
  
        setCourseContent(data[0])
        setLoading(false)

      }catch(err){
        console.log(err)
      }
    }
    get_course_content()
  }, [])

  const [value, setValue] = useState(0);

  const [checked, setChecked] = useState({
    subjects: [],
    system: [],
    topics: []
  })

  useEffect(() => {
    // console.log(checked)
  }, [checked])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  const handleSubjectCheckboxChange = (event) => {
    if (event.target.checked) {
      setChecked({
        subjects: [...checked.subjects, event.target.value],
        system: [...checked.system],
        topics: [...checked.topics]
      })
    }else if(event.target.checked === false){
      setChecked({
        subjects: checked.subjects.filter(item => item !== event.target.value),
        system: [...checked.system],
        topics: [...checked.topics]
      })
    }
  }

  const handleSystemCheckboxChange = (event) => {
    let selectedSystem = ""

    courseContent.sections.map(x => 
      x.subject.map(y => {
      if(y.system.find(z => z.system === event.target.value)){
        let topics = y.system.find(z => z.system === event.target.value)
        selectedSystem = topics.topic.map(x => x.topicAttribute)
      }
    }))

    if (event.target.checked) {
      setChecked({
        subjects: [...checked.subjects],
        system: [...checked.system, event.target.value],
        topics: [...checked.topics, ...selectedSystem]
      })
    }else if(event.target.checked === false){
      setChecked({
        subjects: [...checked.subjects],
        system: checked.system.filter(item => item !== event.target.value),
        topics: [...checked.topics]
      })
    }
   
  }

  const handleTopicCheckboxChange = (event) => {

    if (event.target.checked) {
      setChecked({
        subjects: [...checked.subjects],
        system: [...checked.system],
        topics: [...checked.topics, event.target.value]
      });
    }else if(event.target.checked === false){
      setChecked({
        subjects: [...checked.subjects],
        system: [...checked.system],
        topics: checked.topics.filter(item => item !== event.target.value)
      })
    }
    console.log(checked)
  }

  const submitHandler = async () => {

    axios.post('https://pradhumnts.pythonanywhere.com/courses/', checked)
    .then(function (response) {
      console.log(response)
      navigate("/course/1/qbank", { state: {
        course: courseContent,
        data: response.data,
        courseMode: courseMode,
        maxQuestions: maxQuestion,
        secondsPerQuestion: secondsPerQuestion
      } })
    })
    .catch(function (error) {
      console.log(error)
    })
  }

  const courseModeHandler = (event) => {
    setCourseMode(event.target.value)
  }
  if (loading){
    return (
      <Box sx={{ height: "100vh", display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <ClipLoader size={50} css={{ display: 'block', margin: "auto" }} color={theme.palette.primary.main} speedMultiplier={1.5} />
      </Box>
    )
  }

  const maxQuestionsHandler = (event) => {
    if(event.target.value < 0){
      event.target.value = 0
    }else if (event.target.value > 40){
      event.target.value = 40
    }
    setMaxQuestion(event.target.value)
  }
  
  const secondsPerQuestionHandler = (event) => {
    if(event.target.value < 0){
      event.target.value = 0
    }else if (event.target.value > 360){
      event.target.value = 360
    }
    setSecondsPerQuestion(event.target.value)
  }


  return (
    <Box>
      <NavBar />
      <Box sx={{ p: isDesktop ? 5 : 2, minHeight: "100vh", height: "100%", backgroundColor: "rgba(25, 118, 210, 0.08)", }}>
        <Card sx={{ mb: 3, boxShadow: "rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px" }}>
          <CardContent>
            <Typography variant="h4" sx={{ py:1, fontWeight: 700 }}>{courseContent.courseName}</Typography>
            <Typography paragraph mb={0}>{courseContent.description}</Typography>
            <Divider sx={{ my:2 }} />
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                defaultValue="test"
                onChange={courseModeHandler}
              >
                <FormControlLabel value="test" control={<Radio />} label="Test Mode" />
                <FormControlLabel value="study" control={<Radio />} label="Study Mode" />
              </RadioGroup>
            </FormControl>
          </CardContent>
        </Card>
     
        <Box sx={{ width: '100%', backgroundColor: "white", p: isDesktop ? 1 : 0, borderRadius: 2, boxShadow: "rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px" }}>
          <Tabs value={value} onChange={handleChange} aria-label="subjects tabs">
            {courseContent.sections.map((section, index) =>
              <Tab key={index} label={section.section} {...a11yProps(index)} />
            )}
          </Tabs>
          {courseContent.sections.map((section, index) =>
            <TabPanel key={index} value={value} index={index}>
              <Typography sx={{ fontWeight: 'bold' }} variant="p">Subjects</Typography>
  
              <Grid my={2} container px={isDesktop ? 5 : 0}>
                {section.subject.map((subject, index) =>
                  <Grid key={index} item xs={12} md={12} lg={6}>
                    <FormControlLabel
                      disabled={subject.questions_length < 1 ? true : false}
                      label={subject.subject}
                      sx={{ color: "black" }}
                      control={<Checkbox value={subject.subject} onChange={handleSubjectCheckboxChange} />}
                    />
                    <Chip label={subject.questions_length} color="primary" variant="outlined" size="small" />
                  </Grid>
                )}
              </Grid>
              <Typography sx={{ fontWeight: 'bold' }} variant="p">System</Typography>
                
              <Grid container my={1} px={isDesktop ? 5 : 0}>
              {section.subject.map((subject, index) => subject.system.map((system, index) => 
                  <Grid key={index} item xs={12} md={12} lg={6}>
                     <Accordion sx={{ boxShadow: "none", my:0 }}>
                      <AccordionSummary
                      
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                      <Box sx={{ display: "flex", alignItems: "center", justifyContent: 'space-between' }}>
                      <FormControlLabel
                        disabled={system.questions_length < 1 ? true : false || !checked.subjects.includes(subject.subject)}
                        label={system.system}
                        control={<Checkbox value={system.system} onChange={handleSystemCheckboxChange} />}
                      />
                      <Chip label={system.questions_length} color="primary" variant="outlined" size="small" />
                      </Box>
                      </AccordionSummary>
                      <AccordionDetails>
                        {system.topic.map((topic, index) =>
                            <Box key={index} sx={{ display: "flex", alignItems: "center", px: 1 }}>
                              <FormControlLabel
                                disabled={topic.questions_length < 1 || !checked.subjects.includes(subject.subject) ? true : false}
                                label={topic.topicAttribute}
                                control={<Checkbox value={topic.topicAttribute} checked={checked.topics.includes(topic.topicAttribute)} onChange={handleTopicCheckboxChange} />}
                              />
                             
                            <Chip label={topic.questions_length} color="primary" variant="outlined" size="small" />
                            </Box>
                            
                        )}
                      </AccordionDetails>
                    </Accordion>
                  </Grid>
              ))}
              
              </Grid>

              <Typography sx={{ fontWeight: 'bold' }} variant="p">Settings</Typography>
              <Box sx={{ display: "flex", columnGap:3, flexDirection: isDesktop ? "row" : "column" }}>
              <Box my={2} sx={{ display: 'flex', alignItems: 'center', columnGap: 2 }}>
                <TextField
                  id="filled-basic"
                  variant="filled"
                  label="Number Of Questions"
                  type="number"
                  defaultValue={40}
                  required={true}
                  onChange={(event) => maxQuestionsHandler(event)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <Typography variant="span">(Max: 40 questions)</Typography>
              </Box>
              <Box my={2} sx={{ display: 'flex', alignItems: 'center', columnGap: 2 }}>
                <TextField
                  id="filled-basic"
                  variant="filled"
                  label="Seconds Per Questions"
                  type="number"
                  defaultValue={60}
                  required={true}
                  onChange={(event) => secondsPerQuestionHandler(event)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <Typography variant="span">(Max: 360 seconds)</Typography>
              </Box>
              </Box>
              <Button sx={{ mt:3 }} variant="contained" disabled={checked.topics.length < 1} onClick={submitHandler}>Generate Test</Button>
            </TabPanel>
          )}

        </Box>
      </Box>
    </Box>
  );
}