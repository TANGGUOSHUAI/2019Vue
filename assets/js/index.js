new Vue({
  el: '#container',
  data: {
    logourl: 'http://www.acg170.com/Public/logo.png',
    getImgUrl: 'https://x.acg170.com/getdata/wx_new/p1/1',
    msgList: [],
    msgsList: [],
    choise_list:[],
    arr:[],
    imgsrc: 'http://www.acg170.com/Public/image/product',
    // imgsrc:'http://www.acg170.com/Public/image/product/2019-01-04/1546569013898863.jpg',
    nav_list: [
      { text: '首页' },
      { text: '文章' },
      { text: '视频' },
      { text: '图片' },
      { text: '论坛' },
      { text: '资料库' },
      { text: '移动端APP' },
      { text: '意见反馈' }
    ],
    choise_nav: [
      { text: '全部' },
      { text: '机甲' },
      { text: '手办' },
      { text: '特摄' },
      { text: '美系' },
      { text: '积木' },
      { text: '模型' }
    ],
    Sublevel_list: [
      {
        text: '已选', imgsrc: 'http://www.acg170.com/Public/home/images/xuanzhong.png',
        Sublevel_item:[]
      },
      {
        text: '剧集', imgsrc: 'http://www.acg170.com/Public/home/images/home.png',
        Sublevel_item: [
          { text: '变形金刚' },
          { text: '高达' },
          { text: '漫威英雄' },
          { text: '乐高积木' },
          { text: '海贼王' },
          { text: '龙珠' },
          { text: '圣斗士' },
          { text: 'Fate系列' },
          { text: 'DC英雄' },
          { text: '奥特曼' },
          { text: '偶像大师系列' },
          { text: '银魂' },
          { text: '小鲁班积木' },
          { text: '剑锋传奇' },
          { text: '超级战队' }
        ]

      },
      {
        text: '品牌', imgsrc: 'http://www.acg170.com/Public/home/images/home.png',
        Sublevel_item: [
          { text: '万代' },
          { text: 'WING ' },
          { text: 'WARBOTRON ' },
          { text: 'Gecco ' },
          { text: 'TOPEAM ' },
          { text: '眼镜厂 ' },
          { text: 'HOT TOYS ' },
          { text: 'Mega House ' },
          { text: '孩之宝 ' },
          { text: '海洋堂 ' },
        ]
      },
      {
        text: '日期', imgsrc: 'http://www.acg170.com/Public/home/images/clock-circle.png',
        Sublevel_item: [
          { text: '2018' },
          { text: '2017' },
          { text: '2016' },
          { text: '2015' },
          { text: '2014' },
          { text: '2013' },
          { text: '2012' },
          { text: '2011' },
          { text: '2010' },
          { text: '2009' },
          { text: '2008' },
          { text: '1997' }
        ]
      }
    ],
  },

  created: function () {
    var _self = this;
    axios({
      method: 'get',
      url: 'http://www.acg170.com/api/blank/wz_product',
      dataType: 'json',
      params: {
        n: 1,
      }
    }).then(function (response) {
      _self.msgsList = response.data.product;
      for (var i = 0; i < _self.msgsList.length; i++) {
        _self.msgsList[i].product_tp = JSON.parse(_self.msgsList[i].product_tp);
      }
      // console.log(_self.msgsList);
      // console.log(_self.msgList);
    }).catch(function (error) {
      // alert(error);
    })
  },

  methods: {
    cont:function(event){
      var a =true;
      var txt = event.currentTarget.innerText;
      console.log(txt);
      var len = this.Sublevel_list[0].Sublevel_item.length;
      console.log(this.Sublevel_list[0].Sublevel_item);
      this.Sublevel_list[0].Sublevel_item.forEach(function(v){
        console.log(v);
        if(v.text==txt){
          a=false;
        }
      })
      if(!a){
        return;
      }
      this.Sublevel_list[0].Sublevel_item.push(txt)
      this.$set(this.Sublevel_list[0].Sublevel_item,len,{'text':txt});
      console.log(this.Sublevel_list[0].Sublevel_item);
    }   
  }
})