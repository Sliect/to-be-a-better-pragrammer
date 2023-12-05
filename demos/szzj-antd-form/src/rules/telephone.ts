export default {
  validator: async (rule: any, value: string) => {
    if (value.match(/^1[3-9]\d{9}$/) || value.match(/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/)) {
    } else {
      throw new Error('请输入正确的手机号或电话号码');
    }
  },
};
