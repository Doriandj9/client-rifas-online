import { BiWorld } from "react-icons/bi";
import logo from '@app/assets/imgs/DigitalEducas-Logos/hayu24.png';
import { GoAlertFill } from "react-icons/go";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { IoIosWarning } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaCalendarAlt } from "react-icons/fa";
import { formatTimeDate, formatTimeDateHour, formatTimeFull } from "../../utilities/web/times/formatTimeFull";
import { Link } from "react-router-dom";
import { RiLiveFill } from "react-icons/ri";
import routesweb from "../../config/routesweb";
import { IoInformationCircle } from "react-icons/io5";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { BsClockFill } from "react-icons/bs";
import { useRef, useState } from "react";
import {Button} from '@chakra-ui/react';
import { FaCircleDown } from "react-icons/fa6";
import html2canvas from 'html2canvas';
import { BsShareFill } from "react-icons/bs";
const AppTicket = ({size, ticket,download=false}) => {
    const url = '/' + routesweb.pay_raffles.replace(':id', ticket.raffle.id);
    const refComponent = useRef(null);
    const [imageUrl, setImageUrl] = useState('');

    const captureComponent = () => {
        
      };
    
      const downloadImage = (e) => {
        e.target.style.display = 'none';
        html2canvas(refComponent.current).then(canvas => {
            const dataUrl = canvas.toDataURL();
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = 'generated_image.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            e.target.style.display = 'flex';
          });

        
      };

    return (
        <>
            <div ref={refComponent}
             className="bg-primaryop-500 pt-[0.25rem] px-[0.15rem] w-72 rounded-lg shadow-md shadow-black relative">
                {
                download &&
                <button onClick={downloadImage}
                 title="Compartir imagen" className="absolute py-3 px-5 top-1 right-0 bg-primary flex gap-2 text-white rounded-xl">
                   <BsShareFill className="pointer-events-none w-7 h-7"/>
                </button>
                }
                <section className="w-70 h-20 bg-white rounded-t-lg">
                        <div className="w-full flex justify-between items-center pt-2">
                            <GoAlertFill className="text-4xl text-primary ms-2" />
                            <img src={logo} className="w-20 h-12" alt="" />
                            <BiWorld className="text-4xl text-primary mr-2" />
                        </div>
                </section>
                <section className="bg-primary h-60 overflow-hidden" >
                        <h3 className="text-white text-center pt-2 text-sm font-bold"> {ticket.raffle.name} </h3>
                        <div className="mt-4 w-9/12 m-auto flex gap-2">
                            <IoInformationCircle  className="w-5 w-5 text-yellow-300" />
                             <Link className="text-white text-sm" to={url} target="__black" >Más información de la rifa</Link>
                        </div>

                        <div className="mt-6 w-9/12 m-auto">
                            {
                                ticket.is_buy ? 
                                <span className="inline-flex text-white text-sm gap-1">
                                     <IoCheckmarkCircleSharp className="w-5 w-5 text-green-400" />
                                      Pago verificado</span>
                                :
                                <span className="inline-flex text-red-600 text-sm">
                                     <IoIosWarning className="w-5 w-5 text-red-600" />
                                    Pago sin verificación</span>
                            }
                        </div>
                        <div className="mt-1 w-9/12 m-auto">
                                <span className="inline-flex text-white text-sm gap-1">
                                     <FaUserCircle className="w-5 w-5 text-white" />
                                     {ticket.user.first_name} {ticket.user.last_name}
                                      </span>

                        </div>
                        <div className="mt-1 w-9/12 m-auto">
                                <span className="inline-flex text-white text-sm gap-1">
                                     <IoLogoWhatsapp className="w-5 w-5 text-white" />
                                     {ticket.user.phone}
                                      </span>

                        </div>
                        <div className="mt-1 w-9/12 m-auto">
                                <span className="inline-flex text-white text-sm gap-1">
                                     <FaCalendarAlt className="w-5 w-5 text-white" />
                                     {formatTimeFull(ticket.created_at)}
                                      </span>

                        </div>
                        <div className="mt-1 w-9/12 m-auto flex gap-2">
                            <RiLiveFill  className="w-5 w-5 text-white" />
                             <Link className="text-white text-sm" to={url} target="__black" >{ticket.raffle.summary}</Link>
                        </div>
                </section>
                <section  className="pt-2 h-32" style={{ backgroundColor: '#003B4A'}}>
                        <h3 className="text-white font-bold text-md text-center">Fecha y hora de la rifa</h3>
                        <p className="flex justify-between px-6 mb-2">
                            <span className="text-white font-bold flex gap-2">
                               <BsFillCalendarDateFill /> {formatTimeDate(ticket.raffle.draw_date)}
                            </span>
                            <span className="text-white font-bold flex gap-2">
                                <BsClockFill />
                            {formatTimeDateHour(ticket.raffle.draw_date)}

                            </span>
                        </p>
                        <div className="h-1 bg-repeat-x bg-position-center rounded-full" style={{backgroundImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAACCAYAAAB7Xa1eAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuOWwzfk4AAAAaSURBVBhXY5g7f97/2XPn/AcCBmSMQ+I/AwB2eyNBlrqzUQAAAABJRU5ErkJggg==)'}}>
                        </div>
                        <div className="h-3"></div>
                        <div className="mt-2 mb-0">
                            <p className="w-8/12 h-8 m-auto border-2 border-black 
                            border-dashed bg-white font-black text-primary 
                            flex justify-center items-center
                            ">
                                <span className="mt-1"> {ticket.order} </span>
                            </p>
                        </div>
                </section>
            </div>
        </>
    );
}

export default AppTicket;