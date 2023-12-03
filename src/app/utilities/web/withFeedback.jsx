import SkeletonTable from "../../app_components/Core/SkeletonTable";

const withAPIFeedback = (Component) => ({ hasError, isLoading, data }) => {

    console.log(Component);

    if (isLoading) return <p>Loading…</p>;
    if (hasError) return <p>Sorry, data could not be fetched.</p>;
    if (!data) return <p>No data found.</p>;
    return <Component {...{...data}} />;
}

const withAPIFeedbackTable = (Component) => ({ hasError, isLoading, data }) => {

    console.log(Component);

    if (isLoading) return <SkeletonTable />;
    if (hasError) return <p>{hasError}</p>;
    if (!data) return <p>No data found.</p>;
    return <Component {...{...data}} />;
}


export {withAPIFeedback,withAPIFeedbackTable};1
