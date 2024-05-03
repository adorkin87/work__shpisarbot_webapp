import { observable, makeObservable, action } from 'mobx';

const tg = Telegram.WebApp;

class MainButtonStore {
    params?: TParamsMB;
    onClick?: () => void;

    freezeState: { params: TParamsMB; onClick: () => void } | null = null;

    constructor() {
        makeObservable(this, {
            params: observable,
            onClick: observable,
            setPreset: action,
            setParams: action,
            setFreezeState: action,
            clearFreezeState: action,
            returnFreezeState: action
        });
    }

    setPreset(preset: TPresetMB): void {
        this.onClick && tg.MainButton.offClick(this.onClick);
        this.freezeState && this.clearFreezeState();

        this.params = preset.params;
        this.onClick = preset.onClick;

        tg.MainButton.setParams(this.params);
        tg.MainButton.onClick(this.onClick);
    }

    setParams(params: TParamsMB, onClick: () => void): void {
        this.onClick && tg.MainButton.offClick(this.onClick);

        this.params = params;
        this.onClick = onClick;

        tg.MainButton.setParams(this.params);
        tg.MainButton.onClick(this.onClick);
    }

    setFreezeState(): void {
        if (this.params && this.onClick) this.freezeState = { params: this.params, onClick: this.onClick };
    }

    clearFreezeState(): void {
        this.freezeState = null;
    }

    returnFreezeState(): void {
        if (!this.freezeState) return;
        this.onClick && tg.MainButton.offClick(this.onClick);

        this.params = this.freezeState.params;
        this.onClick = this.freezeState.onClick;

        this.params && tg.MainButton.setParams(this.params);
        this.onClick && tg.MainButton.onClick(this.onClick);
    }
}

export default MainButtonStore;
