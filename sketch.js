function setup() {
    var canvas = createCanvas(windowWidth, windowHeight);
    canvas.style("display", "block");
    const windowH = windowHeight;
    const windowW = windowWidth;
}

balls = [];
balls.push(new Ball(200, 200, 5, 50, (255, 255, 255)));
balls.push(new Ball(300, 200, 50, 150, (255, 255, 255)));
fluids = [];
fluids.push(new Fluid(0, 550, 800, 300, (0, 0, 0,100), 1));

function draw() {
    background(50, 50, 100);
    for (var i in fluids) {
        fluids[i].draw();
    }
    for (var i in balls) {
        for (var j in fluids) {
            if (fluids[j].contains(balls[i])) {
                var dragForce = fluids[j].calculateDrag(balls[i]);
                balls[i].exertForce(dragForce[0], dragForce[1]);
            }
        }
        //console.log(balls[i].x, balls[i].y);
        balls[i].update();
        balls[i].restrict();
        balls[i].draw();
    }
}

function mouseDragged() {
   for (var i in balls) {
       balls[i].exertForce((mouseX - pmouseX)/50, (mouseY - pmouseY)/50); 
   }
}
