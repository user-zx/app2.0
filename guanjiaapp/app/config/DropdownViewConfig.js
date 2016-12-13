/**
 * Created by jiahailiang on 2016/12/6.
 */
module.exports = {
    platform:{
        key: 'plat',
        value:[{
            pName: '',
            name: '来源',
        },{
            pName:'pc',
            name:'PC端',
        },{
            pName:'mob',
            name:'移动端',
        }],
        ajaxRequired:true,
    },
    data:{
        key:'type',
        value:[{
            pName:'week',
            name:'最近七天'
        },{
            pName:'month',
            name:'最近三十天'
        }],
        ajaxRequired:true,
    },
};