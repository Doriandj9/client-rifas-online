import { useState } from "react";
import AppDisplayPlan from "../../../../../app/app_components/Core/AppDisplayPlan";
import { credentials } from "../../../../../app/config/app";
import routesapi from "../../../../../app/config/routesapi";
import { useFetch } from "../../../../../app/utilities/hooks/data/useFetch";

const url  = credentials.server + routesapi.subscriptions;

const Plans = () => {
const [idPlan, setIdPlan] = useState('');

    const { data, error, loading,total, refetch: fetchData } = useFetch(url,{method: 'GET'},'data');

    const handleClick = (plan) => (e) => {
        setIdPlan(plan.id);
    } 

    return (
        <>
         <section className="bg-white dark:bg-gray-900 ">
            <div className=" max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-18 lg:pt-32">
        <h2 className="mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl dark:text-white text-center text-primary">Elige tu plan de rifas </h2>
         <div className="grid grid-rows-1 2xl:grid-cols-3 xl:grid-cols-3 gap-2 md:grid-cols-2 sm:grid-cols-1 md:place-items-center mt-8 mb-4">
            {
                data.map((plan) =>  (<AppDisplayPlan key={plan.id} plan={plan} handleClick={handleClick(plan)} />))
            }
        </div>
        </div>
        </section>
        </>
    );
} 


export default Plans;