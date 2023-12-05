---
nav:
  title: 研发工具
  order: 3
title: 接口生成器
order: 7
group:
  title: 接口生成器
  order: 2
---

### 基于 ddl 生成 types

当后端提供如下 ddl 语句后：

```sql
-- 数据安全-监控主体-省本级节点, 目录系统中的编目概念
drop table if exists sre_category;
create table sre_category(
  id bigint(20) unsigned not null auto_increment comment '主键',
  reflow_direction varchar(128) comment '数据回流的方向： 省本级/湖州市本级--业务唯一键之一',
  category_nm_en varchar(128) NOT NULL comment '数据表英文名称--业务主键--业务唯一键之一',
  category_nm_cn varchar(128) NOT NULL comment '数据表中文名称',
  data_domain varchar(16) NOT NULL comment '枚举数据，数据类别:数字政府、人口信息、社会保险等',

  source_table_nm_en varchar(128) comment '省级表数据表名(中文)',
  source_table_nm_cn varchar(128) comment '省级数据表名(英文)',

  record_count varchar(16) NOT NULL comment '数据量:323003行数据',
  security_level varchar(8)  DEFAULT NULL comment '数据表级别',

  op_time datetime DEFAULT NULL comment '更新时间',
  category_status varchar(8) NOT NULL DEFAULT 1 comment '状态：已删除、草稿等',

  dept_name varchar(64) NOT NULL comment '数源单位',
  dept_code varchar(64) DEFAULT NULL comment '数源单位code',

  gmt_created datetime DEFAULT CURRENT_TIMESTAMP comment '创建时间',
  gmt_modified datetime DEFAULT Null comment '更新时间',
  modifier varchar(32) DEFAULT NULL comment '修改人',
  creator varchar(32) DEFAULT NULL comment '创建人',

  primary key (id) USING BTREE,
  unique key idx_unique_category_nm_en(category_nm_en, reflow_direction) using btree
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC comment='数据安全-监控主体-省本级节点, 目录系统中的编目概念';
```

前端可通过如下命令产出 types：

```bash
npx @szzj/genapi ddl --sqlFilePath=./resources/main.sql --outputDir=./resources/types
```

这样就会在 resources/types 目录中产出 sreCategory.ts 文件：

```ts
/** 数据安全-监控主体-省本级节点, 目录系统中的编目概念 \*/
export interface ISreCategory {
  /** 主键 _/
  id?: number;
  /\*\* 数据回流的方向： 省本级&#x2F;湖州市本级--业务唯一键之一 _/
  reflowDirection?: string;
  /** 数据表英文名称--业务主键--业务唯一键之一 \*/
  categoryNmEn: string;
  /** 数据表中文名称 _/
  categoryNmCn: string;
  /\*\* 枚举数据，数据类别:数字政府、人口信息、社会保险等 _/
  dataDomain: string;
  /** 省级表数据表名(中文) \*/
  sourceTableNmEn?: string;
  /** 省级数据表名(英文) _/
  sourceTableNmCn?: string;
  /\*\* 数据量:323003 行数据 _/
  recordCount: string;
  /** 数据表级别 \*/
  securityLevel?: string;
  /** 更新时间 _/
  opTime?: string;
  /\*\* 状态：已删除、草稿等 _/
  categoryStatus: string;
  /** 数源单位 \*/
  deptName: string;
  /** 数源单位 code _/
  deptCode?: string;
  /\*\* 创建时间 _/
  gmtCreated?: string;
  /** 更新时间 \*/
  gmtModified?: string;
  /** 修改人 _/
  modifier?: string;
  /\*\* 创建人 _/
  creator?: string;
};
```

### 基于 swagger 生成 services 及 types

当后端已产出 swagger 文档，并提供 swagger 文档访问地址，比如【数据安全监控系统】的访问地址为 http://59.202.40.40:18099/doc.html。前端就可以通过 http://59.202.40.40:18099/v2/api-docs 下载到全量 json 数据，并在本地通过 http-server 启动服务。

随后，通过如下命令产出 services 及 types：

```bash
npx @szzj/genapi swagger --api=http://localhost:8080/api-docs --outputDir=./resources/services --baseResponseType=Result --basePageResponseType=PageResult
```

这样就会在 resources/services 目录中产出如下接口（该接口依赖于工程安装 @szzj/umi-plugin-request 插件）以及 typings.d.ts 中的全量数据类型：

```ts
// tslint:disable
/// <reference path="./typings.d.ts" />
import { request } from 'umi';
import { message } from 'antd';

import type { Response, PageResponse } from 'umi';

/**
 * api接口删除
 */
export const apiDelete = async (params: {
  /** id */
  id: number;
}) => {
  const res = await request<Promise<Response<boolean>>>(`/category/api/delete`, {
    method: `GET`,
    params,
  });

  if (!res?.success) message.error(res?.errorMsg);
  return res;
};
```

### 基于 easy-mock 快速调用模拟接口

有了 swagger 文档后，我们可在 http://59.202.54.14:18087/ 创建项目并导入 swagger 文档，这样就会生成模拟接口。比如【数据安全监控系统】生成的模拟接口如下：

<img decoding="async" src="http://10.145.11.75:8080/gui/szzj-ones/genapis/easy-mock.png" width="50%">

随后修改工程配置（依赖于工程安装 @szzj/umi-plugin-request 插件）：

```ts
export default {
  szrequest: {
    // 后端服务地址
    proxyTarget: 'http://59.202.40.40:18099/',
    // easy-mock 项目中的 Base URL
    mockServiceUrl: 'http://59.202.54.14:18087/mock/6448c80e8807247e21395704/sre-pc',
  },
};
```

这样，在实际接口调用过程中，我们可通过 mock 选项调用模拟接口或实际的后端接口：

```ts
/**
 * 删除账号
 * @param params
 * @returns
 */
export async function del(params: IApi) {
  const res = await request<PageResponse<IApi>>('/category/api/delete', {
    method: 'get',
    params,
    // 是否调用模拟接口，true 调用模拟接口，否则调用实际的后端接口
    mock: true,
  });

  if (!res?.success) message.error(res?.errorMsg);
  return res;
}
```

所以，当后端接口可调试时，只需将 mock 选项移除。

更多 easy-mock 使用可戳 这里。
