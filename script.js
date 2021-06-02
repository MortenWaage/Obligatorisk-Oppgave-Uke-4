var gameArea;

const gameWidth = 800;
const gameHeight = 600;

var player;
var invaders = [];
var missiles = [];
const invaderCount = 24;
const invaderRows = 4;

const playerSpeed = 2;




function Awake()
{
    document.addEventListener("keydown", GetPlayerInput);
    gameArea = document.getElementById("gameArea");

    runGameSetup();

    setInterval(invaderTicker, 1000);
    setInterval(missileTicker, 50);
}




function invaderTicker()
{
    for (i = 0; i < invaderCount; i++)
    {
        invaders[i].moveInvaders();
    }
}



function missileTicker()
{
    for (m = 0; m < missiles.length; m++)
    {
        if (missiles[m].element == null)
        {
            missiles.splice(m,1);
        }
        else
            missiles[m].moveForward();
    }

    checkCollisions();
}




function runGameSetup()
{
    player = new Player(document.getElementById("player"), gameWidth/2-16, gameHeight-32);

    for (i = 0; i < invaderCount/invaderRows; i++)
    {
        for (r = 0; r < invaderRows; r++)
        {
            let newInvader = new Invader(260 + (32*i) + (15*i), 200 + (32*r) + (15*r), i, (32*i) + (15*i));
            invaders.push(newInvader);           
        }
    }    
}





function getPixels(coord)
{
    return coord.toString() + "px";
}





function GetPlayerInput(e)
{
    let direction = 0;

    if (e.code == "ArrowLeft")
    {
        direction -= 1;
    }

    else if (e.code == "ArrowRight")
    {
        direction += 1;
    }

    if (e.code == "Space")
    {
        let newMissile = new Missile(missiles.length+1, player.x, player.y, -1);
        missiles.push(newMissile);
    }

    player.movePlayer(direction);
}





function checkCollisions()
{
    //console.log("Looping through collisions");
    for (i = 0; i < invaders.length; i++)
    {
        for (m = 0; m < missiles.length; m++)
        {
            checkIfCollided(invaders[i], missiles[m]);
        }
    }
}





function checkIfCollided(invader, missile)
{
    //console.log("Checking Collision between: Invader:" + _invader.id + " and Missile:" + _missile.id);
    if (missile.x > invader.x && missile.x < invader.x + 32 &&
        missile.y > invader.y && missile.y < invader.y + 32)
        {
            invader.element.style.width = 0;
            invader.element.style.height = 0;
            //missile.destroyMissile();
        }        
}