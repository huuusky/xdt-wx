/**
 * Created by LiKun on 2016/6/23.
 */
define(function () {
    var Order = Backbone.Model.extend({
        defaults: {
            orderId: 0,
            parentOrderId: null,
            shopName: "",
            title: [],
            itemDesc: "",
            orderNo: "",
            gmtCreate: "",
            status: "",
            statusCode: "",
            payAmount: 0,
            carLicenseNumber: "",
            videoUrl: null,
            totalAmount: 0
        }
    });

    var Orders = Backbone.Collection.extend({
        model: Order
    });

    return {
        order: Order,
        orders: Orders
    }
});