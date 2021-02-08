let ETER_UPGS = {
	total: 15,
	1: {
		unl: () => true,
		cost: 5,
		mult: () => player.eternityPoints.plus(1),
		desc: () => "Infinity Dimension multiplier based on unspent EP. (x+1)"
	},
	2: {
		unl: () => true,
		cost: 10,
		eternities(){
			/*
			the reason I softcapped eternities is because they caused balance issues 
			when you got a lot of eternities (from tmp.e50kdt being true <==> that broken DT upgrade)
			you get a TON of IPo so much so that you supa-inflate, and this should stop most of it 
			note: it was giving me about 95% of the mult to ID which is.... a LOT
			note2: that being said, you can softcap it later, but it it gets to e1000 then the multiplier is
			about ee14 to IDs = BROKEN (e5k = e50DT ==> e3e17 to IDs = BROKEN BROKEN GOOD)
			*/

			let e = nMx(getEternitied(), 0)
			//if (Decimal.gt(e, Decimal.pow(2, 1024))) e = Decimal.pow(Decimal.log10(e) / 4 * Math.log2(10), 128)
			if (typeof(e) == "number" && isNaN(e)) e = 0
			return e
		},
		mult() {
			let e = this.eternities()

			if (player.boughtDims) return Decimal.pow(e, Decimal.times(e, 2).add(1).log(4))

			let cap = nMn(e, 1e5)
			let soft = 0
			if (e > 1e5) soft = nS(e, cap)

			let achReward = 1
			if (hasAch("ngpp15")) {
				if (tmp.ngC || tmp.ngp3) achReward = Decimal.pow(10, Math.pow(Decimal.log10(Decimal.add(e, 10)), tmp.ngC ? 3 : 4.75))
				else return Decimal.pow(e, Math.min(1e4, Math.pow(e, .3)))
			}

			let div1 = tmp.ngC ? 100 : 200
			let div2 = tmp.ngC ? 2 : 4
			let tim1 = tmp.ngC ? 4 : 2
			return Decimal.pow(cap / div1 + 1, Math.log(cap * tim1 + 1) / Math.log(div2)).times(Decimal.div(soft, div1).add(1).times(Decimal.times(soft, div2).add(1).log(div2)).max(1)).max(achReward)
		},
		desc() {
			let eu2formula = "(x/200)^log4(2x)"
			if (tmp.ngC) eu2formula = "(x/100)^log2(4x)"
			if (player.boughtDims !== undefined) eu2formula = "x^log4(2x)"
			else if (hasAch("ngpp15")) eu2formula = tmp.ngC ? "x^log10(x)^2" : "10^log(x)^4.75"

			return "Infinity Dimension multiplier based on Eternities. (" + eu2formula + ")"
		}
	},
	3: {
		unl: () => true,
		cost: 5e4,
		mult() {
			if (player.boughtDims) return player.timeShards.div(1e12).plus(1)
			if (tmp.ngC) return Decimal.pow(6250 / Math.max(Math.min(infchallengeTimes, 6250), 6.1), 500 / Math.max(infchallengeTimes, 6.1))
			return Decimal.pow(2, 300 / Math.max(infchallengeTimes, 6.1))
		},
		desc: () => "Infinity Dimension multiplier based on " + (player.boughtDims ? "Time Shards. (x/"+shortenCosts(1e12) + " + 1)" : "sum of Infinity Challenge times.")
	},
	4: {
		unl: () => true,
		cost: 1e16,
		mult: () => player.achPow,
		desc: () => "Your achievement bonus affects Time Dimensions."
	},
	5: {
		unl: () => true,
		cost: 1e40,
		mult: () => Math.max(player.timestudy.theorem, 1),
		desc: () => "Time Dimensions gain a multiplier based on your unspent Time Theorems."
	},
	6: {
		unl: () => true,
		cost: 1e60,
		mult() {
			let ngPlus = (tmp.mod.newGamePlusVersion ? 10368000 : 0)
			return (player.totalTimePlayed / 10 + ngPlus) / 86400
		},
		desc: () => "Time Dimensions gain a multiplier based on days played" + (tmp.ngC ? " and you can buy max RGs." : ".")
	},

	// NG Update
	7: {
		unl: () => player.exdilation !== undefined && hasDilationStudy(1),
		cost: "1e1500",
		mult: () => 1 + Math.log10(Math.max(1, player.money.log10())) / 40,
		desc: () => "Dilated time gain is boosted by antimatter."
	},
	8: {
		unl: () => player.exdilation !== undefined && hasDilationStudy(1),
		cost: "1e2000",
		mult: () => 1 + Math.log10(Math.max(1, player.infinityPoints.log10())) / 20,
		desc: () => "Dilated time gain is boosted by Infinity Points."
	},
	9: {
		unl: () => player.exdilation !== undefined && hasDilationStudy(1),
		cost: "1e3000",
		mult: () => 1 + Math.log10(Math.max(1, player.eternityPoints.log10())) / 10,
		desc: () => "Dilated time gain is boosted by Eternity Points."
	},

	// NG Condensed
	10: {
		unl: () => tmp.ngC,
		cost: "1e625",
		desc: () => "You can buy all studies in all three-way splits."
	},
	11: {
		unl: () => tmp.ngC,
		cost: "1e870",
		desc: () => "You can buy all black & white studies, and TS35 has no requirement."
	},
	12: {
		unl: () => tmp.ngC,
		cost: "1e1350",
		desc: () => "The Normal, Infinity, Replicated, & Time Condenser cost formulas are weaker."
	},

	// NG+3: Post-Mastery Studies
	13: {
		unl: () => false, //tmp.ngp3 && ph.did("quantum"),
		cost: 1/0,
		mult() {
			let epLog = player.eternityPoints.add(1).log10()

			return Decimal.pow(10, Math.pow(epLog, 0.4) / 100)
		},
		desc: () => "Eternity Points boost dilated time gain and you can buy all row-23 time studies."
	},
	14: {
		unl: () => false, //tmp.ngp3 && ph.did("quantum"),
		cost: 1/0,
		desc: () => "The cost scaling of EP multiplier upgrades is reduced and you can buy all time studies from time study tree."
	},
	15: {
		unl: () => false, //tmp.ngp3 && ph.did("quantum"),
		cost: 1/0,
		desc: () => "You can passively generate Eternity Points and Tachyon Particles."
	},

	updateDisplayOnTick() {
		for (let i = 1; i <= this.total; i++) {
			if (this[i].unl()) {
				let cost = new Decimal(this[i].cost)
				let mult = this[i].mult && this[i].mult()

				getEl("eter" + i).innerHTML = this[i].desc() + (mult ? "<br>Currently: " + shorten(mult) + "x" : "") + "<br>Cost: " + shortenCosts(cost) + " EP" 
			}
		}
	},
	updateDisplayOnSecond() {
		for (let i = 1; i <= this.total; i++) {
			let unl = this[i].unl()

			getEl("eter" + i).parentElement.style.display = unl ? "" : "none"
			if (unl) getEl("eter" + i).className = hasEternityUpg(i) ? "eternityupbtnbought" : player.eternityPoints.gte(this[i].cost) ? "eternityupbtn" : "eternityupbtnlocked"
		}
	}
}

function updateEternityUpgrades() {
	ETER_UPGS.updateDisplayOnSecond()
}

function buyEternityUpgrade(name) {
	let cost = ETER_UPGS[name].cost
	if (player.eternityPoints.gte(cost) && !player.eternityUpgrades.includes(name)) {
		player.eternityUpgrades.push(name)
		player.eternityPoints = player.eternityPoints.minus(cost)
		updateEternityUpgrades();
		if (name == 4) {
			achMultLabelUpdate(); // Eternity Upgrade 4 applies achievement multiplier to Time Dimensions
		}
	}
}

function hasEternityUpg(x) {
	return tmp.eterUnl && player.eternityUpgrades.includes(x)
}

function getEPMultCost(bought) {
	let base = 50
	let expAdd = 0
	if (tmp.ngmX < 2) {
		if (bought > 1334 && !hasEternityUpg(14)) expAdd += Math.pow(Math.max(bought - 1334, 0), 1.2)

		if (bought >= 482) base = 1e3
		else if (bought >= 154) base = 500
		else if (bought >= 59) base = 100
	}
	return Decimal.pow(base, bought + expAdd).times(500)	
}

function buyEPMult() {
	if (player.eternityPoints.gte(player.epmultCost)) {
		player.epmult = player.epmult.times(5)
		if (player.autoEterMode === undefined || player.autoEterMode === 'amount') {
			player.eternityBuyer.limit = Decimal.times(player.eternityBuyer.limit, 5);
			getEl("priority13").value = formatValue("Scientific", player.eternityBuyer.limit, 2, 0);
		}
		player.eternityPoints = player.eternityPoints.minus(player.epmultCost)
		player.epmultCost = getEPMultCost(Math.round(player.epmult.log(5)))
		getEl("epmult").innerHTML = "You gain 5 times more EP<p>Currently: "+shortenDimensions(player.epmult)+"x<p>Cost: "+shortenDimensions(player.epmultCost)+" EP"
		updateEternityUpgrades()
	}
}

function buyMaxEPMult() {
	if (player.eternityPoints.lt(player.epmultCost)) return
	var bought=Math.round(player.epmult.ln()/Math.log(5))
	var increment=1
	while (player.eternityPoints.gte(getEPMultCost(bought + increment * 2 - 1))) {
		increment *= 2
	}
	var toBuy = increment
	for (p = 0; p < 53; p++) {
		increment /= 2
		if (increment < 1) break
		if (player.eternityPoints.gte(getEPMultCost(bought + toBuy + increment - 1))) toBuy += increment
	}
	var num = toBuy
	var newEP = player.eternityPoints
	while (num > 0) {
		var temp = newEP
		var cost = getEPMultCost(bought+num-1)
		if (newEP.lt(cost)) {
			newEP = player.eternityPoints.sub(cost)
			toBuy--
		} else newEP = newEP.sub(cost)
		if (newEP.eq(temp) || num > 9007199254740992) break
		num--
	}
	player.eternityPoints = newEP
	if (isNaN(newEP.e)) player.eternityPoints = new Decimal(0)
	player.epmult = player.epmult.times(Decimal.pow(5, toBuy))
	player.epmultCost = getEPMultCost(bought+toBuy)
	getEl("epmult").innerHTML = "You gain 5 times more EP<p>Currently: "+shortenDimensions(player.epmult)+"x<p>Cost: "+shortenDimensions(player.epmultCost)+" EP"
}