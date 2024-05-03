import { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

import { HistoryCalls } from 'src/entities/calls/types/enums.ts';

//styles
import cls from './Page.module.scss';

//lib
import formatDate from 'src/shared/lib/formatDate.ts';
import formatSecond from 'src/shared/lib/formatSecond.ts';

//components
import AppSpinner from 'src/shared/ui/AppSpinner';
import BtnPhoneTop from 'src/features/BtnPhoneTop';
import AppIconCall from 'src/shared/ui/AppIconCall';
import CallSummary from './CallSummary.tsx';
import CallText from 'src/pages/CallPage/ui/CallText.tsx';

//mainButton
import { MainButtonContext, usePresetMBBack } from 'src/entities/mainButton';
import CallsStore from 'src/entities/calls';
import CallHistory from 'src/pages/CallPage/ui/CallHistory.tsx';

const Page = observer(() => {
    const mainButton = useContext(MainButtonContext);
    mainButton.setPreset(usePresetMBBack());

    const params = new URLSearchParams(document.location.search);
    const messageID = Number(params.get('m'));

    const [calls] = useState(() => new CallsStore({}));

    useEffect(() => {
        calls.getCalls({ history: HistoryCalls.CALL, messageID });
    }, [messageID]);

    if (calls.state !== 'done') return <AppSpinner />;

    return (
        <div className={cls.callPage}>
            <BtnPhoneTop phone={calls.value[0].phone} />
            <div className={cls.date}>
                <AppIconCall direction={calls.value[0].direction} />
                <p>
                    {formatDate(calls.value[0].date_of).date} : {formatDate(calls.value[0].date_of).time} -{' '}
                    {formatSecond(calls.value[0]['length_sec'])}
                </p>
            </div>
            <audio controls>
                <source src={calls.value[0].link} type={'audio/mp3'} />
                <source src={calls.value[0].link} type={'audio/mpeg'} />
            </audio>

            <CallSummary call={calls.value[0]} />
            <CallText call={calls.value[0]} />
            <CallHistory call={calls.value[0]} />
        </div>
    );
});

export default Page;
