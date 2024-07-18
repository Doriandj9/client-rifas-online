import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { useFetch } from '../app/utilities/hooks/data/useFetch';
import { credentials } from '../app/config/app';
import routesapi from '../app/config/routesapi';
import { Skeleton } from '@mui/material';
import { MdDoNotDisturbAlt } from "react-icons/md";
import logoRaffle from '@app/assets/imgs/biglietti-lotteria.png';
import { formatTimeDate } from '../app/utilities/web/times/formatTimeFull';
import { BsFillCalendar2DateFill } from "react-icons/bs";
import { FaAward } from "react-icons/fa";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const url = credentials.server + routesapi.public_last_raffles;

const DisplaySorters = () => {

  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const {data, loading, error} = useFetch(url,{method: 'GET'},'data');
  const maxSteps = data.length;
  // const maxSteps = data?.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
      <Paper
        square
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: 50,
          pl: 2,
          bgcolor: 'background.default',
        }}
      >
        {
          Array.isArray(data) && data.length > 0 &&
        <div className='flex gap-2 flex-col mb-2'> 
          <div>
            <Typography sx={{display:'flex', gap: '0.25rem'}}>
              <FaAward className='w-6 h-6 text-primaryop-900' /> {data[activeStep]?.name}
            </Typography>
          </div>
          <div className='flex gap-0'>
          <Typography sx={{display:'flex', gap: '0.25rem'}}>
            <BsFillCalendar2DateFill className='w-6 h-6 text-primaryop-900' />
           {formatTimeDate(data[activeStep]?.draw_date)}
          </Typography>
          </div>
        </div>
        }
      </Paper>
      {
        Array.isArray(data) && data.length > 0 &&
        <>
        <AutoPlaySwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {data.map((step, index) => (
            <div key={step.id}>
              {Math.abs(activeStep - index) <= 2 ? (
                <Box
                  component="img"
                  sx={{
                    height: 255,
                    display: 'block',
                    maxWidth: 400,
                    overflow: 'hidden',
                    width: '100%',
                  }}
                  src={step.logo_raffles !== 'logo-raffle.png' ? `${credentials.server}${step.logo_raffles}` : logoRaffle}
                  alt={step.name  + '-logo'}
                />
              ) : null}
            </div>
          ))}
        </AutoPlaySwipeableViews>
        <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Siguiente
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Anterior
          </Button>
        }
      />
        </>
      }
      {
        loading && 
      <div className='flex w-full gap-2 flex-col'>
        <Skeleton animation="wave" height={50} variant="rounded"/>
        <Skeleton animation="wave" height={250} variant="rectangular"/>
      </div>
      }
      {
        !loading && Array.isArray(data) && data.length <= 0 &&
        <div className='flex w-full justify-center items-center flex-col gap-4'>
          <p className='title-dynamic'>
            De momento no hay rifas disponibles.
          </p>
            <MdDoNotDisturbAlt className='w-20 h-20 text-secondary' />
        </div>
      }
    </Box>
  );
}

export default DisplaySorters;