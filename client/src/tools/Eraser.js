import Tools from "./Tool"

export default class Eraser extends Tools {
    constructor(canvas) {
        super(canvas);
        this.listen();
    }

    listen() {
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
        this.canvas.onmouseup = this.mouseUpHandler.bind(this);
        this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    }
    mouseUpHandler(e) {
        this.mouseDown = false;
        console.log(this.currentStrokeColor)
        this.ctx.strokeStyle = this.currentStrokeColor;
    }
    mouseDownHandler(e) {
        console.log(this.ctx.strokeStyle)
        console.log(this.currentStrokeColor)

        this.currentStrokeColor = this.ctx.strokeStyle;
        this.mouseDown = true;
        this.ctx.beginPath();
        // this.ctx.lineWidth = 10;
        this.ctx.strokeStyle = 'white';
        this.ctx.moveTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
    }
    mouseMoveHandler(e) {
        if (this.mouseDown) {
            this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)
        }
    }
    draw(x, y) {
        this.ctx.lineTo(x, y);
        this.ctx.stroke();
        // console.log("deow brush ", x, ' ', y)
    }
}