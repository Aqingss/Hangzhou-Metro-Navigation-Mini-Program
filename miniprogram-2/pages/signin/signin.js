Page({
    data: {
      phone: '',           // 手机号
      code: '',            // 短信验证码
      password: '',        // 密码
      isAgree: false,      // 是否同意协议（可拓展）
      sendDisabled: false, // 是否禁用发送验证码按钮
      countdown: 60        // 倒计时时间
    },
  
    onLoad() {
      console.log('注册页面加载');
    },
  
    // 返回上一页
    goBack() {
      wx.navigateBack();
    },
  
    // 输入手机号
    handlePhoneInput(e) {
      this.setData({
        phone: e.detail.value
      });
    },
  
    // 输入验证码
    handleCodeInput(e) {
      this.setData({
        code: e.detail.value
      });
    },
  
    // 输入密码
    handlePasswordInput(e) {
      this.setData({
        password: e.detail.value
      });
    },
  
    // 发送验证码
    sendVerificationCode() {
      const { phone, sendDisabled } = this.data;
  
      if (sendDisabled) return; // 如果正在倒计时，阻止重复点击
  
      // 校验手机号格式
      const phoneReg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
      if (!phoneReg.test(phone)) {
        wx.showToast({
          title: '请输入正确的手机号',
          icon: 'none'
        });
        return;
      }
  
      // 模拟发送验证码请求
      wx.showToast({
        title: '验证码已发送',
        icon: 'success'
      });
  
      this.setData({
        sendDisabled: true
      });
  
      let timer = setInterval(() => {
        const { countdown } = this.data;
        if (countdown <= 1) {
          clearInterval(timer);
          this.setData({
            sendDisabled: false,
            countdown: 60
          });
        } else {
          this.setData({
            countdown: countdown - 1
          });
        }
      }, 1000);
    },
  
    // 处理注册按钮点击
    handleRegister() {
      const { phone, code, password } = this.data;
  
      // 校验信息是否完整
      if (!phone || !code || !password) {
        wx.showToast({
          title: '请填写所有信息',
          icon: 'none'
        });
        return;
      }
  
      // 校验手机号格式
      const phoneReg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
      if (!phoneReg.test(phone)) {
        wx.showToast({
          title: '请输入正确的手机号',
          icon: 'none'
        });
        return;
      }
  
      // 校验密码格式（最少8位，数字+字母）
      const passwordReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
      if (!passwordReg.test(password)) {
        wx.showToast({
          title: '密码需为8位以上，包含数字和字母',
          icon: 'none'
        });
        return;
      }
  
      // 模拟提交注册信息
      wx.showLoading({
        title: '注册中...'
      });
  
      setTimeout(() => {
        wx.hideLoading();
  
        wx.showToast({
          title: '注册成功',
          icon: 'success'
        });
  
        // 注册成功后跳转到登录页
        setTimeout(() => {
          wx.redirectTo({
            url: '/pages/login/login'
          });
        }, 1000);
      }, 1500);
    },
  
    // 打开协议详情页
    
  });