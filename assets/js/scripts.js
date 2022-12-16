/* GUI Assignment: HW5
Gabriel Vega, UMass Lowell Computer Science, gabriel_vega@student.uml.edu */

//This is the data structure that I use to keep track of the letters, values, and distributions it was created by Prof. Heines
var scrabbleTiles = [] ;
scrabbleTiles["A"] = { "value" : 1,  "original-distribution" : 9,  "number-remaining" : 9  } ;
scrabbleTiles["B"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
scrabbleTiles["C"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
scrabbleTiles["D"] = { "value" : 2,  "original-distribution" : 4,  "number-remaining" : 4  } ;
scrabbleTiles["E"] = { "value" : 1,  "original-distribution" : 12, "number-remaining" : 12 } ;
scrabbleTiles["F"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
scrabbleTiles["G"] = { "value" : 2,  "original-distribution" : 3,  "number-remaining" : 3  } ;
scrabbleTiles["H"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
scrabbleTiles["I"] = { "value" : 1,  "original-distribution" : 9,  "number-remaining" : 9  } ;
scrabbleTiles["J"] = { "value" : 8,  "original-distribution" : 1,  "number-remaining" : 1  } ;
scrabbleTiles["K"] = { "value" : 5,  "original-distribution" : 1,  "number-remaining" : 1  } ;
scrabbleTiles["L"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4  } ;
scrabbleTiles["M"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
scrabbleTiles["N"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6  } ;
scrabbleTiles["O"] = { "value" : 1,  "original-distribution" : 8,  "number-remaining" : 8  } ;
scrabbleTiles["P"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
scrabbleTiles["Q"] = { "value" : 10, "original-distribution" : 1,  "number-remaining" : 1  } ;
scrabbleTiles["R"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6  } ;
scrabbleTiles["S"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4  } ;
scrabbleTiles["T"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6  } ;
scrabbleTiles["U"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4  } ;
scrabbleTiles["V"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
scrabbleTiles["W"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
scrabbleTiles["X"] = { "value" : 8,  "original-distribution" : 1,  "number-remaining" : 1  } ;
scrabbleTiles["Y"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
scrabbleTiles["Z"] = { "value" : 10, "original-distribution" : 1,  "number-remaining" : 1  } ;
scrabbleTiles["_"] = { "value" : 0,  "original-distribution" : 2,  "number-remaining" : 2  } ;

//this is the variable that holds the current score for the game
let currentScore = 0;

//this is runs when everything on the page has loaded and binds all the required functionality to the html elements
$(function() {
    //attaches the sortable container to the divs that need it
    $("#rack, #slot1, #slot2,  #slot3,  #slot4,  #slot5,  #slot6,  #slot7").sortable({
        revert: true, 
        connectWith: ".connectSortable",
        //this logic makes sure that only one tile can be dragged to each slot except for the rack which can hold up to 7
        receive: function(event, ui) {
            if ($(this).children().length > 1 && $(this).attr('id') != "rack") {
                $("#rack").sortable('cancel');
            }
        },
    });

    //A function that fills the rack up to 7 letters 
    fillRack();

    //attaches a listener to the submit button to handle calculating the score and validating the word 
    $("#submit").on("click", function (e){
        //hides the error message
        $("#error").addClass("hidden");
        //retrieves the word from the slots 
        let currentWord = retrieveWord();

        //checks to see if the word dosent have any spaces
        if (spaceCheck(currentWord)){
            $("#error").text("Please make sure there are no spaces between letters");
            $("#error").removeClass("hidden");
            return;
        }

        //calculates the score for the word and updates it on the scoreboard
        currentScore += calculateScore(currentWord);
        $("#score").text(`Score: ${currentScore}`);

        //clears the slots and refills the rack with max 7 tiles 
        clearSlots();
        fillRack();

        //this calculates the number of tiles left and updates it on the scoreboard
        $("#tilesLeft").text(`Tiles Left: ${calculateTilesLeft()}`);
    });   

    //This attaches the functionality to clicking the restart button
    $("#restart").on("click", function(e){
        //this loops through the data structure and resets the number of remaining tiles to the starting values
        for (let i = 0; i < 27; i++){
            scrabbleTiles[intToChar(i)]["number-remaining"] = scrabbleTiles[intToChar(i)]["original-distribution"];
        }

        //this clears the slots of any tiles 
        clearSlots();
        //this clears the rack of any tiles
        $("#rack").html("");
        //this refills the rack
        fillRack();
        //this resets the number of tiles left on the scoreboard
        $("#tilesLeft").text(`Tiles Left: ${calculateTilesLeft()}`);
        //this resets the score 
        currentScore = 0;
        //this shows the reset score on the scoreboard
        $("#score").text(`Score: ${currentScore}`);

        //this makes sure all lingering error messages dissapear 
        $("#error").removeClass("hidden");
        $("#error").addClass("hidden");
    });

    //keeps track of the current word and displays it on the score board
    for (let i = 1; i < 8; i++){
        //this function gets attached to each slot and runs when there is a change in its children aka a tile gets dragged onto it
        $(`#slot${i}`).on('DOMSubtreeModified', function(e){
            //this looks at the slots and returns the word 
            currentWord = retrieveWord();
            //this strips all the blank slots from the start and end and then displays it on the scoreboard
            $("#word").text(`Word: ${stripWord(currentWord)}`);
        });
    }
});

//this function looks at the rack and then fills it with the nessary amount of tiles, if there isnt enough tiles left it just fills it with all thats left
function fillRack(){
    //this determines the number of tiles needed to fill the rack 
    const numLetters = $("#rack").children().length;
    let lettersNeeded = 7 - numLetters;

    //if there isnt enough tiles left then it sets the tiles needed to all thats left 
    if (calculateTilesLeft() < lettersNeeded){
        lettersNeeded = calculateTilesLeft();
    }

    //this puts a tile into the rack for the number of tiles needed  
    for (let i = 0; i < lettersNeeded; i++){
        //generates a random char
        let rChar = generateChar();
        //if there are none remaining generate another till we find one 
        while (scrabbleTiles[rChar]["number-remaining"] == 0){      
            rChar = generateChar()
        }
        //this function adds the tile to the rack with the generated char
        addLetterToRack(rChar);
    }
}

//this is a helper function that generates a random uppercase letter from the alphabet 
function generateChar(){
    let rInt = Math.floor(Math.random() * 27);
    return intToChar(rInt);
}
//helper function to map int to a letter
function intToChar(rInt){
    if (rInt === 26){
        return "_";
    }
    const code = 'A'.charCodeAt(0);
    const rCode = code + rInt;
    return String.fromCharCode(rCode);
}

//helper function that adds a letter to the rack
function addLetterToRack(letter){
    //creates the node 
    let node = $($.parseHTML(createLetterTile(letter)));
    //subtracts one from the datastructure 
    scrabbleTiles[letter]["number-remaining"]--;

    //adds it to the rack
    $("#rack").append(node);
    //sets up the draggable functionality to the tile after its been added to the page
    $(".draggable").draggable({ containment: "#board", revert: "invalid", connectToSortable: ".connectSortable"});
}

//helper function that returns the html for the letter you want to be added to the rack 
function createLetterTile(letter){
    if (letter === "_"){
        return `<img letter="_" src="assets/images/scrabbleTiles/Scrabble_Tile_Blank.jpg" class="w-20 h-20 bg-cover bg-center rounded border[1px] text-yellow-700 shadow-tile draggable">`;
    }
    return `<img letter="${letter}" src="assets/images/scrabbleTiles/Scrabble_Tile_${letter}.jpg" class="w-20 h-20 bg-cover bg-center rounded border[1px] text-yellow-700 shadow-tile draggable">`;
}

//this is an algorithms that checks to see if there are any spaces in a word
function spaceCheck(word){
    let enter = false;
    let exit = false;

    for (letter of word){
        if (isLetter(letter)){
            if (exit === true){
                return true;
            }else{
                enter = true;
            }
        } else {
            if (enter === true){
                exit = true;
            }
        }
    }

    return false;
}

//this is a function that checks to make sure a char is a letter in the alphabet or a _ for blank
function isLetter(char) {
    if (typeof char !== 'string') {
      return false;
    }
  
    return /^[a-zA-Z_]+$/.test(char);
}

//this function looks at all the slots and calculates the score 
function calculateScore(word){
    //keeps track of the word store 
    let score = 0;

    //tallys score 
    for (let i = 0; i < 7; i++){
        if (word[i] != "-"){
            score += scrabbleTiles[word[i]]["value"];
        }
    }

    //doubles the score if there are letters in the bonus slots 
    if (isLetter(word[1])){
        score *= 2;
    }
    if (isLetter(word[5])){
        score *= 2;
    }
    return score;
}

//this function clears any tiles in the slots 
function clearSlots(){
    for (let i = 1; i < 8; i++){
        $(`#slot${i}`).html("");
    }
};

//this function loops through the datastrusture and returns the number of tiles that are left 
function calculateTilesLeft(){
    let tilesLeft = 0;

    for (let i = 0; i < 27; i++){
        tilesLeft += scrabbleTiles[intToChar(i)]["number-remaining"];
    }

    return tilesLeft;
}

//this function loops throught the slots and returns a string of 7 chars corosponding with one char for each slot 
function retrieveWord(){
    let currentWord = "";
    for (let i = 1; i < 8; i++){
        let letter = $(`#slot${i}`).children();
        if (letter.length != 0){
            currentWord += letter[0].getAttribute("letter");
        } else {
            currentWord += "-";
        }
    }
    return currentWord;
}

//this strips a word of trailing and leading blank spaces or "-" 
function stripWord(word){
    let fIndex = 0;
    let lIndex = 0;
    //trim front
    for (let i = 0; i < 7; i++){
        if (isLetter(word[i])){
            fIndex = i;
            break;
        }
    }
    //trim back
    for (let i = 6; i > -1; i--){
        if (isLetter(word[i])){
            lIndex = i;
            break;
        } 
    }

    return word.slice(fIndex, lIndex + 1);
}