
export interface Retailer {
    retailor_url_id: string,
    id: string,
    name: string,
    mobile: string,
    email: string,
    city: string,
    status: string,
    role: string,
}


export interface Distributor {
    id: string,
    name: string,
    mobile: string,
    email: string,
    city: string,
    status: string,
    role: string,
    admin_id: string,
}