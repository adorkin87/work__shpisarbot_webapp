import { observable, action, makeObservable, autorun } from 'mobx';

import httpClient from 'src/shared/api/httpClient.ts';

class MenuStore {
    isShow: boolean;
    menuItems: { id: number; name: string }[] | null;

    constructor() {
        makeObservable(this, {
            isShow: observable,
            menuItems: observable,
            toggleSideMenu: action
        });

        this.isShow = false;
        this.menuItems = null;

        const getMenu = autorun(async () => {
            this.menuItems = await httpClient.post('/menu', { payload: { id: 0 } }).then(({ data }) => data);
        });
        getMenu();
    }

    toggleSideMenu() {
        this.isShow = !this.isShow;
    }
}

export default new MenuStore();
