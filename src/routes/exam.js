import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Grid, Divider } from "@mui/material";
import TextField from "@mui/material/TextField";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Chip from "@mui/material/Chip";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import useResponsive from "../hooks/useResponsive";
import { useTheme } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      key={index}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Box>{children}</Box>
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
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const isDesktop = useResponsive("up", "sm");

  const theme = useTheme();

  // const { id } = useParams();

  const [courseContent, setCourseContent] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [courseMode, setCourseMode] = useState("test");
  const [maxQuestion, setMaxQuestion] = useState(40);
  const [secondsPerQuestion, setSecondsPerQuestion] = useState(60);
  const [subjects, setSubjects] = useState([]);
  const [topics, setTopics] = useState([]);
  const [systems, setSystems] = useState([]);
  const [examButtonLoading, setExamButtonLoading] = useState(false);

  const sumArr = (arr) => {
    return arr.reduce((partialSum, a) => partialSum + a, 0);
  };

 

  useEffect(() => {
    const manageContent = async (subject = []) => {
      let subs = [];
      let systems = [];
  
      // eslint-disable-next-line
      subject.map((sub) => {
        // eslint-disable-next-line
          sub.system.map((sys) => {
              let topics = [];
              sub.topics.map((topic) => {
            return topic.map((t, index) =>
            {
                  return topics.push({
                    id: t.id,
                    system_id: t.system_id,
                    subject_id: t.subject_id,
                    topic: t.topic,
                    topicAttribute: t.topicAttribute,
                    count: 0,
                    questions_length: !!sub.questions_length.find(x => x.topic === t.topic && x.system_id === sys.id) ? sub.questions_length.find(x => x.topic === t.topic && x.system_id === sys.id).count : 0,
                    checked: false,
                  })
            }
            )
    
          });
  
          topics = topics.filter(
              (value, index, self) =>
                index ===
                self.findIndex(
                  (t) => t.id === value.id && t.subject_id === value.subject_id && t.system_id === value.system_id && t.topic === value.topic
                )
          )
  
          let res = topics.filter((t) => {
            return t.system_id === sys.id;
          });
          systems.push({
            id: sys.id,
            subject_id: sub.id,
            system: sys.system,
            active: true,
            topics: res,
            count: 0,
            checked: false,
          });
        });
        subs.push({
          id: sub.id,
          subject: sub.subject,
          systems: systems,
          count: sumArr(sub.questions_length.map((x) => x.count)),
          questions_length: sub.questions_length.map((x) => x.count),
          checked: false,
        });
  
      });
  
      // setSubjects(subs);
  
      let tops = [];
      subs.map((x) => x.systems.map((y) => tops.push(Object.assign(y))));
  
      let result = tops.filter(
        (value, index, self) =>
          index ===
          self.findIndex(
            (t) => t.id === value.id && t.subject_id === value.subject_id
          )
      );
  
      let rs = [];
  
      // eslint-disable-next-line
      result.map((system) => {
        if (rs.findIndex((x) => x.system === system.system) < 0) {
          rs.push(system);
        } else {
          let systemResultObject = result.find((x) => x.system === system.system);
          let systemRsObjectIndex = rs.findIndex(
            (x) => x.system === system.system
          );
          rs[systemRsObjectIndex].topics = [
            ...rs[systemRsObjectIndex].topics,
            ...systemResultObject.topics,
          ];
        }
      });
      // eslint-disable-next-line
      rs.map((system) => {
        system.topics = system.topics.filter(
          (value, index, self) =>
            index === self.findIndex((t) => t.topic === value.topic)
        );
      });
  
      let localTopics = [];
      
      // eslint-disable-next-line
      rs.map((system) => {
        // eslint-disable-next-line
        system.topics.map((topic) => {
          if (
            !!!localTopics.find(
              (t) =>
                t.topicAttribute === topic.topicAttribute &&
                t.system_id === topic.system_id
            )
          ) {
            localTopics.push(topic);
          } else {
            let localTopicIndex = localTopics.findIndex(
              (t) =>
                t.topicAttribute === topic.topicAttribute &&
                t.system_id === topic.system_id
            );
            let t = system.topics.filter(
              (t) =>
                t.topicAttribute === topic.topicAttribute &&
                t.system_id === topic.system_id
            );
            // eslint-disable-next-line
            t.map((tt) => {
              localTopics[localTopicIndex].questions_length +=
                tt.questions_length;
            });
          }
        });
      });
  
      setTopics(localTopics);
      setSystems(rs);
  
      const response = await axios.post("https://pradhumnts.pythonanywhere.com/get-questions-count/", subs.map(x => {
                  return {subject: x.subject, system: systems.map(x => x.system), topic: topics.map(x => x.topicAttribute)}
          }))
          
      // setting the subjects
      let newSubs = subs.map(x => {
          let subject = response.data.subjects.find(y => y.subject === x.subject)
          x.count = subject.count
          return x
      })
  
      setSubjects(newSubs)
    };
    if (!!courseContent.courseName) {
      manageContent(courseContent["sections"][0]["subject"]);
      if(subjects.length <= 0){
        manageContent(courseContent["sections"][0]["subject"]);
      }
    }
    // eslint-disable-next-line
  }, [courseContent]);

  useEffect(() => {
    const get_course_content = async () => {
      try {
        const response = await axios.get("https://pradhumnts.pythonanywhere.com/courses/");
        const data = response.data;
        setCourseContent(data[0]);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    get_course_content();
  }, []);

  const [checked, setChecked] = useState({
    subjects: [],
    system: [],
    topics: [],
  });

  const [value, setValue] = useState(0);

  useEffect(() => { 
    const getQuestionCount = async () => {

      let data = checked.subjects.map(x => {
          return {subject: x, system: systems.map(x => x.system), topic: topics.map(x => x.topicAttribute)}
      })
      
      const res = await axios.post("https://pradhumnts.pythonanywhere.com/get-questions-count/", data)
  
        let sys = [...systems]
        let tops = [...topics]
        let resSystems = []
        let resTopics = []
  
        if(data.length > 0){
          // eslint-disable-next-line
          res.data.systems.map(x => {
            if(resSystems.findIndex(y => y.system === x.system) === -1){
                resSystems.push(x)
            }else{
                let ele = resSystems.findIndex(y => y.system === x.system)
                resSystems[ele].count += x.count
            }
          })
          // eslint-disable-next-line
          res.data.topics.map(x => {
              if(resTopics.findIndex(y => y.topic === x.topicAttribute && y.system_id === x.system_id) === -1){
                  resTopics.push(x)
              }else{
                  let ele = resTopics.findIndex(y => y.topic === x.topicAttribute && y.system_id === x.system_id)
                  resTopics[ele].count += x.count
              }
            })
          let newTop = tops.map(x => {
              let topic = resTopics.find(y => y.topic === x.topicAttribute && y.system_id === x.system_id)
              if(!!topic){
                x.count = topic.count
              }
              return x
          })

          let newSys = sys.map(x => {
              let system = resSystems.find(y => y.system === x.system)
              if(!!system){
                x.count = system.count
              }
              return x
          })
  
          setSystems(newSys)
          setTopics(newTop)     
          
        }else{
          let newTop = tops.map(x => {
            x.count = 0
            return x
        })
  
        let newSys = sys.map(x => {
            x.count = 0
            return x
        })
  
          setSystems(newSys)
          setTopics(newTop) 

        }
  
    }

    getQuestionCount() 
    // eslint-disable-next-line
  }, [checked]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSubjectCheckboxChange = (event, subject) => {
    let subs = [...subjects];

    let subIndex = subs.findIndex((sub) => sub.subject === subject.subject);

    subs[subIndex].checked = event.target.checked;

    setSubjects(subs);

    if (event.target.checked) {
      setChecked({
        subjects: [...checked.subjects, event.target.value],
        system: [...checked.system],
        topics: [...checked.topics],
      });
    } else if (event.target.checked === false) {
      setChecked({
        subjects: checked.subjects.filter(
          (item) => item !== event.target.value
        ),
        system: [...checked.system],
        topics: [...checked.topics],
      });
    }

  };

  const handleSystemCheckboxChange = (event) => {
    let selectedSystem = "";

    let tops = [...systems];

    let system = tops.find((t) => t.system === event.target.value);

    let sysIndex = tops.findIndex((s) => s.system === system.system);
    tops[sysIndex].checked = event.target.checked;

    let ts = system.topics.map((topic, index) => {
      topic.checked = event.target.checked;
      return topic;
    });

    tops[sysIndex].topics = ts;
    setSystems(tops);

    // eslint-disable-next-line
    subjects.map((y) => {
      if (systems.find((z) => z.system === event.target.value)) {
        let tops = systems.find((z) => z.system === event.target.value);
        selectedSystem = tops.topics.map((x) => x.topicAttribute);
      }
    });

    if (event.target.checked) {
      setChecked({
        subjects: [...checked.subjects],
        system: [...checked.system, event.target.value],
        topics: [...checked.topics, ...selectedSystem],
      });
    } else if (event.target.checked === false) {
      setChecked({
        subjects: [...checked.subjects],
        system: checked.system.filter((item) => item !== event.target.value),
        topics: [...checked.topics],
      });
    }
  };

  const handleTopicCheckboxChange = (topic, event, sys) => {

    let tops = [...systems];

    let system = tops.find((t) => t.id === topic.system_id);

    let ts = system.topics.map((topic) => {
      if (topic.topicAttribute === event.target.value) {
        topic.checked = event.target.checked;
        return topic;
      }
      return topic;
    });

    let sysIndex = tops.findIndex((s) => s.system === system.system);
    tops[sysIndex].topics = ts;

    setSystems(tops);

    if (event.target.checked) {
      setChecked({
        subjects: [...checked.subjects],
        system: [...checked.system, sys.system],
        topics: [...checked.topics, event.target.value],
      });
    } else if (event.target.checked === false) {
      setChecked({
        subjects: [...checked.subjects],
        system: [...checked.system],
        topics: checked.topics.filter((item) => item !== event.target.value),
      });
    }
  };

  const submitHandler = async () => {
    setExamButtonLoading(true)
    axios
    .post("https://pradhumnts.pythonanywhere.com/courses/", checked)
    .then(function (response) {
        setExamButtonLoading(false)
        navigate("/course/1/qbank", {
          state: {
            course: courseContent,
            data: response.data.slice(0, maxQuestion),
            courseMode: courseMode,
            maxQuestions: maxQuestion,
            secondsPerQuestion: secondsPerQuestion,
          },
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const courseModeHandler = (event) => {
    setCourseMode(event.target.value);
  };

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

  const maxQuestionsHandler = (event) => {
    if (event.target.value < 0) {
      event.target.value = 0;
    } else if (event.target.value > 40) {
      event.target.value = 40;
    }
    setMaxQuestion(event.target.value);
  };

  const secondsPerQuestionHandler = (event) => {
    if (event.target.value < 0) {
      event.target.value = 0;
    } else if (event.target.value > 360) {
      event.target.value = 360;
    }
    setSecondsPerQuestion(event.target.value);
  };

  const handleSubjectsSelect = (event) => {
    
    if (event.target.checked){
      let subs = subjects.map(subject => {
        subject.checked = true;
        return subject
      })

      setSubjects(subs)

      setChecked({
        subjects: [...subjects.map(x => x.subject)],
        system: [...checked.system],
        topics: [...checked.topics],
      });

    }else if(!event.target.checked){
      let subs = subjects.map(subject => {
        subject.checked = false;
        return subject
      })

      setSubjects(subs)
      setChecked({
        subjects: [],
        system: [...checked.system],
        topics: [...checked.topics],
      });
    }

  }

  const handleSystemsSelect = (event) => {
    if (event.target.checked){
      let subs = systems.map(system => {
        system.checked = true;
        return system
      })

      setSystems(subs)

      let tops = topics.map(topic => {
        topic.checked = true;
        return topic
      })

      setTopics(tops)

      setChecked({
        subjects: [...checked.subjects],
        system: [...systems.map(x => x.system)],
        topics: [...topics.map(x => x.topic)],
      });

    }else if(!event.target.checked){
      let subs = systems.map(system => {
        system.checked = false;
        return system
      })

      setSystems(subs)
      setChecked({
        subjects: [...checked.subjects],
        system: [],
        topics: [],
      });

      let tops = topics.map(topic => {
        topic.checked = false;
        return topic
      })
      setTopics(tops)
    }
  }

  return (
    <Box>
      <NavBar />
      <Box
        sx={{
          p: isDesktop ? 5 : 2,
          minHeight: "100vh",
          height: "100%",
          backgroundColor: "rgba(25, 118, 210, 0.08)",
        }}
      >
        <Card
          sx={{
            mb: 3,
            boxShadow:
              "rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px",
          }}
        >
          <CardContent>
            <Typography variant="h4" sx={{ py: 1, fontWeight: 700 }}>
              {courseContent.courseName}
            </Typography>
            <Typography paragraph mb={0}>
              {courseContent.description}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                defaultValue="test"
                onChange={courseModeHandler}
              >
                <FormControlLabel
                  value="test"
                  control={<Radio />}
                  label="Test Mode"
                />
                <FormControlLabel
                  value="study"
                  control={<Radio />}
                  label="Study Mode"
                />
              </RadioGroup>
            </FormControl>
          </CardContent>
        </Card>

        <Box
          sx={{
            width: "100%",
            backgroundColor: "white",
            p: isDesktop ? 1 : 0,
            borderRadius: 2,
            boxShadow:
              "rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="subjects tabs"
          >
            {courseContent.sections.map((section, index) => (
              <Tab key={index} label={section.section} {...a11yProps(index)} />
            ))}
          </Tabs>
          {courseContent.sections.map((section, index) => (
            <TabPanel key={index} value={value} index={index}>
              <Checkbox onChange={handleSubjectsSelect}/>
              <Typography sx={{ fontWeight: "bold" }} variant="p">
                Subjects
              </Typography>

              <Grid my={2} container px={isDesktop ? 5 : 0}>
                {subjects.map((subject, index) => (
                  <Grid key={index} item xs={12} md={12} lg={6}>
                    <FormControlLabel
                      label={subject.subject}
                      sx={{ color: "black" }}
                      control={
                        <Checkbox
                          checked={subject.checked}
                          value={subject.subject}
                          onChange={(event) =>
                            handleSubjectCheckboxChange(event, subject)
                          }
                        />
                      }
                    />
                   
                    <Chip
                      label={subject.count}
                      color="primary"
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                ))}
              </Grid>
              <Checkbox onChange={handleSystemsSelect}/>
              <Typography sx={{ fontWeight: "bold" }} variant="p">
                System
              </Typography>

              <Grid container my={1} px={isDesktop ? 5 : 0}>
                {systems.map((system, index) => (
                  <Grid key={index} item xs={12} md={12} lg={6}>
                    <Accordion sx={{ boxShadow: "none", my: 0 }}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <FormControlLabel
                            disabled={system.count <= 0 ? true : false}
                            label={system.system}
                            control={
                              <Checkbox
                                checked={system.checked}
                                value={system.system}
                                onChange={handleSystemCheckboxChange}
                              />
                            }
                          />
                          <Chip
                            label={system.count}
                            color="primary"
                            variant="outlined"
                            size="small"
                          />
                        </Box>
                      </AccordionSummary>
                      <AccordionDetails>
                        {topics
                          .filter((sys) => sys.system_id === system.id)
                          .map((topic, index) => (
                            <Box
                              key={index}
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                px: 1,
                              }}
                            >
                              <FormControlLabel
                                disabled={topic.count <= 0}
                                label={topic.topicAttribute}
                                control={
                                  <Checkbox
                                    value={topic.topicAttribute}
                                    checked={topic.checked}
                                    onChange={(event) =>
                                      handleTopicCheckboxChange(topic, event, system)
                                    }
                                  />
                                }
                              />
                              <Chip
                                label={topic.count}
                                color="primary"
                                variant="outlined"
                                size="small"
                              />
                            </Box>
                          ))}
                      </AccordionDetails>
                    </Accordion>
                  </Grid>
                ))}
              </Grid>

              <Typography sx={{ fontWeight: "bold" }} variant="p">
                Settings
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  columnGap: 3,
                  flexDirection: isDesktop ? "row" : "column",
                }}
              >
                <Box
                  my={2}
                  sx={{ display: "flex", alignItems: "center", columnGap: 2 }}
                >
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
                <Box
                  my={2}
                  sx={{ display: "flex", alignItems: "center", columnGap: 2 }}
                >
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
              <LoadingButton
                loading={examButtonLoading}
                sx={{ mt: 3 }}
                variant="contained"
                disabled={checked.subjects.length < 1 || checked.topics.length < 1}
                onClick={submitHandler}
              >
                Generate Test
              </LoadingButton>
            </TabPanel>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
