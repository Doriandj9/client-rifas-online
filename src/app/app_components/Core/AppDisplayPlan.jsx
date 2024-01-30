import { List, ListIcon, ListItem } from "@chakra-ui/react";
import AppButton from "./AppButon";
import { MdCheckCircle } from "react-icons/md";


const AppDisplayPlan = ({plan, handleClick = () => {} } ) => {
    
    return (
        <>
        <div className="max-w-[380px]  p-4 border border-neutral-300 shadow-lg hover:scale-[1.05] bg-white duration-300 rounded">
            <div className="w-[360px]  h-[45rem]">
                <h2 className="text-3xl mt-8 font-black text-center text-primary">
                        {plan.title}
                </h2>
                <p className="text-center text-primary text-sm">
                    {plan.subject}
                </p>
                <p className="text-center text-primary text-sm">
                Elije un plan ideal y ayudémonos mutuamente.
                <br />
                “Juntos, podemos marcar una diferencia perdurable en la historia de quienes más necesitan nuestro apoyo”.
                </p>
                <p className="mt-8 text-center">
                   <span className="text-5xl font-semibold"> {plan.price.replace('.',',')} </span>
                   <span className="text-primary text-xl -ms-3">$/</span>
                    <span className="text-primary text-md">mes </span>
                </p>
                <div className="mt-8 text-center">
                    <AppButton className="block w-9/12 m-auto" onClick={handleClick}>
                        Adquirir plan
                    </AppButton>
                </div>
                <div className="w-[95%] border-b h-1 border-gray-300 mt-16 mx-auto"  />
                <section className="mt-16">
                    <header>
                        <h3 className="text-green-800 font-semibold text-xl">Funciones principales</h3>
                    </header>
                    <p className="mt-4">
                    <List spacing={3}>
                    {JSON.parse(plan.description).map((item,i) => {
                                
                                return (
                                    <ListItem key={i}>
                                        <ListIcon as={MdCheckCircle} color='green.500' />
                                        {item}
                                    </ListItem>
                                );
                            })}
                        </List>
                           
                    </p>
                <div className="w-[95%] border-b h-1 border-gray-300 mt-16 mx-auto"  />
                    <p className="mt-12 text-primary italic text-xl">
                        !Gracias por preferirnos. 
                    </p>
                </section>
            </div>
        </div>
        </>
    );  
}

export default AppDisplayPlan;