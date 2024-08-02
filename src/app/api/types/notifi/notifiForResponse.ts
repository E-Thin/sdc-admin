import { AccountBasicForResponse } from "../account/UserForResponse";

export type NotifiForResponse = {
    id: string;
    title: string;
    content: string;
    account?: Array<AccountBasicForResponse>;
    created_at?: string;
    updated_at?: string;
}