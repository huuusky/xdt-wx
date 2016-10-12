/**
 * Created by LiKun on 2016/5/27.
 */
define(["text!modules/index/template.html"], function (template) {
    return Backbone.View.extend({
        el: "#container",
        render: function () {
            var compiled = _.template(template);
            this.$el.html(compiled);
            console.info("index module rendering finished! --- View:render");
        }
    });
});
