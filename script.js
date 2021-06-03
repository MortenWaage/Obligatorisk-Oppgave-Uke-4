var gameArea;
var gameAreaOffset;

const gameVolume = 0.2;
const gameWidth = 800;
const gameHeight = 600;

const invaderCount = 24;
const invaderRows = 4;

const playerSpeed = 2;
const playerSize = 64;

var player;
var invaders = [];
var missiles = [];
var missileLock;

var gameOver = true;
var isStarted = false;
var infoScreen;

/// AUDIO
const shoot = document.getElementById("shoot");
const impact = document.getElementById("impact");
const death = document.getElementById("death");
const music = document.getElementById("music");
const fanfare = document.getElementById("fanfare");


function Awake()
{
    document.addEventListener("keydown", GetPlayerInput);

    infoScreen = document.getElementById("info");
    gameArea = document.getElementById("gameArea");
    gameAreaOffset = document.getElementById("gameArea").getBoundingClientRect().left;

    runGameSetup();

    setInfoDisplay("SPACEBAR TO START");    

    setInterval(invaderTicker, 1000);
    setInterval(missileTicker, 50);    
}





function runGameSetup()
{
    player = new Player(document.getElementById("player"), gameWidth/2-playerSize, gameHeight-(playerSize+10));

    for (i = 0; i < invaderCount/invaderRows; i++)
    {
        for (r = 0; r < invaderRows; r++)
        {
            //let newInvader = new Invader(260 + (32*i) + (15*i), 100 + (32*r) + (15*r), i, (32*i) + (15*i));
            let newInvader = new Invader(i, r, 15, invaderCount/invaderRows, 100);
            invaders.push(newInvader);
        }
    }    
}





function startGame(count)
{
    if (count == 0)
    {
        gameOver = false;  
        setInfoDisplay("");      
        return;
    }

    infoScreen.innerHTML = count.toString();
    setTimeout(startGame, player.missileCooldown, count-1)
    
}





function setInfoDisplay(string)
{
    infoScreen.innerHTML = string;
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

            if (invaders[i].checkIfInvaded())
                endGame();

            
            if (invaderAbovePlayer(invaders[i]) && invaderCanShoot)
            {
                fireMissile(invaders[i], 1);
                invaderCanShoot = false;
            }
        }
    }
}





function invaderAbovePlayer(invader)
{
    if (invader.x > player.x && invader.x < player.x + player.width) return true;
    else return false;
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





function getPixels(coord)
{
    return coord.toString() + "px";
}





function GetPlayerInput(e)
{
    if (!isStarted)
    {
        if (e.code == "Space")
        {
            playMusic();
            isStarted = true;
            startGame(3);            
        }
    }

    if (gameOver) return;

    let direction = 0;

    if (e.code == "ArrowLeft")
    {
        direction = -1;
    }

    else if (e.code == "ArrowRight")
    {
        direction = 1;
    }

    if (e.code == "Space" && !missileLock)
    {
        fireMissile(player, -1);
        playSound(shoot);      
    }

    player.movePlayer(direction);
}





function fireMissile(source, type)
{
    if (source == player)
    {
        missileLock = true;
        setTimeout(unlockWeapon, player.missileCooldown)
    }

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

    // -1 og 1 refererer til rettningen på missilen. Trenger ikke sjekke missiler skutt av invaders opp mot invaders, og vice versa om missilen er skutt av spilleren.
    if (missile.type == -1)
    {
        if (checkInvaderCollision(missile, invader))
        {
            missiles.splice(missileIndex,1);
            invaders.splice(invaderIndex, 1);

            missile.destroyMissile();
            invader.destroyInvader();

            playSound(impact);

            checkVictory();
        }
    }
    else if (missile.type == 1)
    {
        if (checkPlayerCollision(missile))
        {
            playSound(death);  

            missile.destroyMissile();
            player.destroyPlayer();

            endGame();
        }
    }        
}





function checkPlayerCollision(missile)
{
    if (missile.x > player.x && missile.x < player.x + player.width &&
        missile.y > player.y && missile.y < player.y + player.width)
    {
        return true;
    }
    else return false;
}





function checkInvaderCollision(missile, invader)
{
    if (missile.x > invader.x && missile.x < invader.x + invader.width &&
        missile.y > invader.y && missile.y < invader.y + invader.width)
    {
        return true
    }
    else return false;
}





function checkVictory()
{
    if (invaders.length == 0)
    {
        playSound(fanfare);
        setInfoDisplay("VICTORY");
    }

}





function endGame()
{
    gameOver = true;
    setInfoDisplay("GAME OVER");
}





function playSound(sound)
{
    sound.volume = gameVolume;
    sound.currentTime = 0;
    sound.play();
}


function playMusic()
{
    music.volume = gameVolume;
    music.currentTime = 0;
    music.loop = true;
    music.play();
}