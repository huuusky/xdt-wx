/**
 * Created by LiKun on 2016/7/16.
 */
define(["text!modules/about/template.html"], function (template) {
    return Backbone.View.extend({
        el: "#container",
        render: function () {
            var compiled = _.template(template);
            this.$el.html(compiled());
        }
    });
});