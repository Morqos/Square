
var redSquarePic = document.createElement("img");
var blueSquarePic = document.createElement("img");
var redWinningPic = document.createElement("img");
var blueWinningPic = document.createElement("img");
var introPlaySelected = document.createElement("img");
var introPlayUnselected = document.createElement("img");
var trackPics = [];

var picsToLoad = 0; // set automatically based on imageList in loadImages()

function countLoadedImagesAndLaunchIfReady(){
    picsToLoad--;
    if(picsToLoad == 0){
        imageLoadingDoneSoStartGame();
    }
}

function beginLoadingImage(imgVar, fileName){
    imgVar.onload = countLoadedImagesAndLaunchIfReady();
    imgVar.src = "images/" + fileName;
}

function loadImageForTrackCode(trackCode, fileName){
    trackPics[trackCode] = document.createElement("img");
    beginLoadingImage(trackPics[trackCode], fileName);
}

function loadImages(){

    var imageList = [
        {trackType: TRACK_ROAD, theFile: "track_road.png"},                         // 0
        {trackType: TRACK_WALL, theFile: "track_wall.png"},                         // 1
        
        {trackType: TRACK_BUTTON, theFile: "track_button.png"},                     // 3
        {trackType: TRACK_TELEPORTATION, theFile: "track_teleportation.png"},       // 4
        {trackType: TRACK_DOOR_HORIZONTAL, theFile: "track_door_horizontal.png"},   // 5
        {trackType: TRACK_DOOR_VERTICAL, theFile: "track_door_vertical.png"},       // 6

        {trackType: TRACK_RESULT, theFile: "track_result.png"},                     // 8
        {trackType: TRACK_STOP_OTHER, theFile: "track_stop_other.png"}              // 9
        ];

    beginLoadingImage(redSquarePic, "redSquare.png"); // The image of the red Square
    beginLoadingImage(blueSquarePic, "blueSquare.png"); // The image of the blue Square
    beginLoadingImage(redWinningPic, "red_wins.png"); // The image of the red win
    beginLoadingImage(blueWinningPic, "blue_wins.png"); // The image of the blue win

    beginLoadingImage(introPlaySelected, "intro_play_selected.png");
    beginLoadingImage(introPlayUnselected, "intro_play_unselected.png");
    
    picsToLoad = imageList.length;
    
    for(var i=0; i<imageList.length; i++){
        loadImageForTrackCode(imageList[i].trackType, imageList[i].theFile);
    }

}
