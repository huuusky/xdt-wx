/**
 * Created by LiKun on 2016/7/6.
 */
define(["text!modules/add-car/template.html", "router"], function (template, router) {
    return Backbone.View.extend({
        el: "#container",
        carId: 0,
        render: function (carInfo, carId) {
            var compiled = _.template(template);
            this.$el.html(compiled({carInfo: carInfo}));

            this.carId = carId;
        },
        events: {
            "click #add-car": "addCar"
        },
        addCar: function () {
            var province = $("#province").val();
            var carNumber = $("#car-number").val().trim();
            var carBuyingTime = $("#car-buying-time").val();
            var carVin = $("#car-vin").val().trim();

            var submitData = {
                token: xdtGlobal.userInfo.token,
                carId: this.carId,
                vinNum: carVin,
                buyDate: carBuyingTime,
                carCity: province,
                carNum: carNumber
            };

            $.post(INTERFACE.addCar, submitData, function (response) {
                if (response.success) {
                    router.navigate("my-cars", {trigger: true, replace: true});
                } else {
                    toast(response.msg);
                }
            });
        }
    });
});
