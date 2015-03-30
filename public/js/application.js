var user_name,img,socket = null;
function load_page(page){
  document.getElementById('page1').style.display = 'none';
  document.getElementById('page2').style.display = 'none';
  document.getElementById('page3').style.display = 'none';
  document.getElementById(page).style.display = '';
}

$(function(){
  $('#name_box').change(function() {
    $('#image_file').css({
      display : ''
    })
  });
})

function realtime(img_blob, name){
  socket = io.connect('http://localhost:3000/client');
  socket.emit('register',{ name: name, image: img_blob });
  socket.on('start', function (data) {
    console.log(data);
    // page3へ
  });
  socket.on('end', function (data) {
    console.log(data);
    // page4へ
  });

  socket.on('update', function (data) {
    console.log(data);
    // data.score = 現在のスコア(数値)
  });

}

function tap(){
  if(socket == null)return;
  socket.emit('tap');
}

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

