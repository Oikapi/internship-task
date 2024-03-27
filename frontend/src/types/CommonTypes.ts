
export interface TableProps {
    tableData: TableDataItem[];
}

export interface TableDataItem {
    name: string;
    price: number;
    count: number;
}

export type OrderBy = 'asc' | 'desc';