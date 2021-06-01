var gameArea;

const gameWidth = 800;
const gameHeight = 600;

var player;
var invaders = [];
const invaderCount = 24;
const invaderRows = 4;

function Awake()
{
    document.addEventListener("keydown", GetPlayerInput);
    gameArea = document.getElementById("gameArea");

    runGameSetup();
}


function runGameSetup()
{
    player = new Player(document.getElementById("player"), gameWidth/2-16, gameHeight-32);

    for (i = 0; i < invaderCount/invaderRows; i++)
    {
        for (r = 0; r < invaderRows; r++)
        {
            let newInvader = new Invader(260 + (32*i) + (15*i), 200 + (32*r) + (15*r), i);
            invaders.push(newInvader);           
        }

    }
    
    
}

function getPixels(coord)
{
    return coord.toString() + "px";
}

function GetPlayerInput()
{

}