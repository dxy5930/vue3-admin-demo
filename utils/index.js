/**
 * 
 Authored by xinyudai
 Email 1053227515@qq.com
 */



/** 格式化参数对象*/
/* eslint-disable */
export function param(data) {
  let url = "";
  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : "";
    url += "&" + k + "=" + value;
  }
  return url ? url.substring(1) : "";
}

/**  排序*/
export function sort(arr, property, desc) {
  return arr.sort(function (a, b) {
    const val1 = a[property];
    const val2 = b[property];
    return val1.localeCompare(val2);
  });
}

/** 编码*/
export function encode(e) {
  try {
    return encodeURIComponent(JSON.stringify(e));
  } catch {
    throw new Error("编码失败");
  }
}

/** 解码*/
export function decode(e) {
  try {
    return JSON.parse(decodeURIComponent(e));
  } catch {
    throw new Error("解码失败");
  }
}

/** 分组*/
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

/**  判断非空*/
export function isEmpty(data) {
  switch (typeof data) {
    case "undefined":
      return true;
    case "string":
      if (data.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, "").length == 0)
        return true;
      break;
    case "boolean":
      if (!data) return true;
      break;
    case "number":
      if (0 === data || isNaN(data)) return true;
      break;
    case "object":
      if (null === data || data.length === 0) return true;
      for (var i in data) {
        return false;
      }
      return true;
  }
  return false;
}

/**  普通数组去重*/
export function reduce(data) {
  if (isEmpty(data)) return;
  return [...new Set(data)];
}

/**  数组对象去重 */

export function mapReduce(arr, field) {
  let obj = {};
  return arr.reduce(
    (pre, cur) =>
      obj[cur.field] ? pre : (obj[cur.field] = true && [...pre, cur]),
    []
  );
}

/**  判断类型*/
export function judgeType(data) {
  return Object.prototype.toString.call(data);
}

/** 格式化时间*/
export function dateFormater(formater = '1970-1-1 12:12:12', t) {
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

/** 返回指定范围之间的随机数*/
export function random(lower, upper) {
  lower = +lower || 0;
  upper = +upper || 0;
  return Math.random() * (upper - lower) + lower;
}

/** 指定层数扁平化数组*/
export function flatArray(array = [], layers = 1) {
  return array.flat(layers);
}

/** 无限数组扁平化*/
export function flatArrayInfinity(array = []) {
  return array.flat(Infinity);
}

/** 数组之间的交集*/
export function intersection(a, b) {
  const s = new Set(b);
  return a.filter((x) => s.has(x));
}

/** 去除字符串所有空格*/
export function trimAll(data) {
  return data.trim();
}

/** 去除开头的空格*/
export function trimS(data) {
  return data.trimStart();
}

/** 去除结尾的空格*/
export function trimE(data) {
  return data.trimEnd();
}

/** 校验身份证*/
export function isIdCardNo(num) {
  return /^[1-9][0-9]{5}(18|19|(2[0-9]))[0-9]{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)[0-9]{3}[0-9Xx]$/.test(
    num
  );
}

/** 校验电话号码*/
export function isMobile(str) {
  if (!/^([0-9]{3,4})?[0-9]{7,8}$|^([0-9]{3,4}-)?[0-9]{7,8}$/.test(str)) {
    return false;
  }
  return true;
}

/** 手机号脱敏*/
export function hideMobile(mobile) {
  return mobile.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2");
}

/** 校验电子邮件*/
export function isEmail(str) {
  var result = str.match(
    /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/
  );
  if (result == null) return false;
  return true;
}

/** 数组对象根据指定字段去重*/
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

/** 拆分整数和小数*/
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

/** 滚动到元素位置  ex:smoothScroll('#target'); */
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
