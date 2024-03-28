import { createRoot } from 'react-dom/client';
import MainPage from './pages/MainPage';
import { Provider } from 'react-redux';
import store from './store';

const root = createRoot(document.getElementById('root'));

root.render(<Provider store={store}>
    <MainPage />
</Provider>);
