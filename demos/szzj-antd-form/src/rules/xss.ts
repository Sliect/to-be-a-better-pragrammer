/**
 * Xss 漏洞检查
 */
export default {
  validator: async (rule: any, value: string) => {
    const regexp =
      /.*<(script|a|img|link|style|iframe|frame|onerror|body|document|acx|ScRiPt|svg|IMG|SCRIPT|BODY|BGSOUND|br|LAYER|LINK|META|IFRAME|FRAMESET|DIV|STYLE|BASE|XML|A|BR|TABLE|TD|M|marquee|details|embed|sCrIpT|mArQuEe|MaRqUeE|base|textarea|div|form|input).*/gi;
    if (typeof value === 'string' && value?.match(regexp)) {
      throw new Error('内容有可能对网站造成安全威胁，请检查');
    } else {
    }
  },
};
