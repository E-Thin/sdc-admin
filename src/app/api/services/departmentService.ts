import { callDeleteRequest, callGetRequest, callPostRequest } from './apiService';
import { formatDate } from '../../ulti/ulti';
import { DepartmentForResponse } from '@/src/app/api/types/department/DepartmentForResponse';
import { DepartmentForPost } from '@/src/app/api/types/department/DepartmentForCreate';

export type DepartmentForCard = {
    id: string;
    title: string;
    description: string;
    created_at: string;
    updated_at: string;
};

export async function getAllDepartment(): Promise<Array<DepartmentForCard> | undefined> {
    const result = await callGetRequest(`/department`);
    const data: Array<DepartmentForResponse> = result.response;
    if (result.status === 200) {
        const res: Array<DepartmentForCard> = [];
        for (const item of data) {
            res.push({
                id: item.id,
                title: item.title,
                description: item.description,
                created_at: formatDate(item.created_at, 'DD/MM/YYYY HH:mm'),
                updated_at: formatDate(item.updated_at, 'DD/MM/YYYY HH:mm')
            });
        }
        return res;
    }
}

export async function postDeparment(body: DepartmentForPost): Promise<DepartmentForCard | undefined> {
    const result = await callPostRequest('/department', body);
    const data: DepartmentForResponse = result.response;
    if (result.status === 201) {
        return {
            id: data.id,
            title: data.title,
            description: data.description,
            created_at: formatDate(data.created_at, 'DD/MM/YYYY HH:mm'),
            updated_at: formatDate(data.updated_at, 'DD/MM/YYYY HH:mm')
        };
    }
}

export async function deleteDepartment(idDepartment: string): Promise<boolean | undefined> {
    try {
        const result = await callDeleteRequest(`/department/${idDepartment}`);
        if (result.status === 200) {
            return true;
        }
    } catch (error) {
        console.error(error);
    }
}
