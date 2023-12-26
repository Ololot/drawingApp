import { makeAutoObservable } from "mobx";

class canvasState {
    canvas = null;
    listOfRooms = []; //список всех холстов, которые есть на сервере
    undoList = [];  //действия которые мы совершали
    redoList = [];  //действия, которые мы отменили
    userName = null;  //имя пользователя
    listOfRomossessionid = null; //id сессии
    socket = null; //само соединение, которое используется одной группой пользователей

    constructor() {
        makeAutoObservable(this);
    }
    setSocket(socket) {
        this.socket = socket;
    }
    setListOfRooms(listOfRooms) {
        console.log(listOfRooms)
        this.sessionid = listOfRooms;
    }
    setSessionid(sessionid) {
        this.sessionid = sessionid;
    }
    setCanvas(canvas) {
        this.canvas = canvas;
    }
    setUserName(name) {
        this.userName = name;
    }
    pushToUndo(data) {
        this.undoList.push(data);
    }
    pushToRedo(data) {
        this.redoList.push(data);
    }

    undo() {
        console.log("undo")
        let ctx = this.canvas.getContext("2d");      //контекст, которым будем рисовать(перерисовывать весть холст) старым снимком
        if (this.undoList.length > 0) {              //если массив уже не пуст и можно что то отменять
            let dataUrl = this.undoList.pop();       //удаляем последний элемент для получения предидущего снимка и сохраняем последний снимок в dataUrl
            this.redoList.push(this.canvas.toDataURL());             //сохраняем последний снимок в массив, формируя массив отмененных действий
            let img = new Image();
            img.src = dataUrl;
            img.onload = () => {
                console.log("onload ", this.canvas.width, " ", this.canvas.height);
                ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
            }
        }
        else {
            console.log("чисто");
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.heigth);
        }
    }

    redo() {
        console.log("redo")
        let ctx = this.canvas.getContext("2d");      //контекст, которым будем рисовать(перерисовывать весть холст) старым снимком
        if (this.redoList.length > 0) {              //если массив уже не пуст и можно что то отменять
            let dataUrl = this.redoList.pop();       //удаляем последний элемент для получения предидущего снимка и сохраняем последний снимок в dataUrl
            this.undoList.push(this.canvas.toDataURL());             //
            let img = new Image();
            img.src = dataUrl;
            img.onload = () => {
                console.log("onload ", this.canvas.width, " ", this.canvas.height);
                ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
            }
        }
        else {
            console.log("чисто");
            // ctx.clearRect(0, 0, this.canvas.width, this.canvas.heigth);
        }
    }
}

export default new canvasState()