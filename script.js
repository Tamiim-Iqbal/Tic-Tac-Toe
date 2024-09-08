let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;                     //playerX, playerO

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6], 
];

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
}



boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("box clicked");
        if(turnO)       //playerO
        {
            box.innerText = "O";
            box.style.color = "rgb(82, 207, 196)";
            turnO = false;
        }
        else            //playerX
        {
            box.innerText = "X";
            box.style.color = "rgb(7, 31, 29)";
            turnO = true;  
        }
        box.disabled = true;
        checkWinner(); 
    })
});

// const checkWinner = () => {
//     for (let pattern of winPatterns){

//         let pos1 = boxes[pattern[0]].innerText;
//         let pos2 = boxes[pattern[1]].innerText;
//         let pos3 = boxes[pattern[2]].innerText;

//         if (pos1 != "" && pos2 != "" && pos3 != "")
//         {
//             if (pos1 === pos2 && pos2 === pos3)
//             {   
//                 console.log("winner");
//                 showWinner(pos1);
//             }
//         }
//     }
// }

const checkWinner = () => {
    let winnerFound = false;

    // Check if there is a winner
    for (let pattern of winPatterns){

        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 != "" && pos2 != "" && pos3 != "")
        {
            if (pos1 === pos2 && pos2 === pos3)
            {   
                console.log("winner");
                showWinner(pos1);
                winnerFound = true;
                break;                           // stop checking further patterns if there's a winner
            }
        }
    }
    if (!winnerFound) {
        let allBoxesFilled = true;
        boxes.forEach((box) => {
            if (box.innerText === "") {
                allBoxesFilled = false;
            }
        });
        if (allBoxesFilled) {
            showDraw();
        }
    }
}

const showWinner = (winner) => {
    msg.innerText = `Congratulations! \n Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const showDraw = () => {
    msg.innerText = "It's a Draw!";
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const disableBoxes = () => {
    for(let box of boxes)
    {
        box.disabled = true;
    }
}

newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

const enableBoxes = () => {
    for(let box of boxes)
    {
        box.disabled = false;
        box.innerText = "";
    }
}