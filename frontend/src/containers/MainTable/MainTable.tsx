import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import "./table.css"
import { useEffect, useState } from 'react';
import SortButtons from '../../components/SortButtons/SortButtons';
import { SortInfo } from '../../types/CommonTypes';
import { useAppSelector } from '../../hooks/useAppSelector';
import { sortTable } from '../../utils/sortTable';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { deleteProduct } from '../../store/productsSlice';
import { NumericFormat } from 'react-number-format';

type MainTableProps = {
    onEdit: ({ }) => void
    filterInput: string; // Только filterInput
}


function MainTable({ onEdit, filterInput }: MainTableProps) {
    const productsList = useAppSelector(state => state.products.list);
    console.log(productsList)
    const [preparedList, setPreparedList] = useState([])
    const [sortInfoList, setSortInfoList] = useState<SortInfo[]>([{ field: "name", order: "asc" }, { field: "price", order: "asc" }]);
    const dispatch = useAppDispatch();
    useEffect(() => {
        // setPreparedList(productsList)
        sortInfoList.forEach(el => setPreparedList(sortTable(productsList, el)))
    }, [productsList])

    useEffect(() => {
        setPreparedList(productsList.filter(el => el.name.toLocaleLowerCase().includes(filterInput.toLocaleLowerCase())));
    }, [filterInput, productsList])

    const sortClickHandler = (newSortInfo: SortInfo) => {
        changeOrderArray(newSortInfo);
        setPreparedList(sortTable(preparedList, newSortInfo));
    }

    const changeOrderArray = (newSortInfo: SortInfo) => {
        setSortInfoList(prev => prev.map(el => {
            if (el.field === newSortInfo.field) {
                el.order = newSortInfo.order === "asc" ? "desc" : "asc"
            }
            return el
        })
        )
    }

    const deleteButtonCLickHandler = (id: number) => {
        dispatch(deleteProduct(id));
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table className='table'>
                    <TableHead>
                        <TableRow className="table-header">
                            <TableCell style={{ width: '100px' }} colSpan={2}>
                                <div className='Table-header-with-option'>
                                    Name
                                    <SortButtons sortInfo={sortInfoList[0]} callback={sortClickHandler} />
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className='Table-header-with-option'>
                                    Price
                                    <SortButtons sortInfo={sortInfoList[1]} callback={sortClickHandler} />
                                </div>
                            </TableCell>
                            <TableCell style={{ width: '30%' }} colSpan={2}>
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {preparedList.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell style={{ borderRight: "none" }} align='justify'>
                                    <div>{item.name}</div>
                                </TableCell>
                                <TableCell style={{ borderLeft: "none" }} align='right'>
                                    <div>
                                        <span className='count-span'>
                                            {item.count}
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell><NumericFormat
                                    thousandSeparator
                                    prefix="$"
                                    allowNegative={false} displayType="text" value={item.price} />
                                </TableCell>
                                <TableCell style={{ borderRight: "none" }} align='right'>
                                    <button className='btn'
                                        onClick={() => onEdit(item)}
                                    >Edit</button>
                                </TableCell>
                                <TableCell style={{ borderLeft: "none" }} align='left'>
                                    <button className='btn' onClick={() => deleteButtonCLickHandler(item.id)}>Delete</button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default MainTable