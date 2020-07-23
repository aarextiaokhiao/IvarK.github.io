function setupText() {
	var pu=document.getElementById("pUpgs")
	for (r=1;r<=puSizes.y;r++) {
		row=pu.insertRow(r-1)
		for (c=1;c<=puSizes.x;c++) {
			var col=row.insertCell(c-1)
			var id=(r*10+c)
			col.innerHTML="<button id='pu"+id+"' class='infinistorebtn1' onclick='buyPU("+id+","+(r<2)+")'>"+(typeof(puDescs[id])=="function"?"<span id='pud"+id+"'></span>":puDescs[id]||"???")+(puMults[id]?"<br>Currently: <span id='pue"+id+"'></span>":"")+"<br><span id='puc"+id+"'></span></button>"
		}
	}
	var iut=document.getElementById("preinfupgrades")
	for (r=1;r<5;r++) {
		row=iut.insertRow(r-1)
		for (c=1;c<5;c++) {
			var col=row.insertCell(c-1)
			col.innerHTML="<button id='infi"+(c*10+r)+"' class='infinistorebtn"+c+"'></button>"
		}
	}
	document.getElementById("infi14").innerHTML="Decrease the number of Dimensions needed for Dimensional Boosts and galaxies by 9<br>Cost: 1 IP"
	document.getElementById("infi24").innerHTML="Antimatter Galaxies are twice as effective<br>Cost: 2 IP"
	document.getElementById("infi11").onclick = function () {
		buyInfinityUpgrade("timeMult",1);
	}
	document.getElementById("infi21").onclick = function () {
		buyInfinityUpgrade("dimMult",1);
	}
	document.getElementById("infi12").onclick = function () {
		if (player.infinityUpgrades.includes("timeMult")) buyInfinityUpgrade("18Mult",1);
	}
	document.getElementById("infi22").onclick = function () {
		if (player.infinityUpgrades.includes("dimMult")) buyInfinityUpgrade("27Mult",1);
	}
	document.getElementById("infi13").onclick = function () {
		if (player.infinityUpgrades.includes("18Mult")) buyInfinityUpgrade("36Mult",1);
	}
	document.getElementById("infi23").onclick = function () {
		if (player.infinityUpgrades.includes("27Mult")) buyInfinityUpgrade("45Mult",1);
	}
	document.getElementById("infi14").onclick = function () {
		if (player.infinityUpgrades.includes("36Mult")) buyInfinityUpgrade("resetBoost",1);
	}
	document.getElementById("infi24").onclick = function () {
		if (player.infinityUpgrades.includes("45Mult")) buyInfinityUpgrade("galaxyBoost",2);
	}
	document.getElementById("infi31").onclick = function() {
		buyInfinityUpgrade("timeMult2",3);
	}
	document.getElementById("infi32").onclick = function() {
		if (player.infinityUpgrades.includes("timeMult2")) buyInfinityUpgrade("unspentBonus",5);
	}
	document.getElementById("infi33").onclick = function() {
		if (player.infinityUpgrades.includes("unspentBonus")) buyInfinityUpgrade("resetMult",7);
	}
	document.getElementById("infi34").onclick = function() {
		if (player.infinityUpgrades.includes("resetMult")) buyInfinityUpgrade("passiveGen",10);
	}
	document.getElementById("infi41").onclick = function() {
		buyInfinityUpgrade("skipReset1",20);
	}
	document.getElementById("infi42").onclick = function() {
		if (player.infinityUpgrades.includes("skipReset1")) buyInfinityUpgrade("skipReset2", 40)
	}
	document.getElementById("infi43").onclick = function() {
		if (player.infinityUpgrades.includes("skipReset2")) buyInfinityUpgrade("skipReset3", 80)
	}
	document.getElementById("infi44").onclick = function() {
		if (player.infinityUpgrades.includes("skipReset3")) buyInfinityUpgrade("skipResetGalaxy", 500)
	}
	var pcct = document.getElementById("pccompletionstable")
	var row = pcct.insertRow(0)
	for (c=0;c<9;c++) {
		var col = row.insertCell(c)
		if (c>0) col.textContent = "#" + c
	}
	for (r=1;r<9;r++) {
		row = pcct.insertRow(r)
		for (c=0;c<9;c++) {
			var col = row.insertCell(c)
			if (c<1) col.textContent = "#" + r
			else if (c==r) {
				col.id = "qcC" + r
			} else col.id = "pc" + r + c
		}
	}
	var ndsDiv = document.getElementById("parent")
	var pdsDiv = document.getElementById("pdTable")
	var edsDiv = document.getElementById("empDimTable")
	for (d=1;d<9;d++) {
		var row=ndsDiv.insertRow(d-1)
		row.id=d+"Row"
		row.style["font-size"]="15px"
		var html='<td class="rel" id="D'+d+'" align="right" width="32%"> </td>'
		html+='<td id="A'+d+'"></td>'
		html+='<td align="right" width="10%"><button id="B'+d+'" style="color:black; height: 25px; font-size: 10px; width: 135px" class="storebtn" onclick="buyOneDimension('+d+')"></button></td>'
		html+='<td align="right" width="10%"><button id="M'+d+'" style="color:black; width:210px; height: 25px; font-size: 10px" class="storebtn" onclick="buyManyDimension('+d+')"></button></td>'
		row.innerHTML=html
		
		var row=pdsDiv.insertRow(d-1)
		row.id="pR"+d
		row.style["font-size"]="16px"
		var html='<td id="pD'+d+'" width="41%">'+DISPLAY_NAMES[d]+' Paradox Dimension x1</td>'
		html+='<td id="pA'+d+'">0 (0)</td>'
		html+='<td align="right" width="10%"><button id="pB'+d+'" style="color:black; width:195px; height:30px" class="storebtn" align="right" onclick="buyPD('+d+')">Cost: ??? Px</button></td></tr>'
		row.innerHTML=html
		
		var row=edsDiv.insertRow(d-1)
		row.id="empRow"+d
		row.style["font-size"]="15px"
		var html='<td id="empD'+d+'" width="41%">'+DISPLAY_NAMES[d]+' Emperor Dimension x1</td>'
		html+='<td id="empAmount'+d+'"></td>'
		html+='<td><span class="empQuarks" id="empQuarks'+d+'">0</span> preons/s</td>'
		html+='<td align="right" width="2.5%"><button id="empFeedMax'+d+'" style="color:black; width:70px; font-size:10px" class="storebtn" align="right" onclick="feedReplicant('+d+', true)">Max</button></td>'
		html+='<td align="right" width="7.5%"><button id="empFeed'+d+'" style="color:black; width:195px; height:25px; font-size:10px" class="storebtn" align="right" onclick="feedReplicant('+d+')">Feed (0%)</button></td>'
		row.innerHTML=html
	}
	for (var c=0;c<3;c++) {
		var color=(["red","green","blue"])[c]
		var shorthand=(["r","g","b"])[c]
		var branchUpgrades=["Gain <span id='"+color+"UpgPow1'></span>x "+color+" quark spins, but "+color+" quarks decay <span id='"+color+"UpgSpeed1'></span>x faster.","The gain of "+color+" <span id='"+color+"UpgName2'></span> quarks is multiplied by x and then raised to the power of x.",(["Red","Green","Blue"])[c]+" <span id='"+color+"UpgName3'></span> quarks decay 4x slower."]

		var html='You have <span class="'+color+'" id="'+color+'QuarksToD" style="font-size: 35px">0</span> '+color+' quarks.<br>'
		html+='<button class="storebtn" id="'+color+'UnstableGain" style="width: 240px; height: 80px" onclick="unstableQuarks(\''+shorthand+'\')"></button><br>'
		html+='You have <span class="'+color+'" id="'+color+'QuarkSpin" style="font-size: 35px">0.0</span> '+color+' quark spin.'
		html+='<span class="'+color+'" id="'+color+'QuarkSpinProduction" style="font-size: 25px">+0/s</span><br>'
		html+="You have <span class='"+color+"' id='"+color+"UnstableQuarks' style='font-size: 35px'>0</span> "+color+" <span id='"+shorthand+"UQName'></span> quarks.<br>"
		html+="<span id='"+color+"QuarksDecayRate'></span>.<br>"
		html+="They will last <span id='"+color+"QuarksDecayTime'></span>."
		document.getElementById("todRow").insertCell(c).innerHTML=html
		document.getElementById("todRow").cells[c].className=shorthand+"qC"
		
		html="<table class='table' align='center' style='margin: auto'><tr>"
		for (var u=1;u<4;u++) html+="<td style='vertical-align: 0'><button class='gluonupgrade unavailablebtn' id='"+color+"upg"+u+"' onclick='buyBranchUpg(\""+shorthand+"\", "+u+")'"+(u<3?" style='font-size:10px'":"")+">"+branchUpgrades[u-1]+"<br>Currently: <span id='"+color+"upg"+u+"current'>1</span>x<br>Cost: <span id='"+color+"upg"+u+"cost'>?</span> "+color+" quark spin</button>"+(u==2?"<br><button class='storebtn' style='width: 190px' onclick='maxBranchUpg(\""+shorthand+"\")'>Max all upgrades</button><br><button class='storebtn' style='width: 190px; font-size:10px' onclick='maxBranchUpg(\""+shorthand+"\", true)'>Max 2nd and 3rd upgrades</button>":"")+"</td>"
		html+="</tr></tr><td></td><td><button class='gluonupgrade unavailablebtn' id='"+shorthand+"RadioactiveDecay' style='font-size:10px' onclick='radioactiveDecay(\""+shorthand+"\")'>Reset to make 1st upgrades stronger, but nerf this branch.<br><span id='"+shorthand+"RDReq'></span><br>Radioactive Decays: <span id='"+shorthand+"RDLvl'></span></button></td><td></td>"
		html+="</tr></table>"
		document.getElementById(color+"Branch").innerHTML=html
	}
	//Nanofield
	var nfRewards=document.getElementById("nfRewards")
	var row=0
	for (var r=1;r<=8;r+=2) {
		nfRewards.insertRow(row).innerHTML = 
			"<td id='nfRewardHeader"+r+"' class='milestoneText'></td>" +
			"<td id='nfRewardHeader"+(r+1)+"' class='milestoneText'></td>"
		row++
		nfRewards.insertRow(row).innerHTML = 
			"<td id='nfRewardTier"+r+"' class='milestoneTextSmall'></td>" +
			"<td id='nfRewardTier"+(r+1)+"' class='milestoneTextSmall'></td>"
		row++
		nfRewards.insertRow(row).innerHTML = 
			"<td><button class='nfRewardlocked' id='nfReward"+r+"'></button></td>" +
			"<td><button class='nfRewardlocked' id='nfReward"+(r+1)+"'></button></td>"
		row++
	}
	document.getElementById("nfReward7").style["font-size"]="10px"
	document.getElementById("nfReward8").style["font-size"]="10px"
	//Quantum Challenge modifiers
	var modDiv=""
	for (var m=0;m<qcm.modifiers.length;m++) {
		var id=qcm.modifiers[m]
		modDiv+=' <button id="qcm_'+id+'" onclick="toggleQCModifier(\''+id+'\')">'+(qcm.names[id]||"???")+'</button>'
	}
	document.getElementById("modifiers").innerHTML=modDiv
	var modDiv='<button class="storebtn" id="qcms_normal" onclick="showQCModifierStats(\'\')">Normal</button>'
	for (var m=0;m<qcm.modifiers.length;m++) {
		var id=qcm.modifiers[m]
		modDiv+=' <button class="storebtn" id="qcms_'+id+'" onclick="showQCModifierStats(\''+id+'\')">'+(qcm.names[id]||"???")+'</button>'
	}
	document.getElementById("modifiersStats").innerHTML=modDiv
	//Brave Milestones
	for (var m=1;m<17;m++) document.getElementById("braveMilestone"+m).textContent=getFullExpansion(tmp.bm[m-1])+"x quantumed"
	//Bosonic Extractor
	var ben=document.getElementById("enchants")
	for (var g2=2;g2<=br.limit;g2++) {
		var row=ben.insertRow(g2-2)
		row.id="bEnRow"+(g2-1)
		for (var g1=1;g1<g2;g1++) {
			var col=row.insertCell(g1-1)
			var id=(g1*10+g2)
			col.innerHTML="<button id='bEn"+id+"' class='gluonupgrade unavailablebtn' style='font-size: 9px' onclick='takeEnchantAction("+id+")'>"+(bEn.descs[id]||"???")+"<br>"+
			"Currently: <span id='bEnEffect"+id+"'>???</span><br>"+
			"<span id='bEnLvl"+id+"'></span><br>"+
			"<span id='bEnOn"+id+"'></span><br>"+
			"Cost: <span id='bEnG1Cost"+id+"'></span> <div class='bRune' type='"+g1+"'></div> & <span id='bEnG2Cost"+id+"'></span> <div class='bRune' type='"+g2+"'></div></button><br>"
		}
	}
	var toeDiv=""
	for (var g=1;g<=br.limit;g++) toeDiv+=' <button id="typeToExtract'+g+'" class="storebtn" onclick="changeTypeToExtract('+g+')" style="width: 25px; font-size: 12px"><div class="bRune" type="'+g+'"></div></button>'
	document.getElementById("typeToExtract").innerHTML=toeDiv
	//Bosonic Upgrades
	var buTable=document.getElementById("bUpgs")
	for (r=1;r<=bu.rows;r++) {
		var row=buTable.insertRow(r-1)
		row.id="bUpgRow"+r
		for (c=1;c<6;c++) {
			var col=row.insertCell(c-1)
			var id=(r*10+c)
			col.innerHTML="<button id='bUpg"+id+"' class='gluonupgrade unavailablebtn' style='font-size: 9px' onclick='buyBosonicUpgrade("+id+")'>"+(bu.descs[id]||"???")+"<br>"+
			(bu.effects[id]!==undefined?"Currently: <span id='bUpgEffect"+id+"'>0</span><br>":"")+
			"Cost: <span id='bUpgCost"+id+"'></span> Bosonic Antimatter<br>"+
			"Requires: <span id='bUpgG1Req"+id+"'></span> <div class='bRune' type='"+bu.reqData[id][2]+"'></div> & <span id='bUpgG2Req"+id+"'></span> <div class='bRune' type='"+bu.reqData[id][4]+"'></div></button>"
		}
	}
	//Bosonic Runes
	var brTable=document.getElementById("bRunes")
	for (var g=1;g<=br.limit;g++) {
		var width=100/br.limit
		var col=brTable.rows[0].insertCell(g-1)
		col.id="bRuneCol"+g
		col.innerHTML='<div class="bRune" type="'+g+'"></div>: <span id="bRune'+g+'"></span>'
		col.style="min-width:"+width+"%;width:"+width+"%;max-width:"+width+"%"
	}
	var glyphs=document.getElementsByClassName("bRune")
	for (var g=0;g<glyphs.length;g++) {
		var glyph=glyphs[g]
		var type=glyph.getAttribute("type")
		if (type>0&&type<=br.limit) {
			glyph.className="bRune "+br.names[type]
			glyph.setAttribute("ach-tooltip",br.names[type]+" Bosonic Rune")
		}
	}
}

//v1.5
function showQuantumTab(tabName) {
	//iterate over all elements in div_tab class. Hide everything that's not tabName and show tabName
	var tabs = document.getElementsByClassName('quantumtab');
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
	if (oldTab != tabName) {
		player.aarexModifications.tabsSave.tabQuantum = tabName
		if (tabName == "uquarks" && document.getElementById("quantumtab").style.display !== "none") {
			resizeCanvas()
			requestAnimationFrame(drawQuarkAnimation)
		}
	}
	closeToolTip()
}


var quantumTabs = {
	tabIds: ["uquarks", "gluons", "electrons", "replicants", "nanofield", "tod"],
	update: {
		uquarks: updateQuarksTab,
		gluons: updateGluonsTab,
		electrons: function() {
			document.getElementById("normalGalaxies").textContent=getFullExpansion(player.galaxies)
			document.getElementById("sacrificeGal").className="gluonupgrade "+((player.galaxies>tmp.qu.electrons.sacGals&&inQC(0))?"stor":"unavailabl")+"ebtn"
			document.getElementById("sacrificeGals").textContent=getFullExpansion(Math.max(player.galaxies-tmp.qu.electrons.sacGals, 0))
			for (u=1;u<5;u++) document.getElementById("electronupg"+u).className="gluonupgrade "+(canBuyElectronUpg(u)?"stor":"unavailabl")+"ebtn"
			if (tmp.qu.autoOptions.sacrifice) updateElectronsEffect()
		},
		replicants: function() {
			document.getElementById("replicantiAmount2").textContent=shortenDimensions(player.replicanti.amount)
			document.getElementById("replicantReset").className=player.replicanti.amount.lt(tmp.qu.replicants.requirement)?"unavailablebtn":"storebtn"
			document.getElementById("replicantReset").innerHTML="Reset replicanti amount for a replicant.<br>(requires "+shortenCosts(tmp.qu.replicants.requirement)+" replicanti)"
			document.getElementById("replicantAmount").textContent=shortenDimensions(tmp.qu.replicants.amount)
			document.getElementById("workerReplAmount").textContent=shortenDimensions(tmp.twr)
			document.getElementById("babyReplAmount").textContent=shortenDimensions(tmp.qu.replicants.babies)

			var gatherRateData=getGatherRate()
			document.getElementById("normalReplGatherRate").textContent=shortenDimensions(gatherRateData.normal)
			document.getElementById("workerReplGatherRate").textContent=shortenDimensions(gatherRateData.workersTotal)
			document.getElementById("babyReplGatherRate").textContent=shortenDimensions(gatherRateData.babies)
			document.getElementById("gatherRate").textContent=tmp.qu.nanofield.producingCharge?'-'+shortenDimensions(getQuarkLossProduction())+'/s':'+'+shortenDimensions(gatherRateData.total)+'/s'

			document.getElementById("gatheredQuarks").textContent=shortenDimensions(tmp.qu.replicants.quarks.floor())
			document.getElementById("quarkTranslation").textContent=getFullExpansion(Math.round(tmp.pe*100))

			var eggonRate = tmp.twr.times(getEmperorDimensionMultiplier(1)).times(3)
			if (eggonRate.lt(30)) {
				document.getElementById("eggonRate").textContent=shortenDimensions(eggonRate)
				document.getElementById("eggonRateTimeframe").textContent="minute"
			} else {
				document.getElementById("eggonRate").textContent=shortenMoney(eggonRate.div(60))
				document.getElementById("eggonRateTimeframe").textContent="second"
			}
			document.getElementById("feedNormal").className=(canFeedReplicant(1)?"stor":"unavailabl")+"ebtn"
			document.getElementById("workerProgress").textContent=Math.round(tmp.eds[1].progress.toNumber()*100)+"%"

			if (!hasNU(2)) {
				document.getElementById("eggonAmount").textContent=shortenDimensions(tmp.qu.replicants.eggons)
				document.getElementById("hatchProgress").textContent=Math.round(tmp.qu.replicants.babyProgress.toNumber()*100)+"%"
			}
			var growupRate = tmp.twr.times(player.achievements.includes("ng3p35")?1.5:0.15)
			if (tmp.qu.replicants.babies.eq(0)) growupRate = growupRate.min(eggonRate)
			if (growupRate.lt(30)) {
				document.getElementById("growupRate").textContent=shortenDimensions(growupRate)
				document.getElementById("growupRateUnit").textContent="minute"
			} else {
				document.getElementById("growupRate").textContent=shortenMoney(growupRate.div(60))
				document.getElementById("growupRateUnit").textContent="second"
			}
			document.getElementById("growupProgress").textContent=Math.round(tmp.qu.replicants.ageProgress.toNumber()*100)+"%"

			document.getElementById("reduceHatchSpeed").innerHTML="Hatch speed: "+hatchSpeedDisplay()+" -> "+hatchSpeedDisplay(true)+"<br>Cost: "+shortenDimensions(tmp.qu.replicants.hatchSpeedCost)+" for all 3 gluons"
			if (player.ghostify.milestones>7) updateReplicants("display")
		},
		nanofield: function() {
			var rewards = tmp.qu.nanofield.rewards
			if (document.getElementById("nanoverse").style.display == "block") {
				document.getElementById("quarksNanofield").textContent=shortenDimensions(tmp.qu.replicants.quarks)
				document.getElementById("quarkCharge").textContent=shortenMoney(tmp.qu.nanofield.charge)
				document.getElementById("quarkChargeRate").textContent=shortenDimensions(getQuarkChargeProduction())
				document.getElementById("quarkLoss").textContent=shortenDimensions(getQuarkLossProduction())
				document.getElementById("quarkEnergy").textContent=shortenMoney(tmp.qu.nanofield.energy)
				document.getElementById("quarkEnergyNanofield").textContent=shortenMoney(tmp.qu.nanofield.energy)
				document.getElementById("quarkEnergyRate").textContent=shortenMoney(getQuarkEnergyProduction())
				document.getElementById("quarkPower").textContent=getFullExpansion(tmp.qu.nanofield.power)
				document.getElementById("quarkPowerThreshold").textContent=shortenMoney(tmp.qu.nanofield.powerThreshold)
				document.getElementById("quarkAntienergy").textContent=shortenMoney(tmp.qu.nanofield.antienergy)
				document.getElementById("quarkAntienergyRate").textContent=shortenMoney(getQuarkAntienergyProduction())
				document.getElementById("quarkChargeProductionCap").textContent=shortenMoney(getQuarkChargeProductionCap())
				document.getElementById("rewards").textContent=getFullExpansion(rewards)

				for (var reward=1; reward<9; reward++) {
					document.getElementById("nfReward" + reward).className = reward > rewards ? "nfRewardlocked" : "nfReward"
					document.getElementById("nfRewardHeader" + reward).textContent = (rewards % 8 + 1 == reward ? "Next" : DISPLAY_NAMES[reward]) + " reward"
					document.getElementById("nfRewardTier" + reward).textContent = "Tier " + getFullExpansion(Math.ceil((rewards + 1 - reward) / 8)) + " / Power: " + getNanofieldRewardTier(reward, rewards).toFixed(1)
				}
				document.getElementById("nfReward1").textContent = hasBosonicUpg(21) ? "Dimension Supersonic scaling starts " + getFullExpansion(getNanofieldRewardEffect(1, "supersonic")) + " boosts later." :
					"Hatch speed is " + shortenDimensions(getNanofieldRewardEffect(1, "speed")) + "x faster."
				document.getElementById("nfReward2").textContent = "Meta-antimatter effect power is increased by ^" + getNanofieldRewardEffect(2).toFixed(1) + "."
				document.getElementById("nfReward3").textContent = "Free galaxy gain is increased by " + (getNanofieldRewardEffect(3)*100-100).toFixed(1) + "%."
				document.getElementById("nfReward4").textContent = "Dilated time boost to Meta Dimensions is increased to ^" + getNanofieldRewardEffect(4).toFixed(3) + "."
				document.getElementById("nfReward5").textContent = "While dilated, Normal Dimension multipliers and tickspeed are raised to the power of " + getNanofieldRewardEffect(5).toFixed(2) + "."
				document.getElementById("nfReward6").textContent = "Meta-dimension boost power is increased to " + getNanofieldRewardEffect(6).toFixed(2) + "x."
				document.getElementById("nfReward7").textContent = (hasBosonicUpg(22) ? "You gain " + shorten(getNanofieldRewardEffect(7, "neutrinos")) + "x more neutrinos" :
					"Remote galaxy cost scaling starts " + getFullExpansion(getNanofieldRewardEffect(7, "remote")) + " later") +
					" and the production of preon charge is " + shortenMoney(getNanofieldRewardEffect(7, "charge")) + "x faster."
				document.getElementById("nfReward8").textContent = "Add " + getNanofieldRewardEffect(8, "per-10").toFixed(2) + "x to multiplier per ten dimensions before getting affected by electrons and the production of preon energy is " + shortenMoney(getNanofieldRewardEffect(8, "energy")) + "x faster."

				document.getElementById("ns").textContent = ghostified || tmp.ns.neq(1) ? "The Nanofield speed multiplier is currently "+shorten(tmp.ns)+"x." : ""
			}
			if (document.getElementById("antipreon").style.display == "block") {
				document.getElementById("rewards_AP").textContent = getFullExpansion(rewards)
				document.getElementById("rewards_wake").textContent = getFullExpansion(tmp.apgw)
				document.getElementById("sleepy").style.display=tmp.qu.nanofield.apgWoke?"none":""
				document.getElementById("woke").style.display=tmp.qu.nanofield.apgWoke?"":"none"
			}
		},
		tod: function() {
			var branchNum
			var colors=["red","green","blue"]
			var shorthands=["r","g","b"]
			if (document.getElementById("redBranch").style.display == "block") branchNum=1
			if (document.getElementById("greenBranch").style.display == "block") branchNum=2
			if (document.getElementById("blueBranch").style.display == "block") branchNum=3
			for (var c=0;c<3;c++) {
				var color=colors[c]
				var shorthand=shorthands[c]
				var branch=tmp.qu.tod[shorthand]
				var name=color+" "+getUQName(shorthand)+" quarks"
				var rate=getDecayRate(shorthand)
				var linear=Decimal.pow(2,getRDPower(shorthand))
				document.getElementById(color+"UnstableGain").className=tmp.qu.usedQuarks[shorthand].gt(0)&&getUnstableGain(shorthand).gt(branch.quarks)?"storebtn":"unavailablebtn"
				document.getElementById(color+"UnstableGain").textContent="Gain "+shortenMoney(getUnstableGain(shorthand))+" "+name+(player.ghostify.milestones>3?".":", but lose all your "+color+" quarks.")
				document.getElementById(color+"QuarkSpin").textContent=shortenMoney(branch.spin)
				document.getElementById(color+"UnstableQuarks").textContent=shortenMoney(branch.quarks)
				document.getElementById(color+"QuarksDecayRate").textContent=branch.quarks.lt(linear)&&rate.lt(1)?"You are losing "+shorten(linear.times(rate))+" "+name+" per second":"Their half-life is "+timeDisplayShort(Decimal.div(10,rate),true,2)+(linear.eq(1)?"":" until their amount reaches "+shorten(linear))
				document.getElementById(color+"QuarksDecayTime").textContent=timeDisplayShort(Decimal.div(10,rate).times(branch.quarks.gt(linear)?branch.quarks.div(linear).log(2)+1:branch.quarks.div(linear)))
				let ret=getQuarkSpinProduction(shorthand)
				document.getElementById(color+"QuarkSpinProduction").textContent="+"+shortenMoney(ret)+"/s"
				if (branchNum==c+1) {
					var decays=getRadioactiveDecays(shorthand)
					var power=Math.floor(getBU1Power(shorthand)/120+1)
					document.getElementById(color+"UpgPow1").textContent=decays||power>1?shorten(Decimal.pow(2,(1+decays*.1)/power)):2
					document.getElementById(color+"UpgSpeed1").textContent=decays>2||power>1?shorten(Decimal.pow(2,Math.max(.8+decays*.1,1)/power)):2
					for (var u=1;u<4;u++) document.getElementById(color+"upg"+u).className="gluonupgrade "+(branch.spin.lt(getBranchUpgCost(shorthand,u))?"unavailablebtn":shorthand)
					if (ghostified) document.getElementById(shorthand+"RadioactiveDecay").className="gluonupgrade "+(branch.quarks.lt(Decimal.pow(10,Math.pow(2,50)))?"unavailablebtn":shorthand)
				}
			}
			if (!branchNum) {
				for (var u=1;u<9;u++) {
					var lvl=getTreeUpgradeLevel(u)
					document.getElementById("treeupg"+u).className="gluonupgrade "+(canBuyTreeUpg(u)?shorthands[getTreeUpgradeLevel(u)%3]:"unavailablebtn")
					document.getElementById("treeupg"+u+"current").textContent=getTreeUpgradeEffectDesc(u)
					document.getElementById("treeupg"+u+"lvl").textContent=getFullExpansion(lvl)+(tmp.tue>1?" -> "+getFullExpansion(Math.floor(lvl*tmp.tue)):"")
					document.getElementById("treeupg"+u+"cost").textContent=shortenMoney(getTreeUpgradeCost(u))+" "+colors[lvl%3]
				}
				setAndMaybeShow("treeUpgradeEff",ghostified,'"Tree upgrade efficiency: "+(tmp.tue*100).toFixed(1)+"%"')
			}
			document.getElementById("todspeed").textContent = todspeed !== 1 ? "The ToD speed multiplier is currently "+shorten(todspeed)+"x." : ""
		}
	}
}

function updateQuantumTabs() {
	for (var i=0; i<quantumTabs.tabIds.length; i++) {
		var id = quantumTabs.tabIds[i]
		if (document.getElementById(id).style.display == "block") quantumTabs.update[id]()
	}
}

//v1.79
var speedrunMilestonesReached
var speedrunMilestones = [12,9,6,4.5,3,2,1,8/9,7/9,6/9,5/9,4/9,3/9,2/9,1/9,1/12,1/15,7/120,1/20,1/24,1/30,1/40,1/60,1/120,1/180,1/240,1/360,1/720]
function updateSpeedruns() {
	speedrunMilestonesReached = 0
	if (player.masterystudies) {
		for (i=0;i<28;i++) {
			if (tmp.qu.best>speedrunMilestones[i]*36e3&&player.ghostify.milestones<1) break
			speedrunMilestonesReached++
		}
		document.getElementById('sacrificeAuto').style.display=speedrunMilestonesReached>24?"":"none"
		for (i=1;i<29;i++) document.getElementById("speedrunMilestone"+i).className="achievement achievement"+(speedrunMilestonesReached>=i?"un":"")+"locked"
		for (i=1;i<5;i++) document.getElementById("speedrunRow"+i).className=speedrunMilestonesReached<(i>3?28:i*8)?"":"completedrow"
		if (speedrunMilestonesReached>23) giveAchievement("And the winner is...")
		if (speedrunMilestonesReached>25) document.getElementById('rebuyupgmax').style.display="none"
		if (speedrunMilestonesReached>27) {
			giveAchievement("Special Relativity")
			var removeMaxAll=false
			for (d=1;d<9;d++) {
				if (player.autoEterOptions["md"+d]) {
					if (d>7) removeMaxAll=true
				} else break
			}
			document.getElementById("metaMaxAllDiv").style.display=removeMaxAll?"none":""
		}
		if (tmp.qu.best<=10) giveAchievement("Quantum doesn't take so long")
	}
}

function toggleAutoTT() {
	if (speedrunMilestonesReached < 2) maxTheorems()
	else player.autoEterOptions.tt = !player.autoEterOptions.tt
	document.getElementById("theoremmax").innerHTML = speedrunMilestonesReached > 2 ? ("Auto max: O"+(player.autoEterOptions.tt?"N":"FF")) : "Buy max Theorems"
}

//v1.8
const MAX_DIL_UPG_PRIORITIES = [5, 4, 3, 1, 2]
function doAutoMetaTick() {
	if (!player.masterystudies) return
	if (player.autoEterOptions.rebuyupg && speedrunMilestonesReached > 6) {
		if (speedrunMilestonesReached > 25) maxAllDilUpgs()
		else for (var i = 0; i < MAX_DIL_UPG_PRIORITIES.length; i++) {
			var id = "r" + MAX_DIL_UPG_PRIORITIES[i]
			if (isDilUpgUnlocked(id)) buyDilationUpgrade(id, false, true)
		}
	}
	for (var d=1;d<=8;d++) {
		var dim = d
		if (tmp.ngp3l) dim = 9 - d
		if (player.autoEterOptions["md" + dim] && speedrunMilestonesReached >= 6 + dim) buyMaxMetaDimension(dim)
	}
	if (player.autoEterOptions.metaboost && speedrunMilestonesReached > 14) metaBoost()
}

function toggleAllMetaDims() {
	var turnOn
	var id=1
	var stop=Math.min(speedrunMilestonesReached-5,9)
	while (id<stop&&turnOn===undefined) {
		if (!player.autoEterOptions["md"+id]) turnOn=true
		else if (id>stop-2) turnOn=false
		id++
	}
	for (id=1;id<stop;id++) player.autoEterOptions["md"+id]=turnOn
	document.getElementById("metaMaxAllDiv").style.display=turnOn&&stop>7&&speedrunMilestonesReached>27?"none":""
}

function sacrificeGalaxy(auto=false) {
	var amount=player.galaxies-tmp.qu.electrons.sacGals
	if (amount<1) return
	if (player.options.sacrificeConfirmation&&!auto) if (!confirm("You will perform a galaxy reset, but you will exchange all your galaxies to electrons which will give a boost to multiplier per ten dimensions.")) return
	tmp.qu.electrons.sacGals+=amount
	tmp.qu.electrons.amount+=getELCMult()*amount
	if (!tmp.qu.autoOptions.sacrifice) updateElectronsEffect()
	if (!auto) galaxyReset(0)
}

function getMPTExp(mod) {
	if (!inQC(0)) return 1
	var a = tmp.qu.electrons.amount
	var s = 149840
	if (player.ghostify.ghostlyPhotons.unl) s += tmp.le[2]
	if (a>37460+s) a = Math.sqrt((a-s)*37460)+s
	if (tmp.rg4 && mod != "no-rg4") a *= 0.7
	if (player.masterystudies !== undefined && player.masterystudies.includes("d13") && mod != "noTree") a *= getTreeUpgradeEffect(4)
	return a+1
}

//v1.8
function isRewardEnabled(id) {
	if (!player.masterystudies) return false
	return speedrunMilestonesReached>=id&&!tmp.qu.disabledRewards[id]
}

function disableReward(id) {
	tmp.qu.disabledRewards[id]=!tmp.qu.disabledRewards[id]
	document.getElementById("reward"+id+"disable").textContent=(id>11?"10 seconds":id>4?"33.3 mins":(id>3?4.5:6)+" hours")+" reward: O"+(tmp.qu.disabledRewards[id]?"FF":"N")
}

function updateElectrons(retroactive) {
	if (player.masterystudies ? !player.masterystudies.includes("d7") : true) {
		document.getElementById("electronstabbtn").style.display="none"
		return
	} else document.getElementById("electronstabbtn").style.display=""
	document.getElementById("electronsGainMult").textContent=getELCMult().toFixed(2)
	if (retroactive) tmp.qu.electrons.amount=getELCMult()*tmp.qu.electrons.sacGals
	if (!tmp.qu.autoOptions.sacrifice) updateElectronsEffect()
	for (u=1;u<5;u++) {
		var cost=getElectronUpgCost(u)
		document.getElementById("electronupg"+u).innerHTML="Upgrade multiplier with "+([null,"time theorems","dilated time","meta-antimatter","meta-dimension boosts"])[u]+".<br>Cost: "+(u>3?getFullExpansion(getElectronUpgCost(u)):shortenCosts(getElectronUpgCost(u)))+([null," TT"," DT"," MA"," MDB"])[u]
	}
}

//v1.9
function getElectronUpgCost(u) {
	var amount=tmp.qu.electrons.rebuyables[u-1]
	var baseCost=([0,82,153,638,26])[u]+Math.pow(amount*Math.max(amount-1,1)+1,u<2?1:2)
	if (u>3) return baseCost
	if (u<2) return Math.pow(10,baseCost)
	return Decimal.pow(10,baseCost)
}

function buyElectronUpg(u) {
	if (!canBuyElectronUpg(u)) return
	var cost=getElectronUpgCost(u)
	if (u>3) {
		player.meta.resets-=cost
		player.meta.antimatter=new Decimal(100)
		clearMetaDimensions()
		for (let i = 2; i <= 8; i++) if (!canBuyMetaDimension(i)) document.getElementById(i + "MetaRow").style.display = "none"
	} else if (u>2) player.meta.antimatter=player.meta.antimatter.sub(cost)
	else if (u>1) player.dilation.dilatedTime=player.dilation.dilatedTime.sub(cost)
	else player.timestudy.theorem-=cost
	tmp.qu.electrons.rebuyables[u-1]++
	tmp.qu.electrons.mult+=0.25
	updateElectrons(!tmp.ngp3l)
}

//v1.9
var quantumChallenges={
	costs:[0,16750,19100,21500,24050,25900,28900,31850,33600],
	goals:[0,665e7,768e8,4525e7,5325e7,1344e7,561e6,6254e7,2925e7]
}

var assigned
var pcFocus=0
function updateQuantumChallenges() {
	if (player.masterystudies ? !player.masterystudies.includes("d8") : true) {
		document.getElementById("qctabbtn").style.display="none"
		return
	} else document.getElementById("qctabbtn").style.display=""
	assigned=[]
	var assignedNums={}
	document.getElementById("bigrip").style.display = player.masterystudies.includes("d14") ? "" : "none"
	document.getElementById("pairedchallenges").style.display = player.masterystudies.includes("d9") ? "" : "none"
	document.getElementById("respecPC").style.display = player.masterystudies.includes("d9") ? "" : "none"
	for (pc=1;pc<5;pc++) {
		var subChalls=tmp.qu.pairedChallenges.order[pc]
		if (subChalls) for (sc=0;sc<2;sc++) {
			var subChall=subChalls[sc]
			if (subChall) {
				assigned.push(subChall)
				assignedNums[subChall]=pc
			}
		}
		if (player.masterystudies.includes("d9")) {
			var property="pc"+pc
			var sc1=tmp.qu.pairedChallenges.order[pc]?tmp.qu.pairedChallenges.order[pc][0]:0
			var sc2=(sc1?tmp.qu.pairedChallenges.order[pc].length>1:false)?tmp.qu.pairedChallenges.order[pc][1]:0
			document.getElementById(property+"desc").textContent="Paired Challenge "+pc+": Both Quantum Challenge "+(sc1?sc1:"?")+" and "+(sc2?sc2:"?")+" are applied."
			document.getElementById(property+"cost").textContent="Cost: "+(sc2?getFullExpansion(getQCCost(pc+8)):"???")+" electrons"
			document.getElementById(property+"goal").textContent="Goal: "+(sc2?shortenCosts(Decimal.pow(10,getQCGoal(pc+8))):"???")+" antimatter"
			document.getElementById(property).textContent=pcFocus==pc?"Cancel":(tmp.qu.pairedChallenges.order[pc]?tmp.qu.pairedChallenges.order[pc].length<2:true)?"Assign":tmp.qu.pairedChallenges.completed>=pc?"Completed":tmp.qu.pairedChallenges.completed+1<pc?"Locked":tmp.qu.pairedChallenges.current==pc?"Running":"Start"
			document.getElementById(property).className=pcFocus==pc||(tmp.qu.pairedChallenges.order[pc]?tmp.qu.pairedChallenges.order[pc].length<2:true)?"challengesbtn":tmp.qu.pairedChallenges.completed>=pc?"completedchallengesbtn":tmp.qu.pairedChallenges.completed+1<pc?"lockedchallengesbtn":tmp.qu.pairedChallenges.current==pc?"onchallengebtn":"challengesbtn"

			var sc1t=Math.min(sc1,sc2)
			var sc2t=Math.max(sc1,sc2)
			if (player.masterystudies.includes("d14")) {
				document.getElementById(property + "br").style.display = ""
				document.getElementById(property + "br").textContent = sc1t != 6 || sc2t != 8 ? "QC6 & 8" : tmp.qu.bigRip.active ? "Big Ripped" : tmp.qu.pairedChallenges.completed + 1 < pc ? "Locked" : "Big Rip"
				document.getElementById(property + "br").className = sc1t != 6 || sc2t != 8 ? "lockedchallengesbtn" : tmp.qu.bigRip.active ? "onchallengebtn" : tmp.qu.pairedChallenges.completed + 1 < pc ? "lockedchallengesbtn" : "bigripbtn"
			} else document.getElementById(property + "br").style.display = "none"
		}
	}
	if (player.masterystudies.includes("d14")) {
		document.getElementById("spaceShards").textContent = shortenDimensions(tmp.qu.bigRip.spaceShards)
		for (var u=18;u<20;u++) document.getElementById("bigripupg"+u).parentElement.style.display=player.ghostify.ghostlyPhotons.unl?"":"none"
		for (var u=1;u<(player.ghostify.ghostlyPhotons.unl?20:18);u++) {
			document.getElementById("bigripupg"+u).className = tmp.qu.bigRip.upgrades.includes(u) ? "gluonupgradebought bigrip" + (isBigRipUpgradeActive(u, true) ? "" : "off") : tmp.qu.bigRip.spaceShards.lt(bigRipUpgCosts[u]) ? "gluonupgrade unavailablebtn" : "gluonupgrade bigrip"
			document.getElementById("bigripupg"+u+"cost").textContent = shortenDimensions(new Decimal(bigRipUpgCosts[u]))
		}
	}
	for (qc=1;qc<9;qc++) {
		var property="qc"+qc
		document.getElementById(property+"div").style.display=(qc<2||QCIntensity(qc-1))?"inline-block":"none"
		document.getElementById(property).textContent=((!assigned.includes(qc)&&pcFocus)?"Choose":inQC(qc)?"Running":QCIntensity(qc)?(assigned.includes(qc)?"Assigned":"Completed"):"Start")+(assigned.includes(qc)?" (PC"+assignedNums[qc]+")":"")
		document.getElementById(property).className=(!assigned.includes(qc)&&pcFocus)?"challengesbtn":inQC(qc)?"onchallengebtn":QCIntensity(qc)?"completedchallengesbtn":"challengesbtn"
		document.getElementById(property+"cost").textContent="Cost: "+getFullExpansion(quantumChallenges.costs[qc])+" electrons"
		document.getElementById(property+"goal").textContent="Goal: "+shortenCosts(Decimal.pow(10,getQCGoal(qc)))+" antimatter"
	}
	document.getElementById("qc2reward").textContent = Math.round(getQCReward(2)*100-100)
	document.getElementById("qc7desc").textContent="Dimension and tickspeed cost multiplier increases are "+shorten(Number.MAX_VALUE)+"x. Multiplier per ten-dimensions is 1x, and meta-antimatter has no effect."
	document.getElementById("qc7reward").textContent = (100-getQCReward(7)*100).toFixed(2)
	document.getElementById("qc8reward").textContent = getQCReward(8)
}

function inQC(num) {
	var data=getCurrentQCData()
	if (num>0) return data.includes(num)
	return data.length<1
}

//v1.95?
function getQCGoal(num) {
	if (player.masterystudies==undefined) return 0
	var c1=0
	var c2=0
	if (num==undefined) {
		var data=getCurrentQCData()
		if (data[0]) c1=data[0]
		if (data[1]) c2=data[1]
	} else if (num<9) {
		c1=num
	} else if (tmp.qu.pairedChallenges.order[num-8]) {
		c1=tmp.qu.pairedChallenges.order[num-8][0]
		c2=tmp.qu.pairedChallenges.order[num-8][1]
	}
	if (c1==0) return quantumChallenges.goals[0]
	if (c2==0) return quantumChallenges.goals[c1]
	var cs=[c1,c2]
	var mult=1
	if (cs.includes(1)&&cs.includes(3)) mult=1.6
	if (cs.includes(2)&&cs.includes(6)) mult=1.7
	if (cs.includes(3)&&cs.includes(7)) mult=2.68
	return quantumChallenges.goals[c1]*quantumChallenges.goals[c2]/1e11*mult
}

function QCIntensity(num) {
	if (tmp.ngp3 && tmp.qu != undefined && tmp.qu.challenges != undefined) return tmp.qu.challenges[num] || 0
	return 0
}

//v1.997
function respecTogglePC() {
	tmp.qu.pairedChallenges.respec=!tmp.qu.pairedChallenges.respec
	document.getElementById("respecPC").className=tmp.qu.pairedChallenges.respec?"quantumbtn":"storebtn"
}

function getQCCost(num) {
	if (num>8) return quantumChallenges.costs[tmp.qu.pairedChallenges.order[num-8][0]]+quantumChallenges.costs[tmp.qu.pairedChallenges.order[num-8][1]]
	return quantumChallenges.costs[num]
}

//v1.997895
function canBuyElectronUpg(id) {
	if (!inQC(0)) return false
	if (id>3) return player.meta.resets>=getElectronUpgCost(4)
	if (id>2) return player.meta.antimatter.gte(getElectronUpgCost(3))
	if (id>1) return player.dilation.dilatedTime.gte(getElectronUpgCost(2))
	return player.timestudy.theorem>=getElectronUpgCost(1)
}

//v1.99799
function respecOptions() {
	closeToolTip()
	document.getElementById("respecoptions").style.display="flex"
}

//v1.998
function toggleAutoQuantumContent(id) {
	tmp.qu.autoOptions[id]=!tmp.qu.autoOptions[id]
	if (id=='sacrifice') {
		document.getElementById('sacrificeAuto').textContent="Auto: O"+(tmp.qu.autoOptions.sacrifice?"N":"FF")
		if (tmp.qu.autoOptions.sacrifice) sacrificeGalaxy(6)
	}
}

function updateReplicants(mode) {
	if (player.masterystudies==undefined?true:player.ghostify.milestones<8) mode=undefined
	if (mode === undefined) {
		if (player.masterystudies ? !player.masterystudies.includes("d10") : true) {
			document.getElementById("replicantstabbtn").style.display="none"
			return
		} else document.getElementById("replicantstabbtn").style.display=""
	}
	if (mode === undefined || mode === "display") {
		document.getElementById("rgRepl").textContent=shortenDimensions(tmp.qu.gluons.rg)
		document.getElementById("gbRepl").textContent=shortenDimensions(tmp.qu.gluons.gb)
		document.getElementById("brRepl").textContent=shortenDimensions(tmp.qu.gluons.br)

		document.getElementById("quantumFoodAmount").textContent=getFullExpansion(tmp.qu.replicants.quantumFood)
		document.getElementById("buyQuantumFood").innerHTML="Buy 1 quantum food<br>Cost: "+shortenDimensions(tmp.qu.replicants.quantumFoodCost)+" for all 3 gluons"
		document.getElementById("buyQuantumFood").className="gluonupgrade "+(tmp.qu.gluons.rg.min(tmp.qu.gluons.gb).min(tmp.qu.gluons.br).lt(tmp.qu.replicants.quantumFoodCost)?"unavailabl":"stor")+"ebtn"
		document.getElementById("breakLimit").innerHTML="Limit of workers: "+getLimitMsg()+(isLimitUpgAffordable()?" -> "+getNextLimitMsg()+"<br>Cost: "+shortenDimensions(tmp.qu.replicants.limitCost)+" for all 3 gluons":"")
		document.getElementById("breakLimit").className=(tmp.qu.gluons.rg.min(tmp.qu.gluons.gb).min(tmp.qu.gluons.br).lt(tmp.qu.replicants.limitCost)||!isLimitUpgAffordable()?"unavailabl":"stor")+"ebtn"
		document.getElementById("reduceHatchSpeed").className=(tmp.qu.gluons.rg.min(tmp.qu.gluons.gb).min(tmp.qu.gluons.br).lt(tmp.qu.replicants.hatchSpeedCost)?"unavailabl":"stor")+"ebtn"
		if (player.masterystudies.includes('d11')) {
			document.getElementById("quantumFoodAmountED").textContent=getFullExpansion(tmp.qu.replicants.quantumFood)
			document.getElementById("buyQuantumFoodED").innerHTML="Buy 1 quantum food<br>Cost: "+shortenDimensions(tmp.qu.replicants.quantumFoodCost)+" for all 3 gluons"
			document.getElementById("buyQuantumFoodED").className="gluonupgrade "+(tmp.qu.gluons.rg.min(tmp.qu.gluons.gb).min(tmp.qu.gluons.br).lt(tmp.qu.replicants.quantumFoodCost)?"unavailabl":"stor")+"ebtn"
			document.getElementById("breakLimitED").innerHTML="Limit of workers: "+getLimitMsg()+(isLimitUpgAffordable()?" -> "+getNextLimitMsg()+"<br>Cost: "+shortenDimensions(tmp.qu.replicants.limitCost)+" for all 3 gluons":"")
			document.getElementById("breakLimitED").className=(tmp.qu.gluons.rg.min(tmp.qu.gluons.gb).min(tmp.qu.gluons.br).lt(tmp.qu.replicants.limitCost)||!isLimitUpgAffordable()?"unavailabl":"stor")+"ebtn"
		}
	}
}

function replicantReset() {
	if (player.replicanti.amount.lt(tmp.qu.replicants.requirement)) return
	if (!player.achievements.includes("ng3p47")) player.replicanti.amount=new Decimal(1)
	tmp.qu.replicants.amount=tmp.qu.replicants.amount.add(1)
	tmp.qu.replicants.requirement=tmp.qu.replicants.requirement.times("1e100000")
}

function getGatherRate() {
	var mult = new Decimal(1)
	if (player.masterystudies.includes("t373")) mult = getMTSMult(373)
	var data = {
		normal: tmp.qu.replicants.amount.times(mult),
		babies: tmp.qu.replicants.babies.times(mult).div(20),
		workers : { }
	}
	data.total = data.normal.add(data.babies)
	data.workersTotal = new Decimal(0)
	for (var d=1; d<9; d++) {
		data.workers[d] = tmp.eds[d].workers.times(mult).times(Decimal.pow(20, d))
		data.workersTotal = data.workersTotal.add(data.workers[d])
	}
	data.total = data.total.add(data.workersTotal)
	return data
}

function buyQuantumFood() {
	if (tmp.qu.gluons.rg.min(tmp.qu.gluons.gb).min(tmp.qu.gluons.br).gte(tmp.qu.replicants.quantumFoodCost)) {
		tmp.qu.gluons.rg=tmp.qu.gluons.rg.sub(tmp.qu.replicants.quantumFoodCost)
		tmp.qu.gluons.gb=tmp.qu.gluons.gb.sub(tmp.qu.replicants.quantumFoodCost)
		tmp.qu.gluons.br=tmp.qu.gluons.br.sub(tmp.qu.replicants.quantumFoodCost)
		tmp.qu.replicants.quantumFood++
		tmp.qu.replicants.quantumFoodCost=tmp.qu.replicants.quantumFoodCost.times(5)
		updateGluonsTabOnUpdate("spend")
		updateReplicants("spend")
	}
}

function reduceHatchSpeed() {
	if (tmp.qu.gluons.rg.min(tmp.qu.gluons.gb).min(tmp.qu.gluons.br).gte(tmp.qu.replicants.hatchSpeedCost)) {
		tmp.qu.gluons.rg=tmp.qu.gluons.rg.sub(tmp.qu.replicants.hatchSpeedCost)
		tmp.qu.gluons.gb=tmp.qu.gluons.gb.sub(tmp.qu.replicants.hatchSpeedCost)
		tmp.qu.gluons.br=tmp.qu.gluons.br.sub(tmp.qu.replicants.hatchSpeedCost)
		tmp.qu.replicants.hatchSpeed=tmp.qu.replicants.hatchSpeed/1.1
		tmp.qu.replicants.hatchSpeedCost=tmp.qu.replicants.hatchSpeedCost.times(10)
		updateGluonsTabOnUpdate("spend")
		updateReplicants("spend")
	}
}

function breakLimit() {
	if (tmp.qu.gluons.rg.min(tmp.qu.gluons.gb).min(tmp.qu.gluons.br).gte(tmp.qu.replicants.limitCost)&&isLimitUpgAffordable()) {
		tmp.qu.gluons.rg=tmp.qu.gluons.rg.sub(tmp.qu.replicants.limitCost)
		tmp.qu.gluons.gb=tmp.qu.gluons.gb.sub(tmp.qu.replicants.limitCost)
		tmp.qu.gluons.br=tmp.qu.gluons.br.sub(tmp.qu.replicants.limitCost)
		tmp.qu.replicants.limit++
		if (tmp.qu.replicants.limit>10&&tmp.qu.replicants.limitDim<8) {
			tmp.qu.replicants.limit=1
			tmp.qu.replicants.limitDim++
		}
		if (tmp.qu.replicants.limit%10>0) tmp.qu.replicants.limitCost=tmp.qu.replicants.limitCost.times(200)
		updateGluonsTabOnUpdate("spend")
		updateReplicants("spend")
	}
}

//v1.9984
function maxAllID() {
	if (player.pSac !== undefined) maxAllIDswithAM()
	for (t=1;t<9;t++) {
		var dim=player["infinityDimension"+t]
        var cost=getIDCost(t)
		if (player.infDimensionsUnlocked[t-1]&&player.infinityPoints.gte(dim.cost)) {
			var costMult=getIDCostMult(t)
			if (player.infinityPoints.lt(Decimal.pow(10, 1e10))) {
				var toBuy=Math.max(Math.floor(player.infinityPoints.div(9-t).div(cost).times(costMult-1).add(1).log(costMult)),1)
				var toSpend=Decimal.pow(costMult,toBuy).sub(1).div(costMult-1).times(cost).round()
				if (toSpend.gt(player.infinityPoints)) player.infinityPoints=new Decimal(0)
				else player.infinityPoints=player.infinityPoints.sub(toSpend)
			} else var toBuy = Math.floor(player.infinityPoints.div(cost).log(costMult))
			dim.amount=dim.amount.add(toBuy*10)
			dim.baseAmount+=toBuy*10
			dim.power=dim.power.times(Decimal.pow(getInfBuy10Mult(t),toBuy))
			dim.cost=dim.cost.times(Decimal.pow(costMult,toBuy))
		}
	}
}

function hideMaxIDButton(onLoad=false) {
	if (!onLoad) if (!player.masterystudies) return
	var hide=true
	if (player.masterystudies&&player.currentEterChall!="eterc8") {
		hide=false
		if (player.eternities>17) {
			for (d=0;d<8;d++) {
				if (player.infDimBuyers[d]) {
					if (d>6) hide=true
				} else break
			}
		}
	}
	if (player.pSac !== undefined) hide=false
	document.getElementById("maxAllID").style.display=hide?"none":""
}

//v1.9986
function respecMasteryToggle() {
	player.respecMastery=!player.respecMastery
	updateRespecButtons()
}

//v1.99861
function getCurrentQCData() {
	if (player.masterystudies==undefined) return []
	if (tmp.qu==undefined) return []
	if (tmp.qu.challenge==undefined) return []
	if (typeof(tmp.qu.challenge)=="number") return [tmp.qu.challenge]
	return tmp.qu.challenge
}

//v1.9987
var bankedEterGain
function updateBankedEter(updateHtml=true) {
	bankedEterGain=0
	if (player.achievements.includes("ng3p15")) bankedEterGain=player.eternities
	if (player.achievements.includes("ng3p73")) bankedEterGain=nA(bankedEterGain,gainEternitiedStat())
	bankedEterGain=nD(bankedEterGain,20)
	if (updateHtml) {
		setAndMaybeShow("bankedEterGain",bankedEterGain>0,'"You will gain "+getFullExpansion(bankedEterGain)+" banked eternities on the next quantum."')
		setAndMaybeShow("eternitiedBank",player.eternitiesBank,'"You have "+getFullExpansion(player.eternitiesBank)+" banked eternities."')
	}
}

//v1.99871
function hatchSpeedDisplay(next) {
	var speed = getHatchSpeed()
	if (next) speed /= 1.1
	if (speed < 1e-24) return shorten(1/speed)+"/s"
	return timeDisplayShort(speed*10, true, 1)
}

function fillAll() {
	var oldLength = player.timestudy.studies.length
	for (t=0;t<all.length;t++) buyTimeStudy(all[t], 0, true)
	if (player.timestudy.studies.length > oldLength) {
		updateTheoremButtons()
		updateTimeStudyButtons()
		drawStudyTree()
		if (player.timestudy.studies.length > 56) $.notify("All studies in the time study tab are now filled.")
	}
}

//v1.99872
function maxAllDilUpgs() {
	let update
	for (var i = 0; i < MAX_DIL_UPG_PRIORITIES.length; i++) {
		var id = "r" + MAX_DIL_UPG_PRIORITIES[i]
		if (isDilUpgUnlocked(id)) {
			if (id == "r1") {	
				var cost=Decimal.pow(10,player.dilation.rebuyables[1]+5)
				if (player.dilation.dilatedTime.gte(cost)) {
					var toBuy=Math.floor(player.dilation.dilatedTime.div(cost).times(9).add(1).log10())
					var toSpend=Decimal.pow(10,toBuy).sub(1).div(9).times(cost)
					player.dilation.dilatedTime=player.dilation.dilatedTime.sub(player.dilation.dilatedTime.min(cost))
					player.dilation.rebuyables[1]+=toBuy
					update=true
				}
			} else if (id == "r2") {
				if (canBuyGalaxyThresholdUpg()) {
					if (speedrunMilestonesReached>21) {
						var cost=Decimal.pow(10,player.dilation.rebuyables[2]*2+6)
						if (player.dilation.dilatedTime.gte(cost)) {
							var toBuy=Math.min(Math.floor(player.dilation.dilatedTime.div(cost).times(99).add(1).log(100)),60-player.dilation.rebuyables[2])
							var toSpend=Decimal.pow(100,toBuy).sub(1).div(99).times(cost)
							player.dilation.dilatedTime=player.dilation.dilatedTime.sub(player.dilation.dilatedTime.min(cost))
							player.dilation.rebuyables[2]+=toBuy
							resetDilationGalaxies()
							update=true
						}
					} else if (buyDilationUpgrade("r2", true, true)) update=true
				}
			} else while (buyDilationUpgrade(id, true, true)) update = true
		}
	}
	if (update) {
		updateDilationUpgradeCosts()
		updateDilationUpgradeButtons()
	}
}

function updateQCTimes() {
	document.getElementById("qcsbtn").style.display = "none"
	if (!player.masterystudies) return
	var temp=0
	var tempcounter=0
	for (var i=1;i<9;i++) {
		setAndMaybeShow("qctime"+i,tmp.qu.challengeRecords[i],'"Quantum Challenge '+i+' time record: "+timeDisplayShort(tmp.qu.challengeRecords['+i+'], false, 3)')
		if (tmp.qu.challengeRecords[i]) {
			temp+=tmp.qu.challengeRecords[i]
			tempcounter++
		}
	}
	if (tempcounter>0) document.getElementById("qcsbtn").style.display = "inline-block"
	setAndMaybeShow("qctimesum",tempcounter>1,'"Sum of completed quantum challenge time records is "+timeDisplayShort('+temp+', false, 3)')
}

//v1.99873
var ranking=0
function updatePCCompletions() {
	var shownormal=false
	document.getElementById("pccompletionsbtn").style.display = "none"
	if (!player.masterystudies) return
	ranking=0
	tmp.pcc={} //PC Completion counters
	for (var c1=2;c1<9;c1++) for (var c2=1;c2<c1;c2++) {
		var rankingPart=0
		if (tmp.qu.pairedChallenges.completions[c2*10+c1]) {
			rankingPart=5-tmp.qu.pairedChallenges.completions[c2*10+c1]
			tmp.pcc.normal=(tmp.pcc.normal||0)+1
		} else if (c2*10+c1==68&&ghostified) {
			rankingPart=0.5
			tmp.pcc.normal=(tmp.pcc.normal||0)+1
		}
		if (tmp.qu.qcsNoDil["pc"+(c2*10+c1)]) {
			rankingPart+=5-tmp.qu.qcsNoDil["pc"+(c2*10+c1)]
			tmp.pcc.noDil=(tmp.pcc.noDil||0)+1
		}
		for (var m=0;m<qcm.modifiers.length;m++) {
			var id=qcm.modifiers[m]
			var data=tmp.qu.qcsMods[id]
			if (data&&data["pc"+(c2*10+c1)]) {
				rankingPart+=5-data["pc"+(c2*10+c1)]
				tmp.pcc[id]=(tmp.pcc[id]||0)+1
				shownormal=true
			}
		}
		ranking+=Math.sqrt(rankingPart)
	}
	ranking*=100/56
	if (ranking) document.getElementById("pccompletionsbtn").style.display = "inline-block"
	if (tmp.pcc.normal>23) giveAchievement("The Challenging Day")
	document.getElementById("pccranking").textContent=ranking.toFixed(1)
	document.getElementById("pccrankingMax").textContent=Math.sqrt(1e4*(2+qcm.modifiers.length)).toFixed(1)
	updatePCTable()
	for (var m=0;m<qcm.modifiers.length;m++) {
		var id=qcm.modifiers[m]
		var shownormal=tmp.qu.qcsMods[id]!==undefined||shownormal
		document.getElementById("qcms_"+id).style.display=tmp.qu.qcsMods[id]!==undefined?"":"none"
	}
	document.getElementById("qcms_normal").style.display=shownormal?"":"none"
	if (ranking>=75) {
		document.getElementById("modifiersdiv").style.display=""
		for (var m=0;m<qcm.modifiers.length;m++) {
			var id=qcm.modifiers[m]
			if (ranking>=qcm.reqs[id]||!qcm.reqs[id]) {
				document.getElementById("qcm_"+id).className=qcm.on.includes(id)?"chosenbtn":"storebtn"
				document.getElementById("qcm_"+id).setAttribute('ach-tooltip', qcm.descs[id]||"???")
			} else {
				document.getElementById("qcm_"+id).className="unavailablebtn"
				document.getElementById("qcm_"+id).setAttribute('ach-tooltip', 'Get '+qcm.reqs[id]+' Paired Challenges ranking to unlock this modifier. Ranking: '+ranking.toFixed(1))
			}
		}
	} else document.getElementById("modifiersdiv").style.display="none"
	if (ranking>=165) giveAchievement("Pulling an All-Nighter")
}

//v1.99874
function getQCReward(num) {
	if (QCIntensity(num) < 1) return 1
	if (num == 1) return Decimal.pow(10, Math.pow(getDimensionFinalMultiplier(1).times(getDimensionFinalMultiplier(2)).max(1).log10(), QCIntensity(1)>1?0.275:0.25)/200)
	if (num == 2) return 1.2 + QCIntensity(2) * 0.2
	if (num == 3) {
		let log=Math.sqrt(Math.max(player.infinityPower.log10(),0)/(QCIntensity(3)>1?2e8:1e9))
		if (log>1331) log=Math.pow(log*121,3/5)
		return Decimal.pow(10,log)
	}
	if (num == 4) {
		let mult = player.meta[2].amount.times(player.meta[4].amount).times(player.meta[6].amount).times(player.meta[8].amount).max(1)
		if (QCIntensity(4) > 1) return mult.pow(1/75)
		return Decimal.pow(10, Math.sqrt(mult.log10())/10)
	}
	if (num == 5) return Math.log10(1 + player.resets) * Math.pow(QCIntensity(5), 0.4)
	if (num == 6) return player.achPow.pow(QCIntensity(6)>1?3:1)
	if (num == 7) return Math.pow(0.975, QCIntensity(7))
	if (num == 8) return QCIntensity(8)+2
}

function maybeShowFillAll() {
	var display = "none"
	if (player.masterystudies) if (player.masterystudies.includes("t302")) display = "block"
	document.getElementById("fillAll").style.display = display
	document.getElementById("fillAll2").style.display = display
}

//v1.999
function getTotalReplicants(data) {
	if (data === undefined) return tmp.twr.add(tmp.qu.replicants.amount).round()
	else return getTotalWorkers(data).add(data.quantum.replicants.amount).round()
}

function feedReplicant(tier, max) {
	if (!canFeedReplicant(tier)) return
	var toFeed = max ? Math.min(tmp.qu.replicants.quantumFood, tmp.qu.replicants.limitDim > tier ? Math.round(getWorkerAmount(tier - 1).toNumber() * 3) : Math.round((tmp.qu.replicants.limit - tmp.eds[tier].perm - tmp.eds[tier].progress.toNumber()) * 3)) : 1
	if (tmp.qu.replicants.limitDim > tier) tmp.qu.replicants.quantumFoodCost=tmp.qu.replicants.quantumFoodCost.div(Decimal.pow(5, toFeed))
	tmp.eds[tier].progress=tmp.eds[tier].progress.add(toFeed/3)
	if (tier<8||getWorkerAmount(tier+1).eq(0)) tmp.eds[tier].progress=tmp.eds[tier].progress.times(3).round().div(3)
	if (tmp.eds[tier].progress.gte(1)) {
		var toAdd=tmp.eds[tier].progress.floor()
		if (tier>1) tmp.eds[tier-1].workers=tmp.eds[tier-1].workers.sub(toAdd.min(tmp.eds[tier-1].workers)).round()
		else tmp.qu.replicants.amount=tmp.qu.replicants.amount.sub(toAdd.min(tmp.qu.replicants.amount)).round()
		tmp.eds[tier].progress=tmp.eds[tier].progress.sub(tmp.eds[tier].progress.min(toAdd))
		tmp.eds[tier].workers=tmp.eds[tier].workers.add(toAdd).round()
		tmp.eds[tier].perm = Math.min(tmp.eds[tier].perm + Math.round(toAdd.toNumber()), tier > 7 ? 1/0 : 10)
		if (tier==2) giveAchievement("An ant office?")
	}
	tmp.qu.replicants.quantumFood -= toFeed
	updateReplicants("spend")
}

function getWorkerAmount(tier) {
	if (tier<1) return tmp.qu.replicants.amount
	if (tier>8) return new Decimal(0)
	return tmp.eds[tier].workers
}

function getTotalWorkers(data) {
	if (data) {
		if (data.quantum.emperorDimensions == undefined) return new Decimal(data.quantum.replicants.workers)
		data = data.quantum.emperorDimensions
	} else data = tmp.eds
	var total = new Decimal(0)
	for (var d=1; d<9; d++) total = total.add(data[d].workers)
	return total.round()
}

function buyMaxQuantumFood() {
	let minGluons = tmp.qu.gluons.rg.min(tmp.qu.gluons.gb).min(tmp.qu.gluons.br)
	let toBuy = Math.floor(minGluons.div(tmp.qu.replicants.quantumFoodCost).times(4).add(1).log(5))
	if (toBuy < 1) return
	let toSpend = Decimal.pow(5, toBuy).minus(1).div(4).times(tmp.qu.replicants.quantumFoodCost)
	tmp.qu.gluons.rg = tmp.qu.gluons.rg.sub(tmp.qu.gluons.rg.min(toSpend))
	tmp.qu.gluons.gb = tmp.qu.gluons.gb.sub(tmp.qu.gluons.gb.min(toSpend))
	tmp.qu.gluons.br = tmp.qu.gluons.br.sub(tmp.qu.gluons.br.min(toSpend))
	tmp.qu.replicants.quantumFood += toBuy
	tmp.qu.replicants.quantumFoodCost = tmp.qu.replicants.quantumFoodCost.times(Decimal.pow(5, toBuy))
	updateGluonsTabOnUpdate("spend")
	updateReplicants("spend")
}

function canFeedReplicant(tier, auto) {
	if (tmp.qu.replicants.quantumFood<1 && !auto) return false
	if (tier>1) {
		if (tmp.eds[tier].workers.gte(tmp.eds[tier-1].workers)) return auto && hasNU(2)
		if (tmp.eds[tier-1].workers.lte(10)) return false
	} else {
		if (tmp.eds[1].workers.gte(tmp.qu.replicants.amount)) return auto && hasNU(2)
		if (tmp.qu.replicants.amount.eq(0)) return false
	}
	if (tier>tmp.qu.replicants.limitDim) return false
	if (tier==tmp.qu.replicants.limitDim) return getWorkerAmount(tier).lt(tmp.qu.replicants.limit)
	return true
}

function isLimitUpgAffordable() {
	if (!player.masterystudies.includes("d11")) return tmp.qu.replicants.limit < 10
	return true
}

function getLimitMsg() {
	if (!player.masterystudies.includes("d11")) return tmp.qu.replicants.limit
	return getFullExpansion(tmp.qu.replicants.limit)+" ED"+tmp.qu.replicants.limitDim+"s"
}

function getNextLimitMsg() {
	if (!player.masterystudies.includes("d11")) return tmp.qu.replicants.limit+1
	if (tmp.qu.replicants.limit > 9 && tmp.qu.replicants.limitDim < 8) return "1 ED"+(tmp.qu.replicants.limitDim+1)+"s"
	return getFullExpansion(tmp.qu.replicants.limit+1)+" ED"+tmp.qu.replicants.limitDim+"s"
}

function getHatchSpeed() {
	var speed = tmp.qu.replicants.hatchSpeed
	if (player.masterystudies.includes("t361")) speed /= getMTSMult(361)
	if (player.masterystudies.includes("t371")) speed /= getMTSMult(371)
	if (player.masterystudies.includes("t372")) speed /= getMTSMult(372)
	if (player.masterystudies.includes("t381")) speed /= getMTSMult(381)
	if (player.masterystudies.includes("t391")) speed /= getMTSMult(391)
	if (player.masterystudies.includes("d12") && !hasBosonicUpg(21)) speed /= getNanofieldRewardEffect(1, "speed")
	if (player.masterystudies.includes("t402")) speed /= 30
	return speed
}

function updateEmperorDimensions() {
	let production = getGatherRate()
	let mults = {}
	let limitDim = tmp.qu.replicants.limitDim
	document.getElementById("rgEDs").textContent=shortenDimensions(tmp.qu.gluons.rg)
	document.getElementById("gbEDs").textContent=shortenDimensions(tmp.qu.gluons.gb)
	document.getElementById("brEDs").textContent=shortenDimensions(tmp.qu.gluons.br)
	document.getElementById("replicantAmountED").textContent=shortenDimensions(tmp.qu.replicants.amount)
	for (d=1;d<=8;d++) mults[d] = getEmperorDimensionMultiplier(d)
	for (d=1;d<=8;d++) {
		if (d > limitDim) document.getElementById("empRow" + d).style.display = "none"
		else {
			document.getElementById("empRow"+d).style.display = ""
			document.getElementById("empD"+d).textContent = DISPLAY_NAMES[d] + " Emperor Dimension x" + formatValue(player.options.notation, mults[d], 2, 1)
			document.getElementById("empAmount"+d).textContent = d<limitDim?shortenDimensions(tmp.eds[d].workers)+" (+"+shorten(getEmperorDimensionRateOfChange(d))+dimDescEnd:getFullExpansion(tmp.eds[limitDim].perm)
			document.getElementById("empQuarks"+d).textContent = shorten(production.workers[d])
			document.getElementById("empFeed"+d).className=(canFeedReplicant(d)?"stor":"unavailabl")+"ebtn"
			document.getElementById("empFeed"+d).textContent="Feed ("+(d == limitDim || mults[d + 1].times(tmp.eds[d + 1].workers).div(20).lt(1e3) ? Math.round(tmp.eds[d].progress.toNumber() * 100) + "%, " : "")+getFullExpansion(tmp.eds[d].perm)+" kept)"
			document.getElementById("empFeedMax"+d).className=(canFeedReplicant(d)?"stor":"unavailabl")+"ebtn"
		}
	}
	document.getElementById("totalWorkers").textContent = shortenDimensions(tmp.twr)
	document.getElementById("totalQuarkProduction").textContent = shorten(production.workersTotal)
	if (player.ghostify.milestones>7) updateReplicants("display")
}

//v1.9995
function maxReduceHatchSpeed() {
	let minGluons = tmp.qu.gluons.rg.min(tmp.qu.gluons.gb).min(tmp.qu.gluons.br)
	let toBuy = Math.floor(minGluons.div(tmp.qu.replicants.hatchSpeedCost).times(9).add(1).log10())
	if (toBuy < 1) return
	let toSpend = Decimal.pow(10, toBuy).minus(1).div(9).times(tmp.qu.replicants.hatchSpeedCost)
	if (toSpend.gt(tmp.qu.gluons.rg)) tmp.qu.gluons.rg = new Decimal(0)
	else tmp.qu.gluons.rg = tmp.qu.gluons.rg.sub(toSpend)
	if (toSpend.gt(tmp.qu.gluons.gb)) tmp.qu.gluons.gb = new Decimal(0)
	else tmp.qu.gluons.gb = tmp.qu.gluons.gb.sub(toSpend)
	if (toSpend.gt(tmp.qu.gluons.br)) tmp.qu.gluons.br = new Decimal(0)
	else tmp.qu.gluons.br = tmp.qu.gluons.br.sub(toSpend)
	tmp.qu.replicants.hatchSpeed /= Math.pow(1.1, toBuy)
	tmp.qu.replicants.hatchSpeedCost = tmp.qu.replicants.hatchSpeedCost.times(Decimal.pow(10, toBuy))
	updateGluonsTabOnUpdate()
	updateReplicants()
}

function getQuarkChargeProduction(noSpeed) {
	let ret = getNanofieldRewardEffect(7, "charge")
	if (hasNU(3)) ret = ret.times(tmp.nu[1])
	if (hasNU(7)) ret = ret.times(tmp.nu[3])
	if (!noSpeed) {
		ret = ret.times(tmp.ns)
		if (tmp.qu.nanofield.power > tmp.apgw) ret = ret.div(Decimal.pow(2, (tmp.qu.nanofield.power - tmp.apgw) / 2))
	}
	return ret
}

function startProduceQuarkCharge() {
	tmp.qu.nanofield.producingCharge = !tmp.qu.nanofield.producingCharge
	document.getElementById("produceQuarkCharge").innerHTML="S" + (tmp.qu.nanofield.producingCharge ? "top" : "tart") + " production of preon charge." + (tmp.qu.nanofield.producingCharge ? "" : "<br>(Preon production is disabled while producing preon charge)")
}

function getQuarkLossProduction() {
	let ret = getQuarkChargeProduction(true).pow(4).times(4e25)
	if (hasNU(3)) ret = ret.div(10)
	if (tmp.qu.nanofield.power > tmp.apgw) ret = ret.pow((tmp.qu.nanofield.power-tmp.apgw)/5+1)
	ret = ret.times(tmp.ns)
	return ret
}

function getQuarkEnergyProduction() {
	let ret = tmp.qu.nanofield.charge.sqrt()
	if (player.masterystudies.includes("t411")) ret = ret.times(getMTSMult(411))
	if (player.masterystudies.includes("t421")) ret = ret.times(getMTSMult(421))
	ret = ret.times(getNanofieldRewardEffect(8, "energy"))
	ret = ret.times(tmp.ns)
	return ret
}

function getQuarkAntienergyProduction() {
	let ret = tmp.qu.nanofield.charge.sqrt()
	if (player.masterystudies.includes("t401")) ret = ret.div(getMTSMult(401))
	if (tmp.qu.nanofield.power > tmp.apgw) ret = ret.times(Decimal.pow(2, (tmp.qu.nanofield.power - tmp.apgw) / 2))
	ret = ret.times(tmp.ns)
	return ret
}

function getQuarkChargeProductionCap() {
	return tmp.qu.nanofield.charge.times(2500).sqrt()
}

function getNanofieldRewardEffect(id, effect) {
	let tier = getNanofieldRewardTier(id, tmp.qu.nanofield.rewards)
	if (id == 1) {
		if (effect == "supersonic") return Math.floor(Math.max(tier - 3.5, 0) * 75e5)
		if (effect == "speed") return Decimal.pow(30, tier)
	}
	if (id == 2) return tier * 6.8
	if (id == 3) return 1 + Math.pow(tier, 0.83) * 0.039
	if (id == 4) return 0.1 + Math.sqrt(tier) * 0.021
	if (id == 5) return 1 + tier * 0.36
	if (id == 6) return 3 + tier * 1.34
	if (id == 7) {
		if (effect == "remote") return tier * 2150
		if (effect == "charge") return Decimal.pow(2.6, tier)
		if (effect == "neutrinos") return Decimal.pow(1e10, tier)
	}
	if (id == 8) {
		if (effect == "per-10") return tier * 0.76
		if (effect == "energy") return tier ? 2.5 : 1
	}
}

function updateAutoQuantumMode() {
	if (tmp.qu.autobuyer.mode == "amount") {
		document.getElementById("toggleautoquantummode").textContent = "Auto quantum mode: amount"
		document.getElementById("autoquantumtext").textContent = "Amount of QK to wait until reset:"
	} else if (tmp.qu.autobuyer.mode == "relative") {
		document.getElementById("toggleautoquantummode").textContent = "Auto quantum mode: X times last quantum"
		document.getElementById("autoquantumtext").textContent = "X times last quantum:"
	} else if (tmp.qu.autobuyer.mode == "time") {
		document.getElementById("toggleautoquantummode").textContent = "Auto quantum mode: time"
		document.getElementById("autoquantumtext").textContent = "Seconds between quantums:"
	} else if (tmp.qu.autobuyer.mode == "peak") {
		document.getElementById("toggleautoquantummode").textContent = "Auto quantum mode: peak"
		document.getElementById("autoquantumtext").textContent = "Seconds to wait after latest peak gain:"
	} else if (tmp.qu.autobuyer.mode == "dilation") {
		document.getElementById("toggleautoquantummode").textContent = "Auto quantum mode: # of dilated"
		document.getElementById("autoquantumtext").textContent = "Wait until # of dilated stat:"
	}
}

function toggleAutoQuantumMode() {
	if (tmp.qu.reachedInfQK && tmp.qu.autobuyer.mode == "amount") tmp.qu.autobuyer.mode = "relative"
	else if (tmp.qu.autobuyer.mode == "relative") tmp.qu.autobuyer.mode = "time"
	else if (tmp.qu.autobuyer.mode == "time") tmp.qu.autobuyer.mode = "peak"
	else if (player.achievements.includes("ng3p25") && tmp.qu.autobuyer.mode != "dilation") tmp.qu.autobuyer.mode = "dilation"
	else tmp.qu.autobuyer.mode = "amount"
	updateAutoQuantumMode()
}

//v1.9997
function updateTODStuff() {
	if (player.masterystudies ? !player.masterystudies.includes("d13") : true) {
		document.getElementById("todtabbtn").style.display="none"
		return
	} else {
		document.getElementById("todtabbtn").style.display=""
		giveAchievement("Do protons decay?")
	}
	var colors=["red","green","blue"]
	var shorthands=["r","g","b"]
	for (var c=0;c<3;c++) {
		var color=colors[c]
		var shorthand=shorthands[c]
		var branch=tmp.qu.tod[shorthand]
		var name=getUQName(shorthand)
		document.getElementById(shorthand+"UQName").textContent=name
		for (var b=1;b<4;b++) {
			document.getElementById(color+"upg"+b+"current").textContent=shortenDimensions(Decimal.pow(b>2?4:2,b>1?getBranchUpgLevel(shorthand,b):getBU1Power(shorthand)*(1+getRadioactiveDecays(shorthand)/10)))
			document.getElementById(color+"upg"+b+"cost").textContent=shortenMoney(getBranchUpgCost(shorthand,b))
			if (b>1) document.getElementById(color+"UpgName"+b).textContent=name
		}
		if (ghostified) {
			document.getElementById(shorthand+"RadioactiveDecay").parentElement.parentElement.style.display=""
			document.getElementById(shorthand+"RDReq").textContent="(requires "+shorten(Decimal.pow(10,Math.pow(2,50)))+" of "+color+" "+getUQName(shorthand)+" quarks)"
			document.getElementById(shorthand+"RDLvl").textContent=getFullExpansion(getRadioactiveDecays(shorthand))
		} else document.getElementById(shorthand+"RadioactiveDecay").parentElement.parentElement.style.display="none"
	}
}

function showBranchTab(tabName) {
	//iterate over all elements in div_tab class. Hide everything that's not tabName and show tabName
	var tabs = document.getElementsByClassName('branchtab');
	var tab;
	var oldTab
	for (var i = 0; i < tabs.length; i++) {
		tab = tabs.item(i);
		if (tab.style.display == 'block') oldTab = tab.id
		if (tab.id === tabName + "Branch") {
			tab.style.display = 'block';
		} else {
			tab.style.display = 'none';
		}
	}
	if (oldTab !== tabName) player.aarexModifications.tabsSave.tabBranch = tabName
	closeToolTip()
}

function getUnstableGain(branch) {
	let ret=tmp.qu.usedQuarks[branch].div("1e420").add(1).log10()
	if (ret<2) ret=Math.max(tmp.qu.usedQuarks[branch].div("1e300").div(99).log10()/60,0)
	let power=getBranchUpgLevel(branch,2)-getRDPower(branch)
	ret=Decimal.pow(2,power).times(ret)
	if (ret.gt(1)) ret=Decimal.pow(ret, Math.pow(2,power+1))
	return ret.times(Decimal.pow(2,getRDPower(branch)+1)).min(Decimal.pow(10,Math.pow(2,51)))
}

function unstableQuarks(branch) {
	if (tmp.qu.usedQuarks[branch].eq(0)||getUnstableGain(branch).lte(tmp.qu.tod[branch].quarks)) return
	tmp.qu.tod[branch].quarks=tmp.qu.tod[branch].quarks.max(getUnstableGain(branch))
	if (player.ghostify.milestones<4) tmp.qu.usedQuarks[branch]=new Decimal(0)
	updateColorCharge()
	updateQuantumWorth()
}

function getDecayRate(branch) {
	let ret = Decimal.pow(2,getBU1Power(branch)*Math.max(getRadioactiveDecays(branch)*.1+.8,1)-getBranchUpgLevel(branch,3)*2-getRDPower(branch)-4)
	if (branch=="r") {
		if (GUBought("rg8")) ret = ret.div(getGU8Effect("rg"))
	}
	if (branch=="g") {
		if (GUBought("gb8")) ret = ret.div(getGU8Effect("gb"))
	}
	if (branch=="b") {
		if (GUBought("br8")) ret = ret.div(getGU8Effect("br"))
	}
	ret = ret.times(getTreeUpgradeEffect(3))
	ret = ret.times(getTreeUpgradeEffect(5))
	if (player.masterystudies.includes("t431")) ret = ret.times(getMTSMult(431))
	if (player.ghostify.milestones>13) ret = ret.times(10)
	if (hasNU(4)) ret = ret.times(tmp.nu[2])
	if (tmp.qu.bigRip.active && isBigRipUpgradeActive(19)) ret = ret.times(tmp.bru[4])
	return ret.min(Math.pow(2,40)).times(todspeed)
}

function getQuarkSpinProduction(branch) {
	let ret=Decimal.pow(2,getBU1Power(branch)*(1+getRadioactiveDecays(branch)/10)).times(getTreeUpgradeEffect(3)).times(getTreeUpgradeEffect(5))
	if (player.masterystudies.includes("t431")) ret=ret.times(getMTSMult(431))
	if (player.ghostify.milestones>13) ret=ret.times(10)
	if (hasNU(4)) ret=ret.times(tmp.nu[2].pow(2))
	if (tmp.qu.bigRip.active) {
		if (isBigRipUpgradeActive(18)) ret=ret.times(tmp.bru[3])
		if (isBigRipUpgradeActive(19)) ret=ret.times(tmp.bru[4])
		if (hasNU(12)) ret=ret.times(tmp.nu[4].normal)
	}
	ret=ret.times(todspeed)
	return ret
}

function getTreeUpgradeCost(upg,add) {
	lvl=getTreeUpgradeLevel(upg)
	if (add!==undefined) lvl+=add
	if (upg==1) return Decimal.pow(2,lvl*2+Math.max(lvl-35,0)*(lvl-34)/2).times(50)
	if (upg==2) return Decimal.pow(4,lvl*(lvl+3)/2).times(600)
	if (upg==3) return Decimal.pow(32,lvl).times(3e9)
	if (upg==4) return Decimal.pow(2,lvl+Math.max(lvl-37,0)*(lvl-36)/2).times(1e12)
	if (upg==5) return Decimal.pow(2,lvl+Math.max(lvl-35,0)*(lvl-34)/2).times(4e12)
	if (upg==6) return Decimal.pow(4,lvl*(lvl+3)/2).times(6e22)
	if (upg==7) return Decimal.pow(16,lvl*lvl).times(4e22)
	if (upg==8) return Decimal.pow(2,lvl).times(3e23)
	return 0
}

function canBuyTreeUpg(upg) {
	var shorthands=["r","g","b"]
	return getTreeUpgradeCost(upg).lte(tmp.qu.tod[shorthands[getTreeUpgradeLevel(upg)%3]].spin)
}

function buyTreeUpg(upg) {
	if (!canBuyTreeUpg(upg)) return
	var colors=["red","green","blue"]
	var shorthands=["r","g","b"]
	var branch=tmp.qu.tod[shorthands[getTreeUpgradeLevel(upg)%3]]
	branch.spin=branch.spin.sub(getTreeUpgradeCost(upg))
	if (!tmp.qu.tod.upgrades[upg]) tmp.qu.tod.upgrades[upg]=0
	tmp.qu.tod.upgrades[upg]++
}

function getTreeUpgradeLevel(upg) {
	return tmp.qu.tod.upgrades[upg]||0
}

function getTreeUpgradeEffect(upg) {
	let lvl=getTreeUpgradeLevel(upg)*tmp.tue
	if (upg==1) return Math.floor(lvl * 30)
	if (upg==2) {
		if (lvl > 64) lvl = (lvl + 128) / 3
		return lvl * 0.25
	}
	if (upg==3) {
		if (lvl<1) return 1
		let power=0
		for (var upg=1;upg<9;upg++) power+=getTreeUpgradeLevel(upg)
		return Decimal.pow(2,Math.sqrt(Math.sqrt(Math.max(lvl*3-2,0)) * Math.max(power-10,0)))
	}
	if (upg==4) return Math.sqrt(1 + Math.log10(lvl * 0.5 + 1) * 0.1)
	if (upg==5) return Math.pow(Math.log10(player.meta.bestOverQuantums.add(1).log10()+1)/5+1,Math.sqrt(lvl))
	if (upg==6) return Decimal.pow(2, lvl)
	if (upg==7) return Decimal.pow(player.replicanti.amount.max(1).log10()+1, 0.25*lvl)
	if (upg==8) return Math.log10(Decimal.add(player.meta.bestAntimatter,1).log10()+1)/4*Math.sqrt(lvl)
	return 0
}

function getTreeUpgradeEffectDesc(upg) {
	if (upg==1) return getFullExpansion(getTreeUpgradeEffect(upg))
	if (upg==2) return getDilExp("TU3").toFixed(2) + " -> " + getDilExp().toFixed(2)
	if (upg==4) return "^" + getFullExpansion(Math.round(getMPTExp("noTree"))) + " -> ^" + getFullExpansion(Math.round(tmp.mpte))
	if (upg==8) return getTreeUpgradeEffect(8).toFixed(2)
	return shortenMoney(getTreeUpgradeEffect(upg))
}

var branchUpgCostScales = [[300, 15], [50, 8], [4e7, 7]]
function getBranchUpgCost(branch, upg) {
	var lvl = getBranchUpgLevel(branch, upg)
	var scale = branchUpgCostScales[upg-1]
	return Decimal.pow(2, lvl * upg + Math.max(lvl - scale[1], 0) * Math.max(3 - upg, 1)).times(scale[0])
}

function buyBranchUpg(branch,upg) {
	var colors={r:"red",g:"green",b:"blue"}
	var bData=tmp.qu.tod[branch]
	if (bData.spin.lt(getBranchUpgCost(branch,upg))) return
	bData.spin=bData.spin.sub(getBranchUpgCost(branch,upg))
	if (bData.upgrades[upg]==undefined) bData.upgrades[upg]=0
	bData.upgrades[upg]++
	document.getElementById(colors[branch]+"upg"+upg+"current").textContent=shortenDimensions(Decimal.pow(upg>2?4:2,upg>1?getBranchUpgLevel(branch,upg):getBU1Power(branch)*(1+getRadioactiveDecays(branch)/10)))
	document.getElementById(colors[branch]+"upg"+upg+"cost").textContent=shortenMoney(getBranchUpgCost(branch, upg))
}

function getBranchUpgLevel(branch,upg) {
	upg=tmp.qu.tod[branch].upgrades[upg]
	if (upg) return upg
	return 0
}

function toggleAutoReset() {
	tmp.qu.autoOptions.replicantiReset = !tmp.qu.autoOptions.replicantiReset
	document.getElementById('autoReset').textContent="Auto: O"+(tmp.qu.autoOptions.replicantiReset?"N":"FF")
}

//v2
function autoECToggle() {
	tmp.qu.autoEC=!tmp.qu.autoEC
	document.getElementById("autoEC").className=tmp.qu.autoEC?"timestudybought":"storebtn"
}

function getELCMult() {
	let ret=tmp.qu.electrons.mult
	if (hasNU(5)) ret*=3
	return ret
}

function toggleRG4Upg() {
	tmp.qu.rg4=!tmp.qu.rg4
	document.getElementById('rg4toggle').textContent="Toggle: O"+(tmp.qu.rg4?"N":"FF")
}

function updateElectronsEffect() {
	if (!tmp.qu.autoOptions.sacrifice) {
		tmp.mpte=getMPTExp()
		document.getElementById("electronsAmount2").textContent="You have " + getFullExpansion(Math.round(tmp.qu.electrons.amount)) + " electrons."
	}
	document.getElementById("sacrificedGals").textContent=getFullExpansion(tmp.qu.electrons.sacGals)
	document.getElementById("electronsAmount").textContent=getFullExpansion(Math.round(tmp.qu.electrons.amount))
	document.getElementById("electronsTranslation").textContent=getFullExpansion(Math.round(tmp.mpte))
	document.getElementById("electronsEffect").textContent = shorten(getDimensionPowerMultiplier("non-random"))
	document.getElementById("linearPerTenMult").textContent = shorten(getDimensionPowerMultiplier("linear"))
}

function maxBuyLimit() {
	var min=tmp.qu.gluons.rg.min(tmp.qu.gluons.gb).min(tmp.qu.gluons.br)
	if (!min.gte(tmp.qu.replicants.limitCost)&&isLimitUpgAffordable()) return
	for (var i=0;i<(player.masterystudies.includes("d11")?3:1);i++) {
		if (i==1) {
			var toAdd=Math.floor(min.div(tmp.qu.replicants.limitCost).log(200)/9)
			if (toAdd) {
				var toSpend=Decimal.pow(200,toAdd*9).times(tmp.qu.replicants.limitCost)
				tmp.qu.gluons.rg=tmp.qu.gluons.rg.sub(tmp.qu.gluons.rg.min(toSpend))
				tmp.qu.gluons.gb=tmp.qu.gluons.gb.sub(tmp.qu.gluons.gb.min(toSpend))
				tmp.qu.gluons.br=tmp.qu.gluons.br.sub(tmp.qu.gluons.br.min(toSpend))
				tmp.qu.replicants.limitCost=tmp.qu.replicants.limitCost.times(Decimal.pow(200,toAdd*9))
				tmp.qu.replicants.limit+=toAdd*10
			}
		} else {
			var limit=tmp.qu.replicants.limit
			var toAdd=Math.max(Math.min(Math.floor(min.div(tmp.qu.replicants.limitCost).times(199).add(1).log(200)),10-limit%10),0)
			var toSpend=Decimal.pow(200,toAdd).sub(1).div(199).round().times(tmp.qu.replicants.limitCost)
			tmp.qu.gluons.rg=tmp.qu.gluons.rg.sub(tmp.qu.gluons.rg.min(toSpend))
			tmp.qu.gluons.gb=tmp.qu.gluons.gb.sub(tmp.qu.gluons.gb.min(toSpend))
			tmp.qu.gluons.br=tmp.qu.gluons.br.sub(tmp.qu.gluons.br.min(toSpend))
			tmp.qu.replicants.limitCost=tmp.qu.replicants.limitCost.times(Decimal.pow(200,Math.max(Math.min(toAdd,9-limit%10),0)))
			tmp.qu.replicants.limit+=toAdd
		}
		var dimAdd=Math.max(Math.min(Math.ceil(tmp.qu.replicants.limit/10-1),8-tmp.qu.replicants.limitDim),0)
		if (dimAdd>0) {
			tmp.qu.replicants.limit-=dimAdd*10
			tmp.qu.replicants.limitDim+=dimAdd
		}
		min=tmp.qu.gluons.rg.min(tmp.qu.gluons.gb).min(tmp.qu.gluons.br)
		if (!min.gte(tmp.qu.replicants.limitCost)&&isLimitUpgAffordable()) break
	}
	updateGluonsTabOnUpdate()
	updateReplicants()
}

var nanospeed=1
var todspeed=1

function rotateAutoAssign() {
	tmp.qu.autoOptions.assignQKRotate=tmp.qu.autoOptions.assignQKRotate?(tmp.qu.autoOptions.assignQKRotate+1)%3:1
	document.getElementById('autoAssignRotate').textContent="Rotation: "+(tmp.qu.autoOptions.assignQKRotate>1?"Left":tmp.qu.autoOptions.assignQKRotate?"Right":"None")
}

function unstableAll() {
	var colors=["r","g","b"]
	for (c=0;c<3;c++) {
		var bData=tmp.qu.tod[colors[c]]
		if (tmp.qu.usedQuarks[colors[c]].gt(0)&&getUnstableGain(colors[c]).gt(bData.quarks)) {
			bData.quarks=bData.quarks.max(getUnstableGain(colors[c]))
			if (player.ghostify.milestones<4) tmp.qu.usedQuarks[colors[c]]=new Decimal(0)
		}
	}
	updateColorCharge()
	updateQuantumWorth()
}

function getUQName(shorthand) {
	let ret="unstable"
	if (tmp.qu.tod[shorthand].decays!==undefined) {
		let amt=tmp.qu.tod[shorthand].decays
		if (amt>4) ret="ghostly"+(amt>9?"^"+Math.floor(amt/5):"")+" "+ret
		if (amt%5) ret=(["radioactive","infinity","eternal","quantum"])[amt%5-1]+" "+ret
	}
	return ret
}

function maxTreeUpg() {
	var update=false
	var colors=["r","g","b"]
	var todData=tmp.qu.tod
	for (u=1;u<9;u++) {
		var cost=getTreeUpgradeCost(u)
		var newSpins=[]
		var lvl=getTreeUpgradeLevel(u)
		var min
		for (c=0;c<3;c++) {
			min=todData[colors[c]].spin.min(c?min:1/0)
			newSpins[c]=todData[colors[c]].spin
		}
		if (newSpins[lvl%3].gte(cost)) {
			var increment=1
			while (newSpins[(lvl+increment-1)%3].gte(getTreeUpgradeCost(u,increment-1))) increment*=2
			var toBuy=0
			while (increment>=1) {
				if (newSpins[(lvl+toBuy+increment-1)%3].gte(getTreeUpgradeCost(u,toBuy+increment-1))) toBuy+=increment
				increment/=2
			}
			var cost=getTreeUpgradeCost(u,toBuy-1)
			var toBuy2=toBuy
			while (toBuy>0&&newSpins[(lvl+toBuy-1)%3].div(cost).lt(1e16)) {
				if (newSpins[(lvl+toBuy-1)%3].gte(cost)) newSpins[(lvl+toBuy-1)%3]=newSpins[(lvl+toBuy-1)%3].sub(cost)
				else {
					newSpins[(lvl+toBuy-1)%3]=todData[colors[(lvl+toBuy-1)%3]].spin.sub(cost)
					toBuy2--
				}
				toBuy--
				cost=getTreeUpgradeCost(u,toBuy-1)
			}
			if (toBuy2) {
				for (c=0;c<3;c++) todData[colors[c]].spin=isNaN(newSpins[c].e)?new Decimal(0):newSpins[c]
				todData.upgrades[u]=toBuy2+(todData.upgrades[u]===undefined?0:todData.upgrades[u])
				update=true
			}
		}
	}
}

function maxBranchUpg(branch, weak) {
	var colors={r:"red",g:"green",b:"blue"}
	var bData=tmp.qu.tod[branch]
	for (var u=(weak?2:1);u<4;u++) {
		var oldLvl=getBranchUpgLevel(branch,u)
		var scaleStart=branchUpgCostScales[u-1][1]
		var cost=getBranchUpgCost(branch,u)
		if (bData.spin.gte(cost)&&oldLvl<scaleStart) {
			var costMult=Math.pow(2,u)
			var toAdd=Math.min(Math.floor(bData.spin.div(cost).times(costMult-1).add(1).log(costMult)),scaleStart-oldLvl)
			bData.spin=bData.spin.sub(Decimal.pow(costMult,toAdd).sub(1).div(costMult).times(cost).min(bData.spin))
			if (bData.upgrades[u]===undefined) bData.upgrades[u]=0
			bData.upgrades[u]+=toAdd
			cost=getBranchUpgCost(branch,u)
		}
		if (bData.spin.gte(cost)&&bData.upgrades[u]>=scaleStart) {
			var costMult=Math.pow(2,u+Math.max(3-u,1))
			var toAdd=Math.floor(bData.spin.div(cost).times(costMult-1).add(1).log(costMult))
			bData.spin=bData.spin.sub(Decimal.pow(costMult,toAdd).sub(1).div(costMult).times(cost).min(bData.spin))
			if (bData.upgrades[u]===undefined) bData.upgrades[u]=0
			bData.upgrades[u]+=toAdd
		}
		if (bData.upgrades[u]>oldLvl) {
			document.getElementById(colors[branch]+"upg"+u+"current").textContent=shortenDimensions(Decimal.pow(u>2?4:2,bData.upgrades[u]))
			document.getElementById(colors[branch]+"upg"+u+"cost").textContent=shortenMoney(getBranchUpgCost(branch,u))
		}
	}
}

function radioactiveDecay(shorthand) {
	let data=tmp.qu.tod[shorthand]
	if (!data.quarks.gte(Decimal.pow(10,Math.pow(2,50)))) return
	data.quarks=new Decimal(0)
	data.spin=new Decimal(0)
	data.upgrades={}
	if (player.ghostify.milestones>3) data.upgrades[1]=5
	data.decays=data.decays===undefined?1:data.decays+1
	let sum=0
    for (var c=0;c<3;c++) sum+=getRadioactiveDecays((['r','g','b'])[c])
	if (sum>9) giveAchievement("Radioactive Decaying to the max!")
	updateTODStuff()
}

function getRadioactiveDecays(shorthand) {
	let data=tmp.qu.tod[shorthand]
	return data.decays===undefined?0:data.decays
}

function openAfterEternity() {
	showEternityTab("autoEternity")
	showTab("eternitystore")
}

function toggleABEter() {
	document.getElementById("eternityison").checked=!player.eternityBuyer.isOn
	updateAutobuyers()
}

function updateAutoEterValue() {
	document.getElementById("priority13").value=document.getElementById("autoEterValue").value
	updatePriorities()
}

function toggleAutoEterIfAD() {
	player.eternityBuyer.ifAD=!player.eternityBuyer.ifAD
	document.getElementById("autoEterIfAD").textContent="Auto-eternity only if able to auto-dilate: O" + (player.eternityBuyer.ifAD ? "N" : "FF")
}

function toggleAutoDil() {
	document.getElementById("dilatedeternityison").checked=!player.eternityBuyer.dilationMode	
	updateAutobuyers()
}

function updateAutoDilValue() {
	document.getElementById("prioritydil").value=document.getElementById("autoDilValue").value
	updatePriorities()
}

function changeAutoDilateMode() {
	if (player.eternityBuyer.dilMode == "amount") player.eternityBuyer.dilMode = "upgrades"
	else player.eternityBuyer.dilMode = "amount"
	document.getElementById("autodilatemode").textContent = "Mode: " + (player.eternityBuyer.dilMode == "amount" ? "Amount of eternities" : "Upgrades")
}

function toggleSlowStop() {
	player.eternityBuyer.slowStop = !player.eternityBuyer.slowStop
	player.eternityBuyer.slowStopped = false
	document.getElementById("slowstop").textContent = "Stop auto-dilate if a little bit of TP is gained: O" + (player.eternityBuyer.slowStop ? "N" : "FF")
}

function toggleAPs() {
	player.eternityBuyer.presets.on = !player.eternityBuyer.presets.on
	document.getElementById("toggleAP").textContent = player.eternityBuyer.presets.on ? "Disable" : "Enable"
}

var apLoaded = false
var apInterval
var loadedAPs = 0
function loadAP() {
	if (apLoaded) return
	apLoaded = true
	loadedAPs = 0
	document.getElementById("automatedPresets").innerHTML = ""
	occupied = false
	apInterval = setInterval(function() {
		if (occupied) return
		occupied = true
		if (loadedAPs == player.eternityBuyer.presets.order.length) {
			clearInterval(apInterval)
			return
		} else if (!onLoading) {
			latestRow = document.getElementById("automatedPresets").insertRow(loadedAPs)
			onLoading = true
		}
		try {
			latestRow.innerHTML = '<td id="apselected'+loadedAPs+'"></td><td><b id="apname'+loadedAPs+'"></b><br># of eternities: <input id="apeternities'+loadedAPs+'" type="text" onchange="changeAPEternities('+loadedAPs+')" value=2></input><button class="storebtn" onclick="selectNextAP('+loadedAPs+')">Select next</button> <button class="storebtn" onclick="moveAP('+loadedAPs+', -1)">Move up</button> <button class="storebtn" onclick="moveAP('+loadedAPs+', 1)">Move down</button> <button class="storebtn" onclick="renameAP('+loadedAPs+')">Rename</button> <button class="storebtn" onclick="replaceAP('+loadedAPs+')">Replace</button> <button id="apdisable'+loadedAPs+'" class="storebtn" onclick="disableAP('+loadedAPs+')"></button> <button class="storebtn"onclick="removeAP('+loadedAPs+')">Remove</button></td>'
			changeAPOptions(player.eternityBuyer.presets.order[loadedAPs],loadedAPs)
			loadedAPs++
			onLoading = false
		} catch (_) {}
		occupied = false
	}, 0)
	if (player.eternityBuyer.presets.dil === undefined) {
		document.getElementById("apDilSelected").textContent = ""
		document.getElementById("apDil").innerHTML = '<b>Empty Dilation preset</b><br>(Dilating time selects this)<br><button class="storebtn" onclick="createAP(false, \'dil\')">Add preset</button> <button class="storebtn" onclick="createAP(true, \'dil\')">Import preset</button>'
	} else {
		document.getElementById("apDil").innerHTML = '<b id="apnamedil"></b><br>(Dilating time selects this)<br><button class="storebtn" onclick="renameAP(\'dil\')">Rename</button> <button class="storebtn" onclick="replaceAP(\'dil\')">Replace</button> <button id="apdisabledil" class="storebtn" onclick="disableAP(\'dil\')"></button>'
		changeAPOptions('dil')
	}
	if (player.eternityBuyer.presets.grind === undefined) {
		document.getElementById("apGrindSelected").textContent = ""
		document.getElementById("apGrind").innerHTML = '<b>Empty grind preset</b><br>(Eternitying with <1% log(EP) gain selects this)<br><button class="storebtn" onclick="createAP(false, \'grind\')">Add preset</button> <button class="storebtn" onclick="createAP(true, \'dil\')">Import preset</button>'
	} else {
		document.getElementById("apGrind").innerHTML = '<b id="apnamegrind"></b><br>(Eternitying with <1% log(EP) gain selects this)<br><button class="storebtn" onclick="renameAP(\'grind\')">Rename</button> <button class="storebtn" onclick="replaceAP(\'grind\')">Replace</button> <button id="apdisablegrind" class="storebtn" onclick="disableAP(\'grind\')"></button>'
		changeAPOptions('grind')
	}
}

function changeAPOptions(id, placement) {
	if (id=="grind") {
		let name="Unnamed grind preset"
		let apData=player.eternityBuyer.presets.grind
		if (apData.title!="") name=apData.title
		document.getElementById("apnamegrind").textContent=name
		document.getElementById("apdisablegrind").textContent=apData.on?"Disable":"Enable"
		document.getElementById("apGrindSelected").textContent=player.eternityBuyer.presets.selected=="grind"?">>":""
	} else if (id=="dil") {
		let name="Unnamed Dilation preset"
		let apData=player.eternityBuyer.presets.dil
		if (apData.title!="") name=apData.title
		document.getElementById("apnamedil").textContent=name
		document.getElementById("apdisabledil").textContent=apData.on?"Disable":"Enable"
		document.getElementById("apDilSelected").textContent=player.eternityBuyer.presets.selected=="dil"?">>":""
	} else {
		let name="#"+(placement+1)
		let pointer=""
		let apData=player.eternityBuyer.presets[id]
		if (apData.title!="") name=apData.title
		document.getElementById("apname"+placement).textContent=name
		document.getElementById("apeternities"+placement).value=apData.length
		document.getElementById("apdisable"+placement).textContent=apData.on?"Disable":"Enable"
		if (placement==player.eternityBuyer.presets.selected) pointer=">>"
		else if (placement==player.eternityBuyer.presets.selectNext) pointer=">"
		document.getElementById("apselected"+placement).textContent=pointer
	}
}

function changeAPEternities(id) {
	let value=parseInt(document.getElementById("apeternities"+id).value)
	if (!isNaN(value)) if (value>0) player.eternityBuyer.presets[player.eternityBuyer.presets.order[id]].length=value
}

function createAP(importing, type) {
	if (importing) {
		onImport=true
		var input=prompt()
		if (input===null) return
		onImport=false
	} else {
		var mtsstudies=[]
		for (var id2=0;id2<player.masterystudies.length;id2++) {
			var t = player.masterystudies[id2].split("t")[1]
			if (t) mtsstudies.push(t)
		}
		var input=player.timestudy.studies+(mtsstudies.length>0?","+mtsstudies:"")+"|"+player.eternityChallUnlocked
	}
	var id=1
	if (type) id=type
	else {
		while (player.eternityBuyer.presets.order.includes(id)) id++
		player.eternityBuyer.presets.order.push(id)
	}
	player.eternityBuyer.presets[id]={title:"",preset:input,length:1,on:true}
	if (type=="grind") {
		document.getElementById("apGrind").innerHTML = '<b id="apnamegrind"></b><br>(Eternitying with <1% log(EP) gain selects this)<br><button class="storebtn" onclick="renameAP(\'grind\')">Rename</button> <button class="storebtn" onclick="replaceAP(\'grind\')">Replace</button> <button id="apdisablegrind" class="storebtn" onclick="disableAP(\'grind\')"></button>'
		changeAPOptions('grind')
		$.notify("Grind preset created", "info")
	} else if (type) {
		document.getElementById("apDil").innerHTML = '<b id="apnamedil"></b><br>(Dilating time selects this)<br><button class="storebtn" onclick="renameAP(\'dil\')">Rename</button> <button class="storebtn" onclick="replaceAP(\'dil\')">Replace</button> <button id="apdisabledil" class="storebtn" onclick="disableAP(\'dil\')"></button>'
		changeAPOptions('dil')
		$.notify("Dilation preset created", "info")
	} else {
		if (loadedAPs+1==player.eternityBuyer.presets.order.length) {
			let latestRow=document.getElementById("automatedPresets").insertRow(loadedAPs)
			latestRow.innerHTML='<td id="apselected'+loadedAPs+'"></td><td><b id="apname'+loadedAPs+'"></b><br># of eternities: <input id="apeternities'+loadedAPs+'" type="text" onchange="changeAPEternities('+loadedAPs+')" value=2></input><button class="storebtn" onclick="selectNextAP('+loadedAPs+')">Select next</button> <button class="storebtn" onclick="moveAP('+loadedAPs+', -1)">Move up</button> <button class="storebtn" onclick="moveAP('+loadedAPs+', 1)">Move down</button> <button class="storebtn" onclick="renameAP('+loadedAPs+')">Rename</button> <button class="storebtn" onclick="replaceAP('+loadedAPs+')">Replace</button> <button id="apdisable'+loadedAPs+'" class="storebtn" onclick="disableAP('+loadedAPs+')"></button> <button class="storebtn"onclick="removeAP('+loadedAPs+')">Remove</button></td>'
			changeAPOptions(id,loadedAPs)
			loadedAPs++
		}
		$.notify("Preset #"+player.eternityBuyer.presets.order.length+" created", "info")
	}
}

function selectNextAP(id) {
	if (player.eternityBuyer.presets.selected==id) return
	if (player.eternityBuyer.presets.selectNext==id) return
	if (player.eternityBuyer.presets.selectNext>-1) document.getElementById("apselected"+player.eternityBuyer.presets.selectNext).textContent=""
	document.getElementById("apselected"+id).textContent=">"
	player.eternityBuyer.presets.selectNext=id
}

function moveAP(id, offset) {
	var apData=player.eternityBuyer.presets
	var orderData=apData.order
	if (offset>0) {
		if (id+offset>=orderData.length) return
	} else if (id+offset<0) return
	var storedCell=orderData[id+offset]
	orderData[id+offset]=orderData[id]
	orderData[id]=storedCell
	if (apData.selected==id) apData.selected=id+offset
	else if (apData.selected==id+offset) apData.selected=id
	if (apData.selectNext==id) apData.selectNext=id+offset
	else if (apData.selectNext==id+offset) apData.selectNext=id
	changeAPOptions(orderData[id],id)
	changeAPOptions(orderData[id+offset],id+offset)
	$.notify("Preset #"+(id+1)+" moved", "info")
}

function renameAP(id) {
	onImport=true
	var input=prompt()
	if (input===null) return
	onImport=false
	if (id=="grind") {
		player.eternityBuyer.presets.grind.title=input
		changeAPOptions('grind')
		$.notify("Grind preset renamed", "info")
	} else if (id=="dil") {
		player.eternityBuyer.presets.dil.title=input
		changeAPOptions('dil')
		$.notify("Dilation preset renamed", "info")
	} else {
		player.eternityBuyer.presets[player.eternityBuyer.presets.order[id]].title=input
		changeAPOptions(player.eternityBuyer.presets.order[id],id)
		$.notify("Preset #"+(id+1)+" renamed", "info")
	}
}

function replaceAP(id) {
	onImport=true
	var input=prompt()
	if (input===null) return
	onImport=false
	if (id=="grind") {
		player.eternityBuyer.presets.grind.preset=input
		$.notify("Grind preset replaced", "info")
	} else if (id=="dil") {
		player.eternityBuyer.presets.dil.preset=input
		$.notify("Dilation preset replaced", "info")
	} else {
		player.eternityBuyer.presets[player.eternityBuyer.presets.order[id]].preset=input
		$.notify("Preset #"+(id+1)+" replaced", "info")
	}
}

function disableAP(id) {
	let apData=player.eternityBuyer.presets[typeof(id)=="number"?player.eternityBuyer.presets.order[id]:id]
	apData.on=!apData.on
	document.getElementById("apdisable"+id).textContent=apData.on?"Disable":"Enable"
}

function removeAP(id) {
	var order=player.eternityBuyer.presets.order
	var newOrder=[]
	for (var i=0;i<order.length;i++) {
		if (i==id) {
            document.getElementById("automatedPresets").deleteRow(i)
			loadedAPs--
			if (player.eternityBuyer.presets.selected==i) player.eternityBuyer.presets.selected=-1
			if (player.eternityBuyer.presets.selectNext==i&&i+1==order.length&&order.length>1) {
				player.eternityBuyer.presets.selectNext=0
				document.getElementById("apselected0").textContent=">"
			}
			if (player.eternityBuyer.presets.selectNext>i) player.eternityBuyer.presets.selectNext--
			if (player.eternityBuyer.presets.reselect==i) delete player.eternityBuyer.presets.reselect
			delete player.eternityBuyer.presets[order[i]]
		} else newOrder.push(order[i])
		if (i>id) {
			let row=document.getElementById("automatedPresets").rows[i-1]
			let j=i-1
			row.innerHTML='<td id="apselected'+j+'"></td><td><b id="apname'+j+'"></b><br># of eternities: <input id="apeternities'+j+'" type="text" onchange="changeAPEternities('+j+')" value=2></input><button class="storebtn" onclick="selectNextAP('+j+')">Select next</button> <button class="storebtn" onclick="moveAP('+j+', -1)">Move up</button> <button class="storebtn" onclick="moveAP('+j+', 1)">Move down</button> <button class="storebtn" onclick="renameAP('+j+')">Rename</button> <button class="storebtn" onclick="replaceAP('+j+')">Replace</button> <button id="apdisable'+j+'" class="storebtn" onclick="disableAP('+j+')"></button> <button class="storebtn"onclick="removeAP('+j+')">Remove</button></td>'
			changeAPOptions(order[i],j)
		}
	}
	player.eternityBuyer.presets.order=newOrder
	$.notify("Preset #"+(id+1)+" removed", "info")
}

function bigRip(auto) {
	if (!player.masterystudies.includes("d14")||tmp.qu.electrons.amount<62500||!inQC(0)) return
	if (player.ghostify.milestones>1) {
		tmp.qu.pairedChallenges.order={1:[1,2],2:[3,4],3:[5,7],4:[6,8]}
		tmp.qu.pairedChallenges.completed=4
		for (var c=1;c<9;c++) {
			tmp.qu.electrons.mult+=(2-tmp.qu.challenges[c])*0.25
			tmp.qu.challenges[c]=2
		}
		quantum(auto,true,12,true,true)
	} else {
		for (var p=1;p<5;p++) {
			var pcData=tmp.qu.pairedChallenges.order[p]
			if (pcData) {
				var pc1=Math.min(pcData[0],pcData[1])
				var pc2=Math.max(pcData[0],pcData[1])
				if (pc1==6&&pc2==8) {
					if (p-1>tmp.qu.pairedChallenges.completed) return
					quantum(auto,true,p+8,true,true)
				}
			}
		}
	}
}

function toggleBigRipConf() {
	tmp.qu.bigRip.conf = !tmp.qu.bigRip.conf
	document.getElementById("bigRipConfirmBtn").textContent = "Big Rip confirmation: O" + (tmp.qu.bigRip.conf ? "N" : "FF")
}

function switchAB() {
	var bigRip = tmp.qu.bigRip.active
	tmp.qu.bigRip["savedAutobuyers" + (bigRip ? "" : "No") + "BR"] = {}
	var data = tmp.qu.bigRip["savedAutobuyers" + (bigRip ? "" : "No") + "BR"]
	for (d=1;d<9;d++) if (player.autobuyers[d-1] % 1 !== 0) data["d"+d] = {
		priority: player.autobuyers[d-1].priority,
		perTen: player.autobuyers[d-1].target > 10,
		on: player.autobuyers[d-1].isOn,
	}
	if (player.autobuyers[8] % 1 !== 0) data.tickspeed = {
		priority: player.autobuyers[8].priority,
		max: player.autobuyers[8].target == 10,
		on: player.autobuyers[8].isOn
	}
	if (player.autobuyers[9] % 1 !== 0) data.dimBoosts = {
		maxDims: player.autobuyers[9].priority,
		always: player.overXGalaxies,
		bulk: player.autobuyers[9].bulk,
		on: player.autobuyers[9].isOn
	}
	if (player.tickspeedBoosts !== undefined) if (player.autobuyers[13] % 1 !== 0) data.tickBoosts = {
		maxDims: player.autobuyers[13].priority,
		always: player.overXGalaxiesTickspeedBoost,
		bulk: player.autobuyers[13].bulk,
		on: player.autobuyers[13].isOn
	}
	if (player.galacticSacrifice !== undefined) if (player.autobuyers[12] % 1 !== 0) data.galSacrifice = {
		amount: player.autobuyers[12].priority,
		on: player.autobuyers[12].isOn
	}
	if (player.autobuyers[11] % 1 !== 0) data.crunch = {
		mode: player.autoCrunchMode,
		amount: new Decimal(player.autobuyers[11].priority),
		on: player.autobuyers[11].isOn
	}
	data.eternity = {
		mode: player.autoEterMode,
		amount: player.eternityBuyer.limit,
		dilation: player.eternityBuyer.dilationMode,
		dilationPerStat: player.eternityBuyer.dilationPerAmount,
		dilMode: player.eternityBuyer.dilMode,
		tpUpgraded: player.eternityBuyer.tpUpgraded,
		slowStop: player.eternityBuyer.slowStop,
		slowStopped: player.eternityBuyer.slowStopped,
		ifAD: player.eternityBuyer.ifAD,
		presets: Object.assign({}, player.eternityBuyer.presets),
		on: player.eternityBuyer.isOn
	}
	data.eternity.presets.order = []
	for (var i=0;i<player.eternityBuyer.presets.order.length;i++) {
		var id=player.eternityBuyer.presets.order[i]
		data.eternity.presets[id]=Object.assign({},player.eternityBuyer.presets[id])
		data.eternity.presets.order.push(id)
	}
	if (data.eternity.presets.dil!==undefined) data.eternity.presets.dil=Object.assign({},data.eternity.presets.dil)
	if (data.eternity.presets.grind!==undefined) data.eternity.presets.grind=Object.assign({},data.eternity.presets.grind)
	var data = tmp.qu.bigRip["savedAutobuyers" + (bigRip ? "No" : "") + "BR"]
	for (var d=1;d<9;d++) if (data["d"+d]) player.autobuyers[d-1] = {
		interval: player.autobuyers[d-1].interval,
		cost: player.autobuyers[d-1].cost,
		bulk: player.autobuyers[d-1].bulk,
		priority: data["d"+d].priority,
		tier: d,
		target: d + (data["d"+d].perTen ? 10 : 0),
		ticks: 0,
		isOn: data["d"+d].on
	}
	if (data.tickspeed) player.autobuyers[8] = {
		interval: player.autobuyers[8].interval,
		cost: player.autobuyers[8].cost,
		bulk: 1,
		priority: data.tickspeed.priority,
		tier: 1,
		target: player.autobuyers[8].target,
		ticks: 0,
		isOn: data.tickspeed.on
	}
	if (data.dimBoosts) {
		player.autobuyers[9] = {
			interval: player.autobuyers[9].interval,
			cost: player.autobuyers[9].cost,
			bulk: data.dimBoosts.bulk,
			priority: data.dimBoosts.maxDims,
			tier: 1,
			target: 11,
			ticks: 0,
			isOn: data.dimBoosts.on
		}
		player.overXGalaxies = data.dimBoosts.always
	}
	if (data.tickBoosts) {
		player.autobuyers[13] = {
			interval: player.autobuyers[13].interval,
			cost: player.autobuyers[13].cost,
			bulk: data.tickBoosts.bulk,
			priority: data.tickBoosts.maxDims,
			tier: 1,
			target: 14,
			ticks: 0,
			isOn: data.tickBoosts.on
		}
		player.overXGalaxiesTickspeedBoost = data.tickBoosts.always
	}
	if (data.galacticSacrifice) player.autobuyers[12] = {
		interval: player.autobuyers[12].interval,
		cost: player.autobuyers[12].cost,
		bulk: 1,
		priority: data.galacticSacrifice.amount,
		tier: 1,
		target: 13,
		ticks: 0,
		isOn: data.galacticSacrifice.on
	}
	if (data.crunch) {
		player.autobuyers[11] = {
			interval: player.autobuyers[11].interval,
			cost: player.autobuyers[11].cost,
			bulk: 1,
			priority: new Decimal(data.crunch.amount),
			tier: 1,
			target: 12,
			ticks: 0,
			isOn: data.crunch.on
		}
		player.autoCrunchMode = data.crunch.mode
	}
	if (data.eternity) {
		player.eternityBuyer = {
			limit: data.eternity.amount,
			dilationMode: data.eternity.dilation,
			dilationPerAmount: data.eternity.dilationPerStat,
			statBeforeDilation: data.eternity.dilationPerStat,
			dilMode: data.eternity.dilMode ? data.eternity.dilMode : "amount",
			tpUpgraded: data.eternity.tpUpgraded ? data.eternity.tpUpgraded : false,
			slowStop: data.eternity.slowStop ? data.eternity.slowStop : false,
			slowStopped: data.eternity.slowStopped ? data.eternity.slowStopped : false,
			ifAD: data.eternity.ifAD ? data.eternity.ifAD : false,
			presets: data.eternity.presets ? data.eternity.presets : {on: false, autoDil: false, selected: -1, selectNext: 0, left: 1, order: []},
			isOn: data.eternity.on
		}
		if (player.eternityBuyer.presets.selectNext === undefined) {
			player.eternityBuyer.presets.selected = -1
			player.eternityBuyer.presets.selectNext = 0
		}
		if (player.eternityBuyer.presets.left === undefined) player.eternityBuyer.presets.left = 1
		player.autoEterMode = data.eternity.mode
	}
	tmp.qu.bigRip["savedAutobuyers" + (bigRip ? "No" : "") + "BR"] = {}
	updateCheckBoxes()
	loadAutoBuyerSettings()
	if (player.autoCrunchMode == "amount") {
		document.getElementById("togglecrunchmode").textContent = "Auto crunch mode: amount"
		document.getElementById("limittext").textContent = "Amount of IP to wait until reset:"
	} else if (player.autoCrunchMode == "time") {
		document.getElementById("togglecrunchmode").textContent = "Auto crunch mode: time"
		document.getElementById("limittext").textContent = "Seconds between crunches:"
	} else {
		document.getElementById("togglecrunchmode").textContent = "Auto crunch mode: X times last crunch"
		document.getElementById("limittext").textContent = "X times last crunch:"
	}
	updateAutoEterMode()
}

function unstoreTT() {
	if (tmp.qu.bigRip.storedTS===undefined) return
	player.timestudy.theorem=tmp.qu.bigRip.storedTS.tt
	player.timestudy.amcost=Decimal.pow(10,2e4*(tmp.qu.bigRip.storedTS.boughtA+1))
	player.timestudy.ipcost=Decimal.pow(10,100*tmp.qu.bigRip.storedTS.boughtI)
	player.timestudy.epcost=Decimal.pow(2,tmp.qu.bigRip.storedTS.boughtE)
	var newTS=[]
	var newMS=[]
	var studies=tmp.qu.bigRip.storedTS.studies
	for (var s=0;s<studies.length;s++) {
		var num=studies[s]
		if (typeof(num)=="string") num=parseInt(num)
		if (num<240) newTS.push(num)
		else newMS.push("t"+num)
	}
	for (var s=7;s<15;s++) if (player.masterystudies.includes("d"+s)) newMS.push("d"+s)
	player.timestudy.studies=newTS
	player.masterystudies=newMS
	updateBoughtTimeStudies()
	performedTS=false
	updateTheoremButtons()
	drawStudyTree()
	maybeShowFillAll()
	drawMasteryTree()
	updateMasteryStudyButtons()
	delete tmp.qu.bigRip.storedTS
}

function getSpaceShardsGain() {
	let ret = tmp.qu.bigRip.active ? tmp.qu.bigRip.bestThisRun : player.money
	ret = Decimal.pow(ret.add(1).log10()/2000, 1.5).times(player.dilation.dilatedTime.add(1).pow(0.05))
	if (!tmp.qu.bigRip.active || tmp.be) {
		if (tmp.qu.breakEternity.upgrades.includes(3)) ret = ret.times(getBreakUpgMult(3))
		if (tmp.qu.breakEternity.upgrades.includes(6)) ret = ret.times(getBreakUpgMult(6))
	}
	if (hasNU(9)) ret = ret.times(Decimal.max(getEternitied(), 1).pow(0.1))
	ret = ret.floor()
	if (player.aarexModifications.ngudpV !== undefined) {
		let log=ret.log10()
		let log4log=Math.log10(log)/Math.log10(4)
		let start=5 //Starts at e1,024.
		if (player.aarexModifications.nguepV) start++ //Starts at e4,096.
		if (player.aarexModifications.ngumuV) start-- //Starts at e256. (NGUd*' only)
		if (log4log>start) {
			let capped=Math.min(Math.floor(Math.log10(Math.max(log4log+2-start,1))/Math.log10(2)),10-start)
			log4log=(log4log-Math.pow(2,capped)-start+2)/Math.pow(2,capped)+capped+start-1
			log=Math.pow(4,log4log)
		}
		if (log>Math.pow(2,20)) log=Math.pow(Math.log2(log)+12,4)
		ret=Decimal.pow(10,log)
	}
	if (isNaN(ret.e)) return new Decimal(0)
	return ret
}

let bigRipUpgCosts = [0, 2, 3, 5, 20, 30, 45, 60, 150, 300, 2000, 3e9, 3e14, 1e17, 3e18, 3e20, 5e22, 1e33, 1e145, 1e150, 1e160]
function buyBigRipUpg(id) {
	if (tmp.qu.bigRip.spaceShards.lt(bigRipUpgCosts[id])||tmp.qu.bigRip.upgrades.includes(id)) return
	tmp.qu.bigRip.spaceShards=tmp.qu.bigRip.spaceShards.sub(bigRipUpgCosts[id])
	if (player.ghostify.milestones < 8) tmp.qu.bigRip.spaceShards=tmp.qu.bigRip.spaceShards.round()
	tmp.qu.bigRip.upgrades.push(id)
	document.getElementById("spaceShards").textContent = shortenDimensions(tmp.qu.bigRip.spaceShards)
	if (tmp.qu.bigRip.active) tweakBigRip(id, true)
	if (id==10 && !tmp.qu.bigRip.upgrades.includes(9)) {
		tmp.qu.bigRip.upgrades.push(9)
		if (tmp.qu.bigRip.active) tweakBigRip(9, true)
	}
	for (var u=1;u<18;u++) document.getElementById("bigripupg"+u).className = tmp.qu.bigRip.upgrades.includes(u) ? "gluonupgradebought bigrip" + (isBigRipUpgradeActive(u, true) ? "" : "off") : tmp.qu.bigRip.spaceShards.lt(bigRipUpgCosts[u]) ? "gluonupgrade unavailablebtn" : "gluonupgrade bigrip"
}

function tweakBigRip(id, reset) {
	if (id == 2) {
		for (var ec=1;ec<15;ec++) player.eternityChalls["eterc"+ec] = 5
		player.eternities = Math.max(player.eternities, 1e5)
		if (!reset) updateEternityChallenges()
	}
	if (!tmp.qu.bigRip.upgrades.includes(9)) {
		if (id == 3) player.timestudy.theorem += 5
		if (id == 5) player.timestudy.theorem += 20
		if (id == 7 && !player.timestudy.studies.includes(192)) player.timestudy.studies.push(192)
	}
	if (id == 9) {
		if (reset) player.timestudy = {
			theorem: 0,
			amcost: new Decimal("1e20000"),
			ipcost: new Decimal(1),
			epcost: new Decimal(1),
			studies: []
		}
		if (!tmp.qu.bigRip.upgrades.includes(12)) player.timestudy.theorem += 1350
	}
	if (id == 10) {
		if (!player.dilation.studies.includes(1)) player.dilation.studies.push(1)
		if (reset) {
			showTab("eternitystore")
			showEternityTab("dilation")
		}
	}
	if (id == 11) {
		if (reset) player.timestudy = {
			theorem: 0,
			amcost: new Decimal("1e20000"),
			ipcost: new Decimal(1),
			epcost: new Decimal(1),
			studies: []
		}
		if (!inQCModifier("ad")) {
			player.dilation.tachyonParticles = player.dilation.tachyonParticles.max(player.dilation.bestTP.sqrt())
			player.dilation.totalTachyonParticles = player.dilation.totalTachyonParticles.max(player.dilation.bestTP.sqrt())
		}
	}
}

function isBigRipUpgradeActive(id, bigRipped) {
	if (player.masterystudies == undefined) return false
	if (bigRipped === undefined ? !tmp.qu.bigRip.active : !bigRipped) return false
	if (id == 1) if (!tmp.qu.bigRip.upgrades.includes(17)) for (var u=3;u<18;u++) if (tmp.qu.bigRip.upgrades.includes(u)) return false
	if (id > 2 && id != 4 && id < 9) if (tmp.qu.bigRip.upgrades.includes(9) && (id != 8 || !hasNU(11))) return false
	if (id == 4) if (tmp.qu.bigRip.upgrades.includes(11)) return false
	return tmp.qu.bigRip.upgrades.includes(id)
}

function updateBreakEternity() {
	if (player.masterystudies === undefined) {
		document.getElementById("breakEternityTabbtn").style.display = "none"
		return
	}
	document.getElementById("breakEternityTabbtn").style.display = tmp.qu.bigRip.active || tmp.qu.breakEternity.unlocked ? "" : "none"
	if (tmp.qu.breakEternity.unlocked) {
		document.getElementById("breakEternityReq").style.display = "none"
		document.getElementById("breakEternityShop").style.display = ""
		document.getElementById("breakEternityNoBigRip").style.display = tmp.qu.bigRip.active ? "none" : ""
		document.getElementById("breakEternityBtn").textContent = (tmp.qu.breakEternity.break ? "FIX" : "BREAK") + " ETERNITY"
		for (var u=1;u<(player.ghostify.ghostlyPhotons.unl?11:8);u++) document.getElementById("breakUpg" + u + "Cost").textContent = shortenDimensions(getBreakUpgCost(u))
		document.getElementById("breakUpg7MultIncrease").textContent = shortenDimensions(1e9)
		document.getElementById("breakUpg7Mult").textContent = shortenDimensions(getBreakUpgMult(7))
		document.getElementById("breakUpgRS").style.display = tmp.qu.bigRip.active ? "" : "none"
	} else {
		document.getElementById("breakEternityReq").style.display = ""
		document.getElementById("breakEternityReq").textContent = "You need to get " + shorten(new Decimal("1e1215")) + " EP before you can Break Eternity."
		document.getElementById("breakEternityNoBigRip").style.display = "none"
		document.getElementById("breakEternityShop").style.display = "none"
	}
}

function breakEternity() {
	tmp.qu.breakEternity.break = !tmp.qu.breakEternity.break
	tmp.qu.breakEternity.did = true
	document.getElementById("breakEternityBtn").textContent = (tmp.qu.breakEternity.break ? "FIX" : "BREAK") + " ETERNITY"
	giveAchievement("Time Breaker")
	if (tmp.qu.bigRip.active) {
		tmp.be = tmp.qu.breakEternity.break
		updateTemp()
		if (!tmp.be && document.getElementById("timedimensions").style.display == "block") showDimTab("antimatterdimensions")
	}
	if (!player.dilation.active && isSmartPeakActivated) {
		EPminpeakType = 'normal'
		EPminpeak = new Decimal(0)
		player.peakSpent = 0
	}
}

function getEMGain() {
	let log=player.timeShards.div(1e9).log10()*0.25
	if (log>15) log=Math.sqrt(log*15)
	if (player.aarexModifications.ngudpV !== undefined) {
		let log2log=Math.log10(log)/Math.log10(2)
		let start=9 //Starts at e512.
		if (player.aarexModifications.nguepV !== undefined) start=11 //Starts at e2,048.
		if (log2log>start) {
			let capped=Math.min(Math.floor(Math.log10(Math.max(log2log+2-start,1))/Math.log10(2)),20-start)
			log2log=(log2log-Math.pow(2,capped)-start+2)/Math.pow(2,capped)+capped+start-1
			log=Math.pow(2,log2log)
		}
	}
	return Decimal.pow(10,log).floor()
}

var breakUpgCosts = [1, 1e3, 2e6, 2e11, 8e17, 1e48, null, 1e290, new Decimal("1e350"), new Decimal("1e375")]
function getBreakUpgCost(id) {
	if (id == 7) return Decimal.pow(2, tmp.qu.breakEternity.epMultPower).times(1e6)
	return breakUpgCosts[id-1]
}

function buyBreakUpg(id) {
	if (!tmp.qu.breakEternity.eternalMatter.gte(getBreakUpgCost(id)) || tmp.qu.breakEternity.upgrades.includes(id)) return
	tmp.qu.breakEternity.eternalMatter = tmp.qu.breakEternity.eternalMatter.sub(getBreakUpgCost(id))
	if (player.ghostify.milestones < 15) tmp.qu.breakEternity.eternalMatter = tmp.qu.breakEternity.eternalMatter.round()
	if (id == 7) {
		tmp.qu.breakEternity.epMultPower++
		document.getElementById("breakUpg7Mult").textContent = shortenDimensions(getBreakUpgMult(7))
		document.getElementById("breakUpg7Cost").textContent = shortenDimensions(getBreakUpgCost(7))
	} else tmp.qu.breakEternity.upgrades.push(id)
	document.getElementById("eternalMatter").textContent = shortenDimensions(tmp.qu.breakEternity.eternalMatter)
}

function getBreakUpgMult(id) {
	if (id == 1) {
		var log1 = player.eternityPoints.div("1e1280").add(1).log10()
		var log2 = tmp.qu.breakEternity.eternalMatter.times(10).max(1).log10()
		return Decimal.pow(10, Math.pow(log1, 1/3) * 0.5 + Math.pow(log2, 1/3)).max(1)
	}
	if (id == 2) {
		var log = player.eternityPoints.div("1e1290").add(1).log10()
		return Math.pow(Math.log10(log + 1) * 1.6 + 1, player.currentEternityChall == "eterc10" ? 1 : 2)
	}
	if (id == 3) {
		var log = player.eternityPoints.div("1e1370").add(1).log10()
		if (!tmp.be && hasBosonicUpg(24)) log /= 2e6
		return Decimal.pow(10, Math.pow(log, 1/3) * 0.5)
	}
	if (id == 4) {
		var log1 = player.eternityPoints.div("1e1860").add(1).log10()
		var log2 = tmp.qu.bigRip.spaceShards.div("7e19").add(1).log10()
		return Decimal.pow(10, Math.pow(log1, 1/3) + Math.pow(log2, 1/3) * 8)
	}
	if (id == 5) {
		var log1 = player.eternityPoints.div("1e2230").add(1).log10()
		var log2 = player.timeShards.div(1e90).add(1).log10()
		var log = Math.pow(log1, 1/3) + Math.pow(log2, 1/3)
		if (log>100&&player.aarexModifications.ngudpV) log = Math.log10(log)*50
		return Decimal.pow(1e4, log)
	}
	if (id == 6) {
		var log1 = player.eternityPoints.div("1e4900").add(1).log10()
		var log2 = tmp.qu.breakEternity.eternalMatter.div(1e45).add(1).log10()
		if (!tmp.be && hasBosonicUpg(24)) log1 /= 2e6
		return Decimal.pow(10, Math.pow(log1, 1/3) / 1.7 + Math.pow(log2, 1/3) * 2)
	}
	if (id == 7) return Decimal.pow(1e9, tmp.qu.breakEternity.epMultPower)
	if (id == 8) {
		var effect=Math.log10(player.dilation.tachyonParticles.div(1e200).add(1).log10()/100+1)*3+1
		if (effect>2.2&&player.aarexModifications.ngudpV!==undefined) {
			effect=1.2+Math.log10(effect+7.8)
			if (player.aarexModifications.nguepV===undefined) effect=1.2+Math.log10(effect+7.8)
		}
		return effect
	}
	if (id == 9) {
		var effect = tmp.qu.breakEternity.eternalMatter.div("1e335").add(1).pow(0.05*Math.log10(4))
		if (player.aarexModifications.ngudpV && effect.gte(Decimal.pow(10,100))) effect = Decimal.pow(Decimal.log10(effect),50)
		return effect.toNumber()
	}
	if (id == 10) return Math.max(Math.log10(player.eternityPoints.add(1).log10()+1)-1,1)
}

function maxBuyBEEPMult() {
	let cost=getBreakUpgCost(7)
	if (!tmp.qu.breakEternity.eternalMatter.gte(cost)) return
	let toBuy=Math.floor(tmp.qu.breakEternity.eternalMatter.div(cost).add(1).log(2))
	let toSpend=Decimal.pow(2,toBuy).sub(1).times(cost).min(tmp.qu.breakEternity.eternalMatter)
	tmp.qu.breakEternity.epMultPower+=toBuy
	tmp.qu.breakEternity.eternalMatter=tmp.qu.breakEternity.eternalMatter.sub(toSpend)
	if (player.ghostify.milestones < 15) tmp.qu.breakEternity.eternalMatter = tmp.qu.breakEternity.eternalMatter.round()
	document.getElementById("eternalMatter").textContent = shortenDimensions(tmp.qu.breakEternity.eternalMatter)
	document.getElementById("breakUpg7Mult").textContent = shortenDimensions(getBreakUpgMult(7))
	document.getElementById("breakUpg7Cost").textContent = shortenDimensions(getBreakUpgCost(7))
}

function getGHPGain() {
	if (!tmp.ngp3 || !tmp.qu.bigRip.active) return new Decimal(0)
	if (!tmp.ngp3l && !ghostified) return new Decimal(1)
	let log=(tmp.qu.bigRip.bestThisRun.log10()/getQCGoal()-1)
	if (tmp.ngp3l) log*=2
	else log+=(player.quantum.quarks.add(1).log10()-0)*0
	if (log>1e4&&player.aarexModifications.ngudpV!=undefined) log=Math.sqrt(log*1e4)
	if (player.aarexModifications.nguepV!=undefined) {
		if (log>2e4) log=Math.pow(4e8*log,1/3)
		if (log>59049) log=Math.pow(Math.log10(log)/Math.log10(9)+4,5)
	}
	return Decimal.pow(10, log).times(Decimal.pow(2,player.ghostify.multPower-1)).floor()
}

ghostified = false
function ghostify(auto, force) {
	if (!force&&(!isQuantumReached()||!tmp.qu.bigRip.active||implosionCheck)) return
	if (!auto && !force && player.aarexModifications.ghostifyConf && !confirm("Becoming a ghost resets everything quantum resets, and also resets your banked stats, best TP & MA, quarks, gluons, electrons, Quantum Challenges, Replicants, Nanofield, and Tree of Decay to gain a Ghost Particle. Are you ready for this?")) {
		denyGhostify()
		return
	}
	if (!ghostified && (!confirm("This is just one more confirmation to make sure you're prepared. Once you ghostify, it will take time to recover. Are you ready?"))) {
		denyGhostify()
		return
	}
	var implode = player.options.animations.ghostify && !force
	if (implode) {
		var gain = getGHPGain()
		var amount = player.ghostify.ghostParticles.add(gain).round()
		var seconds = ghostified ? 4 : 10
		implosionCheck=1
		dev.ghostify(gain, amount, seconds)
		setTimeout(function(){
			isEmptiness = true
			showTab("")
		}, seconds * 250)
		setTimeout(function(){
			if (Math.random()<1e-3) giveAchievement("Boo!")
			ghostifyReset(true, gain, amount)
		}, seconds * 500)
		setTimeout(function(){
			implosionCheck=0
		}, seconds * 1000)
	} else ghostifyReset(false, 0, 0, force)
}

var ghostifyDenied
function denyGhostify() {
	ghostifyDenied++
	if (!tmp.ngp3l && ghostifyDenied >= 15) giveAchievement("You are supposed to become a ghost!")
}

function ghostifyReset(implode, gain, amount, force) {
	var bulk = getGhostifiedGain()
	if (!force) {
		if (!tmp.ngp3l && tmp.qu.times >= 1e3 && player.ghostify.milestones >= 16) giveAchievement("Scared of ghosts?")
		if (!implode) {
			var gain = getGHPGain()
			player.ghostify.ghostParticles = player.ghostify.ghostParticles.add(gain).round()
		} else player.ghostify.ghostParticles = amount
		for (var i=player.ghostify.last10.length-1; i>0; i--) player.ghostify.last10[i] = player.ghostify.last10[i-1]
		player.ghostify.last10[0] = [player.ghostify.time, gain]
		player.ghostify.times = nA(player.ghostify.times, bulk)
		player.ghostify.best = Math.min(player.ghostify.best, player.ghostify.time)
		if (player.ghostify.times != 1) { // to prevent people from getting brave milestones too early
		while (tmp.qu.times<=tmp.bm[player.ghostify.milestones]) player.ghostify.milestones++
		}
	}
	if (tmp.qu.bigRip.active) switchAB()
	var bm = player.ghostify.milestones
	var nBRU = []
	var nBEU = []
	for (var u=20;u>0;u--) {
		if (nBRU.includes(u+1)||tmp.qu.bigRip.upgrades.includes(u)) nBRU.push(u)
		if (u<11&&u!=7&&(nBEU.includes(u+1)||tmp.qu.breakEternity.upgrades.includes(u))) nBEU.push(u)
	}
	if (bm > 2) for (var c=1;c<9;c++) tmp.qu.electrons.mult += .5-QCIntensity(c)*.25
	if (bm > 6 && !force && player.achievements.includes("ng3p68")) gainNeutrinos(Decimal.times(2e3 * tmp.qu.bigRip.bestGals, bulk), "all")
	if (bm > 15) giveAchievement("I rather oppose the theory of everything")
	if (player.eternityPoints.e>=2.2e5&&player.ghostify.under) giveAchievement("Underchallenged")
	if (player.eternityPoints.e>=3.75e5&&inQCModifier("ad")) giveAchievement("Overchallenged")
	if (player.ghostify.best<=6) giveAchievement("Running through Big Rips")
	player.ghostify.time = 0
	player = {
		money: new Decimal(10),
		tickSpeedCost: new Decimal(1000),
		tickspeed: new Decimal(player.aarexModifications.newGameExpVersion?500:1000),
		tickBoughtThisInf: resetTickBoughtThisInf(),
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
		firstBought: 0,
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
		totalBoughtDims: resetTotalBought(),
		firstPow: new Decimal(1),
		secondPow: new Decimal(1),
		thirdPow: new Decimal(1),
		fourthPow: new Decimal(1),
		fifthPow: new Decimal(1),
		sixthPow: new Decimal(1),
		seventhPow: new Decimal(1),
		eightPow: new Decimal(1),
		sacrificed: new Decimal(0),
		achievements: player.achievements,
		challenges: player.challenges,
		currentChallenge: "",
		infinityUpgrades: player.infinityUpgrades,
		setsUnlocked: 0,
		infinityPoints: player.infinityPoints,
		infinitied: 0,
		infinitiedBank: 0,
		totalTimePlayed: player.totalTimePlayed,
		bestInfinityTime: 9999999999,
		thisInfinityTime: 0,
		resets: 0,
		dbPower: player.dbPower,
        tdBoosts: resetTDBoosts(),
		tickspeedBoosts: player.tickspeedBoosts !== undefined ? 16 : undefined,
		galaxies: 0,
		galacticSacrifice: resetGalacticSacrifice(),
		totalmoney: player.totalmoney,
		interval: null,
		lastUpdate: player.lastUpdate,
		achPow: player.achPow,
		autobuyers: player.autobuyers,
		partInfinityPoint: 0,
		partInfinitied: 0,
		break: player.break,
		costMultipliers: [new Decimal(1e3), new Decimal(1e4), new Decimal(1e5), new Decimal(1e6), new Decimal(1e8), new Decimal(1e10), new Decimal(1e12), new Decimal(1e15)],
		tickspeedMultiplier: new Decimal(10),
		chall2Pow: 1,
		chall3Pow: new Decimal(0.01),
		newsArray: player.newsArray,
		matter: new Decimal(0),
		chall11Pow: new Decimal(1),
		challengeTimes: player.challengeTimes,
		infchallengeTimes: player.infchallengeTimes,
		lastTenRuns: [[600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)]],
		lastTenEternities: [[600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)]],
		infMult: new Decimal(1),
		infMultCost: new Decimal(10),
		tickSpeedMultDecrease: Math.max(player.tickSpeedMultDecrease, bm > 1 ? 1.25 : 2),
		tickSpeedMultDecreaseCost: player.tickSpeedMultDecreaseCost,
		dimensionMultDecrease: player.dimensionMultDecrease,
		dimensionMultDecreaseCost: player.dimensionMultDecreaseCost,
		extraDimPowerIncrease: player.extraDimPowerIncrease,
		dimPowerIncreaseCost: player.dimPowerIncreaseCost,
		version: player.version,
		postC4Tier: 1,
		postC8Mult: new Decimal(1),
		overXGalaxies: player.overXGalaxies,
		overXGalaxiesTickspeedBoost: player.tickspeedBoosts == undefined ? player.overXGalaxiesTickspeedBoost : 0,
		spreadingCancer: player.spreadingCancer,
		postChallUnlocked: player.achievements.includes("r133") ? order.length : 0,
		postC4Tier: 0,
		postC3Reward: new Decimal(1),
		eternityPoints: new Decimal(0),
		eternities: bm ? 1e13 : 0,
		eternitiesBank: 0,
		thisEternity: 0,
		bestEternity: 9999999999,
		eternityUpgrades: bm ? [1, 2, 3, 4, 5, 6] : [],
		epmult: new Decimal(1),
		epmultCost: new Decimal(500),
		infDimensionsUnlocked: resetInfDimUnlocked(),
		infinityPower: new Decimal(1),
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
			power: new Decimal(1),
			baseAmount: 0
		},
		infinityDimension5 : {
			cost: new Decimal(1e140),
			amount: new Decimal(0),
			bought: 0,
			power: new Decimal(1),
			baseAmount: 0
		},
		infinityDimension6 : {
			cost: new Decimal(1e200),
			amount: new Decimal(0),
			bought: 0,
			power: new Decimal(1),
			baseAmount: 0
		},
		infinityDimension7 : {
			cost: new Decimal(1e250),
			amount: new Decimal(0),
			bought: 0,
			power: new Decimal(1),
			baseAmount: 0
		},
		infinityDimension8 : {
			cost: new Decimal(1e280),
			amount: new Decimal(0),
			bought: 0,
			power: new Decimal(1),
			baseAmount: 0
		},
		infDimBuyers: bm ? player.infDimBuyers : [false, false, false, false, false, false, false, false],
		timeShards: new Decimal(0),
		tickThreshold: new Decimal(1),
		totalTickGained: 0,
		timeDimension1: {
			cost: new Decimal(1),
			amount: new Decimal(0),
			power: new Decimal(1),
			bought: 0
		},
		timeDimension2: {
			cost: new Decimal(5),
			amount: new Decimal(0),
			power: new Decimal(1),
			bought: 0
		},
		timeDimension3: {
			cost: new Decimal(100),
			amount: new Decimal(0),
			power: new Decimal(1),
			bought: 0
		},
		timeDimension4: {
			cost: new Decimal(1000),
			amount: new Decimal(0),
			power: new Decimal(1),
			bought: 0
		},
		timeDimension5: {
			cost: new Decimal("1e2350"),
			amount: new Decimal(0),
			power: new Decimal(1),
			bought: 0
		},
		timeDimension6: {
			cost: new Decimal("1e2650"),
			amount: new Decimal(0),
			power: new Decimal(1),
			bought: 0
		},
		timeDimension7: {
			cost: new Decimal("1e3000"),
			amount: new Decimal(0),
			power: new Decimal(1),
			bought: 0
		},
		timeDimension8: {
			cost: new Decimal("1e3350"),
			amount: new Decimal(0),
			power: new Decimal(1),
			bought: 0
		},
		offlineProd: player.offlineProd,
		offlineProdCost: player.offlineProdCost,
		challengeTarget: 0,
		autoSacrifice: player.autoSacrifice,
		replicanti: {
			amount: new Decimal(bm ? 1 : 0),
			unl: bm > 0,
			chance: 0.01,
			chanceCost: new Decimal(player.galacticSacrifice!==undefined?1e90:1e150),
			interval: 1000,
			intervalCost: new Decimal(player.galacticSacrifice!==undefined?1e80:1e140),
			gal: 0,
			galaxies: 0,
			galCost: new Decimal(player.galacticSacrifice!=undefined?1e110:1e170),
			galaxybuyer: player.replicanti.galaxybuyer,
			auto: bm ? player.replicanti.auto : [false, false, false]
		},
		timestudy: bm ? player.timestudy : {
			theorem: 0,
			amcost: new Decimal("1e20000"),
			ipcost: new Decimal(1),
			epcost: new Decimal(1),
			studies: [],
		},
		eternityChalls: bm ? player.eternityChalls : {},
		eternityChallGoal: new Decimal(Number.MAX_VALUE),
		currentEternityChall: "",
		eternityChallUnlocked: player.eternityChallUnlocked,
		etercreq: 0,
		autoIP: new Decimal(0),
		autoTime: 1e300,
		infMultBuyer: bm ? player.infMultBuyer : false,
		autoCrunchMode: player.autoCrunchMode,
		autoEterMode: bm ? player.autoEterMode : "amount",
		peakSpent: 0,
		respec: false,
		respecMastery: false,
		eternityBuyer: bm ? player.eternityBuyer : {
			limit: new Decimal(0),
			isOn: false,
			dilationMode: false,
			dilationPerAmount: 10,
			dilMode: player.eternityBuyer.dilMode,
			tpUpgraded: player.eternityBuyer.tpUpgraded,
			slowStop: player.eternityBuyer.slowStop,
			slowStopped: player.eternityBuyer.slowStopped,
			ifAD: player.eternityBuyer.ifAD,
			presets: player.eternityBuyer.presets
		},
		eterc8ids: 50,
		eterc8repl: 40,
		dimlife: true,
		dead: true,
		dilation: {
			studies: bm ? player.dilation.studies : [],
			active: false,
			times: 0,
			tachyonParticles: player.ghostify.milestones > 15 ? player.dilation.bestTPOverGhostifies : new Decimal(0),
			dilatedTime: new Decimal(bm ? 1e100 : 0),
			bestTPOverGhostifies: player.dilation.bestTPOverGhostifies,
			nextThreshold: new Decimal(1000),
			freeGalaxies: 0,
			upgrades: bm ? player.dilation.upgrades : [],
			autoUpgrades: bm ? player.dilation.autoUpgrades : player.aarexModifications.nguspV ? [] : undefined,
			rebuyables: {
				1: 0,
				2: 0,
				3: 0,
				4: 0,
			}
		},
		exdilation: player.exdilation!=undefined?{
			unspent: new Decimal(0),
			spent: {
				1: new Decimal(0),
				2: new Decimal(0),
				3: new Decimal(0),
				4: new Decimal(0)
			},
			times: 0
		}:player.exdilation,
		blackhole: player.exdilation!=undefined?{
			unl: bm > 0,
			upgrades: {dilatedTime: 0, bankedInfinities: 0, replicanti: 0, total: 0},
			power: new Decimal(0)
		}:player.blackhole,
		why: player.why,
		options: player.options,
		meta: {
			antimatter: new Decimal(100),
			bestAntimatter: new Decimal(100),
			bestOverQuantums: new Decimal(100),
			bestOverGhostifies: player.meta.bestOverGhostifies,
			resets: bm ? 4 : 0,
			'1': {
				amount: new Decimal(0),
				bought: 0,
				cost: new Decimal(10)
			},
			'2': {
				amount: new Decimal(0),
				bought: 0,
				cost: new Decimal(100)
			},
			'3': {
				amount: new Decimal(0),
				bought: 0,
				cost: new Decimal(1e4)
			},
			'4': {
				amount: new Decimal(0),
				bought: 0,
				cost: new Decimal(1e6)
			},
			'5': {
				amount: new Decimal(0),
				bought: 0,
				cost: new Decimal(1e9)
			},
			'6': {
				amount: new Decimal(0),
				bought: 0,
				cost: new Decimal(1e13)
			},
			'7': {
				amount: new Decimal(0),
				bought: 0,
				cost: new Decimal(1e18)
			},
			'8': {
				amount: new Decimal(0),
				bought: 0,
				cost: new Decimal(1e24)
			}
		},
		masterystudies: bm ? player.masterystudies : [],
		autoEterOptions: player.autoEterOptions,
		galaxyMaxBulk: player.galaxyMaxBulk,
		quantum: {
			reached: true,
			times: 0,
			time: 0,
			best: 9999999999,
			last10: [[600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)], [600*60*24*31, new Decimal(0)]],
			autoEC: tmp.qu.autoEC,
			disabledRewards: tmp.qu.disabledRewards,
			metaAutobuyerWait: 0,
			autobuyer: {
				enabled: false,
				limit: new Decimal(0),
				mode: "amount",
				peakTime: 0
			},
			autoOptions: {
				assignQK: tmp.qu.autoOptions.assignQK,
				assignQKRotate: tmp.qu.autoOptions.assignQKRotate,
				sacrifice: bm ? tmp.qu.autoOptions.sacrifice : false,
				replicantiReset: tmp.qu.autoOptions.replicantiReset
			},
			assortPercentage: tmp.qu.assortPercentage,
			assignAllRatios: tmp.qu.assignAllRatios,
			quarks: new Decimal(0),
			usedQuarks: {
				r: new Decimal(0),
				g: new Decimal(0),
				b: new Decimal(0)
			},
			colorPowers: {
				r: new Decimal(0),
				g: new Decimal(0),
				b: new Decimal(0)
			},
			gluons: {
				rg: new Decimal(0),
				gb: new Decimal(0),
				br: new Decimal(0)
			},
			multPower: {
				rg: 0,
				gb: 0,
				br: 0,
				total: 0
			},
			electrons: {
				amount: 0,
				sacGals: 0,
				mult: bm > 2 ? tmp.qu.electrons.mult : bm ? 6 : 2,
				rebuyables: bm > 2 ? tmp.qu.electrons.rebuyables : [0,0,0,0]
			},
			challenge: [],
			challenges: {},
			nonMAGoalReached: tmp.qu.nonMAGoalReached,
			challengeRecords: {},
			pairedChallenges: {
				order: bm ? tmp.qu.pairedChallenges.order : {},
				current: 0,
				completed: bm ? 4 : 0,
				completions: tmp.qu.pairedChallenges.completions,
				fastest: tmp.qu.pairedChallenges.fastest,
				pc68best: tmp.qu.pairedChallenges.pc68best,
				respec: false
			},
			qcsNoDil: tmp.qu.qcsNoDil,
			qcsMods: tmp.qu.qcsMods,
			replicants: {
				amount: new Decimal(0),
				requirement: new Decimal("1e3000000"),
				quarks: new Decimal(0),
				quantumFood: 0,
				quantumFoodCost: new Decimal(2e46),
				limit: 1,
				limitDim: 1,
				limitCost: new Decimal(1e49),
				eggonProgress: new Decimal(0),
				eggons: new Decimal(0),
				hatchSpeed: 20,
				hatchSpeedCost: new Decimal(1e49),
				babyProgress: new Decimal(0),
				babies: new Decimal(0),
				ageProgress: new Decimal(0)
			},
			emperorDimensions: {},
			nanofield: {
				charge: new Decimal(0),
				energy: new Decimal(0),
				antienergy: new Decimal(0),
				power: 0,
				powerThreshold: new Decimal(50),
				rewards: bm>12?16:0,
				producingCharge: false,
				apgWoke: tmp.qu.nanofield.apgWoke
			},
			reachedInfQK: bm,
			tod: {
				r: {
					quarks: new Decimal(0),
					spin: new Decimal(bm > 13 ? 1e25 : 0),
					upgrades: {}
				},
				g: {
					quarks: new Decimal(0),
					spin: new Decimal(bm > 13 ? 1e25 : 0),
					upgrades: {}
				},
				b: {
					quarks: new Decimal(0),
					spin: new Decimal(bm > 13 ? 1e25 : 0),
					upgrades: {}
				},
				upgrades: {}
			},
			bigRip: {
				active: false,
				conf: tmp.qu.bigRip.conf,
				times: 0,
				bestThisRun: new Decimal(0),
				totalAntimatter: tmp.qu.bigRip.totalAntimatter,
				bestGals: tmp.qu.bigRip.bestGals,
				savedAutobuyersNoBR: tmp.qu.bigRip.savedAutobuyersNoBR,
				savedAutobuyersBR: tmp.qu.bigRip.savedAutobuyersBR,
				spaceShards: new Decimal(0),
				upgrades: bm ? nBRU : []
			},
			breakEternity: {
				unlocked: bm > 14,
				break: bm > 14 ? tmp.qu.breakEternity.break : false,
				eternalMatter: new Decimal(0),
				upgrades: bm > 14 ? nBEU : [],
				epMultPower: 0
			},
			notrelative: true,
			wasted: true,
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
			upgrades: bm > 1 ? tmp.qu.upgrades : [],
			rg4: false
		},
		old: false,
		dontWant: true,
		ghostify: player.ghostify,
		aarexModifications: player.aarexModifications
	}
	tmp.qu=player.quantum
	//Pre-infinity
	setInitialMoney()
	setInitialDimensionPower()
	updatePowers()
	mult18 = new Decimal(1)
	GPminpeak = new Decimal(0)
	if (implode) showTab("dimensions")
	document.getElementById("tickSpeed").style.visibility = "hidden"
	document.getElementById("tickSpeedMax").style.visibility = "hidden"
	document.getElementById("tickLabel").style.visibility = "hidden"
	document.getElementById("tickSpeedAmount").style.visibility = "hidden"
	hideDimensions()
	updateTickSpeed()

	//Infinity
	if (player.achievements.includes("r85")) player.infMult = player.infMult.times(4)
	if (player.achievements.includes("r93")) player.infMult = player.infMult.times(4)
	if (player.achievements.includes("r104")) player.infinityPoints = new Decimal(2e25)
	player.challenges=challengesCompletedOnEternity()
	IPminpeak = new Decimal(0)
	if (isEmptiness) {
		showTab("dimensions")
		isEmptiness = false
		document.getElementById("quantumtabbtn").style.display = "inline-block"
		document.getElementById("ghostifytabbtn").style.display = "inline-block"
	}
	document.getElementById("infinityPoints1").innerHTML = "You have <span class=\"IPAmount1\">"+shortenDimensions(player.infinityPoints)+"</span> Infinity points."
	document.getElementById("infinityPoints2").innerHTML = "You have <span class=\"IPAmount2\">"+shortenDimensions(player.infinityPoints)+"</span> Infinity points."
	document.getElementById("infmultbuyer").textContent="Max buy IP mult"
	if (implode) showChallengesTab("normalchallenges")
	updateChallenges()
	updateNCVisuals()
	updateAutobuyers()
	hideMaxIDButton()
	if (!bm) {
		ipMultPower = player.masterystudies.includes("t241") ? 2.2 : 2
		player.autobuyers[9].bulk=Math.ceil(player.autobuyers[9].bulk)
		document.getElementById("bulkDimboost").value=player.autobuyers[9].bulk
		document.getElementById("replicantidiv").style.display="none"
		document.getElementById("replicantiunlock").style.display="inline-block"
		document.getElementById("replicantiresettoggle").style.display = "none"
		delete player.replicanti.galaxybuyer
	}
	updateLastTenRuns()
	if ((document.getElementById("metadimensions").style.display == "block" && !bm) || implode) showDimTab("antimatterdimensions")
	resetInfDimensions()

	//Eternity
	EPminpeakType = 'normal'
	EPminpeak = new Decimal(0)
	if (bm) {
		if (player.eternityChallUnlocked>12) player.timestudy.theorem+=masteryStudies.costs.ec[player.eternityChallUnlocked]
		else player.timestudy.theorem+=([0,30,35,40,70,130,85,115,115,415,550,1,1])[player.eternityChallUnlocked]
	} else performedTS=false
	player.eternityChallUnlocked=0
	player.dilation.bestTP = player.dilation.tachyonParticles
	player.dilation.totalTachyonParticles = player.dilation.bestTP
	if (player.exdilation!=undefined) {
		if (player.eternityUpgrades.length) for (var u=7;u<10;u++) player.eternityUpgrades.push(u)
		for (var d=1;d<(player.aarexModifications.nguspV?9:5);d++) player["blackholeDimension"+d] = {
			cost: blackholeDimStartCosts[d],
			amount: new Decimal(0),
			power: new Decimal(1),
			bought: 0
		}
		if (speedrunMilestonesReached < 3) {
			document.getElementById("blackholediv").style.display="none"
			document.getElementById("blackholeunlock").style.display="inline-block"
		}
	}
	if (player.achievements.includes("ng3p77")) {
		player.timestudy.studies=[]
		player.masterystudies=[]
		for (var t=0;t<all.length;t++) player.timestudy.studies.push(all[t])
		for (var c=1;c<15;c++) player.eternityChalls["eterc"+c]=5
		for (var t=0;t<masteryStudies.timeStudies.length;t++) player.masterystudies.push("t"+masteryStudies.timeStudies[t])
		for (var d=1;d<7;d++) player.dilation.studies.push(d)
		for (var d=7;d<15;d++) player.masterystudies.push("d"+d)
		if (bm<2) {
			player.dimensionMultDecrease=2
			player.tickSpeedMultDecrease=1.65
		}
	}
	document.getElementById("eternitybtn").style.display = "none"
	document.getElementById("eternityPoints2").innerHTML = "You have <span class=\"EPAmount2\">"+shortenDimensions(player.eternityPoints)+"</span> Eternity point"+((player.eternityPoints.eq(1)) ? "." : "s.")
	document.getElementById("epmult").innerHTML = "You gain 5 times more EP<p>Currently: 1x<p>Cost: 500 EP"
	if (((document.getElementById("masterystudies").style.display == "block" || document.getElementById("breakEternity").style.display == "block") && !bm) || implode) showEternityTab("timestudies", document.getElementById("eternitystore").style.display == "none")
	updateLastTenEternities()
	resetTimeDimensions()
	updateRespecButtons()
	updateMilestones()
	updateEternityUpgrades()
	updateTheoremButtons()
	updateTimeStudyButtons()
	if (!bm) updateAutoEterMode()
	updateEternityChallenges()
	updateDilationUpgradeCosts()
	if (!bm) {
		document.getElementById("masterystudyunlock").style.display = "none"
		document.getElementById('rebuyupgmax').style.display = ""
		document.getElementById('rebuyupgauto').style.display = "none"
	}
	updateMasteryStudyCosts()
	updateMasteryStudyButtons()

	//Quantum
	tmp.qu.qcsMods.current=[]
	tmp.qu.replicants.amount = new Decimal(0)
	tmp.qu.replicants.requirement = new Decimal("1e3000000")
	tmp.qu.replicants.quarks = new Decimal(0)
	tmp.qu.replicants.eggonProgress = new Decimal(0)
	tmp.qu.replicants.eggons = new Decimal(0)
	tmp.qu.replicants.babyProgress = new Decimal(0)
	tmp.qu.replicants.babies = new Decimal(0)
	tmp.qu.replicants.growupProgress = new Decimal(0)
	tmp.eds = tmp.qu.emperorDimensions
	QKminpeak = new Decimal(0)
	QKminpeakValue = new Decimal(0)
	if (implode) showQuantumTab("uquarks")
	var permUnlocks=[7,9,10,10,11,11,12,12]
	for (var i=1;i<9;i++) {
		var num=bm>=permUnlocks[i-1]?10:0
		tmp.eds[i]={workers:new Decimal(num),progress:new Decimal(0),perm:num}
		if (num>9) tmp.qu.replicants.limitDim=i
	}
	if (bm>6) {
		tmp.qu.replicants.limit=10
		tmp.qu.replicants.limitCost=Decimal.pow(200,tmp.qu.replicants.limitDim*9).times(1e49)
		tmp.qu.replicants.quantumFoodCost=Decimal.pow(5,tmp.qu.replicants.limitDim*30).times(2e46)
	}
	if (bm>3) {
		var colors=['r','g','b']
		for (var c=0;c<3;c++) tmp.qu.tod[colors[c]].upgrades[1]=5
	}
	if (bm) for (var i=1;i<9;i++) tmp.qu.challenges[i] = 2
	else {
		document.getElementById('rebuyupgauto').style.display="none"
		document.getElementById('toggleallmetadims').style.display="none"
		document.getElementById('metaboostauto').style.display="none"
		document.getElementById("autoBuyerQuantum").style.display="none"
		document.getElementById('toggleautoquantummode').style.display="none"
	}
	if (!bm&&!player.achievements.includes("ng3p77")) {
		document.getElementById("electronstabbtn").style.display = "none"
		document.getElementById("nanofieldtabbtn").style.display = "none"
		document.getElementById("edtabbtn").style.display = "none"
	}
	document.getElementById('bestTP').textContent="Your best Tachyon particles in this Ghostify was "+shorten(player.dilation.bestTP)+"."
	updateLastTenQuantums()
	updateSpeedruns()
	updateColorCharge()
	updateColorDimPowers()
	updateGluonsTabOnUpdate("prestige")
	updateQuantumWorth("quick")
	updateBankedEter()
	updateQuantumChallenges()
	updatePCCompletions()
	updateReplicants("prestige")
	updateEmperorDimensions()
	updateTODStuff()
	updateBreakEternity()
	
	//Ghostify
	GHPminpeak = new Decimal(0)
	GHPminpeakValue = new Decimal(0)
	document.getElementById("ghostifybtn").style.display = "none"
	if (!ghostified) {
		ghostified = true
		document.getElementById("ghostifytabbtn").style.display = "inline-block"
		document.getElementById("ghostparticles").style.display = ""
		document.getElementById("ghostifyAnimBtn").style.display = "inline-block"
		document.getElementById("ghostifyConfirmBtn").style.display = "inline-block"
		giveAchievement("Kee-hee-hee!")
	} else if (player.ghostify.times>2&&player.ghostify.times<11) {
		$.notify("You unlocked "+(player.ghostify.times+2)+"th Neutrino upgrade!", "success")
		if (player.ghostify.times%3>1) document.getElementById("neutrinoUpg"+(player.ghostify.times+2)).parentElement.parentElement.style.display=""
		else document.getElementById("neutrinoUpg"+(player.ghostify.times+2)).style.display=""
	}
	document.getElementById("GHPAmount").textContent = shortenDimensions(player.ghostify.ghostParticles)
	if (bm<7) {
		player.ghostify.neutrinos.electron=new Decimal(0)
		player.ghostify.neutrinos.mu=new Decimal(0)
		player.ghostify.neutrinos.tau=new Decimal(0)
		player.ghostify.neutrinos.generationGain=1
	} else if (!force) player.ghostify.neutrinos.generationGain=player.ghostify.neutrinos.generationGain%3+1
	player.ghostify.ghostlyPhotons.amount=new Decimal(0)
	player.ghostify.ghostlyPhotons.darkMatter=new Decimal(0)
	player.ghostify.ghostlyPhotons.ghostlyRays=new Decimal(0)
	tmp.bl.watt=0
	player.ghostify.under=true
	updateLastTenGhostifies()
	updateBraveMilestones()
}

function toggleGhostifyConf() {
	player.aarexModifications.ghostifyConf = !player.aarexModifications.ghostifyConf
	document.getElementById("ghostifyConfirmBtn").textContent = "Ghostify confirmation: O" + (player.aarexModifications.ghostifyConf ? "N" : "FF")
}

function getGHPRate(num) {
	if (num.lt(1/60)) return (num*1440).toFixed(1)+" GhP/day"
	if (num.lt(1)) return (num*60).toFixed(1)+" GhP/hr"
	return shorten(num)+" GhP/min"
}

var averageGHP = new Decimal(0)
var bestGHP
function updateLastTenGhostifies() {
	if (player.masterystudies === undefined) return
    var listed = 0
    var tempTime = new Decimal(0)
    var tempGHP = new Decimal(0)
    for (var i=0; i<10; i++) {
        if (player.ghostify.last10[i][1].gt(0)) {
            var qkpm = player.ghostify.last10[i][1].dividedBy(player.ghostify.last10[i][0]/600)
            var tempstring = shorten(qkpm) + " GhP/min"
            if (qkpm<1) tempstring = shorten(qkpm*60) + " GhP/hour"
            var msg = "The Ghostify " + (i == 0 ? '1 Ghostify' : (i+1) + ' Ghostifies') + " ago took " + timeDisplayShort(player.ghostify.last10[i][0], false, 3) + " and gave " + shortenDimensions(player.ghostify.last10[i][1]) +" GhP. "+ tempstring
            document.getElementById("ghostifyrun"+(i+1)).textContent = msg
            tempTime = tempTime.plus(player.ghostify.last10[i][0])
            tempGHP = tempGHP.plus(player.ghostify.last10[i][1])
            bestGHP = player.ghostify.last10[i][1].max(bestGHP)
            listed++
        } else document.getElementById("ghostifyrun"+(i+1)).textContent = ""
    }
    if (listed > 1) {
        tempTime = tempTime.dividedBy(listed)
        tempGHP = tempGHP.dividedBy(listed)
        var qkpm = tempGHP.dividedBy(tempTime/600)
        var tempstring = shorten(qkpm) + " GhP/min"
        averageGHP = tempGHP
        if (qkpm<1) tempstring = shorten(qkpm*60) + " GhP/hour"
        document.getElementById("averageGhostifyRun").textContent = "Last " + listed + " Ghostifies average time: "+ timeDisplayShort(tempTime, false, 3)+" Average GhP gain: "+shortenDimensions(tempGHP)+" GhP. "+tempstring
    } else document.getElementById("averageGhostifyRun").textContent = ""
}

function updateBraveMilestones() {
	if (ghostified) {
		for (var m=1;m<17;m++) document.getElementById("braveMilestone"+m).className="achievement achievement"+(player.ghostify.milestones<m?"":"un")+"locked"
		for (var r=1;r<3;r++) document.getElementById("braveRow"+r).className=player.ghostify.milestones<r*8?"":"completedrow"
	}
}

function showGhostifyTab(tabName) {
	//iterate over all elements in div_tab class. Hide everything that's not tabName and show tabName
	var tabs = document.getElementsByClassName('ghostifytab');
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
	if (oldTab !== tabName) player.aarexModifications.tabsSave.tabGhostify = tabName
	closeToolTip()
}

function updateGhostifyTabs() {
	if (document.getElementById("neutrinos").style.display=="block") {
		var generations = ["electron", "Muon", "Tau"]
		var neutrinoGain = getNeutrinoGain()
		var sum = player.ghostify.neutrinos.electron.add(player.ghostify.neutrinos.mu).add(player.ghostify.neutrinos.tau).round()
		document.getElementById("neutrinosGain").textContent="You gain " + shortenDimensions(neutrinoGain) + " " + generations[player.ghostify.neutrinos.generationGain - 1] + " neutrino" + (neutrinoGain.eq(1) ? "" : "s") + " each time you get 1 normal galaxy."
		setAndMaybeShow("neutrinosGainGhostify",player.achievements.includes("ng3p68"),'"You gain "+shortenDimensions(Decimal.times(\''+neutrinoGain.toString()+'\',tmp.qu.bigRip.bestGals*2e3))+" of all neutrinos each time you become a ghost 1x time."')
		document.getElementById("electronNeutrinos").textContent=shortenDimensions(player.ghostify.neutrinos.electron)
		document.getElementById("muonNeutrinos").textContent=shortenDimensions(player.ghostify.neutrinos.mu)
		document.getElementById("tauNeutrinos").textContent=shortenDimensions(player.ghostify.neutrinos.tau)
		if (player.ghostify.neutrinos.boosts) {
			document.getElementById("preNeutrinoBoost1").textContent=getDilExp("neutrinos").toFixed(2)
			document.getElementById("neutrinoBoost1").textContent=getDilExp().toFixed(2)
		}
		if (player.ghostify.neutrinos.boosts>1) {
			document.getElementById("preNeutrinoBoost2").textContent="^"+shorten(getMTSMult(273, "pn"))
			document.getElementById("neutrinoBoost2").textContent="^"+shorten(getMTSMult(273))
			document.getElementById("preNeutrinoBoost2Exp").textContent=getMTSMult(273, ["pn", "intensity"]).toFixed(2)
			document.getElementById("neutrinoBoost2Exp").textContent=getMTSMult(273, "intensity").toFixed(2)
		}
		if (player.ghostify.neutrinos.boosts>2) document.getElementById("neutrinoBoost3").textContent=tmp.nb[2].toFixed(2)
		if (player.ghostify.neutrinos.boosts>3) document.getElementById("neutrinoBoost4").textContent=(tmp.nb[3]*100-100).toFixed(1)
		if (player.ghostify.neutrinos.boosts>4) document.getElementById("neutrinoBoost5").textContent=(tmp.nb[4]*100).toFixed(1)
		if (player.ghostify.neutrinos.boosts>5) document.getElementById("neutrinoBoost6").textContent=tmp.nb[5]<10.995?(tmp.nb[5]*100-100).toFixed(1):getFullExpansion(Math.floor(tmp.nb[5]*100-100))
		if (player.ghostify.neutrinos.boosts>6) {
			document.getElementById("neutrinoBoost7").textContent=(tmp.nb[6]*100).toFixed(1)
			document.getElementById("preNeutrinoBoost7Eff").textContent=(getTreeUpgradeEfficiency("noNB")*100).toFixed(1)
			document.getElementById("neutrinoBoost7Eff").textContent=(getTreeUpgradeEfficiency("br")*100).toFixed(1)
		}
		if (player.ghostify.neutrinos.boosts>7) document.getElementById("neutrinoBoost8").textContent=(tmp.nb[7]*100-100).toFixed(1)
		if (player.ghostify.neutrinos.boosts>8) document.getElementById("neutrinoBoost9").textContent=shorten(tmp.nb[8])
		if (player.ghostify.neutrinos.boosts>9) document.getElementById("neutrinoBoost10").textContent="-" + tmp.nb[9].toFixed(4)
		document.getElementById("neutrinoUpg1Pow").textContent=tmp.nu[0]
		document.getElementById("neutrinoUpg3Pow").textContent=shorten(tmp.nu[1])
		document.getElementById("neutrinoUpg4Pow").textContent=shorten(tmp.nu[2])
		if (player.ghostify.times>4) document.getElementById("neutrinoUpg7Pow").textContent=shorten(tmp.nu[3])
		if (player.ghostify.times>9) document.getElementById("neutrinoUpg12").setAttribute('ach-tooltip',
			"Normal galaxy effect: "+shorten(tmp.nu[4].normal)+"x to quark spin production, "+
			"Replicated galaxy effect: "+shorten(tmp.nu[4].replicated)+"x to EC14 reward, "+
			"Free galaxy effect: "+shorten(tmp.nu[4].free)+"x to IC3 reward"
		)
		if (player.ghostify.ghostlyPhotons.unl) {
			document.getElementById("neutrinoUpg14Pow").textContent=shorten(tmp.nu[5])
			document.getElementById("neutrinoUpg15Pow").textContent=shorten(tmp.nu[6])
		}
		for (var u=1;u<16;u++) {
			var e=false
			if (u>12) e=player.ghostify.ghostlyPhotons.unl
			else e=player.ghostify.times+3>u||u<5
			if (e) {
				if (hasNU(u)) document.getElementById("neutrinoUpg" + u).className = "gluonupgradebought neutrinoupg"
				else if (sum.gte(tmp.nuc[u])) document.getElementById("neutrinoUpg" + u).className = "gluonupgrade neutrinoupg"
				else document.getElementById("neutrinoUpg" + u).className = "gluonupgrade unavailablebtn"
			}
		}
		if (player.ghostify.ghostParticles.gte(tmp.nbc[player.ghostify.neutrinos.boosts])) document.getElementById("neutrinoUnlock").className = "gluonupgrade neutrinoupg"
		else document.getElementById("neutrinoUnlock").className = "gluonupgrade unavailablebtn"
		if (player.ghostify.ghostParticles.gte(Decimal.pow(4,player.ghostify.neutrinos.multPower-1).times(2))) document.getElementById("neutrinoMultUpg").className = "gluonupgrade neutrinoupg"
		else document.getElementById("neutrinoMultUpg").className = "gluonupgrade unavailablebtn"
		if (sum.gte(getGHPMultCost())) document.getElementById("ghpMultUpg").className = "gluonupgrade neutrinoupg"
		else document.getElementById("ghpMultUpg").className = "gluonupgrade unavailablebtn"
	}
	if (document.getElementById("automaticghosts").style.display=="block") if (player.ghostify.milestones>7) updateQuantumWorth("display")
	if (document.getElementById("gphtab").style.display=="block"&&player.ghostify.ghostlyPhotons.unl) {
		var gphData=player.ghostify.ghostlyPhotons
		var lePower=getLightEmpowermentBoost()
		document.getElementById("dtGPH").textContent=shorten(player.dilation.dilatedTime)
		document.getElementById("gphProduction").textContent=shorten(getGPHProduction())
		document.getElementById("gphProduction").className=(tmp.qu.bigRip.active?"gph":"dm")+"Amount"
		document.getElementById("gphProductionType").textContent=tmp.qu.bigRip.active?"Ghostly Photons":"Dark Matter"
		document.getElementById("gph").textContent=shortenMoney(gphData.amount)
		document.getElementById("dm").textContent=shortenMoney(gphData.darkMatter)
		document.getElementById("ghrProduction").textContent=shortenMoney(getGHRProduction())
		document.getElementById("ghrCap").textContent=shortenMoney(getGHRCap())
		document.getElementById("ghr").textContent=shortenMoney(gphData.ghostlyRays)
		for (var c=0;c<8;c++) {
			document.getElementById("light"+(c+1)).textContent=getFullExpansion(gphData.lights[c])
			document.getElementById("lightThreshold"+(c+1)).textContent=shorten(getLightThreshold(c))
			if (c>0) document.getElementById("lightStrength"+c).textContent=(Math.sqrt(c>6?1:tmp.ls[c]+1)+lePower).toFixed(2)
		}
		document.getElementById("lightMax1").textContent=getFullExpansion(gphData.maxRed)
		document.getElementById("lightBoost1").textContent=tmp.le[0].toFixed(3)
		document.getElementById("lightBoost2").textContent=tmp.le[1].toFixed(2)
		document.getElementById("lightBoost3").textContent=getFullExpansion(Math.floor(tmp.le[2]))
		document.getElementById("lightBoost4").textContent=(tmp.le[3]*100-100).toFixed(1)
		document.getElementById("lightBoost5").textContent=(tmp.le[4]*100).toFixed(1)+(hasBosonicUpg(11)?"+"+(tmp.blu[11]*100).toFixed(1):"")
		document.getElementById("lightBoost6").textContent=shorten(tmp.le[5])
		document.getElementById("lightBoost7").textContent=shorten(tmp.le[6])
		document.getElementById("lightEmpowerment").className="gluonupgrade "+(gphData.lights[7]>=getLightEmpowermentReq()?"gph":"unavailablebtn")
		document.getElementById("lightEmpowermentReq").textContent=getFullExpansion(getLightEmpowermentReq())
		document.getElementById("lightEmpowerments").textContent=getFullExpansion(gphData.enpowerments)
		document.getElementById("lightEmpowermentsEffect").textContent=lePower.toFixed(2)
		for (var e=1;e<4;e++) {
			if (gphData.enpowerments>=e) {
				if (e==1) {
					document.getElementById("leBoost1").textContent=getFullExpansion(Math.floor(tmp.le[7].effect))
					document.getElementById("leBoost1Total").textContent=getFullExpansion(Math.floor(tmp.le[7].total))
				}
				if (e==2) document.getElementById("leBoost2").textContent=(tmp.le[8]*100-100).toFixed(1)
				if (e==3) document.getElementById("leBoost3").textContent=tmp.le[9].toFixed(2)
			}
			document.getElementById("le"+e).style.display=e>gphData.enpowerments?"none":""
		}
	}
	if (document.getElementById("bltab").style.display=="block"&&player.ghostify.wzb.unl) {
		let data=tmp.bl
		let speed=data.speed*(data.battery.gt(0)?data.odSpeed:1)
		document.getElementById("bWatt").textContent=shorten(data.watt)
		document.getElementById("bSpeed").textContent=data.speed.toFixed(2)
		document.getElementById("bTotalSpeed").textContent=shorten(speed)
		document.getElementById("bTicks").textContent=shorten(data.ticks)
		document.getElementById("bAM").textContent=shorten(data.am)
		document.getElementById("bAMProduction").textContent="+"+shorten(getBosonicAMProduction().times(speed))+"/s"
		document.getElementById("bBt").textContent=shorten(data.battery)
		document.getElementById("bBtProduction").textContent="-"+shorten(getBosonicBatteryLoss().times(data.speed))+"/s"
		document.getElementById("odSpeed").textContent=(data.battery.gt(0)?data.odSpeed:1).toFixed(2)+"x"
		document.getElementById("odSpeedWBBt").style.display=data.battery.eq(0)&&data.odSpeed>1?"":"none"
		document.getElementById("odSpeedWBBt").textContent=" ("+data.odSpeed.toFixed(2)+"x if you have Bosonic Battery)"
		for (var g=1;g<=br.limit;g++) document.getElementById("bRune"+g).textContent=shortenDimensions(data.glyphs[g-1])
		if (document.getElementById("bextab").style.display=="block") {
			let time=getExtractTime().div(speed)
			if (data.extracting) document.getElementById("extract").textContent="Extracting"+(time.lt(0.1)?"":" ("+data.extractProgress.times(100).toFixed(1)+"%)")
			else document.getElementById("extract").textContent="Extract"
			if (time.lt(0.1)) document.getElementById("extractTime").textContent="You are extracting "+shorten(Decimal.div(1,time))+" runes per second."
			else if (data.extracting) document.getElementById("extractTime").textContent=shorten(time.times(Decimal.sub(1,data.extractProgress)))+" seconds left till extraction."
			else document.getElementById("extractTime").textContent="This will take "+shorten(time)+" seconds."
			updateEnchantDescs()
		}
		if (document.getElementById("butab").style.display=="block") updateBosonicUpgradeDescs()
		if (document.getElementById("wzbtab").style.display=="block") {
			let lSpeed=tmp.wzbs.times(speed)
			let data2=player.ghostify.wzb
			let show0=data2.dPUse==1&&lSpeed.times(getAntiPreonLoss()).div(aplScalings[1]).times(tmp.zbs).gte(10)
			let gainSpeed=getOscillateGainSpeed()
			let r
			if (!data2.dPUse) r=lSpeed.times(getAntiPreonProduction())
			else r=lSpeed.times(getAntiPreonLoss())
			//document.getElementById("wzbSpeed").textContent="Current W & Z Bosons speed: "+shorten(tmp.wzbs)+"x (w/ Bosonic Speed: "+shorten(lSpeed)+"x)"
			document.getElementById("ap").textContent=shorten(data2.dP)
			document.getElementById("apProduction").textContent=(data2.dPUse?"-":"+")+shorten(r)+"/s"
			document.getElementById("apUse").textContent=data2.dPUse==0?"":"You are currently using Anti-Preons to "+(["","decay the W Quark","oscillate the Z Neutrino","convert W- to W+ Bosons"])[data2.dPUse]+"."
			document.getElementById("wQkType").textContent=data2.wQkUp?"up":"down"
			document.getElementById("wQkProgress").textContent="The W Quark is " + data2.wQkProgress.times(100).toFixed(1)+"% converted into a "+(data2.wQkUp?" down":"n up")+" quark."
			document.getElementById("wQk").className=show0?"zero":data2.wQkUp?"up":"down"
			document.getElementById("wQkSymbol").textContent=show0?"0":data2.wQkUp?"+":"−"
			document.getElementById("wpb").textContent=shortenDimensions(data2.wpb)
			document.getElementById("wnb").textContent=shortenDimensions(data2.wnb)
			document.getElementById("wbTime").textContent=shorten(tmp.wbt)
			document.getElementById("wbOscillate").textContent=shorten(tmp.wbo)
			document.getElementById("wbProduction").textContent=shorten(tmp.wbp)
			document.getElementById("zNeGen").textContent="a " + (["electron","Mu","Tau"])[data2.zNeGen-1] + " neutrino."
			document.getElementById("zNeProgress").textContent="The Z Neutrino is currently " + data2.zNeProgress.times(100).toFixed(1)+"% oscillated into a "+(["Mu","Tau","electron"])[data2.zNeGen-1]+" neutrino."
			document.getElementById("zNeReq").textContent="The oscillate progress gain speed is currently "+(gainSpeed.gt(1)?shorten(gainSpeed):"1 / "+shorten(Decimal.div(1,gainSpeed)))+"x."
			document.getElementById("zNe").className=(["electron","mu","tau"])[data2.zNeGen-1]
			document.getElementById("zNeSymbol").textContent=(["e","μ","τ"])[data2.zNeGen-1]
			document.getElementById("zb").textContent=shortenDimensions(data2.zb)
			document.getElementById("zbGain").textContent="You will gain "+shortenDimensions(data2.zNeReq.pow(0.75))+" Z Boson" + (data2.zNeReq.pow(0.75).eq(1) ? "" : "s") + " on the next oscillation."
			document.getElementById("zbSpeed").textContent=shorten(tmp.zbs)
		}
	}
}

function onNotationChangeNeutrinos() {
	if (player.masterystudies == undefined) return
	document.getElementById("neutrinoUnlockCost").textContent=shortenDimensions(new Decimal(tmp.nbc[player.ghostify.neutrinos.boosts]))
	document.getElementById("neutrinoMult").textContent=shortenDimensions(Decimal.pow(5,player.ghostify.neutrinos.multPower-1))
	document.getElementById("neutrinoMultUpgCost").textContent=shortenDimensions(Decimal.pow(4,player.ghostify.neutrinos.multPower-1).times(2))
	document.getElementById("ghpMult").textContent=shortenDimensions(Decimal.pow(2,player.ghostify.multPower-1))
	document.getElementById("ghpMultUpgCost").textContent=shortenDimensions(getGHPMultCost())
	for (var u=1; u<16; u++) document.getElementById("neutrinoUpg"+u+"Cost").textContent=shortenDimensions(tmp.nuc[u])
}

function getNeutrinoGain() {
	let ret=Decimal.pow(5,player.ghostify.neutrinos.multPower-1)
	if (player.ghostify.ghostlyPhotons.unl) ret=ret.times(tmp.le[5])
	if (hasNU(14)) ret=ret.times(tmp.nu[5])
	if (player.masterystudies.includes("d12")&&hasBosonicUpg(22)) ret=ret.times(getNanofieldRewardEffect(7,"neutrinos"))
	return ret
}

function buyNeutrinoUpg(id) {
	let sum=player.ghostify.neutrinos.electron.add(player.ghostify.neutrinos.mu).add(player.ghostify.neutrinos.tau).round()
	let cost=tmp.nuc[id]
	if (sum.lt(cost)||player.ghostify.neutrinos.upgrades.includes(id)) return
	player.ghostify.neutrinos.upgrades.push(id)
	subNeutrinos(cost)
	if (id==2) {
		document.getElementById("eggonsCell").style.display="none"
		document.getElementById("workerReplWhat").textContent="babies"
	}
	if (id==5) updateElectrons(true)
}

function updateNeutrinoBoosts() {
	for (var b=1;b<=10;b++) document.getElementById("neutrinoBoost"+(b%3==1?"Row"+(b+2)/3:"Cell"+b)).style.display=player.ghostify.neutrinos.boosts>=b?"":"none"
	document.getElementById("neutrinoUnlock").style.display=player.ghostify.neutrinos.boosts>=getMaxUnlockedNeutrinoBoosts()?"none":""
	document.getElementById("neutrinoUnlockCost").textContent=shortenDimensions(tmp.nbc[player.ghostify.neutrinos.boosts])
}

function unlockNeutrinoBoost() {
	var cost=tmp.nbc[player.ghostify.neutrinos.boosts]
	if (!player.ghostify.ghostParticles.gte(cost)||player.ghostify.neutrinos.boosts>=getMaxUnlockedNeutrinoBoosts()) return
	player.ghostify.ghostParticles=player.ghostify.ghostParticles.sub(cost).round()
	player.ghostify.neutrinos.boosts++
	updateNeutrinoBoosts()
	updateTemp()
}

function getMaxUnlockedNeutrinoBoosts() {
	return player.ghostify.wzb.unl ? 10 : 9
}

function hasNU(id) {
	return ghostified ? player.ghostify.neutrinos.upgrades.includes(id) : false
}

function buyNeutrinoMult() {
	let cost=Decimal.pow(4,player.ghostify.neutrinos.multPower-1).times(2)
	if (!player.ghostify.ghostParticles.gte(cost)) return
	player.ghostify.ghostParticles=player.ghostify.ghostParticles.sub(cost).round()
	player.ghostify.neutrinos.multPower++
	document.getElementById("neutrinoMult").textContent=shortenDimensions(Decimal.pow(5,player.ghostify.neutrinos.multPower-1))
	document.getElementById("neutrinoMultUpgCost").textContent=shortenDimensions(Decimal.pow(4,player.ghostify.neutrinos.multPower-1).times(2))
}

function maxNeutrinoMult() {
	let cost=Decimal.pow(4,player.ghostify.neutrinos.multPower-1).times(2)
	if (!player.ghostify.ghostParticles.gte(cost)) return
	let toBuy=Math.floor(player.ghostify.ghostParticles.div(cost).times(3).add(1).log(4))
	let toSpend=Decimal.pow(4,toBuy).sub(1).div(3).times(cost)
	player.ghostify.ghostParticles=player.ghostify.ghostParticles.sub(toSpend.min(player.ghostify.ghostParticles)).round()
	player.ghostify.neutrinos.multPower+=toBuy
	document.getElementById("neutrinoMult").textContent=shortenDimensions(Decimal.pow(5,player.ghostify.neutrinos.multPower-1))
	document.getElementById("neutrinoMultUpgCost").textContent=shortenDimensions(Decimal.pow(4,player.ghostify.neutrinos.multPower-1).times(2))
}

function buyGHPMult() {
	let sum=player.ghostify.neutrinos.electron.add(player.ghostify.neutrinos.mu).add(player.ghostify.neutrinos.tau).round()
	let cost=getGHPMultCost()
	if (sum.lt(cost)) return
	subNeutrinos(cost)
	player.ghostify.multPower++
	player.ghostify.automatorGhosts[15].a=player.ghostify.automatorGhosts[15].a.times(5)
	document.getElementById("autoGhost15a").value=formatValue("Scientific", player.ghostify.automatorGhosts[15].a, 2, 1)
	document.getElementById("ghpMult").textContent=shortenDimensions(Decimal.pow(2,player.ghostify.multPower-1))
	document.getElementById("ghpMultUpgCost").textContent=shortenDimensions(getGHPMultCost())
}

function maxGHPMult() {
	let sum=player.ghostify.neutrinos.electron.add(player.ghostify.neutrinos.mu).add(player.ghostify.neutrinos.tau).round()
	let cost=getGHPMultCost()
	if (sum.lt(cost)) return
	if (player.ghostify.multPower<85) {
		let toBuy=Math.min(Math.floor(sum.div(cost).times(24).add(1).log(25)),85-player.ghostify.multPower)
		subNeutrinos(Decimal.pow(25,toBuy).sub(1).div(24).times(cost))
		player.ghostify.multPower+=toBuy
		player.ghostify.automatorGhosts[15].a=player.ghostify.automatorGhosts[15].a.times(Decimal.pow(5,toBuy))
		document.getElementById("autoGhost15a").value=formatValue("Scientific", player.ghostify.automatorGhosts[15].a, 2, 1)
		cost=getGHPMultCost()
	}
	if (player.ghostify.multPower>84) {
		let b=player.ghostify.multPower*2-167
		let x=Math.floor((-b+Math.sqrt(b*b+4*sum.div(cost).log(5)))/2)+1
		if (x) {
			let toBuy=x
			let toSpend=0
			while (x>0) {
				cost=getGHPMultCost(x-1)
				if (sum.div(cost).gt(1e16)) break
				toSpend=cost.add(toSpend)
				if (sum.lt(toSpend)) {
					toSpend=cost
					toBuy--
				}
				x--
			}
			subNeutrinos(toSpend)
			player.ghostify.multPower+=toBuy
		}
	}
	document.getElementById("ghpMult").textContent=shortenDimensions(Decimal.pow(2,player.ghostify.multPower-1))
	document.getElementById("ghpMultUpgCost").textContent=shortenDimensions(getGHPMultCost())
}

function setupAutomaticGhostsData() {
	var data = {power: 0, ghosts: 3}
	for (var ghost=1; ghost<16; ghost++) data[ghost] = {on: false}
	data[4].mode = "q"
	data[4].rotate = "r"
	data[11].pw = 1
	data[11].lw = 1
	data[11].cw = 1
	data[15].a = 1
	return data
}

var autoGhostRequirements=[2,4,4,4.5,5,5,6,6.5,7,7,7.5,8,1/0]
var powerConsumed
var powerConsumptions=[0,1,1,1,1,2,2,0.5,0.5,0.5,1,0.5,0.5,0.5,0.5,0.5]
function updateAutoGhosts(load) {
	if (load) {
		if (player.ghostify.automatorGhosts.ghosts>14) document.getElementById("nextAutomatorGhost").parentElement.style.display="none"
		else {
			document.getElementById("automatorGhostsAmount").textContent=player.ghostify.automatorGhosts.ghosts
			document.getElementById("nextAutomatorGhost").parentElement.style.display=""
			document.getElementById("nextAutomatorGhost").textContent=autoGhostRequirements[player.ghostify.automatorGhosts.ghosts-3].toFixed(2)
		}
	}
	powerConsumed=0
	for (var ghost=1;ghost<16;ghost++) {
		if (ghost>player.ghostify.automatorGhosts.ghosts) {
			if (load) document.getElementById("autoGhost"+ghost).style.display="none"
		} else {
			if (load) {
				document.getElementById("autoGhost"+ghost).style.display=""
				document.getElementById("isAutoGhostOn"+ghost).checked=player.ghostify.automatorGhosts[ghost].on
			}
			if (player.ghostify.automatorGhosts[ghost].on) powerConsumed+=powerConsumptions[ghost]
		}
	}
	if (load) {
		document.getElementById("autoGhostMod4").textContent="Every "+(player.ghostify.automatorGhosts[4].mode=="t"?"second":"Quantum")
		document.getElementById("autoGhostRotate4").textContent=player.ghostify.automatorGhosts[4].rotate=="l"?"Left":"Right"
		document.getElementById("autoGhost11pw").value=player.ghostify.automatorGhosts[11].pw
		document.getElementById("autoGhost11lw").value=player.ghostify.automatorGhosts[11].lw
		document.getElementById("autoGhost11cw").value=player.ghostify.automatorGhosts[11].cw
		document.getElementById("autoGhost13t").value=player.ghostify.automatorGhosts[13].t
		document.getElementById("autoGhost13u").value=player.ghostify.automatorGhosts[13].u
		document.getElementById("autoGhost15a").value=formatValue("Scientific", player.ghostify.automatorGhosts[15].a, 2, 1)
	}
	document.getElementById("consumedPower").textContent=powerConsumed.toFixed(2)
	isAutoGhostsSafe=player.ghostify.automatorGhosts.power>=powerConsumed
	document.getElementById("tooMuchPowerConsumed").style.display=isAutoGhostsSafe?"none":""
}

function toggleAutoGhost(id) {
	player.ghostify.automatorGhosts[id].on = document.getElementById("isAutoGhostOn" + id).checked
	updateAutoGhosts()
}

function isAutoGhostActive(id) {
	if (!ghostified) return
	return player.ghostify.automatorGhosts[id].on
}

function changeAutoGhost(o) {
	if (o=="4m") {
		player.ghostify.automatorGhosts[4].mode=player.ghostify.automatorGhosts[4].mode=="t"?"q":"t"
		document.getElementById("autoGhostMod4").textContent="Every "+(player.ghostify.automatorGhosts[4].mode=="t"?"second":"Quantum")
	} else if (o=="4r") {
		player.ghostify.automatorGhosts[4].rotate=player.ghostify.automatorGhosts[4].rotate=="l"?"r":"l"
		document.getElementById("autoGhostRotate4").textContent=player.ghostify.automatorGhosts[4].rotate=="l"?"Left":"Right"
	} else if (o=="11pw") {
		var num=parseFloat(document.getElementById("autoGhost11pw").value)
		if (!isNaN(num)&&num>0) player.ghostify.automatorGhosts[11].pw=num
	} else if (o=="11lw") {
		var num=parseFloat(document.getElementById("autoGhost11lw").value)
		if (!isNaN(num)&&num>0) player.ghostify.automatorGhosts[11].lw=num
	} else if (o=="11cw") {
		var num=parseFloat(document.getElementById("autoGhost11cw").value)
		if (!isNaN(num)&&num>0) player.ghostify.automatorGhosts[11].cw=num
	} else if (o=="13t") {
		var num=parseFloat(document.getElementById("autoGhost13t").value)
		if (!isNaN(num)&&num>=0) player.ghostify.automatorGhosts[13].t=num
	} else if (o=="13u") {
		var num=parseFloat(document.getElementById("autoGhost13u").value)
		if (!isNaN(num)&&num>0) player.ghostify.automatorGhosts[13].u=num
	} else if (o=="15a") {
		var num=fromValue(document.getElementById("autoGhost15a").value)
		if (!isNaN(break_infinity_js?num:num.l)) player.ghostify.automatorGhosts[15].a=num
	}
}

function rotateAutoUnstable() {
	var tg=player.ghostify.automatorGhosts[3].on
	if (player.ghostify.automatorGhosts[4].rotate=="l") {
		player.ghostify.automatorGhosts[3].on=player.ghostify.automatorGhosts[1].on
		player.ghostify.automatorGhosts[1].on=player.ghostify.automatorGhosts[2].on
		player.ghostify.automatorGhosts[2].on=tg
	} else {
		player.ghostify.automatorGhosts[3].on=player.ghostify.automatorGhosts[2].on
		player.ghostify.automatorGhosts[2].on=player.ghostify.automatorGhosts[1].on
		player.ghostify.automatorGhosts[1].on=tg
	}
	for (var g=1;g<4;g++) document.getElementById("isAutoGhostOn"+g).checked=player.ghostify.automatorGhosts[g].on
}

//v2.1
function startEC10() {
	if (canUnlockEC(10, 550, 181)) {
		justImported=true
		document.getElementById("ec10unl").onclick()
		justImported=false
	}
	startEternityChallenge(10)
}

function getBU1Power(branch) {
	let x=getBranchUpgLevel(branch,1)
	let s=Math.floor(Math.sqrt(0.25+2*x/120)-0.5)
	return s*120+(x-s*(s+1)*60)/(s+1)
}

function subNeutrinos(sub) {
	let neu=player.ghostify.neutrinos
	let sum=neu.electron.add(neu.mu).add(neu.tau).round()
	let gen=["electron","mu","tau"]
	for (g=0;g<3;g++) neu[gen[g]]=neu[gen[g]].sub(neu[gen[g]].div(sum).times(sub).min(neu[gen[g]])).round()
}

function getGHPMultCost(offset=0) {
	let lvl=player.ghostify.multPower+offset
	return Decimal.pow(5,lvl*2+Math.max(lvl-85,0)*(lvl-84)-1).times(25e8)
}

function getRDPower(branch) {
	let x=getRadioactiveDecays(branch)
	let y=Math.max(x-5,0)
	return x*25+(Math.pow(y,2)+y)*1.25
}

function updateGPHUnlocks() {
	let unl=player.ghostify.ghostlyPhotons.unl
	document.getElementById("gphUnl").style.display=unl?"none":""
	document.getElementById("gphDiv").style.display=unl?"":"none"
	document.getElementById("gphRow").style.display=unl?"":"none"
	document.getElementById("breakUpgR3").style.display=unl?"":"none"
	document.getElementById("bltabbtn").style.display=unl?"":"none"
}

function getGPHProduction() {
	if (tmp.qu.bigRip.active) var ret=player.dilation.dilatedTime.div("1e480")
	else var ret=player.dilation.dilatedTime.div("1e930")
	if (ret.gt(1)) ret=ret.pow(0.02)
	return ret
}

function getGHRProduction() {
	return player.ghostify.ghostlyPhotons.amount.sqrt().div(2)
}

function getGHRCap() {
	return player.ghostify.ghostlyPhotons.darkMatter.pow(0.4).times(1e3)
}

function getLightThreshold(l) {
	return Decimal.pow(tmp.lti[l],player.ghostify.ghostlyPhotons.lights[l]).times(tmp.lt[l])
}

function getLightEmpowermentReq() {
	return Math.floor(player.ghostify.ghostlyPhotons.enpowerments*2.4+1)
}

function lightEmpowerment() {
	if (!(player.ghostify.ghostlyPhotons.lights[7]>=getLightEmpowermentReq())) return
	if (!player.aarexModifications.leNoConf && !confirm("You will become a ghost, but Ghostly Photons will be reset, in exchange for 1 Light Empowerment. Are you sure you want to proceed?")) return
	ghostify(false, true)
	player.ghostify.ghostlyPhotons.amount=new Decimal(0)
	player.ghostify.ghostlyPhotons.darkMatter=new Decimal(0)
	player.ghostify.ghostlyPhotons.ghostlyRays=new Decimal(0)
	player.ghostify.ghostlyPhotons.lights=[0,0,0,0,0,0,0,0]
	if (!player.ghostify.ghostlyPhotons.enpowerments) document.getElementById("leConfirmBtn").style.display = "inline-block"
	player.ghostify.ghostlyPhotons.enpowerments++
}

//v2.2
function canBuyGalaxyThresholdUpg() {
	return !tmp.ngp3 || player.dilation.rebuyables[2]<60
}

function showQCModifierStats(id) {
	tmp.pct=id
	updatePCTable()
}

function updatePCTable() {
	var data=tmp.qu.qcsMods[tmp.pct]
	for (r=1;r<9;r++) for (c=1;c<9;c++) {
		if (r!=c) {
			var divid = "pc" + (r*10+c)
			var pcid = r*10+c
			if (r>c) pcid = c*10+r
			if (tmp.pct=="") {
				var comp = tmp.qu.pairedChallenges.completions[pcid]
				if (comp !== undefined) {
					document.getElementById(divid).textContent = "PC" + comp
					document.getElementById(divid).className = (tmp.qu.qcsNoDil["pc" + pcid] ? "nd" : "pc" + comp) + "completed"
					var achTooltip = 'Fastest time: ' + (tmp.qu.pairedChallenges.fastest[pcid] ? timeDisplayShort(tmp.qu.pairedChallenges.fastest[pcid]) : "N/A")
					if (tmp.qu.qcsNoDil["pc" + pcid]) achTooltip += ", No dilation: PC" + tmp.qu.qcsNoDil["pc" + pcid]
					document.getElementById(divid).setAttribute('ach-tooltip', achTooltip)
					if (divid=="pc38") giveAchievement("Hardly marked")
					if (divid=="pc68") giveAchievement("Big Rip isn't enough")
				} else if (pcid == 68 && ghostified) {
					document.getElementById(divid).textContent = "BR"
					document.getElementById(divid).className = "brCompleted"
					document.getElementById(divid).removeAttribute('ach-tooltip')
					document.getElementById(divid).setAttribute('ach-tooltip', 'Fastest time from start of Ghostify: ' + timeDisplayShort(player.ghostify.best))
				} else {
					document.getElementById(divid).textContent = ""
					document.getElementById(divid).className = ""
					document.getElementById(divid).removeAttribute('ach-tooltip')
				}
			} else if (data&&data["pc" + pcid]) {
				var comp = data["pc" + pcid]
				document.getElementById(divid).textContent = "PC" + comp
				document.getElementById(divid).className = "pc" + comp + "completed"
				document.getElementById(divid).removeAttribute('ach-tooltip')
			} else {
				document.getElementById(divid).textContent = ""
				document.getElementById(divid).className = ""
				document.getElementById(divid).removeAttribute('ach-tooltip')
			}
		} else {
			var divid="qcC"+r
			if (tmp.pct==""||(data&&data["qc"+r])) {
				document.getElementById(divid).textContent = "QC"+r
				if (tmp.qu.qcsNoDil["qc"+r]&&tmp.pct=="") {
					document.getElementById(divid).className = "ndcompleted"
					document.getElementById(divid).setAttribute('ach-tooltip', "No Dilation achieved!")
				} else {
					document.getElementById(divid).className = "pc1completed"
					document.getElementById(divid).removeAttribute('ach-tooltip')
				}
			} else {
				document.getElementById(divid).textContent = ""
				document.getElementById(divid).className = ""
				document.getElementById(divid).removeAttribute('ach-tooltip')
			}
		}
	}
	document.getElementById("upcc").textContent = (tmp.pct==""?"Unique PC completions":(qcm.names[tmp.pct]||"???"))+": "+(tmp.pcc.normal||0)+" / 28"
	document.getElementById("udcc").style.display = tmp.pct==""?"block":"none"
	document.getElementById("udcc").textContent="No dilation: "+(tmp.pcc.noDil||0)+" / 28"
}

function showNFTab(tabName) {
	//iterate over all elements in div_tab class. Hide everything that's not tabName and show tabName
	var tabs = document.getElementsByClassName('nftab');
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
	if (oldTab !== tabName) player.aarexModifications.tabsSave.tabNF = tabName
	closeToolTip()
}

function getMinimumUnstableQuarks() {
	let r={quarks:new Decimal(1/0),decays:1/0}
	let c=["r","g","b"]
	for (var i=0;i<3;i++) {
		let b=tmp.qu.tod[c[i]]
		let d=b.decays||0
		if (r.decays>d||(r.decays==d&&b.quarks.lte(r.quarks))) r={quarks:b.quarks,decays:d}
	}
	return r
}

function getMaximumUnstableQuarks() {
	let r={quarks:new Decimal(0),decays:0}
	let c=["r","g","b"]
	for (var i=0;i<3;i++) {
		let b=tmp.qu.tod[c[i]]
		let d=b.decays||0
		if (r.decays<d||(r.decays==d&&b.quarks.gte(r.quarks))) r={quarks:b.quarks,decays:d}
	}
	return r
}

function getGhostifiedGain() {
	let r=1
	if (hasBosonicUpg(15)) r=nN(tmp.blu[15].gh)
	return r
}

function getLightEmpowermentBoost() {
	let r=player.ghostify.ghostlyPhotons.enpowerments
	if (hasBosonicUpg(13)) r*=tmp.blu[13]
	return r
}

function toggleLEConf() {
	player.aarexModifications.leNoConf = !player.aarexModifications.leNoConf
	document.getElementById("leConfirmBtn").textContent = "Light Empowerment confirmation: O" + (player.aarexModifications.leNoConf ? "FF" : "N")
}

//Quantum Challenge modifiers
var qcm={
	modifiers:["ad","sm"],
	names:{
		ad:"Anti-Dilation",
		sm:"Supermastery"
	},
	reqs:{
		ad:100,
		sm:165
	},
	descs:{
		ad:"You always have no Tachyon particles. You can dilate time, but you can't gain Tachyon particles.",
		sm:"You cannot use normal time studies, and have no more than 20 mastery studies."
	},
	on:[]
}

function toggleQCModifier(id) {
	if (!(ranking>=qcm.reqs[id])&&qcm.reqs[id]) return
	if (qcm.on.includes(id)) {
		let data=[]
		for (var m=0;m<qcm.on.length;m++) if (qcm.on[m]!=id) data.push(qcm.on[m])
		qcm.on=data
	} else qcm.on.push(id)
	document.getElementById("qcm_"+id).className=qcm.on.includes(id)?"chosenbtn":"storebtn"
}

function inQCModifier(id) {
	if (player.masterystudies==undefined) return
	return tmp.qu.qcsMods.current.includes(id)
}

function recordModifiedQC(id,num,mod) {
	var data=tmp.qu.qcsMods[mod]
	if (data===undefined) {
		data={}
		tmp.qu.qcsMods[mod]=data
	}
	if (data[id]===undefined) data[id]=num
	else data[id]=Math.min(num,data[id])
}

function gainNeutrinos(bulk,type) {
	let gain=getNeutrinoGain().times(bulk)
	let gens=["electron","mu","tau"]
	if (type=="all") {
		for (var g=0;g<3;g++) {
			var gen=gens[g]
			player.ghostify.neutrinos[gen]=player.ghostify.neutrinos[gen].add(gain).round()
		}
	} else if (type=="gen") {
		var gen=gens[player.ghostify.neutrinos.generationGain-1]
		player.ghostify.neutrinos[gen]=player.ghostify.neutrinos[gen].add(gain).round()
	}
}

//Bosonic Lab
function updateBLUnlocks() {
	let unl=player.ghostify.wzb.unl
	document.getElementById("blUnl").style.display=unl?"none":""
	document.getElementById("blDiv").style.display=unl?"":"none"
	document.getElementById("nftabs").style.display=unl?"":"none"
}

function getBosonicWattGain() {
	return player.money.log10()/2e16-1.25
}

function bosonicTick(diff) {
	let lDiff //Mechanic-local diff
	let lData //Mechanic-local data
	let data=tmp.bl
	diff=new Decimal(diff)
	if (isNaN(diff.e)) return
	if (data.odSpeed>1&&data.battery.gt(0)) {
		var bBtL=getBosonicBatteryLoss()
		var odDiff=diff.times(bBtL).min(data.battery)
		var fasterDiff=odDiff.div(bBtL).times(data.odSpeed)
		data.battery=data.battery.sub(diff.times(bBtL).min(data.battery))
		diff=fasterDiff.add(diff.sub(odDiff.min(diff)))
	}
	data.ticks=data.ticks.add(diff)
	
	//W & Z Bosons
	let apDiff
	let apSpeed
	lDiff=diff.times(tmp.wzbs)
	lData=player.ghostify.wzb
	if (lData.dPUse) {
		apDiff=lDiff.times(getAntiPreonLoss()).min(lData.dP).div(aplScalings[player.ghostify.wzb.dPUse])
		if (isNaN(apDiff.e)) apDiff=new Decimal(0)
		if (lData.dPUse==1) {
			lData.wQkProgress=lData.wQkProgress.add(apDiff.times(tmp.zbs))
			if (lData.wQkProgress.gt(1)) {
				let toSub=lData.wQkProgress.floor()
				lData.wpb=lData.wpb.add(toSub.add(lData.wQkUp?1:0).div(2).floor())
				lData.wnb=lData.wnb.add(toSub.add(lData.wQkUp?0:1).div(2).floor())
				if (toSub.mod(2).gt(0)) lData.wQkUp=!lData.wQkUp
				lData.wQkProgress=lData.wQkProgress.sub(toSub.min(lData.wQkProgress))
				data.battery=data.battery.add(toSub.div(1e6))
			}
		}
		if (lData.dPUse==2) {
			lData.zNeProgress=lData.zNeProgress.add(apDiff.times(getOscillateGainSpeed()))
			if (lData.zNeProgress.gte(1)) {
				let oscillated=Math.floor(lData.zNeProgress.add(1).log(2))
				lData.zb=lData.zb.add(Decimal.pow(Math.pow(2,0.75),oscillated).sub(1).div(Math.pow(2,0.75)-1).times(lData.zNeReq.pow(0.75)))
				lData.zNeProgress=lData.zNeProgress.sub(Decimal.pow(2,oscillated).sub(1).min(lData.zNeProgress)).div(Decimal.pow(2,oscillated))
				lData.zNeReq=lData.zNeReq.times(Decimal.pow(2,oscillated))
				lData.zNeGen=(lData.zNeGen+oscillated-1)%3+1
			}
		}
		if (lData.dPUse==3) {
			lData.wpb=lData.wpb.add(lData.wnb.min(apDiff).times(tmp.zbs))
			lData.wnb=lData.wnb.sub(lData.wnb.min(apDiff).times(tmp.zbs))
		}
		lData.dP=lData.dP.sub(lDiff.times(getAntiPreonLoss()).min(lData.dP))
		if (lData.dP.eq(0)) lData.dPUse=0
	} else lData.dP=lData.dP.add(getAntiPreonProduction().times(lDiff))
	lData.zNeReq=Decimal.pow(10,Math.sqrt(Math.max(Math.pow(lData.zNeReq.log10(),2)-lDiff/100,0)))
	
	//Bosonic Extractor
	if (data.usedEnchants.includes(12)) {
		data.autoExtract=data.autoExtract.add(diff.times(tmp.bEn[12]))
		if (!data.extracting&&data.autoExtract.gte(1)) {
			data.extracting=true
			data.autoExtract=data.autoExtract.sub(1)
			dynuta.times=0
		}
	} else data.autoExtract=new Decimal(1)
	if (data.extracting) data.extractProgress=data.extractProgress.add(diff.div(getExtractTime()))
	if (data.extractProgress.gte(1)) {
		var oldAuto=data.autoExtract.floor()
		if (!data.usedEnchants.includes(12)) oldAuto=new Decimal(0)
		var toAdd=data.extractProgress.min(oldAuto.add(1).round()).floor()
		data.autoExtract=data.autoExtract.sub(toAdd.min(oldAuto))
		data.glyphs[data.typeToExtract-1]=data.glyphs[data.typeToExtract-1].add(toAdd).round()
		if (dynuta.check) {
			dynuta.check=false
			dynuta.times++
			if (dynuta.times>=20) giveAchievement("Did you not understand the automation?")
		}
		if (data.usedEnchants.includes(12)&&oldAuto.add(1).round().gt(toAdd)) data.extractProgress=data.extractProgress.sub(toAdd.min(data.extractProgress))
		else {
			data.extracting=false
			data.extractProgress=new Decimal(0)
		}
	}
	if (data.extracting&&data.extractProgress.lt(1)) {
		dynuta.check=false
		dynuta.times=0
	}
	
	//Bosonic Antimatter production
	data.am=data.am.add(getBosonicAMProduction().times(diff))
}

function getBosonicAMProduction() {
	let r=Decimal.pow(10,player.money.max(1).log10()/15e15-3) //Antimatter part: you gain bosonic antimatter from your antimatter 
	r=r.times(tmp.wbp) //W Bosons part: from the w boson multiplier
	return r
}

function showBLTab(tabName) {
	//iterate over all elements in div_tab class. Hide everything that's not tabName and show tabName
	var tabs = document.getElementsByClassName('bltab');
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
	if (oldTab !== tabName) player.aarexModifications.tabsSave.tabBL = tabName
	closeToolTip()
}

function updateBosonicStuffCosts() {
	for (var g2=2;g2<=br.limit;g2++) for (var g1=1;g1<g2;g1++) {
		var id=g1*10+g2
		var data=bEn.costs[id]
		document.getElementById("bEnG1Cost"+id).textContent=(data!==undefined&&data[0]!==undefined&&shortenDimensions(data[0]))||"???"
		document.getElementById("bEnG2Cost"+id).textContent=(data!==undefined&&data[1]!==undefined&&shortenDimensions(data[1]))||"???"
	}
	for (var r=1;r<=bu.rows;r++) for (var c=1;c<6;c++) {
		var id=r*10+c
		var data=bu.reqData[id]
		document.getElementById("bUpgCost"+id).textContent=(data[0]!==undefined&&shorten(data[0]))||"???"
		for (var g=1;g<3;g++) document.getElementById("bUpgG"+g+"Req"+id).textContent=(data[g*2-1]!==undefined&&shortenDimensions(new Decimal(data[g*2-1])))||"???"
	}
}

//Bosonic Extractor / Bosonic Runes
let dynuta={
	check:false,
	times:0
}
function extract() {
	let data=tmp.bl
	if (data.extracting) return
	dynuta.check=true
	data.extracting=true
}

function getExtractTime() {
	let data=tmp.bl
	let r=new Decimal(br.scalings[data.typeToExtract]||1/0)
	r=r.div(tmp.wbt)
	return r
}

function changeTypeToExtract(x) {
	let data=tmp.bl
	if (data.typeToExtract==x) return
	document.getElementById("typeToExtract"+data.typeToExtract).className="storebtn"
	document.getElementById("typeToExtract"+x).className="chosenbtn"
	data.typeToExtract=x
	data.extracting=false
	data.extractProgress=new Decimal(0)
	data.autoExtract=new Decimal(1)
}

function canBuyEnchant(id) {
	let data=tmp.bl
	let costData=bEn.costs[id]
	let g1=Math.floor(id/10)
	let g2=id%10
	if (costData===undefined) return
	if (costData[0]===undefined||!data.glyphs[g1-1].gte(costData[0])) return
	if (costData[1]===undefined||!data.glyphs[g2-1].gte(costData[1])) return
	return true
}

function getMaxEnchantLevelGain(id) {
	let data=tmp.bl
	let costData=bEn.costs[id]
	let g1=Math.floor(id/10)
	let g2=id%10
	let lvl1=data.glyphs[g1-1].div(costData[0]).floor()
	let lvl2=data.glyphs[g2-1].div(costData[1]).floor()
	return lvl1.min(lvl2)
}

function canUseEnchant(id) {
	if (!tmp.bl.enchants[id]) return
	if (bEn.limit==1) {
		if (tmp.bl.usedEnchants.includes(id)) return
	} else if (!tmp.bl.usedEnchants.includes(id)&&tmp.bl.usedEnchants.length>=bEn.limit) return
	return true
}

function takeEnchantAction(id) {
	let data=tmp.bl
	if (bEn.action=="upgrade") {
		let costData=bEn.costs[id]
		let g1=Math.floor(id/10)
		let g2=id%10
		if (!canBuyEnchant(id)) return
		data.glyphs[g1-1]=data.glyphs[g1-1].sub(costData[0]).round()
		data.glyphs[g2-1]=data.glyphs[g2-1].sub(costData[1]).round()
		if (data.enchants[id]==undefined) data.enchants[id]=new Decimal(1)
		else data.enchants[id]=data.enchants[id].add(1).round()
	} else if (bEn.action=="max") {
		let lvl=getMaxEnchantLevelGain(id)
		let costData=bEn.costs[id]
		let g1=Math.floor(id/10)
		let g2=id%10
		if (!canBuyEnchant(id)) return
		data.glyphs[g1-1]=data.glyphs[g1-1].sub(lvl.times(costData[0]).min(data.glyphs[g1-1])).round()
		data.glyphs[g2-1]=data.glyphs[g2-1].sub(lvl.times(costData[1]).min(data.glyphs[g2-1])).round()
		if (data.enchants[id]==undefined) data.enchants[id]=new Decimal(lvl)
		else data.enchants[id]=data.enchants[id].add(lvl).round()
	} else if (bEn.action=="use") {
		if (canUseEnchant(id)) {
			if (bEn.limit==1) data.usedEnchants=[id]
			else {
				if (data.usedEnchants.includes(id)) {
					var newData=[]
					for (var u=0;u<data.usedEnchants.length;u++) if (data.usedEnchants[u]!=id) newData.push(data.usedEnchants[u])
					data.usedEnchants=newData
				} else data.usedEnchants.push(id)
			}
		}
	}
}

function changeEnchantAction(id) {
	bEn.action=bEn.actions[id-1]
}

function getEnchantEffect(id, desc) {
	let data=tmp.bl
	let l=new Decimal(0)
	if (bEn.effects[id]===undefined) return
	if (desc?data.enchants[id]:data.usedEnchants.includes(id)) l=data.enchants[id]
	return bEn.effects[id](l)
}

function updateEnchantDescs() {
	let data=tmp.bl
	for (var g2=2;g2<=br.limit;g2++) for (var g1=1;g1<g2;g1++) {
		var id=g1*10+g2
		if (bEn.action=="upgrade"||bEn.action=="max") document.getElementById("bEn"+id).className="gluonupgrade "+(canBuyEnchant(id)?"bl":"unavailablebtn")
		else if (bEn.action=="use") document.getElementById("bEn"+id).className="gluonupgrade "+(canUseEnchant(id)?"storebtn":"unavailablebtn")
		if (shiftDown) document.getElementById("bEnLvl"+id).textContent="Enchant id: "+id
		else document.getElementById("bEnLvl"+id).textContent="Level: "+shortenDimensions(tmp.bEnLvl[id])
		if (bEn.action=="max") document.getElementById("bEnOn"+id).textContent="+"+shortenDimensions(getMaxEnchantLevelGain(id))+" levels"
		else document.getElementById("bEnOn"+id).textContent=data.usedEnchants.includes(id)?"Enabled":"Disabled"
		if (tmp.bEn[id]!=undefined) {
			let effect=getEnchantEffect(id,true)
			if (id==12) {
				effect=effect.times(data.speed*(data.battery.gt(0)?data.odSpeed:1))
				if (effect.lt(1)&&effect.gt(0)) document.getElementById("bEnEffect"+id).textContent=effect.m.toFixed(2)+"/"+shortenCosts(Decimal.pow(10,-effect.e))+" seconds"
				else document.getElementById("bEnEffect"+id).textContent=shorten(effect)+"/second"
			} else document.getElementById("bEnEffect"+id).textContent=shorten(effect)+"x"	
		}
	}
	document.getElementById("usedEnchants").textContent="You have used "+data.usedEnchants.length+" / "+bEn.limit+" Bosonic Enchant slots."
}

var br={ // bosonic runes
	names:[null, "Infinity", "Eternity", "Quantum", "Ghostly", "Ethereal", "Sixth", "Seventh", "Eighth", "Ninth"], //Current maximum limit of 9.
	limit:3,
	scalings:{ // the base amount of time a bosonic rune will take to be extracted in seconds
		1: 60,
		2: 120,
		3: 600
	}
}
var bEn={ // bosonic enchants
	costs:{
		12: [3,1],
		13: [20,2],
		23: [1e4,2e3]
	},
	descs:{
		12: "You automatically extract Bosonic Runes.",
		13: "Speed up the production and use of Anti-Preons.",
		23: "Bosonic Antimatter boosts oscillate speed."
	},
	effects:{
		12: function(l) {
			return l.pow(0.75).div(bEn.autoScalings[tmp.bl.typeToExtract])
		},
		13: function(l) {
			return Decimal.add(l,1).sqrt()
		},
		23: function(l) {
			let exp=Math.max(l.log10()+1,0)/3
			if (tmp.bl.am.gt(1e11)) exp*=tmp.bl.am.div(10).log10()/10
			if (exp>5) exp=Math.sqrt(exp*5)
			return Decimal.pow(tmp.bl.am.add(10).log10(),exp)
		}
	},
	action:"upgrade",
	actions:["upgrade","max","use"],
	limit:2,
	autoScalings:{
		1: 1.5,
		2: 3,
		3: 12,
		4: 1/0,
		5: 1/0
	}
}

//Bosonic Upgrades
function setupBosonicUpgReqData() {
	for (var r=1;r<=bu.rows;r++) for (var c=1;c<6;c++) {
		var id=r*10+c
		var data=bu.costs[id]
		var rData=[undefined,undefined,0,undefined,0]
		if (data) {
			if (data.am!==undefined) rData[0]=data.am
			var p=1
			for (var g=1;g<=br.limit;g++) if (data["g"+g]!==undefined) {
				rData[p*2-1]=data["g"+g]
				rData[p*2]=g
				p++
			}
		}
		bu.reqData[id]=rData
	}
}

function canBuyBosonicUpg(id) {
	let rData=bu.reqData[id]
	if (rData[0]===undefined||rData[1]===undefined||rData[3]===undefined) return
	if (!tmp.bl.am.gte(rData[0])) return
	for (var g=1;g<3;g++) if (!tmp.bl.glyphs[rData[g*2]-1].gte(rData[g*2-1])) return
	return true
}

function buyBosonicUpgrade(id) {
	if (tmp.bl.upgrades.includes(id)) return
	if (!canBuyBosonicUpg(id)) return
	tmp.bl.upgrades.push(id)
	tmp.bl.am=tmp.bl.am.sub(bu.reqData[id][0])
	updateTemp()
}

function hasBosonicUpg(id) {
	return ghostified && player.ghostify.wzb.unl && tmp.bl.upgrades.includes(id)
}

function updateBosonicUpgradeDescs() {
	for (var r=1;r<=bu.rows;r++) for (var c=1;c<6;c++) {
		var id=r*10+c
		document.getElementById("bUpg"+id).className=tmp.bl.upgrades.includes(id)?"gluonupgradebought bl":canBuyBosonicUpg(id)?"gluonupgrade bl":"gluonupgrade unavailablebtn"
		if (tmp.blu[id]!==undefined) {
			if (id==11) document.getElementById("bUpgEffect"+id).textContent=(tmp.blu[id]*100).toFixed(1)+"%"
			else if (id==12) document.getElementById("bUpgEffect"+id).textContent="-"+tmp.blu[id].toFixed(5)
			else if (id==14) document.getElementById("bUpgEffect"+id).textContent=getFullExpansion(tmp.blu[id])+(tmp.blu[id]>tmp.qu.electrons.sacGals&&!tmp.qu.bigRip.active?" (+"+getFullExpansion(Math.max(tmp.blu[id]-tmp.qu.electrons.sacGals,0))+" Antielectronic Galaxies)":"")
			else if (id==15) document.getElementById("bUpgEffect"+id).textContent=shorten(tmp.blu[id].gh)+"x more Ghostifies & "+shorten(tmp.blu[id].dt)+"x more DT"
			else if (id==25) document.getElementById("bUpgEffect"+id).textContent="^"+tmp.blu[25].toFixed(2)
			else document.getElementById("bUpgEffect"+id).textContent=shorten(tmp.blu[id])+"x"
		}
	}
}

var bu={ // bosonic upgrades
	rows:2, // how many rows of bosonic upgrades there are
	costs:{ // the runes are required, but bosonic antimatter is deducted.
		11: {
			am: 200, // bosonic antimatter
			g1: 200, // infinity rune
			g2: 100  // eternity rune
		},
		12: {
			am: 4e5,
			g2: 3e3,
			g3: 800 // quantum rune
		},
		13: {
			am: 3e6,
			g1: 1e4,
			g3: 1e3
		},
		14: {
			am: 2e8,
			g1: 2e5,
			g2: 1e5
		},
		15: {
			am: 1e9,
			g2: 25e4,
			g3: 35e3,
		},
		21: {
			am: 8e10,
			g1: 5e6,
			g2: 25e5
		},
		22: {
			am: 5e11,
			g2: 4e6,
			g3: 75e4
		},
		23: {
			am: 1e13,
			g1: 15e6,
			g3: 15e3
		},
		24: {
			am: 1e15,
			g1: 8e7,
			g2: 4e7
		},
		25: {
			am: 1.5e17,
			g2: 75e6,
			g3: 15e6,
		}
	},
	reqData:{},
	descs:{
		11: "Bosonic Antimatter boosts the Blue Light effect.",
		12: "For every 100% of green power effect, decrease the free galaxy threshold increase by 0.0007.",
		13: "Radioactive Decays boost the effect of Light Empowerments.",
		14: "Your free galaxies cancel fewer galaxies based on the amount of sacrificed galaxies.",
		15: "Ghostifies and dilated time power up each other.",
		21: "Replace first Nanofield reward with a boost to delay Dimension Supersonic scaling.",
		22: "Replace seventh Nanofield reward with a boost to neutrino gain and preon charge.",
		23: "Assigning gives more colored quarks based on your meta-antimatter.",
		24: "You produce Space Shards while in a Big Rip, but Break Eternity upgrades are nerfed.",
		25: "Electrons boost the per-ten Meta Dimensions multiplier."
	},
	effects:{
		11: function() {
			let l=tmp.bl.am.add(1).log10()
			return Math.pow(l,0.5-0.25*l/(l+3))/4
		},
		12: function() {
			return (colorBoosts.g+tmp.pe-1)*7e-4
		},
		13: function() {
			return Math.max(Math.sqrt(getRadioactiveDecays('r')+getRadioactiveDecays('g')+getRadioactiveDecays('b'))/3+.6,1)
		},
		14: function() {
			let x = Math.pow(Math.max(player.dilation.freeGalaxies / 20 - 1800, 0), 1.5)
			let y = tmp.qu.electrons.sacGals
			let z = Math.max(y, player.galaxies)
			if (!tmp.ngp3l && x > y) x = (x + y * 2) / 3
			if (x > z) x = Math.pow((x - z + 1e5) * 1e10, 1/3) + z - 1e5
			return Math.round(x)
		},
		15: function() {
			let gLog = Decimal.max(player.ghostify.times,1).log10()
			return {
				dt: Decimal.pow(10,2*gLog+3*gLog/(gLog/20+1)),
				gh: player.dilation.dilatedTime.div("1e1520").add(1).pow(.05)
			}
		},
		23: function() {
			return player.meta.antimatter.add(1).pow(0.06)
		},
		25: function() {
			return Math.sqrt(tmp.qu.electrons.amount+1)/8e3+1
		}
	}
}

//Bosonic Overdrive
function getBosonicBatteryLoss() {
	if (tmp.bl.odSpeed==1) return new Decimal(0)
	return Decimal.pow(10,tmp.bl.odSpeed*2-3)
}

function changeOverdriveSpeed() {
	tmp.bl.odSpeed=document.getElementById("odSlider").value/50*4+1
}

//W & Z Bosons
function getAntiPreonProduction() {
	let r=new Decimal(0.1)
	if (tmp.bl.usedEnchants.includes(13)) r=r.times(tmp.bEn[13])
	return r
}

var aplScalings={
	0:0,
	1:8,
	2:32,
	3:16
}

function getAntiPreonLoss() { // calculates how much antipreons lost per second during use
	let r=new Decimal(0.05)
	if (tmp.bl.usedEnchants.includes(13)) r=r.times(tmp.bEn[13])
	return r
}

function useAntiPreon(id) {
	player.ghostify.wzb.dPUse=id
}

function getOscillateGainSpeed() {
	let r=tmp.wbo
	if (tmp.bl.usedEnchants.includes(23)) r=r.times(tmp.bEn[23])
	return Decimal.div(r,player.ghostify.wzb.zNeReq)
}

//Anti-Preontius' Lair
function getAntiPreonGhostWake() {
	return 104
}

//v2.21: NG+3.1
function setNonlegacyStuff() {
	//Bosonic Runes/Extractor/Enchants
	if (!br.maxLimit) br.maxLimit=br.limit
	br.limit=tmp.ngp3l?3:br.maxLimit
	
	//Bosonic Upgrades
	if (!bu.maxRows) bu.maxRows=bu.rows
	bu.rows=tmp.ngp3l?2:bu.maxRows
}

function displayNonlegacyStuff() {
	//QC Modifiers
	for (var m=1;m<qcm.modifiers.length;m++) document.getElementById("qcm_"+qcm.modifiers[m]).style.display=tmp.ngp3l?"none":""

	//Bosonic Runes/Extractor/Enchants
	var width=100/br.limit
	for (var r=1;r<=br.maxLimit;r++) {
		document.getElementById("bRune"+r).style="min-width:"+width+"%;width:"+width+"%;max-width:"+width+"%"
		if (r>3) {
			document.getElementById("bRuneCol"+r).style.display=tmp.ngp3l?"none":""
			document.getElementById("typeToExtract"+r).style.display=tmp.ngp3l?"none":""
			document.getElementById("bEnRow"+(r-1)).style.display=tmp.ngp3l?"none":""
		}
	}
	
	//Bosonic Upgrades
	for (var r=3;r<=bu.maxRows;r++) document.getElementById("bUpgRow"+r).style.display=tmp.ngp3l?"none":""
}

function exitLegacy() { // convert NG+3L to NG+3.1
	if (!confirm("This will migrate your current NG+3L (legacy) save into NG+3.1. This process is irreversible, so it is recommended you create a backup of your current save by exporting. Are you sure you want to migrate?")) return
	clearInterval(gameLoopIntervalId)
	delete player.aarexModifications.ngp3lV
	set_save(metaSave.current, player)
	reload()
}

function getOldAgeRequirement() { // this will decide the requirement of the Old Age achievement
	let year = new Date().getFullYear() || 2020
	if (tmp.ngp3l) year = 2019
	return Decimal.pow(10, 3 * 86400 * 365.2425 * year)
}

function getNanofieldRewardTier(reward, rewards) {
	let x = Math.ceil((rewards - reward + 1) / 8)
	let apgw = tmp.apgw
	if (rewards >= apgw) {
		let sbsc = Math.ceil((apgw - reward + 1) / 8)
		x = Math.sqrt((x / 2 + sbsc / 2) * sbsc)
		if (reward == (rewards - 1) % 8 + 1) x += 0.5
	}
	return x
}

function getTreeUpgradeEfficiency(mod) { // get the tree upgrade multiplier
	let r=1
	if (player.ghostify.neutrinos.boosts>6&&(tmp.qu.bigRip.active||mod=="br")&&mod!="noNB") r+=tmp.nb[6]
	if (player.achievements.includes("ng3p62")&&tmp.qu.bigRip.active&&!tmp.be&&!tmp.ngp3l) r+=0.5
	return r
}

function getBigRipUpg15Effect() {
	let r = Math.sqrt(player.eternityPoints.add(1).log10()) * 3.55
	if (r > 1e4 && !tmp.ngp3l) r = Math.sqrt(r * 1e4)
	return r
}