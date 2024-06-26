import { formatNumberTwoDigits } from "../../../../app/utilities/web/formatNumber";
import { formatTimeFull } from "../../../../app/utilities/web/times/formatTimeFull";

const setStateColor = (code) => {
    const status = {
        'DR': {message: 'Pendiente', style: 'bg-yellow-900 text-white p-2 text-sm rounded-xl'},
        'CL': {message: 'Cancelado', style: 'bg-red-600 text-white p-2 text-sm rounded-xl'},
        'AC': {message: 'Completado', style: 'bg-green-600 text-white p-2 text-sm rounded-xl'},
        'DO': {message: 'En Proceso', style: 'bg-amber-700 text-white p-2 text-sm rounded-xl'}
    };
    const inf = status[code];
    const html = `
    <span class="${inf.style}"> ${inf.message}</span> 
    `;

    return html;
}

export default {
    data(){
        return {
            columns:[
                {
                    header: 'Nº',
                    render: (item,index) => {
                        return index
                    }
                }, {
                    header: 'Solicitante',
                    render: (item,index) => {
                        return item.user.first_name + ' ' + item.user.last_name
                    }
                }, {
                    header: 'Rifa de ingresos',
                    render: (item,index) => {
                        return item.raffle.name
                    }
                }, {
                    header: 'Cédula',
                    render: (item,index) => {
                        return item.user.taxid
                    }
                }, {
                    header: 'Monto a retirar',
                    render: (item,index) => {
                        return `$${formatNumberTwoDigits(item.amount)}`
                    }
                }, {
                    header: 'Estado',
                    render: (item,index) => {
                        return setStateColor(item.status);
                    }
                }, {
                    header: 'Fecha de solicitud',
                    render: (item,index) => {
                        return formatTimeFull(item.created_at)
                    }
                }
                
            ],
            actionColumns: {
                    header: 'Acciones',
                    list:[]
                }
                
        }
    } 
}