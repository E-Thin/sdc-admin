import { BreadCrumb } from 'primereact/breadcrumb';
import AccountPageView from './accounts-page-view';

type Props = {
    searchParams: {
        limit?: number;
        pageNo?: number;
        sortBy?: string;
        orderBy?: 'asc' | 'desc';
        contentTextKey?: string;
        nameAccountKey?: string;
        emailAccountKey?: string;
        createdDateFrom?: string;
        createdDateTo?: string;
    };
};
export default async function Accounts(props: Props) {
    const breadcrumbHome = { icon: 'pi pi-home', to: '/' };
    const breadcrumbItems = [
        { label: 'trang chủ', url: '/' },
        { label: 'Danh sách tài khoản', url: '/accounts' }
    ];
    return (
        <div className="grid">
            <BreadCrumb home={breadcrumbHome} model={breadcrumbItems} />

            <div className="col-12">
                <AccountPageView condition={props.searchParams} />
            </div>
        </div>
    );
}
