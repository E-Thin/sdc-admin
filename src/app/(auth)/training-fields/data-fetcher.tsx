"use client";
import { notFound } from "next/navigation";
import useSWR from "swr";
import { getAllTrainingFields, TrainingFieldsForCard } from "../../api/services/trainingFieldsService";
import ListTrainingFieldsPageView from "./list-training-fields-page-view";

async function getListTrainingFields(): Promise<Array<TrainingFieldsForCard> | undefined> {
  try {
    return await getAllTrainingFields();
  } catch (error) {
    console.error(error)
  }
}


const getData = async () => {
  const [listTrainingFields] = await Promise.all([getListTrainingFields()]);
  return { listTrainingFields };
};

export default function TrainingFiledsListPageDataFetcher() {
  const { data, error, isLoading } = useSWR(
    "getTrainingFieldsListPageData",
    () => getData(),
  );
  if (error) {
    notFound();
  }
  if (isLoading || !data) {
    return <div>đang tải...</div>;
  }
  return (
    <ListTrainingFieldsPageView
      listTrainingFields={data.listTrainingFields ?? []}
    />
  );
}
