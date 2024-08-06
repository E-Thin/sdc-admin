"use client";

import { useFormik } from "formik";
import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"
import { Message } from "primereact/message";
import { useEffect, useState } from "react";
import LoadingBlockUI from "../../component/loading-block-ui";
import { useSessionStorage } from "primereact/hooks";
import { useRouter } from "next/navigation";
import { createNews } from "@/src/app/api/services/newService";
import { TypeNewsForCard } from "@/src/app/api/services/typeNewsService";
import { MultiSelect } from "primereact/multiselect";
import dynamic from "next/dynamic";
import { InputTextarea } from 'primereact/inputtextarea';
import FileUploadItem from "../../component/file-item";
import Image from 'next/image';
import { getAllAssetNews, updateContentAssetNews, uploadImageNews } from "@/src/app/api/services/imageService";



const CustomEditor = dynamic(() => import('../../component/ck-editor'), { ssr: false });

type PropsComponent = {
  listTypeNews: Array<TypeNewsForCard>
};

type FormikType = {
  title: string;
  body: string;
  description: string;
  thumbnailNews: File | undefined;
  typenewsId: Array<string>;
};

type Errorkeys = 'title' | 'body' | 'thumbnailNews' | 'typenewsId' | 'description';

export default function NewsCreatePageView(props: PropsComponent) {
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [listAssetContent, setListAssetContent] = useState<Array<string>>();
  const [, setResultMessage] = useSessionStorage("", "result-message");
  useEffect(() => {
    setEditorLoaded(true);
    getAllAssetNews().then((rs) => {
        if (rs) {
            setListAssetContent(rs.assets);
        }
    });
}, []);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter()

  const onHandleUploadImageContent = async (file?: File) => {
    if (file) {
        setLoading(true);
        const res = await uploadImageNews({
            image: file
        });
        await updateContentAssetNews({
          idAssetContent: res?.id ?? ''
      });

      await getAllAssetNews()
                .then((rs) => {
                    if (rs) {
                        setListAssetContent(rs.assets);
                    }
                })
                .then(() => {
                    setLoading(false);
                });
    }
};

  const formik = useFormik({
    initialValues: {
      title: '',
      body: '',
      description: '',
      thumbnailNews: undefined,
      typenewsId: []
    },
    validate: (data: FormikType) => {
      const errors: {
        title?: string;
        body?: string;
        description?: string;
        thumbnailNews?: string,
        typenewsId?: string;
      } = {};
      if (!data.title) {
        errors.title = 'chưa nhập title';
      }
      if (!data.body) {
        errors.body = 'chưa nhập body';
      }
      if (!data.description) {
        errors.description = 'chưa nhập description';
      }
      if (!data.thumbnailNews) {
        errors.thumbnailNews = 'chưa chọn ảnh';
      }
      if (!data.typenewsId.length) {
        errors.typenewsId = 'chưa chọn loại tin';
      }

      return errors;
    },
    onSubmit: async (data: FormikType) => {
      setLoading(true);
      const res = await uploadImageNews({
          image: data.thumbnailNews
      });
      if (res) {
          await createNews({
              typenewsId: data.typenewsId,
              thumbnailNews: res.url,
              description: data.description,
              title: data.title,
              body: data.body
          }).then((rs) => {
              if (rs) {
                  setResultMessage('Tạo mới một news thành công');
                  router.replace('/news');
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
      <h5>Tạo mới (news)</h5>
      <div className="field col-12 md:col-4">
        <label htmlFor="firstname2">Ảnh thumbnail News</label>
        <FileUploadItem
          onChange={(file) => {
            if (file) {
              formik.setFieldValue('thumbnailNews', file);
            }
          }}
        />
        <div>{errorFormMessage('thumbnailNews', handleErrorValidate('thumbnailNews'))}</div>
      </div>
      <div className="field">
        <label htmlFor="title">Tên new</label>
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

      <div className="field col-12">
        <label htmlFor="address">Nội dung tin tức</label>
        <div className="flex align-items-center justify-content-center">
          {editorLoaded ? (
            <div className="overflow-x-auto min-h-[88px] custom-ck-editor bg-white " style={{ width: '100%', minHeight: '700px' }}>
              <CustomEditor onChange={(data) => formik.setFieldValue('body', data)} insertImage initialData={formik.values.body} />
              <div>{errorFormMessage('body', handleErrorValidate('body'))}</div>
            </div>
          ) : (
            <InputTextarea />
          )}

          <div className="flex flex-column h-fit gap-3 sticky top-1" style={{ width: '350px', flex: 'none', paddingLeft: 10, maxHeight: '700px', overflowY: 'scroll' }}>
            <div className="w-full flex align-items-start flex-wrap gap-2 h-full">
              <FileUploadItem onChange={onHandleUploadImageContent} noShowImage={true} />

              {listAssetContent?.map((item) => (
                <div key={item} style={{ width: '100px', height: '150px', position: 'relative', overflow: 'hidden' }}>
                  <Image src={item} width={200} height={200} style={{ position: 'absolute', objectFit: 'contain', width: '100%' }} alt="image asset" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="field col-12 md:col-6">
        <label htmlFor="city">Loại tin tức</label>
        <MultiSelect
          id="multiselect"
          options={props.listTypeNews}
          value={formik.values.typenewsId}
          onChange={(e) => formik.setFieldValue('typenewsId', e.value)}
          optionLabel="nameTypeNews"
          optionValue="id"
        />
        <div>{errorFormMessage('typenewsId', handleErrorValidate('typenewsId'))}</div>
      </div>
      <Button label="tạo" severity="success" type="submit" />
    </form>
  </div>)
}