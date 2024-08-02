import { BreadCrumb } from "primereact/breadcrumb";
import CreateEventPageView from "./event-create-page-view";
export default function CreateRolePage() {
  const breadcrumbHome = { icon: 'pi pi-home', to: '/' };
  const breadcrumbItems = [
    { label: 'trang chủ', url: '/' },
    { label: 'danh sách quyền', url: '/event' },
    { label: 'tạo quyền', url: '/event/create' }]
  return (
    <div className="grid">
      <BreadCrumb home={breadcrumbHome} model={breadcrumbItems} />

      <div className="col-12">
        <CreateEventPageView />
      </div>
    </div>
  );
}