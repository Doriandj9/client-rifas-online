import { useAuth } from "../../../../app/store/app/userStore";
import { lottieOptions } from "../../../../app/utilities/web/configs";
import sorprise from '@app/assets/imgs/animations/sorprise.json';
import coins from '@app/assets/imgs/animations/coins.json';


import Modal from "./Modal";
import Lottie from "react-lottie";

const Default = () => {
    const user = useAuth(state => state.user);
    
    return (
        <>
          <div className="min-h-[70.85vh] relative">
            <div className="absolute top-0 left-0">
            <Lottie options={{animationData: sorprise, ...lottieOptions}}  width={200} height={200} />
            </div>
            <div className="absolute bottom-0 right-0"  style={{ }}>
            <Lottie options={{animationData: coins, ...lottieOptions}}  width={150} height={150} />    
            </div>
            <div className="flex w-100 h-100 items-center justify-center">
                <h2 className="text-center">
                    <span className="text-xl font-bold text-primary">Bienvenido a las rifas online está será tu mejor inversión.</span>
                        <br />
                    <span className="text-primaryop-900 text-lg">
                    "A disfrutar"
                    </span> 
                </h2>            
            </div>
           </div>
            <Modal />
        </>
    );
}

export default Default;