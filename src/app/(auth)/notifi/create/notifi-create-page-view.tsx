"use client";

import { useFormik } from "formik";
import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"
import { Message } from "primereact/message";
import { useState } from "react";
import LoadingBlockUI from "../../component/loading-block-ui";
import { useSessionStorage } from "primereact/hooks";
import { useRouter } from "next/navigation";
import { postNotifi } from "@/src/app/api/services/notifiService";

type PropsComponent = {

}

type FormikType = {
  title: string;
  content: string;
  departmentId: string;
};

type Errorkeys = 'title' | 'content' | 'departmentId';

export default function CreateNotifiPageView(props: PropsComponent) {
  const [loading, setLoading] = useState<boolean>(false)
  const [, setResultMessage] = useSessionStorage("", "result-message");
  const router = useRouter()
  const formik = useFormik({
    initialValues: {
      title: '',
      content: '',
      departmentId: ''
    },
    validate: (data: FormikType) => {
      const errors: {
        title?: string;
        content?: string;
        departmentId?: string;
      } = {};
      if (!data.title) {
        errors.title = 'chưa nhập title';
      }
      if (!data.content) {
        errors.content = 'chưa nhập content';
      }
      if (!data.departmentId) {
        errors.departmentId = 'chưa chọn phòng ban';
      }

      return errors;
    },
    onSubmit: async (data: FormikType) => {
      setLoading(true)
      await postNotifi({
        title: data.title,
        content: data.content,
        departmentId: data.departmentId
      }).then((rs) => {
        if (rs) {
          setResultMessage("Tạo mới thành công");
          router.replace("/notifi")
        }
      })
      setLoading(false);
    }
  });


  const handleErrorValidate = (key: Errorkeys) => {
    return !!(formik.touched[key] && formik.errors[key]);
  };

  const errorFormMessage = (key: Errorkeys, condition?: boolean, className?: string, style?: React.CSSProperties) => {
    return <div>{condition &&
      <Message
        severity="error"
        text={String(formik.errors[key])}
        className={className}
        style={style} />}</div>;
  };

  return (<div className="card p-fluid">
    <LoadingBlockUI visible={loading} />
    <form onSubmit={formik.handleSubmit}>
      <h5>Tạo mới (Notifi)</h5>
      <div className="field">
        <label htmlFor="title">Tiêu đề</label>
        <InputText
          className={`${handleErrorValidate('title') && 'p-invalid'}`}
          id="title" type="text"
          value={formik.values.title}
          onChange={(e) => formik.setFieldValue("title", e.target.value)} />
        <div>{errorFormMessage('title', handleErrorValidate('title'))}</div>
      </div>
      <div className="field">
        <label htmlFor="content">Nội dung</label>
        <InputText
          className={`${handleErrorValidate('content') && 'p-invalid'}`}
          id="content" type="text"
          value={formik.values.content}
          onChange={(e) => formik.setFieldValue("content", e.target.value)} />
        <div>{errorFormMessage('content', handleErrorValidate('content'))}</div>
      </div>
      <div className="field">
        <label htmlFor="departmentId">Phòng ban</label>
        <InputText
          className={`${handleErrorValidate('departmentId') && 'p-invalid'}`}
          id="departmentId" type="text"
          value={formik.values.departmentId}
          onChange={(e) => formik.setFieldValue("departmentId", e.target.value)} />
        <div>{errorFormMessage('departmentId', handleErrorValidate('departmentId'))}</div>
      </div>
      <Button label="tạo" severity="success" type="submit" />
    </form>
  </div>)
}