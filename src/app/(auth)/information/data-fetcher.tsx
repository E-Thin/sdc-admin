'use client';
import ListInformationPageView from '@/src/app/(auth)/information/list-information-page-view';
import { getAllInformation, InformationForCard } from '@/src/app/api/services/informationService';
import { notFound } from 'next/navigation';
import useSWR from 'swr';

async function getListInformation(): Promise<Array<InformationForCard> | undefined> {
    try {
        return await getAllInformation();
    } catch (error) {
        console.error(error);
    }
}

const getData = async () => {
    const [listInformation] = await Promise.all([getListInformation()]);
    return { listInformation };
};

export default function InformationListPageDataFetcher() {
    const { data, error, isLoading } = useSWR('getInformationListPageData', () => getData());
    if (error) {
        notFound();
    }
    if (isLoading || !data) {
        return <div>đang tải...</div>;
    }
    return <ListInformationPageView listInformation={data.listInformation ?? []} />;
}
