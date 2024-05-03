import { FC, useContext, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

//styles
import cls from './Page.module.scss';

//components
import AppSwitch from 'src/shared/ui/AppSwitch';
import Title from './Title.tsx';
import PaymentForm from './PaymentForm.tsx';
import PromoForm from './PromoForm.tsx';
import Offer from './Offer.tsx';

//hooks
import useStretchToBottom from 'src/shared/hooks/useStretchToBottom.tsx';

//stores
import { MainButtonContext } from 'src/entities/mainButton';

const Page: FC = () => {
    const mainButton = useContext(MainButtonContext);
    const location = useLocation();
    const navigate = useNavigate();

    const [onPromo, setOnPromo] = useState<boolean>(false);
    const [agree, setAgree] = useState<boolean>(false);

    const ref = useRef<HTMLDivElement>(null);
    useStretchToBottom({ ref });

    useEffect(() => {
        mainButton.setParams(
            { text: location.key === 'default' ? 'На главную' : 'Назад', is_visible: true },
            (): void => {
                location.key === 'default' ? navigate('/') : navigate(-1);
            }
        );
        mainButton.setFreezeState();
    }, []);

    //**************************************************************************************************
    //return

    return (
        <div ref={ref} className={cls.paymentPage}>
            <div>
                <Title />
                <div className={cls.promo}>
                    <p>Использовать промокод</p>
                    <AppSwitch value={onPromo} setValue={setOnPromo} />
                </div>
                {onPromo ? <PromoForm agree={agree} /> : <PaymentForm agree={agree} />}
            </div>
            <Offer agree={agree} setAgree={setAgree} />
        </div>
    );
};

export default Page;
