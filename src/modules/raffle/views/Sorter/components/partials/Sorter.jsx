import { useDrawParameters } from "../../../../../../app/store/app/raffleSorterStore";
import CardSurprise from "../../../../../../components/CardSurprise";

//realizar un reporte interno en la tabla de las rifas 
const Sorter = () => {

    const drawParameters = useDrawParameters((state) => state.drawParameters);
    const parameters = JSON.parse(drawParameters);
    const currentAttempts = parameters.current_attempts;
    const totalAttempts = parameters.total_attempts;
    const surprises = Array(totalAttempts).fill(null); 
    
    return (
        <>
        <div className="flex-grow flex justify-center items-center gap-2">
            {
            surprises.length > 0 
            ? surprises.map((_,index) => (<CardSurprise key={index} index={index + 1} />)) 
            : <CardSurprise />
            }
        </div>
        </>
    );
}

export default Sorter;