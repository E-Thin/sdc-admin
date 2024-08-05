import { callDeleteRequest, callGetRequest, callPostRequest } from './apiService';
import { formatDate } from '../../ulti/ulti';
import { InformationForResponse } from '@/src/app/api/types/information/InformationForResponse';
import { InformationForPost } from '@/src/app/api/types/information/InformationForCreate';

export type InformationForCard = {
    id: string;
    title: string;
    body: string;
    created_at: string;
    updated_at: string;
};

export async function getAllInformation(): Promise<Array<InformationForCard> | undefined> {
    const result = await callGetRequest(`/information`);
    const data: Array<InformationForResponse> = result.response;
    if (result.status === 200) {
        const res: Array<InformationForCard> = [];
        for (const item of data) {
            res.push({
                id: item.id,
                title: item.title,
                body: item.body,
                created_at: formatDate(item.created_at, 'DD/MM/YYYY HH:mm'),
                updated_at: formatDate(item.updated_at, 'DD/MM/YYYY HH:mm')
            });
        }
        return res;
    }
}

export async function postInformation(body: InformationForPost): Promise<InformationForCard | undefined> {
    const result = await callPostRequest('/information', body);
    const data: InformationForResponse = result.response;
    if (result.status === 201) {
        return {
            id: data.id,
            title: data.title,
            body: data.body,
            created_at: formatDate(data.created_at, 'DD/MM/YYYY HH:mm'),
            updated_at: formatDate(data.updated_at, 'DD/MM/YYYY HH:mm')
        };
    }
}

export async function deleteInformation(idInformation: string): Promise<boolean | undefined> {
    try {
        const result = await callDeleteRequest(`/information/${idInformation}`);
        if (result.status === 200) {
            return true;
        }
    } catch (error) {
        console.error(error);
    }
}
