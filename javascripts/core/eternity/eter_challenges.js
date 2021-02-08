//Eternity Challenges
function canUnlockEC(idx, cost, study, study2) {
	study2 = (study2 !== undefined) ? study2 : 0;
	if (player.eternityChallUnlocked !== 0) return false
	if (!player.timestudy.studies.includes(study) && (player.study2 == 0 || !player.timestudy.studies.includes(study2))) return false
	if (player.timestudy.theorem < cost) return false
	if (player.etercreq == idx && idx !== 11 && idx !== 12) return true

	let ecStarts = getECStarts()
	let ecMults = getECMults()
	switch(idx) {
		case 1:
			if (getEternitied() >= ecStarts[1] + (ECComps("eterc1") ? ECComps("eterc1") : 0) * ecMults[1]) return true
			break;

		case 2:
			if (player.totalTickGained >= ecStarts[2] + (ECComps("eterc2") * ecMults[2])) return true
			break;

		case 3:
			if (player.eightAmount.gte(ecStarts[3] + (ECComps("eterc3") * ecMults[3]))) return true
			break;

		case 4:
			if (ecStarts[4] + (ECComps("eterc4") * ecMults[4]) <= getInfinitied()) return true
			break;

		case 5:
			if (ecStarts[5] + (ECComps("eterc5") * ecMults[5]) <= player.galaxies) return true
			break;

		case 6:
			if (ecStarts[6] + (ECComps("eterc6") * ecMults[6]) <= player.replicanti.galaxies) return true
			break;

		case 7:
			if (player.money.gte(new Decimal(ecStarts[7]).times(new Decimal(ecMults[7]).pow(ECComps("eterc7"))))) return true
			break;

		case 8:
			if (player.infinityPoints.gte(new Decimal(ecStarts[8]).times(new Decimal(ecMults[8]).pow(ECComps("eterc8"))))) return true
			break;

		case 9:
			if (player.infinityPower.gte(new Decimal(ecStarts[9]).times(new Decimal(ecMults[9]).pow(ECComps("eterc9"))))) return true
			break;

		case 10:
			if (player.eternityPoints.gte(new Decimal(ecStarts[10]).times(new Decimal(ecMults[10]).pow(ECComps("eterc10"))))) return true
			break;

		case 11:
			if (player.timestudy.studies.includes(71) && !player.timestudy.studies.includes(72) && !player.timestudy.studies.includes(73)) return true
			break;

		case 12:
			if (player.timestudy.studies.includes(73) && !player.timestudy.studies.includes(71) && !player.timestudy.studies.includes(72)) return true
			break;
	}
	return false
}

function canUnlockECFromNum(n){
	if (n == 1) return canUnlockEC(1, 30, 171)
	if (n == 2) return canUnlockEC(2, 35, 171)
	if (n == 3) return canUnlockEC(3, 40, 171)
	if (n == 4) return canUnlockEC(4, 70, 143)
	if (n == 5) return canUnlockEC(5, 130, 42)
	if (n == 6) return canUnlockEC(6, 85, 121)
	if (n == 7) return canUnlockEC(7, 115, 111)
	if (n == 8) return canUnlockEC(8, 115, 123)
	if (n == 9) return canUnlockEC(9, 415, 151)
	if (n == 10) return canUnlockEC(10, 550, 181)
	if (n == 11) return canUnlockEC(11, 1, 231, 232)
	if (n == 12) return canUnlockEC(12, 1, 233, 234)
	return false
}

let ECCosts = [null, 
		30,  35,  40,
		70,  130, 85,
		115, 115, 415,
		550, 1,   1]

for (let ecnum = 1; ecnum <= 12; ecnum ++){
	getEl("ec" + ecnum + "unl").onclick = function(){
		if (canUnlockECFromNum(ecnum)) {
			unlockEChall(ecnum)
			player.timestudy.theorem -= ECCosts[ecnum]
			drawStudyTree()
		}
	}
}

function unlockEChall(idx) {
	if (player.eternityChallUnlocked == 0) {
		player.eternityChallUnlocked = idx
		getEl("eterc"+player.eternityChallUnlocked+"div").style.display = "inline-block"
		if (!justImported) showTab("challenges")
		if (!justImported) showChallengesTab("eternitychallenges")
		if (idx !== 13 && idx !== 14) {
			updateTimeStudyButtons(true)
			player.etercreq = idx
		}
		if (tmp.ngp3) delete tmp.qu.autoECN
	}
	updateEternityChallenges()
}

function updateECUnlockButtons() {
	for (let ecnum = 1; ecnum <= 12; ecnum ++){
		let s = "ec" + ecnum + "unl"
		if (canUnlockECFromNum(ecnum)) getEl(s).className = "eternitychallengestudy"
		else getEl(s).className = "eternitychallengestudylocked"
	}
	if (player.eternityChallUnlocked !== 0) getEl("ec" + player.eternityChallUnlocked + "unl").className = "eternitychallengestudybought"
}

function resetEternityChallUnlocks() {
	let ec = player.eternityChallUnlocked
	if (!ec) return

	if (ec <= 12) player.timestudy.theorem += ([0, 30, 35, 40, 70, 130, 85, 115, 115, 415, 550, 1, 1])[ec]

	player.eternityChallUnlocked = 0
	updateEternityChallenges()
}

let ecExpData = {
	inits: {
		eterc1: 1800,
		eterc2: 975,
		eterc3: 600,
		eterc4: 2750,
		eterc5: 750,
		eterc6: 850,
		eterc7: 2000,
		eterc8: 1300,
		eterc9: 1750,
		eterc10: 3000,
		eterc11: 500,
		eterc12: 110000,
		eterc13: 38500000,
		eterc14: 1595000,
		eterc1_ngmm: 1800,
		eterc2_ngmm: 1125,
		eterc3_ngmm: 1025,
		eterc4_ngmm: 2575,
		eterc5_ngmm: 600,
		eterc6_ngmm: 850,
		eterc7_ngmm: 1450,
		eterc8_ngmm: 2100,
		eterc9_ngmm: 2250,
		eterc10_ngmm: 2205,
		eterc11_ngmm: 35000,
		eterc12_ngmm: 17000,
		eterc1_ngc: 7200,
		eterc2_ngc: 4950,
		eterc3_ngc: 4350,
		eterc4_ngc: 9250,
		eterc5_ngc: 1950,
		eterc6_ngc: 7400,
		eterc7_ngc: 2850,
		eterc8_ngc: 8700,
		eterc9_ngc: 23000,
		eterc10_ngc: 12225,
		eterc11_ngc: 67000,
		eterc12_ngc: 256000,
	},
	increases: {
		eterc1: 200,
		eterc2: 175,
		eterc3: 75,
		eterc4: 550,
		eterc5: 400,
		eterc6: 250,
		eterc7: 530,
		eterc8: 900,
		eterc9: 250,
		eterc10: 300,
		eterc11: 200,
		eterc12: 12000,
		eterc13: 1000000,
		eterc14: 800000,
		eterc1_ngmm: 400,
		eterc2_ngmm: 250,
		eterc3_ngmm: 100,
		eterc4_ngmm: 525,
		eterc5_ngmm: 300,
		eterc6_ngmm: 225,
		eterc8_ngmm: 500,
		eterc9_ngmm: 300,
		eterc10_ngmm: 175,
		eterc11_ngmm: 3250,
		eterc12_ngmm: 1500,
		eterc1_ngc: 700,
		eterc2_ngc: 150,
		eterc3_ngc: 225,
		eterc4_ngc: 150,
		eterc5_ngc: 150,
		eterc6_ngc: 400,
		eterc7_ngc: 200,
		eterc8_ngc: 1300,
		eterc9_ngc: 400,
		eterc10_ngc: 525,
		eterc11_ngc: 850,
		eterc12_ngc: 16000,
	}
}

function getECGoal(x) {
	let expInit = ecExpData.inits[x]
	let expIncrease = ecExpData.increases[x]
	let completions = ECComps(x)
	if (inNGM(2)) {
		expInit = ecExpData.inits[x + "_ngmm"] || expInit
		expIncrease = ecExpData.increases[x + "_ngmm"] || expIncrease
	}
	if (tmp.ngC) {
		expInit = ecExpData.inits[x + "_ngc"] || expInit
		expIncrease = ecExpData.increases[x + "_ngc"] || expIncrease
	}
	let exp = expInit + expIncrease * completions
	if (x == "ec13") exp += 600000 * Math.max(completions - 2, 0) * (completions - 3, 0)
	return Decimal.pow(10, exp)
}

function updateEternityChallenges() {
	tmp.ec=0
	var locked = true
	for (ec=1;ec<15;ec++) {
		var property = "eterc"+ec 
		var ecdata = player.eternityChalls[property]
		if (ecdata) {
			tmp.ec+=ecdata
			locked=false
		}
		getEl(property+"div").style.display=ecdata?"inline-block":"none"
		getEl(property).textContent=ecdata>4?"Completed":"Locked"
		getEl(property).className=ecdata>4?"completedchallengesbtn":"lockedchallengesbtn"
	}
	if (player.eternityChallUnlocked>0) {
		var property="eterc"+player.eternityChallUnlocked
		var onchallenge=player.currentEternityChall==property
		locked=false
		getEl(property+"div").style.display="inline-block"
		getEl(property).textContent=onchallenge?"Running":"Start"
		getEl(property).className=onchallenge?"onchallengebtn":"challengesbtn"
	}
	getEl("eterctabbtn").parentElement.style.display = ph.shown("eternity") && !locked ? "" : "none"
	getEl("autoEC").style.display = tmp.ngp3 && !ph.did("quantum") ? "inline-block" : "none"
	if (ph.did("quantum")&&tmp.ngp3) getEl("autoEC").className=tmp.qu.autoEC?"timestudybought":"storebtn"
}

function startEternityChallenge(n) {
	if (player.currentEternityChall == "eterc"+n || parseInt(n) != player.eternityChallUnlocked) return
	if (player.options.challConf) if (!confirm("You will start over with just your time studies, eternity upgrades and achievements. You need to reach a set IP goal with special conditions.")) return
	if (ph.did("ghostify") && name == "eterc10") player.ghostify.under = false
	let oldStat = getEternitied()
	player.eternities = nA(player.eternities, gainEternitiedStat())
	updateBankedEter()
	player.thisEternity = 0
	if (player.tickspeedBoosts != undefined) player.tickspeedBoosts = 0
	if (hasAch("r104")) player.infinityPoints = new Decimal(2e25);
	else player.infinityPoints = new Decimal(0);
	
	doEternityResetStuff()

	player.eternityChallGoal =  getECGoal("eterc" + n)
	player.currentEternityChall =  "eterc" + n
	player.galacticSacrifice = resetGalacticSacrifice(true)
		
	if (inNGM(2) && getEternitied() < 2) player.autobuyers[12] = 13
	if (player.tickspeedBoosts != undefined && getEternitied() < 2) player.autobuyers[13] = 14
	if (player.dilation.active) {
		player.dilation.active = false
		if (tmp.ngp3 && ph.did("quantum")) updateColorCharge()
	}
	if (speedrunMilestonesReached < 24) player.replicanti.amount = moreEMsUnlocked() && getEternitied() >= 1e11 ? player.replicanti.amount.div("1e1000").floor() : new Decimal(getEternitied() >= 50 ? 1 : 0)
	extraReplGalaxies = 0
	resetReplicantiUpgrades()
	player.tdBoosts = resetTDBoosts()
	resetPSac()
	resetTDsOnNGM4()
	reduceDimCosts()
	setInitialResetPower()
	if (hasAch("r36")) player.tickspeed = player.tickspeed.times(0.98);
	if (hasAch("r45")) player.tickspeed = player.tickspeed.times(0.98);
	var autobuyers = document.getElementsByClassName('autoBuyerDiv')
	if (getEternitied() < 2) {
		for (let i = 0; i < autobuyers.length; i++) autobuyers.item(i).style.display = "none"
		getEl("buyerBtnDimBoost").style.display = "inline-block"
		getEl("buyerBtnGalaxies").style.display = "inline-block"
		getEl("buyerBtnInf").style.display = "inline-block"
		getEl("buyerBtnTickSpeed").style.display = "inline-block"
		getEl("buyerBtnSac").style.display = "inline-block"
	}
	updateAutobuyers()
	setInitialMoney()
	if (hasAch("r85")) player.infMult = player.infMult.times(4);
	if (hasAch("r93")) player.infMult = player.infMult.times(4);
	if (hasAch("r104")) player.infinityPoints = new Decimal(2e25);
	resetInfDimensions(true);
	updateChallenges();
	updateNCVisuals()
	updateLastTenRuns()
	updateLastTenEternities()
	if (!hasAch("r133")) {
		let infchalls = Array.from(document.getElementsByClassName('infchallengediv'))
		for (let i = 0; i < infchalls.length; i++) infchalls[i].style.display = "none"
	}
	GPminpeak = new Decimal(0)
	IPminpeak = new Decimal(0)
	EPminpeakType = 'normal'
	EPminpeak = new Decimal(0)
	updateMilestones()
	resetTimeDimensions()
	if (getEternitied() < 20) player.autobuyers[9].bulk = 1
	if (getEternitied() < 20) getEl("bulkDimboost").value = player.autobuyers[9].bulk
	if (getEternitied() < 50) {
		getEl("replicantidiv").style.display="none"
		getEl("replicantiunlock").style.display="inline-block"
	}
	if (getEternitied() > 2 && player.replicanti.galaxybuyer === undefined) player.replicanti.galaxybuyer = false
	getEl("infinityPoints1").innerHTML = "You have <span class=\"IPAmount1\">"+shortenDimensions(player.infinityPoints)+"</span> Infinity points."
	getEl("infinityPoints2").innerHTML = "You have <span class=\"IPAmount2\">"+shortenDimensions(player.infinityPoints)+"</span> Infinity points."
	if (getEternitied() > 0 && oldStat < 1) {
		getEl("infmultbuyer").style.display = "inline-block"
		getEl("infmultbuyer").textContent = "Autobuy IP mult O" + (player.infMultBuyer?"N":"FF")
	}
	hideMaxIDButton()
	getEl("eternitybtn").style.display = "none"
	updateEternityUpgrades()
	getEl("totaltickgained").textContent = "You've gained "+player.totalTickGained.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+" tickspeed upgrades."
	hideDimensions()
	tmp.tickUpdate = true;
	playerInfinityUpgradesOnEternity()
	updateEternityChallenges()
	Marathon2 = 0
	resetUP()
	doAutoEterTick()
	if (tmp.ngp3 && player.dilation.upgrades.includes("ngpp3") && getEternitied() >= 1e9) player.dbPower = getDimensionBoostPower()
}

function isEC12Active() {
	return player.currentEternityChall == "eterc12" || inNGM(5)
}

function getEC12Mult() {
	let r = 1e3
	let p14 = hasPU(14, true)
	if (p14) r /= puMults[14](p14)
	return r
}

function getEC12TimeLimit() {
	//In the multiple of 0.1 seconds
	let r = 10 - 2 * ECComps("eterc12")
	if (tmp.ngex) r *= 3.75
	if (tmp.ngmX && ECComps("eterc12") > 3) r += 1.5 // add 0.15 seconds to try to make 12x5 in NG-- possible
	return Math.max(r, 1)
}

function ECComps(name) {
	return (tmp.eterUnl && player.eternityChalls[name]) || 0
}

function getECReward(x) {
	let m2 = inNGM(2)
	let pc = !(!tmp.ngC)
	let ei = m2 || pc //either
	let c = ECComps("eterc" + x)
	if (x == 1) return Math.pow(Math.max(player.thisEternity * 10, 1), (0.3 + c * 0.05) * (ei ? 5 : 1))
	if (x == 2) {
		let r = player.infinityPower.pow((m2 ? 4.5 : 1.5) / (700 - c * 100)).add(1)
		if (m2) r = Decimal.pow(player.infinityPower.add(10).log10(), 1000).times(r)
		else if (pc) r = Decimal.pow(r, 100).min("1e100000")
		else r = r.min(1e100)
		return r.max(1)
	}
	if (x == 3) return c * 0.8 * (pc ? 10 : 1)
	if (x == 4) return player.infinityPoints.max(1).pow((m2 ? .4 : 0.003) + c * (m2 ? .2 : 0.002)).pow(pc ? 5 : 1).min(ei ? 1/0 : 1e200)
	if (x == 5) return c * 5
	if (x == 8) {
		let x = Math.log10(player.infinityPower.plus(1).log10() + 1)
		if (x > 0) x=Math.pow(x, (m2 ? 0.05 : 0.03) * c)
		return Math.max(x, 1)
	}
	if (x == 7) {
		if (c == 0 && player.currentEternityChall !== "eterc7") return new Decimal(0)

		let timeProd = getTimeDimensionProduction(1)
		if (player.currentEternityChall === "eterc7") return timeProd
		return timeProd.pow(c / 5).max(1).sub(1)
	}
	if (x == 9) {
		let r=player.timeShards
		if (r.gt(0)) r = r.pow(c / (m2 ? 2 : 10))
		if (m2) return r.plus(1).min("1e10000")
		if (!tmp.mod.newGameExpVersion) return r.plus(1).min("1e400")
		if (r.lt("1e400")) return r.plus(1)
		let log = Math.sqrt(r.log10() * 400)
		return Decimal.pow(10, Math.min(50000, log))	
	}
	if (x == 10) return Decimal.pow(getInfinitied(), m2 ? 2 : .9).times(Math.pow(c, pc ? 10 : 1) * (m2 ? 0.02 : 0.000002)).add(1).pow(player.timestudy.studies.includes(31) ? 4 : 1)
	if (x == 11 && pc) return Math.sqrt(Math.log10((Math.pow(c, 2) * (player.totalTickGained + (Math.max(c, 1) - 1) * 5e4)) / 1e5 + 1)/(4 - c / 2) + 1)
	if (x == 12) return 1 - c * (m2 ? .06 : 0.008)
	if (x == 13) return [0, 0.25, 0.5, 0.7, 0.85, 1][c]
	if (x == 14) return getIC3EffFromFreeUpgs()
}

function doCheckECCompletionStuff(){
	var forceRespec = false
	if (player.currentEternityChall !== "") {
		if (player.eternityChalls[player.currentEternityChall] === undefined) {
			player.eternityChalls[player.currentEternityChall] = 1
		} else if (player.eternityChalls[player.currentEternityChall] < 5) {
			player.eternityChalls[player.currentEternityChall] += 1
		}
		else if (tmp.mod.eternityChallRecords[player.eternityChallUnlocked] === undefined) tmp.mod.eternityChallRecords[player.eternityChallUnlocked] = player.thisEternity
		else tmp.mod.eternityChallRecords[player.eternityChallUnlocked] = Math.min(player.thisEternity, tmp.mod.eternityChallRecords[player.eternityChallUnlocked])
		if (player.currentEternityChall === "eterc12" && hasAch("ng3p51")) {
			if (player.eternityChalls.eterc11 === undefined) player.eternityChalls.eterc11 = 1
			else if (player.eternityChalls.eterc11 < 5) player.eternityChalls.eterc11++
		}
		if (tmp.ngp3 ? tmp.qu.autoEC && player.eternityChalls[player.currentEternityChall] < 5 : false) {
			if (player.etercreq > 12) player.timestudy.theorem += masteryStudies.costs.ec[player.etercreq]
			else player.timestudy.theorem += ([0,30,35,40,70,130,85,115,115,415,550,1,1])[player.etercreq]
			player.eternityChallUnlocked = 0
			tmp.qu.autoECN = player.etercreq
		} else if (ph.did("ghostify") && player.ghostify.milestones > 1) {
			if (player.etercreq > 12) player.timestudy.theorem += masteryStudies.costs.ec[player.etercreq]
			else player.timestudy.theorem += ([0, 30, 35, 40, 70, 130, 85, 115, 115, 415, 550, 1, 1])[player.etercreq]
			player.eternityChallUnlocked = 0
		} else forceRespec = true
		player.etercreq = 0
	} else if (tmp.ngp3) delete tmp.qu.autoECN
	return forceRespec
}

function getECStarts() {
	let starts = {}
	starts[1] = tmp.mod.newGameExpVersion?1e3:2e4
	starts[2] = tmp.ngC?1950:1300
	starts[3] = tmp.ngC?13100:17300
	starts[4] = tmp.ngC?5e7:1e8
	starts[5] = tmp.ngC?100:160
	starts[6] = tmp.ngC?80:40
	starts[7] = tmp.ngC?"1e450000":"1e500000"
	starts[8] = tmp.ngC?"1e9600":"1e4000"
	starts[9] = tmp.ngC?"1e95000":"1e17500"
	starts[10] = tmp.ngC?"1e115":"1e100"
	return starts;
}

function getECMults() {
	let mults = {}
	mults[1] = tmp.mod.newGameExpVersion?1e3:2e4
	mults[2] = tmp.ngC?350:150
	mults[3] = tmp.ngC?200:1250
	mults[4] = tmp.ngC?25e6:5e7
	mults[5] = tmp.ngC?10:14
	mults[6] = 5
	mults[7] = tmp.ngC?"1e150000":"1e300000"
	mults[8] = tmp.ngC?"1e1200":"1e1000"
	mults[9] = tmp.ngC?"1e1500":"1e2000"
	mults[10] = tmp.ngC?"1e5":"1e20"
	return mults;
}
