import { useAuth } from "../../../../app/store/app/userStore";
import { lottieOptions } from "../../../../app/utilities/web/configs";
import sorprise from '@app/assets/imgs/animations/sorprise.json';
import coins from '@app/assets/imgs/animations/coins.json';


import Modal from "./Modal";
import Lottie from "react-lottie";
import Welcome from "../../../../components/Welcome";

const Default = () => {
    const user = useAuth(state => state.user);
    
    return (
        <>
          <div className="min-h-[70.85vh] relative">
            <div className="absolute top-0 left-0 hidden md:block ">
            <Lottie options={{animationData: sorprise, ...lottieOptions}}  width={200} height={200} />
            </div>
            <div className="w-100 h-100">
            <Welcome />          
            </div>
           </div>
            <Modal />
        </>
    );
}

export default Default;