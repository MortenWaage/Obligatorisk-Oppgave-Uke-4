class Missile
{
    constructor(_id, _x, _y, _type)
    {
        this.id = _id;
        this.width = 4;

        this.x = _x - this.width;
        this.y = _y;
        
        this.invaderSpeed = 15;
        this.speed = 15;
        this.type = _type;

        if (this.type == 1)
            this.speed = this.invaderSpeed;

        this.spawnMissile();
        this.updateMissile();
    }

    updateMissile()
    {
        this.element.style.left = getPixels(this.x);
        this.element.style.top = getPixels(this.y);
    }

    spawnMissile()
    {
        var newMissile = document.createElement('img');
        newMissile.classList.add("gameObject");
        newMissile.id = this.id;
        newMissile.src = "sprites/missile.png";

        newMissile.style.width = "4px";
        newMissile.style.height = "15px";

        this.element = newMissile;
        document.getElementById("missiles").appendChild(newMissile);
    }

    moveForward()
    {
        this.y += this.speed * this.type;

        this.updateMissile();
        this.checkScreenPosition();
    }

    checkScreenPosition()
    {
        if (this.y < 0 && this.type == -1)
        {
            this.destroyMissile();
        }
        if (this.y > 600 && this.type == 1)
        {
            this.destroyMissile();
        }
    }

    destroyMissile()
    {
        this.element.remove();
    }
}