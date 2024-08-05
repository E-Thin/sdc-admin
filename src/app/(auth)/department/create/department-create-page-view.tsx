"use client";

import { useFormik } from "formik";
import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"
import { Message } from "primereact/message";
import { useState } from "react";
import LoadingBlockUI from "../../component/loading-block-ui";
import { useSessionStorage } from "primereact/hooks";
import { useRouter } from "next/navigation";

import { postDeparment } from "@/src/app/api/services/departmentService";

type PropsComponent = {

}

type FormikType = {
  title: string;
  description: string;
};

type Errorkeys = 'title' | 'description';

export default function CreateDepartmentPageView(props: PropsComponent) {
  const [loading, setLoading] = useState<boolean>(false)
  const [, setResultMessage] = useSessionStorage("", "result-message");
  const router = useRouter()
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
    },
    validate: (data: FormikType) => {
      const errors: {
        title?: string;
        description?: string;
      } = {};
      if (!data.title) {
        errors.title = 'chưa nhập title';
      }
      if (!data.description) {
        errors.description = 'chưa nhập description';
      }
      return errors;
    },
    onSubmit: async (data: FormikType) => {
      setLoading(true)
      await postDeparment({
        title: data.title,
        description: data.description,
      }).then((rs) => {
        if (rs) {
          setResultMessage("Tạo mới thành công");
          router.replace("/department")
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
      <h5>Tạo mới (Department)</h5>
      <div className="field">
        <label htmlFor="title">Tên phòng</label>
        <InputText
          className={`${handleErrorValidate('title') && 'p-invalid'}`}
          id="title" type="text"
          value={formik.values.title}
          onChange={(e) => formik.setFieldValue("title", e.target.value)} />
        <div>{errorFormMessage('title', handleErrorValidate('title'))}</div>
      </div>
      <div className="field">
        <label htmlFor="description">Mô tả</label>
        <InputText
          className={`${handleErrorValidate('description') && 'p-invalid'}`}
          id="description" type="text"
          value={formik.values.description}
          onChange={(e) => formik.setFieldValue("description", e.target.value)} />
        <div>{errorFormMessage('description', handleErrorValidate('description'))}</div>
      </div>
      <Button label="tạo" severity="success" type="submit" />
    </form>
  </div>)
}