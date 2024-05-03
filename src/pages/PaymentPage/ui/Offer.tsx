import { FC } from 'react';
import { Link } from 'react-router-dom';

import cls from './Offer.module.scss';

import AppCheckbox from 'src/shared/ui/AppCheckbox';

interface IOffer {
    agree: boolean;
    setAgree: (newValue: boolean) => void;
}

const Offer: FC<IOffer> = ({ agree, setAgree }) => {
    return (
        <div className={cls.offer}>
            <AppCheckbox checked={agree} setChecked={setAgree} />
            <div>
                <p>
                    Я принимаю <Link to={'/offer'}>условия оферты</Link>
                </p>
            </div>
        </div>
    );
};

export default Offer;
