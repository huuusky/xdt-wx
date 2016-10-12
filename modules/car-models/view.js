/**
 * Created by LiKun on 2016/7/5.
 */
define(["text!modules/car-models/template.html"], function (template) {
    return Backbone.View.extend({
        el: "#container",
        render: function (carModels, seriesId) {
            var compiled = _.template(template);
            this.$el.html(compiled({
                carModels: carModels,
                seriesId: seriesId
            }));
        }
    });
});
