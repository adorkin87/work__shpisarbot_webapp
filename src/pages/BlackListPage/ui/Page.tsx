import { useContext } from 'react';
import { observer } from 'mobx-react-lite';

//styles
import cls from './Page.module.scss';

//components
import AppSeparate from 'src/shared/ui/AppSeparate';
import Title from './Title.tsx';
import BlockingTypes from './BlockingTypes.tsx';
import Blacklist from './Blacklist.tsx';

//stores
import { MainButtonContext, usePresetMBBack } from 'src/entities/mainButton';
import { BLContext } from 'src/entities/blacklist';

const Page = observer(() => {
    const mainButton = useContext(MainButtonContext);
    mainButton.setPreset(usePresetMBBack());

    const blacklist = useContext(BLContext);

    if (blacklist.state === 'error') return <div>Ошибка получения данных</div>;

    if (blacklist.value)
        return (
            <BLContext.Provider value={blacklist}>
                <div className={cls.blackList}>
                    <Title />
                    <BlockingTypes />
                    <AppSeparate />
                    <Blacklist />
                </div>
            </BLContext.Provider>
        );
});

export default Page;
