export interface Operator {
    category_id: string;
    id: string;
    name: string;
    status: 'ACTIVE' | 'INACTIVE'
    createdAt: string;
    updatedAt: string;
    image_url?: string;
}