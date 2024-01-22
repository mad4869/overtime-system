export type UserItem = ({
    user: {
        name: string;
        npk: string;
        unit: string;
    };
} & {
    id: number;
    userId: number;
    item: string;
    startTime: Date;
    finishedTime: Date;
    createdAt: Date;
    userItemRecapId: number | null;
})