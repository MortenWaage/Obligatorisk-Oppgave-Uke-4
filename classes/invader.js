class Invader
{
    constructor(_x, _y, _id, _invaderOffset)
    {
        this.id = _id;
        this.x = _x;
        this.y = _y;
        this.direction = 1;
        this.invaderSpeed = 20;
        this.invaderOffset = _invaderOffset;

        this.maxLeft = 100;
        this.maxRight = 400;

        this.spawnInvader();
        this.updateInvader();
    }

    updateInvader()
    {
        this.element.style.left = getPixels(this.x);
        this.element.style.top = getPixels(this.y);
    }

    spawnInvader()
    {
        var newImg = document.createElement('img');
        newImg.classList.add("gameObject");
        newImg.id = this.id;
        newImg.src = "sprites/invader.png";

        newImg.style.width = "32px";
        newImg.style.height = "32px";
        
        this.element = newImg;
        document.getElementById("invaders").appendChild(newImg);
    }

    moveInvaders()
    {
        this.checkDirection();

        this.x += this.invaderSpeed * this.direction;

        this.updateInvader();
    }

    checkDirection()
    {
        if (this.x > this.maxRight + this.invaderOffset) this.direction = -1;
        else if (this.x < this.maxLeft + this.invaderOffset) this.direction = 1;
    }
}