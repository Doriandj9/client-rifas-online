import SkeletonCard from "../../app_components/Core/SkeletonCard";
import SkeletonTable from "../../app_components/Core/SkeletonTable";

const withAPIFeedback = (Component) => ({ hasError, isLoading, data }) => {

    if (isLoading) return <p>Loading…</p>;
    if (hasError) return <p>Sorry, data could not be fetched.</p>;
    if (!data) return <p>No data found.</p>;
    return <Component {...{...data}} />;
}

const withAPIFeedbackTable = (Component) => ({ hasError, isLoading, data,type='default' }) => {

    const elementsLoad  = {
        'table': <SkeletonTable />,
        'card': <SkeletonCard />,
        'default': <p>Cargando..</p>
    };

    if (isLoading) return elementsLoad[type] ?? elementsLoad['default'];
    if (hasError) return <p>{hasError}</p>;
    if (!data) return <p>No data found.</p>;
    return <Component {...{...data}} />;
}


export {withAPIFeedback,withAPIFeedbackTable};1
