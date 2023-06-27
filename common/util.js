export default {
	checkPhone(phone) {
		console.log('checkPhone')
		var reg = /^1[0-9]{10,10}$|^([6|9])\d{7}$/;
		return reg.test(phone);
	},
	dateFormat(fmt, date) {
	    let ret;
	    let opt = {
	        "Y+": date.getFullYear().toString(),        // 年
	        "m+": (date.getMonth() + 1).toString(),     // 月
	        "d+": date.getDate().toString(),            // 日
	        "H+": date.getHours().toString(),           // 时
	        "M+": date.getMinutes().toString(),         // 分
	        "S+": date.getSeconds().toString()          // 秒
	        // 有其他格式化字符需求可以继续添加，必须转化成字符串
	    };
	    for (let k in opt) {
	        ret = new RegExp("(" + k + ")").exec(fmt);
	        if (ret) {
	            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
	        };
	    };
	    return fmt;
	}
}

Date.prototype.Format = function(fmt)
{ //author: meizz
  var o = {
    "M+" : this.getMonth()+1,                 //月份
    "d+" : this.getDate(),                    //日
    "h+" : this.getHours(),                   //小时
    "m+" : this.getMinutes(),                 //分
    "s+" : this.getSeconds(),                 //秒
    "q+" : Math.floor((this.getMonth()+3)/3), //季度
    "S"  : this.getMilliseconds()             //毫秒
  };
  if(/(y+)/.test(fmt))
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
  for(var k in o)
    if(new RegExp("("+ k +")").test(fmt))
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
  return fmt;
}
