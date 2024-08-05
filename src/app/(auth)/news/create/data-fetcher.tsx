"use client";
import { getAllTypeNews, TypeNewsForCard } from "@/src/app/api/services/typeNewsService";
import { notFound } from "next/navigation";
import useSWR from "swr";
import NewsCreatePageView from "./new-create-page-view";

async function getListTypeNews(): Promise<Array<TypeNewsForCard> | undefined> {
  try {
    return await getAllTypeNews();
  } catch (error) {
    console.error(error)
  }
}

const getData = async () => {
  const [listTypeNews] = await Promise.all([getListTypeNews()]);
  return { listTypeNews };
};

export default function CreateNewsPageView() {
  const { data, error, isLoading } = useSWR(
    "getTypeNewsListPageData",
    () => getData(),
  );
  if (error) {
    notFound();
  }
  if (isLoading || !data) {
    return <div>đang tải...</div>;
  }
  return (
    <NewsCreatePageView
      listTypeNews={data.listTypeNews ?? []}
    />
  );
}
