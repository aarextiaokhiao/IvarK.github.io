//test
var gameLoopIntervalId;
var Marathon = 0;
var Marathon2 = 0;
var auto = false;
var autoS = true;
var shiftDown = false;
var controlDown = false;
var justImported = false;
var saved = 0;
var painTimer = 0;
var keySequence = 0;
var keySequence2 = 0;
var failureCount = 0;
var implosionCheck = 0;
var break_infinity_js = false
var forceHardReset = false
var player
var metaSave = null
var modes = {}
var gameSpeed = 1

function setupFooterHTML() {
	var html = "<table id='footer' style='display: table !important'><tr><td><div style='text-align: center'>" + 
			"<a href='howto.html' target='_newtab'>How to play</a> | " + 
			"<a href='about.html' target='_newtab'>About</a> | " + 
			"<a href='http://discord.gg/h9mDese' target='_newtab'>Discord</a> | " + 
			(betaId != "" ?
				(
					betaId != correctBetaId ?
					"<a href='http://raw.githack.com/aarextiaokhiao/IvarK.github.io/" + betaLink + "/'>Correct test server</a> | " :
					"<a>Test server</a> (You are currently here.) | "
				) +
				"<a href='http://discord.gg/7v82CAX'>TS: Discord</a> | "
			: "<a href='http://raw.githack.com/aarextiaokhiao/IvarK.github.io/v2.4-Gravitions/'>Test server</a> (You are here) | ") + 
			"<a href='donate.html' onclick='giveAchievement(\"A sound financial decision\")' target='_newtab'>Donate</a> | " + 
			"<a href='http://aarextiaokhiao.github.io' target='_newtab'>Aarex's Home</a>" + 
		"</div></tr></td></table>"

	var footers = document.getElementsByClassName("footer")
	for (var f = 0; f < footers.length; f++) footers[f].innerHTML = html
}

function setupAutobuyerHTMLandData(){
	getAutobuyerReduction = function() {
		return tmp.ngC ? 0.3 : 0.6
	}

	buyAutobuyer = function(id) {
   		if (player.infinityUpgradesRespecced != undefined && player.autobuyers[id].interval == 100 && id > 8) {
			if (player.autobuyers[id].bulkBought || player.infinityPoints.lt(1e4) || id > 10) return
			player.infinityPoints = player.infinityPoints.sub(1e4)
			player.autobuyers[id].bulkBought = true
			updateAutobuyers()
			return
		}
		if ((inNGM(4) && id != 11 ? player.galacticSacrifice.galaxyPoints : player.infinityPoints).lt(player.autobuyers[id].cost)) return false;
		if (player.autobuyers[id].bulk >= 1e100) return false;
		if (inNGM(4) && id != 11) player.galacticSacrifice.galaxyPoints = player.galacticSacrifice.galaxyPoints.minus(player.autobuyers[id].cost)
		else player.infinityPoints = player.infinityPoints.minus(player.autobuyers[id].cost)
		if (player.autobuyers[id].interval <= 100) {
			player.autobuyers[id].bulk = Math.min(player.autobuyers[id].bulk * 2, 1e100);
			player.autobuyers[id].cost = Math.ceil(2.4*player.autobuyers[id].cost);
			var b1 = true;
			for (let i=0;i<8;i++) {
				if (player.autobuyers[i].bulk < 512) b1 = false;
			}
			if (b1) giveAchievement("Bulked up");
		} else {
			player.autobuyers[id].interval = Math.max(player.autobuyers[id].interval * getAutobuyerReduction(), 100);
			if (player.autobuyers[id].interval > 120) player.autobuyers[id].cost *= 2; //if your last purchase wont be very strong, dont double the cost
		}
		updateAutobuyers();
	}

	getEl("buyerBtn" + 1).onclick = function () { 
		buyAutobuyer(1 - 1);
	}

	getEl("buyerBtn" + 2).onclick = function () { 
		buyAutobuyer(2 - 1);
	}

	getEl("buyerBtn" + 3).onclick = function () { 
		buyAutobuyer(3 - 1);
	}

	getEl("buyerBtn" + 4).onclick = function () { 
		buyAutobuyer(4 - 1);
	}

	getEl("buyerBtn" + 5).onclick = function () { 
		buyAutobuyer(5 - 1);
	}

	getEl("buyerBtn" + 6).onclick = function () { 
		buyAutobuyer(6 - 1);
	}

	getEl("buyerBtn" + 7).onclick = function () { 
		buyAutobuyer(7 - 1);
	}

	getEl("buyerBtn" + 8).onclick = function () { 
		buyAutobuyer(8 - 1);
	}

	getEl("buyerBtnTickSpeed").onclick = function () {
		buyAutobuyer(8);
	}

	getEl("buyerBtnDimBoost").onclick = function () {
		buyAutobuyer(9);
	}

	getEl("buyerBtnGalaxies").onclick = function () {
		buyAutobuyer(10);
	}

	getEl("buyerBtnInf").onclick = function () {
		buyAutobuyer(11);
	}

	toggleAutobuyerTarget = function(id) {
		if (player.autobuyers[id-1].target == id) {
			player.autobuyers[id-1].target = 10 + id
			getEl("toggleBtn" + id).textContent = "Buys until 10"
		} else {
			player.autobuyers[id-1].target = id
			getEl("toggleBtn" + id).textContent = "Buys singles"
		}
	}

	for (let abnum = 1; abnum <= 8; abnum ++){
		getEl("toggleBtn" + abnum).onclick = function () {
			toggleAutobuyerTarget(abnum)
		}
	}

	getEl("toggleBtnTickSpeed").onclick = function () {
		if (player.autobuyers[8].target == 1) {
			player.autobuyers[8].target = 10
			getEl("toggleBtnTickSpeed").textContent = "Buys max"
		} else {
			player.autobuyers[8].target = 1
			getEl("toggleBtnTickSpeed").textContent = "Buys singles"
		}
	}
}

function setupInfUpgHTMLandData(){
	let iut = getEl("preinfupgrades")
	for (let r = 1; r <= 4; r++) {
		let row = iut.insertRow(r - 1)
		for (let c = 1; c <= 4; c++) {
			let col = row.insertCell(c - 1)
			let id = c * 10 + r
			col.innerHTML = "<button id='infi" + id + "' onclick='INF_UPGS.normal.buy(" + id + ")'>" +
				"<span id='infi" + id+ "desc'></span>" +
				"<br>Cost: <span id='infi" + id + "cost'></span> IP" +
			"</button>"
		}
	}

	getEl("infi14desc").textContent = "Decrease the number of Dimensions needed for Dimension Boosts and Galaxies by 9."
}

function setupParadoxUpgrades(){
	var pu = getEl("pUpgs")
	for (let r = 1; r <= puSizes.y; r++) {
		let row = pu.insertRow(r - 1)
		for (let c = 1; c <= puSizes.x; c++) {
			var col = row.insertCell(c - 1)
			var id = (r * 10 + c)
			col.innerHTML = "<button id='pu" + id + "' class='infinistorebtn1' onclick='buyPU("+id+","+(r<2)+")'>"+(typeof(puDescs[id])=="function"?"<span id='pud"+id+"'></span>":puDescs[id]||"???")+(puMults[id]?"<br>Currently: <span id='pue"+id+"'></span>":"")+"<br><span id='puc"+id+"'></span></button>"
		}
	}
}

function setupPCTableHTMLandData(){
	var pcct = getEl("pccompletionstable")
	var row = pcct.insertRow(0)
	for (let c = 0; c <= 9; c++) {
		var col = row.insertCell(c)
		if (c > 0) col.textContent = "#" + c
	}
	for (let r = 1; r <= 9; r++) {
		row = pcct.insertRow(r)
		for (let c = 0; c <= 9; c++) {
			var col = row.insertCell(c)
			if (c < 1) col.textContent = "#" + r
			else if (c == r) {
				col.id = "qcC" + r
			} else col.id = "pc" + r + c
		}
	}
}

function setupDimensionsHTML() {
	var ndsDiv = getEl("parent")
	for (let d = 1; d <= 8; d++) {
		var row = ndsDiv.insertRow(d - 1)
		row.id = d + "Row"
		row.style["font-size"] = "15px"
		row.innerHTML = '<td class="rel" id="D' + d + '" align="right" width="32%"> </td>' +
			'<td id="A' + d + '"></td>' +
			'<td align="right" width="10%"><button id="B' + d + '" style="color:black; height: 25px; font-size: 10px; width: 135px" class="storebtn" onclick="buyOneDimension(' + d + ')"></button></td>' +
			'<td align="right" width="10%"><button id="M' + d + '" style="color:black; width:210px; height: 25px; font-size: 10px" class="storebtn" onclick="buyManyDimension(' + d + ')"></button></td>' +
			'<td id="CondenseDiv'+d+'" align="right" width="10%"><button id="Condense' + d + '" style="color:black; width:210px; height: 25px; font-size: 10px" class="storebtn" onclick="ngC.condense.nds.buy(' + d + ')"></button></td>'
	}

	var idsDiv = getEl("idTable")
	for (let d = 1; d <= 8; d++) {
		var row = idsDiv.insertRow(d - 1)
		row.id = "infRow" + d
		row.style["font-size"] = "16px"
		row.innerHTML = '<td id="infD' + d + '" width="41%"></td>' +
			'<td id="infAmount' + d + '"></td>' +
			'<td><button id="infauto' + d + '" style="width:70px; font-size: 10px; float: right; visibility: hidden" onclick="switchAutoInf(' + d + ')" class="storebtn"></button></td>' +
			'<td align="right" width="10%"><button id="infMax' + d + '" style="color:black; width:195px; height:30px" class="storebtn" align="right" onclick="buyManyInfinityDimension(' + d + ')"></button></td>' +
			'<td id="infCndCont' + d + '" align="right" width="10%"><button id="infCnd' + d + '" style="color:black; width:195px; height:30px" class="storebtn" align="right" onclick="ngC.condense.ids.buy(' + d + ')"></button></td>'
	}

	var tdsDiv = getEl("tdTable")
	for (let d = 1; d <= 8; d++) {
		var row = tdsDiv.insertRow(d - 1)
		row.id = "timeRow" + d
		row.style["font-size"] = "17px"
		row.innerHTML = '<td id="timeD' + d + '" width="43%"></td>' +
			'<td id="timeAmount' + d + '"></td>' +
			'<td><button id="td' + d + 'auto" style="width:70px; font-size: 10px; float: right; visibility: hidden" onclick="toggleAutoEter(\'td' + d + '\')" class="storebtn"></button></td>' +
			'<td align="right" width="10%"><button id="timeMax' + d + '" style="color:black; width:195px; height:30px" class="storebtn" align="right" onclick="buyTimeDimension(' + d + ')"></button></td>' +
			'<td id="timeCndCont' + d + '" align="right" width="10%"><button id="timeCnd' + d + '" style="color:black; width:195px; height:30px" class="storebtn" align="right" onclick="ngC.condense.tds.buy(' + d + ')"></button></td>'
	}

	var pdsDiv = getEl("pdTable")
	for (let d = 1; d <= 8; d++) {
		var row = pdsDiv.insertRow(d-1)
		row.id = "pR" + d
		row.style["font-size"] = "16px"
		row.innerHTML = '<td id="pD' + d + '" width="41%"></td>' +
			'<td id="pA' + d + '"></td>' +
			'<td align="right" width="10%"><button id="pB'+d+'" style="color:black; width:195px; height:30px" class="storebtn" align="right" onclick="buyPD('+d+')"></button></td></tr>'
	}

	var edsDiv = getEl("empDimTable")
	for (let d = 1; d <= 8; d++) {
		var row=edsDiv.insertRow(d - 1)
		row.id = "empRow" + d
		row.style["font-size"] = "15px"
		row.innerHTML = '<td id="empD' + d + '" width="41%"></td>' +
			'<td id="empAmount' + d + '"></td>' +
			'<td><span class="empQuarks" id="empQuarks' + d + '">0</span> preons/s</td>' +
			'<td align="right" width="2.5%"><button id="empFeedMax' + d + '" style="color:black; width:70px; font-size:10px" class="storebtn" align="right" onclick="feedReplicant('+d+', true)">Max</button></td>' +
			'<td align="right" width="7.5%"><button id="empFeed' + d + '" style="color:black; width:195px; height:25px; font-size:10px" class="storebtn" align="right" onclick="feedReplicant('+d+')">Feed (0%)</button></td>'
	}
}

function setupToDHTMLandData(){
	for (var c = 0; c < 3; c++) {
		var color = (["red", "green", "blue"])[c]
		var shorthand = (["r", "g", "b"])[c]
		var branchUpgrades = ["Gain <span id='" + color + "UpgPow1'></span>x " + color + " quark spins, but " + color + " quarks decay <span id='" + color + "UpgSpeed1'></span>x faster.",
				      "The gain of " + color + " <span id='" + color + "UpgName2'></span> quarks is multiplied by x and then raised to the power of x.",
				      (["Red", "Green", "Blue"])[c]+" <span id='" + color + "UpgName3'></span> quarks decay<span id='" + color + "UpgEffDesc'> 4x</span> slower."] //might need to change this to just "slower" once we have 1000+ upgrade 3's

		var html = 'You have <span class="' + color + '" id="' + color + 'QuarksToD" style="font-size: 35px">0</span> ' + color + ' quarks.<br>'
		html += '<button class="storebtn" id="' + color + 'UnstableGain" style="width: 240px; height: 80px" onclick="unstableQuarks(\'' + shorthand + '\')"></button><br>'
		html += 'You have <span class="' + color + '" id="' + color + 'QuarkSpin" style="font-size: 35px">0.0</span> ' + color + ' quark spin.<br>'
		html += '<span class="' + color + '" id="' + color + 'QuarkSpinProduction" style="font-size: 25px">+0/s</span><br>'
		html += "You have <span class='" + color + "' id='" + color + "UnstableQuarks' style='font-size: 35px'>0</span> " + color + " <span id='" + shorthand + "UQName'></span> quarks.<br>"
		html += "<span id='" + color + "QuarksDecayRate'></span>.<br>"
		html += "They will last <span id='" + color + "QuarksDecayTime'></span>."
		getEl("todRow").insertCell(c).innerHTML = html
		getEl("todRow").cells[c].className = shorthand + "qC"
		
		html = "<table class='table' align='center' style='margin: auto'><tr>"
		for (var u = 1; u <= 3; u++) {
			html += "<td style='vertical-align: 0'><button class='gluonupgrade unavailablebtn' id='" + color + "upg" + u + "' onclick='buyBranchUpg(\"" + shorthand + "\", " + u + ")' style='font-size:10px'>" + branchUpgrades[u - 1] + "<br>" 
			html += "Currently: <span id='" + color + "upg" + u + "current'>1</span>x<br><span id='" + color + "upg" + u + "cost'>?</span></button>"
			html += (u == 2 ? "<br><button class='storebtn' style='width: 190px' onclick='maxBranchUpg(\"" + shorthand + "\")'>Max all upgrades</button>" + "<br><button class='storebtn' style='width: 190px; font-size:10px' onclick='maxBranchUpg(\"" + shorthand + "\", true)'>Max 2nd and 3rd upgrades</button>":"")+"</td>"
		}
		html += "</tr></tr><td></td><td><button class='gluonupgrade unavailablebtn' id='" + shorthand + "RadioactiveDecay' style='font-size:9px' onclick='radioactiveDecay(\"" + shorthand + "\")'>Reset to strengthen the 1st upgrade, but nerf this branch.<br><span id='" + shorthand + "RDReq'></span><br>Radioactive Decays: <span id='" + shorthand + "RDLvl'></span></button></td><td></td>"
		html += "</tr></table>"
		getEl(color + "Branch").innerHTML = html
	}
}

function setupNanofieldHTMLandData(){
	var nfRewards = getEl("nfRewards")
	var row = 0
	for (var r = 1; r <= 8; r += 2) {
		nfRewards.insertRow(row).innerHTML = 
			"<td id='nfRewardHeader" + r + "' class='milestoneText'></td>" +
			"<td id='nfRewardHeader" + (r + 1) + "' class='milestoneText'></td>"
		row++
		nfRewards.insertRow(row).innerHTML = 
			"<td id='nfRewardTier" + r + "' class='milestoneTextSmall'></td>" +
			"<td id='nfRewardTier" + (r + 1) + "' class='milestoneTextSmall'></td>"
		row++
		nfRewards.insertRow(row).innerHTML = 
			"<td><button class='nfRewardlocked' id='nfReward" + r + "'></button></td>" +
			"<td><button class='nfRewardlocked' id='nfReward" + (r + 1) + "'></button></td>"
		row++
	}
	getEl("nfReward7").style["font-size"] = "10px"
	getEl("nfReward8").style["font-size"] = "10px"
}

function setupQuantumChallenges(){
	var modDiv = ""
	for (var m = 0; m < qcm.modifiers.length; m++) {
		var id = qcm.modifiers[m]
		modDiv += ' <button id="qcm_' + id + '" onclick="toggleQCModifier(\'' + id + '\')" style="width: 240px">' + (qcm.names[id] || "???") + '</button><br><br>'
	}
	getEl("modifiers").innerHTML = modDiv
	var modDiv = '<button class="storebtn" id="qcms_normal" onclick="showQCModifierStats(\'\')">Normal</button>'
	for (var m = 0; m < qcm.modifiers.length; m++) {
		var id = qcm.modifiers[m]
		modDiv += ' <button class="storebtn" id="qcms_' + id + '" onclick="showQCModifierStats(\'' + id + '\')">'+(qcm.names[id] || "???")+'</button>'
	}
	getEl("modifiersStats").innerHTML=modDiv
}

function setupBraveMilestones(){
	for (var m = 1; m < 17; m++) getEl("braveMilestone" + m).textContent=getFullExpansion(tmp.bm[m - 1])+"x quantumed"
}

function setupBosonicExtraction(){
	var ben = getEl("enchants")
	for (var g2 = 2; g2 <= br.limits[maxBLLvl]; g2++) {
		var row = ben.insertRow(g2 - 2)
		row.id = "bEnRow" + (g2 - 1)
		for (var g1 = 1; g1 < g2; g1++) {
			var col = row.insertCell(g1 - 1)
			var id = (g1 * 10 + g2)
			col.innerHTML = "<button id='bEn" + id + "' class='gluonupgrade unavailablebtn' style='width: 240px; height: 120px; font-size: 10px' onclick='takeEnchantAction("+id+")'>" +
				(bEn.descs[id] || "???") + "<br>" +
				"Currently: <span id='bEnEffect" + id + "'>???</span><br><br>" +
				"<span id='bEnLvl" + id + "'></span> | <span id='bEnOn" + id + "'></span><br>" +
				"Cost: <span id='bEnG1Cost" + id + "'></span> <div class='bRune' type='" + g1 + "'></div>" + 
				" & <span id='bEnG2Cost" + id + "'></span> <div class='bRune' type='" + g2 + "'></div>" +
			"</button><br>"
		}
	}
	var toeDiv = ""
	for (var g = 1; g <= br.limits[maxBLLvl]; g++) toeDiv += ' <button id="typeToExtract' + g + '" class="storebtn" onclick="changeTypeToExtract(' + g + ')" style="width: 25px; font-size: 12px"><div class="bRune" type="' + g + '"></div></button>'
	getEl("typeToExtract").innerHTML=toeDiv
}

function setupBosonicUpgrades(){
	setupBosonicUpgReqData()
	var buTable=getEl("bUpgs")
	for (r = 1; r <= bu.limits[maxBLLvl]; r++) {
		var row = buTable.insertRow(r - 1)
		row.id = "bUpgRow" + r
		for (c = 1; c < 6; c++) {
			var col = row.insertCell(c - 1)
			var id = (r * 10 + c)
			col.innerHTML = "<button id='bUpg" + id + "' class='gluonupgrade unavailablebtn' style='font-size:" + (id == 51 || id == 52 ? 8 : 9) + "px' onclick='buyBosonicUpgrade(" + id + ")'>" + (bu.descs[id] || "???") + "<br>" +
				(bu.effects[id] !== undefined ? "Currently: <span id='bUpgEffect" + id + "'>0</span><br>" : "") +
				"Cost: <span id='bUpgCost" + id + "'></span> Bosonic Antimatter<br>" +
				"Requires: <span id='bUpgG1Req" + id + "'></span> <div class='bRune' type='" + bu.reqData[id][2] + "'></div> & <span id='bUpgG2Req" + id + "'></span> <div class='bRune' type='" + bu.reqData[id][4] + "'></div></button>"
		}
	}
}

function setupBosonicRunes(){
	var brTable=getEl("bRunes")
	for (var g = 1; g <= br.limits[maxBLLvl]; g++) {
		var col = brTable.rows[0].insertCell(g - 1)
		col.id = "bRuneCol" + g
		col.innerHTML = '<div class="bRune" type="' + g + '"></div>: <span id="bRune' + g + '"></span>'
	}
	var glyphs=document.getElementsByClassName("bRune")
	for (var g = 0 ; g < glyphs.length; g++) {
		var glyph = glyphs[g]
		var type = glyph.getAttribute("type")
		if (type > 0 && type <= br.limits[maxBLLvl]) {
			glyph.className = "bRune " + br.names[type]
			glyph.setAttribute("ach-tooltip", br.names[type] + " Bosonic Rune")
		}
	}
}

function setupHTMLAndData() {
	setupFooterHTML()
	setupDimensionsHTML()
	setupBreakInfUpgHTMLandData()
	ph.setupHTML()
	setupParadoxUpgrades()
	setupInfUpgHTMLandData()
	setupAutobuyerHTMLandData()
	setupDilationUpgradeList()
	setupMasteryStudiesHTML()
	setupPCTableHTMLandData()
	setupToDHTMLandData()
	setupNanofieldHTMLandData()
	setupQuantumChallenges()
	setupBraveMilestones()
	setupBosonicExtraction()
	setupBosonicUpgrades()
	setupBosonicRunes()
	GDs.setupHTML()
}

function updateNewPlayer(reseted) {
	if (reseted) {
		var modesChosen = {
			ngm: tmp.mod.ngmR !== undefined ? 2 : tmp.mod.newGameMinusVersion !== undefined ? 1 : 0,
			ngp: tmp.mod.ngpX ? tmp.mod.ngpX - 2 : tmp.mod.ngp4V !== undefined ? 2 : tmp.mod.newGamePlusVersion !== undefined ? 1 : 0,
			arrows: tmp.mod.newGameExpVersion !== undefined,
			ngpp: player.meta == undefined ? false : tmp.mod.ngp3lV ? 3 : tmp.ngp3 ? 2 : 1,
			ngmm: tmp.ngmX ? tmp.ngmX - 1 : inNGM(2) ? 1 : 0,
			rs: player.infinityUpgradesRespecced != undefined ? 2 : player.boughtDims !== undefined,
			ngud: tmp.mod.nguspV !== undefined ? 3 : tmp.mod.ngudpV !== undefined ? 2 : player.exdilation !== undefined ? 1 : 0,
			nguep: tmp.mod.nguepV !== undefined,
			ngmu: tmp.mod.newGameMult === 1,
			ngumu: tmp.mod.ngumuV !== undefined,
			ngex: tmp.mod.ngexV !== undefined,
			aau: tmp.mod.aau !== undefined,
			ls: tmp.mod.ls !== undefined,
			ngc: tmp.ngC,
			ez: tmp.mod.ez !== undefined
		}
	} 
	else var modesChosen = modes
	player = {
		money: new Decimal(modesChosen.ngmm>2?200:modesChosen.ngp>1?20:10),
		tickSpeedCost: new Decimal(1000),
		tickspeed: new Decimal(modesChosen.ngp>1?500:1000),
		firstCost: new Decimal(10),
		secondCost: new Decimal(100),
		thirdCost: new Decimal(10000),
		fourthCost: new Decimal(1000000),
		fifthCost: new Decimal(1e9),
		sixthCost: new Decimal(1e13),
		seventhCost: new Decimal(1e18),
		eightCost: new Decimal(1e24),
		firstAmount: new Decimal(0),
		secondAmount: new Decimal(0),
		thirdAmount: new Decimal(0),
		fourthAmount: new Decimal(0),
		firstBought: modesChosen.ngm === 1 ? 5 : 0,
		secondBought: 0,
		thirdBought: 0,
		fourthBought: 0,
		fifthAmount: new Decimal(0),
		sixthAmount: new Decimal(0),
		seventhAmount: new Decimal(0),
		eightAmount: new Decimal(0),
		fifthBought: 0,
		sixthBought: 0,
		seventhBought: 0,
		eightBought: 0,
		sacrificed: new Decimal(0),
		achievements: [],
		infinityUpgrades: [],
		challenges: [],
		currentChallenge: "",
		infinityPoints: new Decimal(0),
		infinitied: modesChosen.ngm === 1 ? 990 : modesChosen.ngp%2>0 ? 1 : 0,
		infinitiedBank: modesChosen.ngm === 1 ? -1000 : 0,
		totalTimePlayed: 0,
		bestInfinityTime: 9999999999,
		thisInfinityTime: 0,
		resets: 0,
		galaxies: modesChosen.ngm === 1 ? -1 : 0,
		totalmoney: new Decimal(0),
		achPow: 1,
		newsArray: [],
		interval: null,
		lastUpdate: new Date().getTime(),
		autobuyers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
		costMultipliers: [new Decimal(1e3), new Decimal(1e4), new Decimal(1e5), new Decimal(1e6), new Decimal(1e8), new Decimal(1e10), new Decimal(1e12), new Decimal(1e15)],
		tickspeedMultiplier: new Decimal(10),
		chall2Pow: 1,
		chall3Pow: new Decimal(0.01),
		matter: new Decimal(0),
		chall11Pow: new Decimal(1),
		partInfinityPoint: modesChosen.ngm === 1 ? -1e300 : 0,
		partInfinitied: modesChosen.ngm === 1 ? -1e8 : 0,
		break: false,
		challengeTimes: [600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31],
		infchallengeTimes: [600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31],
		lastTenRuns: [[600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0]],
		lastTenEternities: [[600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0]],
		infMult: new Decimal(modesChosen.ngm === 1 ? 0.5 : 1),
		infMultCost: new Decimal(modesChosen.ngm === 1 ? 30 : 10),
		tickSpeedMultDecrease: 10,
		tickSpeedMultDecreaseCost: 3e6,
		dimensionMultDecrease: modesChosen.ngm === 1 ? 11 : 10,
		dimensionMultDecreaseCost: 1e8,
		overXGalaxies: 10,
		version: 10,
		infDimensionsUnlocked: [],
		infinityPower: new Decimal(1),
		spreadingCancer: modesChosen.ngm === 1 ? -9990 : 0,
		postChallUnlocked: 0,
		postC4Tier: 0,
		postC3Reward: new Decimal(1),
		postC8Mult: new Decimal(1),
		eternityPoints: new Decimal(0),
		eternities: modesChosen.ngm === 1 ? -20 : 0,
		thisEternity: 0,
		bestEternity: 9999999999,
		eternityUpgrades: [],
		epmult: new Decimal(1),
		epmultCost: new Decimal(500),
		infinityDimension1 : {
			cost: new Decimal(1e8),
			amount: new Decimal(0),
			bought: 0,
			power: new Decimal(1),
			baseAmount: 0
		},
		infinityDimension2 : {
			cost: new Decimal(1e9),
			amount: new Decimal(0),
			bought: 0,
			power: new Decimal(1),
			baseAmount: 0
		},
		infinityDimension3 : {
			cost: new Decimal(1e10),
			amount: new Decimal(0),
			bought: 0,
			power: new Decimal(1),
			baseAmount: 0
		},
		infinityDimension4 : {
			cost: new Decimal(1e20),
			amount: new Decimal(0),
			bought: 0,
			power: new Decimal(modesChosen.ngm === 1 ? 0.0000125 : 1),
			baseAmount: 0
		},
		infinityDimension5 : {
			cost: new Decimal(1e140),
			amount: new Decimal(0),
			bought: 0,
			power: new Decimal(modesChosen.ngm === 1 ? 0.01 : 1),
			baseAmount: 0
		},
		infinityDimension6 : {
			cost: new Decimal(1e200),
			amount: new Decimal(0),
			bought: 0,
			power: new Decimal(modesChosen.ngm === 1 ? 0.015 : 1),
			baseAmount: 0
		},
		infinityDimension7 : {
			cost: new Decimal(1e250),
			amount: new Decimal(0),
			bought: 0,
			power: new Decimal(modesChosen.ngm === 1 ? 0.01 : 1),
			baseAmount: 0
		},
		infinityDimension8 : {
			cost: new Decimal(1e280),
			amount: new Decimal(0),
			bought: 0,
			power: new Decimal(modesChosen.ngm === 1 ? 0.01 : 1),
			baseAmount: 0
		},
		infDimBuyers: [false, false, false, false, false, false, false, false],
		timeShards: new Decimal(0),
		tickThreshold: new Decimal(1),
		totalTickGained: 0,
		timeDimension1: {
			cost: new Decimal(1),
			amount: new Decimal(0),
			power: new Decimal(modesChosen.ngm === 1 ? 0.01 : 1),
			bought: 0
		},
		timeDimension2: {
			cost: new Decimal(5),
			amount: new Decimal(0),
			power: new Decimal(modesChosen.ngm === 1 ? 0.03 : 1),
			bought: 0
		},
		timeDimension3: {
			cost: new Decimal(100),
			amount: new Decimal(0),
			power: new Decimal(modesChosen.ngm === 1 ? 0.025 : 1),
			bought: 0
		},
		timeDimension4: {
			cost: new Decimal(1000),
			amount: new Decimal(0),
			power: new Decimal(modesChosen.ngm === 1 ? 0.02 : 1),
			bought: 0
		},
		timeDimension5: {
			cost: new Decimal("1e2350"),
			amount: new Decimal(0),
			power: new Decimal(modesChosen.ngm === 1 ? 1e-5 : 1),
			bought: 0
		},
		timeDimension6: {
			cost: new Decimal("1e2650"),
			amount: new Decimal(0),
			power: new Decimal(modesChosen.ngm === 1 ? 5e-6 : 1),
			bought: 0
		},
		timeDimension7: {
			cost: new Decimal("1e3000"),
			amount: new Decimal(0),
			power: new Decimal(modesChosen.ngm === 1 ? 3e-6 : 1),
			bought: 0
		},
		timeDimension8: {
			cost: new Decimal("1e3350"),
			amount: new Decimal(0),
			power: new Decimal(modesChosen.ngm === 1 ? 2e-6 : 1),
			bought: 0
		},
		offlineProd: 0,
		offlineProdCost: modesChosen.ngm === 1 ? 5e11 : 1e7,
		challengeTarget: 0,
		autoSacrifice: 1,
		replicanti: {
			amount: new Decimal(0),
			unl: false,
			chance: 0.01,
			chanceCost: new Decimal(modesChosen.ngmm?1e90:1e150),
			interval: modesChosen.ngm === 1 ? 5000 : 1000,
			intervalCost: new Decimal(modesChosen.ngmm?1e80:modesChosen.rs==1?1e150:1e140),
			gal: 0,
			galaxies: 0,
			galCost: new Decimal(modesChosen.ngmm?1e110:1e170),
			auto: [false, false, false]
		},
		timestudy: {
			theorem: modesChosen.ngm === 1 ? -6 : 0,
			amcost: new Decimal("1e20000"),
			ipcost: new Decimal(modesChosen.ngm === 1 ? 1e-13 : 1),
			epcost: new Decimal(1),
			studies: [],
		},
		eternityChalls: modesChosen.ngm === 1 ? {eterc1: -6} : {},
		eternityChallGoal: new Decimal(Number.MAX_VALUE),
		currentEternityChall: "",
		eternityChallUnlocked: 0,
		etercreq: 0,
		autoIP: new Decimal(0),
		autoTime: 1e300, 
		infMultBuyer: false,
		autoCrunchMode: "amount",
		respec: false,
		eternityBuyer: {
				limit: new Decimal(0),
				isOn: false
		},
		eterc8ids: 50,
		eterc8repl: 40,
		dimlife: true,
		dead: true,
		dilation: {
			studies: [],
			active: false,
			tachyonParticles: new Decimal(0),
			dilatedTime: new Decimal(0),
			totalTachyonParticles: new Decimal(modesChosen.ngm === 1 ? 2000 :0),
			nextThreshold: new Decimal(1000),
			freeGalaxies: 0,
			upgrades: [],
			rebuyables: {
				1: 0,
				2: modesChosen.ngm === 1 ? 1 : 0,
				3: 0,
			}
		},
		why: 0,
		shameLevel: 0,
		options: {
			newsHidden: true,
			notation: "Scientific",
			scientific: false,
			challConf: true,
			sacrificeConfirmation: true,
			retryChallenge: false,
			bulkOn: true,
			cloud: true,
			hotkeys: true,
			theme: undefined,
			secretThemeKey: 0,
			eternityconfirm: true,
			commas: "Commas",
			updateRate: 50,
			hideProductionTab: false,
			chart: {
				updateRate: 1000,
				duration: 10,
				warning: 0,
			},
			animations: {
				floatingText: true,
				bigCrunch: true,
				eternity: true,
				tachyonParticles: true,
			}
		},
		aarexModifications: {
			dilationConf: false,
			offlineProgress: true,
			autoSave: true,
			progressBar: true,
			logRateChange: false,
			hideProductionTab: false,
			eternityChallRecords: {},
			popUpId: 0,
			tabsSave: {on: false},
			breakInfinity: false
		}
	}
	tmp.mod = player.aarexModifications
	if (modesChosen.ngm === 1) tmp.mod.newGameMinusVersion = 2.2
	if (modesChosen.ngm === 2) ngmR.setup()
	if (modesChosen.ngp == 2) { 
		doNGPlusFourPlayer()
	} else if (modesChosen.ngp == 1) {
		doNGPlusOneNewPlayer()
	}
	if (modesChosen.ngpp) doNGPlusTwoNewPlayer()
	if (modesChosen.ngmm) {
		tmp.ngmX = modesChosen.ngmm + 1
		tmp.mod.ngmX = tmp.ngmX
		doNGMinusTwoNewPlayer()
	}
	if (modesChosen.ngpp > 1) doNGPlusThreeNewPlayer()
	if (modesChosen.rs == 1) doEternityRespeccedNewPlayer()
	if (modesChosen.ngmm > 1) doNGMinusThreeNewPlayer()
	if (modesChosen.arrows) doNGEXPNewPlayer()
	if (modesChosen.ngud) doNGUDNewPlayer()
	if (modesChosen.rs == 2) doInfinityRespeccedNewPlayer()
	if (modesChosen.ngp > 2) convertToNGP5(true)
	if (modesChosen.ngud == 2) tmp.mod.ngudpV = 1.12
	if (modesChosen.ngud == 3) doNGUDSemiprimePlayer()
	if (modesChosen.nguep) tmp.mod.nguepV = 1.03
	if (modesChosen.ngmm > 3) doNGMinusFivePlayer()
	if (modesChosen.ngmm > 2) doNGMinusFourPlayer()
	if (modesChosen.ngmu) doNGMultipliedPlayer()
	if (modesChosen.ngumu) tmp.mod.ngumuV = 1.03
	if (modesChosen.ngpp == 3) tmp.mod.ngp3lV = 1
	if (modesChosen.ngex) tmp.mod.ngexV = 0.1
	if (modesChosen.aau) {
		tmp.mod.aau = 1
		tmp.mod.hideAchs = true
		dev.giveAllAchievements(true)
	}
	if (modesChosen.ls) tmp.mod.ls = {}
	if (modesChosen.ngc) ngC.setup()
	if (modesChosen.ez) tmp.mod.ez = 1
	player.infDimensionsUnlocked = resetInfDimUnlocked()
}

function doNGMinusNewPlayer(){
	player.achievements.push("r22")
	player.achievements.push("r85")
	tmp.mod.newGameMinusVersion = 2.2
}

function doNGPlusOneNewPlayer(){
	for (i = 1; i <= 13; i++) { // get all achievements up to and including row 13
		for (j = 1; j <= 8; j++) {
			player.achievements.push("r" + i + j)
		}
	}

	player.money = new Decimal(2e25)
	player.infinitiedBank = 5e9
	player.infinityUpgrades = ["timeMult", "dimMult", "timeMult2", "unspentBonus", "27Mult", "18Mult", "36Mult", "resetMult", "passiveGen", "45Mult", "resetBoost", "galaxyBoost"]
	player.infMult = 2048
	player.dimensionMultDecrease = 2
	player.tickSpeedMultDecrease = 1.65
	player.eternities = 1012680
	player.challenges = challengesCompletedOnEternity()
	player.replicanti.unl = true
	player.replicanti.amount = new Decimal(1)
	for (ec = 1; ec < 13; ec++) player.eternityChalls['eterc' + ec] = 5
	player.eternityChalls.eterc1 = 1
	player.eternityChalls.eterc4 = 1
	player.eternityChalls.eterc10 = 1
	player.dilation.studies = [1]
	tmp.mod.newGamePlusVersion = 2
}

/* Currently does not work when initializing, please fix
function doNGPlusClassicNewPlayer(){
	player.infinitied = Math.max(player.infinited, 1);
	player.dimensionMultDecrease = 2
	player.tickSpeedMultDecrease = 1.65
	player.challenges = challengesCompletedOnEternity()
	for (ec = 1; ec < 13; ec++) player.eternityChalls['eterc' + ec] = 5
	player.achievements = []
	player.achievements.push("r123") // 5 more eternities until the update
	player.achievements.push("r22") // FAKE NEWS!
	player.achievements.push("r76") // One for each dimension
	tmp.mod.newGamePlusVersion = 2
}
 */
function doNGPlusTwoNewPlayer(){
	tmp.mod.newGamePlusPlusVersion = 2.90142
	player.autoEterMode = "amount"
	player.dilation.rebuyables[4] = 0
	player.meta = {resets: 0, antimatter: 10, bestAntimatter: 10}
	for (dim = 1; dim <= 8; dim++) player.meta[dim] = {amount: 0, bought: 0, cost: initCost[dim]}
	player.autoEterOptions = {epmult:false}
	for (dim = 1; dim <= 8; dim++) player.autoEterOptions["td" + dim] = false
	player.galaxyMaxBulk = false
	player.quantum = {
		times: 0,
		time: 0,
		best: 9999999999,
		last10: [[600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0]],
		quarks: 0,
		producedGluons: 0,
		realGluons: 0,
		bosons: {
			'w+': 0,
			'w-': 0,
			'z0': 0
		},
		neutronstar: {
			quarks: 0,
			metaAntimatter: 0,
			dilatedTime: 0
		},
		rebuyables: {
			1: 0,
			2: 0
		},
		upgrades: []
	}
	tmp.mod.quantumConf = true
	tmp.qu = player.quantum
}

function doNGMinusTwoNewPlayer(){
	tmp.mod.newGameMinusMinusVersion = 2.41
	player.galacticSacrifice = {}
	player.galacticSacrifice = resetGalacticSacrifice()
	player.totalBoughtDims = {}
	player.tickBoughtThisInf = resetTickBoughtThisInf()
	player.challengeTimes.push(600*60*24*31)
	player.challengeTimes.push(600*60*24*31)
	player.autobuyers[12] = 13
	player.extraDimPowerIncrease = 0
	player.dimPowerIncreaseCost = player.tickspeedBoosts == undefined ? 1e3 : 3e5
	player.infchallengeTimes.push(600*60*24*31)
	player.infchallengeTimes.push(600*60*24*31)
	player.options.gSacrificeConfirmation = true
}

function getBrandNewReplicantsData(){
	return {
		amount: 0,
		requirement: "1e3000000",
		quarks: 0,
		quantumFood: 0,
		quantumFoodCost: 2e46,
		limit: 1,
		limitDim: 1,
		limitCost: 1e49,
		eggonProgress: 0,
		eggons: 0,
		hatchSpeed: 20,
		hatchSpeedCost: 1e49,
		babyProgress: 0,
		babies: 0,
		ageProgress: 0
	}
}

function getBrandNewTodData(){
	return {
		r: {
			quarks: 0,
			spin: 0,
			upgrades: {}
		},
		g: {
			quarks: 0,
			spin: 0,
			upgrades: {}
		},
		b: {
			quarks: 0,
			spin: 0,
			upgrades: {}
		},
		upgrades: {}
	}
}

function getBrandNewBigRipData(){
	return {
		active: false,
		conf: true,
		times: 0,
		bestThisRun: 0,
		totalAntimatter: 0,
		savedAutobuyersNoBR: {},
		savedAutobuyersBR: {},
		spaceShards: 0,
		upgrades: []
	}
}

function getBrandNewElectronData(){
	return {
		amount: 0,
		sacGals: 0,
		mult: 2,
		rebuyables: [0,0,0,0]
	}
}

function getBrandNewPCData(){
	return {
		order: {},
		current: 0,
		completed: 0,
		fastest: {},
		pc68best: 0,
		respec: false
	}
}

function getBrandNewNanofieldData(){
	return {
		charge: 0,
		energy: 0,
		antienergy: 0,
		power: 0,
		powerThreshold: 50,
		rewards: 0,
		best: 0,
		producingCharge: false
	}
}

function getBrandNewBreakEternityData(){
	return {
		unlocked: false,
		break: false,
		eternalMatter: 0,
		upgrades: [],
		epMultPower: 0
	}
}

function getBrandNewNeutrinoData(){
	return {
		electron: 0,
		mu: 0,
		tau: 0,
		generationGain: 1,
		boosts: 0,
		multPower: 1,
		upgrades: []
	}
}

function getBrandNewPhotonsData(){
	return {
		unl: false,
		amount: 0,
		ghostlyRays: 0,
		darkMatter: 0,
		lights: [0,0,0,0,0,0,0,0],
		maxRed: 0,
		enpowerments: 0
	}
}

function getBrandNewBosonicLabData() {
	let x = {
		watt: 0,
		speed: 1,
		ticks: 0,
		am: 0,
		typeToExtract: 1,
		extracting: false,
		extractProgress: 0,
		autoExtract: 0,
		glyphs: [],
		enchants: {},
		usedEnchants: [],
		upgrades: [],
		battery: 0,
		odSpeed: 1
	}
	tmp.bl = x
	return x
}

function getBrandNewWZBosonsData() {
	return {
		unl: false,
		dP: 0,
		dPUse: 0,
		wQkUp: true,
		wQkProgress: 0,
		zNeGen: 1,
		zNeProgress: 0,
		zNeReq: 1,
		wpb: 0,
		wnb: 0,
		zb: 0
	}
}

function getBrandNewGhostifyData() {
	player.ghostify = {}
	return {
		reached: false,
		times: 0,
		time: 0,
		best: 9999999999,
		last10: [[600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0]],
		milestones: 0,
		disabledRewards: {},
		ghostParticles: 0,
		multPower: 1,
		neutrinos: getBrandNewNeutrinoData(),
		automatorGhosts: setupAutomaticGhostsData(),
		ghostlyPhotons: getBrandNewPhotonsData(),
		bl: getBrandNewBosonicLabData(),
		wzb: getBrandNewWZBosonsData()
	}
}

function doNGPlusThreeNewPlayer(){
	tmp.mod.newGame3PlusVersion = 2.21 //Keep that line forever due to NG+3.1 / NG+3L compatibility
	getEl("quantumison").checked = false
	player.respecMastery = false
	player.dbPower = 1
	player.dilation.times = 0
	player.peakSpent = 0
	player.masterystudies = []
	tmp.qu.reached = false
	player.options.animations.quarks = true
	player.meta.bestOverQuantums = 0
	tmp.qu.usedQuarks = {r: 0, g: 0, b: 0}
	tmp.qu.colorPowers = {r: 0, g: 0, b: 0}
	tmp.qu.assignAllRatios = {r: 1, g: 1, b: 1}
	tmp.qu.gluons = {rg: 0, gb: 0, br: 0}
	player.eternityBuyer.dilationMode = false
	player.eternityBuyer.statBeforeDilation = 0
	player.eternityBuyer.dilationPerAmount = 10
	player.eternityBuyer.dilMode = "amount"
	player.eternityBuyer.tpUpgraded = false
	player.eternityBuyer.slowStop = false
	player.eternityBuyer.slowStopped = false
	player.eternityBuyer.ifAD = false
	player.eternityBuyer.presets = {on: false, autoDil: false, selected: -1, selectNext: 0, left: 1, order: []}
	tmp.qu.autobuyer = {enabled: false, limit: 1, mode: "amount", peakTime: 0}
	tmp.qu.electrons = getBrandNewElectronData()
	tmp.qu.disabledRewards = {}
	tmp.qu.metaAutobuyerWait = 0
	tmp.qu.metaAutobuyerSlowWait = 0
	tmp.qu.multPower = {rg : 0, gb : 0, br : 0, total : 0}
	player.eternitiesBank = 0
	tmp.qu.challenge = []
	tmp.qu.challenges = {}
	tmp.qu.nonMAGoalReached = []
	tmp.qu.challengeRecords = {}
	tmp.qu.pairedChallenges = getBrandNewPCData()
	tmp.qu.qcsNoDil = {}
	tmp.qu.qcsMods = {current:[]}
	player.dilation.bestTP = 0
	player.old = true
	tmp.qu.autoOptions = {}
	tmp.qu.replicants = getBrandNewReplicantsData()
	tmp.qu.emperorDimensions = {}
	for (d = 1; d < 9; d++) tmp.qu.emperorDimensions[d] = {workers: 0, progress: 0, perm: 0}
	player.dontWant = false
	tmp.qu.nanofield = getBrandNewNanofieldData()
	tmp.qu.autoAssign = false
	tmp.qu.reachedInfQK = false
	tmp.qu.notrelative = false
	tmp.qu.wasted = false
	tmp.qu.tod = getBrandNewTodData()
	tmp.qu.bigRip = getBrandNewBigRipData() 
	tmp.qu.breakEternity = getBrandNewBreakEternityData()
	player.dilation.bestTPOverGhostifies = 0
	player.meta.bestOverGhostifies = 0
	player.ghostify = getBrandNewGhostifyData()
	for (var g = 1; g < br.limits[maxBLLvl]; g++) player.ghostify.bl.glyphs.push(0)
	player.options.animations.ghostify = true
	tmp.mod.ghostifyConf = true
}

function doEternityRespeccedNewPlayer(){
	tmp.mod.ersVersion = 1.02
	player.boughtDims = []
	player.replicanti.limit = Number.MAX_VALUE
	player.replicanti.newLimit = Number.MAX_VALUE
	player.timestudy.ers_studies = [null, 0, 0, 0, 0, 0, 0]
	player.timestudy.studyGroupsUnlocked = 0
}

function doNGMinusThreeNewPlayer(){
	tmp.mod.newGame3MinusVersion = 3.202
	player.tickspeedBoosts = 0
	player.autobuyers[13] = 14
	player.challengeTimes.push(600*60*24*31)
	player.infchallengeTimes.push(600*60*24*31)
	player.infchallengeTimes.push(600*60*24*31)
	player.infchallengeTimes.push(600*60*24*31)
	player.infchallengeTimes.push(600*60*24*31)
	player.overXGalaxiesTickspeedBoost=10
	player.replicanti.chanceCost = Decimal.pow(10, 150)
	player.replicanti.intervalCost = Decimal.pow(10, 140)
	player.replicanti.galCost = Decimal.pow(10, 170)
}

function doNGEXPNewPlayer(){
	tmp.mod.newGameExpVersion = 1.11
	for (u=1;u<5;u++) player.infinityUpgrades.push("skipReset" + (u > 3 ? "Galaxy" : u))
	player.resets=4
}

function doNGUDNewPlayer(){
	tmp.mod.newGameUpdateVersion = 1.1
	resetNGUdData()
	player.options.animations.blackHole = true 
	player.options.exdilationconfirm = true
}

function doInfinityRespeccedNewPlayer(){
	tmp.mod.irsVersion = 1.1
	player.infinityUpgradesRespecced = {1: 0, 3: 0, 4: 0, 5: 0, 6: 0}
	player.singularity = {
		unlocked: false,
		upgraded: 0,
		sacrificed: 0,
		singularityPower: 0,
		darkMatter: 0
	}
	player.dimtechs = {
		unlocked: false,
		discounts: 0,
		tickUpgrades: 0,
		respec: false
	}
	for (dim = 1; dim <= 8; dim++) player.dimtechs["dim" + dim + "Upgrades"] = 0
	player.setsUnlocked = 0
	player.infMultCost = 1
}

function doNGPlusFourPlayer(){
	player.eternities = 1e13
	for (var c = 13; c < 15; c++) player.eternityChalls["eterc" + c] = 5
	player.dilation.studies = [1, 2, 3, 4, 5, 6]
	player.dilation.dilatedTime = 1e100
	for (var u = 4; u < 11; u++) player.dilation.upgrades.push(u)
	for (var u = 1; u < 7; u++) player.dilation.upgrades.push("ngpp" + u)
	player.meta.antimatter = 1e25
	player.meta.resets = 4
	player.quantum.times = 1
	player.quantum.best = 10
	for (var d = 7; d < 14; d++) player.masterystudies.push("d"+d)
	player.quantum.electrons.mult = 6
	for (var c = 1; c < 9; c++) player.quantum.challenges[c] = 2
	player.quantum.pairedChallenges.completed = 4
	player.quantum.nanofield.rewards = 19
	player.quantum.reachedInfQK = true
	player.quantum.tod.r.spin = 1e25
	player.quantum.tod.g.spin = 1e25
	player.quantum.tod.b.spin = 1e25
	player.ghostify.milestones = 1
	player.achievements.push("ng3p18")
	player.achievements.push("ng3p28")
	player.achievements.push("ng3p37")
	player.achievements.push("ng3p47")
	tmp.mod.ngp4V = 1
}

function doNGUDSemiprimePlayer(){
	for (var d = 5; d < 9; d++) player["blackholeDimension" + d] = {
		cost: blackholeDimStartCosts[d],
		amount: 0,
		power: 1,
		bought: 0
	}
	tmp.mod.nguspV = 1
}

function doNGMinusFourPlayer(){
	tmp.mod.newGame4MinusVersion = 2.111
	player.tdBoosts = 0
	player.challengeTimes.push(600 * 60 * 24 * 31)
	player.autobuyers.push(15)
	resetTDsOnNGM4()
	reduceDimCosts()
}

function doNGMinusFivePlayer(){
	tmp.mod.ngm5V = 0.52
	updateGalstones()
	resetPSac()
	resetIDsOnNGM5()
}

function doNGMultipliedPlayer(){
	tmp.mod.newGameMult = 1
	player.infMult = 2048
	player.eternities = 1012680
	player.replicanti.unl = true
	player.replicanti.amount = new Decimal(1)
}

if (!String.prototype.includes) {
	String.prototype.includes = function(search, start) {
		'use strict';
		if (typeof start !== 'number') {
			start = 0;
		}
		if (start + search.length > this.length) {
			return false;
		} else {
			return this.indexOf(search, start) !== -1;
		}
	};
  }


if (!Array.prototype.includes) {
	Object.defineProperty(Array.prototype, 'includes', {
		value: function(searchElement, fromIndex) {

        // 1. Let O be ? ToObject(this value).
        if (this == null) {
          throw new TypeError('"this" is null or not defined');
        }

        var o = Object(this);

        // 2. Let len be ? ToLength(? Get(O, "length")).
        var len = o.length >>> 0;

        // 3. If len is 0, return false.
        if (len === 0) {
          return false;
        }

        // 4. Let n be ? ToInteger(fromIndex).
        //    (If fromIndex is undefined, this step produces the value 0.)
        var n = fromIndex | 0;

        // 5. If n ≥ 0, then
        //  a. Let k be n.
        // 6. Else n < 0,
        //  a. Let k be len + n.
        //  b. If k < 0, let k be 0.
        var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

        function sameValueZero(x, y) {
          return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
        }

        // 7. Repeat, while k < len
        while (k < len) {
          // a. Let elementK be the result of ? Get(O, ! ToString(k)).
          // b. If SameValueZero(searchElement, elementK) is true, return true.
          // c. Increase k by 1.
          if (sameValueZero(o[k], searchElement)) {
            return true;
          }
          k++;
        }

        // 8. Return false
        return false;
      }
    });
  }

    if (!Math.log10) {
        Math.log10 = Math.log10 || function(x) {
            return Math.log(x) * Math.LOG10E;
        };
    }

    if (!Math.log2) {
        Math.log2 = Math.log2 || function(x) {
            return Math.log(x) * Math.LOG2E;
        };
    }

    if (window.NodeList && !NodeList.prototype.forEach) {
        NodeList.prototype.forEach = function (callback, thisArg) {
            thisArg = thisArg || window;
            for (var i = 0; i < this.length; i++) {
                callback.call(thisArg, this[i], i, this);
            }
        };
    }

    if (!Array.prototype.find) {
        Object.defineProperty(Array.prototype, 'find', {
          value: function(predicate) {
           // 1. Let O be ? ToObject(this value).
            if (this == null) {
              throw new TypeError('"this" is null or not defined');
            }

            var o = Object(this);

            // 2. Let len be ? ToLength(? Get(O, "length")).
            var len = o.length >>> 0;

            // 3. If IsCallable(predicate) is false, throw a TypeError exception.
            if (typeof predicate !== 'function') {
              throw new TypeError('predicate must be a function');
            }

            // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
            var thisArg = arguments[1];

            // 5. Let k be 0.
            var k = 0;

            // 6. Repeat, while k < len
            while (k < len) {
              // a. Let Pk be ! ToString(k).
              // b. Let kValue be ? Get(O, Pk).
              // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
              // d. If testResult is true, return kValue.
              var kValue = o[k];
              if (predicate.call(thisArg, kValue, k, o)) {
                return kValue;
              }
              // e. Increase k by 1.
              k++;
            }

            // 7. Return undefined.
            return undefined;
          }
        });
      }


Array.max = function( array ){
	return Math.max.apply( Math, array );
};

Array.min = function( array ){
	return Math.min.apply( Math, array );
};

Object.invert = function(obj) {
	var result = {};
	var keys = Object.keys(obj);
	for (var i = 0, length = keys.length; i < length; i++) {
		result[obj[keys[i]]] = keys[i];
	}
	return result;
};

function sortNumber(a,b) {
	return a - b;
}

function toString(x) {
	if (typeof(x) == "number") x = x.toString()
	return x
}

function wordizeList(list, caseFirst) {
	let length = list.length
	if (caseFirst && length > 0) {
		let split0 = [list[0][0], list[0].slice(1)]
		list[0] = split0[0].toUpperCase()
		if (split0[1]) list[0] += split0[1]
	}
	let ret = ""
	for (var i=0; i<length; i++) {
		if (i > 0 && length > 2) {
			ret += ", "
			if (i == length - 1) ret += "and "
		} else if (i > 0) ret += " and "
		ret += list[i]
	}
	return ret
}

function factorizeDescs(list, descs) {
	let length = list.length
	if (length < 2) return ""

	let ret = ""
	for (var i = 0; i < length; i++) {
		if (i > 0) ret += " * "
		ret += shorten(list[i])
		if (descs[i] != "") ret += " (" + descs[i] + ")"
	}
	return ret + " = "
}

//Theme stuff
function setTheme(name) {
	document.querySelectorAll("link").forEach( function(e) {
		if (e.href.includes("theme")) e.remove();
	});
	
	player.options.theme=name
	if(name !== undefined && name.length < 3) giveAchievement("Shhh... It's a secret")
	var themeName=player.options.secretThemeKey
	if(name === undefined) {
		themeName="Normal"
	} else if(name === "S1") {
		Chart.defaults.global.defaultFontColor = 'black';
		normalDimChart.data.datasets[0].borderColor = '#000'
	} else if(name === "S2") {
		Chart.defaults.global.defaultFontColor = 'black';
		normalDimChart.data.datasets[0].borderColor = '#000'
	} else if(name === "S3") {
		Chart.defaults.global.defaultFontColor = 'black';
		normalDimChart.data.datasets[0].borderColor = '#000'
	} else if(name === "S4") {
		Chart.defaults.global.defaultFontColor = 'black';
		normalDimChart.data.datasets[0].borderColor = '#000'
	} else if(name === "S5") {
		Chart.defaults.global.defaultFontColor = 'black';
		normalDimChart.data.datasets[0].borderColor = '#000'
	} else if (name !== "S6") {
		themeName=name;
	}
	if (theme=="Dark"||theme=="Dark Metro"||name === "S6") {
		Chart.defaults.global.defaultFontColor = '#888';
		normalDimChart.data.datasets[0].borderColor = '#888'
	} else {
		Chart.defaults.global.defaultFontColor = 'black';
		normalDimChart.data.datasets[0].borderColor = '#000'
		}
	getEl("theme").innerHTML="<p style='font-size:15px'>Themes</p>Current theme: " + themeName;
	getEl("chosenTheme").textContent="Current theme: " + themeName;
	
	if (name === undefined) return;
	name = name.replace("'", "")
	
	var head = document.head;
	var link = document.createElement('link');
	
	link.type = 'text/css';
	link.rel = 'stylesheet';
	link.href = "stylesheets/theme-" + name + ".css";
	
	head.appendChild(link);
}

getEl("theme").onclick = function () {
	closeToolTip()
	getEl('thememenu').style.display="flex"
}

function doWeakerPowerReductionSoftcapNumber(num,start,exp){
	if (num < start || num < 1) return num
	return start*(( (num/start)**exp -1)/exp+1)
}

function doWeakerPowerReductionSoftcapDecimal(num,start,exp){
	if (num.lt(start) || num.lt(1)) return num
	return start.times( num.div(start).pow(exp).minus(1).div(exp).plus(1) )
}

function doStrongerPowerReductionSoftcapNumber(num,start,exp){
	if (num < start || num < 1) return num
	return start*((num/start)**exp)
}

function doStrongerPowerReductionSoftcapDecimal(num,start,exp){
	if (num.lt(start) || num.lt(1)) return num
	return start.times(num.div(start).pow(exp))
}

function showTab(tabName, init) {
	if (tabName == 'quantumtab' && !player.masterystudies) {
		alert("Because Quantum was never fully developed due to the abandonment of development, you cannot access the Quantum tab in NG++. This is the definitive endgame.")
		return
	}
	//iterate over all elements in div_tab class. Hide everything that's not tabName and show tabName
	var tabs = document.getElementsByClassName("tab");
	var tab;
	var oldTab
	for (var i = 0; i < tabs.length; i++) {
		tab = tabs.item(i);
		if (tab.style.display == 'block') oldTab = tab.id
		if (tab.id === tabName) {
			tab.style.display = 'block';
		} else {
			tab.style.display = 'none';
		}
	}
	if (oldTab !== tabName) {
		tmp.mod.tabsSave.tabMain = tabName
		if ((getEl("antimatterdimensions").style.display != "none" || getEl("metadimensions").style.display != "none") && tmp.mod.progressBar && tabName == "dimensions") getEl("progress").style.display = "block";
		else getEl("progress").style.display = "none"
		if ((getEl("timestudies").style.display != "none" || getEl("ers_timestudies").style.display != "none" || getEl("masterystudies").style.display != "none") && tabName=="eternitystore") getEl("TTbuttons").style.display = "block";
		else getEl("TTbuttons").style.display = "none"
		if (tabName=="eternitystore") {
			if (getEl('timestudies') !== "none" || getEl('masterystudies') !== "none" || getEl('dilation') !== "none" || getEl("blackhole") !== "none") resizeCanvas()
			if (getEl("dilation") !== "none") requestAnimationFrame(drawAnimations)
			if (getEl("blackhole") !== "none") requestAnimationFrame(drawBlackhole)
		}
		if (tabName=="quantumtab") {
			if (getEl('uquarks') !== "none") resizeCanvas()
			if (getEl("uquarks") !== "none") requestAnimationFrame(drawQuarkAnimation)
		}
	}
	if (!init) closeToolTip();
}


function updateMoney() {
	getEl("coinAmount").textContent = shortenMoney(player.money)
	var matterName = pl.on() ? "Matteria Foam" : "matter"
	var element2 = getEl("matter");
	if (player.currentChallenge == "postc6" || inQC(6)) element2.textContent = "There is " + formatValue(player.options.notation, player.matter, 2, 1) + " " + matterName + "."; //TODO
	else if (inNC(12) || player.currentChallenge == "postc1" || pl.on()) {
		var txt = "There is " + formatValue(player.options.notation, player.matter, 2, 1) + " " + matterName + "."
		element2.innerHTML = txt
	}
	var element3 = getEl("chall13Mult");
	if (isADSCRunning()) {
		var mult = getProductBoughtMult()
		element3.innerHTML = formatValue(player.options.notation, productAllTotalBought(), 2, 1) + 'x multiplier on all Dimensions (product of '+(inNGM(3)&&(inNC(13)||player.currentChallenge=="postc1")?"1+log10(amount)":"bought")+(mult==1?"":"*"+shorten(mult))+').'
	}
	if (inNC(14) && inNGM(4)) getEl("c14Resets").textContent = "You have "+getFullExpansion(10-getTotalResets())+" resets left."
	getEl("ec12Mult").textContent = tmp.inEC12 ? "Time speed: 1 / " + shorten(tmp.ec12Mult) + "x" : ""
}

function updateCoinPerSec() {
	var element = getEl("coinsPerSec");
	var ret = getDimensionProductionPerSecond(1)
	if (tmp.inEC12) ret = ret.div(tmp.ec12Mult)
	element.textContent = 'You are getting ' + shortenND(ret) + ' antimatter per second.'
}

var clickedAntimatter
function onAntimatterClick() {
	clickedAntimatter++
	if (clickedAntimatter >= 10) giveAchievement("This is NOT a clicker game!")
}

function getEternitied() {
	let banked = player.eternitiesBank
	let total = player.eternities
	if (banked && (inQC(0) || hasNU(10))) total = nA(total, player.eternitiesBank)
	return total
}

function sacrificeConf() {
	getEl("confirmation").checked = player.options.sacrificeConfirmation
	player.options.sacrificeConfirmation = !player.options.sacrificeConfirmation
	getEl("sacConfirmBtn").textContent = "Sacrifice confirmation: O" + (player.options.sacrificeConfirmation ? "N" : "FF")
}

//DISPLAY FUNCTIONS
function hideDimensions() {
	for (var d = 2; d <= 8; d++) if (!canBuyDimension(d)) getEl(d + "Row").style.display = "none"
}

function updatePerformanceTicks() {
	if (tmp.mod.performanceTicks) getEl("updaterateslider").min=1
	else {
		slider.min = 5
		if (player.options.updateRate < 5) {
			clearInterval(gameLoopIntervalId)
			player.options.updateRate = 5
			sliderText.textContent="Update rate: " + player.options.updateRate + "ms"
			startInterval()
		}
	}
	getEl("performanceTicks").textContent = "Performance ticks: " + ["OFF", "LOW", "MEDIUM", "HIGH"][(tmp.mod.performanceTicks || 0) + 0]
}

function updateCosts() {
	var costPart = ph.did("quantum") ? '' : 'Cost: '
	if (getEl("dimensions").style.display == "block" && getEl("antimatterdimensions").style.display == "block") {
		var until10CostPart = ph.did("quantum") ? '' : 'Until 10, Cost: '
		for (var i=1; i<9; i++) {
			var cost = player[TIER_NAMES[i] + "Cost"]
			var resource = getOrSubResource(i)
			getEl('B'+i).className = cost.lte(resource) ? 'storebtn' : 'unavailablebtn'
			getEl('B'+i).textContent = costPart + shortenPreInfCosts(cost)
			getEl('M'+i).className = cost.times(10 - dimBought(i)).lte(resource) ? 'storebtn' : 'unavailablebtn'
			getEl('M'+i).textContent = until10CostPart + shortenPreInfCosts(cost.times(10 - dimBought(i)));
			if (tmp.ngC) ngC.condense.nds.update(i)
		}
	}
	getEl("tickSpeed").textContent = costPart + shortenPreInfCosts(player.tickSpeedCost);
}

function floatText(id, text, leftOffset = 150) {
	if (!player.options.animations.floatingText) return
	var el = $("#"+id)
	el.append("<div class='floatingText' style='left: "+leftOffset+"px'>"+text+"</div>")
	setTimeout(function() {
		el.children()[0].remove()
	}, 1000)
}

function glowText(id) {
	var text = getEl(id);
	text.style.setProperty("-webkit-animation", "glow 1s");
	text.style.setProperty("animation", "glow 1s");
}

getEl("news").onclick = function () {
	if (getEl("news").textContent === "Click this to unlock a secret achievement.") giveAchievement("Real news")
	if (getEl("news").textContent === "If you are a ghost, try to click me!" && ph.did("ghostify") && (player.options.secrets === undefined || player.options.secrets.ghostlyNews === undefined)) {
		if (player.options.secrets === undefined) {
			player.options.secrets = {}
			getEl("secretoptionsbtn").style.display = ""
		}
		player.options.secrets.ghostlyNews = false
		getEl("ghostlynewsbtn").style.display = ""
		$.notify("You unlocked the ghostly news ticker option!", "success")
		giveAchievement("News for other species")
	}
	if (getEl("news").textContent === "Don't click this news") {
		alert("I told you so.")
		clearInterval(gameLoopIntervalId)
		simulateTime(0, false, "lair")
		player.lastUpdate = new Date().getTime()
		startInterval()
		giveAchievement("Lie the news")
	}
};

getEl("game").onclick = function () {
	if (tmp.blankedOut) giveAchievement("Blanked out")
}

getEl("secretstudy").onclick = function () {
	getEl("secretstudy").style.opacity = "1";
	getEl("secretstudy").style.cursor = "default";
	giveAchievement("Go study in real life instead");
	setTimeout(drawStudyTree, 2000);
};

getEl("The first one's always free").onclick = function () {
	giveAchievement("The first one's always free")
}

function setupBreakInfUpgHTMLandData() {
	getEl("postinfi11").onclick = function() {
		buyInfinityUpgrade("totalMult", 1e4);
	}

	getEl("postinfi21").onclick = function() {
		buyInfinityUpgrade("currentMult", 5e4);
	}

	getEl("postinfi31").onclick = function() {
		if (player.infinityPoints.gte(player.tickSpeedMultDecreaseCost) && player.tickSpeedMultDecrease > 2) {
			player.infinityPoints = player.infinityPoints.minus(player.tickSpeedMultDecreaseCost)
			player.tickSpeedMultDecreaseCost *= 5
			player.tickSpeedMultDecrease--;
			if (player.tickSpeedMultDecrease > 2) getEl("postinfi31").innerHTML = "Tickspeed cost multiplier increase <br>"+player.tickSpeedMultDecrease+"x -> "+(player.tickSpeedMultDecrease-1)+"x<br>Cost: "+shortenDimensions(player.tickSpeedMultDecreaseCost) +" IP"
			else {
				for (c=0;c<ECComps("eterc11");c++) player.tickSpeedMultDecrease-=0.07
				getEl("postinfi31").innerHTML = "Tickspeed cost multiplier increase<br>"+player.tickSpeedMultDecrease.toFixed(player.tickSpeedMultDecrease<2?2:0)+"x"
			}
		}
	}

	getEl("postinfi41").onclick = function() {
		buyInfinityUpgrade("postGalaxy", 5e11);
	}

	getEl("postinfi12").onclick = function() {
		buyInfinityUpgrade("infinitiedMult", 1e5);
	}

	getEl("postinfi22").onclick = function() {
		buyInfinityUpgrade("achievementMult", 1e6);
	}

	getEl("postinfi32").onclick = function() {
		buyInfinityUpgrade("challengeMult", 1e7);
	}

	getEl("postinfi42").onclick = function() {
		if (player.infinityPoints.gte(player.dimensionMultDecreaseCost) && player.dimensionMultDecrease > 3) {
			player.infinityPoints = player.infinityPoints.minus(player.dimensionMultDecreaseCost)
			player.dimensionMultDecreaseCost *= 5000
			player.dimensionMultDecrease--;
			if (player.dimensionMultDecrease > 3) getEl("postinfi42").innerHTML = "Dimension cost multiplier increase <br>"+player.dimensionMultDecrease+"x -> "+(player.dimensionMultDecrease-1)+"x<br>Cost: "+shortenCosts(player.dimensionMultDecreaseCost) +" IP"
			else {
				for (c=0;c<ECComps("eterc6");c++) player.dimensionMultDecrease-=0.2
				getEl("postinfi42").innerHTML = "Dimension cost multiplier increase<br>"+player.dimensionMultDecrease.toFixed(ECComps("eterc6")%5>0?1:0)+"x"
			}
		}
	}

	getEl("postinfi23").onclick = function() {
		buyInfinityUpgrade("bulkBoost",inNGM(3) ? 2e4 : inNGM(2)?5e6:5e9);
	}

	getEl("offlineProd").onclick = function() {
		if (player.infinityPoints.gte(player.offlineProdCost) && player.offlineProd < 50) {
			player.infinityPoints = player.infinityPoints.minus(player.offlineProdCost)
			player.offlineProdCost *= 10
			player.offlineProd += 5
		}
	}
}

function glowText(id) {
	var text = getEl(id);
	text.style.setProperty("-webkit-animation", "glow 1s");
	text.style.setProperty("animation", "glow 1s");
}

getEl("maxall").onclick = function () {
	if (tmp.ri) return false
	if (player.currentChallenge !== 'challenge14' || tmp.ngmX !== 2) buyMaxTickSpeed()
	for (var tier=1; tier<9;tier++) buyBulkDimension(tier, 1/0)
	if (inNGM(4)) buyMaxTimeDimensions()
	if (player.pSac!=undefined) maxAllIDswithAM()
	if (tmp.ngC) for (let i=1;i<=8;i++) ngC.condense.nds.max(i)
}

getEl("challengeconfirmation").onclick = function () {
	player.options.challConf = !player.options.challConf
	getEl("challengeconfirmation").textContent = "Challenge confirmation: O" + (player.options.challConf ? "N" : "FF")
}

function playerInfinityUpgradesOnEternity() {
	if (getEternitied() > 19 || hasAch("ng3p51")) return
	else if (getEternitied() > 3) {
		var filter = ["timeMult", "dimMult", "timeMult2", "skipReset1", "skipReset2", "unspentBonus", "27Mult", "18Mult", "36Mult", "resetMult", "skipReset3", "passiveGen", "45Mult", "resetBoost", "galaxyBoost", "skipResetGalaxy"]
		var newUpgrades = []
		for (u = 0; u < player.infinityUpgrades.length; u++) if (filter.includes(player.infinityUpgrades[u])) newUpgrades.push(player.infinityUpgrades[u])
		player.infinityUpgrades = newUpgrades
	} else player.infinityUpgrades = []
}

//MORE DISPLAY STUFF
function updateInfCosts() {
	if (getEl("replicantis").style.display == "block" && getEl("infinity").style.display == "block") replicantiDisplay()
	if (getEl("timestudies").style.display == "block" && getEl("eternitystore").style.display == "block") mainTimeStudyDisplay()
	if (getEl("ers_timestudies").style.display == "block" && getEl("eternitystore").style.display == "block") updateERSTTDesc()
}

function updateMilestones() {
	var eters = getEternitied()
	var moreUnlocked = moreEMsUnlocked()
	var milestoneRequirements = [1, 2, 3, 4, 5, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 25, 30, 40, 50, 60, 80, 100, 1e9, 1e10, 1e11, 1e12]
	for (i = 0; i < (moreUnlocked ? 28 : 24); i++) {
		var name = "reward" + i;
		if (i >= 24) getEl("milestone" + i).textContent = shortenMoney(milestoneRequirements[i]) + " Eternities:"
		getEl(name).className = "milestonereward" + (eters >= milestoneRequirements[i] ? "" : "locked")
	}
	if (ph.did("quantum")) getEl("reward27").className = "milestonereward"

	getEl("mdmilestonesrow1a").style.display = moreUnlocked ? "" : "none"
	getEl("mdmilestonesrow1b").style.display = moreUnlocked ? "" : "none"
	getEl("mdmilestonesrow2a").style.display = moreUnlocked ? "" : "none"
	getEl("mdmilestonesrow2b").style.display = moreUnlocked ? "" : "none"
}

function moreEMsUnlocked() {
	return tmp.ngp3 && (hasDilationStudy(1) || ph.did("quantum"))
}

function updateGalstones() {
	var galStoneRequirements = [1, 2, 5, 10, 25, 50]
	tmp.Greward = 0
	if (tmp.ngmX < 5) return 
	for (i=0; i<6; i++) {
		var name = "Greward" + i;
		if (player.galacticSacrifice.times >= galStoneRequirements[i]) {
			tmp.Greward++
			getEl(name).className = "galStonereward"
		} else {
			getEl(name).className = "galStonerewardlocked"
		}
	}
	if (tmp.Greward >= 5) tmp.PDunl = true
}

getEl("save").onclick = function () {
	saved++
	if (saved > 99) giveAchievement("Just in case")
	save_game();
};

var loadedSaves=0
var onLoading=false
var latestRow
var loadSavesIntervalId
var occupied=false
function load_saves() {
	closeToolTip()
	getEl("loadmenu").style.display = "block"
	changeSaveDesc(metaSave.current, savePlacement)
	clearInterval(loadSavesIntervalId)
	occupied = false
	loadSavesIntervalId = setInterval(function(){
		if (occupied) return
		else occupied = true
		if (loadedSaves == metaSave.saveOrder.length) {
			clearInterval(loadSavesIntervalId)
			return
		} else if (!onLoading) {
			latestRow = getEl("saves").insertRow(loadedSaves)
			onLoading = true
		}
		try {
			var id = metaSave.saveOrder[loadedSaves]
			latestRow.innerHTML = getSaveLayout(id)
			changeSaveDesc(id, loadedSaves+1)
			loadedSaves++
			onLoading = false
		} catch (_) {}
		occupied=false
	}, 0)
}

function getSaveLayout(id) {
	return "<b id='save_"+id+"_title'>Save #"+(loadedSaves+1)+"</b><div id='save_"+id+"_desc'></div><button class='storebtn' onclick='overwrite_save("+id+")'>Save</button><button class='storebtn' onclick='change_save("+id+")'>Load</button><button class='storebtn' onclick='rename_save("+id+")'>Rename</button><button class='storebtn' onclick='export_save("+id+")'>Export</button><button class='storebtn' onclick='import_save("+id+")'>Import</button><button class='storebtn' onclick='move("+id+",-1)'>Move up</button><button class='storebtn' onclick='move("+id+",1)'>Move down</button><button class='storebtn' onclick='delete_save("+id+")'>Delete</button>"
}

function changeSaveDesc(saveId, placement) {
	var element = getEl("save_" + saveId + "_desc")
	if (element == undefined) return
	try {
		var isSaveCurrent = metaSave.current == saveId
		var temp = isSaveCurrent ? player : get_save(saveId)
		if (temp.aarexModifications == null) temp.aarexModifications = {}
		var msg = ""
		var exp = ""
		if (temp.aarexModifications.newGameExpVersion) exp += "^"
		if (temp.aarexModifications.newGameMult) exp += "*"
		if (temp.exdilation) {
			msg += (temp.meta || exp != "" || temp.aarexModifications.newGameMinusVersion || temp.galacticSacrifice) ? "Ud" : " Update"
			if (temp.aarexModifications.nguepV) msg += "^"
			if (temp.aarexModifications.ngumuV) msg += "*"
			if (temp.aarexModifications.nguspV) msg += "S'"
			else if (temp.aarexModifications.ngudpV) msg += "'"
			msg += exp
			if (!temp.aarexModifications.nguspV && !temp.aarexModifications.ngudpV && temp.meta) msg += "+"
		} else if (temp.meta) msg += exp + "++" + (temp.masterystudies ? "+" : "")
		else if (temp.aarexModifications.newGamePlusVersion) msg += exp + "+"
		if (temp.masterystudies) {
			if (temp.aarexModifications.ngp4V) {
				msg += "+"
				if (!temp.exdilation) msg = exp + "+4"
			}
			if (temp.aarexModifications.ngp3lV) msg += "L"
		}
		var ngmX = calcNGMX(temp)
		if (ngmX >= 4) msg += "-" + ngmX
		else if (ngmX) msg += "-".repeat(ngmX)
		var ex=temp.aarexModifications.ngexV
		if (ngmX < 2 && temp.aarexModifications.ngmR !== undefined) msg = msg != "" || ex ? msg + "-R" : msg + "- Remade"
		if (temp.condensed !== undefined) msg = msg != "" || ex ? msg + "C" : msg + " Condensed"
		if (temp.boughtDims) msg = msg != "" || ex ? "ER" + msg : "Eternity Respecced"
		else if (temp.singularity) msg = msg != "" || ex ? "IR" + msg : "Infinity Respecced"
		else msg = "NG" + msg
		if (ex) msg = msg == "NG" ? "Expert Mode" : msg + "Ex"
		if (temp.galacticSacrifice) {
			if (temp.aarexModifications.ngmR) msg += ", NG-R"
			if (temp.aarexModifications.newGameMinusVersion) msg += ", NG-"
		}
		if (temp.aarexModifications.ez) msg = (msg == "NG" ? "" : msg + ", ") + "Barrier-Easing"
		if ((temp.exdilation || temp.meta) && !temp.aarexModifications.newGamePlusVersion) msg += ", The Grand Run [No NG+]"
		if (temp.aarexModifications.aau) msg = (msg == "NG" ? "" : msg + ", ") + "AAU"
		if (temp.aarexModifications.ls) msg = (msg == "NG" ? "" : msg + ", ") + "Light Speed"
		msg = (msg == "NG" ? "" : "(<b>" + msg + "</b>)<br><br>") + (isSaveCurrent ? "Selected" : "Played for " + timeDisplayShort(temp.totalTimePlayed)) + "<br>"
		var originalBreak = player.break
		var originalNotation = player.options.notation
		var originalCommas = player.options.commas
		if (!isSaveCurrent) {
			player.break = temp.achievements.includes("r51")
			player.options.notation = temp.options.notation
			player.options.commas = temp.options.commas
		}
		var isSaveGhostified = temp.ghostify ? temp.ghostify.times > 0 : false
		var isSaveQuantumed = temp.quantum ? temp.quantum.times > 0 : false
		var isSavePlancked = temp.aarexModifications.ngpX >= 5
		if (isSavePlancked) {
			msg += "Planck Tier: " + getFullExpansion(temp.pl.layer)
		} else if (isSaveGhostified) {
			if (temp.achievements.includes("ng3p101")) {
				var data=temp.ghostify.gds
				msg+="Gravitons: "+shorten(new Decimal(data.gv))+", Extra Gravity Dimension Shifts / Boosts: "+getFullExpansion(data.extraGDBs || 0)
			} else if (temp.achievements.includes("ng3p91")) {
				var data=temp.ghostify.hb
				msg+="Bosonic Antimatter: "+shorten(new Decimal(temp.ghostify.bl.am))+", Higgs Bosons: "+getFullExpansion(data.higgs)
			} else if (temp.achievements.includes("ng3p81")) {
				var data=temp.ghostify.wzb
				msg+="Bosonic Antimatter: "+shorten(new Decimal(temp.ghostify.bl.am))+", W+ Bosons: "+shortenDimensions(new Decimal(data.wpb))+", W- Bosons: "+shortenDimensions(new Decimal(data.wnb))+", Z Bosons: "+shortenDimensions(new Decimal(data.zb))
			} else if (temp.achievements.includes("ng3p71")) {
				var data=temp.ghostify.ghostlyPhotons
				var lights=0
				for (var l=0;l<8;l++) lights+=data.lights[l]
				msg+="Ghostly Photons: "+shortenDimensions(new Decimal(data.amount))+", Dark Matter: "+shortenDimensions(new Decimal(data.darkMatter))+", Ghostly Rays: "+shortenDimensions(new Decimal(data.ghostlyRays))+", Lights: "+getFullExpansion(lights)+", Light Empowerments: "+getFullExpansion(data.enpowerments)
			} else msg+="Ghost Particles: "+shortenDimensions(new Decimal(temp.ghostify.ghostParticles))+", Neutrinos: "+shortenDimensions(Decimal.add(temp.ghostify.neutrinos.electron, temp.ghostify.neutrinos.mu).add(temp.ghostify.neutrinos.tau).round())
		} else if (isSaveQuantumed) {
			if (!temp.masterystudies) msg+="Endgame of NG++"
			else if (temp.masterystudies.includes('d14')) msg+="Total antimatter in Big Rips: "+shortenDimensions(new Decimal(temp.quantum.bigRip.totalAntimatter))+", Space Shards: "+shortenDimensions(new Decimal(temp.quantum.bigRip.spaceShards))+(temp.achievements.includes("ng3p55")?", Eternal Matter: "+shortenDimensions(new Decimal(temp.quantum.breakEternity.eternalMatter)):"")
			else {
				msg+="Quarks: "+shortenDimensions(Decimal.add(temp.quantum.quarks,temp.quantum.usedQuarks.r).add(temp.quantum.usedQuarks.g).add(temp.quantum.usedQuarks.b))
				if (temp.quantum.gluons.rg) msg+=", Gluons: "+shortenDimensions(Decimal.add(temp.quantum.gluons.rg,temp.quantum.gluons.gb).add(temp.quantum.gluons.br))
				if (temp.masterystudies.includes('d13')) msg+=", Quark Spins: "+shortenDimensions(Decimal.add(temp.quantum.tod.r.spin, temp.quantum.tod.g.spin).add(temp.quantum.tod.b.spin))
				else if (temp.masterystudies.includes('d12')) msg+=", Preon charge: "+shortenDimensions(new Decimal(temp.quantum.nanofield.charge))+", Preon energy: "+shortenDimensions(new Decimal(temp.quantum.nanofield.energy))+", Preon anti-energy: "+shortenDimensions(new Decimal(temp.quantum.nanofield.antienergy))+", Nanofield Rewards: "+getFullExpansion(temp.quantum.nanofield.rewards)
				else if (temp.masterystudies.includes('d10')) msg+=", Replicants: "+shortenDimensions(getTotalReplicants(temp))+", Worker replicants: "+shortenDimensions(getTotalWorkers(temp))
				else if (temp.masterystudies.includes('d9')) msg+=", Paired challenges: "+temp.quantum.pairedChallenges.completed
				else if (temp.masterystudies.includes('d8')) {
					var completions=0
					if (typeof(temp.quantum.challenges)=="number") completions=temp.quantum.challenges
					else for (c=1;c<9;c++) if (temp.quantum.challenges[c]) completions++
					msg+=", Challenge completions: "+completions
				} else {
					msg+=", Best quantum: "+timeDisplayShort(temp.quantum.best)
					if (temp.masterystudies.includes('d7')) msg+=", Electrons: "+shortenDimensions(temp.quantum.electrons.amount)
				}
			}
		} else if (temp.exdilation==undefined?false:temp.blackhole.unl) {
			var tempstart="Eternity points: "+shortenDimensions(new Decimal(temp.eternityPoints))
			var tempend=", Black hole power: "+shortenMoney(new Decimal(temp.blackhole.power))
			if (temp.exdilation.times > 0) msg+=tempstart+tempend+", Ex-dilation: "+shortenDimensions(new Decimal(temp.exdilation.unspent))
			else msg+=tempstart+", Dilated time: "+shortenMoney(new Decimal(temp.dilation.dilatedTime))+", Banked infinities: "+getFullExpansion(temp.infinitiedBank)+", Replicanti: "+shortenMoney(new Decimal(temp.replicanti.amount))+tempend
		} else if (temp.dilation?temp.dilation.studies.includes(1):false) {
			var temp2="Tachyon particles: "+shortenMoney(new Decimal(temp.dilation.totalTachyonParticles))+", Dilated time: "+shortenMoney(new Decimal(temp.dilation.dilatedTime))
			if (temp.dilation.studies.includes(6)) temp2+=", Best meta-antimatter: "+shortenMoney(new Decimal(temp.meta.bestAntimatter))+", Meta-dimension shifts/boosts: "+temp.meta.resets
			else if (!temp.dilation.studies.includes(5)) temp2="Time Theorems: "+shortenMoney(getTotalTT(temp))+", "+temp2
			else if (!temp.dilation.upgrades.includes(10)) temp2="Eternity points: "+shortenDimensions(temp.eternityPoints)+", "+temp2
			msg+=temp2
		} else {
			var totalChallengeCompletions=(temp.aarexModifications.newGameMinusVersion?-6:0)
			for (ec=1;ec<13;ec++) totalChallengeCompletions+=(temp.eternityChalls['eterc'+ec]?temp.eternityChalls['eterc'+ec]:0)
			if (totalChallengeCompletions>0) {
				msg+="Time Theorems: "+getFullExpansion(getTotalTT(temp))+", Challenge completions: "+totalChallengeCompletions
			} else if (temp.eternities>(temp.aarexModifications.newGameMinusVersion?-20:0)) msg+="Eternity points: "+shortenDimensions(new Decimal(temp.eternityPoints))+", Eternities: "+temp.eternities.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+", Time Theorems: "+getTotalTT(temp)
			else if (temp.achievements.includes("r51")) {
				msg+="Antimatter: "+shortenMoney(new Decimal(temp.money))+", Infinity points: "+shortenDimensions(new Decimal(temp.infinityPoints))
				if (temp.postChallUnlocked>0&&!temp.replicanti.unlocked) {
					var totalChallengeCompletions=0
					for (ic=1;ic<13;ic++) totalChallengeCompletions+=temp.challenges.includes("postc"+ic)?1:0
					msg+=", Challenge completions: "+totalChallengeCompletions
				}
			} else if (temp.infinitied>(temp.aarexModifications.newGameMinusVersion?990:temp.aarexModifications.newGamePlusVersion?1:0)) msg+="Infinity points: "+shortenDimensions(new Decimal(temp.infinityPoints))+", Infinities: "+temp.infinitied.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+", Challenge completions: "+temp.challenges.length
			else if (temp.galacticSacrifice?temp.galacticSacrifice.times>0:false) msg+="Antimatter: "+shortenMoney(new Decimal(temp.money))+", Galaxy points: "+shortenDimensions(new Decimal(temp.galacticSacrifice.galaxyPoints))
			else msg+="Antimatter: "+shortenMoney(new Decimal(temp.money))+", Dimension Shifts/Boosts: "+temp.resets+((temp.tickspeedBoosts != undefined ? (temp.resets > 0 || temp.tickspeedBoosts > 0 || temp.galaxies > 0 || temp.infinitied > 0 || temp.eternities != 0 || isSaveQuantumed) : false)?", Tickspeed boosts: "+getFullExpansion(temp.tickspeedBoosts):"")+", Galaxies: "+temp.galaxies
		}
		player.break=originalBreak
		player.options.notation=originalNotation
		player.options.commas=originalCommas

		getEl("save_"+saveId+"_title").textContent=temp.aarexModifications.save_name?temp.aarexModifications.save_name:"Save #"+placement
	} catch (_) {
		var msg = "New game"
	}
	element.innerHTML = msg
}

var modsShown = false
var modFullNames = {
	rs: "Respecced",
	arrows: "NG↑",
	ngpp: "NG++",
	ngp: "NG+",
	ngmm: "NG--",
	ngm: "NG-",
	ngud: "NGUd",
	nguep: "NGUd↑'",
	ngmu: "NG*",
	ngumu: "NGUd*'",
	ngex: "Expert Mode",
	aau: "AAU",
	ngprw: "NG+ Reworked",
	ls: "Light Speed",
	ngc: "NG Condensed",
	ez: "Barrier-Easing",
	ngm5rg: "NG- Regulated"
}
var modSubNames = {
	ngm: ["OFF", "ON", "NG- Remade"],
	ngp: ["OFF", "ON (v3)", "NG+4"/*, "NG+5"*/],
	ngpp: ["OFF", "ON", "NG+++"],
	arrows: ["Linear (↑⁰)", "Exponential (↑)"/*, "Tetrational (↑↑)"*/],
	ngmm: ["OFF", "ON", "NG---", "NG-4", "NG-5"/*, "NG-6"*/],
	rs: ["NONE", "Eternity", "Infinity"],
	ngud: ["OFF", "ON", "Prime (')", "Semiprime (S')"/*, "Semiprime.1 (S'.1)"*/],
	nguep: ["Linear' (↑⁰')", "Exponential' (↑')"/*, "Tetrational' (↑↑')"*/]/*,
	ngmu: ["OFF", "ON", "NG**", "NG***"], // probably delete?
	ngumu: ["OFF", "ON", "NGUd**'", "NGUd***'"], // probably delete?
	ngex: ["OFF", "ON", "DEATH MODE 💀"]*/ // modes that aren't even made yet
}
function toggle_mod(id) {
	if (id == "ngm5rg") {
		alert("Coming soon...")
		return
	}

	hasSubMod = Object.keys(modSubNames).includes(id)
	// Change submod
	var subMode = ((modes[id] || 0) + 1) % ((hasSubMod && modSubNames[id].length) || 2)
	if (id == "ngp" && subMode == 2 && (!(modes.ngpp >= 1) || !metaSave.ngp4)) subMode = 0
	else if (id == "ngpp" && subMode == 1 && (modes.ngud || modes.ngex)) subMode = 2
	else if (id == "ngpp" && subMode == 3 && modes.ngex) subMode = 0
	else if (id == "arrows" && subMode == 2 && modes.rs) subMode = 0
	modes[id] = subMode
	// Update displays
	getEl(id+"Btn").textContent=`${modFullNames[id]}: ${hasSubMod?modSubNames[id][subMode] : subMode ? "ON" : "OFF"}`
	if (id=="ngex"&&subMode) {
		modes.ngp=0
		modes.aau=0
		modes.ls=0
		getEl("ngpBtn").textContent = "NG+: OFF"
		getEl("aauBtn").textContent = "AAU: OFF"
		getEl("lsBtn").textContent = "Light Speed: OFF"
	}
	if ((id=="ngp"||id=="aau"||id=="ls"||((id=="ngpp"||(id=="ngud"&&subMode>1))&&!metaSave.ngp3ex))&&subMode) {
		modes.ngex=0
		getEl("ngexBtn").textContent = "Expert Mode: OFF"
	}
	if ((id=="ngpp"||id=="ngud")&&subMode) {
		if (!modes.ngp && !modes.ngex) toggle_mod("ngp")
		modes.rs=0
		getEl("rsBtn").textContent = "Respecced: NONE"
	}
	if (
		(id=="ngpp" && !subMode && modes.ngp >= 2) ||
		(id=="rs" && subMode && modes.ngp >= 2) ||
		(id=="ngmm" && subMode && modes.ngp >= 2) ||
		(id=="ngud" && subMode && modes.ngp >= 3)
	) {
		modes.ngp=1
		getEl("ngpBtn").textContent = "NG+: ON"
	}
	if (((id=="ngud"&&((subMode>1&&!modes.ngpp)||modes.ngpp==1))||(id=="ngex"&&modes.ngpp==1&&metaSave.ngp3ex))&&subMode) {
		modes.ngpp=2
		getEl("ngppBtn").textContent = "NG++: NG+++"
	}
	if (id=="ngex"&&!metaSave.ngp3ex&&subMode) {
		modes.ngpp=0
		getEl("ngppBtn").textContent = "NG++: OFF"
	}
	if (id=="rs"&&subMode) {
		modes.ngpp=0
		getEl("ngppBtn").textContent = "NG++: OFF"
	}

	if (id=="rs"&&subMode) {
		modes.ngud=0
		getEl("ngudBtn").textContent = "NGUd: OFF"
	}
	if (id=="ngp"&&subMode>2) {
		modes.ngud=0
		getEl("ngudBtn").textContent = "NGUd: OFF"
	}
	if (((id=="ngpp"||id=="ngud")&&!subMode)||((id=="rs"||(id=="ngex"&&!metaSave.ngp3ex))&&subMode)||(id=="ngp"&&subMode>2)) {
		if (modes.ngud>1) {
			modes.ngud=1
			getEl("ngudBtn").textContent = "NGUd: ON"
		}
		if (id=="rs"&&modes.arrows>1) {
			modes.arrows=1
			getEl("arrowsBtn").textContent = "NG↑: Exponential (↑)"
		}
		modes.nguep=0
		modes.ngumu=0
		getEl("nguepBtn").textContent = "NGUd↑': Linear' (↑⁰')"
		getEl("ngumuBtn").textContent = "NGUd*': OFF"
	}
	if ((id=="ngumu"||id=="nguep")&&!(modes.ngud>1)&&subMode) {
		modes.ngud=1
		toggle_mod("ngud")
	}

	var ngp3ex = modes.ngex&& modes.ngpp
	if (modes.ngp3ex != ngp3ex) {
		if (ngp3ex) $.notify("A space crystal begins to collide with reality...")
		modes.ngp3ex = ngp3ex
	}
	/* 
	this function is a MESS someone needs to clean it up
	Also, id=NGC should force NG+++ and not NG+, 
	NGC being on, and id = ngpp then NG+ off
	I also dont know how to do this and this is supa ugly so pls fix
	*/
}

function show_mods() {
	modsShown=!modsShown
	getEl("modsBtn").textContent=modsShown?"Saves":"Mods"
	getEl("savesTab").style.display=modsShown?"none":""
	getEl("modsTab").style.display=modsShown?"":"none"
}

getEl("animationoptionsbtn").onclick = function () {
	closeToolTip();
	getEl("animationoptions").style.display = "flex";
};

getEl("confirmations").onclick = function () {
	closeToolTip();
	getEl("confirmationoptions").style.display = "flex";
};

function showVisibilityMenu() {
	closeToolTip();
	getEl("visibilityoptions").style.display = "flex";
};

function showNextModeMessage() {
	if (ngModeMessages.length > 0) {
		getEl("welcome").style.display = "flex"
		getEl("welcomeMessage").innerHTML = ngModeMessages[ngModeMessages.length-1]
		ngModeMessages.pop()
	} else getEl("welcome").style.display = "none"
}

function verify_save(obj) {
	if (typeof obj != 'object') return false;
	return true;
}

var onImport = false
function import_save(type) {
	if (type=="current") type=metaSave.current
	else if (type!="new") {
		var placement=1
		while (metaSave.saveOrder[placement-1]!=type) placement++
	}
	onImport = true
	var save_data = prompt("Input your save. "+(type=="new"?"":"("+(type==metaSave.current?"your current save file":"save #"+placement)+" will be overwritten!)"));
	onImport = false
	if (save_data.constructor !== String) save_data = "";
	if (sha512_256(save_data.replace(/\s/g, '').toUpperCase()) === "80b7fdc794f5dfc944da6a445a3f21a2d0f7c974d044f2ea25713037e96af9e3") {
		getEl("body").style.animation = "barrelRoll 5s 1";
		giveAchievement("Do a barrel roll!")
		setTimeout(function(){ getEl("body").style.animation = ""; }, 5000)
	}
	if (sha512_256(save_data.replace(/\s/g, '').toUpperCase()) === "857876556a230da15fe1bb6f410ca8dbc9274de47c1a847c2281a7103dd2c274") giveAchievement("So do I");
	if (sha512_256(save_data.replace(/\s/g, '').toUpperCase()) === "8aaff3cdcf68f6392b172ee9924a22918451e511c8e60b120f09e2c16d4e26ac") giveAchievement("The Forbidden Layer");
	if (sha512_256(save_data) === "de24687ee7ba1acd8f5dc8f71d41a3d4b7f14432fff53a4d4166e7eea48a88c0") {
		player.options.theme = "S1";
		player.options.secretThemeKey = save_data;
		setTheme(player.options.theme);
	} else if (sha512_256(save_data) === "76269d18c05c9ebec8a990a096cee046dea042a0421f8ab81d17f34dd1cdbdbf") {
		player.options.theme = "S2";
		player.options.secretThemeKey = save_data;
		setTheme(player.options.theme);
	} else if (sha512_256(save_data) === "d764e9a1d1e18081be19f3483b537ae1159ab40d10e096df1d9e857d68d6ba7a") {
		player.options.theme = "S3";
		player.options.secretThemeKey = save_data;
		setTheme(player.options.theme);
	} else if (sha512_256(save_data) === "ae0199482ecfa538a03eb37c67866e67a11f1832516c26c7939e971e514d40c5") {
		player.options.theme = "S4";
		player.options.secretThemeKey = save_data;
		setTheme(player.options.theme);
	} else if (sha512_256(save_data) === "7a668b64cdfe1bcdf7a38d3858429ee21290268de66b9784afba27dc5225ce28") {
		player.options.theme = "S5";
		player.options.secretThemeKey = save_data;
		setTheme(player.options.theme);
	} else if (sha512_256(save_data) === "4f82333af895f5c89e6b2082a7dab5a35b964614e74908961fe915cefca1c6d0") {
		player.options.theme = "S6";
		player.options.secretThemeKey = save_data;
		setTheme(player.options.theme);
	} else {
		var decoded_save_data = JSON.parse(atob(save_data, function(k, v) { return (v === Infinity) ? "Infinity" : v; }));
		if (!verify_save(decoded_save_data)) {
			forceHardReset = true
			reset_game()
			forceHardReset = false
			return
		} else if (!decoded_save_data||!save_data) {
			alert('could not load the save..')
			return
		}
		/*
		// Live-server only
		let ghostify_data=decoded_save_data.ghostify
		if (ghostify_data&&ghostify_data.wzb&&ghostify_data.wzb.unlReal!==undefined&&ghostify_data.wzb.unl!=ghostify_data.wzb.unlReal) {
			alert('You are not allowed to import this save as this save comes from the testing branch of the game.')
			return
		}
		*/
		if (type==metaSave.current) {
			clearInterval(gameLoopIntervalId)
			infiniteCheck2 = false
			player = decoded_save_data;
			if (detectInfinite()) infiniteDetected=true
			if (!game_loaded) {
				set_save(metaSave.current, player)
				document.location.reload(true)
				return
			}
			onLoad()
			if (infiniteDetected) {
				if (getEl("welcome").style.display != "flex") getEl("welcome").style.display = "flex"
				getEl("welcomeMessage").innerHTML = "Because you imported a save that has an Infinite bug in it, saving is disabled. Most functionality is disabled to prevent further damage. It is highly recommended that you report this occurrence to the #bugs_and_glitches channel on the Discord server, so the bug can be looked into and fixed. It is not recommended to modify the save as it may result in undesirable effects, and will be hard reset after you switch saves or refresh the game."
			}
			startInterval()
		} else if (type === "new") {
			var newSaveId=1
			while (metaSave.saveOrder.includes(newSaveId)) newSaveId++
			metaSave.saveOrder.push(newSaveId)
			localStorage.setItem(btoa(savePrefix+newSaveId),save_data)
			if (!game_loaded) {
				metaSave.current=newSaveId
				localStorage.setItem(metaSaveId,btoa(JSON.stringify(metaSave)))
				document.location.reload(true)
				return
			}
			latestRow=getEl("saves").insertRow(loadedSaves)
			latestRow.innerHTML=getSaveLayout(newSaveId)
			loadedSaves++
			changeSaveDesc(newSaveId, loadedSaves)
			localStorage.setItem(metaSaveId,btoa(JSON.stringify(metaSave)))
		} else {
			set_save(type, decoded_save_data)
			if (!game_loaded) {
				metaSave.current=type
				localStorage.setItem(metaSaveId,btoa(JSON.stringify(metaSave)))
				document.location.reload(true)
				return
			}
			changeSaveDesc(type, placement)
			$.notify("Save #"+placement+" imported", "info")
		}
	}
}

function reset_game() {
	if (!forceHardReset) if (!confirm("Do you really want to erase all your progress in this save?")) return
	clearInterval(gameLoopIntervalId)
	infiniteDetected = false
	updateNewPlayer(true)
	if (!game_loaded) {
		set_save(metaSave.current, player)
		document.location.reload(true)
		return
	}
	save_game(true)
	onLoad()
	startInterval()
};

function getEPGainBase() {
	let base = 308
	if (hasAch("ng3p23")) base = 307.8
	if (hasTS(112) && tmp.ngC) base /= 2
	if (hasTS(113) && tmp.ngC) base /= 1.5
	return base;
}

function gainedEternityPoints() {
	let uEPM = player.dilation.upgrades.includes("ngp3c7") && tmp.ngC
	var ret = Decimal.pow(5, player.infinityPoints.plus(gainedInfinityPoints()).e / getEPGainBase() - 0.7).times(uEPM ? 1 : player.epmult)
	if (tmp.mod.newGameExpVersion) ret = ret.times(10)
	if (hasTimeStudy(61)) ret = ret.times(tsMults[61]())
	if (hasTimeStudy(121)) ret = ret.times(hasAch("ngpp11") ? 50 : ((253 - averageEp.dividedBy(player.epmult).dividedBy(10).min(248).max(3))/5)) 
	if (hasTimeStudy(122)) ret = ret.times(hasAch("ngpp11") ? 50 : 35)
	if (hasTimeStudy(123)) ret = ret.times(Math.sqrt(1.39*player.thisEternity/10))
	if (hasGalUpg(51)) ret = ret.times(galMults.u51())
	if (tmp.ngp3) {
		if (player.quantum.bigRip.active) {
			if (isBigRipUpgradeActive(5)) ret = ret.times(tmp.qu.bigRip.spaceShards.max(1))
			if (isBigRipUpgradeActive(8)) ret = ret.times(tmp.bru[8])
		}
		if (tmp.be) ret = ret.times(getBreakUpgMult(7))
	}
	if (tmp.ngC) ret = softcap(ret, "ep_ngC")
	if (hasTS(172) && tmp.ngC) ret = ret.times(tsMults[172]())
	if (uEPM) ret = ret.times(player.epmult)
	return ret.floor()
}

//notation stuff
var notationArray = ["Scientific", "Engineering", "Logarithm", "Mixed scientific", 
		     "Mixed engineering", "Mixed logarithm", "Letters", "Standard",
		     "Emojis","Brackets", "Infinity", "Greek", "Game percentages", 
		     "Hexadecimal", "Tetration", "Hyperscientific", "Psi", "Morse code",
		     "Spazzy", "Country Codes", "Iroha", "Symbols", "Lines", 
		     "Simplified Written", "Time", "Base-64", "AF2019", "AAS", "AF5LN"]

function updateNotationOption() {
	var notationMsg = "Notation: " + (player.options.notation == "Emojis" ? "Cancer" : player.options.notation)
	var commasMsg = (player.options.commas == "Emojis" ? "Cancer" : player.options.commas) + " on exponents"
	getEl("notation").innerHTML = "<p style='font-size:15px'>Notations</p>" + notationMsg + "<br>" + commasMsg
	getEl("chosenNotation").textContent = player.options.notation=="AF5LN"?"Notation: Aarex's Funny 5-letter Notation":notationMsg
	getEl("chosenCommas").textContent = player.options.commas=="AF5LN"?"Aarex's Funny 5-letter Notation on exponents":commasMsg
	
	let tooltip=""
	if (player.options.notation=="AAS") tooltip="Notation: Aarex's Abbreviation System"
	if (player.options.notation=="AF5LN") tooltip="Notation: Aarex's Funny 5-letter Notation"
	if (player.options.commas=="AAS") tooltip+=(tooltip==""?"":"\n")+"Aarex's Abbreviation System on exponents"
	if (player.options.commas=="AF5LN") tooltip+=(tooltip==""?"":"\n")+"Aarex's Funny 5-letter Notation on exponents"
	if (tooltip=="") getEl("notation").removeAttribute('ach-tooltip')
	else getEl("notation").setAttribute('ach-tooltip', tooltip)
}

function onNotationChange() {
	document.getElementsByClassName("hideInMorse").display = player.options.notation == "Morse code" || player.options.notation == 'Spazzy' ? "none" : ""
	updateNotationOption()
	if (player.pSac !== undefined) updatePUCosts()
	updateLastTenRuns();
	updateLastTenEternities();
	updateLastTenQuantums();
	updateLastTenGhostifies()
	tmp.tickUpdate = true;
	setAchieveTooltip();
	updateSingularity()
	updateDimTechs()
	updateDilationUpgradeCosts()
	updateExdilation()
	updateMilestones()
	if (tmp.ngp3) {
		updateQuarksTabOnUpdate()
		updateGluonsTabOnUpdate("notation")
		updateQuantumWorth("notation")
		updateElectrons()
		updateBankedEter()
		updateQuantumChallenges()
		updateBestPC68Display()
		updateMasteryStudyTextDisplay()
		updateReplicants("notation")
		updateTODStuff()
		updateBreakEternity()
		onNotationChangeNeutrinos()
		updateBosonicStuffCosts()
		if (!player.ghostify.ghostlyPhotons.unl) getEl("gphUnl").textContent = "To unlock Ghostly Photons, you need to get "+shortenCosts(Decimal.pow(10,6e9))+" antimatter while your universe is Big Ripped first."
		else if (!player.ghostify.wzb.unl) updateBLUnlockDisplay()
		else updateBosonUnlockDisplay()
		GDs.updateDisplay()
		if (ph.did("planck")) pl.updateDisplay()
	}
	getEl("epmult").innerHTML = "You gain 5 times more EP<p>Currently: "+shortenDimensions(player.epmult)+"x<p>Cost: "+shortenDimensions(player.epmultCost)+" EP"
	getEl("achmultlabel").textContent = "Current achievement multiplier on each Dimension: " + shortenMoney(player.achPow) + "x"
	if (hasAch("ng3p18") || hasAch("ng3p37")) {
		getEl('bestTP').textContent="Your best"+(ph.did("ghostify") ? "" : " ever")+" Tachyon particles"+(ph.did("ghostify") ? " in this Ghostify" : "")+" was "+shorten(player.dilation.bestTP)+"."
		setAndMaybeShow('bestTPOverGhostifies',ph.did("ghostify"),'"Your best-ever Tachyon particles was "+shorten(player.dilation.bestTPOverGhostifies)+"."')
	}
}

function switchNotation(id) {
	if (player.options.notation == notationArray[id]) return
	player.options.notation = notationArray[id]
	onNotationChange()
}

function switchCommas(id) {
	if (id > 1) id = notationArray[id-2]
	else if (id > 0) id = "Same notation"
	else id = "Commas"
	if (player.options.commas == id) return
	player.options.commas = id
	onNotationChange()
}

var notationMenuDone = false
getEl("notation").onclick = function () {
	closeToolTip()
	if (!notationMenuDone) {
		notationMenuDone = true
		let notationsTable = getEl("notationOptions")
		let commasTable = getEl("commasOptions")
		let subTable = getEl("subNotationOptions")
		let selectList = ""
		
		var row = commasTable.insertRow(0)
		row.innerHTML = "<button class='storebtn' style='width:160px; height: 40px' onclick='switchCommas(0)'>Commas on exponents</button>"
		row = commasTable.insertRow(1)
		row.innerHTML = "<button class='storebtn' style='width:160px; height: 40px' onclick='switchCommas(1)'>Same notation on exponents</button>"
		
		for (n = 0; n < notationArray.length; n++) {
			var name = notationArray[n] == "Emojis" ? "Cancer" : notationArray[n]
			row = notationsTable.insertRow(n)
			row.innerHTML = "<button class='storebtn' id='select" + name + "' style='width:160px; height: 40px' onclick='switchNotation(" + n + ")'>Select " + name + "</button>"
			row = commasTable.insertRow(n + 2)
			row.innerHTML="<button class='storebtn' id='selectCommas" + name + "' style='width:160px; height: 40px' onclick='switchCommas(" + (n + 2) + ")'>" + name + " on exponents</button>"
			if (n > 18) {
				row = subTable.insertRow(n - 1)
				row.innerHTML="<button class='storebtn' id='selectSub" + name + "' style='width:160px; height: 40px' onclick='switchSubNotation(" + n + ")'>Select " + name + "</button>"
			} else if (n < 18) {
				row = subTable.insertRow(n)
				row.innerHTML = "<button class='storebtn' style='width:160px; height: 40px' onclick='switchSubNotation(" + n + ")'>Select " + name + "</button>"	
			}
		}
		getEl("selectAAS").setAttribute("ach-tooltip", "Select Aarex's Abbreviation System")
		getEl("selectCommasAAS").setAttribute("ach-tooltip", "Aarex's Abbreviation System on exponents")
		getEl("selectAF5LN").setAttribute("ach-tooltip", "Select Aarex's Funny 5-letter Notation")
		getEl("selectCommasAF5LN").setAttribute("ach-tooltip", "Aarex's Funny 5-letter Notation on exponents")
	}
	getEl("notationmenu").style.display = "block"
};

function openNotationOptions() {
	if (getEl("mainnotationoptions1").style.display == "") {
		formatPsi(1, 1)
		getEl("openpsioptions").textContent = "Go back"
		getEl("mainnotationoptions1").style.display = "none"
		getEl("mainnotationoptions2").style.display = "none"
		getEl("notationoptions").style.display = ""
		
		getEl("significantDigits").value = player.options.scientific.significantDigits ? player.options.scientific.significantDigits : 0
		getEl("logBase").value = player.options.logarithm.base
		getEl("tetrationBase").value = player.options.tetration.base
		getEl("maxLength").value = player.options.psi.chars
		getEl("maxArguments").value = Math.min(player.options.psi.args, 4)
		getEl("maxLetters").value = player.options.psi.maxletters
		getEl("psiSide").textContent = "Non-first arguments on " + (player.options.psi.side == "r" ? "right" : "left") + " side"
		var letters = [null, 'E', 'F', 'G', 'H']
		getEl("psiLetter").textContent = (player.options.psi.letter[0] ? "Force " + letters[player.options.psi.letter[0]] : "Automatically choose letter")
		getEl("chosenSubNotation").textContent = "Sub-notation: " + (player.options.spazzy.subNotation == "Emojis" ? "Cancer" : player.options.spazzy.subNotation)
		getEl("useHyphens").checked = player.options.aas.useHyphens
		getEl("useDe").checked = player.options.aas.useDe
	} else {
		getEl("openpsioptions").textContent = "Notation options"
		getEl("mainnotationoptions1").style.display = ""
		getEl("mainnotationoptions2").style.display = ""
		getEl("notationoptions").style.display = "none"
	}
}

function switchOption(notation,id) {
	if (notation == "scientific") {
		if (id === "significantDigits") {
			var value = parseFloat(getEl(id).value)
			if (isNaN(value)) return
			if (value % 1 != 0) return
			if (value < 0 || value > 10) return
			if (value == 0) player.options.scientific.significantDigits = undefined
			else player.options.scientific.significantDigits = value
		}
	} else if (notation === "logarithm") {
		if (id == "base") {
			var value=parseFloat(getEl("logBase").value)
		}
		if (isNaN(value)) return
		if (id == "base") {
			if (value <= 1 || value > Number.MAX_VALUE) return
			else player.options.logarithm.base = value
		}
	} else if (notation === "tetration") {
		if (id == "base") {
			var value=parseFloat(getEl("tetrationBase").value)
		}
		if (isNaN(value)) return
		if (id === "base") {
			if (value < 1.6 || value > Number.MAX_VALUE) return
			else player.options.tetration.base = value
		}
	} else if (notation === "psi") {
		if (id.slice(0, 7) === "psiSide") {
			player.options.psi.side = id.slice(7, 8)
			getEl("psiSide").textContent = "Non-first arguments on " + (player.options.psi.side === "r" ? "right" : "left") + " side"
			return
		}
		if (id.slice(0, 9) === "psiLetter") {
			var letters = {None: [], E: [1], F: [2], G: [3], H: [4]}
			player.options.psi.letter = letters[id.slice(9, id.length)]
			getEl("psiLetter").textContent = (player.options.psi.letter[0] ? "Force " + id.slice(9, id.length) : "Automatically choose letter")
			return
		}
		var value = parseFloat(getEl(id).value)
		if (isNaN(value)) return
		if (value % 1 != 0) return
		if (id === "maxLength") {
			if (value < 2 || value > 30) return
			player.options.psi.chars=value
		}
		if (id === "maxArguments") {
			if (value < 1||value > 6) return
			player.options.psi.args=value
		}
		if (id === "maxLetters") {
			if (value < 1 || value > 4) return
			player.options.psi.maxletters=value
		}
	} else if (notation === "aas") player.options.aas[id] = getEl(id).checked
	onNotationChange()
}

function switchSubNotation(id) {
	if (player.options.spazzy.subNotation == notationArray[id]) return
	player.options.spazzy.subNotation = notationArray[id]
	getEl("chosenSubNotation").textContent = "Sub-notation: " + (player.options.spazzy.subNotation == "Emojis" ? "Cancer" : player.options.spazzy.subNotation)
	onNotationChange()
}

function showHideFooter(toggle) {
	if (toggle) tmp.mod.noFooter = !tmp.mod.noFooter
	getEl("footerBtn").textContent = (tmp.mod.noFooter ? "Show" : "Hide") + " footer"
	document.documentElement.style.setProperty('--footer', tmp.mod.noFooter ? "none" : "")
}

getEl("newsbtn").onclick = function(force) {
	player.options.newsHidden=!player.options.newsHidden
	getEl("newsbtn").textContent=(player.options.newsHidden?"Show":"Hide")+" news ticker"
	getEl("game").style.display=player.options.newsHidden?"none":"block"
	if (!player.options.newsHidden) scrollNextMessage()
}

function getSacrificeBoost(){
	return calcSacrificeBoost()
}

function getTotalSacrificeBoost(next = false) {
	return calcTotalSacrificeBoost(next)
}

function calcSacrificeBoostBeforeSoftcap() {
	let ret
	let pow
	if (player.firstAmount == 0) return new Decimal(1);
	if (player.challenges.includes("postc2") || (inNGM(3) && player.currentChallenge == "postc2")) {
		pow = 0.01
		if (hasTimeStudy(228)) pow = 0.013
		else if (hasAch("r97") && player.boughtDims) pow = 0.012
		else if (hasAch("r88")) pow = 0.011
		ret = player.firstAmount.div(player.sacrificed.max(1)).pow(pow).max(1)
	} else if (!inNC(11)) {
		pow = 2
		if (hasAch("r32")) pow += inNGM(3) ? 2 : 0.2
		if (hasAch("r57")) pow += player.boughtDims ? 0.3 : 0.2 //this upgrade was too OP lol
		if (player.infinityUpgradesRespecced) pow *= getInfUpgPow(5)
		if (tmp.ngmR) pow *= 1.5
		if (tmp.ez) pow *= 1.5
		ret = Decimal.pow(Math.max(player.firstAmount.e / 10, 1) / Math.max(player.sacrificed.e / 10, 1), pow).max(1)
	} else ret = player.firstAmount.pow(0.05).dividedBy(player.sacrificed.pow(inNGM(4)?0.05:0.04).max(1)).max(1)
	if (player.boughtDims) ret = ret.pow(1 + Math.log(1 + Math.log(1 + player.timestudy.ers_studies[1] / 5)))
	if (tmp.ngC) ret = ret.pow(ngC.getSacrificeExpBoost())
	if (hasTS(196)) ret = ret.pow(20)
	return ret
}

function calcTotalSacrificeBoostBeforeSoftcap(next) {
	if (player.resets < 5) return new Decimal(1)
	let ret
	let pow
	if (player.challenges.includes("postc2") || (inNGM(3) && player.currentChallenge == "postc2")) {
		pow = 0.01
		if (hasTimeStudy(228)) pow = 0.013
		else if (hasAch("r97") && player.boughtDims) pow = 0.012
		else if (hasAch("r88")) pow = 0.011
		ret = player.sacrificed.pow(pow).max(1)
	} else if (!inNC(11)) {
		pow = 2
		if (hasAch("r32")) pow += inNGM(3) ? 2 : 0.2
		if (hasAch("r57")) pow += player.boughtDims ? 0.3 : 0.2 //this upgrade was too OP lol
		if (player.infinityUpgradesRespecced) pow *= getInfUpgPow(5)
		if (tmp.ngmR) pow *= 1.5
		if (tmp.ez) pow *= 1.5
		ret = Decimal.pow(Math.max(player.sacrificed.e / 10, 1), pow)
	} else ret = player.chall11Pow 
	if (player.boughtDims) ret = ret.pow(1 + Math.log(1 + Math.log(1 + (player.timestudy.ers_studies[1] + (next ? 1 : 0))/ 5)))
	if (tmp.ngC) ret = ret.pow(ngC.getSacrificeExpBoost())
	if (hasTS(196)) ret = ret.pow(20)
	return ret
}

function calcSacrificeBoost() {
	let ret = calcSacrificeBoostBeforeSoftcap()
	if (tmp.ngC) {
		let total = calcTotalSacrificeBoostBeforeSoftcap()
		ret = softcap(ret.times(total), "sac_ngC").div(tmp.sacPow)
		if (hasTS(196)) ret = ret.pow(20)
	}
	return ret.max(1)
}

function calcTotalSacrificeBoost(next) {
	let ret = calcTotalSacrificeBoostBeforeSoftcap(next)
	if (tmp.ngC) ret = softcap(ret, "sac_ngC")
	if (hasTS(196)) ret = ret.pow(20)	
	return ret
}

function sacrifice(auto = false) {
	if (player.eightAmount == 0) return false;
	if (player.resets < 5) return false
	if (player.currentEternityChall == "eterc3") return false
	var sacGain = calcSacrificeBoost()
	var maxPower = inNGM(2) ? "1e8888" : Number.MAX_VALUE
	if (inNC(11) && (tmp.sacPow.gte(maxPower) || player.chall11Pow.gte(maxPower))) return false
	if (!auto) floatText("D8", "x" + shortenMoney(sacGain))
	player.sacrificed = player.sacrificed.plus(player.firstAmount);
	if (!inNC(11)) {
		if ((inNC(7) || player.currentChallenge == "postcngm3_3" || player.pSac !== undefined) && !hasAch("r118")) clearDimensions(6);
		else if (!hasAch("r118")) clearDimensions(7);
	} else {
		player.chall11Pow = player.chall11Pow.times(sacGain)
		if (!hasAch("r118")) resetDimensions();
		player.money = new Decimal(100)
	}
	tmp.sacPow = tmp.sacPow.times(sacGain)
}

getEl("sacrifice").onclick = function () {
	if (player.eightAmount.eq(0)) return false
	if (!getEl("confirmation").checked) {
		if (!confirm("Dimensional Sacrifice will remove all of your First to Seventh Dimensions (with the cost and multiplier unchanged) for a boost to the Eighth Dimension. It will take time to regain production.")) {
			return false;
		}
	}
	auto = false;
	return sacrifice();
}

var ndAutobuyersUsed = 0
function updateAutobuyers() {
	var autoBuyerDim1 = new Autobuyer (1)
	var autoBuyerDim2 = new Autobuyer (2)
	var autoBuyerDim3 = new Autobuyer (3)
	var autoBuyerDim4 = new Autobuyer (4)
	var autoBuyerDim5 = new Autobuyer (5)
	var autoBuyerDim6 = new Autobuyer (6)
	var autoBuyerDim7 = new Autobuyer (7)
	var autoBuyerDim8 = new Autobuyer (8)
	var autoBuyerDimBoost = new Autobuyer (9)
	var autoBuyerGalaxy = new Autobuyer (getEl("secondSoftReset"))
	var autoBuyerTickspeed = new Autobuyer (getEl("tickSpeed"))
	var autoBuyerInf = new Autobuyer (getEl("bigcrunch"))
	var autoSacrifice = new Autobuyer(13)

	if (tmp.mod.newGameExpVersion || tmp.ez) {
		autoBuyerDim1.interval = 1000
		autoBuyerDim2.interval = 1000
		autoBuyerDim3.interval = 1000
		autoBuyerDim4.interval = 1000
		autoBuyerDim5.interval = 1000
		autoBuyerDim6.interval = 1000
		autoBuyerDim7.interval = 1000
		autoBuyerDim8.interval = 1000
	} else {
		autoBuyerDim1.interval = 1500
		autoBuyerDim2.interval = 2000
		autoBuyerDim3.interval = 2500
		autoBuyerDim4.interval = 3000
		autoBuyerDim5.interval = 4000
		autoBuyerDim6.interval = 5000
		autoBuyerDim7.interval = 6000
		autoBuyerDim8.interval = 7500
	}

	autoBuyerDimBoost.interval = 8000
	if (tmp.ez) autoBuyerDimBoost.interval = 1000
	if (player.infinityUpgradesRespecced) autoBuyerDimBoost.bulkBought = false

	autoBuyerGalaxy.interval = inNGM(2) ? 6e4 : 1.5e4
	if (tmp.ez) autoBuyerGalaxy.interval /= 10
	if (player.infinityUpgradesRespecced) autoBuyerGalaxy.bulkBought = false

	autoBuyerTickspeed.interval = 5000
	if (tmp.ez) autoBuyerTickspeed.interval = 1000

	autoBuyerInf.interval = inNGM(2) ? 6e4 : 3e5
	if (tmp.ez) autoBuyerInf.interval /= 10
   	if (player.boughtDims) {
		autoBuyerInf.requireMaxReplicanti = false
		autoBuyerInf.requireIPPeak = false
	}

	autoSacrifice.interval = inNGM(2) ? 1.5e4 : player.infinityUpgradesRespecced ? 3500 : 100
	if (tmp.ez) autoSacrifice.interval /= 10
	autoSacrifice.priority = 5

	autoBuyerDim1.tier = 1
	autoBuyerDim2.tier = 2
	autoBuyerDim3.tier = 3
	autoBuyerDim4.tier = 4
	autoBuyerDim5.tier = 5
	autoBuyerDim6.tier = 6
	autoBuyerDim7.tier = 7
	autoBuyerDim8.tier = 8
	autoBuyerTickSpeed.tier = 9

	if (inNGM(2)) {
		var autoGalSacrifice = new Autobuyer(14)
		autoGalSacrifice.interval = 1.5e4
		if (tmp.ez) autoGalSacrifice.interval /= 10
		autoGalSacrifice.priority = 5
	}
	if (inNGM(3)) {
		var autoTickspeedBoost = new Autobuyer(15)
		autoTickspeedBoost.interval = 1.5e4
		if (tmp.ez) autoTickspeedBoost.interval /= 10
		autoTickspeedBoost.priority = 5
	}
	if (inNGM(4)) {
		var autoTDBoost = new Autobuyer(16)
		autoTDBoost.interval = 1.5e4
		if (tmp.ez) autoTDBoost.interval /= 10
		autoTDBoost.priority = 5
		autoTDBoost.overXGals = 0
	}

    	if (player.challenges.includes("challenge1") && player.autobuyers[0] == 1) {
        	player.autobuyers[0] = autoBuyerDim1
        	getEl("autoBuyer1").style.display = "inline-block"
    	} else getEl("autoBuyer1").style.display = "none"
    	if (player.challenges.includes("challenge2") && player.autobuyers[1] == 2) {
        	player.autobuyers[1] = autoBuyerDim2
        	getEl("autoBuyer2").style.display = "inline-block"
    	} else getEl("autoBuyer2").style.display = "none"
    	if (player.challenges.includes("challenge3") && player.autobuyers[2] == 3) {
        	player.autobuyers[2] = autoBuyerDim3
        	getEl("autoBuyer3").style.display = "inline-block"
    	} else getEl("autoBuyer3").style.display = "none"
    	if (player.challenges.includes("challenge4") && player.autobuyers[9] == 10) {
        	player.autobuyers[9] = autoBuyerDimBoost
        	getEl("autoBuyerDimBoost").style.display = "inline-block"
    	} else {
        	getEl("autoBuyerDimBoost").style.display = "none"
        	getEl("buyerBtnDimBoost").style.display = ""
    	}
    	if (player.challenges.includes("challenge5") && player.autobuyers[8] == 9) {
        	player.autobuyers[8] = autoBuyerTickspeed
        	getEl("autoBuyerTickSpeed").style.display = "inline-block"
	} else {
        	getEl("autoBuyerTickSpeed").style.display = "none"
        	getEl("buyerBtnTickSpeed").style.display = ""
    	}
    	if (player.challenges.includes("challenge6") && player.autobuyers[4] == 5) {
        	player.autobuyers[4] = autoBuyerDim5
        	getEl("autoBuyer5").style.display = "inline-block"
    	} else getEl("autoBuyer5").style.display = "none"
    	if (player.challenges.includes("challenge7") && player.autobuyers[11] == 12) {
        	player.autobuyers[11] = autoBuyerInf
        	getEl("autoBuyerInf").style.display = "inline-block"
    	} else {
        	getEl("autoBuyerInf").style.display = "none"
        	getEl("buyerBtnInf").style.display = ""
    	}
    	if (player.challenges.includes("challenge8") && player.autobuyers[3] == 4) {
        	player.autobuyers[3] = autoBuyerDim4
        	getEl("autoBuyer4").style.display = "inline-block"
    	} else getEl("autoBuyer4").style.display = "none"
    	if (player.challenges.includes("challenge9") && player.autobuyers[6] == 7) {
        	player.autobuyers[6] = autoBuyerDim7
        	getEl("autoBuyer7").style.display = "inline-block"
    	} else getEl("autoBuyer7").style.display = "none"
    	if (player.challenges.includes("challenge10") && player.autobuyers[5] == 6) {
        	player.autobuyers[5] = autoBuyerDim6
        	getEl("autoBuyer6").style.display = "inline-block"
    	} else getEl("autoBuyer6").style.display = "none"
    	if (player.challenges.includes("challenge11") && player.autobuyers[7] == 8) {
        	player.autobuyers[7] = autoBuyerDim8
        	getEl("autoBuyer8").style.display = "inline-block"
    	} else getEl("autoBuyer8").style.display = "none"
    	if (player.challenges.includes("challenge12") && player.autobuyers[10] == 11) {
        	player.autobuyers[10] = autoBuyerGalaxy
        	getEl("autoBuyerGalaxies").style.display = "inline-block"
        	getEl("buyerBtnGalaxies").style.display = ""
    	} else getEl("autoBuyerGalaxies").style.display = "none"
    	if ((player.challenges.includes("postc2") || player.challenges.includes("challenge13") || player.challenges.includes("challenge16")) && player.autoSacrifice == 1) {
        	player.autoSacrifice = autoSacrifice
        	getEl("autoBuyerSac").style.display = "inline-block"
        	getEl("buyerBtnSac").style.display = ""
    	} else getEl("autoBuyerSac").style.display = "none"
    	if (player.challenges.includes("challenge14") && player.autobuyers[12] == 13) {
        	player.autobuyers[12] = autoGalSacrifice
        	getEl("autoBuyerGalSac").style.display = "inline-block"
        	getEl("buyerBtnGalSac").style.display = ""
    	} else getEl("autoBuyerGalSac").style.display = "none"
   	if (player.challenges.includes("challenge15") && player.autobuyers[13] == 14) {
        	player.autobuyers[13] = autoTickspeedBoost
        	getEl("autoBuyerTickspeedBoost").style.display = "inline-block"
        	getEl("buyerBtnTickspeedBoost").style.display = ""
    	} else getEl("autoBuyerTickspeedBoost").style.display = "none"
    	if (player.challenges.includes("challenge16") && player.autobuyers[14] == 15) {
        	player.autobuyers[14] = autoTDBoost
        	getEl("autoTDBoost").style.display = "inline-block"
		getEl("buyerBtnTDBoost").style.display = ""
    	} else getEl("autoTDBoost").style.display = "none"

	if (getEternitied() >= 100) getEl("autoBuyerEter").style.display = "inline-block"
    	else getEl("autoBuyerEter").style.display = "none"

	var intervalUnits = player.infinityUpgrades.includes("autoBuyerUpgrade") ? 1/2000 : 1/1000
	for (var tier = 1; tier <= 8; ++tier) {
		getEl("interval" + tier).textContent = "Current interval: " + (player.autobuyers[tier-1].interval * intervalUnits).toFixed(2) + " seconds"
	}
	getEl("intervalTickSpeed").textContent = "Current interval: " + (player.autobuyers[8].interval * intervalUnits).toFixed(2) + " seconds"
	getEl("intervalDimBoost").textContent = "Current interval: " + (player.autobuyers[9].interval * intervalUnits).toFixed(2) + " seconds"
	getEl("intervalGalaxies").textContent = "Current interval: " + (player.autobuyers[10].interval * intervalUnits).toFixed(2) + " seconds"
	getEl("intervalInf").textContent = "Current interval: " + (player.autobuyers[11].interval * intervalUnits).toFixed(2) + " seconds"
	getEl("intervalSac").textContent = "Current interval: " + (player.autoSacrifice.interval * intervalUnits).toFixed(2) + " seconds"
	if (inNGM(2)) getEl("intervalGalSac").textContent = "Current interval: " + (player.autobuyers[12].interval * intervalUnits).toFixed(2) + " seconds"
	if (inNGM(3)) getEl("intervalTickspeedBoost").textContent = "Current interval: " + (player.autobuyers[13].interval * intervalUnits).toFixed(2) + " seconds"
	if (inNGM(4)) getEl("intervalTDBoost").textContent = "Current interval: " + (player.autobuyers[14].interval * intervalUnits).toFixed(2) + " seconds"

		var reduction = Math.round(100 - getAutobuyerReduction() * 100)
    	var maxedAutobuy = 0;
    	var e100autobuy = 0;
    	var currencyEnd = inNGM(4) ? " GP" : " IP"
    	for (let tier = 1; tier <= 8; ++tier) {
        	getEl("toggleBtn" + tier).style.display = "inline-block";
        	if (player.autobuyers[tier-1].bulk >= 1e100) {
			player.autobuyers[tier-1].bulk = 1e100;
        		getEl("buyerBtn" + tier).textContent = shortenDimensions(player.autobuyers[tier-1].bulk)+"x bulk purchase";
        		e100autobuy++;
		} else {
			if (player.autobuyers[tier-1].interval <= 100) {
				if (player.autobuyers[tier-1].bulk * 2 >= 1e100) {
					getEl("buyerBtn" + tier).innerHTML = shortenDimensions(1e100)+"x bulk purchase<br>Cost: " + shortenDimensions(player.autobuyers[tier-1].cost) + currencyEnd;
				} else {
					getEl("buyerBtn" + tier).innerHTML = shortenDimensions(player.autobuyers[tier-1].bulk*2)+"x bulk purchase<br>Cost: " + shortenDimensions(player.autobuyers[tier-1].cost) + currencyEnd;
				}
				maxedAutobuy++;
			}
			else getEl("buyerBtn" + tier).innerHTML = reduction + "% smaller interval <br>Cost: " + shortenDimensions(player.autobuyers[tier-1].cost) + currencyEnd
		}
	}

    	if (player.autobuyers[8].interval <= 100) {
        	getEl("buyerBtnTickSpeed").style.display = "none"
        	getEl("toggleBtnTickSpeed").style.display = "inline-block"
        	maxedAutobuy++;
	}

	if (player.autobuyers[11].interval <= 100) {
        	getEl("buyerBtnInf").style.display = "none"
        	maxedAutobuy++
    	}

    	if (canBreakInfinity()) {
        	getEl("postinftable").style.display = "inline-block"
        	getEl("breaktable").style.display = "inline-block"
        	getEl("abletobreak").style.display = "none"
		getEl("break").style.display = "inline-block"
	} else {
        	getEl("postinftable").style.display = "none"
        	getEl("breaktable").style.display = "none"
		getEl("abletobreak").textContent = "You need to " + (tmp.mod.ngexV ? "complete all Normal Challenges" : "get Automated Big Crunch interval to 0.1") + " to be able to break infinity"
		getEl("abletobreak").style.display = "block"
		getEl("break").style.display = "none"
		getEl("break").textContent = "BREAK INFINITY"
    	}

    	if (player.autoSacrifice.interval <= 100) {
        	getEl("buyerBtnSac").style.display = "none"
        	if (inNGM(2) || player.infinityUpgradesRespecced) maxedAutobuy++;
    	}
    	if (inNGM(2)) if (player.autobuyers[12].interval <= 100) {
        	getEl("buyerBtnGalSac").style.display = "none"
        	maxedAutobuy++;
    	}
    	if (inNGM(3)) if (player.autobuyers[13].interval <= 100) {
        	getEl("buyerBtnTickspeedBoost").style.display = "none"
        	maxedAutobuy++;
    	}
    	if (inNGM(4)) if (player.autobuyers[14].interval <= 100) {
        	getEl("buyerBtnTDBoost").style.display = "none"
        	maxedAutobuy++;
    	}

    	getEl("buyerBtnTickSpeed").innerHTML = reduction + "% smaller interval <br>Cost: " + player.autobuyers[8].cost + currencyEnd
	getEl("buyerBtnDimBoost").innerHTML = reduction + "% smaller interval <br>Cost: " + player.autobuyers[9].cost + currencyEnd
    	getEl("buyerBtnGalaxies").innerHTML = reduction + "% smaller interval <br>Cost: " + player.autobuyers[10].cost + currencyEnd
    	getEl("buyerBtnInf").innerHTML = reduction + "% smaller interval <br>Cost: " + player.autobuyers[11].cost + " IP"
    	getEl("buyerBtnSac").innerHTML = reduction + "% smaller interval <br>Cost: " + player.autoSacrifice.cost + currencyEnd
    	if (player.autobuyers[9].interval <= 100) {
        	if (player.infinityUpgradesRespecced && !player.autobuyers[9].bulkBought) getEl("buyerBtnDimBoost").innerHTML = "Buy bulk feature<br>Cost: "+shortenCosts(1e4)+currencyEnd
        	else getEl("buyerBtnDimBoost").style.display = "none"
        	maxedAutobuy++;
	}
    	if (player.autobuyers[10].interval <= 100) {
        	if (player.infinityUpgradesRespecced && !player.autobuyers[10].bulkBought) getEl("buyerBtnGalaxies").innerHTML = "Buy bulk feature<br>Cost: "+shortenCosts(1e4)+currencyEnd
        	else getEl("buyerBtnGalaxies").style.display = "none"
        	maxedAutobuy++;
    	}
    	if (inNGM(2)) getEl("buyerBtnGalSac").innerHTML = reduction + "% smaller interval <br>Cost: " + player.autobuyers[12].cost + currencyEnd
	if (inNGM(3)) getEl("buyerBtnTickspeedBoost").innerHTML = reduction + "% smaller interval <br>Cost: " + player.autobuyers[13].cost + currencyEnd
	if (inNGM(4)) getEl("buyerBtnTDBoost").innerHTML = reduction + "% smaller interval <br>Cost: " + player.autobuyers[14].cost + currencyEnd

	if (maxedAutobuy >= 9) giveAchievement("Age of Automation");
    	if (maxedAutobuy >= getTotalNormalChallenges() + 1) giveAchievement("Definitely not worth it");
    	if (e100autobuy >= 8) giveAchievement("Professional bodybuilder");

    	for (var i=0; i<8; i++) {
        	if (player.autobuyers[i]%1 !== 0) getEl("autoBuyer"+(i+1)).style.display = "inline-block"
	}
    	if (player.autobuyers[8]%1 !== 0) getEl("autoBuyerTickSpeed").style.display = "inline-block"
    	if (player.autobuyers[9]%1 !== 0) getEl("autoBuyerDimBoost").style.display = "inline-block"
    	if (player.autobuyers[10]%1 !== 0) getEl("autoBuyerGalaxies").style.display = "inline-block"
    	if (player.autobuyers[11]%1 !== 0) getEl("autoBuyerInf").style.display = "inline-block"
    	if (player.autoSacrifice%1 !== 0) getEl("autoBuyerSac").style.display = "inline-block"

    	for (var i=1; i<=12; i++) {
        	player.autobuyers[i-1].isOn = getEl(i + "ison").checked;
    	}

    	player.autoSacrifice.isOn = getEl("13ison").checked
    	if (inNGM(2)) {
        	if (player.autobuyers[12]%1 !== 0) getEl("autoBuyerGalSac").style.display = "inline-block"
        	player.autobuyers[12].isOn = getEl("14ison").checked
    	}
    	if (inNGM(3)) {
        	if (player.autobuyers[13]%1 !== 0) getEl("autoBuyerTickspeedBoost").style.display = "inline-block"
        	player.autobuyers[13].isOn = getEl("15ison").checked
    	}
    	if (inNGM(4)) {
        	if (player.autobuyers[14]%1 !== 0) getEl("autoTDBoost").style.display = "inline-block"
        	player.autobuyers[14].isOn = getEl("16ison").checked
    	}
    	player.eternityBuyer.isOn = getEl("eternityison").checked
        player.eternityBuyer.dilationPerAmount = Math.max(parseInt(getEl("prioritydil").value),2)
		if (player.eternityBuyer.isOn&&player.eternityBuyer.dilationMode&&player.eternityBuyer.statBeforeDilation>=player.eternityBuyer.dilationPerAmount&&!player.eternityBuyer.slowStopped&&player.eternityBuyer.dilMode=="amount") {
			startDilatedEternity(true)
			return
		}
		if (tmp.qu && tmp.qu.autobuyer) tmp.qu.autobuyer.enabled = getEl("quantumison").checked
    	priorityOrder()
    	ndAutobuyersUsed=0
    	for (i = 0; i < 9; i++) if (player.autobuyers[i] % 1 !== 0 && player.autobuyers[i].isOn) ndAutobuyersUsed++
	getEl("maxall").style.display=ndAutobuyersUsed>8&&player.challenges.includes("postc8") ? "none" : ""
}

function autoBuyerArray() {
	var tempArray = []
	for (var i=0; i<player.autobuyers.length && i<9; i++) {
		if (player.autobuyers[i]%1 !== 0 ) tempArray.push(player.autobuyers[i])
	}
	return tempArray;
}

var priority = []

function priorityOrder() {
	var tempArray = []
	var i = 1;
	while(tempArray.length != autoBuyerArray().length) {
		for (var x=0 ; x< autoBuyerArray().length; x++) {
			if (autoBuyerArray()[x].priority == i) tempArray.push(autoBuyerArray()[x])
		}
		i++;
	}
	priority = tempArray;
}

function fromValue(value) {
	value = value.replace(/,/g, '')
	let E=value.toUpperCase().split("E")
	if (E.length > 2 && value.split(" ")[0] !== value) {
		var temp = new Decimal(0)
		temp.mantissa = parseFloat(E[0])
		temp.exponent = parseFloat(E[1]+"e"+E[2])
	}
	if (value.includes(" ")) {
		const prefixes = [['', 'U', 'D', 'T', 'Qa', 'Qt', 'Sx', 'Sp', 'O', 'N'],
		['', 'Dc', 'Vg', 'Tg', 'Qd', 'Qi', 'Se', 'St', 'Og', 'Nn'],
		['', 'Ce', 'Dn', 'Tc', 'Qe', 'Qu', 'Sc', 'Si', 'Oe', 'Ne']]
		const prefixes2 = ['', 'MI', 'MC', 'NA', 'PC', 'FM', ' ']
		let e = 0;
		let m,k,l;
		if (value.split(" ")[1].length < 5) {
			for (l=101;l>0;l--) {
				if (value.includes(FormatList[l])) {
					e += l*3
					break
				}
			}
			return Decimal.fromMantissaExponent(parseInt(value.split(" ")[0]), e)
		}
		for (let i=1;i<5;i++) {
			if (value.includes(prefixes2[i])) {
				m = value.split(prefixes2[i])[1]
				for (k=0;k<3;k++) {
					for (l=1;l<10;l++) {
						if (m.includes(prefixes[k][l])) break;
					}
					if (l != 10) e += Math.pow(10,k)*l;
				}
				break;
			}
			return Decimal.fromMantissaExponent(value.split, e*3)
		}
		for (let i=1;i<=5;i++) {
			if (value.includes(prefixes2[i])) {
				for (let j=1;j+i<6;j++) {
					if (value.includes(prefixes2[i+j])) {
						m=value.split(prefixes2[i+j])[1].split(prefixes2[i])[0]
						if (m == "") e += Math.pow(1000,i);
						else {
							for (k=0;k<3;k++) {
								for (l=1;l<10;l++) {
									if (m.includes(prefixes[k][l])) break;
								}
								if (l != 10) e += Math.pow(10,k+i*3)*l;
							}
						}
						break;
					}
				}
			}
		}
		return Decimal.fromMantissaExponent(parseFloat(value), i*3+3)
	}
	if (!isFinite(parseFloat(value[value.length-1]))) { //needs testing
		const l = " abcdefghijklmnopqrstuvwxyz"
		const v = value.replace(parseFloat(value),"")
		let e = 0;
		for (let i=0;i<v.length;i++) {
			for (let j=1;j<27;j++) {
				if (v[i] == l[j]) e += Math.pow(26,v.length-i-1)*j
			}
		}
		return Decimal.fromMantissaExponent(parseFloat(value), e*3)
	}
	value = value.replace(',','')
	if (E[0] === "") return Decimal.fromMantissaExponent(Math.pow(10,parseFloat(E[1])%1), parseInt(E[1]))
	return Decimal.fromString(value)
}

function updatePriorities() {
	auto = false;
	for (var x=0 ; x < autoBuyerArray().length; x++) {
		if (x < 9) autoBuyerArray()[x].priority = parseInt(getEl("priority" + (x+1)).value)
	}
	if (parseInt(getEl("priority10").value) === 69
	    || parseInt(getEl("priority11").value) === 69
	    || parseInt(fromValue(getEl("priority12").value).toString()) === 69
	    || parseInt(getEl("bulkDimboost").value) === 69
	    || parseInt(getEl("overGalaxies").value) === 69
	    || parseInt(fromValue(getEl("prioritySac").value).toString()) === 69
	    || parseInt(getEl("bulkgalaxy").value) === 69
	    || parseInt(fromValue(getEl("priority13").value).toString()) === 69
	    || parseInt(fromValue(getEl("priority14").value).toString()) === 69
	    || parseInt(getEl("overGalaxiesTickspeedBoost").value) === 69
	    || parseInt(getEl("bulkTickBoost").value) === 69
	    || parseInt(fromValue(getEl("priority15").value).toString()) === 69
	    || parseInt(getEl("prioritydil").value) === 69
	    || parseInt(fromValue(getEl("priorityquantum").value).toString()) === 69) giveAchievement("Nice.");
	player.autobuyers[9].priority = parseInt(getEl("priority10").value)
	player.autobuyers[10].priority = parseInt(getEl("priority11").value)
	const infValue = fromValue(getEl("priority12").value)
	if (!isNaN(break_infinity_js ? infValue : infValue.l)) player.autobuyers[11].priority = infValue
	else if (player.autoCrunchMode=="replicanti"&&getEl("priority12").value.toLowerCase()=="max") player.autobuyers[11].priority = getEl("priority12").value
	if (getEternitied() < 10 && !player.autobuyers[9].bulkBought) {
		var bulk = Math.floor(Math.max(parseFloat(getEl("bulkDimboost").value), 1))
	} else {
		var bulk = Math.max(parseFloat(getEl("bulkDimboost").value), 0.05)
	}
	player.autobuyers[9].bulk = (isNaN(bulk)) ? 1 : bulk
	player.overXGalaxies = parseInt(getEl("overGalaxies").value)
	const sacValue = fromValue(getEl("prioritySac").value)
	if (!isNaN(break_infinity_js ? sacValue : sacValue.l)) player.autoSacrifice.priority = Decimal.max(sacValue, 1.01)
	if (inNGM(2)) {
		const galSacValue = fromValue(getEl("priority14").value)
		if (!isNaN(break_infinity_js ? galSacValue : galSacValue.l)) player.autobuyers[12].priority = galSacValue
	}
	if (player.autobuyers[13]!=undefined) {
		player.autobuyers[13].priority = parseInt(getEl("priority15").value)
		player.overXGalaxiesTickspeedBoost = parseInt(getEl("overGalaxiesTickspeedBoost").value)
		player.autobuyers[13].bulk = Math.floor(Math.max(parseFloat(getEl("bulkTickBoost").value), 1))
		player.autobuyers[13].bulk = (isNaN(player.autobuyers[13].bulk)) ? 1 : player.autobuyers[13].bulk
	}
	if (player.autobuyers[14]!=undefined) {
		player.autobuyers[14].priority = parseInt(getEl("priority16").value)
		player.autobuyers[14].overXGals = parseInt(getEl("overGalaxiesTDBoost").value)
	}
	player.autobuyers[10].bulk = parseInt(getEl("bulkgalaxy").value)
	const eterValue = fromValue(getEl("priority13").value)
	if (!isNaN(break_infinity_js ? eterValue : eterValue.l)) {
		player.eternityBuyer.limit = eterValue
	}
	if (tmp.ngp3) {
		const dilValue = parseFloat(getEl("prioritydil").value)
		if (dilValue == Math.round(dilValue) && dilValue > 1) player.eternityBuyer.dilationPerAmount = dilValue
	
		const quantumValue = fromValue(getEl("priorityquantum").value)
		if (!isNaN(break_infinity_js ? quantumValue : quantumValue.l) && tmp.qu.autobuyer) tmp.qu.autobuyer.limit = quantumValue
		if (player.eternityBuyer.isOn&&player.eternityBuyer.dilationMode&&player.eternityBuyer.statBeforeDilation>=player.eternityBuyer.dilationPerAmount&&!player.eternityBuyer.slowStopped&&player.eternityBuyer.dilMode=="amount") {
			startDilatedEternity(true)
			return
		}

		const autoDisableQuantum = parseFloat(getEl("priorityAutoDisableQuantum").value)
		if (autoDisableQuantum == Math.round(autoDisableQuantum) && autoDisableQuantum >= 0) tmp.qu.autobuyer.autoDisable = autoDisableQuantum
	}
	priorityOrder()
}

function updateCheckBoxes() {
	for (var i = 0; i < player.autobuyers.length; i++) {
		if (player.autobuyers[i]%1 !== 0) {
			var id = (i + (i > 11 ? 2 : 1)) + "ison"
			getEl(id).checked = player.autobuyers[i].isOn ? "true" : ""
		}
	}
	if (player.autoSacrifice.isOn) getEl("13ison").checked = "true"
	else getEl("13ison").checked = ""
	getEl("eternityison").checked = player.eternityBuyer.isOn
	if (tmp.ngp3) {
		getEl("dilatedeternityison").checked = player.eternityBuyer.dilationMode
		if (tmp.qu) if (tmp.qu.autobuyer) getEl("quantumison").checked = tmp.qu.autobuyer.enabled
	} else getEl("dilatedeternityison").checked = false
}

function updateHotkeys() {
	let html = "Hotkeys: 1-8 to buy 10 Dimensions, shift+1-8 to buy 1 Dimension, T to buy max Tickspeed upgrades, shift+T to buy one Tickspeed upgrade, M to Max All,<br>S to Sacrifice"
	if (!hasAch("r136")) html += ", D to Dimension Boost"
	if (!hasAch("ng3p51")) {
		if (inNGM(3)) html += ", B to Tickspeed Boost"
		if (inNGM(4)) html += ", N to Time Dimension Boost"
		html += ", G to buy a Galaxy"
	}
	html += ", C to Crunch, A to toggle autobuyers, R to buy Replicanti Galaxies, E to Eternity"
	if (hasAch("r136")) html += ", D to Dilate Time"
	if (hasAch("ngpp11")) html += ", shift+D to Meta-Dimension Boost"
	if (player.meta) html += ",<br>Q to Quantum"
	if (hasAch("ng3p45")) html += ", U to unstabilize all Quarks"
	if (hasAch("ng3p51")) html += ", B to Big Rip, G to become a ghost"
	html += "."
	if (player.boughtDims) html += "<br>You can hold Shift while buying time studies to buy all up until that point, see each study's number, and save study trees."
	html += "<br>Hotkeys do not work while holding the Control key (Ctrl). Hold the Shift key to see details on many formulas."
	getEl("hotkeysDesc").innerHTML = html
	//also uhh H for forcing achievement tooltip display update so yeah lol
}

var bestECTime
function updateEterChallengeTimes() {
	bestECTime=0
	var temp=0
	var tempcounter=0
	for (var i=1;i<15;i++) {
		setAndMaybeShow("eterchallengetime"+i,tmp.mod.eternityChallRecords[i],'"Eternity Challenge '+i+' time record: "+timeDisplayShort(tmp.mod.eternityChallRecords['+i+'], false, 3)')
		if (tmp.mod.eternityChallRecords[i]) {
			bestECTime=Math.max(bestECTime, tmp.mod.eternityChallRecords[i])
			temp+=tmp.mod.eternityChallRecords[i]
			tempcounter++
		}
	}
	getEl("eterchallengesbtn").style.display = tempcounter > 0 ? "inline-block" : "none"
	setAndMaybeShow("eterchallengetimesum",tempcounter>1,'"The sum of your completed Eternity Challenge time records is "+timeDisplayShort(' + temp + ', false, 3) + "."')
}

var averageEp = new Decimal(0)
var bestEp
function updateLastTenEternities() {
	var listed = 0
	var tempTime = new Decimal(0)
	var tempEP = new Decimal(0)
	for (var i=0; i<10; i++) {
		if (player.lastTenEternities[i][1].gt(0)) {
			var eppm = player.lastTenEternities[i][1].dividedBy(player.lastTenEternities[i][0]/600)
			var unit = player.lastTenEternities[i][2] ? player.lastTenEternities[i][2] == "b" ? "EM" : player.lastTenEternities[i][2] == "d2" ? "TP" : "EP" : "EP"
			var tempstring = "(" + shorten(eppm) + " " + unit + "/min)"
			if (eppm<1) tempstring = "(" + shorten(eppm * 60) + " " + unit + "/hour)"
			msg = "The Eternity " + (i == 0 ? '1 eternity' : (i+1) + ' eternities') + " ago took " + timeDisplayShort(player.lastTenEternities[i][0], false, 3)
			if (player.lastTenEternities[i][2]) {
				if (player.lastTenEternities[i][2] == "b") msg += " while it was broken"
				else if (player.lastTenEternities[i][2].toString().slice(0,1) == "d") msg += " while Dilated"
				else msg += " in Eternity Challenge " + player.lastTenEternities[i][2]
			}
			msg += " and gave " + shortenDimensions(player.lastTenEternities[i][1]) + " " + unit + ". " + tempstring
			getEl("eternityrun"+(i+1)).textContent = msg
			tempTime = tempTime.plus(player.lastTenEternities[i][0])
			tempEP = tempEP.plus(player.lastTenEternities[i][1])
			bestEp = player.lastTenEternities[i][1].max(bestEp)
			listed++
		} else getEl("eternityrun"+(i+1)).textContent = ""
	}
	if (listed > 1) {
		tempTime = tempTime.dividedBy(listed)
		tempEP = tempEP.dividedBy(listed)
		var eppm = tempEP.dividedBy(tempTime/600)
		var tempstring = "(" + shorten(eppm) + " EP/min)"
		averageEp = tempEP
		if (eppm < 1) tempstring = "(" + shorten(eppm * 60) + " EP/hour)"
		getEl("averageEternityRun").textContent = "Average time of the last " + listed + " Eternities: " + timeDisplayShort(tempTime, false, 3) + " | Average EP gain: " + shortenDimensions(tempEP) + " EP. " + tempstring
	} else getEl("averageEternityRun").textContent = ""
}

function addEternityTime(array) {
	for (var i=player.lastTenEternities.length-1; i>0; i--) {
		player.lastTenEternities[i] = player.lastTenEternities[i-1]
	}
	player.lastTenEternities[0] = array
}

function addTime(array) {
	for (var i=player.lastTenRuns.length-1; i>0; i--) {
		player.lastTenRuns[i] = player.lastTenRuns[i-1]
	}
	player.lastTenRuns[0] = array
}

function getLimit() {
	if (player.infinityUpgradesRespecced == undefined || player.currentChallenge != "") return Number.MAX_VALUE
	return Decimal.pow(Number.MAX_VALUE, 1 + player.infinityUpgradesRespecced[3] / 2)
}

function updateRespecButtons() {
	var className = player.respec ? "timestudybought" : "storebtn"
	getEl("respec").className = className
	getEl("respec2").className = className
	getEl("respec3").className = className

	className = player.respecMastery ? "timestudybought" : "storebtn"
	getEl("respecMastery").className = className
	getEl("respecMastery2").className = className
}

function eternity(force, auto, presetLoad, dilated) {
	var canEternity = force || (ph.can("eternity") && (auto || !player.options.eternityconfirm || confirm("Eternity will reset everything except achievements and challenge records. You will also gain an Eternity point and unlock various upgrades.")))
	if (!canEternity) return
	
	if (force) player.currentEternityChall = "";
	if (player.currentEternityChall !== "" && player.infinityPoints.lt(player.eternityChallGoal)) return false
	if (player.thisEternity < player.bestEternity && !force) player.bestEternity = player.thisEternity
	if (player.thisEternity < 2) giveAchievement("Eternities are the new infinity")
	if (player.currentEternityChall == "eterc6" && ECComps("eterc6") < 5 && player.dimensionMultDecrease < 4) player.dimensionMultDecrease = Math.max(parseFloat((player.dimensionMultDecrease - 0.2).toFixed(1)),2)
	if (!GUActive("gb4")) if ((player.currentEternityChall == "eterc11" || (player.currentEternityChall == "eterc12" && ph.did("ghostify"))) && ECComps("eterc11") < 5) player.tickSpeedMultDecrease = Math.max(parseFloat((player.tickSpeedMultDecrease - 0.07).toFixed(2)), 1.65)
	if (player.infinitied < 10 && !force && !player.boughtDims) giveAchievement("Do you really need a guide for this?");
	if (Decimal.round(player.replicanti.amount) == 9) giveAchievement("We could afford 9");
	if (player.dimlife && !force) giveAchievement("8 nobody got time for that")
	if (player.dead && !force) giveAchievement("You're already dead.")
	if (player.infinitied <= 1 && !force) giveAchievement("Do I really need to infinity")
	if (gainedEternityPoints().gte("1e600") && player.thisEternity <= 600 && player.dilation.active && !force) giveAchievement("Now you're thinking with dilation!")
	if (ph.did("ghostify") && player.currentEternityChall == "eterc11" && inQC(6) && inQC(8) && inQCModifier("ad") && player.infinityPoints.e >= 15500) giveAchievement("The Deep Challenge")
	if (isEmptiness) {
		showTab("dimensions")
		isEmptiness = false
		ph.updateDisplay()
	}
	temp = []
	if (gainedEternityPoints().gte(player.eternityPoints) && player.eternityPoints.gte("1e1185") && (tmp.ngp3 ? player.dilation.active && player.quantum.bigRip.active : false)) giveAchievement("Gonna go fast")
	var oldEP = player.eternityPoints
	player.eternityPoints = player.eternityPoints.plus(gainedEternityPoints())
	var array = [player.thisEternity, gainedEternityPoints()]
	if (player.dilation.active) array = [player.thisEternity, getDilGain().sub(player.dilation.totalTachyonParticles).max(0), "d2"]
	else if (player.currentEternityChall != "") array.push(player.eternityChallUnlocked)
	else if (tmp.be) {
		tmp.qu.breakEternity.eternalMatter = tmp.qu.breakEternity.eternalMatter.add(getEMGain())
		if (player.ghostify.milestones < 15) tmp.qu.breakEternity.eternalMatter = tmp.qu.breakEternity.eternalMatter.round()
		array = [player.thisEternity, getEMGain(), "b"]
		updateBreakEternity()
	}
	addEternityTime(array)
	player.thisEternity = 0
	var forceRespec = doCheckECCompletionStuff()
	for (var i = 0; i < player.challenges.length; i++) {
		if (!player.challenges[i].includes("post") && getEternitied() > 1) temp.push(player.challenges[i])
	}
	player.challenges = temp
	player.infinitiedBank = nA(player.infinitiedBank, gainBankedInf())
	if (player.dilation.active && (!force || player.infinityPoints.gte(Number.MAX_VALUE))) {
		let gain = getDilGain()
		if (gain.gte(player.dilation.totalTachyonParticles)) {
			if (player.dilation.totalTachyonParticles.gt(0) && gain.div(player.dilation.totalTachyonParticles).lt(2)) player.eternityBuyer.slowStopped = true
			if (tmp.ngp3) player.dilation.times++
			player.dilation.totalTachyonParticles = gain
			setTachyonParticles(gain)
		}
	}
	if (tmp.ngp3 && player.dilation.studies.includes(1) && !force) if (player.eternityBuyer.isOn && player.eternityBuyer.dilationMode) {
		if (player.eternityBuyer.dilMode == "amount" && !player.eternityBuyer.slowStopped) {
			player.eternityBuyer.statBeforeDilation++
			if (player.eternityBuyer.statBeforeDilation >= player.eternityBuyer.dilationPerAmount) {
				startDilatedEternity(true)
				return
			}
		}
		if (player.eternityBuyer.dilMode=="upgrades"&&player.eternityBuyer.tpUpgraded) {
			startDilatedEternity(true)
			return
		}
	}
	var oldStat = getEternitied()
	player.eternities = nA(player.eternities, gainEternitiedStat())
	updateBankedEter()
	player.infinityPoints = new Decimal(hasAch("r104") ? 2e25 : 0);

	doEternityResetStuff()
		
	if (inNGM(2) && getEternitied() < 2) player.autobuyers[12] = 13
	if (inNGM(3) && getEternitied() < 2) player.autobuyers[13] = 14
	var dilated2 = player.dilation.active
	if (dilated2) {
		player.dilation.active = false
		if (tmp.ngp3 && ph.did("quantum")) updateColorCharge()
	}
	if (presetLoad === undefined) {
		var pData = player.eternityBuyer.presets
		if (pData !== undefined ? pData.on : false) {
			var dilActive = pData.dil !== undefined ? pData.dil.on : false
			var grindActive = pData.grind !== undefined ? pData.grind.on : false
			if (dilated && dilActive) {
				if (pData.selected > -1) {
					pData.reselect=pData.selected
					if (apLoaded && loadedAPs > pData.selected) getEl("apselected" + pData.selected).textContent = ""
				}
				pData.selected = "dil"
				getEl("apDilSelected").textContent = ">>"
				forceRespec = true
				presetLoad = pData.dil.preset
			} else if (hasEternityUpg(15) && player.eternityPoints.log10() >= oldEP.log10() * 1.01 && !dilated2 && grindActive) {
				if (pData.selected > -1) {
					pData.reselect=pData.selected
					if (apLoaded && loadedAPs > pData.selected) getEl("apselected" + pData.selected).textContent = ""
				}
				pData.selected = "grind"
				getEl("apGrindSelected").textContent = ">>"
				forceRespec = true
				presetLoad = pData.grind.preset
			} else {
				if (pData.reselect !== undefined) {
					pData.selected = pData.reselect
					forceRespec = true
					presetLoad = pData[pData.order[pData.selected]].preset
					getEl("apDilSelected").textContent = ""
					getEl("apGrindSelected").textContent = ""
					if (apLoaded && loadedAPs > pData.selected) getEl("apselected" + pData.selected).textContent = ">>"
					delete pData.reselect
				}
				if (pData.selectNext > -1 && ((pData.selected < 0 && pData.order.length) || pData.reselect !== undefined || pData.order.length > 1)) {
					pData.left--
					if (pData.left < 1) {
						if (apLoaded && loadedAPs > pData.selected && pData.selected > -1) getEl("apselected" + pData.selected).textContent = ""
						pData.selected = pData.selectNext
						for (var p = 1; p < pData.order.length; p++) {
							if (pData[pData.order[(pData.selectNext + p) % pData.order.length]].on) {
								pData.selectNext = (pData.selectNext + p) % pData.order.length
								if (apLoaded && loadedAPs > pData.selectNext) getEl("apselected" + pData.selectNext).textContent = ">"
								break
							} else if (p == pData.order.length - 1) pData.selectNext = -1
						}
						pData.left = pData[pData.order[pData.selected]].length
						forceRespec = true
						presetLoad = pData[pData.order[pData.selected]].preset
						if (apLoaded && loadedAPs > pData.selected) getEl("apselected" + pData.selected).textContent=">>"
					}
					getEl("eternitiesLeft").textContent = getFullExpansion(pData.left)
				}
			}
		}
	}
	if (player.respec || player.respecMastery || forceRespec) respecTimeStudies(forceRespec, presetLoad)
	if (typeof(presetLoad) == "string") importStudyTree(presetLoad)
	if (player.respec) respecToggle()
	if (player.respecMastery) respecMasteryToggle()
	giveAchievement("Time is relative")
	player.replicanti.galaxies = 0
	extraReplGalaxies = 0
	if (dilated || !hasAch("ng3p67")) resetReplicantiUpgrades()
	player.tdBoosts = resetTDBoosts()
	resetPSac()
	resetTDsOnNGM4()
	reduceDimCosts()
	setInitialResetPower()
	if (getInfinitied() >= 1 && !player.challenges.includes("challenge1")) player.challenges.push("challenge1")
	var autobuyers = document.getElementsByClassName('autoBuyerDiv')
	if (getEternitied() < 2) {
		for (var i = 0; i < autobuyers.length; i++) autobuyers.item(i).style.display = "none"
		getEl("buyerBtnDimBoost").style.display = "inline-block"
		getEl("buyerBtnGalaxies").style.display = "inline-block"
		getEl("buyerBtnInf").style.display = "inline-block"
		getEl("buyerBtnTickSpeed").style.display = "inline-block"
		getEl("buyerBtnSac").style.display = "inline-block"
	}
	updateAutobuyers();
	setInitialMoney()
	if (hasAch("r85")) player.infMult = player.infMult.times(4)
	if (hasAch("r93")) player.infMult = player.infMult.times(4)
	resetInfDimensions(true);
	updateChallenges();
	updateNCVisuals()
	updateEterChallengeTimes()
	updateLastTenRuns()
	updateLastTenEternities()
	if (!hasAch("r133")) {
		var infchalls = Array.from(document.getElementsByClassName('infchallengediv'))
		for (var i = 0; i < infchalls.length; i++) infchalls[i].style.display = "none"
	}
	GPminpeak = new Decimal(0)
	IPminpeak = new Decimal(0)
	EPminpeakType = 'normal'
	EPminpeak = new Decimal(0)
	updateMilestones()
	resetTimeDimensions()
	getEl("eternityconf").style.display = "inline-block"
	if (getEternitied() < 20) {
		player.autobuyers[9].bulk = 1
		getEl("bulkDimboost").value = player.autobuyers[9].bulk
	}
	if (getEternitied() < 50) {
		getEl("replicantidiv").style.display = "none"
		getEl("replicantiunlock").style.display = "inline-block"
	} else if (getEl("replicantidiv").style.display === "none" && getEternitied() >= 50) {
		getEl("replicantidiv").style.display = "inline-block"
		getEl("replicantiunlock").style.display = "none"
	}
	if (getEternitied() > 2 && player.replicanti.galaxybuyer === undefined) player.replicanti.galaxybuyer = false
	var IPshortened = shortenDimensions(player.infinityPoints)
	getEl("infinityPoints1").innerHTML = "You have <span class=\"IPAmount1\">" + IPshortened + "</span> Infinity points."
	getEl("infinityPoints2").innerHTML = "You have <span class=\"IPAmount2\">" + IPshortened + "</span> Infinity points."
	if (getEternitied() > 0 && oldStat < 1) {
		getEl("infmultbuyer").style.display = "inline-block"
		getEl("infmultbuyer").textContent = "Autobuy IP mult O" + (player.infMultBuyer ? "N" : "FF")
	}
	hideMaxIDButton()
	getEl("eternitybtn").style.display = "none"
	updateEternityUpgrades()
	getEl("totaltickgained").textContent = "You've gained "+getFullExpansion(player.totalTickGained)+" tickspeed upgrades."
	hideDimensions()
	tmp.tickUpdate = true;
	playerInfinityUpgradesOnEternity()
	getEl("eternityPoints2").innerHTML = "You have <span class=\"EPAmount2\">"+shortenDimensions(player.eternityPoints)+"</span> Eternity point"+((player.eternityPoints.eq(1)) ? "." : "s.")
	updateEternityChallenges()
	if (player.eternities <= 1) {
		showTab("dimensions")
		showDimTab("timedimensions")
		loadAutoBuyerSettings()
	}
	Marathon2 = 0;
	if (moreEMsUnlocked() && getEternitied() >= 1e9) player.dbPower = new Decimal(1)
	doAutoEterTick()
	if (tmp.ngp3) updateBreakEternity()
}

function resetReplicantiUpgrades() {
	let keepPartial = moreEMsUnlocked() && getEternitied() >= 1e10
	player.replicanti.chance = keepPartial ? Math.min(player.replicanti.chance, 1) : 0.01
	player.replicanti.interval = keepPartial ? Math.max(player.replicanti.interval, hasTimeStudy(22) ? 1 : 50) : 1000
	player.replicanti.gal = 0
	player.replicanti.chanceCost = Decimal.pow(1e15, player.replicanti.chance * 100).times((inNGM(2) && player.tickspeedBoosts == undefined) ? 1e75 : 1e135)
	player.replicanti.intervalCost = Decimal.pow(1e10, Math.round(Math.log10(1000 / player.replicanti.interval) / -Math.log10(0.9))).times((inNGM(2) && player.tickspeedBoosts == undefined) ? 1e80 : player.boughtDims ? 1e150 : 1e140)
	player.replicanti.galCost = new Decimal((inNGM(2) && player.tickspeedBoosts == undefined) ? 1e110 : 1e170)	
}

function challengesCompletedOnEternity(bigRip) {
	var array = []
	if (getEternitied() > 1 || bigRip || hasAch("ng3p51")) for (i = 1; i <= getTotalNormalChallenges() + 1; i++) array.push("challenge" + i)
	if (hasAch("r133")) {
		player.postChallUnlocked = order.length
		for (i = 0; i < order.length; i++) array.push(order[i])
	}
	return array
}

function gainEternitiedStat() {
	let ret = 1
	if (ph.did("ghostify")) {
		if (tmp.quActive && hasNU(9)) ret = nM(ret, tmp.qu.bigRip.spaceShards.max(1).pow(.1))
	}
	if (hasTS(34) && tmp.ngC) ret = nM(ret, 10)
	if (hasTS(35) && tmp.ngC) ret = nM(ret, tsMults[35]())
	if (hasAch("ng3p12")) ret = nM(ret, 5)
	let exp = getEternitiesAndDTBoostExp()
	if (exp > 0) ret = nM(player.dilation.dilatedTime.max(1).pow(exp), ret)
	if (tmp.ngC & exp > 0) ret = nM(ret, Decimal.pow(player.dilation.tachyonParticles.plus(1).log10() + 1, exp))
	if (typeof(ret) == "number") ret = Math.floor(ret)
	return ret
}

function gainBankedInf() {
	let ret = 0 
	let numerator = player.infinitied
	if (speedrunMilestonesReached > 27 || hasAch("ng3p73")) numerator = nA(getInfinitiedGain(), player.infinitied)
	let frac = 0.05
	if (hasTimeStudy(191)) ret = nM(numerator, frac)
	if (hasAch("r131")) ret = nA(nM(numerator, frac), ret)
	if (player.exdilation != undefined) ret = nM(ret, getBlackholePowerEffect().pow(1/3))
	return ret
}

function exitChallenge() {
	if (inNGM(4) && player.galacticSacrifice.chall) {
		galacticSacrifice(false, true)
		showTab("dimensions")
	} else if (player.currentChallenge !== "") {
		startChallenge("");
		updateChallenges();
		return
	} else if (player.currentEternityChall !== "") {
		player.currentEternityChall = ""
		player.eternityChallGoal = new Decimal(Number.MAX_VALUE)
		eternity(true)
		updateEternityChallenges();
		return
	}
	if (tmp.ngp3) if (!inQC(0)) quantum(false, true)
}

function onChallengeFail() {
	getEl("challfail").style.display = "block"
	giveAchievement("You're a mistake")
	failureCount++
	if (failureCount > 9) giveAchievement("You're a failure")
}

function quickReset() {
	if (inQC(6)) return
	if (inNC(14)) if (player.tickBoughtThisInf.pastResets.length < 1) return
	if (player.resets > 0 && !(inNGM(2) && inNC(5))) player.resets--
	if (inNC(14)) {
		while (player.tickBoughtThisInf.pastResets.length > 0) {
			let entry = player.tickBoughtThisInf.pastResets.pop()
			if (entry.resets < player.resets) {
				// it has fewer resets than we do, put it back and we're done.
				player.tickBoughtThisInf.pastResets.push(entry);
				break;
			} else {
				// we will have at least this many resets, set our remaining tickspeed upgrades
				// and then throw the entry away
				player.tickBoughtThisInf.current = entry.bought;
			}
		}
	}
	softReset(0)
}

var blink = true
var nextAt
var goals
var order

function setAndMaybeShow(elementName, condition, contents) {
	var elem = getEl(elementName)
	if (condition) {
		elem.innerHTML = eval(contents)
		elem.style.display = ""
	} else {
		elem.innerHTML = ""
		elem.style.display = "none"
	}
}

function runAutoSave(){
	if (!player) return
	if (!tmp.mod) return
	if (tmp.mod.autoSave) {
		autoSaveSeconds++
		if (autoSaveSeconds >= getAutoSaveInterval()) {
			save_game()
			autoSaveSeconds=0
		}
	}
}

function updateBlinkOfAnEye(){
	if (blink && !hasAch("r78")) {
		getEl("Blink of an eye").style.display = "none"
		blink = false
	}
	else {
		getEl("Blink of an eye").style.display = "block"
		blink = true
	}
}

function canQuickBigRip() {
	var x = false
	if (!tmp.ngp3) return false
	if (tmp.quUnl && player.masterystudies.includes("d14") && inQC(0) && tmp.qu.electrons.amount >= getQCCost([6, 8])) {
		if (player.ghostify.milestones >= 2) x = true
		else for (var p = 1; p <= 4; p++) {
			var pcData = tmp.qu.pairedChallenges.order[p]
			if (pcData) {
				var pc1 = Math.min(pcData[0], pcData[1])
				var pc2 = Math.max(pcData[0], pcData[1])
				if (pc1 == 6 && pc2 == 8) {
					if (p - 1 > tmp.qu.pairedChallenges.completed) return
					x = true
				}
			}
		}
	}
	return x
}

function runIDBuyersTick(){
	if (getEternitied() > 10 && player.currentEternityChall !== "eterc8") {
		for (var i=1;i<getEternitied()-9 && i < 9; i++) {
			if (player.infDimBuyers[i-1]) {
				buyMaxInfDims(i, true)
				buyManyInfinityDimension(i, true)
			}
		}
	}
}

function crunchAnimationBtn(){
	if (player.infinitied !== 0 || getEternitied() !== 0 || ph.did("quantum")) getEl("bigCrunchAnimBtn").style.display = "inline-block"
	else getEl("bigCrunchAnimBtn").style.display = "none"
}

function TPAnimationBtn(){
	if (!player.dilation.tachyonParticles.eq(0) || ph.did("quantum")) getEl("tachyonParticleAnimBtn").style.display = "inline-block"
	else getEl("tachyonParticleAnimBtn").style.display = "none"
}

function dilAndBHDisplay() {
	getEl("dilationTabbtn").style.display = (player.dilation.studies.includes(1)) ? "table-cell" : "none"
	getEl("blackHoleTabbtn").style.display = player.dilation.studies.includes(1) && player.exdilation != undefined ? "table-cell" : "none"
	updateDilationUpgradeButtons()
}

function replicantiShopABRun() {
	if (getEternitied() >= 40 && (player.replicanti.auto[0]) && player.currentEternityChall !== "eterc8" && isChanceAffordable()) {
		var chance = Math.round(player.replicanti.chance * 100)
		var maxCost = masteryStudies.has(265) ? 1 / 0 : new Decimal("1e1620").div(tmp.ngmX == 2 ? 1e60 : 1);
		var bought = Math.max(Math.floor(player.infinityPoints.min(maxCost).div(player.replicanti.chanceCost).log(1e15) + 1), 0)
		if (!masteryStudies.has(265)) bought = Math.min(bought, 100 - chance)
		player.replicanti.chance = (chance + bought) / 100
		player.replicanti.chanceCost = player.replicanti.chanceCost.times(Decimal.pow(1e15, bought))
	}

	if (getEternitied() >= 60 && (player.replicanti.auto[1]) && player.currentEternityChall !== "eterc8") {
		while (player.infinityPoints.gte(player.replicanti.intervalCost) && player.currentEternityChall !== "eterc8" && isIntervalAffordable()) upgradeReplicantiInterval()
	}

	if (getEternitied() >= 80 && (player.replicanti.auto[2]) && player.currentEternityChall !== "eterc8") autoBuyRG()
}

function failedEC12Check(){
	if (player.currentEternityChall == "eterc12" && player.thisEternity >= getEC12TimeLimit()) {
		setTimeout(exitChallenge, 500)
		onChallengeFail()
	}
}

function updateNGpp17Reward(){
	getEl('epmultauto').style.display=hasAch("ngpp17")?"":"none"
	for (i=1;i<9;i++) getEl("td"+i+'auto').style.visibility=hasAch("ngpp17")?"visible":"hidden"
	getEl('togglealltimedims').style.visibility=hasAch("ngpp17")?"visible":"hidden"
}

function updateNGpp16Reward(){
	getEl('replicantibulkmodetoggle').style.display = (hasAch(tmp.ngp3 || tmp.mod.newGamePlusVersion ? "r134" : "ngpp16") || (tmp.ngC && player.eternityUpgrades.includes(6))) ? "inline-block" : "none"
}

function notifyQuantumMilestones(){
	if (typeof notifyId == "undefined") notifyId = 24
	if (speedrunMilestonesReached > notifyId) {
		$.notify("You have unlocked the "+timeDisplayShort(speedrunMilestones[notifyId + 1]*10)+" speedrun milestone! "+(["You now start with 20,000 eternities when going Quantum","You unlocked the Time Theorem autobuyer","You now start with all Eternity Challenges completed and\nEternity Upgrades bought","You now start with Dilation unlocked","You unlocked the Dilation option for the Eternity autobuyer","You now start with all dilation studies and\nnon-rebuyable dilation upgrades before Meta Dimensions unlocked, except the passive TT gen upgrade","You unlocked the First Meta Dimension autobuyer","You unlocked the Second Meta Dimension autobuyer","You unlocked the Third Meta Dimension autobuyer","You unlocked the Fourth Meta Dimension autobuyer","You unlocked the Fifth Meta Dimension autobuyer, and you now keep Time Studies and the passive TT gen upgrade","You unlocked the Sixth Meta Dimension autobuyer","You unlocked the Seventh Meta Dimension autobuyer","You unlocked Eighth Meta Dimension autobuyer, and\nall non-rebuyable dilation upgrades","You unlocked the Meta-Dimension Boost autobuyer","You now keep your Mastery Studies","All Meta Dimensions are instantly available for purchase on Quantum","You now start with "+shortenCosts(1e13)+" eternities","You now start with "+shortenCosts(1e25)+" meta-antimatter on reset","You can now turn on automatic replicated galaxies regardless of your second Time Study split path","Rebuyable Dilation upgrade and Meta Dimension autobuyers are 3x faster","You now start with "+shortenCosts(1e100)+" dilated time on Quantum, and dilated time only resets on Quantum","You unlocked the Quantum autobuyer","You now keep your Replicanti on Eternity","You unlocked the manual mode for the Eternity autobuyer and got the sacrifice galaxy autobuyer","Your rebuyable dilation upgrade autobuyer can now buy the maximum upgrades possible","You now can buy max Meta-Dimension Boosts and start with 4 Meta-Dimension Boosts","From now on, you can gain banked infinities based on your post-crunch infinitied stat"])[notifyId]+".","success")
		notifyId++
	}
}

function notifyGhostifyMilestones(){
	if (typeof notifyId2 == "undefined") notifyId2 = 16
	if (notifyId2 <= 0) notifyId2 = 0
	if (player.ghostify.milestones > notifyId2) {
		$.notify("You became a ghost in at most "+getFullExpansion(tmp.bm[notifyId2])+"x quantumed stat! "+(["You now start with all Speedrun Milestones and all "+shorten(Number.MAX_VALUE)+" QK assignation features unlocked, all Paired Challenges completed, all Big Rip upgrades bought, Nanofield is 2x faster until you reach 16 rewards, and you get quarks based on your best MA this quantum", "From now on, colored quarks do not cancel, you keep your gluon upgrades, you can quick Big Rip, and completing an Eternity Challenge doesn't respec your Time Studies.", "You now keep your Electron upgrades", "From now on, Quantum doesn't reset your Tachyon particles unless you are in a QC, unstabilizing quarks doesn't lose your colored quarks, and you start with 5 of 1st upgrades of each Tree Branch", "From now on, Quantum doesn't reset your Meta-Dimension Boosts unless you are in a QC or undoing Big Rip", "From now on, Quantum doesn't reset your normal replicants unless you are in a QC or undoing Big Rip", "You now start with 10 worker replicants and Ghostify now doesn't reset Neutrinos.", "You are now gaining ^0.5 amount of quarks, ^0.5 amount of gluons, and 1% of Space Shards gained on Quantum per second.", "You now start with 10 Emperor Dimensions of each tier up to the second tier"+(tmp.mod.ngudpV?", and from now on, start Big Rips with the 3rd row of Eternity Upgrades":""), "You now start with 10 Emperor Dimensions of each tier up to the fourth tier", "You now start with 10 Emperor Dimensions of each tier up to the sixth tier, and the IP multiplier no longer costs IP", "You now start with 10 of each Emperor Dimension", "You now start with 16 Nanofield rewards", "You now start with "+shortenCosts(1e25)+" quark spins, and Branches are faster based on your spins", "You now start with Break Eternity unlocked and all Break Eternity upgrades bought and generate 1% of Eternal Matter gained on Eternity per second", "From now on, you gain 1% of quarks you will gain per second and you keep your Tachyon particles on Quantum and Ghostify outside of Big Rip."])[notifyId2]+".","success")
		notifyId2++
	}
}

function dilationStuffABTick(){
	var canAutoUpgs = canAutoDilUpgs()
	getEl('dilUpgsauto').style.display = canAutoUpgs ? "" : "none"
	getEl('distribEx').style.display = hasAch("ngud14") && tmp.mod.nguspV !== undefined ? "" : "none"
	if (canAutoUpgs && player.autoEterOptions.dilUpgs) autoBuyDilUpgs()
}

function doBosonsUnlockStuff() {
	player.ghostify.wzb.unl=true
	$.notify("Congratulations! You have unlocked Bosonic Lab!", "success")
	giveAchievement("Even Ghostlier than before")
	updateTemp()
	updateNeutrinoBoosts()
	updateBLUnlocks()
	updateBosonicLimits()
}

function doPhotonsUnlockStuff(){
	player.ghostify.ghostlyPhotons.unl=true
	$.notify("Congratulations! You have unlocked Ghostly Photons!", "success")
	giveAchievement("Progressing as a Ghost")
	updateTemp()
	updateQuantumChallenges()
	updateBreakEternity()
	updateGPHUnlocks()
}

function inEasierMode() {
	return tmp.mod.newGameMult || tmp.mod.newGameExpVersion || tmp.mod.ngudpV || tmp.mod.ngumuV || tmp.mod.nguepV || tmp.mod.aau || tmp.mod.ls
}

function doBreakEternityUnlockStuff(){
	tmp.qu.breakEternity.unlocked = true
	$.notify("Congratulations! You have unlocked Break Eternity!", "success")
	updateBreakEternity()
}

function doNGP4UnlockStuff(){
	$.notify("Congratulations! You unlocked NG+4!", "success")
	metaSave.ngp4 = true
	checkForExpertMode()
	localStorage.setItem(metaSaveId,btoa(JSON.stringify(metaSave)))
}

function doGhostifyUnlockStuff(){
	player.ghostify.reached = true
	if (getEl("welcome").style.display != "flex") getEl("welcome").style.display = "flex"
	else tmp.mod.popUpId = ""
	getEl("welcomeMessage").innerHTML = "You are finally able to complete PC6+8 in Big Rip! However, because of the unstability of this universe, the only way to go further is to become a ghost. This allows you to pass Big Rip universes and unlock new stuff in Ghostify in exchange for everything that you have. Therefore, this is the sixth layer of NG+3."
}

function doReachAMGoalStuff(chall){
	if (getEl("welcome").style.display != "flex") getEl("welcome").style.display = "flex"
	else tmp.mod.popUpId = ""
	getEl("welcomeMessage").innerHTML = "You reached the antimatter goal (" + shorten(Decimal.pow(10, getQCGoalLog())) + "), but you didn't reach the meta-antimatter goal yet! Get " + shorten(getQuantumReq()) + " meta-antimatter" + (player.quantum.bigRip.active ? " and then you can become a ghost!" : " and then go Quantum to complete your challenge!")
	tmp.qu.nonMAGoalReached.push(chall)
}

function doQuantumUnlockStuff(){
	tmp.qu.reached = true
	if (getEl("welcome").style.display != "flex") getEl("welcome").style.display = "flex"
	else tmp.mod.popUpId = ""
	getEl("welcomeMessage").innerHTML = "Congratulations! You reached " + shorten(getQuantumReq()) + " MA and completed EC14 for the first time! This allows you to go Quantum (the 5th layer), giving you a quark in exchange for everything up to this point, which can be used to get more powerful upgrades. This allows you to get gigantic numbers!"
}

function doNGP3UnlockStuff(){
	var chall = tmp.inQCs
	if (chall.length < 2) chall = chall[0]
	else if (chall[0] > chall[1]) chall = chall[1] * 10 + chall[0]
	else chall = chall[0] * 10 + chall[1]
	if (!tmp.qu.reached && isQuantumReached()) doQuantumUnlockStuff()
	let MAbool = player.meta.bestAntimatter.lt(getQuantumReq())
	let DONEbool = !tmp.qu.nonMAGoalReached.includes(chall)
	let TIMEbool = player.quantum.time > 10
	if (chall && player.money.gt(Decimal.pow(10, getQCGoalLog())) && MAbool && DONEbool && TIMEbool) {
		doReachAMGoalStuff(chall)
	}
	if (!player.ghostify.reached && tmp.qu.bigRip.active) if (tmp.qu.bigRip.bestThisRun.gte(Decimal.pow(10, getQCGoalLog(undefined, true)))) {
		doGhostifyUnlockStuff()
	}
	var inEasierModeCheck = !inEasierMode()
	if (player.masterystudies && (player.masterystudies.includes("d14")||hasAch("ng3p51")) && !metaSave.ngp4 && !inEasierModeCheck) doNGP4UnlockStuff()
	if (player.eternityPoints.gte("1e1200") && tmp.qu.bigRip.active && !tmp.qu.breakEternity.unlocked) doBreakEternityUnlockStuff()
	if (pl.did()) {
		pl.unlCheck()
	} else {
		if (tmp.quActive && player.money.gte(Decimal.pow(10, 6e9)) && tmp.qu.bigRip.active && !player.ghostify.ghostlyPhotons.unl) doPhotonsUnlockStuff()
		if (canUnlockBosonicLab() && !player.ghostify.wzb.unl) doBosonsUnlockStuff()
		unlockHiggs()
		GDs.unl()
	}
}

function updateResetTierButtons(){
	ph.updateDisplay()

	var haveBlock = ph.tmp.shown >= 3

	getEl("bigcrunch").parentElement.style.top = haveBlock ? (Math.floor(ph.tmp.shown / 3) * 120 + 19) + "px" : "19px"
	getEl("quantumBlock").style.display = haveBlock ? "" : "none"
	getEl("quantumBlock").style.height = haveBlock ? (Math.floor(ph.tmp.shown / 3) * 120 + 12) + "px" : "120px"

	if (ph.did("ghostify")) {
		getEl("GHPAmount").textContent = shortenDimensions(player.ghostify.ghostParticles)
		var showQuantumed = player.ghostify.times > 0 && player.ghostify.milestones < 16
		getEl("quantumedBM").style.display = showQuantumed ? "" : "none"
		if (showQuantumed) getEl("quantumedBMAmount").textContent = getFullExpansion(tmp.qu.times)
	}
}

function updateOrderGoals(){
	getEl("postc6desc").textContent = "Reward: Tickspeed affects Infinity Dimensions with reduced effect" + (tmp.ngC ? ", and the IP gain softcap is 75% weaker." : ".")
	if (order) for (var i=0; i<order.length; i++) getEl(order[i]+"goal").textContent = "Goal: "+shortenCosts(getGoal(order[i]))
}

function updateReplicantiGalaxyToggels(){
	if (player.replicanti.galaxybuyer === undefined || player.boughtDims) getEl("replicantiresettoggle").style.display = "none"
	else getEl("replicantiresettoggle").style.display = "inline-block"
}

function givePerSecondNeuts(){
	if (!hasAch("ng3p75")) return
	var mult = 1 //in case you want to buff in the future
	var n = getNeutrinoGain().times(mult)
	player.ghostify.neutrinos.electron = player.ghostify.neutrinos.electron.plus(n)
	player.ghostify.neutrinos.mu       = player.ghostify.neutrinos.mu.plus(n)
	player.ghostify.neutrinos.tau      = player.ghostify.neutrinos.tau.plus(n)
}

function doPerSecondNGP3Stuff(){
	if (!tmp.ngp3) return
	
	if (tmp.qu.autoECN !== undefined) {
		justImported = true
		if (tmp.qu.autoECN > 12) buyMasteryStudy("ec", tmp.qu.autoECN, true)
		else getEl("ec" + tmp.qu.autoECN + "unl").onclick()
		justImported = false
	}
	doNGP3UnlockStuff()
	notifyGhostifyMilestones()
	ghostifyAutomationUpdatingPerSecond()
	if (tmp.qu.autoOptions.assignQK && player.ghostify.milestones >= 8) assignAll(true)

	givePerSecondNeuts()
}

function ghostifyAutomationUpdatingPerSecond() {
	if (!isAutoGhostsSafe) return

	//Ghostify Layer
	//Priorities: GD Boost -> Light Empowerment -> Higgs Bosons -> Rest
	if (isAutoGhostActive(25)) GDs.gdBoost()
	if (player.ghostify.ghostlyPhotons.unl && isAutoGhostActive(23)) lightEmpowerment(true)
	if (isAutoGhostActive(24)) {
		let data = player.ghostify.automatorGhosts[24]
		let higgs = player.ghostify.hb.higgs
		let gain = getHiggsGain()

		if (gain >= data.i || (higgs + gain) / higgs >= data.m) higgsReset(true)
	}
	if (player.ghostify.wzb.unl && isAutoGhostActive(20)) buyMaxBosonicUpgrades()
	if (isAutoGhostActive(16)) {
		maxNeutrinoMult()
		maxGHPMult()
	}

	//Quantum Layer
	if (!tmp.quUnl) return
	if (isAutoGhostActive(14)) maxBuyBEEPMult()
	if (isAutoGhostActive(4) && player.ghostify.automatorGhosts[4].mode=="t") rotateAutoUnstable()
	if (isAutoGhostActive(10)) maxBuyLimit()
	if (isAutoGhostActive(9) && tmp.qu.replicants.quantumFood > 0) {
		for (d = 1;d < 9; d++) if (canFeedReplicant(d) && (d == tmp.qu.replicants.limitDim || (!tmp.eds[d + 1].perm && tmp.eds[d].workers.lt(11)))) {
			feedReplicant(d, true);
			break;
		} 
	}
	if (isAutoGhostActive(8)) buyMaxQuantumFood()
	if (isAutoGhostActive(18)) {
		let bought = false
		for (let u = 1; u <= 4; u++) while (buyElectronUpg(u, true)) bought = true
		if (bought) updateElectrons()
	}
	if (isAutoGhostActive(7)) maxQuarkMult()
}

function checkGluonRounding(){
	if (!tmp.ngp3) return
	if (player.ghostify.milestones > 7 || !ph.did("quantum")) return
	if (player.quantum.gluons.rg.lt(101)) player.quantum.gluons.rg = player.quantum.gluons.rg.round()
	if (player.quantum.gluons.gb.lt(101)) player.quantum.gluons.gb = player.quantum.gluons.gb.round()
	if (player.quantum.gluons.br.lt(101)) player.quantum.gluons.br = player.quantum.gluons.br.round()
	if (tmp.qu.quarks.lt(101)) tmp.qu.quarks = tmp.qu.quarks.round()
}

function doNGm2CorrectPostC3Reward(){
	return
	/*
	this should be for testing purposes only so i can properly hack in TDB/DB

	player.postC3Reward = Decimal.pow(getPostC3Mult(), getInitPostC3Power() + player.tickspeedMultiplier.div(10).log(getTickSpeedCostMultiplierIncrease()))
	*/
}

let autoSaveSeconds=0
setInterval(function() {
	updateTemp()
	runAutoSave()
	if (!player) return

	//Achieve:
	cantHoldInfinitiesCheck()
	antitablesHaveTurnedCheck()
	updateBlinkOfAnEye()
	ALLACHIEVECHECK()
	bendTimeCheck()
	metaAchMultLabelUpdate()
	bWtAchMultLabelUpdate()

	// AB Display
	updateReplicantiGalaxyToggels()
	ABTypeDisplay()
	dimboostABTypeDisplay()
	IDABDisplayCorrection()
	replicantiShopABDisplay()

	// AB Stuff
	autoPerSecond()

	// Button Displays
	infPoints2Display()
	eterPoints2Display()
	updateResetTierButtons()
	updateQuarkDisplay()
	primaryStatsDisplayResetLayers()
	crunchAnimationBtn()
	TPAnimationBtn()
	dilAndBHDisplay()

	// EC Stuff
	ECCompletionsDisplay()
	ECchallengePortionDisplay()
	updateECUnlockButtons()
	EC8PurchasesDisplay()
 	failedEC12Check()

	// Other 
	updateChallTabDisplay()
	updateOrderGoals()
	bankedInfinityDisplay()
	notifyQuantumMilestones()
	updateQuantumWorth()
	updateNGM2RewardDisplay()
	updateGalaxyUpgradesDisplay()
	updateTimeStudyButtons(false, true)
	updateHotkeys()
	updateQCDisplaysSpecifics()
	updateSoftcapStatsTab()
	doNGm2CorrectPostC3Reward()

	//Rounding errors
	if (!tmp.ngp3 || !ph.did("quantum")) if (player.infinityPoints.lt(100)) player.infinityPoints = player.infinityPoints.round()
	checkGluonRounding()
}, 1000)

function autoPerSecond() {
	if (isGamePaused()) return

	replicantiShopABRun()
	runIDBuyersTick()
	doAutoEterTick()
	dilationStuffABTick()
	updateNGpp17Reward()
	updateNGpp16Reward()
	doPerSecondNGP3Stuff()
}

var postC2Count = 0;
var IPminpeak = new Decimal(0)
var EPminpeakType = 'normal'
var EPminpeak = new Decimal(0)
var replicantiTicks = 0
var isSmartPeakActivated = false

function updateEPminpeak(diff, type) {
	if (type == "EP") {
		var gainedPoints = gainedEternityPoints()
		var oldPoints = player.eternityPoints
	} else if (type == "TP") {
		var gainedPoints = getDilGain().sub(player.dilation.totalTachyonParticles).max(0)
		var oldPoints = player.dilation.totalTachyonParticles
	} else {
		var gainedPoints = getEMGain()
		var oldPoints = tmp.qu.breakEternity.eternalMatter
	}
	var newPoints = oldPoints.plus(gainedPoints)
	var newLog = Math.max(newPoints.log10(),0)
	var minutes = player.thisEternity / 600
	if (newLog > 1000 && EPminpeakType == 'normal' && isSmartPeakActivated) {
		EPminpeakType = 'logarithm'
		EPminpeak = new Decimal(0)
	}
	// for logarithm, we measure the amount of exponents gained from current
	var currentEPmin = (EPminpeakType == 'logarithm' ? new Decimal(Math.max(0, newLog - Math.max(oldPoints.log10(), 0))) : gainedPoints).dividedBy(minutes)
	if (currentEPmin.gt(EPminpeak) && player.infinityPoints.gte(Number.MAX_VALUE)) EPminpeak = currentEPmin
	return currentEPmin;
}

function checkMatter(diff){
	if (player.matter.pow(20).gt(player.money) && (player.currentChallenge == "postc7" || (inQC(6) && !hasAch("ng3p34")) )) {
		if (tmp.ri || inBigRip()) {}
		else if (inQC(6)) {
			quantum(false, true, 0)
			onChallengeFail()
		} else quickReset()
	} else if (player.matter.gt(player.money) && (inNC(12) || player.currentChallenge == "postc1" || player.pSac !== undefined) && !haveET) {
		if (player.pSac!=undefined) player.pSac.lostResets++
		if (player.pSac!=undefined && !player.resets) pSacReset(true, undefined, pxGain)
		else quickReset()
	}
}

function passiveIPupdating(diff){
	if (player.infinityUpgrades.includes("passiveGen")) player.partInfinityPoint += diff / player.bestInfinityTime * 10
	else player.partInfinityPoint = 0
	if (player.bestInfinityTime == 9999999999) player.partInfinityPoint = 0
	let x = Math.floor(player.partInfinityPoint / 10)
	player.partInfinityPoint -= x * 10
	player.infinityPoints = player.infinityPoints.plus(getIPMult().times(x));
}

function passiveInfinitiesUpdating(diff){
	let tempPA = player.partInfinitied || 0
	if (player.infinityUpgrades.includes("infinitiedGeneration") && player.currentEternityChall !== "eterc4") {
		let gain = diff / player.bestInfinityTime;
		if (player.eternities>0) gain = diff / 50;
		if (hasTS(35) && tmp.ngC) gain = nM(gain, getInfinitiedGain());
		tempPA = nA(tempPA, gain);
	}
	if (nG(tempPA, 1/2)) {
		let x = Decimal.floor(nM(tempPA, 2))
		tempPA = nS(tempPA, nD(x, 2))
		player.infinitied = nA(player.infinitied || 0, x);
	}
	player.partInfinitied = Math.max(Math.min(new Decimal(tempPA||0).toNumber(), 1), 0);
}

function infinityRespeccedDMUpdating(diff){
	var prod = getDarkMatterPerSecond()
	player.singularity.darkMatter = player.singularity.darkMatter.add(getDarkMatterPerSecond().times(diff))
	if (prod.gt(0)) tmp.tickUpdate = true
	if (player.singularity.darkMatter.gte(getNextDiscounts())) {
		player.dimtechs.discounts++
		for (d=1;d<9;d++) {
			var name = TIER_NAMES[d]
			player[name+"Cost"] = player[name+"Cost"].div(getDiscountMultiplier("dim" + d))
		}
		player.tickSpeedCost = player.tickSpeedCost.div(getDiscountMultiplier("tick"))
	}
}

function changingDecimalSystemUpdating(){
	getEl("decimalMode").style.visibility = "hidden"
	if (break_infinity_js) {
		player.totalmoney = Decimal.pow(10, 9e15-1)
		player.money = player.totalmoney
		clearInterval(gameLoopIntervalId)
		alert("You have reached the limit of break_infinity.js. In order for the game to continue functioning, the game will switch the library to logarithmica_numerus.js, requiring a game reload, but will have a higher limit. You cannot change libraries for this save again in the future.")
		tmp.mod.breakInfinity = !tmp.mod.breakInfinity
		save_game(true)
		document.location.reload(true)
		return
	}
}

function incrementTimesUpdating(diffStat){
	player.totalTimePlayed += diffStat
	if (tmp.ngpX >= 5) pl.save.time += diffStat
	if (tmp.ngp3) player.ghostify.time += diffStat
	if (tmp.qu) tmp.qu.time += diffStat
	if (player.currentEternityChall == "eterc12") diffStat /= 1e3
	player.thisEternity += diffStat
   	player.thisInfinityTime += diffStat
	if (inNGM(2)) player.galacticSacrifice.time += diffStat
	if (player.pSac) player.pSac.time += diffStat
	failsafeDilateTime = false
}

function requiredInfinityUpdating(diff){
	if (tmp.ri) return
	if (player.infinityUpgradesRespecced != undefined) infinityRespeccedDMUpdating(diff)

	let steps = getDimensionSteps()
	let dims = getMaxGeneralDimensions()
	for (let tier = dims - steps; tier >= 1; tier--) {
		var name = TIER_NAMES[tier];
		player[name + 'Amount'] = player[name + 'Amount'].plus(getDimensionProductionPerSecond(tier + steps).times(diff / 10))
	}
	if (tmp.ngp3 && player.firstAmount.gt(0)) player.dontWant = false

	var tempa = getDimensionProductionPerSecond(1).times(diff)
	player.money = player.money.plus(tempa)	
	player.totalmoney = player.totalmoney.plus(tempa)
	if (isInfiniteDetected()) return
	if (inBigRip()) {
		tmp.qu.bigRip.totalAntimatter = tmp.qu.bigRip.totalAntimatter.add(tempa)
		tmp.qu.bigRip.bestThisRun = tmp.qu.bigRip.bestThisRun.max(player.money)
	}
	if (player.totalmoney.gt("1e9000000000000000")) changingDecimalSystemUpdating()
	tmp.ri=player.money.gte(getLimit()) && ((player.currentChallenge != "" && player.money.gte(player.challengeTarget)) || !onPostBreak())
}

function chall2PowerUpdating(diff){
	var div = 180
	if (inNGM(5)) div /= puMults[11](hasPU(11, true, true))
	if (tmp.ngmR) div /= 100
	player.chall2Pow = Math.min(player.chall2Pow + diff / div, 1);
}

function normalChallPowerUpdating(diff){
	if (player.currentChallenge == "postc8" || inQC(6)) player.postC8Mult = player.postC8Mult.times(Math.pow(0.000000046416, diff))

	if (inNC(3) || player.matter.gte(1)) player.chall3Pow = player.chall3Pow.times(Decimal.pow(1.00038, diff)).min(1e200);

	if (inNC(2) || player.currentChallenge == "postc1" || tmp.ngmR || inNGM(5)) chall2PowerUpdating(diff)

	if (player.currentChallenge == "postc2" || inQC(6)) {
		postC2Count++;
		if (postC2Count >= 8 || diff > 80) {
			sacrifice();
			postC2Count = 0;
		}
	}
}

function incrementParadoxUpdating(diff) {
	if (inNGM(5)) {
		//Paradox Power
		player.pSac.dims.power=player.pSac.dims.power.add(getPDProduction(1).times(diff))
		for (var t=1;t<7;t++) {
			if (!isDimUnlocked(t+2)) break
			player.pSac.dims[t].amount=player.pSac.dims[t].amount.add(getPDProduction(t+2).times(diff))
		}
		if (player.pSac.dims.power.gte(1e10)) giveAchievement("Time Paradox")
	}
}

function dimensionButtonDisplayUpdating() {
	getEl("pdtabbtn").style.display = ph.shown("paradox") && player.galacticSacrifice.times >= 25 ? "" : "none"
   	getEl("idtabbtn").style.display = ((player.infDimensionsUnlocked[0] || ph.did("eternity")) && !inQC(8) && (inNGM(5) || ph.shown("infinity"))) ? "" : "none"
	getEl("tdtabbtn").style.display = ((ph.shown("eternity") || inNGM(4)) && (!inQC(8) || tmp.be)) ? "" : "none"
	getEl("mdtabbtn").style.display = ph.shown("eternity") && hasDilationStudy(6) ? "" : "none"
	getEl('toggleallmetadims').style.display = moreEMsUnlocked() && (ph.did("quantum") || getEternitied() >= 1e12) ? "" : "none"
}

function ghostifyAutomationUpdating(diff){
	if (!isAutoGhostsSafe) return

	//Ghostify Layer
	if (player.ghostify.wzb.unl) {
		if (isAutoGhostActive(17)) {
			let ag = player.ghostify.automatorGhosts[17]

			let change = getRemainingExtractTime().gte(ag.s || 60)
			if (!change) change = ag.oc && ag.t >= 1 / (hasAch("ng3p103") ? 10 : 1)
			if (change) changeTypeToExtract(tmp.bl.typeToExtract % br.limit + 1)

			if (!tmp.bl.extracting) extract()
		}
		if (isAutoGhostActive(21)) {
			let data = player.ghostify.wzb
			let hasWNB = data.wnb.gt(0)

			if (data.dPUse == 0 && data.dP.gt(0)) useAntiPreon(hasWNB ? 3 : 1)
			if (data.dPUse == 1) useAntiPreon(hasWNB ? 3 : 2)
			if (data.dPUse == 2) useAntiPreon(1)
			if (data.dPUse == 3 && !hasWNB) useAntiPreon(2)
		}
	}
	if (isAutoGhostActive(19)) {
		let ag = player.ghostify.automatorGhosts[19]
		let perSec = (hasAch("ng3p103") ? 10 : 1) / 2
		ag.t = (ag.t || 0) + diff * perSec
		let times = Math.floor(ag.t)
		if (times > 0) {
			let max = times
			if (isEnchantUsed(35)) max = tmp.bEn[35].times(max)
			autoMaxAllEnchants(max)
			ag.t = ag.t - times
		}
	}
	if (isAutoGhostActive(15)) if ((hasNU(16) || inBigRip()) && getGHPGain().gte(player.ghostify.automatorGhosts[15].a)) ghostify(true)

	//Quantum Layer
	if (!tmp.quUnl) return

	let limit = player.ghostify.automatorGhosts[13].o || 1 / 0
	if (player.masterystudies.includes("d13") && isAutoGhostActive(13)) {
		if (tmp.qu.bigRip.active) {
			if (tmp.qu.time >= player.ghostify.automatorGhosts[13].u * 10 && tmp.qu.bigRip.times <= limit) quantumReset(true, true)
		} else if (tmp.qu.time >= player.ghostify.automatorGhosts[13].t * 10 && tmp.qu.bigRip.times < limit) bigRip(true)
	}

	if (!tmp.quUnl) return
	if (AUTO_QC.auto.on) {
		if (tmp.inQCs.length != 2) AUTO_QC.next()
		else if (isQuantumReached()) {
			$.notify("QCs " + tmp.inQCs[0] + " and " + tmp.inQCs[1] + " has been automatically completed by Auto-Challenge Sweeper Ghost!", "success")
			tmp.preQCMods = tmp.qu.qcsMods.current
			onQCCompletion(tmp.inQCs, player.money, tmp.qu.time, player.dilation.times)
			AUTO_QC.next()
		} else if (tmp.qu.time > AUTO_QC.auto.time * 10) AUTO_QC.next()
	}

	if (!tmp.quActive) return
	if (player.masterystudies.includes("d12")) {
		let colorShorthands = ["r", "g", "b"]
		for (let c = 1; c <= 3; c++) {
			let shorthand = colorShorthands[c - 1]
			if (isAutoGhostActive(c) && tmp.qu.usedQuarks[shorthand].gt(0) && tmp.qu.tod[shorthand].quarks.eq(0)) unstableQuarks(shorthand)
			if (isAutoGhostActive(12) && getUnstableGain(shorthand).max(tmp.qu.tod[shorthand].quarks).gte(Decimal.pow(10, Math.pow(2, 50)))) {
				unstableQuarks(shorthand)
				radioactiveDecay(shorthand)
			}
			if (isAutoGhostActive(5)) maxBranchUpg(shorthand)
		}
		if (isAutoGhostActive(6)) maxTreeUpg()
	}
	if (player.masterystudies.includes("d11") && isAutoGhostActive(11)) {
		let ag = player.ghostify.automatorGhosts[11]
		ag.t = (ag.t || 0) + diff

		let start = tmp.qu.nanofield.producingCharge ? ag.t <= ag.cw : ag.t >= ag.pw
		if (tmp.qu.nanofield.producingCharge != start) {
			startProduceQuarkCharge()
			if (start) ag.t = 0
		}
	}
}

function WZBosonsUpdating(diff){
	diff *= ls.mult("bl")

	player.ghostify.automatorGhosts[17].t += diff

	var data = tmp.bl
	var wattGain = new Decimal(getBosonicWattGain())
	if (wattGain.gt(data.watt)) {
		if (wattGain.gt(data.speed)) data.speed = wattGain.sub(data.watt).times(10).add(data.speed).min(wattGain)
		data.watt = wattGain
	}

	if (data.speed > 0) {
		var limitDiff = data.speed.times(14400).min(diff).toNumber()
		bosonicTick(data.speed.sub(limitDiff / 28800).times(limitDiff))
		data.speed = data.speed.max(limitDiff / 14400).sub(limitDiff / 14400)
	}
}

function ghostlyPhotonsUpdating(diff){
	var data = player.ghostify.ghostlyPhotons
	data.amount = data.amount.add(getGPHProduction().times(diff))
	data.darkMatter = data.darkMatter.add(getDMProduction().times(diff))
	data.ghostlyRays = data.ghostlyRays.add(getGHRProduction().times(diff)).min(getGHRCap())

	for (var c = 0; c < 8; c++) {
		if (data.ghostlyRays.gte(getLightThreshold(c))) {
			data.lights[c] += Math.floor(data.ghostlyRays.div(getLightThreshold(c)).log(getLightThresholdIncrease(c)) + 1)
			tmp.updateLights = true
		}
	}
	data.maxRed = Math.max(data.lights[0], data.maxRed)
}

function nanofieldProducingChargeUpdating(diff){
	var rate = getQuarkChargeProduction()
	var loss = getQuarkLossProduction()
	var toSub = loss.times(diff).min(tmp.qu.replicants.quarks)
	if (toSub.eq(0)) {
		tmp.qu.nanofield.producingCharge = false
		getEl("produceQuarkCharge").innerHTML="Start production of preon charge.<br>(You will not get preons when you do this.)"
	} else if (!hasBosonicUpg(51)) {
		tmp.qu.replicants.quarks = tmp.qu.replicants.quarks.sub(toSub)
		tmp.qu.nanofield.charge = tmp.qu.nanofield.charge.add(toSub.div(loss).times(rate))
	}
}

function nanofieldUpdating(diff){
	var AErate = getQuarkAntienergyProduction()
	var toAddAE = AErate.times(diff).min(getQuarkChargeProductionCap().sub(tmp.qu.nanofield.antienergy))
	if (tmp.qu.nanofield.producingCharge) nanofieldProducingChargeUpdating(diff)
	if (hasBosonicUpg(51)) {
		tmp.qu.nanofield.charge = tmp.qu.nanofield.charge.add(getQuarkChargeProduction().times(diff))
		tmp.qu.nanofield.energy = tmp.qu.nanofield.energy.add(getQuarkEnergyProduction().times(diff).div(100))
	}
	if (toAddAE.gt(0)) {
		tmp.qu.nanofield.antienergy = tmp.qu.nanofield.antienergy.add(toAddAE).min(getQuarkChargeProductionCap())
		tmp.qu.nanofield.energy = tmp.qu.nanofield.energy.add(toAddAE.div(AErate).times(getQuarkEnergyProduction()))
	}
	if (toAddAE.gt(0) || hasBosonicUpg(51)) {
		updateNextPreonEnergyThreshold()
		if (tmp.qu.nanofield.power > tmp.qu.nanofield.rewards) {
			tmp.qu.nanofield.rewards = tmp.qu.nanofield.power
			if (!tmp.qu.nanofield.apgWoke && tmp.qu.nanofield.rewards >= tmp.apgw) {
				tmp.qu.nanofield.apgWoke = tmp.apgw
				$.notify("You reached " + getFullExpansion(tmp.apgw) + " rewards... Antipretus has woken up and took over the Nanoverse! Be careful!")
				if (!hasAch("ng3p91")) {
					showTab("quantumtab")
					showQuantumTab("nanofield")
					showNFTab("antipreon")
				}
			}
			updateNanoRewardScaling()
		}
	}
}

function treeOfDecayUpdating(diff){
	var colorShorthands=["r","g","b"]
	for (var c = 0; c < 3; c++) {
		var shorthand = colorShorthands[c]
		var branch = tmp.qu.tod[shorthand]
		if (branch.quarks.gt(0)) {
			var decayRate = getDecayRate(shorthand)
			var decayPower = getRDPower(shorthand)

			var mult = Decimal.pow(2, decayPower)
			var power = getDecayLifetime(branch.quarks.div(mult))
			var decayed = power.div(decayRate).min(diff)
			power = power.sub(decayed.times(decayRate))

			var sProd = getQuarkSpinProduction(shorthand)
			var decaySpent = decayed
			if (isAutoGhostsSafe && isAutoGhostActive(c + 1)) decaySpent = decaySpent.max(power.div(decayRate).times(10).min(diff))

			branch.quarks = power.gt(1) ? Decimal.pow(2, power - 1).times(mult) : power.times(mult)
			branch.spin = branch.spin.add(sProd.times(decaySpent))	
		}
	}
}

function emperorDimUpdating(diff){
	for (dim=8;dim>1;dim--) {
		var promote = hasNU(2) ? 1/0 : getWorkerAmount(dim-2)
		if (canFeedReplicant(dim-1,true)) {
			if (dim>2) promote = tmp.eds[dim-2].workers.sub(10).round().min(promote)
			tmp.eds[dim-1].progress = tmp.eds[dim-1].progress.add(tmp.eds[dim].workers.times(getEmperorDimensionMultiplier(dim)).times(diff/200)).min(promote)
			var toAdd = tmp.eds[dim-1].progress.floor()
			if (toAdd.gt(0)) {
				if (!hasNU(2)) {
					if (dim>2 && toAdd.gt(getWorkerAmount(dim-2))) tmp.eds[dim-2].workers = new Decimal(0)
					else if (dim>2) tmp.eds[dim-2].workers = tmp.eds[dim-2].workers.sub(toAdd).round()
					else if (toAdd.gt(tmp.qu.replicants.amount)) tmp.qu.replicants.amount = new Decimal(0)
					else tmp.qu.replicants.amount = tmp.qu.replicants.amount.sub(toAdd).round()
				}
				if (toAdd.gt(tmp.eds[dim-1].progress)) tmp.eds[dim-1].progress = new Decimal(0)
				else tmp.eds[dim-1].progress = tmp.eds[dim-1].progress.sub(toAdd)
				tmp.eds[dim-1].workers = tmp.eds[dim-1].workers.add(toAdd).round()
			}
		}
		if (!canFeedReplicant(dim-1,true)) tmp.eds[dim-1].progress = new Decimal(0)
	}
}

function replicantEggonUpdating(diff){
	var newBabies = tmp.twr.times(getEmperorDimensionMultiplier(1)).times(getSpinToReplicantiSpeed()).times(diff/200)
	if (hasAch("ng3p35")) newBabies = newBabies.times(10)
	tmp.qu.replicants.eggonProgress = tmp.qu.replicants.eggonProgress.add(newBabies)
	var toAdd = tmp.qu.replicants.eggonProgress.floor()
	if (toAdd.gt(0)) {
		if (toAdd.gt(tmp.qu.replicants.eggonProgress)) tmp.qu.replicants.eggonProgress = new Decimal(0)
		else tmp.qu.replicants.eggonProgress = tmp.qu.replicants.eggonProgress.sub(toAdd)
		tmp.qu.replicants.eggons = tmp.qu.replicants.eggons.add(toAdd).round()
	}
}

function replicantBabyHatchingUpdating(diff){
	if (tmp.qu.replicants.eggons.gt(0)) {
		tmp.qu.replicants.babyProgress = tmp.qu.replicants.babyProgress.add(diff/getHatchSpeed()/10)
		var toAdd = hasNU(2) ? tmp.qu.replicants.eggons : tmp.qu.replicants.babyProgress.floor().min(tmp.qu.replicants.eggons)
		if (toAdd.gt(0)) {
			if (toAdd.gt(tmp.qu.replicants.eggons)) tmp.qu.replicants.eggons = new Decimal(0)
			else tmp.qu.replicants.eggons = tmp.qu.replicants.eggons.sub(toAdd).round()
			if (toAdd.gt(tmp.qu.replicants.babyProgress)) tmp.qu.replicants.babyProgress = new Decimal(0)
			else tmp.qu.replicants.babyProgress = tmp.qu.replicants.babyProgress.sub(toAdd)
			tmp.qu.replicants.babies = tmp.qu.replicants.babies.add(toAdd).round()
		}
	}
}

function replicantBabiesGrowingUpUpdating(diff){
	if (tmp.qu.replicants.babies.gt(0)&&tmp.tra.gt(0)) {
		tmp.qu.replicants.ageProgress = tmp.qu.replicants.ageProgress.add(getGrowupRatePerMinute().div(60).times(diff)).min(tmp.qu.replicants.babies)
		var toAdd = tmp.qu.replicants.ageProgress.floor()
		if (toAdd.gt(0)) {
			if (toAdd.gt(tmp.qu.replicants.babies)) tmp.qu.replicants.babies = new Decimal(0)
			else tmp.qu.replicants.babies = tmp.qu.replicants.babies.sub(toAdd).round()
			if (toAdd.gt(tmp.qu.replicants.ageProgress)) tmp.qu.replicants.ageProgress = new Decimal(0)
			else tmp.qu.replicants.ageProgress = tmp.qu.replicants.ageProgress.sub(toAdd)
			tmp.qu.replicants.amount = tmp.qu.replicants.amount.add(toAdd).round()
		}
	}
}

function replicantOverallUpdating(diff){
	replicantEggonUpdating(diff)
	replicantBabyHatchingUpdating(diff)
	if (tmp.qu.replicants.eggons.lt(1)) tmp.qu.replicants.babyProgress = new Decimal(0)
	replicantBabiesGrowingUpUpdating(diff)
	if (tmp.qu.replicants.babies.lt(1)) tmp.qu.replicants.ageProgress = new Decimal(0)
	if (!tmp.qu.nanofield.producingCharge) tmp.qu.replicants.quarks = tmp.qu.replicants.quarks.add(getGatherRate().total.max(0).times(diff))
}

function quantumOverallUpdating(diff){
	if (tmp.quActive) {
		//Color Powers
		var colorShorthands=["r","g","b"]
		for (var c=0;c<3;c++) tmp.qu.colorPowers[colorShorthands[c]] = tmp.qu.colorPowers[colorShorthands[c]].add(getColorPowerProduction(colorShorthands[c]).times(diff))
		updateColorPowers()

		if (player.masterystudies.includes("d10")) replicantOverallUpdating(diff)
		if (player.masterystudies.includes("d11")) emperorDimUpdating(diff)
		if (player.masterystudies.includes("d12")) nanofieldUpdating(diff)
		if (player.masterystudies.includes("d13")) treeOfDecayUpdating(diff)
	}
}

function metaDimsUpdating(diff){
	player.meta.antimatter = player.meta.antimatter.plus(getMetaDimensionProduction(1).times(diff))
	if (inQC(4)) player.meta.antimatter = player.meta.antimatter.plus(getMetaDimensionProduction(1).times(diff))
	if (tmp.quActive && inQC(0)) gainQuarkEnergy(player.meta.bestAntimatter, player.meta.antimatter)
	player.meta.bestAntimatter = player.meta.bestAntimatter.max(player.meta.antimatter)
	if (tmp.ngp3) {
		player.meta.bestOverQuantums = player.meta.bestOverQuantums.max(player.meta.antimatter)
		player.meta.bestOverGhostifies = player.meta.bestOverGhostifies.max(player.meta.antimatter)
	}
}

function infinityTimeMetaBlackHoleDimUpdating(diff){
	var step = inQC(4) || inNGM(5) ? 2 : 1
	var stepT = inNC(7) && inNGM(4) ? 2 : step
	var max = inNGM(5) ? 6 : 8
	for (let tier = 1 ; tier <= max; tier++) {
		if (tier <= max - step){
			player["infinityDimension" + tier].amount = player["infinityDimension"+tier].amount.plus(infDimensionProduction(tier + step).times(diff / 10))
			if (hasDilationStudy(6)) player.meta[tier].amount = player.meta[tier].amount.plus(getMetaDimensionProduction(tier + step).times(diff / 10))
			if (isBHDimUnlocked(tier + step)) player["blackholeDimension"+tier].amount = player["blackholeDimension" + tier].amount.plus(getBlackholeDimensionProduction(tier + step).times(diff / 10))
		}
		if ((tmp.eterUnl || inNGM(4)) && tier <= max - stepT) player["timeDimension" + tier].amount = player["timeDimension" + tier].amount.plus(getTimeDimensionProduction(tier + stepT).times(diff / 10))
	}
}

function dimensionPageTabsUpdating(){
	var showProdTab=false
	getEl("dimTabButtons").style.display = "none"
	if (player.infinitied > 0 || player.eternities !== 0 || ph.did("quantum")) {
		getEl("hideProductionTab").style.display = ""
		showProdTab=!tmp.mod.hideProductionTab
	} else getEl("hideProductionTab").style.display = "none"
	if (player.infDimensionsUnlocked[0] || player.eternities !== 0 || ph.did("quantum") || showProdTab || inNGM(4)) getEl("dimTabButtons").style.display = "inline-block"
	getEl("prodtabbtn").style.display=showProdTab ? "inline-block":"none"
	if (!showProdTab) player.options.chart.on=false
}

function otherDimsUpdating(diff){
	//Infinity Dimensions
	let infProd = infDimensionProduction(1)
	if (inNGM(5)) infProd = infDimensionProduction(2).add(infProd)

	if (player.currentEternityChall !== "eterc7") player.infinityPower = player.infinityPower.plus(infProd.times(diff))
	else if (!haveSixDimensions()) player.seventhAmount = player.seventhAmount.plus(infProd.times(diff))

	if (inNGM(5) && !onPostBreak() && player.infinityPower.gt(Number.MAX_VALUE)) player.infinitypower = new Decimal(Number.MAX_VALUE)

	//Time Dimensions
	let timeProd = getTimeDimensionProduction(1)
	if (inNGM(5)) timeProd = getTimeDimensionProduction(2).add(timeProd)
	player.timeShards = player.timeShards.plus(timeProd.times(diff)).max(0)

	//Eternity Challenge 7
	let id8Prod = getECReward(7)
	if (id8Prod.gt(0)) player.infinityDimension8.amount = player.infinityDimension8.amount.plus(id8Prod.times(diff))
}

function ERFreeTickUpdating(){
	var oldT = player.totalTickGained
	player.totalTickGained = getTotalTickGained()
	player.tickThreshold = tickCost(player.totalTickGained+1)
	player.tickspeed = player.tickspeed.times(Decimal.pow(tmp.tsReduce, player.totalTickGained - oldT))
}

function nonERFreeTickUpdating(){
	let gain;
	let thresholdMult = 1.33
	var easier = inNGM(2) && !(inNGM(4))
	if (easier) {
		thresholdMult = hasTimeStudy(171) ? 1.1 : 1.15
		if (inNGM(3)) thresholdMult = hasTimeStudy(171) ? 1.03 : 1.05
	} else if (hasTimeStudy(171)) {
		thresholdMult = 1.25
		if (tmp.mod.newGameMult) thresholdMult -= 0.08
	}
	if (inNGM(5)) thresholdMult = 1.5
	if (isQCRewardActive(7)) thresholdMult *= tmp.qcRewards[7]
	if (ph.did("ghostify") && player.ghostify.neutrinos.boosts > 9) thresholdMult -= tmp.nb[10]
	if (thresholdMult < 1.1 && player.galacticSacrifice == undefined) thresholdMult = 1.05 + 0.05 / (2.1 - thresholdMult)
	if (thresholdMult < 1.01 && inNGM(2)) thresholdMult = 1.005 + 0.005 / (2.01 - thresholdMult)

	let thresholdExp = 1

	gain = Math.ceil(new Decimal(player.timeShards).dividedBy(player.tickThreshold).log10() / Math.log10(thresholdMult) / thresholdExp)
	player.totalTickGained += gain
	player.tickspeed = player.tickspeed.times(Decimal.pow(tmp.tsReduce, gain))
	player.postC3Reward = Decimal.pow(getPostC3Mult(), gain * getIC3EffFromFreeUpgs()).times(player.postC3Reward)
	var base = inNGM(4) ? 0.01 : (player.tickspeedBoosts ? .1 : 1)
	player.tickThreshold = Decimal.pow(thresholdMult, player.totalTickGained * thresholdExp).times(base)
	getEl("totaltickgained").textContent = "You've gained " + getFullExpansion(player.totalTickGained) + " tickspeed upgrades."
	tmp.tickUpdate = true
}

function bigCrunchButtonUpdating(){
	getEl("bigcrunch").style.display = 'none'
	getEl("postInfinityButton").style.display = 'none'
	if (tmp.ri) {
		getEl("bigcrunch").style.display = 'inline-block';
		if ((player.currentChallenge == "" || player.options.retryChallenge) && (player.bestInfinityTime <= 600 || player.break)) {}
		else {
			isEmptiness = true
			showTab('emptiness')
			ph.updateDisplay()
		}
	} else if ((player.break && player.currentChallenge == "") || player.infinityUpgradesRespecced != undefined) {
		if (player.money.gte(Number.MAX_VALUE) && ph.tmp.infinity.shown) {
			getEl("postInfinityButton").style.display = "inline-block"
			var currentIPmin = gainedInfinityPoints().dividedBy(player.thisInfinityTime/600)
			if (currentIPmin.gt(IPminpeak)) IPminpeak = currentIPmin
			if (IPminpeak.log10() > 1e9) getEl("postInfinityButton").innerHTML = "Big Crunch"
			else {
				var IPminpart = IPminpeak.log10() > 1e5 ? "" : "<br>" + shortenDimensions(currentIPmin) + " IP/min" + "<br>Peaked at " + shortenDimensions(IPminpeak) + " IP/min"
				getEl("postInfinityButton").innerHTML = "<b>" + (IPminpeak.log10() > 3e5 ? "Gain " : "Big Crunch for ") + shortenDimensions(gainedInfinityPoints()) + " Infinity points.</b>" + IPminpart
			}
		}
	}
}

function nextICUnlockUpdating(){
	let nextUnlock = getNextAt(order[player.postChallUnlocked])
	if (hasAch("r133")) {
		getEl("nextchall").textContent = ""
		return
	}

	let newChallsUnlocked = false
	while (player.money.gte(nextUnlock) && nextUnlock) {
		player.postChallUnlocked++
		if (getEternitied() >= 7) player.challenges.push(order[player.postChallUnlocked])

		nextUnlock = getNextAt(order[player.postChallUnlocked])
		newChallsUnlocked = true
	}

	getEl("nextchall").textContent = !nextUnlock ? "" :
		"Get " + shortenCosts(nextUnlock) + " antimatter to unlock Infinity Challenge " + (player.postChallUnlocked + 1) + "."

	if (!newChallsUnlocked) return
	if (getEternitied() >= 7 && player.postChallUnlocked >= 8) {
		ndAutobuyersUsed = 0
		for (i = 0; i <= 8; i++) if (player.autobuyers[i] % 1 !== 0 && player.autobuyers[i].isOn) ndAutobuyersUsed++
		getEl("maxall").style.display = ndAutobuyersUsed > 8 && player.challenges.includes("postc8") ? "none" : ""
	}
	updateChallenges()
}

function passiveIPperMUpdating(diff){
	player.infinityPoints = player.infinityPoints.plus(bestRunIppm.times(player.offlineProd/100).times(diff/60))
}

function giveBlackHolePowerUpdating(diff){
	if (player.exdilation != undefined) player.blackhole.power = player.blackhole.power.plus(getBlackholeDimensionProduction(1).times(diff))
}

function freeTickspeedUpdating(){
	if (player.boughtDims) ERFreeTickUpdating()
	if (player.timeShards.gt(player.tickThreshold) && !player.boughtDims) nonERFreeTickUpdating()
}

function IRsetsUnlockUpdating(){
	if (player.infinityUpgradesRespecced != undefined) if (setUnlocks.length > player.setsUnlocked) if (player.money.gte(setUnlocks[player.setsUnlocked])) player.setsUnlocked++
}

function IPMultBuyUpdating() {
	if (player.infMultBuyer && (!player.boughtDims || canBuyIPMult())) {
		var dif = Math.floor(player.infinityPoints.div(player.infMultCost).log(tmp.mod.newGameExpVersion ? 4 : 10)) + 1
		if (dif > 0) {
			player.infMult = player.infMult.times(Decimal.pow(getIPMultPower(), dif))
			player.infMultCost = player.infMultCost.times(Decimal.pow(ipMultCostIncrease, dif))
			if (player.infinityPoints.lte(Decimal.pow(10, 1e9))) {
				if (ph.did("ghostify")) {
					if (player.ghostify.milestones < 11) player.infinityPoints = player.infinityPoints.minus(player.infMultCost.dividedBy(tmp.mod.newGameExpVersion?4:10).min(player.infinityPoints))
				}
				else player.infinityPoints = player.infinityPoints.minus(player.infMultCost.dividedBy(tmp.mod.newGameExpVersion?4:10).min(player.infinityPoints))
			}
			if (player.autobuyers[11].priority !== undefined && player.autobuyers[11].priority !== null && player.autoCrunchMode == "amount") player.autobuyers[11].priority = Decimal.times(player.autobuyers[11].priority, Decimal.pow(getIPMultPower(), dif));
			if (player.autoCrunchMode == "amount") getEl("priority12").value = formatValue("Scientific", player.autobuyers[11].priority, 2, 0);
		}
	}
}

function doEternityButtonDisplayUpdating(diff){
	var isSmartPeakActivated = tmp.ngp3 && getEternitied() >= 1e13 && player.dilation.upgrades.includes("ngpp6")
	var EPminpeakUnits = isSmartPeakActivated ? (player.dilation.active ? 'TP' : tmp.be ? 'EM' : 'EP') : 'EP'
	var currentEPmin = updateEPminpeak(diff, EPminpeakUnits)
	EPminpeakUnits = (EPminpeakType == 'logarithm' ? ' log(' + EPminpeakUnits + ')' : ' ' + EPminpeakUnits) + '/min'
	if (getEl("eternitybtn").style.display != "none") {
		getEl("eternitybtnFlavor").textContent = (((!player.dilation.active&&gainedEternityPoints().lt(1e6))||player.eternities<1||player.currentEternityChall!==""||(player.options.theme=="Aarex's Modifications"&&player.options.notation!="Morse code"))
									    ? ((player.currentEternityChall!=="" ? "Other challenges await..." : player.eternities>0 ? "" : "Other times await...") + " I need to become Eternal.") : "")
		if (player.dilation.active && player.dilation.totalTachyonParticles.gte(getDilGain())) getEl("eternitybtnEPGain").innerHTML = "Reach " + shortenMoney(getReqForTPGain()) + " antimatter to gain more Tachyon Particles."
		else {
			if ((EPminpeak.lt(Decimal.pow(10,9)) && EPminpeakType == "logarithm") || (EPminpeakType == 'normal' && EPminpeak.lt(Decimal.pow(10, 1e9)))) {
				getEl("eternitybtnEPGain").innerHTML = ((player.eternities > 0 && (player.currentEternityChall==""||player.options.theme=="Aarex's Modifications"))
											  ? "Gain <b>"+(player.dilation.active?shortenMoney(getDilGain().sub(player.dilation.totalTachyonParticles)):shortenDimensions(gainedEternityPoints()))+"</b> "+(player.dilation.active?"Tachyon particles.":tmp.be?"EP and <b>"+shortenDimensions(getEMGain())+"</b> Eternal Matter.":"Eternity points.") : "")
			} else {
				getEl("eternitybtnEPGain").innerHTML = "<b>Other times await... I need to become Eternal.</b>"
			}
		}
		var showEPmin=(player.currentEternityChall===""||player.options.theme=="Aarex's Modifications")&&EPminpeak>0&&player.eternities>0&&player.options.notation!='Morse code'&&player.options.notation!='Spazzy'&&(!(player.dilation.active||tmp.be)||isSmartPeakActivated)
		if (EPminpeak.log10() < 1e5) {
			getEl("eternitybtnRate").textContent = (showEPmin&&(EPminpeak.lt("1e30003")||player.options.theme=="Aarex's Modifications")
										  ? (EPminpeakType == "normal" ? shortenDimensions(currentEPmin) : shorten(currentEPmin))+EPminpeakUnits : "")
			getEl("eternitybtnPeak").textContent = showEPmin ? "Peaked at "+(EPminpeakType == "normal" ? shortenDimensions(EPminpeak) : shorten(EPminpeak))+EPminpeakUnits : ""
		} else {
			getEl("eternitybtnRate").textContent = ''
			getEl("eternitybtnPeak").textContent = ''
		}
	}
}

function doQuantumButtonDisplayUpdating(diff){
	let inBR = inBigRip()

	var currentQKmin = new Decimal(0)
	if (ph.did("quantum") && isQuantumReached()) {
		var bigRipped = !tmp.ngp3 ? false : player.quantum.bigRip.active
		if (!bigRipped) {
			currentQKmin = quarkGain().dividedBy(tmp.qu.time / 600)
			if (currentQKmin.gt(QKminpeak) && player.meta.antimatter.gte(Decimal.pow(Number.MAX_VALUE,tmp.ngp3 ? 1.2 : 1))) {
				QKminpeak = currentQKmin
				QKminpeakValue = quarkGain()
				tmp.qu.autobuyer.peakTime = 0
			} else tmp.qu.autobuyer.peakTime += diff
		}
	}
	
	getEl("quantumbtnFlavor").textContent = ((tmp.qu!==undefined?!tmp.qu.times&&(player.ghostify!==undefined?!player.ghostify.milestones:true):false)||!inQC(0)?(inBR?"I am":inQC(0)?"My computer is":tmp.qu.challenge.length>1?"These paired challenges are":"This challenge is")+" not powerful enough... ":"") + "I need to go quantum."
	var showGain = ((ph.did("quantum") && tmp.qu.times) || (ph.did("ghostify") && player.ghostify.milestones)) && (inQC(0)||player.options.theme=="Aarex's Modifications") ? "QK" : ""
	if (inBR) showGain = "SS"
	getEl("quantumbtnQKGain").textContent = showGain == "QK" ? "Gain "+shortenDimensions(quarkGain())+" quark"+(quarkGain().eq(1)?".":"s.") : ""
	if (showGain == "SS") getEl("quantumbtnQKGain").textContent = "Gain " + shortenDimensions(getSpaceShardsGain()) + " Space Shards."
	if (showGain == "QK" && currentQKmin.gt(Decimal.pow(10, 1e5))) {
		getEl("quantumbtnRate").textContent = ''
		getEl("quantumbtnPeak").textContent = ''
	} else {
		getEl("quantumbtnRate").textContent = showGain == "QK" ? shortenMoney(currentQKmin)+" QK/min" : ""
		var showQKPeakValue = QKminpeakValue.lt(1e30) || player.options.theme=="Aarex's Modifications"
		getEl("quantumbtnPeak").textContent = showGain == "QK" ? (showQKPeakValue ? "" : "Peaked at ") + shortenMoney(QKminpeak)+" QK/min" + (showQKPeakValue ? " at " + shortenDimensions(QKminpeakValue) + " QK" : "") : ""
	}
}

function doGhostifyButtonDisplayUpdating(diff){
	var currentGHPmin = new Decimal(0)
	if (ph.did("ghostify") && bigRipped) {
		currentGHPmin = getGHPGain().dividedBy(player.ghostify.time / 600)
		if (currentGHPmin.gt(GHPminpeak)) {
			GHPminpeak = currentGHPmin
			GHPminpeakValue = getGHPGain()
		}
	}
	var ghostifyGains = []
	if (ph.did("ghostify")) {
		ghostifyGains.push(shortenDimensions(getGHPGain()) + " Ghost Particles")
		if (hasAch("ng3p78")) ghostifyGains.push(shortenDimensions(Decimal.times(6e3 * tmp.qu.bigRip.bestGals, getGhostifiedGain()).times(getNeutrinoGain())) + " Neutrinos")
		if (hasBosonicUpg(15)) ghostifyGains.push(getFullExpansion(getGhostifiedGain()) + " Ghostifies")
	}
	getEl("ghostifybtnFlavor").textContent = ghostifyGains.length > 1 ? "" : (ghostifyGains.length ? "" : "I need to ascend from this broken universe... ") + "I need to become a ghost."
	getEl("GHPGain").textContent = ghostifyGains.length ? "Gain " + ghostifyGains[0] + (ghostifyGains.length > 2 ? ", " + ghostifyGains[1] + "," : "") + (ghostifyGains.length > 1 ? " and " + ghostifyGains[ghostifyGains.length-1] : "") + "." : ""
	var showGHPPeakValue = GHPminpeakValue.lt(1e6) || player.options.theme=="Aarex's Modifications"
	getEl("GHPRate").textContent = ghostifyGains.length == 1 && showGHPPeakValue ? getGHPRate(currentGHPmin) : ""
	getEl("GHPPeak").textContent = ghostifyGains.length == 1 ? (showGHPPeakValue?"":"Peaked at ")+getGHPRate(GHPminpeak)+(showGHPPeakValue?" at "+shortenDimensions(GHPminpeakValue)+" GhP":"") : ""
}

function tickspeedButtonDisplay(){
	if (player.tickSpeedCost.gt(player.money)) {
		getEl("tickSpeed").className = 'unavailablebtn';
		getEl("tickSpeedMax").className = 'unavailablebtn';
	} else {
		getEl("tickSpeed").className = 'storebtn';
		getEl("tickSpeedMax").className = 'storebtn';
	}
}

function passiveGPGen(diff){
	let passiveGPGen = false
	if (inNGM(3)) passiveGPGen = hasAch("r56")
	else if (inNGM(2)) passiveGPGen = hasTimeStudy(181)
	var mult = 1
	if (inNGM(4)){
		if (hasAch("r43")) mult = Math.pow(player.galacticSacrifice.galaxyPoints.plus(1e20).log10() / 10, 2) /2
		if (mult > 100) mult = 100
	}
	if (passiveGPGen) player.galacticSacrifice.galaxyPoints = player.galacticSacrifice.galaxyPoints.add(getGSAmount().times(diff / 100 * mult))
}


function normalSacDisplay(){
	if (player.eightBought > 0 && player.resets > 4 && player.currentEternityChall !== "eterc3") getEl("sacrifice").className = "storebtn"
   	else getEl("sacrifice").className = "unavailablebtn"
}

function sacLayersDisplay(){
	getEl("automationbtn").style.display = inNGM(4) && (player.challenges.includes("challenge1") || player.infinitied > 0 || player.eternities != 0 || ph.did("quantum")) && !isEmptiness ? "inline-block" : "none"
	if (getEl("paradox").style.display=='block') updatePUMults()
	if (getEl("galaxy").style.display=='block') {
		galacticUpgradeSpanDisplay()
		galacticUpgradeButtonTypeDisplay()
	}
}

function isEmptinessDisplayChanges(){
	if (isEmptiness) {
		getEl("dimensionsbtn").style.display = "none";
		getEl("optionsbtn").style.display = "none";
		getEl("statisticsbtn").style.display = "none";
		getEl("achievementsbtn").style.display = "none";
		getEl("tickSpeed").style.visibility = "hidden";
		getEl("tickSpeedMax").style.visibility = "hidden";
		getEl("tickLabel").style.visibility = "hidden";
		getEl("tickSpeedAmount").style.visibility = "hidden";
	} else {
		getEl("dimensionsbtn").style.display = "inline-block";
		getEl("optionsbtn").style.display = "inline-block";
		getEl("statisticsbtn").style.display = tmp.mod.hideStats ? "none" : "inline-block";
		getEl("achievementsbtn").style.display = tmp.mod.hideAchs ? "none" : "inline-block";
	}
}

function DimBoostBulkDisplay(){
	var bulkDisplay = player.infinityUpgrades.includes("bulkBoost") || player.autobuyers[9].bulkBought === true ? "inline" : "none"
	getEl("bulkdimboost").style.display = bulkDisplay
	if (inNGM(3)) getEl("bulkTickBoostDiv").style.display = bulkDisplay
}

function currentChallengeProgress(){
	var p = Math.min((Decimal.log10(player.money.plus(1)) / Decimal.log10(player.challengeTarget) * 100), 100).toFixed(2) + "%"
	getEl("progressbar").style.width = p
	getEl("progresspercent").textContent = p
	getEl("progresspercent").setAttribute('ach-tooltip',"Percentage to challenge goal")
}

function preBreakProgess(){
	var p = Math.min((Decimal.log10(player.money.plus(1)) / Decimal.log10(getLimit()) * 100), 100).toFixed(2) + "%"
	getEl("progressbar").style.width = p
	getEl("progresspercent").textContent = p
	getEl("progresspercent").setAttribute('ach-tooltip',"Percentage to Infinity")
}

function infDimProgress(){
	var p = Math.min(player.money.e / getNewInfReq().money.e * 100, 100).toFixed(2) + "%"
	getEl("progressbar").style.width = p
	getEl("progresspercent").textContent = p
	getEl("progresspercent").setAttribute('ach-tooltip',"Percentage to next dimension unlock")
}

function currentEChallengeProgress(){
	var p = Math.min(Decimal.log10(player.infinityPoints.plus(1)) / player.eternityChallGoal.log10() * 100, 100).toFixed(2) + "%"
	getEl("progressbar").style.width = p
	getEl("progresspercent").textContent = p
	getEl("progresspercent").setAttribute('ach-tooltip',"Percentage to Eternity Challenge goal")
}

function preEternityProgress(){
	var p = Math.min(Decimal.log10(player.infinityPoints.plus(1)) / Decimal.log10(Number.MAX_VALUE)  * 100, 100).toFixed(2) + "%"
	getEl("progressbar").style.width = p
	getEl("progresspercent").textContent = p
	getEl("progresspercent").setAttribute('ach-tooltip',"Percentage to Eternity")
}

function r128Progress(){
	var p = (Decimal.log10(player.infinityPoints.plus(1)) / 220).toFixed(2) + "%"
	getEl("progressbar").style.width = p
	getEl("progresspercent").textContent = p
	getEl("progresspercent").setAttribute('ach-tooltip','Percentage to "What do I have to do to get rid of you"') 
}

function r138Progress(){
	var p = Math.min(Decimal.log10(player.infinityPoints.plus(1)) / 200, 100).toFixed(2) + "%"
	getEl("progressbar").style.width = p
	getEl("progresspercent").textContent = p
	getEl("progresspercent").setAttribute('ach-tooltip','Percentage to "That is what I have to do to get rid of you."')
}

function gainTPProgress(){
	var p = (getDilGain().log10() / player.dilation.totalTachyonParticles.log10()).toFixed(2) + "%"
	getEl("progressbar").style.width = p
	getEl("progresspercent").textContent = p
	getEl("progresspercent").setAttribute('ach-tooltip','Percentage to the requirement for tachyon particle gain')
}

function ngpp13Progress(){
	var gepLog = gainedEternityPoints().log2()
	var goal = Math.pow(2,Math.ceil(Math.log10(gepLog) / Math.log10(2)))
	goal = Decimal.sub("1e40000", player.eternityPoints).log2()
	var percentage = Math.min(gepLog / goal * 100, 100).toFixed(2) + "%"
	getEl("progressbar").style.width = percentage
	getEl("progresspercent").textContent = percentage
	getEl("progresspercent").setAttribute('ach-tooltip','Percentage to "In the grim darkness of the far endgame"')
}

function r127Progress(){
	var gepLog = gainedEternityPoints().log2()
	var goal = Math.pow(2,Math.ceil(Math.log10(gepLog) / Math.log10(2)))
	goal = Decimal.sub(Number.MAX_VALUE, player.eternityPoints).log2()
	var percentage = Math.min(gepLog / goal * 100, 100).toFixed(2) + "%"
	getEl("progressbar").style.width = percentage
	getEl("progresspercent").textContent = percentage
	getEl("progresspercent").setAttribute('ach-tooltip','Percentage to "But I wanted another prestige layer..."')
}

function preQuantumNormalProgress(){
	var gepLog = gainedEternityPoints().log2()
	var goal = Math.pow(2,Math.ceil(Math.log10(gepLog) / Math.log10(2)))
	if (goal > 131072 && player.meta && !hasAch('ngpp13')) {
		ngpp13Progress()
	} else if (goal > 512 && !hasAch('r127')) {
		r127Progress()
	} else {
		var percentage = Math.min(gepLog / goal * 100, 100).toFixed(2) + "%"
		getEl("progressbar").style.width = percentage
		getEl("progresspercent").textContent = percentage
		getEl("progresspercent").setAttribute('ach-tooltip',"Percentage to "+shortenDimensions(Decimal.pow(2,goal))+" EP gain")
	}
}

function progressBarUpdating(){
	if (!tmp.mod.progressBar) return
	getEl("progressbar").className=""
	if (getEl("metadimensions").style.display == "block") doQuantumProgress() 
	else if (player.currentChallenge !== "") {
		currentChallengeProgress()
	} else if (!player.break) {
		preBreakProgess()
	} else if (player.infDimensionsUnlocked.includes(false)) {
		infDimProgress()
	} else if (player.currentEternityChall !== '' && player.infinityPoints.lt(player.eternityChallGoal.pow(2))) {
		currentEChallengeProgress()
	} else if (player.infinityPoints.lt(Number.MAX_VALUE) || player.eternities == 0) {
		preEternityProgress()
	} else if (hasAch('r127') && !hasAch('r128') && player.timestudy.studies.length == 0) {
		r128Progress()
	} else if (player.dilation.studies.includes(5) && player.dilation.active && !hasAch('r138') && player.timestudy.studies.length == 0) {
		r138Progress()
	} else if (player.dilation.active && player.dilation.totalTachyonParticles.gte(getDilGain())) {
		gainTPProgress()
	} else if ((!inQC(0) || gainedEternityPoints().gte(Decimal.pow(2,1048576))) && player.meta) doQuantumProgress()
	else preQuantumNormalProgress()
}

function ECRewardDisplayUpdating(){
	getEl("ec1reward").textContent = "Reward: "+shortenMoney(getECReward(1))+"x on all Time Dimensions (based on time spent this Eternity)"
	getEl("ec2reward").textContent = "Reward: Infinity Power affects the 1st Infinity Dimension with reduced effect. Currently: " + shortenMoney(getECReward(2)) + "x"
	getEl("ec3reward").textContent = "Reward: Increase the multiplier for buying 10 Dimensions. Currently: " + shorten(getDimensionPowerMultiplier("no-QC5")) + "x"
	getEl("ec4reward").textContent = "Reward: Infinity Dimensions gain a multiplier from unspent IP. Currently: " + shortenMoney(getECReward(4)) + "x"
	getEl("ec5reward").textContent = "Reward: Galaxy cost scaling starts " + getECReward(5) + " galaxies later."
	getEl("ec6reward").textContent = "Reward: Further reduce the dimension cost multiplier increase. Currently: " + player.dimensionMultDecrease.toFixed(1) + "x "
	getEl("ec7reward").textContent = "Reward: First Time Dimensions produce Eighth Infinity Dimensions. Currently: " + shortenMoney(infDimensionProduction(9)) + " per second. "
	getEl("ec8reward").textContent = "Reward: Infinity Power powers up replicanti galaxies. Currently: " + (getECReward(8) * 100 - 100).toFixed(2) + "%"
	getEl("ec9reward").textContent = "Reward: Infinity Dimensions gain a " + (inNGM(2) ? "post dilation " : "") + " multiplier based on your Time Shards. Currently: "+shortenMoney(getECReward(9))+"x "
	getEl("ec10reward").textContent = "Reward: Time Dimensions gain a multiplier from your Infinities. Currently: " + shortenMoney(getECReward(10)) + "x "
	getEl("ec11reward").textContent = "Reward: Further reduce the tickspeed cost multiplier increase. Currently: " + player.tickSpeedMultDecrease.toFixed(2) + "x" + (tmp.ngC ? ", and galaxies are " + shorten((getECReward(11) - 1) * 100) + "% stronger (based on free tickspeed upgrades)":" ")
	getEl("ec12reward").textContent = "Reward: Infinity Dimension cost multipliers are reduced. (x^" + getECReward(12) + ")"
	getEl("ec13reward").textContent = "Reward: Increase the exponent of meta-antimatter's effect. (^9 -> ^" + (getECReward(13) + 9) + ")"
	getEl("ec14reward").textContent = "Reward: Free tickspeed upgrades boost the IC3 reward to be " + getIC3EffFromFreeUpgs().toFixed(0) + "x stronger."

	getEl("ec10span").textContent = shortenMoney(ec10bonus) + "x"
	getEl("eterc7ts").textContent = tmp.ngC ? "does nothing" : "affects all dimensions normally"
}

function bigRipUpgradeUpdating(){
	if (player.ghostify.milestones>7) {
		getEl("spaceShards").textContent=shortenDimensions(tmp.qu.bigRip.spaceShards)
		for (var u=1;u<=getMaxBigRipUpgrades();u++) {
			getEl("bigripupg"+u).className = tmp.qu.bigRip.upgrades.includes(u) ? "gluonupgradebought bigrip" + (isBigRipUpgradeActive(u, true) ? "" : "off") : tmp.qu.bigRip.spaceShards.lt(bigRipUpgCosts[u]) ? "gluonupgrade unavailablebtn" : "gluonupgrade bigrip"
			getEl("bigripupg"+u+"cost").textContent = shortenDimensions(new Decimal(bigRipUpgCosts[u]))
		}
	}
	getEl("bigripupg1current").textContent = shortenDimensions(tmp.bru[1])
	getEl("bigripupg8current").textContent = shortenDimensions(tmp.bru[8])+(Decimal.gte(tmp.bru[8],Number.MAX_VALUE)&&!hasNU(11)?"x (cap)":"x")
	getEl("bigripupg14current").textContent = new Decimal(tmp.bru[14]).toFixed(2)
	var bru15effect = tmp.bru[15]
	getEl("bigripupg15current").textContent=bru15effect < 999.995 ? bru15effect.toFixed(2) : getFullExpansion(Math.round(bru15effect))
	getEl("bigripupg16current").textContent=shorten(tmp.bru[16])
	getEl("bigripupg17current").textContent=tmp.bru[17]
	if (player.ghostify.ghostlyPhotons.unl) {
		getEl("bigripupg18current").textContent=shorten(tmp.bru[18])
		getEl("bigripupg19current").textContent=shorten(tmp.bru[19])
	}
}

function challengeOverallDisplayUpdating(){
	if (getEl("challenges").style.display == "block") {
		if (getEl("eternitychallenges").style.display == "block") ECRewardDisplayUpdating()
		if (getEl("quantumchallenges").style.display == "block") {
			if (tmp.qu.autoOptions.sacrifice) getEl("electronsAmount2").textContent="You have " + getFullExpansion(Math.round(tmp.qu.electrons.amount)) + " electrons."
			for (var c=1;c<=9;c++) {
				let x = tmp.qcRewards[c]
				if (c == 5) getEl("qc5reward").textContent = getDimensionPowerMultiplier("linear").toFixed(2)
				else if (c != 2 && c != 8) getEl("qc" + c + "reward").textContent = shorten(x)
			}
			if (player.masterystudies.includes("d14")) bigRipUpgradeUpdating() //big rip
		}
	}
}

function chall23PowerUpdating(){
	getEl("chall2Pow").textContent = (player.chall2Pow*100).toFixed(2) + "%"
	getEl("chall3Pow").textContent = shorten(player.chall3Pow*100) + "%"
}

function dimboostBtnUpdating(){
	var shiftRequirement = getShiftRequirement(0);

	if (getAmount(shiftRequirement.tier) >= shiftRequirement.amount) {
		getEl("softReset").className = 'storebtn';
	} else {
		getEl("softReset").className = 'unavailablebtn';
	}
}

function galaxyBtnUpdating(){
	if (getAmount(inNC(4)||player.pSac!=undefined?6:8) >= getGalaxyRequirement()) {
		getEl("secondSoftReset").className = 'storebtn';
	} else {
		getEl("secondSoftReset").className = 'unavailablebtn';
	}
}

let newDimPresPos = 1
function newIDDisplayUpdating() {
	getEl("newDimensionButton").style.display = "none"
	var req = getNewInfReq()
	if (getEternitied() >= 25) {
		while (req.money.lt(player.money) && !player.infDimensionsUnlocked[7]) {
			newDimension()
			if (player.infDimBuyers[req.tier-1] && player.currentEternityChall != "eterc8") buyMaxInfDims(req.tier)
			req = getNewInfReq()
		}
	} else if (player.break && player.currentChallenge == "" && !player.infDimensionsUnlocked[7] && ph.tmp.infinity.shown) {
		getEl("newDimensionButton").style.display = "inline-block"
		getEl("newDimensionButton").textContent = "Get " + shortenCosts(req.money) + " antimatter to unlock a new Dimension."
		if (player.money.gte(req.money)) getEl("newDimensionButton").className = "presPos" + newDimPresPos + " newdim"
		else getEl("newDimensionButton").className = "presPos" + newDimPresPos + " newdimlocked"
	}
}

function d8SacDisplay() {
	let desc = tmp.ngC ? "Boost all Dimensions" : "Boost the 8th Dimension"
	if (calcTotalSacrificeBoost().lte(Decimal.pow(10, 1e9))) {
		getEl("sacrifice").setAttribute('ach-tooltip', desc + " by " + formatValue(player.options.notation, calcSacrificeBoost(), 2, 2) + "x");
		getEl("sacrifice").textContent = "Dimensional Sacrifice (" + formatValue(player.options.notation, calcSacrificeBoost(), 2, 2) + "x)"
	} else {
		getEl("sacrifice").setAttribute('ach-tooltip', desc);
		getEl("sacrifice").textContent = "Dimensional Sacrifice (Total: " + formatValue(player.options.notation, calcTotalSacrificeBoost(), 2, 2) + "x)"
	}
}

function pSacBtnUpdating(){
	if (canPSac()) {
		let px = getPxGain()
		getEl("pSac").innerHTML = "Paradox Sacrifice for " + shortenDimensions(px) + " Paradox" + (px.eq(1) ? "." : "es.")
	}
}

function galSacBtnUpdating() {
	if (getEl("gSacrifice").style.display === "inline-block") {
		getEl("gSacrifice").innerHTML = "Galactic Sacrifice (" + formatValue(player.options.notation, getGSAmount(), 2, 0) + " GP)"
		getEl("gSacrifice").setAttribute('ach-tooltip', "Gain " + formatValue(player.options.notation, getGSAmount(), 2, 0) + " GP")
		getEl("gSacrifice").className = getGSAmount().gt(0) ? "storebtn" : "unavailablebtn"
	}
	if (getEl("sacrificebtn").style.display !== "none") {
		var currentGPmin = getGSAmount().dividedBy(player.galacticSacrifice.time / 600)
		if (currentGPmin.gt(GPminpeak)) GPminpeak = currentGPmin
		var notationOkay = (GPminpeak.gt("1e300000") && player.options.theme != "Aarex's Modifications") || player.options.notation == "Morse code" || player.options.notation == 'Spazzy'
		var notation2okay = (GPminpeak.gt("1e3000") && player.options.theme != "Aarex's Modifications") || player.options.notation == "Morse code" || player.options.notation == 'Spazzy'
		getEl("sacrificebtn").innerHTML = (notationOkay ? "Gain " : "Galactic Sacrifice for ") + shortenDimensions(getGSAmount()) + " Galaxy points." +
			(notation2okay ? "" : "<br>" + shortenMoney(currentGPmin) + " GP/min" + "<br>Peaked at " + shortenMoney(GPminpeak) + " GP/min")
	}
}

function IPonCrunchPassiveGain(diff){
	if (hasTimeStudy(181) || hasAch("ng3p88")) {
		player.infinityPoints = player.infinityPoints.plus(gainedInfinityPoints().times(diff / 100))
	}
}

function EPonEternityPassiveGain(diff){
	if (hasEternityUpg(15) || hasAch("ng3p93")) {
		player.eternityPoints = player.eternityPoints.plus(gainedEternityPoints().times(diff / 100))
		getEl("eternityPoints2").innerHTML = "You have <span class=\"EPAmount2\">"+shortenDimensions(player.eternityPoints)+"</span> Eternity points."
	}
}

function ngp3DilationUpdating(){
	let gain = getDilGain()
	if (inNGM(2)) player.dilation.bestIP = player.infinityPoints.max(player.dilation.bestIP)
	if (player.dilation.tachyonParticles.lt(gain) && masteryStudies.has(292)) setTachyonParticles(gain)
}

function setTachyonParticles(x) {
	player.dilation.tachyonParticles = new Decimal(x)
	if (!player.dilation.active) player.dilation.totalTachyonParticles = player.dilation.tachyonParticles
	tmp.qu.notrelative = false
	if (hasAch("ng3p18") || hasAch("ng3p37")) {
		player.dilation.bestTP = Decimal.max(player.dilation.bestTP || 0, player.dilation.tachyonParticles)
		player.dilation.bestTPOverGhostifies = player.dilation.bestTPOverGhostifies.max(player.dilation.bestTP)
		getEl('bestTP').textContent = "Your best" + (ph.did("ghostify") ? "" : " ever")+" Tachyon particles" + (ph.did("ghostify") ? " in this Ghostify" : "") + " was " + shorten(player.dilation.bestTP) + "."
		setAndMaybeShow('bestTPOverGhostifies', ph.did("ghostify"), '"Your best-ever Tachyon particles was "+shorten(player.dilation.bestTPOverGhostifies)+"."')
	}
}

function passiveQuantumLevelStuff(diff){
	let inBR = inBigRip()

	if (inBR ? hasAch("ng3p103") : hasAch("ng3p112")) player.ghostify.ghostParticles = player.ghostify.ghostParticles.add(getGHPGain().times(diff / 100))
	if (hasAch("ng3p112")) player.ghostify.times = nA(player.ghostify.times, nM(getGhostifiedGain(), diff))

	if (inBR || hasBosonicUpg(24)) tmp.qu.bigRip.spaceShards = tmp.qu.bigRip.spaceShards.add(getSpaceShardsGain().times(diff / 100))
	if (hasBosonicUpg(51) || (tmp.be && player.ghostify.milestones > 14)) tmp.qu.breakEternity.eternalMatter = tmp.qu.breakEternity.eternalMatter.add(getEMGain().times(diff / 100))
	if (!inBR) {
		tmp.qu.quarks = tmp.qu.quarks.add(quarkGain().sqrt().times(diff))
		var p = ["rg", "gb", "br"]
		for (var i = 0; i < 3; i++) {
			var r = tmp.qu.usedQuarks[p[i][0]].min(tmp.qu.usedQuarks[p[i][1]])
			if (hasAch("ng3p71")) r = r.div(100)
			else r = r.sqrt()
			tmp.qu.gluons[p[i]] = tmp.qu.gluons[p[i]].add(r.times(diff))
		}
		if (player.ghostify.milestones >= 16) tmp.qu.quarks = tmp.qu.quarks.add(quarkGain().times(diff / 100))
	}
	updateQuarkDisplay()
	updateQuantumWorth("quick")
}

function TTpassiveGain(diff){
	if (player.dilation.upgrades.includes(10)) {
		var speed = getPassiveTTGen()
		var div = player.timestudy.theorem / speed
		player.timestudy.theorem += diff * speed  
		if (div < 3600 && hasAch("ng3p44")) player.timestudy.theorem += Math.min(diff * 9, 3600 - div) * speed
		if (player.timestudy.theorem > 1e200) player.timestudy.theorem = 1e200
	}
}

function thisQuantumTimeUpdating(){
	setAndMaybeShow("quantumClock", tmp.ngp3 ? (ph.did("quantum") && tmp.qu.times > 1 && speedrunMilestonesReached < 28) : false, '"Quantum time: <b class=\'QKAmount\'>"+timeDisplayShort(tmp.qu.time)+"</b>"')
}

function updateInfinityTimes(){
	if (player.thisInfinityTime < -10) player.thisInfinityTime = Infinity
	if (player.bestInfinityTime < -10) player.bestInfinityTime = Infinity
}

function infUpgPassiveIPGain(diff){
	if (diff > player.autoTime && !player.break) player.infinityPoints = player.infinityPoints.plus(player.autoIP.div(player.autoTime).times(diff))
}

function gameLoop(diff) {
	var thisUpdate = new Date().getTime();
	if (typeof diff === 'undefined') {
		if (player.options.secrets && player.options.secrets.ghostlyNews) nextGhostlyNewsTickerMsg()
		diff = Math.min(thisUpdate - player.lastUpdate, 21600000);
	}
	if (diff >= 21600000) giveAchievement("Don't you dare sleep")
	player.lastUpdate = thisUpdate

	diff = Math.max(diff / 1e3, 0)
	if (tmp.gameSpeed != 1) diff = diff * tmp.gameSpeed
	var diffStat = diff * 10
	if (player.version === 12.2 && typeof player.shameLevel === 'number') diff *= Math.min(Math.pow(10, player.shameLevel), 1)
	if (tmp.inEC12) diff /= tmp.ec12Mult

	updateInfinityTimes()
	updateTemp()
	infUpgPassiveIPGain(diff)

	if (!isGamePaused()) {
		incrementParadoxUpdating(diff)
		checkMatter(diff)
		passiveIPupdating(diff)
		passiveInfinitiesUpdating(diff)
		requiredInfinityUpdating(diff)
		normalChallPowerUpdating(diff)
		passiveIPperMUpdating(diff)
		incrementTimesUpdating(diffStat)

		if (player.meta) metaDimsUpdating(diff)
		infinityTimeMetaBlackHoleDimUpdating(diff) //production of those dims
		otherDimsUpdating(diff)
		giveBlackHolePowerUpdating(diff)
		freeTickspeedUpdating()

		passiveGPGen(diff)
		IPonCrunchPassiveGain(diff)
		EPonEternityPassiveGain(diff)
		TTpassiveGain(diff)
		if (hasDilationStudy(1)) {
			let gain = getDilTimeGainPerSecond()
			player.dilation.dilatedTime = player.dilation.dilatedTime.plus(gain.times(diff))
			gainDilationGalaxies()
		}

		if (tmp.ngp3) {
			if (hasDilationStudy(1)) {
				if (isBigRipUpgradeActive(20) || hasEternityUpg(15)) {
					let gain = getDilGain()
					if (player.dilation.tachyonParticles.lt(gain)) setTachyonParticles(gain)
				} else if (player.dilation.active) ngp3DilationUpdating()
			}
			if (player.ghostify.milestones >= 8 && tmp.quActive) passiveQuantumLevelStuff(diff)
			if (hasEternityUpg(15)) updateEternityUpgrades() // to fix the 5ep upg display
			if (ph.did("ghostify")) {
				if (GDs.unlocked()) {
					// Gravity Dimensions
					GDs.gdTick(diff)
					GDs.gainRDTicks()
					if (getEl("gdims").style.display != "none") GDs.updateDisplay()
				}
				if (player.ghostify.wzb.unl) WZBosonsUpdating(diff) // Bosonic Lab
				if (player.ghostify.ghostlyPhotons.unl) ghostlyPhotonsUpdating(diff) // Ghostly Photons
				ghostifyAutomationUpdating(diff)
			}
			if (ph.did("quantum")) quantumOverallUpdating(diff)
			preQuantumAutoNGP3(diff * 10)
		}

		replicantiIncrease(diff * 10)
	}

	if (simulate) return

	tmp.mod.render.tick++
	if (tmp.mod.render.tick >= tmp.mod.render.rate) tmp.mod.render.tick = 0
	else return

	dimensionButtonDisplayUpdating()
	dimensionPageTabsUpdating()
	bigCrunchButtonUpdating()
	IRsetsUnlockUpdating()
	nextICUnlockUpdating()

	if (player.break) getEl("iplimit").style.display = "inline"
	else getEl("iplimit").style.display = "none"
	getEl("IPPeakDiv").style.display = (player.break && player.boughtDims) ? "" : "none"
	if (inNGM(2) && ph.shown("galaxy")) getEl("GPAmount").textContent = shortenDimensions(player.galacticSacrifice.galaxyPoints)
	if (inNGM(5) && ph.shown("paradox")) getEl("pxAmount").textContent = shortenDimensions(player.pSac.px)

	if (tmp.tickUpdate) {
		updateTickspeed()
		tmp.tickUpdate = false
	}
	IPMultBuyUpdating()
	doEternityButtonDisplayUpdating(diff)
	doQuantumButtonDisplayUpdating(diff)	
	doGhostifyButtonDisplayUpdating(diff)

	updateMoney();
	updateCoinPerSec();

	updateDimensionsDisplay()
	updateInfCosts()

	updateDilationDisplay()

	checkMarathon()
	checkMarathon2()
	checkPain()
	checkSupersanic()
	tickspeedButtonDisplay()
	updateCosts()

	normalSacDisplay()
	sacLayersDisplay()
	d8SacDisplay()

	getEl("challengesbtn").style.display = ph.did(inNGM(4) ? "galaxy" : "infinity") && !isEmptiness ? "inline-block" : "none"

	isEmptinessDisplayChanges()
	DimBoostBulkDisplay()
	getEl("epmult").className = player.eternityPoints.gte(player.epmultCost) ? "eternityupbtn" : "eternityupbtnlocked"

	progressBarUpdating()
	challengeOverallDisplayUpdating()
	chall23PowerUpdating()
	
	pSacBtnUpdating()
	dimboostBtnUpdating()
	galaxyBtnUpdating()  
	newIDDisplayUpdating()
	galSacBtnUpdating()
	updateConvertSave(eligibleConvert())

	if (isNaN(player.totalmoney.e)) player.totalmoney = new Decimal(10)

	thisQuantumTimeUpdating()
	var s = shortenDimensions(player.infinityPoints)
	getEl("infinityPoints1").innerHTML = "You have <span class=\"IPAmount1\">"+s+"</span> Infinity points."
	getEl("infinityPoints2").innerHTML = "You have <span class=\"IPAmount2\">"+s+"</span> Infinity points."

	if (getEl("loadmenu").style.display == "block") changeSaveDesc(metaSave.current, savePlacement)
}

function isGamePaused() {
	return player && tmp.mod && tmp.mod.pause
}

let simulate = false
function simulateTime(seconds, real, id) {
	simulate = true

	//the game is simulated at a 50ms update rate, with a max of 1000 ticks
	//warning: do not call this function with real unless you know what you're doing
	var ticks = seconds * 20;
	var bonusDiff = 0;
	var playerStart = Object.assign({}, player);
	var storage = {}
	if (player.blackhole !== undefined) storage.bp = player.blackhole.power
	if (player.meta !== undefined) storage.ma = player.meta.antimatter
	if (tmp.ngp3) {
		storage.dt = player.dilation.dilatedTime
		storage.ec = tmp.qu.electrons.amount
		storage.nr = tmp.qu.replicants.amount
		storage.bAm = player.ghostify.bl.am
	}
	if (ticks > 1000 && !real) {
		bonusDiff = (ticks - 1000) / 20;
		ticks = 1000;
	}
	let ticksDone = 0
	for (ticksDone=0; ticksDone<ticks; ticksDone++) {
		gameLoop(50+bonusDiff)
		autoBuyerTick();
	}
	simulate = false

	closeToolTip()
	var popupString = "While you were away"
	if (player.money.gt(playerStart.money)) popupString+= ",<br> your antimatter increased "+shortenMoney(player.money.log10() - (playerStart.money).log10())+" orders of magnitude"
	if (player.infinityPower.gt(playerStart.infinityPower) && !ph.did("quantum")) popupString+= ",<br> infinity power increased "+shortenMoney(player.infinityPower.log10() - (Decimal.max(playerStart.infinityPower, 1)).log10())+" orders of magnitude"
	if (player.timeShards.gt(playerStart.timeShards) && !ph.did("quantum")) popupString+= ",<br> time shards increased "+shortenMoney(player.timeShards.log10() - (Decimal.max(playerStart.timeShards, 1)).log10())+" orders of magnitude"
	if (storage.dt && player.dilation.dilatedTime.gt(storage.dt)) popupString+= ",<br> dilated time increased "+shortenMoney(player.dilation.dilatedTime.log10() - (Decimal.max(storage.dt, 1)).log10())+" orders of magnitude"
	if (storage.bp && player.blackhole.power.gt(storage.bp)) popupString+= ",<br> black hole power increased "+shortenMoney(player.blackhole.power.log10() - (Decimal.max(storage.bp, 1)).log10())+" orders of magnitude"
	if (storage.ma && player.meta.antimatter.gt(storage.ma) && !ph.did("ghostify")) popupString+= ",<br> meta-antimatter increased "+shortenMoney(player.meta.antimatter.log10() - (Decimal.max(storage.ma, 1)).log10())+" orders of magnitude"
	if (storage.dt) {
		if (tmp.qu.electrons.amount > storage.ec && !ph.did("ghostify")) popupString+= ",<br> electrons increased by "+getFullExpansion(Math.round(tmp.qu.electrons.amount-storage.ec))
		if (tmp.qu.replicants.amount.gt(storage.nr) && !ph.did("ghostify")) popupString+= ",<br> normal replicants increased "+shortenMoney(tmp.qu.replicants.amount.log10() - (Decimal.max(storage.nr, 1)).log10())+" orders of magnitude"
		if (Decimal.gt(player.ghostify.bl.am, storage.bAm) && ph.did("ghostify")) popupString+= ",<br> Bosonic Antimatter increased "+shortenMoney(player.ghostify.bl.am.log10() - (Decimal.max(storage.bAm, 1)).log10())+" orders of magnitude"
	}
	if (player.infinitied > playerStart.infinitied || player.eternities > playerStart.eternities) popupString+= ","
	else popupString+= "."
	if (player.infinitied > playerStart.infinitied) popupString+= "<br>you infinitied "+getFullExpansion(player.infinitied-playerStart.infinitied)+" times."
	if (player.eternities > playerStart.eternities) popupString+= " <br>you eternitied "+getFullExpansion(player.eternities-playerStart.eternities)+" times."
	if (popupString.length == 20) {
		popupString = popupString.slice(0, -1);
		popupString+= "... Nothing happened."
		if (id == "lair") popupString+= "<br><br>I told you so."
		giveAchievement("While you were away... Nothing happened.")
	}
	getEl("offlineprogress").style.display = "block"
	getEl("offlinePopup").innerHTML = popupString
}

var tickWait = 0
var tickWaitStart = 0
function startInterval() {
	gameLoopIntervalId = setInterval(function() {
	if (tmp.mod.performanceTicks && new Date().getTime() - tickWaitStart < tickWait) return
	tickWait = 1/0

	var tickStart = new Date().getTime()
	try {
		gameLoop()
	} catch (e) {
		console.error(e)
	}
	var tickEnd = new Date().getTime()
	var tickDiff = tickEnd - tickStart

	tickWait = tickDiff * (tmp.mod.performanceTicks * 2)
	tickWaitStart = tickEnd
	}, player.options.updateRate);
}

function enableChart() {
	if (getEl("chartOnOff").checked) {
		player.options.chart.on = true;
		if (player.options.chart.warning < 1) alert("Warning: Using the chart can cause performance issues. Please disable it if you're experiencing lag.")
	} else {
		player.options.chart.on = false;
	}
}

function enableChartDips() {
	if (getEl("chartDipsOnOff").checked) {
		player.options.chart.dips = true;
	} else {
		player.options.chart.dips = false;
	}
}

function updateChart(first) {
	if (player.options.chart.on === true && first !== true) addData(normalDimChart, "0", getDimensionProductionPerSecond(1))
	setTimeout(updateChart, player.options.chart.updateRate || 1000)
}

var slider = getEl("updaterateslider");
var sliderText = getEl("updaterate");

slider.oninput = function() {
	player.options.updateRate = parseInt(this.value);
	sliderText.textContent = "Update rate: " + this.value + "ms"
	if (player.options.updateRate === 200) giveAchievement("You should download some more RAM")
	clearInterval(gameLoopIntervalId)
	startInterval()
}

getEl("renderrateslider").oninput = function() {
	tmp.mod.render.rate = parseInt(this.value);
	getEl("renderrate").textContent = "Render rate: " + this.value + " tick"
}

function dimBoolean() {
	var req = getShiftRequirement(0)
	var amount = getAmount(req.tier)
	if (inQC(6)) return false
	if (!player.autobuyers[9].isOn) return false
	if (player.autobuyers[9].ticks*100 < player.autobuyers[9].interval) return false
	if (amount < req.amount) return false
	if (inNGM(4) && inNC(14)) return false
	if (getEternitied() < 10 && !player.autobuyers[9].bulkBought && amount < getShiftRequirement(player.autobuyers[9].bulk-1).amount) return false
	if (player.overXGalaxies <= player.galaxies) return true
	if (player.autobuyers[9].priority < req.amount && req.tier == ((inNC(4) || player.currentChallenge == "postc1") ? 6 : 8)) return false
	return true
}

function autoQuantumABTick() {
	let data = tmp.qu.autobuyer

	if (data.autoDisable && tmp.qu.times >= data.autoDisable) return
	if (data.mode == "amount") {
		if (quarkGain().gte(Decimal.round(data.limit))) quantum(true, false, 0)
	} else if (data.mode == "relative") {
		if (quarkGain().gte(Decimal.round(data.limit).times(tmp.qu.last10[0][1]))) quantum(true, false, 0)
	} else if (data.mode == "time") {
		if (tmp.qu.time / 10 >= new Decimal(data.limit).toNumber()) quantum(true, false, 0)
	} else if (data.mode == "peak") {
		if (data.peakTime >= new Decimal(data.limit).toNumber()) quantum(true, false, 0)
	} else if (data.mode == "dilation") {
		if (player.dilation.times >= Math.round(new Decimal(data.limit).toNumber())) quantum(true, false, 0)
	}
}

function autoEternityABTick(){
	if (player.autoEterMode === undefined || player.autoEterMode == "amount") {
		if (gainedEternityPoints().gte(player.eternityBuyer.limit)) eternity(false, true)
	} else if (player.autoEterMode == "time") {
		if (player.thisEternity / 10 >= new Decimal(player.eternityBuyer.limit).toNumber()) eternity(false, true)
	} else if (player.autoEterMode == "relative") {
		if (gainedEternityPoints().gte(player.lastTenEternities[0][1].times(player.eternityBuyer.limit))) eternity(false, true)
	} else if (player.autoEterMode == "relativebest") {
		if (gainedEternityPoints().gte(bestEp.times(player.eternityBuyer.limit))) eternity(false, true)
	} else if (player.autoEterMode == "eternitied") {
		var eternitied = getEternitied()
		if (nG(nA(eternitied, gainEternitiedStat()), nM(eternitied, nN(new Decimal(player.eternityBuyer.limit))))) eternity(false, true)
	} else if (player.autoEterMode == "exponent") {
		var eternitied = getEternitied()
		if (Decimal.gte(
			nA(eternitied, gainEternitiedStat()),
			Decimal.pow(eternitied, player.eternityBuyer.limit)
		)) eternity(false, true)
	}
}

function galSacABTick(){
	if (player.autobuyers[12].ticks*100 >= player.autobuyers[12].interval && getGSAmount().gte(player.autobuyers[12].priority) && player.autobuyers[12].isOn) {
		galacticSacrifice(true);
		player.autobuyers[12].ticks=0
	}
	player.autobuyers[12].ticks++
}

function galaxyABTick(){
	if (
		player.autobuyers[10].isOn &&
		player.autobuyers[10].ticks * 100 >= player.autobuyers[10].interval &&
		getAmount(inNC(4) || player.pSac != undefined ? 6 : 8) >= getGalaxyRequirement() &&
		(!inNC(14) || tmp.ngmX <= 3)
	) {
		if (getEternitied() >= 9) {
			if (
				player.autobuyers[10].bulk == 0 ||
				Math.round(timer * 100) % Math.round(player.autobuyers[10].bulk * 100) == 0
			) maxBuyGalaxies()
		} else {
			if (player.autobuyers[10].priority > player.galaxies) {
				autoS = false;
				getEl("secondSoftReset").click()
				player.autobuyers[10].ticks = 0
			}
		}
	}
	player.autobuyers[10].ticks += 1
}

function TSBoostABTick(){
	if (autoTickspeedBoostBoolean()) {
		tickspeedBoost(player.autobuyers[13].bulk)
		player.autobuyers[13].ticks = 0
	}
	player.autobuyers[13].ticks += 1;
}

function TDBoostABTick(){
	if (autoTDBoostBoolean()) {
		buyMaxTDB()
		player.autobuyers[14].ticks = 0
	}
	player.autobuyers[14].ticks += 1;
}

function dimBoostABTick(){
	if (player.autobuyers[9].isOn && dimBoolean()) {
		if (player.resets < 4) softReset(1)
		else if (getEternitied() < 10 && !player.autobuyers[9].bulkBought) softReset(player.autobuyers[9].bulk)
		else if ((Math.round(timer * 100))%(Math.round(player.autobuyers[9].bulk * 100)) == 0 && getAmount(8) >= getShiftRequirement(0).amount) maxBuyDimBoosts()
		player.autobuyers[9].ticks = 0
	}
	player.autobuyers[9].ticks += 1;
}

var timer = 0
function autoBuyerTick() {
	if (tmp.quUnl && speedrunMilestonesReached >= 23 && tmp.qu.autobuyer.enabled && !inBigRip()) autoQuantumABTick()
	
	if (getEternitied() >= 100 && isEterBuyerOn()) autoEternityABTick()

	if (player.autobuyers[11]%1 !== 0) {
		if (player.autobuyers[11].ticks*100 >= player.autobuyers[11].interval && player.money !== undefined && player.money.gte(player.currentChallenge == "" ? getLimit() : player.challengeTarget)) {
			if (player.autobuyers[11].isOn) {
				if ((!player.autobuyers[11].requireIPPeak || IPminpeak.gt(gainedInfinityPoints().div(player.thisInfinityTime/600))) && player.autobuyers[11].priority) {
					if (player.autoCrunchMode == "amount") {
						if (!player.break || player.currentChallenge != "" || gainedInfinityPoints().gte(player.autobuyers[11].priority)) {
							autoS = false;
							bigCrunch(true)
						}
					} else if (player.autoCrunchMode == "time"){
						if (!player.break || player.currentChallenge != "" || player.thisInfinityTime / 10 >= new Decimal(player.autobuyers[11].priority).toNumber()) {
							autoS = false;
							bigCrunch(true)
						}
					} else if (player.autoCrunchMode == "replicanti"){
						if (!player.break || player.currentChallenge != "" || (player.replicanti.galaxies >= (player.autobuyers[11].priority.toString().toLowerCase()=="max"?player.replicanti.gal:Math.round(new Decimal(player.autobuyers[11].priority).toNumber())) && (!player.autobuyers[11].requireMaxReplicanti || player.replicanti.amount.gte(getReplicantiLimit())))) {
							autoS = false;
							bigCrunch(true)
						}
					} else {
						if (!player.break || player.currentChallenge != "" || gainedInfinityPoints().gte(player.lastTenRuns[0][1].times(player.autobuyers[11].priority))) {
							autoS = false;
							bigCrunch(true)
						}
					}
				}
				player.autobuyers[11].ticks = 1;
			}
		} else player.autobuyers[11].ticks += 1;
	}
	
	if (player.autobuyers[9]%1 !== 0) dimBoostABTick()
	if (player.autobuyers[10]%1 !== 0) galaxyABTick()
	if (inNGM(2)) if (player.autobuyers[12]%1 !== 0) galSacABTick()
	if (inNGM(3)) if (player.autobuyers[13]%1 !== 0) TSBoostABTick()
	if (inNGM(4)) if (player.autobuyers[14]%1 !== 0) TDBoostABTick()

	if (player.autoSacrifice%1 !== 0) {
		if ((inNGM(2) ? player.autoSacrifice.ticks * 100 >= player.autoSacrifice.interval : true) && calcSacrificeBoost().gte(player.autoSacrifice.priority) && player.autoSacrifice.isOn) {
			sacrifice(true)
			if (inNGM(2)) player.autoSacrifice.ticks=0
		}
		if (inNGM(2)) player.autoSacrifice.ticks++
	}

	for (var i=0; i<priority.length; i++) {
		if (priority[i].ticks * 100 >= priority[i].interval || priority[i].interval == 100) {
			if (priority[i].isOn) {
				if (priority[i] == player.autobuyers[8]) {
					if (!inNC(14) | inNGM(3)) {
						if (priority[i].target == 10) buyMaxTickSpeed()
						else buyTickSpeed()
					}
				} else if (canBuyDimension(priority[i].tier)) {
					if (priority[i].target > 10) {
						if (player.options.bulkOn) buyBulkDimension(priority[i].target - 10, priority[i].bulk, true)
						else buyBulkDimension(priority[i].target - 10, 1, true)
						if (tmp.ngC) ngC.condense.nds.max(priority[i].target - 10)
					} else {
						buyOneDimension(priority[i].target)
						if (tmp.ngC) ngC.condense.nds.max(priority[i].target)
					}
				}
				if (inNGM(4)) buyMaxTimeDimension(priority[i].tier, priority[i].bulk)
				priority[i].ticks = 0;
			}
		} else priority[i].ticks += 1;
	}
}


setInterval(function() {
	if (isGamePaused()) return
	timer += 0.05
	if (player) if (!player.infinityUpgrades.includes("autoBuyerUpgrade")) autoBuyerTick()
}, 100)

setInterval(function() {
	if (isGamePaused()) return
	if (player) if (player.infinityUpgrades.includes("autoBuyerUpgrade")) autoBuyerTick()
}, 50)

for (let ncid = 2; ncid <= 12; ncid++){
	getEl("challenge" + ncid).onclick = function () {
		startNormalChallenge(ncid)
	}
}

function isEterBuyerOn() {
	if (!player.eternityBuyer.isOn) return
	if (!player.eternityBuyer.ifAD || player.dilation.active) return true
	if (!player.eternityBuyer.dilationMode) return false
	return (player.eternityBuyer.dilMode != "upgrades" && !player.eternityBuyer.slowStopped) || (player.eternityBuyer.dilMode == "upgrades" && player.eternityBuyer.tpUpgraded)
}

function showGalTab(tabName) {
	//iterate over all elements in div_tab class. Hide everything that's not tabName and show tabName
	var tabs = document.getElementsByClassName('galaxytab');
	var tab;
	for (var i = 0; i < tabs.length; i++) {
		tab = tabs.item(i);
		if (tab.id === tabName) {
			tab.style.display = 'block';
		} else {
			tab.style.display = 'none';
		}
	}
	tmp.mod.tabsSave.tabGalaxy = tabName
}


function showInfTab(tabName) {
	//iterate over all elements in div_tab class. Hide everything that's not tabName and show tabName
	var tabs = document.getElementsByClassName('inftab');
	var tab;
	for (var i = 0; i < tabs.length; i++) {
		tab = tabs.item(i);
		if (tab.id === tabName) {
			tab.style.display = 'block';
		} else {
			tab.style.display = 'none';
		}
	}
	tmp.mod.tabsSave.tabInfinity = tabName
}

function showStatsTab(tabName) {
	//iterate over all elements in div_tab class. Hide everything that's not tabName and show tabName
	var tabs = document.getElementsByClassName('statstab');
	var tab;
	for (var i = 0; i < tabs.length; i++) {
		tab = tabs.item(i);
		if (tab.id === tabName) {
			tab.style.display = 'block';
		} else {
			tab.style.display = 'none';
		}
	}
	tmp.mod.tabsSave.tabStats = tabName
}

function showDimTab(tabName) {
	//iterate over all elements in div_tab class. Hide everything that's not tabName and show tabName
	var tabs = document.getElementsByClassName('dimtab');
	var tab;
	for (var i = 0; i < tabs.length; i++) {
		tab = tabs.item(i);
		if (tab.id === tabName) {
			tab.style.display = 'block';
		} else {
			tab.style.display = 'none';
		}
	}
	tmp.mod.tabsSave.tabDims = tabName
	if (getEl("dimensions").style.display !== "none" && tmp.mod.progressBar && (tabName === 'antimatterdimensions' || tabName === 'metadimensions')) getEl("progress").style.display = "block"
	else getEl("progress").style.display = "none"
}

function showChallengesTab(tabName) {
	//iterate over all elements in div_tab class. Hide everything that's not tabName and show tabName
	var tabs = document.getElementsByClassName('challengeTab');
	var tab;
	for (var i = 0; i < tabs.length; i++) {
		tab = tabs.item(i);
		if (tab.id === tabName) {
			tab.style.display = 'block';
		} else {
			tab.style.display = 'none';
		}
	}
	tmp.mod.tabsSave.tabChalls = tabName
}

function showEternityTab(tabName, init) {
	if (tabName == "timestudies" && player.boughtDims) tabName = "ers_" + tabName
	//iterate over all elements in div_tab class. Hide everything that's not tabName and show tabName
	var tabs = document.getElementsByClassName('eternitytab');
	var tab;
	var oldTab
	for (var i = 0; i < tabs.length; i++) {
		tab = tabs.item(i);
		if (tab.style.display == 'block') oldTab = tab.id
		if (tab.id === tabName) {
			tab.style.display = 'block';
		} else {
			tab.style.display = 'none';
		}
	}
	if ((tabName === 'timestudies' || tabName === 'ers_timestudies' || tabName === 'masterystudies') && !init) getEl("TTbuttons").style.display = "block"
	else getEl("TTbuttons").style.display = "none"
	if (tabName != oldTab) {
		tmp.mod.tabsSave.tabEternity = tabName
		if (tabName === 'timestudies' || tabName === 'masterystudies' || tabName === 'dilation' || tabName === 'blackhole') resizeCanvas()
		if (tabName === "dilation") requestAnimationFrame(drawAnimations)
		if (tabName === "blackhole") requestAnimationFrame(drawBlackhole)
	}
	if (!init) closeToolTip()
}

function showAchTab(tabName) {
	//iterate over all elements in div_tab class. Hide everything that's not tabName and show tabName
	var tabs = document.getElementsByClassName('achtab');
	var tab;
	for (var i = 0; i < tabs.length; i++) {
		tab = tabs.item(i);
		if (tab.id === tabName) {
			tab.style.display = 'block';
		} else {
			tab.style.display = 'none';
		}
	}
	tmp.mod.tabsSave.tabAchs = tabName
}

function showOptionTab(tabName) {
	//iterate over all elements in div_tab class. Hide everything that's not tabName and show tabName
	var tabs = document.getElementsByClassName('optionstab');
	var tab;
	for (var i = 0; i < tabs.length; i++) {
		tab = tabs.item(i);
		if (tab.id === tabName) {
			tab.style.display = 'block';
		} else {
			tab.style.display = 'none';
		}
	}
	tmp.mod.tabsSave.tabOptions = tabName
	closeToolTip()
}

function closeToolTip(showStuck) {
	var elements = document.getElementsByClassName("popup")
	for (var i=0; i<elements.length; i++) if (elements[i].id!='welcome') elements[i].style.display = "none"
	if (showStuck && !game_loaded) showStuckPopup()
}

var game_loaded
function initGame() {
	//Setup stuff.
	initiateMetaSave()
	migrateOldSaves()
	updateNewPlayer()
	setupHTMLAndData()
	localStorage.setItem(metaSaveId, btoa(JSON.stringify(metaSave)))

	//Load a save.
	load_game(false, true)
	game_loaded=true

	//show one tab during init or they'll all start hidden
	let tabsSaveData = tmp.mod.tabsSave
	let tabsSave = tabsSaveData&&tabsSaveData.on
	showTab((tabsSave && tabsSaveData.tabMain) || "dimensions",true)
	showOptionTab((tabsSave && tabsSaveData.tabOptions) || "saving")
	if (tmp.mod.progressBar && getEl("dimensions").style.display != "none") getEl("progress").style.display = "block"
	else getEl("progress").style.display = "none"
	tmp.tickUpdate = true
	updateAutobuyers()
	updateChallengeTimes()
	window.addEventListener("resize", resizeCanvas);

	//On load
	updateChart(true)
	setTimeout(function(){
		getEl("container").style.display = "block"
		getEl("loading").style.display = "none"
	},1000)
	clearInterval(stuckTimeout)
	//Check for Expert Mode
	checkForExpertMode()

	//Check for Test Server
	checkCorrectBeta()
}

window.addEventListener('keydown', function(event) {
	if (keySequence == 0 && event.keyCode == 38) keySequence++
	else if (keySequence == 1 && event.keyCode == 38) keySequence++
	else if (keySequence == 2 && event.keyCode == 40) keySequence++
	else if (keySequence == 3 && event.keyCode == 40) keySequence++
	else if (keySequence == 4 && event.keyCode == 37) keySequence++
	else if (keySequence == 5 && event.keyCode == 39) keySequence++
	else if (keySequence == 6 && event.keyCode == 37) keySequence++
	else if (keySequence == 7 && event.keyCode == 39) keySequence++
	else if (keySequence == 8 && event.keyCode == 66) keySequence++
	else if (keySequence == 9 && event.keyCode == 65) giveAchievement("30 Lives")
	else keySequence = 0;
	if (keySequence2 == 0 && event.keyCode == 49) keySequence2++
	else if (keySequence2 == 1 && event.keyCode == 55) keySequence2++
	else if (keySequence2 == 2 && event.keyCode == 55) keySequence2++
	else if (keySequence2 == 3 && event.keyCode == 54) giveAchievement("Revolution, when?")
	else keySequence2 = 0
	
	if (event.keyCode == 17) controlDown = true;
	if (event.keyCode == 16) {
		shiftDown = true;
		updateSoftcapStatsTab()
		drawStudyTree()
		drawMasteryTree()
	}
	if ((controlDown && shiftDown && (event.keyCode == 67 || event.keyCode == 73 || event.keyCode == 74)) || event.keyCode == 123) {
		giveAchievement("Stop right there criminal scum!")
	}
}, false);

window.addEventListener('keyup', function(event) {
	if (event.keyCode == 17) controlDown = false;
	if (event.keyCode == 16) {
		shiftDown = false;
		updateSoftcapStatsTab()
		drawStudyTree()
		drawMasteryTree()
	}
}, false);

window.onfocus = function() {
	controlDown = false;
	shiftDown = false;
	drawStudyTree()
	drawMasteryTree()
}

window.addEventListener('keydown', function(event) {
	if (!player.options.hotkeys || controlDown === true || document.activeElement.type === "text" || document.activeElement.type === "number" || onImport) return false
	const key = event.keyCode;
	if (key >= 49 && key <= 56) {
		if (shiftDown) buyOneDimension(key-48)
		else buyManyDimension(key-48)
		return false;
	} else if (key >= 97 && key <= 104) {
		if (shiftDown) buyOneDimension(key-96)
		else buyManyDimension(key-96)
		return false;
	}
	switch (key) {
		case 65: // A
			toggleAutoBuyers();
		break;

		case 66: // B
			if (hasAch("ng3p51")) bigRip()
			else if (inNGM(3)) manualTickspeedBoost()
		break;

		case 67: // C
			bigCrunch()
		break;

		case 68: // D
			if (shiftDown && hasAch("ngpp11")) metaBoost()
			else if (hasAch("r136")) startDilatedEternity(false, true)
			else getEl("softReset").onclick()
		break;

		case 69: // E, also, nice.
			getEl("eternitybtn").onclick();
		break;

		case 71: // G
			if (hasAch("ng3p51")) ghostify()
			else getEl("secondSoftReset").onclick()
		break;

		case 72: // H
			setAchieveTooltip()
		break

		case 76: // N
			if (inNGM(4)) buyMaxTDB()
		break;

		case 77: // M
			if (ndAutobuyersUsed<9||!player.challenges.includes("postc8")) getEl("maxall").onclick()
			if (player.dilation.studies.includes(6)) {
				var maxmeta=true
				for (d = 1; d < 9; d++) {
					if (player.autoEterOptions["meta" + d]) {
						if (d > 7 && speedrunMilestonesReached < 28) maxmeta = false
					} else break
				}
				if (maxmeta) getEl("metaMaxAll").onclick()
			}
		break;


		case 81: // Q, for quantum.
			if (player.meta) {
				if (!inAnyQC()) quantum(false,false,0)
				else quantum()
			} 
		break;

		case 82: //R
			replicantiGalaxy()
		break;

		case 83: // S
			getEl("sacrifice").onclick()
		break;

		case 84: // T
			if (shiftDown) buyTickSpeed()
			else buyMaxTickSpeed()
		break;

		case 85: // U
			if (tmp.ngp3) unstableAll()
		break;
	}
}, false);

window.addEventListener('keyup', function(event) {
	if (event.keyCode === 70) {
		$.notify("Paying respects", "info")
		giveAchievement("It pays to have respect")
	}
		if (Math.random() <= 1e-6) giveAchievement("keyboard broke?")
	if (!player.options.hotkeys || controlDown === true || document.activeElement.type === "text") return false
	switch (event.keyCode) {
		case 67: // C
			bigCrunch()
		break;

		
		
	}
}, false);

function getUnspentBonus() {
	x = player.infinityPoints
	if (!x) return new Decimal(1)

	if (inNGM(2)) x = x.pow(Math.max(Math.min(Math.pow(x.max(1).log(10), 1 / 3) * 3, 8), 1)).plus(1)
	else x = x.dividedBy(2).pow(1.5).plus(1)
	if (tmp.ngC) x = x.pow(5)
	return x
}

var totalMult = 1
var currentMult = 1
var infinitiedMult = 1
var achievementMult = 1
var unspentBonus = 1
var mult18 = 1
var ec10bonus = new Decimal(1)
var QC4Reward

function getAchievementMult(){
	var ach = player.achievements.length
	var gups = inNGM(2) ? player.galacticSacrifice.upgrades.length : 0
	var minus = inNGM(2) ? 10 : 30
	var exp = inNGM(2) ? 5 : 3
	var div = 40
	if (inNGM(4)) {
		minus = 0
		exp = 10
		div = 20
		div -= Math.sqrt(gups)
		if (gups > 15) exp += gups
	}
	if (tmp.ngC) div /= 10
	return Decimal.pow(ach - minus - getSecretAchAmount(), exp).div(div).max(1)
}

function updatePowers() {
	totalMult = tmp.postinfi11
	currentMult = tmp.postinfi21
	infinitiedMult = getInfinitiedMult()
	achievementMult = getAchievementMult()
	unspentBonus = getUnspentBonus()
	if (player.boughtDims) mult18 = getDimensionFinalMultiplier(1).max(1).times(getDimensionFinalMultiplier(8).max(1)).pow(0.02)
	else mult18 = getDimensionFinalMultiplier(1).times(getDimensionFinalMultiplier(8)).pow(0.02)
	if (player.currentEternityChall == "eterc10" || inQC(6)) {
		ec10bonus = Decimal.pow(getInfinitied(), 1e3).max(1)
		if (hasTimeStudy(31)) ec10bonus = ec10bonus.pow(4)
	} else {
		ec10bonus = new Decimal(1)
	}
}

var updatePowerInt
function resetUP() {
	clearInterval(updatePowerInt)
	updatePowers()
	updateTemp()
	mult18 = 1
	updatePowerInt = setInterval(updatePowers, 100)
}

function switchDecimalMode() {
	if (confirm('You will change the number library preference to ' + (tmp.mod.breakInfinity ? 'logarithmica_numerus_lite':'break_infinity.min') + '.js. This requires the webpage to reload for this to take effect. Are you sure you want to do this?')) {
		tmp.mod.breakInfinity = !tmp.mod.breakInfinity
		if (tmp.mod.breakInfinity && !tmp.mod.performanceTicks && confirm("WARNING: The game may become laggy with this library! Do you want to turn on Performance Ticks? This will increase the performance of the game, but may cause detrimental effects for lower-end computers. The option for Performance Ticks can be changed at any time.")) tmp.mod.performanceTicks = true
		save_game(true)
		document.location.reload(true)
	}
}
