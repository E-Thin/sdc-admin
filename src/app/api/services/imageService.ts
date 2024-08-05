import { callGetRequest, callPutRequest, submitMultiForm } from './apiService';

interface ImageForResponse {
    id: string;
    fieldname: string;
    originalname: string;
    size: string;
    url: string;
    mimetype: string;
}

export type ImageForCard = {
    id?: string;
    field_name: string;
    original_name: string;
    size: string;
    url: string;
    mime_type: string;
};

export type ImageForPost = {
    image: any;
};

export interface contentAsset {
    idAssetContent: string;
}

export async function uploadImageNews(image: ImageForPost): Promise<ImageForCard | undefined> {
    const formData = new FormData();
    formData.append('image', image.image);
    const result = await submitMultiForm('/file/upload-image-news', formData);
    const data: ImageForResponse = result.response;
    if (result.status === 201) {
        return {
            id: data.id,
            field_name: data.fieldname,
            url: data.url,
            mime_type: data.mimetype,
            original_name: data.originalname,
            size: data.size
        };
    }
}

export async function updateContentAssetNews(asset: contentAsset): Promise<boolean | undefined> {
    try {
        const result = await callPutRequest('/content-asset-news/upload-asset', asset);
        if (result.status === 200) {
            return true;
        }
    } catch (error) {
        console.error(error);
    }
}

export interface AssetNewsForResponse {
    assets: Array<string>;
}

export async function getAllAssetNews(): Promise<AssetNewsForResponse | undefined> {
    try {
        const result = await callGetRequest(`/content-asset-news/get-all-content-asset`);
        if (result.status === 200) {
            const data: AssetNewsForResponse = result.response;
            return {
                assets: data.assets.map((item) => `${process.env.NEXT_PUBLIC_API_BASE_URL}${item}`)
            };
        }
    } catch (error) {
        console.error(error);
    }
}

export async function uploadImageAboutUs(image: ImageForPost): Promise<ImageForCard | undefined> {
    const formData = new FormData();
    formData.append('image', image.image);
    const result = await submitMultiForm('/file/upload-image-about-us', formData);
    const data: ImageForResponse = result.response;
    if (result.status === 201) {
        return {
            field_name: data.fieldname,
            url: data.url,
            mime_type: data.mimetype,
            original_name: data.originalname,
            size: data.size
        };
    }
}

export async function uploadImageTrainingFields(image: ImageForPost): Promise<ImageForCard | undefined> {
    const formData = new FormData();
    formData.append('image', image.image);
    const result = await submitMultiForm('/file/upload-image-training-fields', formData);
    const data: ImageForResponse = result.response;
    if (result.status === 201) {
        return {
            id: data.id,
            field_name: data.fieldname,
            url: data.url,
            mime_type: data.mimetype,
            original_name: data.originalname,
            size: data.size
        };
    }
}

export async function uploadImageAdmission(image: ImageForPost): Promise<ImageForCard | undefined> {
    const formData = new FormData();
    formData.append('image', image.image);
    const result = await submitMultiForm('/file/upload-image-admission', formData);
    const data: ImageForResponse = result.response;
    if (result.status === 201) {
        return {
            id: data.id,
            field_name: data.fieldname,
            url: data.url,
            mime_type: data.mimetype,
            original_name: data.originalname,
            size: data.size
        };
    }
}