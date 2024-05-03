import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

//types
import { HistoryCalls } from 'src/entities/calls/types/enums.ts';

//styles
import cls from './MainPage.module.scss';

//lib
import formatDate from 'src/shared/lib/formatDate.ts';

//components
import AppSpinner from 'src/shared/ui/AppSpinner';
import AppLoading from 'src/shared/ui/AppLoading';
import CallGeneral from 'src/widgets/CallGeneral';
import AppNoData from 'src/shared/ui/AppNoData';

//hooks
import useIntersectionObserver from 'src/shared/hooks/useIntersectionObserver.ts';

//stores
import { MainButtonContext, usePresetMBClose } from 'src/entities/mainButton';
import CallsStore from 'src/entities/calls';

const MainPage = observer(() => {
    const mainButton = useContext(MainButtonContext);
    mainButton.setPreset(usePresetMBClose());

    const [calls] = useState(() => new CallsStore({ history: HistoryCalls.ALL }));

    const { measureRef, isIntersecting, observer } = useIntersectionObserver({ rootMargin: '500px' });

    useEffect(() => {
        if (!observer) return;

        if (isIntersecting) {
            observer.disconnect();
            calls.getCalls({ history: HistoryCalls.ALL });
        }
    }, [isIntersecting]);

    let curDate: string | null = null;

    const compareDate = (date: string, prevDate: string | null): boolean => {
        if (date === prevDate) return true;
        curDate = date;
        return false;
    };

    if (calls.state === 'init') return <AppSpinner />;

    return (
        <div className={cls.mainPage}>
            {calls.value.length > 0 ? (
                calls.value.map((call: TCall, index) => (
                    <React.Fragment key={call['id']}>
                        {!compareDate(formatDate(call['date_of']).date, curDate) && (
                            <div className={cls.date}>
                                <p>{formatDate(call['date_of']).date}</p>
                            </div>
                        )}
                        <CallGeneral
                            ref={index === calls.value.length - 1 ? measureRef : undefined}
                            call={call}
                            handleBtnDel={() => calls.delCall({ messageID: call.id })}
                        />
                        {index === calls.value.length - 1 && calls.state === 'pending' && <AppLoading />}
                    </React.Fragment>
                ))
            ) : (
                <AppNoData text={'Нет загруженных разговоров'} />
            )}
        </div>
    );
});

export default MainPage;
