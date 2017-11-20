
var util = require("../../../utils/util.js");
var wxParse = require("../../../wxParse/wxParse.js");
// page/books/bookDetail/bookDetail.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		isbuy: false,
		bookDetail: {},
		buyCount: 1,
		saying: {},
		sayingCount: 0
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		util.http("/api/v1/search?id=" + options.id, this.action, "detail");
		util.http("/api/v1/saying?id=" + options.id, this.action, "saying");
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
			url: '../payBook/payBook?logo=' + this.data.bookDetail.logo + "&title=" + this.data.bookDetail.title + "&buyCount=" + this.data.buyCount,
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
		console.log("whoyouare");
	},
	/**
	 * 处理数据
	 */
	action: function (data, obj) {
		if (obj == "saying") {
			// console.log(data.length);
			this.setData({
				saying: data,
				sayingCount: data.length
			})
		} else {
			this.setData({
				bookDetail: data,
			})
			wxParse.wxParse(obj, 'html', data.detail, this, 5)
		}
	}
	/**
	 * 减一
	 */
	, minCount: function () {
		if (this.data.buyCount > 1) {
			this.setData({
				buyCount: Number(this.data.buyCount) - 1
			})
		}
	}
	/**
	 * 加一
	 */
	, maxCount: function () {
		if (this.data.buyCount < 10) {
			this.setData({
				buyCount: Number(this.data.buyCount) + 1
			})
		}
	},
	/**
	 * 添加到购物车
	 */
	addShopCart: function (event) {
		var id = event.currentTarget.dataset.id;
		// console.log(id);
		if(typeof(id)=="undefined"){
			return;
		}
		var data = wx.getStorageSync(id.toString());
		if (data) {
			wx.showToast({
				title: '该商品已在购物车',
			})
		} else {
			wx.setStorageSync(id.toString(), this.data.bookDetail)
			wx.showToast({
				title: '已添加到购物车',
			})
		}
	}
})