import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from 'src/widgets/Header';
import Menu from 'src/widgets/Menu';
import AppSpinner from 'src/shared/ui/AppSpinner';

//pages
import MainPage from 'src/pages/MainPage';
import CallPage from 'src/pages/CallPage';
import CallsPage from 'src/pages/CallsPage';
import PaymentPage from '../../pages/PaymentPage';
import BlackListPage from 'src/pages/BlackListPage';
import AboutPage from 'src/pages/AboutPage';
import OfferPage from 'src/pages/OfferPage';
import IntegrationsPage from 'src/pages/IntegrationsPage';
import TargetSummaryPage from 'src/pages/TargetSummaryPage';

const AppRouter = () => {
    return (
        <>
            <Header />
            <Menu />
            <Suspense fallback={<AppSpinner />}>
                <Routes>
                    <Route path={'/'} element={<MainPage />} />
                    <Route path={'/call'} element={<CallPage />} />
                    <Route path={'/calls'} element={<CallsPage />} />

                    <Route path={'/payment'} element={<PaymentPage />} />
                    <Route path={'/target'} element={<TargetSummaryPage />} />
                    <Route path={'/black-list'} element={<BlackListPage />} />
                    <Route path={'/integrations'} element={<IntegrationsPage />} />
                    <Route path={'/about'} element={<AboutPage />} />
                    <Route path={'/offer'} element={<OfferPage />} />
                </Routes>
            </Suspense>
        </>
    );
};

export default AppRouter;
