import ModalAddNew from '../components/ModalAddNew/ModalAddNew';
import TableMenu from '../components/TableMenu/TableMenu';
import MainTable from '../containers/MainTable/MainTable';
import { Container } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { addNewProduct, editProduct, fetchProducts } from '../store/productsSlice';
import { FormValues, Product } from '../types/CommonTypes';
// import { TableDataItem, OrderBy } from '@/types/CommonTypes';
// import { sortTable } from '@/utils/sortTable';

function MainPage() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [filterInput, setFilterImput] = useState("");
    const dispatch = useAppDispatch();
    const [modalInfo, setModalInfo] = useState<Product | any>()

    const onEdit = (product: FormValues) => {
        setModalInfo(product);
        setModalOpen(true);
    }
    const onAddnew = () => {
        setModalInfo({});
        setModalOpen(true);
    }
    useEffect(() => {
        dispatch(fetchProducts());
    }, [])

    return (
        <>
            <Container maxWidth="md">
                <TableMenu
                    inputValue={filterInput}
                    onInputChange={setFilterImput}
                    onClick={onAddnew} />
                <MainTable
                    onEdit={onEdit}
                    filterInput={filterInput} />
            </Container>
            <ModalAddNew
                onAddNew={(body) => dispatch(addNewProduct(body))}
                onEdit={(body) => dispatch(editProduct(body))}
                modalInfo={modalInfo}
                isModalOpen={isModalOpen}
                setModalOpen={setModalOpen} 
            />
        </>
    )
}

export default MainPage