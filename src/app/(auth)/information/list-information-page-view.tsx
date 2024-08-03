"use client"

import { useRouter } from "next/navigation"
import { Button } from "primereact/button"
import { Column } from "primereact/column"
import { DataTable } from "primereact/datatable"
import { Dialog } from "primereact/dialog"
import { useSessionStorage } from "primereact/hooks"
import { Toast } from "primereact/toast"
import { useEffect, useRef, useState } from "react"
import LoadingBlockUI from "../component/loading-block-ui"
import { useSWRConfig } from 'swr';
import { deleteInformation, InformationForCard } from "@/src/app/api/services/informationService"

type PropsComponent = {
  listInformation: Array<InformationForCard>
}

export default function ListInformationPageView(props: PropsComponent) {
  const router = useRouter()
  const toast = useRef<Toast>(null);
  const [resultMessage, setResultMessage] = useSessionStorage('', 'result-message');
  const [displayConfirmation, setDisplayConfirmation] = useState(false);
  const [selectInformation, setSelectInformation] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const { mutate } = useSWRConfig()

  useEffect(() => {
    if (resultMessage) {
      toast.current?.show({
        severity: 'info',
        summary: resultMessage
      });
      setResultMessage('');
    }
  }, [resultMessage, setResultMessage]);

  const handleDeleteInformation = async (idInformation?: string) => {
    try {
      setLoading(true)
      idInformation && await deleteInformation(idInformation).then((rs) => {
        if (rs) {
          mutate('getInformationListPageData')
          setSelectInformation("");
          setLoading(false);
          setDisplayConfirmation(false);
        }
      })
    } catch (error) {
      console.error(error);
    }
  }

  return (<div className="col-12">
    <Toast ref={toast} position="top-center" />
    <div className="card">
      <Button label="Thêm mới" severity="success" outlined onClick={() => {
        router.push("/information/create")
      }} />
      <h5>Danh sách thông tin (Information)</h5>
      <DataTable value={props.listInformation} scrollable scrollHeight="700px" className="mt-3">
        <Column field="id" header="ID" style={{ flexGrow: 1, flexBasis: '160px' }} frozen className="font-bold"></Column>
        <Column field="title" header="Title" style={{ flexGrow: 1, flexBasis: '100px' }} alignFrozen="left"></Column>
        <Column field="body" header="Body" style={{ flexGrow: 1, flexBasis: '200px' }}></Column>
        <Column field="created_at" header="Ngày tạo" style={{ flexGrow: 1, flexBasis: '200px' }}></Column>
        <Column field="company" header="Tác vụ" style={{ flexGrow: 1, flexBasis: '200px' }} body={(data: InformationForCard) => (
          <div className="flex gap-3">
            <Button label="Xóa" severity="secondary" outlined onClick={() => {
              setDisplayConfirmation(true)
              setSelectInformation(data.id)
            }} />
          </div>
        )}></Column>
      </DataTable>
      <Dialog
        header="Xác nhận"
        visible={displayConfirmation}
        onHide={() => setDisplayConfirmation(false)}
        footer={
          <>
            <Button type="button" label="Không" icon="pi pi-times" onClick={() => setDisplayConfirmation(false)} text />
            <Button type="button" label="Có" icon="pi pi-check" onClick={() => handleDeleteInformation(selectInformation)} text autoFocus />
          </>
        }
        style={{ width: '350px' }} modal>
        <div className="flex align-items-center justify-content-center">
          <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
          <span>Bạn có chắc muốn xóa thông tin này?</span>
        </div>
      </Dialog>
      <LoadingBlockUI visible={loading} />
    </div>
  </div>)
}