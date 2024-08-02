"use client";

import { useFormik } from "formik";
import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"
import { Message } from "primereact/message";
import { useState } from "react";
import LoadingBlockUI from "../../component/loading-block-ui";
import { useSessionStorage } from "primereact/hooks";
import { useRouter } from "next/navigation";
import { postEvent } from "@/src/app/api/services/eventService";

type PropsComponent = {

}

type FormikType = {
  title: string;
  content: string;
};

type Errorkeys = 'title' | 'content';

export default function CreateEventPageView(props: PropsComponent) {
  const [loading, setLoading] = useState<boolean>(false)
  const [, setResultMessage] = useSessionStorage("", "result-message");
  const router = useRouter()
  const formik = useFormik({
    initialValues: {
      title: '',
      content: '',
    },
    validate: (data: FormikType) => {
      const errors: {
        title?: string;
        content?: string;
      } = {};
      if (!data.title) {
        errors.title = 'chưa nhập title';
      }
      if (!data.content) {
        errors.content = 'chưa nhập content';
      }
      return errors;
    },
    onSubmit: async (data: FormikType) => {
      setLoading(true)
      await postEvent({
        title: data.title,
        content: data.content,
      }).then((rs) => {
        if (rs) {
          setResultMessage("Tạo mới thành công");
          router.replace("/event")
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
      <h5>Tạo mới (Event)</h5>
      <div className="field">
        <label htmlFor="title">Tên sự kiện</label>
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
      <Button label="tạo" severity="success" type="submit" />
    </form>
  </div>)
}