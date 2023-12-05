import logger from '../../logger';
import { UploadProps } from './types';

// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#Unique_file_type_specifiers
export const convetAccept = (
  accept?: 'image' | 'audio' | 'vedio' | 'doc' | 'excel' | 'pdf' | 'ppt',
) => {
  return (accept || '')
    .split(',')
    .map((type) => {
      let convertedType = type;
      switch (type) {
        // 图片
        case 'image':
          convertedType = 'image/*';
          break;
        // 音频
        case 'audio':
          convertedType = 'audio/*';
          break;
        // 视频
        case 'vedio':
          convertedType = 'vedio/*';
          break;
        // doc 文档
        case 'doc':
          convertedType =
            '.doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document';
          break;
        // excel
        case 'excel':
          convertedType =
            '.xls,.xlsx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
          break;
        case 'pdf':
          convertedType = '.pdf';
          break;
        case 'ppt':
          convertedType =
            '.ppt,.pptx,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation';
          break;
      }

      return convertedType;
    })
    .join(',');
};

// 校验文件
export const fileValidatorFactory = (props: UploadProps) => {
  return (file: File) => {
    let preventUpload = false;

    if (props.accept) {
      let typeAllowed = false;
      let hasAcceptNotRegistered = false;
      let message = '';

      props.accept
        .split(',')
        .map((type) => {
          let matched;
          switch (type) {
            // 图片
            case 'image':
              matched = file.type.match(/^image\/\w*$/);
              message = '请上传图片';
              if (matched) typeAllowed = true;
              break;
            // 音频
            case 'audio':
              matched = file.type.match(/^audio\/\w*$/);
              message = '请上传音频';
              if (matched) typeAllowed = true;
              break;
            // 视频
            case 'vedio':
              matched = file.type.match(/^vedio\/\w*$/);
              message = '请上传视频';
              if (matched) typeAllowed = true;
              break;
            // doc 文档
            case 'doc':
              matched = file.type.match(
                /^(application\/msword)|(application\/vnd\.openxmlformats-officedocument\.wordprocessingml\.document)$/,
              );
              message = '请上传 doc 文档';
              if (matched) typeAllowed = true;
              break;
            // excel
            case 'excel':
              matched = file.type.match(
                /^(application\/vnd\.ms-excel)|(application\/vnd\.openxmlformats-officedocument\.spreadsheetml\.sheet)$/,
              );
              message = '请上传 excel';
              if (matched) typeAllowed = true;
              break;
            case 'pdf':
              matched = file.type.match(/^application\/pdf$/);
              message = '请上传 pdf';
              if (matched) typeAllowed = true;
              break;
            case 'ppt':
              matched = file.type.match(
                /^(application\/vnd\.ms-powerpoint)|(application\/vnd\.openxmlformats-officedocument\.presentationml\.presentation)$/,
              );
              message = '请上传 ppt';
              if (matched) typeAllowed = true;
              break;
            default:
              hasAcceptNotRegistered = true;
          }
        })
        .join(',');

      if (!hasAcceptNotRegistered && !typeAllowed) {
        preventUpload = true;
        logger.fail(`文件格式不正确`);

        // @ts-ignore
        file.uploadPrevented = preventUpload;
        return !preventUpload;
      }
    }

    if (props.maxSize) {
      const lessThenMaxSize = file.size / 1024 / 1024 < props.maxSize;
      if (!lessThenMaxSize) {
        preventUpload = true;
        logger.fail(`文件不能大于 ${props.maxSize}MB`);

        // @ts-ignore
        file.uploadPrevented = preventUpload;
        return !preventUpload;
      }
    }

    if (props.max) {
      if (props.fileList && props.fileList.length >= props.max) {
        preventUpload = true;
        logger.fail(`上传文件数不能超过 ${props.max} 个`);

        // @ts-ignore
        file.uploadPrevented = preventUpload;
        return !preventUpload;
      }
    }

    // @ts-ignore
    file.uploadPrevented = preventUpload;
    return !preventUpload;
  };
};
