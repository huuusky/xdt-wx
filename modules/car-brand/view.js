/**
 * Created by LiKun on 2016/7/5.
 */
define(["text!modules/car-brand/template.html"], function (template) {
    return Backbone.View.extend({
        el: "#container",
        render: function (carBrandGroups) {
            var compiled = _.template(template);
            this.$el.html(compiled({carBrandGroups: carBrandGroups}));
        }
    });
});
