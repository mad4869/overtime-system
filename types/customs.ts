export type Item = {
    id: number;
    title: string;
    createdAt: Date;
    updatedAt: Date;
}

export type UserItem = {
    id: number
    userId: number
    itemId: number
    startTime: Date
    finishedTime: Date
    createdAt: Date
} & {
    user: {
        name: string
        npk: string
        unit: string
    }
    item: {
        title: string;
    }
}