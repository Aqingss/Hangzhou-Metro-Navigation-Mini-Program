
Page({
  data: {
    currentIndex: 0,
    activeLine: 0,  // 当前选中的线路索引
    images: [
      '/assets/banner1.jpg',
      '/assets/banner2.jpg',
      '/assets/banner3.jpg'
    ],
    subwayData: [
      {
        line: '1号线',
        stations: [
          { name: '湘湖', tags: [1] },
          { name: '滨康路', tags: [1, 5] },
          { name: '西兴', tags: [1] },
          { name: '滨和路', tags: [1] },
          { name: '江陵路', tags: [1,6,'6a'] },
          { name: '近江', tags: [1, 4] },
          { name: '婺江路', tags: [1, 4] },
          { name: '城站', tags: [1, 5] },
          { name: '定安路', tags: [1, 5] },
          { name: '龙翔桥', tags: [1] },
          { name: '凤起路', tags: [1, 2] },
          { name: '武林广场', tags: [1, 3,'3a'] },
          { name: '西湖文化广场', tags: [1, 3,'3a',19] },
          { name: '打铁关', tags: [1, 5] },
          { name: '闸弄口', tags: [1, 5] },
          { name: '火车东站', tags: [1] },
          { name: '彭埠', tags: [1, 4] },
          { name: '七堡', tags: [1] },
          { name: '九和路', tags: [1] },
          { name: '九堡', tags: [1] },
          { name: '客运中心', tags: [1, 9] },
          { name: '下沙西', tags: [1] },
          { name: '金沙湖', tags: [1] },
          { name: '高沙路', tags: [1] },
          { name: '文泽路', tags: [1] },
          { name: '文海南路', tags: [1, 8] },
          { name: '云水', tags: [1] },
          { name: '下沙江滨', tags: [1] },
          { name: '杭州大会展中心', tags: [1] },
          { name: '港城大道', tags: [1] },
          { name: '南阳', tags: [1] },
          { name: '向阳路', tags: [1] },
          { name: '萧山国际机场', tags: [1, 7] }
        ]
      },
      {
        line: '2号线',
        stations: [
          { name: '朝阳', tags: [2] },
          { name: '曹家桥', tags: [2] },
          { name: '潘水', tags: [2] },
          { name: '人民路', tags: [2] },
          { name: '杭发厂', tags: [2] },
          { name: '人民广场', tags: [2, 5] },
          { name: '建设一路', tags: [2] },
          { name: '建设三路', tags: [2, 7] },
          { name: '振宁路', tags: [2] },
          { name: '飞虹路', tags: [2] },
          { name: '盈丰路', tags: [2] },
          { name: '钱江世纪城', tags: [2, 6,'6a'] },
          { name: '钱江路', tags: [2, 4, 9] },
          { name: '庆春广场', tags: [2] },
          { name: '庆菱路', tags: [2] },
          { name: '建国北路', tags: [2, 5] },
          { name: '中河北路', tags: [2] },
          { name: '凤起路', tags: [1, 2] },
          { name: '武林门', tags: [2, 3,'3a'] },
          { name: '沈塘桥', tags: [2, 19] },
          { name: '下宁桥', tags: [2] },
          { name: '学院路', tags: [2, 10] },
          { name: '古翠路', tags: [2] },
          { name: '丰潭路', tags: [2] },
          { name: '文新', tags: [2] },
          { name: '三坝', tags: [2, 5] },
          { name: '虾龙圩', tags: [2] },
          { name: '三墩', tags: [2] },
          { name: '墩祥街', tags: [2] },
          { name: '金家渡', tags: [2, 4] },
          { name: '白洋', tags: [2] },
          { name: '杜甫村', tags: [2] },
          { name: '良渚', tags: [2] }
        ]
      },
      {
        line: '3号线',
        stations: [
          { name: '吴山前村', tags: [3] },
          { name: '火车西站', tags: [3, 19] },
          { name: '龙舟北路', tags: [3] },
          { name: '文一西路', tags: [3] },
          { name: '绿汀路', tags: [3, 5, 16] },
          { name: '全丰', tags: [3] },
          { name: '高教路', tags: [3] },
          { name: '联胜路', tags: [3] },
          { name: '洪园', tags: [3] },
          { name: '西溪湿地南', tags: [3,'3a'] },
          { name: '花坞', tags: [3, '3a'] },
          { name: '东岳', tags: [3, '3a'] },
          { name: '古墩路', tags: [3, '3a'] },
          { name: '古荡新村', tags: [3, '3a'] },
          { name: '古荡', tags: [3, '3a'] },
          { name: '黄龙体育中心', tags: [3, '3a', 10] },
          { name: '黄龙洞', tags: [3, '3a'] },
          { name: '武林门', tags: [3, '3a', 2] },
          { name: '武林广场', tags: [3, '3a', 1] },
          { name: '西湖文化广场', tags: [3, '3a', 1] },
          { name: '潮王路', tags: [3, '3a'] },
          { name: '香积寺', tags: [3, '3a'] },
          { name: '大关', tags: [3, '3a'] },
          { name: '善贤', tags: [3, '3a', 5] },
          { name: '新天地街', tags: [3, '3a', 4] },
          { name: '汽轮广场', tags: [3, '3a'] },
          { name: '华丰路', tags: [3, '3a'] },
          { name: '同协路', tags: [3, '3a'] },
          { name: '桃花湖公园', tags: [3, '3a'] },
          { name: '丁桥', tags: [3, '3a'] },
          { name: '华鹤街', tags: [3, '3a'] },
          { name: '黄鹤山', tags: [3, '3a'] },
          { name: '星桥', tags: [3, '3a'] }
        ]
      },
      {
        line: '3号线往石马',
        stations: [
          { name: '石马', tags: ['3a'] },
          { name: '小和山', tags: ['3a'] },
          { name: '屏峰', tags: ['3a'] },
          { name: '留下', tags: ['3a'] },
          { name: '西溪湿地南', tags: ['3a', 3] },
          { name: '花坞', tags: ['3a', 3] },
          { name: '东岳', tags: ['3a', 3] },
          { name: '古墩路', tags: ['3a', 3] },
          { name: '古荡新村', tags: ['3a', 3] },
          { name: '古荡', tags: ['3a', 3] },
          { name: '黄龙体育中心', tags: ['3a', 3] },
          { name: '黄龙洞', tags: ['3a', 3] },
          { name: '武林门', tags: ['3a', 2, 3] },
          { name: '武林广场', tags: ['3a', 3, 1] },
          { name: '西湖文化广场', tags: ['3a', 1, 3] },
          { name: '潮王路', tags: ['3a', 3] },
          { name: '香积寺', tags: ['3a', 3] },
          { name: '大关', tags: ['3a', 3] },
          { name: '善贤', tags: ['3a', 3, 5] },
          { name: '新天地街', tags: ['3a', 3, 4] },
          { name: '汽轮广场', tags: ['3a', 3] },
          { name: '华丰路', tags: ['3a', 3] },
          { name: '同协路', tags: ['3a', 3] },
          { name: '桃花湖公园', tags: ['3a', 3] },
          { name: '丁桥', tags: ['3a', 3] },
          { name: '华鹤街', tags: ['3a', 3] },
          { name: '黄鹤山', tags: ['3a', 3] },
          { name: '星桥', tags: ['3a', 3] }
        ]
      },
      {
        line: '4号线',
        stations: [
          {name: '浦沿', tags: [4] },
          { name: '杨家墩', tags: [4] },
          { name: '中医药大学', tags: [4, 6, '6a'] },
          { name: '联庄', tags: [4] },
          { name: '水澄桥', tags: [4] },
          { name: '复兴路', tags: [4] },
          { name: '南星桥', tags: [4, 5] },
          { name: '甬江路', tags: [4] },
          { name: '近江', tags: [4, 1] },
          { name: '城星路', tags: [4] },
          { name: '市民中心', tags: [4, 7] },
          { name: '江锦路', tags: [4] },
          { name: '钱江路', tags: [4, 2, 9] },
          { name: '景芳', tags: [4] },
          { name: '新塘', tags: [4] },
          { name: '新风', tags: [4] },
          { name: '火车东站', tags: [4, 1] },
          { name: '彭埠', tags: [4, 1] },
          { name: '明石路', tags: [4] },
          { name: '黎明', tags: [4] },
          { name: '笕桥老街', tags: [4] },
          { name: '华中南路', tags: [4] },
          { name: '新天地街', tags: [4, 3, '3a'] },
          { name: '皋亭坝', tags: [4] },
          { name: '桃源街', tags: [4] },
          { name: '吴家角港', tags: [4] },
          { name: '平安桥', tags: [4] },
          { name: '储运路', tags: [4] },
          { name: '杭行路', tags: [4, 10] },
          { name: '好运街', tags: [4] },
          { name: '金家渡', tags: [4, 2] },
          { name: '池华街', tags: [4] }
        ]
      },
      {
        line: '5号线',
        stations: [
            { name: '金星', tags: [5] },
            { name: '绿汀路', tags: [5, 16, 3] },
            { name: '葛巷', tags: [5] },
            { name: '创景路', tags: [5, 19] },
            { name: '良睦路', tags: [5] },
            { name: '杭师大仓前', tags: [5] },
            { name: '永福站', tags: [5] },
            { name: '五常', tags: [5] },
            { name: '蒋村', tags: [5] },
            { name: '浙大紫金港', tags: [5] },
            { name: '三坝', tags: [5, 2] },
            { name: '萍水街', tags: [5] },
            { name: '和睦', tags: [5, 10] },
            { name: '大运河', tags: [5] },
            { name: '拱宸桥东', tags: [5] },
            { name: '善贤', tags: [5, 3, '3a'] },
            { name: '西文街', tags: [5] },
            { name: '东新园', tags: [5] },
            { name: '杭氧', tags: [5] },
            { name: '打铁关', tags: [5, 1] },
            { name: '宝善桥', tags: [5] },
            { name: '建国北路', tags: [5, 2] },
            { name: '万安桥', tags: [5] },
            { name: '城站', tags: [5, 1] },
            { name: '江城路', tags: [5, 7] },
            { name: '候潮门', tags: [5] },
            { name: '南星桥', tags: [5, 4] },
            { name: '长河', tags: [5, 6, '6a'] },
            { name: '聚才路', tags: [5] },
            { name: '江晖路', tags: [5] },
            { name: '滨康路', tags: [5, 1] },
            { name: '博奥路', tags: [5] },
            { name: '金鸡路', tags: [5] },
            { name: '人民广场', tags: [5, 2] },
            { name: '育才北路', tags: [5] },
            { name: '通惠中路', tags: [5] },
            { name: '火车南站', tags: [5] },
            { name: '双桥', tags: [5] },
            { name: '姑娘桥', tags: [5] }
        ]
      },
      {
        line: '6号线',
        stations: [
          { name: '桂花西路', tags: [6] },
          { name: '公望街', tags: [6] },
          { name: '阳坡湖', tags: [6] },
          { name: '高桥', tags: [6] },
          { name: '富阳客运中心', tags: [6] },
          { name: '受降', tags: [6] },
          { name: '虎啸杏', tags: [6] },
          { name: '银湖', tags: [6] },
          { name: '野生动物园东', tags: [6] },
          { name: '中村', tags: [6] },
          { name: '音乐学院', tags: [6] },
          { name: '美院象山', tags: [6, '6a'] },
          { name: '枫桦西路', tags: [6, '6a'] },
          { name: '之江文化中心', tags: [6, '6a'] },
          { name: '西浦路', tags: [6, '6a'] },
          { name: '中医药大学', tags: [6, 4, '6a'] },
          { name: '伟业路', tags: [6, '6a'] },
          { name: '诚业路', tags: [6, '6a'] },
          { name: '建业路', tags: [6, '6a'] },
          { name: '长河', tags: [6, '6a', 5] },
          { name: '江汉路', tags: [6, '6a'] },
          { name: '江陵路', tags: [6, 1, '6a'] },
          { name: '星民', tags: [6, '6a'] },
          { name: '奥体中心', tags: [6, '6a', 7] },
          { name: '博览中心', tags: [6, '6a'] },
          { name: '钱江世纪城', tags: [6, '6a', 2] },
          { name: '三堡', tags: [6, '6a', 9] },
          { name: '昙花庵路', tags: [6, '6a'] },
          { name: '元宝塘', tags: [6, '6a'] },
          { name: '火车东站(东广场)', tags: [6, '6a', 19] },
          { name: '枸桔弄', tags: [6, '6a'] }
        ]
      },
      {
        line: '6号线往双浦',
        stations: [
          { name: '双浦', tags: ['6a'] },
          { name: '科海路', tags: ['6a'] },
          { name: '霞鸣街', tags: ['6a'] },
          { name: '美院象山', tags: [6, '6a'] },
          { name: '枫桦西路', tags: [6, '6a'] },
          { name: '之江文化中心', tags: [6, '6a'] },
          { name: '西浦路', tags: [6, '6a'] },
          { name: '中医药大学', tags: [6, 4, '6a'] },
          { name: '伟业路', tags: [6, '6a'] },
          { name: '诚业路', tags: [6, '6a'] },
          { name: '建业路', tags: [6, '6a'] },
          { name: '长河', tags: [6, '6a', 5] },
          { name: '江汉路', tags: [6, '6a'] },
          { name: '江陵路', tags: [6, 1, '6a'] },
          { name: '星民', tags: [6, '6a'] },
          { name: '奥体中心', tags: [6, '6a', 7] },
          { name: '博览中心', tags: [6, '6a'] },
          { name: '钱江世纪城', tags: [6, '6a', 2] },
          { name: '三堡', tags: [6, '6a', 9] },
          { name: '昙花庵路', tags: [6, '6a'] },
          { name: '元宝塘', tags: [6, '6a'] },
          { name: '火车东站(东广场)', tags: [6, '6a', 19] },
          { name: '枸桔弄', tags: [6, '6a'] }
        ]
      },
      {
        line: '7号线',
        stations: [
          { name: '吴山广场', tags: [7] },
          { name: '江城路', tags: [7, 5] },
          { name: '莫邪塘', tags: [7] },
          { name: '观音塘', tags: [7, 9] },
          { name: '市民中心', tags: [7, 4] },
          { name: '奥体中心', tags: [7, 6, '6a'] },
          { name: '兴议', tags: [7] },
          { name: '明星路', tags: [7] },
          { name: '建设三路', tags: [7, 2] },
          { name: '新兴路', tags: [7] },
          { name: '新汉路', tags: [7] },
          { name: '新街', tags: [7] },
          { name: '合欢路', tags: [7] },
          { name: '盈中', tags: [7] },
          { name: '坎山', tags: [7] },
          { name: '新港', tags: [7] },
          { name: '萧山国际机场', tags: [7, 1, 19] },
          { name: '永盛路', tags: [7, 19] },
          { name: '新镇路', tags: [7] },
          { name: '义蓬', tags: [7] },
          { name: '塘新线', tags: [7] },
          { name: '青六中路', tags: [7, 8] },
          { name: '启成路', tags: [7] },
          { name: '江东二路', tags: [7] }
        ]
      },
      {
        line: '8号线',
        stations: [
          { name: '文海南路', tags: [8, 1] },
          { name: '工商大学云滨', tags: [8] },
          { name: '桥头堡', tags: [8] },
          { name: '河庄路', tags: [8] },
          { name: '青西三路', tags: [8] },
          { name: '青六中路', tags: [8, 7] },
          { name: '仓北村', tags: [8] },
          { name: '冯娄村', tags: [8] },
          { name: '新湾路', tags: [8] }
        ]
      },
      {
        line: '9号线',
        stations: [
          { name: '观音塘', tags: [9, 7] },
          { name: '新业路', tags: [9] },
          { name: '钱江路', tags: [9, 4, 2] },
          { name: '江河汇', tags: [9] },
          { name: '三堡', tags: [9, 6] },
          { name: '御道', tags: [9, 19] },
          { name: '红普南路', tags: [9] },
          { name: '九睦路', tags: [9] },
          { name: '客运中心', tags: [9, 1] },
          { name: '乔司南', tags: [9] },
          { name: '乔司', tags: [9] },
          { name: '翁梅', tags: [9] },
          { name: '临平南高铁站', tags: [9] },
          { name: '南苑', tags: [9] },
          { name: '临平', tags: [9] },
          { name: '邱山大街', tags: [9] },
          { name: '何禹路', tags: [9] },
          { name: '五洲路', tags: [9] },
          { name: '龙安', tags: [9] }
        ]
      },
      {
        line: '10号线',
        stations: [
          { name: '黄龙体育中心', tags: [10, 3] },
          { name: '文三路', tags: [10, 19] },
          { name: '学院路', tags: [10, 2] },
          { name: '翠柏路', tags: [10] },
          { name: '北大桥', tags: [10] },
          { name: '和睦', tags: [10, 5] },
          { name: '花园岗', tags: [10] },
          { name: '渡驾桥', tags: [10] },
          { name: '祥园路', tags: [10] },
          { name: '杭行路', tags: [10, 4] },
          { name: '金德路', tags: [10] },
          { name: '逸盛路', tags: [10] }
        ]
      },
      {
        line: '16号线',
        stations: [
          { name: '九州街', tags: [16] },
          { name: '临安广场', tags: [16] },
          { name: '农林大学', tags: [16] },
          { name: '青山湖', tags: [16] },
          { name: '八百里', tags: [16] },
          { name: '青山湖科技城', tags: [16] },
          { name: '南峰', tags: [16] },
          { name: '南湖', tags: [16] },
          { name: '中泰', tags: [16] },
          { name: '禹航路', tags: [16] },
          { name: '凤新路', tags: [16] },
          { name: '绿汀路', tags: [16, 5, 3] }
        ]
      },
      {
        line: '19号线',
        stations: [
          { name: '火车西站', tags: [19, 3] },
          { name: '创景路', tags: [19, 5] },
          { name: '海创园', tags: [19] },
          { name: '西溪湿地北', tags: [19] },
          { name: '五联', tags: [19] },
          { name: '文三路', tags: [19, 10] },
          { name: '沈塘桥', tags: [19, 2] },
          { name: '西湖文化广场', tags: [19, 1, 3, '3a'] },
          { name: '驿城路', tags: [19] },
          { name: '火车东站(东广场)', tags: [19, 6, '6a'] },
          { name: '御道', tags: [19, 9] },
          { name: '平澜路', tags: [19] },
          { name: '耕文路', tags: [19] },
          { name: '知行路', tags: [19] },
          { name: '萧山国际机场', tags: [19, 1, 7] },
          { name: '永盛路', tags: [19, 7] }
        ]
      }
    ], 
    lineMap: {
      1: "1",
      2: "2",
      3: "3",
      4: "4",
      5: "5",
      6: "6",
      7: "7",
      8: "8",
      9: "9",
      10: "10",
      16: "16",
      19: "19",
      '3a': '3号线往石马',
      '6a': '6号线往双浦',
    },
    lineColors: {
      1: '#CC0033',     // 红
      2: '#FF6600',     // 橙
      3: '#FFD700',     // 黄
      4: '#339966',     // 绿
      5: '#3399FF',     // 蓝
      6: '#0066CC',     // 深蓝
      7: '#9966CC',     // 紫
      8: '#A020F0',     // 红紫
      9: '#8B4513',     // 棕
      10: '#C2B280',    // 灰黄
      16: '#FFA07A',    // 粉橙
      19: '#87CEEB',    // 天蓝
      '3a': '#FFD700',  // 浅黄
      '6a': '#0066CC'   // 浅深蓝
    },
  },
// 新增返回方法
navigateBack: function() {
  wx.switchTab({
    url: '/pages/index/index'
  });
},
// 添加导航到站点详情的方法
navigateToStationDetail: function(e) {
  const stationName = e.currentTarget.dataset.stationName;
  wx.navigateTo({
    url: `/pages/stationInfo/stationInfo?stationName=${encodeURIComponent(stationName)}`
  });
},
    // 轮播图切换事件
    swiperChange: function(e) {
      this.setData({
        currentIndex: e.detail.current
      });
    },
  
    // 切换线路事件
    switchLine: function(e) {
      this.setData({
        activeLine: e.currentTarget.dataset.index
      });
    },
  
    onLoad: function() {
      // 可以在这里添加初始化逻辑
    }
});
