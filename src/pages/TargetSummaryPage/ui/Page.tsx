import { useContext } from 'react';
import { observer } from 'mobx-react-lite';

//styles
import cls from './Page.module.scss';

//components
import Title from './Title.tsx';
import TargetList from './TargetList.tsx';

//stores
import { MainButtonContext, usePresetMBBack } from 'src/entities/mainButton';
import TargetPromptContext from '../providers/storeContext.ts';

const Page = observer(() => {
    const mainButton = useContext(MainButtonContext);
    mainButton.setPreset(usePresetMBBack());

    const targetPrompt = useContext(TargetPromptContext);

    return (
        <TargetPromptContext.Provider value={targetPrompt}>
            <div className={cls.target}>
                <Title />
                <TargetList />
            </div>
        </TargetPromptContext.Provider>
    );
});

export default Page;
