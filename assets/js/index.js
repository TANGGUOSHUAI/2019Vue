Vue.component('tagname',{
  data(){
    return{

    }
  },
  props:['title'],
  template:"<li @click='click($event)'><a href='javascript:;'>{{title}}</a></li>",
  methods:{
    //点击选项的时候，因为被点击的内容空格问题，有时候匹配不上
    click:function(e){
      var that = page.$data,
          a = true,
          txt = event.currentTarget.innerText,
          len = that.selectef_list[0].Sublevel_item.length;
      console.log(that);
          
      that.selectef_list[0].Sublevel_item.forEach(function(v) {
        if (v.text == txt) {
          a = false;
        }
      });
      // 点击重复的时候不执行下边所有代码
      if (!a) {
        return;
      }
      that.selectef_list[0].Sublevel_item.push(txt);
      that.arr.push(txt);
      that.msgsList = that.msgsList.filter(function(list){
        return list.product_tp.find(function(tp){          
          return tp === txt;
        })
      })
      this.$set(that.selectef_list[0].Sublevel_item, len, { text: txt });
    }
  }
})


var page = new Vue({
  el: "#container",
  data() {
    return {
      logourl: "http://www.acg170.com/Public/logo.png",
      getImgUrl: "https://x.acg170.com/getdata/wx_new/p1/1",
      msgList: [],
      msgsList: [],
      choise_list: [],
      arr: [],
      click_txt: "",
      len: "",
      imgsrc: "http://www.acg170.com/Public/image/product",
      nav_list: [
        { text: "首页" },
        { text: "文章" },
        { text: "视频" },   
        { text: "图片" },
        { text: "论坛" },
        { text: "资料库" },
        { text: "移动端APP" },
        { text: "意见反馈" }
      ],
      choise_nav: [
        { text: "全部" },
        { text: "机甲" },   
        { text: "手办" },
        { text: "特摄" },
        { text: "美系" },
        { text: "积木" },
        { text: "模型" }
      ],

      selectef_list:[
        {
          text:"已选",
          imgsrc: "http://www.acg170.com/Public/home/images/xuanzhong.png",
          close:"http://www.acg170.com/Public/home/images/nav-x.png",
          Sublevel_item: []
        }
          
      ],


      selectef_time:[
        {
           text: "日期",
          imgsrc: "http://www.acg170.com/Public/home/images/clock-circle.png",
          Sublevel_item: [
            // { text: "2018" },
            // { text: "2017" },
            // { text: "2016" },
            // { text: "2015" },
            // { text: "2014" },
            // { text: "2013" },
            // { text: "2012" },
            // { text: "2011" },
            // { text: "2010" },
            // { text: "2009" },
            // { text: "2008" },
            // { text: "1997" }
          ]
        }
      ],
      time_list:[],
      Sublevel_list: [
        {
          text: "剧集",
          imgsrc: "http://www.acg170.com/Public/home/images/home.png",
          Sublevel_item: [
            { text: "变形金刚" },
            { text: "高达" },
            { text: "漫威英雄" },
            { text: "乐高积木" },
            { text: "海贼王" },
            { text: "龙珠" },
            { text: "圣斗士" },
            { text: "Fate系列" },
            { text: "DC英雄" },
            { text: "奥特曼" },
            { text: "偶像大师系列" },
            { text: "银魂" },
            { text: "小鲁班积木" },
            { text: "剑锋传奇" },
            { text: "超级战队" }
          ]
        },
        {
          text: "品牌",
          imgsrc: "http://www.acg170.com/Public/home/images/home.png",
          Sublevel_item: [
            { text: "万代" },
            { text: "WING " },
            { text: "WARBOTRON " },
            { text: "Gecco " },
            { text: "TOPEAM " },
            { text: "眼镜厂 " },
            { text: "HOT TOYS " },
            { text: "Mega House " },
            { text: "孩之宝 " },
            { text: "海洋堂 " }
          ]
        }
      ]
    };
  },
  created: function() {
    var _self = this;
    axios({
      method: "get",
      url: "http://www.acg170.com/api/blank/wz_product",
      dataType: "json",
      params: {
        n: 1
      }
    })
      .then(function(response) {
        _self.time_list = response.data.time;
        console.log(response.data);
        _self.msgsList = response.data.product;
        _self.msgList = response.data.product;
        for (var i = 0; i < _self.msgsList.length; i++) {
          _self.msgsList[i].product_tp = JSON.parse(
            _self.msgsList[i].product_tp
          );          
        }
        console.log(_self.time_list);
        for(var j = 0; j < _self.time_list.length; j++){
          _self.time_list[i].time = JSON.parse(_self.time_list[i].time);
        }
          console.log(_self.time_list[i]);

      })
      .catch(function(error) {
          console.log(error);
      });
  },

  methods: {
    close:function(e){
      var that = this;
      this.selectef_list[0].Sublevel_item.filter(function(list,index){
        // console.log(list);
        if(list.text === e.currentTarget.innerText){
           that.selectef_list[0].Sublevel_item.splice(index,index+1);
            // console.log(list);
            // console.log(that.Sublevel_list[0].Sublevel_item);
        }else{
          console.log(that.selectef_list[0].Sublevel_item);
        }
      })

      if(that.selectef_list[0].Sublevel_item.length>0){
        // 将筛选条件进行循环跟列表中的数据 进行匹配
        that.msgsList = that.msgList.filter(list =>{
          // 返回了数据与规则全部匹配的数据
         return that.selectef_list[0].Sublevel_item.every(text =>{;
            // 返回匹配项的值没有-1的
            return list.product_tp.indexOf(text.text) != -1;
          })
        })
      }else{
        // 如果筛选条件没有的时候，展示全部数据
        that.msgsList = that.msgList; 
      }
    },

    choise_time:function(e){
      var that = this,
          txt = e.currentTarget.innerText,
          sum = true,
          len = that.selectef_list[0].Sublevel_item.length;
          console.log(this.selectef_list[0].Sublevel_item);
          console.log(that.time_list);
          // console.log(that.selectef_time);

            this.selectef_list[0].Sublevel_item.forEach(function(v) {
                if(txt==v.text){
                  sum = false;
                }
            });
            console.log(this.selectef_time[0].Sublevel_item);
            this.selectef_time[0].Sublevel_item.forEach(function(v){
              console.log(v);
            })

            if(!sum){
              return;
            }

            
          this.$set(that.selectef_list[0].Sublevel_item, len, { text: txt });

    }

  }
});
