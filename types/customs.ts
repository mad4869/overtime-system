export type PageProps = { searchParams: { [key: string]: string | string[] | undefined } }

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

export type UserItemRecap = {
    id: number;
    isApprovedByVP: boolean;
    isApprovedByAVP: boolean;
    createdAt: Date;
    userItems: UserItem[]
}

export type FilterApproval = ({
    isApprovedByAVP: boolean;
    isApprovedByVP?: undefined;
} | {
    isApprovedByVP: boolean;
    isApprovedByAVP?: undefined;
})