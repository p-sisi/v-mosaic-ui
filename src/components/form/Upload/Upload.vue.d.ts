type UploadStatus = 'ready' | 'uploading' | 'success' | 'error';
type ListType = 'text' | 'picture' | 'picture-card';
interface UploadFile {
    uid: number;
    name: string;
    size: number;
    status: UploadStatus;
    progress: number;
    raw?: File;
    response?: any;
    url?: string;
}
type __VLS_Props = {
    action?: string;
    headers?: Record<string, string>;
    multiple?: boolean;
    data?: Record<string, any>;
    name?: string;
    drag?: boolean;
    listType?: ListType;
    withCredentials?: boolean;
    showFileList?: boolean;
    accept?: string;
    autoUpload?: boolean;
    disabled?: boolean;
    limit?: number;
    httpRequest?: (options: any) => any;
};
/** 手动提交上传（autoUpload 为 false 时使用） */
declare function submit(): void;
/** 清空文件列表 */
declare function clearFiles(): void;
declare var __VLS_1: {}, __VLS_3: {}, __VLS_5: {};
type __VLS_Slots = {} & {
    trigger?: (props: typeof __VLS_1) => any;
} & {
    trigger?: (props: typeof __VLS_3) => any;
} & {
    tip?: (props: typeof __VLS_5) => any;
};
declare const __VLS_component: import("vue").DefineComponent<__VLS_Props, {
    submit: typeof submit;
    clearFiles: typeof clearFiles;
    fileList: import("vue").Ref<{
        uid: number;
        name: string;
        size: number;
        status: UploadStatus;
        progress: number;
        raw?: {
            readonly lastModified: number;
            readonly name: string;
            readonly webkitRelativePath: string;
            readonly size: number;
            readonly type: string;
            arrayBuffer: () => Promise<ArrayBuffer>;
            bytes: () => Promise<Uint8Array<ArrayBuffer>>;
            slice: (start?: number, end?: number, contentType?: string) => Blob;
            stream: () => ReadableStream<Uint8Array<ArrayBuffer>>;
            text: () => Promise<string>;
        } | undefined;
        response?: any;
        url?: string | undefined;
    }[], UploadFile[] | {
        uid: number;
        name: string;
        size: number;
        status: UploadStatus;
        progress: number;
        raw?: {
            readonly lastModified: number;
            readonly name: string;
            readonly webkitRelativePath: string;
            readonly size: number;
            readonly type: string;
            arrayBuffer: () => Promise<ArrayBuffer>;
            bytes: () => Promise<Uint8Array<ArrayBuffer>>;
            slice: (start?: number, end?: number, contentType?: string) => Blob;
            stream: () => ReadableStream<Uint8Array<ArrayBuffer>>;
            text: () => Promise<string>;
        } | undefined;
        response?: any;
        url?: string | undefined;
    }[]>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    success: (response: any, file: UploadFile, fileList: UploadFile[]) => any;
    progress: (event: any, file: UploadFile, fileList: UploadFile[]) => any;
    error: (error: any, file: UploadFile, fileList: UploadFile[]) => any;
    change: (file: UploadFile, fileList: UploadFile[]) => any;
    "update:fileList": (files: UploadFile[]) => any;
    remove: (file: UploadFile, fileList: UploadFile[]) => any;
    exceed: (files: File[], fileList: UploadFile[]) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onSuccess?: ((response: any, file: UploadFile, fileList: UploadFile[]) => any) | undefined;
    onProgress?: ((event: any, file: UploadFile, fileList: UploadFile[]) => any) | undefined;
    onError?: ((error: any, file: UploadFile, fileList: UploadFile[]) => any) | undefined;
    onChange?: ((file: UploadFile, fileList: UploadFile[]) => any) | undefined;
    "onUpdate:fileList"?: ((files: UploadFile[]) => any) | undefined;
    onRemove?: ((file: UploadFile, fileList: UploadFile[]) => any) | undefined;
    onExceed?: ((files: File[], fileList: UploadFile[]) => any) | undefined;
}>, {
    name: string;
    disabled: boolean;
    data: Record<string, any>;
    drag: boolean;
    action: string;
    headers: Record<string, string>;
    multiple: boolean;
    listType: ListType;
    withCredentials: boolean;
    showFileList: boolean;
    accept: string;
    autoUpload: boolean;
    limit: number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
