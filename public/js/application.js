var user_name,img,socket = null;
function load_page(page){
  document.getElementById('page1').style.display = 'none';
  document.getElementById('page2').style.display = 'none';
  document.getElementById('page3').style.display = 'none';
  document.getElementById(page).style.display = '';
}

$(function(){
  $('#name_box').change(function() {
    $('#image_box').css({
      display : ''
    })
    $('#name_box').css({
      display : 'none'
    })
    $('#page2_name_label').text($('#name_box').val()+'ウイルス');
    // page2_name_label
  });
})

function realtime(img_blob, name){
  socket = io.connect('http://localhost:3000/client');
  socket.emit('register',{ name: name, image: img_blob });
  socket.on('end', function (data) {
    console.log(data);
  });
}

function tap(){
  if(socket == null)return;
  socket.emit('tap');
}

document.getElementById("attack_button").addEventListener("click", function(){
  tap();
});

if (!HTMLCanvasElement.prototype.toBlob) {
 Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
  value: function (callback, type, quality) {

    var binStr = atob( this.toDataURL(type, quality).split(',')[1] ),
        len = binStr.length,
        arr = new Uint8Array(len);

    for (var i=0; i<len; i++ ) {
     arr[i] = binStr.charCodeAt(i);
    }

    callback( new Blob( [arr], {type: type || 'image/png'} ) );
  }
 });
}

