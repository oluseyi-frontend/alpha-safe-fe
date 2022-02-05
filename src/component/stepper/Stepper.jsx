import React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import { Typography, Button } from '@mui/material';
import styles from './AppStepper.module.css'





const AppStepper = ({steps, type, closeCreation,  handleAction}) => {
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
     
      if(activeStep + 1 === steps.length){
        handleAction()

      }
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    const handleReset = () => {
      setActiveStep(0);
    };

    const handleOpenStep=(index)=>{
            setActiveStep(index)
closeCreation()
    }

    return ( 
        <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.stepLabel}>
            <StepLabel sx={{cursor: 'pointer'}}
              onClick={()=>{handleOpenStep(index)}}
            >
              {step.stepLabel}
            </StepLabel>
            <StepContent>
              {step.stepContent}
              <Box sx={{ mb: 2 }}>
                <div className={styles.stepper_actions}>
                  <button
                    variant="contained"
                    onClick={handleNext}
                    
                  >
                    {index === steps.length - 1 ? type : 'Continue'}
                  </button>
                  <button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
     );
}
 
export default AppStepper;