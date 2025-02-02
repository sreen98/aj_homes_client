import * as React from 'react';
import NavBar from 'container/Nav';
import Footer from 'container/Footer';
import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from '@mui/material';
import { FAQData } from './data';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function FAQManagement() {
  return (
    <>
      <NavBar />
      <div style={{ marginTop: '6rem', marginBottom: '3rem' }}>
        <Typography variant="h4" align="center" gutterBottom style={{ color: 'black' }} pb={'1rem'}>
          Frequently Asked Questions
        </Typography>
        <Grid style={{ margin: '0 1rem 2rem 1rem' }} sx={{ paddingInline: { lg: '300px', md: '200px', sm: '0px' } }}>
          {FAQData.map((faq, index) => (
            <Accordion key={index} style={{ marginBottom: '10px' }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index + 1}a-content`}
                id={`panel${index + 1}a-header`}
              >
                <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography style={{ whiteSpace: 'pre-line' }} variant="body1">
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Grid>
      </div>
      <Footer />
    </>
  );
}
