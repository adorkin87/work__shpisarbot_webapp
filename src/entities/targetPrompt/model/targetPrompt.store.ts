import { action, autorun, makeObservable, observable, runInAction } from 'mobx';
// import { toast } from 'react-toastify';

import httpClient from 'src/shared/api/httpClient.ts';

class TargetPromptStore {
    value?: TTargetResponse;
    state: TStateStore = 'pending';

    constructor() {
        makeObservable(this, {
            value: observable,
            state: observable,
            update: action
        });

        autorun(() =>
            httpClient
                .post('/menu', { payload: { id: 2 } })
                .then(({ data }) => {
                    if (data.hasOwnProperty('error')) return;
                    runInAction(() => {
                        this.value = data;
                        this.state = 'done';
                    });
                })
                .catch(() => runInAction(() => (this.state = 'error')))
        );
    }

    update(aim_id: number) {
        this.state = 'pending';

        if (this.value) this.value.current_aim.aim_id = aim_id;

        httpClient
            .patch('/menu', { payload: { id: 2, aim_id } })
            .then(({ data }) => {
                if (data.hasOwnProperty('error')) return;
                runInAction(() => (this.state = 'done'));
            })
            .catch(() => runInAction(() => (this.state = 'error')));
    }
}

export default TargetPromptStore;
