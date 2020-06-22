<<<<<<< Updated upstream
let prestigeHandler = {
	order: ["paradox", "galaxy", "infinity", "eternity", "quantum", "ghostify"],
	reqs: {
		paradox: function() {
			return player.matter.max(player.money).gte(1e3) && player.totalTickGained && !tmp.ri
		},
		galaxy: function() {
			return getGSAmount().eq(0) && !tmp.ri
		},
		infinity: function() {
			return player.money.gte(Number.MAX_VALUE) && player.break && player.currentChallenge == ""
		},
		eternity: function() {
			return player.infinityPoints.gte(Number.MAX_VALUE)
		},
		quantum: function() {
			return player.meta.antimatter.gte(Decimal.pow(Number.MAX_VALUE, tmp.ngp3 ? 1.45 : 1)) && quarkGain().gt(0) && (!tmp.ngp3 || ECTimesCompleted("eterc14")) && player.money.log10() >= getQCGoal()
				
		},
		ghostify: function() {
			return ph.reqs.quantum()
=======
let prestigeHandler = { // handles prestiges based on what prestige layer the player is trying to access
	order: ["paradox", "galaxy", "infinity", "eternity", "quantum", "ghostify"], // paradox is from ng-5, galaxy is from ng-2, infinity and eternity are from vanilla, quantum and ghostify are from ng+3
	reqs: {
		paradox: function() {
			return player.matter.max(player.money).gte(1e3) && player.totalTickGained && !tmp.ri // matter needs to be at least 1e3
		},
		galaxy: function() {
			return getGSAmount().eq(0) && !tmp.ri // when you have enough 8th dimensions/galaxies
		},
		infinity: function() {
			return player.money.gte(Number.MAX_VALUE) && player.break && player.currentChallenge == "" // above 1.8e308 antimatter
		},
		eternity: function() {
			return player.infinityPoints.gte(Number.MAX_VALUE) // above 1.8e308 IP
		},
		quantum: function() {
			return player.meta.antimatter.gte(Decimal.pow(Number.MAX_VALUE, tmp.ngp3 ? 1.45 : 1)) && quarkGain().gt(0) && (!tmp.ngp3 || ECTimesCompleted("eterc14")) && player.money.log10() >= getQCGoal() // 1.8e308^1.45 MA in ng+3 or 1.8e308 MA in ng+2
				
		},
		ghostify: function() {
			return ph.reqs.quantum() // there are more requirements
>>>>>>> Stashed changes
		}
	},
	modReqs: {
		paradox: function() {
			return player.pSac !== undefined
		},
		galaxy: function() {
			return player.galacticSacrifice !== undefined
		},
		quantum: function() {
			return player.meta !== undefined
		},
		ghostify: function() {
<<<<<<< Updated upstream
			return tmp.ngp3
		}
	},
	dids: {
=======
			return tmp.ngp3 //needs save to be ng+3
		}
	},
	dids: { // refers to if you have already done the prestige
>>>>>>> Stashed changes
		paradox: function() {
			return player.pSac.times
		},
		galaxy: function() {
			return player.galacticSacrifice.times
		},
		infinity: function() {
			return player.infinitied
		},
		eternity: function() {
			return player.eternities
		},
		quantum: function() {
			return tmp.qu.times
		},
		ghostify: function() {
			return player.ghostify.times
		}
	},
	memory: [],
	canPrestige: function(id) {
		return ph.reqs[id] && ph.reqs[id]()
	},
	prestiged: function(id) {
		return ph.memory[id] >= 3
	},
<<<<<<< Updated upstream
	update: function() {
=======
	update: function() { // updates
>>>>>>> Stashed changes
		var pp = false
		for (var x=ph.order.length;x>0;x--) {
			var p = ph.order[x-1]
			ph.memory[p] = 0
			if (!ph.modReqs[p] || ph.modReqs[p]()) {
				ph.memory[p] = 1
				if (ph.canPrestige(p)) ph.memory[p] = 2
				if (pp || (ph.dids[p] && ph.dids[p]())) {
					ph.memory[p] = 3
					pp = true
				}
			}
		}
	}
}
let ph = prestigeHandler