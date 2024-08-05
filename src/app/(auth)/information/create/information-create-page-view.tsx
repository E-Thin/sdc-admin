'use client';

import { useFormik } from 'formik';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Message } from 'primereact/message';
import { useState } from 'react';
import LoadingBlockUI from '../../component/loading-block-ui';
import { useSessionStorage } from 'primereact/hooks';
import { useRouter } from 'next/navigation';
import { postInformation } from '@/src/app/api/services/informationService';

type PropsComponent = {};

type FormikType = {
    title: string;
    body: string;
};

type Errorkeys = 'title' | 'body';

export default function CreateInformationPageView(props: PropsComponent) {
    const [loading, setLoading] = useState<boolean>(false);
    const [, setResultMessage] = useSessionStorage('', 'result-message');
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            title: '',
            body: ''
        },
        validate: (data: FormikType) => {
            const errors: {
                title?: string;
                body?: string;
            } = {};
            if (!data.title) {
                errors.title = 'chưa nhập title';
            }
            if (!data.body) {
                errors.body = 'chưa nhập body';
            }
            return errors;
        },
        onSubmit: async (data: FormikType) => {
            setLoading(true);
            await postInformation({
                title: data.title,
                body: data.body
            }).then((rs) => {
                if (rs) {
                    setResultMessage('Tạo mới thành công');
                    router.replace('/information');
                }
            });
            setLoading(false);
        }
    });

    const handleErrorValidate = (key: Errorkeys) => {
        return !!(formik.touched[key] && formik.errors[key]);
    };

    const errorFormMessage = (key: Errorkeys, condition?: boolean, className?: string, style?: React.CSSProperties) => {
        return <div>{condition && <Message severity="error" text={String(formik.errors[key])} className={className} style={style} />}</div>;
    };

    return (
        <div className="card p-fluid">
            <LoadingBlockUI visible={loading} />
            <form onSubmit={formik.handleSubmit}>
                <h5>Tạo mới (Information)</h5>
                <div className="field">
                    <label htmlFor="title">Tên thông tin</label>
                    <InputText className={`${handleErrorValidate('title') && 'p-invalid'}`} id="title" type="text" value={formik.values.title} onChange={(e) => formik.setFieldValue('title', e.target.value)} />
                    <div>{errorFormMessage('title', handleErrorValidate('title'))}</div>
                </div>
                <div className="field">
                    <label htmlFor="body">Nội dung</label>
                    <InputText className={`${handleErrorValidate('body') && 'p-invalid'}`} id="body" type="text" value={formik.values.body} onChange={(e) => formik.setFieldValue('body', e.target.value)} />
                    <div>{errorFormMessage('body', handleErrorValidate('body'))}</div>
                </div>
                <Button label="tạo" severity="success" type="submit" />
            </form>
        </div>
    );
}
