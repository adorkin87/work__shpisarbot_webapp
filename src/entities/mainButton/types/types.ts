type TParamsMB = {
    text?: string;
    is_visible?: boolean;
};

type TPresetMB = {
    params: TParamsMB;
    onClick: () => void;
};
