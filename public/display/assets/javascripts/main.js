
(function(window){
    var cj = createjs,
        stage, bitmap;
    var objects = [];
    var display_frame;
    var frame=1;

    function init() {
        stage = new cj.Stage('demoCanvas');

        // キューオブジェクトを生成
        var queue = new createjs.LoadQueue();
        var i;

        var arr=[];
        for(i=0; i<100; i++) {
          arr.push({id:'image_'+i, src:'./assets/images/virus.png'});
        }

        // 読み込み実行
        queue.loadManifest(arr);

        // 各ファイル読み込み完了時
        queue.addEventListener('fileload', function(e){
            // 画像の場合
            if(e.item.type === createjs.LoadQueue.IMAGE){
                var bitmap = new createjs.Bitmap(e.result);
                bitmap.x = (Math.random() * 1366);
                bitmap.y = (Math.random() * 768);
                bitmap.scaleX = 0.8;
                bitmap.scaleY = 0.8;
                bitmap.cache(0, 0, 160, 160);
                stage.addChild(bitmap);
                objects.push(bitmap);
            }
        });

        display_frame = new createjs.Text("Frame:"+frame++, "28px Titan One", "#000");
        display_frame.x = 10;
        display_frame.y = 10;
        stage.addChild(display_frame);

        stage.update();
    }

    window.addEventListener('load', function(){
        window.removeEventListener('load', arguments.callee);

        init();
    }, false);

    // canvasの描画設定
    createjs.Ticker.setFPS(30);
    createjs.Ticker.addEventListener('tick', function(){
        for(var i = 0; i < objects.length; i++) {
            objects[i].y+=1;
        }

        display_frame.text = "Frame:"+frame++;

        stage.update();
    });
}(window));
