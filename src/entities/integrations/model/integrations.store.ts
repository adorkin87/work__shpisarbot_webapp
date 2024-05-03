import { action, autorun, makeObservable, observable, runInAction } from 'mobx';
import { toast } from 'react-toastify';

import httpClient from 'src/shared/api/httpClient.ts';

class IntegrationsStore {
    value?: { available: TAvailableIntegration[]; current: TCurrentIntegration[] };
    state: TStateStore = 'pending';

    constructor() {
        makeObservable(this, {
            value: observable,
            state: observable,
            get: action,
            delete: action,
            create: action
        });

        const initGet = autorun(() => this.get());
        initGet();
    }

    get() {
        this.state = 'pending';

        httpClient
            .post('/menu', { payload: { id: 4 } })
            .then(({ data }) => {
                if (data.hasOwnProperty('error')) return;
                runInAction(() => {
                    this.value = data['integrations'];
                    this.state = 'done';
                });
            })
            .catch(() => runInAction(() => (this.state = 'error')));
    }

    create(provider_id: number, fields: object) {
        this.state = 'pending';

        httpClient
            .patch('/menu', { payload: { id: 4, provider_id, ...fields } })
            .then(({ data }) => {
                if (data.hasOwnProperty('error')) return;
                toast.success('Интеграция успешно добавлена');
                this.get();
            })
            .catch(() => runInAction(() => (this.state = 'error')));
    }

    delete(int_id: number) {
        this.state = 'pending';

        httpClient
            .delete('/integration', { data: { payload: { int_id } } })
            .then(({ data }) => {
                if (data.hasOwnProperty('error')) return;
                toast.success('Интеграция успешно удалена');
                this.get();
            })
            .catch(() => runInAction(() => (this.state = 'error')));
    }
}

export default IntegrationsStore;
