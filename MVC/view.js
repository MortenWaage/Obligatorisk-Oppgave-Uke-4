function updateView()
{
    document.getElementById("infoBoard").innerHTML =
    `   <div>Informasjon:</div><p></p>
        <div id="Avfyrte skudd">Du har avfyrt ${shotsFired} skudd</div>
        <div id="Skutt Ned skudd">Du har skutt ned ${invadersKilled} invader${aboveOne}</div>
        <div id="ShotsMissed">${shotString}</div>`
}