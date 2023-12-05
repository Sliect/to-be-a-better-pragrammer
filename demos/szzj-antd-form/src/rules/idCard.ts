const City = {
  11: '北京',
  12: '天津',
  13: '河北',
  14: '山西',
  15: '内蒙古',
  21: '辽宁',
  22: '吉林',
  23: '黑龙江 ',
  31: '上海',
  32: '江苏',
  33: '浙江',
  34: '安徽',
  35: '福建',
  36: '江西',
  37: '山东',
  41: '河南',
  42: '湖北 ',
  43: '湖南',
  44: '广东',
  45: '广西',
  46: '海南',
  50: '重庆',
  51: '四川',
  52: '贵州',
  53: '云南',
  54: '西藏',
  61: '陕西',
  62: '甘肃',
  63: '青海',
  64: '宁夏',
  65: '新疆',
  71: '台湾',
  81: '香港',
  82: '澳门',
  83: '台湾',
  91: '国外',
};

// 15位校验规则：6位地址编码+6位出生日期+3位顺序号
// 18位校验规则：6位地址编码+8位出生日期+3位顺序号+1位校验位
const IdentityCodeRegExp = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)(-[1-9]{1})?$/i;

// 校验位规则     公式:∑(ai×Wi)(mod 11)
//   i----表示号码字符从由至左包括校验码在内的位置序号；
//   ai----表示第i位置上的号码字符值；
//   Wi----示第i位置上的加权因子，其数值依据公式Wi=2^(n-1）(mod 11)计算得出。
const factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]; // 加权因子
const parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2]; // 校验位

const IdCardValidator = async (rule: any, code: string) => {
  // if (code.length !== 18 && code.length !== 20){
  //   throw new Error();
  // }

  if (!code || !IdentityCodeRegExp.test(code)) {
    throw new Error('身份证号格式错误');
  }

  // @ts-ignore
  if (!City[code.substr(0, 2)]) {
    throw new Error('身份证号中地址编码错误');
  }

  // 18位身份证需要验证最后一位校验位
  if (code.length >= 18) {
    let sum = 0;
    code
      .substr(0, 17)
      .split('')
      .forEach((ai, i) => {
        let wi = factor[i];
        // @ts-ignore
        sum += ai * wi;
      });

    let last = parity[sum % 11];

    if (last != code[17]) {
      throw new Error('校验位错误');
    }
  }
};

export default {
  validator: IdCardValidator,
};
