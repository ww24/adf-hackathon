
(function(window){
    var cj = createjs,
        stage, bitmap;
    var objects = [];
    var fps;

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
                stage.addChild(bitmap);
                objects.push(bitmap);
            }
        });

        fps = new createjs.Text("FPS:"+createjs.Ticker.getFPS(), "28px Russo One", "#000");
        stage.addChild(fps);

        stage.update();
    }

    window.addEventListener('load', function(){
        window.removeEventListener('load', arguments.callee);

        init();
    }, false);

    // Stageオブジェクトを作成
    var stage = new createjs.Stage('canvas');

    // Bitmapオブジェクトを作成
    var bitmap = new createjs.Bitmap('images/image_1.png');

    // stageにBitmapオブジェクトを配置
    stage.addChild(bitmap);

    // canvasの描画設定
    createjs.Ticker.setFPS(30);
    createjs.Ticker.addEventListener('tick', function(){
        for(var i = 0; i < objects.length; i++) {
            objects[i].y+=1;
        }

        fps.text = "FPS:"+createjs.Ticker.getFPS();

        stage.update();
    });
}(window));
