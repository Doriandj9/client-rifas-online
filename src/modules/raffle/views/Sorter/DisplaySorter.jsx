import { useParams } from "react-router-dom";
import routesapi from "../../../../app/config/routesapi";
import SorterLayout from "../../../../app/layouts/SorterLayout";
import { useFetch } from "../../../../app/utilities/hooks/data/useFetch";
import Body from "./components/Body";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { useAccessToken, useAuth } from "../../../../app/store/app/userStore";
import { credentials } from "../../../../app/config/app";
import { useDrawDetails, useDrawParameters, useRaffleStore, useTicketsRaffleStore } from "../../../../app/store/app/raffleSorterStore";
import { useEffect, useState } from "react";
import { useLocaleStorageFromDB } from "../../../../app/utilities/hooks/data/useStorageFromDB";
import Loader from "../../../../app/app_components/Core/Loader";
import { initialFetch } from "../../../../app/utilities/web/fetchQuery";
import { useToast } from "@chakra-ui/react";
import { toastConfig } from "../../../../app/utilities/web/configs";

let url = credentials.server  + routesapi.raffles_lottery;

const DisplaySorter = () => {
    const parameters = useParams();
    const user = useAuth((state) => state.user);
    const toast = useToast(toastConfig);
    const updateTicketsRaffle = useTicketsRaffleStore((state) => state.update);

    const [dataTickets,setDataTickets] = useState([]);
    const [loadingTickets,setLoadingTickets] = useState(false);
    const [currentPage,setCurrentPage] = useState(null);
    const [totalPages,setTotalPages] = useState(null);

    const token = useAccessToken((state) => state.token);
    const updateRaffle = useRaffleStore((state) => state.update);
    const {data,error,loading,refetch} = useFetch(`${url}/${parameters.id}`,{method: 'GET'},'data',true,token);
    const { saveData ,loading:loadingHook,error:errorHook} = useLocaleStorageFromDB();
    const updateDrawDetails = useDrawDetails((state) => state.update);
    const updateDrawParameters = useDrawParameters((state) => state.update);

    useEffect(() => {
        if(data && data.id){
            let draw_details = {
                tickets_winner: [],
                tickets_discarded: []
            }
                if(!data.draw_details){
                    const ticketsWinner =   JSON.parse(data.awards)
                    .sort((a,b) => a.id - b.id)
                    .map((award,i) => {
                        return {
                            description: award,
                            winner: null,
                            selected: false,
                            complete: false,
                        };
                    })
                    const ticketsLost =   JSON.parse(data.awards)
                    .sort((a,b) => a.id - b.id)
                    .map((award,i) => {
                        return {
                            description: award,
                            lost: []
                        };
                    })
                    draw_details.tickets_winner = ticketsWinner;
                    draw_details.tickets_discarded= ticketsLost;
                    saveData(`${url}/${data.id}`,data,JSON.stringify(draw_details),'draw_details','details');

                } else {
                    draw_details = data.draw_details;
                    updateDrawDetails(draw_details);

                }

                if(data.draw_parameters){
                    updateDrawParameters(data.draw_parameters);
                }

        }
        updateRaffle(data)
    },[data])


    let dataF = [];
    const urlTickets = credentials.server  + routesapi.public_tickets_by_raffles.replace('{id}',parameters.id);

    const fetchRecursive = async (lastPage,page) => {
        let lastPageFetch = 0;
        try {
            const response  = await initialFetch(urlTickets + `?page=${page}`,{method: 'GET'});
            lastPageFetch = response.last_page;
            const data = response.data;
            dataF.push(...data);

            setTimeout( () => ((data) => {
                setDataTickets([...dataF,data]);
            })(data),1);

            setCurrentPage(page);
            setTotalPages(lastPageFetch);
            if(page === lastPageFetch) return;
            return fetchRecursive(lastPageFetch,response.current_page + 1);
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Error en el servidor.',
                status: 'error'
            });
        }finally{
            
        }
    }

    useEffect(() => {
            setLoadingTickets(true);
            
            // .finally(() => {
            //     setLoadingTickets(false);
            // });
            toast.promise(fetchRecursive(0,1),{
                success: { title: 'Datos', description: 'Boletos sincronizados' },
                error: { title: 'Error', description: 'Error en el servidor' },
                loading: { title: 'Sincronización', description: 'Cargando boletos...' },
            })
    },[]);

    useEffect(() => {
        if(totalPages && currentPage && totalPages === currentPage){
            const dataFinalTickets = dataTickets.filter((item) => item.id);
            updateTicketsRaffle(dataFinalTickets);
        }
    },[totalPages,currentPage,dataTickets.length])

    

    return (
        <>
            <SorterLayout>
                <Loader loading={loading} />
                <div className="flex flex-grow flex-col">
                    {/* Cabecera de boletos ganadores */}
                    <Header key={'ddd-H'} />
                    
                    {/* Cuerpo del sorteo */}
                    <Body />

                    {/* El footer de los boletos descartados */}
                    <Footer />
                </div>
            </SorterLayout>
        </>
    );
}


export default DisplaySorter;