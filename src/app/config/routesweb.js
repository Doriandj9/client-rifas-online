
export default {
    inicio: '/',
    login: '/security/login',
    pay_raffles: 'payment/raffles/:id',
    register: '/security/register',
    success_register: '/security/register/success',
    confirm_register: '/security/register/confirm',
    plans: '/plans',
    company_policy: '/company-policy',
    recovery_password: '/recovery/password',
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
            authentication_raffles: {
                root: 'authentication/raffles',
            },
            payment_method: {
                root: 'payment-method',
                children: {
                    create: 'create',
                    list: 'list'
                }
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
                    },
                    confirm_payment: 'payment/confirm',
                    payment_method: {
                        root: 'payment-method',
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
                root: 'client',
                children: {
                    tickets: 'tickets',
                    payment_tickets: 'payment-tickets',
                    awards: 'awards'
                },

            }
        }
    }
}