export type PageProps = { searchParams: { [key: string]: string | string[] | undefined } }

export type Profile = {
    id: number;
    name: string;
    npk: string;
    email: string;
    role: 'USER' | 'ADMIN' | 'SUPER_ADMIN'
    position: string;
    unit: string;
    department: string;
    company: string;
    createdAt: Date;
    updatedAt: Date;
}

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