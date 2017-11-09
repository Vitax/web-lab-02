$(document).ready(function() {
  let originalImage = [];
  let median = 0;
  let image = new Image();
  image.src = "./assets/images/lena_std.png";

  let canvas = $("#myCanvas")[0];
  canvas.width = image.width;
  canvas.height = image.height;
  let context = canvas.getContext("2d");
  greyScaleImage(image, originalImage, context, median);
  modifyBrithness(image, originalImage, context, median);
})

function greyScaleImage(image, originalImage, context, median) {
  image.addEventListener("load", function () {
    context.drawImage(image, 0, 0);

    let imageData = context.getImageData(0, 0, image.width, image.height);
    for(let y = 0; y < imageData.height; y++){
      for(let x = 0; x < imageData.width; x++){
          let i = (y * 4) * imageData.width + x * 4;
          let avg = (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3;

          imageData.data[i] = avg; 
          originalImage[i] = avg; 
          
          imageData.data[i + 1] = avg;
          originalImage[i + 1] = avg;  
          
          imageData.data[i + 2] = avg;
          originalImage[i + 2] = avg;
      }
    }
    context.putImageData(imageData, 0, 0);
  });
}

function modifyBrithness(image, originalImage, context, median) {
  
  $(document).on("input change", '#brightnessSlider', function() {
    let valueOfSlider = $(this).val();
    let imageData = context.getImageData(0,0, image.width, image.height);

    for(let i = 0; i < originalImage.length; i+= 4) {;
        let brightness = originalImage[i] + Number(valueOfSlider);
  
        imageData.data[i] = brightness;
        imageData.data[i + 1] = brightness;
        imageData.data[i + 2] = brightness;
    }

    context.putImageData(imageData, 0, 0);
  })
}