let socket;
let cnv;
function setup() {
    cnv = createCanvas(900, 600);
    if (navigator.userAgent.indexOf('Win') != -1) {
        const button = createButton('reset');
        let val = random(255);
        let text = createP('Please draw something on Windows');

        text.class('stil');
        button.class('btn-reset');
        background(val);

        button.position(900, 150);
        text.position(730, 50);

        cnv.position(500, 250);
        button.mousePressed(resetSketch);
    }

    if (navigator.userAgent.indexOf('Android') != -1) {
        text = createP('Please draw something on Android');

        text.class('stil');
        background(51, 24, 662);

        text.position(250, 20);
        cnv.position(50, 150);
    }
    socket = io.connect('http://192.168.1.236:3000');
    socket.on('mouse', newDrawing);
}

function newDrawing(data) {
    noStroke();
    fill(255, 0, 100);
    ellipse(data.x, data.y, 30, 30);
}
function resetSketch() {
    let val = random(255);
    console.log('Button pressed: ' + val);
    background(val);
    const nodata = {
        pressed: val,
    };
    socket.emit('mouse', nodata);
}

function mouseDragged() {
    console.log('Sending: ' + mouseX + ',' + mouseY);

    const data = {
        x: mouseX,
        y: mouseY,
    };

    socket.emit('mouse', data);

    noStroke();
    fill(255);
    ellipse(mouseX, mouseY, 30, 30);
}

function draw() {}
