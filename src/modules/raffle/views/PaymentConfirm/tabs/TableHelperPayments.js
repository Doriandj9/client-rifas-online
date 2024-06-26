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
                    header: 'Doc. Identidad',
                    render: (item,index) => {
                        return item.user.taxid
                    }
                }, {
                    header: 'Nombres',
                    render: (item,index) => {
                        return item.user.first_name +' ' + item.user.last_name.split(' ')[0]
                    }
                }, {
                    header: 'Correo electrónico',
                    render: (item,index) => {
                        return item.user.email
                    }
                }, {
                    header: 'Nº. Celular',
                    render: (item,index) => {
                        return item.user.phone
                    }
                }, {
                    header: 'Estado',
                    render: (item,index) => {
                        return item.status === 'CL' ? 'Rechazado' : 'Aprobado'
                    }
                }, {
                    header: 'Fecha de registro',
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