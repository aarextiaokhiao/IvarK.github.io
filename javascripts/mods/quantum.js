// v2.9
function quantum(auto, force, qc, isPC, bigRip, quick) {
	if (tmp.ngp3 && tmp.qu.bigRip.active) force = true
	if (!(isQuantumReached()||force)||implosionCheck) return
	var headstart = tmp.mod.newGamePlusVersion > 0 && !tmp.ngp3
	if (tmp.mod.quantumConf&&!(auto||force)) if (!confirm(player.masterystudies?"Quantum will reset everything Eternity resets, and including all Eternity Content. You will gain a quark and unlock various upgrades." + (inNGM(2) ? " WARNING! THIS EXITS NG-- MODE DUE TO BALANCING REASONS!" : ""):"WARNING! Quantum wasn't fully implemented in NG++, so if you go Quantum now, you will gain quarks, but they'll have no use. Everything up to and including Eternity features will be reset.")) return
	if (!ph.did("quantum")) if (!confirm("Are you sure you want to do this? You will lose everything you have!")) return

	var QCs = []
	if (qc !== undefined) QCs = [qc]
	if (isPC) {
		var pair = tmp.qu.pairedChallenges.order[qc]
		if (pair) QCs = [pair[0], pair[1]]
		else QCs = [undefined, undefined]
		if (QCs[0] > QCs[1]) QCs = [QCs[1], QCs[0]]
	}
	var QCType = QCs.length

	if (tmp.ngp3) {
		tmp.preQCMods = tmp.qu.qcsMods.current
		if (QCType) {
			var abletostart = QCType == 2 ? QCs[1] !== undefined : !pcFocus
			if (abletostart) {
				if (!inQC(0)) return
				if (QCType == 2 && tmp.qu.pairedChallenges.completed + 1 < qc) return
				if (tmp.qu.electrons.amount < getQCCost(QCs)) return
				if (bigRip) {
					if (QCs[0] != 6 || QCs[1] != 8) return
					if (tmp.qu.bigRip.conf && !auto) if (!confirm("Big Ripping the universe starts PC6+8, however, only dilation upgrades boost dilation except upgrades that multiply TP gain until you buy the eleventh upgrade, certain resources like Time Theorems and Time Studies will be changed, and only certain upgrades work in Big Rip. If you can beat PC6+8, you will be able to unlock the next layer. You can give your Time Theorems and Time Studies back by undoing Big Rip.")) return
				} else if (QCType == 2) {
					if (player.options.qcConf || (tmp.qu.pairedChallenges.completions.length == 0 && !ph.did("ghostify"))) if (!confirm("You will start a Quantum Challenge, but as a Paired Challenge, there will be two qcenges at once. Completing it boosts the rewards of the Quantum Challenges that you chose in this Paired Challenge. You will keep electrons & sacrificed galaxies, but they don't work in this Challenge.")) return
				} else if (player.options.qcConf || (!QCIntensity(1) && !ph.did("ghostify"))) if (!confirm("You will do a Quantum reset, but you will not gain quarks, you keep your electrons & sacrificed galaxies, and you can't buy electron upgrades. You have to reach the set goal of antimatter while getting the meta-antimatter requirement to Quantum to complete this qcenge. Electrons and banked eternities have no effect in Quantum Challenges and your electrons and sacrificed galaxies don't reset until you end the challenge.")) return
				tmp.qu.electrons.amount -= getQCCost(QCs)
			} else if (pcFocus && QCType == 1) {
				if (QCIntensity(qc) >= 1 && !assigned.includes(qc)) {
					if (!tmp.qu.pairedChallenges.order[pcFocus]) tmp.qu.pairedChallenges.order[pcFocus] = [qc]
					else {
						tmp.qu.pairedChallenges.order[pcFocus].push(qc)
						pcFocus = 0
					}
					assigned.push(qc)
					updateQuantumChallenges()
				}
				return
			} else {
				if (tmp.qu.pairedChallenges.order[pcFocus] !== undefined) delete tmp.qu.pairedChallenges.order[pcFocus]
				pcFocus = pcFocus == qc ? 0 : qc
				updateQuantumChallenges()
				return
			}

			tmp.qu.qcsMods.current = []
			if (!quick) for (var m = 0; m < qcm.on.length; m++) if (ranking >= qcm.reqs[qcm.on[m]] || !qcm.reqs[qcm.on[m]]) tmp.qu.qcsMods.current.push(qcm.on[m])
		} else tmp.qu.qcsMods.current = []
		if (inQCModifier("ms")) ph.updateDisplay()
	}

	var implode = !(auto || force) && speedrunMilestonesReached < 23
	if (implode) {
		implosionCheck = 1
		dev.implode()
		setTimeout(function(){
			quantumReset(force, auto, QCs, qc, bigRip, true)
		}, 1000)
		setTimeout(function(){
			implosionCheck = 0
		}, 2000)
	} else quantumReset(force, auto, QCs, qc, bigRip)
	updateTemp()
}

function getQuantumReq() {
	return Decimal.pow(Number.MAX_VALUE, tmp.ngp3 ? 1.4 : 1)
}

function isQuantumReached() {
	return ph.can("quantum")
}

function getQuarkGain(){
	return quarkGain()
}

function getQKGain(){
	return quarkGain()
}

function getQCtotalTime(){
	var temp = 0
	var count = 0
	for (var i = 1; i <= 8; i++){
		if (tmp.qu.challengeRecords[i]) {
			temp += tmp.qu.challengeRecords[i]
			count ++
		}
	}
	if (count < 8) return Infinity
	return temp
}

function getQCtoQKEffect(){
	var time = getQCtotalTime()
	var ret = 1 + 192 * 3600 * 10 / time
	if (ret > 999) ret = 333 * Math.log10(ret + 1)
	return ret
}

function getEPtoQKExp(){
	let exp = testHarderNGp3 ? 0.5 : 0.6
	if (tmp.newNGP3E) exp += 0.05
	if (hasAch("ng3p28")) exp *= 1.01
	return exp
}

function getEPtoQKMult(){
	var EPBonus = Math.pow(Math.max(player.eternityPoints.log10() / 1e6, 1), getEPtoQKExp()) - 1
	EPBonus = softcap(EPBonus, "EPtoQK")
	return EPBonus 
}

function getAchBonusQKPreSoftcapMult(){
	let log = 0
	if (hasAch("ng3p16")) log += getEPtoQKMult()
	if (hasAch("ng3p33")) log += Math.log10(getQCtoQKEffect())
	if (hasAch("ng3p53")) log += player.quantum.bigRip.spaceShards.plus(1).log10()
	if (hasAch("ng3p65")) log += getTotalRadioactiveDecays()
	if (hasAch("ng3p85")) log += Math.pow(player.ghostify.ghostlyPhotons.enpowerments, 2)
	return log
}

function quarkGain() {
	let ma = player.meta.antimatter.max(1)
	if (!tmp.ngp3) return Decimal.pow(10, ma.log(10) / Math.log10(Number.MAX_VALUE) - 1).floor()
	
	if (!ph.did("quantum")) return new Decimal(1)
	if (player.ghostify.milestones) ma = player.meta.bestAntimatter.max(1)

	let log = (ma.log10() - 379.4) / (hasAch("ng3p63") ? 279.8 : 280)
	let logBoost = 2
	let logBoostExp = 1.5
	if (log > logBoost) log = Math.pow(log / logBoost, logBoostExp) * logBoost
	if (log > 738 && !hasNU(8)) log = Math.sqrt(log * 738)
	log += getAchBonusQKPreSoftcapMult()

	var dlog = Math.log10(log)
	let start = 5
	if (dlog > start) {
		let capped = Math.floor(Math.log10(Math.max(dlog + 2 - start, 1)) / Math.log10(2))
		dlog = (dlog - Math.pow(2, capped) + 2 - start) / Math.pow(2, capped) + capped - 1 + start
		log = Math.pow(10, dlog)
	}

	log += getQuarkMult().log10()

	return Decimal.pow(10, log).floor()
}

function getQuarkMult() {
	x = Decimal.pow(2, tmp.qu.multPower.total)
	if (hasAch("ng3p93")) x = x.times(500)
	return x
}

function toggleQuantumConf() {
	tmp.mod.quantumConf = !tmp.mod.quantumConf
	getEl("quantumConfirmBtn").textContent = "Quantum confirmation: " + (tmp.mod.quantumConf ? "ON" : "OFF")
}

var averageQk = new Decimal(0)
var bestQk
function updateLastTenQuantums() {
	if (!player.meta) return
	var listed = 0
	var tempTime = new Decimal(0)
	var tempQK = new Decimal(0)
	for (var i = 0; i < 10; i++) {
		if (tmp.qu.last10[i][1].gt(0)) {
			var qkpm = tmp.qu.last10[i][1].dividedBy(tmp.qu.last10[i][0] / 600)
			var tempstring = "(" + shorten(qkpm) + " QK/min)"
			if (qkpm<1) tempstring = "(" + shorten(qkpm * 60) + " QK/hour)"
			var msg = "The quantum " + (i == 0 ? '1 quantum' : (i + 1) + ' quantums') + " ago took " + timeDisplayShort(tmp.qu.last10[i][0], false, 3)
			if (tmp.qu.last10[i][2]) {
				if (typeof(tmp.qu.last10[i][2]) == "number") " in Quantum Challenge " + tmp.qu.last10[i][2]
				else msg += " in Paired Challenge " + tmp.qu.last10[i][2][0] + " (QC" + tmp.qu.last10[i][2][1][0] + "+" + tmp.qu.last10[i][2][1][1] + ")"
			}
			msg += " and gave " + shortenDimensions(tmp.qu.last10[i][1]) +" QK. "+ tempstring
			getEl("quantumrun"+(i+1)).textContent = msg
			tempTime = tempTime.plus(tmp.qu.last10[i][0])
			tempQK = tempQK.plus(tmp.qu.last10[i][1])
			bestQk = tmp.qu.last10[i][1].max(bestQk)
			listed++
		} else getEl("quantumrun" + (i + 1)).textContent = ""
	}
	if (listed > 1) {
		tempTime = tempTime.dividedBy(listed)
		tempQK = tempQK.dividedBy(listed)
		var qkpm = tempQK.dividedBy(tempTime / 600)
		var tempstring = "(" + shorten(qkpm) + " QK/min)"
		averageQk = tempQK
		if (qkpm < 1) tempstring = "(" + shorten(qkpm * 60) + " QK/hour"
		getEl("averageQuantumRun").textContent = "Average time of the last " + listed + " Quantums: "+ timeDisplayShort(tempTime, false, 3) + " | Average QK gain: " + shortenDimensions(tempQK) + " QK. " + tempstring
	} else getEl("averageQuantumRun").textContent = ""
}

//v2.9014
function doQuantumProgress() {
	var quantumReq = getQuantumReq()
	var id = 1
	if (ph.did("quantum") && tmp.ngp3) {
		if (tmp.qu.bigRip.active) {
			var gg = getGHPGain()
			if (player.meta.antimatter.lt(quantumReq)) id = 1
			else if (!tmp.qu.breakEternity.unlocked) id = 4
			else if (!ph.did("ghostify") || player.money.lt(getQCGoalLog(undefined, true)) || Decimal.lt(gg, 2)) id = 5
			else if (player.ghostify.neutrinos.boosts > 8 && hasNU(12) && !player.ghostify.ghostlyPhotons.unl) id = 7
			else id = 6
		} else if (inQC(0)) {
			var gqk = quarkGain()
			if (player.meta.antimatter.gte(quantumReq) && Decimal.gt(gqk, 1)) id = 3
		} else if (player.money.lt(Decimal.pow(10, getQCGoalLog())) || player.meta.antimatter.gte(quantumReq)) id = 2
	}
	var className = id > 4 ? "ghostifyProgress" : "quantumProgress"
	if (getEl("progressbar").className != className) getEl("progressbar").className = className
	if (id == 1) {
		var percentage = Math.min(player.meta.antimatter.max(1).log10() / quantumReq.log10() * 100, 100).toFixed(2) + "%"
		getEl("progressbar").style.width = percentage
		getEl("progresspercent").textContent = percentage
		getEl("progresspercent").setAttribute('ach-tooltip', (player.masterystudies ? "Meta-antimatter p" : "P") + 'ercentage to quantum')
	} else if (id == 2) {
		var percentage = Math.min(player.money.max(1).log10() / getQCGoalLog() * 100, 100).toFixed(2) + "%"
		getEl("progressbar").style.width = percentage
		getEl("progresspercent").textContent = percentage
		getEl("progresspercent").setAttribute('ach-tooltip','Percentage to Quantum Challenge goal')
	} else if (id == 3) {
		var gqkLog = gqk.log2()
		var goal = Math.pow(2, Math.ceil(Math.log10(gqkLog) / Math.log10(2)))
		if (!tmp.qu.reachedInfQK) goal = Math.min(goal, 1024)
		var percentage = Math.min(gqkLog / goal * 100, 100).toFixed(2) + "%"
		if (goal > 512 && !tmp.qu.reachedInfQK) percentage = Math.min(tmp.qu.quarks.add(gqk).log2() / goal * 100, 100).toFixed(2) + "%"
		getEl("progressbar").style.width = percentage
		getEl("progresspercent").textContent = percentage
		if (goal > 512 && !tmp.qu.reachedInfQK) getEl("progresspercent").setAttribute('ach-tooltip', "Percentage to new QoL features (" + shorten(Number.MAX_VALUE) + " QK)")
		else getEl("progresspercent").setAttribute('ach-tooltip', "Percentage to " + shortenDimensions(Decimal.pow(2, goal)) + " QK gain")
	} else if (id == 4) {
		var percentage = Math.min(player.eternityPoints.max(1).log10() / 12.15, 100).toFixed(2) + "%"
		getEl("progressbar").style.width = percentage
		getEl("progresspercent").textContent = percentage
		getEl("progresspercent").setAttribute('ach-tooltip','Eternity Points percentage to Break Eternity')
	} else if (id == 5) {
		var percentage = Math.min(tmp.qu.bigRip.bestThisRun.max(1).log10() / getQCGoalLog(undefined, true) * 100, 100).toFixed(2) + "%"
		getEl("progressbar").style.width = percentage
		getEl("progresspercent").textContent = percentage
		getEl("progresspercent").setAttribute('ach-tooltip','Percentage to Ghostify')
	} else if (id == 6) {
		var ggLog = gg.log2()
		var goal = Math.pow(2, Math.ceil(Math.log10(ggLog) / Math.log10(2)))
		var percentage = Math.min(ggLog / goal * 100, 100).toFixed(2) + "%"
		getEl("progressbar").style.width = percentage
		getEl("progresspercent").textContent = percentage
		getEl("progresspercent").setAttribute('ach-tooltip', "Percentage to " + shortenDimensions(Decimal.pow(2, goal)) + " GHP gain")
	} else if (id == 7) {
		var percentage = Math.min(tmp.qu.bigRip.bestThisRun.max(1).log10() / 6000e4, 100).toFixed(2) + "%"
		getEl("progressbar").style.width = percentage
		getEl("progresspercent").textContent = percentage
		getEl("progresspercent").setAttribute('ach-tooltip', "Percentage to Ghostly Photons")
	}
}

//v2.90142
function quantumReset(force, auto, QCs, id, bigRip, implode = false) {
	var headstart = tmp.mod.newGamePlusVersion > 0 && !tmp.ngp3
	var isQC = id !== undefined
	if (implode && speedrunMilestonesReached < 1) {
		showTab("dimensions")
		showDimTab("antimatterdimensions")
		showChallengesTab("challenges")
		showInfTab("preinf")
		showEternityTab("timestudies", true)
	}
	if (!ph.did("quantum")) {
		exitNGMM()
		ph.onPrestige("quantum")
		ph.updateDisplay()
		if (tmp.ngp3) {
			getEl("bestAntimatterType").textContent = "Your best meta-antimatter for this quantum"
			getEl("quarksAnimBtn").style.display="inline-block"
		}
	}
	if (isEmptiness) {
		showTab("dimensions")
		isEmptiness = false
		ph.updateDisplay()
	}
	getEl("quantumbtn").style.display = "none"
	getEl("bigripbtn").style.display = "none"
	getEl("ghostifybtn").style.display = "none"
	updateBankedEter()

	// check if forced quantum
	// otherwise, give rewards
	if (force) {
		if (bigRip && hasAch("ng3p73")) player.infinitiedBank = nA(player.infinitiedBank, gainBankedInf())
		else bankedEterGain = 0
	} else {
		for (var i = tmp.qu.last10.length - 1; i > 0; i--) {
			tmp.qu.last10[i] = tmp.qu.last10[i - 1]
		}
		var qkGain = quarkGain()
		var array = [tmp.qu.time, qkGain]
		if (!inQC(0)) {
			if (tmp.qu.pairedChallenges.current > 0) {
				array.push([tmp.qu.pairedChallenges.current, tmp.qu.challenge])
			} else {
				array.push(tmp.qu.challenge[0])
			}
		}
		tmp.qu.last10[0] = array
		if (tmp.qu.best > tmp.qu.time) {
			tmp.qu.best = tmp.qu.time
			updateSpeedruns()
		}
		tmp.qu.times++
		if (tmp.qu.times >= 1e4) giveAchievement("Prestige No-lifer")
		if (!inQC(6)) {
			tmp.qu.quarks = tmp.qu.quarks.add(qkGain)
			if (!tmp.ngp3 || player.ghostify.milestones < 8) tmp.qu.quarks = tmp.qu.quarks.round()
			if (tmp.ngp3 && tmp.qu.quarks.gte(Number.MAX_VALUE) && !tmp.qu.reachedInfQK) {
				tmp.qu.reachedInfQK = true
				if (!ph.did("ghostify")) {
					getEl("welcome").style.display = "flex"
					getEl("welcomeMessage").innerHTML = "Congratulations for getting " + shorten(Number.MAX_VALUE) + " quarks! You have unlocked new QoL features, like quantum autobuyer modes, assign all, and auto-assignation!"
					getEl('assignAll').style.display = ""
					getEl('autoAssign').style.display = ""
					getEl('autoAssignRotate').style.display = ""
					getEl('ratioSettings').style.display = ""
				}
				getEl('toggleautoquantummode').style.display=""
			}
		}
		if (!inQC(4)) if (player.meta.resets < 1) giveAchievement("Infinity Morals")
		if (player.dilation.rebuyables[1] + player.dilation.rebuyables[2] + player.dilation.rebuyables[3] + player.dilation.rebuyables[4] < 1 && player.dilation.upgrades.length < 1) giveAchievement("Never make paradoxes!")
		if (inQC(1/0) && inQCModifier("?1") && inQCModifier("?2")) giveAchievement("Brutually Challenging")
		if (inQC(1) && inQCModifier("ad") && inQCModifier("sm") && inQCModifier("ms") && inQCModifier("tb")) giveAchievement("Chaos, Chaos, Chaos!")
		if (hasAch("ng3p73")) player.infinitiedBank = nA(player.infinitiedBank, gainBankedInf())
	} //bounds the else statement to if (force)
	var oheHeadstart = bigRip ? tmp.bruActive[2] : tmp.ngp3
	var keepABnICs = oheHeadstart || bigRip || hasAch("ng3p51")
	var oldTime = tmp.qu.time
	tmp.qu.time = 0
	updateQuarkDisplay()

	// ng-2 display
	getEl("galaxyPoints2").innerHTML = "You have <span class='GPAmount'>0</span> Galaxy points."

	// ng+3
	if (tmp.ngp3) {
		var aea = {
			dilMode: player.eternityBuyer.dilMode,
			tpUpgraded: player.eternityBuyer.tpUpgraded,
			slowStop: player.eternityBuyer.slowStop,
			slowStopped: player.eternityBuyer.slowStopped,
			ifAD: player.eternityBuyer.ifAD,
			presets: player.eternityBuyer.presets
		}
		if (!tmp.qu.gluons.rg) {
			tmp.qu.gluons = {
				rg: new Decimal(0),
				gb: new Decimal(0),
				br: new Decimal(0)
			}
		}
		updateQuantumWorth()

		// big rip tracking
		if (bigRip && !tmp.bruActive[12]) {
			tmp.qu.bigRip.storedTS = {
				tt: player.timestudy.theorem,
				studies: player.timestudy.studies,
				boughtA: Decimal.div(player.timestudy.amcost, "1e20000").log("1e20000"),
				boughtI: player.timestudy.ipcost.log("1e100"),
				boughtE: Math.round(player.timestudy.epcost.log(2))
			}
			if (player.eternityChallUnlocked > 12) tmp.qu.bigRip.storedTS.tt += masteryStudies.costs.ec[player.eternityChallUnlocked]
			else tmp.qu.bigRip.storedTS.tt += ([0, 30, 35, 40, 70, 130, 85, 115, 115, 415, 550, 1, 1])[player.eternityChallUnlocked]
			for (var s = 0; s < player.masterystudies.length; s++) if (player.masterystudies[s].indexOf("t") == 0) tmp.qu.bigRip.storedTS.studies.push(parseInt(player.masterystudies[s].split("t")[1]))
		}
		if (bigRip != tmp.qu.bigRip.active) switchAB()

		// supermastery
		if (inQCModifier("sm")) {
			var count = 0
			var newMS = []
			for (var i = 0; i < player.masterystudies.length; i++) {
				var study = player.masterystudies[i]
				var split = study.split("t")
				if (!split[1]) newMS.push(study)
				else if (count < 20) {
					newMS.push(study)
					count++
				} else player.timestudy.theorem += masteryStudies.costs.time[split[1]]
			}
			player.masterystudies = newMS
			respecUnbuyableTimeStudies()
		}
		if (!bigRip && tmp.qu.bigRip.active) if (player.galaxies == 9 && player.replicanti.galaxies == 9 && player.timeDimension4.amount.round().eq(9)) giveAchievement("We can really afford 9.")
	} else tmp.qu.gluons = 0;

	if (player.tickspeedBoosts !== undefined) player.tickspeedBoosts = 0
	if (hasAch("r104")) player.infinityPoints = new Decimal(2e25);
	else player.infinityPoints = new Decimal(0);

	// more big rip stuff
	if (tmp.ngp3) {
		if (!bigRip && tmp.qu.bigRip.active && force) {
			tmp.qu.bigRip.spaceShards = tmp.qu.bigRip.spaceShards.add(getSpaceShardsGain())
			if (player.ghostify.milestones < 8) tmp.qu.bigRip.spaceShards = tmp.qu.bigRip.spaceShards.round()
			if (player.matter.gt("1e5000")) giveAchievement("Really?")
		} else if (inQC(6) && inQC(8) && player.money.gt(tmp.qu.pairedChallenges.pc68best)) {
			tmp.qu.pairedChallenges.pc68best = player.money
			getEl("bpc68").textContent = shortenMoney(player.money)
		}
	}
	var oldMoney = player.money
	var dilTimes = player.dilation.times
	var bigRipChanged = tmp.ngp3 && bigRip != player.quantum.bigRip.active
	var turnSomeOn = !bigRip || player.quantum.bigRip.upgrades.includes(1)
	
	doQuantumResetStuff(bigRip, isQC)
	// ghostify achievement reward - "Kee-hee-hee!"
	if (ph.did("ghostify") && bigRip) {
		player.timeDimension8 = {
			cost: timeDimCost(8, 1),
			amount: new Decimal(1),
			power: new Decimal(1),
			bought: 1
		}
	}
		
	player.money = onQuantumAM()
	doInitInfMultStuff()
	if (inNGM(2) && !keepABnICs) player.autobuyers[12] = 13
	if (player.tickspeedBoosts !== undefined && !keepABnICs) player.autobuyers[13] = 14
	player.challenges = challengesCompletedOnEternity(bigRip)
	if (bigRip && player.ghostify.milestones > 9 && tmp.mod.ngudpV) for (var u = 7; u < 10; u++) player.eternityUpgrades.push(u)

	player.dilation.totalTachyonParticles = player.dilation.tachyonParticles
	if (tmp.ngp3) {
		player.dilation.times = 0
		if (!force) {
			var u = tmp.qu.usedQuarks
			var g = tmp.qu.gluons
			var p = ["rg", "gb", "br"]
			var d = []
			for (var c = 0; c < 3; c++) d[c] = u[p[c][0]].min(u[p[c][1]])
			for (var c = 0; c < 3; c++) {
				g[p[c]] = g[p[c]].add(d[c]).round()
				u[p[c][0]] = u[p[c][0]].sub(d[c]).round()
			}
			var qc = tmp.inQCs
			onQCCompletion(qc, oldMoney, oldTime, dilTimes)
			if (tmp.qu.pairedChallenges.respec) respecPCs()
			if (tmp.qu.autoOptions.assignQK) assignAll(true)
			if (ph.did("ghostify")) player.ghostify.neutrinos.generationGain = player.ghostify.neutrinos.generationGain % 3 + 1
			if (isAutoGhostActive(4) && player.ghostify.automatorGhosts[4].mode != "t") rotateAutoUnstable()
		} //bounds if (!force)
		tmp.qu.pairedChallenges.current = 0
		if (!isQC) {
			tmp.qu.electrons.amount = 0
			tmp.qu.electrons.sacGals = 0
			tmp.qu.challenge = []
			tmp.qu.qcsMods.current = []
			tmp.aeg = 0
		} else if (QCs.length == 2) tmp.qu.pairedChallenges.current = id
		tmp.qu.challenge = QCs
		ph.updateActive()
		updateInQCs()

		if ((!isQC && player.ghostify.milestones < 6) || bigRip != tmp.qu.bigRip.active) tmp.qu.replicants.amount = new Decimal(0)
		replicantsResetOnQuantum(isQC)
		nanofieldResetOnQuantum()
		player.eternityBuyer.tpUpgraded = false
		player.eternityBuyer.slowStopped = false
		if (tmp.qu.bigRip.active != bigRip) {
			if (bigRip) {
				for (var u = 0; u < tmp.qu.bigRip.upgrades.length; u++) tweakBigRip(tmp.qu.bigRip.upgrades[u])
				if (tmp.qu.bigRip.times < 1) getEl("bigRipConfirmBtn").style.display = "inline-block"
				tmp.qu.bigRip.times++
				tmp.qu.bigRip.bestThisRun = player.money
				giveAchievement("To the new dimension!")
				if (tmp.qu.breakEternity.break) tmp.qu.breakEternity.did = true
			} else {
				if (!tmp.qu.bigRip.upgrades.includes(1) && oheHeadstart) {
					player.infmultbuyer = true
					for (var d=0;d<8;d++) player.infDimBuyers[d] = true
				}
				if (isRewardEnabled(11)) unstoreTT()
			}
			if (ph.did("ghostify")) player.ghostify.neutrinos.generationGain = player.ghostify.neutrinos.generationGain % 3 + 1
			tmp.qu.bigRip.active = bigRip
		}
		getEl("metaAntimatterEffectType").textContent = inQC(3) ? "multiplier on all Infinity Dimensions" : "extra multiplier per Dimension Boost"
		if (!oheHeadstart) {
			player.eternityBuyer.dilationMode = false
			player.eternityBuyer.dilationPerAmount = 10
			if (tmp.ngp3) {
				player.eternityBuyer.dilMode = aea.dilMode
				player.eternityBuyer.tpUpgraded = aea.tpUpgraded
				player.eternityBuyer.slowStop = aea.slowStop
				player.eternityBuyer.slowStopped = aea.slowStopped
				player.eternityBuyer.presets = aea.presets
			}
		}
		player.eternityBuyer.statBeforeDilation = 0
		if ((player.autoEterMode=="replicanti"||player.autoEterMode=="peak")&&(speedrunMilestonesReached<18||!isRewardEnabled(4))) {
			player.autoEterMode="amount"
			updateAutoEterMode()
		}
		getEl('dilationmode').style.display = speedrunMilestonesReached > 4 ? "" : "none"
		getEl('rebuyupgauto').style.display = speedrunMilestonesReached > 6 ? "" : "none"
		getEl('metaboostauto').style.display = speedrunMilestonesReached > 14 ? "" : "none"
		getEl("autoBuyerQuantum").style.display = speedrunMilestonesReached > 22 ? "" : "none"
		if (bigRip ? tmp.bruActive[12] : isRewardEnabled(11) && isRewardEnabled(4)) player.dilation.upgrades.push(10)
		else tmp.qu.wasted = (!isRewardEnabled(11) || bigRip) && tmp.qu.bigRip.storedTS === undefined
		if (bigRip ? tmp.bruActive[12] : speedrunMilestonesReached > 13 && isRewardEnabled(4)) {
			for (let i = (player.exdilation != undefined ? 1 : 3); i < 7; i++) if (i != 2 || !tmp.mod.ngudpV) player.dilation.upgrades.push((i > 2 ? "ngpp" : "ngud") + i)
			if (tmp.mod.nguspV) {
				for (var i = 1; i < 3; i++) player.dilation.upgrades.push("ngusp" + i)
				for (var i = 4; i < 23; i++) if (player.dilation.upgrades.includes(getDilUpgId(i))) player.dilation.autoUpgrades.push(i)
				updateExdilation()
			}
		}
		tmp.qu.notrelative = true
		updateMasteryStudyCosts()
		updateMasteryStudyButtons()
		delete tmp.qu.autoECN
	} // bounds if tmp.ngp3
	if (speedrunMilestonesReached < 1 && !bigRip) {
		getEl("infmultbuyer").textContent = "Autobuy IP mult: OFF"
		getEl("togglecrunchmode").textContent = "Auto crunch mode: amount"
		getEl("limittext").textContent = "Amount of IP to wait until reset:"
		getEl("epmult").innerHTML = "You gain 5 times more EP<p>Currently: " + shortenDimensions(player.epmult) + "x<p>Cost: " + shortenDimensions(player.epmultCost) + " EP"
	}
	if (!oheHeadstart) {
		player.autobuyers[9].bulk = Math.ceil(player.autobuyers[9].bulk)
		getEl("bulkDimboost").value = player.autobuyers[9].bulk
	}

	// last few updates
	setInitialResetPower()
	resetUP()
	if (oheHeadstart) player.replicanti.amount = new Decimal(1)
	player.replicanti.galaxies = 0
	updateRespecButtons()
	if (hasAch("r36")) player.tickspeed = player.tickspeed.times(0.98);
	if (hasAch("r45")) player.tickspeed = player.tickspeed.times(0.98);
	if (player.infinitied >= 1 && !player.challenges.includes("challenge1")) player.challenges.push("challenge1");
	updateAutobuyers()
	if (hasAch("r85")) player.infMult = player.infMult.times(4);
	if (hasAch("r93")) player.infMult = player.infMult.times(4);
	if (hasAch("r104")) player.infinityPoints = new Decimal(2e25);
	resetInfDimensions();
	updateChallenges();
	updateNCVisuals()
	updateChallengeTimes()
	updateLastTenRuns()
	updateLastTenEternities()
	updateLastTenQuantums()
	if (!hasAch("r133") && !bigRip) {
		var infchalls = Array.from(document.getElementsByClassName('infchallengediv'))
		for (var i = 0; i < infchalls.length; i++) infchalls[i].style.display = "none"
	}
	GPminpeak = new Decimal(0)
	IPminpeak = new Decimal(0)
	EPminpeakType = 'normal'
	EPminpeak = new Decimal(0)
	QKminpeak = new Decimal(0)
	QKminpeakValue = new Decimal(0)
	updateAutobuyers()
	updateMilestones()
	resetTimeDimensions()
	if (oheHeadstart) {
		getEl("replicantiresettoggle").style.display = "inline-block"
		skipResets()
	} else {
		hideDimensions()
		if (tmp.ngp3) getEl("infmultbuyer").textContent="Max buy IP mult"
		else getEl("infmultbuyer").style.display = "none"
		hideMaxIDButton()
		getEl("replicantidiv").style.display="none"
		getEl("replicantiunlock").style.display="inline-block"
		getEl("replicantiresettoggle").style.display = "none"
		delete player.replicanti.galaxybuyer
	}
	var shortenedIP = shortenDimensions(player.infinityPoints)
	getEl("infinityPoints1").innerHTML = "You have <span class=\"IPAmount1\">" + shortenedIP + "</span> Infinity points."
	getEl("infinityPoints2").innerHTML = "You have <span class=\"IPAmount2\">" + shortenedIP + "</span> Infinity points."
	updateEternityUpgrades()
	getEl("totaltickgained").textContent = "You've gained "+player.totalTickGained.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+" tickspeed upgrades."
	hideDimensions()
	tmp.tickUpdate = true
	playerInfinityUpgradesOnEternity()
	getEl("eternityPoints2").innerHTML = "You have <span class=\"EPAmount2\">"+shortenDimensions(player.eternityPoints)+"</span> Eternity point"+((player.eternityPoints.eq(1)) ? "." : "s.")
	getEl("epmult").innerHTML = "You gain 5 times more EP<p>Currently: 1x<p>Cost: 500 EP"
	updateTheoremButtons()
	updateTimeStudyButtons()
	updateDilationUpgradeCosts()
	drawStudyTree()
	handleDisplaysOnQuantum(bigRip)

	Marathon2 = 0;
	setInitialMoney()
	getEl("quantumConfirmBtn").style.display = "inline-block"
}

function handleDisplaysOnQuantum(bigRip, prestige) {
	if (!tmp.ngp3) return
	if (!bigRip) bigRip = inBigRip()
	
	if (inQC(8) && (getEl("infinitydimensions").style.display == "block" || (getEl("timedimensions").style.display == "block" && !tmp.be))) showDimTab("antimatterdimensions")

	let keepECs = bigRip ? tmp.bruActive[2] : speedrunMilestonesReached >= 2
	if (!keepECs && getEl("eternitychallenges").style.display == "block") showChallengesTab("normalchallenges")

	let keepDil = bigRip ? tmp.bruActive[10] : player.dilation.studies.includes(1)
	if (!keepDil && getEl("dilation").style.display == "block") showEternityTab("timestudies", getEl("eternitystore").style.display=="block")

	let keepMDs = bigRip ? tmp.bruActive[12] : keepDil && speedrunMilestonesReached >= 6
	if (!keepMDs && getEl("metadimensions").style.display == "block") showDimTab("antimatterdimensions")

	let keepMSs = bigRip || (tmp.ngp3 && player.dilation.upgrades.includes("ngpp6"))
	getEl("masterystudyunlock").style.display = keepMSs ? "" : "none"
	getEl("respecMastery").style.display = keepMSs ? "block" : "none"
	getEl("respecMastery2").style.display = keepMSs ? "block" : "none"
	if (keepMSs) drawMasteryTree()
	else {
		performedTS = false
		if (getEl("masterystudies").style.display == "block") showEternityTab("timestudies", getEl("eternitystore").style.display != "block")
	}

	let keepQuantum = tmp.quActive && speedrunMilestonesReached >= 16
	if (tmp.quActive && !bigRip) {
		let keepElc = keepQuantum && player.masterystudies.includes("d7")
		let keepAnts = keepQuantum && player.masterystudies.includes("d10")
		let keepNf = keepQuantum && player.masterystudies.includes("d11")
		let keepToD = keepQuantum && player.masterystudies.includes("d12")

		getEl("electronstabbtn").style.display = keepElc ? "" : "none"
		getEl("replicantstabbtn").style.display = keepAnts ? "" : "none"
		getEl("nanofieldtabbtn").style.display = keepNf ? "" : "none"
		getEl("todtabbtn").style.display = keepToD ? "" : "none"
	
		if (!keepElc && getEl("electrons").style.display == "block") showQuantumTab("uquarks")
		if (!keepAnts && getEl("replicants").style.display == "block") showQuantumTab("uquarks")
		if (!keepNf && getEl("nanofield").style.display == "block") showQuantumTab("uquarks")
		if (!keepToD && getEl("tod").style.display == "block") showQuantumTab("uquarks")
	}

	handleDisplaysOutOfQuantum(bigRip)
	handleQuantumDisplays(prestige)
}

function handleDisplaysOutOfQuantum(bigRip) {
	if (!bigRip) bigRip = inBigRip()

	let keepQuantum = tmp.quActive && speedrunMilestonesReached >= 16
	let keepQCs = ph.shown("quantum") && tmp.quUnl && speedrunMilestonesReached >= 16 && player.masterystudies.includes("d8")
	let keepEDs = ph.shown("quantum") && keepQuantum && player.masterystudies.includes("d11")
	let keepBE = tmp.ngp3 && (bigRip || tmp.qu.breakEternity.unlocked || ph.did("ghostify"))

	if (!keepQCs && getEl("quantumchallenges").style.display == "block") showChallengesTab("normalchallenges")
	if (!keepEDs && getEl("emperordimensions").style.display == "block") showDimTab("antimatterdimensions")
	if (!keepBE && getEl("breakEternity").style.display == "block") showEternityTab("timestudies", getEl("eternitystore").style.display != "block")

	getEl("qctabbtn").style.display = keepQCs ? "" : "none"
	getEl("edtabbtn").style.display = keepEDs ? "" : "none"
	getEl("breakEternityTabbtn").style.display = keepBE? "" : "none"

	updatePCCompletions()
}

function handleQuantumDisplays(prestige) {
	updateBankedEter()
	updateSpeedruns()
	if (!tmp.ngp3) return

	updateLastTenQuantums()
	updateAutoQuantumMode()

	updateAssortPercentage()
	updateColorCharge()
	updateGluonsTabOnUpdate()
	updateElectrons()

	let dontshowrg4 = inQC(1) || QCIntensity(1) >= 1 || ph.did("ghostify")
	getEl('rg4toggle').style.display = dontshowrg4 ? "none" : ""

	updateQuantumChallenges()
	updateQCTimes()

	updateReplicants(prestige ? "prestige" : "")

	updateTODStuff()

	updateBreakEternity()
}

function updateQuarkDisplay() {
	let msg = ""
	if (ph.did("quantum")) {
		msg += "You have <b class='QKAmount'>"+shortenDimensions(tmp.qu.quarks)+"</b> "	
		if (tmp.ngp3&&player.masterystudies.includes("d14")) msg += " QK and <b class='SSAmount'>" + shortenDimensions(tmp.qu.bigRip.spaceShards) + "</b> Space Shard" + (tmp.qu.bigRip.spaceShards.round().eq(1) ? "" : "s")
		else msg += "quark" + (tmp.qu.quarks.round().eq(1) ? "" : "s")
		msg += "."
	}
	getEl("quarks").innerHTML=msg
}

function metaReset2() {
	if (tmp.ngp3 && tmp.qu.bigRip.active) ghostify()
	else quantum()
}