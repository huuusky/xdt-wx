/**
 * Created by LiKun on 2016/5/27.
 */
define(["text!modules/reservation-b/template.html", "router"], function (template, router) {
    return Backbone.View.extend({
        el: "#container",
        varCache: { // 缓存变量
            count: 0, // 计数器
            consultantId: 0,
            consultantName: "",
            appointTime: "",
            $appointTimeModal: null,
            $timelineList: null,
            $timelineItems: null,
            $appointTimeList: null,
            $appointDayTimes: null,
            $consultantModal: null,
        },
        render: function (shopPromotionData, dateList, consultantList) {
            var compiled = _.template(template);
            this.$el.html(compiled({
                shopPromotionData: shopPromotionData,
                dateList: dateList,
                consultants: consultantList
            }));
            this.varCache.$appointTimeModal = $("#appoint-time-modal");
            this.varCache.$timelineList = $("#timeline-list");
            this.varCache.$timelineItems = $(".timeline-item-wrapper");
            this.varCache.$appointTimeList = $("#appoint-time-list");
            this.varCache.$appointDayTimes = $(".appoint-day-time");

            this.varCache.$consultantModal = $("#consultant-modal");
            this.varCache.$consultantText = $("#consultant-text");
            console.info("reservation-b module rendering finished! --- View:render");
        },
        events: {
            "click #appoint-time-link": "showAppointModal", // 显示预约时间弹出框
            "click #timeline-left-btn": "showPrevDay", // 显示预约时间弹出框
            "click #timeline-right-btn": "showNextDay", // 显示预约时间弹出框
            "click .appoint-time-item": "selectAppointTime", // 选择预约时间
            "click #appoint-confirm-btn": "confirmAppoint", // 预约时间弹出框确定按钮
            "click #appoint-cancel-btn": "cancelAppoint", // 预约时间弹出框取消按钮
            "click #appoint-time-modal-backdrop": "cancelAppoint", // 预约时间弹出框取消按钮
            "click #consultant-link": "showConsultantModal", // 显示服务顾问弹出框
            "click .consultant": "selectConsultant", // 选择服务顾问
            "click #confirm-consultant": "confirmConsultant", // 确认服务顾问
            "click #random-distribute": "randomDistribute", // 随机分配服务顾问
            "click #submit-reservation-btn": "submitReservation" // 提交预约订单
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
                toast("请选择预约时间！");
                return;
            }
            xdtGlobal.reservationData.appointmentTime = this.varCache.appointTime;
            $("#appoint-time-text").text(this.varCache.appointTime);
            this.varCache.$appointTimeModal.removeClass("active");
        },
        cancelAppoint: function () {
            this.varCache.$appointTimeModal.removeClass("active");
        },
        showConsultantModal: function () {
            this.varCache.$consultantModal.addClass("active");
        },
        selectConsultant: function (event) {
            var $selectedConsultant = $(event.currentTarget);
            this.varCache.consultantId = $selectedConsultant.attr("consultant-id");
            this.varCache.consultantName = $selectedConsultant.attr("consultant-name");
            $selectedConsultant.addClass("selected").siblings().removeClass("selected");
        },
        confirmConsultant: function () {
            xdtGlobal.reservationData.consultantId = this.varCache.consultantId;
            this.varCache.$consultantText.text(this.varCache.consultantName);
            this.varCache.$consultantModal.removeClass("active");
        },
        randomDistribute: function () {
            xdtGlobal.reservationData.consultantId = 0;
            this.varCache.$consultantText.text("随机分配");
            this.varCache.$consultantModal.removeClass("active");
        },
        submitReservation: function () {
            console.log(xdtGlobal.reservationData);
            $.get(INTERFACE.submitReservation, {
                token: xdtGlobal.userInfo.token,
                reservationCardJson: JSON.stringify(xdtGlobal.reservationData)
            }, function (response) {
                console.log(response);
                if (response.success) {
                    initReservationData();
                    router.navigate("index", {trigger: true, replace: true});
                    toast(response.data);
                } else {
                    toast(response.msg);
                }
            });
        }
    });

    // 预约单提交后初始化储存在全局中的数据
    function initReservationData() {
        xdtGlobal.reservationData.carId = 0;
        xdtGlobal.reservationData.shopId = 0;
        xdtGlobal.reservationData.consultantId = 0;
        xdtGlobal.reservationData.reservedServiceType = "";
        xdtGlobal.reservationData.appointmentTime = "";
        xdtGlobal.reservationData.remarks = "";
    }
});
