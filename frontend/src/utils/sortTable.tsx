import { SortInfo, Product } from "../types/CommonTypes";

export function sortTable(array: Product[], newSortInfo: SortInfo) {
    const newArray: Product[] = JSON.parse(JSON.stringify(array));
    newArray.sort((a, b) => {
        const aValue = a[newSortInfo.field]
        const bValue = b[newSortInfo.field]
        if (newSortInfo.order === 'asc') {
            if (aValue < bValue) return -1;
            if (aValue > bValue) return 1;
            return 0;
        } else {
            if (aValue > bValue) return -1;
            if (aValue < bValue) return 1;
            return 0;
        }
    });
    return newArray
}
