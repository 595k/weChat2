// pages/application/books/shopCart/shopCart.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		selectAll: false,
		selectAllText: "全选"
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
	 * 详细信息
	 */
	bookDetail: function () {
		wx.navigateTo({
			url: '../bookDetail/bookDetail',
		})
	},
	/**
	 * 编译订单
	 */
	editOrder: function (event) {
		if (this.data.editOrder) {

		}
	},
	/**
	 * 是否全选
	 */
	selectAll: function () {
		if (this.data.selectAll) {
			this.setData({
				selectAll: false,
				selectAllText: "全选"
			})

		} else {
			this.setData({
				selectAll: true,
				selectAllText: "全取消"
			})
		}
	}
})