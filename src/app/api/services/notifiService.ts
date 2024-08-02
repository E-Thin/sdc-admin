import { callDeleteRequest, callGetRequest, callPostRequest } from './apiService';
import { formatDate } from '../../ulti/ulti';
import { NewForResponse } from '../types/new/newForResponse';
import { NewForPost } from '../types/new/newForCreate';
import { NotifiForPost } from '../types/notifi/notifiForCreate';
import { NotifiForResponse } from '../types/notifi/notifiForResponse';

export type NotifiForCard = {
    id: string;
    title: string;
    content: string;
    created_at: string;
    updated_at: string;
};

export async function getAllNotifi(): Promise<Array<NotifiForCard> | undefined> {
    const result = await callGetRequest(`/notifi`);
    const data: Array<NotifiForResponse> = result.response;
    if (result.status === 200) {
        const res: Array<NotifiForCard> = [];
        for (const item of data) {
            res.push({
                created_at: formatDate(item.created_at, 'DD/MM/YYYY HH:mm'),
                content: item.content,
                id: item.id,
                title: item.title,
                updated_at: formatDate(item.updated_at, 'DD/MM/YYYY HH:mm')
            });
        }
        return res;
    }
}

export async function postNotifi(body: NotifiForPost): Promise<NotifiForCard | undefined> {
    const result = await callPostRequest('/notifi', body);
    const data: NotifiForResponse = result.response;
    if (result.status === 201) {
        return {
            created_at: formatDate(data.created_at, 'DD/MM/YYYY HH:mm'),
            content: data.content,
            id: data.id,
            title: data.title,
            updated_at: formatDate(data.updated_at, 'DD/MM/YYYY HH:mm')
        };
    }
}

export async function deleteNotifi(idNotifi: string): Promise<boolean | undefined> {
    try {
        const result = await callDeleteRequest(`/notifi/${idNotifi}`);
        if (result.status === 200) {
            return true;
        }
    } catch (error) {
        console.error(error);
    }
}
