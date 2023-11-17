## 浙政钉-浙里办 api 差异

### 缓存

异步缓存

```js
/**
 * zlb 存储、读取、删除数据缓存
 **/
ZWJSBridge.setLocalStorage({
  key: "aa",
  value: "123",
})
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
ZWJSBridge.getLocalStorage({
  key: "aa",
})
  .then((data) => {
    // data -> {key: xxxx}
  })
  .catch((error) => {
    console.log(error);
  });
ZWJSBridge.removeLocalStorage({
  key: "aa",
})
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });

/**
 * zzd 存储、读取、删除数据缓存
 **/
dd.setStorageItem({
  name: "currentCity",
  value: {
    cityName: "杭州",
    adCode: "330100",
    spell: " hangzhou",
  },
})
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });
dd.getStorageItem({
  key: "currentCity",
})
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });
dd.removeStorageItem({
  key: "currentCity",
})
  .then((res) => {
    console.log(res);
  })
  .catch();
```

### Navigation 窗口类

设置导航栏

```js
/**
 * zlb
 */
// 导航栏 title 无差异
ZWJSBridge.setTitle({
  title: "邮箱正文",
})
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });

// 设置导航栏菜单按钮
ZWJSBridge.setMenu({
  items: [
    {
      id: "1", // 按钮ID，点击后客户端返回这个ID标识
      iconUrl: "http://t.cn/image1.png", // icon显示的样式
      text: "分享",
    },
    {
      id: "2",
      iconUrl: "http://t.cn/image2.png",
      text: "订阅",
    },
  ],
})
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
// 打卡新窗口 无差异
ZWJSBridge.openLink({
  url: "http://xxxxx",
})
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
// 关闭当前窗口
ZWJSBridge.close()
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });

/**
 * zzd
 */
// 打开内置页面
dd.openPage({
  name: "profile", //页面名称
  params: {}, //传参
})
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {});
// 替换页面
dd.replacePage({
  url: "http://www.aaa.com",
})
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {});
// 关闭当前窗口
dd.closePage()
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {});
```

### 用户

```js
/**
 * zlb
 */
// 获取用户类型  0：公务员 1：除公务员以外的个人 2：法人
ZWJSBridge.getUserType()
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
// 获取用户当前UI风格 normal：常规版  elder：老年版
ZWJSBridge.getUiStyle()
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
// 入参为空，使用当前登录账号唤起扫脸 certNo, certName 直接传递所需认证人信息
// 返回结果错误码  1001: 支付宝认证失败  1003: 姓名或身份证号错误
ZWJSBridge.zmAuthentication({
  // certNo:'身份证',
  // certName:'姓名'
})
  .then((data) => {
    // data=> {"pass" : true,
    // "passId" : "xxxxx"}
  })
  .catch((error) => {
    console.log(error);
  });
// 公安一所可信扫脸认证
ZWJSBridge.kexinAuthentication({
  type: 0,
  certNo: "",
  certName: "",
})
  .then((data) => {
    // data -> {ticketId: xxxx}
  })
  .catch((error) => {
    console.log(error);
  });
ZWJSBridge.kexinAuthentication({
  type: 1,
  ticketId: "",
})
  .then((data) => {
    // data -> {ticketId: xxxx}
  })
  .catch((error) => {
    console.log(error);
  });
/**
 * zzd
 */
// 获取登录用户信息
dd.getLoginUser()
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {});
```

### Device 设备类

```js
/**
 * zlb
 **/
// 电话
ZWJSBridge.phoneCall({
  corpId: "10086",
})
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
// 短信
ZWJSBridge.sms({
  phoneNumber: "136****2531",
  text: "内容",
})
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
// 获取经纬度位置信息
ZWJSBridge.getLocation()
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
// 获取设备唯一标识 无差异
ZWJSBridge.getUUID()
  .then((data) => {
    // data -> {uuid: xxx}
  })
  .catch((error) => {
    console.log(error);
  });
// 获取网络类型
ZWJSBridge.getNetworkType()
  .then((data) => {
    // data -> {result: 'wifi'}
  })
  .catch((error) => {
    console.log(error);
  });
// 向剪贴板中复制数据
ZWJSBridge.setClipboardData({
  text: "xx",
})
  .then((result) => {})
  .catch((error) => {});
/**
 * zzd
 **/
// 电话
dd.callPhone({
  phoneNum: "10086", //电话号码
})
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {});
// 唤起拨号
dd.showCallMenu({
  phoneNumber: "10086",
  code: "+86",
})
  .then((res) => {})
  .catch((err) => {});
// 获取经纬度位置信息
dd.getGeolocation({
  targetAccuracy: 100,
  coordinate: 0,
  withReGeocode: false,
  useCache: true, //默认是true，如果需要频繁获取地理位置，请设置false
})
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {});
// 获取设备信息
dd.getPhoneInfo()
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });
// 复制到粘贴板
dd.copyToClipboard({
  text: "gdt",
})
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {});
```

### 业务类

```js
/**
 * zlb
 **/
// 埋点
ZWJSBridge.monitorTrace({
  monitorType: 'success',
  module: 'Login',
  modulePoint: 'password',
  bizInfo: {

  }
}).then((result) => {
    console.log(result);
}).catch((error) => {
    console.log(error);
// 获取行政区划和code
ZWJSBridge.getCurrentLocationCity()
    .then((data) => {
    // data=>{"cityId":"339900","cityName":"浙江省本级"}
}).catch((error) => {
    console.log(error);
});
// 选择图片
ZWJSBridge.chooseImage({
    upload:true
}).then((result) => {
    console.log(result);
}).catch((error) => {
    console.log(error);
});
// 图片保存到本地 无差异
ZWJSBridge.saveImage({
    url: "http://zjzwfw.gov.cn/picture/0/xxx.png"
}).then((result) => {
    console.log(result);
}).catch((error) => {
    console.log(error);
});
// 扫一扫
ZWJSBridge.scan({
    type: "qrCode"
}).then((data) => {
    // data =>{"text" : "扫描到的内容"}
}).catch((error) => {
    console.log(error);
});

/**
 * zzd
 **/
// 选择图片
dd.chooseImage({
}).then(res => {
  console.log(res)
}).catch(err => {})
dd.chooseLocalImage({
  sourceType: ["camera","album"],
  count: 2
}).then(res => {
console.log(res)
}).catch(err => {
console.error(err)
})
```

### UI 界面类

```js
/**
 * zlb
 **/
// 确认框 无差异
ZWJSBridge.confirm({
  title: "删除",
  message: "确认删除图片吗？数据删除后不可恢复。",
  buttonLabels: ["确定", "取消"],
})
  .then((data) => {
    //  data => {buttonIndex: 0}
  })
  .catch((error) => {
    console.log(error);
  });
// 提示框
ZWJSBridge.alert({
  title: "提示",
  message: "确认删除图片？",
  buttonName: "确定",
})
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
// 弱提示
ZWJSBridge.toast({
  message: "提示信息",
  duration: 2000,
})
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
// 文本输入框
ZWJSBridge.prompt({
  title: "输入金额",
  placeholder: "不小于10元",
  message: "再说一遍？",
  inputType: "number",
  cancelButton: "取消",
  confirmButton: "继续",
})
  .then((data) => {
    //  data => {buttonIndex : 0, value : "输入的内容"}
  })
  .catch((error) => {
    console.log(error);
  });
// 单选列表
ZWJSBridge.actionSheet({
  title: "谁是最棒哒？",
  cancelButton: "取消",
  otherButtons: ["孙悟空", "猪八戒", "唐僧", "沙和尚"],
})
  .then((data) => {
    // data => {buttonIndex: 0}
  })
  .catch((error) => {
    console.log(error);
  });
/**
 * zzd
 **/
// 提示框
dd.alert({
  message: "这个一个弹窗",
  title: "提示",
  button: "收到",
})
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {});
// 弱提示
dd.toast({
  icon: "success",
  text: "加载中", //提示信息
})
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {});
// 文本输入框
dd.prompt({
  message: "string",
  title: "string",
  buttonLabels: ["ok", "cancel"],
})
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {});
// 显示操作菜单
dd.showActionSheet({
  title: "谁是最棒哒？",
  cancelButton: "取消",
  otherButtons: ["孙悟空", "猪八戒", "唐僧", "沙和尚"],
})
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {});
```
