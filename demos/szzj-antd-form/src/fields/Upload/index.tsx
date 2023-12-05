import React, { useState } from 'react';
import { UploadOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Upload as AntdUpload, Button } from 'antd';
import { convetAccept, fileValidatorFactory } from './utils';
import createField from '../../createField';
import { useFieldContext } from '../../contexts/FieldContext';
import logger from '../../logger';
import { UploadFile, UploadChangeParam, RcFile } from 'antd/es/upload/interface';
import './index.less';
import { UploadProps } from './types';

const Upload = ({
  fileName,
  max, // 最大上传数
  fileList, // 作为 value
  onChange,
  beforeUpload: beforeUploadProp,
  children,
  ...rest
}: UploadProps) => {
  const { name } = useFieldContext()!;
  const [loading, setLoading] = useState<boolean>(false);

  const defaultTransformFile = rest.watermark
    ? (file: RcFile) => {
        return new Promise<string | Blob | File>((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            const canvas = document.createElement('canvas');
            const img = document.createElement('img');
            img.src = reader.result as string;
            img.onload = () => {
              const ctx = canvas.getContext('2d');
              if (!ctx) return;
              ctx.drawImage(img, 0, 0);
              ctx.fillStyle = 'red';
              ctx.textBaseline = 'middle';
              ctx.fillText(rest.watermark as string, 20, 20);
              // @ts-ignore
              canvas.toBlob(resolve);
            };
          };
        });
      }
    : undefined;
  const transformFile = rest.transformFile ? rest.transformFile : defaultTransformFile;

  const beforeUpload = fileValidatorFactory(rest); // 上传前校验

  const handleChange = (info: UploadChangeParam<UploadFile<any>>) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      onChange && onChange(info);
      return;
    }

    if (info.file.status === 'done') {
      setLoading(false);
      if (info.file.response && info.file.response.success) {
        logger.success('上传成功');
      } else {
        logger.fail(`上传失败，${info.file.response.errorMsg || info.file.response.errorMessage}`);
      }
    } else if (info.file.status === 'error') {
      setLoading(false);
      logger.fail(`上传失败，${info.file.response.errorMsg || info.file.response.errorMessage}`);
    } else {
      setLoading(false);
    }

    info.fileList = info.fileList.filter((file: any) => {
      if (
        file.status === 'error' ||
        file.uploadPrevented ||
        (file.status === 'done' && file.response && !file.response.success)
      )
        return false;

      return true;
    });

    if (onChange) onChange(info);
  };

  /**
   * listType 为 'picture-card' 时展示上传图片框
   * 其他展示上传按钮
   */
  const uploadBtn = children ? (
    children
  ) : rest.listType == 'picture-card' ? (
    <div className="szaf-upload-picture">
      <PlusOutlined className="szaf-upload-picture-icon" />
      <div className="ant-upload-text">上传图片</div>
    </div>
  ) : (
    <Button type="default">
      {loading ? (
        <LoadingOutlined className="szaf-upload-icon" />
      ) : (
        <UploadOutlined className="szaf-upload-icon" />
      )}
      文件上传
    </Button>
  );

  return (
    <AntdUpload
      {...rest}
      name={fileName || (name as string)}
      fileList={fileList}
      accept={convetAccept(rest.accept)}
      transformFile={transformFile}
      beforeUpload={beforeUploadProp ? beforeUploadProp : beforeUpload}
      onChange={handleChange}
    >
      {/* 上传达到指定文件时，隐藏上传按钮 */}
      {max != undefined && fileList && fileList.length >= max ? null : uploadBtn}
    </AntdUpload>
  );
};

export default createField<UploadProps>(Upload, {
  defaultDetailType: 'tag',
  defaultFormItemProps: {
    valuePropName: 'fileList',
    getValueFromEvent: (e: any) => {
      return Array.isArray(e) ? e : e && e.fileList;
    },
  },
});
