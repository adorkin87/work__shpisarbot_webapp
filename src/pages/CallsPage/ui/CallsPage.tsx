import React, { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';

import { HistoryCalls } from 'src/entities/calls/types/enums.ts';

//styles
import cls from './CallsPage.module.scss';

//lib
import formatDate from 'src/shared/lib/formatDate.ts';

//components
import AppSpinner from 'src/shared/ui/AppSpinner';
import BtnPhoneTop from 'src/features/BtnPhoneTop';
import CallPhone from 'src/widgets/CallPhone';

//mainButton
import { MainButtonContext, usePresetMBBack } from 'src/entities/mainButton';
import CallsStore from 'src/entities/calls';

const CallsPage = observer(() => {
    const mainButton = useContext(MainButtonContext);
    mainButton.setPreset(usePresetMBBack());

    const params = new URLSearchParams(document.location.search);
    const m = params.get('m');

    const [calls] = useState(() => new CallsStore({ history: HistoryCalls.CONTACT, messageID: Number(m) }));

    let curDate: string | null = null;
    const compareDate = (date: string, prevDate: string | null): boolean => {
        if (date === prevDate) return true;
        curDate = date;
        return false;
    };

    if (calls.state !== 'done') return <AppSpinner />;

    return (
        <div className={cls.callsPage}>
            <BtnPhoneTop phone={calls.value[0]['phone']} />
            <div className={cls.calls}>
                {calls.value.map((call: TCall) => (
                    <React.Fragment key={call['id']}>
                        {!compareDate(formatDate(call['date_of']).date, curDate) && (
                            <div className={cls.date}>
                                <p>{formatDate(call['date_of']).date}</p>
                            </div>
                        )}
                        <CallPhone call={call} handleBtnDel={() => calls.delCall({ messageID: call.id })} />
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
});

export default CallsPage;
