import React from 'react';
import 'antd/dist/antd.css';
import './App.css';
import {Button, Upload} from "antd";
import { UploadOutlined } from '@ant-design/icons'
import {ZegImgCrop, ZegImgCropProps} from "antd-easy-crop";
function App() {
    const imgCropProps: ZegImgCropProps = {
        aspect: 1,
        shape: 'rect',
        grid: false,
        minZoom: 0,
        maxZoom: 10,
        rotate: true,
        zoom: true
    };
    return (
      <div className="App">
          <h1>HELLO2</h1>
          <ZegImgCrop {...imgCropProps}>
              <Upload><Button icon={<UploadOutlined />}>Click to Upload</Button></Upload>
          </ZegImgCrop>
      </div>
  );
}

export default App;
