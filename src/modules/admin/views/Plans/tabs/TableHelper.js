import { formatTimeFull } from "../../../../../app/utilities/web/times/formatTimeFull"

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
                    header: 'Título',
                    render: (item,index) => {
                        return item.title
                    }
                }, {
                    header: 'Asunto',
                    render: (item,index) => {
                        return item.subject
                    }
                }, {
                    header: 'Precio',
                    render: (item,index) => {
                        return item.price
                    }
                }, {
                    header: 'Mínimo de tickets',
                    render: (item,index) => {
                        return item.minimum_tickets
                    }
                },  {
                    header: 'Máximo de tickets',
                    render: (item,index) => {
                        return item.maximum_tickets
                    }
                }, {
                    header: 'Rifas permitidas',
                    render: (item,index) => {
                        return item.number_raffles
                    }
                }, {
                    header: 'Rifas ilimitadas',
                    render: (item,index) => {
                        return item.is_unlimited ? 'SI' : 'NO'
                    }
                }, {
                    header: 'Fecha de creación',
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