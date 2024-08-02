/* eslint-disable @next/next/no-img-element */

import React from 'react';
import Link from 'next/link';
import { MenuProvider } from '../context/menucontext';

const AppMenu = () => {
    const model = [
        {
            label: 'Quản lí',
            items: [
                {
                    label: 'Tài khoản',
                    icon: 'pi pi-fw pi-list',
                    items: [
                        { label: 'Danh sách tài khoản', icon: 'pi pi-fw pi-bookmark', to: '/accounts' },
                        { label: 'Tạo tài khoản', icon: 'pi pi-fw pi-bookmark', to: '/accounts/create' }
                    ]
                },
                {
                    label: 'role (quyền)',
                    icon: 'pi pi-fw pi-list',
                    items: [
                        { label: 'Danh sách quyền', icon: 'pi pi-fw pi-bookmark', to: '/roles' },
                        { label: 'Tạo quyền', icon: 'pi pi-fw pi-bookmark', to: '/roles/create' }
                    ]
                },
                {
                    label: 'Tin tức',
                    icon: 'pi pi-fw pi-list',
                    items: [
                        { label: 'Danh sách tin tức', icon: 'pi pi-fw pi-bookmark', to: '/news' },
                        { label: 'Tạo tin mới', icon: 'pi pi-fw pi-bookmark', to: '/news/create' }
                    ]
                },
                {
                    label: 'Thông báo',
                    icon: 'pi pi-fw pi-list',
                    items: [
                        { label: 'Danh sách thông báo', icon: 'pi pi-fw pi-bookmark', to: '/notifi' },
                        { label: 'Tạo thông báo mới', icon: 'pi pi-fw pi-bookmark', to: '/notifi/create' }
                    ]
                },
                {
                    label: 'Sự kiện',
                    icon: 'pi pi-fw pi-list',
                    items: [
                        { label: 'Danh sách sự kiện', icon: 'pi pi-fw pi-bookmark', to: '/event' },
                        { label: 'Tạo sự kiện', icon: 'pi pi-fw pi-bookmark', to: '/event/create' }
                    ]
                },
                {
                    label: 'Tuyển sinh',
                    icon: 'pi pi-fw pi-list',
                    items: [
                        { label: 'Danh sách thông tin tuyển sinh', icon: 'pi pi-fw pi-bookmark', to: '/admissions' },
                        { label: 'Tạo thông tin tuyển sinh mới', icon: 'pi pi-fw pi-bookmark', to: '/admissions/create' }
                    ]
                },
                {
                    label: 'Đối tác',
                    icon: 'pi pi-fw pi-list',
                    items: [
                        { label: 'Danh sách đối tác', icon: 'pi pi-fw pi-bookmark', to: '/partners' },
                        { label: 'Tạo đối tác mới', icon: 'pi pi-fw pi-bookmark', to: '/partners/create' }
                    ]
                },
            ]
        }
    ];
    return (
        <MenuProvider>
            <ul className="layout-menu">
                {model.map((item, i) => {
                    return (
                        <div>
                            <li className="menu-separator" key={i}>
                                {item.label}
                            </li>
                            <div>
                                {item.items.map((it, index) => (
                                    <div key={index}>
                                        {it.items.map((item, index) => (
                                            <div key={index}>
                                                <Link href={item.to}>{item.label}</Link>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </ul>
        </MenuProvider>
    );
};

export default AppMenu;