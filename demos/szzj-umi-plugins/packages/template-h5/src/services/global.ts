import { Toast } from 'antd-mobile';
import { IS_LOCAL, post } from 'umi';
import type { Response } from 'umi';

import type { IUserInfo } from '@/types/global';

/**
 * 获取模拟登录用户信息
 * @returns
 */
async function getMockUserInfo(): Promise<Response<IUserInfo>> {
  const res = await post<Response<IUserInfo>>(`/user/mock/info`);

  if (!res?.success) Toast.show(res?.errorMsg ?? '获取用户信息失败');
  return res;
}

/**
 * 获取实际用户信息
 * @returns
 */
async function getRealUserInfo(): Promise<Response<IUserInfo>> {
  const res = await post<Response<IUserInfo>>(`/user/info`);

  if (!res?.success) Toast.show(res?.errorMsg ?? '获取用户信息失败');
  return res;
}

/**
 * 获取用户信息
 * 本地：模拟登录
 * 开发、测试或生产：实际登录
 * @returns
 */
export async function getUserInfo(): Promise<Response<IUserInfo>> {
  if (IS_LOCAL) return getMockUserInfo();
  return getRealUserInfo();
}

/**
 * 登录
 * @param params
 * @returns
 */
export async function login(params: {
  mobile: string;
  password: string;
}): Promise<Response<IUserInfo>> {
  const res = await post<Response<IUserInfo>>(`/user/login`, params);

  if (!res?.success) Toast.show(res?.errorMsg ?? '登录失败');
  return res;
}

/**
 * 注册
 * @param params
 * @returns
 */
export async function register(params: {
  mobile: string;
  password: string;
}): Promise<Response<IUserInfo>> {
  const res = await post<Response<IUserInfo>>(`/user/register`, params);

  if (!res?.success) Toast.show(res?.errorMsg ?? '注册失败');
  return res;
}

/**
 * 登出
 * @returns
 */
export async function logout(): Promise<Response<boolean>> {
  const res = await post<Response<boolean>>(`/user/logout`);

  if (!res?.success) Toast.show(res?.errorMsg ?? '登出失败');
  return res;
}
