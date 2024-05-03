import { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';

import cls from './AvailableIntegrationsList.module.scss';

import AvailableIntegration from './AvailableIntegration.tsx';

import IntegrationsContext from '../providers/storeContext.ts';

const AvailableIntegrationsList = observer(() => {
    const integrations = useContext(IntegrationsContext);
    const [expandIntegration, setExpandIntegration] = useState<number | false>(false);

    return (
        <div className={cls.availableIntegrations}>
            <p className={cls.title}>Доступные интеграции</p>
            <div>
                {integrations.value &&
                    integrations.value.available.map((integration: TAvailableIntegration) => (
                        <AvailableIntegration
                            key={integration.provider_id}
                            integration={integration}
                            onExpand={expandIntegration === integration.provider_id}
                            setOnExpand={setExpandIntegration}
                        />
                    ))}
            </div>
        </div>
    );
});

export default AvailableIntegrationsList;
