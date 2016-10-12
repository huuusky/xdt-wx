/**
 * Created by LiKun on 2016/7/4.
 */
define(["text!modules/my-reservation/template.html"], function (template) {
    return Backbone.View.extend({
        el: "#container",
        render: function (reservations) {
            var compiled = _.template(template);
            this.$el.html(compiled({reservations: reservations}));
            console.info("my-reservation module rendering finished! --- View:render");
        },
        events: {
            "click .cancel-reservation-btn": "cancelReservation"
        },
        cancelReservation: function (event) {
            var $cancelBtn = $(event.currentTarget);
            var $reservation = $cancelBtn.closest(".reservation");
            console.log($reservation);

            var id = $cancelBtn.attr("reservation-id");
            $.get(INTERFACE.cancelReservation, {
                token: xdtGlobal.userInfo.token,
                reservationId: id
            }, function (response) {
                if (response.success) {
                    var flag = confirm("确认删除预约吗？");
                    if (flag) {
                        $reservation.remove();
                    }
                } else {
                    toast(response.msg);
                }
            });
        }
    });
});
