import { BreadCrumb } from "primereact/breadcrumb";
import CreateNotifiPageView from "./notifi-create-page-view";
export default function CreateRolePage() {
  const breadcrumbHome = { icon: 'pi pi-home', to: '/' };
  const breadcrumbItems = [
    { label: 'trang chủ', url: '/' },
    { label: 'danh sách notifi', url: '/notifi' },
    { label: 'tạo notifi', url: '/notifi/create' }]
  return (
    <div className="grid">
      <BreadCrumb home={breadcrumbHome} model={breadcrumbItems} />

      <div className="col-12">
        <CreateNotifiPageView />
      </div>
    </div>
  );
}