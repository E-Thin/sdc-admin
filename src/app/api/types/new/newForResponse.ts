import { AccountBasicForResponse } from "../account/UserForResponse";

export type NewForResponse = {
    id: string;
    account: Array<AccountBasicForResponse>;
    title: string;
    body: string;
    description: string;
    thumbnailNews: string;
    tyopenewsId: string;
    created_at: string;
    updated_at: string;
  }