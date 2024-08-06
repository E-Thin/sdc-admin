import { callDeleteRequest, callGetRequest, callPostRequest } from './apiService';
import { formatDate } from '../../ulti/ulti';
import { TrainingFieldsForResponse } from '../types/training-fields/TrainingFieldsForResponse';
import { TrainingFieldsForPost } from '../types/training-fields/TrainingFieldsForCreate';

export type TrainingFieldsForCard = {
    id: string;
    title: string;
    body: string;
    thumbnailTrainingFields: string;
    created_at: string;
    updated_at: string;
};

export async function getAllTrainingFields(): Promise<Array<TrainingFieldsForCard> | undefined> {
    const result = await callGetRequest(`/training-fields`);
    const data: Array<TrainingFieldsForResponse> = result.response;
    if (result.status === 200) {
        const res: Array<TrainingFieldsForCard> = [];
        for (const item of data) {
            res.push({
                created_at: formatDate(item.created_at, 'DD/MM/YYYY HH:mm'),
                thumbnailTrainingFields: item.thumbnailTrainingFields,
                id: item.id,
                body: item.body,
                title: item.title,
                updated_at: formatDate(item.updated_at, 'DD/MM/YYYY HH:mm')
            });
        }
        return res;
    }
}

export async function postTrainingFields(body: TrainingFieldsForPost): Promise<TrainingFieldsForCard | undefined> {
    const result = await callPostRequest('/training-fields', body);
    const data: TrainingFieldsForResponse = result.response;
    if (result.status === 201) {
        return {
            created_at: formatDate(data.created_at, 'DD/MM/YYYY HH:mm'),
            thumbnailTrainingFields: data.thumbnailTrainingFields,
            id: data.id,
            title: data.title,
            body: data.body,
            updated_at: formatDate(data.updated_at, 'DD/MM/YYYY HH:mm')
        };
    }
}

export async function deleteTrainingFields(idTrainingFields: string): Promise<boolean | undefined> {
    try {
        const result = await callDeleteRequest(`/training-fields/${idTrainingFields}`);
        if (result.status === 200) {
            return true;
        }
    } catch (error) {
        console.error(error);
    }
}
