var QCs = {
	setup() {
		QCs_save = {
			in: [],
			comps: 0,
			mod_comps: {},
			best: {},
			cloud_disable: 1
		}
		return QCs_save
	},
	compile() {
		QCs_save = undefined
		if (!tmp.ngp3 || qu_save === undefined) {
			this.updateTmp()
			this.updateDisp()
			return
		}

		let data = qu_save.qc
		if (data === undefined) data = this.setup()
		QCs_save = data

		if (QCs_save.qc1 === undefined) this.reset()
		if (typeof(QCs_save.qc2) !== "number") QCs_save.qc2 = QCs_save.cloud_disable || 1

		if (QCs_save.best_exclusion || QCs_save.perks_unl) {
			QCs_save.mod_comps = {}
			delete QCs_save.best_exclusion
			delete QCs_save.perks_unl
		}

		this.updateTmp()
		this.updateDisp()
	},
	reset() {
		QCs_save.qc1 = {boosts: 0, max: 0}
		QCs_save.qc3 = undefined
		QCs_save.qc4 = "ng"
		QCs_save.qc5 = 0
		QCs_save.qc6 = 0
		QCs_save.qc7 = 0
		QCs_save.qc8 = undefined //Same as QC5
	},
	data: {
		max: 8,
		1: {
			unl: () => true,
			desc: () => "There are Replicated Compressors instead of Replicated Galaxies, and TT softcap is " + formatReductionPercentage(QCs.data[1].ttScaling()) + "% faster.",
			goal: () => QCs_save.qc1.boosts >= (tmp.dtMode ? 5 : 4),
			goalDisp: () => (tmp.dtMode ? 5 : 4) + " Replicated Compressors",
			goalMA: Decimal.pow(Number.MAX_VALUE, 1.3),
			hint: "Figure out how to get more Replicanti Chance (MS35), and to minimize the spending of TT.",

			rewardDesc: (x) => "You can keep Replicated Compressors.",
			rewardEff(str) {
				return 0.1
			},

			perkDesc: (x) => "Boost something by " + shorten(x) + "x",
			perkReqs: [1/0, 1/0],
			perkEff() {
				return 1
			},

			ttScaling() {
				return tmp.dtMode ? 2 : tmp.exMode ? 1.75 : 1.5
			},
			compressScaling() {
				let x = 5
				if (hasAch("ng3p27")) x += 0.5
				return x
			},
			updateTmp() {
				delete QCs_tmp.qc1
				if (!QCs.in(1) && !QCs.done(1)) return

				let boosts = QCs_save.qc1.boosts
				let maxBoosts = QCs_save.qc1.max
				let brokenBoosts = Math.max(QCs_save.qc1.boosts - this.compressScaling(), 0)

				let data = {
					req: Decimal.pow(10, 1e6 + 2e5 * brokenBoosts),
					limit: new Decimal("1e6000000"),

					speedMult: Decimal.pow(4, -brokenBoosts).times(Math.pow(boosts / 2 + 1, 2)),
					scalingMult: Math.pow(2, Math.max(boosts - 20, 0) / 20),
					scalingExp: 1 / Math.min(1 + boosts / 20, 2),

					effMult: maxBoosts / 30 + boosts / 15 + 1,
					effExp: Math.min(1 + boosts / 20, 2)
				}
				QCs_tmp.qc1 = data

				if (QCs.in(1)) data.limit = data.limit.pow((tmp.exMode ? 0.2 : tmp.bgMode ? 0.4 : 0.3) * 5 / 6)
				if (PCs.milestoneDone(11)) {
					data.req = data.req.pow(0.95)
					data.speedMult = data.speedMult.times(boosts / 2 + 1)
					data.effMult = maxBoosts / 28 + boosts / 14 + 1
				}
			},
			convert(x) {
				if (!QCs_tmp.qc1) return x

				var dilMult = Math.log2(getReplSpeedLimit()) / 1024
				x = Decimal.pow(2, Math.pow(x.log(2) * dilMult * QCs_tmp.qc1.effMult, QCs_tmp.qc1.effExp) / dilMult)
				return x
			},

			can: () => QCs_tmp.qc1 && pH.can("eternity") && player.replicanti.amount.gte(QCs_tmp.qc1.req) && QCs_save.qc1.boosts < QCs.data[1].max(),
			max: () => QCs.in(6) ? 6 : 20,
			boost() {
				if (!QCs.data[1].can()) return false

				QCs_save.qc1.boosts++
				player.replicanti.amount = Decimal.pow(10, Math.pow(player.replicanti.amount.log10(), 0.9))
				eternity(false, true)
				return true
			}
		},
		2: {
			unl: () => true,
			desc: () => "Some quantum contents are based on one, but quantum energy multiplier. color powers, and gluons are useless; and you must exclude 1 tier from Positron Cloud.",
			goal: () => pos_save.boosts >= 7,
			goalDisp: () => "7 Positronic Boosters",
			goalMA: Decimal.pow(Number.MAX_VALUE, 1.1),
			hint: "Mess around Positronic Cloud by swapping and excluding.",

			rewardDesc: (x) => "Color charge also multiply a color power that's used by it. (" + shorten(x) + "x)",
			rewardEff(str) {
				return Math.log10(colorCharge.normal.charge + 1) / 2 + 1
			},

			perkDesc: (x) => "Boost something by " + shorten(x) + "x",
			perkReqs: [1/0, 1/0],
			perkEff() {
				return 1
			},

			updateCloudDisp() {
				if (!pos_tmp.cloud) return

				let unl = QCs.in(2)
				for (let t = 1; t <= 3; t++) {
					getEl("pos_cloud" + t + "_toggle").parentElement.style.display = unl && pos_tmp.cloud[t] ? "" : "none"
					getEl("pos_cloud" + t + "_cell").colspan = unl && pos_tmp.cloud[t] ? 1 : 2
					if (unl) getEl("pos_cloud" + t + "_toggle").className = (QCs_save.qc2 == t ? "chosenbtn" : "storebtn") + " longbtn"
				}
			},
			switch(x) {
				if (QCs_save.qc2 == x) return
				if (!confirm("This will restart your run. Are you sure?")) return
				QCs_save.qc2 = x
				quantum(false, true, 2, false, false, true)
			}
		},
		3: {
			unl: () => true,
			desc: () => "There are only Meta Dimensions that produce antimatter, but successfully dilating reduces antimatter production.",
			goal: () => player.dilation.times >= 3,
			goalDisp: () => "4 successful dilation runs",
			goalMA: Decimal.pow(Number.MAX_VALUE, 0.15),
			hint: "Try not to automate dilation, and also not to dilate time frequently.",

			rewardDesc: (x) => "You sacrifice 30% of Meta Dimension Boosts instead of 25%.",
			rewardEff(str) {
				return 1
			},

			perkDesc: (x) => "Boost something by " + shorten(x) + "x",
			perkReqs: [1/0, 1/0],
			perkEff() {
				return 1
			},

			amProd() {
				return getMDProduction(1).max(1).pow(this.amExp())
			},
			amExp() {
				return 20 / Math.sqrt((player.dilation.times || 0) / (PCs.milestoneDone(32) ? 6 : 3) + 1)
			}
		},
		4: {
			unl: () => true,
			desc: () => "You must exclude one type of galaxy for a single run. Changing the exclusion requires a forced Eternity reset.",
			goal: () => player.dilation.freeGalaxies >= 2900,
			goalDisp: () => getFullExpansion(2900) + " Tachyonic Galaxies",
			goalMA: Decimal.pow(Number.MAX_VALUE, 2.4),
			hint: "Test every single combination of this exclusion, and try to minimize galaxies.",

			rewardDesc: (x) => "Replicated Galaxies contribute to Positronic Charge, and you can spend Quantum Energy to charge early.",
			rewardEff(str) {
				return
			},

			perkDesc: (x) => "Boost something by " + shorten(x) + "x",
			perkReqs: [1/0, 1/0],
			perkEff() {
				return 1
			},

			updateTmp() {
				delete QCs_tmp.qc4
				if (!QCs.in(4)) return

				var gals = {
					ng: player.galaxies,
					rg: player.replicanti.galaxies,
					eg: tmp.extraRG || 0,
					tg: player.dilation.freeGalaxies,
				}
				var sum = gals.ng + gals.rg + gals.eg + gals.tg
				
				QCs_tmp.qc4 = {
					diff: Math.abs(gals[QCs_save.qc4] - (sum - gals[QCs_save.qc4]) / 3)
				}
				QCs_tmp.qc4.boost = Math.log2(QCs_tmp.qc4.diff / 500 + 1) / 5 + 1
			},

			updateDisp() {		
				getEl("qc4_div").style.display = QCs.in(4) ? "" : "none"
				getEl("coinsPerSec").style.display = QCs.in(4) || QCs.done(4) ? "none" : ""
				getEl("tickSpeedRow").style.display = QCs.in(4) || QCs.done(4) ? "none" : ""

				if (!QCs.in(4)) return
				var types = ["ng", "rg", "eg", "tg"]
				for (var t = 0; t < types.length; t++) {
					var type = types[t]
					getEl("qc4_" + type).className = (QCs_save.qc4 == type ? "chosenbtn" : "storebtn")
				}
			},
			switch(x) {
				QCs_save.qc4 = x
				eternity(true)
				this.updateDisp()
			}
		},
		5: {
			unl: () => true,
			desc: () => "Replicantis only produce Replicanti Energy by gaining, which increases effective Quantum Energy and Positronic Charge.",
			goal: () => player.eternityPoints.gte(Decimal.pow(10, 2.4e6)),
			goalDisp: () => shortenCosts(Decimal.pow(10, 2.4e6)) + " Eternity Points",
			goalMA: Decimal.pow(Number.MAX_VALUE, 1.7),
			hint: "Do sub-1 Eternity runs before getting Compressors.",

			rewardDesc: (x) => "Sacrificed things are stronger for Positrons, but you sacrifice less galaxies.",
			rewardEff(str) {
				return 1
			},

			perkDesc: (x) => "Boost something by " + shorten(x) + "x",
			perkReqs: [1/0, 1/0],
			perkEff() {
				return 1
			},

			updateTmp() {
				delete QCs_tmp.qc5
				if (!QCs.in(5) && !QCs.done(6)) return

				QCs_tmp.qc5 = {
					mult: 1 / (Math.log10(QCs_save.qc1.boosts + 1) + 1),
					eff: Math.pow(Math.log2(QCs_save.qc5 / 2e6 + 1), PCs.milestoneDone(53) ? 2.5 : 2),
				}
				if (QCs.isRewardOn(6)) QCs_tmp.qc5.mult *= QCs_tmp.rewards[6]
				if (PCs.milestoneDone(52)) QCs_tmp.qc5.mult *= 2
			},

			updateDisp() {		
				getEl("qc5_div").style.display = QCs_tmp.qc5 ? "" : "none"
			},
			updateDispOnTick() {		
				getEl("qc5_eng").textContent = shorten(QCs_save.qc5)
				getEl("qc5_eng_mult").textContent = shiftDown ? " (+" + shorten(Math.max(QCs_tmp.qc5.mult, 1)) + " per " + shorten(Decimal.pow(10, 1 / Math.min(QCs_tmp.qc5.mult, 1))) + "x)" : ""
				getEl("qc5_eff").textContent = shorten(QCs_tmp.qc5.eff)
			},
		},
		6: {
			unl: () => true,
			desc: () => "There is a increasing variable, which gives different boosts; but eternitying subtracts it, and dilating reduces the gain.",
			goal: () => player.replicanti.amount.e >= 1e6 && QCs_save.qc1.boosts >= 6,
			goalDisp: () => shortenCosts(Decimal.pow(10, 1e6)) + " Replicantis + " + getFullExpansion(6) + " Replicanti Compressors",
			goalMA: Decimal.pow(Number.MAX_VALUE, 2.7),
			hint: "Do long Eternity runs.",

			rewardDesc: (x) => "Replicantis also produce Replicanti Energy; but also boosted by time since Eternity. (" + shorten(QCs_tmp.rewards[6]) + "x)",
			rewardEff(str) {
				let t = player.thisEternity / 10
				if (PCs.milestoneDone(61)) t /= 2
				if (PCs.milestoneDone(62)) t = Math.sqrt(t)
				return (9 / (Math.abs(5 - t) + 1) + 1) * Math.log2(player.thisEternity / 10 + 2)
			},

			perkDesc: (x) => "Boost something by " + shorten(x) + "x",
			perkReqs: [1/0, 1/0],
			perkEff() {
				return 1
			},

			updateTmp() {
				delete QCs_tmp.qc6
				if (!QCs.in(6)) return

				QCs_tmp.qc6 = Math.log2(Math.max(-QCs_save.qc6, 0) / 100 + 1) + 2
			}
		},
		7: {
			unl: () => true,
			desc: () => "Unlock a new set of Mastery Studies, but color charge subtracts color powers instead of the main catches, and disable red power.",
			goal: () => player.timestudy.theorem >= 5e86,
			goalDisp: () => shortenDimensions(5e86) + " Time Theorems",
			goalMA: Decimal.pow(Number.MAX_VALUE, 3.55),
			hint: "It's a tricky puzzle.",

			perkDesc: (x) => "Boost something by " + shorten(x) + "x",
			perkReqs: [1/0, 1/0],
			perkEff() {
				return 1
			},

			rewardDesc: (x) => "You keep that set of Mastery Studies, and unlock Paired Challenges.",
			rewardEff(str) {
				return 1
			}
		},
		8: {
			unl: () => true,
			desc: () => "You must exclude one type of galaxy in each type of run: normal and dilated Eternity runs.",
			goal: () => false,
			goalDisp: () => "(not implemented)",
			goalMA: new Decimal(1),
			hint: "Trial and error.",

			perkDesc: (x) => "Boost something by " + shorten(x) + "x",
			perkReqs: [1/0, 1/0],
			perkEff() {
				return 1
			},

			rewardDesc: (x) => "In dilation runs, strengthen the base formulas of RGs, but remove multipliers. (not implemented)",
			rewardEff(str) {
				return 1
			}
		},
	},

	updateTmp() {
		let data = { unl: [], in: [], rewards: {}, perks: {}, show_perks: QCs_tmp.show_perks }
		QCs_tmp = data

		if (!this.unl()) return
		for (let x = 1; x <= this.data.max; x++) {
			if (this.data[x].unl()) {
				if (QCs_save.in.includes(x)) data.in.push(x)
				data.unl.push(x)
				if (!this.done(x)) break
			}
		}

		this.updateTmpOnTick()
	},
	updateTmpOnTick() {
		if (!this.unl()) return
		
		let data = QCs_tmp
		for (let x = this.data.max; x; x--) {
			if (data.unl.includes(x)) {
				data.rewards[x] = this.data[x].rewardEff(1)
				if (PCs.unl()) data.perks[x] = this.data[x].perkEff(1)
			}
			if (this.data[x].updateTmp) this.data[x].updateTmp()
		}
	},

	unl() {
		return tmp.ngp3 && player.masterystudies.includes("d8")
	},
	in(x) {
		return QCs_tmp.in.includes(x)
	},
	inAny() {
		return QCs_tmp.in.length >= 1
	},
	isntCatched() {
		return hasAch("ng3p25") || QCs_tmp.in.length != 1 || QCs_save.mod || this.in(7)
	},
	done(x) {
		return this.unl() && QCs_save.comps >= x
	},
	getGoal() {
		return PCs.in() ? player.meta.bestAntimatter.gte(this.getGoalMA()) : player.meta.bestAntimatter.gte(this.getGoalMA()) && this.data[QCs_tmp.in[0]].goal()
	},
	getGoalDisp() {
		return PCs.in() ? "" : " and " + this.data[QCs_tmp.in[0]].goalDisp()
	},
	getGoalMA() {
		return PCs.in() ? PCs.goal() : QCs_save.mod ? this.data[QCs_tmp.in[0]].goalMA.pow(QCs.modData[QCs_save.mod].maExp) : this.data[QCs_tmp.in[0]].goalMA
	},
	isRewardOn(x) {
		return this.done(x) && QCs_tmp.rewards[x]
	},

	modData: {
		nf: {
			name: "Nerfed",
			maExp: 1/0,
		},
		pk: {
			name: "Perked",
			maExp: 1/0,
		},
		ol: {
			name: "Overlapped",
			maExp: 1/0,
		},
		us: {
			name: "Unstable",
			maExp: 1/0,
		},
	},
	modIn(m) {
		return this.unl() && QCs_save.mod == m
	},
	modDone(x, m) {
		var data = QCs_save.mod_comps
		return this.unl() && data && data[m] && data[m].includes(x)
	},

	perkUnl(x) {
		var data = QCs_save.mod_comps
		return this.modDone(x, "perk")
	},
	perkCan(x) {
		var data = this.data[x]
		if (!PCs.unl()) return
		if (pos_tmp.cloud == undefined) return
		if (this.perkUnl(x)) return
		return pos_tmp.cloud.total >= data.perkReqs[0] && pos_tmp.cloud.exclude >= data.perkReqs[1]
	},
	perkActive(x) {
		return QCs_tmp.perks[x] && this.perkUnl(x) && this.inAny()
	},

	tp() {
		showTab("challenges")
		showChallengesTab("quantumchallenges")
	},
	start(x) {
		quantum(false, true, x)
	},
	restart(x) {
		quantum(false, true, QCs_save.in)
	},

	setupDiv() {
		if (this.divInserted) return

		let html = ""
		for (let x = 1; x <= this.data.max; x++) html += (x % 2 == 1 ? "<tr>" : "") + this.divTemp(x) + ((x + 1) % 2 == 1 ? "</tr>" : "")
		getEl("qcs_div").innerHTML = html

		this.divInserted = true
	},
	divTemp: (x) =>
		'<td><div class="quantumchallengediv" id="qc_' + x + '_div">' +
		'<span id="qc_' + x + '_desc"></span><br><br>' +
		'<div class="outer"><button id="qc_' + x + '_btn" class="challengesbtn" onclick="QCs.start(' + x + ')">Start</button><br>' +
		'<span id="qc_' + x + '_goal"></span><br>' +
		'<span id="qc_' + x + '_reward"></span>' +
		'</div></div></td>',
	divInserted: false,

	updateDisp() {
		let unl = this.divInserted && this.unl() && pH.shown("quantum")

		//In Quantum Challenges
		getEl("qc_restart").style.display = QCs.in(2) || QCs.in(8) ? "" : "none"
		getEl("repCompress").style.display = QCs_tmp.qc1 ? "" : "none"
		this.data[2].updateCloudDisp()
		this.data[4].updateDisp()
		this.data[5].updateDisp()

		//Quantum Challenges
		if (!unl) return

		getEl("qc_effects").innerHTML = QCs_tmp.show_perks ? "" : "All quantum mechanics will change, when entering a Quantum Challenge:<br>" +
			(tmp.bgMode ? "No" : (tmp.exMode ? "No" : "Reduced") + " global quark energy bonus, no") + " gluon nerfs, and mastered boosts only work."
		for (let qc = 1; qc <= this.data.max; qc++) {
			var cUnl = QCs_tmp.unl.includes(qc)

			getEl("qc_" + qc + "_div").style.display = cUnl ? "" : "none"
			if (QCs_tmp.show_perks) {
				var reqs = this.data[qc].perkReqs
				getEl("qc_" + qc + "_desc").textContent = "Quantum Challenge " + qc + " Perk: " + this.data[qc].perkDesc(QCs_tmp.perks[qc])
				getEl("qc_" + qc + "_goal").textContent = "Requires: Complete QC" + qc + " + " + reqs[0] + " used Positronic Boosts + " + reqs[1] + " excluded Positronic Boosts"
				getEl("qc_" + qc + "_btn").textContent = this.perkCan(qc) ? "Can unlock!" :
					!this.perkUnl(qc) ? "Locked" :
					"Obtained"
				getEl("qc_" + qc + "_btn").className = this.perkCan(qc) ? (this.in(qc) && this.modIn("pk") ? "onchallengebtn" : "challengesbtn") :
					!this.perkUnl(qc) ? "lockedchallengesbtn" :
					"completedchallengesbtn"
			} else if (cUnl) {
				getEl("qc_" + qc + "_desc").textContent = this.data[qc].desc()
				getEl("qc_" + qc + "_goal").textContent = "Goal: " + shorten(this.data[qc].goalMA) + " meta-antimatter and " + this.data[qc].goalDisp()
				getEl("qc_" + qc + "_btn").textContent = this.in(qc) ? "Running" : this.done(qc) ? "Completed" : "Start"
				getEl("qc_" + qc + "_btn").className = this.in(qc) ? "onchallengebtn" : this.done(qc) ? "completedchallengesbtn" : "challengesbtn"
			}
		}

		getEl("qc_perks").style.display = PCs.unl() ? "" : "none"
		getEl("qc_perks").textContent = QCs_tmp.show_perks ? "Back" : "View perks"
		getEl("qc_perks_note").textContent = QCs_tmp.show_perks ? "Note: Perks only work in specific Quantum Challenge. However, mastered Perks work in any Quantum Challenge!" : ""

		//Big Rip
		getEl("bigrip").style.display = player.masterystudies.includes("d14") ? "" : "none"
		if (hasMTS("d14")) {
			var max = getMaxBigRipUpgrades()
			getEl("spaceShards").textContent = shortenDimensions(qu_save.bigRip.spaceShards)
			for (var u = 18; u <= 20; u++) getEl("bigripupg" + u).parentElement.style.display = u > max ? "none" : ""
			for (var u = 1; u <= max; u++) {
				getEl("bigripupg" + u).className = qu_save.bigRip.upgrades.includes(u) ? "gluonupgradebought bigrip" + (isBigRipUpgradeActive(u, true) ? "" : "off") : qu_save.bigRip.spaceShards.lt(bigRipUpgCosts[u]) ? "gluonupgrade unavailablebtn" : "gluonupgrade bigrip"
				getEl("bigripupg" + u + "cost").textContent = shortenDimensions(new Decimal(bigRipUpgCosts[u]))
			}
		}
	},
	updateDispOnTick() {
		if (!this.divInserted) return

		for (let qc = 1; qc <= this.data.max; qc++) {
			if (QCs_tmp.unl.includes(qc)) getEl("qc_" + qc + "_reward").textContent = shiftDown || QCs.in(qc) ? "Hint: " + this.data[qc].hint : "Reward: " + this.data[qc].rewardDesc(QCs_tmp.rewards[qc])
		}
	},
	updateBest() {
		//Rework coming soon
	},
	viewPerks() {
		QCs_tmp.show_perks = !QCs_tmp.show_perks
		QCs.updateDisp()
	}
}
var QCs_save = undefined
var QCs_tmp = { unl: [], in: [], rewards: {}, perks: {}, show_perks: false }

let QUANTUM_CHALLENGES = QCs


//PAIRED CHALLENGES
var PCs = {
	milestones: {
		11: "Boost the QC1 reward.",
		21: "Boost the QC2 reward. (not implemented)",
		31: "Boost the QC3 reward. (not implemented)",
		41: "Boost the QC4 reward. (not implemented)",
		51: "Boost the QC5 reward. (not implemented)",
		61: "Boost the QC6 reward.",
		71: "Reduce the level up requirement by 1.",
		81: "Boost the QC8 reward. (not implemented)",
		12: "Unlock Replicated Expanders. (not implemented)",
		22: "You can exclude a Positron Cloud tier in any QC; and unlock the Perked modifier. (not implemented)",
		32: "Dilation stat is 50% weaker.",
		42: "Extra Replicated Galaxies contribute to Positronic Charge.",
		52: "You gain 2x more Replicanti Energy.",
		62: "Time since Eternity is squared root.",
		72: "Mastery Study cost multiplier is divided by 5x, permanently.",
		82: "Unlock Galactic Clusters. (not implemented)",
		13: "Unlock Replicated Dilaters. (not implemented)",
		23: "You can exclude matched Boosts instead. (not implemented)",
		33: "For each PC combination, Meta Accelerator slowdown is 2% slower.",
		43: "Tier-1 Positronic Boosts can charge more by 4x, but the requirement is squared than normal.",
		53: "Replicanti Energy formula is stronger.",
		63: "Eternitying only loses 30 seconds of time stat.",
		73: "Unlock Strings. (not implemented)",
		83: "Kept galaxies are converted into extra Positronic Charge on Quantum. (not implemented)",
	},
	setupData() {
		var data = {
			qc1_ids: [null, 7, 6, 4, 2, 3, 8, 5, 1],
			qc2_ids: [null, 1, 5, 8, 3, 2, 4, 6, 7],
			qc1_lvls: [null, 1, 2, 3, 4, 10, 11, 12, 13],
			qc2_lvls: [null, 1, 2, 4, 8, 14, 15, 17, 18],
			milestoneReqs: [null, 1, 2, 4],
			setup: true
		}
		PCs.data = data
		getEl("pc_table").innerHTML = ""

		data.lvls = {}
		data.pos = {}
		data.all = []
		for (var x = 1; x <= 8; x++) {
			for (var y = 1; y <= 9 - x; y++) {
				var lvl = data.qc1_lvls[x] + data.qc2_lvls[y] - 1
				var id = this.conv(data.qc1_ids[x], data.qc2_ids[y])
				data.lvls[lvl] = (data.lvls[lvl] || 0) + 1
				data.pos[id] = x * 10 + y
				data.all.push(id)
			}
		}

		var sum = 0
		PCs_tmp.lvl = 1
		for (var i = 1; i <= 18; i++) {
			sum += data.lvls[i]
			data.lvls[i] = sum
		}
	},

	setup() {
		PCs_save = {
			comps: [],
			skips: [],
			lvl: 1
		}
		qu_save.pc = PCs_save
		return PCs_save
	},
	compile() {
		PCs_save = undefined
		PCs.data = {}
		PCs_tmp = { unl: PCs.unl() }
		if (!tmp.ngp3 || qu_save === undefined) {
			this.updateTmp()
			return
		}

		let data = qu_save.pc
		if (data === undefined) data = this.setup()
		PCs_save = data

		this.updateTmp()
	},

	unl() {
		return qu_save && qu_save.qc && qu_save.qc.comps >= 7
	},
	updateTmp() {
		PCs_tmp.unl = PCs.unl()
		if (!PCs_tmp.unl) return
		if (!PCs.data.setup) this.setupData()
		var data = PCs_tmp

		//Positionist
		data.pos_comps = {}
		for (var i = 1; i <= 8; i++) data.pos_comps[i] = 0
		for (var i = 0; i < PCs_save.comps.length; i++) {
			var id = PCs.convBack(PCs_save.comps[i])
			data.pos_comps[id[0]]++
			data.pos_comps[id[1]]++
		}

		//Level up!
		var oldLvl = PCs_save.lvl
		var comps = PCs_save.comps.concat(PCs_save.skips).length
		while (PCs_save.lvl < 19 && comps >= this.lvlReq(PCs_save.lvl)) PCs_save.lvl++
		if (PCs.data.setupHTML && PCs_save.lvl > oldLvl) {
			for (var i = 0; i < PCs.data.all.length; i++) this.updateButton(PCs.data.all[i])
		}

		//Boosts
		var lvl = PCs_save.lvl - 1
		data.eff1 = 1 + 0.75 * lvl / 18
		data.eff1_start = 100
		data.eff2 = 1 + lvl / 54
	},

	start(x) {
		quantum(false, true, PCs.convBack(x))
	},
	in(x) {
		return QCs_tmp.in.length >= 2
	},
	goal(pc) {
		var list = pc || QCs_tmp.in
		if (typeof(list) == "number") list = this.convBack(list)
		return QCs.data[list[0]].goalMA.pow(QCs.data[list[1]].goalMA.log10() / getQuantumReq(true).log10() * 0.9)
	},
	conv(c1, c2) {
		return Math.min(c1 * 10 + c2, c2 * 10 + c1)
	},
	convBack(pc) {
		return [Math.floor(pc / 10), pc % 10]
	},
	done(pc) {
		return PCs.unl() && (PCs_save.comps.includes(pc) || PCs_save.skips.includes(pc))
	},
	milestoneDone(pos) {
		return PCs.unl() && PCs_tmp.pos_comps[Math.floor(pos / 10)] >= PCs.data.milestoneReqs[pos % 10]
	},
	lvlReq(x) {
		let r = PCs.data.lvls[x]
		if (PCs.milestoneDone(71)) r--
		return r
	},

	setupButton: (pc) => '<td><button id="pc' + pc + '" class="challengesbtn" onclick="PCs.start(' + pc + ')">PC' + Math.floor(pc / 10) + "+" + pc % 10 + '</button></td>',
	setupMilestone: (qc) => (qc % 4 == 1 ? "<tr>" : "") + "<td id='pc_comp" + qc + "_div' style='text-align: center'><span style='font-size: 20px'>QC" + qc + "</span><br><span id='pc_comp" + qc + "' style='font-size: 15px'>0 / 8</span><br><button class='secondarytabbtn' onclick='PCs.showMilestones(" + qc + ")'>Milestones</button></td>" + (qc % 4 == 0 ? "</tr>" : ""),
	setupHTML() {
		var el = getEl("pc_table")
		var data = PCs.data
		if (PCs.data.setupHTML) return
		data.setupHTML = true

		//Setup milestones
		var html = ""
		for (var i = 1; i <= 8; i++) html += this.setupMilestone(i)
		getEl("qc_milestones").innerHTML = html

		//Setup header
		var html = "<td></td>"
		for (var i = 1; i <= 8; i++) html += "<td>" + data.qc2_ids[i]+ "</td>"
		el.insertRow(0).innerHTML = html

		//Setup rows
		for (var x = 1; x <= 8; x++) {
			var html = "<td>" + data.qc1_ids[x]+ "</td>"
			for (var i = 1; i <= 9 - x; i++) {
				var pc = this.conv(data.qc1_ids[x], data.qc2_ids[i])
				html += this.setupButton(pc)
			}
			el.insertRow(x).innerHTML = html
		}

		for (var i = 0; i < data.all.length; i++) this.updateButton(data.all[i])
		this.updateDisp()
	},
	updateButton(pc, inQCs) {
		if (!PCs.data.setupHTML) return
		if (!inQCs) inQCs = QCs_save.in
		var qcs = this.convBack(pc)
		var pos = this.convBack(PCs.data.pos[pc])
		var lvl = PCs.data.qc1_lvls[pos[0]] + PCs.data.qc2_lvls[pos[1]] - 1

		getEl("pc" + pc).style.display = PCs_save.lvl >= lvl ? "" : "none"
		if (PCs_save.lvl >= lvl) {
			getEl("pc" + pc).setAttribute("ach-tooltip", "Goal: " + shorten(PCs.goal(pc)) + " MA")
			getEl("pc" + pc).className = inQCs.includes(qcs[0]) && inQCs.includes(qcs[1]) ? "onchallengebtn" : PCs.done(pc) ? "completedchallengesbtn" : "challengesbtn"
		}
	},

	updateDisp() {
		if (!PCs_tmp.unl) return
		if (!PCs.data.setupHTML) return

		for (var i = 1; i <= 8; i++) {
			getEl("pc_comp" + i + "_div").style.display = PCs_tmp.pos_comps[i] ? "" : "none"
			getEl("pc_comp" + i).textContent = PCs_tmp.pos_comps[i] + " / 8"
		}

		getEl("pc_lvl").textContent = getFullExpansion(PCs_save.lvl)
		getEl("pc_comps").textContent = getFullExpansion(PCs_save.comps.length) + " / " + getFullExpansion(this.lvlReq(Math.min(PCs_save.lvl, 18)))

		getEl("pc_eff1").textContent = "^" + PCs_tmp.eff1.toFixed(3)
		getEl("pc_eff1_start").textContent = shorten(PCs_tmp.eff1_start)
		getEl("pc_eff2").textContent = "^" + PCs_tmp.eff2.toFixed(3)

		this.showMilestones(PCs_tmp.milestone || 0)
	},
	showMilestones(qc) {
		PCs_tmp.milestone = qc
		getEl("qc_milestone_div").style.display = qc ? "" : "none"
		if (qc) {
			getEl("qc_milestone_header").textContent = "QC" + qc + " Milestones"
			for (var i = 1; i < PCs.data.milestoneReqs.length; i++) {
				getEl("qc_milestone" + i).className = "qMs_" + (this.milestoneDone(qc * 10 + i) ? "reward" : "locked")
				getEl("qc_milestone" + i).textContent = PCs.milestones[qc * 10 + i] || "???"
			}
		}
	}
}
var PCs_save = undefined
var PCs_tmp = { unl: false }