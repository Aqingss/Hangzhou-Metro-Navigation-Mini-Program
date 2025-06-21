// pages/login/login.js
Page({
    data: {
      phone: '',
      password: ''
    },
  
    // 返回上一页
    goBack() {
      wx.navigateBack();
    },
  
    // 跳转注册页
    goToRegister() {
        wx.navigateTo({
          url: '/pages/signin/signin', // 注册页面路径
          success: () => {
            console.log('跳转到注册页面成功');
          },
          fail: (err) => {
            console.error('跳转到注册页面失败:', err);
          }
        });
    },
  
    // 手机号输入监听
    handlePhoneInput(e) {
      this.setData({
        phone: e.detail.value
      });
    },
  
    // 密码输入监听
    handlePasswordInput(e) {
      this.setData({
        password: e.detail.value
      });
    },
  
    // 跳转忘记密码页
    goToForgetPassword() {
        wx.navigateTo({
          url: '/pages/forget/forget', // 忘记密码页面路径
          success: () => {
            console.log('跳转到忘记密码页面成功');
          },
          fail: (err) => {
            console.error('跳转到忘记密码页面失败:', err);
            wx.showToast({
              title: '跳转失败，请重试',
              icon: 'none'
            });
          }
        });
      },
  
    // 登录逻辑（示例，需对接真实接口）
    handleLogin() {
        const { phone, password } = this.data;

        // 简单校验手机号和密码是否为空
        if (!phone || !password) {
          wx.showToast({
            title: '请输入完整信息',
            icon: 'none'
          });
          return;
        }
    
        // 正则验证手机号格式（示例：11位数字）
        const phoneReg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
        if (!phoneReg.test(phone)) {
            wx.showToast({
            title: '请输入正确的手机号',
            icon: 'none'
        });
        return;
  }
  
      // 模拟接口请求（实际替换为真实登录接口）
      wx.showLoading({ title: '登录中...' });
      setTimeout(() => {
        wx.hideLoading();
        wx.showToast({
          title: '登录成功',
          icon: 'success'
        });
        // 登录成功后逻辑：存储用户信息、跳转首页等
        wx.setStorageSync('userInfo', { phone });
        wx.navigateBack();
      }, 1500);
    },
  
    // 打开协议详情（可扩展为跳转协议页）
    openAgreement() {
      wx.showModal({
        title: '协议详情',
        content: '这里展示协议具体内容...',
        showCancel: false
      });
    }
  });