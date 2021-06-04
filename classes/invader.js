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

        this.sIndex = Math.round(Math.random() * 3);
        this.spriteIndex = ["sprites/inv1.png", "sprites/inv2.png", "sprites/inv3.png", "sprites/invattack.png"];
        this.skipFrame = 0;

        this.spawnInvader();
        this.updateInvader();
    }

    
    changeState(customFrame)
    {
        if (this.skipFrame > 0) { this.skipFrame--; return; 
        }  
        this.sIndex += 1;
        if (this.sIndex > 2) this.sIndex = 0;

        if (customFrame > 2)
        {
            this.skipFrame = 3;
            this.sIndex = customFrame;
        }

        this.element.src = this.spriteIndex[this.sIndex];
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
        newImg.src = "sprites/inv1.png";

        newImg.style.width = getPixels(this.width);
        newImg.style.height = getPixels(this.width);
        
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