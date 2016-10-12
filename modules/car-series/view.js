/**
 * Created by LiKun on 2016/7/5.
 */
define(["text!modules/car-series/template.html"], function (template) {
    return Backbone.View.extend({
        el: "#container",
        render: function (carSeries, brandId) {
            var compiled = _.template(template);
            this.$el.html(compiled({
                carSeries: carSeries,
                brandId: brandId
            }));
        }
    });
});
