import { useContext } from 'react';

import cls from './About.module.scss';

import Title from './Title.tsx';

import { MainButtonContext, usePresetMBBack } from 'src/entities/mainButton';

const AboutPage = () => {
    const mainButton = useContext(MainButtonContext);
    mainButton.setPreset(usePresetMBBack());

    return (
        <div className={cls.page}>
            <Title />
            <div className={cls.about}>
                <p>
                    Это инструмент который использует нейросети для транскрибации звонков в аудиофайлы, которые затем
                    анализируются и обрабатываются для извлечения ценной информации, содержащейся в телефонных
                    разговорах
                </p>
            </div>
        </div>
    );
};

export default AboutPage;
