
var util = require("../../utils/util.js");
// pages/app/books/books.js
var app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		bookData: {},
		tuijian: {},
		bookTj: true,
		bookAll: false
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.Loading();
		util.http("/index.php/api/v1/book?count=6&sort=desc", this.action);
	},
	/**
	 * 详情页
	 */
	bookDetail: function (event) {
		var id = event.currentTarget.dataset.id;
		// console.log(id);
		if (typeof (id) == "undefined") {
			return;
		}
		wx.navigateTo({
			url: 'bookDetail/bookDetail?id=' + id,
		})
	},
	/**
	 * 填充数据
	 */
	action: function (data) {
		var readyData = [];
		for (var ind in data) {
			var temp = {
				"id": data[ind].id,
				"title": data[ind].title.substring(0, 8),
				"logo": data[ind].logo,
				"ready": data[ind].ready,
				"introduce": data[ind].introduce
			};
			readyData.push(temp)
		}
		if (readyData.length <= 6) {
			this.setData({
				bookData: readyData,
				tuijian: readyData[0]
			})
		} else {
			this.setData({
				bookData: readyData
			})
		}
	},
	/**
	 * 推荐数据
	 */
	bookTj: function () {
		if (this.data.bookTj) {
			return;
		}
		this.setData({
			bookTj: true,
			bookAll: false
		})
		util.http("/index.php/api/v1/book?count=6&sort=desc", this.action);
		this.Loading();

	},
	/**
	 * 查询全部
	 */
	bookAll: function () {
		if (this.data.bookAll) {
			return;
		}
		this.setData({
			bookAll: true,
			bookTj: false
		})
		util.http("/index.php/api/v1/book?count=30", this.action);
		this.Loading();
	},
	Loading: function () {
		wx.showLoading({
			title: '正在加载',
		})
		setTimeout(function () {
			wx.hideLoading()
		}, 3000)
	}
})