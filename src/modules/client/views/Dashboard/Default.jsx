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
            <p className="mb-4 text-center">
                <span className="text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-5xl dark:text-white text-center text-primary">
                Elije un plan ideal y ayudémonos mutuamente.
                </span>
                <br />
                <span className="text-xl text-primary">
                “Juntos, podemos marcar una diferencia perdurable en la historia de quienes más necesitan nuestro apoyo”.
                </span>
                </p>           
            </div>
           </div>
            <Modal />
        </>
    );
}

export default Default;