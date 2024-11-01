"use strict"

const nr_rows = 4;
const nr_cols = 4;
const name_piece = "puzzle-piece";
const name_target = "puzzle-piece-target";
const name_puzzle_pieces = "puzzle-pieces";
const name_puzzle_piece_targets = "puzzle-piece-targets";
const name_map = "map";

let map = L.map(name_map).setView([53.430127, 14.564802], 18);
// L.tileLayer.provider('OpenStreetMap.DE').addTo(map);
L.tileLayer.provider('Esri.WorldImagery').addTo(map);
let marker = L.marker([53.430127, 14.564802]).addTo(map);
marker.bindPopup("<strong>Hello!</strong><br>This is a popup.");

let puzzle_pieces = document.getElementById(name_puzzle_pieces);
let puzzle_piece_targets = document.getElementById(name_puzzle_piece_targets);
let map_element = document.getElementById(name_map);

function checkCompletedPuzzles(){
    let targets = puzzle_piece_targets.querySelectorAll("." + name_target);
    for(let target of targets){
        if(target.children[0] === undefined || target.data !== target.children[0].data){
            return "Puzzle ułożono niepoprawnie";
        }
    }
    return "Poprawnie ułożono puzzle!";
}

function notifyMe() {
    if (!("Notification" in window) || Notification.permission === "denied") {
        // Check if the browser supports notifications
        alert(checkCompletedPuzzles());
        return;
    } else if ((Notification.permission !== "denied") && (Notification.permission !== "granted")) {
        // We need to ask the user for permission
        Notification.requestPermission().then((permission) => {
            // If the user accepts, let's create a notification
            if (permission === "denied") {
                alert(checkCompletedPuzzles());
            }
            else{
                const notification = new Notification(checkCompletedPuzzles());
            }
        });
        return;
    }
    const notification = new Notification(checkCompletedPuzzles())
}

function piecesCreator(){
    let sequence = new Array(nr_rows * nr_cols);
    for(let i = 0; i < nr_rows*nr_cols; i++){
        sequence[i] = i;
    }
    //shuffle
    sequence = sequence.map(x => [Math.random(), x]).sort().map(([_, x]) => x)
    for(let i=0 ; i<nr_rows; i++) {
        for (let j = 0; j < nr_cols; j++) {
            let piece = document.createElement("canvas");
            piece.className = name_piece;
            piece.id = "piece" + (i * nr_cols + j);
            piece.draggable = true;
            piece.style.width = map_element.clientWidth / nr_cols + "px";
            piece.style.height = map_element.clientHeight / nr_rows + "px";
            piece.data = "" + sequence[i * nr_cols + j];
            puzzle_pieces.appendChild(piece)

            piece.addEventListener("dragstart", (event) => {
                piece.style.border = "1px dashed #D8D8FF";
                event.dataTransfer.setData("text", event.target.id);
            })
            piece.addEventListener("dragend", function (event) {
                piece.style.borderWidth = "0";
            });
        }
    }
}

function targetsCreator(){
    for(let i=0 ; i<nr_rows; i++){
        for(let j=0; j<nr_cols; j++){
            let target = document.createElement("div");
            target.className = name_target;
            target.id = "target" + (i * nr_cols + j);
            target.style.width = map_element.clientWidth / nr_cols + "px";
            target.style.height = map_element.clientHeight / nr_rows + "px";
            target.data = "" + (i * nr_cols + j);
            puzzle_piece_targets.appendChild(target);
            if(j + 1 >= nr_cols){
                puzzle_piece_targets.appendChild(document.createElement("br"));
            }

            target.addEventListener("dragenter", function (event) {
                target.style.border = "1px solid #7FE9D9";
            });
            target.addEventListener("dragleave", function (event) {
                target.style.border = "1px solid black";
            });
            target.addEventListener("dragover", function (event) {
                event.preventDefault();
            });
            target.addEventListener("drop",function(event){
                if(target.children[0] !== undefined){
                    return;
                }
                let piece = document.querySelector("#" + event.dataTransfer.getData("text"));
                target.style.border = "1px solid black"
                if(piece.parentElement.className === target.className){
                    puzzle_cnt--;
                }
                target.appendChild(piece);
                puzzle_cnt++;
                if(target.data !== piece.data){
                    console.log("źle");
                }
                else{
                    console.log("dobrze");
                }
                if(puzzle_cnt >= nr_rows * nr_cols){
                    notifyMe();
                }
            },true)
        }
    }
}


puzzle_piece_targets.addEventListener("dragover", function (event) {
    event.preventDefault();
});
puzzle_pieces.addEventListener("dragover", function (event) {
    event.preventDefault();
});
puzzle_pieces.addEventListener("drop", (event)=>{
    let piece = document.querySelector("#" + event.dataTransfer.getData("text"));
    puzzle_pieces.appendChild(piece);
})
let puzzle_cnt = 0;

piecesCreator();
targetsCreator();

document.getElementById("saveButton").addEventListener("click", function() {
    leafletImage(map, function (err, canvas) {
        const canvas_piece_width = canvas.width / nr_cols;
        const canvas_piece_height = canvas.height / nr_rows;
        // here we have the canvas
        for(let piece of document.getElementById("puzzle-pieces").children) {
            let i =  parseInt(piece.data);
            let rasterMap = document.getElementById(piece.id);
            let rasterContext = rasterMap.getContext("2d");
            rasterContext.drawImage(canvas, canvas_piece_width * (i % nr_cols), canvas_piece_height * Math.floor(i / nr_rows),
                canvas_piece_width, canvas_piece_height, 0, 0, piece.width, piece.height);
        }
    });
});

document.getElementById("getLocation").addEventListener("click", function(event) {
    if (! navigator.geolocation) {
        console.log("No geolocation.");
    }

    navigator.geolocation.getCurrentPosition(position => {
        //console.log(position);
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        map.setView([lat, lon]);
    }, positionError => {
        console.error(positionError);
    });
});