"use client";
import { notFound } from "next/navigation";
import useSWR from "swr";
import { getAllNotifi, NotifiForCard } from "../../api/services/notifiService";
import ListNotifiPageView from "./list-notifi-page-view";

async function getListNotifi(): Promise<Array<NotifiForCard> | undefined> {
  try {
    return await getAllNotifi();
  } catch (error) {
    console.error(error)
  }
}

const getData = async () => {
  const [listNotifi] = await Promise.all([getListNotifi()]);
  return { listNotifi };
};

export default function NotifiListPageDataFetcher() {
  const { data, error, isLoading } = useSWR(
    "getNotifiListPageData",
    () => getData(),
  );
  if (error) {
    notFound();
  }
  if (isLoading || !data) {
    return <div>đang tải...</div>;
  }
  return (
    <ListNotifiPageView
      listNotifi={data.listNotifi ?? []}
    />
  );
}
