/**
 * Created by markadash on 2017-10-30.
 */

$.widget("ui.clickImage", {

    // Options
    options: {
        src: "http://blog.iso50.com/wp-content/uploads/2010/03/Picture-171-450x337.png",
        title: "",
        onClick: function () {}
    },

    // Constructor
    _create: function(){
        const that = this;
        const element = that.element.addClass('click-image');
        element.append($('<img class="click-image-img" src="' + that.options.src + '">'))
        element.attr('title', that.options.title);
        element.click(that.options.onClick);
    },

    clickMethod: function (data) {
        const that = this;
        that.element.click();
        alert(data);
    }

});