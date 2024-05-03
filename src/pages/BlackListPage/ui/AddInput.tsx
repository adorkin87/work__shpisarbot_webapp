import { ChangeEvent, useContext, useEffect, useState } from 'react';

import cls from './AddInput.module.scss';

import { cloneDeep } from 'lodash';

import BLContext from '../../../entities/blacklist/providers/BLContext.ts';
import { MainButtonContext } from 'src/entities/mainButton';

const AddInput = () => {
    const mainButton = useContext(MainButtonContext);

    const blacklist = useContext(BLContext);
    const [addNumber, setAddNumber] = useState<string>('');

    const handleBtnAdd = (): void => {
        if (!blacklist.value) return;

        if (blacklist.value.blacklist.includes(addNumber)) {
            Telegram.WebApp.showAlert('Номер уже есть в черном списке');
            return;
        }

        const newValue = cloneDeep(blacklist.value);
        newValue.blacklist.unshift(addNumber);
        blacklist.updBlacklist(newValue);
        setAddNumber('');
        mainButton.returnFreezeState();
    };

    const handleBtnClear = (): void => {
        setAddNumber('');
        mainButton.returnFreezeState();
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        if (!addNumber && e.target.value !== '') mainButton.setFreezeState();
        if (e.target.value === '' && addNumber) mainButton.returnFreezeState();
        setAddNumber(e.target.value);
    };

    useEffect(() => {
        if (addNumber) mainButton.setParams({ text: 'Добавить номер в ЧС', is_visible: true }, handleBtnAdd);
    }, [addNumber]);

    //**************************************************************************************************
    //return

    return (
        <div className={cls.addInput}>
            <div className={cls.icon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.0901 12.5C9.65853 11.8155 9.32211 11.0753 9.09012 10.3L10.6801 8.71004C10.7738 8.61708 10.8482 8.50647 10.899 8.38462C10.9498 8.26276 10.9759 8.13205 10.9759 8.00004C10.9759 7.86803 10.9498 7.73732 10.899 7.61546C10.8482 7.4936 10.7738 7.383 10.6801 7.29004L6.68012 3.29004C6.49275 3.10379 6.2393 2.99925 5.97512 2.99925C5.71093 2.99925 5.45748 3.10379 5.27012 3.29004L2.59012 6.00004C2.40054 6.18846 2.25065 6.41297 2.14932 6.6603C2.04798 6.90763 1.99725 7.17277 2.00012 7.44004C2.08627 10.9453 3.36295 14.3169 5.62012 17L2.30012 20.29L3.71012 21.71L21.7101 3.71004L20.3001 2.29004L10.0901 12.5ZM7.00012 15.55C5.12457 13.2486 4.06902 10.3881 4.00012 7.42004L6.00012 5.42004L8.59012 8.00004L7.30012 9.29004C7.18165 9.4085 7.09484 9.55482 7.04767 9.71557C7.00049 9.87632 6.99445 10.0463 7.03012 10.21C7.3336 11.5433 7.88299 12.8082 8.65012 13.94L7.00012 15.55ZM16.7101 13.29C16.5228 13.1038 16.2693 12.9992 16.0051 12.9992C15.7409 12.9992 15.4875 13.1038 15.3001 13.29L13.7001 14.89L13.3601 14.77L11.8001 16.32C12.4463 16.5979 13.1155 16.8188 13.8001 16.98C13.9623 17.0139 14.1304 17.007 14.2892 16.9599C14.448 16.9128 14.5927 16.8269 14.7101 16.71L16.0101 15.41L18.5901 18L16.5901 20C14.2673 19.9396 11.9986 19.2855 10.0001 18.1L8.57012 19.55C10.9646 21.0785 13.7304 21.9255 16.5701 22C16.835 22.0029 17.0978 21.9531 17.3433 21.8535C17.5888 21.7539 17.812 21.6066 18.0001 21.42L20.7101 18.71C20.8038 18.6171 20.8782 18.5065 20.929 18.3846C20.9798 18.2628 21.0059 18.1321 21.0059 18C21.0059 17.868 20.9798 17.7373 20.929 17.6155C20.8782 17.4936 20.8038 17.383 20.7101 17.29L16.7101 13.29Z" />
                </svg>
            </div>
            <input type={'tel'} placeholder={'Добавить номер'} value={addNumber} onChange={handleInputChange} />
            {addNumber && (
                <button onClick={handleBtnClear}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.192 6.34399L11.949 10.586L7.70697 6.34399L6.29297 7.75799L10.535 12L6.29297 16.242L7.70697 17.656L11.949 13.414L16.192 17.656L17.606 16.242L13.364 12L17.606 7.75799L16.192 6.34399Z" />
                    </svg>
                </button>
            )}
        </div>
    );
};

export default AddInput;
