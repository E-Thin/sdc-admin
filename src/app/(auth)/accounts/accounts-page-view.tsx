'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { useSessionStorage } from 'primereact/hooks';
import { Toast } from 'primereact/toast';
import { PaginationAndFilter } from '../../api/types/pagination/pagination';
import { convertObjectToQueryParams } from '../../ulti/ulti';
import { AccountForCard, getListAccount } from '../../api/services/accountService';
import AccountTableView from './accounts-table';

type Condition = {
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
type PropsComponent = {
    condition: Condition;
};

const getListAccountsInitial = async (cond: Condition) => {
    try {
        const listAccount = await getListAccount(cond);
        return listAccount;
    } catch (error) {
        console.error(error);
    }
};

export default function AccountPageView(props: PropsComponent) {
    const router = useRouter();
    const [condition, setCondition] = useState<Condition>(props.condition);
    const [listAccount, setListAccount] = useState<Array<AccountForCard>>();
    const [currentPagination, setCurrentPagination] = useState<PaginationAndFilter>({
        pageNo: 1,
        limit: 5
    });

    useEffect(() => {
        const cond: Condition = props.condition;
        getListAccountsInitial(cond).then((rs) => {
            if (rs) {
                const { data, pagination } = rs;
                setListAccount(data);
                setCurrentPagination(pagination);
            }
        });
        setCondition(cond);
    }, [props]);

    const onPageChange = (page: number, field: string, sort: 'asc' | 'desc' | undefined) => {
        updatePath({
            ...condition,
            pageNo: page,
            sortBy: field,
            orderBy: field ? sort : undefined
        });
    };

    const updatePath = (condition: Condition) => {
        const params = convertObjectToQueryParams(condition);
        router.push(`/accounts?${params}`);
    };
    const toast = useRef<Toast>(null);
    const [resultMessage, setResultMessage] = useSessionStorage('', 'result-message');
    useEffect(() => {
        if (resultMessage) {
            toast.current?.show({
                severity: 'info',
                summary: resultMessage
            });
            setResultMessage('');
        }
    }, [resultMessage, setResultMessage]);

    return (
        <div>
            <div className="card">
                <Toast ref={toast} position="top-center" />
                <Button label="Tạo tài khoản" severity="info" onClick={() => router.push('/accounts/create')} />
                <div className="mt-5 flex gap-4 w-fit">
                    <span className="font-bold">Tìm kiếm theo</span>
                    <InputText id="name1" type="text" placeholder="tên tài khoản" />
                    <InputText id="name1" type="datetime-local" placeholder="ngày tạo" />
                    <Button label="tìm kiếm" icon="pi pi-search" />
                </div>
                <h5>Tất cả các tài khoản</h5>
                <AccountTableView listAccount={listAccount ?? []} pageChange={onPageChange} pagination={currentPagination} sortBy={condition.sortBy} orderBy={condition.orderBy} />
            </div>
        </div>
    );
}
