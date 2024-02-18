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
import routesweb from "../../config/routesweb";
import { IoInformationCircle } from "react-icons/io5";
const AppTicket = ({size, ticket}) => {
    const url = '/' + routesweb.pay_raffles.replace(':id', ticket.raffle.id);

    return (
        <>
            <div className="bg-primaryop-500 pt-[0.25rem] px-[0.15rem] w-72 rounded-lg shadow-md shadow-black">
                <section className="w-70 h-20 bg-white rounded-t-lg">
                        <div className="w-full flex justify-between items-center pt-2">
                            <GoAlertFill className="text-4xl text-primary ms-2" />
                            <img src={logo} className="w-20 h-12" alt="" />
                            <BiWorld className="text-4xl text-primary mr-2" />
                        </div>
                </section>
                <section className="bg-primary h-52 overflow-hidden" >
                        <h3 className="text-white text-center pt-2 text-sm font-bold"> {ticket.raffle.name} </h3>
                        <div className="mt-4 w-9/12 m-auto flex gap-2">
                            <IoInformationCircle  className="w-5 w-5 text-yellow-300" />
                             <Link className="text-white text-sm" to={url} target="__black" >Más información</Link>
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
                </section>
                <section  className="pt-2 h-32" style={{ backgroundColor: '#003B4A'}}>
                        <p className="flex justify-between px-6 mb-2">
                            <span className="text-white font-bold">
                                {formatTimeDate(ticket.raffle.draw_date)}
                            </span>
                            <span className="text-white font-bold">
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