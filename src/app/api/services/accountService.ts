import { callGetRequest } from './apiService';
import { AccountSearchForResponse } from '../types/account/AccountSearchForResponse';
import { AccountForQuery } from '../types/account/AccountForQuery';
import { PaginationAndFilter } from '../types/pagination/pagination';
import { formatDate, objectToQueryParams } from '../../ulti/ulti';
import { UserForResponse } from '../types/account/UserForResponse';

export type AccountSearchForCard = {
    id: string;
    full_name: string;
    about_me: string;
    nick_name: string;
    address: string;
    avata: string;
};

export async function searchAccount(query: string): Promise<Array<AccountSearchForCard> | undefined> {
    const result = await callGetRequest(`/search/accounts-by-admin?${query}`);
    const data: Array<AccountSearchForResponse> = result.response;
    if (result.status === 200) {
        const res: Array<AccountSearchForCard> = [];
        for (const item of data) {
            res.push({
                id: item.id,
                about_me: item.aboutMe,
                address: item.address,
                avata: item.avata,
                full_name: item.fullName,
                nick_name: item.nickName
            });
        }
        return res;
    }
}

export type AccountForCard = {
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

export async function getListAccount(query: AccountForQuery): Promise<
    | {
          data: AccountForCard[];
          pagination: PaginationAndFilter;
      }
    | undefined
> {
    try {
        const res = await callGetRequest(`/user/admin/get-all-accounts?${objectToQueryParams(query)}`);
        if (res.status === 200) {
            const data: {
                data: UserForResponse[];
                pagination: PaginationAndFilter;
            } = res.response;
            const result: AccountForCard[] = [];
            for (const account of data.data) {
                result.push({
                    id: account.id,
                    fullName: account.fullName,
                    phone: account.phone,
                    aboutMe: account.aboutMe,
                    nickName: account.nickName,
                    birth: formatDate(String(account.birth), 'DD/MM/YYYY'),
                    address: account.address,
                    avata: account.avata,
                    email: account.email
                });
            }
            return {
                data: result,
                pagination: data.pagination
            };
        }
    } catch (error) {
        console.error(error);
    }
}

export type UserDetailForCard = {
    user: UserForResponse;
    image: Array<{
        path: string;
        postId: string;
        typeImage: {
            typeImageName: string;
        };
    }>;
};

