/**
 * 
 Authored by xinyudai
 Email 1053227515@qq.com
 */



/** 格式化参数对象
 * @param {obejct} data- 需要格式化的对象
 * @return {string} - 返回url
 */
export function param(data) {
  let url = "";
  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : "";
    url += "&" + k + "=" + value;
  }
  return url ? url.substring(1) : "";
}

/**
 * 对数组进行排序
 * @param {array} arr - 需要排序的数组
 * @param {string} property - 排序的依据字段
 * @param {boolean} desc - 是否降序，默认为false
 * @return {array} - 排序之后的数组
 */
export function sort(arr, property, desc = false) {
  return arr.sort(function (a, b) {
    const val1 = a[property];
    const val2 = b[property];
    if (desc) {
      return val2.localeCompare(val1);
    } else {
      return val1.localeCompare(val2);
    }
  });
}

/** 编码数据
 * @param {object} e - 需要编码的数据
 * @return {string} - 返回编码之后的数据
 */
export function encode(e) {
  try {
    return encodeURIComponent(JSON.stringify(e));
  } catch {
    throw new Error("编码失败");
  }
}

/** 解码数据
 * @param {string} e - 需要解码的数据
 * @return {object} - 返回解码之后的数据
 */
export function decode(e) {
  try {
    return JSON.parse(decodeURIComponent(e));
  } catch {
    throw new Error("解码失败");
  }
}

/** 分组
 * @param {array} arr - 需要分组的数组
 * @param {string} property - 分组的依据字段
 * @return {array} - 分组之后的数组
 */
export function group(arr, property) {
  let map = {};
  for (let i = 0; i < arr.length; i++) {
    const ai = arr[i];
    if (!map[ai[property]]) map[ai[property]] = [ai];
    else map[ai[property]].push(ai);
  }
  let res = [];
  Object.keys(map).forEach((key) => {
    res.push({
      [property]: key,
      data: map[key],
    });
  });
  return res;
}

/**
 * 判断数据是否为空
 * @param {any} data - 需要判断的数据
 * @return {boolean} - 返回是否为空
 */
export function isEmpty(data) {
  switch (typeof data) {
    case "undefined":
      return true; // 未定义
    case "string":
      if (data.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, "").length == 0)
        return true; // 字符串为空
      break;
    case "boolean":
      if (!data) return true; // 布尔值为false
      break;
    case "number":
      if (0 === data || isNaN(data)) return true; // 数字为0或NaN
      break;
    case "object":
      if (null === data || data.length === 0) return true; // 对象为null或长度为0
      for (var i in data) {
        return false; // 对象不为空
      }
      return true;
  }
  return false; // 其他情况不为空
}

/**  普通数组去重
 * @param {array} arr - 需要去重的数组
 * @return {array} - 去重之后的数组
 */
export function reduce(data) {
  if (isEmpty(data)) return;
  return [...new Set(data)];
}

/**  数组对象去重
 * @param {array} arr - 需要去重的数组
 * @return {array} - 去重之后的数组
 */
export function mapReduce(arr, field) {
  let obj = {};
  return arr.reduce(
    (pre, cur) =>
      obj[cur.field] ? pre : (obj[cur.field] = true && [...pre, cur]),
    []
  );
}

/**
 * 判断数据类型
 * @param {any} data - 需要判断的数据
 * @return {string} - 返回数据类型
 */
export function judgeType(data) {
  return Object.prototype.toString.call(data);
}

/** 格式化时间
 * @param {string} formater - 目标格式
 * @param {string} t - 需要格式化的时间
 * @return {string} - 返回格式化之后的时间
 */
export function dateFormater(formater = "YYYY-MM-DD HH:mm:ss", t) {
  let date = t ? new Date(t) : new Date(),
    Y = date.getFullYear() + "",
    M = date.getMonth() + 1,
    D = date.getDate(),
    H = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds();
  return formater
    .replace(/YYYY|yyyy/g, Y)
    .replace(/YY|yy/g, Y.substr(2, 2))
    .replace(/MM/g, (M < 10 ? "0" : "") + M)
    .replace(/DD/g, (D < 10 ? "0" : "") + D)
    .replace(/HH|hh/g, (H < 10 ? "0" : "") + H)
    .replace(/mm/g, (m < 10 ? "0" : "") + m)
    .replace(/ss/g, (s < 10 ? "0" : "") + s);
}

/**
 * 返回指定范围之间的随机数
 * @param {number} lower - 下限
 * @param {number} upper - 上限
 * @return {number} - 返回随机数
 */
export function random(lower, upper) {
  lower = +lower || 0;
  upper = +upper || 0;
  return Math.random() * (upper - lower) + lower;
}

/** 指定层数扁平化数组
 * @param {array} array - 需要扁平化的数组
 * @param {number} layers - 扁平层数
 * @return {array} - 返回新数组
 */
export function flatArray(array = [], layers = 1) {
  return array.flat(layers);
}

/** 无限数组扁平化
 * @param {array} array - 需要扁平化的数组
 * @return {array} - 返回新数组
 */
export function flatArrayInfinity(array = []) {
  return array.flat(Infinity);
}

/** 数组之间的交集
 * @param {array} a - 数组a
 * @param {array} b - 数组b
 * @return {array} - 返回新数组
 */
export function intersection(a, b) {
  const s = new Set(b);
  return a.filter((x) => s.has(x));
}

/** 去除字符串所有空格
 * @param {string} data - 需要去除的字符串
 * @return {string} - 返回去除之后的字符串
 */
export function trimAll(data) {
  return data.trim();
}

/** 去除开头的空格
 * @param {string} data - 需要去除的字符串
 * @return {string} - 返回去除之后的字符串
 */
export function trimS(data) {
  return data.trimStart();
}

/** 去除结尾的空格
 * @param {string} data - 需要去除的字符串
 * @return {string} - 返回去除之后的字符串
 */
export function trimE(data) {
  return data.trimEnd();
}

/**
 * 校验身份证号码
 * @param {string} num - 需要校验的身份证号码
 * @return {boolean} - 返回校验结果，true为合法，false为不合法
 */
export function isIdCardNo(num) {
  return /^[1-9][0-9]{5}(18|19|(2[0-9]))[0-9]{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)[0-9]{3}[0-9Xx]$/.test(
    num
  );
}

/**
 * 校验电话号码
 * @param {string} str - 需要校验的电话号码
 * @return {boolean} - 返回校验结果，true为合法，false为不合法
 */
export function isMobile(str) {
  if (!/^([0-9]{3,4})?[0-9]{7,8}$|^([0-9]{3,4}-)?[0-9]{7,8}$/.test(str)) {
    return false;
  }
  return true;
}

/** 手机号脱敏
 * @param {string} mobile - 需要脱敏的手机号
 * @return {string} - 返回脱敏的手机号
 */
export function hideMobile(mobile) {
  return mobile.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2");
}

/** 判断是否是4位数验证码
 * @param {string} code - 需要校验的验证码
 * @return {boolean} - 返回校验结果，true为合法，false为不合法
 */
export function isVerificationCode(code, digit = 4) {
  return new RegExp(`^[0-9]{${digit}}$`).test(code);
}

/**
 * 校验电子邮件
 * @param {string} str - 需要校验的电子邮件
 * @return {boolean} - 返回校验结果，true为合法，false为不合法
 */
export function isEmail(str) {
  var result = str.match(
    /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/
  );
  if (result == null) return false;
  return true;
}

/** 数组对象根据指定字段去重
 * @param {array} arr - 数组
 * @param {string} key - key值
 * @return {array} - 返回去重数组
 */
export function uniqueArrayObject(arr = [], key = "id") {
  if (arr.length === 0) return;
  let list = [];
  const map = {};
  arr.forEach((item) => {
    if (!map[item[key]]) {
      map[item[key]] = item;
    }
  });
  list = Object.values(map);
  return list;
}

/**
 * 拆分整数和小数
 * @param {number} tranvalue - 需要拆分的数值
 * @return {array} - 返回一个数组，第一个元素为整数部分，第二个元素为小数部分
 */
export function splits(tranvalue) {
  var value = new Array("", "");
  let str = tranvalue.toString();
  temp = str.split(".");
  for (var i = 0; i < temp.length; i++) {
    value = Number(temp);
  }
  return value;
}

/**dom操作**/
/** 返回顶部*/
export function scrollToTop() {
  var c = document.documentElement.scrollTop || document.body.scrollTop;

  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
}

/**
 * 滚动到元素位置
 * @param {string} element - 元素选择器
 * @return {void}
 * @example smoothScroll('#target');
 */
export function smoothScroll(element) {
  const query = uni.createSelectorQuery();
  query
    .select(element)
    .boundingClientRect((data) => {
      let pageScrollTop = Math.round(data.top);
      uni.pageScrollTo({
        scrollTop: pageScrollTop, //滚动的距离
        duration: 100, //过渡时间
      });
    })
    .exec();
}
