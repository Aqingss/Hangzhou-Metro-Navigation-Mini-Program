Page({
    data: {
      startPlace: "", // 出发地
      endPlace: "", // 目的地
      showSearchPanel: false, // 是否显示搜索面板
      searchHistory: ["浙大城市学院", "西湖", "杭州东站"], // 模拟历史记录
      recommendPlaces: ["西湖景区", "武林广场", "杭州大剧院"], // 模拟推荐地点
      focusedInput: "", // 当前聚焦的输入框标识
      currentLocation: null, // 当前位置信息
      favoritePoints: [ // 收藏的点示例数据
        { id: 1, name: "公司", address: "杭州市西湖区XX大厦" },
        { id: 2, name: "家里", address: "杭州市余杭区XX小区" }
      ],
      selectedFavorite: null // 选中的收藏点
    },
    // 返回上一页
    goBackToIndex() {
      wx.navigateBack({
        delta: 1
      });
    },
    // 出发地输入事件
    onStartInput(e) {
      this.setData({ startPlace: e.detail.value || "" });
    },
    // 目的地输入事件
    onEndInput(e) {
      this.setData({ endPlace: e.detail.value || "" });
    },
    // 显示搜索面板（出发地聚焦）
    showStartPanel() {
      this.setData({ 
        showSearchPanel: true,
        focusedInput: "start"
      });
    },
    // 显示搜索面板（目的地聚焦）
    showEndPanel() {
      this.setData({ 
        showSearchPanel: true,
        focusedInput: "end"
      });
    },
    // 隐藏搜索面板
    hideSearchPanel() {
      this.setData({ showSearchPanel: false });
    },
    // 选择我的位置（含权限申请逻辑）
    chooseMyLocation() {
      const that = this;
      // 先申请位置权限
      wx.authorize({
        scope: 'scope.userLocation', 
        success() {
          // 权限通过，获取位置信息
          wx.getLocation({
            type: "wgs84",
            success: (res) => {
              const mockAddress = "浙江省杭州市西湖区余杭塘路866号";
              that.setData({
                currentLocation: {
                  name: "当前位置",
                  address: mockAddress,
                  latitude: res.latitude,
                  longitude: res.longitude
                },
                startPlace: "当前位置",
                selectedFavorite: null 
              });
              that.hideSearchPanel();
            },
            fail: (err) => {
              console.error("获取位置失败:", err);
              wx.showToast({
                title: "无法获取当前位置，请手动输入",
                icon: "none"
              });
            }
          });
        },
        fail(err) {
          console.error("位置权限申请失败:", err);
          wx.showModal({
            title: "权限申请",
            content: "需要获取你的位置信息才能使用「我的位置」功能，请前往设置开启权限",
            success(res) {
              if (res.confirm) {
                wx.openSetting({
                  success(settingRes) {
                    console.log("设置页返回:", settingRes);
                  }
                });
              }
            }
          });
        }
      });
    },
    // 选择收藏的点
    chooseFavorite() {
      const that = this;
      const points = this.data.favoritePoints.map(item => item.name);
      wx.showActionSheet({
        itemList: points,
        success: (res) => {
          const index = res.tapIndex;
          const selected = that.data.favoritePoints[index];
          that.setData({
            selectedFavorite: selected,
            startPlace: selected.name,
            currentLocation: null 
          });
          that.hideSearchPanel();
        },
        fail: (err) => {
          console.error("取消选择收藏点", err);
        }
      });
    },
    // 地图选点
    chooseMapPoint() {
      const that = this;
      wx.chooseLocation({
        success: (res) => {
          console.log("地图选点返回:", res);
          const selectedName = res.name || res.address;
          if (selectedName) {
            if (that.data.startPlace === "" || that.data.focusedInput === "start") {
              that.setData({ startPlace: selectedName });
            } else {
              that.setData({ endPlace: selectedName });
            }
            that.hideSearchPanel();
          } else {
            wx.showToast({
              title: "未获取到位置名称",
              icon: "none"
            });
          }
        },
        fail: (err) => {
          console.error("地图选点失败:", err);
        }
      });
    },
    // 选择历史搜索地点
    chooseHistoryPlace(e) {
      const place = e.currentTarget.dataset.item || "";
      if (place) {
        if (this.data.startPlace === "" || this.data.focusedInput === "start") {
          this.setData({ startPlace: place });
        } else {
          this.setData({ endPlace: place });
        }
        this.hideSearchPanel();
      }
    },
    // 选择推荐地点
    chooseRecommendPlace(e) {
      const place = e.currentTarget.dataset.item || "";
      if (place) {
        if (this.data.startPlace === "" || this.data.focusedInput === "start") {
          this.setData({ startPlace: place });
        } else {
          this.setData({ endPlace: place });
        }
        this.hideSearchPanel();
      }
    },
    // 清空历史记录
    clearHistory() {
      wx.showModal({
        title: "确认清空",
        content: "是否清空所有历史搜索记录？",
        success: (res) => {
          if (res.confirm) {
            this.setData({ searchHistory: [] });
            wx.setStorageSync("searchHistory", []);
          }
        }
      });
    },
    // 跳转选择路线
    goChooseRoute() {
      if (!this.data.startPlace || !this.data.endPlace) {
        wx.showToast({ title: "请填写完整地址", icon: "none" });
        return;
      }
      // 保存到历史记录
      this.saveToHistory(this.data.startPlace);
      this.saveToHistory(this.data.endPlace);
      // 跳转线路选择页
      wx.navigateTo({
        url: `/pages/chooseroute/chooseroute?start=${encodeURIComponent(this.data.startPlace)}&end=${encodeURIComponent(this.data.endPlace)}`
      });
    },
    // 保存到历史记录
    saveToHistory(place) {
      if (!place) return;
      let history = this.data.searchHistory || [];
      // 移除重复项
      const index = history.indexOf(place);
      if (index !== -1) {
        history.splice(index, 1);
      }
      // 添加到最前面
      history.unshift(place);
      // 限制长度
      if (history.length > 10) {
        history = history.slice(0, 10);
      }
      // 更新数据和本地存储
      this.setData({ searchHistory: history });
      wx.setStorageSync("searchHistory", history);
    },
    // 页面加载时读取历史记录
    onLoad() {
      const history = wx.getStorageSync("searchHistory");
      if (history && Array.isArray(history)) {
        this.setData({ searchHistory: history });
      }
    }
  })