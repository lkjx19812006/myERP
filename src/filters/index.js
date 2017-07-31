import moment from 'moment'
// import address from '../static/data/region.json';

export function host(url) {
  const host = url.replace(/^https?:\/\//, '').replace(/\/.*$/, '')
  const parts = host.split('.').slice(-3)
  if (parts[0] === 'www') parts.shift()
  return parts.join('.')
}

export function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}
export function yearAndMonth(time) {
  let year = time.split('-')[0];
  let month = time.split('-')[1];
  year = year + '-' + month;
  return year;
}
export function getYear(time) {
  return time.split('-')[0];
}
export function getMd(time) {
  let date = time.split(' ')[0];
  let m = date.split('-')[1];
  let d = date.split('-')[2];
  return m + '-' + d;
}

//消息的时间过滤
export function getYMD(time, type) {
  if (!time || time === '' || time == 0) {
    return '';
  } else {
    let date = new Date(time);
    let y = date.getFullYear();
    let M = date.getMonth() + 1;
    let d = date.getDate();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    M = M < 10 ? '0' + M : M;
    d = d < 10 ? '0' + d : d;
    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;
    switch (type) {
      case 0: //返回 2016-06-07
        return y + '-' + M + '-' + d;
        break;
      case 1: //返回 05:48
        return h + ':' + m;
        break;
    }


  }
}

//订单消息的时间过滤
export function getYMDOlder(time, type) {
  if (!time || time === '' || time == 0) {
    return '';
  } else {
    // 2017-07-03 13:05:01.0
    let YMD = time.split(' ')[0];
    let hm = time.split(' ')[1].split(':');
    hm = hm[0] + ':' + hm[1];
    switch (type) {
      case 0: //返回 2016-06-07
        return YMD;
        break;
      case 1: //返回 05:48
        return hm;
        break;
    }
  }
}
//订单状态转换
// 10:待审核

// 20：待支付尾款

// 66：待支付定金

// 0：查询全部订单

// 30，40：待发货（支付确定）

// 50：待收货（已发货）

//  60，70：确认收货（已完成）
export function filterOrder(typeNum, intentionType) {
  let str = '';
  switch (typeNum) {
    case 10:
      str = '待审核';
      break;
    case 20:
      if (intentionType === 1) {
        str = '待支付尾款';
      } else {
        str = '待支付';
      }
      ;
      break;
    case 30:
      str = '待发货';
      break;
    case 40:
      str = '待发货';
      break;
    case 50:
      str = '已发货';
      break;
    case 60:
      str = '已完成';
      break;
    case 66:
      str = '待支付定金';
      break;
    case 70:
      str = '已完成';
      break;
    default:
      str = '未知状态';
      break;
  }
  return str;
}
export function day(time) {
  let day = time.split('-')[2];
  day = day.split(' ')[0]
  return day;
}
export function timeDays(due) {
  let days;
  if (due) {
    due = due.split('.')[0];
    var arr = due.split(/[- : \/]/);
    var duedateDate = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]);
    var pubdateDate = new Date();
    var dateValue = duedateDate.getTime() - pubdateDate.getTime();
    days = Math.ceil(dateValue / (24 * 3600 * 1000));
    if (days > 0) {
      days = days + '天'
    } else if (days <= 0) {
      days = "已过期";
    }
  } else {
    days = "已过期";
  }
  return days;
}
//到及时到港时间
export function timePresell(due) {
  let days;
  if (due) {
    due = due.split('.')[0];
    let date = due.split(' ')[0];
    var arr = due.split(/[- : \/]/);
    var duedateDate = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]);
    var pubdateDate = new Date();
    var dateValue = duedateDate.getTime() - pubdateDate.getTime();
    days = Math.ceil(dateValue / (24 * 3600 * 1000));

    if (days <= 0) {
      days = "已到港";
    } else if (days > 0 && days <= 30) {
      if (days < 10) {
        days = [0, days];
      } else {
        days = days + '';
        days = days.split('');
      }
    } else if (days > 30) {
      days = date;
    }

  } else {
    //days = "已到港";
  }
  return days;
}
//预计到货时间
export function timePreData(due) {
  let days;
  if (due) {
    due = due.split('.')[0];
    let date = due.split(' ')[0];
    var arr = due.split(/[- : \/]/);
    var duedateDate = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]);
    var pubdateDate = new Date();
    var dateValue = duedateDate.getTime() - pubdateDate.getTime();
    days = Math.ceil(dateValue / (24 * 3600 * 1000));
    if (days == 0) {
      days = 1 + '天内';
    } else if (days > 0 && days <= 30) {
      days = days + '天内'
    } else if (days < 0) {
      days = "已到货";
    } else if (days > 30) {
      days = date;
    }
  } else {
    //days = "已到货";
  }
  return days;
}
//过滤 获得纯天数
export function timeDateNum(due) {
  let days;
  if (due) {
    due = due.split('.')[0];
    let date = due.split(' ')[0];
    var arr = due.split(/[- : \/]/);
    var duedateDate = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]);
    var pubdateDate = new Date();
    var dateValue = duedateDate.getTime() - pubdateDate.getTime();
    days = Math.ceil(dateValue / (24 * 3600 * 1000));
    if (days <= 0) {
      days = 0;
    }
  } else {
    days = 0;
  }
  if (days > 30) {
    days = 30;
  }
  return days;
}
// 新增 过滤用户生日
export function userBirthday(time) {
  if (!time || time === '' || time == 0) {
    return '';
  } else {
    let date = new Date(time);
    let y = date.getFullYear();
    let M = date.getMonth() + 1;
    let d = date.getDate();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    M = M < 10 ? '0' + M : M;
    d = d < 10 ? '0' + d : d;
    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;
    return y + '-' + M + '-' + d + ' ' + h + ':' + m + ':' + s;
  }
}

function pluralize(time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}

export function floatType(val) {
  if (val) {
    val = parseFloat(val);
    val = val.toFixed(2);
  }
  return val;
}

export function percentType(val) {
  if (val == 0) {
    val = '--';
  } else {
    val = parseFloat(val);
    val = val.toFixed(2) + '%'; //四舍五入保留几位小数
  }
  return val;
}

export function formatTime(time) {

  return moment(time).format('YYYY-MM-DD HH:mm');
}
export function formatBirth(time) {
  return moment(time).format('YYYY-MM-DD');
}

export function myBirth(time) {
  return moment(time * 1000).format('YYYY-MM-DD');
}
export function formatHourTime(time) {

  return moment(time).format('HH:mm');
}

export function formatClientType(type) {
  let client = '';
  switch (type) {
    case 0:
      client = 'ios';
      break;
    case 1:
      client = 'android';
      break;
    default:
      client = '未知';
      break;
  }
  return client;
}

export function formatOpenType(type) {
  let client = '';
  switch (type) {
    case 0:
      client = '未开启';
      break;
    case 1:
      client = '已开启';
      break;
    default:
      client = '未知';
      break;
  }
  return client;
}

export function formatMediaType(type) {
  let client = '';
  switch (type) {
    case 0:
      client = '无效';
      break;
    case 1:
      client = '有效';
      break;
    default:
      client = '未知';
      break;
  }
  return client;
}


export function purchaseStatus(val) {
  switch (val) {
    case -2:
      val = '已过期';
      break;
    case -1:
      val = '已取消';
      break;
    case 0:
      val = '待审核';
      break;
    case 10:
      val = '待审核';
      break;
    case 20:
      val = '待付款';
      break;
    case 30:
      val = '待卖家发货';
      break;
    case 40:
      val = '待卖家发货';
      break;
    case 50:
      val = '待收货';
      break;
    case 60:
      val = '已完成';
      break;
    case 70:
      val = '已完成';
      break;
  }
  return val;
}
export function preStatus(val) {
  switch (val) {
    case 10:
      val = '待审核';
      break;
    case 66:
      val = '待支付定金';
      break;
    case 20:
      val = '待支付尾款';
      break;
    case 30:
      val = '待发货';
      break;
    case 40:
      val = '待发货';
      break;
    case 50:
      val = '待收货';
      break;
    case 60:
      val = '确认收货';
      break;
  }
  return val;
}

export function preAction(val) {
  switch (val) {
    case 10:
      val = '';
      break;
    case 66:
      val = '付定金';
      break;
    case 20:
      val = '付尾款';
      break;
    case 40:
      val = '待发货';
      break;
    case 50:
      val = '待收货';
      break;
    case 60:
      val = '确认收货';
      break
  }
  return val;
}

export function sellStatus(val) {
  switch (val) {
    case -2:
      val = '已过期';
      break;
    case -1:
      val = '已取消';
      break;
    case 0:
      val = '待审核';
      break;
    case 10:
      val = '待审核';
      break;
    case 20:
      val = '待买家付款';
      break;
    case 30:
      val = '待收款';
      break;
    case 40:
      val = '待发货';
      break;
    case 50:
      val = '待买家收货';
      break;
    case 60:
      val = '已完成';
      break;
    case 70:
      val = '已完成';
      break;
  }
  return val;
}
export function timeFormat(val) {
  if (val) val = val.split(' ')[0];
  return val;
}

// 省市县三级联动处理 符合UI框架
// export function addressLinkage() {
//   let arr = [];
//   let p = address.p["000000"];
//   let c = address.c;
//   let d = address.d;
//   //先遍历每个省 填入数组中
//   // debugger;
//   for (let pp in p) {
//     let objP = {
//       value: '',
//       label: ''
//     }
//     objP.value = pp; //赋值键
//     objP.label = p[pp]; //赋值值
//     if (c[pp]) {
//       objP.children = [];
//     }
//     //遍历省对应 的所有市
//     for (let cc in c[pp]) {
//       let objC = {
//         value: '',
//         label: ''
//       }
//       if (d[cc]) {
//         objC.children = [];
//       }
//       objC.value = cc;
//       objC.label = c[pp][cc];
//       objP.children.push(objC);
//       //遍历所有的县
//       for (let dd in d[cc]) {
//         let objD = {
//           value: '',
//           label: '',
//         }
//         objD.value = dd;
//         objD.label = d[cc][dd];
//         objC.children.push(objD);
//       }
//
//     }
//     arr.push(objP);
//   }
//   return arr;
// }
// // 过滤省市县
// export function getPCD() {
//   // 通过数组获得省市县的文字 并返回
//   // debugger;
//   let ls = arguments.length;
//   let arr = arguments;
//   let p = address.p["000000"];
//   let c = address.c;
//   let d = address.d;
//   let str = ''
//   if (Number(arr[0]) > 0 && ls >= 1) {
//     str = p[arr[0]]
//
//     if (Number(arr[1]) > 0 && ls >= 2) {
//
//       str += '/' + c[arr[0]][arr[1]];
//
//       if (Number(arr[2]) > 0 && ls >= 3) {
//
//         str += '/' + d[arr[1]][arr[2]];
//
//       }
//     }
//
//   }
//   return str;
// }
// //又省市区汉字变成编码形式
// export function pcdTrans(arr) {
//   let myArr = [];
//   let p = address.p["000000"];
//   let c = address.c;
//   let d = address.d;
//   let cp = '';
//   let cc = '';
//   let cd = '';
//   for (var item in p) {
//     if (p[item] == arr[0]) {
//       cp = item;
//       myArr.push(cp);
//     }
//   }
//   if (cp) {
//     for (var key in c[cp]) {
//       if (c[cp][key] == arr[1]) {
//         cc = key;
//         myArr.push(cc);
//       }
//     }
//   }
//   if (cc) {
//     for (var key in d[cc]) {
//       if (d[cc][key] == arr[2]) {
//         cd = key;
//         myArr.push(cd)
//       }
//     }
//   }
//   return myArr;
// }

//把时间转换为距离今天的天数
export function getDay(myDate) {
  let toDay = new Date();
  toDay = toDay.getTime();
  let duedate = myDate.getTime();
  let time = duedate - toDay;
  let day = Math.ceil(time / (1000 * 3600 * 24));
  return day;
}
//性别过滤
export function sex(val) {
  switch (val) {
    case 1:
      val = '男';
      break;
    case 0:
      val = '女';
      break;
  }
  return val;
}
//默认或者不默认地址
export function addressType(val) {
  switch (val) {
    case 1:
      val = '默认';
      break;
    case 0:
      val = '';
      break;
  }
  return val;
}

export function filterSeven(val) {
  if (!val) {
    return '暂无';
  } else if (val && val.length > 6) {
    return val.substring(0, 5) + '...';
  } else {
    return val;
  }

}

export function filterTen(val) {
  if (!val) {
    return '暂无';
  } else if (val && val.length > 10) {
    return val.substring(0, 9) + '...';
  } else {
    return val;
  }

}

export function filtertitle(val) {
  if (!val) {
    return '暂无';
  } else if (val && val.length > 22) {
    return val.substring(0, 21) + '...';
  } else {
    return val;
  }

}
//id转换为单位
export function idToUnit(val) {
  switch (val) {
    case 1:
      val = '斤';
      break;
    case 3:
      val = '克';
      break;
    case 63:
      val = '公斤';
      break;
    case 64:
      val = '棵';
      break;
    case 66:
      val = '份';
      break;
    case 69:
      val = '朵';
      break;
    case 70:
      val = '瓶';
      break;
    case 71:
      val = '吨';
      break;
    case 72:
      val = '株';
      break;
    case 73:
      val = '只';
      break;
    case 74:
      val = '盒';
      break;
    case 110:
      val = '升';
      break;
    case 112:
      val = '20尺柜';
      break;
    case 73:
      val = '40尺柜';
      break;
    case 73:
      val = '40高柜';
      break;
  }
  return val;
}
//过滤文字长度
export function filterTxt(txt, num) {
  if (txt && txt.length > num && num && num != 0) {
    return txt.substring(0, num) + '...';
  } else {
    return txt
  }

}

export function filterPercent(txt, num) {
  if (txt == 0) {
    txt = '--';
  } else {
    txt = parseFloat(txt);
    txt = txt.toFixed(2) + '%'; //四舍五入保留几位小数
  }

  if (txt !== 0) {
    let str = '';
    let strArr = []
    if (txt.length > num && num && num != 0) {
      strArr = txt.split('').splice(0, num);
      strArr.push('...');
      return strArr.join('');
    } else {

    }
  }
  return txt
}
//过滤总价价格
export function filterPrice(price, number) {
  price = price * 10000;
  //price = price.toFixed(2);
  return (price * number / 10000).toFixed(2);
}
//过滤总价价格
export function filterPrePrice(price, number) {
  price = price * 10000;
  return (price * number / 20000).toFixed(2);
}
//过滤设备信息
//获取设备信息
export function device() {
  var agent = navigator.userAgent.toLowerCase();
  var regStr_ie = /msie [\d.]+;/gi;
  var regStr_ff = /firefox\/[\d.]+/gi
  var regStr_chrome = /chrome\/[\d.]+/gi;
  var regStr_saf = /safari\/[\d.]+/gi;
  let verInfo = {};
  //IE
  if (agent.indexOf("msie") > 0) {
    verInfo = {
      type: "IE",
      ver: (agent.match(regStr_ie) + "").replace(/[^0-9.]/ig, "")
    };
  } else if (agent.indexOf("firefox") > 0) {
    verInfo = {
      type: "firefox",
      ver: (agent.match(regStr_ff) + "").replace(/[^0-9.]/ig, "")
    };
  } else if (agent.indexOf("chrome") > 0) {
    verInfo = {
      type: "chrome",
      ver: (agent.match(regStr_chrome) + "").replace(/[^0-9.]/ig, "")
    };
  } else if (agent.indexOf("safari") > 0 && agent.indexOf("chrome") < 0) {
    verInfo = {
      type: "safari",
      ver: (agent.match(regStr_saf) + "").replace(/[^0-9.]/ig, "")
    };
  }
  return verInfo;
};

export function countAddress(address) {
  let len = address.length;
  let result = '';
  switch (len) {
    case 0:
      result = '';
      break;
    case 1:
      result = address[0];
      break;
    case 2:
      result = address[0] + ',' + address[1];
      break;
    case 3:
      result = address[0] + ',' + address[1] + ',' + address[2];
      break;
    default:
      result = '';
      break;
  }
  return result;
};
export function countAddressStr(addressstr) {
  let arr = addressstr.split(',')
  let len = arr.length;
  let result = [];
  switch (len) {
    case 0:
      result = [];
      break;
    case 1:
      result = [arr[0]];
      break;
    case 2:
      result = [arr[0], arr[1]];
      break;
    case 3:
      result = [arr[0], arr[1], arr[2]];
      break;
    default:
      result = [];
      break;
  }
  return result;
};


export function IdentityCodeValid(code) {
  var city = {
    11: "北京",
    12: "天津",
    13: "河北",
    14: "山西",
    15: "内蒙古",
    21: "辽宁",
    22: "吉林",
    23: "黑龙江 ",
    31: "上海",
    32: "江苏",
    33: "浙江",
    34: "安徽",
    35: "福建",
    36: "江西",
    37: "山东",
    41: "河南",
    42: "湖北 ",
    43: "湖南",
    44: "广东",
    45: "广西",
    46: "海南",
    50: "重庆",
    51: "四川",
    52: "贵州",
    53: "云南",
    54: "西藏 ",
    61: "陕西",
    62: "甘肃",
    63: "青海",
    64: "宁夏",
    65: "新疆",
    71: "台湾",
    81: "香港",
    82: "澳门",
    91: "国外 "
  };
  var tip = "";
  var pass = true;

  if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
    tip = "身份证号格式错误";
    pass = false;
  }

  else if (!city[code.substr(0, 2)]) {
    tip = "地址编码错误";
    pass = false;
  }
  else {
    //18位身份证需要验证最后一位校验位
    if (code.length == 18) {
      code = code.split('');
      //∑(ai×Wi)(mod 11)
      //加权因子
      var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
      //校验位
      var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
      var sum = 0;
      var ai = 0;
      var wi = 0;
      for (var i = 0; i < 17; i++) {
        ai = code[i];
        wi = factor[i];
        sum += ai * wi;
      }
      var last = parity[sum % 11];
      if (parity[sum % 11] != code[17]) {
        tip = "校验位错误";
        pass = false;
      }
    }
  }
  // if(!pass) alert(tip);
  return pass;
}

//过滤 权限数组
export function filterMenus(res) {
  //置空父级的url
  let arr = []
  for (var i = 0; i < res.length; i++) {
    let obj = {};
    obj.name = res[i].cname;
    obj.index = i + '';
    //权限使用
    obj.subMenus = res[i].subMenus;
    //导航使用
    obj.children = [];
    arr.push(obj);
    //遍历路由级权限
    if (obj.subMenus.length > 0) {
      for (var j = 0; j < obj.subMenus.length; j++) {
        let sonObj = {};
        sonObj.path = obj.subMenus[j].url;
        sonObj.title = obj.subMenus[j].cname;
        sonObj.index = i + '-' + j;
        sonObj.subMenus = obj.subMenus[j].subMenus;
        sonObj.validate = {};
        //遍历按钮级的权限
        if (sonObj.subMenus.length > 0) {
          for (var k = 0; k < sonObj.subMenus.length; k++) {
            sonObj.validate[sonObj.subMenus[k].cname] = sonObj.subMenus[k].safecode;
          }
        }
        obj.children.push(sonObj);
      }
    }
  }
  return arr;
}


//日期时间格式成国际化
const dayAbbreviation = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
const dayList = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
  'Oct', 'Nov', 'Dec']
const monthLongList = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December']

export const enDateFormat = {
  formatDisplay (date) {
    return `${dayList[date.getDay()]}, ${monthList[date.getMonth()]} ${date.getDate()}`
  },
  formatMonth (date) {
    return `${monthLongList[date.getMonth()]} ${date.getFullYear()}`
  },
  getWeekDayArray (firstDayOfWeek) {
    let beforeArray = []
    let afterArray = []
    for (let i = 0; i < dayAbbreviation.length; i++) {
      if (i < firstDayOfWeek) {
        afterArray.push(dayAbbreviation[i])
      } else {
        beforeArray.push(dayAbbreviation[i])
      }
    }
    return beforeArray.concat(afterArray)
  }
}
//日期时间格式化中文
let localConfig = {
  dayAbbreviation: ['日', '一', '二', '三', '四', '五', '六'],
  dayList: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
  monthList: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
  monthLongList: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
}

export const dateTimeFormat = {
  formatDisplay (date) {
    var day = date.getDate()
    return `${localConfig.monthList[date.getMonth()]}-${day > 9 ? day : '0' + day} ${localConfig.dayList[date.getDay()]}`
  },
  formatMonth (date) {
    return `${date.getFullYear()} ${localConfig.monthLongList[date.getMonth()]}`
  },
  getWeekDayArray (firstDayOfWeek) {
    let beforeArray = []
    let afterArray = []
    const dayAbbreviation = localConfig.dayAbbreviation
    for (let i = 0; i < dayAbbreviation.length; i++) {
      if (i < firstDayOfWeek) {
        afterArray.push(dayAbbreviation[i])
      } else {
        beforeArray.push(dayAbbreviation[i])
      }
    }
    return beforeArray.concat(afterArray)
  }
}
