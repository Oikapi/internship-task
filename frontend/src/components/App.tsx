import { Container } from '@mui/material';
import MainTable from './Table';

function App() {
    const tableData = [
        { name: 'product 1', price: 10.99, count: 5 },
        { name: 'PRODUCT 2', price: 24.99, count: 5 },
        { name: 'Product 3', price: 32.50, count: 5 },
        { name: 'Product 4', price: 15.75, count: 5 },
    ];
    return (
        <>
            <Container maxWidth="md">
                <MainTable tableData={tableData} />
            </Container>
        </>
    )
}

export default App