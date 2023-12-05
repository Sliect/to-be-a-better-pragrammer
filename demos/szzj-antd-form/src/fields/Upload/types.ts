import { UploadProps as AntdUploadProps } from 'antd/es/upload';

export type UploadProps = AntdUploadProps & {
  fileName?: string; // 若 name 在 Upload 或 FormItem 表现不一致时使用
  max?: number; // 最大上传数
  maxSize?: number; // 最大上传大小
  watermark?: string;
  children?: React.ReactNode;
  accept?: 'image' | 'audio' | 'vedio' | 'doc' | 'excel' | 'pdf' | 'ppt';
};
