import { useContext } from 'react';

import cls from './BlockingTypes.module.scss';

import { cloneDeep } from 'lodash';

import AppSwitch from 'src/shared/ui/AppSwitch';

import { BLContext } from 'src/entities/blacklist';

const BlockingTypes = () => {
    const blacklist = useContext(BLContext);

    const handleSwitch = (field: 'incoming' | 'outgoing'): void => {
        if (!blacklist.value) return;

        const otherField: 'incoming' | 'outgoing' = field === 'incoming' ? 'outgoing' : 'incoming';
        const newValue = cloneDeep(blacklist.value);
        newValue[field] = !newValue[field];

        blacklist.updBlacklist(newValue);

        if (newValue[field] && newValue[otherField]) {
            Telegram.WebApp.showAlert(
                'Анализ звонков отключен:\r\nУстановлена одновременная блокировка всех входящих и исходящих вызовов'
            );
        }
    };

    return (
        <div className={cls.blockingTypes}>
            <p>Блокировать все входящие:</p>
            <AppSwitch value={blacklist.value?.incoming ?? false} setValue={() => handleSwitch('incoming')} />
            <p>Блокировать все исходящие:</p>
            <AppSwitch value={blacklist.value?.outgoing ?? false} setValue={() => handleSwitch('outgoing')} />
        </div>
    );
};

export default BlockingTypes;
