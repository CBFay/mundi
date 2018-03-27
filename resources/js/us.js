//hide legend, draw map image on canvas
window.onload = function() {
    $("#legend").hide();
    var canvas = document.getElementById('map');
    var context = canvas.getContext('2d');
    var image = document.getElementById('mars');
    canvas.width = image.width;
    canvas.height = image.height;
    context.drawImage(image, 0, 0);
};

// show/hide legend
$("#map").on({
    mouseenter: function() {
        $("#legend").show();
    },
    mouseleave: function() {
        $("#legend").hide();
    }
});

// get mouse position on canvas
function findPos(obj) {
    var curleft = 0, curtop = 0;
    if (obj.offsetParent) {
        do {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
        return { x: curleft, y: curtop };
    }
    return undefined;
}

// detect movements and get image color
$('#map').mousemove(function(el) {
    var pos = findPos(this);
    var x = el.pageX - pos.x;
    var y = el.pageY - pos.y;
    var c = this.getContext('2d');
    try {
        var p = c.getImageData(x, y, 1, 1).data; 
    } catch (e) {
        console.log(e);
    }

    // paint legend
    var legend = document.getElementById('legend');
    lcontext = legend.getContext('2d');
    lcontext.fillStyle = "rgb(" + p[0] + ", " + p[1] + ", " + p[2] + ")";
    lcontext.fillRect(0, 0, 25, 25);

});