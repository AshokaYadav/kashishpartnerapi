import { ISubObject } from "../operator-apis";

export interface IOperatorCommission {
    id: string;
    api_margin: number;
    admin_margin: number;
    distributor_margin: number;
    retailer_margin: number;
    status: 'ACTIVE' | 'INACTIVE';
    createdAt: string;
    updatedAt: string;
    operator: ISubObject;
}