import { action, autorun, makeObservable, observable, runInAction } from 'mobx';

import httpClient from 'src/shared/api/httpClient.ts';

class BalanceStore {
    value: number = 0;
    state: TStateStore = 'pending';

    constructor() {
        makeObservable(this, {
            value: observable,
            state: observable,
            update: action
        });

        const initBalance = autorun(() => this.update());
        initBalance();
    }

    update(): void {
        this.state = 'pending';

        httpClient
            .post('/menu', { payload: { id: 1 } })
            .then(({ data }) => {
                if (data.hasOwnProperty('error')) return;
                runInAction(() => {
                    this.value = data['balance'];
                    this.state = 'done';
                });
            })
            .catch(() => runInAction(() => (this.state = 'error')));
    }
}

export default BalanceStore;
