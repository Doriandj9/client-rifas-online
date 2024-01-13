
export default {
    inicio: '/',
    login: '/security/login',
    register: '/security/register',
    success_register: '/security/register/success',
    confirm_register: '/security/register/confirm',
    plans: '/#plans',
    admin:{
        root: '/admin',
        children: {
            plans: {
                root: 'plans',
                children: {
                    create: 'create',
                    view: 'list'
                }

            },
            authentication: {
                root: 'authentication/user',
            },
            dashboard: {
                root: 'dashboard'
            },
            reports: {
                root: 'reports'
            },
            users: {
                root: 'users'
            },
            passwords: {
                root: 'passwords'
            },
            
        }
    },
    dashboard: {
        root: '/dashboard',
        children: {
            raffles: {
                root: 'raffles',
                children: {
                    plans: 'update/plans',
                    lottery: {
                        root: 'lottery',
                        children: {
                            create: 'create',
                            list: 'list'
                        }
                    }
                }
            },
            seller: {

            },
            client: {

            }
        }
    }
}