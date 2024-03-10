import Lottie from "react-lottie";
import SkeletonCard from "../../app_components/Core/SkeletonCard";
import SkeletonTable from "../../app_components/Core/SkeletonTable";
import { lottieOptions } from "./configs";
import aError from '@app/assets/imgs/animations/error.json';

const withAPIFeedback = (Component) => ({ hasError, isLoading, data }) => {

    if (isLoading) return <p>Loading…</p>;
    if (hasError) return <p>Sorry, data could not be fetched.</p>;
    if (!data) return <p>No data found.</p>;
    return <Component {...{...data}} />;
}

const withAPIFeedbackTable = (Component) => ({ hasError, isLoading, pagePaginate, setPagePaginate, total, data,type='default' }) => {

    const elementsLoad  = {
        'table': <SkeletonTable />,
        'card': <SkeletonCard />,
        'default': <p>Cargando..</p>
    };
    
    if (isLoading) return elementsLoad[type] ?? elementsLoad['default'];
    if (hasError) return  <ErrorBundle  error={hasError} />;
    if (!data) return <p>No data found.</p>;
    return <Component {...{...data}} total={total} pagePaginate={pagePaginate} setPagePaginate={setPagePaginate} />;
}


const ErrorBundle =({error}) => {
    
    return (
        <>
        <Lottie options={{animationData: aError, ...lottieOptions}}  width={200} height={200} />
        <p>
            {error.message}
        </p>
        </>
    );
}

export {withAPIFeedback,withAPIFeedbackTable};1
