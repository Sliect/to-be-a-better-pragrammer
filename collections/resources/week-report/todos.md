## TODOS

react 相关部分

小程序

flutter

## 合作方

加一个根据行业来联动分类的字段
表单提交和列表

预估 开发 1d, 联调 0.5d

## 应用管理

批量给 APP 添加和删除 API
批量删除和查看对应一个新的对话框

预估 开发 3-5d，联调 2d

page:app
multipleApiModal
multipleApi
apiList
multipleApp TODO: 删除 批量关联展开
appList  
 apiDetailModal
delApiModal

## 脱敏

1. 重构策略模式

   1. typeId 属性等
   2. 表格字段根据 typeId 渲染 参数、样例
   3. 验证条件
      {
      typeId: '',
      name: '',

   paramComponent: MyComponent, // onChange 事件 <MyComponent onChange={}>
   exampleComponent: exampleStr,

   needParam: true, // 判断是否有参 以此提交的时候判断参数完整性
   }

2. 加 5 种策略

预估 开发 3-5d,联调 2d

井冈山

1. 企业信息录入

2. 动态表单

开放域

公共数据门户

疫情防控

互联网爬虫

## 演示项目

目录悬浮联动

## 审批列表

上传、校验、行编辑

## 企业详情

上传、校验、确认

1. 政策列表
   - 根据不同生命周期进行过滤政策列表
   - 点击政策跳转政策详情
   - 政策制定表单对话框
2. 政策详情页  
   2.1 调研：内容调研、报告审批
   - 实时编辑预览，并有根据输入内容自动计算功能
   - 对话框显示相关联的政策关系
     2.2 框架：框架编写、框架审批
   - 富文本编辑器，根据标题自动生成目录、分页、页码、页边距
   - 修订记录
     2.3 草稿：草稿编写、草稿审批
   - 富文本编辑器的草稿内容进行编辑保存
     2.4 内审稿：对内征求意见、内容修改
   - 同上
     2.5 对外意见稿：待下发、对外征求意见、内容修改
   - 表单对话框，穿梭框选择企业 进行意见稿下发
     2.6 待发布稿：待发布
   - 预览状态，不可修改
   - 生成政策：表单对话框
   - 跳转细则
     2.7 已发布：待生效、生肖中  
     2.8 已终止：已终止（主动废止）、已终止（过期）
3. 细则列表
   - 根据不同环节进行过滤细则列表
   - 细则制定：表单对话框
4. 细则详情页  
   4.1 草稿
   - 同政策草稿
     4.2 内审稿
   - 同政策内审稿
     4.3 待发布稿
   - 同政策待发布稿

调研  
 可视化 or 文本  
 沙盘  
 预演  
 g 端框架  
政策制定、发布  
政策库  
政策报告

政策库

- 政策库列表页
- 政策详情页

细则库

- 细则库列表页
- 细则详情页

我的收藏

- 收藏列表页
- 收藏详情页

todo:

1. 手机换绑
2. 手机验证码登录
3. 个人中心
4. 政策报告

剩余 2,4,14,17,18
已完成 5,9,15,19

todo:  
根据上传和生成来源区分调用接口

1. 树形展示
2. 节点 key 及 展开
3. 不同子节点的差异化渲染




```js
function dfs(list) {
  return list.map((item) => {
    if (item.children)
      return <SubMenu title="一级">{dfs(item.children)}</SubMenu>;
    return <Menu.Item>1-1</Menu.Item>;
  });
}
```













4.19
1. ConfigProvider 组件实现 完成
2. importType 字段 完成
3. 导入参数字段更灵活？ 完成
4. 协查



4.21
1. Upload组件 maxSize, 1分钟内只允许上传1次, 约定的业务组件封装




createActs(useActions, comp)

1. innerMap: comp的key首字母小写
2. 创建全局上下文
3. useActions(Provider.props); innerMap遍历 use方法; 都添加到返回结果 放到全局上下文


1. 批量修订
2. 权限


1. 业务组件Import, Export, Upload的封装以及项目上对应组件的替换重构，方便多个项目之间的公用
2. 协查、重点人员、入境人员等模块的页面开发及bug修复、交互优化
3. 组件Layout的v3和v4兼容以及功能增强
4. 移动端的重点人员模块等功能与PC端同步


TODO 
<!-- 1. 日常检测模板文件替换                       feat/xc-20220527 -->
<!-- 2. 入境人员判重                              feat/rjry-20220531 -->
<!-- 3. 省内本土病例、境外输入病例管控方案(待定)     feat/zyry-20220531  -->
<!-- 4. 数据修订管理(推迟到9号)                    feat/sjxd-20220602 -->
<!-- 5. 入境机组人员                              feat/rjry-20220411       feat/rjry-20220607 -->
<!-- 6. 管控措施,隔离点                           feat/gkcs-20220606 -->
<!-- 7. 区域统计报表                              feat/qytj-20220608
8. 管控措施                                  feat/gkcs-20220609 -->

<!-- 1. 地市接口权限管理          feat/qxgl-20220610
2. 扫健康码录入              feat/rjsys-20220610

3. 隔离点类型法人校验 -->




TODO

@szzj/fyxt-bizs: "~1.0.0"    末位变更才会影响生产版本，前两位并不会

<!-- 1. 省外口岸入境来浙人员核查清单导入导出按钮重构          feat/rjhc-20220621 -->
2. 封控区人员导出              feat/fkqdc-20220624
3. 地市接口权限管理
4. 上海漫入联系不上移除        feat/shmryc-20220627 暂缓
5. 我管理的隔离点,入境返浙人员  feat/mygld-20220627

DrawerForm：增加防抖和移动到错误处功能


20220630-20220708
0. 联调地市接口权限  feat/dsjkqx-20220701
1. 组件库封装 DrawerForm  完成
2. 梳理防疫系统
3. 布局组件尝试
4. 督察模块(紧急)    feat/dc-20220704 完成


重点人员导出升级： feat/zdrydc-20220708

1. 菜单权限导出       feat/cdqxdc-20220718
2. 督查改造          feat/dc-20220718


1. 入境返浙人员 加是否隐藏转运人员的开关 完成
2. export 组件加 check校验开关和check校验参数
3. umi插件 自动调用相应的 Act
4. 上车扫码          feat/scsm-20220725
5. 重点地区人员下发   feat/zddqryxf-20220729 
6. 中高风险地区管理   feat/zgfxdq-20220729   完成
7. 管控措施变更                            


风险地区导出 

1. 核酸检测结果 HsjcRecords
2. 核酸全国结果 HsqgRecords 
3. 疫苗接种记录 YmjzRecords


居家同住人 pc+移动




1. 移动端精简描述
2. 下发按钮
3. 核酸检测结果录入优化


1. 同住人
2. 移动端核酸录入优化
3. 房间号
4. 重点人员地区下发列表


1. 核酸可疑人员
2. 混检

1. 安全加固           feat/aqjg-20220923
2. 退回原因映射


1. 录入核实结果 
2. bizs测试用例


2022-10-10
1. 移动端退回改造  pc:feat/thyy-20220927 mobile: feat/thyy-20221008
2. 协查国办地址    feat/xc-20221012
3. css in js 调研  完成
4. tailwindcss 调研  完成
5. antd v5 的css in js 调研
6. 核实人员类型补充 feat/hsry-20221019
7. 混检权限管理    feat/hjmanage-20221013
8. 重点人员待核查：驻留地变更接收时透出转移接收、转交其他地区      feat/zdry-20221013  
9. 整理规范
10. 退回字段的来源区县 不限制到三级
11. 【健康码核酸疫苗查询】  feat/hsym-20221019



1. 技术文档深入
2. 协查模块整理、优化
3. 三区：地图筛选框 如果查不到，取消选中；筛选框加上权限

4. 健康码查询增加混检或单检异常人员模块
5. 移动端按钮字数长时，样式优化
6. oss资源统一 feat/oss-20221028


1. 重点人员来自省市数据来源调整  feat/zdry-20221031
2. 操作手册替换
3. 核酸检测结果录入优化   feat/hsjclr-20221107 
4. 健康码申码亮码日志
5. 健康码新增字段    feat/jkm-20221102
6. 钉钉鉴权bug       bugfix/dd-20221104
7. 多次点击debounce   feat/modal-20221107


1. 年终总结
2. 防疫系统梳理
3. 测试用例-与产品视图一致
理顺逻辑 => 编写测试用例 => 写代码

待接收 => 待核查 => 管控中 => 结束管控 => 退回

涉疫类型，数据优先级，数据来源，人员类型
管控措施，健康管理措施
结束管控原因
退回原因，申请退回原因(流调下发的密接)

涉疫类型
1. 根据 uats 映射 options
2. 分类别名映射 uats
3. 排序

数据优先级
1. 一级、二级、地高、地中、空

数据来源
1. 根据 uats 映射 options

人员类型(仅其它风险人群)
1. 根据 uats 映射 options

管控措施
1. 根据 uats 映射 options
2. depecrated 彻底废弃, 可以用 withoutDepecrated 控制是否剔除该项
3. depecratedWhen 针对特定 uat 剔除，与 depecrated 规则互斥，只针对可选项，不包含搜索的下拉框
4. 分阶段的健康管理措施
5. 初始码色
6. 驻留地为宁波市 特殊处理
7. 排序

结束管控
1. 根据 uats 映射 options，分可选项和下拉项

退回原因
1. 根据 uats 映射 options，分可选项和下拉项
2. 描述
3. 提醒
4. 排序
5. withSqthyy 包含申请退回原因，搜索

申请退回原因
1. 根据 uats 映射 options
2. 排序

核实结果
1. 根据 uats 映射 options，可选项
2. 拼接退回原因和核实结果


0. 添加核酸异常人员和确诊病例tab, 即使核酸异常人员用不到管控中、结束管控、督查清单，确诊病例用不到待接收、待核查，也要透出，数据为空即可
1. 增加核酸异常人员、确诊病例 涉疫类型
2. 核酸异常人员 录入核实结果增加确诊和密接 两种表单字段
3. 核酸异常人员 管控中的操作项改变


1. 优化疫情轮次和病例管理
2. 行政中心追阳  feat/xzzxzy-20221216
3. 重症医疗资源准备 3.2    feat/sjcjgj-20221216
4. 发热门诊扩容 3.3        feat/sjcjgj-20221216


2023-1-12
1. 诉求管理
2. 医护人员
3. wrappers 过滤特殊手机号如 00000000000




1. step-form 示例
2. List组件bug修复










基层智治OS工作台-教育条线(良渚)

脱胎于防疫系统,2.17初版上线

1. 定制化浙政钉工作台
2. 查询2024年幼儿园、小学、初中三个阶段的适龄儿童/少年人数总数

公安条线

基层或企业的数据流向公安,公安及时处理(需建立考核监督机制),跨部门协调企业或个人,公安作为数据的管理方



考核打分工具

指标录入 => 指标审核 => 指标打分 => 考核评价(待定) => 结果汇总

权限控制？
指标列表
考核对象列表 
文件列表  已提供
上传（上传新文件、复用历史文件）、编辑、下载、共享、审核确认、审核取消、删除、更新记录


1. 指标树
2. 文件列表 (考核点 => 考核对象 => 自定义目录层级)
3. 文件上传  axios 进度条  (难点)
4. 弹窗：文件复用、材料管理（权限设置的字段模块可以复用）、权限设置、更新记录
5. 我的任务（同文件列表叶子节点, 自定义目录层, 一个文件或目录为一条记录, 上传等同于编辑, 去除删除按钮, 搜索条件不一样）    

qa 
1. 大文件上传？ 大文件下载？  无
2. 我的任务左侧菜单显示？ 隐藏
3. 共用弹窗？    @ebay/nice-modal-react

Layout（带目录树或不带） treeId: '' 为默认页面， '0.1.1.2.0'的形式作为treeId 
  |- 目录树（tab只是装饰，点击我的任务直接页面跳转）
  |- 文件列表


数管家 2.28上线

一体化工作台

权限中心
权限管理：查询、添加、编辑菜单、设置页面下按钮级别的操作权限
角色管理：查询、添加、设置到页面级别的权限（可选按钮级别的）、管理用户（角色对多个用户的关系）、添加用户、
用户管理：查询、设置角色（用户对多个角色的关系）

数据机器人：
退休老人出院（出院日期小于30天）
企业外迁提醒




1. 选人
2. 详情接口
3. 首页图标
4. 审核权限
5. 专题数据允许申请

1. 申请按钮
2. 下载
3. 通知确定  
4. 日程样式调整
5. 换接口

1. 一体化工作台的街道数据资源、我的数据、权限管理模块 bugfix
2. 熟悉日程管理模块，并bugfix
3. 代码重构优化
4. 准备这周上线


1. 一体化工作台介绍
2. iam 告警

1. 页面增值
  - TablePage
  - TabsTablePage
  - DetailPage
2. 首页待办打通待我审批的数据



5.15发布
1. 部门切换，选择一次后不再弹窗   1d         完成
2. 常用应用 0.5d          文美
3. 跳转详情审批抽屉，增加审批按钮，路由传参唤起抽屉，详情新增接口  2d     
4. zzd智能提醒推送通知 
5. 日程管理优化 3d         
6. 工作体系菜单 2d        文美
7. 权限管理配置 
8. 新生儿专题数据优化
9. 新增专题数据
10. 文案优化

11. 未来社区待提供
12. 个人视图-日程操作项


1. 首页优化：图标、文字替换，新增未来社区展示模块等
2. 日程管理模块开发及bugfix
3. 部门切换及基层工作台/zzd 跳转到数据工作台的bugfix，目前存在问题：zzd存在两个窗口时且部门不同时，实际以新切换的部门展示数据，但旧窗口的部门不更新
4. 准备周五上线
5. TODO: 15号未来社区提供链接和icon后，17号前更新首页对应模块；天气接口接入后更新首页用户模块，时间待定


一体化工作平台  6.25
1. 日程管理选人带上组织架构和自定义群组
新增和编辑
GroupMember 参会人员数组peopleArr
  - SourceList 查询的数据源列表sourceList 
    - SearchFilter  queryByKeyword去改变sourceList
    - GroupTree     queryByGroup去改变sourceList        
    - GroupPreview  peopleArr
  - TargetList      peopleArr

2. 自定义群组+共享群组
3. 部门管理，应用内维护
4. 专题数据优化

平台效能分析  6.25

1. 数据看板
2. 数据质量问题工单分析 列表页及详情页
3. 大脑数据回流分析

问题
1. 无权限的数据范围不展示？ 指的是没有该页面么
2. 筛选条件带入，有哪些条件
3. 级联



<!-- fiberTree: DFS; children、next、prev、parent，跨层级重新生成一棵树（比如exchange跨层级） -->
<!-- 1. children、next、prev、parent --> 好处：简单



Tree      
- 增 (更新map缓存)
  - append
  - prepend
  - insertAfter
- 删  (更新map缓存)        
  - remove
- 改  (更新map缓存)       
  - exchange
  - up
  - down
  - replace 
- 查
  - findNodeByKey   获取节点
  - hasNode   是否存在该节点
  - findParent    获取父节点
  - findSiblingsIncludeSelf   获取同一层的节点数组
  - findPath   获取路径上的节点数组   
  - findPosterityNodesByKey  获取所有的子孙节点数组
  - findIndex  获取该节点所在索引
  - findLeafNodesByKey 获取所有叶子节点
- Utils: 静态方法
  - forEach    tree.forEach
  - map        tree.map
  - filter
  - toArray
  - toMap

Tree, TreeNode