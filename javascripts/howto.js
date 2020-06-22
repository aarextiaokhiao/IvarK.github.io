var player = {};

function changestate(n) {
    var classes = document.getElementById('div'+n).classList
    if(classes.contains('hidden')){
		classes.remove('hidden');
	    classes.add('shown');
	}
    else{
		classes.remove('shown');
		classes.add('hidden');
	}
}

if (localStorage.getItem("howToSpoilers") !== null) var spoilers = parseInt(localStorage.getItem("howToSpoilers"))
else var spoilers = 0

if (spoilers === 0) document.getElementById("showspoilersbtn").innerHTML = "View: <br> Avoid spoilers"
else document.getElementById("showspoilersbtn").innerHTML= "View: <br> Show spoilers"

function save() {
	localStorage.setItem("howToSpoilers", spoilers)
}

function get_save(id) {
    try {
        var dimensionSave = localStorage.getItem(btoa('dsAM_ghostify_'+id))
        if (dimensionSave !== null) dimensionSave = JSON.parse(atob(dimensionSave, function(k, v) { return (v === Infinity) ? "Infinity" : v; }))
        return dimensionSave
    } catch(e) { console.log("Fuck IE"); }
}

function load_game() {
	metaSave = localStorage.getItem('AD_aarexModifications_ghostify')
	if (metaSave == null) metaSave = {}
	else metaSave = JSON.parse(atob(metaSave))
	if (metaSave.current == undefined) {
		metaSave.current = 1
		metaSave.saveOrder = [1]
	}
	player = get_save(metaSave.current)
}

function showspoilers() {
	if (spoilers === 0) {
		spoilers = 1;
		document.getElementById("showspoilersbtn").innerHTML= "View: <br> Show spoilers"
	} else {
		spoilers = 0;
		document.getElementById("showspoilersbtn").innerHTML = "View: <br> Avoid spoilers"
	}
	save()
	updateSpoilers();
}

function updateSpoilers() {
	var displayed = spoilers;
	document.getElementById("ng3pguide").style.display=player.masterystudies||spoilers?"":"none"
	for (i=41; i>0; i--) {
		if (i != 7) {
			if (!displayed) {
				if (i < 5) displayed = 1
				else if (player) {
					if (i == 5 && player.resets > 4) displayed = 1
					if (i == 9 && player.achievements.includes("r21")) displayed = 1
					if (i == 10 && player.achievements.includes("r41")) displayed = 1
					if (i == 11 && player.infDimensionsUnlocked[0]) displayed = 1
					if (i == 12 && player.postChallUnlocked > 0) displayed = 1
					if (i == 13 && player.replicanti.unlocked) displayed = 1
					if (i == 17 && player.achievements.includes("r96")) displayed = 1
					if (i == 18 && (player.eternityChallUnlocked > 0 || player.eternityChalls.eterc1)) displayed = 1
					if (i == 19 && player.dilation.studies.includes(1)) displayed = 1
					if (i == 20 && player.dilation.studies.includes(6)) displayed = 1
					if (i == 22 && player.quantum) if (player.quantum.times>0) displayed = 1
					if (player.masterystudies) {
						if (i == 21 && player.dilation.upgrades.includes("ngpp4")) displayed = 1
						if (i == 23 && player.quantum) if (player.quantum.times > 0) displayed = 1
						if (i == 24 && player.masterystudies.includes("d7")) displayed = 1
						if (i == 25 && player.masterystudies.includes("d8")) displayed = 1
						if (i == 26 && player.masterystudies.includes("d9")) displayed = 1
						if (i == 27 && player.masterystudies.includes("d10")) displayed = 1
						if (i == 28 && player.masterystudies.includes("d11")) displayed = 1
						if (i == 29 && player.masterystudies.includes("d12")) displayed = 1
						if (i == 30 && player.masterystudies.includes("d13")) displayed = 1
						if (i == 31 && player.masterystudies.includes("d14")) displayed = 1
						if (i == 32 && player.quantum) if (player.quantum.breakEternity) if (player.quantum.breakEternity.unlocked) displayed = 1
						if (i == 36 && player.ghostify) if (player.ghostify.times > 0) displayed = 1
						if (i == 37 && player.ghostify && player.ghostify.ghostlyPhotons) if (player.ghostify.ghostlyPhotons.unl) displayed = 1
						if (i == 40 && player.ghostify && player.ghostify.wzb && player.ghostify.wzb.unl) displayed = 1
						if (i == 41 && player.ghostify && player.ghostify.hb && player.ghostify.hb.times) displayed = 1
					}
				}
			}
			if (displayed) {
				if (i == 22) {
					var msg = "When you reach "
					if (player.masterystudies) msg += "9.32e446 meta-antimatter and complete EC14 for the first time"
					else msg += "infinity meta-antimatter"
					msg += ", you will able to go quantum. Quantum will reset everything eternity resets, including time studies, eternity challenges, dilation, "+(player.masterystudies?"meta dimensions, and mastery studies":"and meta dimensions (except your best meta-antimatter)")+". You will gain a quark and unlock various upgrades."
					if (player.masterystudies) msg += "<br><br>You will also unlock speedrun milestones where you must do fast quantums to get quality of life content rewards to speed up runs and automate certain features."
					document.getElementById("div22").innerHTML = msg
				}
			} else document.getElementById("div"+i).className = "hidden";
			document.getElementById("div"+i+"btn").style.display = displayed ? "block" : "none";
			document.getElementById("div"+i+"hr").style.display = displayed ? "block" : "none";
		}
	}
}

document.getElementById("importbtn").onclick = function () {
    var save_data = prompt("Input your save.");
	save_data = JSON.parse(atob(save_data), function(k, v) { return (v === Infinity) ? "Infinity" : v; });
	if (!save_data) {
		alert('could not load the save..');
		return;
	}
	player = save_data;
	updateSpoilers()
};

load_game();
save()
updateSpoilers()
