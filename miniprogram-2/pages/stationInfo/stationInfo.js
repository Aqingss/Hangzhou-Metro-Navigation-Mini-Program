// pages/stationInfo/stationInfo.js
const { stationIndex } = require('../../data/details.js');
const { entrancesData } = require('../../data/entrance.js'); 
const { analyzeStationInfo } = require('../../services/analysisService');

// 简易Markdown解析函数
function parseMarkdown(markdown) {
  const nodes = [];
  const lines = markdown.split('\n');
  
  lines.forEach(line => {
    if (line.startsWith('###')) {
      nodes.push({
        name: 'h3',
        attrs: { class: 'heading' },
        children: [{ type: 'text', text: line.replace('###', '').trim() }]
      });
    } else if (line.startsWith('**') && line.endsWith('**')) {
      nodes.push({
        name: 'strong',
        children: [{ type: 'text', text: line.replace(/\*\*/g, '').trim() }]
      });
    } else {
      nodes.push({
        name: 'div',
        children: [{ type: 'text', text: line.trim() }]
      });
    }
  });
  
  return nodes;
}

// 替代对象展开运算符的工具函数
function cloneObject(obj) {
  var newObj = {};
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = obj[key];
    }
  }
  return newObj;
}

Page({
  data: {
    stationName: '',
    currentTab: 'entrances',
    schedules: [],
    elevators: [],
    toilets: [],
    nextTrains: [],
    entrances: [],
    showAnalysis: false,
    isAnalyzing: false,
    stationAnalysis: [],
    currentTime: '',
    timer: null,
    stationDirections: [],
    baseTimes: {}, // 记录每个方向的基准时间和剩余时间
    lastMinute: null // 记录上次的分钟数
  },

  onLoad: function(options) {
    var stationName = decodeURIComponent(options.stationName);
    var stationData = stationIndex[stationName];
    
    if (!stationData) {
      wx.showToast({
        title: '站点信息不存在',
        icon: 'none'
      });
      setTimeout(function() {
        wx.navigateBack();
      }, 1500);
      return;
    }
    
    // 处理数据
    var schedules = stationData.lines.map(function(line) {
      return {
        line: line.line_number,
        directions: line.directions.map(function(dir) {
          return {
            direction: dir.direction,
            startTime: dir.first_train,
            endTime: dir.last_train
          };
        })
      };
    });
    
    var elevators = stationData.elevators ? stationData.elevators.map(function(elev) {
      return {
        name: elev.entrances.join(', '),
        location: elev.location
      };
    }) : [];
    
    var toilets = [];
    if (stationData.toilets) {
      stationData.toilets.forEach(function(toilet) {
        toilets.push({
          name: toilet.type.join('、'),
          location: toilet.location
        });
      });
    }

    // 从 entrancesData 中获取出入口信息
    var stationEntrances = entrancesData[stationName];
    var entrances = stationEntrances ? Object.keys(stationEntrances).map(function(key) {
      return {
        name: key,
        location: stationEntrances[key].join(', ')
      };
    }) : [];
    
    // 提取所有方向信息
    var directions = [];
    stationData.lines.forEach(function(line) {
      line.directions.forEach(function(dir) {
        directions.push({
          direction: dir.direction,
          firstTrain: dir.first_train,
          lastTrain: dir.last_train
        });
      });
    });
    
    this.setData({
      stationName: stationName,
      schedules: schedules,
      elevators: elevators,
      toilets: toilets,
      entrances: entrances,
      stationDirections: directions
    });
    
    // 初始化模拟数据
    this.startSimulation();
  },

  onUnload: function() {
    // 清除定时器
    if (this.data.timer) {
      clearInterval(this.data.timer);
    }
  },

  startSimulation: function() {
    var baseTimes = {};
    var now = new Date();
    
    // 初始化每个方向的剩余时间和基准时间
    var self = this;
    this.data.stationDirections.forEach(function(dir) {
      var initialTime = Math.floor(Math.random() * 11) + 1;
      baseTimes[dir.direction] = {
        remainTime: initialTime,
        baseTime: new Date(now.getTime())
      };
    });
    
    this.setData({
      baseTimes: baseTimes,
      lastMinute: now.getMinutes()
    });
    
    // 初始化显示
    this.updateCurrentTimeDisplay(now);
    this.updateTrainTimes(now);
    
    // 启动定时器，每秒检查一次时间变化
    this.setData({
      timer: setInterval(function() {
        self.checkTimeUpdate();
      }, 1000)
    });
  },

  checkTimeUpdate: function() {
    var now = new Date();
    var currentMinute = now.getMinutes();
    
    this.updateCurrentTimeDisplay(now);
    
    // 如果分钟数发生变化，则更新时间
    if (currentMinute !== this.data.lastMinute) {
      this.updateTrainTimes(now);
      this.setData({
        lastMinute: currentMinute
      });
    }
  },

  updateCurrentTimeDisplay: function(now) {
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var formattedTime = '下午' + (hours > 12 ? hours - 12 : hours) + ':' + (minutes < 10 ? '0' + minutes : minutes);
    
    this.setData({
      currentTime: formattedTime
    });
  },

  updateTrainTimes: function(now) {
    var baseTimes = cloneObject(this.data.baseTimes);
    var hasArrivingTrain = false;
    var nextTrains = [];
    
    // 更新每个方向的剩余时间
    for (var i = 0; i < this.data.stationDirections.length; i++) {
      var dir = this.data.stationDirections[i].direction;
      var dirData = baseTimes[dir];
      var elapsedMinutes = Math.floor((now - dirData.baseTime) / 60000);
      var remainTime = dirData.remainTime - elapsedMinutes;
      
      // 处理时间逻辑
      if (remainTime <= 0) {
        // 正在进站或需要重置
        if (remainTime < 0) {
          dirData.remainTime = Math.floor(Math.random() * 6) + 3;
          dirData.baseTime = new Date(now.getTime());
          remainTime = dirData.remainTime;
        } else {
          // 正在进站状态
          hasArrivingTrain = true;
          remainTime = 0;
        }
      }
      
      var displayTime;
      if (remainTime === 0) {
        displayTime = '正在进站';
      } else if (remainTime === 1) {
        displayTime = '1分钟后';
      } else {
        displayTime = remainTime + '分钟后';
      }
      
      nextTrains.push({
        direction: dir,
        remainTime: displayTime,
        status: remainTime === 0 ? '正在进站' : '即将到站',
        firstTrain: this.data.stationDirections[i].firstTrain,
        lastTrain: this.data.stationDirections[i].lastTrain
      });
    }
    
    this.setData({
      nextTrains: nextTrains,
      baseTimes: baseTimes
    });
    
    // 如果有正在进站的列车，1分钟后自动更新
    if (hasArrivingTrain) {
      var self = this;
      setTimeout(function() {
        self.updateTrainTimes(new Date());
      }, 60000);
    }
  },

  switchTab: function(e) {
    this.setData({
      currentTab: e.currentTarget.dataset.tab
    });
  },

  getStationAnalysis: function() {
    if (this.data.isAnalyzing) return;
    
    this.setData({ isAnalyzing: true });
    
    var self = this;
    analyzeStationInfo(this.data.stationName)
      .then(function(result) {
        self.setData({
          stationAnalysis: parseMarkdown(result),
          isAnalyzing: false,
          showAnalysis: true
        });
      })
      .catch(function(err) {
        console.error('获取分析失败:', err);
        wx.showToast({
          title: '获取分析失败',
          icon: 'none'
        });
        self.setData({ isAnalyzing: false });
      });
  },

  toggleAnalysis: function() {
    if (!this.data.stationAnalysis.length && !this.data.isAnalyzing) {
      this.getStationAnalysis();
    } else {
      this.setData({
        showAnalysis: !this.data.showAnalysis
      });
    }
  }
});