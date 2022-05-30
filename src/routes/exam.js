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
import { useParams, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
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

  const { id } = useParams();
  const [courseContent, setCourseContent] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [courseMode, setCourseMode] = useState("test");
  const [maxQuestion, setMaxQuestion] = useState(40);
  const [secondsPerQuestion, setSecondsPerQuestion] = useState(60);
  const [subjects, setSubjects] = useState([]);
  const [topics, setTopics] = useState([]);
  const [systems, setSystems] = useState([]);

  const sumArr = (arr) => {
    return arr.reduce((partialSum, a) => partialSum + a, 0);
  };

  const manageContent = (subject = []) => {
    let subs = [];
    let systems = [];
    
    subject.map((sub) => {
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
          );
        });

        topics = topics.filter(
            (value, index, self) =>
              index ===
              self.findIndex(
                (t) => t.id === value.id && t.subject_id === value.subject_id && t.system_id === value.system_id && t.topic === value.topic
              )
        )

        console.log(topics)

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

    setSubjects(subs);

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

    rs.map((system) => {
      system.topics = system.topics.filter(
        (value, index, self) =>
          index === self.findIndex((t) => t.topic === value.topic)
      );
    });

    let localTopics = [];
    rs.map((system) => {
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
          t.map((tt) => {
            localTopics[localTopicIndex].questions_length +=
              tt.questions_length;
          });
        }
      });
    });

    setTopics(localTopics);
    setSystems(rs);
    console.log(localTopics)
  };

  const updateCount = (subject, event) => {
    let co = [];
    let subs = [...subjects];

    let subIndex = subs.findIndex((s) => s.subject === subject.subject);
    subs[subIndex].checked = true;

    setSubjects(subs);

    let localSystems = systems.filter((x) => x.subject_id === subject.id);

    if (localSystems.length > 0) {
      localSystems.map((x) =>
        topics.map((y) => {
          if (y.subject_id === subject.id && y.system_id === x.id) {
            co.push({
              topic: y.topic,
              count: y.questions_length,
              system: x.system,
            });
          }
        })
      );
        
      let sys = [...systems];

      let result = [];

      localSystems.map((system) => {
        result = sys.map((s) => {
          if (s.system === system.system && s.subject_id === subject.id) {
            if (event.target.checked) {
              s.count = sumArr(
                co.filter((t) => t.system === s.system).map((x) => x.count)
              );

              let tempTopics = [];

              let tops = topics.filter((t) => t.system_id === s.id);

              tops.map((topic) => {
                topic.count = topic.questions_length;
                tempTopics.push(topic);
              });

            } else {
              s.count -= sumArr(
                co.filter((t) => t.system === s.system).map((x) => x.count)
              );
            }
            return s;
          }
          return s;
        });
      });
      console.log(result)
      setSystems(result);
    }
  };

  useEffect(() => {
    const get_course_content = async () => {
      try {
        const response = await axios.get("https://pradhumnts.pythonanywhere.com/courses/");
        const data = response.data;
        setCourseContent(data[0]);
        setLoading(false);
        console.log(response.data);
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
    if (!!courseContent.courseName) {
      manageContent(courseContent["sections"][0]["subject"]);
    }
  }, [courseContent]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSubjectCheckboxChange = (event, subject) => {
    let subs = [...subjects];

    let subIndex = subs.findIndex((sub) => sub.subject === subject.subject);

    subs[subIndex].checked = event.target.checked;

    setSubjects(subs);

    updateCount(subject, event);

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

  const handleTopicCheckboxChange = (topic, event) => {
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
        system: [...checked.system],
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

  let content = {
    id: 1,
    courseName: "UWorld USMLE",
    description:
      "Save Soil is a global movement launched by Sadhguru, to address the soil crisis by bringing together people from around the world to stand up for Soil Health, and supporting leaders of all nations to",
    sections: [
      {
        id: 1,
        section: "Shelf Review",
        subject: [
          {
            id: 1,
            subject: "Ambulatory Medicine",
            system: [
              {
                id: 1,
                system: "Biostatistics & Epidemiology",
                questions_length: 12,
                created_at: "2022-05-03T01:32:48.093802Z",
              },
              {
                id: 3,
                system: "Cardiovascular System",
                questions_length: 26,
                created_at: "2022-05-07T11:19:20.492592Z",
              },
            ],
            questions_length: 32,
            topics: [
              [
                {
                  id: 11,
                  topic: "Common variable immunodeficiency",
                  topicAttribute: "Immune deficiencies",
                  system_id: 1,
                  subject_id: 1,
                  created_at: "2022-05-03T01:30:57.437690Z",
                  updated_at: "2022-05-26T10:40:19.858629Z",
                },
                {
                  id: 13,
                  topic: "Myocardial infarction",
                  topicAttribute: "Coronary heart disease",
                  system_id: 1,
                  subject_id: 1,
                  created_at: "2022-05-07T11:06:41.072258Z",
                  updated_at: "2022-05-26T10:40:11.024379Z",
                },
                {
                  id: 17,
                  topic: "Heart block",
                  topicAttribute: "Cardiac arrhythmias and syncope",
                  system_id: 1,
                  subject_id: 1,
                  created_at: "2022-05-07T11:06:41.085311Z",
                  updated_at: "2022-05-26T10:39:48.935514Z",
                },
                {
                  id: 18,
                  topic: "Atrial fibrillation",
                  topicAttribute: "Cardiac arrhythmias and syncope",
                  system_id: 1,
                  subject_id: 1,
                  created_at: "2022-05-07T11:06:41.086472Z",
                  updated_at: "2022-05-26T10:39:45.202396Z",
                },
                {
                  id: 21,
                  topic: "Coronary artery disease",
                  topicAttribute: "Coronary heart disease",
                  system_id: 1,
                  subject_id: 1,
                  created_at: "2022-05-07T11:06:41.092618Z",
                  updated_at: "2022-05-26T10:39:25.430120Z",
                },
                {
                  id: 22,
                  topic: "Dilated cardiomyopathy",
                  topicAttribute: "Myopericardial diseases",
                  system_id: 1,
                  subject_id: 1,
                  created_at: "2022-05-07T11:06:41.094620Z",
                  updated_at: "2022-05-26T10:39:21.590972Z",
                },
                {
                  id: 23,
                  topic: "Polycystic kidney disease",
                  topicAttribute: "Hypertension",
                  system_id: 1,
                  subject_id: 1,
                  created_at: "2022-05-07T11:06:41.114832Z",
                  updated_at: "2022-05-26T10:39:17.437486Z",
                },
                {
                  id: 24,
                  topic: "Aortic coarctation",
                  topicAttribute: "Congenital heart disease",
                  system_id: 1,
                  subject_id: 1,
                  created_at: "2022-05-07T11:06:41.116955Z",
                  updated_at: "2022-05-26T10:39:14.344170Z",
                },
                {
                  id: 25,
                  topic: "Cardiac tamponade",
                  topicAttribute: "Myopericardial diseases",
                  system_id: 1,
                  subject_id: 1,
                  created_at: "2022-05-07T11:06:41.172335Z",
                  updated_at: "2022-05-26T10:39:10.942346Z",
                },
              ],
              [
                {
                  id: 12,
                  topic: "Hypothesis testing",
                  topicAttribute: "Study design and interpretation",
                  system_id: 3,
                  subject_id: 1,
                  created_at: "2022-05-03T01:30:57.438696Z",
                  updated_at: "2022-05-26T10:40:16.051332Z",
                },
                {
                  id: 15,
                  topic: "Atrial flutter",
                  topicAttribute: "Cardiac arrhythmias and syncope",
                  system_id: 3,
                  subject_id: 1,
                  created_at: "2022-05-07T11:06:41.079386Z",
                  updated_at: "2022-05-26T10:40:01.609137Z",
                },
                {
                  id: 19,
                  topic: "Aortic aneurysm",
                  topicAttribute: "Aortic and peripheral artery diseases",
                  system_id: 3,
                  subject_id: 1,
                  created_at: "2022-05-07T11:06:41.088511Z",
                  updated_at: "2022-05-26T10:39:41.199052Z",
                },
                {
                  id: 20,
                  topic: "Primary hypertension",
                  topicAttribute: "Hypertension",
                  system_id: 3,
                  subject_id: 1,
                  created_at: "2022-05-07T11:06:41.091609Z",
                  updated_at: "2022-05-26T10:39:29.499621Z",
                },
              ],
            ],
            created_at: "2022-05-03T01:32:02.466541Z",
          },
          {
            id: 2,
            subject: "Family Medicine",
            system: [
              {
                id: 2,
                system: "Allergy & Immunology",
                questions_length: 2,
                created_at: "2022-05-03T01:32:48.104647Z",
              },
              {
                id: 3,
                system: "Cardiovascular System",
                questions_length: 26,
                created_at: "2022-05-07T11:19:20.492592Z",
              },
            ],
            questions_length: 5,
            topics: [
              [
                {
                  id: 7,
                  topic: "Sensitivity, specificity, NPV, PPV",
                  topicAttribute: "Probability and principles of testing",
                  system_id: 2,
                  subject_id: 2,
                  created_at: "2022-05-03T01:30:57.432831Z",
                  updated_at: "2022-05-26T10:40:40.842195Z",
                },
              ],
              [
                {
                  id: 6,
                  topic: "Accuracy and precision",
                  topicAttribute: "Measures and distribution of data",
                  system_id: 3,
                  subject_id: 2,
                  created_at: "2022-05-03T01:30:57.431911Z",
                  updated_at: "2022-05-26T10:40:44.683971Z",
                },
                {
                  id: 10,
                  topic: "Risk",
                  topicAttribute: "Epidemiology and population health",
                  system_id: 3,
                  subject_id: 2,
                  created_at: "2022-05-03T01:30:57.436697Z",
                  updated_at: "2022-05-26T10:40:26.056123Z",
                },
              ],
            ],
            created_at: "2022-05-03T01:32:02.475840Z",
          },
          {
            id: 3,
            subject: "Medicine",
            system: [
              {
                id: 2,
                system: "Allergy & Immunology",
                questions_length: 2,
                created_at: "2022-05-03T01:32:48.104647Z",
              },
              {
                id: 3,
                system: "Cardiovascular System",
                questions_length: 26,
                created_at: "2022-05-07T11:19:20.492592Z",
              },
            ],
            questions_length: 2,
            topics: [
              [],
              [
                {
                  id: 3,
                  topic: "Bias",
                  topicAttribute: "Study design and interpretation",
                  system_id: 3,
                  subject_id: 3,
                  created_at: "2022-05-03T01:30:57.427733Z",
                  updated_at: "2022-05-26T10:41:03.152186Z",
                },
                {
                  id: 4,
                  topic: "Confounding, effect modification, bias, errors",
                  topicAttribute: "Study design and interpretation",
                  system_id: 3,
                  subject_id: 3,
                  created_at: "2022-05-03T01:30:57.430046Z",
                  updated_at: "2022-05-26T10:40:59.083672Z",
                },
              ],
            ],
            created_at: "2022-05-03T01:32:02.483091Z",
          },
          {
            id: 4,
            subject: "Surgery",
            system: [
              {
                id: 3,
                system: "Cardiovascular System",
                questions_length: 26,
                created_at: "2022-05-07T11:19:20.492592Z",
              },
            ],
            questions_length: 1,
            topics: [
              [
                {
                  id: 1,
                  topic: "Odds ratio",
                  topicAttribute: "Study design and interpretation",
                  system_id: 3,
                  subject_id: 4,
                  created_at: "2022-05-03T01:30:57.422727Z",
                  updated_at: "2022-05-26T10:41:12.855614Z",
                },
              ],
            ],
            created_at: "2022-05-07T11:26:26.354438Z",
          },
        ],
        questions_length: 40,
        created_at: "2022-05-03T01:32:28.509881Z",
      },
    ],
    created_at: "2022-05-03T03:19:35.859112Z",
    updated_at: "2022-05-03T03:19:35.859144Z",
  };

  const submitHandler = async () => {
    axios
      .post("https://pradhumnts.pythonanywhere.com/courses/", checked)
      .then(function (response) {
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
          {content.sections.map((section, index) => (
            <TabPanel key={index} value={value} index={index}>
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
                                      handleTopicCheckboxChange(topic, event)
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
              <Button
                sx={{ mt: 3 }}
                variant="contained"
                disabled={checked.topics.length < 1}
                onClick={submitHandler}
              >
                Generate Test
              </Button>
            </TabPanel>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
