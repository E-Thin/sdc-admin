'use client';

import { UserDetailForCard } from '@/src/app/api/services/accountService';
import Link from 'next/link';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Fieldset } from 'primereact/fieldset';
import { Image } from 'primereact/image';

type PropsComponent = {
    detailAccount: UserDetailForCard;
};
export default function DetailAccountPageView(props: PropsComponent) {
    console.log(props);

    return (
        <div className="card">
            <h5>Chi tiết tài khoản</h5>
            <Fieldset legend="Thông tin tài khoản" className="flex flex-column" toggleable>
                <div>
                    <strong>Email</strong>
                    <br />
                    {props.detailAccount.user.email}
                </div>
                <div>
                    <strong>Tên đầy đủ:</strong>
                    <br />
                    {props.detailAccount.user.fullName}
                </div>
                <div>
                    <strong>Avatar:</strong>
                    <br />
                    {props.detailAccount.user.avata}
                </div>
                <div>
                    <strong>Nick name:</strong>
                    <br />
                    {props.detailAccount.user.nickName}
                </div>
                <div>
                    <strong>About me:</strong>
                    <br />
                    {props.detailAccount.user.aboutMe}
                </div>
                <div>
                    <strong>Ngày sinh:</strong>
                    <br />
                    {props.detailAccount.user.birth}
                </div>
                <div>
                    <strong>Địa chỉ:</strong>
                    <br />
                    {props.detailAccount.user.address}
                </div>
                <div>
                    <strong>Số người theo dõi:</strong>
                    <br />
                    {props.detailAccount.objectCount.followers}
                </div>
                <div>
                    <strong>Số người đang theo dõi:</strong>
                    <br />
                    {props.detailAccount.objectCount.followings}
                </div>
                <div>
                    <strong>Số bài viết:</strong>
                    <br />
                    {props.detailAccount.objectCount.posts}
                </div>
                <div>
                    <strong>Số bài viết đã chia sẻ:</strong>
                    <br />
                    {props.detailAccount.objectCount.postShares}
                </div>
            </Fieldset>
        </div>
    );
}
