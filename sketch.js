function setup() {
    var canvas = createCanvas(windowWidth, windowHeight);
    canvas.style("display", "block");
    const windowH = windowHeight;
    const windowW = windowWidth;
}

balls = [];
balls.push(new Ball(300, 200, 30, 5, (255, 255, 255)));
fluids = [];
fluids.push(new Fluid(0, 350, 800, 300, (0, 0, 250, 200), 0.2));
walls = [];
walls.push(new Wall(0, 800, 800, 50, (200, 50, 50), 0.01, 1.5));
for (var i = 0; i < 3; i++) {
    walls.push(new Wall(500 + i*25, 775 - i*25, 25, 25, (200,50,50), 0.01,1.5));
}

function draw() {
    background(50, 50, 100);
    for (var i in fluids) {
        fluids[i].draw();
    }
    for (var i in walls) {
        walls[i].draw();
    }
    for (var i in balls) {
        for (var j in fluids) {
            if (fluids[j].contains(balls[i])) {
                var dragForce = fluids[j].calculateDrag(balls[i]);
                balls[i].exertForce(dragForce[0], dragForce[1]);
            }
        }
        var touched = false;
        for (var j in walls) {
            var touching = walls[j].touching(balls[i]);
            if (touching) {
                var bounceForce = walls[j].calculateBounce(balls[i]);
                if (touching == 1) {
                    if (abs(bounceForce[0]) > 5) {
                        balls[i].exertForce(bounceForce[0], 0);
                    }
                } else if (touching == 2) {
                    if (abs(bounceForce[1]) > 5) {
                        balls[i].exertForce(0, bounceForce[1]);
                        touched = true;
                    }
                }
            }
        }
        //console.log(balls[i].x, balls[i].y);
        balls[i].update();
        if (!touched) {
            this.yvel -= gravity;
        }
        balls[i].restrict();
        balls[i].draw();
    }
}

function mouseDragged() {
   for (var i in balls) {
       balls[i].exertForce((mouseX - pmouseX)/balls[i].mass, 5 * (mouseY - pmouseY)/balls[i].mass); 
   }
}
