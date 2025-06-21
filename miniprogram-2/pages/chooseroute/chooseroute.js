Page({
    data: {
      // 起点终点（从上个页面传递）
      startPlace: "浙大城市学院",
      endPlace: "西湖",
      
      // 路线类型标签
      routeTypes: ["推荐路线", "地铁优先", "步行少", "换乘少"],
      activeTab: 0, // 当前选中的标签
      
      // 路线策略对应后端参数
      strategyMap: {
        0: "recommend", // 推荐路线
        1: "subway",    // 地铁优先
        2: "less_walk", // 步行少
        3: "less_transfer" // 换乘少
      },
      
      currentRoutes: [], // 当前显示的路线
      isLoading: false,  // 加载状态
      errorMsg: ""       // 错误信息
    },
  
    onLoad(options) {
      // 从上个页面接收参数
      if (options.start) {
        this.setData({ 
          startPlace: decodeURIComponent(options.start) 
        });
      }
      if (options.end) {
        this.setData({ 
          endPlace: decodeURIComponent(options.end) 
        });
      }
      
      // 初始加载推荐路线
      this.fetchRoutes(0);
    },
  
    // 切换路线类型标签
    switchTab(e) {
      const index = e.currentTarget.dataset.index;
      this.setData({ activeTab: index });
      this.fetchRoutes(index);
    },
  
    // 请求路线数据
    fetchRoutes(strategyIndex) {
      const that = this;
      const strategy = this.data.strategyMap[strategyIndex];
      
      this.setData({ isLoading: true, errorMsg: "" });
      
      // 实际项目中替换为真实API地址
      wx.request({
        url: 'https://your-api-domain.com/route', // 替换为实际接口地址
        method: 'GET',
        data: {
          origin: this.data.startPlace,
          destination: this.data.endPlace,
          strategy: strategy
        },
        success(res) {
          if (res.statusCode === 200 && res.data.code === 0) {
            // 成功获取数据，处理路线信息
            const processedRoutes = that.processRouteData(res.data.data);
            that.setData({
              currentRoutes: processedRoutes
            });
          } else {
            that.setData({
              errorMsg: res.data.message || '获取路线失败'
            });
          }
        },
        fail(err) {
          console.error('API请求失败:', err);
          that.setData({
            errorMsg: '网络请求失败，请稍后重试'
          });
        },
        complete() {
          that.setData({ isLoading: false });
        }
      });
    },
  
    // 处理API返回的路线数据，转换为前端需要的格式
    processRouteData(apiData) {
      return apiData.map(route => {
        // 解析交通方式
        const transports = this.parseTransports(route.segments);
        
        // 计算总费用
        const totalCost = this.calculateCost(route.segments);
        
        // 构建站点列表（针对地铁段）
        const stations = this.buildStationList(route.segments);
        
        return {
          time: `${route.duration} 分钟`,
          distance: (route.distance / 1000).toFixed(1), // 转换为公里
          desc: this.generateRouteDescription(route.segments),
          type: this.getMainTransportType(route.segments),
          typeClass: this.getTransportTypeClass(route.segments),
          cost: totalCost,
          transports: transports,
          stations: stations
        };
      });
    },
  
    // 解析交通方式
    parseTransports(segments) {
      const icons = {
        "SUBWAY": "/images/地铁.png",
        "BUS": "/images/公交.png",
        "WALK": "/images/步行.png",
        "BIKE": "/images/骑行.png",
        "CAR": "/images/驾车.png"
      };
      
      return segments.map(seg => ({
        icon: icons[seg.type] || "/images/空状态.png",
        name: this.getTransportName(seg.type)
      }));
    },
  
    // 获取交通方式名称
    getTransportName(type) {
      const names = {
        "SUBWAY": "地铁",
        "BUS": "公交",
        "WALK": "步行",
        "BIKE": "骑行",
        "CAR": "驾车"
      };
      return names[type] || type;
    },
  
    // 计算总费用
    calculateCost(segments) {
      return segments.reduce((total, seg) => {
        return total + (seg.cost || 0);
      }, 0);
    },
  
    // 构建站点列表
    buildStationList(segments) {
      let stations = [];
      segments.forEach(seg => {
        if (seg.type === "SUBWAY" && seg.stations) {
          stations = stations.concat(seg.stations);
        }
      });
      return stations;
    },
  
    // 生成路线描述
    generateRouteDescription(segments) {
      let description = "";
      segments.forEach((seg, index) => {
        if (seg.type === "WALK") {
          description += `步行 ${seg.distance} 米`;
        } else if (seg.type === "SUBWAY") {
          description += `乘坐${seg.lineName}（${seg.stationCount}站）`;
        } else if (seg.type === "BUS") {
          description += `公交${seg.lineName}（${seg.stationCount}站）`;
        } else if (seg.type === "BIKE") {
          description += `骑行 ${seg.distance} 米`;
        }
        
        if (index < segments.length - 1) {
          description += "，";
        }
      });
      return description;
    },
  
    // 获取主要交通方式类型
    getMainTransportType(segments) {
      // 优先判断地铁
      const subwaySeg = segments.find(seg => seg.type === "SUBWAY");
      if (subwaySeg) return "地铁";
      
      // 其次公交
      const busSeg = segments.find(seg => seg.type === "BUS");
      if (busSeg) return "公交";
      
      // 其次骑行
      const bikeSeg = segments.find(seg => seg.type === "BIKE");
      if (bikeSeg) return "骑行";
      
      // 其他方式
      return this.getTransportName(segments[0].type);
    },
  
    // 获取交通方式类型样式
    getTransportTypeClass(segments) {
      const types = {
        "SUBWAY": "subway",
        "BUS": "bus",
        "WALK": "walk",
        "BIKE": "bike",
        "CAR": "drive"
      };
      
      const mainType = segments.find(seg => types[seg.type])?.type || "SUBWAY";
      return types[mainType];
    },
  
    // 选择路线并跳转到详情页
    selectRoute(e) {
      const index = e.currentTarget.dataset.index;
      const selectedRoute = this.data.currentRoutes[index];
      
      // 将路线数据转为 JSON 字符串
      const routeData = JSON.stringify(selectedRoute);
      
      // 跳转到路线详情页
      wx.navigateTo({
        url: `/pages/route-detail/route-detail?routeData=${encodeURIComponent(routeData)}`
      });
    },
  
    // 返回上一页
    goBack() {
      wx.navigateBack({
        delta: 1
      });
    },
  
    // 开始导航
    startNavigation() {
      // 这里可以调用地图导航 API
      wx.showModal({
        title: '导航确认',
        content: `是否开始从 ${this.data.startPlace} 到 ${this.data.endPlace} 的导航？`,
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