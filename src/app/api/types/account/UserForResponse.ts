export type UserForResponse = {
    id: string;
    fullName: string;
    phone: string;
    aboutMe: string;
    nickName: string;
    birth: string;
    address: string;
    avata?: string;
    email?: string;
    favorite?: Array<{
        id: string;
        nameFavorite: string;
    }>;
};

export type AccountBasicForResponse = {
    id: string;
    name: string;
    email: string;
};