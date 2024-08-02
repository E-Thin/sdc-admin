import { BreadCrumb } from 'primereact/breadcrumb';
import { notFound } from 'next/navigation';
import DetailAccountPageView from './detail-account-page-view';
import { getDetailAccount } from '@/src/app/api/services/accountService';

type Props = {
    params: {
        id: string;
    };
};

export default async function DetaiAccount(props: Props) {
    const detailAccount = await getDetailAccount(props.params.id);
    if (!detailAccount) {
        notFound();
    }
    const breadcrumbHome = { icon: 'pi pi-home', to: '/' };
    const breadcrumbItems = [
        { label: 'trang chủ', url: '/' },
        { label: 'danh sách tài khoản', url: '/accounts' },
        { label: 'chi tiết tài khoản', url: `/accounts/${props.params.id}/detail` }
    ];
    return (
        <div className="grid">
            <BreadCrumb home={breadcrumbHome} model={breadcrumbItems} />
            <div className="col-12">
                <DetailAccountPageView detailAccount={detailAccount} />
            </div>
        </div>
    );
}
