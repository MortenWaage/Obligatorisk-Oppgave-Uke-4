class Invader
{
    constructor(_x, _y, _id, _invaderOffset)
    {
        this.id = _id;
        this.x = _x;
        this.y = _y;
        this.width = 32;
        this.direction = 1;
        this.invaderSpeed = 40;
        this.invaderOffset = _invaderOffset;

        this.forwardMovement = 0;

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
        if (this.x > this.maxRight + this.invaderOffset && !this.canMoveDown) 
        {
            this.canMoveDown = true;
            this.direction = -1;

            this.y += this.width;
            this.x += this.invaderSpeed;     
            
            this.checkIfInvaded();
        }

        else if (this.x < this.maxLeft + this.invaderOffset && this.canMoveDown)
        {
            this.canMoveDown = false;
            this.direction = 1;

            this.y += this.width;
            this.x -= this.invaderSpeed;
        }
    }

    destroyInvader()
    {
        this.element.remove();
    }

    checkIfInvaded()
    {
        if (this.y + this.width > gameHeight)
        {
            return true;
        }     
    }
}