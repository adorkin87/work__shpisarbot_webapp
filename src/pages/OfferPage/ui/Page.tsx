import { useContext } from 'react';

import cls from './Page.module.scss';

import Title from './Title.tsx';
import Offer from './Offer.tsx';

import { MainButtonContext, usePresetMBBack } from 'src/entities/mainButton';

const Page = () => {
    const mainButton = useContext(MainButtonContext);
    mainButton.setPreset(usePresetMBBack());

    return (
        <div className={cls.page}>
            <Title />
            <Offer />
        </div>
    );
};

export default Page;
