import { ChangeEvent, FC, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

//styles
import cls from './PaymentForm.module.scss';

//func
import httpClient from 'src/shared/api/httpClient.ts';
import { classNames } from 'src/shared/lib/classNames.ts';

//stores
import balance from 'src/entities/balance';
import { MainButtonContext } from 'src/entities/mainButton';

interface IPaymentForm {
    agree: boolean;
}

const PaymentForm: FC<IPaymentForm> = ({ agree }) => {
    const mainButton = useContext(MainButtonContext);
    const navigate = useNavigate();
    const [amount, setAmount] = useState<number>(2000);

    useEffect(() => {
        if (agree && amount >= 500) {
            mainButton.setParams({ text: 'Пополнить', is_visible: true }, () => {
                httpClient.post('/payment', { payload: { amount } }).then(({ data }) => {
                    if (data.hasOwnProperty('error')) return;
                    Telegram.WebApp.openInvoice(data.link, () => {
                        toast.success('Баланс успешно пополнен');
                        balance.update();
                        navigate('/');
                    });
                });
            });
        } else mainButton.returnFreezeState();

        return () => mainButton.returnFreezeState();
    }, [amount, agree]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setAmount(+e.target.value.replace(/[^0-9]/g, ''));
    };

    //**************************************************************************************************
    //return

    return (
        <div className={cls.paymentForm}>
            <p>Количество минут:</p>
            <div>
                <input
                    type="tel"
                    className={classNames('', { [cls.sumError]: amount < 500 })}
                    value={amount}
                    onChange={handleInputChange}
                />
                <div className={cls.fastInput}>
                    <button onClick={() => setAmount(500)}>500</button>
                    <button onClick={() => setAmount(1000)}>1 000</button>
                    <button onClick={() => setAmount(5000)}>5 000</button>
                    <button onClick={() => setAmount(10000)}>10 000</button>
                </div>
            </div>
            <p>{amount < 500 ? 'Мин. сумма для пополнения - 500р' : `Купить ${amount} мин. за ${amount} руб.`}</p>
        </div>
    );
};

export default PaymentForm;
