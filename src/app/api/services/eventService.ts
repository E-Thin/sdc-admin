import { callDeleteRequest, callGetRequest, callPostRequest } from './apiService';
import { formatDate } from '../../ulti/ulti';
import { EventForPost } from '../types/event/EventForCreate';
import { EventForResponse } from '../types/event/EventForResponse';

export type EventForCard = {
    id: string;
    title: string;
    content: string;
    created_at: string;
    updated_at: string;
};

export async function getAllEvent(): Promise<Array<EventForCard> | undefined> {
    const result = await callGetRequest(`/event`);
    const data: Array<EventForResponse> = result.response;
    if (result.status === 200) {
        const res: Array<EventForCard> = [];
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

export async function postEvent(body: EventForPost): Promise<EventForCard | undefined> {
    const result = await callPostRequest('/event', body);
    const data: EventForResponse = result.response;
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

export async function deleteEvent(idEvent: string): Promise<boolean | undefined> {
    try {
        const result = await callDeleteRequest(`/event/${idEvent}`);
        if (result.status === 200) {
            return true;
        }
    } catch (error) {
        console.error(error);
    }
}
