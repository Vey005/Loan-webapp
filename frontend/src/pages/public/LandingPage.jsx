import { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";

const highlights = [
  {
    icon: ShieldOutlinedIcon,
    title: "Secure document handling",
    description: "Your uploads are transmitted over encrypted connections and reviewed by authorized staff only.",
  },
  {
    icon: ScheduleOutlinedIcon,
    title: "Clear decision timeline",
    description: "Most complete applications receive an update within one to two business days.",
  },
  {
    icon: NotificationsActiveOutlinedIcon,
    title: "Status updates you can track",
    description: "Use your contact details and national ID to check progress at any time.",
  },
];

const processSteps = [
  {
    title: "Complete the application",
    description: "Share your contact details, employment information, and requested loan amount.",
  },
  {
    title: "Upload verification documents",
    description: "Provide a government ID and a current selfie so we can verify identity accurately.",
  },
  {
    title: "Internal review",
    description: "Our lending team reviews affordability, risk, and document completeness.",
  },
  {
    title: "Decision and next steps",
    description: "You will receive a decision and follow-up instructions through your registered contact channel.",
  },
];

const checklist = [
  "Valid national ID number",
  "Recent selfie photo",
  "Current phone number and email address",
  "Employment status and monthly income details",
];

const requirements = [
  "Full legal name and date of birth",
  "Current residential address",
  "Employment status and monthly income",
  "Requested loan amount",
  "National ID document (JPG, PNG, or PDF up to 5MB)",
  "Selfie image (JPG or PNG up to 5MB)",
];

const faqItems = [
  {
    question: "How long does the review usually take?",
    answer: "If all required details are provided correctly, most applications are updated within one to two business days.",
  },
  {
    question: "Do I pay to submit an application?",
    answer: "No. There is no application fee for submitting your request through this portal.",
  },
  {
    question: "Can I track my application after submitting?",
    answer: "Yes. Use the same phone number or email plus your national ID number on the status page.",
  },
  {
    question: "What happens if information is missing?",
    answer: "The review team may contact you for clarification or additional documents before a final decision.",
  },
  {
    question: "How is my personal data protected?",
    answer: "Data is handled through secure channels and reviewed only for loan-processing purposes.",
  },
];

const humanImages = {
  hero: "https://images.pexels.com/photos/36392326/pexels-photo-36392326.jpeg?auto=compress&cs=tinysrgb&w=1200",
  consultation: "https://images.pexels.com/photos/4730795/pexels-photo-4730795.jpeg?auto=compress&cs=tinysrgb&w=1200",
};

function LandingPage() {
  const [expandedFaq, setExpandedFaq] = useState(false);

  const handleFaqChange = (panel) => (event, isExpanded) => {
    setExpandedFaq(isExpanded ? panel : false);
  };

  return (
    <Stack spacing={{ xs: 5, md: 7 }}>
      <Paper
        elevation={0}
        className="section-reveal"
        sx={{
          p: { xs: 3, md: 5 },
          border: "1px solid",
          borderColor: "divider",
          background: "linear-gradient(145deg, rgba(21,78,117,0.09), rgba(255,255,255,0.9) 48%)",
        }}
      >
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={7}>
            <Typography
              variant="overline"
              sx={{
                letterSpacing: 1.1,
                color: "primary.dark",
                fontWeight: 700,
                display: "inline-block",
                mb: 1,
              }}
            >
              Easy Loans Portal
            </Typography>
            <Typography variant="h2" sx={{ mb: 2 }}>
              Personal loans with clear terms and real people reviewing every application.
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 620, lineHeight: 1.75, mb: 3 }}>
              Submit your request in one secure form, upload your documents, and follow each stage from submission to
              final decision.
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Button component={RouterLink} to="/apply" variant="contained" size="large">
                Start application
              </Button>
              <Button component={RouterLink} to="/status" variant="outlined" size="large">
                Track existing application
              </Button>
            </Stack>
          </Grid>

          <Grid item xs={12} md={5}>
            <Stack spacing={2}>
              <Box
                component="img"
                src={humanImages.hero}
                alt="Ghanaian market women selling corn in Accra"
                loading="lazy"
                sx={{
                  width: "100%",
                  height: { xs: 220, md: 260 },
                  objectFit: "cover",
                  borderRadius: 3,
                  border: "1px solid",
                  borderColor: "divider",
                }}
              />
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  border: "1px solid",
                  borderColor: "divider",
                  backgroundColor: "rgba(255, 255, 255, 0.82)",
                }}
              >
                <Typography variant="h6" sx={{ mb: 1.5 }}>
                  Before you apply
                </Typography>
                <Stack component="ul" spacing={1.2} sx={{ m: 0, pl: 2.5 }}>
                  {checklist.map((item) => (
                    <Typography component="li" key={item} sx={{ color: "text.secondary", lineHeight: 1.65 }}>
                      {item}
                    </Typography>
                  ))}
                </Stack>
              </Paper>
            </Stack>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={2} className="section-reveal">
        {highlights.map((item) => {
          const Icon = item.icon;

          return (
            <Grid item xs={12} md={4} key={item.title}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  border: "1px solid",
                  borderColor: "divider",
                  height: "100%",
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                }}
              >
                <Stack spacing={1.5}>
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      display: "grid",
                      placeItems: "center",
                      backgroundColor: "primary.light",
                      color: "primary.main",
                    }}
                  >
                    <Icon fontSize="small" />
                  </Box>
                  <Typography variant="h6">{item.title}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                    {item.description}
                  </Typography>
                </Stack>
              </Paper>
            </Grid>
          );
        })}
      </Grid>

      <Paper
        elevation={0}
        className="section-reveal"
        sx={{ p: { xs: 2.5, md: 3 }, border: "1px solid", borderColor: "divider", backgroundColor: "#ffffffc2" }}
      >
        <Grid container spacing={2.5} alignItems="center">
          <Grid item xs={12} md={5}>
            <Box
              component="img"
              src={humanImages.consultation}
              alt="Smiling Ghanaian woman in traditional attire in Accra"
              loading="lazy"
              sx={{
                width: "100%",
                height: { xs: 210, md: 250 },
                objectFit: "cover",
                borderRadius: 2.5,
              }}
            />
          </Grid>
          <Grid item xs={12} md={7}>
            <Typography variant="h5" sx={{ mb: 1 }}>
              A people-first review process
            </Typography>
            <Typography color="text.secondary" sx={{ lineHeight: 1.75 }}>
              Every completed application is reviewed by a lending team, not just an automated system. That means
              clear follow-up when details are missing and practical support while your request is in progress.
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      <Stack spacing={2} className="section-reveal">
        <Box>
          <Typography variant="h3" sx={{ mb: 1 }}>
            How the process works
          </Typography>
          <Typography variant="body1" color="text.secondary">
            A simple four-step process designed to keep you informed from start to finish.
          </Typography>
        </Box>
        <Grid container spacing={2}>
          {processSteps.map((step, index) => (
            <Grid item xs={12} sm={6} key={step.title}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  border: "1px solid",
                  borderColor: "divider",
                  height: "100%",
                  backgroundColor: "rgba(255,255,255,0.92)",
                }}
              >
                <Stack direction="row" spacing={2} alignItems="flex-start">
                  <Box
                    sx={{
                      minWidth: 30,
                      height: 30,
                      borderRadius: "50%",
                      bgcolor: "primary.main",
                      color: "primary.contrastText",
                      display: "grid",
                      placeItems: "center",
                      fontWeight: 700,
                      fontSize: "0.9rem",
                    }}
                  >
                    {index + 1}
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ mb: 0.5 }}>
                      {step.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                      {step.description}
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Stack>

      <Stack spacing={2} className="section-reveal">
        <Box>
          <Typography variant="h3" sx={{ mb: 1 }}>
            What you need to prepare
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Having these details ready will make your application faster and reduce review delays.
          </Typography>
        </Box>
        <Grid container spacing={2}>
          {requirements.map((item) => (
            <Grid item xs={12} sm={6} key={item}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  border: "1px solid",
                  borderColor: "divider",
                  backgroundColor: "rgba(255,255,255,0.92)",
                }}
              >
                <Stack direction="row" spacing={1.2} alignItems="flex-start">
                  <CheckCircleOutlineIcon sx={{ color: "secondary.main", mt: "2px", fontSize: 20 }} />
                  <Typography variant="body2" sx={{ lineHeight: 1.7 }}>
                    {item}
                  </Typography>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Stack>

      <Stack spacing={2} className="section-reveal">
        <Box>
          <Typography variant="h3" sx={{ mb: 1 }}>
            Frequently asked questions
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Answers to common questions before and after submission.
          </Typography>
        </Box>
        <Stack spacing={1.5}>
          {faqItems.map((item, index) => (
            <Accordion
              key={item.question}
              expanded={expandedFaq === `panel-${index}`}
              onChange={handleFaqChange(`panel-${index}`)}
              elevation={0}
              sx={{ border: "1px solid", borderColor: "divider", backgroundColor: "rgba(255, 255, 255, 0.94)" }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography sx={{ fontWeight: 600 }}>{item.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
                  {item.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Stack>
      </Stack>

      <Paper
        elevation={0}
        className="section-reveal"
        sx={{
          p: { xs: 3, md: 5 },
          border: "1px solid",
          borderColor: "divider",
          textAlign: "center",
          background: "linear-gradient(145deg, rgba(184,116,50,0.11), rgba(255,255,255,0.96) 50%)",
        }}
      >
        <Typography variant="h4" sx={{ mb: 1.5 }}>
          Ready to submit your loan request?
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 620, mx: "auto", lineHeight: 1.75, mb: 3 }}>
          Start your application now, then use the tracking page anytime to view the latest review status.
        </Typography>
        <Button component={RouterLink} to="/apply" variant="contained" size="large">
          Continue to application form
        </Button>
      </Paper>
    </Stack>
  );
}

export default LandingPage;
