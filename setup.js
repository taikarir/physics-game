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
        if (this.y + this.size < windowHeight) {
            this.yvel -= gravity;
        }
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
        ellipse(this.x, this.y, this.size*2, this.size*2);
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
        dragForce[0] /= obj.velocity;
        dragForce[1] /= obj.velocity;
        dragForce[0] *= dragMagnitude;
        dragForce[1] *= dragMagnitude;
        return [dragForce[0], dragForce[1]];
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