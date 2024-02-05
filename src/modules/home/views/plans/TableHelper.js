export default {
    data(){
        return {
            columns:[
                {
                    header: 'Ci',
                    render: (item,index) => {
                        return item.id
                    }
                }, {
                    header: 'Nombre',
                    render: (item,index) => {
                        return item.name
                    }
                }, {
                    header: 'User Name',
                    render: (item,index) => {
                        return item.username
                    }
                }, {
                    header: 'Sitio Web',
                    render: (item,index) => {
                        return item.website
                    }
                }
                
            ],
            actionColumns: {
                    header: 'Accion',
                    list:[]
                }
                
        }
    } 
}