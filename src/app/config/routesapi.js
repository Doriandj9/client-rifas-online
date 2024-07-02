
export default {

    //acceso publico
    login: '/api/login',
    register: '/api/register',
    confirm: '/api/register/confirm',
    user_profile: '/api/user/profile/{id}',
    user_avatar: '/api/user/avatar/{id}',
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
    raffles_income: '/api/raffles/income',
    raffles_list_payment_confirm: '/api/raffles/list/confirm/payment/{taxid}',
    raffles_receipts: '/api/raffles/receipt',
    raffle_bank_accounts_by_user: '/api/raffles/bank-accounts/user/{user_id}',
    raffle_bank_accounts:'/api/raffles/me/bank-accounts',
    raffle_custom_lottery_update: '/api/raffles/custom/update/{id}',
    raffle_commissions: '/api/raffles/commissions/seller',
    raffle_payments_receipts: '/api/raffles/payments/receipts/{taxid}',
    raffle_payments_receipts_resend_mail: '/api/raffles/payments/receipts/{receipt_id}',
    raffle_complete: '/api/raffles/complete/{id}',
    raffles_plans_card: '/api/card-transaction/plans',
    raffles_me_income: '/api/raffles/me/income/{id}',
    //public
    public_raffles: '/api/public/raffles',
    public_tickets_by_raffles : '/api/public/raffles/tickets/{id}',
    public_recovery_password: '/api/public/recovery/password',
    //payment
    public_payment_raffles: '/api/payment/raffle',
    payment_tickets_credit: '/api/payment/tickets/card-transaction',
    //config
    refresh_data_user: '/api/refresh/user',

    //acceso de  clientes
    client_tickets_by_user:'/api/client/me/tickets/{taxid}', 
     //acceso de  afiliados
    seller_raffles: '/api/seller/raffles',
    seller_commissions_by_user: '/api/seller/commission/by-user/{taxid}',
    seller_commissions: '/api/seller/me/commissions',
    seller_payment_tickets: '/api/seller/receipts',
    seller_sales: '/api/seller/sales/{taxid}',
};