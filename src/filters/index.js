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

//id转换为单位
export function idToUnit(val) {
  switch (val) {
    case 1:
      val = '斤(HKG)';
      break;
    case 3:
      val = '克(G)';
      break;
    case 63:
      val = '公斤(KG)';
      break;
    case 64:
      val = '棵(tree)';
      break;
    case 66:
      val = '份()';
      break;
    case 69:
      val = '朵(flower)';
      break;
    case 70:
      val = '瓶(bottle)';
      break;
    case 71:
      val = '吨(T)';
      break;
    case 72:
      val = '株(plant)';
      break;
    case 73:
      val = '只(only)';
      break;
    case 74:
      val = '盒(box)';
      break;
    case 110:
      val = '升(Liter)';
      break;
    case 112:
      val = '20尺柜(20GP)';
      break;
    case 73:
      val = '40尺柜(40GP)';
      break;
    case 73:
      val = '40高柜(40GP(HQ))';
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
