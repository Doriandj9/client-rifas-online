import { useDrawDetails, useRaffleStore } from "../../../../../app/store/app/raffleSorterStore";
import CardTickets from "../../../../../components/CardTickets";

const Header = () => {
    const ticketsWinnerJSON = useDrawDetails((state) => state.drawDetails);
    const updateDrawDetails = useDrawDetails((state) => state.update);
    const ticketsWinner = JSON.parse(ticketsWinnerJSON).tickets_winner;

    const handleClickWinner = (award,complete) => {
        if(complete)return;
        
        const tickets = JSON.parse(ticketsWinnerJSON)
        .tickets_winner.map((item) => {

            if(item.description.id  === award.id) {
                item.selected = true;
            } else {
                item.selected = false;
            }

            return item;
        });
        let results = {...JSON.parse(ticketsWinnerJSON)};
        results.tickets_winner = tickets;
        updateDrawDetails(JSON.stringify(results));
    }
   
    return (
        <>
        <div className="w-full text-center mt-2">
                <span className="px-4 py-2 shadow-md shadow-sky-200 text-3xl font-black text-primary italic rounded-xl"
                >
                    Boletos ganadores
                </span>
        </div>
        <div className="flex justify-end pt-4">
            <div className="w-11/12 flex gap-2 justify-end pr-12">
               {
                ticketsWinner.length > 0 &&
                ticketsWinner.map((item,i) => {
                    const award = item.description;

                    return (
                            <CardTickets key={award.id} selected={item.selected} award={award} winner={item.winner} handleClick={(e) => handleClickWinner(award,item.complete)} />
                    );
                })
               }
            </div>
        </div>
        </>
    );
}

export default Header;