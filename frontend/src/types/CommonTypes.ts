export type Product = {
    id: number;
    name: string;
    price: number;
    email: string;
    count: number;
}

export type FormValues = {
    name: string;
    email: string;
    count: string;
    price: string;
};


export type SortInfo = {
    field: 'name' | 'price';
    order: SortOrder;
};


export type SortOrder = 'asc' | 'desc';