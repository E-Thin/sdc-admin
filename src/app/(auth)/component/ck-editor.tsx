import { CKEditor as CkEditor5 } from "@ckeditor/ckeditor5-react";

import {
    AccessibilityHelp,
    AutoImage,
    AutoLink,
    Autosave,
    Base64UploadAdapter,
    Bold,
    ClassicEditor,
    Essentials,
    FontBackgroundColor,
    FontColor,
    FontFamily,
    FontSize,
    Heading,
    ImageBlock,
    ImageInline,
    ImageInsert,
    ImageInsertViaUrl,
    ImageResize,
    ImageStyle,
    ImageToolbar,
    ImageUpload,
    Italic,
    Link,
    LinkImage,
    List,
    Paragraph,
    SelectAll,
    SourceEditing,
    Table,
    TableCaption,
    TableCellProperties,
    TableColumnResize,
    TableProperties,
    TableToolbar,
    Undo,
} from "ckeditor5";

import "ckeditor5/ckeditor5.css";

type Props = {
    onReady?: () => void;
    initialData: string | undefined;
    onChange?: (data: string) => void;
    insertImage?: boolean | undefined;
    items?: string[];
};

export default function CkEditor(props: Props) {
    const imageConfig = props.insertImage ? ["|", "insertImage"] : [];
    const items = props.items || [
        "heading",
        "|",
        "bold",
        "italic",
        "|",
        "fontsize",
        "fontColor",
        "fontBackgroundColor",
        "link",
        "bulletedList",
        "numberedList",
        "linkImage",
        ...imageConfig,
    ];
    const editorConfiguration = {
        image: {
            resizeOptions: [{
                name: "resizeImage:original",
                value: null,
            }, {
                name: "resizeImage:50",
                value: "50",
            }, {
                name: "resizeImage:75",
                value: "75",
            }],
            toolbar: [
                "imageTextAlternative",
                "|",
                "imageStyle:inline",
                "imageStyle:wrapText",
                "imageStyle:breakText",
                "resizeImage",
                "linkImage",
            ],
        },
        table: {
            contentToolbar: ["tableColumn", "tableRow", "mergeTableCells", "tableProperties", "tableCellProperties"],
        },
        plugins: [
            AccessibilityHelp,
            AutoImage,
            AutoLink,
            Autosave,
            Base64UploadAdapter,
            Bold,
            Essentials,
            FontBackgroundColor,
            FontColor,
            FontFamily,
            FontSize,
            Heading,
            ImageInline,
            ImageBlock,
            ImageInsert,
            ImageInsertViaUrl,
            ImageResize,
            ImageStyle,
            ImageToolbar,
            ImageUpload,
            Italic,
            Link,
            LinkImage,
            List,
            Paragraph,
            SelectAll,
            SourceEditing,
            Undo,
            Table,
            TableCaption,
            TableCellProperties,
            TableColumnResize,
            TableProperties,
            TableToolbar,
        ],
        toolbar: {
            items: items,
        },
    };

    return (
        <CkEditor5
            onReady={() => props.onReady?.()}
            editor={ClassicEditor}
            config={editorConfiguration}
            data={props.initialData}
            onChange={(event, editor) => {
                const data = editor.getData();
                props.onChange?.(data);
            }}
        />
    );
}
