//Quantum worth
var quantumWorth
function updateQuantumWorth(mode) {
	if (player.ghostify.milestones<8) {
		if (mode!="notation") mode=undefined
	} else if (mode=="notation") return
	if (mode != "notation") {
		if (mode != "display") quantumWorth = tmp.qu.quarks.add(tmp.qu.usedQuarks.r).add(tmp.qu.usedQuarks.g).add(tmp.qu.usedQuarks.b).add(tmp.qu.gluons.rg).add(tmp.qu.gluons.gb).add(tmp.qu.gluons.br).round()
		if (player.ghostify.times) {
			var automaticCharge = Math.max(Math.log10(quantumWorth.add(1).log10()/150)/Math.log10(2),0)+Math.max(tmp.qu.bigRip.spaceShards.add(1).log10()/20-0.5,0)
			player.ghostify.automatorGhosts.power = Math.max(automaticCharge, player.ghostify.automatorGhosts.power)
			if (mode != "quick") {
				document.getElementById("automaticCharge").textContent = automaticCharge.toFixed(2)
				document.getElementById("automaticPower").textContent = player.ghostify.automatorGhosts.power.toFixed(2)
			}
			while (player.ghostify.automatorGhosts.power>=autoGhostRequirements[player.ghostify.automatorGhosts.ghosts-3]) {
				player.ghostify.automatorGhosts.ghosts++
				document.getElementById("autoGhost"+player.ghostify.automatorGhosts.ghosts).style.display=""
				if (player.ghostify.automatorGhosts.ghosts>14) document.getElementById("nextAutomatorGhost").parentElement.style.display="none"
				else {
					document.getElementById("automatorGhostsAmount").textContent=player.ghostify.automatorGhosts.ghosts
					document.getElementById("nextAutomatorGhost").parentElement.style.display=""
					document.getElementById("nextAutomatorGhost").textContent=autoGhostRequirements[player.ghostify.automatorGhosts.ghosts-3].toFixed(1)
				}
			}
		}
	}
	if (mode != "quick") for (var e=1;e<4;e++) document.getElementById("quantumWorth"+e).textContent = shortenDimensions(quantumWorth)
}

//Quark Assertment Machine (Quark Assignation: NG+3L)
function getAssortPercentage() {
	return tmp.qu.assortPercentage ? tmp.qu.assortPercentage : 100
}

function getAssortAmount() {
	return tmp.qu.quarks.floor().min(tmp.qu.quarks).times(getAssortPercentage() / 100).round()
}

var assortDefaultPercentages = [10, 25, 50, 100]
function updateAssortPercentage() {
	if (tmp.ngp3l) return
	let percentage = getAssortPercentage()
	document.getElementById("assort_percentage").value = percentage
	for (var i = 0; i < assortDefaultPercentages.length; i++) {
		var percentage2 = assortDefaultPercentages[i]
		document.getElementById("assort_percentage_" + percentage2).className = percentage2 == percentage ? "chosenbtn" : "storebtn"
	}
}

function changeAssortPercentage(x) {
	tmp.qu.assortPercentage = Math.max(Math.min(parseFloat(x || document.getElementById("assort_percentage").value), 100), 0)
	updateAssortPercentage()
	updateQuarksTabOnUpdate()
}

function assignQuark(color) {
	var usedQuarks=getAssortAmount()
	if (usedQuarks.eq(0)) return
<<<<<<< Updated upstream
	if (tmp.ngp3l&&color!="r"&&tmp.qu.times<2&&!ghostified) if (!confirm("It is recommended to assign your first quarks to red. Are you sure you want to do that?")) return
=======
	if (tmp.ngp3l&&color!="r"&&tmp.qu.times<2&&!ghostified) if (!confirm("It is recommended to assign your first quark to red. Are you sure you want to do that?")) return
>>>>>>> Stashed changes
	var mult=getQuarkAssignMult()
	tmp.qu.usedQuarks[color]=tmp.qu.usedQuarks[color].add(usedQuarks.times(mult)).round()
	tmp.qu.quarks=tmp.qu.quarks.sub(usedQuarks)
	document.getElementById("quarks").innerHTML="You have <b class='QKAmount'>0</b> quarks."
	if (!mult.eq(1)) updateQuantumWorth()
	updateColorCharge()
}

function assignAll(auto) {
	var ratios = tmp.qu.assignAllRatios
	var sum = ratios.r+ratios.g+ratios.b
	var oldQuarks = getAssortAmount()
	var colors = ['r','g','b']
	var mult = getQuarkAssignMult()
	if (oldQuarks.eq(0)) return
	for (c=0;c<3;c++) {
		var toAssign = oldQuarks.times(ratios[colors[c]]/sum).round()
		tmp.qu.usedQuarks[colors[c]] = tmp.qu.usedQuarks[colors[c]].add(toAssign.times(mult)).round()
	}
	tmp.qu.quarks = tmp.qu.quarks.sub(oldQuarks).round()
	if (tmp.qu.autoOptions.assignQKRotate) {
		if (tmp.qu.autoOptions.assignQKRotate > 1) {
			tmp.qu.assignAllRatios = {
				r: tmp.qu.assignAllRatios.g,
				g: tmp.qu.assignAllRatios.b,
				b: tmp.qu.assignAllRatios.r
			}
		} else tmp.qu.assignAllRatios = {
			r: tmp.qu.assignAllRatios.b,
			g: tmp.qu.assignAllRatios.r,
			b: tmp.qu.assignAllRatios.g
		}
		var colors = ['r','g','b']
		for (c=0;c<3;c++) document.getElementById("ratio_" + colors[c]).value = tmp.qu.assignAllRatios[colors[c]]
	}
	if (mult.gt(1)) updateQuantumWorth()
	updateColorCharge()
}

function getQuarkAssignMult() {
	let r=new Decimal(1)
	if (hasBosonicUpg(23)) r=r.times(tmp.blu[23])
	return r
}

function changeRatio(color) {
	var value = parseFloat(document.getElementById("ratio_" + color).value)
	if (value < 0 || isNaN(value)) {
		document.getElementById("ratio_" + color).value = tmp.qu.assignAllRatios[color]
		return
	}
	var sum = 0
	var colors = ['r','g','b']
	for (c=0;c<3;c++) sum += colors[c] == color ? value : tmp.qu.assignAllRatios[colors[c]]
	if (sum == 0 || sum == 1/0) {
		document.getElementById("ratio_" + color).value = tmp.qu.assignAllRatios[color]
		return
	}
	tmp.qu.assignAllRatios[color] = value
}

function toggleAutoAssign() {
	tmp.qu.autoOptions.assignQK = !tmp.qu.autoOptions.assignQK
	document.getElementById('autoAssign').textContent="Auto: O"+(tmp.qu.autoOptions.assignQK?"N":"FF")
	if (tmp.qu.autoOptions.assignQK && tmp.qu.quarks.gt(0)) assignAll(true)
}

function rotateAutoAssign() {
	tmp.qu.autoOptions.assignQKRotate=tmp.qu.autoOptions.assignQKRotate?(tmp.qu.autoOptions.assignQKRotate+1)%3:1
	document.getElementById('autoAssignRotate').textContent="Rotation: "+(tmp.qu.autoOptions.assignQKRotate>1?"Left":tmp.qu.autoOptions.assignQKRotate?"Right":"None")
}

//Color Charge
colorCharge={
	normal: {}
}
colorShorthands={r:'red',
	g:'green',
	b:'blue'}

function updateColorCharge() {
	if (!tmp.ngp3) return
	var colors=['r','g','b']
	var quantumWorthBonus=quantumWorth.pow(.8).div(100)

	for (var i=0;i<3;i++) {
		var ret=new Decimal(0)
		if (player.ghostify.milestones>=2) ret=tmp.qu.usedQuarks[colors[i]]
		if (!tmp.ngp3l) ret=ret.add(quantumWorthBonus)
		colorCharge[colors[i]]=ret
	}

	var sorted=[]
	for (var s=1;s<4;s++) {
		var search=''
		for (var i=0;i<3;i++) if (!sorted.includes(colors[i])&&(search==''||tmp.qu.usedQuarks[colors[i]].gte(tmp.qu.usedQuarks[search]))) search=colors[i]
		sorted.push(search)
	}

	colorCharge.normal={color:sorted[0],charge:Decimal.sub(tmp.qu.usedQuarks[sorted[0]]).sub(tmp.qu.usedQuarks[sorted[1]])}
	if (player.ghostify.milestones<2) colorCharge[sorted[0]]=colorCharge[sorted[0]].add(colorCharge.normal.charge)
	if (tmp.qu.usedQuarks[sorted[0]].gt(0)&&colorCharge.normal.charge.eq(0)) giveAchievement("Hadronization")

	updateQuarksTabOnUpdate()
}

colorBoosts={
	r:1,
	g:1,
	b:1,
	dim: {
		r:1,
		g:1,
		b:1
	}
}

function getCPLog(c) {
	x=Decimal.add(tmp.qu.colorPowers[c],1).log10()
	if (x>1024&&player.aarexModifications.ngudpV&&!player.aarexModifications.nguepV) {
		if (player.aarexModifications.ngumuV) x=Math.sqrt(x)*32
		else x=Math.pow(x,.9)*2
	}
	return x
}

function getCPLogs(c) {
	return {
		r: getCPLog("r"),
		g: getCPLog("g"),
		b: getCPLog("b")
	}
}

function updateColorPowers(log) {
	//Logs
	if (log == undefined) log = getCPLogs()

	//Red
	colorBoosts.r=Math.pow(log.r,player.dilation.active?2/3:0.5)/10+1
	if (colorBoosts.r>1.3) colorBoosts.r=Math.sqrt(colorBoosts.r*1.3)
	if (colorBoosts.r>2.3&&(!player.dilation.active||getTreeUpgradeLevel(2)>7||ghostified)) colorBoosts.r=Math.pow(colorBoosts.r/2.3,0.5*(ghostified&&player.ghostify.neutrinos.boosts>4?1+tmp.nb[4]:1))*2.3

	//Green
	if (tmp.ngp3l) {
		colorBoosts.g=Math.sqrt(log.g*2+1)
		if (colorBoosts.g>4.5) colorBoosts.g=Math.sqrt(colorBoosts.g*4.5)
	} else colorBoosts.g=Math.pow(log.g+1,1/3)*2-1
	let m=1
	if (player.aarexModifications.ngumuV&&player.masterystudies.includes("t362")) {
		m+=tmp.qu.replicants.quarks.add(1).log10()/10
		if (m>4) m=Math.sqrt(m*4)
	}
	if (player.aarexModifications.ngudpV&&!player.aarexModifications.nguepV) m/=2
	colorBoosts.g=(colorBoosts.g-1)*m+1

	//Blue
	var bLog=log.b
	if (tmp.ngp3l) bLog=Math.sqrt(bLog)
	else bLog=Math.sqrt(log.b+1)-1

	let softcapStartLog=tmp.ngp3l?Math.log10(1300):3
	let softcapPower=1
	if (player.ghostify.ghostlyPhotons.unl) softcapPower+=tmp.le[4]
	if (hasBosonicUpg(11)) softcapPower+=tmp.blu[11]
	if (log>softcapStartLog) {
		log=Decimal.pow(log/softcapStartLog,softcapPower/2).times(softcapStartLog)
		if (log.lt(100)) bLog=bLog.toNumber()
		else log=Math.min(log.toNumber(),log.log10()*(40+10*log.sub(90).log10()))
	}
	colorBoosts.b=Decimal.pow(10,bLog)

	//Dimensions
	updateColorDimPowers(log)
}

function updateColorDimPowers(log) {
	if (tmp.ngp3l) return

	//Logs
	if (log == undefined) log = getCPLogs()

	colorBoosts.dim.r = Decimal.pow(10, Math.sqrt(player.money.add(1).log10()) * Math.pow(getColorDimPowerBase("r", log), 4/7) * (inQC(6) ? 1 : 35))
	colorBoosts.dim.g = Decimal.pow(10, Math.sqrt(player.infinityPower.add(1).log10()) * Math.pow(getColorDimPowerBase("g", log), 4/7) * 5)
	colorBoosts.dim.b = Decimal.pow(10, Math.sqrt(player.timeShards.add(1).log10()) * Math.pow(getColorDimPowerBase("b", log), 8/21))
}

function getColorDimPowerBase(color, log) {
	if (log == undefined) log = getCPLogs()
	let ret = Math.pow(log[color], 3/5)
	ret *= Math.pow((tmp.qu.colorDimPower || 0) + 1, 2/5)
	return ret
}

//Gluons
GUCosts=[null, 1, 2, 4, 100, 7e15, 4e19, 3e28, "1e570"]

function buyGluonUpg(color, id) {
	var name=color+id
	if (tmp.qu.upgrades.includes(name)||tmp.qu.gluons[color].lt(GUCosts[id])) return
	tmp.qu.upgrades.push(name)
	tmp.qu.gluons[color]=tmp.qu.gluons[color].sub(GUCosts[id])
	updateGluonsTab("spend")
	if (name=="gb3") {
		var otherMults=1
		if (player.achievements.includes("r85")) otherMults*=4
		if (player.achievements.includes("r93")) otherMults*=4
		var old=getIPMultPower()
		ipMultPower=2.3
		player.infMult=player.infMult.div(otherMults).pow(Math.log10(getIPMultPower())/Math.log10(old)).times(otherMults)
	}
	if (name=="rg4" && !tmp.qu.autoOptions.sacrifice) updateElectronsEffect()
	if (name=="gb4") player.tickSpeedMultDecrease=1.25
	updateQuantumWorth()
}

function GUBought(id) {
	return tmp.ngp3 && tmp.qu.upgrades.includes(id)
}

function buyQuarkMult(name) {
	var cost=Decimal.pow(100,tmp.qu.multPower[name]+Math.max(tmp.qu.multPower[name]-467,0)).times(500)
	if (tmp.qu.gluons[name].lt(cost)) return
	tmp.qu.gluons[name]=tmp.qu.gluons[name].sub(cost).round()
	tmp.qu.multPower[name]++
	tmp.qu.multPower.total++
	updateGluonsTab("spend")
	if (tmp.qu.autobuyer.mode === 'amount') {
		tmp.qu.autobuyer.limit = Decimal.times(tmp.qu.autobuyer.limit, 2)
		document.getElementById("priorityquantum").value = formatValue("Scientific", tmp.qu.autobuyer.limit, 2, 0);
	}
}

function maxQuarkMult() {
	var names=["rg","gb","br"]
	var bought=0
	for (c=0;c<3;c++) {
		var name=names[c]
		var buying=true
		while (buying) {
			var cost=Decimal.pow(100,tmp.qu.multPower[name]+Math.max(tmp.qu.multPower[name]-467,0)).times(500)
			if (tmp.qu.gluons[name].lt(cost)) buying=false
			else if (tmp.qu.multPower[name]<468) {
				var toBuy=Math.min(Math.floor(tmp.qu.gluons[name].div(cost).times(99).add(1).log(100)),468-tmp.qu.multPower[name])
				var toSpend=Decimal.pow(100,toBuy).sub(1).div(99).times(cost)
				if (toSpend.gt(tmp.qu.gluons[name])) tmp.qu.gluons[name]=new Decimal(0)
				else tmp.qu.gluons[name]=tmp.qu.gluons[name].sub(toSpend).round()
				tmp.qu.multPower[name]+=toBuy
				bought+=toBuy
			} else {
				var toBuy=Math.floor(tmp.qu.gluons[name].div(cost).times(9999).add(1).log(1e4))
				var toSpend=Decimal.pow(1e4,toBuy).sub(1).div(9999).times(cost)
				if (toSpend.gt(tmp.qu.gluons[name])) tmp.qu.gluons[name]=new Decimal(0)
				else tmp.qu.gluons[name]=tmp.qu.gluons[name].sub(toSpend).round()
				tmp.qu.multPower[name]+=toBuy
				bought+=toBuy
			}
		}
	}
	tmp.qu.multPower.total+=bought
	if (tmp.qu.autobuyer.mode === 'amount') {
		tmp.qu.autobuyer.limit = Decimal.times(tmp.qu.autobuyer.limit, Decimal.pow(2, bought))
		document.getElementById("priorityquantum").value = formatValue("Scientific", tmp.qu.autobuyer.limit, 2, 0)
	}
	updateGluonsTabOnUpdate("spend")
}

function getGU8Effect(type) {
	return Math.pow(tmp.qu.gluons[type].div("1e565").add(1).log10()*0.505+1, 1.5)
}

//Display
function updateQuarksTab(tab) {
	document.getElementById("redPower").textContent=shortenMoney(tmp.qu.colorPowers.r)
	document.getElementById("greenPower").textContent=shortenMoney(tmp.qu.colorPowers.g)
	document.getElementById("bluePower").textContent=shortenMoney(tmp.qu.colorPowers.b)
	document.getElementById("redTranslation").textContent=((colorBoosts.r-1)*100).toFixed(1)
	var msg = getFullExpansion(Math.round((colorBoosts.g-1)*100))+(tmp.pe>0?"+"+getFullExpansion(Math.round(tmp.pe*100)):"")
	document.getElementById("greenTranslation").textContent=msg
	document.getElementById("blueTranslation").textContent=shortenMoney(colorBoosts.b)
	if (!tmp.ngp3l) {
		document.getElementById("redDimTranslation").textContent=shortenMoney(colorBoosts.dim.r)
		document.getElementById("greenDimTranslation").textContent=shortenMoney(colorBoosts.dim.g)
		document.getElementById("blueDimTranslation").textContent=shortenMoney(colorBoosts.dim.b)
	}
	if (player.masterystudies.includes("t383")) document.getElementById("blueTranslationMD").textContent=shorten(getMTSMult(383))
	if (player.ghostify.milestones>7) {
		var assortAmount=getAssortAmount()
		if (!tmp.ngp3l) document.getElementById("assort_amount").textContent = shortenDimensions(assortAmount)
		document.getElementById("assignAllButton").className=(assortAmount.lt(1)?"unavailabl":"stor")+"ebtn"
		updateQuantumWorth("display")
	}
}

function updateGluonsTab() {
	document.getElementById("gbupg1current").textContent="Currently: "+shortenMoney(1-Math.min(Decimal.log10(getTickSpeedMultiplier()),0))+"x"
	document.getElementById("brupg1current").textContent="Currently: "+shortenMoney(player.dilation.dilatedTime.add(1).log10()+1)+"x"
	document.getElementById("rgupg2current").textContent="Currently: "+(Math.pow(player.dilation.freeGalaxies/5e3+1,0.25)*100-100).toFixed(1)+"%"
	document.getElementById("brupg2current").textContent="Currently: "+shortenMoney(Decimal.pow(2.2, Math.pow(calcTotalSacrificeBoost().log10()/1e6, 0.25)))+"x"
	document.getElementById("brupg4current").textContent="Currently: "+shortenMoney(Decimal.pow(getDimensionPowerMultiplier(hasNU(13) && "no-rg4"), 0.0003).max(1))+"x"
	if (player.masterystudies.includes("d9")) {
		document.getElementById("gbupg5current").textContent="Currently: "+(Math.sqrt(player.replicanti.galaxies)/5.5).toFixed(1)+"%"
		document.getElementById("brupg5current").textContent="Currently: "+Math.min(Math.sqrt(player.dilation.tachyonParticles.max(1).log10())*1.3,14).toFixed(1)+"%"
		document.getElementById("gbupg6current").textContent="Currently: "+(100-100/(1+Math.pow(player.infinityPower.log10(),0.25)/2810)).toFixed(1)+"%"
		document.getElementById("brupg6current").textContent="Currently: "+(100-100/(1+player.meta.resets/340)).toFixed(1)+"%"
		document.getElementById("gbupg7current").textContent="Currently: "+(100-100/(1+Math.log10(1+player.infinityPoints.max(1).log10())/100)).toFixed(1)+"%"
		document.getElementById("brupg7current").textContent="Currently: "+(100-100/(1+Math.log10(1+player.eternityPoints.max(1).log10())/80)).toFixed(1)+"%"
	}
	if (player.masterystudies.includes("d13")) {
		document.getElementById("rgupg8current").textContent="Currently: "+shorten(getGU8Effect("rg"))+"x"
		document.getElementById("gbupg8current").textContent="Currently: "+shorten(getGU8Effect("gb"))+"x"
		document.getElementById("brupg8current").textContent="Currently: "+shorten(getGU8Effect("br"))+"x"
	}
	if (player.ghostify.milestones>7) {
		updateQuantumWorth("display")
		updateGluonsTabOnUpdate("display")
	}
}

//Display: On load
function updateQuarksTabOnUpdate(mode) {
	var colors=['r','g','b']
	if (colorCharge.normal.charge.eq(0)) document.getElementById("colorCharge").innerHTML='neutral charge'
	else {
		var color=colorShorthands[colorCharge.normal.color]
		document.getElementById("colorCharge").innerHTML='<span class="'+color+'">'+color+'</span> charge of <span class="'+color+'" style="font-size:35px">' + shortenDimensions(colorCharge.normal.charge) + "</span>"
	}
	for (c=0;c<3;c++) document.getElementById(colors[c]+"PowerRate").textContent=shortenDimensions(colorCharge[colors[c]])

	document.getElementById("redQuarks").textContent=shortenDimensions(tmp.qu.usedQuarks.r)
	document.getElementById("greenQuarks").textContent=shortenDimensions(tmp.qu.usedQuarks.g)
	document.getElementById("blueQuarks").textContent=shortenDimensions(tmp.qu.usedQuarks.b)
	document.getElementById("boost").style.display=player.dilation.active?"":"none"

	var assortAmount=getAssortAmount()
	var canAssign=assortAmount.gt(0)
	document.getElementById("quarkAssort").style.display=tmp.ngp3l?"none":""
	document.getElementById("quarkAssign").style.display=tmp.ngp3l?"":"none"
	document.getElementById("colorDimTranslations").style.display=tmp.ngp3l?"none":""
	if (tmp.ngp3l) {
		document.getElementById("redAssign").className=canAssign?"storebtn":"unavailablebtn"
		document.getElementById("greenAssign").className=canAssign?"storebtn":"unavailablebtn"
		document.getElementById("blueAssign").className=canAssign?"storebtn":"unavailablebtn"
	} else {
		document.getElementById("assort_amount").textContent=shortenDimensions(assortAmount)
		document.getElementById("redAssort").className=canAssign?"storebtn":"unavailablebtn"
		document.getElementById("greenAssort").className=canAssign?"storebtn":"unavailablebtn"
		document.getElementById("blueAssort").className=canAssign?"storebtn":"unavailablebtn"
	}

	var uq=tmp.qu.usedQuarks
	var gl=tmp.qu.gluons
	for (var p=0;p<3;p++) {
		var pair=(["rg","gb","br"])[p]
		var diff=uq[pair[0]].min(uq[pair[1]])
		document.getElementById(pair+"gain").textContent=shortenDimensions(diff)
		document.getElementById(pair+"next").textContent=shortenDimensions(uq[pair[0]].sub(diff).round())
	}
	document.getElementById("assignAllButton").className=canAssign?"storebtn":"unavailablebtn"
	document.getElementById("bluePowerMDEffect").style.display=player.masterystudies.includes("t383")?"":"none"
	if (player.masterystudies.includes("d13")) {
		document.getElementById("redQuarksToD").textContent=shortenDimensions(tmp.qu.usedQuarks.r)
		document.getElementById("greenQuarksToD").textContent=shortenDimensions(tmp.qu.usedQuarks.g)
		document.getElementById("blueQuarksToD").textContent=shortenDimensions(tmp.qu.usedQuarks.b)	
	}
}

function updateGluonsTabOnUpdate(mode) {
	if (!player.masterystudies) return
	else if (!tmp.qu.gluons.rg) {
		tmp.qu.gluons = {
			rg: new Decimal(0),
			gb: new Decimal(0),
			br: new Decimal(0)
		}
	}
	if (player.ghostify.milestones<8) mode=undefined
	var names=["rg","gb","br"]
	var sevenUpgrades=player.masterystudies.includes("d9")
	var eightUpgrades=player.masterystudies.includes("d13")
	if (mode==undefined) for (r=3;r<5;r++) document.getElementById("gupgrow"+r).style.display=sevenUpgrades?"":"none"
	for (c=0;c<3;c++) {
		if (mode==undefined) {
			document.getElementById(names[c]+"upg7col").setAttribute("colspan",eightUpgrades?1:2)
			document.getElementById(names[c]+"upg8col").style.display=eightUpgrades?"":"none"
		}
		if (mode==undefined||mode=="display") {
			var name=names[c]
			document.getElementById(name).textContent=shortenDimensions(tmp.qu.gluons[name])
			for (u=1;u<=(eightUpgrades?8:sevenUpgrades?7:4);u++) {
				var upg=name+"upg"+u
				if (u>4) document.getElementById(upg+"cost").textContent=shortenMoney(new Decimal(GUCosts[u]))
				if (tmp.qu.upgrades.includes(name+u)) document.getElementById(upg).className="gluonupgradebought small "+name
				else if (tmp.qu.gluons[name].lt(GUCosts[u])) document.getElementById(upg).className="gluonupgrade small unavailablebtn"
				else document.getElementById(upg).className="gluonupgrade small "+name
			}
			var upg=name+"qk"
			var cost=Decimal.pow(100,tmp.qu.multPower[name]+Math.max(tmp.qu.multPower[name]-467,0)).times(500)
			document.getElementById(upg+"cost").textContent=shortenDimensions(cost)
			if (tmp.qu.gluons[name].lt(cost)) document.getElementById(upg+"btn").className="gluonupgrade unavailablebtn"
			else document.getElementById(upg+"btn").className="gluonupgrade "+name
		}
	}
	if (mode==undefined||mode=="display") document.getElementById("qkmultcurrent").textContent=shortenDimensions(Decimal.pow(2, tmp.qu.multPower.total))
}

//Quarks animation
var quarks={}
var centerX
var centerY
var maxDistance
var code

function drawQuarkAnimation(ts){
	centerX=canvas.width/2
	centerY=canvas.height/2
	maxDistance=Math.sqrt(Math.pow(centerX,2)+Math.pow(centerY,2))
	code=player.options.theme=="Aarex's Modifications"?"e5":"99"
	if (document.getElementById("quantumtab").style.display !== "none" && document.getElementById("uquarks").style.display !== "none" && player.options.animations.quarks) {
		qkctx.clearRect(0, 0, canvas.width, canvas.height);
		quarks.sum=tmp.qu.colorPowers.r.max(1).log10()+tmp.qu.colorPowers.g.max(1).log10()+tmp.qu.colorPowers.b.max(1).log10()
		quarks.amount=Math.ceil(Math.min(quarks.sum,200))
		for (p=0;p<quarks.amount;p++) {
			var particle=quarks['p'+p]
			if (particle==undefined) {
				particle={}
				var random=Math.random()
				if (random<=tmp.qu.colorPowers.r.max(1).log10()/quarks.sum) particle.type='r'
				else if (random>=1-tmp.qu.colorPowers.b.max(1).log10()/quarks.sum) particle.type='b'
				else particle.type='g'
				particle.motion=Math.random()>0.5?'in':'out'
				particle.direction=Math.random()*Math.PI*2
				particle.distance=Math.random()
				quarks['p'+p]=particle
			} else {
				particle.distance+=0.01
				if (particle.distance>=1) {
					var random=Math.random()
					if (random<=tmp.qu.colorPowers.r.max(1).log10()/quarks.sum) particle.type='r'
					else if (random>=1-tmp.qu.colorPowers.b.max(1).log10()/quarks.sum) particle.type='b'
					else particle.type='g'
					particle.motion=Math.random()>0.5?'in':'out'
					particle.direction=Math.random()*Math.PI*2
					particle.distance=0
				}
				var actualDistance=particle.distance*maxDistance
				if (particle.motion=="in") actualDistance=maxDistance-actualDistance
				qkctx.fillStyle=particle.type=="r"?"#"+code+"0000":particle.type=="g"?"#00"+code+"00":"#0000"+code
				point(centerX+Math.sin(particle.direction)*actualDistance, centerY+Math.cos(particle.direction)*actualDistance, qkctx)
			}
		}
		delta = (ts - lastTs) / 1000;
		lastTs = ts;
		requestAnimationFrame(drawQuarkAnimation);
	}
}