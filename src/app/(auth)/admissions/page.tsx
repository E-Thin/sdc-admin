import { BreadCrumb } from "primereact/breadcrumb";
import AdmissionListPageDataFetcher from "./data-fetcher";

export default function ListRolePage() {
  const breadcrumbHome = { icon: 'pi pi-home', to: '/' };
  const breadcrumbItems = [
    { label: 'trang chủ', url: '/' },
    { label: 'danh sách sự kiện', url: '/admissions' }]

  return (
    <div className="grid">
      <BreadCrumb home={breadcrumbHome} model={breadcrumbItems} />
      <div className="col-12">
        <AdmissionListPageDataFetcher />
      </div>
    </div>
  );
}