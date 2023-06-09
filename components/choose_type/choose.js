// components/choose_type/choose.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    choose_list:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleItemTab1(x){
      // 1 获取点击的索引
      const {index} = x.currentTarget.dataset;
      this.triggerEvent("tabsItemChange1",index);
    },
  }
})
