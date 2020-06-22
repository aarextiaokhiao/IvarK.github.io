function detectInfinite(part) {
	if (part !== undefined) return isNaN(Decimal.log10(part))
	return detectInfinite(player.money) || detectInfinite(player.infinityPoints) || detectInfinite(player.eternityPoints) || detectInfinite(player.dilation.dilatedTime)
}

var infiniteDetected = false
var infiniteCheck = false
var infiniteCheck2 = false
var infiniteSave
function isInfiniteDetected() {
	if (infiniteDetected) return
	if (detectInfinite()) {
		infiniteDetected = true
		exportInfiniteSave()
		reload()
		infiniteDetected = false
		if (document.getElementById("welcome").style.display != "flex") document.getElementById("welcome").style.display = "flex"
		if (infiniteCheck2) document.getElementById("welcomeMessage").innerHTML = "Sorry, but multiple Infinite bugs have occurred on this save, causing this save to be hard reset to prevent any Infinite bug loops. You can export your save before this reset and post it so that we could potentially fix the problem. Thanks! :)"
		else {
			document.getElementById("welcomeMessage").innerHTML = "It seems you have encountered an Infinite bug, causing the game to not work properly. Your save has been converted to the last known save. It is recommended to post the save that has the Infinite bug so we could potentially fix the problem in the NG+3 Discord server. Thanks! :)"
			infiniteCheck2 = true
		}
		return true
	}
}

function exportInfiniteSave() {
	infiniteSave = btoa(JSON.stringify(player))
	document.getElementById("bugExport").style.display = ""
	bugExport()
}

function bugExport() {
	let output = document.getElementById('output');
	let parent = output.parentElement;

	parent.style.display = "";
	output.value = infiniteSave;

	output.onblur = function() {
		parent.style.display = "none";
	}

	output.focus()
	output.select()

	try {
		if (document.execCommand('copy')) {
			$.notify("Exported to clipboard", "info");
			output.blur()
			output.onblur()
		}
	} catch(ex) {
		// well, we tried.
	}
}