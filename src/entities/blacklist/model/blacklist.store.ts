import { action, autorun, makeObservable, observable, runInAction } from 'mobx';
// import { toast } from 'react-toastify';

import httpClient from 'src/shared/api/httpClient.ts';

class BlacklistStore {
    value?: TBlacklist;
    state: TStateStore = 'pending';

    constructor() {
        makeObservable(this, {
            value: observable,
            state: observable,
            updBlacklist: action
        });

        const initGet = autorun(() => {
            httpClient
                .post('/menu', { payload: { id: 3 } })
                .then(({ data }) => {
                    if (data.hasOwnProperty('error')) return;
                    runInAction(() => {
                        this.value = data;
                        this.state = 'done';
                    });
                })
                .catch(() => runInAction(() => (this.state = 'error')));
        });
        initGet();
    }

    updBlacklist(newValue: TBlacklist): void {
        this.state = 'pending';

        this.value = newValue;

        httpClient
            .patch('/menu', {
                payload: {
                    id: 3,
                    incoming: this.value.incoming,
                    outgoing: this.value.outgoing,
                    blacklist: this.value.blacklist
                }
            })
            .then(({ data }) => {
                if (data.hasOwnProperty('error')) return;
                // toast.success('Изменения успешно сохраненны');
                runInAction(() => (this.state = 'done'));
            })
            .catch(() => runInAction(() => (this.state = 'error')));
    }
}

export default BlacklistStore;
