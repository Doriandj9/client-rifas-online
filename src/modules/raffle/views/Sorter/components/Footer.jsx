import { useDrawDetails, useRaffleStore } from "../../../../../app/store/app/raffleSorterStore";
import CardTickets from "../../../../../components/CardTickets";

const Footer = () => {
    const raffle = useRaffleStore((state) => state.raffle);
    const ticketsDetails = useDrawDetails((state) => state.drawDetails);
    const updateDrawDetails = useDrawDetails((state) => state.update);
    const ticketsDescartes = JSON.parse(ticketsDetails).tickets_discarded;

    return (
        <>
        <div className="w-full text-center mt-2">
                <span className="px-4 py-2 shadow-md shadow-red-200 text-3xl font-black text-secondary italic rounded-xl"
                >
                    Boletos anulados
                </span>
        </div>
        <div className="flex justify-start pt-4 pb-8">
            <div className="w-full flex gap-2 justify-start ps-12">
               {
                ticketsDescartes.length > 0 &&
                ticketsDescartes.sort((a,b) => a.id - b.id).map((award,i) => {
                    return (
                        <>
                            <CardTickets key={i} award={award.description} discard  lots={award.lost} />
                        </>
                    );
                })
               }
            </div>
        </div>
        </>
    );
}


export default Footer;