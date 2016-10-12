/**
 * Created by LiKun on 2016/7/7.
 */
define(["text!modules/my-cars/template.html", "router"], function (template, router) {
    return Backbone.View.extend({
        el: "#container",
        varCache: {
            userCarId: 0,
            $carActionModal: null
        },
        render: function (myCars) {
            var compiled = _.template(template);
            this.$el.html(compiled({myCars: myCars}));
            
            this.varCache.$carActionModal = $("#car-action-modal");
        },
        events: {
            "click .my-car": "showMyCarModal",
            "click #set-default-car": "setDefaultCar",
            "click #delete-car": "deleteCar",
            "click .modal-backdrop": "cancelActionModal",
            "click #cancel-action-modal": "cancelActionModal"
        },
        showMyCarModal: function (event) {
            this.varCache.userCarId = $(event.currentTarget).attr("user-car-id");
            this.varCache.$carActionModal.addClass("active");
        },
        setDefaultCar: function () {
            var self = this;
            $.get(INTERFACE.setDefaultCar, {
                token: xdtGlobal.userInfo.token,
                userCarId: self.varCache.userCarId
            }, function (response) {
                if (response.success) {
                    $.get(INTERFACE.myCars, {token: xdtGlobal.userInfo.token}, function (response) {
                        if (response.success) {
                            self.render(response.data);
                        } else {
                            toast(response.msg);
                        }
                    });
                } else {
                    toast(response.msg);
                }
            });
            this.varCache.$carActionModal.removeClass("active");
        },
        deleteCar: function () {
            var self = this;
            $.get(INTERFACE.deleteCar, {
                token: xdtGlobal.userInfo.token,
                userCarId: self.varCache.userCarId
            }, function (response) {
                if (response.success) {
                    $.get(INTERFACE.myCars, {token: xdtGlobal.userInfo.token}, function (response) {
                        if (response.success) {
                            self.render(response.data);
                        } else {
                            toast(response.msg);
                        }
                    });
                } else {
                    toast(response.msg);
                }
            });
            this.varCache.$carActionModal.removeClass("active");
        },
        cancelActionModal: function () {
            this.varCache.$carActionModal.removeClass("active");
        }
    });
});
