import { formatNumberTwoDigits } from "../../../../../app/utilities/web/formatNumber";
import { formatTimeDate, formatTimeFull } from "../../../../../app/utilities/web/times/formatTimeFull"

const setStateColor = (code) => {
    const status = {
        'CO': {message: 'Completado', style: ''},
        'DR': {message: 'Pendiente', style: 'bg-red-900 text-white p-2 text-sm rounded-xl'},
        'CL': {message: 'Cancelado', style: 'bg-red-600 text-white p-2 text-sm rounded-xl'},
        'AC': {message: 'Activo', style: 'bg-green-600 text-white p-2 text-sm rounded-xl'},
        'DO': {message: 'Inactivo', style: 'bg-red-700 text-white p-2 text-sm rounded-xl'}
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
                    header: 'Nombre de la rifa',
                    render: (item,index) => {
                        return item.raffle.name
                    }
                }, {
                    header: 'Organizador',
                    render: (item,index) => {
                        return item.raffle.user.first_name + ' ' + item.raffle.user.last_name
                    }
                }, {
                    header: 'Fecha del sorteo',
                    render: (item,index) => {
                        return formatTimeFull(item.raffle.draw_date)
                    }
                }, {
                    header: 'Fecha de solicitud',
                    render: (item,index) => {
                        return formatTimeFull(item.created_at)
                    }
                }, {
                    header: 'Estado',
                    render: (item,index) => {
                        return setStateColor(item.status)
                    }
                }, {
                    header: 'Total de ganancia',
                    render: (item,index) => {
                        return `
                            <p class="text-center">
                             <span class="bg-white px-4 py-2 text-black shadow-lg rounded-xl">
                              $${formatNumberTwoDigits(item.total_commissions)}
                             </span>  
                            </p>
                        `; 
                    }
                }, {
                    header: 'Boletos vendidos',
                    render: (item,index) => {
                        return `
                            <p class="text-center">
                             <span class="bg-white px-4 py-2 text-black shadow-lg rounded-xl">
                              ${item.tickets_sales}
                             </span>  
                            </p>
                        `; 
                    }
                }, {
                    header: 'Boletos no validados',
                    render: (item,index) => {
                        return `
                            <p class="text-center">
                             <span class="bg-white px-4 py-2 text-black shadow-lg rounded-xl">
                              ${item.tickets_pending}
                             </span>  
                            </p>
                        `; 
                    }
                }, {
                    header: 'Ventas digitales',
                    render: (item,index) => {
                        return `
                            <p class="text-center">
                             <span class="bg-white px-4 py-2 text-black shadow-lg rounded-xl">
                              ${item.tickets_pos}
                             </span>  
                            </p>
                        `; 
                    }
                }, {
                    header: 'Ventas físicas',
                    render: (item,index) => {
                        return `
                            <p class="text-center">
                             <span class="bg-white px-4 py-2 text-black shadow-lg rounded-xl">
                              ${item.sales_physicals}
                             </span>  
                            </p>
                        `; 
                    }
                }, {
                    header: 'Monto a retribuir',
                    render: (item,index) => {
                        return `
                            <p class="text-center">
                             <span class="bg-white px-4 py-2 text-black shadow-lg rounded-xl">
                              $${formatNumberTwoDigits(item.amount_paid)}
                             </span>  
                            </p>
                        `; 
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