import { UUID } from "crypto";

export enum StatusEnum {
    ACTIVE, INACTVE
}

export enum UserRolesEnum {
    ADMIN, DISTRIBUTOR, RETAILER
}

export interface UserT {
    userId: UUID,
    mobile: string,
    email: string,
    name: string,
    city: string,
    admin_id: UUID,
    mpin: number,
    distributor_id: UUID,
    status: StatusEnum,
    role: UserRolesEnum,
    url_key?: string,
}

export interface FilterState {
    search: string | '';
    status: string | '';
}

// types.ts
export interface Transaction {
    id: string;
    amount: number;
    type: 'RECHARGE' | 'DEBIT' | 'CREDIT' | 'RECHARGE_COMMISSION' | 'DEBIT_COMMISSION';
    status: 'SUCCESS' | 'FAILED' | 'PENDING';
    msg?: string;
    commission: number;
    opening_balance: number;
    closing_balance: number;
    createdAt: string;
}

export interface TransactionFilters {
    search: string;
    status: string;
    type: string;
}