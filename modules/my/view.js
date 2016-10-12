/**
 * Created by LiKun on 2016/5/27.
 */
define(["text!modules/my/template.html"], function (template) {
    return Backbone.View.extend({
        el: "#container",
        render: function (my) {
            var compiled = _.template(template);
            this.$el.html(compiled({my: my}));
            console.info("my module rendering finished! --- View:render");
        }
    });
});
