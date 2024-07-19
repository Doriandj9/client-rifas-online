
import * as React from 'react';
import Layout from "@app/app/layouts/Layout";
import { credentials } from "../../../../app/config/app";
import { useSetHeader } from "../../../../app/utilities/hooks/web/useSetHeader";
import ComponentMUI from "../../../../app/app_components/Core/ComponentMUI";
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
import { useFetch } from '../../../../app/utilities/hooks/data/useFetch'; 
import { Skeleton } from '@mui/material';
import { MdDoNotDisturbAlt } from "react-icons/md";
import logoRaffle from '@app/assets/imgs/biglietti-lotteria.png';
import { formatTimeDate } from '../../../../app/utilities/web/times/formatTimeFull';
import { BsFillCalendar2DateFill } from "react-icons/bs";
import { FaAward } from "react-icons/fa";
import routesapi from '../../../../app/config/routesapi';

const url = credentials.server + routesapi.public_winners;

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);


const  Winners = () => {
useSetHeader('Reseñas de los Ganadores');

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
    <>
      <Layout>
        <section className="bg-white dark:bg-gray-900">
          <div className=" max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-2 lg:py-16 lg:pt-20">
            <div className="relative shadow-lg p-1 md:p-4 rounded-xl">
              {/* <div className='lg:-top-20 lg:left-40 lg:absolute relative -top-10'>
                <Lottie options={{animationData: party, ...lottieOptions}}  width={125} height={125} />
            </div>
            <h1 className='text-xl italic font-bold text-primary text-center'> Encuentra la mejor rifa y cómprala para ganar muchos premios. </h1> */}
              <div className='pt-12 min-h-[35rem] flex justify-center'>
                <ComponentMUI>


                <Box sx={{flexGrow: 1 }}>
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
        <div className='flex gap-2 flex-col mb-2 justify-center w-full'> 
          <div className='flex justify-center'>
            <Typography sx={{display:'flex', gap: '0.25rem'}}>
              <FaAward className='w-7 h-7 text-primaryop-900' />
              <h3 className='md:text-2xl text-sm title-dynamic font-black'> {data[activeStep]?.raffle?.name} </h3>
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
          interval={10000}
        >
          {data.map((item, index) => {

                            return (
                              <div className='flex gap-2 flex-col'>
                                  {
                                    JSON.parse(item.payload).map((item, i) => {
                                        return item.comment === '' && item.path === '' ? null :   (
                                        <div  className="shadow px-1 py-4 rounded-md">
                                        <h3  className="text-sm md:text-lg"><span className="text-primary font-semibold">{item.description.title}:</span>  <span className="text-black text-sm">{item.description.description}</span></h3>
                                        <div className="w-11/12 m-auto">
                                            <p className="text-xs text-gray-600"><span className="text-sm md:text-lg font-semibold">Ganador: </span>{item.user.first_name} {item.user.last_name}</p>
                                            <div className='w-full flex gap-1 md:gap-8 md:flex-row flex-col' >
                                              <p className='w-full'>{item.comment}</p>
                                              <div className='w-full'>
                                              <Box
                                                  component="img"
                                                  sx={{
                                                    height: 255,
                                                    display: 'block',
                                                    maxWidth: 400,
                                                    overflow: 'hidden',
                                                    width: '100%',
                                                  }}
                                                  src={ item.path === '' ? '' : credentials.server + item.path }
                                                  alt={'-fotografía'}
                                                />
                                              </div>
                                            </div>
                                        </div>
                                    </div>
                                        )
                                    })                            
                                  }
                              </div>
                            )
                            
                            }
            )}
                        
                        
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
            De momento no hay reseñas disponibles.
          </p>
            <MdDoNotDisturbAlt className='w-20 h-20 text-secondary' />
        </div>
      }
    </Box>
                    
                </ComponentMUI>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}

export default Winners;
