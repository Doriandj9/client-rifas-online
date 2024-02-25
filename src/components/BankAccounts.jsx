import { BsBank } from "react-icons/bs";
import { FaPassport, FaPiggyBank } from "react-icons/fa";
import { GrMoney } from "react-icons/gr";
import { MdOutlineAssignmentInd } from "react-icons/md";
import { credentials } from "../app/config/app";

const BankAccounts = ({bankAccounts}) => {

    return (
        <>
        {bankAccounts.map(account => {
                                return <div key={account.id} className="flex items-center flex-col md:flex-row">
                                    <section className="w-full">
                                        <div className="flex gap-4 md:flex-row flex-col mb-5">
                                        <p className="w-full flex gap-2 text-xl">
                                            <span className="font-bold flex gap-2 block"> 
                                                <BsBank className="text-green-600" /> Entidad Bancaria: 
                                            </span> 
                                            <span className="text-primary">
                                                {account.bank_name}
                                            </span>
                                        </p>
                                        <p className="w-full flex gap-2 text-xl">
                                            <span className="font-bold flex gap-2 block">
                                            <FaPiggyBank className="text-green-600" />
                                                Tipo Cuenta: 
                                            </span> 
                                            <span className="flex-grow text-primary"> {account.type} </span>
                                        </p>
                                        </div>
                                        <div className="flex gap-4 md:flex-row flex-col mb-5">
                                        <p className="w-full flex gap-2 text-xl">
                                            <span className="font-bold flex gap-2 block">
                                            <GrMoney className="text-green-600" />
                                                Nº Cuenta: 
                                            </span> 
                                            <span className="flex-grow text-primary"> {account.account_number} </span>
                                        </p>
                                       
                                        <p className="w-full flex gap-2 text-xl">
                                            <span className="font-bold flex gap-2 block">
                                                <FaPassport className="text-green-600" />
                                                Nº de Cédula: 
                                            </span> 
                                            <span className="flex-grow text-primary"> {account.taxid} </span>
                                        </p>
                                        </div>
                                        <div className="flex gap-4 md:flex-row flex-col">
                                        <p className="w-full flex gap-2 text-lg md:text-xl">
                                            <span className="font-bold flex gap-2 block">
                                                <MdOutlineAssignmentInd className="text-green-600" />
                                                Nombre de Cuenta:
                                            </span> 
                                            <span className="text-primary"> {account.name_account} </span>
                                        </p>
                                        </div>
                                    </section>
                                <div className="p-2 lg:w-80 mb-2">
                                    {
                                        account.qr_image ? <a target="__blank"
                                        href={credentials.server + account.qr_image}>
                                            <img className="block w-40 h-40 max-w-full max-h-full shadow-lg"
                                            src={credentials.server + account.qr_image} alt="auth" />
                                        </a> 
                                        : 
                                        <div className="font-bold text-secondary">
                                            {/* No se ha registrado la imagen QR. */}
                                        </div>
                                    }
                                    
                                </div>
                                </div>
                            })}
        </>
    );
}


export default BankAccounts;