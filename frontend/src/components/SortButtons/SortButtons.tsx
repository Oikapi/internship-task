import { SortInfo } from "../../types/CommonTypes";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import "./sortButtons.css"

interface SortButtonsProps {
    sortInfo: SortInfo;
    callback: (sortInfo: SortInfo) => void;
}

function SortButtons({ sortInfo, callback }: SortButtonsProps) {

    return (
        <button onClick={() => callback(sortInfo)} className="Sort-buttons">
            {sortInfo.order === "asc" ? <PlayArrowIcon sx={{ rotate: "90deg" }} /> : <PlayArrowIcon sx={{ rotate: "270deg" }} />}
        </button>
    )
}

export default SortButtons