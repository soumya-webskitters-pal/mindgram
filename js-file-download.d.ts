declare module 'svg_circle' {
    export default function fileDownload(
        data: string | ArrayBuffer | ArrayBufferView | Blob,
        filename: string,
        mime?: string,
        bom?: string | Uint8Array
    ): void;
}
