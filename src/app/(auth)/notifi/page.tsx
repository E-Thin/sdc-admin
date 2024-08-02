import { BreadCrumb } from "primereact/breadcrumb";
import NewsListPageDataFetcher from "./data-fetcher";
import NotifiListPageDataFetcher from "./data-fetcher";

export default function ListRolePage() {
  const breadcrumbHome = { icon: 'pi pi-home', to: '/' };
  const breadcrumbItems = [
    { label: 'trang chủ', url: '/' },
    { label: 'danh sách thông báo', url: '/notifi' }]

  return (
    <div className="grid">
      <BreadCrumb home={breadcrumbHome} model={breadcrumbItems} />
      <div className="col-12">
        <NotifiListPageDataFetcher />

      </div>
    </div>
  );
}