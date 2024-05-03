import { useContext } from 'react';
import { observer } from 'mobx-react-lite';

import cls from './Page.module.scss';

import AppSeparate from 'src/shared/ui/AppSeparate';
import Title from './Title.tsx';
import CurrentIntegrationsList from './CurrentIntegrationsList.tsx';
import AvailableIntegrationsList from './AvailableIntegrationsList.tsx';

import IntegrationsContext from '../providers/storeContext.ts';
import { MainButtonContext, usePresetMBBack } from 'src/entities/mainButton';

const Page = observer(() => {
    const mainButton = useContext(MainButtonContext);
    mainButton.setPreset(usePresetMBBack());

    const integrations = useContext(IntegrationsContext);

    return (
        <IntegrationsContext.Provider value={integrations}>
            <div className={cls.integrations}>
                <Title />
                {integrations.value?.current.length !== 0 && (
                    <>
                        <CurrentIntegrationsList />
                        <AppSeparate />
                    </>
                )}
                <AvailableIntegrationsList />
            </div>
        </IntegrationsContext.Provider>
    );
});

export default Page;
