function addShot()
{
    shotsFired++;

    updateView();
}





function checkMissedShots(type, yPos)
{
    if (checkType(type))
        destroyedShots++


    if (yPos <= 0)
        shotsMissed++;
    
    if (shotsMissed > 0)
        shotString = `Du har bommet på ${shotsMissed} skudd`;

    if (shotsFired == invadersKilled && shotsFired > 0)  
        shotString = "Alle skudd har truffet";
    
    updateView();
}





function checkType(type)
{
    if (type == -1) return true
    else return false;
}





function checkInvaderKills()
{
    invadersKilled++;

    if(invadersKilled > 0 && invadersKilled < 2)
        aboveOne = "";
    else
        aboveOne = "s";

    updateView();
}