import { useContext } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Slide, ToastContainer } from 'react-toastify';

import 'src/shared/styles/reset.scss';
import 'src/shared/styles/var.scss';
import 'src/shared/styles/base.scss';

import 'react-toastify/dist/ReactToastify.css';

import AppRouter from './AppRouter/AppRouter.tsx';

import { MainButtonContext } from 'src/entities/mainButton';

const App = () => {
    const tg = Telegram.WebApp;

    if (tg.initData === '') return;

    const mainButton = useContext(MainButtonContext);

    if (tg.platform === 'ios') {
        document.body.style.fontSize = '18px';
    }

    tg.ready();

    return (
        <>
            <MainButtonContext.Provider value={mainButton}>
                <BrowserRouter>
                    <AppRouter />
                </BrowserRouter>
            </MainButtonContext.Provider>
            <ToastContainer
                position={'bottom-center'}
                transition={Slide}
                closeOnClick
                theme={Telegram.WebApp.colorScheme}
            />
        </>
    );
};

export default App;
