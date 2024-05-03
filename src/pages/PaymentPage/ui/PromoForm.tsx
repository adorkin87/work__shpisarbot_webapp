import { ChangeEvent, FC, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

//styles
import cls from './PromoForm.module.scss';

//func
import httpClient from 'src/shared/api/httpClient.ts';
import { classNames } from 'src/shared/lib/classNames.ts';

//stores
import { MainButtonContext } from 'src/entities/mainButton';
import balance from 'src/entities/balance';

interface IPromoForm {
    agree: boolean;
}

const PromoForm: FC<IPromoForm> = ({ agree }) => {
    const mainButton = useContext(MainButtonContext);
    const [promo, setPromo] = useState<string>('');
    const [errorInput, setErrorInput] = useState<boolean>(false);

    useEffect(() => {
        if (agree && promo.length >= 3) {
            mainButton.setParams({ text: 'Применить промокод', is_visible: true }, () => {
                httpClient.post('/promo', { payload: { promo } }).then(({ data }) => {
                    if (data.hasOwnProperty('error')) return;
                    toast.success('Промокод успешно применен');
                    setPromo('');
                    balance.update();
                });
            });
        } else mainButton.returnFreezeState();

        return () => mainButton.returnFreezeState();
    }, [agree, promo]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        if (e.target.value.length === 0 || e.target.value.length > 3) setErrorInput(false);
        else setErrorInput(true);

        setPromo(e.target.value);
    };

    return (
        <div className={cls.promoForm}>
            <p>Промокод:</p>
            <div>
                <input
                    type="text"
                    className={classNames('', { [cls.inputError]: errorInput })}
                    placeholder={'Промокод'}
                    value={promo}
                    onChange={handleInputChange}
                />
            </div>
        </div>
    );
};

export default PromoForm;
