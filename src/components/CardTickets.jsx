import { RxQuestionMarkCircled } from "react-icons/rx";
import { useDrawDetails } from "../app/store/app/raffleSorterStore";
import { useEffect, useState } from "react";
import { FaUserXmark } from "react-icons/fa6";
import { BsTicketPerforatedFill } from "react-icons/bs";
import { IoTicket } from "react-icons/io5";
import { FaUserCheck } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";

const CardTickets = ({award, selected = false, handleClick= () => {}, discard=false,winner= null, lots=[]}) => {
    const [animate, setAnimate] = useState('');
    
    useEffect(() => {
        if(selected){
        const animateBounce = 'animate animate-bounce';
            setAnimate(animateBounce);
          const time =  setTimeout(() => {
                setAnimate('');
            },2300)

            return () => {
                clearTimeout(time)
            }
        }

    },[selected])
    return (
            <div onClick={handleClick} className={`w-44 shadow-lg rounded-tr-xl rounded-tl-xl 
            ${selected ? animate : ''}
            ${selected ? ' border-2 border-yellow-400 ' : ''}
            ${discard ? 'shadow-red-300' : 'shadow-blue-200'} cursor-pointer`}>
                <header className="bg-primary text-white w-full rounded-tr-xl rounded-tl-xl ">
                    <div className="">
                        <h4 className="text-sm p-1 text-center font-bold">{award.title}</h4>
                        <div className="bg-gray-100">
                            <p className="text-primary text-xs px-1 h-12 overflow-y-auto">
                                {award.description}
                            </p>
                        </div>
                    </div>
                </header>
                <section className="overflow-y-auto h-28">
                    {
                    winner &&
                        <div className="flex justify-center flex-col bg-primary text-white p-2">
                                <p className="border-b-2 border-b-white pb-2">
                                    <span className="p-2 border-2 border-white flex gap-2 text-xl rounded-xl justify-center">
                                     <IoTicket className="w-4 h-4 mt-1" /> {winner.order}
                                    </span>
                                </p>

                                <p className="flex gap-2 mt-3 border-b-2 border-b-white pb-2">
                                    <FaUserCheck className="w-4 h-4"/> 
                                    {winner.user.taxid.substring(0,winner.user.taxid.length - 3)}xxx
                                </p>

                                <p className="flex gap-2 mt-3 border-b-2 border-b-white pb-2">
                                    <FaCircleUser className="w-4 h-4"/> 
                                    {winner.user.first_name} {winner.user.last_name}
                                </p>
                                <p className="flex gap-2 mt-3 border-b-2 border-b-white pb-2">
                                    <FaPhoneAlt className="w-4 h-4"/> 
                                    {winner.user.phone}
                                </p>
                        </div>
                    }
                    {
                     winner === null && lots.length === 0 &&
                        <div className="flex justify-center items-center">
                            <RxQuestionMarkCircled className="w-24 h-24 text-gray-200" />
                        </div>
                    }
                <div className="flex justify-center items-center flex-col w-full gap-2">
                    {
                        lots.length > 0 &&
                        lots.map((item,i) => {
                            return (
                                <>
                                    <div key={i} className="bg-secondary w-full flex items-center text-white justify-around">
                                        <div className="flex gap-1 py-3 px-2 text-xs">
                                            <div className="">
                                                <span><FaUserXmark className="text-white w-3 h-3" /></span>
                                            </div>
                                            <div className="">
                                                <span>{item.user?.taxid?.substring(0,item.user?.taxid?.length - 6)}x - {item.user?.first_name}</span>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 py-3 px-2 text-xs text-white">
                                            <div className="">
                                                <span><BsTicketPerforatedFill className="text-white w-3 h-3" /></span>
                                            </div>
                                            <div className="">
                                                <span>{item.order}</span>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            );
                        })
                    }
                    
                    
                </div>
                </section>
            </div>
    );
}

export default CardTickets;