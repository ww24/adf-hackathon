
(function(window){
    var cj = createjs,
        stage, bitmap;
    var objects = [];
    var display_timer, timer=90;

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

        display_timer = new createjs.Text(Math.floor(timer--/30), "100px Titan One", "#000");
        display_timer.x = 1220;
        display_timer.y = 10;
        stage.addChild(display_timer);

        stage.update();
    }

    window.addEventListener('load', function(){
        window.removeEventListener('load', arguments.callee);

        init();
    }, false);

    // アニメーションループ
    createjs.Ticker.setFPS(30);
    createjs.Ticker.addEventListener('tick', function(){

        // ゲーム終了条件
        if(timer<0) {
            stage.clear();
            finish_screen();
            return;
        }

        for(var i = 0; i < objects.length; i++) {
            objects[i].y+=1;
        }

        display_timer.text = Math.floor(timer--/30);

        stage.update();
    });

    function finish_screen() {
        stage = new cj.Stage('demoCanvas');

        var display_result;
        display_result = new createjs.Text("999", "100px Titan One", "#000");
        display_result.x = 600;
        display_result.y = 10;
        stage.addChild(display_result);

        stage.update();
    }
}(window));