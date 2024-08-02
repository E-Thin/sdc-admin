"use client";
import { notFound } from "next/navigation";
import useSWR from "swr";
import { getAllPartner, PartnerForCard } from "../../api/services/partnersService";
import ListPartnersPageView from "./list-partners-page-view";

async function getListPartners(): Promise<Array<PartnerForCard> | undefined> {
  try {
    return await getAllPartner();
  } catch (error) {
    console.error(error)
  }
}


const getData = async () => {
  const [listPartners] = await Promise.all([getListPartners()]);
  return { listPartners };
};

export default function PartnersListPageDataFetcher() {
  const { data, error, isLoading } = useSWR(
    "getPartnersListPageData",
    () => getData(),
  );
  if (error) {
    notFound();
  }
  if (isLoading || !data) {
    return <div>đang tải...</div>;
  }
  return (
    <ListPartnersPageView
      listPartners={data.listPartners ?? []}
    />
  );
}
