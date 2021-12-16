/*
Project         : Simple 8x8 Othello Game
File            : script.js
By              : paige71 (GitHub)
Date            : Nov 13, 2021
Description     : This js file contains all the function methods for the Othello game
*/

var canvas = document.getElementById("canvas")
var context = canvas.getContext("2d")

// obtain canvas css properties
canvasStyle = window.getComputedStyle(canvas, null)

// set uncheckeredBoardSize of disks
var uncheckeredBoardSize = 8

// set canvas height and width to square shape 
canvas.width = canvas.height = parseInt(canvasStyle["width"])

// calculate a disk's circumces 
var blockSize = canvas.width / uncheckeredBoardSize 

var blocks = []

// initiate a new game
function newgame() { 
    blocks = []

    // set all disks to true
    for (var i = 0; i < uncheckeredBoardSize * uncheckeredBoardSize; i++) {
        blocks.push(true)
    }

    // randomize a few disks to false to begin the game
    for (var i = 0; i < uncheckeredBoardSize + 1; i++) {
        blocks[parseInt(Math.random() * blocks.length)] = false
    }

    // calling draw function
    oardDraw()
}


// draw the game board
function oardDraw() { 

    var count = 0

    // traverse all disk cells 
    for (var i = 0; i < blocks.length; i++) {

        block = blocks[i] 

        // set disk color
        if (block) {
            context.fillStyle = "white"
            count++
        }
        else {
            context.fillStyle = "black"
        }

        // draw circle shape inside the canvas board
        context.beginPath()
        context.arc((i % uncheckeredBoardSize) * blockSize + blockSize / 2, 
                        parseInt(i / uncheckeredBoardSize) * blockSize+blockSize / 2,
                        blockSize / 2, 0, Math.PI * 2,false)
        context.stroke()
        context.fill()
    }
    
    // player win the game when there are less than six white disks remaining
    if (count <= 6) {

        // delay of 1s to alert winner
        setTimeout(function () {

            // pop out winner message 
            alert("YOU WIN!")

            // player click ok if wish to play again
            newgame()

        }, 1000);
    }
}

newgame()

// calculate disk colours to determine current state
canvas.addEventListener("click", function (evt) {

    // obtain canvas property
    var cRect = canvas.getBoundingClientRect()

    // calculate mouse location inside canvas 
    var canvasX = Math.round(evt.clientX - cRect.left) 
    var canvasY = Math.round(evt.clientY - cRect.top)

    // calculate current coordinates 
    var x = parseInt(canvasX / blockSize) 
    var y = parseInt(canvasY / blockSize)

    // calculate current disk 
    var origin = y * uncheckeredBoardSize + x

    // flip current disk on game board
    blocks[origin] = !blocks[origin] 

    // flip surrounding disks on game board
    blocks[origin - uncheckeredBoardSize] = !blocks[origin - uncheckeredBoardSize]
    blocks[origin + uncheckeredBoardSize] = !blocks[origin + uncheckeredBoardSize]

    // set disk flip rule when the disk was the outter/border top/botton/left/right row
    if (origin % uncheckeredBoardSize == uncheckeredBoardSize - 1) {  
        blocks[origin - 1] = !blocks[origin - 1]
    }
    else if (origin % uncheckeredBoardSize == 0) {
        blocks[origin + 1] = !blocks[origin + 1]
    }
    else {
        blocks[origin - 1] = !blocks[origin - 1]
        blocks[origin + 1] = !blocks[origin + 1]
    }

    // clear extra content
    blocks = blocks.slice(0, uncheckeredBoardSize * uncheckeredBoardSize)
    oardDraw()
})