import { $Enums } from "@prisma/client";

export type PageProps = { searchParams: { [key: string]: string | string[] | undefined } }

export type Profile = {
    id: number;
    name: string;
    npk: string;
    email: string;
    role: $Enums.UserRole
    position: string;
    unit: $Enums.UserUnit;
    department: $Enums.UserDepartment;
    company: $Enums.UserCompany;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean
}

export type UserItem = ({
    user: {
        name: string;
        npk: string;
        unit: $Enums.UserUnit;
        company: $Enums.UserCompany
    };
} & {
    id: number;
    userId: number;
    item: string;
    startTime: Date;
    finishedTime: Date;
    createdAt: Date;
    updatedAt: Date;
    userItemRecapId: number | null;
})

export type UserItemSimple = Omit<UserItem, 'createdAt' | 'updatedAt' | 'userItemRecapId'>

export type UserItemRecap = {
    id: number;
    isApprovedByVP: boolean;
    isApprovedByAVP: boolean;
    createdAt: Date;
    updatedAt: Date;
    userItems: UserItem[]
}

export type UserItemRecapSimple = Omit<UserItemRecap, 'userItems'> & { userItems: UserItemSimple[] }

export type FilterApproval = ({
    isApprovedByAVP: boolean;
    isApprovedByVP?: undefined;
} | {
    isApprovedByVP: boolean;
    isApprovedByAVP?: undefined;
})