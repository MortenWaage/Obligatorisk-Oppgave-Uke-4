class Player
{
    constructor(_element, _x, _y)
    {
        this.element = _element;
        this.x = _x;
        this.y = _y;
        this.width = 64;
        this.playerSpeed = 30;
        this.missileCooldown = 1000; //miliseconds
        this.element.style.width = getPixels(this.width);
        this.element.style.height = getPixels(this.width);

        this.sIndex = 0;
        this.spriteIndex = ["sprites/playerShoot.png", "sprites/playerCantShoot.png"];
        this.element.src = this.spriteIndex[this.sIndex];
        this.updatePlayer();
    }

    changeState()
    {
        this.sIndex = 1-this.sIndex;
        this.element.src = this.spriteIndex[this.sIndex];
    }

    movePlayer(direction)
    {
        this.x += direction * this.playerSpeed;

        if (this.x < gameAreaOffset) this.x = gameAreaOffset;
        if (this.x > gameAreaOffset+gameWidth-this.width) this.x = gameAreaOffset+gameWidth-this.width;

        this.updatePlayer();
    }
    updatePlayer()
    {
        this.element.style.left = getPixels(this.x);
        this.element.style.top = getPixels(this.y);
    }

    destroyPlayer()
    {
        this.element.remove();
        player = null;
    }
}