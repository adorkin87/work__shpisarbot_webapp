import { useContext } from 'react';
import { observer } from 'mobx-react-lite';

import cls from './CurrentIntegrationsList.module.scss';

import IntegrationsContext from 'src/pages/IntegrationsPage/providers/storeContext.ts';
import BtnDel from 'src/features/BtnDel';

const CurrentIntegrationsList = observer(() => {
    const integrations = useContext(IntegrationsContext);

    const handleBtnDel = (int_id: number): void => {
        integrations.delete(int_id);
    };

    return (
        <div className={cls.curIntegrations}>
            <p className={cls.title}>Подключенные интеграции</p>
            <div className={cls.integrations}>
                {integrations.value &&
                    integrations.value.current.map((integration: TCurrentIntegration) => (
                        <div key={integration.int_id} className={cls.integration}>
                            <div>
                                <p>{integration.name}</p>
                                <p>{integration.pbx}</p>
                            </div>
                            <BtnDel
                                onClick={() =>
                                    Telegram.WebApp.showConfirm(
                                        'Удалить интеграцию?',
                                        (okPressed) => okPressed && handleBtnDel(integration.int_id)
                                    )
                                }
                            />
                        </div>
                    ))}
            </div>
        </div>
    );
});

export default CurrentIntegrationsList;
