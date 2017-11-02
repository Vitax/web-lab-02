$(document).ready(function () {
    var img = new Image();
    var canvas = $("#myCanvas")[0];
    var context = canvas.getContext("2d");

    img.addEventListener("load", function() {
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0);
        var data = context.getImageData(0, 0, img.width, img.height);
    });
    img.src = "./assets/images/lena_std.png";
});