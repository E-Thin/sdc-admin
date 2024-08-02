import { callDeleteRequest, callGetRequest, callPostRequest } from './apiService';
import { formatDate } from '../../ulti/ulti';
import { AdmissionForResponse } from '../types/admission/AdmissionForResponse';
import { AdmissionForPost } from '../types/admission/AdmissionForCreate';

export type AdmissionForCard = {
    id: string;
    title: string;
    body: string;
    created_at: string;
    updated_at: string;
};

export async function getAllAdmission(): Promise<Array<AdmissionForCard> | undefined> {
    const result = await callGetRequest(`/admissions`);
    const data: Array<AdmissionForResponse> = result.response;
    if (result.status === 200) {
        const res: Array<AdmissionForCard> = [];
        for (const item of data) {
            res.push({
                created_at: formatDate(item.created_at, 'DD/MM/YYYY HH:mm'),
                body: item.body,
                id: item.id,
                title: item.title,
                updated_at: formatDate(item.updated_at, 'DD/MM/YYYY HH:mm')
            });
        }
        return res;
    }
}

export async function postAdmission(body: AdmissionForPost): Promise<AdmissionForCard | undefined> {
    const result = await callPostRequest('/admissions', body);
    const data: AdmissionForResponse = result.response;
    if (result.status === 201) {
        return {
            created_at: formatDate(data.created_at, 'DD/MM/YYYY HH:mm'),
            body: data.body,
            id: data.id,
            title: data.title,
            updated_at: formatDate(data.updated_at, 'DD/MM/YYYY HH:mm')
        };
    }
}

export async function deleteAdmission(idAdmission: string): Promise<boolean | undefined> {
    try {
        const result = await callDeleteRequest(`/admissions/${idAdmission}`);
        if (result.status === 200) {
            return true;
        }
    } catch (error) {
        console.error(error);
    }
}
