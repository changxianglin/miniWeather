//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    region: ['广东省', '深圳市', '罗湖区'], 
    now: '',

    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    this.getWeather()
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  changRegion: function(e) {
    this.setData({
      region: e.detail.value
    })
    this.getWeather()
  },
  getWeather: function() {
    var that = this 
    wx.request({
      url: 'https://free-api.heweather.net/s6/weather/now?',
      data: {
        location: that.data.region[1],
        key: 'c5819110ad6d4bc2884405f493fdc801'
      },
      success: function(res) {
       that.setData({
         now: res.data.HeWeather6[0].now
       })
      }
    })
  }
})
