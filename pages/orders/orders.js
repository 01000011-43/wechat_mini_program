// pages/orders/orders.js
const hours = [];
const minutes = [];
const days = ["今天","明天","后天","大后天"]
for (let i = 0; i < 24; i++) {
  if (i < 10) {
    i = "0" + i;
  }
  hours.push("" + i + "时");
}
//获取分钟
for (let i = 0; i < 60; i++) {
  if (i < 10) {
    i = "0" + i;
  }
  minutes.push("" + i + "分");
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 最上方tab组件数据
    tabList:[{
      id:0,
      name:"找代领",
      select_src:"/pics_icon/errand_select.png",
      unselect_src:"/pics_icon/errand.png",
      isActive:true,
    },{
      id:1,
      name:"组队",
      select_src:"/pics_icon/team_select.png",
      unselect_src:"/pics_icon/team.png",
      isActive:false
    },{
      id:2,
      name:"拼车",
      select_src:"/pics_icon/taxi_select.png",
      unselect_src:"/pics_icon/taxi.png",
      isActive:false
    },{
      id:3,
      name:"帮跑腿",
      select_src:"/pics_icon/path_select.png",
      unselect_src:"/pics_icon/path.png",
      isActive:false
    },{
      id:4,
      name:"合租",
      select_src:"/pics_icon/apartment_select.png",
      unselect_src:"/pics_icon/apartment.png",
      isActive:false
    }
    ],
    // choose_list
    choose_list_pinche:[{
      id:0,
      name:"快递",
      isActive:true
    },{
      id:1,
      name:"外卖",
      isActive:false
    },{
      id:2,
      name:"其他",
      isActive:false
    }],
    // 粘贴信息
    copy_message:"",
    // 控制显不显示弹窗
    actionSheetHidden:true,
    menu:'',
    // 个人信息
    personList:{
      update_press:false,
      name:"",
      phone:18000000000,
      address:"",
    },
    // 详细信息
    postDetailList:{
      type:"", // 下单类型
      company:"", // 快递、外卖公司
      package_size:"", // 快递大小
      package_type:"", // 物件类型【外卖、跑腿其他、组队活动类型】
      time_stop_list:"",// 任务截止时间
      time_hope_list:"",// 期望送达时间 + 出发时间
      time_predict_list:"", // 预计到达时间 
      price:0, // 赏金
      address_aim:"", // 目的地址
      address_group:"", // 集合地址
      limit_number:4, // 人数限制
      message:"", // 备注留言
    },
    // 尺寸选择器
    index1:0, // 快递公司
    index2:0, // 快递尺寸
    index3:0, // 外卖
    index4:0, // 物件类型
    index5:0, // 活动类型
    size_array:["选择尺寸","尺寸适中","尺寸较大","尺寸特大","尺寸小"],
    // 快递公司选择器
    company_array:["选择快递公司","顺丰","京东","韵达","天天","中通","申通","圆通","其他[在备注中注明]"],
    // 外卖公司
    food_company_array:["选择外卖公司","美团","饿了么","其他"],
    // 跑腿物件类型
    package_type_array:["文件","水果","小吃","奶茶","电子产品","其他"],
    // 活动类型
    activity_type_array:["活动类型","体育","学习","娱乐","电竞","其他"],
    // 时间选择器
    multiArray:[days,hours,minutes],
    multiIndex:[],
    multiIndex_predict:[],
    multiIndex_hope:[],
    time_stop:"",
    time_hope:"",
    time_predict:"",
  },
// 隐藏和显示底部
  actionSheetTap:function(){
    this.setData({
      actionSheetHidden:!this.data.actionSheetHidden
    })
  },
  actionSheetbindchange:function(){
    this.setData({
      actionSheetHidden:!this.data.actionSheetHidden
    })
  },

  // 个人信息更新按钮
  updatePress(e){
    var update_press = 'personList.update_press';
    this.setData({
      [update_press] : true
    })
  },

  // 普通选择器
  // 快递尺寸
  bindPickerChange_size: function(e) {
    let package_size = 'postDetailList.package_size';
    this.setData({
      index2: e.detail.value,
      [package_size]:this.data.size_array[e.detail.value]
    })
  },
  // 快递公司
  bindPickerChange_company: function(e) {
    let company = 'postDetailList.company';
    this.setData({
      index1: e.detail.value,
      [company]:this.data.company_array[e.detail.value]
    })
  },
  // 外卖公司
  bindPickerChange_food:function(e){
    let company = 'postDetailList.company';
    this.setData({
      index3: e.detail.value,
      [company]:this.data.food_company_array[e.detail.value]
    })
  },
  // 跑腿包裹
  bindPickerChange_package:function(e){
    let package_type = 'postDetailList.package_type';
    this.setData({
      index4: e.detail.value,
      [package_type]:this.data.package_type_array[e.detail.value]
    })
  },
  // 活动类型
  bindPickerChange_activity:function(e){
    let package_type = 'postDetailList.package_type';
    this.setData({
      index5: e.detail.value,
      [package_type]:this.data.activity_type_array[e.detail.value]
    })
  },

  // 时间选择器
  // 截止时间
  bindMultiPickerChange_stop: function(e) {
    this.setData({
      multiIndex:e.detail.value
    })
    var myDate = new Date();
    var dateTime = new Date();
    const index = this.data.multiIndex;
    const day = this.data.multiArray[0][index[0]];
    const hour = this.data.multiArray[1][index[1]];
    const minute = this.data.multiArray[2][index[2]];
    // 日
    let final_day = "";
    let stop_day = index[0];
    if(stop_day===1){
      dateTime=dateTime.setDate(dateTime.getDate()+1);
      dateTime=new Date(dateTime);
      final_day = dateTime.getDate();     
    }else if(stop_day===2){
      dateTime=dateTime.setDate(dateTime.getDate()+2);
      dateTime=new Date(dateTime);
      final_day = dateTime.getDate();
    }else if(stop_day===3){
      dateTime=dateTime.setDate(dateTime.getDate()+3);
      dateTime=new Date(dateTime);
      final_day = dateTime.getDate();
    }else{
      final_day = myDate.getDate()
    }
    // 时
    let stop_hour = index[1];
    if(stop_hour < 10){
      stop_hour = '0' + stop_hour;
    }
    //分
    let stop_minute = index[2];
    if(stop_minute < 10){
      stop_minute = '0' + stop_minute;
    }
    let final_month = dateTime.getMonth() + 1;
    var time_stop_list ='postDetailList.time_stop_list';
    this.setData({
      time_stop:day + '-' + hour + '-' + minute,
      [time_stop_list]:myDate.getFullYear() + '-' + final_month + '-' + final_day + ' ' + stop_hour + ':' + stop_minute + ':00' ,
    })
  },
  // 期望时间
  bindMultiPickerChange_hope:function(e){
    this.setData({
      multiIndex_hope:e.detail.value
    })
    var myDate = new Date();
    var dateTime = new Date();
    const index = this.data.multiIndex_hope;
    const day = this.data.multiArray[0][index[0]];
    const hour = this.data.multiArray[1][index[1]];
    const minute = this.data.multiArray[2][index[2]];
    // 日
    let final_day = "";
    let stop_day = index[0];
    if(stop_day===1){
      dateTime=dateTime.setDate(dateTime.getDate()+1);
      dateTime=new Date(dateTime);
      final_day = dateTime.getDate();     
    }else if(stop_day===2){
      dateTime=dateTime.setDate(dateTime.getDate()+2);
      dateTime=new Date(dateTime);
      final_day = dateTime.getDate();
    }else if(stop_day===3){
      dateTime=dateTime.setDate(dateTime.getDate()+3);
      dateTime=new Date(dateTime);
      final_day = dateTime.getDate();
    }else{
      final_day = myDate.getDate();
    }
    // 时
    let stop_hour = index[1];
    if(stop_hour < 10){
      stop_hour = '0' + stop_hour;
    }
    //分
    let stop_minute = index[2];
    if(stop_minute < 10){
      stop_minute = '0' + stop_minute;
    }
    let final_month = dateTime.getMonth() + 1;
    var time_hope_list ='postDetailList.time_hope_list';
    this.setData({
      time_hope:day + '-' + hour + '-' + minute,
      [time_hope_list]:myDate.getFullYear() + '-' + final_month + '-' + final_day + ' ' + stop_hour + ':' + stop_minute + ':00' ,
    })
  },
  // 预计时间
  bindMultiPickerChange_predict:function(e){
    this.setData({
      multiIndex_predict:e.detail.value
    })
    var myDate = new Date();
    var dateTime = new Date();
    const index = this.data.multiIndex_predict;
    const day = this.data.multiArray[0][index[0]];
    const hour = this.data.multiArray[1][index[1]];
    const minute = this.data.multiArray[2][index[2]];
    // 日
    let final_day = "";
    let stop_day = index[0];
    if(stop_day===1){
      dateTime=dateTime.setDate(dateTime.getDate()+1);
      dateTime=new Date(dateTime);
      final_day = dateTime.getDate();     
    }else if(stop_day===2){
      dateTime=dateTime.setDate(dateTime.getDate()+2);
      dateTime=new Date(dateTime);
      final_day = dateTime.getDate();
    }else if(stop_day===3){
      dateTime=dateTime.setDate(dateTime.getDate()+3);
      dateTime=new Date(dateTime);
      final_day = dateTime.getDate();
    }else{
      final_day = myDate.getDate();
    }
    // 时
    let stop_hour = index[1];
    if(stop_hour < 10){
      stop_hour = '0' + stop_hour;
    }
    //分
    let stop_minute = index[2];
    if(stop_minute < 10){
      stop_minute = '0' + stop_minute;
    }
    let final_month = dateTime.getMonth() + 1;
    var time_predict_list ='postDetailList.time_predict_list';
    this.setData({
      time_predict:day + '-' + hour + '-' + minute,
      [time_predict_list]:myDate.getFullYear() + '-' + final_month + '-' + final_day + ' ' + stop_hour + ':' + stop_minute + ':00' ,
    })
  },
  bindMultiPickerColumnChange: function(e){

  },

  // 时间初始化【截止 + 期望】
  timeonLoad(){
    // 初始化时间
    var myDate = new Date();
    let day = "";
    let select_day_hope = 0;
    let select_hour_hope = 0;
    let hour = "";
    let final_day = "";
    let final_hour = "";
    var myHours = myDate.getHours();
    var myMinutes = myDate.getMinutes();
    // 设置初始的时间
    if (myHours >= 21){
      select_day_hope = 1;
      select_hour_hope = 12;
    }else{
      select_hour_hope = 21;
      select_day_hope = 0;
    }
    // 设置上传的时间数据格式
    if(select_day_hope===1){
      final_day = myDate.getDate() + 1;
    }else{
      final_day = myDate.getDate();
    }
    final_hour = select_hour_hope;
    let final_month = myDate.getMonth() + 1;
    var time_stop_list ='postDetailList.time_stop_list';
    var time_hope_list ='postDetailList.time_hope_list';
    this.setData({
      time_stop:days[select_day_hope] + '-' + hours[select_hour_hope] + '-' + minutes[30],
      time_hope:days[select_day_hope] + '-' + hours[select_hour_hope] + '-' + minutes[30],
      multiIndex:[select_day_hope,select_hour_hope,0],
      [time_stop_list]:myDate.getFullYear() + '-' + final_month + '-' + final_day + ' ' + final_hour + ':' + '30:00' ,
      [time_hope_list]:myDate.getFullYear() + '-' + final_month + '-' + final_day + ' ' + final_hour + ':' + '30:00' ,
    })
  },
  // 预计时间初始化
  timeonLoad_predict(){
    // 初始化时间
    var myDate = new Date();
    console.log(myDate);
    var myHours = myDate.getHours();
    var myDay = "";
    var myMinutes = myDate.getMinutes();
    var select_day_predict = "";
    var select_hour_predict = "";
    if(myHours >= 23){
      select_day_predict = 1;
      select_hour_predict = 0;
      myDay = myDate.getDate() + 1;
      myHours = '00'
    }else{
      select_hour_predict = myHours + 1;
      select_day_predict = 0;
      myDay = myDate.getDate();
      myHours = myHours + 1;
    }
    let myMonth = myDate.getMonth() + 1;
    var time_predict_list ='postDetailList.time_predict_list';
    this.setData({
      multiIndex_predict:[select_day_predict,select_hour_predict,myMinutes],
      time_predict:days[select_day_predict] + '-' + hours[select_hour_predict] + '-' + minutes[myMinutes],
      [time_predict_list]:myDate.getFullYear() + '-' + myMonth + '-' + myDay + ' ' + myHours+ ':' + myMinutes + ':00' ,
    })
    
  },

  // 导航头部回传事件
  handleTabsItemChange(x){
    const index=x.detail;
    let {tabList} = this.data;
    tabList.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    var type = 'postDetailList.type';
    if(index===0){
      this.setData({
        [type]:"快递"
      })
    }
    else if(index===1){
      this.setData({
        [type]:"组队"
      })
    }
    else if(index===2){
      this.setData({
        [type]:"拼车"
      })
    }
    else if(index===3){
      this.setData({
        [type]:"帮跑腿"
      })
    }
    else if(index===4){
      this.setData({
        [type]:"合租"
      })
    }
    this.setData({
      tabList
    })
  },
  // 导航下部回传事件
  handleTabsItemChange_choose(x){
    const index=x.detail;
    let {choose_list_pinche} = this.data;
    var type = 'postDetailList.type';
    choose_list_pinche.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    if(index===0){
      this.setData({
        [type]:"快递"
      })
    }
    else if(index===1){
      this.setData({
        [type]:"外卖"
      })
    }
    else if(index===2){
      this.setData({
        [type]:"其他"
      })
    }
    this.setData({
      choose_list_pinche
    })
  },

  // 输入框内容
  handleInput(x){
    // 输入名字
    if(x.currentTarget.dataset.index==="name"){
      let person_name = 'personList.name';
      this.setData({
        [person_name]:x.detail.value
      })
    }
    // 输入手机号
    else if(x.currentTarget.dataset.index==="phone"){
      let person_phone = 'personList.phone';
      this.setData({
        [person_phone]:x.detail.value
      })
    }
    // 输入地址
    else if(x.currentTarget.dataset.index==="address"){
      let person_address = 'personList.address';
      this.setData({
        [person_address]:x.detail.value
      })
    }
    // 输入金额
    else if(x.currentTarget.dataset.index==="price"){
      let price = 'postDetailList.price';
      this.setData({
        [price]:x.detail.value,
      })
    }
    // 输入目的地址
    else if(x.currentTarget.dataset.index==="address_aim"){
      let address_aim = 'postDetailList.address_aim';
      this.setData({
        [address_aim]:x.detail.value,
      })
    }
    // 输入集合地址
    else if(x.currentTarget.dataset.index==="address_group"){
      let address_group = 'postDetailList.address_group';
      this.setData({
        [address_group]:x.detail.value,
      })
    }
    // 物件类型
    else if(x.currentTarget.dataset.index==="package_type"){
      let package_type = 'postDetailList.package_type';
      this.setData({
        [package_type]:x.detail.value,
      })
    }
    // 输入人数限制
    else if(x.currentTarget.dataset.index==="limit_number"){
      let limit_number = 'postDetailList.limit_number';
      this.setData({
        [limit_number]:x.detail.value,
      })
    }
    // 输入备注
    else if(x.currentTarget.dataset.index==="message"){
      let message = 'postDetailList.message';
      this.setData({
        [message]:x.detail.value,
      })
    }
  },
  // 提交按钮事件
  submid(x){

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.timeonLoad();
    this.timeonLoad_predict();
    // 页面加载时，自动将 type 填充为 快递
    var type = 'postDetailList.type';
    this.setData({
      [type]:"快递"
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})