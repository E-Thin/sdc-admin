"use client";
import { notFound } from "next/navigation";
import useSWR from "swr";
import { getAllNews, NewsForCard } from "../../api/services/newService";
import ListNewsPageView from "./list-news-page-view";

async function getListNews(): Promise<Array<NewsForCard> | undefined> {
  try {
    return await getAllNews();
  } catch (error) {
    console.error(error)
  }
}


const getData = async () => {
  const [listNews] = await Promise.all([getListNews()]);
  return { listNews };
};

export default function NewsListPageDataFetcher() {
  const { data, error, isLoading } = useSWR(
    "getNewsListPageData",
    () => getData(),
  );
  if (error) {
    notFound();
  }
  if (isLoading || !data) {
    return <div>đang tải...</div>;
  }
  return (
    <ListNewsPageView
      listNews={data.listNews ?? []}
    />
  );
}
