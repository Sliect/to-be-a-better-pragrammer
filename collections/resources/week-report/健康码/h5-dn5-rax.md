## 核酸检测结果 TODO

核酸检测结果显示页面

路由参数无orgCode 则表示是杭州，显示“查看抗原检测结果”按钮，点击该按钮跳转 抗原检测结果页面

点击查看更多按钮 跳转 核酸检测结果列表页

接口：
<!-- 获取核酸检测数据 -->
/portal/v2/nucleicAcid/query

## 疫苗接种记录 TODO

接口:
<!-- 疫苗查询 -->
/portal/v2/vaccine/query
<!-- 代办疫苗查询 -->
/portal/v2/agent/vaccine/query

## 抗原检测结果 TODO

抗原检测结果显示页面

接口：
<!-- 获取抗原检测数据 -->
/portal/v2/nucleicAcid/antigen/queryLast
<!-- 获取代办抗原检测数据 -->
/portal/v2/agent/nucleicAcid/antigen/queryLast

## 核酸检测结果（列表页） TODO

查询全国核酸检测记录

查询全国核酸检测记录：跳转全国核酸检测记录页面，带上是否代理的表示
查看抗原检测结果：跳转抗原检测结果页面，带上是否代理的表示

接口：
<!-- 用户信息 -->
/commonbizquery/rpcUserAuthInfo
<!-- 核酸列表 -->
/portal/v2/nucleicAcid/queryList
<!-- 代办核酸列表 -->
/portal/v2/agent/nucleicAcid/queryList

## 全国核酸检测记录 TODO

接口：
<!-- 获取全国核酸检测数据 -->
/portal/v2/nucleicAcid/quanguo/queryLast

<!-- 获取代办全国核酸检测数据 -->
/portal/v2/agent/nucleicAcid/quanguo/queryLast
