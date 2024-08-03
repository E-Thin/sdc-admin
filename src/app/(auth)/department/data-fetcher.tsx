"use client";
import { notFound } from "next/navigation";
import useSWR from "swr";


import ListDepartmentPageView from "./list-department-page-view";
import { DepartmentForCard, getAllDepartment } from "@/src/app/api/services/departmentService";

async function getListDepartment(): Promise<Array<DepartmentForCard> | undefined> {
  try {
    return await getAllDepartment();
  } catch (error) {
    console.error(error)
  }
}


const getData = async () => {
  const [listDepartment] = await Promise.all([getListDepartment()]);
  return { listDepartment };
};

export default function DepartmentListPageDataFetcher() {
  const { data, error, isLoading } = useSWR(
    "getDepartmentListPageData",
    () => getData(),
  );
  if (error) {
    notFound();
  }
  if (isLoading || !data) {
    return <div>đang tải...</div>;
  }
  return (
    <ListDepartmentPageView
    listDepartment={data.listDepartment ?? []}
    />
  );
}
