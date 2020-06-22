function checkForExpertMode() {
	if (!metaSave.ngp4) return
	if (metaSave.ngp3ex) return
	console.log("EXPERT MODE UNLOCKED!")
	metaSave.ngp3ex = true
	if (document.getElementById("welcome").style.display != "flex") document.getElementById("welcome").style.display = "flex"
	else player.aarexModifications.popUpId = ""
	document.getElementById("welcomeMessage").innerHTML = "As you unlock the capability to big rip the universe, a space crystal collides with reality and creates an alternate universe where everything is more difficult. In addition to unlocking NG+4, you unlocked NG+3 Expert Mode! Check it in the mods tab of your load options."
	localStorage.setItem(metaSaveId,btoa(JSON.stringify(metaSave)))
}