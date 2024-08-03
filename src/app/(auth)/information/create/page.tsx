import { BreadCrumb } from "primereact/breadcrumb";
import CreateDepartmentPageView from "./information-create-page-view";
import CreateInformationPageView from "./information-create-page-view";
export default function CreateRolePage() {
  const breadcrumbHome = { icon: 'pi pi-home', to: '/' };
  const breadcrumbItems = [
    { label: 'trang chủ', url: '/' },
    { label: 'danh sách quyền', url: '/information' },
    { label: 'tạo quyền', url: '/information/create' }]
  return (
    <div className="grid">
      <BreadCrumb home={breadcrumbHome} model={breadcrumbItems} />
    
      <div className="col-12">
        <CreateInformationPageView/>
      </div>
    </div>
  );
}