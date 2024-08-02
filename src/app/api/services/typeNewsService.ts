import { callDeleteRequest, callGetRequest, callPostRequest } from './apiService';
import { formatDate } from '../../ulti/ulti';
import { TypeNewsForResponse } from '../types/type-news/TypeNewForResponse';
import { TypeNewsForPost } from '../types/type-news/TypeNewForCreate';

export type TypeNewsForCard = {
    id: string;
    nameTypeNews: string;
    description: string;
};

export async function getAllTypeNews(): Promise<Array<TypeNewsForCard> | undefined> {
    const result = await callGetRequest(`/type-news`);
    const data: Array<TypeNewsForResponse> = result.response;
    if (result.status === 200) {
        const res: Array<TypeNewsForCard> = [];
        for (const item of data) {
            res.push({
                description: item.description,
                id: item.id,
                nameTypeNews: item.nameTypeNews,
            });
        }
        return res;
    }
}

export async function postTypeNews(body: TypeNewsForPost): Promise<TypeNewsForCard | undefined> {
    const result = await callPostRequest('/type-news', body);
    const data: TypeNewsForResponse = result.response;
    if (result.status === 201) {
        return {
            description: data.description,
            id: data.id,
            nameTypeNews: data.nameTypeNews,
        };
    }
}

export async function deleteTypeNews(idTypeNews: string): Promise<boolean | undefined> {
    try {
        const result = await callDeleteRequest(`/type-news/${idTypeNews}`);
        if (result.status === 200) {
            return true;
        }
    } catch (error) {
        console.error(error);
    }
}
