
type TableMenuProps = {
    onInputChange: (value: string) => void;
    onClick: () => void;
    inputValue: string;
}


function TableMenu({ onInputChange, onClick, inputValue }: TableMenuProps) {
    return (
        <div className='Menu'>
            <input
                defaultValue={inputValue}
                onChange={(e) => onInputChange(e.target.value)}
                placeholder='Фильтр по подстроке в имени товара'
            ></input>
            <button className="btn" onClick={() => onClick()}>Add New</button>
        </div >
    )
}

export default TableMenu