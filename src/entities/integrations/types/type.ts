type TCurrentIntegration = {
    int_id: number;
    name: string;
    pbx: string;
};

type TAvailableIntegration = {
    provider_id: number;
    name: string;
    fields: { name: string; text: string }[];
};
