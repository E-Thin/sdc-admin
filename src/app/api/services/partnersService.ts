import { callDeleteRequest, callGetRequest, callPostRequest } from './apiService';
import { formatDate } from '../../ulti/ulti';
import { PartnersForResponse } from '../types/partners/PartnerForResponse';
import { PartnerForPost } from '../types/partners/PartnerForCreate';

export type PartnerForCard = {
    id: string;
    name: string;
    thumbnailPartner: string;
    created_at: string;
    updated_at: string;
};

export async function getAllPartner(): Promise<Array<PartnerForCard> | undefined> {
    const result = await callGetRequest(`/partner`);
    const data: Array<PartnersForResponse> = result.response;
    if (result.status === 200) {
        const res: Array<PartnerForCard> = [];
        for (const item of data) {
            res.push({
                created_at: formatDate(item.created_at, 'DD/MM/YYYY HH:mm'),
                thumbnailPartner: item.thumbnailPartner,
                id: item.id,
                name: item.name,
                updated_at: formatDate(item.updated_at, 'DD/MM/YYYY HH:mm')
            });
        }
        return res;
    }
}

export async function postPartner(body: PartnerForPost): Promise<PartnerForCard | undefined> {
    const result = await callPostRequest('/partner', body);
    const data: PartnersForResponse = result.response;
    if (result.status === 201) {
        return {
            created_at: formatDate(data.created_at, 'DD/MM/YYYY HH:mm'),
            thumbnailPartner: data.thumbnailPartner,
            id: data.id,
            name: data.name,
            updated_at: formatDate(data.updated_at, 'DD/MM/YYYY HH:mm')
        };
    }
}

export async function deletePartner(idpartner: string): Promise<boolean | undefined> {
    try {
        const result = await callDeleteRequest(`/partner/${idpartner}`);
        if (result.status === 200) {
            return true;
        }
    } catch (error) {
        console.error(error);
    }
}
