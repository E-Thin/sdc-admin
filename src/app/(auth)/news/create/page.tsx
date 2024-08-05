import { BreadCrumb } from "primereact/breadcrumb";
import CreateNewsPageView from "./data-fetcher";

export default function CreateRolePage() {
  const breadcrumbHome = { icon: 'pi pi-home', to: '/' };
  const breadcrumbItems = [
    { label: 'trang chủ', url: '/' },
    { label: 'danh sách tin tức', url: '/news' },
    { label: 'tạo tin tức mới', url: '/news/create' }]
  return (
    <div className="grid">
      <BreadCrumb home={breadcrumbHome} model={breadcrumbItems} />

      <div className="col-12">
        <CreateNewsPageView />
      </div>
    </div>
  );
}