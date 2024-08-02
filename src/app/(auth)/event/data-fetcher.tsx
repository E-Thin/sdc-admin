"use client";
import { notFound } from "next/navigation";
import useSWR from "swr";
import ListEventPageView from "./list-event-page-view";
import { EventForCard, getAllEvent } from "../../api/services/eventService";

async function getListEvent(): Promise<Array<EventForCard> | undefined> {
  try {
    return await getAllEvent();
  } catch (error) {
    console.error(error)
  }
}


const getData = async () => {
  const [listEvent] = await Promise.all([getListEvent()]);
  return { listEvent };
};

export default function EventListPageDataFetcher() {
  const { data, error, isLoading } = useSWR(
    "getEventListPageData",
    () => getData(),
  );
  if (error) {
    notFound();
  }
  if (isLoading || !data) {
    return <div>đang tải...</div>;
  }
  return (
    <ListEventPageView
      listEvent={data.listEvent ?? []}
    />
  );
}
