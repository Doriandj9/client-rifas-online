import { MdLockReset } from "react-icons/md";
import { FaUserLargeSlash } from "react-icons/fa6";
import { FaExternalLinkSquareAlt } from "react-icons/fa";
import { FaThumbsDown } from "react-icons/fa6";
import { RiMoneyDollarBoxFill } from "react-icons/ri";

export default [
    {
        name: 'Información de venta.',
        icon: FaExternalLinkSquareAlt,
        color: 'purple.700',
        element: null,
        onclick: () => {
            console.log('click | Editar');
        }
    },
    {
     name: 'Darme de baja.',
     icon: FaThumbsDown,
     color: 'red.700',
     element: null,
     onclick: () => {
         console.log('click | Editar');
     }
 },
 {
    name: 'Verificar pago.',
    icon: RiMoneyDollarBoxFill,
    color: 'gray.700',
    element: null,
    validation: (item) => {
        console.log(item);
        return item.status === 'CO' ? 'animate animate-bounce' : ''
    },
    onclick: () => {
        console.log('click | Editar');
    }
}
];