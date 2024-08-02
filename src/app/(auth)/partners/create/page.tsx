import { BreadCrumb } from "primereact/breadcrumb";
import CreatePartnersPageView from "./partners-create-page-view";
export default function CreateRolePage() {
  const breadcrumbHome = { icon: 'pi pi-home', to: '/' };
  const breadcrumbItems = [
    { label: 'trang chủ', url: '/' },
    { label: 'danh sách đối tác', url: '/partners' },
    { label: 'thêm đối tác mới', url: '/partners/create' }]
  return (
    <div className="grid">
      <BreadCrumb home={breadcrumbHome} model={breadcrumbItems} />

      <div className="col-12">
        <CreatePartnersPageView />
      </div>
    </div>
  );
}