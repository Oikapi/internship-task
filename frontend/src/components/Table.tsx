import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, Modal, Box } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import "./style.css"
import { useEffect, useState } from 'react';
import SortButtons from './SortButtons';
import { TableDataItem, OrderBy, TableProps } from '@/types/CommonTypes';

function sortTable(array: TableDataItem[], fieldIndex: number, orderBy: OrderBy) {
    console.log(array, fieldIndex, orderBy)
    array.sort((a, b) => {
        const aValue = Object.values(a)[fieldIndex];
        const bValue = Object.values(b)[fieldIndex];
        console.log(aValue, bValue)
        if (orderBy === 'asc') {
            if (aValue < bValue) return -1;
            if (aValue > bValue) return 1;
            return 0;
        } else {
            if (aValue > bValue) return -1;
            if (aValue < bValue) return 1;
            return 0;
        }
    });
    console.log(array)
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};


function MainTable({ tableData }: TableProps) {
    const [orderBy, setOrderArray] = useState<OrderBy[]>(["asc", "asc", "asc"]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [mainArr, setMainArr] = useState<TableDataItem[]>([]);
    const sortClickHandler = (orderBy: OrderBy, fieldIndex: number) => {
        // console.log("gsdf")
        changeOrderArray(fieldIndex, orderBy);
        sortTable(mainArr, fieldIndex, orderBy);
    }
    useEffect(() => {
        setMainArr(tableData);
    }, [])

    const changeOrderArray = (index: number, newOrder: OrderBy) => {
        setOrderArray(prev => prev.map((el, elIndex) => {
            if (elIndex === index) {
                return newOrder === "asc" ? "desc" : "asc"
            }
            return el
        })
        )
    }

    const deleteButtonCLickHandler = (index: number) => {
        setMainArr(prev => prev.filter((el, elIndex) => elIndex !== index))
    }

    return (
        <>
            <div className='Menu'>
                <input
                    placeholder='Фильтр по подстроке в имени товара'
                ></input>
                <button onClick={() => setModalOpen(true)}>Add New</button>
            </div >
            <TableContainer component={Paper}>
                <Table className='table'>
                    <TableHead>
                        <TableRow className="table-header">
                            <TableCell style={{ width: '100px' }} colSpan={2}>
                                Name
                                <SortButtons currSort={orderBy[0]} callback={sortClickHandler} index={0} />
                            </TableCell>
                            <TableCell>
                                Price
                                <SortButtons currSort={orderBy[1]} callback={sortClickHandler} index={1} />
                            </TableCell>
                            <TableCell style={{ width: '30%' }} colSpan={2}>
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {mainArr.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell style={{ borderRight: "none" }} align='justify'>
                                    <div>{item.name}</div>
                                </TableCell>
                                <TableCell style={{ borderLeft: "none" }} align='right'>
                                    <div>{item.count}</div>
                                </TableCell>
                                <TableCell>{item.price}</TableCell>
                                <TableCell style={{ borderRight: "none" }} align='right'>
                                    <button className='btn'>Edit</button>
                                </TableCell>
                                <TableCell style={{ borderLeft: "none" }} align='left'>
                                    <button className='btn' onClick={() => deleteButtonCLickHandler(index)}>Delete</button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Modal
                open={isModalOpen}
                onClose={() => setModalOpen(false)}
            >
                <Box sx={{ ...style, width: 400 }}>
                    <form className='Modal-Table-form'>
                        <label>
                            Name:
                            <div><input /> <span>Required</span></div>
                        </label>
                        <label>
                            Supplied email:
                            <div><input /> <span>Required</span></div>

                        </label>
                        <label>
                            Count:
                            <input />
                        </label>
                        <label>
                            Price:
                            <input />
                        </label>
                        <button type='submit'>Add/Update</button>
                    </form>
                </Box>

            </Modal>
        </>
    )
}

export default MainTable