/**
 * Created by LiKun on 2016/5/27.
 */
define(["text!modules/reservation-a/template.html", "router"], function (template, router) {
    return Backbone.View.extend({
        el: "#container",
        varCache: {
            carId: 0,
            selectedReservations: []
        },
        initialize: function () {
            console.log(this.varCache.selectedReservations);
            // 初始化选择的部位
            this.varCache.selectedReservations = [];
        },
        render: function (reservationData) {
            var compiled = _.template(template);
            this.$el.html(compiled({reservationData: reservationData}));

            this.varCache.carId = reservationData.accustomedCar.carId;
            console.info("reservation-a module rendering finished! --- View:render");
        },
        events: {
            "click .reservation-item": "selectReservation",
            "click #gotoReservationShopList": "gotoReservationShopList"
        },
        selectReservation: function (event) {
            var $selectedItem = $(event.currentTarget);
            var code = $selectedItem.attr("code");
            if ($selectedItem.hasClass("selected")) {
                $selectedItem.removeClass("selected");
                this.varCache.selectedReservations =_.without(this.varCache.selectedReservations, code)
            } else {
                $selectedItem.addClass("selected");
                this.varCache.selectedReservations.push(code);
            }
        },
        gotoReservationShopList: function () {
            var $carConditionReport = $("#car-condition-report");
            xdtGlobal.reservationData.carId = this.varCache.carId;
            xdtGlobal.reservationData.reservedServiceType = this.varCache.selectedReservations.join(",");
            xdtGlobal.reservationData.remarks = $carConditionReport.val().trim();
            console.log(xdtGlobal.reservationData);
            router.navigate("reservation-shop-list", {trigger: true});
        }
    });
});
