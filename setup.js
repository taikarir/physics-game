let gravity = -0.8;

class Ball {
    constructor(x, y, size, mass, color) {
        this.size = size;
        this.mass = mass;
        this.color = color;
       
        this.x = x;
        this.y = y;
        this.xvel = 0;
        this.yvel = 0;
    }
    exertForce(x, y) {
        this.xvel += x / this.mass;
        this.yvel += y / this.mass;
    }
    update() {
        this.x += this.xvel;
        this.y += this.yvel;
        this.velocity = sqrt(this.xvel*this.xvel + this.yvel*this.yvel);
        this.yvel -= gravity;
    }
    restrict() {
        if (this.x + this.size > windowWidth) {
            this.x = windowWidth - this.size;
            this.xvel = -0.6 * this.xvel;
        }
        if (this.x - this.size < 0) {
            this.x = this.size;
            this.xvel = -0.6 * this.xvel;
        }
        if (this.y + this.size > windowHeight) {
            this.y = windowHeight - this.size;
            this.yvel = -0.6 * this.yvel;
        }
        /*if (this.y - this.size < 0) {
            this.y = this.size;
            this.yvel = -0.6 * yvel;
        }*/

        if (this.xvel < 0.02 && this.xvel > -0.02) {
            this.xvel = 0;
        }
        if (this.yvel < 0.02 && this.yvel > -0.02) {
            this.yvel = 0;
        }
    }
    draw() {
        noStroke();
        fill(this.color);
        //ellipse(this.x, this.y, this.size*2, this.size*2);
        rect(this.x - this.size, this.y - this.size, this.size*2, this.size*2);
    }
}

class Fluid {
    constructor(x, y, w, h, color, drag) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color;
        this.drag = drag;
    }
    calculateDrag(obj) {
        var dragMagnitude = this.drag * obj.velocity*obj.velocity;
        var dragForce = [- obj.xvel, - obj.yvel];
        for (var i in dragForce) {
            dragForce[i] /= obj.velocity;
            dragForce[i] *= dragMagnitude;
        }
        if (abs(dragForce[0]) >= abs(obj.xvel)) {
            dragForce[0] = - obj.xvel;
        }
        if (abs(dragForce[1]) >= abs(obj.yvel)) {
            dragForce[1] = - obj.yvel;
        }
        return dragForce;
    }
    contains(obj) {
        if (obj.x + obj.size >= this.x && obj.x - obj.size <= this.x + this.w && obj.y + obj.size >= this.y && obj.y - obj.size <= this.y + this.h) {
            return true;
        }
    }
    draw() {
        noStroke();
        fill(this.color);
        rect(this.x, this.y, this.w, this.h);
    }
}

class Wall {
    constructor(x, y, w, h, color, friction, bounce) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color;
        this.friction = friction;
        this.bounce = bounce;
    }
    calculateBounce(obj) {
        return [- obj.xvel * obj.mass * this.bounce, - obj.yvel * obj.mass * this.bounce];
    }
    touching(obj, i) {
        if ((obj.x + obj.size) > this.x && (obj.x - obj.size) < (this.x + this.w) && (obj.y + obj.size) > this.y && (obj.y - obj.size) < (this.y + this.h)) {
            if (obj.y <= this.y) {
                if (abs(obj.y - this.y + obj.size) < 15 || ((obj.x - obj.size) > this.x && (obj.x + obj.size) < (this.x + this.w))) {
                    obj.y = this.y - obj.size;
                    touchingGround[i] = 8;
                    return 2;
                }
            }
            if (obj.y >= this.y + this.h) {
                if (abs((obj.y - obj.size) - (this.y + this.h)) < 8 || ((obj.x - obj.size) > this.x && (obj.x + obj.size) < (this.x + this.w))) {
                    obj.y = this.y + this.h + obj.size;
                    return 2;
                }
            }
            if (obj.x <= this.x) {
               // if (abs(
                    obj.x = this.x - obj.size;
                    return 1;
            }
            if (obj.x >= this.x + this.w) {
                obj.x = this.x + this.w + obj.size;
                return 1;
            }
            return 0;
        }
    }
    draw() {
        noStroke();
        fill(this.color);
        rect(this.x, this.y, this.w, this.h);
    }
}
