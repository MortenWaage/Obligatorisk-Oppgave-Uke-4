var gameArea;

const gameWidth = 800;
const gameHeight = 600;
var gameAreaOffset;

var player;
var invaders = [];
var missiles = [];
var missileLock;

const invaderCount = 24;
const invaderRows = 4;

const playerSpeed = 2;
const playerSize = 64;

var gameOver = true;
var infoScreen;




function Awake()
{
    infoScreen = document.getElementById("info");
    gameAreaOffset = document.getElementById("gameArea").getBoundingClientRect().left;

    document.addEventListener("keydown", GetPlayerInput);
    gameArea = document.getElementById("gameArea");

    runGameSetup();

    setInterval(invaderTicker, 1000);
    setInterval(missileTicker, 50);

    startGame(3);
}

function startGame(count)
{
    if (count == 0)
    {
        gameOver = false;
        infoScreen.innerHTML = "";
        return;
    }

    infoScreen.innerHTML = count.toString();
    setTimeout(startGame, player.missileCooldown, count-1)

}




function invaderTicker()
{
    if (gameOver) return;

    let invaderCanShoot = true;

    for (i = invaderCount-1; i >= 0; i--)
    {
        if (invaders[i] != null)
        {
            invaders[i].moveInvaders();
        
            if (invaders[i].x > player.x && invaders[i].x < player.x + player.width && invaderCanShoot)
            {
                fireMissile(invaders[i], 1);
                invaderCanShoot = false;
            }
        }
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
    player = new Player(document.getElementById("player"), gameWidth/2-playerSize, gameHeight-(playerSize+10));

    for (i = 0; i < invaderCount/invaderRows; i++)
    {
        for (r = 0; r < invaderRows; r++)
        {
            let newInvader = new Invader(260 + (32*i) + (15*i), 100 + (32*r) + (15*r), i, (32*i) + (15*i));
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
    if (gameOver) return;

    let direction = 0;

    if (e.code == "ArrowLeft")
    {
        direction -= 1;
    }

    else if (e.code == "ArrowRight")
    {
        direction += 1;
    }

    if (e.code == "Space" && !missileLock)
    {

        fireMissile(player, -1);
        missileLock = true;
        setTimeout(unlockWeapon, player.missileCooldown)
    }

    player.movePlayer(direction);
}


function fireMissile(source, type)
{
    let newMissile = new Missile(missiles.length+1, source.x+source.width/2, source.y, type);
    missiles.push(newMissile);        
}


function unlockWeapon()
{
    missileLock = false;
}



function checkCollisions()
{
    //console.log("Looping through collisions");
    for (i = 0; i < invaders.length; i++)
    {
        for (m = 0; m < missiles.length; m++)
        {
            checkIfCollided(invaders[i], missiles[m], i, m);
        }
    }
}





function checkIfCollided(invader, missile, invaderIndex, missileIndex)
{
    if (gameOver) return;

    if (missile.type == -1)
    {
    if (missile.x > invader.x && missile.x < invader.x + invader.width &&
        missile.y > invader.y && missile.y < invader.y + invader.width)
        {
            invader.element.style.width = 0;
            invader.element.style.height = 0;

            missiles.splice(missileIndex,1);
            invaders.splice(invaderIndex, 1);

            missile.destroyMissile();
            invader.destroyInvader();

            if (invaders.length == 0)
            infoScreen.innerHTML = "VICTORY";
        }
    }
    else
    {
        if (missile.x > player.x && missile.x < player.x + player.width &&
            missile.y > player.y && missile.y < player.y + player.width)
        {
            missile.destroyMissile();
            player.destroyPlayer();

            gameOver = true;

            infoScreen.innerHTML = "GAME OVER";

        }
    }        
}