/**
 * Created by LiKun on 2016/5/27.
 */
define(["text!modules/consultant/template.html"], function (template) {
    return Backbone.View.extend({
        el: "#container",
        initialize: function () {
            console.info("consultant module initialized! --- View:initialize");
        },
        render: function () {
            var compiled = _.template(template);
            this.$el.html(compiled);
            console.info("consultant module rendering finished! --- View:render");
        }
    });
});
