// page/books/pay/pay.js
var util = require("../../../utils/util.js");
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		title: {},
		logo: {},
		buyCount: {},
		money: 0,
		adress: 0
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.setData({
			title: options.title.length > 7 ? options.title.substring(0, 7) + "..." : options.title,
			logo: options.logo,
			buyCount: options.buyCount,
			money: util.getTotal(options.buyCount, 0.1)
		})
	},
	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	}
	/**
	 * 减一
	 */
	, minCount: function () {
		if (this.data.buyCount > 1) {
			var count = this.data.buyCount;
			this.setData({
				buyCount: Number(count) - 1,
				money: util.getTotal(Number(count) - 1, 0.1)
			})
		}
	}
	/**
	 * 加一
	 */
	, maxCount: function () {
		if (this.data.buyCount < 10) {
			var count = this.data.buyCount;
			this.setData({
				buyCount: Number(count) + 1,
				money: util.getTotal(Number(count) + 1, 0.1)
			})
		}
	}
	/**
	 * 获取地址
	 */
	,
	getAdress: function () {
		var that = this;
		wx.chooseAddress({
			success: function (res) {
				that.setData({
					adress: res.provinceName + res.cityName + res.countyName + res.detailInfo + "(" + res.userName + ")"
				})
			}, fail: function () {
				that.setData({
					adress: 1
				})
			}
		})
	},
	wePay:function(){
		wx:wx.navigateTo({
			url: '../wePay/wePay'
		})
	}

})