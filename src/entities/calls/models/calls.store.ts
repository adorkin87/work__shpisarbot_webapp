import { action, autorun, makeObservable, observable, runInAction } from 'mobx';
import { toast } from 'react-toastify';

import { HistoryCalls } from '../types/enums.ts';

import httpClient from 'src/shared/api/httpClient.ts';
import { cloneDeep } from 'lodash';

interface ConstructorProps {
    history?: HistoryCalls;
    messageID?: number;
}

interface GetCallsProps {
    history: HistoryCalls;
    messageID?: number;
}

interface DelCallProps {
    messageID: number;
}

class CallsStore {
    value: TCall[] = [];
    state: TStateStore = 'init';

    pagPage: number = 1;
    pagCount: number = 50;

    constructor({ history, messageID }: ConstructorProps) {
        makeObservable(this, {
            value: observable,
            state: observable,
            getCalls: action
        });

        if (history) autorun(() => this.getCalls({ history, messageID }));
    }

    getCalls({ history, messageID }: GetCallsProps): void {
        if (this.state !== 'init') this.state = 'pending';

        httpClient
            .post('/messages', {
                payload: { history, message_id: messageID, page: this.pagPage, count: this.pagCount }
            })
            .then(({ data }) => {
                if (data.hasOwnProperty('error')) return;

                runInAction(() => {
                    this.value.push(...data);
                    this.pagPage += 1;
                    this.state = 'done';
                });
            })
            .catch(() => runInAction(() => (this.state = 'error')));
    }

    delCall({ messageID }: DelCallProps): void {
        this.state = 'pending';

        httpClient
            .delete('/messages', { data: { payload: { message_id: messageID } } })
            .then(({ data }) => {
                if (data.hasOwnProperty('error')) return;

                toast.success('Звонок успешно удален');
                runInAction(() => {
                    this.value = cloneDeep(this.value.filter((call: TCall) => call.id !== messageID));
                    this.state = 'done';
                });
            })
            .catch(() => runInAction(() => (this.state = 'error')));
    }
}

export default CallsStore;
