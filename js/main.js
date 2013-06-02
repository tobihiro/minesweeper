enchant();

window.onload = function(){
	var game = new Game(240,240);	//画面サイズ設定
	game.fps = 30;					//fps設定（意味無いけど…）
	game.preload('./img/tile.png');	//画像プリロード
	
	game.onload = function(){
	
		var gameScene = function(){		//メインのゲームシーン作成
		
			var WIDTH = 10;				//横サイズ
			var HEIGHT = 10;			//縦サイズ
			var MINE_NUM = 10;			//爆弾の数
			var map = new Array();		//マップの配列を用意
			
			for (var i = 0; i < HEIGHT * WIDTH; i++)	//mapを初期化
			{
				map[i] = 0;
			}
			
			for (var i = 0; i < MINE_NUM; i++)	//爆弾をセット
			{
				map[i] = 11;
			}
			
			for (var i = 0; i < MINE_NUM; i++)	//爆弾をバラバラにする（ランダムに選んだ配列とi番目の配列の要素を入れ替える）
			{
				var temp1 = map[i];
				var temp2 = Math.floor( Math.random() * HEIGHT * WIDTH) 
				map[i] = map[temp2];
				map[temp2] = temp1;
			}
			
			//爆弾の周りに数字を書く
			for (var i = 0; i < HEIGHT * WIDTH; i++)
			 {
				if(map[i] == 11)
				{
					var x = i % WIDTH;
					var y = Math.floor(i / WIDTH);
					
					var startx = 0, endx = 0;
					var starty = 0, endy = 0;
					
					if(x==0)
					{
						startx = x;
						endx = x+1;
					}
					else if(x == (WIDTH - 1))
					{
						startx = x-1;
						endx = x;
					}
					else
					{
						startx = x-1;
						endx = x+1;
					}
					
					if(y == 0)
					{
						starty = y;
						endy = y+1;
					}
					else if(y==(HEIGHT-1))
					{
						starty = y-1;
						endy = y;
					}
					else
					{
						starty = y-1;
						endy = y+1;
					}
					
					for(var posx = startx; posx <= endx; posx++)
					{
						for(var posy = starty; posy <= endy; posy++)
						{
							if(map[posx + posy*WIDTH] != 11)
								map[posx + posy*WIDTH] += 1;
						}
					}
				}
			}
			
			var scene = new Scene();			//シーン作成
			var tile = new Array();				//タイル作成
			
			for (var i = 0; i < HEIGHT * WIDTH; i++)	//タイル初期化
			{
				tile[i] = new Sprite(24,24);
				tile[i].image = game.assets['./img/tile.png'];
				tile[i].x = (i % WIDTH) * 24;
				tile[i].y = Math.floor(i / WIDTH) * 24;
				tile[i].frame = 9;
				tile[i].prop = map[i];
				scene.addChild(tile[i]);
				
				tile[i].addEventListener(Event.TOUCH_START, function(e) {
					this.frame = this.prop;
				});
			}
			
			return scene;	//シーンを返す
		};
		
		game.replaceScene(gameScene());		//シーンをメインシーンに
	};
	
	game.start();
};