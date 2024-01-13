import { CircularProgress, Progress } from '@chakra-ui/react'
const Loader = ({loading}) => {
    return loading ? <Background /> : '';
}


const Background = () => {
    
    return (
        <div className="bg-black/25 fixed top-0 left-0 h-screen flex justify-center items-center z-[99999] w-full">
           <CircularProgress isIndeterminate color='green.400' />
        </div>
    );
}

export default Loader;