export interface ISubObject {
    id: string;
    name: string;
}



export interface IOperatorApi {
    id: string;
    code: string;
    status: string;
    createdAt?: string;
    updatedAt?: string;
    operator: ISubObject;
    api: ISubObject;
    isModified?: boolean;
}

export type TNewOperatorApi = Omit<IOperatorApi, 'id'>;