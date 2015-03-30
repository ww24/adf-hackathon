(function(window){
    var cj = createjs,
        stage, bitmap;
    var objects = [];

    var socket = io.connect(location.host + "/display");

    function init() {
        stage = new cj.Stage('demoCanvas');

        // キューオブジェクトを生成
        var queue = new createjs.LoadQueue();
        var i;

        var arr=[];

        socket.on("add", function (data) {
          console.log(data);
          arr.push({id:data.id, src:data.img_path});

          // 読み込み実行
          queue.loadManifest(arr);
        });

        // for(i=0; i<100; i++) {
        //   arr.push({id:'image_'+i, src:'./assets/images/virus.png'});
        // }


        // 各ファイル読み込み完了時
        queue.addEventListener('fileload', function(e){
            // 画像の場合
            if(e.item.type === createjs.LoadQueue.IMAGE){
                var bitmap = new createjs.Bitmap(e.result);
                bitmap.x = (Math.random() * 1366);
                bitmap.y = (Math.random() * 768);
                bitmap.scaleX = 0.5;
                bitmap.scaleY = 0.5;
                bitmap.cache(0, 0, 160, 160);
                stage.addChild(bitmap);
                objects.push(bitmap);
            }
        });

        stage.update();


        var zoneSize = 8,
        videoElement = document.getElementById('videoOut'),
        videoWidth = videoElement.videoWidth,
        videoHeight = videoElement.videoHeight;
        webCamFlow = new oflow.WebCamFlow(videoElement, zoneSize),
        canvas = document.getElementById('scene'),
        sceneCtx = canvas.getContext('2d'),
        sceneWidth = canvas.width,
        sceneHeight = canvas.height,

        // var OpticalFlow;

    		webCamFlow.onCalculated(function (direciton) {
  	        sceneCtx.clearRect(0, 0, sceneWidth, sceneHeight);

  	        for(var i = 0; i < direciton.zones.length; ++i) {
                var zone = direciton.zones[i];

  							sceneCtx.beginPath();
  							sceneCtx.arc(zone.x, zone.y, 1, 0, Math.PI*2, false);
  							sceneCtx.fillStyle = 'rgba(255, 0, 0, 255)';
  							sceneCtx.fill()
  							sceneCtx.closePath();

  							if(Math.sqrt(Math.pow(zone.u,2)+Math.pow(zone.v,2)) > 4) {
  								sceneCtx.beginPath();
  	              sceneCtx.strokeStyle = 'rgba(255, 255, 255, 255)';
  	              sceneCtx.moveTo(zone.x,zone.y);
  	              sceneCtx.lineTo(zone.x+zone.u, zone.y+zone.v);
  	              sceneCtx.stroke();
  							}
            }

            // 画像に対して
            for(var i = 0; i < objects.length; i++) {
                // メッシュに対して
                var x = objects[i].x;
                var y = objects[i].y;

                var mesh_x = Math.round(x/37);
                var mesh_y = Math.round(y/28);

                if(objects[i].x<0) objects[i].x=(Math.random() * 1366);
                if(objects[i].x>1360) objects[i].x=(Math.random() * 1366);
                if(objects[i].y<50) objects[i].y=(Math.random() * 768);
                if(objects[i].y>660) objects[i].y=(Math.random() * 768);

                if((mesh_x + (mesh_y-1)*37) >= (direciton.zones.length-10) || mesh_x + (mesh_y-1)*37<0) {
                  continue;
                }

                var zone = direciton.zones[mesh_x + (mesh_y-1)*37+1];
                if(Math.sqrt(Math.pow(zone.u,2)+Math.pow(zone.v,2)) > 4) {
                  objects[i].x += (Math.random() * 40)-20;
                  objects[i].y += 30;
                } else {
                  objects[i].x += (Math.random() * 20)-10;
                  objects[i].y += (Math.random() * 20)-10;
                }

            }
        });
        webCamFlow.startCapture();


    }

    window.addEventListener('load', function(){
        window.removeEventListener('load', arguments.callee);

        init();
    }, false);

    // アニメーションループ
    createjs.Ticker.setFPS(30);
    createjs.Ticker.addEventListener('tick', function(){

        stage.update();
    });
}(window));
