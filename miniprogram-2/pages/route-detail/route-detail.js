// pages/route-detail/route-detail.js
Page({
    data: {
      routeData: null
    },
  
    onLoad(options) {
      // 获取传递的路线数据
      if (options.routeData) {
        const routeData = JSON.parse(decodeURIComponent(options.routeData));
        this.setData({ routeData });
      }
    },
  
    // 返回上一页
    goBack() {
      wx.navigateBack({
        delta: 1
      });
    },
  
    // 开始导航
    startNavigation() {
      wx.showModal({
        title: '导航确认',
        content: `是否开始从 ${getApp().globalData.startPlace || '当前位置'} 到 ${getApp().globalData.endPlace || '目的地'} 的导航？`,
        success: (res) => {
          if (res.confirm) {
            // 实际项目中应调用地图 API
            wx.showToast({
              title: '导航已开始',
              icon: 'success'
            });
          }
        }
      });
    }
  })