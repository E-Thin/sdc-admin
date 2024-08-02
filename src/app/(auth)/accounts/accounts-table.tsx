import { useRouter } from 'next/navigation';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable, DataTableStateEvent } from 'primereact/datatable';
import { PaginationAndFilter } from '../../api/types/pagination/pagination';
import { AccountForCard } from '../../api/services/accountService';

type ComponentProps = {
    listAccount: Array<AccountForCard>;
    pagination: PaginationAndFilter;
    sortBy?: string;
    orderBy?: 'asc' | 'desc';
    pageChange: (page: number, sortBy: string, orderBy: 'asc' | 'desc') => void;
};

export default function AccountTableView(props: ComponentProps) {
    const router = useRouter();
    const onPageChange = (event: DataTableStateEvent) => {
        const { page, sortField, sortOrder } = event;
        props.pageChange(Number(page) + 1, sortField, sortOrder === 1 ? 'asc' : 'desc');
    };

    const onSortChange = (event: DataTableStateEvent) => {
        const { sortField: field, sortOrder: order } = event;
        props.pageChange(props.pagination.pageNo!, field, order === 1 ? 'asc' : 'desc');
    };

    return (
        <DataTable
            paginatorPosition="both"
            paginatorLeft
            lazy
            paginator
            first={(props.pagination.pageNo! - 1) * (props.pagination.limit ?? 1)}
            onPage={onPageChange}
            totalRecords={props.pagination.totalRecord}
            rows={props.pagination.limit}
            sortField={props.sortBy}
            sortOrder={props.orderBy === 'asc' ? 1 : -1}
            onSort={onSortChange}
            className="w-full"
            showGridlines
            value={props.listAccount}
        >
            <Column align="center" style={{ width: '150px' }} sortable field="fullName" header="Tên đầy đủ" />
            <Column align="center" style={{ width: '150px' }} sortable field="phone" header="Số điện thoại" />
            <Column align="center" style={{ width: '150px' }} sortable field="aboutMe" header="About me" />
            <Column align="center" style={{ width: '150px' }} sortable field="nickName" header="Nick name" />
            <Column align="center" style={{ width: '150px' }} sortable field="birth" header="Ngày sinh" />
            <Column align="center" style={{ width: '150px' }} sortable field="address" header="Địa chỉ" />
            <Column align="center" style={{ width: '150px' }} sortable field="avata" header="Ảnh đại diện" />
            <Column align="center" style={{ width: '150px' }} sortable field="email" header="Email" />
            <Column
                align="center"
                header="tác vụ"
                style={{ width: '15%' }}
                body={(data: AccountForCard) => (
                    <div className="flex gap-3">
                        <Button label="Xem tài khoản" outlined onClick={() => router.push(`/accounts/${data.id}/detail`)} />
                        <Button label="Vô hiệu hóa" severity="warning" outlined />
                    </div>
                )}
            />
        </DataTable>
    );
}
