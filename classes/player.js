class Player
{
    constructor(_element, _x, _y)
    {
        this.element = _element;
        this.x = _x;
        this.y = _y;

        this.updatePlayer();
    }

    updatePlayer()
    {
        this.element.style.left = getPixels(this.x);
        this.element.style.top = getPixels(this.y);
    }
}