import { formatTimeFull } from "../../../../app/utilities/web/times/formatTimeFull"

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
                        return item.taxid
                    }
                }, {
                    header: 'Nombres',
                    render: (item,index) => {
                        return item.last_name + ' ' + item.first_name  
                    }
                }, {
                    header: 'Correo electrónico',
                    render: (item,index) => {
                        return item.email
                    }
                }, {
                    header: 'Nº. Celular',
                    render: (item,index) => {
                        return item.phone
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