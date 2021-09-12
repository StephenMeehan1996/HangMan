
var wordArray = [];
var picCounter = 1;
var pressedButton;
var testWord = "";
var clue = "";
var gameStart = 0;
var correctCount = 0;
var lives = 0;
var maxLives = 7;
var winMessage ;

buttonOff();
document.querySelector(".start").addEventListener("click",function(){

    document.querySelector(".startMessage").style.visibility = "hidden";
    randomWord();
});

document.querySelector(".create").addEventListener("click", function(){

    createWord();
});

for(var i = 1; i < 27; i++){
    document.querySelectorAll("button")[i].addEventListener("click", function(){
        pressedButton = this.className;
            letterCompare();
    });
}
    document.querySelector(".getClue").addEventListener("click",function(){
        document.querySelector(".clue").innerHTML = clue;
        document.querySelector(".clue").style.visibility = "visible"
        document.querySelector(".getClue").style.display = "none";

});

function createWord(){  // Put in letter limit, convert to all caps string. 

        document.querySelector(".startMessage").style.visibility = "hidden";
        document.querySelector(".createMessage").style.visibility = "visible";
        document.querySelector(".wordInput").setAttribute('maxlength',10);

        document.querySelector(".createStart").addEventListener("click", function(){
            var wordInput = document.querySelector(".wordInput").value;
            var clueInput = document.querySelector(".clueInput").value;
            wordInput = wordInput.toUpperCase();
            clue = clue.toUpperCase();
            testWord = wordInput;
            clue = clueInput;
    
            document.querySelector(".createMessage").style.visibility = "hidden";
            buttonOn();
            breakWord(testWord);
        });
 
}

function randomWord(){  //  create random word and place it down in place of testWord. 
    var ranWordArray = ["HOUSE","FIREPLACE","CARPARK","SHEEP","PUPPY","CORK","SNAKE","ZEEBRA","WHISKEY","COMPUTER","BERLIN","FLORENCE","ROME","LONDON","NEWYORK","SOCCER","TENNIS","HONDA","REDBULL"];
    var clues = ["Its a Thing", "Its a Thing", "Its a Thing", "Its a Animal", "Its a Animal", "Its a Place", "Its a Animal", "Its a Animal","Its a Thing" ,"Its a Thing" , "Its a Place" , "Its a Place" , "Its a Place" , "Its a Place" , "Its a Place", "Its a Sport", "Its a Sport", "Its a manufacturer", "Its a Brand"];
        
    var ranNum = Math.floor(Math.random(1)*19);
        testWord = ranWordArray[ranNum];
            clue = clues[ranNum];
                buttonOn();
                     breakWord(testWord);
}

function breakWord(testWord){

        var wordAccess = document.querySelector(".word");
        wordAccess.innerHTML = "";
        for(var i = 0; i < testWord.length; i++){
                    wordArray.push(testWord[i]); 
                    var letter = document.createElement("p");
                    letter.className = "letter" + i;
                    letter.innerHTML = wordArray[i]; 
                    wordAccess.appendChild(letter);
                    gameStart++;
                    console.log(gameStart);
        }
}

function letterCompare(){
    var falseCheck = 0;
    var trueCheck = 0;
    for(var i = 0; i < wordArray.length; i++){
        if(pressedButton == document.querySelector(".letter" + i).innerHTML){
                correctCount++;
                trueCheck++;
                document.querySelector(".letter" + i).style.color = "black";
                document.querySelector("." +pressedButton).classList.add("remove");
        }
        else if(pressedButton != document.querySelector(".letter" + i).innerHTML){   // very jank , number of letter in word get added to counter every loop// // bool may fix this , fix bug 
                falseCheck++;
                document.querySelector("." +pressedButton).classList.add("remove");
        }
    }

    if(falseCheck >= 1 && trueCheck <= 0){ 
                lives++;
                console.log(lives);
                document.querySelector(".pic").src = "images/man" + (lives +1) + ".png";
    }

    if(correctCount == wordArray.length){  // bug , win message appears before final letter is visabile 
                var audio = new Audio("sounds/win.wav");
                audio.play();
                winMessage = "&#127880; Well Done you have Won &#127880;";
                playAgain();
    }
    else if(lives >= maxLives) {
                var audio = new Audio("sounds/lose.wav");
                winMessage = "&#128546; Hard Luck you lose &#128546;";
                audio.play();
                playAgain();
    }
}

function playAgain(){

    document.querySelector(".startMessage").style.visibility = "visible";
         document.querySelector(".p1").innerHTML = winMessage;
            document.querySelector(".p2").innerHTML = "Do you wish to play again ";
            document.querySelector(".p3").style.display = "none";
            document.querySelector(".create").style.display = "none";;
                 document.querySelector(".start").innerHTML = "Yes";

    buttonOff();
    document.querySelector(".start").addEventListener("click",function(){

            location.reload();
    });
}
function buttonOn(){

    for(var i = 0; i < 27; i++){
        document.querySelectorAll("button")[i].disabled = false;
    }
}
function buttonOff(){

    for(var i = 0; i < 27; i++){
        document.querySelectorAll("button")[i].disabled = true;
    }
}