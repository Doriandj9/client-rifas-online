import AppButton from "./AppButon";


const AppDisplayPlan = ({plan, handleClick = () => {} } ) => {
    
    return (
        <>
        <div className="max-w-[380px]  p-4 border border-neutral-300 shadow hover:scale-1 rounded">
            <div className="max-w-[360px] min-w-[380px] h-[45rem]">
                <h2 className="text-2xl">
                        {plan.title}
                </h2>
                <p>
                    {plan.subject}
                </p>
                <p>
                    {plan.price}
                </p>
                <div>
                    <AppButton onClick={handleClick}>
                        Adquirir plan
                    </AppButton>
                </div>
                <section>
                    <header>
                        <h3>Funciones principales</h3>
                    </header>
                    <p>
                        listado de funciones
                    </p>
                    <p>
                        Resumen
                    </p>
                </section>
            </div>
        </div>
        </>
    );  
}

export default AppDisplayPlan;