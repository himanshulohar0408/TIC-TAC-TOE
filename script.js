let boxes = document.querySelectorAll(".box")
let resetbutton = document.querySelector(".reset-button") 
let main = document.querySelector(".main-container")
let newgame = document.querySelector(".new-game")
let messagecontainer = document.querySelector(".message-container")
let message = document.querySelector("#msg")
let heading = document.querySelector(".heading")

let turnO = true;
let count = 0;
heading.classList.remove("heading")

const winpatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

const resetgame = () =>{
    turnO = true;
    enableboxes();
    messagecontainer.classList.add("hide")
    heading.classList.remove("heading")
    count = 0;
}

boxes.forEach((box)=>{
    box.addEventListener("click", function(){
        if(turnO == true){
            box.innerHTML = "O";
            turnO = false;
            
        }
        else{
            box.innerHTML = "X";
            turnO = true;
            
        }
        box.disabled = true;
        count++;

        let iswinner = checkwinner();

        if (count === 9 && !iswinner) {
            gamedraw();
        }
    })
})

const gamedraw = () =>{
    message.innerText = `Game is a draw`;
    messagecontainer.classList.remove("hide");
    heading.classList.add("heading");
    disabled();
}

const disabled = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}

const enableboxes=()=>{
    for(box of boxes){
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("win");
    }
}

const showwinner = (winner) => {
    message.innerText = `Congrats! , Winner is "${winner}"`;
    messagecontainer.classList.remove("hide");
    disabled();
    heading.classList.add("heading");
    messagecontainer.classList.add("show");

}

function checkwinner(){
      for(let pattern of winpatterns){
        let posval1 = boxes[pattern[0]].innerText;
        let posval2 = boxes[pattern[1]].innerText;
        let posval3 = boxes[pattern[2]].innerText;

        if(posval1 != "" && posval2 != "" && posval3 != ""){
            if(posval1 === posval2 && posval2 == posval3){
                showwinner(posval1);
                boxes[pattern[0]].classList.add("win")
                boxes[pattern[1]].classList.add("win")
                boxes[pattern[2]].classList.add("win")
                return true;
            }
        }
        }
      }


newgame.addEventListener("click", resetgame);
resetbutton.addEventListener("click", resetgame);
