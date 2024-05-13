import Parameters from "./partials/Parameters";
import Sorter from "./partials/Sorter";

const Body = () => {

    return (
        <>
            <div className="flex-grow">
                    <div className="w-full h-full mt-2">
                        <div className="flex h-full w-full">
                            <Parameters />
                            <Sorter />
                        </div>
                    </div>
            </div>
        </>
    );
}

export default Body;