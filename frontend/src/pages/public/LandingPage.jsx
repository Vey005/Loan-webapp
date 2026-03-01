import { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import SpeedIcon from "@mui/icons-material/Speed";
import SecurityIcon from "@mui/icons-material/Security";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const features = [
  {
    icon: SpeedIcon,
    title: "Fast Application",
    description: "Complete your application in just minutes with our streamlined process",
  },
  {
    icon: SecurityIcon,
    title: "Secure & Private",
    description: "Enterprise-grade encryption protects your personal and financial data",
  },
  {
    icon: TrackChangesIcon,
    title: "Real-time Tracking",
    description: "Monitor your application status 24/7 from submission to approval",
  },
  {
    icon: AssignmentIndIcon,
    title: "Expert Review",
    description: "Transparent and fair review process by qualified loan specialists",
  },
];

const steps = [
  {
    number: 1,
    title: "Submit Details",
    description: "Provide your personal and financial information",
  },
  {
    number: 2,
    title: "Upload Documents",
    description: "Submit your ID and selfie for verification",
  },
  {
    number: 3,
    title: "Review",
    description: "Our team carefully evaluates your application",
  },
  {
    number: 4,
    title: "Get Approved",
    description: "Receive decision and loan offer details",
  },
];

const statistics = [
  { value: "2,500+", label: "Successful Applications" },
  { value: "98%", label: "Approval Rate" },
  { value: "$50M+", label: "Funds Disbursed" },
  { value: "24h", label: "Avg Decision Time" },
];

const faqItems = [
  {
    question: "How long does the application process take?",
    answer: "Most applications are processed within 24-48 hours. You'll receive updates via email and can track your status in real-time on our platform.",
  },
  {
    question: "What documents are required?",
    answer: "You'll need a valid national ID and a selfie for identity verification, along with income proof and financial documents.",
  },
  {
    question: "Is my financial information secure?",
    answer: "Yes, we use enterprise-grade encryption (SSL/TLS) and follow strict data protection protocols. Your information is never shared with third parties.",
  },
  {
    question: "Can I check my application status?",
    answer: "Absolutely! You can check your status anytime using your phone number or email along with your national ID number.",
  },
  {
    question: "When will I receive the loan decision?",
    answer: "Most decisions are made within 24-48 hours. Urgent applications may be processed faster. You'll be notified by email and SMS.",
  },
  {
    question: "What is the maximum loan amount?",
    answer: "The maximum loan amount depends on your income, credit history, and employment status. Our team will provide personalized offers.",
  },
  {
    question: "Is there an application fee?",
    answer: "No, applying is completely free. There are no hidden charges or application fees.",
  },
  {
    question: "Can I modify my application after submission?",
    answer: "You can contact our support team to request modifications within 24 hours of submission.",
  },
];

function LandingPage() {
  const [expandedFaq, setExpandedFaq] = useState(false);

  const handleFaqChange = (panel) => (event, isExpanded) => {
    setExpandedFaq(isExpanded ? panel : false);
  };

  return (
    <Stack spacing={8}>
      {/* Hero Section */}
      <Grid container spacing={4} className="slide-up" alignItems="center">
        <Grid item xs={12} md={7}>
          <Typography variant="h2" gutterBottom>
            Fast, secure loan applications with transparent review.
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 620, mb: 3 }}>
            Submit your request in minutes, verify your identity safely, and track status in real time.
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Button component={RouterLink} to="/apply" variant="contained" size="large">
              Start Application
            </Button>
            <Button component={RouterLink} to="/status" variant="outlined" size="large">
              Check Status
            </Button>
          </Stack>
        </Grid>

        <Grid item xs={12} md={5}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              border: "1px solid #d9e5e2",
              background:
                "linear-gradient(160deg, rgba(15,118,110,0.08) 0%, rgba(249,115,22,0.12) 100%)",
            }}
          >
            <Typography variant="h5" gutterBottom>
              Why this platform
            </Typography>
            <Typography component="ul" sx={{ pl: 2, m: 0, lineHeight: 1.8 }}>
              <li>Dual validation on frontend and backend</li>
              <li>Admin workflows with audit trail</li>
              <li>Private media access controls</li>
              <li>Production-ready API architecture</li>
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Features Section */}
      <Stack spacing={3}>
        <Box>
          <Typography variant="h3" gutterBottom sx={{ color: "#0f766e" }}>
            Why Choose Us
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Experience the difference with cutting-edge loan application technology
          </Typography>
        </Box>
        <Grid container spacing={{ xs: 2, sm: 3, md: 3 }}>
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper
                  elevation={0}
                  className="fade-in-up card-hover"
                  sx={{
                    p: 3,
                    border: "1px solid #d9e5e2",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    background:
                      "linear-gradient(135deg, rgba(15,118,110,0.04) 0%, rgba(249,115,22,0.08) 100%)",
                  }}
                >
                  <Box sx={{ mb: 2 }}>
                    <Icon sx={{ fontSize: { xs: 40, sm: 48, md: 56 }, color: "#0f766e" }} />
                  </Box>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Stack>

      {/* How It Works Section */}
      <Stack spacing={3}>
        <Box>
          <Typography variant="h3" gutterBottom sx={{ color: "#0f766e" }}>
            How It Works
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Simple, straightforward process to get your loan approved
          </Typography>
        </Box>
        <Grid container spacing={{ xs: 2, sm: 3, md: 2 }}>
          {steps.map((step, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Avatar
                  sx={{
                    width: { xs: 60, md: 70 },
                    height: { xs: 60, md: 70 },
                    backgroundColor: "#0f766e",
                    fontSize: { xs: 28, md: 32 },
                    fontWeight: 600,
                    mb: 2,
                    className: "step-pulse",
                  }}
                >
                  {step.number}
                </Avatar>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  {step.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {step.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Stack>

      {/* Statistics Section */}
      <Stack spacing={3}>
        <Box>
          <Typography variant="h3" gutterBottom sx={{ color: "#0f766e" }}>
            Our Impact
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Trusted by thousands of borrowers across the region
          </Typography>
        </Box>
        <Grid container spacing={{ xs: 2, sm: 3, md: 3 }}>
          {statistics.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                elevation={0}
                className="fade-in-up card-hover"
                sx={{
                  p: 3,
                  border: "1px solid #d9e5e2",
                  textAlign: "center",
                  background:
                    "linear-gradient(135deg, rgba(15,118,110,0.04) 0%, rgba(249,115,22,0.08) 100%)",
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    color: "#0f766e",
                    fontWeight: 700,
                    mb: 1,
                  }}
                >
                  {stat.value}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500 }}>
                  {stat.label}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Stack>

      {/* FAQ Section */}
      <Stack spacing={3}>
        <Box>
          <Typography variant="h3" gutterBottom sx={{ color: "#0f766e" }}>
            Frequently Asked Questions
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Find answers to common questions about our loan application process
          </Typography>
        </Box>
        <Stack spacing={2} className="fade-in">
          {faqItems.map((item, index) => (
            <Accordion
              key={index}
              expanded={expandedFaq === `panel${index}`}
              onChange={handleFaqChange(`panel${index}`)}
              sx={{
                border: "1px solid #d9e5e2",
                "&:before": { display: "none" },
                "& .MuiAccordionSummary-root": {
                  "&:hover": {
                    backgroundColor: "rgba(15, 118, 110, 0.04)",
                  },
                },
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography sx={{ fontWeight: 600, color: "#1f2937" }}>
                  {item.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ backgroundColor: "rgba(15, 118, 110, 0.02)" }}>
                <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  {item.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Stack>
      </Stack>

      {/* CTA Section */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 4, md: 6 },
          border: "1px solid #d9e5e2",
          background:
            "linear-gradient(160deg, rgba(15,118,110,0.08) 0%, rgba(249,115,22,0.12) 100%)",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
          Ready to Apply?
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 500, mx: "auto", mb: 3 }}>
          Join thousands of satisfied customers who have successfully obtained their loans through our platform.
        </Typography>
        <Button component={RouterLink} to="/apply" variant="contained" size="large">
          Start Your Application Today
        </Button>
      </Paper>
    </Stack>
  );
}

export default LandingPage;
