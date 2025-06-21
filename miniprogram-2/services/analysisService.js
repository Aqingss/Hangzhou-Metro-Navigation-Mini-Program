
// services/analysisService.js
const analyzeStationInfo = (stationName) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: 'https://api.deepseek.com/v1/chat/completions',
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer sk-b915a48308cb4810820d31a8d64d09f4' // 替换为您的实际API密钥
      },
      data: {
        model: "deepseek-chat",
        messages: [
          {
            role: "system",
            content: "你是杭州地铁导航助手，精通杭州地铁站点信息、周边设施和换乘指南。请用专业但友好的语气回答用户问题。"
          },
          {
            role: "user",
            content: `请提供关于杭州地铁${stationName}站的详细信息，包括：

            1. **站点基本信息**
               - 所属线路
               - 车站编号
               - 开通日期
            
            2. **换乘信息**
               - 可换乘的线路
               - 换乘方式（同台/通道换乘等）
               - 换乘步行时间
            
            3. **出入口信息**
               - 主要出口位置
               - 每个出口的地标建筑
               - 无障碍设施情况
            
            4. **周边设施**
               - 附近商场/餐饮
               - 公交接驳
               - 停车场信息
            
            5. **运营时间**
               - 首末班车时间
               - 高峰时段
            
            请用清晰的结构化格式回答，并确保信息准确。`
          }
        ],
        stream: false
      },
      success(res) {
        if (res.statusCode === 200) {
          resolve(res.data.choices[0].message.content)
        } else {
          reject(new Error(res.data.error || '获取站点信息失败'))
        }
      },
      fail(err) {
        reject(err)
      }
    })
  })
}

module.exports = {
  analyzeStationInfo
}