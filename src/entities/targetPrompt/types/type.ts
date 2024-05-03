type TTarget = {
    aim_id: number;
    aim: string;
};

type TTargetResponse = {
    chat_id: number;
    aims_list: TTarget[];
    current_aim: TTarget;
};
