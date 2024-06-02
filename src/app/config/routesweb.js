
export default {
    inicio: '/',
    login: '/security/login',
    pay_raffles: 'payment/raffles/:id',
    terms_and_conditions: '/terms-conditions',
    mission_and_vision: '/mission-vision',
    benefits: '/benefits',
    register: '/security/register',
    success_register: '/security/register/success',
    confirm_register: '/security/register/confirm',
    plans: '/plans',
    register_success: '/security/complete-register',
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
            profile: {
                root: 'client/user/profile' 
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
                    confirm_payment: {
                        root: 'payment/confirm',
                        children: {
                            authorization: 'authorization',
                            payments: 'payments'
                        }
                    },
                    membership: 'membership/user',
                    payment_method: {
                        root: 'payment-method',
                        children: {
                            create: 'create',
                            list: 'list'
                        }
                    },
                    sorter_list: 'me/sorter',
                }
            },
            seller: {
                root: 'seller',
                children: {
                    solicitude: {
                        root: 'solicitude',
                        children:{
                            reserve: 'reserve',
                            list: 'list'
                        }
                    },
                    sales_tickets: 'sales-tickets',
                    pos_sales_tickets: '/dashboard/seller/sales-tickets/pos/:id',
                    buys_tickets: 'buys/tickets'
                }

            },
            client: {
                root: 'client',
                children: {
                    tickets: 'tickets',
                    payment_tickets: 'payment-tickets',
                    awards: 'awards',
                    client_profile: 'user/profile',
                    organization_raffles: 'organization/raffles'
                },

            }
        }
    },
    sorter: {
        root: 'raffle/sorter/:id'
    }
}