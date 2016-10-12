/**
 * Created by LiKun on 2016/5/27.
 */
define(["text!modules/order/template.html", "router"], function (template, router) {
    return Backbone.View.extend({
        el: "#container",
        varCache: { // 缓存变量
            totalPrice: 0, // 总价格
            count: 0, // 计数器
            couponValue: 0,
            fromType: "",
            shopId: 0,
            carId: 0,
            couponId: 0,
            recommendServices: [],
            appointTime: "", //预约时间
            $totalPrice: null, // 总价格Label
            $couponValue: null, // 页面优惠券金额
            $appointTimeModal: null, // 预约时间弹出框
            $couponModal: null, // 优惠券弹出框
            $timelineList: null, // 时间轴
            $timelineItems: null,
            $appointTimeList: null, // 预约时间列表
            $appointDayTimes: null
        },
        render: function (orderPresetData, shopPromotionData, dateList) {
            var compiled = _.template(template);
            this.$el.html(compiled({
                orderPresetData: orderPresetData, // 订单填写预置数据
                shopPromotionData: shopPromotionData, // 商家优惠详情数据
                dateList: dateList // 优惠时间列表
            }));
            // 初始化缓存变量
            this.varCache.totalPrice = orderPresetData.servicesTotalPrice;

            this.varCache.fromType = orderPresetData.fromType;
            this.varCache.shopId = orderPresetData.shopId;
            this.varCache.carId = orderPresetData.carId;
            this.varCache.recommendServices = orderPresetData.recommendServices;
            orderPresetData.services.forEach(function (item) {
                xdtGlobal.orderSubmitData.services.push(item);
            });

            this.varCache.$appointTimeModal = $("#appoint-time-modal");
            this.varCache.$couponModal = $("#coupon-modal");
            this.varCache.$totalPrice = $("#total-price");
            this.varCache.$timelineList = $("#timeline-list");
            this.varCache.$timelineItems = $(".timeline-item-wrapper");
            this.varCache.$appointTimeList = $("#appoint-time-list");
            this.varCache.$appointDayTimes = $(".appoint-day-time");
            this.varCache.$couponValue = $("#coupon-value");
            console.info("order module rendering finished! --- View:render");
        },
        events: {
            "click .recommend-service-item": "selectRecommendService", // 点击推荐服务
            "click #appoint-time-link": "showAppointModal", // 显示预约时间弹出框
            "click #timeline-left-btn": "showPrevDay", // 显示预约时间弹出框
            "click #timeline-right-btn": "showNextDay", // 显示预约时间弹出框
            "click .appoint-time-item": "selectAppointTime", // 选择预约时间
            "click #appoint-confirm-btn": "confirmAppoint", // 预约时间弹出框确定按钮
            "click #appoint-cancel-btn": "cancelAppoint", // 预约时间弹出框取消按钮
            "click #coupon-link": "showCouponModal", // 显示优惠券弹出框
            "click .coupon": "selectCoupon", // 选择优惠券
            "click #coupon-confirm-btn": "confirmCoupon", // 优惠券弹出框确定按钮
            "click #coupon-cancel-btn": "cancelCoupon", // 优惠券弹出框取消按钮
            "click .modal-backdrop": "hideActiveModal", // 隐藏预约时间或优惠券弹出框
            "click #submit-order": "submitOrder" // 提交订单
        },
        selectRecommendService: function (event) {
            var $selectedService = $(event.currentTarget);
            var serviceId = parseInt($selectedService.attr("service-id"));
            var servicePrice = parseInt($selectedService.attr("service-price"));

            if ($selectedService.hasClass("selected")) { // 取消选择
                $selectedService.removeClass("selected");
                this.varCache.totalPrice -= servicePrice;
            } else { // 选择服务
                $selectedService.addClass("selected");
                this.varCache.totalPrice += servicePrice;
            }
            // 设置总价格
            this.varCache.$totalPrice.text(this.varCache.totalPrice);
        },
        showPrevDay: function () {
            if (this.varCache.count > 0) {
                this.varCache.count--;
                var translate = -12.5 * this.varCache.count + "%";
                this.varCache.$timelineItems.eq(this.varCache.count + 1).addClass("active").siblings().removeClass("active");
                this.varCache.$timelineList.css({
                    "-webkit-transform": "translateX(" + translate + ")",
                    transform: "translateX(" + translate + "%)"
                });
                this.varCache.$appointTimeList.css({
                    "-webkit-transform": "translateX(" + translate + ")",
                    transform: "translateX(" + translate + "%)"
                });
            }
        },
        showNextDay: function () {
            if (this.varCache.count < 6) {
                this.varCache.count++;
                var translate = -12.5 * this.varCache.count + "%";
                this.varCache.$timelineItems.eq(this.varCache.count + 1).addClass("active").siblings().removeClass("active");
                this.varCache.$timelineList.css({
                    "-webkit-transform": "translateX(" + translate + ")",
                    transform: "translateX(" + translate + "%)"
                });
                this.varCache.$appointTimeList.css({
                    "-webkit-transform": "translateX(" + translate + ")",
                    transform: "translateX(" + translate + "%)"
                });
            }
        },
        showAppointModal: function () {
            this.varCache.$appointTimeModal.addClass("active");
        },
        selectAppointTime: function (event) {
            var $selectedAppointTime = $(event.currentTarget);
            this.varCache.appointTime = $selectedAppointTime.attr("appoint-time");
            $selectedAppointTime.addClass("selected");
            $selectedAppointTime.siblings().removeClass("selected");
        },
        confirmAppoint: function () {
            if (this.varCache.appointTime === "") {
                toast("请选择预约时间");
                return;
            }
            xdtGlobal.orderSubmitData.appointment = this.varCache.appointTime;
            $("#appoint-time-text").text(this.varCache.appointTime);
            this.varCache.$appointTimeModal.removeClass("active");
        },
        cancelAppoint: function () {
            this.varCache.$appointTimeModal.removeClass("active");
        },
        showCouponModal: function () {
            this.varCache.$couponModal.addClass("active");
        },
        selectCoupon: function (event) {
            var $coupon = $(event.currentTarget);
            this.varCache.couponId = $coupon.attr("coupon-id");
            this.varCache.couponValue = parseInt($coupon.attr("coupon-value"));
            $coupon.addClass("active");
            $coupon.siblings().removeClass("active");
        },
        confirmCoupon: function () {
            xdtGlobal.orderSubmitData.couponId = this.varCache.couponId;
            this.varCache.$couponModal.removeClass("active");
            // 显示选择的优惠券面额
            this.varCache.$couponValue.text(this.varCache.couponValue);
            // 设置总价格
            this.varCache.$totalPrice.text(this.varCache.totalPrice - this.varCache.couponValue);
        },
        cancelCoupon: function () {
            this.varCache.$couponModal.removeClass("active");
        },
        hideActiveModal: function (event) {
            var $modalBackdrop = $(event.currentTarget);
            $modalBackdrop.parent().removeClass("active");
        },
        prepareSubmitData: function () {
            var varCache = this.varCache;

            var $selectedRecommendServices = $(".recommend-service-item.selected");
            $.each($selectedRecommendServices, function () {
                var index = $(this).index();
                xdtGlobal.orderSubmitData.services.push(varCache.recommendServices[index]);
            });
            xdtGlobal.orderSubmitData.fromType = varCache.fromType;
            xdtGlobal.orderSubmitData.shopId = varCache.shopId;
            xdtGlobal.orderSubmitData.carId = varCache.carId;
            xdtGlobal.orderSubmitData.contactsName = $("#user-name").val().trim();
            xdtGlobal.orderSubmitData.contactsPhone = $("#user-cellphone").val().trim();
            xdtGlobal.orderSubmitData.carLicenseNumber = $("#user-car-number").val().trim();

            console.log(JSON.stringify(xdtGlobal.orderSubmitData));
        },
        submitOrder: function () {
            this.prepareSubmitData();

            $.post(INTERFACE.submitOrder, {
                token: xdtGlobal.userInfo.token,
                orderJson: JSON.stringify(xdtGlobal.orderSubmitData)
            }, function (response) {
                if (response.success) {
                    xdtGlobal.orderPayData = response.data;
                    initOrderSubmitData();
                    console.log(response.data);
                    router.navigate("pay", {trigger: true, replace: true});
                } else {
                    toast(response.msg);
                }
            });
        }
    });
    
    // 订单提交后初始化储存在全局中的数据
    function initOrderSubmitData() {
        xdtGlobal.orderSubmitData = {
            fromType: "", //---------- 订单类型
            shopId: 0, //------------- 店铺ID
            carId: 0, //-------------- 车型ID
            services: [], //---------- 选择的服务
            couponId: 0, //----------- 优惠券ID
            appointment: "", //------- 预约时间
            contactsName: "", //------ 联系人姓名
            contactsPhone: "", //----- 联系人电话
            carLicenseNumber: "" //--- 联系人车牌号
        };
    }
});
