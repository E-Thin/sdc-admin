"use client";

import { useFormik } from "formik";
import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"
import { Message } from "primereact/message";
import { useEffect, useState } from "react";
import LoadingBlockUI from "../../component/loading-block-ui";
import { useSessionStorage } from "primereact/hooks";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import FileUploadItem from "../../component/file-item";
import { postTrainingFields } from "@/src/app/api/services/trainingFieldsService";
import { uploadImageTrainingFields } from "@/src/app/api/services/imageService";
import { InputTextarea } from "primereact/inputtextarea";



const CustomEditor = dynamic(() => import('../../component/ck-editor'), { ssr: false });

type PropsComponent = {

}

type FormikType = {
  title: string;
  body: string;
  thumbnailTrainingFields: File | undefined;
};

type Errorkeys = 'title' | 'body' | 'thumbnailTrainingFields';

export default function TrainingFieldsCreatePageView(props: PropsComponent) {
  const [editorLoaded , setResultMessage] = useSessionStorage("", "result-message");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter()
  const formik = useFormik({
    initialValues: {
      title: '',
      body: '',
      thumbnailTrainingFields: undefined,
    },
    validate: (data: FormikType) => {
      const errors: {
        title?: string;
        body?: string;
        thumbnailTrainingFields?: string,
      } = {};
      if (!data.title) {
        errors.title = 'chưa nhập title';
      }
      if (!data.body) {
        errors.body = 'chưa nhập body';
      }
      if (!data.thumbnailTrainingFields) {
        errors.thumbnailTrainingFields = 'chưa chọn ảnh';
      }
      return errors;
    },
    onSubmit: async (data: FormikType) => {
      setLoading(true);
      const res = await uploadImageTrainingFields({
          image: data.thumbnailTrainingFields
      });
      if (res) {
          await postTrainingFields({
              thumbnailTrainingFields: res.url,
              title: data.title,
              body: data.body
          }).then((rs) => {
              if (rs) {
                  setResultMessage('Tạo mới một chương trình đào tạo thành công');
                  router.replace('/training-fields');
              }
              setLoading(false);
          });
      }
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
      <h5>Tạo mới (TrainingFields)</h5>
      <div className="field col-12 md:col-4">
        <label htmlFor="firstname2">Ảnh thumbnail TrainingFields</label>
        <FileUploadItem
          onChange={(file) => {
            if (file) {
              formik.setFieldValue('thumbnailTrainingFields', file);
            }
          }}
        />
        <div>{errorFormMessage('thumbnailTrainingFields', handleErrorValidate('thumbnailTrainingFields'))}</div>
      </div>
      <div className="field">
        <label htmlFor="title">Tên chương trình đào tạo</label>
        <InputText
          className={`${handleErrorValidate('title') && 'p-invalid'}`}
          id="title" type="text"
          value={formik.values.title}
          onChange={(e) => formik.setFieldValue("title", e.target.value)} />
        <div>{errorFormMessage('title', handleErrorValidate('title'))}</div>
      </div>
      <div className="field">
        <label htmlFor="body">Mô tả</label>
        {/* <InputText
          className={`${handleErrorValidate('body') && 'p-invalid'}`}
          id="body" type="text"
          value={formik.values.body}
          onChange={(e) => formik.setFieldValue("body", e.target.value)} /> */}
        <CustomEditor onChange={(data) => formik.setFieldValue('body', data)} insertImage initialData={formik.values.body} />
        <div>{errorFormMessage('body', handleErrorValidate('body'))}</div>
      </div>

      <Button label="tạo" severity="success" type="submit" />
    </form>
  </div>)
}