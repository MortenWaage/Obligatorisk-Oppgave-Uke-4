class Invader
{
    constructor(_x, _y, _invaderOffset, forceWidth, forceForward)
    {
        this.id = _x; // 1-2-3 osv

        
        this.width = 32;
        this.direction = 1;
        this.invaderSpeed = 40;
        this.invaderOffset = this.width * _x + (_invaderOffset * _x);
        
        this.invaderForceLeft = (gameWidth / 2) - ((forceWidth * (this.width + _invaderOffset) / 2) );

        this.x = this.invaderForceLeft + (this.width * _x) + (_invaderOffset * _x);
        this.y = forceForward + (this.width*_y) + (_invaderOffset*_y);

        this.forwardMovement = 0;

        this.maxLeft = gameAreaOffset;
        this.maxRight = 500;

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
        if (this.x > this.maxRight + this.invaderOffset && !this.alternateForwardMove) 
        {
            this.alternateForwardMove = true;
            this.direction = -1;

            this.y += this.width;
            this.x += this.invaderSpeed;     
            
            this.checkIfInvaded();
        }

        else if ( this.x < this.maxLeft + this.invaderOffset + this.width && this.alternateForwardMove)
        {
            this.alternateForwardMove = false;
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