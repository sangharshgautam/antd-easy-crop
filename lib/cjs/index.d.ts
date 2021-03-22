import React from 'react';
import { CropperProps } from 'react-easy-crop';
import { UploadProps } from "antd";
import 'react-image-crop/dist/ReactCrop.css';
export interface ZegImgCropProps {
    aspect: number;
    shape: 'rect' | 'round';
    grid: boolean;
    quality?: number;
    fillColor?: string;
    zoom?: boolean;
    rotate?: boolean;
    minZoom: number;
    maxZoom: number;
    modalTitle?: string;
    modalWidth?: number | string;
    modalOk?: string;
    modalCancel?: string;
    beforeCrop?: (file: File, fileList: File[]) => boolean;
    cropperProps?: Partial<CropperProps>;
    children?: any;
}
export declare const ZegImgCrop: React.ForwardRefExoticComponent<ZegImgCropProps & React.RefAttributes<UploadProps<any>>>;
