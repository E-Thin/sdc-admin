import { callDeleteRequest, callGetRequest, callPostRequest } from './apiService';
import { formatDate } from '../../ulti/ulti';
import { NewForResponse } from '../types/new/newForResponse';
import { NewForPost } from '../types/new/newForCreate';

export type NewsForCard = {
    id: string;
    title: string;
    body: string;
    description: string;
    thumbnailNews: string;
    created_at: string;
    updated_at: string;
};

export async function getAllNews(): Promise<Array<NewsForCard> | undefined> {
    const result = await callGetRequest(`/news`);
    const data: Array<NewForResponse> = result.response;
    if (result.status === 200) {
        const res: Array<NewsForCard> = [];
        for (const item of data) {
            res.push({
                created_at: formatDate(item.created_at, 'DD/MM/YYYY HH:mm'),
                body: item.body,
                id: item.id,
                description: item.description,
                thumbnailNews: item.thumbnailNews,
                title: item.title,
                updated_at: formatDate(item.updated_at, 'DD/MM/YYYY HH:mm')
            });
        }
        return res;
    }
}

export async function createNews(body: NewForPost) {
    try {
        const result = await callPostRequest(`/news`, body);
        if (result.status === 201) {
            return true;
        }
    } catch (error) {
        console.error(error);
    }
}

export async function deleteNews(idNews: string): Promise<boolean | undefined> {
    try {
        const result = await callDeleteRequest(`/news/${idNews}`);
        if (result.status === 200) {
            return true;
        }
    } catch (error) {
        console.error(error);
    }
}
