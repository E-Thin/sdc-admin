import { BreadCrumb } from "primereact/breadcrumb";
import TrainingFieldsCreatePageView from "./training-fields-create-page-view";

export default function CreateRolePage() {
  const breadcrumbHome = { icon: 'pi pi-home', to: '/' };
  const breadcrumbItems = [
    { label: 'trang chủ', url: '/' },
    { label: 'danh sách quyền', url: '/training-fields' },
    { label: 'tạo quyền', url: '/training-fields/create' }]
  return (
    <div className="grid">
      <BreadCrumb home={breadcrumbHome} model={breadcrumbItems} />

      <div className="col-12">
        <TrainingFieldsCreatePageView />
      </div>
    </div>
  );
}