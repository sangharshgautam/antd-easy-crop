"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZegImgCrop = void 0;
var react_1 = __importStar(require("react"));
var LocaleReceiver_1 = __importDefault(require("antd/es/locale-provider/LocaleReceiver"));
var modal_1 = __importDefault(require("antd/es/modal"));
var slider_1 = __importDefault(require("antd/es/slider"));
var react_image_crop_1 = __importDefault(require("react-image-crop"));
require("react-image-crop/dist/ReactCrop.css");
var pkg = 'zeg-img-crop';
// @ts-ignore
var noop = function (val) { };
var MEDIA_CLASS = pkg + "-media";
var ZOOM_STEP = 0.1;
var MIN_ROTATE = 0;
var MAX_ROTATE = 360;
var ROTATE_STEP = 1;
// @ts-ignore
var EasyCrop = react_1.forwardRef(function (props, ref) {
    var _a, _b;
    var src = props.src, 
    // @ts-ignore
    aspect = props.aspect, shape = props.shape, grid = props.grid, hasZoom = props.hasZoom, zoomVal = props.zoomVal, rotateVal = props.rotateVal, setZoomVal = props.setZoomVal, setRotateVal = props.setRotateVal, minZoom = props.minZoom, maxZoom = props.maxZoom, onComplete = props.onComplete, cropperProps = props.cropperProps;
    var imgRef = react_1.useRef(null);
    var previewCanvasRef = react_1.useRef(null);
    var _c = react_1.useState({ unit: '%', width: 50, height: 50 }), crop = _c[0], setCrop = _c[1];
    var _d = react_1.useState(), completedCrop = _d[0], setCompletedCrop = _d[1];
    // @ts-ignore
    var _e = react_1.useState({ width: 0, height: 0 }), cropSize = _e[0], setCropSize = _e[1];
    var onCropComplete = react_1.useCallback(function (crop) {
        setCompletedCrop(crop);
        onComplete(imgRef.current, crop);
    }, [onComplete]);
    var onLoad = react_1.useCallback(function (img) {
        imgRef.current = img;
    }, []);
    react_1.useEffect(function () {
        if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
            return;
        }
        var image = imgRef.current;
        var canvas = previewCanvasRef.current;
        var crop = completedCrop;
        if (image) {
            var scaleX = image.naturalWidth / image.width;
            var scaleY = image.naturalHeight / image.height;
            var ctx = canvas.getContext("2d");
            var pixelRatio = window.devicePixelRatio;
            // @ts-ignore
            canvas.width = crop.width * pixelRatio;
            // @ts-ignore
            canvas.height = crop.height * pixelRatio;
            ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
            ctx.imageSmoothingQuality = "high";
            ctx.drawImage(image, 
            // @ts-ignore
            crop.x * scaleX, 
            // @ts-ignore
            crop.y * scaleY, 
            // @ts-ignore
            crop.width * scaleX, 
            // @ts-ignore
            crop.height * scaleY, 0, 0, crop.width, crop.height);
        }
    }, [completedCrop]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(react_image_crop_1.default, __assign({}, cropperProps, { src: src, crop: crop, ruleOfThirds: true, onImageLoaded: onLoad, onChange: function (c) { return setCrop(c); }, onComplete: function (c) { return onCropComplete(c); }, classes: { containerClassName: pkg + "-container", mediaClassName: MEDIA_CLASS } })),
        react_1.default.createElement("div", null,
            react_1.default.createElement("canvas", { id: "previewCanvas", ref: previewCanvasRef, 
                // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
                style: {
                    width: Math.round((_a = completedCrop === null || completedCrop === void 0 ? void 0 : completedCrop.width) !== null && _a !== void 0 ? _a : 0),
                    height: Math.round((_b = completedCrop === null || completedCrop === void 0 ? void 0 : completedCrop.height) !== null && _b !== void 0 ? _b : 0)
                } }))));
});
exports.ZegImgCrop = react_1.forwardRef(function (props, ref) {
    var aspect = props.aspect, shape = props.shape, grid = props.grid, quality = props.quality, zoom = props.zoom, rotate = props.rotate, minZoom = props.minZoom, maxZoom = props.maxZoom, 
    // @ts-ignore
    fillColor = props.fillColor, modalTitle = props.modalTitle, modalWidth = props.modalWidth, modalOk = props.modalOk, modalCancel = props.modalCancel, beforeCrop = props.beforeCrop, children = props.children, cropperProps = props.cropperProps;
    var hasZoom = zoom === true;
    var hasRotate = rotate === true;
    var _a = react_1.useState(''), src = _a[0], setSrc = _a[1];
    var _b = react_1.useState(1), zoomVal = _b[0], setZoomVal = _b[1];
    var _c = react_1.useState(0), rotateVal = _c[0], setRotateVal = _c[1];
    var beforeUploadRef = react_1.useRef();
    var fileRef = react_1.useRef();
    var resolveRef = react_1.useRef(noop);
    var rejectRef = react_1.useRef(noop);
    // @ts-ignore
    var cropPixelsRef = react_1.useRef();
    /**
     * Upload
     */
    var renderUpload = react_1.useCallback(function () {
        var upload = Array.isArray(children) ? children[0] : children;
        var _a = upload.props, beforeUpload = _a.beforeUpload, accept = _a.accept, restUploadProps = __rest(_a, ["beforeUpload", "accept"]);
        beforeUploadRef.current = beforeUpload;
        return __assign(__assign({}, upload), { props: __assign(__assign({}, restUploadProps), { accept: accept || 'image/*', beforeUpload: function (file, fileList) {
                    return new Promise(function (resolve, reject) {
                        if (beforeCrop && !beforeCrop(file, fileList)) {
                            reject();
                            return;
                        }
                        fileRef.current = file;
                        resolveRef.current = resolve;
                        rejectRef.current = reject;
                        var reader = new FileReader();
                        reader.addEventListener('load', function () {
                            setSrc(reader.result);
                        });
                        reader.readAsDataURL(file);
                    });
                } }) });
    }, [beforeCrop, children]);
    // @ts-ignore
    var onComplete = react_1.useCallback(function (naturalImg, crop) {
    }, [hasRotate, quality, rotateVal]);
    /**
     * Controls
     */
    var isMinZoom = zoomVal - ZOOM_STEP < 1;
    var isMaxZoom = zoomVal + ZOOM_STEP > 3;
    var isMinRotate = rotateVal === MIN_ROTATE;
    var isMaxRotate = rotateVal === MAX_ROTATE;
    var subZoomVal = react_1.useCallback(function () {
        if (!isMinZoom)
            setZoomVal(zoomVal - ZOOM_STEP);
    }, [isMinZoom, zoomVal]);
    var addZoomVal = react_1.useCallback(function () {
        if (!isMaxZoom)
            setZoomVal(zoomVal + ZOOM_STEP);
    }, [isMaxZoom, zoomVal]);
    var subRotateVal = react_1.useCallback(function () {
        if (!isMinRotate)
            setRotateVal(rotateVal - ROTATE_STEP);
    }, [isMinRotate, rotateVal]);
    var addRotateVal = react_1.useCallback(function () {
        if (!isMaxRotate)
            setRotateVal(rotateVal + ROTATE_STEP);
    }, [isMaxRotate, rotateVal]);
    /**
     * Modal
     */
    var modalProps = react_1.useMemo(function () {
        var obj = { width: modalWidth, okText: modalOk, cancelText: modalCancel };
        // @ts-ignore
        Object.keys(obj).forEach(function (key) {
            // if (!obj[key]) delete obj[key]; TBD
        });
        return obj;
    }, [modalCancel, modalOk, modalWidth]);
    var onClose = react_1.useCallback(function () {
        setSrc('');
        setZoomVal(1);
        setRotateVal(0);
    }, []);
    var onOk = react_1.useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        var canvas, _a, type_1, name_1, uid;
        return __generator(this, function (_b) {
            onClose();
            canvas = document.getElementById("previewCanvas");
            if (canvas) {
                _a = fileRef.current, type_1 = _a.type, name_1 = _a.name, uid = _a.uid;
                canvas.toBlob(function (blob) { return __awaiter(void 0, void 0, void 0, function () {
                    var newFile, res, passedFile, type_2, err_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                newFile = new File([blob], name_1, { type: type_1 });
                                // newFile.uid = uid;
                                if (typeof beforeUploadRef.current !== 'function')
                                    return [2 /*return*/, resolveRef.current(newFile)];
                                res = beforeUploadRef.current(newFile, [newFile]);
                                if (typeof res !== 'boolean' && !res) {
                                    console.error('beforeUpload must return a boolean or Promise');
                                    return [2 /*return*/];
                                }
                                if (res === true)
                                    return [2 /*return*/, resolveRef.current(newFile)];
                                if (res === false)
                                    return [2 /*return*/, rejectRef.current('not upload')];
                                if (!(res && typeof res.then === 'function')) return [3 /*break*/, 4];
                                _a.label = 1;
                            case 1:
                                _a.trys.push([1, 3, , 4]);
                                return [4 /*yield*/, res];
                            case 2:
                                passedFile = _a.sent();
                                type_2 = Object.prototype.toString.call(passedFile);
                                if (type_2 === '[object File]' || type_2 === '[object Blob]')
                                    newFile = passedFile;
                                resolveRef.current(newFile);
                                return [3 /*break*/, 4];
                            case 3:
                                err_1 = _a.sent();
                                rejectRef.current(err_1);
                                return [3 /*break*/, 4];
                            case 4: return [2 /*return*/];
                        }
                    });
                }); }, "image/png", quality);
            }
            return [2 /*return*/];
        });
    }); }, [hasRotate, onClose, quality, rotateVal]);
    console.log('OLA');
    var renderComponent = function (titleOfModal) { return (react_1.default.createElement(react_1.default.Fragment, null,
        renderUpload(),
        src && (react_1.default.createElement(modal_1.default, __assign({ visible: true, wrapClassName: pkg + "-modal", title: titleOfModal, onOk: onOk, onCancel: onClose, maskClosable: false, destroyOnClose: true }, modalProps),
            react_1.default.createElement(EasyCrop, { ref: ref, src: src, aspect: aspect, shape: shape, grid: grid, hasZoom: hasZoom, zoomVal: hasZoom, rotateVal: rotateVal, setZoomVal: setZoomVal, setRotateVal: setRotateVal, minZoom: minZoom, maxZoom: maxZoom, onComplete: onComplete, cropperProps: cropperProps }),
            hasZoom && (react_1.default.createElement("div", { className: pkg + "-control zoom" },
                react_1.default.createElement("button", { onClick: subZoomVal, disabled: isMinZoom }, "\uFF0D"),
                react_1.default.createElement(slider_1.default, { min: minZoom, max: maxZoom, step: ZOOM_STEP, value: zoomVal, onChange: setZoomVal }),
                react_1.default.createElement("button", { onClick: addZoomVal, disabled: isMaxZoom }, "\uFF0B"))),
            hasRotate && (react_1.default.createElement("div", { className: pkg + "-control rotate" },
                react_1.default.createElement("button", { onClick: subRotateVal, disabled: isMinRotate }, "\u21BA"),
                react_1.default.createElement(slider_1.default, { min: MIN_ROTATE, max: MAX_ROTATE, step: ROTATE_STEP, value: rotateVal, onChange: setRotateVal }),
                react_1.default.createElement("button", { onClick: addRotateVal, disabled: isMaxRotate }, "\u21BB"))))))); };
    if (modalTitle)
        return renderComponent(modalTitle);
    return (
    // @ts-ignore
    react_1.default.createElement(LocaleReceiver_1.default, null, function (locale, localeCode) { return renderComponent(localeCode === 'zh-cn' ? '编辑图片' : 'Edit image'); }));
});
