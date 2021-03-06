"use strict";

var player = 1;
var gameArray = [];

var cellValue = function(row, col){
    this.row = row;
    this.col = col;
    this.value = "";
}


var findCell = function(row, col){
    var cell;
    for(var i = 0; i  < gameArray.length; i++){
        if (gameArray[i].row == row && gameArray[i].col == col){
            cell = gameArray[i];
            break;
        }
    }
    return cell;
}



var initGame = function(){
    gameArray.length = 0;
    
    for(var row = 0; row < 3; row++ ){
        for(var col = 0; col < 3; col++){
            gameArray.push(new cellValue(row, col));
        }
    }
    player = 1;
}

var getPlayerToken = function() {
    return player === 1 ? "naught" : "cross";
}

var allValuesEqual = function(values){
    var result = true;
    
    var current = values[0];
    if (current === "")
        result = false;
    else {
        for(var i = 1; i < values.length; i++){
            if (current !=  values[i] || values[i] == ""){
                result = false;
                break;
            }
        }
    }
    return result;
}

var getAllCellValuesByRow = function(row){
    var set = [];
    for(var i = 0; i < gameArray.length; i++){
        if (gameArray[i].row === row) {
            set.push(gameArray[i].value);
        }
    }
    return set;
}

var getAllCellValuesByCol = function(col){
    var set = [];
    for(var i = 0; i < gameArray.length; i++){
        if (gameArray[i].col == col)
        set.push(gameArray[i].value);
    }
    return set;
}

var getAllDiagonals = function(fromTopRight){
   var set = [];
    for (var i = 0; i < gameArray.length; i++ ){
        if (!fromTopRight){
        if (gameArray[i].row === gameArray[i].col)
            set.push(gameArray[i].value);
        }
        else {
            if ((gameArray[i].row === 0 &&  gameArray[i].col === 2) || (gameArray[i].row === 1 &&  gameArray[i].col === 2) || (gameArray[i].row === 2 &&  gameArray[i].col === 0) )
                set.push(gameArray[i].value);
        }  
    }
    return set;
}

var playWinsGame = function(row, col) {
    // all values in row are equal?
    if (allValuesEqual(getAllCellValuesByRow(row)))
        return true;
    // else if all values in column are equal
    if (allValuesEqual(getAllCellValuesByCol(col)))
        return true;
    
    if (allValuesEqual(getAllDiagonals(true)))
        return true;
    if (allValuesEqual(getAllDiagonals(false)))
        return true;
        
    return false;
}

var makeId =function(row, col){
    return "c" + row + "_" + col;
}

var setCellStyle = function(row, col, value){
    var id = makeId(row, col);
    var cell =  document.getElementById(id); 

    cell.className = cell.className + " " + value;
}


var setPlayer = function(){
    player = player === 1 ? 2 : 1;
}

var getPlayerMessage =function(){
    return player === 1 ? "Player 1" : "Player 2";
}

var startNewGame = function() {
    document.getElementById("welcome").className ="inactivePanel";
    document.getElementById("game").className ="activePanel";
    
    initGame();
    document.getElementById("player").innerHTML = getPlayerMessage();
}

var play = function(row, col){
    
    var currentCell = findCell(row, col); 
    
    if (currentCell.value == ""){
        currentCell.value = getPlayerToken();
        setCellStyle(row, col, currentCell.value);
        if (!playWinsGame(row, col)){
            setPlayer();
            document.getElementById("player").innerHTML =getPlayerMessage(); 
            
        }
        else {
            alert("you win!")
        }
    }
    else {
        alert("Cell already set")
    }
}