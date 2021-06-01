class Invader
{
    constructor(_x, _y, _id)
    {
        this.id = _id;
        this.x = _x;
        this.y = _y;

        this.spawnInvader();
        this.updatePlayer();
    }

    updatePlayer()
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
}