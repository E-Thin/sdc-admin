import { BreadCrumb } from "primereact/breadcrumb";
import CreateAdmissionPageView from "./admission-create-page-view";
export default function CreateRolePage() {
  const breadcrumbHome = { icon: 'pi pi-home', to: '/' };
  const breadcrumbItems = [
    { label: 'trang chủ', url: '/' },
    { label: 'danh sách quyền', url: '/admissions' },
    { label: 'tạo quyền', url: '/admissions/create' }]
  return (
    <div className="grid">
      <BreadCrumb home={breadcrumbHome} model={breadcrumbItems} />

      <div className="col-12">
        <CreateAdmissionPageView />
      </div>
    </div>
  );
}