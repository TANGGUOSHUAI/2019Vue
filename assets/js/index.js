new Vue({
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
      // imgsrc:'http://www.acg170.com/Public/image/product/2019-01-04/1546569013898863.jpg',
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
      Sublevel_list: [
        {
          text: "已选",
          imgsrc: "http://www.acg170.com/Public/home/images/xuanzhong.png",
          close:"http://www.acg170.com/Public/home/images/nav-x.png",
          Sublevel_item: []
        },
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
        },
        {
          text: "日期",
          imgsrc: "http://www.acg170.com/Public/home/images/clock-circle.png",
          Sublevel_item: [
            { text: "2018" },
            { text: "2017" },
            { text: "2016" },
            { text: "2015" },
            { text: "2014" },
            { text: "2013" },
            { text: "2012" },
            { text: "2011" },
            { text: "2010" },
            { text: "2009" },
            { text: "2008" },
            { text: "1997" }
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
        _self.msgsList = response.data.product;
        _self.msgList = response.data.product;
        for (var i = 0; i < _self.msgsList.length; i++) {
          _self.msgsList[i].product_tp = JSON.parse(
            _self.msgsList[i].product_tp
          );
        };
        for (var i = 0; i < _self.msgList.length; i++) {
          _self.msgList[i].product_tp = JSON.parse(
            _self.msgList[i].product_tp
          );
        }
      })
      .catch(function(error) {
        // alert(error);
      });
  },

  methods: {
    // 筛选点击事件
    cont: function(event) {
      console.log(event);
      var a = true;
      var txt = event.currentTarget.innerText;
      var len = this.Sublevel_list[0].Sublevel_item.length;
      this.Sublevel_list[0].Sublevel_item.forEach(function(v) {
        if (v.text == txt) {
          a = false;
        }
      });
      if (!a) {
        return;
      }
      // 如果点击重复的不执行，不重复的执行，重新请求。
      // axios({
      //   method: "get",
      //   url: "http://www.acg170.com/api/blank/wz_product",
      //   dataType: "json",
      //   params: {
      //     n: 2
      //   }
      // })
      //   .then(response => {
      //     console.log(this.msgsList);
      //     this.msgsList = response.data.product;
      //     console.log(this.msgsList);
      //     for (var i = 0; i < this.msgsList.length; i++) {
      //       this.msgsList[i].product_tp = JSON.parse(
      //         this.msgsList[i].product_tp
      //       );
      //     }
      //   })
      //   .catch(function(error) {
      //     // alert(error);
      //   });
      // 将点击的不重复选项推入到新数组中
      this.Sublevel_list[0].Sublevel_item.push(txt);
      this.arr.push(txt);
      var that = this;
      // console.log(this.msgsList);
      // this.msgsList = this.msgsList.filter(list => {
      //   // console.log(list);
      //   return list.product_tp.find(tp => {
      //     // console.log(tp);
      //     return tp === txt;
      //   });
      // });

      this.msgsList = this.msgsList.filter(function(list){
        // console.log(list);
        return list.product_tp.find(function(tp){          
          return tp === txt;
        })
      })

      // 循环页面刷新时请求到的数组
      // for (var i = 0; i < this.msgsList.length; i++) {
      //   var thats = this;
      //   // console.log(this.arr);
      //   // 循环通过点击推入的不重复的数组
      //   this.arr.forEach(function(v) {
      //     // console.log(that.msgsList[i].product_tp.indexOf(v));
      //     // 判断点击的内容是否存在请求到的数据中
      //     if (that.msgsList[i].product_tp.indexOf(v) != -1) {
      //       // console.log(that.msgsList[i]);
      //       // console.log(arrs);
      //       // this.msgsList.push(that.msgsList[i]);
      //       // console.log(this.msgsList);
      //       // this.$nextTick(() =>{
      //       //   this.msgsList = that.msgsList[i];
      //       // })
      //       // thats.$nextTick(function(){
      //       //   thats.msgsList.push(that.msgsList[i]);
      //       // })
      //       // 改变页面循环的数组，重新渲染页面
      //       // that.$set(that.msgsList[i].product_tp,k,that.msgsList[i]);
      //       // Vue.set(data,msgsList,that.msgsList[i]);
      //       // this.$set(msgsList,that.msgsList[i]);
      //     } else {
      //       console.log("没有这条数据");
      //     }
      //   });
      // }
      this.$set(this.Sublevel_list[0].Sublevel_item, len, { text: txt });
    },
     // 待解决问题，减少筛选条件时候，数据匹配的不正确
    close:function(e){
      var that = this;
      // this.Sublevel_list[0].Sublevel_item.filter(function(list,index){
      //   console.log(list);
      //   if(list.text === e.currentTarget.innerText){
      //       that.Sublevel_list[0].Sublevel_item.splice(index,index+1);
      //       console.log(list);
      //       console.log(that.Sublevel_list[0].Sublevel_item);
      //       that.Sublevel_list[0].Sublevel_item.forEach(function(v,k){
      //         console.log(v.text);
      //         if(v){
      //           console.log('有数据');
      //         }else{
      //           console.log('没有数据了');
      //         }
      //         that.msgsList = that.msgList.filter( list => {
      //            return list.product_tp.find(a => {
      //               return a === v.text;
      //            })
      //         })
      //       })

      //   }else{
      //     console.log(that.Sublevel_list[0].Sublevel_item);
      //   }
      // })



      // 数据匹配有问题！！！！！！！ 

      this.Sublevel_list[0].Sublevel_item.filter(function(list,index){
        // console.log(list);
        if(list.text === e.currentTarget.innerText){
           that.Sublevel_list[0].Sublevel_item.splice(index,index+1);
            // console.log(list);
            console.log(that.Sublevel_list[0].Sublevel_item);
        }else{
          console.log(that.Sublevel_list[0].Sublevel_item);
        }
      })


      // 如果删除一个剩下的选中的大于0个的时候，让数据跟剩下的选项进行匹配
      // console.log(that.Sublevel_list[0].Sublevel_item.length);
        // 如果筛选条件大于0个的时候执行
      // if(that.Sublevel_list[0].Sublevel_item.length>0){
      //   // 将筛选条件进行循环跟列表中的数据 进行匹配
      //   that.Sublevel_list[0].Sublevel_item.forEach(function(v,k){
      //     // console.log(v.text);
      //     // 将列表进行循环
      //     that.msgsList = that.msgList.filter( list => {
      //       // 将列表中的对象进行循环查找    问题：假如两个条件的时候，只要满足一条就会被返回
      //        return list.product_tp.find(a => {
      //           console.log(v.text);
      //           console.log(a);
      //           // console.log(a === v.text);
      //           // 返回匹配成功的
      //           return a === v.text;
      //        })
      //     })
      //   })
      // }else{
      //   that.msgsList = that.msgList; 
      // }
      

      //   if(that.Sublevel_list[0].Sublevel_item.length>0){
      //   // 将筛选条件进行循环跟列表中的数据 进行匹配
      //   that.Sublevel_list[0].Sublevel_item.forEach(function(v,k){
      //     // console.log(v.text);
      //     // 将列表进行循环
      //     that.msgsList = that.msgList.filter( list => {
      //       // 将列表中的对象进行循环查找    问题：假如两个条件的时候，只要满足一条就会被返回
      //        return list.product_tp.find(a => {
      //           console.log(v.text);
      //           console.log(a);
      //           // console.log(a === v.text);
      //           // 返回匹配成功的
      //           return a === v.text;
      //        })
      //     })
      //   })
      // }else{
      //   that.msgsList = that.msgList; 
      // }

      if(that.Sublevel_list[0].Sublevel_item.length>0){
        // 将筛选条件进行循环跟列表中的数据 进行匹配
        // that.Sublevel_list[0].Sublevel_item.forEach(function(v,k){
        //   // console.log(v.text);
        //   // 将列表进行循环
        //   that.msgsList = that.msgList.filter( list => {
        //     // 将列表中的对象进行循环查找    问题：假如两个条件的时候，只要满足一条就会被返回           
        //       return list.product_tp.every(function(text){
        //           console.log(text.indexOf(v));
        //       })
            
        //      return list.product_tp.find(a => {
        //         console.log(v.text);
        //         console.log(a);
        //         // 返回匹配成功的
        //         return a === v.text;
        //      })
        //   })
        // })
        // 
        // 
        that.msgsList = that.msgList.filter(list =>{
          console.log(list.product_tp);
          // 返回了数据与规则全部匹配的数据
         return that.Sublevel_list[0].Sublevel_item.every(text =>{
            console.log(list.product_tp.indexOf(text.text));
            console.log(text);
            // 返回匹配项的值没有-1的
            return list.product_tp.indexOf(text.text) != -1;
          })
        })

      }else{
        that.msgsList = that.msgList; 
      }

      // console.log(this.Sublevel_list[0].Sublevel_item.indexOf(e.currentTarget.innerText));
      // console.log()
      // Vue.delete()
      // this.msgsList = this.msgList
      // console.log(e.currentTarget.innerText);
      // var txt = e.currentTarget.innerText;
      // var that = this;
      // console.log(that.arr);
      // console.log(this.msgsList);
      // console.log(this.Sublevel_list[0].Sublevel_item);
      // // this.Sublevel_list[0].Sublevel_item = null;
      // var a = this.Sublevel_list[0].Sublevel_item.filter(list =>{
      //   console.log(list);
      //   console.log(list.text);
      //   Object.assign(this.$data, this.$options.data())
      //   // return list.text.find(function(text){
      //   //   return text !== txt;
      //   // })
      //   // console.log(this.Sublevel_list[0].Sublevel_item);
      //   // return list.find(function(s){
      //   //   console.log(s);
      //   // });
      // })
      // console.log(a);
    }

  }
});
