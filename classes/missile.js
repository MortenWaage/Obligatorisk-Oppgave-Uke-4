class Missile
{
    constructor(_id, _x, _y, _type)
    {
        this.id = _id;
        this.x = _x;
        this.y = _y;
        this.speed = 15;
        this.type = _type;

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
        if (this.y < 0)
        {
            this.destroyMissile();
        }
    }

    destroyMissile()
    {
        this.element.remove();
    }

}