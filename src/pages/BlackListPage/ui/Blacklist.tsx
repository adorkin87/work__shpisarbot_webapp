import { useContext } from 'react';

import cls from './Blacklist.module.scss';

import { cloneDeep } from 'lodash';

import BtnDel from 'src/features/BtnDel';
import AddInput from './AddInput.tsx';
import AppNoData from 'src/shared/ui/AppNoData';

import { BLContext } from 'src/entities/blacklist';

const Blacklist = () => {
    const blacklist = useContext(BLContext);

    const handleBtnDel = (index: number): void => {
        if (!blacklist.value) return;

        const newValue = cloneDeep(blacklist.value);
        newValue.blacklist.splice(index, 1);
        blacklist.updBlacklist(newValue);
    };

    return (
        <div className={cls.blacklist}>
            <p className={cls.title}>Черный список</p>
            <AddInput />
            {blacklist.value && (
                <div className={cls.list}>
                    {blacklist.value.blacklist.length === 0 ? (
                        <AppNoData text={'Нет добавленных номеров'} />
                    ) : (
                        blacklist.value.blacklist.map((number: string, index: number) => (
                            <div key={index} className={cls.number}>
                                <p>{number}</p>
                                <BtnDel
                                    onClick={() =>
                                        Telegram.WebApp.showConfirm(
                                            'удалить номер из черного списка?',
                                            (okPressed) => okPressed && handleBtnDel(index)
                                        )
                                    }
                                />
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default Blacklist;
