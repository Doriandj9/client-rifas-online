
export default {

    //acceso publico
    login: '/api/login',
    register: '/api/register',
    confirm: '/api/register/confirm',
    subscriptions: '/api/subscriptions',
    //acceso login
    logout: '/api/logout',
    //acceso admin
    admin_subscriptions: '/api/admin/subscriptions',
    auth_user_raffles:'/api/admin/authentication/user',
    admin_users: '/api/admin/users',
    admin_user_raffles_auth: '/api/admin/user/raffles/auth',
    admin_auth_raffles: '/api/admin/user/authorization/raffles',
    //acceso usuario rifas
    raffles_update_plans: '/api/raffles/subscriptions/plans',
    raffles_subscriptions_voucher: '/api/raffles/subscriptions/plans/voucher',
    raffles_lottery: '/api/raffles/lottery',
    raffles_list_raffles: '/api/raffles/list/raffles/{taxid}',
    raffles_list_payment_confirm: '/api/raffles/list/confirm/payment/{taxid}',
    raffles_receipts: '/api/raffles/receipt',
    //public
    public_raffles: '/api/public/raffles',
    public_tickets_by_raffles : '/api/public/raffles/tickets/{id}',
    //payment
    public_payment_raffles: '/api/payment/raffle',
};