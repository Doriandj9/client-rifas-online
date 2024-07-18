import { Avatar, ChakraProvider } from "@chakra-ui/react";
import { formatTimeDate } from "../app/utilities/web/times/formatTimeFull";
import { credentials } from "../app/config/app";


const Comments = ({rating}) => {
    const name = rating.user.first_name.toLowerCase().split(' ')[0] + rating.user.last_name.toLowerCase().split(' ')[0];
    
    return (
        <>
        <div className="flex shadow p-2 rounded-md gap-1">
            <div className="w-16 flex justify-center">
             <Avatar size={'sm'} name={rating.user.first_name.split(' ')[0] + ' ' + rating.user.last_name.split(' ')[0]}
              src={credentials.server + rating.user.avatar}
               />       
            </div>
            <div>
                <header className="w-full">
                    <span className="text-xs text-black font-bold" > @{name} </span>
                    <span className="text-xs text-gray-500">{formatTimeDate(rating.created_at)}</span>
                </header>
                <p className="text-sm text-black">
                    {rating.comment}
                </p>
                <aside>
                </aside>
            </div>
        </div>
        </>
    );
}


export default Comments;