Page({
    data: {
        currentIndex: 0,
        images: [
            '/images/轮播图1.jpg',
            '/images/轮播图2.jpg',
            '/images/轮播图3.jpg'
        ]
    },
    swiperChange: function(e) {
      this.setData({
        currentIndex: e.detail.current
      });
    },

    swiperChange: function(e) {
        this.setData({
            currentIndex: e.detail.current
        });
    },
      
    // 导航点击事件
    navigateToStation: function() {
        wx.navigateTo({
            url: '/pages/site-information/site-information'
        });
    },
      
    navigateToRoute: function() {
        wx.navigateTo({
            url: '/pages/route-inquiring/route-inquiring'
        });
    },
      
    navigateToRecord: function() {
        wx.navigateTo({
            url: '/pages/record/record'
        });
    },

    // 新增互动模块点击事件
    goToStory: function() {
        wx.navigateTo({
            url: '/pages/story/story'
        });
    },
  
    goToRecord: function() {
        wx.navigateTo({
            url: '/pages/record/record'
        });
    },

    onLoad: function() {
        // 可以在这里获取数据
    }
});