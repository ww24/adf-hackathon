window.addEventListener("load", function(){
  load_page('page1');
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  var imagefile = document.getElementById("image_file");
  imagefile.addEventListener("change",function(){
      var reader = new FileReader();
      reader.onload = function(event){
            ctx.save();
            img = new Image();
            img.src = reader.result;
            ctx.beginPath();
            ctx.arc(90, 90, 80, 0, Math.PI*2, false);
            ctx.clip();
            var ratio = 200 / Math.min(img.width,img.height);
            ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, img.width * ratio, img.height * ratio);
            var new_img = new Image();new_img.src = canvas.toDataURL();
            var virus_img = new Image();
            virus_img.src = "./image/virus.png";
            virus_img.onload = function(event){
              ctx.clearRect(0,0,1000,1000);
              ctx.restore();
              ctx.drawImage(virus_img,0,0,virus_img.width,virus_img.height,0,0,200,200);
              ctx.drawImage(new_img,virus_img.width/2-new_img.width/2,virus_img.height/2-new_img.height/2,150,150);
              name = document.getElementById('name_box').value;
              canvas.toBlob(function(blob){
                realtime(blob, name);
              });
              $('#page2_img').attr("src",canvas.toDataURL());
              load_page('page2');
            }
      }
      var file = document.getElementById("image_file").files[0];
      reader.readAsDataURL(file);
  }, true);
}, true);
