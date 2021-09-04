/** Request 网络请求工具 更详细的 api 文档: https://github.com/umijs/umi-request */
import { extend, ResponseError } from 'umi-request';
import { ErrorCode, SimpleError } from './errors';

export const httpBase = process.env.REACT_APP_BASE_PATH;

/** 异常处理程序, 将error 全部翻译成Simple Error */
export const errorHandler = (error: ResponseError<any> | SimpleError<string>): Response => {
  throw new SimpleError<string>(error.message, ErrorCode.InternalServerError);
};

/** 配置request请求时的默认参数 */
const request = extend({
  prefix: httpBase,
  errorHandler,
  credentials: 'include',
});

request.interceptors.response.use((response) => {
  if (response.status === 200 && response.headers.get('Content-Type') === 'application/json') {
    return response.json();
  }
  return response;
});

export async function putWithForm(url: string, data: { [key: string]: string }) {
  return request(url, {
    method: 'put',
    requestType: 'form',
    data: genFormData(data),
  });
}
export function postWithForm(url: string, data: { [key: string]: string | Blob }) {
  return request(url, {
    method: 'post',
    requestType: 'form',
    data: genFormData(data),
  });
}

export function deleteWithForm(url: string, data: { [key: string]: string | Blob }) {
  return request(url, {
    method: 'delete',
    requestType: 'form',
    data: genFormData(data),
  });
}

function genFormData(data: { [key: string]: string | Blob }) {
  const _data = new FormData();
  Object.keys(data).forEach((k) => {
    _data.append(k, data[k]);
  });
  return _data;
}

export default request;
