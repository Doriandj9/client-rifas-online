import { useState } from "react";
import AppModal from "../app/app_components/Core/AppModal";
import ComponentMUI from "../app/app_components/Core/ComponentMUI";
import { useUserId } from "../app/store/app/userStore";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { Rating, TextField } from "@mui/material";
import { Button, useToast } from "@chakra-ui/react";
import { lottieOptions, toastConfig } from "../app/utilities/web/configs";
import conffeti from '@app/assets/imgs/animations/conffeti.json';

import Lottie from "react-lottie";
import { initialFetch } from "../app/utilities/web/fetchQuery";
import { credentials } from "../app/config/app";
import routesapi from "../app/config/routesapi";

const url = credentials.server + routesapi.rating;

const RatingAndComments = ({open, handleClose, setOpen}) => {
    const userID = useUserId((state) => state.id);
    const option2 = {...lottieOptions, loop: true};
    const [clicked, setClicked] = useState(false);
    const [loading, setLoading] = useState(false);

    const [inputs, setInputs] = useState({
        comments: '',
        rating: 0
    });
    const toast = useToast(toastConfig);

    const handleSubmit = async (e) => {
        if(inputs.rating <= 0){
            toast({
                title: 'Error',
                description: 'Ingrese una calificación en las estrellas por favor.',
                duration: 2500,
                status: 'error'
            })
            return;
        }
        const data = {
            user_id: userID,
            calification: inputs.rating,
            comment: inputs.comments
        };
      
        setOpen(false);
        try {
            setLoading(true);
            const response = await initialFetch(url,{method: 'POST', body: new URLSearchParams(data)});
            if(!response.status){
                throw Error(response.message);
            }

            toast({
                title: 'Éxito',
                description: 'Se agrego correctamente tu calificación.',
                status: 'success'
            });
        } catch (error) {
            toast({
                title: 'Error',
                description: error.message,
                status: 'error'
            });
        } finally {
            setLoading(false);
            setInputs({rating:0,comments: ''});
        }

    }

    
    return (
        <>
            <AppModal
             isOpen={open}
             onClose={handleClose}
             buttons={
                <>
                <div className="flex gap-2">
                    <Button colorScheme="red" onClick={handleClose}>
                        No calificar
                    </Button>
                    <Button colorScheme="green" onClick={handleSubmit}>
                        Enviar calificación
                    </Button>
                </div>
                </>
             }
             header={
                <div className="">
                <div className="flex items-center gap-2 text-green-800 italic">
                    <IoCheckmarkDoneCircle className="w-8 h-8" />   
                    <h2 className="" >Califica a HAYU24</h2>
                 </div>
                </div>
             }
            >

                <div className="relative">
                    {
                    clicked &&
                    <div className="absolute z-[99999] top-0 lef-8">
                        <Lottie  options={{animationData: conffeti, ...option2}}  width={200} height={200} />
                    </div>
                    }

                    <h3 className="text-sm font-bold mb-2">¿ Que tan satisfactoria fue tu experiencia ?</h3>
                    <ComponentMUI>
                    <Rating
                            name="simple-controlled"
                            precision={0.5}
                            value={inputs.rating}
                            onChange={(event, newValue) => {
                            setClicked(true);
                            setTimeout(() => {
                                setClicked(false);
                            },1000);
                            setInputs({...inputs,rating: newValue});
                            }}
                        />
                    </ComponentMUI>
                    <h3 className="my-2 text-sm font-bold">Coméntanos como te sentiste(Opcional)</h3>
                    <ComponentMUI>
                    <TextField
                    className="app-textarea"
                    sx={{boxShadow: 'none'}}
                    id="outlined-multiline-flexible"
                    label="Comenta aquí..."
                    value={inputs.comments}
                    onChange={(event, value) => {
                        setInputs({...inputs,comments: event.target.value})
                    }}
                    multiline
                    fullWidth
                    maxRows={2}
                    />
                    </ComponentMUI>
                </div>
            </AppModal>
        </>
    );
}


export default RatingAndComments;