import { OrderBy } from "@/types/CommonTypes";

interface SortButtonsProps {
    currSort: OrderBy;
    callback: (orderBy: OrderBy, index: number) => void;
    index: number;
}

function SortButtons({ currSort, callback, index }: SortButtonsProps) {

    return (
        <button onClick={() => callback(currSort, index)}>
            {currSort === "asc" ? "Вверх" : "Вниз"}
        </button>
    )
}

export default SortButtons