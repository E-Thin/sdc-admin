"use client";

import { useFormik } from "formik";
import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"
import { Message } from "primereact/message";
import { useState } from "react";
import LoadingBlockUI from "../../component/loading-block-ui";
import { useSessionStorage } from "primereact/hooks";
import { useRouter } from "next/navigation";
import { postPartner } from "@/src/app/api/services/partnersService";

type PropsComponent = {

}

type FormikType = {
  name: string;
  thumbnailParter: string;
};

type Errorkeys = 'name' | 'thumbnailParter';

export default function CreatePartnersPageView(props: PropsComponent) {
  const [loading, setLoading] = useState<boolean>(false)
  const [, setResultMessage] = useSessionStorage("", "result-message");
  const router = useRouter()
  const formik = useFormik({
    initialValues: {
      name: '',
      thumbnailParter: '',
    },
    validate: (data: FormikType) => {
      const errors: {
        name?: string;
        thumbnailParter?: string;
      } = {};
      if (!data.name) {
        errors.name = 'chưa nhập name';
      }
      if (!data.thumbnailParter) {
        errors.thumbnailParter = 'chưa nhập thumbnailParter';
      }

      return errors;
    },
    onSubmit: async (data: FormikType) => {
      setLoading(true)
      await postPartner({
        name: data.name,
        thumbnailParter: data.thumbnailParter,
      }).then((rs) => {
        if (rs) {
          setResultMessage("Tạo mới thành công");
          router.replace("/partners")
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
      <h5>Tạo mới (Partners)</h5>
      <div className="field">
        <label htmlFor="name">Tên new</label>
        <InputText
          className={`${handleErrorValidate('name') && 'p-invalid'}`}
          id="name" type="text"
          value={formik.values.name}
          onChange={(e) => formik.setFieldValue("name", e.target.value)} />
        <div>{errorFormMessage('name', handleErrorValidate('name'))}</div>
      </div>
      <div className="field">
        <label htmlFor="thumbnailParter">Nội dung</label>
        <InputText
          className={`${handleErrorValidate('thumbnailParter') && 'p-invalid'}`}
          id="thumbnailParter" type="text"
          value={formik.values.thumbnailParter}
          onChange={(e) => formik.setFieldValue("thumbnailParter", e.target.value)} />
        <div>{errorFormMessage('thumbnailParter', handleErrorValidate('thumbnailParter'))}</div>
      </div>
      <Button label="tạo" severity="success" type="submit" />
    </form>
  </div>)
}