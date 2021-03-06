import React, {useState, useCallback, useMemo, useRef, forwardRef, ForwardedRef, useEffect} from 'react';
import Cropper, {CropperProps} from 'react-easy-crop';
import LocaleReceiver from 'antd/es/locale-provider/LocaleReceiver';
import Modal from 'antd/es/modal';
import Slider from 'antd/es/slider';
import './ZegImgCrop.css';
import {Upload, UploadProps} from "antd";
import ReactCrop, {Crop, PercentCrop} from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

const pkg = 'zeg-img-crop';
const noop = (val: unknown) => {};

const MEDIA_CLASS = `${pkg}-media`;

const ZOOM_STEP = 0.1;

const MIN_ROTATE = 0;
const MAX_ROTATE = 360;
const ROTATE_STEP = 1;

const EasyCrop = forwardRef((props: EasyCropProps, ref) => {
    const {
        src,
        aspect,
        shape,
        grid,

        hasZoom,
        zoomVal,
        rotateVal,
        setZoomVal,
        setRotateVal,

        minZoom,
        maxZoom,
        onComplete,

        cropperProps,
    } = props;

    const imgRef = useRef(null);
    const previewCanvasRef = useRef(null);
    const [crop, setCrop] = useState<Crop>({ unit: '%', width: 50, height: 50 });
    const [completedCrop, setCompletedCrop] = useState<Crop>();
    const [cropSize, setCropSize] = useState({ width: 0, height: 0 });


    const onCropComplete = useCallback(
        (crop: Crop) => {
            setCompletedCrop(crop);
            onComplete(imgRef.current, crop);
        },
        [onComplete]
    );
    const onLoad = useCallback((img) => {
        imgRef.current = img;
    },[]);

    useEffect(() => {
        if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
            return;
        }

        const image: any = imgRef.current;
        const canvas: any = previewCanvasRef.current;
        const crop = completedCrop;

        if(image){
            console.log(image);
            const scaleX = image.naturalWidth / image.width;
            const scaleY = image.naturalHeight / image.height;
            const ctx = canvas.getContext("2d");
            const pixelRatio = window.devicePixelRatio;

            // @ts-ignore
            canvas.width = crop.width * pixelRatio;
            // @ts-ignore
            canvas.height = crop.height * pixelRatio;

            ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
            ctx.imageSmoothingQuality = "high";

            ctx.drawImage(
                image,
                // @ts-ignore
                crop.x * scaleX,
                // @ts-ignore
                crop.y * scaleY,
                // @ts-ignore
                crop.width * scaleX,
                // @ts-ignore
                crop.height * scaleY,
                0,
                0,
                crop.width,
                crop.height
            );
        }

    }, [completedCrop]);
    return (
        <>
            <ReactCrop
                {...cropperProps}
                src={src}
                crop={crop}
                ruleOfThirds
                onImageLoaded={onLoad}
                onChange={(c) => setCrop(c)}
                onComplete={(c) => onCropComplete(c)}
                classes={{ containerClassName: `${pkg}-container`, mediaClassName: MEDIA_CLASS }} >
            </ReactCrop>
            <div>
                <canvas id="previewCanvas"
                        ref={previewCanvasRef}
                    // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
                        style={{
                            width: Math.round(completedCrop?.width ?? 0),
                            height: Math.round(completedCrop?.height ?? 0)
                        }}
                />
            </div>
        </>
    );
});

interface EasyCropProps {
    src: string,
        aspect: number,
        shape: string,
        grid: boolean,

        hasZoom: boolean,
        zoomVal: boolean,
        rotateVal: number,
        setZoomVal: (val: number) => void,
        setRotateVal: (val: number) => void,

        minZoom: number,
        maxZoom: number,
        onComplete: (image: any, crop: Crop) => void,
        cropperProps: any ,
};
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
export const ZegImgCrop = forwardRef((props: ZegImgCropProps, ref: ForwardedRef<UploadProps>) => {
    const {
        aspect,
        shape,
        grid,
        quality,

        zoom,
        rotate,
        minZoom,
        maxZoom,
        fillColor,

        modalTitle,
        modalWidth,
        modalOk,
        modalCancel,

        beforeCrop,
        children,

        cropperProps,
    } = props;

    const hasZoom = zoom === true;
    const hasRotate = rotate === true;

    const [src, setSrc] = useState('');
    const [zoomVal, setZoomVal] = useState(1);
    const [rotateVal, setRotateVal] = useState(0);

    const beforeUploadRef = useRef();
    const fileRef = useRef<File>();
    const resolveRef = useRef(noop);
    const rejectRef = useRef(noop);

    const cropPixelsRef = useRef();

    /**
     * Upload
     */
    const renderUpload = useCallback(() => {
        const upload = Array.isArray(children) ? children[0] : children;
        const { beforeUpload, accept, ...restUploadProps } = upload.props;
        beforeUploadRef.current = beforeUpload;
        return {
            ...upload,
            props: {
                ...restUploadProps,
                accept: accept || 'image/*',
                beforeUpload: (file: File, fileList: any) =>
                    new Promise((resolve, reject) => {
                        if (beforeCrop && !beforeCrop(file, fileList)) {
                            reject();
                            return;
                        }

                        fileRef.current = file;
                        resolveRef.current = resolve;
                        rejectRef.current = reject;

                        const reader = new FileReader();
                        reader.addEventListener('load', () => {
                            setSrc(reader.result as string);
                        });
                        reader.readAsDataURL(file);
                    }),
            },
        };
    }, [beforeCrop, children]);

    /**
     * EasyCrop
     */
    const onComplete = useCallback((naturalImg , crop) => {

    }, [hasRotate, quality, rotateVal]);

    /**
     * Controls
     */
    const isMinZoom = zoomVal - ZOOM_STEP < 1;
    const isMaxZoom = zoomVal + ZOOM_STEP > 3;
    const isMinRotate = rotateVal === MIN_ROTATE;
    const isMaxRotate = rotateVal === MAX_ROTATE;

    const subZoomVal = useCallback(() => {
        if (!isMinZoom) setZoomVal(zoomVal - ZOOM_STEP);
    }, [isMinZoom, zoomVal]);

    const addZoomVal = useCallback(() => {
        if (!isMaxZoom) setZoomVal(zoomVal + ZOOM_STEP);
    }, [isMaxZoom, zoomVal]);

    const subRotateVal = useCallback(() => {
        if (!isMinRotate) setRotateVal(rotateVal - ROTATE_STEP);
    }, [isMinRotate, rotateVal]);

    const addRotateVal = useCallback(() => {
        if (!isMaxRotate) setRotateVal(rotateVal + ROTATE_STEP);
    }, [isMaxRotate, rotateVal]);

    /**
     * Modal
     */
    const modalProps = useMemo(() => {
        const obj = { width: modalWidth, okText: modalOk, cancelText: modalCancel };
        Object.keys(obj).forEach((key) => {
            // if (!obj[key]) delete obj[key]; TBD
        });
        return obj;
    }, [modalCancel, modalOk, modalWidth]);

    const onClose = useCallback(() => {
        setSrc('');
        setZoomVal(1);
        setRotateVal(0);
    }, []);

    const onOk = useCallback(async () => {
        onClose();
        const canvas = document.getElementById("previewCanvas") as HTMLCanvasElement;
        if(canvas){

            // get the new image
            // @ts-ignore
            const { type, name, uid } = fileRef.current;
            canvas.toBlob(async (blob) => {
                    // @ts-ignore
                    let newFile = new File([blob], name, { type });
                    // newFile.uid = uid;

                    if (typeof beforeUploadRef.current !== 'function') return resolveRef.current(newFile);

                    // @ts-ignore
                    const res = beforeUploadRef.current(newFile, [newFile]);

                    if (typeof res !== 'boolean' && !res) {
                        console.error('beforeUpload must return a boolean or Promise');
                        return;
                    }

                    if (res === true) return resolveRef.current(newFile);
                    if (res === false) return rejectRef.current('not upload');
                    if (res && typeof res.then === 'function') {
                        try {
                            const passedFile = await res;
                            const type = Object.prototype.toString.call(passedFile);
                            if (type === '[object File]' || type === '[object Blob]') newFile = passedFile;
                            resolveRef.current(newFile);
                        } catch (err) {
                            rejectRef.current(err);
                        }
                    }
                },
                "image/png",
                quality
            );
        }

    }, [hasRotate, onClose, quality, rotateVal]);
    console.log('OLA');
    const renderComponent = (titleOfModal: string) => (
        <>
            {renderUpload()}
            {src && (
                <Modal
                    visible={true}
                    wrapClassName={`${pkg}-modal`}
                    title={titleOfModal}
                    onOk={onOk}
                    onCancel={onClose}
                    maskClosable={false}
                    destroyOnClose
                    {...modalProps}
                >
                    <EasyCrop
                        ref={ref}
                        src={src}
                        aspect={aspect}
                        shape={shape}
                        grid={grid}
                        hasZoom={hasZoom}
                        zoomVal={hasZoom}
                        rotateVal={rotateVal}
                        setZoomVal={setZoomVal}
                        setRotateVal={setRotateVal}
                        minZoom={minZoom}
                        maxZoom={maxZoom}
                        onComplete={onComplete}
                        cropperProps={cropperProps}
                    />
                    {hasZoom && (
                        <div className={`${pkg}-control zoom`}>
                            <button onClick={subZoomVal} disabled={isMinZoom}>
                                －
                            </button>
                            <Slider
                                min={minZoom}
                                max={maxZoom}
                                step={ZOOM_STEP}
                                value={zoomVal}
                                onChange={setZoomVal}
                            />
                            <button onClick={addZoomVal} disabled={isMaxZoom}>
                                ＋
                            </button>
                        </div>
                    )}
                    {hasRotate && (
                        <div className={`${pkg}-control rotate`}>
                            <button onClick={subRotateVal} disabled={isMinRotate}>
                                ↺
                            </button>
                            <Slider
                                min={MIN_ROTATE}
                                max={MAX_ROTATE}
                                step={ROTATE_STEP}
                                value={rotateVal}
                                onChange={setRotateVal}
                            />
                            <button onClick={addRotateVal} disabled={isMaxRotate}>
                                ↻
                            </button>
                        </div>
                    )}
                </Modal>
            )}
        </>
    );

    if (modalTitle) return renderComponent(modalTitle);

    return (
        <LocaleReceiver>
            {(locale, localeCode) => renderComponent(localeCode === 'zh-cn' ? '编辑图片' : 'Edit image')}
        </LocaleReceiver>
    );
});
