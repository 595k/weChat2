// page/books/bookDetail/bookDetail.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		isbuy: false
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},
	/**
	 * 下一步，下单的详细页
	 */
	payBook: function () {
		wx.navigateTo({
			url: '../payBook/payBook',
		})
	},
	/**
	 * 购物车
	 */
	shopCart: function () {
		wx.switchTab({
			url: '../shopCart/shopCart',
		})
	},
	/**
	 * 是否购买
	 */
	isbuy: function () {
		if (this.data.isbuy) {
			this.setData({
				isbuy: false
			});
		} else {
			this.setData({
				isbuy: true
			});
		}
	},
	/**
	 * 首页
	 */
	gohome: function () {
		wx.switchTab({
			url: '../books',
		})
	},
	/**
	 * 我是测试的
	 */
	bookDetail: function () {

	}
})