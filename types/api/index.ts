
export type HttpMethod = 'get' | 'post' | 'put' | 'delete';
export enum EHttpMethod { get = 'get', post = 'post', put = 'put', delete = 'delete' }

export type APITYPES = 'RECHARGE' | 'SMS' | 'DISPUTE' | 'PLANS';
export enum EAPITYPES { RECHARGE = 'RECHARGE', SMS = 'SMS', DISPUTE = 'DISPUTE', PLANS = 'PLANS' };

export interface IGateway {
    id?: number;
    name: string;
    url: string;
    method: HttpMethod;
    password: string;
    transactionPassword: string;
    disputeEmail: string;
    isActive: boolean;
}

export interface INewApiRequest {
    name: string,
    url: string,
    method: EHttpMethod,
    password: string,
    transaction_password: string,
    dispute_email: string
}


export interface GatewayErrors {
    name?: string;
    url?: string;
    method?: string;
    password?: string;
    transactionPassword?: string;
}

// Used for managing dialog states
export interface DialogState {
    add: boolean;
    update: boolean;
}

export interface IApi {
    type: string,
    id: string,
    params: { [key: string]: string },
    name: string,
    url: string,
    method: string,
    dispute_email: string,
    status: string
    created_by: string,
    password: string;
    transaction_password: string;
}

export interface IApiWallet {
    id: string;
    balance: number;
    api_id: string;
    updatedAt: string;
    createdAt: string;
}

export interface IUpdateApiRequest {
    id: string;
    [key: string]: string;
}