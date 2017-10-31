/**
 * Created by markadash on 2017-10-30.
 */

$.widget("ui.clickImage", {

    // Options
    options: {
        src: "https://pbs.twimg.com/profile_images/416826618145820673/uRRl8e_9_400x400.png",
        title: null,
        onClick: function(){
            alert('Clicked!');
        }
    },

    // Constructor
    _create: function(){
        const that = this;
        const el = $(this.element).addClass("click-image");
        el.append(
            $('<img class="click-image-content" src= ' + that.options.src + ' alt="Avatar">')
        );
        if(that.options.title) {
            el.attr("title", that.options.title);
        }
        el.click(that.options.onClick);
    }


});