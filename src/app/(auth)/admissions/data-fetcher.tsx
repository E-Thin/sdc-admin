"use client";
import { notFound } from "next/navigation";
import useSWR from "swr";
import { AdmissionForCard, getAllAdmission } from "../../api/services/admissionService";
import ListAdmissionPageView from "./list-admission-page-view";

async function getListAdmission(): Promise<Array<AdmissionForCard> | undefined> {
  try {
    return await getAllAdmission();
  } catch (error) {
    console.error(error)
  }
}


const getData = async () => {
  const [listAdmission] = await Promise.all([getListAdmission()]);
  return { listAdmission };
};

export default function AdmissionListPageDataFetcher() {
  const { data, error, isLoading } = useSWR(
    "getAdmissionListPageData",
    () => getData(),
  );
  if (error) {
    notFound();
  }
  if (isLoading || !data) {
    return <div>đang tải...</div>;
  }
  return (
    <ListAdmissionPageView
      listAdmission={data.listAdmission ?? []}
    />
  );
}
