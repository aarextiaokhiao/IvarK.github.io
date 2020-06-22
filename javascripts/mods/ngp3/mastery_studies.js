var masteryStudies = {
	initCosts: {
		time: {241: 2e71, 251: 5e71, 252: 5e71, 253: 5e71, 261: 2e71, 262: 2e71, 263: 2e71, 264: 2e71, 265: 2e71, 266: 2e71, 271: 2.7434842249657063e76, 272: 2.7434842249657063e76, 273: 2.7434842249657063e76, 281: 6.858710562414266e76, 282: 6.858710562414266e76, 291: 2.143347050754458e77, 292: 2.143347050754458e77, 301: 8.573388203017832e77, 302: 2.6791838134430725e78, 303: 8.573388203017832e77, 311: 8.573388203017832e77, 312: 8.573388203017832e77, 321: 2.6791838134430727e76, 322: 9.324815538194444e77, 323: 2.6791838134430727e76, 331: 1.0172526041666666e79, 332: 1.0172526041666666e79, 341: 9.5367431640625e78, 342: 1.0172526041666666e79, 343: 1.0172526041666666e79, 344: 9.5367431640625e78, 351: 2.1192762586805557e79, 361: 1.5894571940104167e79, 362: 1.5894571940104167e79, 371: 2.1192762586805557e79, 372: 6.622738308376736e79, 373: 2.1192762586805557e79, 381: 6.622738308376736e79, 382: 6.622738308376736e79, 383: 6.622738308376736e79, 391: 8.27842288547092e79, 392: 8.27842288547092e79, 393: 8.27842288547092e79, 401: 4.967053731282552e80, 402: 8.278422885470921e80, 411: 1.3245476616753473e71, 412: 1.655684577094184e71, 421: 1.9868214925130208e72, 431: 1.1037897180627893e75},
		time_legacy: {241: 1e71, 251: 2e71, 252: 2e71, 253: 2e71, 261: 5e71, 262: 5e71, 263: 5e71, 264: 5e71, 265: 5e71, 266: 5e71},
		ec: {13: 1.7777777777777776e72, 14: 1.7777777777777776e72},
		ec_legacy: {13: 1e72, 14: 1e72},
		dil: {7: 2e82, 8: 2e84, 9: 4e85, 10: 4e87, 11: 3e90, 12: 3e92, 13: 1e94, 14: 1e97},
		dil_legacy: {13: 1e95, 14: 1e98}
	},
	costs: {
		time: {},
		time_mults: {241: 1, 251: 2.5, 252: 2.5, 253: 2.5, 261: 6, 262: 6, 263: 6, 264: 6, 265: 6, 266: 6, 271: 2, 272: 2, 273: 2, 281: 4, 282: 4, 291: 1, 292: 1, 301: 2, 302: 131072, 303: 2, 311: 64, 312: 64, 321: 2, 322: 2, 323: 2, 331: 2, 332: 2, 341: 1, 342: 1, 343: 1, 344: 1, 351: 4, 361: 1, 362: 1, 371: 2, 372: 2, 373: 2, 381: 1, 382: 1, 383: 2, 391: 1, 392: 1, 393: 1, 401: 1e10, 402: 1e10, 411: 1, 412: 1, 421: 1, 431: 1},
		time_mults_legacy: {},
		ec: {},
		dil: {}
	},
	costMult: 1,
	ecReqs: {
		13: function() {
			let comps = ECTimesCompleted("eterc13")
			return 728e3 + (tmp.ngp3l ? 6000 : (1500 + 3000 * comps)) * comps
		},
		14: function() {
			let comps = ECTimesCompleted("eterc14")
			return 255e5 + (tmp.ngp3l ? 9e5 : (2e6 + 2e6 * comps)) * comps
		}
	},
	ecReqsStored: {},
	ecReqDisplays: {
		13: function() {
			return getFullExpansion(masteryStudies.ecReqsStored[13]) + " dimension boosts"
		},
		14: function() {
			return getFullExpansion(masteryStudies.ecReqsStored[14]) + "% replicate chance"
		}
	},
	unlockReqConditions: {
		7: function() {
			return tmp.ngp3l || quantumWorth.gte(50)
		},
		8: function() {
			return tmp.qu.electrons.amount >= 16750
		},
		9: function() {
			return QCIntensity(8) >= 1
		},
		10: function() {
			return tmp.qu.pairedChallenges.completed == 4
		},
		11: function() {
			return tmp.eds[1].perm == 10
		},
		12: function() {
			return tmp.eds[8].perm >= 10
		},
		13: function() {
			return tmp.qu.nanofield.rewards >= 16
		},
		14: function() {
			return player.achievements.includes("ng3p34")
		}
	},
	unlockReqDisplays: {
		7: function() {
			if (!tmp.ngp3l) return "50 quantum worth"
		},
		8: function() {
			return getFullExpansion(16750) + " electrons"
		},
		9: function() {
			return "Complete Quantum Challenge 8"
		},
		10: function() {
			return "Complete Paired Challenge 4"
		},
		11: function() {
			return getFullExpansion(10) + " worker replicants"
		},
		12: function() {
			return getFullExpansion(10) + " Eighth Emperor Dimensions"
		},
		13: function() {
			return getFullExpansion(16) + " Nanofield rewards"
		},
		14: function() {
			return "Get 'The Challenging Day' achievement"
		}
	},
	types: {t: "time", ec: "ec", d: "dil"},
	studies: [],
	timeStudies: [],
	timeStudyDescs: {
		241: "The IP mult multiplies IP gain by 2.2x per upgrade.", // needs to be retroactive and change based on the gluon upgrade
		251: "Remote galaxy scaling starts 1 galaxy later per 3,000 dimension boosts.",
		252: "Remote galaxy scaling starts 1 galaxy later per 7 free galaxies.",
		253: function() {
			return "Remote galaxy scaling starts "+(tmp.ngp3l?"20 galaxies later per 9 extra replicated galaxies.":"1 galaxy later per 4 total replicated galaxies.")
		},
		261: "Dimension boost costs scale by another 1 less.",
		262: "Dimension boosts boost Meta Dimensions at reduced rate.",
		263: "Meta-dimension boosts boost dilated time production.",
		264: "Gain more tachyon particles based on your normal galaxies.",
		265: "Replicate chance can exceed 100%.",
		266: "Reduce the cost scaling for post-400 replicanti galaxies.", // needs to be retroactive
		271: "You can buy base interval upgrades past 1ms, but the cost scales faster.",
		272: "You can buy all nornal time studies in all 3-way splits.",
		273: "Replicate chance boosts itself.",
		281: "Replicanti multiplier boosts DT production at a greatly reduced rate.",
		282: "Replicanti multiplier boosts Meta Dimensions at a greatly reduced rate.",
		291: "You gain 1% of your EP gained on eternity every second.",
		292: "You can gain tachyon particles during dilation.",
		301: "Remote cost scaling starts 1 galaxy later per 4.15 extra replicated galaxies.",
		302: "You can buy all normal time studies.",
		303: "Meta Dimensions are stronger based on your galaxies.",
		311: "Replicanti boost to all Infinity Dimensions is 17.3x stronger.", 
		312: "Meta-dimension boosts are 4.5% stronger and cost scale by 1 less.",
		321: "Buff the multiplier per 10 Normal Dimensions to <span id='321effect'></span>x if it is 1x.",
		322: "Tickspeed boosts DT production at a greatly reduced rate.",
		323: "Cancel the dilation penalty for the Normal Dimension boost from replicanti.",
		331: "Dimension Supersonic scaling starts 240,000 later and makes cost increases slower by 3 less.",
		332: "Replicanti multiplies faster based on your normal galaxies.",
		341: "Preons boost DT production at a reduced rate.",
		342: "All replicated galaxies are stronger and use the same formula.",
		343: "Free galaxies are as strong as a normal replicated galaxy.",
		344: "Replicated galaxies are more effective based on your preons.",
		351: "Time Shards boost Meta Dimensions.",
		361: "Hatch speed increases based on your tachyon particles.", // needs to change at some point in ghostify
		362: function() {
			return "Reduce the softcap for preon boost"+(player.aarexModifications.ngumuV?", but preons reduce the green power effect.":".")
		},
		371: "Hatch speed increases based on your extra replicated galaxies.", // needs to change at some point in ghostify
		372: "Hatch speed increases based on your time shards.", // needs to change at some point in ghostify
		373: "Galaxies boost preon production.",
		381: "Hatch speed increases based on your tickspeed reduction multiplier.", // needs to change at some point in ghostify
		382: "Eighth Dimensions boost Meta Dimensions.",
		383: "Blue power boosts Meta Dimensions.",
		391: "Hatch speed is faster based on your meta-antimatter.", // needs to change at some point in ghostify
		392: "Preons boost Emperor Dimensions.",
		393: "Workers boost Meta Dimensions.",
		401: "The production of preon anti-energy decreases based on your preons.",
		402: "Emperor Dimensions and hatch speed gain a 30x multiplier.",
		411: "The production of preon energy increases based on your replicants.",
		412: "Preon effect is 25% stronger.",
		421: "Tickspeed boosts preon energy production.",
		431: "Branches are faster based on your free galaxies."
	},
	hasStudyEffect: [251, 252, 253, 262, 263, 264, 273, 281, 282, 301, 303, 322, 332, 341, 344, 351, 361, 371, 372, 373, 381, 382, 383, 391, 392, 393, 401, 411, 421, 431],
	studyEffectDisplays: {
		251: function(x) {
			return "+" + getFullExpansion(Math.floor(x))
		},
		252: function(x) {
			return "+" + getFullExpansion(Math.floor(x))
		},
		253: function(x) {
			return "+" + getFullExpansion(Math.floor(x))
		},
		273: function(x) {
			return "^" + shorten(x)
		},
		301: function(x) {
			return "+" + getFullExpansion(Math.floor(x))
		},
		332: function(x) {
			return shortenDimensions(x) + "x"
		},
		344: function(x) {
			return (x * 100 - 100).toFixed(2) + "%"
		},
		431: function(x) {
			let msg = shorten(x) + "x"
			if (shiftDown && tmp.eg431) msg += ", Galaxy amount: " + getFullExpansion(Math.floor(player.dilation.freeGalaxies)) + "+" + getFullExpansion(Math.floor(tmp.eg431))
			return msg
		}
	},
	ecsUpTo: 14,
	unlocksUpTo: 14,
	allConnections: {241: [251, 253, 252], 251: [261, 262], 252: [263, 264], 253: [265, 266], 261: ["ec13"], 262: ["ec13"], 263: ["ec13"], 264: ["ec14"], 265: ["ec14"], 266: ["ec14"], ec13: ["d7"], ec14: ["d7"], d7: [272], 271: [281], 272: [271, 273, 281, 282, "d8"], 273: [282], d8: ["d9"], d9: [291, 292, 302], 291: [301], 292: [303], 301: [311], 302: ["d10"], 303: [312], 311: [321], 312: [323], d10: [322], 322: [331, 332], 331: [342], 332: [343], 342: [341], 343: [344], 344: [351], 351: ["d11"], d11: [361, 362], 361: [371], 362: [373], 371: [372], 372: [381], 373: [382], 381: [391], 382: [383], 383: [393], 391: [392], 393: [392], 392: ["d12"], d12: [401, 402], 401: [411], 402: [412], 411: [421], 412: ["d13"], 421: ["d13"], d13: [431], 431: ["d14"]},
	allConnections_legacy: {252: [263, 264, "d7"], ec13: [], ec14: []},
	allUnlocks: {
		d7: function() {
			return quantumed
		},
		322: function() {
			return player.masterystudies.includes("d10") || ghostified
		},
		361: function() {
			return player.masterystudies.includes("d11") || ghostified
		},
		r40: function() {
			return player.masterystudies.includes("d12") || ghostified
		},
		r43: function() {
			return player.masterystudies.includes("d13") || ghostified
		}
	},
	unlocked: [],
	spentable: [],
	latestBoughtRow: 0,
	ttSpent: 0
}

function enterMasteryPortal() {
	if (player.dilation.upgrades.includes("ngpp6")) {
		recordUpDown(1)
		showEternityTab("masterystudies")
	}
}

function exitMasteryPortal() {
	recordUpDown(2)
	showEternityTab("timestudies")
}

function convertMasteryStudyIdToDisplay(x) {
	x=x.toString()
	var ec=x.split("ec")[1]
	var dil=x.split("d")[1]
	return ec?"ec"+ec+"unl":dil?"dilstudy"+dil:"timestudy"+x
}

function updateMasteryStudyCosts() {
	var oldBought=masteryStudies.bought
	masteryStudies.latestBoughtRow=0
	masteryStudies.costMult=1
	masteryStudies.bought=0
	masteryStudies.ttSpent=0
	for (id=0;id<player.masterystudies.length;id++) {
		var t=player.masterystudies[id].split("t")[1]
		if (t) {
			setMasteryStudyCost(t,"t")
			masteryStudies.ttSpent+=masteryStudies.costs.time[t]
			masteryStudies.costMult*=getMasteryStudyCostMult(t)
			masteryStudies.latestBoughtRow=Math.max(masteryStudies.latestBoughtRow,Math.floor(t/10))
			masteryStudies.bought++
		}
	}
	for (id=0;id<masteryStudies.timeStudies.length;id++) {
		var name=masteryStudies.timeStudies[id]
		if (!masteryStudies.unlocked.includes(name)) break
		if (!player.masterystudies.includes("t"+name)) setMasteryStudyCost(name,"t")
	}
	for (id=13;id<=masteryStudies.ecsUpTo;id++) {
		if (!masteryStudies.unlocked.includes("ec"+id)) break
		setMasteryStudyCost(id,"ec")
		masteryStudies.ecReqsStored[id]=masteryStudies.ecReqs[id]()
	}
	for (id=7;id<=masteryStudies.unlocksUpTo;id++) {
		if (!masteryStudies.unlocked.includes("d"+id)) break
		setMasteryStudyCost(id,"d")
	}
	if (oldBought!=masteryStudies.bought) updateSpentableMasteryStudies()
	if (player.eternityChallUnlocked>12) masteryStudies.ttSpent+=masteryStudies.costs.ec[player.eternityChallUnlocked]
	if (masteryStudies.bought>=48) giveAchievement("The Theory of Ultimate Studies")
	updateMasteryStudyTextDisplay()
}

function setupMasteryStudies() {
	masteryStudies.studies=[241]
	var map=masteryStudies.studies
	var part
	var pos=0
	while (true) {
		var id=map[pos]
		if (!id) {
			if (!part) break
			map.push(part)
			id=part
			part=""
		}
		if (typeof(id)=="number") masteryStudies.timeStudies.push(id)
		var paths=getMasteryStudyConnections(id)
		if (paths!==undefined) for (var x=0;x<paths.length;x++) {
			var y=paths[x]
			if (!map.includes(y)) {
				if (y.toString()[0]=="d") part=y
				else map.push(y)
			}
		}
		pos++
	}
}

function setupMasteryStudiesHTML() {
	setupMasteryStudies()
	for (id=0;id<masteryStudies.timeStudies.length;id++) {
		var name=masteryStudies.timeStudies[id]
		var html="<span id='ts"+name+"Desc'></span>"
		if (masteryStudies.hasStudyEffect.includes(name)) html+="<br>Currently: <span id='ts"+name+"Current'></span>"
		html+="<br>Cost: <span id='ts"+name+"Cost'></span> Time Theorems"
		document.getElementById("timestudy"+name).innerHTML=html
	}
}

function getMasteryStudyConnections(id) {
	return (tmp.ngp3l && masteryStudies.allConnections_legacy[id]) || masteryStudies.allConnections[id]
}

function updateUnlockedMasteryStudies() {
	var unl=true
	var rowNum=0
	masteryStudies.unlocked=[]
	for (var x=0;x<masteryStudies.studies.length;x++) {
		var id=masteryStudies.studies[x]
		var divid=convertMasteryStudyIdToDisplay(id)
		if (Math.floor(id/10)>rowNum) {
			rowNum=Math.floor(id/10)
			if (masteryStudies.allUnlocks["r"+rowNum]&&!masteryStudies.allUnlocks["r"+rowNum]()) unl=false
			document.getElementById(divid).parentElement.parentElement.parentElement.parentElement.style=unl?"":"display: none !important"
			if (unl) masteryStudies.unlocked.push("r"+rowNum)
		} else if (divid[0]=="d") document.getElementById(divid).parentElement.parentElement.parentElement.parentElement.style=unl?"":"display: none !important"
		if (masteryStudies.allUnlocks[id]&&!masteryStudies.allUnlocks[id]()) unl=false
		document.getElementById(divid).style.visibility=unl?"":"hidden"
		if (unl) masteryStudies.unlocked.push(id)
	}
}

function updateSpentableMasteryStudies() {
	masteryStudies.spentable=[]
	addSpentableMasteryStudies(241)
}

function addSpentableMasteryStudies(x) {
	var map=[x]
	var part
	var pos=0
	while (true) {
		var id=map[pos]
		if (!id) break
		var isNum=typeof(id)=="number"
		var ecId=!isNum&&id.split("ec")[1]
		var canAdd=false
		if (ecId) canAdd=ECTimesCompleted("eterc"+ecId)
		else canAdd=player.masterystudies.includes(isNum?"t"+id:id)
		if (masteryStudies.unlocked.includes(id)&&!masteryStudies.spentable.includes(id)) masteryStudies.spentable.push(id)
		if (canAdd) {
			var paths=getMasteryStudyConnections(id)
			if (paths) for (var x=0;x<paths.length;x++) map.push(paths[x])
		}
		pos++
	}
}

function setMasteryStudyCost(id,type) {
	let d=masteryStudies.initCosts
	let type2=masteryStudies.types[type]
	masteryStudies.costs[type2][id]=((tmp.ngp3l&&d[type2+"_legacy"][id])||d[type2][id]||0)*(type=="d"?1:masteryStudies.costMult)
}

function getMasteryStudyCostMult(id) {
	return (tmp.ngp3l&&masteryStudies.costs.time_mults_legacy[id])||masteryStudies.costs.time_mults[id]||1
}

function buyMasteryStudy(type, id, quick=false) {
	if (quick) setMasteryStudyCost(id,type)
	if (canBuyMasteryStudy(type, id)) {
		player.timestudy.theorem-=masteryStudies.costs[masteryStudies.types[type]][id]
		if (type=='ec') {
			player.eternityChallUnlocked=id
			player.etercreq=id
			updateEternityChallenges()
			delete tmp.qu.autoECN
		} else player.masterystudies.push(type+id)
		if (type=="t") {
			addSpentableMasteryStudies(id)
			if (id==302) maybeShowFillAll()
			if (quick) {
				masteryStudies.costMult*=getMasteryStudyCostMult(id)
				masteryStudies.latestBoughtRow=Math.max(masteryStudies.latestBoughtRow,Math.floor(id/10))
			}
			if (id==241&&!GUBought("gb3")) {
				var otherMults=1
				if (player.achievements.includes("r85")) otherMults*=4
				if (player.achievements.includes("r93")) otherMults*=4
				var old=getIPMultPower()
				ipMultPower=2.2
				player.infMult=player.infMult.div(otherMults).pow(Math.log10(getIPMultPower())/Math.log10(old)).times(otherMults)
			}
			if (id==266&&player.replicanti.gal>399) {
				var gal=player.replicanti.gal
				player.replicanti.gal=0
				player.replicanti.galCost=new Decimal(player.galacticSacrifice!=undefined?1e110:1e170)
				player.replicanti.galCost=getRGCost(gal)
				player.replicanti.gal=gal
			}
			if (id==383) updateColorCharge()
		}
		if (type=="d") {
			if (id==7) {
				showTab("quantumtab")
				showQuantumTab("electrons")
				updateElectrons()
			}
			if (id==8||id==9||id==14) {
				showTab("challenges")
				showChallengesTab("quantumchallenges")
				updateQuantumChallenges()
				if (id==9) updateGluons()
			}
			if (id==10) {
				showTab("quantumtab")
				showQuantumTab("replicants")
				document.getElementById("timestudy322").style.display=""
				updateReplicants()
			}
			if (id==11) {
				showTab("dimensions")
				showDimTab("emperordimensions")
				document.getElementById("timestudy361").style.display=""
				document.getElementById("timestudy362").style.display=""
				document.getElementById("edtabbtn").style.display=""
				updateReplicants()
			}
			if (id==12) {
				showTab("quantumtab")
				showQuantumTab("nanofield")
				document.getElementById("nanofieldtabbtn").style.display = ""
			}
			if (id==13) {
				showTab("quantumtab")
				showQuantumTab("tod")
				updateColorCharge()
				updateTODStuff()
			}
		}
		if (!quick) {
			if (type=="t") {
				if (id==302) fillAll()
				masteryStudies.bought++
			} else if (type=="ec") {
				showTab("challenges")
				showChallengesTab("eternitychallenges")
			} else if (type=="d") {
				updateUnlockedMasteryStudies()
				updateSpentableMasteryStudies()
			}
			updateMasteryStudyCosts()
			updateMasteryStudyButtons()
			drawMasteryTree()
		}
	}
}

function canBuyMasteryStudy(type, id) {
	if (type=='t') {
		if (inQCModifier("sm")&&masteryStudies.bought>=20) return false
		if (player.timestudy.theorem<masteryStudies.costs.time[id]||player.masterystudies.includes('t'+id)||player.eternityChallUnlocked>12||!masteryStudies.timeStudies.includes(id)) return false
		if (masteryStudies.latestBoughtRow>Math.floor(id/10)) return false
		if (!masteryStudies.spentable.includes(id)) return false
	} else if (type=='d') {
		if (player.timestudy.theorem<masteryStudies.costs.dil[id]||player.masterystudies.includes('d'+id)) return false
		if (!ghostified && !(masteryStudies.unlockReqConditions[id] && masteryStudies.unlockReqConditions[id]())) return false
		if (!masteryStudies.spentable.includes("d"+id)) return false
	} else {
		if (player.timestudy.theorem<masteryStudies.costs.ec[id]||player.eternityChallUnlocked) return false
		if (!masteryStudies.spentable.includes("ec"+id)) return false
		if (player.etercreq==id) return true
		if (id==13) return player.resets>=masteryStudies.ecReqsStored[13]
		return Math.round(player.replicanti.chance*100)>=masteryStudies.ecReqsStored[14]
	}
	return true
}
	
function updateMasteryStudyButtons() {
	if (!tmp.ngp3) return
	for (id=0;id<masteryStudies.timeStudies.length;id++) {
		var name=masteryStudies.timeStudies[id]
		var div=document.getElementById("timestudy"+name)
		if (!masteryStudies.unlocked.includes(name)) break
		if (player.masterystudies.includes("t"+name)) div.className="timestudybought"
		else if (canBuyMasteryStudy('t', name)) div.className="timestudy"
		else div.className="timestudylocked"
		if (masteryStudies.hasStudyEffect.includes(name)) {
			var mult=getMTSMult(name, "ms")
			document.getElementById("ts"+name+"Current").textContent=(masteryStudies.studyEffectDisplays[name]?masteryStudies.studyEffectDisplays[name](mult):shorten(mult)+"x")
		}
	}
	for (id=13;id<=masteryStudies.ecsUpTo;id++) {
		var div=document.getElementById("ec"+id+"unl")
		if (!masteryStudies.unlocked.includes("ec"+id)) break
		if (player.eternityChallUnlocked==id) div.className="eternitychallengestudybought"
		else if (canBuyMasteryStudy('ec', id)) div.className="eternitychallengestudy"
		else div.className="timestudylocked"
	}
	for (id=7;id<=masteryStudies.unlocksUpTo;id++) {
		var div=document.getElementById("dilstudy"+id)
		if (!masteryStudies.unlocked.includes("d"+id)) break
		if (player.masterystudies.includes("d"+id)) div.className="dilationupgbought"
		else if (canBuyMasteryStudy('d', id)) div.className="dilationupg"
		else div.className="timestudylocked"
	}
}

function updateMasteryStudyTextDisplay() {
	if (!player.masterystudies) return
	document.getElementById("costmult").textContent=shorten(masteryStudies.costMult)
	document.getElementById("totalmsbought").textContent=masteryStudies.bought
	document.getElementById("totalttspent").textContent=shortenDimensions(masteryStudies.ttSpent)
	for (id=0;id<masteryStudies.timeStudies.length;id++) {
		var name=masteryStudies.timeStudies[id]
		if (!masteryStudies.unlocked.includes(name)) break
		document.getElementById("ts"+name+"Cost").textContent=shorten(masteryStudies.costs.time[name])
	}
	for (id=13;id<=masteryStudies.ecsUpTo;id++) {
		if (!masteryStudies.unlocked.includes("ec"+id)) break
		document.getElementById("ec"+id+"Cost").textContent="Cost: "+shorten(masteryStudies.costs.ec[id])+" Time Theorems"
		document.getElementById("ec"+id+"Req").style.display=player.etercreq==id?"none":"block"
		document.getElementById("ec"+id+"Req").textContent="Requirement: "+masteryStudies.ecReqDisplays[id]()
	}
	for (id=7;id<=masteryStudies.unlocksUpTo;id++) {
		if (!masteryStudies.unlocked.includes("d"+id)) break
		var req=masteryStudies.unlockReqDisplays[id]&&masteryStudies.unlockReqDisplays[id]()
		document.getElementById("ds"+id+"Cost").textContent="Cost: "+shorten(masteryStudies.costs.dil[id])+" Time Theorems"
		if (req) document.getElementById("ds"+id+"Req").innerHTML=ghostified||!req?"":"<br>Requirement: "+req
	}
	if (quantumed) document.getElementById("321effect").textContent=shortenCosts(new Decimal("1e430"))
}

var occupied
function drawMasteryBranch(id1, id2) {
	var type1=id1.split("ec")[1]?"c":id1.split("dil")[1]?"d":id1.split("time")[1]?"t":undefined
	var type2=id2.split("ec")[1]?"c":id2.split("dil")[1]?"d":id2.split("time")[1]?"t":undefined
	var start=document.getElementById(id1).getBoundingClientRect();
	var end=document.getElementById(id2).getBoundingClientRect();
	var x1=start.left + (start.width / 2) + (document.documentElement.scrollLeft || document.body.scrollLeft);
	var y1=start.top + (start.height / 2) + (document.documentElement.scrollTop || document.body.scrollTop);
	var x2=end.left + (end.width / 2) + (document.documentElement.scrollLeft || document.body.scrollLeft);
	var y2=end.top + (end.height / 2) + (document.documentElement.scrollTop || document.body.scrollTop);
	msctx.lineWidth=15;
	msctx.beginPath();
	var drawBoughtLine=true
	if (type1=="t"||type1=="d") drawBoughtLine=player.masterystudies.includes(type1+id1.split("study")[1])
	if (type2=="t"||type2=="d") drawBoughtLine=drawBoughtLine&&player.masterystudies.includes(type2+id2.split("study")[1])
	if (type2=="c") drawBoughtLine=drawBoughtLine&&player.eternityChallUnlocked==id2.slice(2,4)
	if (drawBoughtLine) {
		if (type2=="d" && player.options.theme == "Aarex's Modifications") {
			msctx.strokeStyle=parseInt(id2.split("study")[1])<8?"#D2E500":parseInt(id2.split("study")[1])>9?"#333333":"#009900";
		} else if (type2=="c") {
			msctx.strokeStyle="#490066";
		} else {
			msctx.strokeStyle="#000000";
		}
	} else if (type2=="d" && player.options.theme == "Aarex's Modifications") {
		msctx.strokeStyle=parseInt(id2.split("study")[1])<8?"#697200":parseInt(id2.split("study")[1])>11?"#727272":parseInt(id2.split("study")[1])>9?"#262626":"#006600";
	} else msctx.strokeStyle="#444";
	msctx.moveTo(x1, y1);
	msctx.lineTo(x2, y2);
	msctx.stroke();
	if (!occupied.includes(id2) && type2 == "t") {
		occupied.push(id2)
		if (shiftDown) {
			var start = document.getElementById(id2).getBoundingClientRect();
			var x1 = start.left + (start.width / 2) + (document.documentElement.scrollLeft || document.body.scrollLeft);
			var y1 = start.top + (start.height / 2) + (document.documentElement.scrollTop || document.body.scrollTop);
			var mult = getMasteryStudyCostMult(id2.split("study")[1])
			var msg = id2.split("study")[1] + " (" + (mult>1e3?shorten(mult):mult) + "x)"
			msctx.fillStyle = 'white';
			msctx.strokeStyle = 'black';
			msctx.lineWidth = 3;
			msctx.font = "15px Typewriter";
			msctx.strokeText(msg, x1 - start.width / 2, y1 - start.height / 2 - 1);
			msctx.fillText(msg, x1 - start.width / 2, y1 - start.height / 2 - 1);
		}
	}
}

function drawMasteryTree() {
	msctx.clearRect(0, 0, msc.width, msc.height);
	if (player === undefined) return
	if (document.getElementById("eternitystore").style.display === "none" || document.getElementById("masterystudies").style.display === "none" || player.masterystudies === undefined) return
	occupied=[]
	drawMasteryBranch("back", "timestudy241")
	for (var x=0;x<masteryStudies.studies.length;x++) {
		var id=masteryStudies.studies[x]
		var paths=getMasteryStudyConnections(id)
		if (!masteryStudies.unlocked.includes(id)) return
		if (paths) for (var y=0;y<paths.length;y++) if (masteryStudies.unlocked.includes(paths[y])) drawMasteryBranch(convertMasteryStudyIdToDisplay(id), convertMasteryStudyIdToDisplay(paths[y]))
	}
}

function getMTSMult(id, uses = "") {
	if (id==251) return Math.floor(player.resets/3e3)
	if (id==252) return Math.floor(player.dilation.freeGalaxies/7)
	if (id==253) {
		if (tmp.ngp3l) return Math.floor(extraReplGalaxies/9)*20
		return Math.floor(getTotalRG()/4)
	}
	if (id==262) {
		if (tmp.ngp3l) return Math.max(player.resets/15e3-19,1)
		return Decimal.pow(Math.max(player.resets/5e4-10,1),Math.sqrt(Math.max(player.resets/1e5-5.5,1)))
	}
	if (id==263) {
		let x=player.meta.resets
		if (!tmp.ngp3l) x=x*(x+10)/60
		return x+1
	}
	if (id==264) {
		if (tmp.ngp3l) return Math.pow(player.galaxies+1,0.25)*2
		return player.galaxies/100+1
	}
	if (id==273) {
		var intensity = 0
		if (player.masterystudies !== undefined && (player.masterystudies.includes("t273") || uses.includes("ms"))) intensity = 5
		if (ghostified && player.ghostify.neutrinos.boosts > 1 && !uses.includes("pn")) intensity += tmp.nb[1]
		if (uses.includes("intensity")) return intensity
		return Decimal.max(Math.log10(player.replicanti.chance + 1), 1).pow(intensity)
	}
	if (id==281) return Decimal.pow(10,Math.pow(tmp.rm.max(1).log10(),0.25)/10)
	if (id==282) return Decimal.pow(10,Math.pow(tmp.rm.max(1).log10(),0.25)/15)
	if (id==301) return Math.floor(extraReplGalaxies/4.15)
	if (id==303) return Decimal.pow(4.7,Math.pow(Math.log10(Math.max(player.galaxies,1)),1.5))
	if (id==322) {
		let log = Math.sqrt(Math.max(3-getTickspeed().log10(),0))/2e4
		if (log>110) log=Math.sqrt(log*27.5)+55
		if (log>1e3&&player.aarexModifications.ngudpV!==undefined) log=Math.pow(7+Math.log10(log),3)
		return Decimal.pow(10,log)
	}
	if (id==332) return Math.max(player.galaxies, 1)
	if (id==341) return Decimal.pow(2,Math.sqrt(tmp.qu.replicants.quarks.add(1).log10()))
	if (id==344) return Math.pow(tmp.qu.replicants.quarks.div(1e7).add(1).log10(),0.25)*0.17+1
	if (id==351) {
		let log=player.timeShards.max(1).log10()*14e-7
		if (log>1e4) log=Math.pow(log*Math.pow(10,36),.1)
		return Decimal.pow(10,log)
	}
	if (id==361) return player.dilation.tachyonParticles.max(1).pow(0.01824033924212366)
	if (id==371) return Math.pow(extraReplGalaxies+1,0.3)
	if (id==372) return Math.sqrt(player.timeShards.add(1).log10())/20+1
	if (id==373) return Math.pow(player.galaxies+1,0.55)
	if (id==381) return Decimal.min(getTickSpeedMultiplier(), 1).log10() / -135 + 1
	if (id==382) return player.eightAmount.max(1).pow(Math.PI)
	if (id==383) {
		if (tmp.ngp3l) return Decimal.pow(3200,Math.pow(tmp.qu.colorPowers.b.add(1).log10(),0.25))
		return Decimal.pow(2, Math.sqrt(player.meta.antimatter.add(1).log10()) * Math.pow(getCPLog("b"), 4/21))
	}
	if (id==391) return player.meta.antimatter.max(1).pow(8e-4)
	if (id==392) return Decimal.pow(1.6,Math.sqrt(tmp.qu.replicants.quarks.add(1).log10()))
	if (id==393) return Decimal.pow(4e5,Math.sqrt(tmp.twr.add(1).log10()))
	if (id==401) {
		let log=tmp.qu.replicants.quarks.div(1e28).add(1).log10()*0.2
		if (log>5) log=Math.log10(log*2)*5
		return Decimal.pow(10,log)
	}
	if (id==411) return tmp.tra.div(1e24).add(1).pow(0.2)
	if (id==421) {
		let ret=Math.pow(Math.max(-getTickspeed().log10()/1e13-0.75,1),4)
		if (ret>100) ret=Math.sqrt(ret*100)
		return ret
	}
	if (id==431) {
		let x=player.dilation.freeGalaxies+tmp.eg431
		return Decimal.pow(Math.max(x/1e4,1),Math.max(x/1e4+Math.log10(x)/2,1))
	}
}


var upDown={ // secret achievement
	point: 0,
	times: 0
}

function recordUpDown(x) {
	if (upDown.point>0&&upDown.point==x) return
	upDown.point=x
	upDown.times++
	if (upDown.times>=200) giveAchievement("Up and Down and Up and Down...")
}