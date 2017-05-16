/**
 * Created by jiahailiang on 2017/2/17.
 */
// Date.prototype.Format = function (fmt) { //author: meizz
//     var o = {
//         "M+": this.getMonth() + 1, //月份
//         "d+": this.getDate(), //日
//         "h+": this.getHours(), //小时
//         "m+": this.getMinutes(), //分
//         "s+": this.getSeconds(), //秒
//         "q+": Math.floor((this.getMonth() + 3) / 3), //季度
//         "S": this.getMilliseconds() //毫秒
//     };
//     if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
//     for (var k in o)
//         if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
//     return fmt;
// };
//上面的方法时区自动加了8小时,不知道什么原因

Date.prototype.Format=function(fmt) {
    var o = {
        "M+" : this.getMonth()+1, //月份
        "d+" : this.getDate(), //日
        "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时
        "H+" : this.getHours(), //小时
        "m+" : this.getMinutes(), //分
        "s+" : this.getSeconds(), //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S" : this.getMilliseconds() //毫秒

    };
    var week = { "0" : "/u65e5", "1" : "/u4e00", "2" : "/u4e8c", "3" : "/u4e09", "4" : "/u56db", "5" : "/u4e94", "6" : "/u516d" };
    if(/(y+)/.test(fmt)){
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    if(/(E+)/.test(fmt)){
        fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "")+week[this.getDay()+""]);
    }
    for(var k in o){
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
    return fmt;
};
//操作时间
// var nowTime = new Date();
//
//     export default class newTime{
//     static operationTime(item){
//     var itemDate,itemmTime;
//
//     itemDate = item.callRecordValues[0].createdTime.split(" ")[0];
//     itemmTime = item.callRecordValues[0].createdTime.split(" ")[1];
//
//     var year = itemDate.split("-")[0];
//     var mon = itemDate.split("-")[1];
//     var day = itemDate.split("-")[2];
//     var time = new Date(year,mon-1,day);
//
//     if(time.toLocaleDateString() == nowTime.toLocaleDateString()){
//         item.operationTime = "今天 " + itemmTime.split(":")[0] + ":" + itemmTime.split(":")[1];
//     }else {
//         item.operationTime = mon + "月" + day + "日 " + itemmTime.split(":")[0] + ":" + itemmTime.split(":")[1];
//     }
// }}