var c;
var ctx;
var bad_img = new Image();
var good_img = new Image();
var wiper;
var MAX_ROUNDS = 3;
var num_rounds = 0;
var num_correct = 0;
var result_cloth;

var DRAGGABLE_O_POS;
var DRAGGABLE_O_Y;
var ASSET_LOC="";
var src1 = ASSET_LOC+"images/wipes/clean1.jpg";
var src2 = ASSET_LOC+"images/wipes/clean2.jpg";
var src3 = ASSET_LOC+"images/wipes/clean3.jpg";
var src4 = ASSET_LOC+"images/wipes/dirty1.jpg";
var src5 = ASSET_LOC+"images/wipes/dirty2.jpg";
var src6 = ASSET_LOC+"images/wipes/dirty3.jpg";
// var src3 = "http://imgur.com/imvlrG2.png";
// var src2 = "http://imgur.com/1Q4rPTl.jpg";
// var src4 = "http://imgur.com/Ocdw53l.jpg";

var imgs_arr = [
    [src1, true,  false],
    [src2, true,  false],
    [src3, true,  false],
    [src4, false, false],
    [src5, false, false],
    [src6, false, false],
];

var intersected = false;

function rand_num(low, high) {
    var num = low + Math.random() * (high - low);
    return Math.floor(num);
}

function new_round(){
  $('#my_canvas').show();
  $('#draggable_div').show();
  $("#popup").hide();
  $('#draggable').offset(DRAGGABLE_O_POS);
  	ctx.fillStyle ="#EEE";
	ctx.fillRect(0,0,c.width,c.height);
	ctx.fillStyle = "black";
	ctx.font = "16px sans-serif";
	ctx.textBaseline = "top";
	ctx.textAlign="left";
	ctx.fillText("Please take the wipe and wipe the dust from the window sill to check that the" ,10, 10);
	ctx.fillText("window sill is clean enough to ensure the area is safe from lead dust issues", 10, 28);
	ctx.fillText("Round: "+(num_rounds+1)+"/"+MAX_ROUNDS, 550, 70);
		//c.width/2
	ctx.fillStyle="black;"
	ctx.moveTo(0,89);
	ctx.lineTo(640,89);
	ctx.lineWidth=1;
	ctx.strokeStyle = "black";
	ctx.stroke();
	
  ctx.drawImage(good_img, 0, 90, 640, 480);
  ctx.drawImage(bad_img, 90, 340, 345, 40);
  

}

function full_restart(){
  num_rounds = 0;
  num_correct = 0;
  imgs_arr.forEach(function(item){
  	item[2]=false;
  });
  new_round();
}
function check_correct(is_correct){
  if(is_correct){
    alert("that's correct!");
    num_correct++;
  }
  else{
    alert("Sorry, that was incorrect, make sure to check if the wipe is lighter or darker than the maginally passing wipe on the verification card.");
  }
  if(++num_rounds >= MAX_ROUNDS){
    if(num_correct>=MAX_ROUNDS)
      alert("You have successfully identified all of the wipes. ");
    else
      alert("Sorry, but you need to get 100% correct to pass the simulation.")
      full_restart();
  }
  else
    new_round();
}

function test_wipe() {
    if (!intersected) return;
    
    $('#my_canvas').hide();
    $('#draggable_div').hide();
    do
   		result_cloth = imgs_arr[rand_num(0, imgs_arr.length)];
   	while(result_cloth[2])
    $("#popup_img").attr("src", result_cloth[0]);
    result_cloth[2] =true;
    
    
    intersected = false;
    $("#popup").show();
    // popup_img.attr("src", "bad.png");
}

function intersect(rect1, rect2) {
    var right1 = rect1.x + rect1.width;
    var right2 = rect2.x + rect2.width;
    var bot1 = rect1.y + rect1.height;
    var bot2 = rect2.y + rect2.height;

    var intersects = !(rect2.x > right1 || right2 < rect1.x || rect2.y > bot1 || bot2 < rect1.y);
    if (intersects) {
        var _x = Math.max(rect1.x, rect2.x);
        var _y = Math.max(rect1.y, rect2.y);
        var _width = Math.min(right1, right2) - _x;
        var _height = Math.min(bot1, bot2) - _y;
        var _rect = {
            x: _x,
            y: _y,
            width: _width,
            height: _height
        };

        return {
            intersects: true,
            rect: _rect
        };
    } else {
        return {
            intersects: false
        };
    }
}

function on_drag(event, ui) {
    var c = document.getElementById("my_canvas");
    var canvas_rect = {
        // x: c.offsetLeft,
        // y: c.offsetTop,
        // width: 500,
        // height: 500
        //x:0, y:450,
        //width:450,
        //height:50
        x:90, y:340,
        width:345,
        height:40,
    };//
    var box_rect = {
        x: ui.offset.left,
        y: ui.offset.top,
        width: 50,
        height: 50
    };

    // Check if the rectangles intersect
    var info = intersect(canvas_rect, box_rect);
    if (info.intersects) {
        intersected = true;
        var rect = info.rect;
        var ctx = c.getContext("2d");
        //var img = document.getElementById("window_good");//r
        ctx.drawImage(good_img, rect.x, rect.y-90, rect.width, rect.height, // src
          rect.x, rect.y, rect.width, rect.height); // dst
    }
}

$( document ).ready(function() {
    $("#draggable").draggable({
        drag: on_drag
    });
    
    $("#draggable").mouseup(test_wipe);
   
    c = document.getElementById("my_canvas");
    ctx = c.getContext("2d");
    
   // bad_img = document.getElementById("window_bad");
    //good_img = document.getElementById("window_good");
    // alert(good_img);
    // alert(bad_img);
    
    //wiper = "http://imgur.com/Ocdw53l.jpg";
    
    // ctx.drawImage(img, 0, 450, 500, 50, //src x, y, w, h
      // 0, 450, 500, 50);
    // ctx.drawImage(good_img, 0, 0, 500, 500);
    // ctx.fillStyle ="#dbbd7a";
	// ctx.fillRect(0,0,c.width,c.height);
	// ctx.fillStyle = "black";
	// ctx.font = "16px sans-serif";
	// ctx.textBaseline = "top";
	// ctx.textAlign="left";
	// ctx.fillText("Please take the wipe and wipe the dust from the window sill to check that the" ,10, 10);
	// ctx.fillText("window sill is clean enough to ensure the area is safe from lead dust issues", 10, 28);
	// ctx.fillText("Round: "+num_rounds+"/"+MAX_ROUNDS, 550, 70);
		// //c.width/2
	// ctx.fillStyle="black;"
	// ctx.moveTo(0,89);
	// ctx.lineTo(640,89);
	// ctx.lineWidth=1;
	// ctx.strokeStyle = "black";
	// ctx.stroke();
     good_img.onload = function(){
       // ctx.drawImage(good_img, 0, 90, 640, 480);
       bad_img.onload = function(){
          // ctx.drawImage(bad_img, 90, 340, 345, 40);
          new_round();
       };
       bad_img.src=ASSET_LOC+"images/sill_dust345x40.png";
     };
     good_img.src=ASSET_LOC+"images/standard_sill.png";
     
     // bad_img.onload = function(){
       // ctx.drawImage(bad_img, 0, 450, 500, 50, 0, 450, 500, 50);
     // };
       //src x, y, w, h//dst x, y, w, h
     DRAGGABLE_O_POS = $("#draggable").position();
     $("#clean_btn").click(function () {
        check_correct(result_cloth[1] == true);
    });
    
    $("#dirty_btn").click(function() {
        check_correct(result_cloth[1] == false);
    });


});