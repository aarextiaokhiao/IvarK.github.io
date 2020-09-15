function updateNanoverseTab(){
	var rewards = tmp.qu.nanofield.rewards
	document.getElementById("quarksNanofield").textContent = shortenDimensions(tmp.qu.replicants.quarks)		
	document.getElementById("quarkCharge").textContent = shortenMoney(tmp.qu.nanofield.charge)
	document.getElementById("quarkChargeRate").textContent = shortenDimensions(getQuarkChargeProduction())
	document.getElementById("quarkLoss").textContent = shortenDimensions(getQuarkLossProduction())
	document.getElementById("preonEnergy").textContent = shortenMoney(tmp.qu.nanofield.energy)
	document.getElementById("quarkEnergyRate").textContent = shortenMoney(getQuarkEnergyProduction())
	document.getElementById("quarkPower").textContent = getFullExpansion(tmp.qu.nanofield.power)
	document.getElementById("quarkPowerThreshold").textContent = shortenMoney(tmp.qu.nanofield.powerThreshold)
	document.getElementById("quarkAntienergy").textContent = shortenMoney(tmp.qu.nanofield.antienergy)
	document.getElementById("quarkAntienergyRate").textContent = shortenMoney(getQuarkAntienergyProduction())
	document.getElementById("quarkChargeProductionCap").textContent = shortenMoney(getQuarkChargeProductionCap())
	document.getElementById("rewards").textContent = getFullExpansion(rewards)

	for (var reward = 1; reward < 9; reward++) {
		document.getElementById("nfReward" + reward).className = reward > rewards ? "nfRewardlocked" : "nfReward"
		document.getElementById("nfReward" + reward).textContent = wordizeList(nanoRewards.effectsUsed[reward].map(x => nanoRewards.effectDisplays[x](tmp.nf.effects[x])), true) + "."
		document.getElementById("nfRewardHeader" + reward).textContent = (rewards % 8 + 1 == reward ? "Next" : DISPLAY_NAMES[reward]) + " reward"
		document.getElementById("nfRewardTier" + reward).textContent = "Tier " + getFullExpansion(Math.ceil((rewards + 1 - reward) / 8)) + " / Power: " + tmp.nf.powers[reward].toFixed(1)
	}
	document.getElementById("nfReward5").textContent = (!tmp.ngp3l && tmp.nf.powers[5] > 15 ? nanoRewards.effectDisplays.light_threshold_speed(tmp.nf.effects.light_threshold_speed) : nanoRewards.effectDisplays.dil_effect_exp(tmp.nf.effects.dil_effect_exp)) + "."
	document.getElementById("ns").textContent = ghostified || nanospeed != 1 ? "Your Nanofield speed is currently " + (nanospeed == 1 ? "" : shorten(tmp.ns) + " * " + shorten(nanospeed) + " = ") + shorten(getNanofieldFinalSpeed()) + "x." : ""
}

function updateNanofieldAntipreon(){
	var rewards = tmp.qu.nanofield.rewards
	document.getElementById("rewards_AP").textContent = getFullExpansion(rewards)
	document.getElementById("rewards_wake").textContent = getFullExpansion(tmp.apgw)
	document.getElementById("sleepy").style.display = tmp.qu.nanofield.apgWoke ? "none" : ""
	document.getElementById("woke").style.display = tmp.qu.nanofield.apgWoke ? "" : "none"
}

function updateNanofieldTab(){
	if (document.getElementById("nanoverse").style.display == "block") updateNanoverseTab()
	if (document.getElementById("antipreon").style.display == "block") updateNanofieldAntipreon()
}

function getQuarkChargeProduction(noSpeed) {
	let ret = new Decimal(1)
	if (isNanoEffectUsed("preon_charge")) ret = tmp.nf.effects.preon_charge
	if (hasNU(3)) ret = ret.times(tmp.nu[1])
	if (hasNU(7)) ret = ret.times(tmp.nu[3])
	if (tmp.qu.nanofield.power > tmp.apgw) ret = ret.div(Decimal.pow(2, (tmp.qu.nanofield.power - tmp.apgw) / 2))
	if (!noSpeed) ret = ret.times(getNanofieldFinalSpeed())
	return ret
}

function startProduceQuarkCharge() {
	tmp.qu.nanofield.producingCharge = !tmp.qu.nanofield.producingCharge
	document.getElementById("produceQuarkCharge").innerHTML = (tmp.qu.nanofield.producingCharge ? "Stop" : "Start") + " production of preon charge." + (tmp.qu.nanofield.producingCharge ? "" : "<br>(You will not get preons when you do this.)")
}

function getQuarkLossProduction() {
	let ret = getQuarkChargeProduction(true)
	let retCube = ret.pow(3)
	if (retCube.gte("1e180")) retCube = retCube.pow(Math.pow(180 / retCube.log10(), 2 / 3))
	ret = ret.times(retCube).times(4e25)
	if (hasNU(3)) ret = ret.div(10)
	if (tmp.qu.nanofield.power > tmp.apgw) ret = ret.pow((tmp.qu.nanofield.power - tmp.apgw) / 5 + 1)
	ret = ret.times(getNanofieldFinalSpeed())
	return ret
}

function getQuarkEnergyProduction() {
	let ret = tmp.qu.nanofield.charge.sqrt()
	if (player.masterystudies.includes("t411")) ret = ret.times(getMTSMult(411))
	if (player.masterystudies.includes("t421")) ret = ret.times(getMTSMult(421))
	if (isNanoEffectUsed("preon_energy")) ret = ret.times(tmp.nf.effects.preon_energy)
	ret = ret.times(getNanofieldFinalSpeed())
	return ret
}

function getQuarkAntienergyProduction() {
	let ret = tmp.qu.nanofield.charge.sqrt()
	if (player.masterystudies.includes("t401")) ret = ret.div(getMTSMult(401))
	if (tmp.qu.nanofield.power > tmp.apgw) ret = ret.times(Decimal.pow(2, (tmp.qu.nanofield.power - tmp.apgw) / 2))
	ret = ret.times(getNanofieldFinalSpeed())
	return ret
}

function getQuarkChargeProductionCap() {
	return tmp.qu.nanofield.charge.times(2500).sqrt()
}

var nanoRewards = {
	effects: {
		hatch_speed: function(x) {
			return Decimal.pow(30, x)
		},
		ma_effect_exp: function(x) {
			return x * 6.8
		},
		dil_gal_gain: function(x) {
			x = Math.pow(x, 0.83) * 0.039
			if (!tmp.ngp3l && x > 1/3) x = (Math.log10(x * 3) + 1) / 3
			return x + 1
		},
		dt_to_ma_exp: function(x) {
			return Math.sqrt(x) * 0.021 + 1
		},
		dil_effect_exp: function(x) {
			if (!tmp.ngp3l && x > 15) tier = Math.log10(x - 5) * 15
			return x * 0.36 + 1
		},
		meta_boost_power: function(x) {
			let y = 2
			if (tmp.ngp3l) y = 3
			else if (player.dilation.upgrades.includes("ngpp4")) y = getDil15Bonus()
			return x * 1.34 + y
		},
		remote_start: function(x) {
			return x * 2150
		},
		preon_charge: function(x) {
			return Decimal.pow(2.6, x)
		},
		per_10_power: function(x) {
			return x * 0.76
		},
		preon_energy: function(x) {
			if (tmp.ngp3l) return x > 0 ? 2.5 : 1
			return Decimal.pow(2.5, Math.sqrt(x))
		},
		supersonic_start: function(x) {
			return Math.floor(Math.max(x - 3.5, 0) * 75e5)
		},
		neutrinos: function(x) {
			return Decimal.pow(10, x * 10)
		},
		light_threshold_speed: function(x) {
			return Math.max(Math.sqrt(x + 1) / 4, 1)
		}
	},
	effectDisplays: {
		hatch_speed: function(x) {
			return "eggons hatch " + shorten(x) + "x faster"
		},
		ma_effect_exp: function(x) {
			return "meta-antimatter effect is buffed to ^" + x.toFixed(2)
		},
		dil_gal_gain: function(x) {
			return "you gain " + (x * 100 - 100).toFixed(2) + "% more free galaxies"
		},
		dt_to_ma_exp: function(x) {
			return "dilated time gives ^" + x.toFixed(3) + " boost to all Meta Dimensions"
		},
		dil_effect_exp: function(x) {
			return "in dilation, Normal Dimension multipliers and Tickspeed are raised by ^" + x.toFixed(2)
		},
		meta_boost_power: function(x) {
			return "each meta-Dimension Boost gives " + x.toFixed(2) + "x boost"
		},
		remote_start: function(x) {
			return "Remote Antimatter Galaxies scaling starts " + getFullExpansion(Math.floor(x)) + " later"
		},
		preon_charge: function(x) {
			return "you produce " + shorten(x) + "x faster preon charge"
		},
		per_10_power: function(x) {
			return "multiplier per ten dimensions is increased by " + x.toFixed(2) + "x before the electrons effect"
		},
		preon_energy: function(x) {
			return "you produce " + shorten(x) + "x faster preon energy"
		},
		supersonic_start: function(x) {
			return "Dimension Supersonic scaling starts " + getFullExpansion(Math.floor(x)) + " later"
		},
		neutrinos: function(x) {
			return "you gain " + shorten(x) + "x more neutrinos"
		},
		light_threshold_speed: function(x) {
			return "Light threshold increases " + x.toFixed(2) + "x slower"
		}
	},
	effectsUsed: {
		1: ["hatch_speed"],
		2: ["ma_effect_exp"],
		3: ["dil_gal_gain"],
		4: ["dt_to_ma_exp"],
		5: ["dil_effect_exp"],
		6: ["meta_boost_power"],
		7: ["remote_start", "preon_charge"],
		8: ["per_10_power", "preon_energy"],
	},
	effectToReward: {}
}

function isNanoEffectUsed(x) {
	return tmp.nf !== undefined && tmp.nf.rewardsUsed !== undefined && tmp.nf.rewardsUsed.includes(x) && tmp.nf.effects !== undefined
}

function updateNanoEffectUsages() {
	var data = []
	tmp.nf.rewardsUsed = data
	nanoRewards.effectToReward = {}

	//First reward
	var data2 = [hasBosonicUpg(21) ? "supersonic_start" : "hatch_speed"]
	nanoRewards.effectsUsed[1] = data2

	//Fifth reward
	var data2 = ["dil_effect_exp"]
	if (!tmp.ngp3l) data2.push("light_threshold_speed")
	nanoRewards.effectsUsed[5] = data2

	//Seventh reward
	var data2 = [hasBosonicUpg(22) ? "neutrinos" : "remote_start", "preon_charge"]
	nanoRewards.effectsUsed[7] = data2

	//Used Nanofield rewards
	for (var x = 1; x <= 8; x++) {
		var rewards = nanoRewards.effectsUsed[x]
		for (var r = 0; r < rewards.length; r++) {
			data.push(rewards[r])
			nanoRewards.effectToReward[rewards[r]] = x
		}
	}
}

function updateNanoRewardPowers() {
	var data = {}
	tmp.nf.powers = data

	for (var x = 1; x <= 8; x++) data[x] = getNanoRewardPower(x, tmp.nf.rewards)
}

function updateNanoRewardEffects() {
	var data = {}
	tmp.nf.effects = data

	for (var e = 0; e < tmp.nf.rewardsUsed.length; e++) {
		var effect = tmp.nf.rewardsUsed[e]
		tmp.nf.effects[effect] = nanoRewards.effects[effect](tmp.nf.powers[nanoRewards.effectToReward[effect]])
	}
}

function updateNanoRewardTemp() {
	tmp.nf = {}

	if (!tmp.ngp3) return
	if (!player.masterystudies.includes("d11")) return

	updateNanoEffectUsages()
	//The rest is calculated by updateTemp().
}

function getNanofieldSpeed() {
	let x = 1
	if (ghostified) x *= tmp.qu.nanofield.rewards < 16 ? 6 : 3
	if (!tmp.ngp3l && player.achievements.includes("ng3p78")) x *= Math.sqrt(getTreeUpgradeLevel(8) * tmp.tue + 1)
	if (hasNU(15)) x = tmp.nu[6].times(x)
	return x
}

function getNanofieldFinalSpeed() {
	return Decimal.times(tmp.ns, nanospeed)
}

function getNanoRewardPower(reward, rewards) {
	let x = Math.ceil((rewards - reward + 1) / 8)
	let apgw = tmp.apgw
	if (rewards >= apgw) {
		let sbsc = Math.ceil((apgw - reward + 1) / 8)
		x = Math.sqrt((x / 2 + sbsc / 2) * sbsc)
		if (reward == (rewards - 1) % 8 + 1) x += 0.5
	}
	return x * tmp.nf.powerEff
}

function getNanoRewardPowerEff() {
	let x = 1
	if (hasBosonicUpg(31)) x *= tmp.blu[31]
	return x
}

function getNanoRewardReq(additional){
	return getNanoRewardReqFixed(additional - 1 + tmp.qu.nanofield.power)
}

function getNanoRewardReqFixed(n){
	let x = new Decimal(50)
	if (n >= 0)   x = x.times(Decimal.pow(4  , n).root(tmp.le[1]))
	if (n >= 15)  x = x.times(Decimal.pow(4  , (n - 15) * (0.5 * (n - 15) + 1.5)).root(tmp.le[1]))
	if (n >= 125) x = x.times(Decimal.pow(4  , (0.5) * (n - 124) * (n - 123)).root(tmp.le[1]))
	if (n >= 150) x = x.times(Decimal.pow(1.1, (n-150)*(n-149)*(n-148)/6*2 + (n-150)*(n-149)/2*19).root(tmp.le[1]))
	if (n >= 160) x = x.times(Decimal.pow(1.3, (n-160)*(n-159)*(n-158)/6*2 + (n-160)*(n-159)/2*39).root(tmp.le[1]))
	if (n >= 170) x = x.times(Decimal.pow(1.6, (n-170)*(n-169)*(n-168)/6*2 + (n-170)*(n-169)/2*59).root(tmp.le[1]))
	if (n >= 180) x = x.times(Decimal.pow(2.0, (n-180)*(n-179)*(n-178)/6*2 + (n-180)*(n-179)/2*79).root(tmp.le[1]))
	return x.pow(tmp.ppti)
}

function updateNextPreonEnergyThreshold(){
	let en = tmp.qu.nanofield.energy
	let increment = 0.5
	let toSkip = 0
	var check = 0
	while (en.gte(getNanoRewardReq(increment * 2))) {
		increment *= 2
	}
	while (increment >= 1) {
		check = toSkip + increment
		if (en.gte(getNanoRewardReq(check))) toSkip += increment
		increment /= 2
	}
	tmp.qu.nanofield.power += toSkip
	tmp.qu.nanofield.powerThreshold = getNanoRewardReq(1)
}
