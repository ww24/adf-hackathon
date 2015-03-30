window.addEventListener("load", function(){
  load_page('page1');
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  var imagefile = document.getElementById("image_file");
  imagefile.addEventListener("change",function(){
      var reader = new FileReader();
      reader.onload = function(event){
            img = new Image();
            img.src = reader.result;
            ctx.beginPath();
            ctx.arc(90, 90, 80, 0, Math.PI*2, false);
            ctx.clip();
            var small_d = img.width;
            if(small_d > img.height)small_d = img.height;
            ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, 200,200);

            window.open(canvas.toDataURL())
            // load_page('page2');


      }
      var file = document.getElementById("image_file").files[0];
      reader.readAsDataURL(file);
  }, true);
}, true);
