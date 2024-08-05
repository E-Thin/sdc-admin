import { BreadCrumb } from "primereact/breadcrumb";
import CreateDepartmentPageView from "./department-create-page-view";
export default function CreateRolePage() {
  const breadcrumbHome = { icon: 'pi pi-home', to: '/' };
  const breadcrumbItems = [
    { label: 'trang chủ', url: '/' },
    { label: 'danh sách quyền', url: '/department' },
    { label: 'tạo quyền', url: '/department/create' }]
  return (
    <div className="grid">
      <BreadCrumb home={breadcrumbHome} model={breadcrumbItems} />

      <div className="col-12">
        <CreateDepartmentPageView />
      </div>
    </div>
  );
}