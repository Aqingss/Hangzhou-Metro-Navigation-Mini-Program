Page({
    handleLogin() {
        if (this.data.isLoggedIn) {
          // 已登录，跳转到个人中心详情页
          wx.navigateTo({
            url: '/pages/personalCenter/personalCenter'
          });
        } else {
          // 未登录，处理登录流程
          {
            // 未登录，跳转到登录页
            wx.navigateTo({
              url: '/pages/login/login', // 确保这是正确的登录页路径
              success(res) {
                console.log("跳转至登录页成功", res);
              },
              fail(err) {
                console.error("跳转至登录页失败", err);
              }
            });
          }
        }
      }
});