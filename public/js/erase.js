document.addEventListener("DOMContentLoaded", function() {
    let mouse = { 
        click: false,
        move: false,
        pos: {
           x:0, 
           y:0
        },
        pos_prev: false
    };

    let eraser = {
        radius: 10,
        fillcolor: '#ff0000'
    }

    const erase_all  = document.getElementById('erase_all'),
          erase_1pt  = document.getElementById('erase_1pt'),
          erase_2pt  = document.getElementById('erase_2pt'),
          canvas = document.getElementById('drawing'),
          context = canvas.getContext('2d');

    var width   = window.innerWidth;
     var height  = window.innerHeight;

     canvas.width = 500;
     canvas.height = 500;
    erase_all.addEventListener('click', function () {
        context.clearRect(0, 0, canvas.width, canvas.height); // clearRect --> 사각형의 범위를 지우는 메소드
        // 컨텍스트 리셋
        context.beginPath();
    });

    canvas.onmousedown = function(e){ mouse.click = true; };
    canvas.onmouseup = function(e){ mouse.click = false; };
    
    canvas.onmousemove = function(e) {
        // normalize mouse position to range 0.0 - 1.0
        console.log(e)
        console.log(width)
        mouse.pos.x = e.clientX / width;
        mouse.pos.y = e.clientY / height;
        mouse.move = true;
        eraser.fillcolor = '#121212';
        eraser.radius = 10;

        context.fillStyle = eraser.fillColor;

        context.beginPath();
        context.moveTo(mouse.pos.x * width, mouse.pos.y * height);
        context.arc(mouse.pos.x * width , mouse.pos.y * height, eraser.radius, 0, Math.PI * 2, false);
        context.fill();
     };



});
