import { ChangeEvent, FC, useContext, useEffect, useState } from 'react';

//styles
import cls from './AvailableIntegration.module.scss';

//func
import { cloneDeep, isEqual } from 'lodash';
import { classNames } from 'src/shared/lib/classNames.ts';

//stores
import { MainButtonContext, usePresetMBBack } from 'src/entities/mainButton';
import IntegrationsContext from '../providers/storeContext.ts';

const initFields = (integration: TAvailableIntegration): TField[] => {
    return cloneDeep(integration.fields).map((field) => {
        return { ...field, value: '' };
    });
};

//types
type TField = {
    name: string;
    text: string;
    value: string;
};

interface AvailableIntegrationProps {
    integration: TAvailableIntegration;
    onExpand: boolean;
    setOnExpand: (newValue: number | false) => void;
}

const AvailableIntegration: FC<AvailableIntegrationProps> = ({ integration, onExpand, setOnExpand }) => {
    const mainButton = useContext(MainButtonContext);
    const integrations = useContext(IntegrationsContext);

    const [fields, setFields] = useState<TField[]>(initFields(integration));

    //**************************************************************************************************
    //handlers

    const handleBtnExpand = (): void => {
        if (onExpand) {
            setOnExpand(false);
            mainButton.setPreset(usePresetMBBack());
        } else setOnExpand(integration.provider_id);

        setFields(initFields(integration));
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>, index: number): void => {
        const newValue = cloneDeep(fields);
        newValue[index].value = e.target.value;
        if (isEqual(initFields(integration), fields) && !isEqual(fields, newValue)) mainButton.setFreezeState();
        if (isEqual(newValue, initFields(integration))) mainButton.returnFreezeState();
        setFields(newValue);
    };

    //**************************************************************************************************

    const handleClearForm = (): void => {
        setFields(initFields(integration));
        mainButton.returnFreezeState();
    };

    const handleSaveIntegration = (): void => {
        const sendFields = fields.reduce((result, field) => {
            return { ...result, [field.name]: field.value };
        }, {});
        integrations.create(integration.provider_id, sendFields);

        setFields(initFields(integration));
        mainButton.returnFreezeState();
        setOnExpand(false);
    };

    useEffect(() => {
        if (!isEqual(fields, initFields(integration))) {
            fields.filter((field) => field.value.length > 0).length === fields.length
                ? mainButton.setParams({ text: 'Добавить интеграцию', is_visible: true }, handleSaveIntegration)
                : mainButton.setParams({ text: 'Отчистить форму', is_visible: true }, handleClearForm);
        }
    }, [fields]);

    //**************************************************************************************************
    //return

    return (
        <div className={cls.integration}>
            <div className={cls.integrationTitle}>
                <p>{integration.name}</p>
                <button
                    className={classNames(cls.btnIntegration, { [cls.btnIntegration_onExpand]: onExpand })}
                    onClick={handleBtnExpand}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.293 9.29303L12 13.586L7.70697 9.29303L6.29297 10.707L12 16.414L17.707 10.707L16.293 9.29303Z" />
                    </svg>
                </button>
            </div>
            {onExpand && (
                <div className={cls.fields}>
                    {fields.map((field: TField, index: number) => (
                        <div key={index}>
                            <input
                                type="text"
                                placeholder={field.text}
                                value={field.value}
                                onChange={(e) => handleInputChange(e, index)}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AvailableIntegration;
