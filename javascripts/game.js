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
var failureCount = 0;
var implosionCheck = 0;
var TIER_NAMES = [ null, "first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eight" ];
var DISPLAY_NAMES = [ null, "First", "Second", "Third", "Fourth", "Fifth", "Sixth", "Seventh", "Eighth" ];
var break_infinity_js
var forceHardReset = false;
var player
var metaSave = null
var modes = {
    ngm: false,
    ngp: false,
    ngpp: false,
    ngmm: false,
    ers: false
}
function updateNewPlayer(reseted) {
    if (reseted) {
        var modesChosen = {
            ngm: player.aarexModifications.newGameMinusVersion !== undefined,
            ngp: (player.aarexModifications.newGamePlusVersion !== undefined ? 1 : 0) + (player.aarexModifications.newGameExpVersion !== undefined ? 2 : 0),
            ngpp: player.meta == undefined ? false : player.masterystudies ? 2 : true,
            ngmm: player.tickspeedBoosts == undefined ? player.galacticSacrifice !== undefined : 2,
            ers: player.boughtDims !== undefined
        }
    } else var modesChosen = modes
    player = {
        money: new Decimal(modesChosen.ngp>1?20:10),
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
        firstBought: modesChosen.ngm ? 5 : 0,
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
        firstPow: new Decimal(modesChosen.ngm ? 0.1 : 1),
        secondPow: new Decimal(1),
        thirdPow: new Decimal(1),
        fourthPow: new Decimal(1),
        fifthPow: new Decimal(1),
        sixthPow: new Decimal(1),
        seventhPow: new Decimal(1),
        eightPow: new Decimal(1),
        sacrificed: new Decimal(0),
        achievements: [],
        infinityUpgrades: [],
        challenges: [],
        currentChallenge: "",
        infinityPoints: new Decimal(0),
        infinitied: modesChosen.ngm ? 990 : modesChosen.ngp%2>0 ? 1 : 0,
        infinitiedBank: modesChosen.ngm ? -1000 : 0,
        totalTimePlayed: 0,
        bestInfinityTime: 9999999999,
        thisInfinityTime: 0,
        resets: 0,
        galaxies: modesChosen.ngm ? -1 : 0,
        tickDecrease: 0.9,
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
        partInfinityPoint: modesChosen.ngm ? -1e300 : 0,
        partInfinitied: modesChosen.ngm ? -1e8 : 0,
        break: false,
        challengeTimes: [600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31],
        infchallengeTimes: [600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31],
        lastTenRuns: [[600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0]],
        lastTenEternities: [[600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0], [600*60*24*31, 0]],
        infMult: new Decimal(modesChosen.ngm ? 0.5 : 1),
        infMultCost: new Decimal(modesChosen.ngm ? 30 : 10),
        tickSpeedMultDecrease: 10,
        tickSpeedMultDecreaseCost: 3e6,
        dimensionMultDecrease: modesChosen.ngm ? 11 : 10,
        dimensionMultDecreaseCost: 1e8,
        overXGalaxies: 10,
        version: 10,
        infDimensionsUnlocked: [false, false, false, false, false, false, false, false],
        infinityPower: new Decimal(1),
        spreadingCancer: modesChosen.ngm ? -9990 : 0,
        postChallUnlocked: 0,
        postC4Tier: 0,
        postC3Reward: new Decimal(1),
        postC8Mult: new Decimal(1),
        eternityPoints: new Decimal(0),
        eternities: modesChosen.ngm ? -20 : 0,
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
            power: new Decimal(modesChosen.ngm ? 0.0000125 : 1),
            baseAmount: 0
        },
        infinityDimension5 : {
            cost: new Decimal(1e140),
            amount: new Decimal(0),
            bought: 0,
            power: new Decimal(modesChosen.ngm ? 0.01 : 1),
            baseAmount: 0
        },
        infinityDimension6 : {
            cost: new Decimal(1e200),
            amount: new Decimal(0),
            bought: 0,
            power: new Decimal(modesChosen.ngm ? 0.015 : 1),
            baseAmount: 0
        },
        infinityDimension7 : {
            cost: new Decimal(1e250),
            amount: new Decimal(0),
            bought: 0,
            power: new Decimal(modesChosen.ngm ? 0.01 : 1),
            baseAmount: 0
        },
        infinityDimension8 : {
            cost: new Decimal(1e280),
            amount: new Decimal(0),
            bought: 0,
            power: new Decimal(modesChosen.ngm ? 0.01 : 1),
            baseAmount: 0
        },
        infDimBuyers: [false, false, false, false, false, false, false, false],
        timeShards: new Decimal(0),
        tickThreshold: new Decimal(1),
        totalTickGained: 0,
        timeDimension1: {
            cost: new Decimal(1),
            amount: new Decimal(0),
            power: new Decimal(modesChosen.ngm ? 0.01 : 1),
            bought: 0
        },
        timeDimension2: {
            cost: new Decimal(5),
            amount: new Decimal(0),
            power: new Decimal(modesChosen.ngm ? 0.03 : 1),
            bought: 0
        },
        timeDimension3: {
            cost: new Decimal(100),
            amount: new Decimal(0),
            power: new Decimal(modesChosen.ngm ? 0.025 : 1),
            bought: 0
        },
        timeDimension4: {
            cost: new Decimal(1000),
            amount: new Decimal(0),
            power: new Decimal(modesChosen.ngm ? 0.02 : 1),
            bought: 0
        },
        timeDimension5: {
            cost: new Decimal("1e2350"),
            amount: new Decimal(0),
            power: new Decimal(modesChosen.ngm ? 1e-5 : 1),
            bought: 0
        },
        timeDimension6: {
            cost: new Decimal("1e2650"),
            amount: new Decimal(0),
            power: new Decimal(modesChosen.ngm ? 5e-6 : 1),
            bought: 0
        },
        timeDimension7: {
            cost: new Decimal("1e3000"),
            amount: new Decimal(0),
            power: new Decimal(modesChosen.ngm ? 3e-6 : 1),
            bought: 0
        },
        timeDimension8: {
            cost: new Decimal("1e3350"),
            amount: new Decimal(0),
            power: new Decimal(modesChosen.ngm ? 2e-6 : 1),
            bought: 0
        },
        offlineProd: 0,
        offlineProdCost: modesChosen.ngm ? 5e11 : 1e7,
        challengeTarget: 0,
        autoSacrifice: 1,
        replicanti: {
            amount: new Decimal(0),
            unl: false,
            chance: 0.01,
            chanceCost: new Decimal(1e150),
            interval: modesChosen.ngm ? 5000 : 1000,
            intervalCost: new Decimal(1e140),
            gal: 0,
            galaxies: 0,
            galCost: new Decimal(1e170),
            auto: [false, false, false]
        },
        timestudy: {
            theorem: modesChosen.ngm ? -6 : 0,
            amcost: new Decimal("1e20000"),
            ipcost: new Decimal(modesChosen.ngm ? 1e-13 : 1),
            epcost: new Decimal(1),
            studies: [],
        },
        eternityChalls: modesChosen.ngm ? {eterc1:-6} : {},
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
            totalTachyonParticles: new Decimal(modesChosen.ngm ? 2000 :0),
            nextThreshold: new Decimal(1000),
            freeGalaxies: 0,
            upgrades: [],
            rebuyables: {
                1: 0,
                2: modesChosen.ngm ? 1 : 0,
                3: 0,
            }
        },
        why: 0,
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
            progressBar: true,
            breakInfinity: false
        }
    }
    if (modesChosen.ngm) {
        player.achievements.push("r22")
        player.achievements.push("r85")
        player.aarexModifications.newGameMinusVersion = 2.2
    }
    if (modesChosen.ngp%2>0) {
        player.achievements.push("r123")
        for (ec = 1; ec < 13; ec++) player.eternityChalls['eterc' + ec] = 5
        player.aarexModifications.newGamePlusVersion = 1
    }
    if (modesChosen.ngpp) {
        player.aarexModifications.newGamePlusPlusVersion = 2.9014
        player.autoEterMode = "amount"
        player.dilation.rebuyables[4] = 0
        player.meta = {resets: 0, antimatter: 10, bestAntimatter: 10}
        for (dim=1;dim<9;dim++) player.meta[dim] = {amount: 0, bought: 0, cost: initCost[dim]}
        player.autoEterOptions = {epmult:false}
        for (dim=1;dim<9;dim++) player.autoEterOptions["td"+dim] = false
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
        player.aarexModifications.quantumConf = true
    }
    if (modesChosen.ngmm) {
        player.aarexModifications.newGameMinusMinusVersion = 1.4
        player.galacticSacrifice = {}
        player.galacticSacrifice = resetGalacticSacrifice()
        player.totalBoughtDims = {}
        player.tickBoughtThisInf = resetTickBoughtThisInf()
        player.autobuyers[12]=13
        player.extraDimPowerIncrease = 0
        player.dimPowerIncreaseCost = 1e3
        player.options.gSacrificeConfirmation = true
    }
    if (modesChosen.ngpp > 1) {
        player.aarexModifications.newGame3PlusVersion = 1.99799
        player.respecOptions={time:false,mastery:false}
        player.dbPower = 1
        player.peakSpent = 0
        player.masterystudies = []
        player.options.animations.quarks = true
        player.quantum.usedQuarks = {
            r: 0,
            g: 0,
            b: 0
        }
        player.quantum.colorPowers = {
            r: 0,
            g: 0,
            b: 0
        }
        player.quantum.gluons = {
            rg: 0,
            gb: 0,
            br: 0
        }
        player.eternityBuyer.dilationMode = false
        player.eternityBuyer.statBeforeDilation = 0
        player.eternityBuyer.dilationPerAmount = 10
        player.quantum.autobuyer = {
            enabled: false,
            limit: 1,
            mode: "amount"
        }
        player.quantum.electrons = {
            amount: 0,
            sacGals: 0,
            mult: 2,
            rebuyables: [0,0,0,0]
        }
        player.quantum.disabledRewards = {}
        player.quantum.metaAutobuyerWait = 0
        player.quantum.multPower = 0
        player.quantum.challenge = []
        player.quantum.challenges = {}
        player.quantum.pairedChallenges = {
            order: {},
            current: 0,
            completed: 0,
            respec: false
        }
        player.dilation.bestTP = 0
        player.old = true
    }
    if (modesChosen.ers) {
        player.aarexModifications.ersVersion = 1.01
        player.boughtDims = []
        player.replicanti.limit = Number.MAX_VALUE
        player.replicanti.newLimit = Number.MAX_VALUE
        player.timestudy.ers_studies = [null, 0, 0, 0, 0, 0, 0]
        player.timestudy.studyGroupsUnlocked = 0
    }
    if (modesChosen.ngmm>1) {
        player.aarexModifications.newGame3MinusVersion = 1
        player.tickspeedBoosts = 0
    }
    if (modesChosen.ngp>1) {
        player.aarexModifications.newGameExpVersion = 1
        for (u=1;u<5;u++) player.infinityUpgrades.push("skipReset"+(u>3?"Galaxy":u))
        player.resets=4
    }
}
updateNewPlayer()

var firstButton = document.getElementById("first");
var secondButton = document.getElementById("second");
var thirdButton = document.getElementById("third");
var fourthButton = document.getElementById("fourth");
var fifthButton = document.getElementById("fifth");
var sixthButton = document.getElementById("sixth");
var seventhButton = document.getElementById("seventh");
var eightButton = document.getElementById("eight");
var tickSpeedButton = document.getElementById("tickSpeed");

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

Chart.defaults.global.defaultFontColor = 'black';
Chart.defaults.global.defaultFontFamily = 'Typewriter';
var ctx2 = document.getElementById("normalDimChart").getContext('2d');
var normalDimChart = new Chart(ctx2, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: ['Exponents of antimatter per second'],
            data: [],
            backgroundColor: [
                'rgba(0,0,0,1)'
            ],
            borderColor: [
                'rgba(0,0,0,1)'
            ],
            fill: false,
            lineTension: 0.1,
            borderWidth: 3,
            pointRadius: 0,
            pointBorderWidth: 0,
            pointHoverRadius: 0
        }]
    },
    options: {
        tooltips: {enabled: false},
        hover: {mode: null},
        legend: {
            display: false,
            labels: {
                boxWidth: 0
            }
        },
        scales: {
            yAxes: [{
                ticks: {
                    max: 100000000,
                    min: 1
                }
            }],
            xAxes: [{
                gridLines: {
                    display: false,
                    drawTicks: false
                },
                ticks: {
                    fontSize: 0
                }
            }]
        },
        layout: {
            padding: {
            top: 10
            }
        }
    }
});

function updateChartValues() {
    player.options.chart.duration = Math.min(Math.max(parseInt(document.getElementById("chartDurationInput").value), 1), 300);
    document.getElementById("chartDurationInput").value = player.options.chart.duration;
    player.options.chart.updateRate = Math.min(Math.max(parseInt(document.getElementById("chartUpdateRateInput").value), 50), 10000);
    document.getElementById("chartUpdateRateInput").value = player.options.chart.updateRate;
    if (Number.isInteger(player.options.chart.updateRate) === false) {
        player.options.chart.updateRate = 1000;
    }
    if ((player.options.chart.updateRate <= 200 && player.options.chart.duration >= 30) && player.options.chart.warning === 0) {
        alert("Warning: setting the duration and update rate too high can cause performance issues.");
        player.options.chart.warning = 1;
    }
    if (player.options.chart.duration / player.options.chart.updateRate * 1000 >= 1000 && player.options.chart.warning !== 2) {
        alert("Warning: you have set the duration and update rate quite high, make sure you know what you're doing or have a good computer");
        player.options.chart.warning = 2;
    }
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
    }  else if(name === "S5") {
        Chart.defaults.global.defaultFontColor = 'black';
        normalDimChart.data.datasets[0].borderColor = '#000'
    } else {
        themeName=name;
    }
    if (theme=="Dark"||theme=="Dark Metro") {
        Chart.defaults.global.defaultFontColor = '#888';
        normalDimChart.data.datasets[0].borderColor = '#888'
    } else {
        Chart.defaults.global.defaultFontColor = 'black';
        normalDimChart.data.datasets[0].borderColor = '#000'
    }
    document.getElementById("theme").innerHTML="<p style='font-size:15px'>Themes</p>Current theme: " + themeName;
    document.getElementById("chosenTheme").textContent="Current theme: " + themeName;

    if (name === undefined) return;
    if (name === "Aarex's Modifications") {
		name = "Aarexs Modifications"
    }

    var head = document.head;
    var link = document.createElement('link');

    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = "stylesheets/theme-" + name + ".css";

    head.appendChild(link);
}

document.getElementById("theme").onclick = function () {
	closeToolTip()
	document.getElementById('thememenu').style.display="flex"
}


let kongIPMult = 1
let kongDimMult = 1
let kongAllDimMult = 1
let kongEPMult = 1








function showTab(tabName) {
    if (tabName=='quantumtab' && !player.masterystudies) {
        alert("Wait! The owner of NG++, dan-simon, have abandoned the development! However, this is not a win. You need to reach real Infinite antimatter to win! (it's impossible)")
        return
    }
    //iterate over all elements in div_tab class. Hide everything that's not tabName and show tabName
    var tabs = document.getElementsByClassName('tab');
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
    if ((document.getElementById("timestudies").style.display != "none" || document.getElementById("ers_timestudies").style.display != "none" || document.getElementById("masterystudies").style.display != "none") && document.getElementById("eternitystore").style.display != "none") document.getElementById("TTbuttons").style.display = "block";
    else document.getElementById("TTbuttons").style.display = "none"
    if ((document.getElementById("antimatterdimensions").style.display != "none" || document.getElementById("metadimensions").style.display != "none") && player.aarexModifications.progressBar && document.getElementById("dimensions").style.display != "none") document.getElementById("progress").style.display = "block";
    else document.getElementById("progress").style.display = "none"
    if (oldTab !== tabName) {
        if (tabName=="eternitystore") {
            if (document.getElementById('timestudies') !== "none" || document.getElementById('masterystudies') !== "none" || document.getElementById('dilation') !== "none") resizeCanvas()
            if (document.getElementById("dilation") !== "none") requestAnimationFrame(drawAnimations)
        }
        if (tabName=="quantumtab") {
            if (document.getElementById('uquarks') !== "none") resizeCanvas()
            if (document.getElementById("uquarks") !== "none") requestAnimationFrame(drawQuarkAnimation)
        }
    }
    closeToolTip();
}




function updateMoney() {
    var element = document.getElementById("coinAmount");
    element.textContent = formatValue(player.options.notation, player.money, 2, 1);
    var element2 = document.getElementById("matter");
    if (player.currentChallenge == "challenge12" || player.currentChallenge == "postc1") element2.textContent = "There is " + formatValue(player.options.notation, player.matter, 2, 1) + " matter."
    if (player.currentChallenge == "postc6" || inQC(6)) element2.textContent = "There is " + formatValue(player.options.notation, Decimal.pow(player.matter,20), 2, 1) + " matter."; //TODO
    var element3 = document.getElementById("chall13Mult");
    if (player.currentChallenge === "challenge13" || (player.currentChallenge == "postc1" && player.galacticSacrifice)) element3.innerHTML = formatValue(player.options.notation, productAllTotalBought(), 2, 1) + 'x multiplier on all dimensions (product of bought).'
}

function updateCoinPerSec() {
	var element = document.getElementById("coinsPerSec");
	var ret = getDimensionProductionPerSecond(1)
	if (player.currentChallenge == "challenge7" || inQC(4)) ret = ret.plus(getDimensionProductionPerSecond(2))
	if (player.currentChallenge == "challenge3" || player.currentChallenge == "postc1") ret = ret.times(player.chall3Pow)
	element.textContent = 'You are getting ' + shortenDimensions(ret) + ' antimatter per second.'
}

function getInfinitied() {return Math.max(player.infinitied + player.infinitiedBank, 0)}







function getGalaxyCostScalingStart(galaxies) {
    if (player.currentEternityChall == "eterc5") return 0
    if (player.boughtDims) return 1/0
    var n = 100+ECTimesCompleted("eterc5")*5
    if (player.timestudy.studies.includes(223)) n += 7
    if (player.timestudy.studies.includes(224)) n += Math.floor(player.resets/2000)
	
    if (galaxies > 1399) {
		let push = 5
		if (GUBought("rg5")) push *= 1.13
		if (GUBought("gb5")) push *= 1+Math.sqrt(player.replicanti.galaxies)/550
		if (GUBought("br5")) push *= 1+Math.sqrt(player.dilation.tachyonParticles.max(1).log10())*0.013
		n -= Math.ceil((galaxies-1399)/push)
	}

    return Math.max(n,0)
}

function getRemoteGalaxyScalingStart() {
	var n = 800
	if (player.masterystudies) {
		if (player.masterystudies.includes("t251")) n += Math.floor(player.resets/3e3)
		if (player.masterystudies.includes("t252")) n += Math.floor(player.dilation.freeGalaxies/7)
		if (player.masterystudies.includes("t253")) n += Math.floor(extraReplGalaxies/9)*20
		if (player.masterystudies.includes("t301")) n += Math.floor(extraReplGalaxies/4.45)
	}
	return n
}

function getGalaxyRequirement(offset=0) {
    let galaxies = player.galaxies+offset
    let mult = getGalaxyCostIncrease(galaxies)
    let amount = 80 + galaxies * mult
    if (player.currentChallenge == "challenge4") amount += 19
    else if (player.galacticSacrifice) amount -= (player.galacticSacrifice.upgrades.includes(22) && galaxies > 0) ? 50 : 60

    let galaxyCostScalingStart = getGalaxyCostScalingStart(galaxies)
    if (galaxies >= galaxyCostScalingStart) {
        let speed = 1
        if (GUBought("rg6")) speed = 0.85
        if (GUBought("gb6")) speed /= 1+Math.pow(player.infinityPower.log10(),0.25)/2500
        if (GUBought("br6")) speed /= 1+player.meta.resets/300
        amount += (galaxies-galaxyCostScalingStart+2)*(galaxies-galaxyCostScalingStart+1)*speed
    }
    let remoteGalaxyScalingStart = getRemoteGalaxyScalingStart()
    if (galaxies >= remoteGalaxyScalingStart) {
        let speed2 = 1
        if (GUBought("rg7")) speed2 = 0.9
        if (GUBought("gb7")) speed2 /= 1+Math.log10(1+player.infinityPoints.max(1).log10())/100
        if (GUBought("br7")) speed2 /= 1+Math.log10(1+player.eternityPoints.max(1).log10())/80
        amount = amount * Math.pow(GUBought("rg1") ? 1.001 : 1.002, (galaxies-remoteGalaxyScalingStart-1) * speed2)
    }
    amount = Math.floor(amount)

    if (player.infinityUpgrades.includes("resetBoost")) amount -= 9;
    if (player.challenges.includes("postc5")) amount -= 1;

    return amount;
}

function getGalaxyCostIncrease() {
	if (false) return 60
	let ret = 60
	if (player.timestudy.studies.includes(42)) ret = player.aarexModifications.newGameExpVersion?48:52
	if (player.galacticSacrifice) if (player.galacticSacrifice.upgrades.includes(22)) ret = 30
	if (player.currentChallenge == "challenge4") ret = 90
	if (player.infinityUpgrades.includes("galCost")) ret -= 5
	return ret;
}

var worstChallengeTime = 1
var worstChallengeBonus = 1

function updateWorstChallengeTime() {
    worstChallengeTime = 1
    for (var i=0; i<10; i++) {
        if (player.challengeTimes[i] > worstChallengeTime) worstChallengeTime = player.challengeTimes[i]
    }
}

function updateWorstChallengeBonus() {
	updateWorstChallengeTime()
	// challengeTimes are in ticks (0.1s); 33us is an actual reasonable limit given EC12
	actualWorst = Math.max(33e-6, (player.masterystudies ? Math.min.apply(null, player.challengeTimes) : worstChallengeTime) * 0.1)
	// Change very slightly between 0.1s and 0.02s; then reward clever players
	if (actualWorst < 0.1) {
		if (!player.masterystudies) actualWorst = 0.1 //Don't let the bonus change outside of NG+++
		else if (actualWorst > 0.02) {
			actualWorst = 0.075 + 0.25 * actualWorst;
		} else {
			actualWorst = (0.075/0.02 + 0.25) * actualWorst;
		}
	}
	worstChallengeBonus = Decimal.max(Math.pow(3000 / actualWorst,player.galacticSacrifice?2:1), 1);
}

function sacrificeConf() {
    document.getElementById("confirmation").checked = player.options.sacrificeConfirmation
    player.options.sacrificeConfirmation = !player.options.sacrificeConfirmation
    document.getElementById("sacConfirmBtn").textContent = "Sacrifice confirmation: O" + (player.options.sacrificeConfirmation ? "N" : "FF")
}

function getDilPower() {
	var ret = Math.pow(3, player.dilation.rebuyables[3]) 
	if (player.masterystudies) {
		if (player.masterystudies.includes("t264")) ret *= getMTSMult(264)
		if (GUBought("br1")) ret *= player.dilation.dilatedTime.add(1).log10()+1
	}
	return ret
}

function getDilExp() {
    if (player.dilation.rebuyables[4]) return 1.5 + player.dilation.rebuyables[4] * .25
    else return 1.5
}

function getDilGain() {
    return Math.pow(Decimal.log10(player.money) / 400, getDilExp()) * getDilPower();
}

function getDilTimeGainPerSecond() {
	let gain = player.dilation.tachyonParticles.pow(GUBought("br3")?1.1:1).times(Math.pow(2, player.dilation.rebuyables[1]))
	if (player.dilation.upgrades.includes('ngpp2')) gain = gain.times(Math.pow(player.eternities, .1))
	if (player.masterystudies) {
		if (player.masterystudies.includes("t263")) gain = gain.times(getMTSMult(263))
		if (player.masterystudies.includes("t281")) gain = gain.times(getMTSMult(281))
		if (QCIntensity(1)) gain = gain.times(Decimal.pow(10, Math.pow(getDimensionFinalMultiplier(1).times(getDimensionFinalMultiplier(2)).log10(),QCIntensity(1)>1?0.275:0.25)/200))
	}
	if (player.dilation.upgrades.includes('ngpp6')) gain = gain.times(getDil17Bonus())
	if (GUBought("br2")) gain = gain.times(Decimal.pow(2.2, Math.pow(calcTotalSacrificeBoost().max(1).log10()/1e6, 0.25)))
	gain = gain.times(colorBoosts.b)
	return gain;
}

function updateDimensions() {
    if (document.getElementById("antimatterdimensions").style.display == "block" && document.getElementById("dimensions").style.display == "block") {

        for (let tier = 1; tier <= 8; ++tier) {
            var name = TIER_NAMES[tier];
            if (!canBuyDimension(tier) && document.getElementById(name + "Row").style.display !== "table-row") {
                break;
            }
            document.getElementById(name + "D").childNodes[0].nodeValue = DISPLAY_NAMES[tier] + " Dimension x" + formatValue(player.options.notation, getDimensionFinalMultiplier(tier), 1, 1);
            document.getElementById(name + "Amount").textContent = getDimensionDescription(tier);
        }



        for (let tier = 1; tier <= 8; ++tier) {
            var name = TIER_NAMES[tier];
            if (!canBuyDimension(tier)) {
                break;
            }

            document.getElementById(name + "Row").style.display = "table-row";
            document.getElementById(name + "Row").style.visibility = "visible";


        }

        var shiftRequirement = getShiftRequirement(0);
        var isShift = player.resets < ((player.currentChallenge == "challenge4" || player.currentChallenge == "postc1") ? 2 : 4)
        document.getElementById("resetLabel").textContent = 'Dimension ' + (isShift ? "Shift" : player.resets < getSupersonicStart() ? "Boost" : "Supersonic") + ' ('+ getFullExpansion(player.resets) +'): requires ' + getFullExpansion(shiftRequirement.amount) + " " + DISPLAY_NAMES[shiftRequirement.tier] + " Dimensions"
        document.getElementById("softReset").textContent = "Reset the game for a " + (isShift ? "new dimension" : "boost")
        var totalReplGalaxies = player.replicanti.galaxies + extraReplGalaxies
        document.getElementById("secondResetLabel").textContent = (player.galaxies < 1400 ? (player.galaxies < getGalaxyCostScalingStart() ? '' : player.galaxies < getRemoteGalaxyScalingStart() ? 'Distant ' : 'Remote ') + 'Antimatter' : 'Dark Matter') + ' Galaxies ('+ getFullExpansion(player.galaxies) + ((totalReplGalaxies + player.dilation.freeGalaxies) > 0 ? ' + ' + getFullExpansion(totalReplGalaxies)  + (player.dilation.freeGalaxies > 0 ? ' + ' + getFullExpansion(Math.floor(player.dilation.freeGalaxies)) : '') : '') +'): requires ' + getFullExpansion(getGalaxyRequirement()) + ' '+DISPLAY_NAMES[player.currentChallenge === 'challenge4' ? 6 : 8]+' Dimensions';
    }

    if (canBuyDimension(3) || player.currentEternityChall == "eterc9") {
        var tickmult = getTickSpeedMultiplier()
        var ticklabel
        if (Decimal.lt(tickmult,1e-9)) ticklabel = "Divide the tick interval by " + shortenDimensions(Decimal.recip(tickmult))
        else {
            tickmult = new Decimal(tickmult).toNumber()
            var places = 0
            if (tickmult < 0.2) places = Math.floor(Math.log10(Math.round(1/tickmult)))
            ticklabel = 'Reduce the tick interval by ' + ((1 - tickmult) * 100).toFixed(places) + '%';
        }
        if (player.galacticSacrifice || player.currentChallenge == "postc3" || isIC3Trapped()) document.getElementById("tickLabel").innerHTML = (isIC3Trapped() || player.currentChallenge == "postc3" ? "M" : ticklabel + '<br>and m') + 'ultiply all dimensions by ' + getPostC3RewardMult().toPrecision(4) + '.'
        else document.getElementById("tickLabel").textContent = ticklabel + '.'

        document.getElementById("tickSpeed").style.visibility = "visible";
        document.getElementById("tickSpeedMax").style.visibility = "visible";
        document.getElementById("tickLabel").style.visibility = "visible";
        document.getElementById("tickSpeedAmount").style.visibility = "visible";
    } else {
        document.getElementById("tickSpeed").style.visibility = "hidden";
        document.getElementById("tickSpeedMax").style.visibility = "hidden";
        document.getElementById("tickLabel").style.visibility = "hidden";
        document.getElementById("tickSpeedAmount").style.visibility = "hidden";
    }

    if (document.getElementById("dimensions").style.display == "block" && document.getElementById("metadimensions").style.display == "block") updateMetaDimensions()
    if (document.getElementById("quantumtab").style.display == "block") updateQuantumTabs()

    if (player.bestInfinityTime == 9999999999) {
        document.getElementById("bestInfinity").textContent = ""
        document.getElementById("infinitied").textContent = ""
        document.getElementById("thisInfinity").textContent = ""
    } else {
        document.getElementById("bestInfinity").textContent = "Your fastest Infinity is in " + timeDisplay(player.bestInfinityTime) + "."
        document.getElementById("thisInfinity").textContent = "You have spent " + timeDisplay(player.thisInfinityTime) + " in this Infinity."
        if (player.infinityPoints.equals(1)) {
            document.getElementById("infinityPoints1").textContent = "You have 1 Infinity point."
            document.getElementById("infinityPoints2").textContent = "You have 1 Infinity point."
        }
        else {
            document.getElementById("infinityPoints1").innerHTML = "You have <span class=\"IPAmount1\">"+shortenDimensions(player.infinityPoints)+"</span> Infinity points."
            document.getElementById("infinityPoints2").innerHTML = "You have <span class=\"IPAmount2\">"+shortenDimensions(player.infinityPoints)+"</span> Infinity points."
        }
        document.getElementById("infinitied").textContent = "You have infinitied " + getFullExpansion(player.infinitied) + " time" + (player.infinitied > 1 ? "s" : "") + (player.infinitiedBank>0 ? " this eternity." : ".")
    }

    if (document.getElementById("stats").style.display == "block" && document.getElementById("statistics").style.display == "block") {
        document.getElementById("totalmoney").textContent = 'You have made a total of ' + shortenMoney(player.totalmoney) + ' antimatter.'
        document.getElementById("totalresets").textContent = 'You have done ' + getFullExpansion(player.resets) + ' dimension boosts/shifts.'
        var showBoosts=player.tickspeedBoosts !== undefined ? (player.resets > 0 || player.tickspeedBoosts > 0 || player.galaxies > 0 || player.infinitied > 0 || player.eternities != 0 || quantumed) : false
        document.getElementById("boosts").style.display = showBoosts?'':'none'
        if (showBoosts) document.getElementById("boosts").textContent = 'You have made '+getFullExpansion(player.tickspeedBoosts)+' tickspeed boosts.'
        document.getElementById("galaxies").textContent = 'You have ' + getFullExpansion(player.galaxies) + ' Antimatter Galaxies.'
        var showCancer=player.spreadingCancer>0&&player.galacticSacrifice
        document.getElementById("spreadingCancer").style.display = showCancer?'':'none'
        if (showCancer) document.getElementById("spreadingCancer").textContent = 'You have made '+getFullExpansion(player.spreadingCancer)+' total galaxies while using Cancer notation.'
        document.getElementById("totalTime").textContent = "You have played for " + timeDisplay(player.totalTimePlayed) + "."

        if (player.galacticSacrifice ? player.galacticSacrifice.times < 1 : true) document.getElementById("gsStatistics").style.display = "none"
        else {
            document.getElementById("gsStatistics").style.display = ""
            document.getElementById("sacrificed").textContent = "You have galactic sacrificed "+getFullExpansion(player.galacticSacrifice.times)+" times."
            document.getElementById("thisSacrifice").textContent = "You have spent "+timeDisplay(player.galacticSacrifice.time)+" in this galactic sacrifice."
        }

        if (player.eternities == 0) {
            document.getElementById("eternitied").textContent = ""
            document.getElementById("besteternity").textContent = ""
            document.getElementById("thiseternity").textContent = ""
        } else {
            document.getElementById("eternitied").textContent = "You have Eternitied " + getFullExpansion(player.eternities) + " times."
            document.getElementById("besteternity").textContent = "You have spent "+timeDisplay(player.thisEternity)+" in this Eternity."
            document.getElementById("thiseternity").textContent = "Your fastest Eternity is in "+timeDisplay(player.bestEternity)+"."
        }

        if (player.meta ? player.quantum.times < 1 : true) document.getElementById("quantumStatistics").style.display = "none"
        else {
            document.getElementById("quantumStatistics").style.display = ""
            document.getElementById("quantumed").textContent = "You have gone quantum "+getFullExpansion(player.quantum.times)+" times."
            document.getElementById("thisQuantum").textContent = "You have spent "+timeDisplay(player.quantum.time)+" in quantum."
            document.getElementById("bestQuantum").textContent = "Your fastest quantum is in "+timeDisplay(player.quantum.best)+"."
        }
    }

    if (document.getElementById("infinity").style.display == "block") {
        if (document.getElementById("preinf").style.display == "block") {
            document.getElementById("infi11").innerHTML = "Normal dimensions gain a multiplier based on time played <br>Currently: " + (infUpg11Pow()).toFixed(2) + "x<br>Cost: 1 IP"
            document.getElementById("infi12").innerHTML = "First and Eighth Dimensions gain a multiplier based on infinitied stat<br>Currently: " + formatValue(player.options.notation, dimMults(), 1, 1) + "x<br>Cost: 1 IP"
            document.getElementById("infi13").innerHTML = "Third and Sixth Dimensions gain a multiplier based on infinitied stat<br>Currently: " + formatValue(player.options.notation, dimMults(), 1, 1) + "x<br>Cost: 1 IP"
            document.getElementById("infi22").innerHTML = "Second and Seventh Dimensions gain a multiplier based on infinitied stat<br>Currently: " + formatValue(player.options.notation, dimMults(), 1, 1) + "x<br>Cost: 1 IP"
            document.getElementById("infi23").innerHTML = "Fourth and Fifth Dimensions gain a multiplier based on infinitied stat<br>Currently: " + formatValue(player.options.notation, dimMults(), 1, 1) + "x<br>Cost: 1 IP"
            document.getElementById("infi31").innerHTML = "Normal dimensions gain a multiplier based on time spent in current infinity<br>Currently: " + shorten(infUpg13Pow()) + "x<br>Cost: 3 IP"
            document.getElementById("infi32").innerHTML = "Multiplier for unspent Infinity Points on 1st Dimension<br>Currently: " + formatValue(player.options.notation, getUnspentBonus(), 2, 2) + "x<br>Cost: 5 IP"
            if (player.galacticSacrifice) {
                var base=player.aarexModifications.newGameExpVersion?20:2
                document.getElementById("infi21").innerHTML = "Increase the multiplier for buying 10 Dimensions <br>"+base+"x -> "+(infUpg12Pow()*base/2).toPrecision(4)+"x<br>Cost: 1 IP"
                document.getElementById("infi33").innerHTML = "Dimension boosts gain an extra multiplier based on infinitied stat<br>Currently: " + (1.2 + 0.05 * player.infinityPoints.max(1).log(10)).toFixed(2) + "x<br>Cost: 7 IP"
            }
            document.getElementById("infi34").innerHTML = "Infinity Point generation based on fastest infinity <br>Currently: "+shortenDimensions(getIPMult())+" every " + timeDisplay(player.bestInfinityTime*10) + "<br>Cost: 10 IP"
        } else if (document.getElementById("postinf").style.display == "block") {
            document.getElementById("postinfi11").innerHTML = "Power up all dimensions based on total antimatter produced<br>Currently: "+shorten(Math.pow(player.totalmoney.e+1, player.galacticSacrifice?2:0.5))+"x<br>Cost: "+shortenCosts(1e4)+" IP"
            document.getElementById("postinfi21").innerHTML = "Power up all dimensions based on current antimatter<br>Currently: "+shorten(Math.pow(player.money.e+1, player.galacticSacrifice?2:0.5))+"x<br>Cost: "+shortenCosts(5e4)+" IP"
            if (player.tickSpeedMultDecrease > 2) document.getElementById("postinfi31").innerHTML = "Tickspeed cost multiplier increase <br>"+player.tickSpeedMultDecrease+"x -> "+(player.tickSpeedMultDecrease-1)+"x<br>Cost: "+shortenDimensions(player.tickSpeedMultDecreaseCost) +" IP"
            else document.getElementById("postinfi31").innerHTML = "Tickspeed cost multiplier increase<br>"+player.tickSpeedMultDecrease.toFixed(player.tickSpeedMultDecrease<2?2:0)+"x"
            document.getElementById("postinfi22").innerHTML = "Power up all dimensions based on achievements completed <br>Currently: "+shorten(achievementMult)+"x<br>Cost: "+shortenCosts(1e6)+" IP"
            document.getElementById("postinfi12").innerHTML = "Power up all dimensions based on amount infinitied <br>Currently: "+shorten(getInfinitiedMult())+"x<br>Cost: "+shortenCosts(1e5)+" IP"
            if (player.timestudy.studies.includes(31)) document.getElementById("postinfi12").innerHTML = "Power up all dimensions based on amount infinitied <br>Currently: "+shortenMoney(Math.pow((Math.log10(getInfinitied()+1)*10).toFixed(2), 4))+"x<br>Cost: "+shortenCosts(1e5)+" IP"
            document.getElementById("postinfi41").innerHTML = "Makes galaxies "+(player.galacticSacrifice?7:5)+"0% stronger <br>Cost: "+shortenCosts(5e11)+" IP"
            document.getElementById("postinfi32").innerHTML = "Power up all dimensions based on slowest challenge run<br>Currently:"+worstChallengeBonus.toFixed(2)+"x<br>Cost: "+shortenCosts(1e7)+" IP"

            document.getElementById("postinfi13").innerHTML = "You passively generate Infinitied stat based on your fastest infinity.<br>1 Infinity every "+timeDisplay(player.bestInfinityTime*5)+ " <br>Cost: "+shortenCosts(20e6)+" IP"
            document.getElementById("postinfi23").innerHTML = "Option to bulk buy Dimension Boosts <br>Cost: "+shortenCosts(player.galacticSacrifice?5e6:5e9)+" IP"
            document.getElementById("postinfi33").innerHTML = "Autobuyers work twice as fast <br>Cost:"+shortenCosts(1e15)+" IP"
            var precision=ECTimesCompleted("eterc6")%5>0?1:0
            if (player.dimensionMultDecrease > 3-ECTimesCompleted("eterc6")*0.2) document.getElementById("postinfi42").innerHTML = "Dimension cost multiplier increase<br>"+player.dimensionMultDecrease.toFixed(precision)+"x -> "+(player.dimensionMultDecrease-1).toFixed(precision)+"x<br>Cost: "+shortenCosts(player.dimensionMultDecreaseCost) +" IP"
            else document.getElementById("postinfi42").innerHTML = "Dimension cost multiplier increase<br>"+player.dimensionMultDecrease.toFixed(precision)+"x"

            document.getElementById("offlineProd").innerHTML = "Generates "+player.offlineProd+"% > "+Math.max(Math.max(5, player.offlineProd + 5), Math.min(50, player.offlineProd + 5))+"% of your best IP/min from last 10 infinities, works offline<br>Currently: "+shortenMoney(bestRunIppm.times(player.offlineProd/100)) +"IP/min<br> Cost: "+shortenCosts(player.offlineProdCost)+" IP"
            if (player.offlineProd == 50) document.getElementById("offlineProd").innerHTML = "Generates "+player.offlineProd+"% of your best IP/min from last 10 infinities, works offline<br>Currently: "+shortenMoney(bestRunIppm.times(player.offlineProd/100)) +" IP/min"

            if (player.galacticSacrifice) {
                document.getElementById("postinfi01").innerHTML = "Multiplier to galaxy points based on infinities<br>Currently: "+shorten(getPost01Mult())+"x<br>Cost: "+shortenCosts(1e3)+" IP"
                document.getElementById("postinfi02").innerHTML = "Decrease dimension boost cost increase by 1<br>Currently: +"+getDimboostCostIncrease()+(player.infinityUpgrades.includes("dimboostCost")?"":" -> +"+(getDimboostCostIncrease()-1))+"<br>Cost: "+shortenCosts(2e4)+" IP"
                document.getElementById("postinfi03").innerHTML = "Decrease galaxy cost increase by 5<br>Currently: +"+getGalaxyCostIncrease()+(player.infinityUpgrades.includes("galCost")?"":" -> +"+(getGalaxyCostIncrease()-5))+"<br>Cost: "+shortenCosts(5e5)+" IP"
                document.getElementById("postinfi04").innerHTML = "Dimension multipliers are further increased by g31 <br>x^"+galUpgrade31().toFixed(2)+" -> x^"+((galUpgrade31()+0.02).toFixed(2))+"<br>Cost: "+shorten(player.dimPowerIncreaseCost)+" IP";
            }
        }
    }
    if (document.getElementById("eternityupgrades").style.display == "block" && document.getElementById("eternitystore").style.display == "block") {
        document.getElementById("eter1").innerHTML = "Infinity Dimensions multiplier based on unspent EP (x+1)<br>Currently: "+shortenMoney(player.eternityPoints.plus(1))+"x<br>Cost: 5 EP"
        document.getElementById("eter2").innerHTML = "Infinity Dimension multiplier based on eternities ("+(player.boughtDims?"x^log4(2x)":player.achievements.includes("ngpp15")?"x^log10(x)^3.75":"(x/200)^log4(2x)")+")<br>Currently: "+shortenMoney(getEU2Mult())+"x<br>Cost: 10 EP"
        document.getElementById("eter3").innerHTML = "Infinity Dimensions multiplier based on "+(player.boughtDims?"time shards (x^log4(2x))":"sum of Infinity Challenge times")+"<br>Currently: "+shortenMoney(getEU3Mult())+"x<br>Cost: "+shortenCosts(50e3)+" EP"
        document.getElementById("eter4").innerHTML = "Your achievement bonus affects Time Dimensions"+"<br>Cost: "+shortenCosts(1e16)+" EP"
        document.getElementById("eter5").innerHTML = "Time Dimensions are multiplied by your unspent time theorems"+"<br>Cost: "+shortenCosts(1e40)+" EP"
        document.getElementById("eter6").innerHTML = "Time Dimensions are multiplied by days played"+"<br>Cost: "+shortenCosts(1e50)+" EP"
    }

    if (document.getElementById("dilation").style.display == "block") {
        if (player.dilation.active) {
            let gain = getDilGain()
            let req = Decimal.pow(10, Math.pow(player.dilation.totalTachyonParticles / getDilPower(), 1 / getDilExp()) * 400);
            if (player.dilation.totalTachyonParticles - gain > 0) document.getElementById("enabledilation").innerHTML = "Disable dilation.<br>Reach " + shortenMoney(req) + " antimatter to gain more Tachyon Particles."
            else document.getElementById("enabledilation").textContent = "Disable dilation."
        }
        else document.getElementById("enabledilation").textContent = "Dilate time."+((player.eternityBuyer.isOn&&player.eternityBuyer.dilationMode?!isNaN(player.eternityBuyer.statBeforeDilation):false) ? " " + (player.eternityBuyer.dilationPerAmount - player.eternityBuyer.statBeforeDilation) + " left before dilation." : "")
    }
}

function updateCosts() {
	var useTwo = player.options.notation=="Logarithm" ? 2 : 0
	for (var i=1; i<9; i++) {
		var cost = player[TIER_NAMES[i] + "Cost"]
		document.getElementById(TIER_NAMES[i]).textContent = 'Cost: ' + shortenPreInfCosts(cost)
		document.getElementById(TIER_NAMES[i] + "Max").textContent = 'Until 10, Cost: ' + shortenPreInfCosts(cost.times(10 - dimBought(i)));

		document.getElementById("infMax"+i).textContent = "Cost: " + shortenInfDimCosts(player["infinityDimension"+i].cost) + " IP"
		document.getElementById("timeMax"+i).textContent = "Cost: " + shortenDimensions(player["timeDimension"+i].cost) + " EP"
		if (player.meta) {
			document.getElementById("meta"+i).textContent = speedrunMilestonesReached > i+5 ? "Auto: O"+(player.autoEterOptions["md"+i] ? "N" : "FF") : "Cost: " + formatValue(player.options.notation, player.meta[i].cost, useTwo, 0) + " MA"
			document.getElementById("metaMax"+i).textContent = (speedrunMilestonesReached > i+5 ? (shiftDown ? "Singles" : "Cost") : "Until 10") + ": " + formatValue(player.options.notation, ((shiftDown && speedrunMilestonesReached > i+5) ? player.meta[i].cost : getMetaMaxCost(i)), useTwo, 0) + " MA"
		}
	}
	document.getElementById("tickSpeed").textContent = 'Cost: ' + shortenPreInfCosts(player.tickSpeedCost);
}

function floatText(id, text, leftOffset = 150) {
    if (!player.options.animations.floatingText) return
    var el = $("#"+id)
    el.append("<div class='floatingText' style='left: "+leftOffset+"px'>"+text+"</div>")
    setTimeout(function() {
        el.children()[0].remove()
    }, 1000)
}




function isNormalChall(elem) {
    return !(elem.id.includes("eter") || elem.id.includes("q") || elem.id.includes("pc"))
}

function updateChallenges() {
    try {
        var buttons = Array.from(document.getElementsByClassName('onchallengebtn')).filter(isNormalChall)
        for (var i=0; i < buttons.length; i++) {
            buttons[i].className = "challengesbtn";
            buttons[i].textContent = "Start"
        }

        var buttonss = Array.from(document.getElementsByClassName('completedchallengesbtn')).filter(isNormalChall)
        for (var i=0; i < buttonss.length; i++) {
            buttonss[i].className = "challengesbtn";
            buttonss[i].textContent = "Start"
        }

        for (var i=0; i < player.challenges.length; i++) {
            document.getElementById(player.challenges[i]).className = "completedchallengesbtn";
            document.getElementById(player.challenges[i]).textContent = "Completed"
        }

        if (inQC(4)) {
            document.getElementById("challenge7").className = "onchallengebtn";
            document.getElementById("challenge7").textContent = "Trapped in"
        }

        if (inQC(6)) for (i=2;i<9;i++) if (i<3||i>5) {
            document.getElementById("postc"+i).className = "onchallengebtn";
            document.getElementById("postc"+i).textContent = "Trapped in"
        }

        if (isIC3Trapped()) {
            document.getElementById("postc3").className = "onchallengebtn";
            document.getElementById("postc3").textContent = "Trapped in"
        }


        if (player.money.gte(new Decimal("1e2000")) || Object.keys(player.eternityChalls).length > 0 || player.eternityChallUnlocked !== 0) document.getElementById("challTabButtons").style.display = "table"
        for (var i=1; i<9; i++) document.getElementById("postc"+i+"div").style.display = (player.postChallUnlocked >= i || (i == 3 && player.galacticSacrifice)) ? "inline-block" : "none"
    } catch (err) {
        console.log(err)
        updateChallenges()
    }
}

function updateEternityChallenges() {
	var locked = true
	for (ec=1;ec<15;ec++) {
		var property = "eterc"+ec 
		var ecdata = player.eternityChalls[property]
		if (ecdata) locked = false
		document.getElementById(property+"div").style.display=ecdata?"inline-block":"none"
		document.getElementById(property).textContent=ecdata>4?"Completed":"Locked"
		document.getElementById(property).className=ecdata>4?"completedchallengesbtn":"lockedchallengesbtn"
	}
	if (player.eternityChallUnlocked>0) {
		var property="eterc"+player.eternityChallUnlocked
		var onchallenge=player.currentEternityChall==property
		locked=false
		document.getElementById(property+"div").style.display="inline-block"
		document.getElementById(property).textContent=onchallenge?"Running":"Start"
		document.getElementById(property).className=onchallenge?"onchallengebtn":"challengesbtn"
	}
	document.getElementById("eterctabbtn").style.display = locked?"none":"inline-block"
}












function toggleChallengeRetry() {
    if (player.options.retryChallenge) {
        player.options.retryChallenge = false
        document.getElementById("retry").innerHTML = "Automatically retry challenges OFF"
    } else {
        player.options.retryChallenge = true
        document.getElementById("retry").innerHTML = "Automatically retry challenges ON"
    }
}




document.getElementById("first").onclick = function () {
    if (buyOneDimension(1)) {
        // This achievement is granted only if the buy one button is pressed.
        if (player.firstAmount >= 1e150) {
            giveAchievement("There's no point in doing that");
        }
        if ((player.currentChallenge == "challenge12" || player.currentChallenge == "postc1") && player.matter.equals(0)) player.matter = new Decimal(1);
    }
    if (player.firstAmount.lt(1)) {
        player.money = new Decimal("0")
        player.firstAmount = player.firstAmount.plus(1);
        player.firstBought += 1;
        giveAchievement("You gotta start somewhere");
    }
};



function glowText(id) {
  var text = document.getElementById(id);
  text.style.setProperty("-webkit-animation", "glow 1s");
  text.style.setProperty("animation", "glow 1s");
}








function toggleChallengeRetry() {
    if (player.options.retryChallenge) {
        player.options.retryChallenge = false
        document.getElementById("retry").textContent = "Automatically retry challenges OFF"
    } else {
        player.options.retryChallenge = true
        document.getElementById("retry").textContent = "Automatically retry challenges ON"
    }
}

document.getElementById("news").onclick = function () {
    if (document.getElementById("news").textContent === "Click this to unlock a secret achievement.") {
        giveAchievement("Real news")
    }
};

document.getElementById("secretstudy").onclick = function () {
    document.getElementById("secretstudy").style.opacity = "1";
    document.getElementById("secretstudy").style.cursor = "default";
    giveAchievement("Go study in real life instead");
    setTimeout(drawStudyTree, 2000);
};

document.getElementById("The first one's always free").onclick = function () {
    giveAchievement("The first one's always free")
};




function glowText(id) {
  var text = document.getElementById(id);
  text.style.setProperty("-webkit-animation", "glow 1s");
  text.style.setProperty("animation", "glow 1s");
}





document.getElementById("maxall").onclick = function () {
    if (!player.break && player.money.gt(Number.MAX_VALUE)) return false;
    if (player.currentChallenge !== 'challenge14') buyMaxTickSpeed();

    for (var tier=1; tier<9;tier++) {
        var name = TIER_NAMES[tier];
        var cost = player[name + 'Cost'].times(10 - dimBought(tier))
        var multBefore = player[name + 'Pow']
        if (tier >= 3 && (player.currentChallenge == "challenge10" || player.currentChallenge == "postc1")) {
            if (!canBuyDimension(tier)) continue
            if (player[TIER_NAMES[tier-2] + 'Amount'].lt(cost)) continue
                if (canBuyDimension(tier)) {
                    if (cost.lt(player[TIER_NAMES[tier-2]+"Amount"]) && dimBought(tier) != 0) {
                        player[TIER_NAMES[tier-2]+"Amount"] = player[TIER_NAMES[tier-2]+"Amount"].minus(cost)
                        player[name + "Amount"] = Decimal.round(player[name + "Amount"].plus(10 - dimBought(tier)))
                        recordBought(name,10 - dimBought(tier));
                        player[name + 'Pow']  = player[name + 'Pow'].times(getDimensionPowerMultiplier(tier))
                        player[name + "Cost"] = player[name + "Cost"].times(getDimensionCostMultiplier(tier))
                    }
                    while (player[TIER_NAMES[tier-2]+"Amount"].gt(player[name + "Cost"].times(10))) {
                        player[TIER_NAMES[tier-2]+"Amount"] = player[TIER_NAMES[tier-2]+"Amount"].minus(player[name + "Cost"].times(10))
                        player[name + "Cost"] = player[name + "Cost"].times(getDimensionCostMultiplier(tier))
                        player[name + "Amount"] = Decimal.round(player[name + "Amount"].plus(10))
                        recordBought(name,10)
                        player[name + "Pow"] = player[name + "Pow"].times(getDimensionPowerMultiplier(tier))
                        if (player[name + 'Cost'].gte(Number.MAX_VALUE)) player.costMultipliers[tier-1] = player.costMultipliers[tier-1].times(inQC(7)?1e100:player.dimensionMultDecrease)
                    }


                    onBuyDimension(tier);
                }
        } else {
        if (!canBuyDimension(tier)) continue
            if (cost.lt(player.money) && dimBought(tier) != 0) {
                player.money = player.money.minus(cost)
                player[name + "Amount"] = Decimal.round(player[name + "Amount"].plus(10 - dimBought(tier)))
                recordBought(name,10 - dimBought(tier));
                player[name + 'Pow']  = player[name + 'Pow'].times(getDimensionPowerMultiplier(tier))
                player[name + "Cost"] = player[name + "Cost"].times(getDimensionCostMultiplier(tier))
            }
            if (player.money.lt(player[name + "Cost"].times(10))) continue

            if ((player.dimensionMultDecrease > 3 || player.currentChallenge == "postc5" || player.currentChallenge == "challenge5")) {
                while ((player.money.gte(player[name + "Cost"].times(10)) && player.money.lte(Number.MAX_VALUE)) || (player.money.gte(player[name + "Cost"].times(10)) && player.currentChallenge != "challenge5")) {
                        player.money = player.money.minus(player[name + "Cost"].times(10))
                        if (player.currentChallenge != "challenge5" && player.currentChallenge != "postc5") player[name + "Cost"] = player[name + "Cost"].times(getDimensionCostMultiplier(tier))
                        else if (player.currentChallenge == "postc5") multiplyPC5Costs(player[name + 'Cost'], tier)
                        else multiplySameCosts(player[name + 'Cost'])
                        player[name + "Amount"] = Decimal.round(player[name + "Amount"].plus(10))
                        recordBought(name,10)
                        player[name + "Pow"] = player[name + "Pow"].times(getDimensionPowerMultiplier(tier))
                        if (player[name + 'Cost'].gte(Number.MAX_VALUE)) player.costMultipliers[tier-1] = player.costMultipliers[tier-1].times(inQC(7)?1e100:player.dimensionMultDecrease)
                        if (player.currentChallenge == "challenge8") clearDimensions(tier-1)
                }
            } else {
                if (player[name + "Cost"].lt(Number.MAX_VALUE)) {
                    while (player.money.gte(player[name + "Cost"].times(10)) && player[name + "Cost"].lte(Number.MAX_VALUE)) {
                        player.money = player.money.minus(player[name + "Cost"].times(10))
                        if (player.currentChallenge != "challenge5" && player.currentChallenge != "postc5") player[name + "Cost"] = player[name + "Cost"].times(getDimensionCostMultiplier(tier))
                        else if (player.currentChallenge == "postc5") multiplyPC5Costs(player[name + 'Cost'], tier)
                        else multiplySameCosts(player[name + 'Cost'])
                        player[name + "Amount"] = Decimal.round(player[name + "Amount"].plus(10))
                        recordBought(name,10)
                        player[name + "Pow"] = player[name + "Pow"].times(getDimensionPowerMultiplier(tier))
                        if (player[name + 'Cost'].gte(Number.MAX_VALUE)) player.costMultipliers[tier-1] = player.costMultipliers[tier-1].times(inQC(7)?1e100:player.dimensionMultDecrease)
                        if (player.currentChallenge == "challenge8") clearDimensions(tier-1)
                }
                }

                if (player[name + "Cost"].gte(Number.MAX_VALUE)) {
                    var mi = inQC(7)?Number.MAX_VALUE:player.dimensionMultDecrease
                    var a = Math.log10(Math.sqrt(mi))
                    var b = player.costMultipliers[tier-1].dividedBy(Math.sqrt(mi)).log10()
                    var c = player[name + "Cost"].dividedBy(player.money).log10()
                    var discriminant = Math.pow(b, 2) - (c *a* 4)
                    if (discriminant < 0) continue
                    var buying = Math.floor((Math.sqrt(Math.pow(b, 2) - (c *a *4))-b)/(2 * a))+1
                    if (buying <= 0) return false
                    player[name+"Amount"] = Decimal.round(player[name+"Amount"].plus(10*buying))
                    preInfBuy = Math.floor(1 + (308 - initCost[tier].log10()) / costMults[tier].log10())
                    postInfBuy = player[name + 'Bought']/10+buying - preInfBuy - 1
                    postInfInitCost = initCost[tier].times(Decimal.pow(costMults[tier], preInfBuy))
                    recordBought(name,10*buying)
                    player[name + "Pow"] = player[name + "Pow"].times(Decimal.pow(getDimensionPowerMultiplier(tier), buying))

                    newCost = postInfInitCost.times(Decimal.pow(costMults[tier], postInfBuy)).times(Decimal.pow(mi, postInfBuy * (postInfBuy+1)/2))
                    newMult = costMults[tier].times(Decimal.pow(mi, postInfBuy+1))
                    //if (buying > 0 )player[name + "Cost"] = player.costMultipliers[tier-1].times(Decimal.pow(mi, (buying * buying - buying)/2)).times(player[name + "Cost"])

                    player[name + "Cost"] = newCost
                    player.costMultipliers[tier-1] = newMult
                    if (player.money.gte(player[name + "Cost"]))player.money = player.money.minus(player[name + "Cost"])
                    player[name + "Cost"] = player[name + "Cost"].times(player.costMultipliers[tier-1])
                    player.costMultipliers[tier-1] = player.costMultipliers[tier-1].times(mi)
                }


        }
        }
        if ((player.currentChallenge == "challenge12" || player.currentChallenge == "postc1" || player.currentChallenge == "postc6" || inQC(6)) && player.matter.equals(0)) player.matter = new Decimal(1);
        if (player.currentChallenge == "challenge2" || player.currentChallenge == "postc1") player.chall2Pow = 0;
        if (player.currentChallenge == "postc1") clearDimensions(tier-1);
        player.postC4Tier = tier;
        onBuyDimension(tier)
        floatText(name + "D", "x" + shortenMoney(player[name + "Pow"].dividedBy(multBefore)))
    }
}




document.getElementById("challengeconfirmation").onclick = function () {
    player.options.challConf = !player.options.challConf
    document.getElementById("challengeconfirmation").textContent = "Challenge confirmation: O" + (player.options.challConf ? "N" : "FF")
}




function buyInfinityUpgrade(name, cost) {
    if (player.infinityPoints.gte(cost) && !player.infinityUpgrades.includes(name)) {
        player.infinityUpgrades.push(name);
        player.infinityPoints = player.infinityPoints.minus(cost);
        return true
    } else return false
}

var ipMultPower=2
var ipMultCostIncrease=10
document.getElementById("infiMult").onclick = function() {
    if (player.infinityUpgrades.includes("skipResetGalaxy") && player.infinityUpgrades.includes("passiveGen") && player.infinityUpgrades.includes("galaxyBoost") && player.infinityUpgrades.includes("resetBoost") && player.infinityPoints.gte(player.infMultCost)) {
        player.infinityPoints = player.infinityPoints.minus(player.infMultCost)
        player.infMult = player.infMult.times(ipMultPower);
        player.autoIP = player.autoIP.times(ipMultPower);
        player.infMultCost = player.infMultCost.times(ipMultCostIncrease)
        document.getElementById("infiMult").innerHTML = "Multiply infinity points from all sources by "+ipMultPower+"<br>currently: "+shorten(getIPMult()) +"x<br>Cost: "+shortenCosts(player.infMultCost)+" IP"
        if (player.autobuyers[11].priority !== undefined && player.autobuyers[11].priority !== null && player.autoCrunchMode == "amount") player.autobuyers[11].priority = Decimal.times(player.autobuyers[11].priority, 2);
        if (player.autoCrunchMode == "amount") document.getElementById("priority12").value = formatValue("Scientific", player.autobuyers[11].priority, 2, 0);
    }
}


function updateEternityUpgrades() {
    document.getElementById("eter1").className = (player.eternityUpgrades.includes(1)) ? "eternityupbtnbought" : (player.eternityPoints.gte(5)) ? "eternityupbtn" : "eternityupbtnlocked"
    document.getElementById("eter2").className = (player.eternityUpgrades.includes(2)) ? "eternityupbtnbought" : (player.eternityPoints.gte(10)) ? "eternityupbtn" : "eternityupbtnlocked"
    document.getElementById("eter3").className = (player.eternityUpgrades.includes(3)) ? "eternityupbtnbought" : (player.eternityPoints.gte(50e3)) ? "eternityupbtn" : "eternityupbtnlocked"
    if (player.boughtDims) {
        document.getElementById("eterrow2").style.display="none"
        return
    } else document.getElementById("eterrow2").style.display=""
    document.getElementById("eter4").className = (player.eternityUpgrades.includes(4)) ? "eternityupbtnbought" : (player.eternityPoints.gte(1e16)) ? "eternityupbtn" : "eternityupbtnlocked"
    document.getElementById("eter5").className = (player.eternityUpgrades.includes(5)) ? "eternityupbtnbought" : (player.eternityPoints.gte(1e40)) ? "eternityupbtn" : "eternityupbtnlocked"
    document.getElementById("eter6").className = (player.eternityUpgrades.includes(6)) ? "eternityupbtnbought" : (player.eternityPoints.gte(1e50)) ? "eternityupbtn" : "eternityupbtnlocked"
}


function buyEternityUpgrade(name, cost) {
    if (player.eternityPoints.gte(cost) && !player.eternityUpgrades.includes(name)) {
        player.eternityUpgrades.push(name)
        player.eternityPoints = player.eternityPoints.minus(cost)
        updateEternityUpgrades()
    }
}

function getEPCost(bought) {
	return Decimal.pow(bought>481?1e3:bought>153?500:bought>58?100:50, bought + Math.pow(Math.max(bought-1334, 0), 1.2)).times(500)	
}

function buyEPMult() {
    if (player.eternityPoints.gte(player.epmultCost)) {
        player.epmult = player.epmult.times(5)
        if (player.autoEterMode === undefined || player.autoEterMode === 'amount') {
            player.eternityBuyer.limit = Decimal.times(player.eternityBuyer.limit, 5);
            document.getElementById("priority13").value = formatValue("Scientific", player.eternityBuyer.limit, 2, 0);
        }
        player.eternityPoints = player.eternityPoints.minus(player.epmultCost)
        player.epmultCost = getEPCost(Math.round(player.epmult.ln()/Math.log(5)))
        document.getElementById("epmult").innerHTML = "You gain 5 times more EP<p>Currently: "+shortenDimensions(player.epmult)+"x<p>Cost: "+shortenDimensions(player.epmultCost)+" EP"
        updateEternityUpgrades()
    }
}

function buyMaxEPMult() {
	if (player.eternityPoints.lt(player.epmultCost)) return
	var bought=Math.round(player.epmult.ln()/Math.log(5))
	var increment=1
	while (player.eternityPoints.gte(getEPCost(bought+increment*2-1))) {
		increment*=2
	}
	var toBuy=increment
	for (p=0;p<53;p++) {
		increment/=2
		if (increment<1) break
		if (player.eternityPoints.gte(getEPCost(bought+toBuy+increment-1))) toBuy+=increment
	}
	var num=toBuy
	var newEP=player.eternityPoints
	while (num>0) {
		var temp=newEP
		var cost=getEPCost(bought+num-1)
		if (newEP.lt(cost)) {
			newEP=player.eternityPoints.sub(cost)
			toBuy--
		} else newEP=newEP.sub(cost)
		if (newEP.eq(temp)||num>9007199254740992) break
		num--
	}
	player.eternityPoints=newEP
	player.epmult=player.epmult.times(Decimal.pow(5, toBuy))
	player.epmultCost=getEPCost(bought+toBuy)
	document.getElementById("epmult").innerHTML = "You gain 5 times more EP<p>Currently: "+shortenDimensions(player.epmult)+"x<p>Cost: "+shortenDimensions(player.epmultCost)+" EP"
}





function playerInfinityUpgradesOnEternity() {
    if (player.eternities < 4) player.infinityUpgrades = []
    else if (player.eternities < 20) player.infinityUpgrades = ["timeMult", "dimMult", "timeMult2", "skipReset1", "skipReset2", "unspentBonus", "27Mult", "18Mult", "36Mult", "resetMult", "skipReset3", "passiveGen", "45Mult", "resetBoost", "galaxyBoost", "skipResetGalaxy"]
    else player.infinityUpgrades = player.infinityUpgrades
}



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


document.getElementById("postinfi11").onclick = function() {
    buyInfinityUpgrade("totalMult",1e4);
}

document.getElementById("postinfi21").onclick = function() {
    buyInfinityUpgrade("currentMult",5e4);
}

document.getElementById("postinfi31").onclick = function() {
    if (player.infinityPoints.gte(player.tickSpeedMultDecreaseCost) && player.tickSpeedMultDecrease > 2) {
        player.infinityPoints = player.infinityPoints.minus(player.tickSpeedMultDecreaseCost)
        player.tickSpeedMultDecreaseCost *= 5
        player.tickSpeedMultDecrease--;
        if (player.tickSpeedMultDecrease > 2) document.getElementById("postinfi31").innerHTML = "Tickspeed cost multiplier increase <br>"+player.tickSpeedMultDecrease+"x -> "+(player.tickSpeedMultDecrease-1)+"x<br>Cost: "+shortenDimensions(player.tickSpeedMultDecreaseCost) +" IP"
        else {
            if (player.aarexModifications.newGamePlusVersion&&player.aarexModifications.newGamePlusPlusVersion) {
                for (c=1;c<6;c++) player.tickSpeedMultDecrease-=0.07
                $.notify("Your tickspeed cost multiplier increase has been decreased to 1.65x because you are playing NG++ mode.")
            }
            document.getElementById("postinfi31").innerHTML = "Tickspeed cost multiplier increase<br>"+player.tickSpeedMultDecrease.toFixed(player.tickSpeedMultDecrease<2?2:0)+"x"
        }
    }
}

document.getElementById("postinfi41").onclick = function() {
    buyInfinityUpgrade("postGalaxy",5e11);
}

document.getElementById("postinfi12").onclick = function() {
    buyInfinityUpgrade("infinitiedMult",1e5);
}

document.getElementById("postinfi22").onclick = function() {
    buyInfinityUpgrade("achievementMult",1e6);
}

document.getElementById("postinfi32").onclick = function() {
    buyInfinityUpgrade("challengeMult",1e7);
}

document.getElementById("postinfi42").onclick = function() {
    var min=3-ECTimesCompleted("eterc6")*0.2
    if (player.infinityPoints.gte(player.dimensionMultDecreaseCost) && player.dimensionMultDecrease > min) {
        player.infinityPoints = player.infinityPoints.minus(player.dimensionMultDecreaseCost)
        player.dimensionMultDecreaseCost *= 5000
        player.dimensionMultDecrease--;
        if (player.dimensionMultDecrease > min) document.getElementById("postinfi42").innerHTML = "Dimension cost multiplier increase <br>"+player.dimensionMultDecrease+"x -> "+(player.dimensionMultDecrease-1)+"x<br>Cost: "+shortenCosts(player.dimensionMultDecreaseCost) +" IP"
        else {
            if (player.aarexModifications.newGamePlusVersion) {
                for (c=ECTimesCompleted("eterc6");c<5;c++) player.dimensionMultDecrease-=0.2
                if (!player.aarexModifications.newGamePlusPlusVersion) {
                    for (c=1;c<6;c++) player.tickSpeedMultDecrease-=0.07
                    $.notify("Your tickspeed cost multiplier increase has been decreased to 1.65x too.")
                    document.getElementById("postinfi31").innerHTML = "Tickspeed cost multiplier increase<br>"+player.tickSpeedMultDecrease.toFixed(2)+"x"
                }
                $.notify("Your dimension cost multiplier increase has been decreased to 2x because you are playing NG+ mode.")
            }
            document.getElementById("postinfi42").innerHTML = "Dimension cost multiplier increase<br>"+player.dimensionMultDecrease.toFixed(ECTimesCompleted("eterc6")%5>0?1:0)+"x"
        }
    }
}

document.getElementById("postinfi23").onclick = function() {
    buyInfinityUpgrade("bulkBoost",player.galacticSacrifice?5e6:5e9);
}

document.getElementById("offlineProd").onclick = function() {
    if (player.infinityPoints.gte(player.offlineProdCost) && player.offlineProd < 50) {
        player.infinityPoints = player.infinityPoints.minus(player.offlineProdCost)
        player.offlineProdCost *= 10
        player.offlineProd += 5

    }
}


function updateInfCosts() {

    document.getElementById("infiMult").innerHTML = "Multiply infinity points from all sources by "+ipMultPower+"<br>currently: "+shorten(getIPMult()) +"x<br>Cost: "+shortenCosts(player.infMultCost)+" IP"
    if (document.getElementById("replicantis").style.display == "block" && document.getElementById("infinity").style.display == "block") {
        let replGalOver = 0
        if (player.timestudy.studies.includes(131)) replGalOver += Math.floor(player.replicanti.gal / 2)
        document.getElementById("replicantimax").innerHTML = (player.replicanti.gal<3e3?"Max Replicanti galaxies":"Distant Replicated Galaxies")+": "+player.replicanti.gal+(player.timestudy.studies.includes(131) && player.replicanti.gal > 1 ? "+" + Math.floor(player.replicanti.gal / 2) : "")+"<br>+1 Cost: "+shortenCosts(player.replicanti.galCost.div(player.timestudy.studies.includes(233)?player.replicanti.amount.pow(0.3):1))+" IP"
        document.getElementById("replicantiunlock").innerHTML = "Unlock Replicantis<br>Cost: "+shortenCosts(1e140)+" IP"
        document.getElementById("replicantireset").innerHTML = "Reset replicanti amount, but get a free galaxy<br>" + player.replicanti.galaxies + (extraReplGalaxies ? "+" + extraReplGalaxies : "") + " replicated galax" + ((player.replicanti.galaxies + extraReplGalaxies) == 1 ? "y" : "ies") + " created."

        document.getElementById("replicantichance").className = (player.infinityPoints.gte(player.replicanti.chanceCost) && isChanceAffordable()) ? "storebtn" : "unavailablebtn"
        document.getElementById("replicantiinterval").className = (player.infinityPoints.gte(player.replicanti.intervalCost) && ((player.replicanti.interval !== 50) || player.timestudy.studies.includes(22)) && (player.replicanti.interval !== 1)) ? "storebtn" : "unavailablebtn"
        document.getElementById("replicantimax").className = (player.infinityPoints.gte(player.replicanti.galCost)) ? "storebtn" : "unavailablebtn"
        document.getElementById("replicantireset").className = ((player.replicanti.galaxies < player.replicanti.gal && player.replicanti.amount.gte(getReplicantiLimit())) || (player.replicanti.galaxies < Math.floor(player.replicanti.gal * 1.5) && player.replicanti.amount.gte(Number.MAX_VALUE) && player.timestudy.studies.includes(131))) ? "storebtn" : "unavailablebtn"
        document.getElementById("replicantiunlock").className = (player.infinityPoints.gte(1e140)) ? "storebtn" : "unavailablebtn"
    }

    if (document.getElementById("timestudies").style.display == "block" && document.getElementById("eternitystore").style.display == "block") {
        document.getElementById("11desc").textContent = "Currently: "+shortenMoney(Decimal.dividedBy(1,player.tickspeed.dividedBy(1000).pow(0.005).times(0.95).plus(player.tickspeed.dividedBy(1000).pow(0.0003).times(0.05)).max(Decimal.fromMantissaExponent(1, -2500)).pow(player.aarexModifications.newGameExpVersion?0.25:1)))+"x"
        document.getElementById("32desc").textContent = "You gain "+getFullExpansion(player.resets, 1)+"x more infinitied stat (based on dimension boosts)"
        document.getElementById("51desc").textContent = "You gain "+shortenCosts(player.aarexModifications.newGameExpVersion?1e30:1e15)+"x more IP"
        document.getElementById("71desc").textContent = "Currently: "+shortenMoney(calcTotalSacrificeBoost().pow(0.25).max(1).min("1e210000"))+"x"
        document.getElementById("72desc").textContent = "Currently: "+shortenMoney(calcTotalSacrificeBoost().pow(0.04).max(1).min("1e30000"))+"x"
        document.getElementById("73desc").textContent = "Currently: "+shortenMoney(calcTotalSacrificeBoost().pow(0.005).max(1).min("1e1300"))+"x"
        document.getElementById("82desc").textContent = "Currently: "+shortenMoney(Decimal.pow(1.0000109, Decimal.pow(player.resets, 2)).min('1e80000'))+"x"
        document.getElementById("91desc").textContent = "Currently: "+shortenMoney(Decimal.pow(10, Math.min(player.thisEternity, 18000)/60))+"x"
        document.getElementById("92desc").textContent = "Currently: "+shortenMoney(Decimal.pow(2, 600/Math.max(player.bestEternity, 20)))+"x"
        document.getElementById("93desc").textContent = "Currently: "+shortenMoney(Decimal.pow(player.totalTickGained, 0.25))+"x"
        document.getElementById("121desc").textContent = "Currently: "+((253 - averageEp.dividedBy(player.epmult).dividedBy(10).min(248).max(3))/5).toFixed(1)+"x"
        document.getElementById("123desc").textContent = "Currently: "+Math.sqrt(1.39*player.thisEternity/10).toFixed(1)+"x"
        document.getElementById("141desc").textContent = "Currently: "+shortenMoney(new Decimal(1e45).dividedBy(Decimal.pow(15, Math.log(player.thisInfinityTime)*Math.pow(player.thisInfinityTime, 0.125))).max(1))+"x"
        document.getElementById("142desc").textContent = "You gain "+shortenCosts(1e25)+"x more IP"
        document.getElementById("143desc").textContent = "Currently: "+shortenMoney(Decimal.pow(15, Math.log(player.thisInfinityTime)*Math.pow(player.thisInfinityTime, 0.125)))+"x"
        document.getElementById("151desc").textContent = shortenCosts(1e4)+"x multiplier on all Time dimensions"
        var ts16Xbase=player.aarexModifications.newGameExpVersion?1e55:1e11
        document.getElementById("161desc").textContent = shortenCosts(Decimal.pow(ts16Xbase,56))+"x multiplier on all normal dimensions"
        document.getElementById("162desc").textContent = shortenCosts(ts16Xbase)+"x multiplier on all Infinity dimensions"
        document.getElementById("192desc").textContent = "You can get beyond "+shortenMoney(Number.MAX_VALUE)+" replicantis, but the interval is increased the more you have"
        document.getElementById("193desc").textContent = "Currently: "+shortenMoney(Decimal.pow(1.03, player.eternities).min("1e13000"))+"x"
        document.getElementById("212desc").textContent = "Currently: "+((Math.pow(player.timeShards.max(2).log2(), 0.005)-1)*100).toFixed(2)+"%"
        document.getElementById("214desc").textContent = "Currently: "+shortenMoney(((calcTotalSacrificeBoost().pow(8)).min("1e46000").times(calcTotalSacrificeBoost().pow(1.1)).div(calcTotalSacrificeBoost())).max(1).min(new Decimal("1e125000")))+"x"
        document.getElementById("metaCost").textContent = shortenCosts(1e24);

        var ec1Mult=player.aarexModifications.newGameExpVersion?1e3:2e4
        if (player.etercreq !== 1) document.getElementById("ec1unl").innerHTML = "Eternity Challenge 1<span>Requirement: "+(ECTimesCompleted("eterc1")+1)*ec1Mult+" Eternities<span>Cost: 30 Time Theorems"
        else document.getElementById("ec1unl").innerHTML = "Eternity Challenge 1<span>Cost: 30 Time Theorems"
        if (player.etercreq !== 2) document.getElementById("ec2unl").innerHTML = "Eternity Challenge 2<span>Requirement: "+(1300+(ECTimesCompleted("eterc2")*150))+" Tickspeed upgrades gained from time dimensions<span>Cost: 35 Time Theorems"
        else document.getElementById("ec2unl").innerHTML = "Eternity Challenge 2<span>Cost: 35 Time Theorems"
        if (player.etercreq !== 3) document.getElementById("ec3unl").innerHTML = "Eternity Challenge 3<span>Requirement: "+(17300+(ECTimesCompleted("eterc3")*1250))+" 8th dimensions<span>Cost: 40 Time Theorems"
        else document.getElementById("ec3unl").innerHTML = "Eternity Challenge 3<span>Cost: 40 Time Theorems"
        if (player.etercreq !== 4) document.getElementById("ec4unl").innerHTML = "Eternity Challenge 4<span>Requirement: "+(1e8 + (ECTimesCompleted("eterc4")*5e7)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+" infinities<span>Cost: 70 Time Theorems"
        else document.getElementById("ec4unl").innerHTML = "Eternity Challenge 4<span>Cost: 70 Time Theorems"
        if (player.etercreq !== 5) document.getElementById("ec5unl").innerHTML = "Eternity Challenge 5<span>Requirement: "+(160+(ECTimesCompleted("eterc5")*14))+" galaxies<span>Cost: 130 Time Theorems"
        else document.getElementById("ec5unl").innerHTML = "Eternity Challenge 5<span>Cost: 130 Time Theorems"
        if (player.etercreq !== 6) document.getElementById("ec6unl").innerHTML = "Eternity Challenge 6<span>Requirement: "+(40+(ECTimesCompleted("eterc6")*5))+" replicanti galaxies<span>Cost: 85 Time Theorems"
        else document.getElementById("ec6unl").innerHTML = "Eternity Challenge 6<span>Cost: 85 Time Theorems"
        if (player.etercreq !== 7) document.getElementById("ec7unl").innerHTML = "Eternity Challenge 7<span>Requirement: "+shortenCosts(new Decimal("1e500000").times(new Decimal("1e300000").pow(ECTimesCompleted("eterc7"))))+" antimatter <span>Cost: 115 Time Theorems"
        else document.getElementById("ec7unl").innerHTML = "Eternity Challenge 7<span>Cost: 115 Time Theorems"
        if (player.etercreq !== 8) document.getElementById("ec8unl").innerHTML = "Eternity Challenge 8<span>Requirement: "+shortenCosts(new Decimal("1e4000").times(new Decimal("1e1000").pow(ECTimesCompleted("eterc8"))))+" IP <span>Cost: 115 Time Theorems"
        else document.getElementById("ec8unl").innerHTML = "Eternity Challenge 8<span>Cost: 115 Time Theorems"
        if (player.etercreq !== 9) document.getElementById("ec9unl").innerHTML = "Eternity Challenge 9<span>Requirement: "+shortenCosts(new Decimal("1e17500").times(new Decimal("1e2000").pow(ECTimesCompleted("eterc9"))))+" infinity power<span>Cost: 415 Time Theorems"
        else document.getElementById("ec9unl").innerHTML = "Eternity Challenge 9<span>Cost: 415 Time Theorems"
        if (player.etercreq !== 10) document.getElementById("ec10unl").innerHTML = "Eternity Challenge 10<span>Requirement: "+shortenCosts(new Decimal("1e100").times(new Decimal("1e20").pow(ECTimesCompleted("eterc10"))))+" EP<span>Cost: 550 Time Theorems"
        else document.getElementById("ec10unl").innerHTML = "Eternity Challenge 10<span>Cost: 550 Time Theorems"

        document.getElementById("ec11unl").innerHTML = "Eternity Challenge 11<span>Requirement: Use only the Normal Dimension path<span>Cost: 1 Time Theorem"
        document.getElementById("ec12unl").innerHTML = "Eternity Challenge 12<span>Requirement: Use only the Time Dimension path<span>Cost: 1 Time Theorem"

        if (player.dilation.studies.includes(1)) document.getElementById("dilstudy1").innerHTML = "Unlock time dilation<span>Cost: 5000 Time Theorems"
        else document.getElementById("dilstudy1").innerHTML = "Unlock time dilation<span>Requirement: 5 EC11 and EC12 completions and 13000 total theorems<span>Cost: 5000 Time Theorems"
    }
    if (document.getElementById("ers_timestudies").style.display == "block" && document.getElementById("eternitystore").style.display == "block") updateERSTTDesc()
}

function getPostC3RewardMult() {
	let perGalaxy = 0.005;
	if (player.tickspeedBoosts != undefined) perGalaxy = 0.002
	if (inQC(2)) perGalaxy = 0
	if (!player.galacticSacrifice) return player.galaxies*perGalaxy+1.05
	if (player.challenges.length > 15) perGalaxy = -0.01+0.001*player.challenges.length
	var realnormalgalaxies = player.galaxies
	if (player.masterystudies) realnormalgalaxies = Math.max(player.galaxies-player.quantum.electrons.sacGals,0)
	if (GUBought("rg4")) realnormalgalaxies *= 0.4
	if (player.masterystudies) if (player.masterystudies.includes('t311')) realnormalgalaxies *= 0.5
	perGalaxy *= getGalaxyPowerEff()
	let ret = getGalaxyPower(realnormalgalaxies)*perGalaxy+1.05
	if (player.currentChallenge=="challenge6"||player.currentChallenge=="postc1") ret -= 0.05
	else if (player.tickspeedBoosts != undefined) ret -= 0.03
	return ret
}

function getPostC3RewardStart() {
	let power = player.totalTickGained*getEC14Power()
	if (player.tickspeedBoosts !== undefined) power += player.tickspeedBoosts*10
	return Decimal.pow(getPostC3RewardMult(),power)
}

// Replicanti stuff
function unlockReplicantis() {
    if (player.infinityPoints.gte(1e140)) {
        document.getElementById("replicantidiv").style.display="inline-block"
        document.getElementById("replicantiunlock").style.display="none"
        player.replicanti.unl = true
        player.replicanti.amount = new Decimal(1)
        player.infinityPoints = player.infinityPoints.minus(1e140)
    }
}

function getReplMult(next) {
	let exp = 2
	if (player.boughtDims) {
		exp += (player.timestudy.ers_studies[3] + (next ? 1 : 0)) / 2
		if (player.achievements.includes('r108')) exp *= 1.09;
	}
	let replmult = Decimal.pow(Math.max(player.replicanti.amount.log(2), 1), exp)
    if (player.timestudy.studies.includes(21)) replmult = replmult.plus(Decimal.pow(player.replicanti.amount, 0.032))
    if (player.timestudy.studies.includes(102)) replmult = replmult.times(Decimal.pow(5, player.replicanti.galaxies))
	return replmult;
}

function upgradeReplicantiChance() {
    if (player.infinityPoints.gte(player.replicanti.chanceCost) && isChanceAffordable() && player.eterc8repl !== 0) {
        player.infinityPoints = player.infinityPoints.minus(player.replicanti.chanceCost)
        player.replicanti.chanceCost = player.replicanti.chanceCost.times(1e15)
        player.replicanti.chance += 0.01
        if (player.currentEternityChall == "eterc8") player.eterc8repl-=1
        document.getElementById("eterc8repl").textContent = "You have "+player.eterc8repl+" purchases left."
    }
}

function isChanceAffordable() {
	return (player.masterystudies ? player.masterystudies.includes("t265") : false) || player.replicanti.chance < 1
}

function upgradeReplicantiInterval() {
    if (player.infinityPoints.gte(player.replicanti.intervalCost) && isIntervalAffordable() && player.eterc8repl !== 0) {
        player.infinityPoints = player.infinityPoints.minus(player.replicanti.intervalCost)
        player.replicanti.interval *= 0.9
        if (player.replicanti.interval < 1) player.replicanti.intervalCost = Decimal.pow("1e800",1/player.replicanti.interval)
        else player.replicanti.intervalCost = player.replicanti.intervalCost.times(1e10)
        if (!isIntervalAffordable()) player.replicanti.interval = (player.timestudy.studies.includes(22) || player.boughtDims ? 1 : 50)
        if (player.currentEternityChall == "eterc8") player.eterc8repl-=1
        document.getElementById("eterc8repl").textContent = "You have "+player.eterc8repl+" purchases left."
    }
}

function getReplicantiLimit() {
	if (player.boughtDims) return player.replicanti.limit
	return Number.MAX_VALUE
}

function isIntervalAffordable() {
	if (player.masterystudies) if (player.masterystudies.includes("t271")) return true
	return player.replicanti.interval > (player.timestudy.studies.includes(22) || player.boughtDims ? 1 : 50)
}

function upgradeReplicantiGalaxy() {
    let cost = player.replicanti.galCost
    if (player.timestudy.studies.includes(233)) cost = cost.dividedBy(player.replicanti.amount.pow(0.3))
    if (player.infinityPoints.gte(cost) && player.eterc8repl !== 0) {
        player.infinityPoints = player.infinityPoints.minus(cost)
        if (player.currentEternityChall == "eterc6") player.replicanti.galCost = player.replicanti.galCost.times(Decimal.pow(1e2, player.replicanti.gal+1))
        else player.replicanti.galCost = player.replicanti.galCost.times(Decimal.pow(1e5, player.replicanti.gal + 5))
        if (player.replicanti.gal >= 100) player.replicanti.galCost = player.replicanti.galCost.times(Decimal.pow(1e50, player.replicanti.gal - 95))
        var isReduced = player.masterystudies ? player.masterystudies.includes("t266") : false
        if (player.replicanti.gal >= 400) {
            if (isReduced) player.replicanti.galCost = player.replicanti.galCost = player.replicanti.galCost.times(Decimal.pow("1e3000", player.replicanti.gal - 395))
            else player.replicanti.galCost = player.replicanti.galCost.times(Decimal.pow(1e5, Math.floor(Math.pow(1.2, player.replicanti.gal - 395))))
        }
        player.replicanti.gal += 1
        if (player.replicanti.gal >= 3e3) player.replicanti.galCost = player.replicanti.galCost.times(Decimal.pow("1e10000", player.replicanti.gal - 2995))
        if (inQC(5)) player.replicanti.galCost = Decimal.pow(1e170, Math.pow(1.2, player.replicanti.gal))
        if (player.currentEternityChall == "eterc8") player.eterc8repl-=1
        document.getElementById("eterc8repl").textContent = "You have "+player.eterc8repl+" purchases left."
        return true
    }
    return false
}

var extraReplGalaxies = 0
function replicantiGalaxy() {
	var maxGal=Math.floor(player.replicanti.gal*(player.timestudy.studies.includes(131)?1.5:1))
	if (player.replicanti.amount.lt(getReplicantiLimit())||player.replicanti.galaxies==maxGal) return
	player.replicanti.galaxies=Math.min(player.galaxyMaxBulk?1/0:player.replicanti.galaxies+1,maxGal)
	player.replicanti.amount=Decimal.div(player.achievements.includes("r126")?player.replicanti.amount:1,Number.MAX_VALUE).max(1)
	player.galaxies-=1
	galaxyReset()
}

function updateExtraReplGalaxies() {
	let ts225Eff = 0
    let ts226Eff = 0
    if (player.timestudy.studies.includes(225)) {
        ts225Eff = Math.floor(player.replicanti.amount.e / 1e3)
        if (ts225Eff > 99) ts225Eff = Math.floor(Math.sqrt(0.25 + 2 * (ts225Eff - 99) * (QCIntensity(8) > 1 ? 4 : QCIntensity(8) ? 3 : 1)) + 98.5)
    }
    if (player.timestudy.studies.includes(226)) {
        ts226Eff = Math.floor(player.replicanti.gal / 15)
        if (ts226Eff > 99) ts226Eff = Math.floor(Math.sqrt(0.25 + 2 * (ts226Eff - 99) * (QCIntensity(8) > 1 ? 4 : QCIntensity(8) ? 3 : 1)) + 98.5)
    }
    extraReplGalaxies = ts225Eff + ts226Eff
    if (extraReplGalaxies > 325) extraReplGalaxies = (Math.sqrt(0.8836+0.24*(extraReplGalaxies-324))-0.94)/0.12+324
    extraReplGalaxies = Math.floor(extraReplGalaxies * colorBoosts.g)
}

function updateMilestones() {
    var moreUnlocked = player.masterystudies && player.dilation.upgrades.includes("ngpp2")
    var milestoneRequirements = [1, 2, 3, 4, 5, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 25, 30, 40, 50, 60, 80, 100, 1e9, 2e10, 4e11, 1e13]
    for (i=0; i<(moreUnlocked?28:24); i++) {
        var name = "reward" + i;
        if (i > 23) document.getElementById("milestone" + i).textContent = shortenMoney(milestoneRequirements[i]) + " Eternities:"
        if (player.eternities >= milestoneRequirements[i]) {
            document.getElementById(name).className = "milestonereward"
        } else {
            document.getElementById(name).className = "milestonerewardlocked"
        }
    }
    document.getElementById("mdmilestones").style.display = moreUnlocked ? "" : "none"
}

function replicantiGalaxyAutoToggle() {
    if (player.replicanti.galaxybuyer) {
        player.replicanti.galaxybuyer = false
        if (player.timestudy.studies.includes(131)&&speedrunMilestonesReached<20) document.getElementById("replicantiresettoggle").textContent = "Auto galaxy OFF (disabled)"
        else document.getElementById("replicantiresettoggle").textContent = "Auto galaxy OFF"
    } else {
        player.replicanti.galaxybuyer = true
        if (player.timestudy.studies.includes(131)&&speedrunMilestonesReached<20) document.getElementById("replicantiresettoggle").textContent = "Auto galaxy ON (disabled)"
        else document.getElementById("replicantiresettoggle").textContent = "Auto galaxy ON"
    }
}

function infMultAutoToggle() {
    if (player.infMultBuyer) {
        player.infMultBuyer = false
        document.getElementById("infmultbuyer").textContent = "Autobuy IP mult OFF"
    } else {
        player.infMultBuyer = true
        document.getElementById("infmultbuyer").textContent = "Autobuy IP mult ON"
    }
}


function toggleCrunchMode(freeze) {
    if (player.autoCrunchMode == "amount") {
        player.autoCrunchMode = "time"
        document.getElementById("togglecrunchmode").textContent = "Auto crunch mode: time"
        document.getElementById("limittext").textContent = "Seconds between crunches:"
    } else if (player.autoCrunchMode == "time"){
        player.autoCrunchMode = "relative"
        document.getElementById("togglecrunchmode").textContent = "Auto crunch mode: X times last crunch"
        document.getElementById("limittext").textContent = "X times last crunch:"
    } else if (player.autoCrunchMode == "relative" && player.boughtDims){
        player.autoCrunchMode = "replicanti"
        document.getElementById("togglecrunchmode").innerHTML = "Auto crunch mode: replicated galaxies"
        document.getElementById("limittext").innerHTML = "Replicanti galaxies needed for crunch:"
        document.getElementById("maxReplicantiCrunchSwitchDiv").style.display = 'inline'
    } else {
        player.autoCrunchMode = "amount"
        document.getElementById("togglecrunchmode").textContent = "Auto crunch mode: amount"
        document.getElementById("limittext").textContent = "Amount of IP to wait until reset:"
        document.getElementById("maxReplicantiCrunchSwitchDiv").style.display = 'none'
        if (!freeze&&player.autobuyers[11].priority.toString().toLowerCase()=="max") {
            player.autobuyers[11].priority = new Decimal(1)
            document.getElementById("priority12").value=1
        }
    }
}

function toggleEternityConf() {
    player.options.eternityconfirm = !player.options.eternityconfirm
    document.getElementById("eternityconf").textContent = "Eternity confirmation: O" + (player.options.eternityconfirm ? "N" : "FF")
}

function toggleDilaConf() {
    player.aarexModifications.dilationConf = !player.aarexModifications.dilationConf
    document.getElementById("dilationConfirmBtn").textContent = "Dilation confirmation: O" + (player.aarexModifications.dilationConf ? "N" : "FF")
}


function toggleReplAuto(i) {
    if (i == "chance") {
        if (player.replicanti.auto[0]) {
            player.replicanti.auto[0] = false
            document.getElementById("replauto1").textContent = "Auto: OFF"
        } else {
            player.replicanti.auto[0] = true
            document.getElementById("replauto1").textContent = "Auto: ON"
        }
    } else if (i == "interval") {
        if (player.replicanti.auto[1]) {
            player.replicanti.auto[1] = false
            document.getElementById("replauto2").textContent = "Auto: OFF"
        } else {
            player.replicanti.auto[1] = true
            document.getElementById("replauto2").textContent = "Auto: ON"
        }
    } else if (i == "galaxy") {
        if (player.replicanti.auto[2]) {
            player.replicanti.auto[2] = false
            document.getElementById("replauto3").textContent = "Auto: OFF"
        } else {
            player.replicanti.auto[2] = true
            document.getElementById("replauto3").textContent = "Auto: ON"
        }
    }
}






buyAutobuyer = function(id) {
    if (player.infinityPoints.lt(player.autobuyers[id].cost)) return false;
    if (player.autobuyers[id].bulk >= 1e100) return false;
    player.infinityPoints = player.infinityPoints.minus(player.autobuyers[id].cost);
    if (player.autobuyers[id].interval <= 100) {
        player.autobuyers[id].bulk = Math.min(player.autobuyers[id].bulk * 2, 1e100);
        player.autobuyers[id].cost = Math.ceil(2.4*player.autobuyers[id].cost);
        var b1 = true;
	    for (let i=0;i<8;i++) {
            if (player.autobuyers[i].bulk < 512) b1 = false;
        }
        if (b1) giveAchievement("Bulked up");
    } else {
        player.autobuyers[id].interval = Math.max(player.autobuyers[id].interval*0.6, 100);
        if (player.autobuyers[id].interval > 120) player.autobuyers[id].cost *= 2; //if your last purchase wont be very strong, dont double the cost
    }
    updateAutobuyers();
}

document.getElementById("buyerBtn1").onclick = function () {
    buyAutobuyer(0);
}

document.getElementById("buyerBtn2").onclick = function () {

    buyAutobuyer(1);
}

document.getElementById("buyerBtn3").onclick = function () {
    buyAutobuyer(2);
}

document.getElementById("buyerBtn4").onclick = function () {
    buyAutobuyer(3);
}

document.getElementById("buyerBtn5").onclick = function () {
    buyAutobuyer(4);
}

document.getElementById("buyerBtn6").onclick = function () {
    buyAutobuyer(5);
}

document.getElementById("buyerBtn7").onclick = function () {
    buyAutobuyer(6);
}

document.getElementById("buyerBtn8").onclick = function () {
    buyAutobuyer(7);
}

document.getElementById("buyerBtnTickSpeed").onclick = function () {
    buyAutobuyer(8);
}

document.getElementById("buyerBtnDimBoost").onclick = function () {
    buyAutobuyer(9);
}

document.getElementById("buyerBtnGalaxies").onclick = function () {
    buyAutobuyer(10);
}

document.getElementById("buyerBtnInf").onclick = function () {
    buyAutobuyer(11);
}

toggleAutobuyerTarget = function(id) {
    if (player.autobuyers[id-1].target == id) {
        player.autobuyers[id-1].target = 10 + id
        document.getElementById("toggleBtn" + id).textContent = "Buys until 10"
    } else {
        player.autobuyers[id-1].target = id
        document.getElementById("toggleBtn" + id).textContent = "Buys singles"
    }
}

document.getElementById("toggleBtn1").onclick = function () {
    toggleAutobuyerTarget(1)
}

document.getElementById("toggleBtn2").onclick = function () {
    toggleAutobuyerTarget(2)
}

document.getElementById("toggleBtn3").onclick = function () {
    toggleAutobuyerTarget(3)
}

document.getElementById("toggleBtn4").onclick = function () {
    toggleAutobuyerTarget(4)
}

document.getElementById("toggleBtn5").onclick = function () {
    toggleAutobuyerTarget(5)
}

document.getElementById("toggleBtn6").onclick = function () {
    toggleAutobuyerTarget(6)
}

document.getElementById("toggleBtn7").onclick = function () {
    toggleAutobuyerTarget(7)
}

document.getElementById("toggleBtn8").onclick = function () {
    toggleAutobuyerTarget(8)
}

document.getElementById("toggleBtnTickSpeed").onclick = function () {
    if (player.autobuyers[8].target == 1) {
        player.autobuyers[8].target = 10
        document.getElementById("toggleBtnTickSpeed").textContent = "Buys max"
    } else {
        player.autobuyers[8].target = 1
        document.getElementById("toggleBtnTickSpeed").textContent = "Buys singles"
    }
}















document.getElementById("secondSoftReset").onclick = function() {
    if (player.currentEternityChall == "eterc6" || inQC(6)) return
    var bool = player.currentChallenge != "challenge11" && player.currentChallenge != "postc1" && player.currentChallenge != "postc7" && !inQC(6) && (player.break || player.money.lte(Number.MAX_VALUE))
    if (player[(player.currentChallenge == "challenge4" ? "sixth" : "eight") + "Bought"] >= getGalaxyRequirement() && bool) {
        if (player.eternities >= 7 && !shiftDown) maxBuyGalaxies(true);
        else galaxyReset();
    }
}


function galaxyReset() {

    if (autoS) auto = false;
    autoS = true;
    if (player.sacrificed == 0) giveAchievement("I don't believe in Gods");
    if (player.tickspeedBoosts !== undefined) player.tickspeedBoosts = 0
    player = {
        money: player.achievements.includes("r111") ? player.money : new Decimal(10),
        tickSpeedCost: new Decimal(1000),
        tickspeed: new Decimal(player.aarexModifications.newGameExpVersion?500:1000),
        tickBoughtThisInf: updateTBTIonGalaxy(),
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
        boughtDims: player.boughtDims,
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
        currentChallenge: player.currentChallenge,
        infinityUpgrades: player.infinityUpgrades,
        infinityPoints: player.infinityPoints,
        infinitied: player.infinitied,
        infinitiedBank: player.infinitiedBank,
        totalTimePlayed: player.totalTimePlayed,
        bestInfinityTime: player.bestInfinityTime,
        thisInfinityTime: player.thisInfinityTime,
        resets: 0,
        dbPower: player.dbPower ? new Decimal(1) : undefined,
        tickspeedBoosts: player.tickspeedBoosts,
        galaxies: player.galaxies + 1,
        galacticSacrifice: player.galacticSacrifice,
        totalmoney: player.totalmoney,
        tickDecrease: player.tickDecrease - 0.03,
        interval: null,
        lastUpdate: player.lastUpdate,
        achPow: player.achPow,
        newsArray: player.newsArray,
        autobuyers: player.autobuyers,
        costMultipliers: [new Decimal(1e3), new Decimal(1e4), new Decimal(1e5), new Decimal(1e6), new Decimal(1e8), new Decimal(1e10), new Decimal(1e12), new Decimal(1e15)],
        tickspeedMultiplier: new Decimal(10),
        chall2Pow: player.chall2Pow,
        chall3Pow: new Decimal(0.01),
        matter: new Decimal(0),
        chall11Pow: new Decimal(1),
        partInfinityPoint: player.partInfinityPoint,
        partInfinitied: player.partInfinitied,
        break: player.break,
        challengeTimes: player.challengeTimes,
        infchallengeTimes: player.infchallengeTimes,
        lastTenRuns: player.lastTenRuns,
        lastTenEternities: player.lastTenEternities,
        infMult: player.infMult,
        infMultCost: player.infMultCost,
        tickSpeedMultDecrease: player.tickSpeedMultDecrease,
        tickSpeedMultDecreaseCost: player.tickSpeedMultDecreaseCost,
        dimensionMultDecrease: player.dimensionMultDecrease,
        dimensionMultDecreaseCost: player.dimensionMultDecreaseCost,
        extraDimPowerIncrease: player.extraDimPowerIncrease,
        dimPowerIncreaseCost: player.dimPowerIncreaseCost,
        version: player.version,
        overXGalaxies: player.overXGalaxies,
        spreadingCancer: player.spreadingCancer,
        infDimensionsUnlocked: player.infDimensionsUnlocked,
        infinityPower: player.infinityPower,
        postChallUnlocked: player.postChallUnlocked,
        postC4Tier: 1,
        postC3Reward: getPostC3RewardStart(),
        postC8Mult: new Decimal(1),
        infinityDimension1: player.infinityDimension1,
        infinityDimension2: player.infinityDimension2,
        infinityDimension3: player.infinityDimension3,
        infinityDimension4: player.infinityDimension4,
        infinityDimension5: player.infinityDimension5,
        infinityDimension6: player.infinityDimension6,
        infinityDimension7: player.infinityDimension7,
        infinityDimension8: player.infinityDimension8,
        infDimBuyers: player.infDimBuyers,
        timeShards: player.timeShards,
        tickThreshold: player.tickThreshold,
        timeDimension1: player.timeDimension1,
        timeDimension2: player.timeDimension2,
        timeDimension3: player.timeDimension3,
        timeDimension4: player.timeDimension4,
        timeDimension5: player.timeDimension5,
        timeDimension6: player.timeDimension6,
        timeDimension7: player.timeDimension7,
        timeDimension8: player.timeDimension8,
        eternityPoints: player.eternityPoints,
        eternities: player.eternities,
        thisEternity: player.thisEternity,
        bestEternity: player.bestEternity,
        eternityUpgrades: player.eternityUpgrades,
        epmult: player.epmult,
        epmultCost: player.epmultCost,
        totalTickGained: player.totalTickGained,
        offlineProd: player.offlineProd,
        offlineProdCost: player.offlineProdCost,
        challengeTarget: player.challengeTarget,
        autoSacrifice: player.autoSacrifice,
        replicanti: player.replicanti,
        timestudy: player.timestudy,
        eternityChalls: player.eternityChalls,
        eternityChallGoal: player.eternityChallGoal,
        currentEternityChall: player.currentEternityChall,
        eternityChallUnlocked: player.eternityChallUnlocked,
        etercreq: player.etercreq,
        autoIP: player.autoIP,
        autoTime: player.autoTime,
        infMultBuyer: player.infMultBuyer,
        autoCrunchMode: player.autoCrunchMode,
        autoEterMode: player.autoEterMode,
        peakSpent: player.peakSpent,
        respec: player.respec,
        respecOptions: player.respecOptions,
        eternityBuyer: player.eternityBuyer,
        eterc8ids: player.eterc8ids,
        eterc8repl: player.eterc8repl,
        dimlife: player.dimlife,
        dead: player.dead,
        dilation: player.dilation,
        why: player.why,
        options: player.options,
        meta: player.meta,
        masterystudies: player.masterystudies,
        autoEterOptions: player.autoEterOptions,
        galaxyMaxBulk: player.galaxyMaxBulk,
        quantum: player.quantum,
        old: player.old,
        aarexModifications: player.aarexModifications
    };

    if (player.currentChallenge == "challenge10" || player.currentChallenge == "postc1") {
        player.thirdCost = new Decimal(100)
        player.fourthCost = new Decimal(500)
        player.fifthCost = new Decimal(2500)
        player.sixthCost = new Decimal(2e4)
        player.seventhCost = new Decimal(2e5)
        player.eightCost = new Decimal(4e6)
    }
    reduceDimCosts()
    if (player.resets == 0 && player.currentChallenge == "") {
        if (player.infinityUpgrades.includes("skipReset1")) player.resets++;
        if (player.infinityUpgrades.includes("skipReset2")) player.resets++;
        if (player.infinityUpgrades.includes("skipReset3")) player.resets++;
        if (player.infinityUpgrades.includes("skipResetGalaxy")) {
            player.resets++;
            if (player.galaxies == 0) player.galaxies = 1
        }
    }
    if (player.currentChallenge == "postc2") {
        player.eightAmount = new Decimal(1);
        player.eightBought = 1;
        player.resets = 4;
    }
	
    setInitialDimensionPower();


    if (player.options.notation == "Emojis") player.spreadingCancer+=1;
    if (player.spreadingCancer >= 10) giveAchievement("Spreading Cancer")
    if (player.spreadingCancer >= 1000000) giveAchievement("Cancer = Spread")
    if (player.achievements.includes("r36")) player.tickspeed = player.tickspeed.times(0.98);
    if (player.achievements.includes("r45")) player.tickspeed = player.tickspeed.times(0.98);
    if (player.achievements.includes("r83")) player.tickspeed = player.tickspeed.times(Decimal.pow(0.95,player.galaxies));

    if (player.infinitied < 1 && player.eternities == 0 && !quantumed) {
        document.getElementById("sacrifice").style.display = "none"
        document.getElementById("confirmation").style.display = "none"
        if (player.galacticSacrifice && (player.galaxies > 0 || (player.galacticSacrifice ? player.galacticSacrifice.times > 0 : false))) {
            document.getElementById("gSacrifice").style.display = "inline-block"
            document.getElementById("gConfirmation").style.display = "inline-block"
        }
    }
    if (player.eternities < 30) {
        document.getElementById("secondRow").style.display = "none";
        document.getElementById("thirdRow").style.display = "none";
        document.getElementById("tickSpeed").style.visibility = "hidden";
        document.getElementById("tickSpeedMax").style.visibility = "hidden";
        document.getElementById("tickLabel").style.visibility = "hidden";
        document.getElementById("tickSpeedAmount").style.visibility = "hidden";
        document.getElementById("fourthRow").style.display = "none";
        document.getElementById("fifthRow").style.display = "none";
        document.getElementById("sixthRow").style.display = "none";
        document.getElementById("seventhRow").style.display = "none";
        document.getElementById("eightRow").style.display = "none";
    }

    if (player.galaxies >= 50) giveAchievement("YOU CAN GET 50 GALAXIES!??")
    if (player.galaxies >= 2) giveAchievement("Double Galaxy");
    if (player.galaxies >= 1) giveAchievement("You got past The Big Wall");
    if (player.challenges.includes("challenge1")) player.money = new Decimal(100).max(player.money)
    if (player.achievements.includes("r37")) player.money = new Decimal(1000).max(player.money);
    if (player.achievements.includes("r54")) player.money = new Decimal(2e5).max(player.money);
    if (player.achievements.includes("r55")) player.money = new Decimal(1e10).max(player.money);
    if (player.achievements.includes("r78")) player.money = new Decimal(1e25).max(player.money);
    player.tickspeed = player.tickspeed.times(Decimal.pow(getTickSpeedMultiplier(), player.totalTickGained))
    if (player.achievements.includes("r66")) player.tickspeed = player.tickspeed.times(0.98);
    if (player.galaxies >= 540 && player.replicanti.galaxies == 0) giveAchievement("Unique snowflakes")
    giveAchievement("Universal harmony")
    updateTickSpeed();
};

document.getElementById("exportbtn").onclick = function () {
    let output = document.getElementById('exportOutput');
    let parent = output.parentElement;

    parent.style.display = "";
    output.value = btoa(JSON.stringify(player, function(k, v) { return (v === Infinity) ? "Infinity" : v; }));

    output.onblur = function() {
        parent.style.display = "none";
    }

    output.focus();
    output.select();

    try {
        if (document.execCommand('copy')) {
            $.notify("Exported save #"+metaSave.current+" to clipboard", "info");
            output.blur();
        }
    } catch(ex) {
        // well, we tried.
    }
};

var exportSaveId
var exportAllData
var exportAllLoopId
var occupiedEA
document.getElementById("exportallbtn").onclick = function () {
	clearInterval(exportAllLoopId)
	exportSaveId=0
	exportAllData = {save_datas:[], metaSave: metaSave}
	occupiedEA=false
	if (!confirm("WARNING! This action would use all your CPU to export all your saves after a while! Are you really sure you want to do that?!")) return
	exportAllLoopId = setInterval(function() {
		if (occupiedEA) return
		else occupiedEA=true
		try {
			if (exportSaveId<metaSave.saveOrder.length) {
				exportAllData.save_datas.push(get_save(metaSave.saveOrder[exportSaveId]))
				exportSaveId++
				occupiedEA=false
				return
			}
			let output = document.getElementById('exportOutput');
			let parent = output.parentElement;

			parent.style.display = "";
			output.value = btoa(JSON.stringify(exportAllData, function(k, v) { return (v === Infinity) ? "Infinity" : v; }));

			output.onblur = function() {
				parent.style.display = "none";
			}

			output.focus();
			output.select();

			if (document.execCommand('copy')) {
				$.notify("Exported saves to clipboard", "info");
				output.blur();
			}
			clearInterval(exportAllLoopId)
		} catch(ex) {
			// well, we tried.
		}
	},player.options.updateRate)
};


document.getElementById("save").onclick = function () {
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
	closeToolTip();
	if (metaSave.alert) {
		metaSave.alert=false
		localStorage.setItem("AD_aarexModifications",btoa(JSON.stringify(metaSave)))
	}
	document.getElementById("loadmenu").style.display = "block";
	changeSaveDesc(metaSave.current, savePlacement)
	clearInterval(loadSavesIntervalId)
	occupied=false
	loadSavesIntervalId=setInterval(function(){
		if (occupied) return
		else occupied=true
		if (loadedSaves==metaSave.saveOrder.length) {
			clearInterval(loadSavesIntervalId)
			return
		} else if (!onLoading) {
			latestRow=document.getElementById("saves").insertRow(loadedSaves)
			onLoading=true
		}
		try {
			var id=metaSave.saveOrder[loadedSaves]
			latestRow.innerHTML=getSaveLayout(id)
			changeSaveDesc(id, loadedSaves+1)
			loadedSaves++
			onLoading=false
		} catch (_) {}
		occupied=false
	}, 0)
}

document.getElementById("load").onclick = function () {
	if (metaSave.alert) {
		closeToolTip()
		document.getElementById("sorry").style.display = "inline-block"
	} else load_saves()
};

function getSaveLayout(id) {
	return "<b id='save_"+id+"_title'>Save #"+(loadedSaves+1)+"</b><div id='save_"+id+"_desc'></div><button class='storebtn' onclick='overwrite_save("+id+")'>Save</button><button class='storebtn' onclick='change_save("+id+")'>Load</button><button class='storebtn' onclick='rename_save("+id+")'>Rename</button><button class='storebtn' onclick='move("+id+",-1)'>Move up</button><button class='storebtn' onclick='move("+id+",1)'>Move down</button><button class='storebtn' onclick='delete_save("+id+")'>Delete</button>"
}

function changeSaveDesc(saveId, placement) {
	var element=document.getElementById("save_"+saveId+"_desc")
	if (element==undefined) return
	try {
		var isSaveCurrent=metaSave.current==saveId
		var temp=isSaveCurrent?player:get_save(saveId)
		if (temp.aarexModifications==null) temp.aarexModifications={}
		var message=""
		if (temp.aarexModifications.newGameMinusVersion&&temp.meta&&temp.galacticSacrifice&&temp.masterystudies) message="NG"+(temp.tickspeedBoosts==undefined?"":"-")+"+-+-+, "+(temp.aarexModifications.newGamePlusVersion?"":"No NG+ features, ")
		else {
			if (temp.aarexModifications.newGameMinusVersion) message+="NG-, "
			if (temp.galacticSacrifice) message+="NG--"+(temp.tickspeedBoosts!=undefined?"-":"")+", "
			if (temp.boughtDims) message+="Eternity Respecced, "
			if (temp.aarexModifications.newGameExpVersion) message+="NG^, "
			if (temp.meta) message+="NG++"+(temp.masterystudies?"+":"")+", "+(temp.aarexModifications.newGamePlusVersion?"":"No NG+ features, ")
			else if (temp.aarexModifications.newGamePlusVersion) message+="NG+, "
		}
		message+=isSaveCurrent?"Selected<br>":"Played for "+timeDisplayShort(temp.totalTimePlayed)+"<br>"
		var originalBreak=player.break
		var originalNotation=player.options.notation
		var originalCommas=player.options.commas
		if (!isSaveCurrent) {
			player.break=temp.achievements.includes("r51")
			player.options.notation=temp.options.notation
			player.options.commas=temp.options.commas
		}
		var isSaveQuantumed=temp.quantum?temp.quantum.times>0:false
		if (isSaveQuantumed) {
			if (!temp.masterystudies) message+="End-game of NG++"
			else {
				message+="Quarks: "+shortenDimensions(Decimal.add(temp.quantum.quarks,temp.quantum.usedQuarks.r).add(temp.quantum.usedQuarks.g).add(temp.quantum.usedQuarks.b))
				if (temp.quantum.gluons.rg) message+=", Gluons: "+shortenDimensions(Decimal.add(temp.quantum.gluons.rg,temp.quantum.gluons.gb).add(temp.quantum.gluons.br))
				if (temp.masterystudies.includes('d9')) message+=", Paired challenges: "+temp.quantum.pairedChallenges.completed
				else if (temp.masterystudies.includes('d8')) {
					var completions=0
					if (typeof(temp.quantum.challenges)=="number") completions=temp.quantum.challenges
					else for (c=1;c<9;c++) if (temp.quantum.challenges[c]) completions++
					message+=", Challenge completions: "+completions
				} else if (temp.masterystudies.includes('d7')) message+=", Electrons: "+shortenDimensions(temp.quantum.electrons.amount)
			}
		} else if (temp.dilation?temp.dilation.studies.includes(1):false) {
			var temp2="Tachyon particles: "+shortenMoney(new Decimal(temp.dilation.totalTachyonParticles))+", Dilated time: "+shortenMoney(new Decimal(temp.dilation.dilatedTime))
			if (temp.dilation.studies.includes(6)) temp2+=", Best meta-antimatter: "+shortenMoney(new Decimal(temp.meta.bestAntimatter))+", Meta-dimension shifts/boosts: "+temp.meta.resets
			else if (!temp.dilation.studies.includes(5)) temp2="Time Theorems: "+shortenMoney(getTotalTT(temp))+", "+temp2
			else if (!temp.dilation.upgrades.includes(10)) temp2="Eternity points: "+shortenDimensions(temp.eternityPoints)+", "+temp2
			message+=temp2
		} else {
			var totalChallengeCompletions=(temp.aarexModifications.newGameMinusVersion?-6:0)
			for (ec=1;ec<13;ec++) totalChallengeCompletions+=(temp.eternityChalls['eterc'+ec]?temp.eternityChalls['eterc'+ec]:0)
			if (totalChallengeCompletions>0) {
				message+="Time Theorems: "+getFullExpansion(getTotalTT(temp))+", Challenge completions: "+totalChallengeCompletions
			} else if (temp.eternities>(temp.aarexModifications.newGameMinusVersion?-20:0)) message+="Eternity points: "+shortenDimensions(new Decimal(temp.eternityPoints))+", Eternities: "+temp.eternities.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+", Time Theorems: "+getTotalTT(temp)
			else if (temp.achievements.includes("r51")) {
				message+="Antimatter: "+shortenMoney(new Decimal(temp.money))+", Infinity points: "+shortenDimensions(new Decimal(temp.infinityPoints))
				if (temp.postChallUnlocked>0&&!temp.replicanti.unlocked) {
					var totalChallengeCompletions=0
					for (ic=1;ic<13;ic++) totalChallengeCompletions+=temp.challenges.includes("postc"+ic)?1:0
					message+=", Challenge completions: "+totalChallengeCompletions
				}
			} else if (temp.infinitied>(temp.aarexModifications.newGameMinusVersion?990:temp.aarexModifications.newGamePlusVersion?1:0)) message+="Infinity points: "+shortenDimensions(new Decimal(temp.infinityPoints))+", Infinities: "+temp.infinitied.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+", Challenge completions: "+temp.challenges.length
			else if (temp.galacticSacrifice?temp.galacticSacrifice.times>0:false) message+="Antimatter: "+shortenMoney(new Decimal(temp.money))+", Galaxy points: "+shortenDimensions(new Decimal(temp.galacticSacrifice.galaxyPoints))
			else message+="Antimatter: "+shortenMoney(new Decimal(temp.money))+", Dimension shifts/boosts: "+temp.resets+((temp.tickspeedBoosts != undefined ? (temp.resets > 0 || temp.tickspeedBoosts > 0 || temp.galaxies > 0 || temp.infinitied > 0 || temp.eternities != 0 || isSaveQuantumed) : false)?", Tickspeed boosts: "+getFullExpansion(temp.tickspeedBoosts):"")+", Galaxies: "+temp.galaxies
		}
		player.break=originalBreak
		player.options.notation=originalNotation
		player.options.commas=originalCommas

		document.getElementById("save_"+saveId+"_title").textContent=temp.aarexModifications.save_name?temp.aarexModifications.save_name:"Save #"+placement
	} catch (_) {
		var message="New game"
	}
	element.innerHTML=message
}

function toggle_mode(id) {
	if (id=="ngp"&&modes[id]===2) modes[id]=3
	else if ((id=="ngp"||id=="ngpp"||id=="ngmm")&&modes[id]===true) modes[id]=2
	else modes[id]=!modes[id]
	document.getElementById(id+"Btn").textContent=(id=="ers"?"Eternity Respecced":id=="ngpp"?"NG++":id=="ngp"?"NG+":id=="ngmm"?"NG--":"NG-")+": "+(modes[id]>1?"NG"+(id=="ngp"?"^"+(modes[id]>2?"+-":""):id=="ngpp"?"+++":"---"):modes[id]?"ON":"OFF")
	if (id=="ngpp"&&modes.ngpp) {
		if (!modes.ngp) toggle_mode("ngp")
		modes.ers=0
		document.getElementById("ersBtn").textContent="Eternity Respecced: OFF"
	}
	if (id=="ers"&&modes.ers) {
		modes.ngpp=0
		document.getElementById("ngppBtn").textContent="NG++: OFF"
	}
}

document.getElementById("offlineProgress").onclick = function () {
	player.aarexModifications.offlineProgress = !player.aarexModifications.offlineProgress
	document.getElementById("offlineProgress").textContent = "Offline progress: O"+(player.aarexModifications.offlineProgress?"N":"FF")
};

document.getElementById("animationoptionsbtn").onclick = function () {
    closeToolTip();
    document.getElementById("animationoptions").style.display = "flex";
};

document.getElementById("confirmations").onclick = function () {
    closeToolTip();
    document.getElementById("confirmationoptions").style.display = "flex";
};

function showNextModeMessage() {
	if (ngModeMessages.length>0) {
		document.getElementById("welcome").style.display = "flex"
		document.getElementById("welcomeMessage").innerHTML = ngModeMessages[ngModeMessages.length-1]
		ngModeMessages.pop()
	} else document.getElementById("welcome").style.display = "none"
}

function verify_save(obj) {
    if (typeof obj != 'object') return false;


    return true;
}

var onImport = false
function import_save(new_save,in_save,no_ask) {
    if (!no_ask) {
        onImport = true
        var save_data = prompt("Input your save. "+(new_save?"":"(your current save file will be overwritten!)"));
        onImport = false
        if (save_data.constructor !== String) save_data = "";
    } else {
        save_data = in_save
    }
    if (sha512_256(save_data.replace(/\s/g, '').toUpperCase()) === "80b7fdc794f5dfc944da6a445a3f21a2d0f7c974d044f2ea25713037e96af9e3") {
        document.getElementById("body").style.animation = "barrelRoll 5s 1";
        giveAchievement("Do a barrel roll!")
        setTimeout(function(){ document.getElementById("body").style.animation = ""; }, 5000)
    }
    if (sha512_256(save_data.replace(/\s/g, '').toUpperCase()) === "857876556a230da15fe1bb6f410ca8dbc9274de47c1a847c2281a7103dd2c274") giveAchievement("So do I");
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
    }  else if (sha512_256(save_data) === "7a668b64cdfe1bcdf7a38d3858429ee21290268de66b9784afba27dc5225ce28") {
        player.options.theme = "S5";
        player.options.secretThemeKey = save_data;
        setTheme(player.options.theme);
    } else {
        var decoded_save_data = JSON.parse(atob(save_data, function(k, v) { return (v === Infinity) ? "Infinity" : v; }));
        if (!verify_save(decoded_save_data)) {
            forceHardReset = true
            document.getElementById("reset").click()
            forceHardReset = false
            return
        } else if (!decoded_save_data||!save_data) {
            alert('could not load the save..')
            return
        }
        if (new_save) {
			var newSaveId=1
			while (metaSave.saveOrder.includes(newSaveId)) newSaveId++
			metaSave.saveOrder.push(newSaveId)
			latestRow=document.getElementById("saves").insertRow(loadedSaves)
			latestRow.innerHTML = getSaveLayout(newSaveId)
			localStorage.setItem(btoa("dsAM_"+newSaveId),save_data)
			loadedSaves++
			changeSaveDesc(newSaveId, loadedSaves)
			localStorage.setItem("AD_aarexModifications",btoa(JSON.stringify(metaSave)))
			return
        }
        clearInterval(IntervalId)
        player = decoded_save_data;
        onLoad()
        startInterval()
    }
};

var importSaveId
var importAllData
var importAllLoopId
var occupiedIA
function import_save_all() {
	clearInterval(importAllLoopId)
	noSave=false
	onImport=true
	var importAllData=prompt("Input your saves. (all your save files will be overwritten!)");
	onImport=false
	importAllData=JSON.parse(atob(importAllData, function(k, v) { return (v === Infinity) ? "Infinity" : v; }))
	if (importAllData==null) return
	if (importAllData.save_datas==undefined) return
	if (importAllData.metaSave==undefined) return
	if (!confirm("WARNING! Without backups, this action would replace all your saves! Are you really sure you want to do that?!")) return
	importSaveId=0
	occupiedIA=false
	noSave=true
	importAllLoopId=setInterval(function(){
		if (occupiedIA) return
		else occupiedIA=true
		try {
			if (importSaveId<importAllData.metaSave.saveOrder.length) {
				set_save(importAllData.metaSave.saveOrder[importSaveId],importAllData.save_datas[importSaveId])
				importSaveId++
				occupiedIA=false
				return
			}
			localStorage.setItem("AD_aarexModifications",btoa(JSON.stringify(importAllData.metaSave)))
			clearInterval(importAllLoopId)
			document.location.reload(true)
		} catch(_) {
		}
	},player.updateRate)
};



document.getElementById("reset").onclick = function () {
	if (!forceHardReset) if (!confirm("Do you really want to erase all your progress?")) return
	clearInterval(gameLoopIntervalId)
	updateNewPlayer(true)
	save_game(true)
	onLoad()
	startInterval()
};


function breakInfinity() {
	if (player.autobuyers[11]%1 === 0 || player.autobuyers[11].interval>100) return false
	if (player.break && !player.currentChallenge.includes("post")) {
		player.break = false
		document.getElementById("break").textContent = "BREAK INFINITY"
	} else {
		player.break = true
		document.getElementById("break").textContent = "FIX INFINITY"
		giveAchievement("Limit Break")
	}
	if (player.galacticSacrifice) if (player.eternities==0&&player.infinityPoints.lt(Number.MAX_VALUE)&&!quantumed) {
		document.getElementById("quantumBlock").style.display=player.break?"":"none"
		document.getElementById("sacpos").className=player.break?"quantumpos":"eterpos"
		document.getElementById("galaxyPoints2").className=player.break?"QK":"EP"
	}
}

function gainedInfinityPoints(next) {
    let div = 308;
    if (player.timestudy.studies.includes(111)) div = 285;
    else if (player.achievements.includes("r103")) div = 307.8;

    var ret = Decimal.pow(10, player.money.e/div -0.75).times(player.infMult).times(kongIPMult)
    if (player.timestudy.studies.includes(41)) ret = ret.times(Decimal.pow(player.aarexModifications.newGameExpVersion?1.5:1.2, player.galaxies + player.replicanti.galaxies))
    if (player.timestudy.studies.includes(51)) ret = ret.times(player.aarexModifications.newGameExpVersion?1e30:1e15)
    if (player.timestudy.studies.includes(141)) ret = ret.times(new Decimal(1e45).dividedBy(Decimal.pow(15, Math.log(player.thisInfinityTime+1)*Math.pow(player.thisInfinityTime+1, 0.125))).max(1))
    if (player.timestudy.studies.includes(142)) ret = ret.times(1e25)
    if (player.timestudy.studies.includes(143)) ret = ret.times(Decimal.pow(15, Math.log(player.thisInfinityTime+1)*Math.pow(player.thisInfinityTime+1, 0.125)))
    if (player.achievements.includes("r116")) ret = ret.times(Decimal.pow(2, Math.log10(getInfinitied()+1)))
    if (player.achievements.includes("r125")) ret = ret.times(Decimal.pow(2, Math.log(player.thisInfinityTime+1)*Math.pow(player.thisInfinityTime+1, 0.11)))
    if (player.dilation.upgrades.includes(7)) ret = ret.times(player.dilation.dilatedTime.max(1).pow(1000))
    if (player.boughtDims) {
        ret = ret.times(Decimal.pow(Math.max(1e4/player.thisInfinityTime),player.timestudy.ers_studies[5]+(next==5?1:0)))
        ret = ret.times(Decimal.pow(player.thisInfinityTime/10,player.timestudy.ers_studies[6]+(next==6?1:0)))
    }
    return ret.floor()
}

function getIPMult() {
	let mult = player.infMult.times(kongIPMult);
	if (player.galacticSacrifice) {
		if (player.achievements.includes("r43")) mult = mult.times(1.25);
		if (player.achievements.includes("r55")) mult = mult.times(Math.max(Math.log10(6000/player.bestInfinityTime), 1));
		if (player.achievements.includes("r41")) mult = mult.times(Math.pow(Math.log10(player.spreadingCancer), .05));
		if (player.achievements.includes("r51")) {
			let galaxies = player.galaxies + player.replicanti.galaxies + player.dilation.freeGalaxies;
			if (galaxies < 5 && galaxies > 0) mult = mult.times(galaxies)
			else if (galaxies < 50) mult = mult.times(Decimal.pow(galaxies+5,0.5).plus(2))
			else mult = mult.times(Decimal.pow(galaxies,0.3).plus(7))
		}
	}
	return mult;
}

function gainedEternityPoints() {
    var ret = Decimal.pow(5, player.infinityPoints.plus(gainedInfinityPoints()).e/(player.achievements.includes("ng3p23")?307.8:308) -0.7).times(player.epmult).times(kongEPMult)
    if (player.aarexModifications.newGameExpVersion) ret = ret.times(10)
    if (player.timestudy.studies.includes(61)) ret = ret.times(player.aarexModifications.newGameExpVersion?100:10)
    if (player.timestudy.studies.includes(121)) ret = ret.times(((253 - averageEp.dividedBy(player.epmult).dividedBy(10).min(248).max(3))/5)) //x300 if tryhard, ~x60 if not
    else if (player.timestudy.studies.includes(122)) ret = ret.times(35)
    else if (player.timestudy.studies.includes(123)) ret = ret.times(Math.sqrt(1.39*player.thisEternity/10))

    return ret.floor()
}


function setAchieveTooltip() {
    var apocAchieve = document.getElementById("Antimatter Apocalypse");
    var claustrophobic = document.getElementById("Claustrophobic");
    var noPointAchieve = document.getElementById("There's no point in doing that");
    var sanic = document.getElementById("Supersanic")
    var forgotAchieve = document.getElementById("I forgot to nerf that")
    let infinity = document.getElementById("To infinity!")
    let nerf = document.getElementById("I forgot to nerf that")
    let didnt = document.getElementById("You didn't need it anyway")
    let fast = document.getElementById("That's fast!");
    let lot = document.getElementById("That's a lot of infinites");
    let cancer = document.getElementById("Spreading Cancer");
    let zero = document.getElementById("Zero Deaths");
    var potato = document.getElementById("Faster than a potato")
    let potato2 = document.getElementById("Faster than a squared potato")
    let potato3 = document.getElementById("Faster than a potato^286078")
    var dimensional = document.getElementById("Multidimensional")
    let anti = document.getElementById("AntiChallenged")
    let forever = document.getElementById("Forever isn't that long")
    let is = document.getElementById("Is this hell?")
    let limitBreak = document.getElementById("Limit Break")
    let oh = document.getElementById("Oh hey, you're still here")
    let mil = document.getElementById("1 million is a lot")
    let right = document.getElementById("You did this again just for the achievement right?")
    let not = document.getElementById("ERROR 909: Dimension not found")
    var IPBelongs = document.getElementById("All your IP are belong to us")
    var reference = document.getElementById("Yet another infinity reference")
    let infchall = document.getElementById("Infinitely Challenging")
    let blink = document.getElementById("Blink of an eye")
    let cant = document.getElementById("Can't hold all these infinities")
    let tables = document.getElementById("How the antitables have turned")
    let spare = document.getElementById("I got a few to spare")
    let speed = document.getElementById("Ludicrous Speed")
    let speed2 = document.getElementById("I brake for nobody")
    let overdrive = document.getElementById("MAXIMUM OVERDRIVE")
    let minute = document.getElementById("Minute of infinity")
    let hell = document.getElementById("Yes. This is hell.")
    let mile = document.getElementById("This mile took an Eternity")
    let inftime = document.getElementById("Infinite time")
    let swarm = document.getElementById("The swarm")
    let guide = document.getElementById("Do you really need a guide for this?")
    let nine = document.getElementById("We could afford 9")
    let infiniteIP = document.getElementById("Can you get infinite IP?")
    let over9000 = document.getElementById("IT'S OVER 9000")
    let dawg = document.getElementById("Yo dawg, I heard you liked infinities...")
    let eatass = document.getElementById("Like feasting on a behind")
    let layer = document.getElementById("But I wanted another prestige layer...")
    let fkoff = document.getElementById("What do I have to do to get rid of you")
    let minaj = document.getElementById("Popular music")
    let infstuff = document.getElementById("I never liked this infinity stuff anyway")
    let when = document.getElementById("When will it be enough?")
    let thinking = document.getElementById("Now you're thinking with dilation!")
    let thisis = document.getElementById("This is what I have to do to get rid of you.")
    let onlywar = document.getElementById("In the grim darkness of the far endgame")
    let thecap = document.getElementById("The cap is a million, not a trillion")
    let neverenough = document.getElementById("It will never be enough")
    let notenough = document.getElementById("I don't have enough fuel!")
    let old = document.getElementById("Old age")
    let rid = document.getElementById("I already got rid of you...")
    let tfms = document.getElementById("speedrunMilestone18")
    let tms = document.getElementById("speedrunMilestone19")
    let tfms2 = document.getElementById("speedrunMilestone22")
    let memories = document.getElementById("Old memories come true")
    let squared = document.getElementById("We are not going squared.")
    let seriously = document.getElementById("Seriously, I already got rid of you.")

    apocAchieve.setAttribute('ach-tooltip', "Get over " + formatValue(player.options.notation, 1e80, 0, 0) + " antimatter.");
    claustrophobic.setAttribute('ach-tooltip', "Go Infinite with just 1 Antimatter Galaxy. Reward: Reduces starting tick interval by 2%"+(player.galacticSacrifice?" and keep galaxy upgrades on infinity.":"."));
    noPointAchieve.setAttribute('ach-tooltip', "Buy a single First Dimension when you have over " + formatValue(player.options.notation, 1e150, 0, 0) + " of them. Reward: First Dimensions are 10% stronger.");
    forgotAchieve.setAttribute('ach-tooltip', "Get any Dimension multiplier over " + formatValue(player.options.notation, 1e31, 0, 0)) + ". Reward: First Dimensions are 5% stronger.";
    sanic.setAttribute('ach-tooltip', "Have antimatter/sec exceed your current antimatter above " + formatValue(player.options.notation, 1e63, 0, 0));
    infinity.setAttribute('ach-tooltip', "Reach Infinite antimatter. Reward: Start with 100 antimatter"+(player.galacticSacrifice?" and always have at least 10x lower dimension costs.":"."));
    nerf.setAttribute('ach-tooltip',"Get any dimension multiplier over "+shortenCosts(1e31)+". Reward: First Dimensions are 5% stronger.")
    didnt.setAttribute('ach-tooltip',"Reach Infinite antimatter without having any 8th Dimensions. Reward: Dimensions 1-7 are 2"+(player.galacticSacrifice?"x":"%")+" stronger.")
    fast.setAttribute('ach-tooltip', "Go infinite in under 2 hours. Reward: Start with "+shortenCosts(1e3)+" antimatter"+(player.galacticSacrifice?" and 1 galaxy sacrified stat, and get a multiplier to galaxy points based on fastest infinity (5 hours / x, 10x softcap).":"."));
    lot.setAttribute('ach-tooltip', "Reach Infinity 10 times."+(player.galacticSacrifice?" Reward: Start infinity with galaxy points based on your infinities (x^2/100).":""));
    cancer.setAttribute('ach-tooltip', "Buy ten Galaxies in total while using cancer notation."+(player.galacticSacrifice?" Reward: Multiplier of IP based on number of galaxies bought in cancer notation.":""))
    zero.setAttribute('ach-tooltip',"Get to Infinity without Dimension shifts, boosts or galaxies in a challenge. Reward: Dimensions 1-4 are 25% stronger"+(player.galacticSacrifice?" and 1.25x to IP.":"."))
    potato.setAttribute('ach-tooltip', "Get more than " + formatValue(player.options.notation, 1e29, 0, 0) + " ticks per second. Reward: Reduces starting tick interval by 2%.");
    potato2.setAttribute('ach-tooltip', "Get more than " + formatValue(player.options.notation, 1e58, 0, 0) + " ticks per second. Reward: Reduces starting tick interval by 2%.");
    potato3.setAttribute('ach-tooltip', "Get more than "+shortenCosts(new Decimal("1e8296262"))+" ticks per second.")
    dimensional.setAttribute('ach-tooltip', "Reach " + formatValue(player.options.notation, 1e12, 0, 0) + " of all dimensions except 8th.");
    anti.setAttribute('ach-tooltip', "Complete all the challenges. Reward: All dimension are stronger"+(player.galacticSacrifice?" and tickspeed multiplier is also lowered.":"."))
    forever.setAttribute('ach-tooltip', "Infinity in 1 minute or less. Reward: Start with "+shortenCosts(1e10)+" antimatter"+(player.galacticSacrifice?" and multiplier to IP based on your best infinity time.":"."))
    is.setAttribute('ach-tooltip', "Complete the Tickspeed Autobuyer challenge in 3 minutes or less.  Reward: Boost per 10 dimensions "+(player.galacticSacrifice?"is x^(1.0666).":"+1%"))
    limitBreak.setAttribute('ach-tooltip', "Break Infinity."+(player.galacticSacrifice?" Reward: Multiplier to IP gain based on galaxies.":""))
    oh.setAttribute('ach-tooltip', "Reach "+shortenCosts(1e8)+" IP per minute."+(player.galacticSacrifice?" Reward: Multiplier to GP based on log(IP).":""))
    mil.setAttribute('ach-tooltip',"Reach "+shortenCosts(1e6)+" infinity power."+(player.galacticSacrifice?" Reward: First Dimensions are "+shortenCosts(1e6)+" times stronger.":""))
    right.setAttribute('ach-tooltip',"Complete the Third Dimension Autobuyer challenge in 10 seconds or less. Reward: First dimensions are 5"+(player.galacticSacrifice?"x":"0%")+" stronger.")
    not.setAttribute('ach-tooltip',"Get to infinity with only a single first Dimension without Dimension Boosts, Shifts or Galaxies while in Automatic Galaxies Challenge. Reward: First Dimensions are "+(player.galacticSacrifice?909:3)+" times stronger.")
    IPBelongs.setAttribute('ach-tooltip', "Big Crunch for "+shortenCosts(1e150)+" IP. Reward: Additional 4x multiplier to IP.")
    reference.setAttribute('ach-tooltip', "Get a x"+shortenDimensions(Number.MAX_VALUE)+" multiplier in a single sacrifice. Reward: Sacrifices are stronger.")
    infchall.setAttribute('ach-tooltip', "Complete an infinity challenge."+(player.galacticSacrifice?" Reward: Increase galaxy and g11 effectiveness based on IC's completed.":""))
    blink.setAttribute('ach-tooltip', "Get to Infinity in under 200 milliseconds. Reward: Start with " + formatValue(player.options.notation, 1e25, 0, 0) + " antimatter and all dimensions are stronger in first 300ms of Infinity.");
    spare.setAttribute('ach-tooltip', "Reach " +formatValue(player.options.notation, new Decimal("1e35000"), 0, 0)+" antimatter. Reward: Dimensions are more powerful the more unspent antimatter you have.");
    cant.setAttribute('ach-tooltip', "Get all Dimension multipliers over "+shortenCosts(1e308)+". Reward: All dimensions 10"+(player.galacticSacrifice?"x":"%")+" stronger.")
    tables.setAttribute('ach-tooltip', "Get 8th Dimension multiplier to be highest, 7th Dimension multiplier second highest etc. Reward: Each dimension gains a boost proportional to tier (8th dimension gets 8"+(player.galacticSacrifice?"0":"")+"%, 7th gets 7"+(player.galacticSacrifice?"0":"")+"%, etc.)")
    speed.setAttribute('ach-tooltip', "Big Crunch for "+shortenCosts(1e200)+" IP in 2 seconds or less. Reward: All dimensions are significantly stronger in first 5 seconds of infinity.")
    speed2.setAttribute('ach-tooltip', "Big Crunch for "+shortenCosts(1e250)+" IP in 20 seconds or less. Reward: All dimensions are significantly stronger in first 60 seconds of infinity.")
    overdrive.setAttribute('ach-tooltip', "Big Crunch with " + shortenCosts(1e300) + " IP/min. Reward: Additional 4x multiplier to IP.")
    minute.setAttribute('ach-tooltip', "Reach " + shortenCosts(1e260) + " infinity power. Reward: Double infinity power gain.")
    hell.setAttribute('ach-tooltip', "Get the sum of Infinity Challenge times under 5 seconds." + (player.boughtDims ? " Reward: Sacrifice is again slightly stronger." : ""))
    mile.setAttribute('ach-tooltip', "Get "+(player.masterystudies?"100 eternities milestone.":"all eternity milestones."))
    swarm.setAttribute('ach-tooltip', "Get 10 replicanti galaxies in 15 seconds." + (player.boughtDims ? " Reward: Unlock replicanti galaxy power control." : ""))
    inftime.setAttribute('ach-tooltip', player.boughtDims ? "Eternity without buying dimensions 1-7. Reward: Time dimensions are multiplied by eighth root of eighth dimensions." : "Get 308 tickspeed upgrades (in one eternity) from time dimensions. Reward: Time dimensions are affected slightly more by tickspeed.")
    guide.setAttribute('ach-tooltip', player.boughtDims ? "Reach " + shortenCosts(new Decimal("1e1000000")) + " replicanti. Reward: Replicanti increase faster the more you have." : "Eternity with the infinitied stat under 10.")
    nine.setAttribute('ach-tooltip', "Eternity with exactly 9 replicanti." + (player.boughtDims ? " Reward: Replicanti multiplier to ID is 9% stronger (after time studies)." : ""))
    infiniteIP.setAttribute('ach-tooltip', "Reach "+shortenCosts(new Decimal("1e30008"))+" IP.")
    over9000.setAttribute('ach-tooltip', "Get a total sacrifice multiplier of "+shortenCosts(new Decimal("1e9000"))+". Reward: Sacrifice doesn't reset your dimensions.")
    dawg.setAttribute('ach-tooltip', "Have all your past 10 infinities be at least "+shortenMoney(Number.MAX_VALUE)+" times higher IP than the previous one. Reward: Your antimatter doesn't reset on dimboost/galaxy.")
    eatass.setAttribute('ach-tooltip', "Reach "+shortenCosts(1e100)+" IP without any infinities or first dimensions. Reward: IP multiplier based on time spent this infinity.")
    layer.setAttribute('ach-tooltip', "Reach "+shortenMoney(Number.MAX_VALUE)+" EP.")
    fkoff.setAttribute('ach-tooltip', "Reach "+shortenCosts(new Decimal("1e22000"))+" IP without any time studies. Reward: Time dimensions are multiplied by the number of studies you have.")
    minaj.setAttribute('ach-tooltip', "Have 180 times more non-bonus replicanti galaxies than normal galaxies. Reward: Replicanti galaxies divide your replicanti by "+shortenMoney(Number.MAX_VALUE)+" instead of resetting them to 1.")
    infstuff.setAttribute('ach-tooltip', "Reach "+shortenCosts(new Decimal("1e140000"))+" IP without buying IDs or IP multipliers. Reward: You start eternities with all Infinity Challenges unlocked and completed"+(player.meta?", and your infinity gain is multiplied by dilated time^(1/4).":"."))
    when.setAttribute('ach-tooltip', "Reach "+shortenCosts( new Decimal("1e20000"))+" replicanti. Reward: You gain replicanti 2 times faster under "+shortenMoney(Number.MAX_VALUE)+" replicanti.")
    thinking.setAttribute('ach-tooltip', "Eternity for "+shortenCosts( new Decimal("1e600"))+" EP in 1 minute or less while dilated.")
    thisis.setAttribute('ach-tooltip', "Reach "+shortenCosts(new Decimal('1e20000'))+" IP without any time studies while dilated.")
    onlywar.setAttribute('ach-tooltip', "Reach "+shortenMoney(new Decimal('1e40000'))+" EP.")
    thecap.setAttribute('ach-tooltip', "Get "+shortenDimensions(1e12)+" eternities. Reward: Eternity upgrade 2 uses a better formula.")
    neverenough.setAttribute('ach-tooltip', "Reach "+shortenCosts( new Decimal("1e100000"))+" replicanti. Reward: You can buy max replicanti galaxies.")
    notenough.setAttribute('ach-tooltip', "Reach "+shorten(Number.MAX_VALUE)+" meta-antimatter.")
    old.setAttribute('ach-tooltip', "Reach "+shortenCosts(Decimal.pow(10,3*86400*365.2425*2019))+" antimatter.")
    rid.setAttribute('ach-tooltip', "Reach "+shortenCosts(new Decimal("1e400000"))+" IP while dilated without having time studies and electrons. Reward: Generate time theorems based on your best-ever tachyon particles.")
    tfms.setAttribute('ach-tooltip', "Reward: Start with "+shortenCosts(1e13)+" eternities.")
    tms.setAttribute('ach-tooltip', "Reward: Start with "+shortenCosts(1e25)+" meta-antimatter on reset.")
    tfms2.setAttribute('ach-tooltip', "Reward: Start with "+shortenCosts(1e100)+" dilated time and dilated time does not reset until quantum.")
    memories.setAttribute('ach-tooltip', "Reach "+shortenCosts(new Decimal("1e1700"))+" MA while not having over 4 dimension boosts and fifth dimensions.")
    squared.setAttribute('ach-tooltip', "Reach "+shortenCosts(new Decimal("1e1500"))+" MA with exactly 8 meta-dimension boosts.")
    seriously.setAttribute('ach-tooltip', "Reach "+shortenCosts(new Decimal("1e354000"))+" IP without having time studies while dilated and running QC2.")
}


//notation stuff
var notationArray = ["Scientific","Engineering","Letters","Standard","Emojis","Mixed scientific","Mixed engineering","Logarithm","Brackets","Infinity","Greek","Game percentages","Hexadecimal","Tetration","Hyperscientific","Psi","Morse code","Spazzy","AF5LN"]

function updateNotationOption() {
	var notationMsg="Notation: "+(player.options.notation=="Emojis"?"Cancer":player.options.notation)
	var commasMsg=(player.options.commas=="Emojis"?"Cancer":player.options.commas) + " on exponents"
	document.getElementById("notation").innerHTML = "<p style='font-size:15px'>Notations</p>"+notationMsg+"<br>"+commasMsg
	document.getElementById("chosenNotation").textContent = player.options.notation=="AF5LN"?"Notation: Aarex's Funny 5-letter Notation":notationMsg
	document.getElementById("chosenCommas").textContent = player.options.commas=="AF5LN"?"Aarex's Funny 5-letter Notation on exponents":commasMsg
	
	let tooltip=""
	if (player.options.notation=="AF5LN") tooltip="Notation: Aarex's Funny 5-letter Notation"
	if (player.options.commas=="AF5LN") tooltip+=(tooltip==""?"":"\n")+"Aarex's Funny 5-letter Notation on exponents"
	if (tooltip=="") document.getElementById("notation").removeAttribute('ach-tooltip')
	else document.getElementById("notation").setAttribute('ach-tooltip', tooltip)
}

function onNotationChange(id) {
    document.getElementsByClassName("hideInMorse").display = player.options.notation == "Morse code" || player.options.notation == 'Spazzy' ? "none" : ""
	updateNotationOption()
	updateLastTenRuns();
	updateLastTenEternities();
	updateLastTenQuantums();
	updateTickSpeed();
	setAchieveTooltip();
	updateCosts();
	updateDilationUpgradeCosts()
	updateMilestones()
	updateColorCharge()
	updateGluons()
	updateElectrons()
	updateQuantumChallenges()
	updateMasteryStudyTextDisplay()
	document.getElementById("epmult").innerHTML = "You gain 5 times more EP<p>Currently: "+shortenDimensions(player.epmult)+"x<p>Cost: "+shortenDimensions(player.epmultCost)+" EP"
	if (player.achievements.includes("ng3p18")) document.getElementById('bestTP').textContent="Your best ever Tachyon particles was "+shorten(player.dilation.bestTP)+"."
}

function switchNotation(id) {
	player.options.notation=notationArray[id]
	onNotationChange()
}

function switchCommas(id) {
	if (id>1) player.options.commas=notationArray[id-2]
	else if (id>0) player.options.commas="Same notation"
	else player.options.commas="Commas"
	onNotationChange()
}

var notationMenuDone = false
document.getElementById("notation").onclick = function () {
	closeToolTip()
	if (!notationMenuDone) {
		notationMenuDone=true
		let notationsTable=document.getElementById("notationOptions")
		let commasTable=document.getElementById("commasOptions")
		let subTable=document.getElementById("subNotationOptions")
		let selectList=""
		
		var row=commasTable.insertRow(0)
		row.innerHTML="<button class='storebtn' style='width:160px; height: 40px' onclick='switchCommas(0)'>Commas on exponents</button>"
		row=commasTable.insertRow(1)
		row.innerHTML="<button class='storebtn' style='width:160px; height: 40px' onclick='switchCommas(1)'>Same notation on exponents</button>"
		
		for (n=0;n<notationArray.length;n++) {
			var name=notationArray[n]=="Emojis"?"Cancer":notationArray[n]
			row=notationsTable.insertRow(n)
			row.innerHTML="<button class='storebtn' id='select"+name+"' style='width:160px; height: 40px' onclick='switchNotation("+n+")'>Select "+name+"</button>"
			row=commasTable.insertRow(n+2)
			row.innerHTML="<button class='storebtn' id='selectCommas"+name+"' style='width:160px; height: 40px' onclick='switchCommas("+(n+2)+")'>"+name+" on exponents</button>"
			if (n>17) {
				row=subTable.insertRow(n-1)
				row.innerHTML="<button class='storebtn' id='selectSub"+name+"' style='width:160px; height: 40px' onclick='switchSubNotation("+n+")'>Select "+name+"</button>"
			} else if (n<17) {
				row=subTable.insertRow(n)
				row.innerHTML="<button class='storebtn' style='width:160px; height: 40px' onclick='switchSubNotation("+n+")'>Select "+name+"</button>"	
			}
		}
		document.getElementById("selectAF5LN").setAttribute("ach-tooltip","Select Aarex's Funny 5-letter Notation")
		document.getElementById("selectCommasAF5LN").setAttribute("ach-tooltip","Aarex's Funny 5-letter Notation on exponents")
	}
	document.getElementById("notationmenu").style.display="block"
};

function openNotationOptions() {
	if (document.getElementById("mainnotationoptions1").style.display=="") {
		formatPsi(1,1)
		document.getElementById("openpsioptions").textContent="Go back"
		document.getElementById("mainnotationoptions1").style.display="none"
		document.getElementById("mainnotationoptions2").style.display="none"
		document.getElementById("notationoptions").style.display=""
		
		document.getElementById("significantDigits").value=player.options.scientific.significantDigits?player.options.scientific.significantDigits:0
		document.getElementById("maxLength").value=player.options.psi.chars
		document.getElementById("maxArguments").value=Math.min(player.options.psi.args,4)
		document.getElementById("chosenSubNotation").textContent="Sub-notation: "+(player.options.spazzy.subNotation=="Emojis"?"Cancer":player.options.spazzy.subNotation)
	} else {
		document.getElementById("openpsioptions").textContent="Notation options"
		document.getElementById("mainnotationoptions1").style.display=""
		document.getElementById("mainnotationoptions2").style.display=""
		document.getElementById("notationoptions").style.display="none"
	}
}

function switchOption(notation,id) {
	if (notation=="scientific") {
		var value=parseFloat(document.getElementById(id).value)
		if (isNaN(value)) return
		if (value%1!=0) return
		if (id=="significantDigits") {
			if (value<0||value>10) return
			if (value==0) player.options.scientific.significantDigits=undefined
			else player.options.scientific.significantDigits=value
		}
	} else if (notation=="psi") {
		var value=parseFloat(document.getElementById(id).value)
		if (isNaN(value)) return
		if (value%1!=0) return
		if (id=="maxLength") {
			if (value<2||value>20) return
			player.options.psi.chars=value
		}
		if (id=="maxArguments") {
			if (value<1||value>4) return
			player.options.psi.args=value
		}
	}
	onNotationChange()
}

function switchSubNotation(id) {
	player.options.spazzy.subNotation=notationArray[id]
	document.getElementById("chosenSubNotation").textContent="Sub-notation: "+(player.options.spazzy.subNotation=="Emojis"?"Cancer":player.options.spazzy.subNotation)
	onNotationChange()
}

document.getElementById("newsbtn").onclick = function() {
	player.options.newsHidden=!player.options.newsHidden
	document.getElementById("game").style.display=player.options.newsHidden?"none":"block"
	if (!player.options.newsHidden) scrollNextMessage()
}


function resetDimensions() {
    var tiers = [ null, "first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eight" ];

    for (i = 1; i <= 8; i++) {
        player[tiers[i] + "Amount"] = new Decimal(0)
        player[tiers[i] + "Pow"] = new Decimal(1)
    }
    player.firstCost = new Decimal(10)
    player.secondCost = new Decimal(100)
    player.thirdCost = new Decimal(10000)
    player.fourthCost = new Decimal(1e6)
    player.fifthCost = new Decimal(1e9)
    player.sixthCost = new Decimal(1e13)
    player.seventhCost = new Decimal(1e18)
    player.eightCost = new Decimal(1e24)
    player.eightPow = new Decimal(player.chall11Pow)
}

function calcSacrificeBoost() {
	let ret
	if (player.firstAmount == 0) return new Decimal(1);
	if (player.challenges.includes("postc2")) {
		if (player.timestudy.studies.includes(228)) ret = player.firstAmount.dividedBy(player.sacrificed.max(1)).pow(0.013).max(1)
		else if (player.achievements.includes("r97") && player.boughtDims) ret = player.firstAmount.dividedBy(player.sacrificed.max(1)).pow(0.012).max(1)
		else if (player.achievements.includes("r88")) ret = player.firstAmount.dividedBy(player.sacrificed.max(1)).pow(0.011).max(1)
		else ret = player.firstAmount.dividedBy(player.sacrificed.max(1)).pow(0.01).max(1)
	} else if (player.currentChallenge != "challenge11") {
		var sacrificePow=2;
		if (player.achievements.includes("r32")) sacrificePow += player.tickspeedBoosts != undefined ? 2 : 0.2;
		if (player.achievements.includes("r57")) sacrificePow += player.boughtDims ? 0.3 : 0.2; //this upgrade was too OP lol
		ret = Decimal.pow((player.firstAmount.e/10.0), sacrificePow).dividedBy(((Decimal.max(player.sacrificed.e, 1)).dividedBy(10.0)).pow(sacrificePow).max(1)).max(1);
	} else {
		ret = player.firstAmount.pow(0.05).dividedBy(player.sacrificed.pow(0.04).max(1)).max(1);
	}
	if (player.boughtDims) ret = ret.pow(1 + Math.log(1 + Math.log(1 + player.timestudy.ers_studies[2] / 5)))
	return ret
}

function calcTotalSacrificeBoost(next) {
	let ret
	if (player.sacrificed == 0) ret = new Decimal(1);
	if (player.challenges.includes("postc2")) {
		if (player.timestudy.studies.includes(228)) ret = player.sacrificed.pow(0.013).max(1)
		else if (player.achievements.includes("r97") && player.boughtDims) ret = player.sacrificed.pow(0.012).max(1)
		else if (player.achievements.includes("r88")) ret = player.sacrificed.pow(0.011).max(1)
		else ret = player.sacrificed.pow(0.01)
	} else if (player.currentChallenge != "challenge11") {
		var sacrificePow=2;
		if (player.achievements.includes("r32")) sacrificePow += player.tickspeedBoosts != undefined ? 2 : 0.2;
		if (player.achievements.includes("r57")) sacrificePow += player.boughtDims ? 0.3 : 0.2;
		ret = Decimal.pow((player.sacrificed.e/10.0), sacrificePow);
	} else {
		ret = player.sacrificed.pow(0.05) //this is actually off but like im not sure how youd make it good. not that it matters.
	}
	if (player.boughtDims) ret = ret.pow(1 + Math.log(1 + Math.log(1 + (player.timestudy.ers_studies[2] + (next ? 1 : 0))/ 5)))
	return ret
}


function sacrifice(auto = false) {
    if (player.eightAmount == 0) return false;
    if (player.resets < 5) return false
    if (player.currentEternityChall == "eterc3") return false
    var maxPower = player.galacticSacrifice ? "1e8888" : Number.MAX_VALUE
    if (player.currentChallenge == "challenge11" && (calcTotalSacrificeBoost().gte(maxPower) || player.chall11Pow.gte(maxPower))) return false
    if (!auto) floatText("eightD", "x" + shortenMoney(calcSacrificeBoost()))
    if (calcSacrificeBoost().gte(Number.MAX_VALUE)) giveAchievement("Yet another infinity reference");
    player.eightPow = player.eightPow.times(calcSacrificeBoost())
    player.sacrificed = player.sacrificed.plus(player.firstAmount);
    if (player.currentChallenge != "challenge11") {
        if (player.currentChallenge == "challenge7" && !player.achievements.includes("r118")) clearDimensions(6);
        else if (!player.achievements.includes("r118")) clearDimensions(7);
    } else {
        player.chall11Pow = player.chall11Pow.times(calcSacrificeBoost())
        if (!player.achievements.includes("r118")) resetDimensions();
        player.money = new Decimal(100)

    }
    if (calcTotalSacrificeBoost() >= 600) giveAchievement("The Gods are pleased");
    if (calcTotalSacrificeBoost().gte("1e9000") && player.currentChallenge !== "challenge11") giveAchievement("IT'S OVER 9000");
}




document.getElementById("sacrifice").onclick = function () {
    if (!document.getElementById("confirmation").checked) {
        if (!confirm("Dimensional Sacrifice will remove all of your first to seventh dimensions (with the cost and multiplier unchanged) for a boost to Eighth Dimension. It will take time to regain production.")) {
            return false;
        }
    }

    auto = false;
    return sacrifice();
}

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
    var autoBuyerGalaxy = new Autobuyer (document.getElementById("secondSoftReset"))
    var autoBuyerTickspeed = new Autobuyer (document.getElementById("tickSpeed"))
    var autoBuyerInf = new Autobuyer (document.getElementById("bigcrunch"))
    var autoSacrifice = new Autobuyer(13)


    if (player.aarexModifications.newGameExpVersion) {
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
    autoBuyerGalaxy.interval = player.galacticSacrifice ? 6e4 : 15e4
    autoBuyerTickspeed.interval = 5000
    autoBuyerInf.interval = player.galacticSacrifice ? 6e4 : 3e5
    if (player.boughtDims) {
        autoBuyerInf.requireMaxReplicanti = false
        autoBuyerInf.requireIPPeak = false
    }

    autoSacrifice.interval = player.galacticSacrifice ? 15e3 : 100
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
	
    if (player.galacticSacrifice) {
        var autoGalSacrifice = new Autobuyer(14)

        autoGalSacrifice.interval = 15e3
        autoGalSacrifice.priority = 5
    }

    if (player.challenges.includes("challenge1") && player.autobuyers[0] == 1) {
        player.autobuyers[0] = autoBuyerDim1
        document.getElementById("autoBuyer1").style.display = "inline-block"
    } else document.getElementById("autoBuyer1").style.display = "none"
    if (player.challenges.includes("challenge2") && player.autobuyers[1] == 2) {
        player.autobuyers[1] = autoBuyerDim2
        document.getElementById("autoBuyer2").style.display = "inline-block"
    } else document.getElementById("autoBuyer2").style.display = "none"
    if (player.challenges.includes("challenge3") && player.autobuyers[2] == 3) {
        player.autobuyers[2] = autoBuyerDim3
        document.getElementById("autoBuyer3").style.display = "inline-block"
    } else document.getElementById("autoBuyer3").style.display = "none"
    if (player.challenges.includes("challenge4") && player.autobuyers[9] == 10) {
        player.autobuyers[9] = autoBuyerDimBoost
        document.getElementById("autoBuyerDimBoost").style.display = "inline-block"
    } else {
        document.getElementById("autoBuyerDimBoost").style.display = "none"
        document.getElementById("buyerBtnDimBoost").style.display = ""
    }
    if (player.challenges.includes("challenge5") && player.autobuyers[8] == 9) {
        player.autobuyers[8] = autoBuyerTickspeed
        document.getElementById("autoBuyerTickSpeed").style.display = "inline-block"
    } else {
        document.getElementById("autoBuyerTickSpeed").style.display = "none"
        document.getElementById("buyerBtnTickSpeed").style.display = ""
    }
    if (player.challenges.includes("challenge6") && player.autobuyers[4] == 5) {
        player.autobuyers[4] = autoBuyerDim5
        document.getElementById("autoBuyer5").style.display = "inline-block"
    } else document.getElementById("autoBuyer5").style.display = "none"
    if (player.challenges.includes("challenge7") && player.autobuyers[11] == 12) {
        player.autobuyers[11] = autoBuyerInf
        document.getElementById("autoBuyerInf").style.display = "inline-block"
    } else {
        document.getElementById("autoBuyerInf").style.display = "none"
        document.getElementById("buyerBtnInf").style.display = ""
    }
    if (player.challenges.includes("challenge8") && player.autobuyers[3] == 4) {
        player.autobuyers[3] = autoBuyerDim4
        document.getElementById("autoBuyer4").style.display = "inline-block"
    } else document.getElementById("autoBuyer4").style.display = "none"
    if (player.challenges.includes("challenge9") && player.autobuyers[6] == 7) {
        player.autobuyers[6] = autoBuyerDim7
        document.getElementById("autoBuyer7").style.display = "inline-block"
    } else document.getElementById("autoBuyer7").style.display = "none"
    if (player.challenges.includes("challenge10") && player.autobuyers[5] == 6) {
        player.autobuyers[5] = autoBuyerDim6
        document.getElementById("autoBuyer6").style.display = "inline-block"
    } else document.getElementById("autoBuyer6").style.display = "none"
    if (player.challenges.includes("challenge11") && player.autobuyers[7] == 8) {
        player.autobuyers[7] = autoBuyerDim8
        document.getElementById("autoBuyer8").style.display = "inline-block"
    } else document.getElementById("autoBuyer8").style.display = "none"
    if (player.challenges.includes("challenge12") && player.autobuyers[10] == 11) {
        player.autobuyers[10] = autoBuyerGalaxy
        document.getElementById("autoBuyerGalaxies").style.display = "inline-block"
    } else {
        document.getElementById("autoBuyerGalaxies").style.display = "none"
        document.getElementById("buyerBtnGalaxies").style.display = ""
    }

    if ((player.challenges.includes("postc2") || player.challenges.includes("challenge13")) && player.autoSacrifice == 1) {
        player.autoSacrifice = autoSacrifice
        document.getElementById("autoBuyerSac").style.display = "inline-block"
    } else {
        document.getElementById("autoBuyerSac").style.display = "none"
        document.getElementById("buyerBtnSac").style.display = ""
    }

    if (player.galacticSacrifice ? player.challenges.includes("challenge14") && player.autobuyers[12] == 13 : false) {
        player.autobuyers[12] = autoGalSacrifice
        document.getElementById("autoBuyerGalSac").style.display = "inline-block"
    } else {
        document.getElementById("autoBuyerGalSac").style.display = "none"
        document.getElementById("buyerBtnGalSac").style.display = ""
    }

    if (player.eternities < 100) {
        document.getElementById("autoBuyerEter").style.display = "none"
    }

	var intervalUnits = player.infinityUpgrades.includes("autoBuyerUpgrade") ? 1/2000 : 1/1000
	for (var tier = 1; tier <= 8; ++tier) {
		document.getElementById("interval" + tier).textContent = "Current interval: " + (player.autobuyers[tier-1].interval * intervalUnits).toFixed(2) + " seconds"
	}
	document.getElementById("intervalTickSpeed").textContent = "Current interval: " + (player.autobuyers[8].interval * intervalUnits).toFixed(2) + " seconds"
	document.getElementById("intervalDimBoost").textContent = "Current interval: " + (player.autobuyers[9].interval * intervalUnits).toFixed(2) + " seconds"
	document.getElementById("intervalGalaxies").textContent = "Current interval: " + (player.autobuyers[10].interval * intervalUnits).toFixed(2) + " seconds"
	document.getElementById("intervalInf").textContent = "Current interval: " + (player.autobuyers[11].interval * intervalUnits).toFixed(2) + " seconds"
	document.getElementById("intervalSac").textContent = "Current interval: " + (player.autoSacrifice.interval * intervalUnits).toFixed(2) + " seconds"
	if (player.galacticSacrifice) document.getElementById("intervalGalSac").textContent = "Current interval: " + (player.autobuyers[12].interval * intervalUnits).toFixed(2) + " seconds"

    var maxedAutobuy = 0;
    var e100autobuy = 0;
    for (let tier = 1; tier <= 8; ++tier) {
    document.getElementById("toggleBtn" + tier).style.display = "inline-block";
        if (player.autobuyers[tier-1].bulk >= 1e100) {
        player.autobuyers[tier-1].bulk = 1e100;
        document.getElementById("buyerBtn" + tier).textContent = shortenDimensions(player.autobuyers[tier-1].bulk)+"x bulk purchase";
        e100autobuy++;
        }
        else {
        if (player.autobuyers[tier-1].interval <= 100) {
            if (player.autobuyers[tier-1].bulk * 2 >= 1e100) {
                document.getElementById("buyerBtn" + tier).innerHTML = shortenDimensions(1e100)+"x bulk purchase<br>Cost: " + shortenDimensions(player.autobuyers[tier-1].cost) + " IP";
            }
            else {
                document.getElementById("buyerBtn" + tier).innerHTML = shortenDimensions(player.autobuyers[tier-1].bulk*2)+"x bulk purchase<br>Cost: " + shortenDimensions(player.autobuyers[tier-1].cost) + " IP";
            }
            maxedAutobuy++;
        }
        else document.getElementById("buyerBtn" + tier).innerHTML = "40% smaller interval <br>Cost: " + shortenDimensions(player.autobuyers[tier-1].cost) + " IP"
        }
    }

    if (player.autobuyers[8].interval <= 100) {
        document.getElementById("buyerBtnTickSpeed").style.display = "none"
        document.getElementById("toggleBtnTickSpeed").style.display = "inline-block"
        maxedAutobuy++;
    }
    if (player.autobuyers[9].interval <= 100) {
        document.getElementById("buyerBtnDimBoost").style.display = "none"
        maxedAutobuy++;
    }
    if (player.autobuyers[10].interval <= 100) {
        document.getElementById("buyerBtnGalaxies").style.display = "none"
        maxedAutobuy++;
    }
    if (player.autobuyers[11].interval <= 100) {
        document.getElementById("buyerBtnInf").style.display = "none"
        maxedAutobuy++;
    }
    if (player.autoSacrifice.interval <= 100) {
        document.getElementById("buyerBtnSac").style.display = "none"
        if (player.galacticSacrifice) maxedAutobuy++;
    }
    if (player.galacticSacrifice) if (player.autobuyers[12].interval <= 100) {
        document.getElementById("buyerBtnGalSac").style.display = "none"
        maxedAutobuy++;
    }

    if (maxedAutobuy >= 9) giveAchievement("Age of Automation");
    if (maxedAutobuy >= (player.galacticSacrifice ? 14 : 12)) giveAchievement("Definitely not worth it");
    if (e100autobuy >= 8) giveAchievement("Professional bodybuilder");

    document.getElementById("buyerBtnTickSpeed").innerHTML = "40% smaller interval <br>Cost: " + player.autobuyers[8].cost + " IP"
    document.getElementById("buyerBtnDimBoost").innerHTML = "40% smaller interval <br>Cost: " + player.autobuyers[9].cost + " IP"
    document.getElementById("buyerBtnGalaxies").innerHTML = "40% smaller interval <br>Cost: " + player.autobuyers[10].cost + " IP"
    document.getElementById("buyerBtnInf").innerHTML = "40% smaller interval <br>Cost: " + player.autobuyers[11].cost + " IP"
    document.getElementById("buyerBtnSac").innerHTML = "40% smaller interval <br>Cost: " + player.autoSacrifice.cost + " IP"
    if (player.galacticSacrifice) document.getElementById("buyerBtnGalSac").innerHTML = "40% smaller interval <br>Cost: " + player.autobuyers[12].cost + " IP"


    for (var i=0; i<8; i++) {
        if (player.autobuyers[i]%1 !== 0) document.getElementById("autoBuyer"+(i+1)).style.display = "inline-block"
    }
    if (player.autobuyers[8]%1 !== 0) document.getElementById("autoBuyerTickSpeed").style.display = "inline-block"
    if (player.autobuyers[9]%1 !== 0) document.getElementById("autoBuyerDimBoost").style.display = "inline-block"
    if (player.autobuyers[10]%1 !== 0) document.getElementById("autoBuyerGalaxies").style.display = "inline-block"
    if (player.autobuyers[11]%1 !== 0) document.getElementById("autoBuyerInf").style.display = "inline-block"
    if (player.autoSacrifice%1 !== 0) document.getElementById("autoBuyerSac").style.display = "inline-block"

    for (var i=1; i<=12; i++) {
        player.autobuyers[i-1].isOn = document.getElementById(i + "ison").checked;
    }

    player.autoSacrifice.isOn = document.getElementById("13ison").checked
    if (player.galacticSacrifice) {
        if (player.autobuyers[12]%1 !== 0) document.getElementById("autoBuyerGalSac").style.display = "inline-block"
        player.autobuyers[12].isOn = document.getElementById("14ison").checked
    }
    player.eternityBuyer.isOn = document.getElementById("eternityison").checked
    if (player.masterystudies) {
		player.eternityBuyer.dilationMode = document.getElementById("dilatedeternityison").checked
        player.eternityBuyer.dilationPerAmount = Math.max(parseInt(document.getElementById("prioritydil").value),2)
        if (player.eternityBuyer.isOn&&player.eternityBuyer.dilationMode&&player.eternityBuyer.statBeforeDilation>=player.eternityBuyer.dilationPerAmount) {
            startDilatedEternity(true)
            return
        }
        if (player.quantum) if (player.quantum.autobuyer) player.quantum.autobuyer.enabled = document.getElementById("quantumison").checked
    }
    priorityOrder()
}


/*function loadAutoBuyers() {
    for (var i=0; i<12; i++) {
        if (player.autobuyers[i]%1 !== 0 ) {
            switch(i) {
                case 8: player.autobuyers[i].target = "buyTickSpeed()";
                case 9: player.autobuyers[i].target = "document.getElementById('softReset').click";
                case 10: player.autobuyers[i].target = "document.getElementById('secondSoftReset').click";
                case 11: player.autobuyers[i].target = "document.getElementById('bigcrunch').click";
                default: player.autobuyers[i].target = "buyOneDimension(" + i+1 + ")";
            }
        }
    }

}*/


function autoBuyerArray() {
    var tempArray = []
    for (var i=0; i<player.autobuyers.length && i<9; i++) {
        if (player.autobuyers[i]%1 !== 0 ) {
            tempArray.push(player.autobuyers[i])
        }
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
  if (value.toUpperCase().split("E").length > 2 && value.split(" ")[0] !== value) {
      var temp = new Decimal(0)
      temp.mantissa = parseFloat(value.toUpperCase().split("E")[0])
      temp.exponent = parseFloat(value.toUpperCase().split("E")[1]+"e"+value.toUpperCase().split("E")[2])
      value = temp.toString()
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
    //return parseFloat(value) + "e" + (e*3+3)
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
    //return parseFloat(value) + "e" + (e*3)
  }
  value = value.replace(',','')
  if (value.split("e")[0] === "") return Decimal.fromMantissaExponent(Math.pow(10,parseFloat(value.split("e")[1])%1), parseInt(value.split("e")[1]))
  return Decimal.fromString(value)
}

function updatePriorities() {
    auto = false;
    for (var x=0 ; x < autoBuyerArray().length; x++) {
        if (x < 9) autoBuyerArray()[x].priority = parseInt(document.getElementById("priority" + (x+1)).value)
    }
    if (parseInt(document.getElementById("priority10").value) === 69
    || parseInt(document.getElementById("priority11").value) === 69
    || parseInt(fromValue(document.getElementById("priority12").value).toString()) === 69
    || parseInt(document.getElementById("bulkDimboost").value) === 69
    || parseInt(document.getElementById("overGalaxies").value) === 69
    || parseInt(fromValue(document.getElementById("prioritySac").value).toString()) === 69
    || parseInt(document.getElementById("bulkgalaxy").value) === 69
    || parseInt(fromValue(document.getElementById("priority13").value).toString()) === 69
    || parseInt(fromValue(document.getElementById("priority14").value).toString()) === 69
    || parseInt(document.getElementById("prioritydil").value) === 69
    || parseInt(fromValue(document.getElementById("priorityquantum").value).toString()) === 69) giveAchievement("Nice.");
    player.autobuyers[9].priority = parseInt(document.getElementById("priority10").value)
    player.autobuyers[10].priority = parseInt(document.getElementById("priority11").value)
    const infValue = fromValue(document.getElementById("priority12").value)
    if (!isNaN(break_infinity_js ? infValue : infValue.logarithm)) player.autobuyers[11].priority = infValue
    else if (player.autoCrunchMode=="replicanti"&&document.getElementById("priority12").value.toLowerCase()=="max") player.autobuyers[11].priority = document.getElementById("priority12").value
    if (player.eternities < 10) {
        var bulk = Math.floor(Math.max(parseFloat(document.getElementById("bulkDimboost").value), 1))
    } else {
        var bulk = Math.max(parseFloat(document.getElementById("bulkDimboost").value), 0.05)
    }
    player.autobuyers[9].bulk = (isNaN(bulk)) ? 1 : bulk
    player.overXGalaxies = parseInt(document.getElementById("overGalaxies").value)
    const sacValue = fromValue(document.getElementById("prioritySac").value)
    if (!isNaN(break_infinity_js ? sacValue : sacValue.logarithm)) player.autoSacrifice.priority = Decimal.max(sacValue, 1.01)
    if (player.galacticSacrifice) {
        const galSacValue = fromValue(document.getElementById("priority14").value)
        if (!isNaN(break_infinity_js ? galSacValue : galSacValue.logarithm)) player.autobuyers[12].priority = galSacValue
    }
    player.autobuyers[10].bulk = parseFloat(document.getElementById("bulkgalaxy").value)
    const eterValue = fromValue(document.getElementById("priority13").value)
    if (!isNaN(break_infinity_js ? eterValue : eterValue.logarithm)) player.eternityBuyer.limit = eterValue
    if (player.masterystudies) {
        player.eternityBuyer.dilationPerAmount = Math.max(parseInt(document.getElementById("prioritydil").value),2)
        const quantumValue = fromValue(document.getElementById("priorityquantum").value)
        if (!isNaN(break_infinity_js ? quantumValue : quantumValue.logarithm) && player.quantum.autobuyer) player.quantum.autobuyer.limit = quantumValue
        if (player.eternityBuyer.isOn&&player.eternityBuyer.dilationMode&&player.eternityBuyer.statBeforeDilation>=player.eternityBuyer.dilationPerAmount) {
            startDilatedEternity(true)
            return
        }
    }

    priorityOrder()
}

function updateCheckBoxes() {
    for (var i = 0; i < 12; i++) {
        if (player.autobuyers[i]%1 !== 0) {
            if (player.autobuyers[i].isOn) document.getElementById((i+1) + "ison").checked = "true";
            else document.getElementById((i+1) + "ison").checked = ""
        }
    }
    if (player.autoSacrifice.isOn) document.getElementById("13ison").checked = "true"
    else document.getElementById("13ison").checked = ""
    document.getElementById("eternityison").checked = player.eternityBuyer.isOn
    if (player.masterystudies) {
         document.getElementById("dilatedeternityison").checked = player.eternityBuyer.dilationMode
         if (player.quantum) if (player.quantum.autobuyer) document.getElementById("quantumison").checked = player.quantum.autobuyer.enabled
    } else document.getElementById("dilatedeternityison").checked = false
    if (player.autobuyers[12] !== undefined ? player.autobuyers[12].isOn : false) document.getElementById("14ison").checked = "true"
    else document.getElementById("14ison").checked = ""
}


function toggleAutoBuyers() {
    var bool = player.autobuyers[0].isOn
    for (var i = 0; i<12; i++) {
        if (player.autobuyers[i]%1 !== 0) {
            player.autobuyers[i].isOn = !bool
        }
    }
    player.autoSacrifice.isOn = !bool
    player.eternityBuyer.isOn = !bool
    if (player.masterystudies) player.quantum.autobuyer.enabled = !bool
    updateCheckBoxes()
    updateAutobuyers()
}

function toggleBulk() {

    if (player.options.bulkOn) {
        player.options.bulkOn = false
        document.getElementById("togglebulk").textContent = "Enable bulk buy"
    } else {
        player.options.bulkOn = true
        document.getElementById("togglebulk").textContent = "Disable bulk buy"
    }
}

function toggleHotkeys() {
    if (player.options.hotkeys) {
        player.options.hotkeys = false
        document.getElementById("hotkeys").textContent = "Enable hotkeys"
    } else {
        player.options.hotkeys = true
        document.getElementById("hotkeys").textContent = "Disable hotkeys"
    }
}








function updateChallengeTimes() {
    document.getElementById("challengetime2").textContent = "Second Dimension Autobuyer Challenge time record: " + timeDisplayShort(player.challengeTimes[0])
    document.getElementById("challengetime3").textContent = "Third Dimension Autobuyer Challenge time record: " + timeDisplayShort(player.challengeTimes[1])
    document.getElementById("challengetime4").textContent = "Fourth Dimension Autobuyer Challenge time record: " + timeDisplayShort(player.challengeTimes[6])
    document.getElementById("challengetime5").textContent = "Fifth Dimension Autobuyer Challenge time record: " + timeDisplayShort(player.challengeTimes[4])
    document.getElementById("challengetime6").textContent = "Sixth Dimension Autobuyer Challenge time record: " + timeDisplayShort(player.challengeTimes[8])
    document.getElementById("challengetime7").textContent = "Seventh Dimension Autobuyer Challenge time record: " + timeDisplayShort(player.challengeTimes[7])
    document.getElementById("challengetime8").textContent = "Eighth Dimension Autobuyer Challenge time record: " + timeDisplayShort(player.challengeTimes[9])
    document.getElementById("challengetime9").textContent = "Tickspeed Autobuyer Challenge time record: " + timeDisplayShort(player.challengeTimes[3])
    document.getElementById("challengetime10").textContent = "Automated Dimension Boosts Challenge time record: " + timeDisplayShort(player.challengeTimes[2])
    document.getElementById("challengetime11").textContent = "Automated Galaxies Challenge time record: " + timeDisplayShort(player.challengeTimes[10])
    document.getElementById("challengetime12").textContent = "Automated Big Crunches Challenge time record: " + timeDisplayShort(player.challengeTimes[5])
	var temp = 0
	for (var i=0; i<11; i++) {
		temp += player.challengeTimes[i]
	}
	document.getElementById("challengetimesum").textContent = "Sum of challenge time records is " + timeDisplayShort(temp)

	temp = 0
    for (var i=0; i<8; i++) {
        document.getElementById("infchallengetime"+(i+1)).textContent = "Infinity Challenge " + (i+1) + " time record: " + timeDisplayShort(player.infchallengeTimes[i])
		temp += player.infchallengeTimes[i]
    }
	document.getElementById("infchallengetimesum").textContent = "Sum of infinity challenge time records is " + timeDisplayShort(temp)
    updateWorstChallengeBonus();
}

var bestRunIppm = new Decimal(0)
function updateLastTenRuns() {
    var listed = 0
    var tempBest = 0
    var tempTime = new Decimal(0)
    var tempIP = new Decimal(0)
    bestRunIppm = new Decimal(0)
    for (var i=0; i<10; i++) {
        if (player.lastTenRuns[i][1].gt(0)) {
            var ippm = player.lastTenRuns[i][1].dividedBy(player.lastTenRuns[i][0]/600)
            if (ippm.gt(tempBest)) tempBest = ippm
            var tempstring = shorten(ippm) + " IP/min"
            if (ippm<1) tempstring = shorten(ippm*60) + " IP/hour"
            document.getElementById("run"+(i+1)).textContent = "The infinity " + (i == 0 ? '1 infinity' : (i+1) + ' infinities') + " ago took " + timeDisplayShort(player.lastTenRuns[i][0]) + " and gave " + shortenDimensions(player.lastTenRuns[i][1]) +" IP. "+ tempstring
            tempTime = tempTime.plus(player.lastTenRuns[i][0])
            tempIP = tempIP.plus(player.lastTenRuns[i][1])
            listed++
        } else document.getElementById("run"+(i+1)).textContent = ""
    }
    if (listed > 1) {
        tempTime = tempTime.dividedBy(listed)
        tempIP = tempIP.dividedBy(listed)
        var ippm = tempIP.dividedBy(tempTime/600)
        var tempstring = shorten(ippm) + " IP/min"
        averageIP = tempIP
        if (ippm<1) tempstring = shorten(ippm*60) + " IP/hour"
        document.getElementById("averagerun").textContent = "Last " + listed + " infinities average time: "+ timeDisplayShort(tempTime)+" Average IP gain: "+shortenDimensions(tempIP)+" IP. "+tempstring

        if (tempBest.gte(1e8)) giveAchievement("Oh hey, you're still here");
        if (tempBest.gte(1e300)) giveAchievement("MAXIMUM OVERDRIVE");

        bestRunIppm = tempBest
    } else document.getElementById("averagerun").innerHTML = ""
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
            var tempstring = shorten(eppm) + " EP/min"
            if (eppm<1) tempstring = shorten(eppm*60) + " EP/hour"
            document.getElementById("eternityrun"+(i+1)).textContent = "The Eternity " + (i == 0 ? '1 eternity' : (i+1) + ' eternities') + " ago took " + timeDisplayShort(player.lastTenEternities[i][0]) + " and gave " + shortenDimensions(player.lastTenEternities[i][1]) +" EP. "+ tempstring
            tempTime = tempTime.plus(player.lastTenEternities[i][0])
            tempEP = tempEP.plus(player.lastTenEternities[i][1])
            bestEp = player.lastTenEternities[i][1].max(bestEp)
            listed++
        } else document.getElementById("eternityrun"+(i+1)).textContent = ""
    }
    if (listed > 1) {
        tempTime = tempTime.dividedBy(listed)
        tempEP = tempEP.dividedBy(listed)
        var eppm = tempEP.dividedBy(tempTime/600)
        var tempstring = shorten(eppm) + " EP/min"
        averageEp = tempEP
        if (eppm<1) tempstring = shorten(eppm*60) + " EP/hour"
        document.getElementById("averageEternityRun").textContent = "Last " + listed + " eternities average time: "+ timeDisplayShort(tempTime)+" Average EP gain: "+shortenDimensions(tempEP)+" EP. "+tempstring
    } else document.getElementById("averageEternityRun").textContent = ""
}

function addEternityTime(time, ep) {
    for (var i=player.lastTenEternities.length-1; i>0; i--) {
        player.lastTenEternities[i] = player.lastTenEternities[i-1]
    }
    player.lastTenEternities[0] = [time, ep]
}


document.getElementById("postInfinityButton").onclick = function() {document.getElementById("bigcrunch").click()}

function addTime(time, ip) {
    for (var i=player.lastTenRuns.length-1; i>0; i--) {
        player.lastTenRuns[i] = player.lastTenRuns[i-1]
    }
    player.lastTenRuns[0] = [time, ip]
}

var infchallengeTimes = 999999999

function checkForEndMe() {
    var temp = 0
    for (var i=0; i<11; i++) {
        temp += player.challengeTimes[i]
    }
    if (temp <= 1800) giveAchievement("Not-so-challenging")
    if (temp <= 50) giveAchievement("End me")
    var temp2 = 0
    for (var i=0; i<8;i++) {
        temp2 += player.infchallengeTimes[i]
    }
    infchallengeTimes = temp2
    if (temp2 <= 66.6) giveAchievement("Yes. This is hell.")
}

var isEmptiness=false
document.getElementById("bigcrunch").onclick = function () {
    var challNumber = parseInt(player.currentChallenge[player.currentChallenge.length-1])
    if (player.currentChallenge.length == 11) challNumber = parseInt("1"+player.currentChallenge[player.currentChallenge.length-1])
    if ((player.money.gte(Number.MAX_VALUE) && !player.currentChallenge.includes("post")) || (player.currentChallenge !== "" && player.money.gte(player.challengeTarget))) {
        if ((player.bestInfinityTime > 600 && !player.break) && player.eternities === 0 && implosionCheck === 0 && player.options.animations.bigCrunch) {
            implosionCheck = 1;
            document.getElementById("body").style.animation = "implode 2s 1";
            setTimeout(function(){ document.getElementById("body").style.animation = ""; }, 2000)
            setTimeout(function(){ document.getElementById("bigcrunch").onclick(); }, 1000)
            return
        }
        implosionCheck = 0;
        if (player.thisInfinityTime <= 72000) giveAchievement("That's fast!");
        if (player.thisInfinityTime <= 6000) giveAchievement("That's faster!")
        if (player.thisInfinityTime <= 600) giveAchievement("Forever isn't that long")
        if (player.thisInfinityTime <= 2) giveAchievement("Blink of an eye")
        if (player.eightAmount == 0) giveAchievement("You didn't need it anyway");
        if (player.galaxies == 1) giveAchievement("Claustrophobic");
        if (player.galaxies == 0 && player.resets == 0) giveAchievement("Zero Deaths")
        if (player.currentChallenge == "challenge2" && player.thisInfinityTime <= 1800) giveAchievement("Many Deaths")
        if (player.currentChallenge == "challenge11" && player.thisInfinityTime <= 1800) giveAchievement("Gift from the Gods")
        if (player.currentChallenge == "challenge5" && player.thisInfinityTime <= 1800) giveAchievement("Is this hell?")
        if (player.currentChallenge == "challenge3" && player.thisInfinityTime <= 100) giveAchievement("You did this again just for the achievement right?");
        if (player.firstAmount == 1 && player.resets == 0 && player.galaxies == 0 && player.currentChallenge == "challenge12") giveAchievement("ERROR 909: Dimension not found")
        if (player.currentChallenge != "" && player.challengeTimes[challNumber-2] > player.thisInfinityTime) player.challengeTimes[challNumber-2] = player.thisInfinityTime
        if (player.currentChallenge.includes("post") && player.infchallengeTimes[challNumber-1] > player.thisInfinityTime) player.infchallengeTimes[challNumber-1] = player.thisInfinityTime
        if (player.currentChallenge == "postc5" && player.thisInfinityTime <= 100) giveAchievement("Hevipelle did nothing wrong")
        if (isEmptiness) {
            showTab("dimensions")
            isEmptiness = false
            if (player.eternities > 0 || quantumed) document.getElementById("eternitystorebtn").style.display = "inline-block"
            if (quantumed) document.getElementById("quantumtabbtn").style.display = "inline-block"
        }
        if (player.currentChallenge != "" && !player.challenges.includes(player.currentChallenge)) {
            player.challenges.push(player.currentChallenge);
        }
        if (player.currentEternityChall !== "eterc14" && !inQC(6) && player.money.gte("1e5000") && isIC3Trapped()) player.challenges.push("postc3")
        if (player.challenges.length > 12) giveAchievement("Infinitely Challenging");
        if (player.challenges.length == 20) giveAchievement("Anti-antichallenged");
        if (!player.break || player.currentChallenge != "") {
            var add = new Decimal(getIPMult())
            if (player.timestudy.studies.includes(51)) add = add.times(1e15)
            player.infinityPoints = player.infinityPoints.plus(add);
            addTime(player.thisInfinityTime, add)
        }
        else {
            player.infinityPoints = player.infinityPoints.plus(gainedInfinityPoints())
            addTime(player.thisInfinityTime, gainedInfinityPoints())
            if (gainedInfinityPoints().gte(1e150)) giveAchievement("All your IP are belong to us")
            if (gainedInfinityPoints().gte(1e200) && player.thisInfinityTime <= 20) giveAchievement("Ludicrous Speed")
            if (gainedInfinityPoints().gte(1e250) && player.thisInfinityTime <= 200) giveAchievement("I brake for nobody")
        }
        if (!player.achievements.includes("r111") && player.lastTenRuns[9][1].neq(0)) {
            var n = 0;
            for (i=0; i<9; i++) {
                if (player.lastTenRuns[i][1].gte(player.lastTenRuns[i+1][1].times(Number.MAX_VALUE))) n++;
            }
            if (n == 9) giveAchievement("Yo dawg, I heard you liked infinities...")
        }
        let infGain = 1;
        if (player.thisInfinityTime > 50 && player.achievements.includes("r87")) infGain = 250;
        if (player.timestudy.studies.includes(32)) infGain *= Math.max(player.resets,1);
        if (player.achievements.includes("r133") && player.meta) infGain *= Math.max(1, Math.floor(player.dilation.dilatedTime.pow(.25).toNumber()));
        if (player.currentEternityChall == "eterc4") {
            infGain = 1
            if (player.infinitied >= 16 - (ECTimesCompleted("eterc4")*4)) {
                document.getElementById("challfail").style.display = "block"
                setTimeout(exitChallenge, 500)
                giveAchievement("You're a mistake")
                failureCount++
                if (failureCount > 9) giveAchievement("You're a failure")
            }
        }
        if (autoS && auto) {
          if (gainedInfinityPoints().dividedBy(player.thisInfinityTime).gt(player.autoIP) && !player.break) player.autoIP = gainedInfinityPoints().dividedBy(player.thisInfinityTime);
          if (player.thisInfinityTime<player.autoTime) player.autoTime = player.thisInfinityTime;
        }
        auto = autoS; //only allow autoing if prev crunch was autoed
        autoS = true;
        if (player.tickspeedBoosts !== undefined) player.tickspeedBoosts = 0
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
            firstPow: new Decimal(1),
            secondPow: new Decimal(1),
            thirdPow: new Decimal(1),
            fourthPow: new Decimal(1),
            fifthPow: new Decimal(1),
            sixthPow: new Decimal(1),
            seventhPow: new Decimal(1),
            eightPow: new Decimal(1),
            boughtDims: player.boughtDims,
            totalBoughtDims: resetTotalBought(),
            sacrificed: new Decimal(0),
            achievements: player.achievements,
            challenges: player.challenges,
            currentChallenge: player.currentChallenge,
            infinityUpgrades: player.infinityUpgrades,
            infinityPoints: player.infinityPoints,
            infinitied: player.infinitied + infGain,
            infinitiedBank: player.infinitiedBank,
            totalTimePlayed: player.totalTimePlayed,
            bestInfinityTime: (player.currentEternityChall !== "eterc12") ? Math.min(player.bestInfinityTime, player.thisInfinityTime) : player.bestInfinityTime,
            thisInfinityTime: 0,
            resets: 0,
            dbPower: player.dbPower ? new Decimal(1) : undefined,
            tickspeedBoosts: player.tickspeedBoosts,
            galaxies: 0,
            galacticSacrifice: newGalacticDataOnInfinity(),
            tickDecrease: 0.9,
            totalmoney: player.totalmoney,
            interval: null,
            lastUpdate: player.lastUpdate,
            achPow: player.achPow,
            autobuyers: player.autobuyers,
            costMultipliers: [new Decimal(1e3), new Decimal(1e4), new Decimal(1e5), new Decimal(1e6), new Decimal(1e8), new Decimal(1e10), new Decimal(1e12), new Decimal(1e15)],
            tickspeedMultiplier: new Decimal(10),
            chall2Pow: 1,
            chall3Pow: new Decimal(0.01),
            newsArray: player.newsArray,
            matter: new Decimal(0),
            chall11Pow: new Decimal(1),
            partInfinityPoint: player.partInfinityPoint,
            partInfinitied: player.partInfinitied,
            break: player.break,
            challengeTimes: player.challengeTimes,
            infchallengeTimes: player.infchallengeTimes,
            lastTenRuns: player.lastTenRuns,
            lastTenEternities: player.lastTenEternities,
            infMult: player.infMult,
            infMultCost: player.infMultCost,
            tickSpeedMultDecrease: player.tickSpeedMultDecrease,
            tickSpeedMultDecreaseCost: player.tickSpeedMultDecreaseCost,
            dimensionMultDecrease: player.dimensionMultDecrease,
            dimensionMultDecreaseCost: player.dimensionMultDecreaseCost,
            extraDimPowerIncrease: player.extraDimPowerIncrease,
            dimPowerIncreaseCost: player.dimPowerIncreaseCost,
            version: player.version,
            postChallUnlocked: player.postChallUnlocked,
            postC4Tier: 1,
            postC3Reward: getPostC3RewardStart(),
            postC8Mult: new Decimal(1),
            overXGalaxies: player.overXGalaxies,
            spreadingCancer: player.spreadingCancer,
            infDimensionsUnlocked: player.infDimensionsUnlocked,
            infinityPower: player.infinityPower,
            infinityDimension1: player.infinityDimension1,
            infinityDimension2: player.infinityDimension2,
            infinityDimension3: player.infinityDimension3,
            infinityDimension4: player.infinityDimension4,
            infinityDimension5: player.infinityDimension5,
            infinityDimension6: player.infinityDimension6,
            infinityDimension7: player.infinityDimension7,
            infinityDimension8: player.infinityDimension8,
            infDimBuyers: player.infDimBuyers,
            timeShards: player.timeShards,
            tickThreshold: player.tickThreshold,
            timeDimension1: player.timeDimension1,
            timeDimension2: player.timeDimension2,
            timeDimension3: player.timeDimension3,
            timeDimension4: player.timeDimension4,
            timeDimension5: player.timeDimension5,
            timeDimension6: player.timeDimension6,
            timeDimension7: player.timeDimension7,
            timeDimension8: player.timeDimension8,
            eternityPoints: player.eternityPoints,
            eternities: player.eternities,
            thisEternity: player.thisEternity,
            bestEternity: player.bestEternity,
            eternityUpgrades: player.eternityUpgrades,
            epmult: player.epmult,
            epmultCost: player.epmultCost,
            totalTickGained: player.totalTickGained,
            offlineProd: player.offlineProd,
            offlineProdCost: player.offlineProdCost,
            challengeTarget: player.challengeTarget,
            autoSacrifice: player.autoSacrifice,
            replicanti: player.replicanti,
            timestudy: player.timestudy,
            eternityChalls: player.eternityChalls,
            eternityChallGoal: player.eternityChallGoal,
            currentEternityChall: player.currentEternityChall,
            eternityChallUnlocked: player.eternityChallUnlocked,
            etercreq: player.etercreq,
            autoIP: player.autoIP,
            autoTime: player.autoTime,
            infMultBuyer: player.infMultBuyer,
            autoCrunchMode: player.autoCrunchMode,
            autoEterMode: player.autoEterMode,
            peakSpent: player.peakSpent,
            respec: player.respec,
            respecOptions: player.respecOptions,
            eternityBuyer: player.eternityBuyer,
            eterc8ids: player.eterc8ids,
            eterc8repl: player.eterc8repl,
            dimlife: player.dimlife,
            dead: player.dead,
            dilation: player.dilation,
            why: player.why,
            options: player.options,
            meta: player.meta,
            masterystudies: player.masterystudies,
            autoEterOptions: player.autoEterOptions,
            galaxyMaxBulk: player.galaxyMaxBulk,
            quantum: player.quantum,
            old: player.old,
            aarexModifications: player.aarexModifications
        };
        if (player.bestInfinityTime <= 0.01) giveAchievement("Less than or equal to 0.001");

        document.getElementById("challengeconfirmation").style.display = "inline-block"
        if (!player.options.retryChallenge) player.currentChallenge = ""

        if (player.resets == 0 && player.currentChallenge == "") {
            if (player.infinityUpgrades.includes("skipReset1")) player.resets++;
            if (player.infinityUpgrades.includes("skipReset2")) player.resets++;
            if (player.infinityUpgrades.includes("skipReset3")) player.resets++;
            if (player.infinityUpgrades.includes("skipResetGalaxy")) {
                player.resets++;
                if (player.galaxies == 0) player.galaxies = 1
            }
        }

        if (player.replicanti.unl && !player.achievements.includes("r95")) player.replicanti.amount = new Decimal(1)

        player.replicanti.galaxies = (player.timestudy.studies.includes(33)) ? Math.floor(player.replicanti.galaxies/2) :0

        setInitialDimensionPower();


        if (player.currentChallenge == "challenge12" || player.currentChallenge == "postc1" || player.currentChallenge == "postc6" || inQC(6)) document.getElementById("matter").style.display = "block";
        else document.getElementById("matter").style.display = "none";

        if (player.currentChallenge == "challenge13" || (player.currentChallenge == "postc1" && player.galacticSacrifice)) document.getElementById("chall13Mult").style.display = "block";
        else document.getElementById("chall13Mult").style.display = "none";

        document.getElementById("replicantireset").innerHTML = "Reset replicanti amount, but get a free galaxy<br>" + player.replicanti.galaxies + (extraReplGalaxies ? "+" + extraReplGalaxies : "") + " replicated galax" + ((player.replicanti.galaxies + extraReplGalaxies) == 1 ? "y" : "ies") + " created."

        if (player.achievements.includes("r36")) player.tickspeed = player.tickspeed.times(0.98);
        if (player.achievements.includes("r45")) player.tickspeed = player.tickspeed.times(0.98);
        if (player.achievements.includes("r66")) player.tickspeed = player.tickspeed.times(0.98);
        if (player.achievements.includes("r83")) player.tickspeed = player.tickspeed.times(Decimal.pow(0.95,player.galaxies));
        if (player.eternities < 30) {
            document.getElementById("secondRow").style.display = "none";
            document.getElementById("thirdRow").style.display = "none";
            document.getElementById("tickSpeed").style.visibility = "hidden";
            document.getElementById("tickSpeedMax").style.visibility = "hidden";
            document.getElementById("tickLabel").style.visibility = "hidden";
            document.getElementById("tickSpeedAmount").style.visibility = "hidden";
            document.getElementById("fourthRow").style.display = "none";
            document.getElementById("fifthRow").style.display = "none";
            document.getElementById("sixthRow").style.display = "none";
            document.getElementById("seventhRow").style.display = "none";
            document.getElementById("eightRow").style.display = "none";
        }
        document.getElementById("chall13Mult").style.display = "none";
        document.getElementById("quickReset").style.display = "none";

        checkForEndMe()

        giveAchievement("To infinity!");
        reduceDimCosts()
        if (player.infinitied >= 10) giveAchievement("That's a lot of infinites");
        if (player.infinitied >= 1 && !player.challenges.includes("challenge1")) player.challenges.push("challenge1");


        updateAutobuyers();
        if (player.challenges.includes("challenge1")) player.money = new Decimal(100)
        if (player.achievements.includes("r37")) player.money = new Decimal(1000);
        if (player.achievements.includes("r54")) player.money = new Decimal(2e5);
        if (player.achievements.includes("r55")) player.money = new Decimal(1e10);
        if (player.achievements.includes("r78")) player.money = new Decimal(1e25);
        if (player.challenges.length >= 2) giveAchievement("Daredevil");
        if (player.challenges.length == (player.galacticSacrifice?14:12)) giveAchievement("AntiChallenged");
        resetInfDimensions();
        player.tickspeed = player.tickspeed.times(Decimal.pow(getTickSpeedMultiplier(), player.totalTickGained))
        updateTickSpeed();
        if (player.challenges.length == (player.galacticSacrifice?22:20)) giveAchievement("Anti-antichallenged");
        GPminpeak = new Decimal(0)
        IPminpeak = new Decimal(0)


        if (player.eternities > 10 && player.currentEternityChall !== "eterc8" && player.currentEternityChall !== "eterc2" && player.currentEternityChall !== "eterc10") {
            for (var i=1;i<player.eternities-9 && i < 9; i++) {
                if (player.infDimBuyers[i-1]) {
                    buyMaxInfDims(i)
                    buyManyInfinityDimension(i)
                }
            }
        }

        if (player.eternities >= 40 && player.replicanti.auto[0] && player.currentEternityChall !== "eterc8" && isChanceAffordable()) {
            var maxCost = (player.masterystudies ? player.masterystudies.includes("t265") : false) ? 1/0 : "1e1620"
            var bought = Math.max(Math.floor(player.infinityPoints.min(maxCost).div(player.replicanti.chanceCost).log(1e15) + 1), 0)
            player.replicanti.chance += bought * 0.01
            player.replicanti.chanceCost = player.replicanti.chanceCost.times(Decimal.pow(1e15, bought))
        }

        if (player.eternities >= 60 && player.replicanti.auto[1] && player.currentEternityChall !== "eterc8") {
            while (player.infinityPoints.gte(player.replicanti.intervalCost) && player.currentEternityChall !== "eterc8" && isIntervalAffordable()) upgradeReplicantiInterval()
        }

        if (player.eternities >= 80 && player.replicanti.auto[2] && player.currentEternityChall !== "eterc8") {
            while (player.infinityPoints.gte(player.replicanti.galCost)) upgradeReplicantiGalaxy()
        }

        Marathon2 = 0;

    }
  updateChallenges();
  updateChallengeTimes()
  updateLastTenRuns()


}


function respecToggle(id) {
	if (id==undefined) {
		player.respec=!player.respec
		if (player.masterystudies) {
			player.respecOptions.time=player.respec
			player.respecOptions.mastery=player.respec
		}
	} else {
		if (id==="time") player.respecOptions.time=!player.respecOptions.time
		if (id==="mastery") player.respecOptions.mastery=!player.respecOptions.mastery
		player.respec=player.respecOptions.time||player.respecOptions.mastery
	}
	updateRespecButtons()
}

function updateRespecButtons() {
	var className=player.respec?"timestudybought":"storebtn"
	document.getElementById("respec").className=className
	document.getElementById("respec2").className=className
	document.getElementById("respec3").className=className
	if (player.masterystudies) {
		document.getElementById("respecTime").textContent="Respec time studies: O"+(player.respecOptions.time?"N":"FF")
		document.getElementById("respecMastery").textContent="Respec mastery studies: O"+(player.respecOptions.mastery?"N":"FF")
	}
}

function eternity(force, auto) {
    if ((player.infinityPoints.gte(Number.MAX_VALUE) && (!player.options.eternityconfirm || auto || confirm("Eternity will reset everything except achievements and challenge records. You will also gain an Eternity point and unlock various upgrades."))) || force === true) {
        if (force) player.currentEternityChall = "";
        if (player.currentEternityChall !== "" && player.infinityPoints.lt(player.eternityChallGoal)) return false
        if (player.thisEternity<player.bestEternity && !force) {
            player.bestEternity = player.thisEternity
            if (player.bestEternity < 300) giveAchievement("That wasn't an eternity");
            if (player.bestEternity <= 0.01) giveAchievement("Less than or equal to 0.001");
        }
        if (player.thisEternity < 2) giveAchievement("Eternities are the new infinity")
        if (player.currentEternityChall == "eterc6" && ECTimesCompleted("eterc6") < 5) player.dimensionMultDecrease = Math.max(parseFloat((player.dimensionMultDecrease - 0.2).toFixed(1)),2)
        if (!GUBought("gb4")) if (player.currentEternityChall == "eterc11" && ECTimesCompleted("eterc11") < 5) player.tickSpeedMultDecrease = Math.max(parseFloat((player.tickSpeedMultDecrease - 0.07).toFixed(2)),1.65)
        if (player.infinitied < 10 && !force && !player.boughtDims) giveAchievement("Do you really need a guide for this?");
        if (Decimal.round(player.replicanti.amount) == 9) giveAchievement("We could afford 9");
        if (player.dimlife && !force) giveAchievement("8 nobody got time for that")
        if (player.dead && !force) giveAchievement("You're already dead.")
        if (player.infinitied <= 1 && !force) giveAchievement("Do I really need to infinity")
        if (gainedEternityPoints().gte("1e600") && player.thisEternity <= 600 && player.dilation.active && !force) giveAchievement("Now you're thinking with dilation!")
        if (isEmptiness) {
            showTab("dimensions")
            isEmptiness = false
            if (quantumed) document.getElementById("quantumtabbtn").style.display = "inline-block"
        }
        temp = []
        player.eternityPoints = player.eternityPoints.plus(gainedEternityPoints())
        addEternityTime(player.thisEternity, gainedEternityPoints())
        if (player.currentEternityChall !== "") {
            if (player.eternityChalls[player.currentEternityChall] === undefined) {
                player.eternityChalls[player.currentEternityChall] = 1
            } else if (player.eternityChalls[player.currentEternityChall] < 5) player.eternityChalls[player.currentEternityChall] += 1
            player.etercreq = 0
            respecTimeStudies()
            if (Object.keys(player.eternityChalls).length >= 10) {
                var eterchallscompletedtotal = 0;
                for (i=1; i<Object.keys(player.eternityChalls).length+1; i++) {
                    eterchallscompletedtotal += player.eternityChalls["eterc"+i]
                }
                if (eterchallscompletedtotal >= 50) {
                    giveAchievement("5 more eternities until the update");
                }
            }
        }
        for (var i=0; i<player.challenges.length; i++) {
            if (!player.challenges[i].includes("post") && player.eternities > 1) temp.push(player.challenges[i])
        }
        player.infinitiedBank += gainBankedInf()
        if (player.infinitiedBank > 5000000000) giveAchievement("No ethical consumption");
        if (player.dilation.active && (!force || player.infinityPoints.gte(Number.MAX_VALUE))) {
            player.dilation.tachyonParticles = player.dilation.tachyonParticles.max(getDilGain())
            player.dilation.totalTachyonParticles = player.dilation.totalTachyonParticles.max(player.dilation.tachyonParticles)
            if (player.achievements.includes("ng3p18")) {
                player.dilation.bestTP = player.dilation.bestTP.max(player.dilation.tachyonParticles)
                document.getElementById('bestTP').textContent="Your best ever Tachyon particles was "+shorten(player.dilation.bestTP)+"."
            }
        }
        player.challenges = temp
        if (player.masterystudies && player.dilation.studies.includes(1) && !force) if (player.eternityBuyer.isOn&&player.eternityBuyer.dilationMode) {
            player.eternityBuyer.statBeforeDilation++
            if (player.eternityBuyer.statBeforeDilation>=player.eternityBuyer.dilationPerAmount) {
                startDilatedEternity(true)
                return
            }
        }
        player.eternities += gainEternitiedStat()
        if (player.tickspeedBoosts !== undefined) player.tickspeedBoosts = 0
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
            firstPow: new Decimal(1),
            secondPow: new Decimal(1),
            thirdPow: new Decimal(1),
            fourthPow: new Decimal(1),
            fifthPow: new Decimal(1),
            sixthPow: new Decimal(1),
            seventhPow: new Decimal(1),
            eightPow: new Decimal(1),
            boughtDims: player.boughtDims,
            totalBoughtDims: resetTotalBought(),
            sacrificed: new Decimal(0),
            achievements: player.achievements,
            challenges: challengesCompletedOnEternity(),
            currentChallenge: "",
            infinityUpgrades: player.infinityUpgrades,
            infinityPoints: new Decimal(0),
            infinitied: 0,
            infinitiedBank: player.infinitiedBank,
            totalTimePlayed: player.totalTimePlayed,
            bestInfinityTime: 9999999999,
            thisInfinityTime: 0,
            resets: (player.eternities > 3) ? 4 : 0,
            dbPower: player.dbPower ? new Decimal(1) : undefined,
            tickspeedBoosts: player.tickspeedBoosts,
            galaxies: (player.eternities > 3) ? 1 : 0,
            galacticSacrifice: resetGalacticSacrifice(),
            tickDecrease: 0.9,
            totalmoney: player.totalmoney,
            interval: null,
            lastUpdate: player.lastUpdate,
            achPow: player.achPow,
            autobuyers: (player.eternities > 1) ? player.autobuyers : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            partInfinityPoint: 0,
            partInfinitied: 0,
            break: player.eternities > 1 ? player.break : false,
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
            lastTenEternities: player.lastTenEternities,
            infMult: new Decimal(1),
            infMultCost: new Decimal(10),
            tickSpeedMultDecrease: player.eternities > 19 ? player.tickSpeedMultDecrease : 10,
            tickSpeedMultDecreaseCost: player.eternities > 19 ? player.tickSpeedMultDecreaseCost : 3e6,
            dimensionMultDecrease: player.eternities > 19 ? player.dimensionMultDecrease : 10,
            dimensionMultDecreaseCost: player.eternities > 19 ? player.dimensionMultDecreaseCost : 1e8,
            extraDimPowerIncrease: player.eternities > 19 ? player.extraDimPowerIncrease : 0,
            dimPowerIncreaseCost: player.eternities > 19 ? player.dimPowerIncreaseCost : 1e3,
            version: player.version,
            postChallUnlocked: (player.achievements.includes("r133")) ? 8 : 0,
            postC4Tier: 1,
            postC3Reward: new Decimal(1),
            postC8Mult: new Decimal(1),
            overXGalaxies: player.overXGalaxies,
            spreadingCancer: player.spreadingCancer,
            infDimensionsUnlocked: [false, false, false, false, false, false, false, false],
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
            infDimBuyers: player.infDimBuyers,
            timeShards: new Decimal(0),
            tickThreshold: new Decimal(1),
            totalTickGained: 0,
            timeDimension1: player.timeDimension1,
            timeDimension2: player.timeDimension2,
            timeDimension3: player.timeDimension3,
            timeDimension4: player.timeDimension4,
            timeDimension5: player.timeDimension5,
            timeDimension6: player.timeDimension6,
            timeDimension7: player.timeDimension7,
            timeDimension8: player.timeDimension8,
            eternityPoints: player.eternityPoints,
            eternities: player.eternities,
            thisEternity: 0,
            bestEternity: player.bestEternity,
            eternityUpgrades: player.eternityUpgrades,
            epmult: player.epmult,
            epmultCost: player.epmultCost,
            totalTickGained: 0,
            offlineProd: player.eternities > 19 ? player.offlineProd : 0,
            offlineProdCost: player.eternities > 19 ? player.offlineProdCost : 1e7,
            challengeTarget: 0,
            autoSacrifice: player.eternities > 6 ? player.autoSacrifice : 1,
            replicanti: {
                amount: speedrunMilestonesReached > 23 ? player.replicanti.amount : new Decimal(player.eternities > 49 ? 1 : 0),
                unl: player.eternities > 49 ? true : false,
                chance: (player.dilation.upgrades.includes("ngpp3")&&player.eternities>=2e10&&player.masterystudies) ? Math.min(player.replicanti.chance, 1) : 0.01,
                interval: (player.dilation.upgrades.includes("ngpp3")&&player.eternities>=2e10&&player.masterystudies) ? Math.max(player.replicanti.interval,player.timestudy.studies.includes(22)?1:50) : 1000,
                gal: 0,
                galaxies: 0,
                galCost: new Decimal(1e170),
                galaxybuyer: (player.eternities > 2) ? player.replicanti.galaxybuyer : undefined,
                auto: player.replicanti.auto,
                limit: player.replicanti.newLimit,
                newLimit: player.replicanti.newLimit
            },
            timestudy: player.timestudy,
            eternityChalls: player.eternityChalls,
            eternityChallGoal: new Decimal(Number.MAX_VALUE),
            currentEternityChall: "",
            eternityChallUnlocked: player.eternityChallUnlocked,
            etercreq: player.etercreq,
            autoIP: new Decimal(0),
            autoTime: 1e300,
            infMultBuyer: player.infMultBuyer,
            autoCrunchMode: player.autoCrunchMode,
            autoEterMode: player.autoEterMode,
            peakSpent: player.masterystudies ? 0 : undefined,
            respec: player.respec,
            respecOptions: player.respecOptions,
            eternityBuyer: player.eternityBuyer,
            eterc8ids: 50,
            eterc8repl: 40,
            dimlife: true,
            dead: true,
            dilation: player.dilation,
            why: player.why,
            options: player.options,
            meta: player.meta,
            masterystudies: player.masterystudies,
            autoEterOptions: player.autoEterOptions,
            galaxyMaxBulk: player.galaxyMaxBulk,
            quantum: player.quantum,
            old: player.old,
            aarexModifications: player.aarexModifications
        };
        if (player.galacticSacrifice && player.eternities < 2) player.autobuyers[12]=13
        if (player.respec) {
            respecTimeStudies()
            respecToggle()
        }
        if (player.dilation.active) {
            player.dilation.active = false
            if (player.masterystudies && quantumed) updateColorCharge()
        }
        giveAchievement("Time is relative")
        if (player.eternities >= 100) giveAchievement("This mile took an Eternity");
        if (player.replicanti.unl && speedrunMilestonesReached < 22) player.replicanti.amount = new Decimal(1)
        player.replicanti.galaxies = 0
        extraReplGalaxies = 0
        player.replicanti.chanceCost = Decimal.pow(1e15, player.replicanti.chance * 100 + 9)
        player.replicanti.intervalCost = Decimal.pow(1e10, Math.round(Math.log10(1000/player.replicanti.interval)/-Math.log10(0.9))+14)
        if (player.achievements.includes("r36")) player.tickspeed = player.tickspeed.times(0.98);
        if (player.achievements.includes("r45")) player.tickspeed = player.tickspeed.times(0.98);

        if (player.eternities <= 30) {
            document.getElementById("secondRow").style.display = "none";
            document.getElementById("thirdRow").style.display = "none";
            document.getElementById("tickSpeed").style.visibility = "hidden";
            document.getElementById("tickSpeedMax").style.visibility = "hidden";
            document.getElementById("tickLabel").style.visibility = "hidden";
            document.getElementById("tickSpeedAmount").style.visibility = "hidden";
            document.getElementById("fourthRow").style.display = "none";
            document.getElementById("fifthRow").style.display = "none";
            document.getElementById("sixthRow").style.display = "none";
            document.getElementById("seventhRow").style.display = "none";
            document.getElementById("eightRow").style.display = "none";
        }
        if (inQC(6)) document.getElementById("matter").style.display = "block";
        else document.getElementById("matter").style.display = "none";
        document.getElementById("chall13Mult").style.display = "none";
        document.getElementById("quickReset").style.display = "none";
        if (player.infinitied >= 1 && !player.challenges.includes("challenge1")) player.challenges.push("challenge1");
        var autobuyers = document.getElementsByClassName('autoBuyerDiv')
        if (player.eternities < 2) {
            for (var i=0; i<autobuyers.length;i++) autobuyers.item(i).style.display = "none"
            document.getElementById("buyerBtnDimBoost").style.display = "inline-block"
            document.getElementById("buyerBtnGalaxies").style.display = "inline-block"
            document.getElementById("buyerBtnInf").style.display = "inline-block"
            document.getElementById("buyerBtnTickSpeed").style.display = "inline-block"
            document.getElementById("buyerBtnSac").style.display = "inline-block"
        }
        updateAutobuyers();
        if (player.achievements.includes("r37")) player.money = new Decimal(1000);
        if (player.achievements.includes("r54")) player.money = new Decimal(2e5);
        if (player.achievements.includes("r55")) player.money = new Decimal(1e10);
        if (player.achievements.includes("r78")) player.money = new Decimal(1e25);
        if (player.achievements.includes("r85")) player.infMult = player.infMult.times(4);
        if (player.achievements.includes("r93")) player.infMult = player.infMult.times(4);
        if (player.achievements.includes("r104")) player.infinityPoints = new Decimal(2e25);
        resetInfDimensions();
        updateChallenges();
        updateChallengeTimes()
        updateLastTenRuns()
        updateLastTenEternities()
        if (!player.achievements.includes("r133")) {
            var infchalls = Array.from(document.getElementsByClassName('infchallengediv'))
            for (var i = 0; i< 8; i++) infchalls[i].style.display = "none"
        }
        GPminpeak = new Decimal(0)
        IPminpeak = new Decimal(0)
        EPminpeakType = 'normal'
        EPminpeak = new Decimal(0)
        updateMilestones()
        resetTimeDimensions()
        document.getElementById("eternityconf").style.display = "inline-block"
        if (player.eternities < 20) player.autobuyers[9].bulk = 1
        if (player.eternities < 20) document.getElementById("bulkDimboost").value = player.autobuyers[9].bulk
        if (player.eternities < 50) {
            document.getElementById("replicantidiv").style.display="none"
            document.getElementById("replicantiunlock").style.display="inline-block"
        } else if (document.getElementById("replicantidiv").style.display === "none" && player.eternities >= 50) {
            document.getElementById("replicantidiv").style.display="inline-block"
            document.getElementById("replicantiunlock").style.display="none"
        }
        if (player.eternities > 2 && player.replicanti.galaxybuyer === undefined) player.replicanti.galaxybuyer = false
        document.getElementById("infinityPoints1").innerHTML = "You have <span class=\"IPAmount1\">"+shortenDimensions(player.infinityPoints)+"</span> Infinity points."
        document.getElementById("infinityPoints2").innerHTML = "You have <span class=\"IPAmount2\">"+shortenDimensions(player.infinityPoints)+"</span> Infinity points."
        if (player.eternities < 2) {
            document.getElementById("break").textContent = "BREAK INFINITY"
            document.getElementById("abletobreak").style.display = "block"
        }
        document.getElementById("replicantireset").innerHTML = "Reset replicanti amount, but get a free galaxy<br>0 replicated galaxies created."
        document.getElementById("eternitybtn").style.display = player.infinityPoints.gte(player.eternityChallGoal) ? "inline-block" : "none"
        document.getElementById("eternityPoints2").style.display = "inline-block"
        document.getElementById("eternitystorebtn").style.display = "inline-block"
        document.getElementById("infiMult").innerHTML = "Multiply infinity points from all sources by "+ipMultPower+"<br>currently: "+shorten(getIPMult()) +"x<br>Cost: "+shortenCosts(player.infMultCost)+" IP"
        updateEternityUpgrades()
        document.getElementById("totaltickgained").textContent = "You've gained "+getFullExpansion(player.totalTickGained)+" tickspeed upgrades."
        updateTickSpeed();
        playerInfinityUpgradesOnEternity()
        document.getElementById("eternityPoints2").innerHTML = "You have <span class=\"EPAmount2\">"+shortenDimensions(player.eternityPoints)+"</span> Eternity point"+((player.eternityPoints.eq(1)) ? "." : "s.")
        updateEternityChallenges()
        if (player.eternities <= 1) {
            showTab("dimensions")
            showDimTab("timedimensions")
            loadAutoBuyerSettings()
        }
        Marathon2 = 0;
        doAutoEterTick()
        if (player.masterystudies&&player.dilation.upgrades.includes("ngpp3")&&player.eternities>=1e9) player.dbPower=new Decimal(1)
    }
}

function challengesCompletedOnEternity() {
	var array = []
	if (player.eternities>1) for (i=1;i<(player.galacticSacrifice?15:13);i++) array.push("challenge"+i)
	if (player.achievements.includes("r133")) for (i=1;i<9;i++) array.push("postc"+i)
	return array
}

function gainEternitiedStat() {
	if (player.eternities < 1 && player.achievements.includes("ng3p12")) return 20
	return player.dilation.upgrades.includes('ngpp2') ? Math.floor(Decimal.pow(player.dilation.dilatedTime, .1).toNumber()) : 1
}

function gainBankedInf() {
	let ret = 0 
	if (player.timestudy.studies.includes(191)) ret += Math.floor(player.infinitied*0.05)
	if (player.achievements.includes("r131")) ret += Math.floor(player.infinitied*0.05)
	return ret
}

function exitChallenge() {
    if (player.currentChallenge !== "") {
        document.getElementById(player.currentChallenge).textContent = "Start"
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
    if (player.masterystudies) if (!inQC(0)) quantum(false, true, 0)
}

function startChallenge(name, target) {
    if (name == "postc3" && isIC3Trapped()) return
    if (name == "challenge7" && inQC(4)) return
    if ((name == "postc2" || name == "postc6" || name == "postc7" || name == "postc8") && inQC(6)) return
    if (name.includes("post")) {
        if (player.autobuyers[11]%1===0) return
        if (player.autobuyers[11].interval>100) return
    }
    if (player.options.challConf && name != "") if (!confirm("You will start over with just your infinity upgrades, and achievements. You need to reach " + (name.includes("post") ? "a set goal" : "infinity") + " with special conditions. NOTE: The rightmost infinity upgrade column doesn't work on challenges.")) return
    if (player.currentChallenge != "") document.getElementById(player.currentChallenge).textContent = "Start"
    if (player.tickspeedBoosts !== undefined) player.tickspeedBoosts = 0
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
        firstPow: new Decimal(1),
        secondPow: new Decimal(1),
        thirdPow: new Decimal(1),
        fourthPow: new Decimal(1),
        fifthPow: new Decimal(1),
        sixthPow: new Decimal(1),
        seventhPow: new Decimal(1),
        eightPow: new Decimal(1),
        boughtDims: player.boughtDims,
        totalBoughtDims: resetTotalBought(),
        sacrificed: new Decimal(0),
      achievements: player.achievements,
      challenges: player.challenges,
      currentChallenge: name,
      infinityUpgrades: player.infinityUpgrades,
      infinityPoints: player.infinityPoints,
      infinitied: player.infinitied,
      infinitiedBank: player.infinitiedBank,
      totalTimePlayed: player.totalTimePlayed,
      bestInfinityTime: player.bestInfinityTime,
      thisInfinityTime: 0,
      resets: 0,
      dbPower: player.dbPower ? new Decimal(1) : undefined,
      tickspeedBoosts: player.tickspeedBoosts,
      galaxies: 0,
      galacticSacrifice: newGalacticDataOnInfinity(),
      tickDecrease: 0.9,
      totalmoney: player.totalmoney,
      interval: null,
      lastUpdate: player.lastUpdate,
      achPow: player.achPow,
      autobuyers: player.autobuyers,
      costMultipliers: [new Decimal(1e3), new Decimal(1e4), new Decimal(1e5), new Decimal(1e6), new Decimal(1e8), new Decimal(1e10), new Decimal(1e12), new Decimal(1e15)],
      tickspeedMultiplier: new Decimal(10),
      chall2Pow: 1,
      chall3Pow: new Decimal(0.01),
      matter: new Decimal(0),
      newsArray: player.newsArray,
      chall11Pow: new Decimal(1),
      partInfinityPoint: player.partInfinityPoint,
      partInfinitied: player.partInfinitied,
      break: player.break,
      challengeTimes: player.challengeTimes,
      infchallengeTimes: player.infchallengeTimes,
      lastTenRuns: player.lastTenRuns,
      lastTenEternities: player.lastTenEternities,
      infMult: player.infMult,
      infMultCost: player.infMultCost,
      tickSpeedMultDecrease: player.tickSpeedMultDecrease,
      tickSpeedMultDecreaseCost: player.tickSpeedMultDecreaseCost,
      dimensionMultDecrease: player.dimensionMultDecrease,
      dimensionMultDecreaseCost: player.dimensionMultDecreaseCost,
      extraDimPowerIncrease: player.extraDimPowerIncrease,
      dimPowerIncreaseCost: player.dimPowerIncreaseCost,
      version: player.version,
      postChallUnlocked: player.postChallUnlocked,
      postC4Tier: 1,
      postC3Reward: getPostC3RewardStart(),
      postC8Mult: new Decimal(1),
      overXGalaxies: player.overXGalaxies,
      spreadingCancer: player.spreadingCancer,
      infDimensionsUnlocked: player.infDimensionsUnlocked,
      infinityPower: player.infinityPower,
      infinityDimension1: player.infinityDimension1,
      infinityDimension2: player.infinityDimension2,
      infinityDimension3: player.infinityDimension3,
      infinityDimension4: player.infinityDimension4,
      infinityDimension5: player.infinityDimension5,
      infinityDimension6: player.infinityDimension6,
      infinityDimension7: player.infinityDimension7,
      infinityDimension8: player.infinityDimension8,
      infDimBuyers: player.infDimBuyers,
      timeShards: player.timeShards,
      tickThreshold: player.tickThreshold,
      timeDimension1: player.timeDimension1,
      timeDimension2: player.timeDimension2,
      timeDimension3: player.timeDimension3,
      timeDimension4: player.timeDimension4,
      timeDimension5: player.timeDimension5,
      timeDimension6: player.timeDimension6,
      timeDimension7: player.timeDimension7,
      timeDimension8: player.timeDimension8,
      eternityPoints: player.eternityPoints,
      eternities: player.eternities,
      thisEternity: player.thisEternity,
      bestEternity: player.bestEternity,
      eternityUpgrades: player.eternityUpgrades,
      epmult: player.epmult,
      epmultCost: player.epmultCost,
      totalTickGained: player.totalTickGained,
      offlineProd: player.offlineProd,
      offlineProdCost: player.offlineProdCost,
      challengeTarget: target,
      autoSacrifice: player.autoSacrifice,
      replicanti: player.replicanti,
      timestudy: player.timestudy,
      eternityChalls: player.eternityChalls,
      eternityChallGoal: player.eternityChallGoal,
      currentEternityChall: player.currentEternityChall,
      eternityChallUnlocked: player.eternityChallUnlocked,
      etercreq: player.etercreq,
      autoIP: player.autoIP,
      autoTime: player.autoTime,
      infMultBuyer: player.infMultBuyer,
      autoCrunchMode: player.autoCrunchMode,
      autoEterMode: player.autoEterMode,
      peakSpent: player.peakSpent,
      respec: player.respec,
      respecOptions: player.respecOptions,
      eternityBuyer: player.eternityBuyer,
      eterc8ids: player.eterc8ids,
      eterc8repl: player.eterc8repl,
      dimlife: player.dimlife,
      dead: player.dead,
      dilation: player.dilation,
      why: player.why,
      options: player.options,
      meta: player.meta,
      masterystudies: player.masterystudies,
      autoEterOptions: player.autoEterOptions,
      galaxyMaxBulk: player.galaxyMaxBulk,
      quantum: player.quantum,
      old: player.old,
      aarexModifications: player.aarexModifications
    };
	if (player.currentChallenge == "challenge10" || player.currentChallenge == "postc1") {
        player.thirdCost = new Decimal(100)
        player.fourthCost = new Decimal(500)
        player.fifthCost = new Decimal(2500)
        player.sixthCost = new Decimal(2e4)
        player.seventhCost = new Decimal(2e5)
        player.eightCost = new Decimal(4e6)
    }
    reduceDimCosts()
    if (player.currentChallenge == "postc1") player.costMultipliers = [new Decimal(1e3),new Decimal(5e3),new Decimal(1e4),new Decimal(1.2e4),new Decimal(1.8e4),new Decimal(2.6e4),new Decimal(3.2e4),new Decimal(4.2e4)];
    if (player.currentChallenge == "postc2") {
        player.eightAmount = new Decimal(1);
        player.eightBought = 1;
        player.resets = 4;
    }

    if (player.replicanti.unl) player.replicanti.amount = new Decimal(1)
    player.replicanti.galaxies = 0

    // even if we're in a challenge, apparently if it's challenge 2 we might have four resets anyway.
    setInitialDimensionPower();


    GPminpeak = new Decimal(0)
    IPminpeak = new Decimal(0)
    if (player.currentChallenge.includes("post")) {
		player.break = true
		document.getElementById("break").innerHTML = "FIX INFINITY"
    }
    if (player.achievements.includes("r36")) player.tickspeed = player.tickspeed.times(0.98);
    if (player.achievements.includes("r45")) player.tickspeed = player.tickspeed.times(0.98);
    if (player.achievements.includes("r66")) player.tickspeed = player.tickspeed.times(0.98);
    if (player.achievements.includes("r83")) player.tickspeed = player.tickspeed.times(Decimal.pow(0.95,player.galaxies));

    if (player.eternities < 30) {
        document.getElementById("secondRow").style.display = "none";
        document.getElementById("thirdRow").style.display = "none";
        document.getElementById("tickSpeed").style.visibility = "hidden";
        document.getElementById("tickSpeedMax").style.visibility = "hidden";
        document.getElementById("tickLabel").style.visibility = "hidden";
        document.getElementById("tickSpeedAmount").style.visibility = "hidden";
        document.getElementById("fourthRow").style.display = "none";
    }
    document.getElementById("fifthRow").style.display= "none";
    document.getElementById("sixthRow").style.display= "none";
    document.getElementById("seventhRow").style.display= "none";
    document.getElementById("eightRow").style.display= "none";
    if (name == "challenge12" || player.currentChallenge == "postc1" || player.currentChallenge == "postc6" || inQC(6)) document.getElementById("matter").style.display = "block";
    else document.getElementById("matter").style.display = "none";
    if (player.currentChallenge == "challenge13" || (player.currentChallenge == "postc1" && player.galacticSacrifice)) document.getElementById("chall13Mult").style.display = "block";
    else document.getElementById("chall13Mult").style.display = "none";
    if (player.currentChallenge == "challenge12" || player.currentChallenge == "challenge9" || player.currentChallenge == "challenge5" || player.currentChallenge == "challenge14" ||
        player.currentChallenge == "postc1" || player.currentChallenge == "postc4" || player.currentChallenge == "postc5" || player.currentChallenge == "postc6" || player.currentChallenge == "postc8") document.getElementById("quickReset").style.display = "inline-block";
    else document.getElementById("quickReset").style.display = "none";

    showTab('dimensions');
    updateChallenges();
    if (player.challenges.includes("challenge1")) player.money = new Decimal(100)
    if (player.achievements.includes("r37")) player.money = new Decimal(1000);
    if (player.achievements.includes("r54")) player.money = new Decimal(2e5);
    if (player.achievements.includes("r55")) player.money = new Decimal(1e10);
    if (player.achievements.includes("r78")) player.money = new Decimal(1e25);
    showTab("dimensions")

    if (player.infinitied >= 10) giveAchievement("That's a lot of infinites");

    document.getElementById("replicantireset").innerHTML = "Reset replicanti amount, but get a free galaxy<br>" + player.replicanti.galaxies + (extraReplGalaxies ? "+" + extraReplGalaxies : "") + " replicated galax" + ((player.replicanti.galaxies + extraReplGalaxies) == 1 ? "y" : "ies") + " created."

    resetInfDimensions();
    player.tickspeed = player.tickspeed.times(Decimal.pow(getTickSpeedMultiplier(), player.totalTickGained))
    updateTickSpeed();

    if (player.resets == 0 && player.currentChallenge == "") {
        if (player.infinityUpgrades.includes("skipReset1")) player.resets++;
        if (player.infinityUpgrades.includes("skipReset2")) player.resets++;
        if (player.infinityUpgrades.includes("skipReset3")) player.resets++;
        if (player.infinityUpgrades.includes("skipResetGalaxy")) {
            player.resets++;
            if (player.galaxies == 0) player.galaxies = 1
        }
    }
    if (player.currentChallenge.includes("post") && player.currentEternityChall !== "") giveAchievement("I wish I had gotten 7 eternities")
    Marathon2 = 0;
}

function unlockEChall(idx) {
    if (player.eternityChallUnlocked == 0) {
        player.eternityChallUnlocked = idx
        document.getElementById("eterc"+player.eternityChallUnlocked+"div").style.display = "inline-block"
        if (!justImported) showTab("challenges")
        if (!justImported) showChallengesTab("eternitychallenges")
        if (idx !== 12 && idx !== 13) player.etercreq = idx
    }
    updateEternityChallenges()
    updateTimeStudyButtons()
}

function ECTimesCompleted(name) {
    if (player.eternityChalls[name] === undefined) return 0
    else return player.eternityChalls[name]
}

function canUnlockEC(idx, cost, study, study2) {
    study2 = (study2 !== undefined) ? study2 : 0;
    if (player.eternityChallUnlocked !== 0) return false
    if (!player.timestudy.studies.includes(study) && (player.study2 == 0 || !player.timestudy.studies.includes(study2))) return false
    if (player.timestudy.theorem < cost) return false
    if (player.etercreq == idx && idx !== 11 && idx !== 12) return true

    var ec1Mult=player.aarexModifications.newGameExpVersion?1e3:2e4
    switch(idx) {
        case 1:
        if (player.eternities >= (ECTimesCompleted("eterc1")?ECTimesCompleted("eterc1")+1:1)*ec1Mult) return true
        break;

        case 2:
        if (player.totalTickGained >= 1300+(ECTimesCompleted("eterc2")*150)) return true
        break;

        case 3:
        if (player.eightAmount.gte(17300+(ECTimesCompleted("eterc3")*1250))) return true
        break;

        case 4:
        if (1e8 + (ECTimesCompleted("eterc4")*5e7) <= getInfinitied()) return true
        break;

        case 5:
        if (160 + (ECTimesCompleted("eterc5")*14) <= player.galaxies) return true
        break;

        case 6:
        if (40 + (ECTimesCompleted("eterc6")*5) <= player.replicanti.galaxies) return true
        break;

        case 7:
        if (player.money.gte(new Decimal("1e500000").times(new Decimal("1e300000").pow(ECTimesCompleted("eterc7"))))) return true
        break;

        case 8:
        if (player.infinityPoints.gte(new Decimal("1e4000").times(new Decimal("1e1000").pow(ECTimesCompleted("eterc8"))))) return true
        break;

        case 9:
        if (player.infinityPower.gte(new Decimal("1e17500").times(new Decimal("1e2000").pow(ECTimesCompleted("eterc9"))))) return true
        break;

        case 10:
        if (player.eternityPoints.gte(new Decimal("1e100").times(new Decimal("1e20").pow(ECTimesCompleted("eterc10"))))) return true
        break;

        case 11:
        if (player.timestudy.studies.includes(71) && !player.timestudy.studies.includes(72) && !player.timestudy.studies.includes(73)) return true
        break;

        case 12:
        if (player.timestudy.studies.includes(73) && !player.timestudy.studies.includes(71) && !player.timestudy.studies.includes(72)) return true
        break;
    }
}

function updateECUnlockButtons() {
    if (canUnlockEC(1, 30, 171)) {
        document.getElementById("ec1unl").className = "eternitychallengestudy"
    } else {
        document.getElementById("ec1unl").className = "eternitychallengestudylocked"
    }

    if (canUnlockEC(2, 35, 171)) {
        document.getElementById("ec2unl").className = "eternitychallengestudy"
    } else {
        document.getElementById("ec2unl").className = "eternitychallengestudylocked"
    }

    if (canUnlockEC(3, 40, 171)) {
        document.getElementById("ec3unl").className = "eternitychallengestudy"
    } else {
        document.getElementById("ec3unl").className = "eternitychallengestudylocked"
    }

    if (canUnlockEC(4, 70, 143)) {
        document.getElementById("ec4unl").className = "eternitychallengestudy"
    } else {
        document.getElementById("ec4unl").className = "eternitychallengestudylocked"
    }

    if (canUnlockEC(5, 130, 42)) {
        document.getElementById("ec5unl").className = "eternitychallengestudy"
    } else {
        document.getElementById("ec5unl").className = "eternitychallengestudylocked"
    }

    if (canUnlockEC(6, 85, 121)) {
        document.getElementById("ec6unl").className = "eternitychallengestudy"
    } else {
        document.getElementById("ec6unl").className = "eternitychallengestudylocked"
    }

    if (canUnlockEC(7, 115, 111)) {
        document.getElementById("ec7unl").className = "eternitychallengestudy"
    } else {
        document.getElementById("ec7unl").className = "eternitychallengestudylocked"
    }

    if (canUnlockEC(8, 115, 123)) {
        document.getElementById("ec8unl").className = "eternitychallengestudy"
    } else {
        document.getElementById("ec8unl").className = "eternitychallengestudylocked"
    }

    if (canUnlockEC(9, 415, 151)) {
        document.getElementById("ec9unl").className = "eternitychallengestudy"
    } else {
        document.getElementById("ec9unl").className = "eternitychallengestudylocked"
    }

    if (canUnlockEC(10, 550, 181)) {
        document.getElementById("ec10unl").className = "eternitychallengestudy"
    } else {
        document.getElementById("ec10unl").className = "eternitychallengestudylocked"
    }

    if (canUnlockEC(11, 1, 231, 232)) {
        document.getElementById("ec11unl").className = "eternitychallengestudy"
    } else {
        document.getElementById("ec11unl").className = "eternitychallengestudylocked"
    }

    if (canUnlockEC(12, 1, 233, 234)) {
        document.getElementById("ec12unl").className = "eternitychallengestudy"
    } else {
        document.getElementById("ec12unl").className = "eternitychallengestudylocked"
    }

    if (player.eternityChallUnlocked !== 0 )document.getElementById("ec"+player.eternityChallUnlocked+"unl").className = "eternitychallengestudybought"
}

document.getElementById("ec1unl").onclick = function() {
    if (canUnlockEC(1, 30, 171)) {
        unlockEChall(1)
        player.timestudy.theorem -= 30
        updateTheoremButtons()
        updateTimeStudyButtons()
        drawStudyTree()
    }
}

document.getElementById("ec2unl").onclick = function() {
    if (canUnlockEC(2, 35, 171)) {
        unlockEChall(2)
        player.timestudy.theorem -= 35
        updateTheoremButtons()
        updateTimeStudyButtons()
        drawStudyTree()
    }
}

document.getElementById("ec3unl").onclick = function() {
    if (canUnlockEC(3, 40, 171)) {
        unlockEChall(3)
        player.timestudy.theorem -= 40
        updateTheoremButtons()
        updateTimeStudyButtons()
        drawStudyTree()
    }
}

document.getElementById("ec4unl").onclick = function() {
    if (canUnlockEC(4, 70, 143)) {
        unlockEChall(4)
        player.timestudy.theorem -= 70
        updateTheoremButtons()
        updateTimeStudyButtons()
        drawStudyTree()
    }
}

document.getElementById("ec5unl").onclick = function() {
    if (canUnlockEC(5, 130, 42)) {
        unlockEChall(5)
        player.timestudy.theorem -= 130
        updateTheoremButtons()
        updateTimeStudyButtons()
        drawStudyTree()
    }
}

document.getElementById("ec6unl").onclick = function() {
    if (canUnlockEC(6, 85, 121)) {
        unlockEChall(6)
        player.timestudy.theorem -= 85
        updateTheoremButtons()
        updateTimeStudyButtons()
        drawStudyTree()
    }
}

document.getElementById("ec7unl").onclick = function() {
    if (canUnlockEC(7, 115, 111)) {
        unlockEChall(7)
        player.timestudy.theorem -= 115
        updateTheoremButtons()
        updateTimeStudyButtons()
        drawStudyTree()
    }
}

document.getElementById("ec8unl").onclick = function() {
    if (canUnlockEC(8, 115, 123)) {
        unlockEChall(8)
        player.timestudy.theorem -= 115
        updateTheoremButtons()
        updateTimeStudyButtons()
        drawStudyTree()
    }
}

document.getElementById("ec9unl").onclick = function() {
    if (canUnlockEC(9, 415, 151)) {
        unlockEChall(9)
        player.timestudy.theorem -= 415
        updateTheoremButtons()
        updateTimeStudyButtons()
        drawStudyTree()
    }
}

document.getElementById("ec10unl").onclick = function() {
    if (canUnlockEC(10, 550, 181)) {
        unlockEChall(10)
        player.timestudy.theorem -= 550
        updateTheoremButtons()
        updateTimeStudyButtons()
        drawStudyTree()
    }
}

document.getElementById("ec11unl").onclick = function() {
    if (canUnlockEC(11, 1, 231, 232)) {
        unlockEChall(11)
        player.timestudy.theorem -= 1
        updateTheoremButtons()
        updateTimeStudyButtons()
        drawStudyTree()
    }
}

document.getElementById("ec12unl").onclick = function() {
    if (canUnlockEC(12, 1, 233, 234)) {
        unlockEChall(12)
        player.timestudy.theorem -= 1
        updateTheoremButtons()
        updateTimeStudyButtons()
        drawStudyTree()
    }
}

function startEternityChallenge(name, startgoal, goalIncrease) {
    if (player.currentEternityChall == name || parseInt(name.split("eterc")[1]) != player.eternityChallUnlocked) return
    if (player.options.challConf) if (!confirm("You will start over with just your time studies, eternity upgrades and achievements. You need to reach a set IP with special conditions.")) return
    player.eternities += gainEternitiedStat()
    if (player.tickspeedBoosts !== undefined) player.tickspeedBoosts = 0
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
        firstPow: new Decimal(1),
        secondPow: new Decimal(1),
        thirdPow: new Decimal(1),
        fourthPow: new Decimal(1),
        fifthPow: new Decimal(1),
        sixthPow: new Decimal(1),
        seventhPow: new Decimal(1),
        eightPow: new Decimal(1),
        boughtDims: player.boughtDims,
        totalBoughtDims: resetTotalBought(),
        sacrificed: new Decimal(0),
        achievements: player.achievements,
        challenges: challengesCompletedOnEternity(),
        currentChallenge: "",
        infinityUpgrades: player.infinityUpgrades,
        infinityPoints: new Decimal(0),
        infinitied: 0,
        infinitiedBank: player.infinitiedBank,
        totalTimePlayed: player.totalTimePlayed,
        bestInfinityTime: 9999999999,
        thisInfinityTime: 0,
        resets: (player.eternities > 3) ? 4 : 0,
        dbPower: player.dbPower ? new Decimal(1) : undefined,
        tickspeedBoosts: player.tickspeedBoosts,
        galaxies: (player.eternities > 3) ? 1 : 0,
        galacticSacrifice: resetGalacticSacrifice(),
        tickDecrease: 0.9,
        totalmoney: player.totalmoney,
        interval: null,
        lastUpdate: player.lastUpdate,
        achPow: player.achPow,
        autobuyers: player.eternities > 1 ? player.autobuyers : [1,2,3,4,5,6,7,8,9,10,11,12],
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
        lastTenEternities: player.lastTenEternities,
        infMult: new Decimal(1),
        infMultCost: new Decimal(10),
        tickSpeedMultDecrease: player.eternities > 19 ? player.tickSpeedMultDecrease : 10,
        tickSpeedMultDecreaseCost: player.eternities > 19 ? player.tickSpeedMultDecreaseCost : 3e6,
        dimensionMultDecrease: player.eternities > 19 ? player.dimensionMultDecrease : 10,
        dimensionMultDecreaseCost: player.eternities > 19 ? player.dimensionMultDecreaseCost : 1e8,
        extraDimPowerIncrease: player.eternities > 19 ? player.extraDimPowerIncrease : 0,
        dimPowerIncreaseCost: player.eternities > 19 ? player.dimPowerIncreaseCost : 1e3,
        version: player.version,
        postChallUnlocked: (player.achievements.includes("r133")) ? 8 : 0,
        postC4Tier: 1,
        postC3Reward: new Decimal(1),
        postC8Mult: new Decimal(1),
        overXGalaxies: player.overXGalaxies,
        spreadingCancer: player.spreadingCancer,
        infDimensionsUnlocked: [false, false, false, false, false, false, false, false],
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
        infDimBuyers: player.infDimBuyers,
        timeShards: new Decimal(0),
        tickThreshold: new Decimal(1),
        totalTickGained: 0,
        timeDimension1: player.timeDimension1,
        timeDimension2: player.timeDimension2,
        timeDimension3: player.timeDimension3,
        timeDimension4: player.timeDimension4,
        timeDimension5: player.timeDimension5,
        timeDimension6: player.timeDimension6,
        timeDimension7: player.timeDimension7,
        timeDimension8: player.timeDimension8,
        eternityPoints: player.eternityPoints,
        eternities: player.eternities,
        thisEternity: 0,
        bestEternity: player.bestEternity,
        eternityUpgrades: player.eternityUpgrades,
        epmult: player.epmult,
        epmultCost: player.epmultCost,
        totalTickGained: 0,
        offlineProd: player.eternities > 19 ? player.offlineProd : 0,
        offlineProdCost: player.eternities > 19 ? player.offlineProdCost : 1e7,
        challengeTarget: 0,
        autoSacrifice: player.eternities > 6 ? player.autoSacrifice : 1,
        replicanti: {
            amount: speedrunMilestonesReached > 23 ? player.replicanti.amount : new Decimal(player.eternities > 49 ? 1 : 0),
            unl: player.eternities > 49 ? true : false,
            chance: (player.dilation.upgrades.includes("ngpp3")&&player.eternities>=2e10&&player.masterystudies) ? Math.min(player.replicanti.chance, 1) : 0.01,
            interval: (player.dilation.upgrades.includes("ngpp3")&&player.eternities>=2e10&&player.masterystudies) ? Math.max(player.replicanti.interval,player.timestudy.studies.includes(22)?1:50) : 1000,
            gal: 0,
            galaxies: 0,
            galCost: new Decimal(1e170),
            galaxybuyer: (player.eternities > 2) ? player.replicanti.galaxybuyer : undefined,
            auto: player.replicanti.auto,
            limit: player.replicanti.newLimit,
            newLimit: player.replicanti.newLimit
        },
        timestudy: player.timestudy,
        eternityChalls: player.eternityChalls,
        eternityChallGoal: startgoal.times(goalIncrease.pow(ECTimesCompleted(name))).max(startgoal),
        currentEternityChall: name,
        eternityChallUnlocked: player.eternityChallUnlocked,
        etercreq: player.etercreq,
        autoIP: new Decimal(0),
        autoTime: 1e300,
        infMultBuyer: player.infMultBuyer,
        autoCrunchMode: player.autoCrunchMode,
        autoEterMode: player.autoEterMode,
        peakSpent: player.masterystudies ? 0 : undefined,
        respec: player.respec,
        respecOptions: player.respecOptions,
        eternityBuyer: player.eternityBuyer,
        eterc8ids: 50,
        eterc8repl: 40,
        dimlife: true,
        dead: true,
        dilation: player.dilation,
        why: player.why,
        options: player.options,
        meta: player.meta,
        masterystudies: player.masterystudies,
        autoEterOptions: player.autoEterOptions,
        galaxyMaxBulk: player.galaxyMaxBulk,
        quantum: player.quantum,
        old: player.old,
        aarexModifications: player.aarexModifications
    };
    if (player.galacticSacrifice && player.eternities < 2) player.autobuyers[12]=13
    if (player.dilation.active) {
        player.dilation.active = false
        if (player.masterystudies && quantumed) updateColorCharge()
    }
    if (player.replicanti.unl && speedrunMilestonesReached < 22) player.replicanti.amount = new Decimal(1)
    player.replicanti.galaxies = 0
    extraReplGalaxies = 0
    player.replicanti.chanceCost = Decimal.pow(1e15, player.replicanti.chance * 100 + 9)
    player.replicanti.intervalCost = Decimal.pow(1e10, Math.round(Math.log10(1000/player.replicanti.interval)/-Math.log10(0.9))+14)
    if (player.achievements.includes("r36")) player.tickspeed = player.tickspeed.times(0.98);
    if (player.achievements.includes("r45")) player.tickspeed = player.tickspeed.times(0.98);
    if (player.eternities < 30) {
        document.getElementById("secondRow").style.display = "none";
        document.getElementById("thirdRow").style.display = "none";
        document.getElementById("tickSpeed").style.visibility = "hidden";
        document.getElementById("tickSpeedMax").style.visibility = "hidden";
        document.getElementById("tickLabel").style.visibility = "hidden";
        document.getElementById("tickSpeedAmount").style.visibility = "hidden";
        document.getElementById("fourthRow").style.display = "none";
    }
    document.getElementById("fifthRow").style.display = "none";
    document.getElementById("sixthRow").style.display = "none";
    document.getElementById("seventhRow").style.display = "none";
    document.getElementById("eightRow").style.display = "none";
    if (inQC(6)) document.getElementById("matter").style.display = "block";
    else document.getElementById("matter").style.display = "none";
    document.getElementById("chall13Mult").style.display = "none";
    document.getElementById("quickReset").style.display = "none";
    var autobuyers = document.getElementsByClassName('autoBuyerDiv')
    if (player.eternities < 2) {
        for (var i=0; i<autobuyers.length;i++) autobuyers.item(i).style.display = "none"
        document.getElementById("buyerBtnDimBoost").style.display = "inline-block"
        document.getElementById("buyerBtnGalaxies").style.display = "inline-block"
        document.getElementById("buyerBtnInf").style.display = "inline-block"
        document.getElementById("buyerBtnTickSpeed").style.display = "inline-block"
        document.getElementById("buyerBtnSac").style.display = "inline-block"
    }
    updateAutobuyers();
    if (player.achievements.includes("r37")) player.money = new Decimal(1000);
    if (player.achievements.includes("r54")) player.money = new Decimal(2e5);
    if (player.achievements.includes("r55")) player.money = new Decimal(1e10);
    if (player.achievements.includes("r78")) player.money = new Decimal(1e25);
    if (player.achievements.includes("r85")) player.infMult = player.infMult.times(4);
    if (player.achievements.includes("r93")) player.infMult = player.infMult.times(4);
    if (player.achievements.includes("r104")) player.infinityPoints = new Decimal(2e25);
    resetInfDimensions();
    updateChallenges();
    updateChallengeTimes()
    updateLastTenRuns()
    updateLastTenEternities()
    if (!player.achievements.includes("r133")) {
        var infchalls = Array.from(document.getElementsByClassName('infchallengediv'))
        for (var i = 0; i< infchalls.length; i++) infchalls[i].style.display = "none"
    }
    GPminpeak = new Decimal(0)
    IPminpeak = new Decimal(0)
    EPminpeakType = 'normal'
    EPminpeak = new Decimal(0)
    updateMilestones()
    resetTimeDimensions()
    if (player.eternities < 20) player.autobuyers[9].bulk = 1
    if (player.eternities < 20) document.getElementById("bulkDimboost").value = player.autobuyers[9].bulk
    if (player.eternities < 50) {
        document.getElementById("replicantidiv").style.display="none"
        document.getElementById("replicantiunlock").style.display="inline-block"
    }
    if (player.eternities > 2 && player.replicanti.galaxybuyer === undefined) player.replicanti.galaxybuyer = false
    document.getElementById("infinityPoints1").innerHTML = "You have <span class=\"IPAmount1\">"+shortenDimensions(player.infinityPoints)+"</span> Infinity points."
    document.getElementById("infinityPoints2").innerHTML = "You have <span class=\"IPAmount2\">"+shortenDimensions(player.infinityPoints)+"</span> Infinity points."
    if (player.eternities < 2) {
        document.getElementById("break").textContent = "BREAK INFINITY"
         document.getElementById("abletobreak").style.display = "block"
    }
    document.getElementById("replicantireset").innerHTML = "Reset replicanti amount, but get a free galaxy<br>0 replicated galaxies created."
    document.getElementById("eternitybtn").style.display = player.infinityPoints.gte(player.eternityChallGoal) ? "inline-block" : "none"
    document.getElementById("eternityPoints2").style.display = "inline-block"
    document.getElementById("eternitystorebtn").style.display = "inline-block"
    document.getElementById("infiMult").innerHTML = "Multiply infinity points from all sources by "+ipMultPower+"<br>currently: "+shorten(getIPMult()) +"x<br>Cost: "+shortenCosts(player.infMultCost)+" IP"
    updateEternityUpgrades()
    document.getElementById("totaltickgained").textContent = "You've gained "+player.totalTickGained.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+" tickspeed upgrades."
    updateTickSpeed();
    playerInfinityUpgradesOnEternity()
    document.getElementById("eternityPoints2").innerHTML = "You have <span class=\"EPAmount2\">"+shortenDimensions(player.eternityPoints)+"</span> Eternity point"+((player.eternityPoints.eq(1)) ? "." : "s.")
    updateEternityChallenges()
    Marathon2 = 0;
    updatePowers()
    doAutoEterTick()
    if (player.masterystudies&&player.dilation.upgrades.includes("ngpp3")&&player.eternities>=1e9) player.dbPower=new Decimal(1)
}

var failsafeDilateTime = false
function startDilatedEternity(auto) {
	if (failsafeDilateTime) return
    if (!player.dilation.studies.includes(1)) return
	failsafeDilateTime = true
    var onActive = player.dilation.active
    if (!onActive && player.aarexModifications.dilationConf && !auto) if (!confirm("Dilating time will start a new eternity, and all of your Dimension/Infinity Dimension/Time Dimension multiplier's exponents and tickspeed multiplier's exponent will be reduced to ^ 0.75. If you can eternity while dilated, you'll be rewarded with tachyon particles based on your antimatter and tachyon particles.")) return
    clearInterval(gameLoopIntervalId);
    giveAchievement("I told you already, time is relative")
    if (player.masterystudies) {
        if (onActive) player.eternityBuyer.statBeforeDilation++
        else player.eternityBuyer.statBeforeDilation = 0
    }
    eternity(true, true)
    if (!onActive) player.dilation.active = true;
    updatePowers()
    if (player.masterystudies && quantumed) updateColorCharge()
    startInterval()
}


/**
 *
 * @param {Name of the ugrade} id
 * @param {Cost of the upgrade} cost
 * @param {Cost increase for the upgrade, only for rebuyables} costInc
 *
 * id 1-3 are rebuyables
 *
 * id 2 resets your dilated time and free galaxies
 *
 */

 const DIL_UPG_COSTS = [null, [1e5, 10],   [1e6, 100], [1e7, 20],
                               5e6,         1e9,        5e7,
                               2e12,        1e10,       1e11,
                                            1e15,
                              [1e8, 1e4],   1e20,       1e25,
                              1e50,    1e60,    1e80,   1e100]


function buyDilationUpgrade(id, max) {
    if (id > 3 && id != 11) { // Not rebuyable
        if (player.dilation.dilatedTime < DIL_UPG_COSTS[id]) return // Not enough dilated time
        if (player.dilation.upgrades.includes(id)) return // Has the upgrade
        player.dilation.dilatedTime = player.dilation.dilatedTime.minus(DIL_UPG_COSTS[id])
        player.dilation.upgrades.push(id > 11 ? "ngpp" + (id - 11) : id)
        if (id == 4) player.dilation.freeGalaxies *= 2 // Double the current galaxies
        if (id == 14) {
            updateMilestones()
            if (player.masterystudies&&player.eternities>=1e9) player.dbPower=new Decimal(getDimensionBoostPower())
        }
        if (id == 17 && player.masterystudies) {
            document.getElementById("masterystudyunlock").style.display=""
            document.getElementById("respecOptions").style.display = "block"
            document.getElementById("respecOptions2").style.display = "block"
        }
    } else { // Is rebuyable
        let realCost = getRebuyableDilUpgCost(id > 3 ? 4 : id)
        if (player.dilation.dilatedTime.lt(realCost)) return false

        player.dilation.dilatedTime = player.dilation.dilatedTime.minus(realCost)
        player.dilation.rebuyables[id > 3 ? 4 : id] += 1
        if (id == 2) {
            if (speedrunMilestonesReached<22) player.dilation.dilatedTime = new Decimal(0)
            resetDilationGalaxies()
        }
    }

    if (max) return true
    updateDilationUpgradeCosts()
    updateDilationUpgradeButtons()
    updateTimeStudyButtons()
}

function getPassiveTTGen() {
	var log=player.dilation.tachyonParticles.max(1).log10()
	if (log>80) log=75+Math.sqrt(log*5-375)
	let normal=Decimal.pow(10,log).div(20000)
	if (!player.achievements.includes("ng3p18")) return normal

	log=player.dilation.bestTP.max(1).log10()
	if (log>80) log=75+Math.sqrt(log*5-375)
	return Decimal.pow(10,log).div(1e5).add(normal)
}

function updateDilationUpgradeButtons() {
    for (var i = 1; i < 18; i++) {
        if (i > 10 && i < 14 && player.dilation.rebuyables[4] === undefined) {
			document.getElementById("n"+(i-10)).style.display = "none"
        } else {
            if (i > 10 && i < 14) document.getElementById("n"+(i-10)).style.display = "table-cell"
            if (i < 4 || i == 11) {
                document.getElementById("dil"+i).className = ( getRebuyableDilUpgCost(i > 3 ? 4 : i).gt(player.dilation.dilatedTime) ) ? "dilationupgrebuyablelocked" : "dilationupgrebuyable";
            } else if (player.dilation.upgrades.includes(i > 11 ? "ngpp" + (i - 11) : i)) {
                document.getElementById("dil"+i).className = "dilationupgbought"
            } else {
                document.getElementById("dil"+i).className = ( DIL_UPG_COSTS[i] > player.dilation.dilatedTime ) ? "dilationupglocked" : "dilationupg";
            }
        }
    }
    document.getElementById("dil7desc").textContent = "Currently: "+shortenMoney(player.dilation.dilatedTime.max(1).pow(1000).max(1))+"x"
    document.getElementById("dil10desc").textContent = "Currently: "+shortenMoney(getPassiveTTGen())+"/s"
    if (player.dilation.studies.includes(6)) {
        document.getElementById("mddilupg").style.display = ""
        document.getElementById("dil14desc").textContent = "Currently: "+shortenMoney(getDil14Bonus()) + 'x';
        document.getElementById("dil15desc").textContent = "Currently: "+shortenMoney(getDil15Bonus()) + 'x';
        document.getElementById("dil17formula").textContent = "(log(x)^0.5"+(player.masterystudies?")":"/2)")
        document.getElementById("dil17desc").textContent = "Currently: "+shortenMoney(getDil17Bonus()) + 'x';
    } else document.getElementById("mddilupg").style.display = "none"
}

var scaleStarts = [null, 1e9, 1e9, 72, 24]
function getRebuyableDilUpgCost(id) {
	var costGroup = DIL_UPG_COSTS[id>3?11:id]
	var amount = player.dilation.rebuyables[id]
	return new Decimal(costGroup[0]).times(Decimal.pow(costGroup[1],amount+Math.max(amount-scaleStarts[id]+1, 0)*(amount-scaleStarts[id]+2)/4))
}

function updateDilationUpgradeCosts() {
	document.getElementById("dil1cost").textContent = "Cost: " + shortenCosts(getRebuyableDilUpgCost(1)) + " dilated time"
	document.getElementById("dil2cost").textContent = "Cost: " + shortenCosts(getRebuyableDilUpgCost(2)) + " dilated time"
	document.getElementById("dil3cost").textContent = "Cost: " + formatValue(player.options.notation, getRebuyableDilUpgCost(3), 1, 1) + " dilated time"
	document.getElementById("dil4cost").textContent = "Cost: " + shortenCosts(DIL_UPG_COSTS[4]) + " dilated time"
	document.getElementById("dil5cost").textContent = "Cost: " + shortenCosts(DIL_UPG_COSTS[5]) + " dilated time"
	document.getElementById("dil6cost").textContent = "Cost: " + shortenCosts(DIL_UPG_COSTS[6]) + " dilated time"
	document.getElementById("dil7cost").textContent = "Cost: " + shortenCosts(DIL_UPG_COSTS[7]) + " dilated time"
	document.getElementById("dil8cost").textContent = "Cost: " + shortenCosts(DIL_UPG_COSTS[8]) + " dilated time"
	document.getElementById("dil9cost").textContent = "Cost: " + shortenCosts(DIL_UPG_COSTS[9]) + " dilated time"
	document.getElementById("dil10cost").textContent = "Cost: " + shortenCosts(DIL_UPG_COSTS[10]) + " dilated time"
	if (player.meta) {
		document.getElementById("dil11cost").textContent = "Cost: " + shortenCosts(getRebuyableDilUpgCost(4)) + " dilated time"
		document.getElementById("dil12cost").textContent = "Cost: " + shortenCosts(DIL_UPG_COSTS[12]) + " dilated time"
		document.getElementById("dil13cost").textContent = "Cost: " + shortenCosts(DIL_UPG_COSTS[13]) + " dilated time"
		if (player.dilation.studies.includes(6)) for (id=14;id<18;id++) document.getElementById("dil"+id+"cost").textContent = "Cost: " + shortenCosts(DIL_UPG_COSTS[id]) + " dilated time"
	}
}

function gainDilationGalaxies() {
	if (player.dilation.nextThreshold.lte(player.dilation.dilatedTime)) {
		let thresholdMult = inQC(5) ? Math.pow(10, 2.8) : 1.35 + 3.65 * Math.pow(0.8, player.dilation.rebuyables[2])
		let galaxyMult = player.dilation.upgrades.includes(4) ? 2 : 1
		if (QCIntensity(2)) galaxyMult *= 1.2 + QCIntensity(2) * 0.2
		let thresholdGalaxies = player.dilation.freeGalaxies / galaxyMult
		let timesGained = Math.floor(player.dilation.dilatedTime.div(player.dilation.nextThreshold).log(thresholdMult) + 1 + thresholdGalaxies)
		player.dilation.freeGalaxies = timesGained * galaxyMult
		player.dilation.nextThreshold = Decimal.pow(thresholdMult, timesGained - thresholdGalaxies).times(player.dilation.nextThreshold)
		giveAchievement("Universal harmony")
	}
}

function resetDilationGalaxies() {
	player.dilation.nextThreshold = new Decimal(1000)
	player.dilation.freeGalaxies = 0
	gainDilationGalaxies()
}

function calcPerSec(amount, pow, hasMult) {
	var mult = Decimal.floor(amount).times(pow).times(player.achPow)
	if (hasMult) mult = mult.times(dimMults())
	return mult.times(timeMult()).times(player.chall2Pow).dividedBy(player.tickspeed.dividedBy(1000));
}

function quickReset() {
	if (inQC(6)) return
	if (player.currentChallenge=="challenge14") if (player.tickBoughtThisInf.pastResets.length < 1) return
	if (player.resets > 0 && !(player.galacticSacrifice && player.currentChallenge === 'challenge5')) player.resets--
	if (player.currentChallenge=="challenge14") {
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


function updateInfPower() {
    document.getElementById("infPowAmount").textContent = shortenMoney(player.infinityPower)
    if (player.currentEternityChall == "eterc9") document.getElementById("infDimMultAmount").textContent = shortenMoney((Decimal.pow(Math.max(player.infinityPower.log2(), 1), 4)).max(1))
    else document.getElementById("infDimMultAmount").textContent = shortenMoney(player.infinityPower.pow(7))
    if (player.currentEternityChall == "eterc7") document.getElementById("infPowPerSec").textContent = "You are getting " +shortenDimensions(DimensionProduction(1))+" Seventh Dimensions per second."
    else document.getElementById("infPowPerSec").textContent = "You are getting " +shortenDimensions(DimensionProduction(1))+" Infinity Power per second."
}

function getReplSpeed () {
	let ret = .2;
	if (player.dilation.upgrades.includes('ngpp1')) {
		ret /= 1 + player.dilation.dilatedTime.max(1).log(10) / 10
	}
	ret = ret + 1
	if (GUBought("gb2")) ret = Math.sqrt(ret)
	return ret;
}

function updateTimeShards() {
    if (document.getElementById("timedimensions").style.display == "block" && document.getElementById("dimensions").style.display == "block") {
        document.getElementById("timeShardAmount").textContent = shortenMoney(player.timeShards)
        document.getElementById("tickThreshold").textContent = shortenMoney(player.tickThreshold)
        if (player.currentEternityChall == "eterc7") document.getElementById("timeShardsPerSec").textContent = "You are getting "+shortenDimensions(getTimeDimensionProduction(1))+" Eighth Infinity Dimensions per second."
        else document.getElementById("timeShardsPerSec").textContent = "You are getting "+shortenDimensions(getTimeDimensionProduction(1))+" Timeshards per second."
    }
}

function updateDilation() {
    if (document.getElementById("dilation").style.display == "block" && document.getElementById("eternitystore").style.display == "block") {
        document.getElementById("tachyonParticleAmount").textContent = shortenMoney(player.dilation.tachyonParticles)
        document.getElementById("dilatedTimeAmount").textContent = shortenMoney(player.dilation.dilatedTime)
        document.getElementById("dilatedTimePerSecond").textContent = "+" + shortenMoney(getDilTimeGainPerSecond()) + "/s"
        document.getElementById("galaxyThreshold").textContent = shortenMoney(player.dilation.nextThreshold)
        document.getElementById("dilatedGalaxies").textContent = getFullExpansion(Math.floor(player.dilation.freeGalaxies))
    }
}


function getNewInfReq() {
    if (!player.infDimensionsUnlocked[0]) return new Decimal("1e1100")
    else if (!player.infDimensionsUnlocked[1]) return new Decimal("1e1900")
    else if (!player.infDimensionsUnlocked[2]) return new Decimal("1e2400")
    else if (!player.infDimensionsUnlocked[3]) return new Decimal("1e10500")
    else if (!player.infDimensionsUnlocked[4]) return new Decimal("1e30000")
    else if (!player.infDimensionsUnlocked[5]) return new Decimal("1e45000")
    else if (!player.infDimensionsUnlocked[6]) return new Decimal("1e54000")
    else return new Decimal("1e60000")
}


function newDimension() {
    if (player.money.gte(getNewInfReq())) {
        if (!player.infDimensionsUnlocked[0]) player.infDimensionsUnlocked[0] = true
        else if (!player.infDimensionsUnlocked[1]) player.infDimensionsUnlocked[1] = true
        else if (!player.infDimensionsUnlocked[2]) player.infDimensionsUnlocked[2] = true
        else if (!player.infDimensionsUnlocked[3]) {
            player.infDimensionsUnlocked[3] = true
            giveAchievement("NEW DIMENSIONS???")
        }
        else if (!player.infDimensionsUnlocked[4]) player.infDimensionsUnlocked[4] = true
        else if (!player.infDimensionsUnlocked[5]) player.infDimensionsUnlocked[5] = true
        else if (!player.infDimensionsUnlocked[6]) player.infDimensionsUnlocked[6] = true
        else if (!player.infDimensionsUnlocked[7]) {
            player.infDimensionsUnlocked[7] = true
            giveAchievement("0 degrees from infinity")
        }
    }
}
var blink = true
var nextAt
var goals

function setAndMaybeShow(elementName, condition, contents) {
	var elem = document.getElementById(elementName)
	if (condition) {
		elem.innerHTML = eval(contents)
		elem.style.display = ""
	} else {
		elem.innerHTML = ""
		elem.style.display = "none"
	}
}

setInterval(function() {
    if (getDimensionFinalMultiplier(1).gte(new Decimal("1e308")) &&
        getDimensionFinalMultiplier(2).gte(new Decimal("1e308")) &&
        getDimensionFinalMultiplier(3).gte(new Decimal("1e308")) &&
        getDimensionFinalMultiplier(4).gte(new Decimal("1e308")) &&
        getDimensionFinalMultiplier(5).gte(new Decimal("1e308")) &&
        getDimensionFinalMultiplier(6).gte(new Decimal("1e308")) &&
        getDimensionFinalMultiplier(7).gte(new Decimal("1e308")) &&
        getDimensionFinalMultiplier(8).gte(new Decimal("1e308"))) giveAchievement("Can't hold all these infinities")

    if (getDimensionFinalMultiplier(1).lt(getDimensionFinalMultiplier(2)) &&
        getDimensionFinalMultiplier(2).lt(getDimensionFinalMultiplier(3)) &&
        getDimensionFinalMultiplier(3).lt(getDimensionFinalMultiplier(4)) &&
        getDimensionFinalMultiplier(4).lt(getDimensionFinalMultiplier(5)) &&
        getDimensionFinalMultiplier(5).lt(getDimensionFinalMultiplier(6)) &&
        getDimensionFinalMultiplier(6).lt(getDimensionFinalMultiplier(7)) &&
        getDimensionFinalMultiplier(7).lt(getDimensionFinalMultiplier(8))) giveAchievement("How the antitables have turned")



    if (player.infinitied == 0 && player.infinityPoints.lt(new Decimal(1e50)) && player.infinityUpgrades.length < 1 && player.eternities <= 0 && !quantumed) document.getElementById("infinityPoints2").style.display = "none"
    else document.getElementById("infinityPoints2").style.display = "inline-block"

    if (blink && !player.achievements.includes("r78")) {
        document.getElementById("Blink of an eye").style.display = "none"
        blink = false
    }
    else {
        document.getElementById("Blink of an eye").style.display = "block"
        blink = true
    }
    if (player.challenges.includes("postc1")) {
        let temp = 1
        for (var i=0; i < player.challenges.length; i++) {
            if (player.challenges[i].includes("post")) {
                temp *= 1.3
                document.getElementById("infchallengesbtn").style.display = "inline-block"
            }
        }
        infDimPow = temp
    } else {
        document.getElementById("infchallengesbtn").style.display = "none"
    }
    if (quantumed) document.getElementById("infchallengesbtn").style.display = "inline-block"

    if (player.money.gte(new Decimal("1e2000")) || Object.keys(player.eternityChalls).length > 0 || player.eternityChallUnlocked !== 0 || quantumed) document.getElementById("challTabButtons").style.display = "table"

    document.getElementById("eternityPoints2").innerHTML = "You have <span class=\"EPAmount2\">"+shortenDimensions(player.eternityPoints)+"</span> Eternity points."

    var preQuantumEnd = quantumed
    if (!preQuantumEnd && player.meta !== undefined) preQuantumEnd = player.meta.bestAntimatter.gte(Decimal.pow(Number.MAX_VALUE,player.masterystudies?1.45:1))&&(player.masterystudies===undefined||ECTimesCompleted("eterc14"))
    var haveBlock = (player.galacticSacrifice?(player.eternities!=0||player.infinityPoints.gte(Number.MAX_VALUE)||player.break):false)||preQuantumEnd

    document.getElementById("galaxyPoints2").style.display="none"
    if (player.galacticSacrifice===undefined?false:(haveBlock||player.infinitied>0||player.galacticSacrifice.times>0)) {
        document.getElementById("galaxyPoints2").innerHTML="You have <span class='GPAmount'>"+shortenDimensions(player.galacticSacrifice.galaxyPoints)+"</span> Galaxy point"+(player.galacticSacrifice.galaxyPoints.eq(1)?".":"s.")
        document.getElementById("galaxyPoints2").style.display=""
    }
    document.getElementById("galaxyPoints2").className = preQuantumEnd?"GP":haveBlock?"QK":"EP"
    document.getElementById("sacpos").className = preQuantumEnd?"sacpos":haveBlock?"quantumpos":"eterpos"

    document.getElementById("eternitybtn").style.display = (player.infinityPoints.gte(player.eternityChallGoal) && (player.infDimensionsUnlocked[7] || player.eternities > 24)) ? "inline-block" : "none"

    setAndMaybeShow("quarks", quantumed, '"You have <b class=\'QKAmount\'>"+shortenDimensions(player.quantum.quarks)+"</b> quark"+(player.quantum.quarks.eq(1)?".":"s.")')

    document.getElementById("bigcrunch").parentElement.style.top = haveBlock ? "139px" : "19px"
    document.getElementById("quantumBlock").style.display = haveBlock ? "" : "none"
    document.getElementById("quantumbtn").style.display = "none"
    if (player.meta !== undefined) if (isQuantumReached()) document.getElementById("quantumbtn").style.display = ""

    for (var i=1; i <=8; i++) {
        document.getElementById("postc"+i+"goal").textContent = "Goal: "+shortenCosts(goals[i-1])
    }

    if (player.replicanti.galaxybuyer !== undefined) document.getElementById("replicantiresettoggle").style.display = "inline-block"
    else document.getElementById("replicantiresettoggle").style.display = "none"

    if (player.eternities > 0) document.getElementById("infmultbuyer").style.display = "inline-block"
    else document.getElementById("infmultbuyer").style.display = "none"
    if (player.eternities > 4) document.getElementById("togglecrunchmode").style.display = "inline-block"
    else document.getElementById("togglecrunchmode").style.display = "none"
    if (player.eternities > 8) document.getElementById("galaxybulk").style.display = "inline-block"
    else document.getElementById("galaxybulk").style.display = "none"
    if (player.eternities > 99 && player.meta) document.getElementById("toggleautoetermode").style.display = "inline-block"
    else document.getElementById("toggleautoetermode").style.display = "none"

    document.getElementById("replicantichance").className = (player.infinityPoints.gte(player.replicanti.chanceCost) && player.replicanti.chance < 1) ? "storebtn" : "unavailablebtn"
    document.getElementById("replicantiinterval").className = (player.infinityPoints.gte(player.replicanti.intervalCost) && ((player.replicanti.interval !== 50) || player.timestudy.studies.includes(22)) && (player.replicanti.interval !== 1)) ? "storebtn" : "unavailablebtn"
    document.getElementById("replicantimax").className = (player.infinityPoints.gte(player.replicanti.galCost)) ? "storebtn" : "unavailablebtn"
    document.getElementById("replicantireset").className = (player.replicanti.galaxies < player.replicanti.gal && player.replicanti.amount.gte(getReplicantiLimit())) ? "storebtn" : "unavailablebtn"
    document.getElementById("replicantiunlock").className = (player.infinityPoints.gte(1e140)) ? "storebtn" : "unavailablebtn"
    updateTheoremButtons()

    if (getTickSpeedMultiplier() < 0.001) giveAchievement("Do you even bend time bro?")

    if (player.eternities > 9) document.getElementById("bulklabel").textContent = "Buy max dimboosts every X seconds:"
    else document.getElementById("bulklabel").textContent = "Bulk DimBoost Amount:"

    if (player.eternities > 10) {
        for (var i=1;i<player.eternities-9 && i < 9; i++) {
            document.getElementById("infauto"+i).style.visibility = "visible"
        }
        document.getElementById("toggleallinfdims").style.visibility = "visible"
    } else {
        for (var i=1; i<9; i++) {
            document.getElementById("infauto"+i).style.visibility = "hidden"
        }
        document.getElementById("toggleallinfdims").style.visibility = "hidden"
    }

    if (player.eternities >= 40) document.getElementById("replauto1").style.visibility = "visible"
    else document.getElementById("replauto1").style.visibility = "hidden"
    if (player.eternities >= 60) document.getElementById("replauto2").style.visibility = "visible"
    else document.getElementById("replauto2").style.visibility = "hidden"
    if (player.eternities >= 80) document.getElementById("replauto3").style.visibility = "visible"
    else document.getElementById("replauto3").style.visibility = "hidden"
    if (player.eternities >= 100) document.getElementById("autoBuyerEter").style.display = "table-cell"

    if (player.eternities == 0 && !quantumed) document.getElementById("pasteternities").style.display = "none"
    else document.getElementById("pasteternities").style.display = "inline-block"
    if (quantumed) document.getElementById("pastquantums").style.display = "inline-block"
    else document.getElementById("pastquantums").style.display = "none"
    if (player.challenges.length > 1 || quantumed) document.getElementById("challengetimesbtn").style.display = "inline-block"
    else document.getElementById("challengetimesbtn").style.display = "none"
    if (player.infinitied > 0  || player.eternities > 0 || quantumed) document.getElementById("pastinfs").style.display = "inline-block"
    else document.getElementById("pastinfs").style.display = "none"
    document.getElementById("speedrunsbtn").style.display = (player.masterystudies && quantumed) ? "" : "none"

    if (player.infinitied !== 0 || player.eternities !== 0 || quantumed) document.getElementById("bigCrunchAnimBtn").style.display = "inline-block"
    else document.getElementById("bigCrunchAnimBtn").style.display = "none"
    if (!player.dilation.tachyonParticles.eq(0) || quantumed) document.getElementById("tachyonParticleAnimBtn").style.display = "inline-block"
    else document.getElementById("tachyonParticleAnimBtn").style.display = "none"

    if (player.eternities > 10 && player.currentEternityChall !== "eterc8") {
        for (var i=1;i<player.eternities-9 && i < 9; i++) {
            if (player.infDimBuyers[i-1]) {
                buyMaxInfDims(i)
                buyManyInfinityDimension(i)
            }
        }
    }
    doAutoEterTick()

    if (player.eternities >= 40 && player.replicanti.auto[0] && player.currentEternityChall !== "eterc8" && isChanceAffordable()) {
        var maxCost = (player.masterystudies ? player.masterystudies.includes("t265") : false) ? 1/0 : new Decimal("1e1620")
        var bought = Math.max(Math.floor(player.infinityPoints.min(maxCost).div(player.replicanti.chanceCost).log(1e15) + 1), 0)
        player.replicanti.chance += bought * 0.01
        player.replicanti.chanceCost = player.replicanti.chanceCost.times(Decimal.pow(1e15, bought))
    }

    if (player.eternities >= 60 && player.replicanti.auto[1] && player.currentEternityChall !== "eterc8") {
        while (player.infinityPoints.gte(player.replicanti.intervalCost) && player.currentEternityChall !== "eterc8" && isIntervalAffordable()) upgradeReplicantiInterval()
    }

    if (player.eternities >= 80 && player.replicanti.auto[2] && player.currentEternityChall !== "eterc8") {
        while (upgradeReplicantiGalaxy()) continue
    }

    document.getElementById("eterc1goal").textContent = "Goal: "+shortenCosts(new Decimal("1e1800").times(new Decimal("1e200").pow(ECTimesCompleted("eterc1"))).max(new Decimal("1e1800"))) + " IP"
    document.getElementById("eterc1completed").textContent = "Completed "+ECTimesCompleted("eterc1")+" times."

    document.getElementById("eterc2goal").textContent = "Goal: "+shortenCosts(new Decimal("1e975").times(new Decimal("1e175").pow(ECTimesCompleted("eterc2"))).max(new Decimal("1e975"))) + " IP"
    document.getElementById("eterc2completed").textContent = "Completed "+ECTimesCompleted("eterc2")+" times."

    document.getElementById("eterc3goal").textContent = "Goal: "+shortenCosts(new Decimal("1e600").times(new Decimal("1e75").pow(ECTimesCompleted("eterc3"))).max(new Decimal("1e575"))) + " IP"
    document.getElementById("eterc3completed").textContent = "Completed "+ECTimesCompleted("eterc3")+" times."

    document.getElementById("eterc4goal").textContent = "Goal: "+shortenCosts(new Decimal("1e2750").times(new Decimal("1e550").pow(ECTimesCompleted("eterc4"))).max(new Decimal("1e2750"))) + " IP in "+Math.max((16 - (ECTimesCompleted("eterc4")*4)), 0)+" infinities or less."
    document.getElementById("eterc4completed").textContent = "Completed "+ECTimesCompleted("eterc4")+" times."

    document.getElementById("eterc5goal").textContent = "Goal: "+shortenCosts(new Decimal("1e750").times(new Decimal("1e400").pow(ECTimesCompleted("eterc5"))).max(new Decimal("1e750"))) + " IP"
    document.getElementById("eterc5completed").textContent = "Completed "+ECTimesCompleted("eterc5")+" times."

    document.getElementById("eterc6goal").textContent = "Goal: "+shortenCosts(new Decimal("1e850").times(new Decimal("1e250").pow(ECTimesCompleted("eterc6"))).max(new Decimal("1e850"))) + " IP"
    document.getElementById("eterc6completed").textContent = "Completed "+ECTimesCompleted("eterc6")+" times."

    document.getElementById("eterc7goal").textContent = "Goal: "+shortenCosts(new Decimal("1e2000").times(new Decimal("1e530").pow(ECTimesCompleted("eterc7"))).max(new Decimal("1e2000"))) + " IP"
    document.getElementById("eterc7completed").textContent = "Completed "+ECTimesCompleted("eterc7")+" times."

    document.getElementById("eterc8goal").textContent = "Goal: "+shortenCosts(new Decimal("1e1300").times(new Decimal("1e900").pow(ECTimesCompleted("eterc8"))).max(new Decimal("1e1300"))) + " IP"
    document.getElementById("eterc8completed").textContent = "Completed "+ECTimesCompleted("eterc8")+" times."

    document.getElementById("eterc9goal").textContent = "Goal: "+shortenCosts(new Decimal("1e1750").times(new Decimal("1e250").pow(ECTimesCompleted("eterc9"))).max(new Decimal("1e1750"))) + " IP"
    document.getElementById("eterc9completed").textContent = "Completed "+ECTimesCompleted("eterc9")+" times."

    document.getElementById("eterc10goal").textContent = "Goal: "+shortenCosts(new Decimal("1e3000").times(new Decimal("1e300").pow(ECTimesCompleted("eterc10"))).max(new Decimal("1e3000"))) + " IP"
    document.getElementById("eterc10completed").textContent = "Completed "+ECTimesCompleted("eterc10")+" times."

    document.getElementById("eterc11goal").textContent = "Goal: "+shortenCosts(new Decimal("1e500").times(new Decimal("1e200").pow(ECTimesCompleted("eterc11"))).max(new Decimal("1e500"))) + " IP"
    document.getElementById("eterc11completed").textContent = "Completed "+ECTimesCompleted("eterc11")+" times."

    document.getElementById("eterc12goal").textContent = "Goal: "+shortenCosts(new Decimal("1e110000").times(new Decimal("1e12000").pow(ECTimesCompleted("eterc12"))).max(new Decimal("1e110000"))) + " IP in "+(Math.max(10 - ECTimesCompleted("eterc12")*2, 1)/10) + ((ECTimesCompleted("eterc12") === 0) ? " second or less." :" seconds or less." )
    document.getElementById("eterc12completed").textContent = "Completed "+ECTimesCompleted("eterc12")+" times."

    document.getElementById("eterc13goal").textContent = "Goal: "+shortenCosts(new Decimal("1e38000000").times(new Decimal("1e1200000").pow(ECTimesCompleted("eterc13"))).max(new Decimal("1e15000000"))) + " IP"
    document.getElementById("eterc13completed").textContent = "Completed "+ECTimesCompleted("eterc13")+" times."

    document.getElementById("eterc14goal").textContent = "Goal: "+shortenCosts(new Decimal("1e1595000").times(new Decimal("1e250000").pow(ECTimesCompleted("eterc14"))).max(new Decimal("1e835000"))) + " IP"
    document.getElementById("eterc14completed").textContent = "Completed "+ECTimesCompleted("eterc14")+" times."
    updateECUnlockButtons()




    if (player.currentEternityChall == "eterc8") {
        document.getElementById("eterc8repl").style.display = "block"
        document.getElementById("eterc8ids").style.display = "block"
        document.getElementById("eterc8repl").textContent = "You have "+player.eterc8repl+" purchases left."
        document.getElementById("eterc8ids").textContent = "You have "+player.eterc8ids+" purchases left."
    } else {
        document.getElementById("eterc8repl").style.display = "none"
        document.getElementById("eterc8ids").style.display = "none"
    }

    if (player.currentEternityChall == "eterc12" && player.thisEternity >= Math.max(2 * (5 - ECTimesCompleted("eterc12")), 1)) {
        document.getElementById("challfail").style.display = "block"
        setTimeout(exitChallenge, 500)
        giveAchievement("You're a mistake")
        failureCount++
        if (failureCount > 9) giveAchievement("You're a failure")
    }

    document.getElementById("infinitiedBank").style.display = (player.infinitiedBank > 0) ? "block" : "none"
    document.getElementById("infinitiedBank").textContent = "You have " + getFullExpansion(player.infinitiedBank) + " banked infinities."
    var bankedInfGain=gainBankedInf()
    document.getElementById("bankedInfGain").style.display = bankedInfGain>0 ? "block" : "none"
    document.getElementById("bankedInfGain").textContent = "You will gain " + getFullExpansion(bankedInfGain) + " banked infinities on next Eternity."

    let checkEmpty = player.timestudy.studies.length < 1
    if (player.boughtDims) checkEmpty = checkEmpty && player.timestudy.theorem == getTotalTT(player)
    if (player.masterystudies) for (id=0;id<player.masterystudies.length;id++) {
        if (player.masterystudies[id].split("t")[1]) checkEmpty = false
    }

    let ableToGetRid2 = checkEmpty && player.dilation.active

    if (infchallengeTimes < 7.5) giveAchievement("Never again")
    if (player.infinityPoints.gte(new Decimal("1e22000")) && checkEmpty) giveAchievement("What do I have to do to get rid of you")
    if (player.replicanti.galaxies >= 180*player.galaxies && player.galaxies > 0) giveAchievement("Popular music")
    if (player.eternities >= 1e12) giveAchievement("The cap is a million, not a trillion")
    if (player.eternityPoints.gte(Number.MAX_VALUE)) giveAchievement("But I wanted another prestige layer...")
    if (player.eternityPoints.gte("1e40000")) giveAchievement("In the grim darkness of the far endgame")
    if (player.eternityPoints.gte("9e99999999")) giveAchievement("This achievement doesn't exist 3")
    if (player.infinityPoints.gte(1e100) && player.firstAmount.equals(0) && player.infinitied == 0 && player.resets <= 4 && player.galaxies <= 1 && player.replicanti.galaxies == 0) giveAchievement("Like feasting on a behind")
    if (player.infinityPoints.gte('9.99999e999')) giveAchievement("This achievement doesn't exist II");
    if (player.infinityPoints.gte('1e30008')) giveAchievement("Can you get infinite IP?");
    if (player.infinitied > 2e6) giveAchievement("2 Million Infinities")
    if (player.money.gte("9.9999e9999")) giveAchievement("This achievement doesn't exist")
    if (player.money.gte("1e35000")) giveAchievement("I got a few to spare")
    if (player.infinityPower.gt(1)) giveAchievement("A new beginning.");
    if (player.infinityPower.gt(1e6)) giveAchievement("1 million is a lot"); //TBD
    if (player.infinityPower.gt(1e260)) giveAchievement("Minute of infinity"); //TBD
    if (player.totalTickGained >= 308) giveAchievement("Infinite time");
    if (player.totalTickGained>=1e6) giveAchievement("GAS GAS GAS")
    if (player.firstPow >= 10e30) giveAchievement("I forgot to nerf that")
    if (player.money >= 10e79) giveAchievement("Antimatter Apocalypse")
    if (player.totalTimePlayed >= 10 * 60 * 60 * 24 * 8) giveAchievement("One for each dimension")
    if (player.seventhAmount > 1e12) giveAchievement("Multidimensional");
    if (player.tickspeed.lt(1e-26)) giveAchievement("Faster than a potato");
    if (player.tickspeed.lt(1e-55)) giveAchievement("Faster than a squared potato");
    if (Math.random() < 0.00001) giveAchievement("Do you feel lucky? Well do ya punk?")
    if ((player.matter.gte(2.586e15) && player.currentChallenge == "postc6") || player.matter.gte(Number.MAX_VALUE)) giveAchievement("It's not called matter dimensions is it?")

    document.getElementById("dilationTabbtn").style.display = (player.dilation.studies.includes(1)) ? "table-cell" : "none"
    updateDilationUpgradeButtons()

    if (player.infinityDimension1.baseAmount == 0 &&
        player.infinityDimension2.baseAmount == 0 &&
        player.infinityDimension3.baseAmount == 0 &&
        player.infinityDimension4.baseAmount == 0 &&
        player.infinityDimension5.baseAmount == 0 &&
        player.infinityDimension6.baseAmount == 0 &&
        player.infinityDimension7.baseAmount == 0 &&
        player.infinityDimension8.baseAmount == 0 &&
        player.infMultCost.equals(10) &&
        player.infinityPoints.gt(new Decimal("1e140000"))) {
        giveAchievement("I never liked this infinity stuff anyway")
    }

    if (player.replicanti.amount.gt(new Decimal("1e20000"))) giveAchievement("When will it be enough?")
    if (player.replicanti.amount.gt(new Decimal("1e100000"))) giveAchievement("It will never be enough")
    if (player.boughtDims && player.replicanti.amount.gt("1e1000000")) giveAchievement("Do you really need a guide for this?");
    if (player.tickspeed.e < -8296262) giveAchievement("Faster than a potato^286078")
    if (ableToGetRid2 && player.infinityPoints.e >= 20000) giveAchievement("This is what I have to do to get rid of you.")
    if (player.why >= 1e6) giveAchievement("Should we tell them about buy max...")
    giveAchievement("Universal harmony")
    if (player.masterystudies) {
        let ableToGetRid3 = ableToGetRid2 && player.quantum.electrons.amount.eq(0)
        let ableToGetRid4 = ableToGetRid2 && inQC(2)

        if (player.meta.antimatter.gte(Number.MAX_VALUE)) giveAchievement("I don't have enough fuel!")
        if (player.galaxies>899&&!player.dilation.studies.includes(1)) giveAchievement("No more tax fraud!")
        if (player.money.gte(Decimal.pow(10,3*86400*365.2425*2019))) giveAchievement("Old age")
        if (player.infinityPoints.e>=4e5&&ableToGetRid3) giveAchievement("I already got rid of you...")
        if (player.meta.resets == 8) if (player.meta.antimatter.e>1499) giveAchievement("We are not going squared.")
        if (player.eightBought>=4e6&&player.replicanti.galaxies+extraReplGalaxies+player.dilation.freeGalaxies<1) giveAchievement("Intergalactic")
        if (player.old&&player.meta.antimatter.e>1699) giveAchievement("Old memories come true")
        if (player.infinityPoints.e>353999&&ableToGetRid4) giveAchievement("Seriously, I already got rid of you.")
    }
    if (speedrunMilestonesReached>notifyId) {
        $.notify("You unlocked "+timeDisplayShort(speedrunMilestones[notifyId]*36e3)+" speedrun milestone! "+(["You now start with 20,000 eternities when going quantum","You unlocked time theorem autobuyer","You now start with all Eternity Challenges completed and\neternity upgrades bought","You now start with dilation unlocked","You unlocked a new option for eternity autobuyer","You now start with all dilation studies and\nnon-rebuyable dilation upgrades before Meta Dimensions unlocked except passive TT gen upgrade","You unlocked first meta dimension autobuyer","You unlocked second meta dimension autobuyer","You unlocked third meta dimension autobuyer","You unlocked fourth meta dimension autobuyer","You unlocked fifth meta dimension autobuyer and you now keep time studies and passive TT gen upgrade","You unlocked sixth meta dimension autobuyer","You unlocked seventh meta dimension autobuyer","You unlocked eighth meta dimension autobuyer and\nall non-rebuyable dilation upgrades","You unlocked meta-dimension boost autobuyer","You now keep all time studies in mastery studies","You now can buy all Meta Dimensions if it is affordable in your current meta boost.","You now start with "+shortenCosts(1e13)+" eternities","You now start with "+shortenCosts(1e25)+" meta-antimatter on reset","You can now turn on automatic replicated galaxies anytime","You made rebuyable dilation upgrade and Meta Dimension autobuyers 3x faster","You now start with "+shortenCosts(1e100)+" dilated time on quantum and dilated time does not reset until quantum","You unlocked quantum autobuyer","You now keep replicanti on eternity."])[notifyId]+".","success")
        notifyId++
    }
}, 1000)

function fact(v) {
    let ret=1;
    do {ret *= v} while (--v > 1)
    return ret;
}

var postC2Count = 0;
var IPminpeak = new Decimal(0)
var EPminpeakType = 'normal'
var EPminpeak = new Decimal(0)
var replicantiTicks = 0
var isSmartPeakActivated = false

function updateEPminpeak(diff) {
    isSmartPeakActivated = player.masterystudies && player.dilation.upgrades.includes("ngpp3") && player.eternities >= 1e13
	if (player.dilation.active && isSmartPeakActivated) {
		var gainedPoints = new Decimal(Math.max(getDilGain() - player.dilation.totalTachyonParticles, 0))
		var oldPoints = new Decimal(player.dilation.totalTachyonParticles)
	} else {
		var gainedPoints = gainedEternityPoints()
		var oldPoints = player.eternityPoints
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
    if (currentEPmin.gt(EPminpeak) && player.infinityPoints.gte(Number.MAX_VALUE)) {
        EPminpeak = currentEPmin
        if (player.masterystudies) player.peakSpent = 0
    } else if (player.masterystudies && currentEPmin.gt(0)) {    	
        player.peakSpent = diff + (player.peakSpent ? player.peakSpent : 0)
    }
    return currentEPmin;
}


function gameLoop(diff) {
    var thisUpdate = new Date().getTime();
    if (thisUpdate - player.lastUpdate >= 21600000) giveAchievement("Don't you dare to sleep")
    if (typeof diff === 'undefined') var diff = Math.min(thisUpdate - player.lastUpdate, 21600000);
    diff = diff / 100;
    if (diff < 0) diff = 1;
    if (player.currentEternityChall === "eterc12") diff = diff / 1000;
    if (player.thisInfinityTime < -10) player.thisInfinityTime = Infinity
    if (player.bestInfinityTime < -10) player.bestInfinityTime = Infinity
    if (diff > player.autoTime && !player.break) player.infinityPoints = player.infinityPoints.plus(player.autoIP.times(diff/player.autoTime))
    /*if (player.currentChallenge == "postc6" && player.matter.gte(1)) player.matter = player.matter.plus(diff/10)
    else */
    player.matter = player.matter.times(Decimal.pow((1.03 + player.resets/200 + player.galaxies/100), diff));
    if (player.matter.gt(player.money) && (player.currentChallenge == "challenge12" || player.currentChallenge == "postc1")) quickReset()
    else if (player.matter.pow(20).gt(player.money) && (player.currentChallenge == "postc7" || inQC(6))) {
        if (inQC(6)) {
            document.getElementById("challfail").style.display = "block"
            quantum(false, true, 0)
            giveAchievement("You're a mistake")
            failureCount++
            if (failureCount > 9) giveAchievement("You're a failure")
        } else quickReset()
    }

    if (player.currentChallenge == "postc8" || inQC(6)) player.postC8Mult = player.postC8Mult.times(Math.pow(0.000000046416, diff))

    if (player.currentChallenge == "challenge3" || player.matter.gte(1)) player.chall3Pow = player.chall3Pow.times(Decimal.pow(1.00038, diff));
    player.chall2Pow = Math.min(player.chall2Pow + diff/1800, 1);
    if (player.currentChallenge == "postc2" || inQC(6)) {
        postC2Count++;
        if (postC2Count >= 8 || diff > 80) {
            sacrifice();
            postC2Count = 0;
        }
    }
    if (player.infinityUpgrades.includes("passiveGen")) player.partInfinityPoint += diff / player.bestInfinityTime;
    if (player.partInfinityPoint >= 100) {
        player.infinityPoints = player.infinityPoints.plus(player.infMult.times(kongIPMult * (player.partInfinityPoint/10)));
        player.partInfinityPoint = 0;
    }

    if (player.partInfinityPoint >= 10) {
        player.partInfinityPoint -= 10;
        player.infinityPoints = player.infinityPoints.plus(getIPMult());
    }



    if (player.infinityUpgrades.includes("infinitiedGeneration") && player.currentEternityChall !== "eterc4") player.partInfinitied += diff / player.bestInfinityTime;
    if (player.partInfinitied >= 50) {
        player.infinitied += Math.floor(player.partInfinitied/5)
        player.partInfinitied = 0;
    }

    if (player.partInfinitied >= 5) {
        player.partInfinitied -= 5;
        player.infinitied ++;
    }

    player.infinityPoints = player.infinityPoints.plus(bestRunIppm.times(player.offlineProd/100).times(diff/600))

    if (player.money.lte(Number.MAX_VALUE) || (player.break && player.currentChallenge == "") || (player.currentChallenge != "" && player.money.lte(player.challengeTarget))) {

        for (let tier = (inQC(1) ? 1 : player.currentEternityChall == "eterc3" ? 3 : (player.currentChallenge == "challenge4" || player.currentChallenge == "postc1") ? 5 : 7) - (player.currentChallenge == "challenge7" || inQC(4) ? 1 : 0); tier >= 1; --tier) {
            var name = TIER_NAMES[tier];
            player[name + 'Amount'] = player[name + 'Amount'].plus(getDimensionProductionPerSecond(tier + (player.currentChallenge == "challenge7" || inQC(4) ? 2 : 1)).times(diff / 100));
        }

        if (player.currentChallenge == "challenge3" || player.currentChallenge == "postc1") {
            player.money = player.money.plus(getDimensionProductionPerSecond(1).times(diff/10).times(player.chall3Pow));
            player.totalmoney = player.totalmoney.plus(getDimensionProductionPerSecond(1).times(diff/10).times(player.chall3Pow));
        } else {
            var tempm = player.money
            var temptm = player.totalmoney
            player.money = player.money.plus(getDimensionProductionPerSecond(1).times(diff/10));
            player.totalmoney = player.totalmoney.plus(getDimensionProductionPerSecond(1).times(diff/10))
            if (player.totalmoney.gt("1e9000000000000000")) {
                  document.getElementById("decimalMode").style.display = "none"
                  if (break_infinity_js) {
                      player.money = tempm
                      player.totalmoney = temptm
                      clearInterval(gameLoopIntervalId)
                      alert("You have reached the limit of break_infinity.js and you will be forced to switch to logarithmica_numerus.js and soft reset right now.")
                      player.aarexModifications.breakInfinity = !player.aarexModifications.breakInfinity
                      player.aarexModifications.switch = true
                      save_game(true)
                      document.location.reload(true)
                      return
                  }
            }
        }
        if (player.currentChallenge == "challenge7" || inQC(4)) {
            player.money = player.money.plus(getDimensionProductionPerSecond(2).times(diff/10));
            player.totalmoney = player.totalmoney.plus(getDimensionProductionPerSecond(2).times(diff/10))
        }
    }

    document.getElementById("dimTabButtons").style.display = "none"

    if (player.currentEternityChall === "eterc12") player.totalTimePlayed += diff*1000
    else player.totalTimePlayed += diff
    if (player.galacticSacrifice) player.galacticSacrifice.time += diff
    if (player.meta) player.quantum.time += diff*(player.currentEternityChall==="eterc12"?1e3:1)
    player.thisInfinityTime += diff
    player.thisEternity += diff
    failsafeDilateTime = false

    if (player.eternities > 0 || quantumed) document.getElementById("tdtabbtn").style.display = ""
    document.getElementById("mdtabbtn").style.display = player.dilation.studies.includes(6) ? "" : "none"

    if (player.masterystudies) {
        player.quantum.colorPowers[colorCharge.color]=player.quantum.colorPowers[colorCharge.color].add(colorCharge.charge.times(diff/10))
        colorBoosts.r=Math.pow(player.quantum.colorPowers.r.add(1).log10(),player.dilation.active?2/3:0.5)/10+1
        colorBoosts.g=Math.sqrt(player.quantum.colorPowers.g.add(1).log10()*2+1)
        colorBoosts.b=Decimal.pow(10,Math.sqrt(player.quantum.colorPowers.b.add(1).log10()))
        if (colorBoosts.r>1.3) colorBoosts.r=Math.sqrt(colorBoosts.r*1.3)
        if (colorBoosts.g>4.5) colorBoosts.g=Math.sqrt(colorBoosts.g*4.5)
        if (colorBoosts.b.gt(1300)) colorBoosts.b=Decimal.pow(10,Math.pow(colorBoosts.b.log10()*Math.log10(1300),0.5))
    }
    if (speedrunMilestonesReached>5) {
        player.quantum.metaAutobuyerWait+=diff
        var speed=speedrunMilestonesReached>20?10/3:10
        if (player.quantum.metaAutobuyerWait>speed) {
            player.quantum.metaAutobuyerWait=player.quantum.metaAutobuyerWait%speed
            doAutoMetaTick()
        }
    }
    if (player.meta) {
        if (QCIntensity(4)>1) QC4Reward = Decimal.pow(10, player.meta[2].amount.times(player.meta[4].amount).times(player.meta[6].amount).times(player.meta[8].amount).max(1).log10()/75)
        else if (QCIntensity(4)) QC4Reward = Decimal.pow(10, Math.pow(player.meta[2].amount.times(player.meta[4].amount).times(player.meta[6].amount).times(player.meta[8].amount).max(1).log10(), 0.5)/10)
        else QC4Reward = new Decimal(1)
        player.meta.antimatter = player.meta.antimatter.plus(getMetaDimensionProduction(1).times(diff/10))
        if (inQC(4)) player.meta.antimatter = player.meta.antimatter.plus(getMetaDimensionProduction(1).times(diff/10))
        player.meta.bestAntimatter = player.meta.bestAntimatter.max(player.meta.antimatter)
    }
    var step = inQC(4) ? 2 : 1
    for (let tier=1;tier<9;tier++) {
        if (tier != 8 && (player.infDimensionsUnlocked[tier-1] || ECTimesCompleted("eterc7") > 0) && (!inQC(4) || tier != 7)) player["infinityDimension"+tier].amount = player["infinityDimension"+tier].amount.plus(DimensionProduction(tier+step).times(diff/100))
        if (player.infDimensionsUnlocked[tier-1]) {
            document.getElementById("infRow"+tier).style.display = "inline-block"
        } else {
            document.getElementById("infRow"+tier).style.display = "none"
        }

        if (tier < 9 - step){
            player["timeDimension"+tier].amount = player["timeDimension"+tier].amount.plus(getTimeDimensionProduction(tier+step).times(diff/100))
            if (player.meta) player.meta[tier].amount = player.meta[tier].amount.plus(getMetaDimensionProduction(tier+step).times(diff/100))
        }
    }
    document.getElementById("idtabbtn").style.display = (player.infDimensionsUnlocked[0] || player.eternities > 0 || quantumed) ? "" : "none"

    if ((player.infinitied > 0 && player.eternities < 1) || quantumed) {
        document.getElementById("dimTabButtons").style.display = "inline-block"
        document.getElementById("dtabbtn").style.display = "inline-block"
        document.getElementById("prodtabbtn").style.display = "inline-block"
    }
    if (player.eternities > 0) document.getElementById("dimTabButtons").style.display = "inline-block"

    if (player.currentEternityChall !== "eterc7") player.infinityPower = player.infinityPower.plus(DimensionProduction(1).times(diff/10))
    else if (player.currentChallenge !== "challenge4" && player.currentChallenge !== "postc1") player.seventhAmount = player.seventhAmount.plus(DimensionProduction(1).times(diff/10))




    if (player.currentEternityChall == "eterc7") player.infinityDimension8.amount = player.infinityDimension8.amount.plus(getTimeDimensionProduction(1).times(diff/10))
    else player.timeShards = player.timeShards.plus(getTimeDimensionProduction(1).times(diff/10))

    if (getTimeDimensionProduction(1).gt(0) && ECTimesCompleted("eterc7") > 0) player.infinityDimension8.amount = player.infinityDimension8.amount.plus(getTimeDimensionProduction(1).pow(ECTimesCompleted("eterc7")*0.2).minus(1).times(diff/10))

    let gain;
    if (player.boughtDims) {
        var oldT = player.totalTickGained
        player.totalTickGained = getTotalTickGained()
        player.tickThreshold = tickCost(player.totalTickGained+1)
        player.tickspeed = player.tickspeed.times(Decimal.pow(getTickSpeedMultiplier(), player.totalTickGained - oldT))
    } else if (player.timeShards.gt(player.tickThreshold)) {
        let thresholdMult=player.timestudy.studies.includes(171)?1.25:1.33
        if (QCIntensity(7)) thresholdMult *= Math.pow(0.975, QCIntensity(7))
        gain = Math.ceil(new Decimal(player.timeShards).dividedBy(player.tickThreshold).log10() / Math.log10(thresholdMult))
        player.totalTickGained += gain
        player.tickspeed = player.tickspeed.times(Decimal.pow(getTickSpeedMultiplier(), gain))
        player.postC3Reward=Decimal.pow(getPostC3RewardMult(),gain*getEC14Power()).times(player.postC3Reward)
        player.tickThreshold = new Decimal(1).times(thresholdMult).pow(player.totalTickGained)
        document.getElementById("totaltickgained").textContent = "You've gained "+getFullExpansion(player.totalTickGained)+" tickspeed upgrades."
        updateTickSpeed();
    }

    if ((player.eternities == 0 && !quantumed) || isEmptiness) {
        document.getElementById("eternityPoints2").style.display = "none"
        document.getElementById("eternitystorebtn").style.display = "none"
    } else {
        document.getElementById("eternityPoints2").style.display = "inline-block"
        document.getElementById("eternitystorebtn").style.display = "inline-block"
    }


    if (player.money.gte(Number.MAX_VALUE) && (!player.break || (player.currentChallenge !== "" && player.money.gte(player.challengeTarget)) || (player.currentEternityChall !== "eterc14" && !inQC(6) && isIC3Trapped() && player.money.gte("1e5000")))) {
        document.getElementById("bigcrunch").style.display = 'inline-block';
        if ((player.currentChallenge == "" || player.options.retryChallenge) && (player.bestInfinityTime <= 600 || player.break)) {}
        else {
            showTab('emptiness');
            isEmptiness = true
		}
    } else document.getElementById("bigcrunch").style.display = 'none';

    if (player.break && player.money.gte(Number.MAX_VALUE) && player.currentChallenge == "") {
        document.getElementById("postInfinityButton").style.display = "inline-block"
    } else {
        document.getElementById("postInfinityButton").style.display = "none"
    }


    if (player.break) document.getElementById("iplimit").style.display = "inline"
    else document.getElementById("iplimit").style.display = "none"
    document.getElementById("IPPeakDiv").style.display=(player.break&&player.boughtDims)?"":"none"

    var currentIPmin = gainedInfinityPoints().dividedBy(player.thisInfinityTime/600)
    if (currentIPmin.gt(IPminpeak)) IPminpeak = currentIPmin
    document.getElementById("postInfinityButton").innerHTML = "<b>"+(IPminpeak.gt("1e30000003") && (player.options.theme != "Aarex's Modifications" || player.options.notation=="Morse code" || player.options.notation=='Spazzy') ? "Gain " : "Big Crunch for ")+shortenDimensions(gainedInfinityPoints())+" Infinity points.</b>" + (IPminpeak.gt("1e100000") && (player.options.theme != "Aarex's Modifications" || player.options.notation=="Morse code" || player.options.notation=='Spazzy') ? "" : "<br>"+shortenDimensions(currentIPmin) + " IP/min"+"<br>Peaked at "+shortenDimensions(IPminpeak)+" IP/min")

    if (nextAt[player.postChallUnlocked] === undefined) document.getElementById("nextchall").textContent = " "
    else if (!player.achievements.includes("r133")) {
        document.getElementById("nextchall").textContent = "Next challenge unlocks at "+ shortenCosts(nextAt[player.postChallUnlocked]) + " antimatter."
        while (player.money.gte(nextAt[player.postChallUnlocked]) && player.challenges.includes("postc8") === false && player.postChallUnlocked != 8) {
            if (player.postChallUnlocked != 8) player.postChallUnlocked += 1
            if (player.eternities > 6) player.challenges.push("postc"+player.postChallUnlocked)
            updateChallenges()
        }
    }
    let chance = player.replicanti.chance
    let interval = player.replicanti.interval
    if (player.timestudy.studies.includes(62)) interval = interval/(player.aarexModifications.newGameExpVersion?4:3)
    if (player.replicanti.amount.gt(Number.MAX_VALUE)||player.timestudy.studies.includes(133)) interval *= 10
    if (player.timestudy.studies.includes(213)) interval /= 20
    if (GUBought("gb1")) interval /= 1-Math.min(Decimal.log10(getTickSpeedMultiplier()),0)
    if (player.replicanti.amount.lt(Number.MAX_VALUE) && player.achievements.includes("r134")) interval /= 2
    if (player.replicanti.amount.gt(Number.MAX_VALUE)) interval = player.boughtDims ? Math.pow(player.achievements.includes("r107")?Math.max(player.replicanti.amount.log(2)/1024,1):1, -.25) : Decimal.pow(getReplSpeed(), Math.max(player.replicanti.amount.log10() - 308, 0)/308).times(interval)
    if (player.masterystudies) if (player.masterystudies.includes("t273")) chance = Decimal.pow(chance,Math.pow(Math.log10(chance+1),5))
    var est = Decimal.add(chance,1).log10() * 1000 / interval

    var current = player.replicanti.amount.ln()

    if (player.replicanti.unl && (diff > 5 || interval < 50 || player.timestudy.studies.includes(192))) {
        if (player.timestudy.studies.includes(192)) player.replicanti.amount = Decimal.pow(Math.E, current +Math.log((diff*est/10) * (Math.log10(getReplSpeed())/308)+1) / (Math.log10(getReplSpeed())/308))
        else player.replicanti.amount = Decimal.pow(Math.E, current +(diff*est/10)).min(getReplicantiLimit())
        replicantiTicks = 0
    } else {
        if (interval <= replicantiTicks && player.replicanti.unl) {
            if (player.replicanti.amount.lte(100)) {
                var temp = player.replicanti.amount
                for (var i=0; temp.gt(i); i++) {
                    if (player.replicanti.chance > Math.random()) player.replicanti.amount = player.replicanti.amount.plus(1)
                }
            } else {
                var temp = Decimal.round(player.replicanti.amount.dividedBy(100))
                if (Math.round(player.replicanti.chance) !== 1) {
                    let counter = 0
                    for (var i=0; i<100; i++) {
                        if (player.replicanti.chance > Math.random()) {
                            counter++;
                        }
                    }
                    player.replicanti.amount = temp.times(counter).plus(player.replicanti.amount)
                    if (!player.timestudy.studies.includes(192)) player.replicanti.amount = player.replicanti.amount.min(getReplicantiLimit())
                    counter = 0
                } else {
                    player.replicanti.amount = player.replicanti.amount.times(2)
                    if (!player.timestudy.studies.includes(192)) player.replicanti.amount = player.replicanti.amount.min(getReplicantiLimit())
                }
            }
            replicantiTicks -= interval
        }

    }
    if (player.replicanti.amount !== 0) replicantiTicks += player.options.updateRate
    updateExtraReplGalaxies()

    if (current == Decimal.ln(Number.MAX_VALUE) && player.thisInfinityTime < 600*30) giveAchievement("Is this safe?");
    if (player.replicanti.galaxies >= 10 && player.thisInfinityTime < 150) giveAchievement("The swarm");

    if (player.replicanti.galaxybuyer && player.replicanti.amount.gte(Number.MAX_VALUE) && !(player.timestudy.studies.includes(131)&&speedrunMilestonesReached<20)) {
        document.getElementById("replicantireset").click()
    }
    if (player.masterystudies ? player.masterystudies.includes("t273") : false) {
        chance = chance.times(100)
        document.getElementById("replicantichance").innerHTML = "Replicate chance: "+getFullExpansion(chance.gt(1e12)?chance:Math.round(chance.toNumber()))+"%" + (isChanceAffordable() ? "<br>+1% Cost: "+shortenCosts(player.replicanti.chanceCost)+" IP" : "")
    } else document.getElementById("replicantichance").innerHTML = "Replicate chance: "+getFullExpansion(Math.round(player.replicanti.chance*100))+"%" + (isChanceAffordable() ? "<br>+1% Cost: "+shortenCosts(player.replicanti.chanceCost)+" IP" : "")
    document.getElementById("replicantiinterval").innerHTML = "Interval: "+timeDisplayShort(Decimal.div(interval, 100), true) + (isIntervalAffordable() ? "<br>-> "+timeDisplayShort(Decimal.times(interval, 9e-3), true)+" Cost: "+shortenCosts(player.replicanti.intervalCost)+" IP" : "")


    if (player.infMultBuyer && (!player.boughtDims || (player.infinityUpgrades.includes("skipResetBoost")))) {
        var dif
        if (player.aarexModifications.newGameExpVersion) dif = Math.floor(player.infinityPoints.div(player.infMultCost).log(4)) + 1
        else dif = player.infinityPoints.e - player.infMultCost.e +1
        if (dif > 0) {
            player.infMult = player.infMult.times(Decimal.pow(ipMultPower, dif))
            player.infMultCost = player.infMultCost.times(Decimal.pow(ipMultCostIncrease, dif))
            document.getElementById("infiMult").innerHTML = "Multiply infinity points from all sources by "+ipMultPower+"<br>currently: "+shorten(getIPMult()) +"x<br>Cost: "+shortenCosts(player.infMultCost)+" IP"
            player.infinityPoints = player.infinityPoints.minus(player.infMultCost.dividedBy(10))
            if (player.autobuyers[11].priority !== undefined && player.autobuyers[11].priority !== null && player.autoCrunchMode == "amount") player.autobuyers[11].priority = Decimal.times(player.autobuyers[11].priority, Decimal.pow(ipMultPower, dif));
            if (player.autoCrunchMode == "amount") document.getElementById("priority12").value = formatValue("Scientific", player.autobuyers[11].priority, 2, 0);
        }
    }

    var estimate = Math.max((Math.log(Number.MAX_VALUE) - current) / est, 0)
    document.getElementById("replicantiapprox").textContent = "Approximately "+ timeDisplay(estimate*10) + " Until Infinite Replicanti"

    document.getElementById("replicantiamount").textContent = shortenDimensions(player.replicanti.amount)
    document.getElementById("replicantimult").textContent = shorten(getIDReplMult())

    var currentQKmin = new Decimal(0)
    if (quantumed&&isQuantumReached()) {
        currentQKmin = quarkGain().dividedBy(player.quantum.time/600)
        if (currentQKmin.gt(QKminpeak) && player.meta.antimatter.gte(Decimal.pow(Number.MAX_VALUE,player.masterystudies?1.2:1))) {
            QKminpeak = currentQKmin
            QKminpeakValue = quarkGain()
        }
    }
    var currentEPmin = updateEPminpeak(diff);
    EPminpeakUnits = player.dilation.active && isSmartPeakActivated ? 'TP' : 'EP'
    EPminpeakUnits = (EPminpeakType == 'logarithm' ? ' log(' + EPminpeakUnits + ')' : ' ' + EPminpeakUnits) + '/min'
    document.getElementById("eternitybtnFlavor").textContent = (((!player.dilation.active&&gainedEternityPoints().lt(1e6))||player.currentEternityChall!==""||(player.options.theme=="Aarex's Modifications"&&player.options.notation!="Morse code"))
        ? ((player.currentEternityChall!=="" ? "Other challenges await..." : player.eternities>0 ? "" : "Other times await...") + " I need to become Eternal.") : "")
    document.getElementById("eternitybtnEPGain").innerHTML = ((player.eternities > 0 && (player.currentEternityChall==""||player.options.theme=="Aarex's Modifications"))
        ? "Gain <b>"+(player.dilation.active?shortenMoney(Math.max(getDilGain() - player.dilation.totalTachyonParticles, 0)):shortenDimensions(gainedEternityPoints()))+"</b> "+(player.dilation.active?"Tachyon particles.":"Eternity points.") : "")
    var showEPmin=(player.currentEternityChall===""||player.options.theme=="Aarex's Modifications")&&EPminpeak>0&&player.eternities>0&&player.options.notation!='Morse code'&&player.options.notation!='Spazzy'
    document.getElementById("eternitybtnRate").textContent = (showEPmin&&(EPminpeak.lt("1e30003")||player.options.theme=="Aarex's Modifications")
        ? (EPminpeakType == "normal" ? shortenDimensions(currentEPmin) : shorten(currentEPmin))+EPminpeakUnits : "")
    document.getElementById("eternitybtnPeak").textContent = (showEPmin
        ? "Peaked at "+(EPminpeakType == "normal" ? shortenDimensions(EPminpeak) : shorten(EPminpeak))+EPminpeakUnits : "")
    document.getElementById("quantumbtnFlavor").textContent = (!quantumed||!inQC(0)?(inQC(0)?"My computer is":player.quantum.challenge.length>1?"Paired challenge is":"My challenging skills are")+" not powerful enough... ":"") + "I need to go quantum."
    var showQuarkGain = quantumed&&(inQC(0)||player.options.theme=="Aarex's Modifications")
    document.getElementById("quantumbtnQKGain").textContent = showQuarkGain ? "Gain "+shortenDimensions(quarkGain())+" quark"+(quarkGain().eq(1)?".":"s.") : ""
    document.getElementById("quantumbtnRate").textContent = showQuarkGain ? shortenMoney(currentQKmin)+" QK/min" : ""
    var showQKPeakValue = QKminpeakValue.lt(1e30)||player.options.theme=="Aarex's Modifications"
    document.getElementById("quantumbtnPeak").textContent = showQuarkGain ? (showQKPeakValue ? "" : "Peaked at ") + shortenMoney(QKminpeak)+" QK/min" + (showQKPeakValue ? " at " + shortenDimensions(QKminpeakValue) + " QK" : "") : ""
    updateMoney();
    updateCoinPerSec();
    updateDimensions()
    updateInfCosts()
    updateInfinityDimensions();
    updateInfPower();
    updateTimeDimensions()
    updateTimeShards()
    updateDilation()
    if (getDimensionProductionPerSecond(1).gt(player.money) && !player.achievements.includes("r44")) {
        Marathon+=player.options.updateRate/1000;
        if (Marathon >= 30) giveAchievement("Over in 30 seconds");
    } else {
        Marathon = 0;
    }
    if (DimensionProduction(1).gt(player.infinityPower) && player.currentEternityChall != "eterc7" && !player.achievements.includes("r113")) {
        Marathon2+=player.options.updateRate/1000;
        if (Marathon2 >= 60) giveAchievement("Long lasting relationship");
    } else {
        Marathon2 = 0;
    }
    if (player.eternities >= 1 && (player.options.notation == "Standard" || player.options.notation == "Emojis" || player.options.notation == "Brackets")) {
        painTimer += player.options.updateRate/1000;
        if (painTimer >= 600) giveAchievement("Do you enjoy pain?");
    }

    if(player.money.gt(Math.pow(10,63))) giveAchievement("Supersanic");

    for (let tier = 1; tier <= 8; ++tier) {
        var name = TIER_NAMES[tier];
        if (player.currentChallenge != "challenge10" && player.currentChallenge != "postc1") {
            document.getElementById(name).className = canAfford(player[name + 'Cost']) ? 'storebtn' : 'unavailablebtn';
            document.getElementById(name + 'Max').className = canAfford(player[name + 'Cost'].times(10 - dimBought(tier))) ? 'storebtn' : 'unavailablebtn';
        } else {
            if (tier >= 3) {
                document.getElementById(name).className = player[TIER_NAMES[tier-2] + 'Amount'].gte(player[name + 'Cost']) ? 'storebtn' : 'unavailablebtn';
                document.getElementById(name + 'Max').className = player[TIER_NAMES[tier-2] + 'Amount'].gte(player[name + 'Cost'].times(10 - dimBought(tier))) ? 'storebtn' : 'unavailablebtn';
            } else {
                document.getElementById(name).className = canAfford(player[name + 'Cost']) ? 'storebtn' : 'unavailablebtn';
                document.getElementById(name + 'Max').className = canAfford(player[name + 'Cost'].times(10 - dimBought(tier))) ? 'storebtn' : 'unavailablebtn';
            }
        }
    }
    if (player.firstAmount.lt(1)) document.getElementById("first").className = 'storebtn';

    for (var tier = 1; tier < 9; tier++) {
        if (player.infinityPoints.gte(player["infinityDimension"+tier].cost)) document.getElementById("infMax"+tier).className = "storebtn"
        else document.getElementById("infMax"+tier).className = "unavailablebtn"
    }

    for (var tier = 1; tier < 9; tier++) {
        if (player.eternityPoints.gte(player["timeDimension"+tier].cost)) document.getElementById("timeMax"+tier).className = "storebtn"
        else document.getElementById("timeMax"+tier).className = "unavailablebtn"
    }

    if (player.dilation.studies.includes(1)) player.dilation.dilatedTime = player.dilation.dilatedTime.plus(getDilTimeGainPerSecond().times(diff/10))
    gainDilationGalaxies()

    if (canAfford(player.tickSpeedCost)) {
        document.getElementById("tickSpeed").className = 'storebtn';
        document.getElementById("tickSpeedMax").className = 'storebtn';
    } else {
        document.getElementById("tickSpeed").className = 'unavailablebtn';
        document.getElementById("tickSpeedMax").className = 'unavailablebtn';
    }
    if ((player.galacticSacrifice ? (player.galacticSacrifice.times > 0 || player.infinitied > 0 || player.eternities != 0 || quantumed) : false) && !isEmptiness) {
        document.getElementById("galaxybtn").style.display = "inline-block"
        document.getElementById("galaxyPoints").innerHTML = "You have <span class='GPAmount'>"+shortenDimensions(player.galacticSacrifice.galaxyPoints)+"</span> Galaxy point"+(player.galacticSacrifice.galaxyPoints.eq(1)?".":"s.")
    } else {
        document.getElementById("galaxybtn").style.display = "none";
    }
    if (document.getElementById("galaxy").style.display=='block') {
        galacticUpgradeSpanDisplay()
        galacticUpgradeButtonTypeDisplay()
    }
    if ((player.infinitied > 0 || player.infinityPoints.gt(0) || player.eternities !== 0 || quantumed) && !isEmptiness) {
        document.getElementById("infinitybtn").style.display = "inline-block";
        document.getElementById("challengesbtn").style.display = "inline-block";
        document.getElementById("infi11").className = "infinistorebtn1"
        document.getElementById("infi21").className = "infinistorebtn2"
        if (player.infinityUpgrades.includes("timeMult")) document.getElementById("infi12").className = "infinistorebtn1"
        else document.getElementById("infi12").className = "infinistorebtnlocked"
        if (player.infinityUpgrades.includes("dimMult")) document.getElementById("infi22").className = "infinistorebtn2"
        else document.getElementById("infi22").className = "infinistorebtnlocked"
        if (player.infinityUpgrades.includes("18Mult")) document.getElementById("infi13").className = "infinistorebtn1"
        else document.getElementById("infi13").className = "infinistorebtnlocked"
        if (player.infinityUpgrades.includes("27Mult")) document.getElementById("infi23").className = "infinistorebtn2"
        else document.getElementById("infi23").className = "infinistorebtnlocked"
        if (player.infinityUpgrades.includes("36Mult")) document.getElementById("infi14").className = "infinistorebtn1"
        else document.getElementById("infi14").className = "infinistorebtnlocked"
        if (player.infinityUpgrades.includes("45Mult") && player.infinityPoints.gte(2)) document.getElementById("infi24").className = "infinistorebtn2"
        else document.getElementById("infi24").className = "infinistorebtnlocked"
        if (player.infinityPoints.gte(3)) document.getElementById("infi31").className = "infinistorebtn3"
        else document.getElementById("infi31").className = "infinistorebtnlocked"
        if (player.infinityUpgrades.includes("timeMult2") && player.infinityPoints.gte(5)) document.getElementById("infi32").className = "infinistorebtn3"
        else document.getElementById("infi32").className = "infinistorebtnlocked"
        if (player.infinityUpgrades.includes("unspentBonus") && player.infinityPoints.gte(7)) document.getElementById("infi33").className = "infinistorebtn3"
        else document.getElementById("infi33").className = "infinistorebtnlocked"
        if (player.infinityUpgrades.includes("resetMult") && player.infinityPoints.gte(10)) document.getElementById("infi34").className = "infinistorebtn3"
        else document.getElementById("infi34").className = "infinistorebtnlocked"
        if (player.infinityPoints.gte(20)) document.getElementById("infi41").className = "infinistorebtn4"
        else document.getElementById("infi41").className = "infinistorebtnlocked"
        if (player.infinityUpgrades.includes("skipReset1") && player.infinityPoints.gte(40)) document.getElementById("infi42").className = "infinistorebtn4"
        else document.getElementById("infi42").className = "infinistorebtnlocked"
        if (player.infinityUpgrades.includes("skipReset2") && player.infinityPoints.gte(80)) document.getElementById("infi43").className = "infinistorebtn4"
        else document.getElementById("infi43").className = "infinistorebtnlocked"
        if (player.infinityUpgrades.includes("skipReset3") && player.infinityPoints.gte(500)) document.getElementById("infi44").className = "infinistorebtn4"
        else document.getElementById("infi44").className = "infinistorebtnlocked"
        if (player.infinityUpgrades.includes("skipResetGalaxy") && player.infinityUpgrades.includes("passiveGen") && player.infinityUpgrades.includes("galaxyBoost") && player.infinityUpgrades.includes("resetBoost") && player.infinityPoints.gte(player.infMultCost)) {
            document.getElementById("infiMult").className = "infinimultbtn"
        } else document.getElementById("infiMult").className = "infinistorebtnlocked"

        if (player.infinityPoints.gte(1e4)) document.getElementById("postinfi11").className = "infinistorebtn1"
        else document.getElementById("postinfi11").className = "infinistorebtnlocked"

        if (player.infinityPoints.gte(5e4)) document.getElementById("postinfi21").className = "infinistorebtn1"
        else document.getElementById("postinfi21").className = "infinistorebtnlocked"

        if (player.infinityPoints.gte(player.tickSpeedMultDecreaseCost)) document.getElementById("postinfi31").className = "infinimultbtn"
        else document.getElementById("postinfi31").className = "infinistorebtnlocked"

        if (player.infinityPoints.gte(5e11)) document.getElementById("postinfi41").className = "infinistorebtn1"
        else document.getElementById("postinfi41").className = "infinistorebtnlocked"

        if (player.infinityPoints.gte(1e5)) document.getElementById("postinfi12").className = "infinistorebtn1"
        else document.getElementById("postinfi12").className = "infinistorebtnlocked"

        if (player.infinityPoints.gte(1e6)) document.getElementById("postinfi22").className = "infinistorebtn1"
        else document.getElementById("postinfi22").className = "infinistorebtnlocked"

        if (player.infinityPoints.gte(1e7)) document.getElementById("postinfi32").className = "infinistorebtn1"
        else document.getElementById("postinfi32").className = "infinistorebtnlocked"

        if (player.infinityPoints.gte(player.dimensionMultDecreaseCost)) document.getElementById("postinfi42").className = "infinimultbtn"
        else document.getElementById("postinfi42").className = "infinistorebtnlocked"

        if (player.infinityPoints.gte(20e6)) document.getElementById("postinfi13").className = "infinistorebtn1"
        else document.getElementById("postinfi13").className = "infinistorebtnlocked"

        if (player.infinityPoints.gte(player.galacticSacrifice?5e6:5e9)) document.getElementById("postinfi23").className = "infinistorebtn1"
        else document.getElementById("postinfi23").className = "infinistorebtnlocked"

        if (player.infinityPoints.gte(1e15)) document.getElementById("postinfi33").className = "infinistorebtn1"
        else document.getElementById("postinfi33").className = "infinistorebtnlocked"

        if (player.infinityPoints.gte(player.offlineProdCost)) document.getElementById("offlineProd").className = "infinimultbtn"
        else document.getElementById("offlineProd").className = "infinistorebtnlocked"

        if (player.galacticSacrifice) {
            if (player.infinityPoints.gte(1e3)) document.getElementById("postinfi01").className = "infinistorebtn1"
            else document.getElementById("postinfi01").className = "infinistorebtnlocked"

            if (player.infinityPoints.gte(2e4)) document.getElementById("postinfi02").className = "infinistorebtn1"
            else document.getElementById("postinfi02").className = "infinistorebtnlocked"

            if (player.infinityPoints.gte(5e5)) document.getElementById("postinfi03").className = "infinistorebtn1"
            else document.getElementById("postinfi03").className = "infinistorebtnlocked"

            if (player.infinityPoints.gte(player.dimPowerIncreaseCost)) document.getElementById("postinfi04").className = "infinimultbtn"
            else document.getElementById("postinfi04").className = "infinistorebtnlocked"
        }
    } else {
        document.getElementById("infinitybtn").style.display = "none";
        document.getElementById("challengesbtn").style.display = "none";
    }
    if (player.infinityPoints.equals(0)){
        document.getElementById("infi11").className = "infinistorebtnlocked"
        document.getElementById("infi12").className = "infinistorebtnlocked"
        document.getElementById("infi13").className = "infinistorebtnlocked"
        document.getElementById("infi14").className = "infinistorebtnlocked"
        document.getElementById("infi21").className = "infinistorebtnlocked"
        document.getElementById("infi22").className = "infinistorebtnlocked"
        document.getElementById("infi23").className = "infinistorebtnlocked"
        document.getElementById("infi24").className = "infinistorebtnlocked"
        document.getElementById("infi31").className = "infinistorebtnlocked"
        document.getElementById("infi32").className = "infinistorebtnlocked"
        document.getElementById("infi33").className = "infinistorebtnlocked"
        document.getElementById("infi34").className = "infinistorebtnlocked"
        document.getElementById("infi41").className = "infinistorebtnlocked"
        document.getElementById("infi42").className = "infinistorebtnlocked"
        document.getElementById("infi43").className = "infinistorebtnlocked"
        document.getElementById("infi44").className = "infinistorebtnlocked"
        document.getElementById("infiMult").className = "infinistorebtnlocked"
    }

    if (player.autobuyers[11]%1 === 0 || player.autobuyers[11].interval>100) document.getElementById("break").className = "infinistorebtnlocked"
    else document.getElementById("break").className = "infinistorebtn2"

    if (player.eightBought > 0 && player.resets > 4 && player.currentEternityChall !== "eterc3") document.getElementById("sacrifice").className = "storebtn"
    else document.getElementById("sacrifice").className = "unavailablebtn"

    if (player.autobuyers[11]%1 !== 0 && player.autobuyers[11].interval == 100) {
        document.getElementById("postinftable").style.display = "inline-block"
        document.getElementById("breaktable").style.display = "inline-block"
    } else {
        document.getElementById("postinftable").style.display = "none"
        document.getElementById("breaktable").style.display = "none"
    }

    if (player.autobuyers[11].interval == 100) document.getElementById("abletobreak").style.display = "none"

    if (isEmptiness) {
        document.getElementById("dimensionsbtn").style.display = "none";
        document.getElementById("optionsbtn").style.display = "none";
        document.getElementById("statisticsbtn").style.display = "none";
        document.getElementById("achievementsbtn").style.display = "none";
        document.getElementById("tickSpeed").style.visibility = "hidden";
        document.getElementById("tickSpeedMax").style.visibility = "hidden";
        document.getElementById("tickLabel").style.visibility = "hidden";
        document.getElementById("tickSpeedAmount").style.visibility = "hidden";
        document.getElementById("quantumtabbtn").style.display = "none"
    } else {
        document.getElementById("dimensionsbtn").style.display = "inline-block";
        document.getElementById("optionsbtn").style.display = "inline-block";
        document.getElementById("statisticsbtn").style.display = "inline-block";
        document.getElementById("achievementsbtn").style.display = "inline-block";
    }

    document.getElementById("epmult").className = player.eternityPoints.gte(player.epmultCost) ? "eternityupbtn" : "eternityupbtnlocked"

    if (player.infinityUpgrades.includes("bulkBoost")) document.getElementById("bulkdimboost").style.display = "inline"
    else document.getElementById("bulkdimboost").style.display = "none"

    if (player.infinityUpgrades.includes("timeMult")) document.getElementById("infi11").className = "infinistorebtnbought"
    if (player.infinityUpgrades.includes("dimMult")) document.getElementById("infi21").className = "infinistorebtnbought"
    if (player.infinityUpgrades.includes("18Mult")) document.getElementById("infi12").className = "infinistorebtnbought"
    if (player.infinityUpgrades.includes("27Mult")) document.getElementById("infi22").className = "infinistorebtnbought"
    if (player.infinityUpgrades.includes("36Mult")) document.getElementById("infi13").className = "infinistorebtnbought"
    if (player.infinityUpgrades.includes("45Mult")) document.getElementById("infi23").className = "infinistorebtnbought"
    if (player.infinityUpgrades.includes("resetBoost")) document.getElementById("infi14").className = "infinistorebtnbought"
    if (player.infinityUpgrades.includes("galaxyBoost")) document.getElementById("infi24").className = "infinistorebtnbought"
    if (player.infinityUpgrades.includes("timeMult2")) document.getElementById("infi31").className = "infinistorebtnbought"
    if (player.infinityUpgrades.includes("unspentBonus")) document.getElementById("infi32").className = "infinistorebtnbought"
    if (player.infinityUpgrades.includes("resetMult")) document.getElementById("infi33").className = "infinistorebtnbought"
    if (player.infinityUpgrades.includes("passiveGen")) document.getElementById("infi34").className = "infinistorebtnbought"
    if (player.infinityUpgrades.includes("skipReset1")) document.getElementById("infi41").className = "infinistorebtnbought"
    if (player.infinityUpgrades.includes("skipReset2")) document.getElementById("infi42").className = "infinistorebtnbought"
    if (player.infinityUpgrades.includes("skipReset3")) document.getElementById("infi43").className = "infinistorebtnbought"
    if (player.infinityUpgrades.includes("skipResetGalaxy")) document.getElementById("infi44").className = "infinistorebtnbought"

    if (player.infinityUpgrades.includes("totalMult")) document.getElementById("postinfi11").className = "infinistorebtnbought"
    if (player.infinityUpgrades.includes("currentMult")) document.getElementById("postinfi21").className = "infinistorebtnbought"
    if (player.tickSpeedMultDecrease <= 2) document.getElementById("postinfi31").className = "infinistorebtnbought"
    if (player.infinityUpgrades.includes("achievementMult")) document.getElementById("postinfi22").className = "infinistorebtnbought"
    if (player.infinityUpgrades.includes("infinitiedMult")) document.getElementById("postinfi12").className = "infinistorebtnbought"
    if (player.infinityUpgrades.includes("postGalaxy")) document.getElementById("postinfi41").className = "infinistorebtnbought"
    if (player.infinityUpgrades.includes("challengeMult")) document.getElementById("postinfi32").className = "infinistorebtnbought"
    if (player.dimensionMultDecrease <= 3-ECTimesCompleted("eterc6")*0.2) document.getElementById("postinfi42").className = "infinistorebtnbought"
    if (player.offlineProd == 50) document.getElementById("offlineProd").className = "infinistorebtnbought"
    if (player.galacticSacrifice) {
        if (player.infinityUpgrades.includes("galPointMult")) document.getElementById("postinfi01").className = "infinistorebtnbought"
        if (player.infinityUpgrades.includes("dimboostCost")) document.getElementById("postinfi02").className = "infinistorebtnbought"
        if (player.infinityUpgrades.includes("galCost")) document.getElementById("postinfi03").className = "infinistorebtnbought"
        if (player.extraDimPowerIncrease >= 25) document.getElementById("postinfi04").className = "infinistorebtnbought"
    }


    if (player.infinityUpgrades.includes("infinitiedGeneration")) document.getElementById("postinfi13").className = "infinistorebtnbought"
    if (player.infinityUpgrades.includes("bulkBoost")) document.getElementById("postinfi23").className = "infinistorebtnbought"
    if (player.infinityUpgrades.includes("autoBuyerUpgrade")) document.getElementById("postinfi33").className = "infinistorebtnbought"

    if (player.aarexModifications.progressBar) {
        document.getElementById("progressbar").className=""
        if (document.getElementById("metadimensions").style.display == "block") doQuantumProgress() 
        else if (player.currentChallenge !== "") {
            var percentage = Math.min((Decimal.log10(player.money.plus(1)) / Decimal.log10(player.challengeTarget) * 100), 100).toFixed(2) + "%"
            document.getElementById("progressbar").style.width = percentage
            document.getElementById("progresspercent").textContent = percentage
            document.getElementById("progresspercent").setAttribute('ach-tooltip',"Percentage to challenge goal")
        } else if (!player.break) {
            var percentage = Math.min((Decimal.log10(player.money.plus(1)) / Decimal.log10(Number.MAX_VALUE) * 100), 100).toFixed(2) + "%"
            document.getElementById("progressbar").style.width = percentage
            document.getElementById("progresspercent").textContent = percentage
            document.getElementById("progresspercent").setAttribute('ach-tooltip',"Percentage to Infinity")
        } else if (player.infDimensionsUnlocked.includes(false)) {
            var percentage = Math.min(player.money.e / getNewInfReq().e * 100, 100).toFixed(2) + "%"
            document.getElementById("progressbar").style.width = percentage
            document.getElementById("progresspercent").textContent = percentage
            document.getElementById("progresspercent").setAttribute('ach-tooltip',"Percentage to next dimension unlock")
        } else if (player.currentEternityChall !== '' && player.infinityPoints.lt(player.eternityChallGoal.pow(2))) {
            var percentage = Math.min(Decimal.log10(player.infinityPoints.plus(1)) / player.eternityChallGoal.log10() * 100, 100).toFixed(2) + "%"
            document.getElementById("progressbar").style.width = percentage
            document.getElementById("progresspercent").textContent = percentage
            document.getElementById("progresspercent").setAttribute('ach-tooltip',"Percentage to Eternity Challenge goal")
        } else if (player.infinityPoints.lt(Number.MAX_VALUE) || player.eternities == 0) {
            var percentage = Math.min(Decimal.log10(player.infinityPoints.plus(1)) / Decimal.log10(Number.MAX_VALUE)  * 100, 100).toFixed(2) + "%"
            document.getElementById("progressbar").style.width = percentage
            document.getElementById("progresspercent").textContent = percentage
            document.getElementById("progresspercent").setAttribute('ach-tooltip',"Percentage to Eternity")
        } else if (player.achievements.includes('r127') && !player.achievements.includes('r128') && player.timestudy.studies.length == 0) {
            var percentage = (Decimal.log10(player.infinityPoints.plus(1)) / 220).toFixed(2) + "%"
            document.getElementById("progressbar").style.width = percentage
            document.getElementById("progresspercent").textContent = percentage
            document.getElementById("progresspercent").setAttribute('ach-tooltip','Percentage to "What do I have to do to get rid of you"')
        } else if (player.dilation.studies.includes(5) && player.dilation.active && !player.achievements.includes('r138') && player.timestudy.studies.length == 0) {
            var percentage = Math.min(Decimal.log10(player.infinityPoints.plus(1)) / 200, 100).toFixed(2) + "%"
            document.getElementById("progressbar").style.width = percentage
            document.getElementById("progresspercent").textContent = percentage
            document.getElementById("progresspercent").setAttribute('ach-tooltip','Percentage to "That is what I have to do to get rid of you."')
        } else if (player.dilation.active && getDilGain() <= player.dilation.totalTachyonParticles) {
            var percentage = (Math.log10(getDilGain()) / Math.log10(player.dilation.totalTachyonParticles)).toFixed(2) + "%"
            document.getElementById("progressbar").style.width = percentage
            document.getElementById("progresspercent").textContent = percentage
            document.getElementById("progresspercent").setAttribute('ach-tooltip','Percentage to the requirement for tachyon particle gain')
        } else if ((!inQC(0) || gainedEternityPoints().gte(Decimal.pow(2,1048576))) && player.meta) doQuantumProgress()
        else {
            var gepLog = gainedEternityPoints().log2()
            var goal = Math.pow(2,Math.ceil(Math.log10(gepLog) / Math.log10(2)))
            if (goal > 131072 && player.meta && !player.achievements.includes('ngpp13')) {
	    		goal = Decimal.sub("1e40000", player.eternityPoints).log2()
    			var percentage = Math.min(gepLog / goal * 100, 100).toFixed(2) + "%"
    			document.getElementById("progressbar").style.width = percentage
    			document.getElementById("progresspercent").textContent = percentage
    			document.getElementById("progresspercent").setAttribute('ach-tooltip','Percentage to "In the grim darkness of the far endgame"')
            } else if (goal > 512 && !player.achievements.includes('r127')) {
    			goal = Decimal.sub(Number.MAX_VALUE, player.eternityPoints).log2()
    			var percentage = Math.min(gepLog / goal * 100, 100).toFixed(2) + "%"
    			document.getElementById("progressbar").style.width = percentage
    			document.getElementById("progresspercent").textContent = percentage
    			document.getElementById("progresspercent").setAttribute('ach-tooltip','Percentage to "But I wanted another prestige layer..."')
            } else {
	    		var percentage = Math.min(gepLog / goal * 100, 100).toFixed(2) + "%"
    			document.getElementById("progressbar").style.width = percentage
	    		document.getElementById("progresspercent").textContent = percentage
	    		document.getElementById("progresspercent").setAttribute('ach-tooltip',"Percentage to "+shortenDimensions(Decimal.pow(2,goal))+" EP gain")
            }
        }
    }

    document.getElementById("ec1reward").textContent = "Reward: "+shortenMoney(Math.pow(Math.max(player.thisEternity*10, 1), 0.3+(ECTimesCompleted("eterc1")*0.05)))+"x on all Time Dimensions (based on time spent this Eternity)"
    document.getElementById("ec2reward").textContent = "Reward: Infinity power affects 1st Infinity Dimension with reduced effect, Currently: "+shortenMoney(player.infinityPower.pow(1.5/(700 - ECTimesCompleted("eterc2")*100)).min(new Decimal("1e100")).max(1))+"x"
    document.getElementById("ec3reward").textContent = "Reward: Increase the multiplier for buying 10 dimensions, Currently: "+shorten(getDimensionPowerMultiplier(true))+"x"
    document.getElementById("ec4reward").textContent = "Reward: Infinity Dimension multiplier from unspent IP, Currently: "+shortenMoney(player.infinityPoints.pow(0.003 + ECTimesCompleted("eterc4")*0.002).min(new Decimal("1e200")))+"x"
    document.getElementById("ec5reward").textContent = "Reward: Galaxy cost scaling starts "+((ECTimesCompleted("eterc5")*5))+" galaxies later."
    document.getElementById("ec6reward").textContent = "Reward: Further reduce the dimension cost multiplier increase, Currently: "+player.dimensionMultDecrease.toFixed(1)+"x "
    document.getElementById("ec7reward").textContent = "Reward: First Time dimension produces Eighth Infinity Dimensions, Currently: "+shortenMoney(getTimeDimensionProduction(1).pow(ECTimesCompleted("eterc7")*0.2).minus(1).max(0))+" per second. "
    document.getElementById("ec8reward").textContent = "Reward: Infinity power powers up replicanti galaxies, Currently: " + (Math.max(Math.pow(Math.log10(player.infinityPower.plus(1).log10()+1), 0.03 * ECTimesCompleted("eterc8"))-1, 0) * 100).toFixed(2) + "%"
    document.getElementById("ec9reward").textContent = "Reward: Infinity Dimension multiplier based on time shards, Currently: "+shortenMoney(player.timeShards.pow(ECTimesCompleted("eterc9")*0.1).min(new Decimal("1e400")))+"x "
    document.getElementById("ec10reward").textContent = "Reward: Time dimensions gain a multiplier from infinitied stat, Currently: "+shortenMoney(new Decimal(Math.max(Math.pow(getInfinitied(), 0.9) * ECTimesCompleted("eterc10") * 0.000002+1, 1)).pow((player.timestudy.studies.includes(31)) ? 4 : 1))+"x "
    document.getElementById("ec11reward").textContent = "Reward: Further reduce the tickspeed cost multiplier increase, Currently: "+player.tickSpeedMultDecrease.toFixed(2)+"x "
    document.getElementById("ec12reward").textContent = "Reward: Infinity Dimension cost multipliers are reduced. (x^"+(1-ECTimesCompleted("eterc12")*0.008)+")"
    document.getElementById("ec13reward").textContent = "Reward: Increase the power of meta-antimatter. ("+(9+ECTimesCompleted("eterc13")*0.2)+"x)"
    document.getElementById("ec14reward").textContent = "Reward: Free tickspeed upgrades increases IC3 reward "+(ECTimesCompleted("eterc14")*2)+" times."

    document.getElementById("ec10span").textContent = shortenMoney(ec10bonus) + "x"
    var scale1 = [2.82e-45,1e-42,7.23e-30,5e-21,9e-17,6.2e-11,5e-8,3.555e-6,7.5e-4,1,2.5e3,2.6006e6,3.3e8,5e12,4.5e17,1.08e21,1.53e24,1.41e27,5e32,8e36,1.7e45,1.7e48,3.3e55,3.3e61,5e68,1e73,3.4e80,1e113,Number.MAX_VALUE,new Decimal("1e65000")];
    var scale2 = [" protons."," nucleui."," Hydrogen atoms."," viruses."," red blood cells."," grains of sand."," grains of rice."," teaspoons."," wine bottles."," fridge-freezers."," Olympic-sized swimming pools."," Great Pyramids of Giza."," Great Walls of China."," large asteroids.",
                " dwarf planets."," Earths."," Jupiters."," Suns."," red giants."," hypergiant stars."," nebulas."," Oort clouds."," Local Bubbles."," galaxies."," Local Groups."," Sculptor Voids."," observable universes."," Dimensions.", " Infinity Dimensions.", " Time Dimensions."];
    var id = 0;
    if (player.money.times(4.22419e-105).gt(2.82e-45)) {
        if (player.money.times(4.22419e-105).gt(scale1[scale1.length - 1])) id = scale1.length - 1;
        else {
            while (player.money.times(4.22419e-105).gt(scale1[id])) id++;
            if (id > 0) id--;
        }
        if (id >= 7 && id < 11) document.getElementById("infoScale").textContent = "If every antimatter were a planck volume, you would have enough to fill " + formatValue(player.options.notation, player.money * 4.22419e-105 / scale1[id], 2, 1) + scale2[id];
        else document.getElementById("infoScale").textContent = "If every antimatter were a planck volume, you would have enough to make " + formatValue(player.options.notation, player.money.times(4.22419e-105).dividedBy(scale1[id]), 2, 1) + scale2[id];
    } else { //does this part work correctly? i doubt it does
        if (player.money.times(1e-54) < 2.82e-45) document.getElementById("infoScale").textContent = "If every antimatter were " + formatValue(player.options.notation,2.82e-45 / 1e-54 / player.money, 2, 1) + " attometers cubed, you would have enough to make a proton."
        else if (player.money * 1e-63 < 2.82e-45) document.getElementById("infoScale").textContent = "If every antimatter were " + formatValue(player.options.notation,2.82e-45 / 1e-63 / player.money, 2, 1) + " zeptometers cubed, you would have enough to make a proton."
        else if (player.money * 1e-72 < 2.82e-45) document.getElementById("infoScale").textContent = "If every antimatter were " + formatValue(player.options.notation,2.82e-45 / 1e-72 / player.money, 2, 1) + " yoctometers cubed, you would have enough to make a proton."
        else document.getElementById("infoScale").textContent = "If every antimatter were " + formatValue(player.options.notation,2.82e-45 / 4.22419e-105 / player.money, 2, 1) + " planck volumes, you would have enough to make a proton."
    }
    if (player.money.gt(Decimal.pow(10, 3 * 86400 * 365.2425 * 79.3 / 10))) {
        var years = player.money.log10() / 3 / 86400 / 365.2425
        if (years>2019) {
            eventBC = years - 2018
            if (eventBC > 315e3) {
                since = "???"
                eventBC = 1/0 - eventBC
            } else if (eventBC > 25e4) {
                since = "Homo sapiens"
                eventBC = 315e3 - eventBC
            } else if (eventBC > 195e3) {
                since = "Homo neanderthalensis"
                eventBC = 25e4 - eventBC
            } else if (eventBC > 16e4) {
                since = "emergence of anatomically modern humans"
                eventBC = 195e3 - eventBC
            } else if (eventBC > 125e3) {
                since = "Homo sapiens idaltu"
                eventBC = 16e4 - eventBC
            } else if (eventBC > 7e4) {
                since = "peak of Eemian interglacial period"
                eventBC = 125e3 - eventBC
            } else if (eventBC > 67e3) {
                since = "earliest abstract/symbolic art"
                eventBC = 7e4 - eventBC
            } else if (eventBC > 5e4) {
                since = "Upper Paleolithic"
                eventBC = 67e3 - eventBC
            } else if (eventBC > 45e3) {
                since = "Late Stone Age"
                eventBC = 5e4 - eventBC
            } else if (eventBC > 4e4) {
                since = "European early modern humans"
                eventBC = 45e3 - eventBC
            } else if (eventBC > 4e4) {
                since = "European early modern humans"
                eventBC = 45e3 - eventBC
            } else if (eventBC > 35e3) {
                since = "first human settlement"
                eventBC = 4e4 - eventBC
            } else if (eventBC > 33e3) {
                since = "oldest known figurative art"
                eventBC = 35e3 - eventBC
            } else if (eventBC > 31e3) {
                since = "oldest known domesticated dog"
                eventBC = 33e3 - eventBC
            } else if (eventBC > 29e3) {
                since = "Last Glacial Maximum"
                eventBC = 31e3 - eventBC
            } else if (eventBC > 28e3) {
                since = "oldest ovens"
                eventBC = 29e3 - eventBC
            } else if (eventBC > 25e3) {
                since = "oldest known twisted rope"
                eventBC = 28e3 - eventBC
            } else if (eventBC > 2e4) {
                since = "oldest human permanent settlement (hamlet considering built of rocks and of mammoth bones)"
                eventBC = 25e3 - eventBC
            } else if (eventBC > 16e3) {
                since = "rise of Kerberan culture"
                eventBC = 2e4 - eventBC
            } else if (eventBC > 15e3) {
                since = "colonization of North America"
                eventBC = 16e3 - eventBC
            } else if (eventBC > 14e3) {
                since = "domestication of the pig"
                eventBC = 15e3 - eventBC
            } else if (eventBC > 11600) {
                since = "prehistoric warfare"
                eventBC = 14e3 - eventBC
            } else if (eventBC > 1e4) {
                since = "Holocene"
                eventBC = 11600 - eventBC
            } else if (eventBC > 8e3) {
                since = "death of other human breeds"
                eventBC = 1e4 - eventBC
            } else if (eventBC > 6e3) {
                since = "agriculture"
                eventBC = 8e3 - eventBC
            } else if (eventBC > 6e3) {
                since = "agriculture"
                eventBC = 8e3 - eventBC
            } else if (eventBC > 5e3) {
                since = "farmers arrived in Europe"
                eventBC = 6e3 - eventBC
            } else if (eventBC > 4e3) {
                since = "first metal tools"
                eventBC = 5e3 - eventBC
            } else if (eventBC > 3200) {
                since = "first horse"
                eventBC = 4e3 - eventBC
            } else if (eventBC > 3e3) {
                since = "Sumerian cuneiform writing system"
                eventBC = 3200 - eventBC
            } else if (eventBC > 2600) {
                since = "union of Egypt"
                eventBC = 3e3 - eventBC
            } else if (eventBC > 2500) {
                since = "rise of Maya"
                eventBC = 2600 - eventBC
            } else if (eventBC > 2300) {
                since = "extinct of mammoths"
                eventBC = 2500 - eventBC
            } else if (eventBC > 1800) {
                since = "rise of Akkadian Empire"
                eventBC = 2300 - eventBC
            } else if (eventBC > 1175) {
                since = "first alphabetic writing"
                eventBC = 1800 - eventBC
            } else if (eventBC > 1400) {
                since = "rise of Olmec civilization"
                eventBC = 1400 - eventBC
            } else if (eventBC > 800) {
                since = "end of bronze age"
                eventBC = 1175 - eventBC
            } else if (eventBC > 753) {
                since = "rise of Greek city-states"
                eventBC = 800 - eventBC
            } else if (eventBC > 653) {
                since = "rise of Rome"
                eventBC = 753 - eventBC
            } else if (eventBC > 539) {
                since = "rise of Persian Empire"
                eventBC = 653 - eventBC
            } else if (eventBC > 356) {
                since = "fall of Babylonian Empire"
                eventBC = 539 - eventBC
            } else if (eventBC > 200) {
                since = "birth of Alexander the Great"
                eventBC = 356 - eventBC
            } else if (eventBC > 4) {
                since = "the first paper"
                eventBC = 200 - eventBC
            } else {
                since = "birth of Jesus Christ"
                eventBC = 4 - eventBC
            }
            var message = "<br>If you end the non-stop writing of your full antimatter amount with 3 digits per second, you would start it in "+getFullExpansion(Math.floor(years - 2018))+" BC."+(since=="???"?"":"<br>(around "+getFullExpansion(Math.ceil(eventBC))+" years since the "+since+")")
        } else {
            var message = "<br>If you start writing 3 digits of your full antimatter amount a second down when you were an American baby,<br> you would "
            if (years>79.3) message+="become a ghost for "+((years-79.3) / years * 100).toFixed(3)+"% of this session."
            else message+="waste "+(years / 0.793).toFixed(3)+"% of your average life."
        }
        document.getElementById("infoScale").innerHTML = message
    } else if (player.money.gt(new Decimal("1e100000"))) document.getElementById("infoScale").innerHTML = "<br>If you wrote 3 numbers a second, it would take you <br>" + timeDisplay(player.money.log10()*10/3) + "<br> to write down your antimatter amount."

    var shiftRequirement = getShiftRequirement(0);

    if (player[TIER_NAMES[shiftRequirement.tier] + 'Bought'] >= shiftRequirement.amount) {
        document.getElementById("softReset").className = 'storebtn';
    } else {
        document.getElementById("softReset").className = 'unavailablebtn';
    }

    if (player.tickspeedBoosts != undefined ? (player.resets > 0 || player.tickspeedBoosts > 0 || player.galaxies > 0 || player.infinitied > 0 || player.eternities != 0 || quantumed) : false) {
        var tickReq = getTickspeedBoostRequirement()
        document.getElementById("tickReset").style.display = ""
        document.getElementById("tickResetLabel").textContent = "Tickspeed Boost ("+getFullExpansion(player.tickspeedBoosts)+"): requires "+getFullExpansion(tickReq.amount)+" "+DISPLAY_NAMES[tickReq.tier]+" Dimensions"
        document.getElementById("tickResetBtn").className = Math.round(player[TIER_NAMES[tickReq.tier]+"Amount"])<tickReq.amount ? "unavailablebtn" : "storebtn"
    } else document.getElementById("tickReset").style.display = "none"

    if (player.eightBought >= getGalaxyRequirement()) {
        document.getElementById("secondSoftReset").className = 'storebtn';
    } else {
        document.getElementById("secondSoftReset").className = 'unavailablebtn';
    }

    if (player.currentChallenge == "challenge4" && player.sixthBought >= getGalaxyRequirement()) {
        document.getElementById("secondSoftReset").className = 'storebtn';
    }

    if (player.currentChallenge == "challenge2" || player.currentChallenge == "postc1") document.getElementById("chall2Pow").style.display = "inline-block"
    else document.getElementById("chall2Pow").style.display = "none"
    if (player.currentChallenge == "challenge3" || player.currentChallenge == "postc1") document.getElementById("chall3Pow").style.display = "inline-block"
    else document.getElementById("chall3Pow").style.display = "none"

    document.getElementById("chall2Pow").textContent = (player.chall2Pow*100).toFixed(2) + "%"
    document.getElementById("chall3Pow").textContent = shorten(player.chall3Pow*100) + "%"


    if (player.infDimensionsUnlocked[7] == false && player.break && player.eternities <= 24) {
        document.getElementById("newDimensionButton").style.display = "inline-block"
    } else document.getElementById("newDimensionButton").style.display = "none"

    if (player.money.gte(getNewInfReq())) document.getElementById("newDimensionButton").className = "newdim"
    else document.getElementById("newDimensionButton").className = "newdimlocked"

    var infdimpurchasewhileloop = 1;
    while (player.eternities > 24 && getNewInfReq().lt(player.money) && player.infDimensionsUnlocked[7] === false) {
        for (i=0; i<8; i++) {
            if (player.infDimensionsUnlocked[i]) infdimpurchasewhileloop++
        }
        newDimension()
        if (player.infDimBuyers[i-1]) buyMaxInfDims(infdimpurchasewhileloop)
        infdimpurchasewhileloop = 1;
    }

    document.getElementById("newDimensionButton").textContent = "Get " + shortenCosts(getNewInfReq()) + " antimatter to unlock a new Dimension."

    document.getElementById("sacrifice").setAttribute('ach-tooltip', "Boosts 8th Dimension by " + formatValue(player.options.notation, calcSacrificeBoost(), 2, 2) + "x");
    document.getElementById("sacrifice").textContent = "Dimensional Sacrifice ("+formatValue(player.options.notation, calcSacrificeBoost(), 2, 2)+"x)"

    document.getElementById("sacrificebtn").style.display = "none"
    if (document.getElementById("gSacrifice").style.display === "inline-block") {
        document.getElementById("gSacrifice").innerHTML = "Galactic Sacrifice (" + formatValue(player.options.notation, getGSAmount(), 2, 0) + " GP)"
        document.getElementById("gSacrifice").setAttribute('ach-tooltip', "Gain " + formatValue(player.options.notation, getGSAmount(), 2, 0) + " GP")
        if (getGSAmount().gt(0)) {
            document.getElementById("gSacrifice").className = "storebtn"
            document.getElementById("sacrificebtn").style.display = ""
            var currentGPmin = getGSAmount().dividedBy(player.galacticSacrifice.time/600)
            if (currentGPmin.gt(GPminpeak)) GPminpeak = currentGPmin
            document.getElementById("sacrificebtn").innerHTML = ((GPminpeak.gt("1e300000")&&player.options.theme!="Aarex's Modifications")||player.options.notation=="Morse code"||player.options.notation=='Spazzy'?"Gain ":"Galactic Sacrifice for ")+shortenDimensions(getGSAmount())+" Galaxy points."+((GPminpeak.gt("1e3000")&&player.options.theme!="Aarex's Modifications")||player.options.notation=="Morse code"||player.options.notation=='Spazzy'?"":"<br>"+shortenMoney(currentGPmin)+" GP/min"+"<br>Peaked at "+shortenMoney(GPminpeak)+" GP/min")
        } else document.getElementById("gSacrifice").className = "unavailablebtn"
    }

    if (isNaN(player.totalmoney)) player.totalmoney = new Decimal(10)
    if (player.timestudy.studies.includes(181)) player.infinityPoints = player.infinityPoints.plus(gainedInfinityPoints().times(diff/1000))
    if (player.masterystudies) {
        if (player.masterystudies.includes("t291")) {
            player.eternityPoints = player.eternityPoints.plus(gainedEternityPoints().times(diff/1000))
            document.getElementById("eternityPoints2").innerHTML = "You have <span class=\"EPAmount2\">"+shortenDimensions(player.eternityPoints)+"</span> Eternity points."
        }
        if (player.dilation.active) if (player.masterystudies.includes("t292")) {
            player.dilation.tachyonParticles = player.dilation.tachyonParticles.max(getDilGain())
            player.dilation.bestTP = player.dilation.bestTP.max(player.dilation.tachyonParticles)
        }
    }
    if (player.dilation.upgrades.includes(10)) {
		player.timestudy.theorem += parseFloat(getPassiveTTGen().times(diff/10).toString())
        if ((document.getElementById("timestudies").style.display != "none" || document.getElementById("ers_timestudies").style.display != "none" || document.getElementById("masterystudies").style.display != "none") && document.getElementById("eternitystore").style.display != "none") {
            document.getElementById("timetheorems").innerHTML = "You have <span style='display:inline' class=\"TheoremAmount\">"+(player.timestudy.theorem>99999?shortenMoney(player.timestudy.theorem):getFullExpansion(Math.floor(player.timestudy.theorem)))+"</span> Time Theorem"+ (player.timestudy.theorem == 1 ? "." : "s.")
            if (document.getElementById("timestudies").style.display != "none") updateTimeStudyButtons()
            else updateMasteryStudyButtons()
        }
    }

    setAndMaybeShow("quantumClock", player.masterystudies ? (quantumed && player.quantum.times > 1 && speedrunMilestonesReached < 24) : false, '"Quantum time: <b class=\'QKAmount\'>"+timeDisplayShort(player.quantum.time)+"</b>"')

    document.getElementById("infinityPoints1").innerHTML = "You have <span class=\"IPAmount1\">"+shortenDimensions(player.infinityPoints)+"</span> Infinity points."
    document.getElementById("infinityPoints2").innerHTML = "You have <span class=\"IPAmount2\">"+shortenDimensions(player.infinityPoints)+"</span> Infinity points."

    if(player.achievements.includes("ng3p25") {	sacrificeGalaxy(4) }
	
    if (document.getElementById("loadmenu").style.display == "block") changeSaveDesc(metaSave.current, savePlacement)

    player.lastUpdate = thisUpdate;
}

function simulateTime(seconds, real) {

    //the game is simulated at a 50ms update rate, with a max of 1000 ticks
    //warning: do not call this function with real unless you know what you're doing
    var ticks = seconds * 20;
    var bonusDiff = 0;
    var playerStart = Object.assign({}, player);
    if (ticks > 1000 && !real) {
        bonusDiff = (ticks - 1000) / 20;
        ticks = 1000;
    }
    let ticksDone = 0
    for (ticksDone=0; ticksDone<ticks; ticksDone++) {
        gameLoop(50+bonusDiff)
        autoBuyerTick();
        if (real) console.log(ticksDone)
    }
    closeToolTip()
    document.getElementById("offlineprogress").style.display = "block"
    var popupString = "While you were away"
    if (player.money.gt(playerStart.money)) popupString+= ",<br> your antimatter increased "+shortenMoney(player.money.log10() - (playerStart.money).log10())+" orders of magnitude"
    if (player.infinityPower.gt(playerStart.infinityPower)) popupString+= ",<br> infinity power increased "+shortenMoney(player.infinityPower.log10() - (Decimal.max(playerStart.infinityPower, 1)).log10())+" orders of magnitude"
    if (player.timeShards.gt(playerStart.timeShards)) popupString+= ",<br> time shards increased "+shortenMoney(player.timeShards.log10() - (Decimal.max(playerStart.timeShards, 1)).log10())+" orders of magnitude"
    if (player.meta) if (player.meta.antimatter.gt(playerStart.meta.antimatter)) popupString+= ",<br> meta-antimatter increased "+shortenMoney(player.meta.antimatter.log10() - (Decimal.max(playerStart.meta.antimatter, 1)).log10())+" orders of magnitude"
    if (player.infinitied > playerStart.infinitied || player.eternities > playerStart.eternities) popupString+= ","
    else popupString+= "."
    if (player.infinitied > playerStart.infinitied) popupString+= "<br>you infinitied "+(player.infinitied-playerStart.infinitied)+" times."
    if (player.eternities > playerStart.eternities) popupString+= " <br>you eternitied "+(player.eternities-playerStart.eternities)+" times."
    if (popupString.length == 20) {
        popupString = popupString.slice(0, -1);
        popupString+= "... Nothing happened."
        giveAchievement("While you were away... Nothing happened.")
    }

    document.getElementById("offlinePopup").innerHTML = popupString
}

function startInterval() {
	gameLoopIntervalId = setInterval(gameLoop, player.options.updateRate);
}

function enableChart() {
    if (document.getElementById("chartOnOff").checked) {
        player.options.chart.on = true;
        if (player.options.chart.warning < 1) alert("Warning: the chart can cause performance issues. Please disable it if you're experiencing lag.")
    } else {
        player.options.chart.on = false;
    }
}

function enableChartDips() {
    if (document.getElementById("chartDipsOnOff").checked) {
        player.options.chart.dips = true;
    } else {
        player.options.chart.dips = false;
    }
}

function updateChart(first) {
    if (first !== true && (player.infinitied >= 1 || player.eternities >= 1) && player.options.chart.on === true) {
        if (player.currentChallenge == "challenge3" || player.currentChallenge == "postc1") {
            addData(normalDimChart, "0", getDimensionProductionPerSecond(1).times(player.chall3Pow));
        } else {
            addData(normalDimChart, "0", getDimensionProductionPerSecond(1));
        }
    }
    if (player.options.chart.updateRate) {
        setTimeout(updateChart, player.options.chart.updateRate);
    } else {
        setTimeout(updateChart, 1000);
    }
}
updateChart(true);

var slider = document.getElementById("updaterateslider");
var sliderText = document.getElementById("updaterate");

slider.oninput = function() {
    player.options.updateRate = parseInt(this.value);
    sliderText.textContent = "Update rate: " + this.value + "ms"
    if (player.options.updateRate === 200) giveAchievement("You should download some more RAM")
    clearInterval(gameLoopIntervalId)
    startInterval()
}

function dimBoolean() {
    var name = TIER_NAMES[getShiftRequirement(0).tier]
    if (!player.autobuyers[9].isOn) return false
    if (player.autobuyers[9].ticks*100 < player.autobuyers[9].interval) return false
    if (player[name + "Bought"] < getShiftRequirement(0).amount) return false
    if (player.eternities < 10 && player[name + "Bought"] < getShiftRequirement(player.autobuyers[9].bulk-1).amount) return false
    if (player.overXGalaxies <= player.galaxies) return true
    if ((player.currentChallenge =="challenge4" || player.currentChallenge == "postc1") && player.autobuyers[9].priority < getShiftRequirement(0).amount && getShiftRequirement(0).tier == 6) return false
    if (player.autobuyers[9].priority < getShiftRequirement(0).amount && getShiftRequirement(0).tier == 8) return false
    return true
}


function maxBuyGalaxies(manual) {
	if (player.currentEternityChall == "eterc6" || player.currentChallenge == "challenge11" || player.currentChallenge == "postc1" || player.currentChallenge == "postc7" || inQC(6)) return
	if (player.autobuyers[10].priority > player.galaxies || manual) {
		let increment=0.5
		let toSkip=0
		var check=0
		while (player.eightBought >= getGalaxyRequirement(increment*2) && (player.autobuyers[10].priority > player.galaxies + increment*2 || manual)) increment*=2
		while (increment>=1) {
			check=toSkip+increment
			if (player.eightBought >= getGalaxyRequirement(check) && (player.autobuyers[10].priority > player.galaxies + check || manual)) toSkip+=increment
			increment/=2
		}
		player.galaxies+=toSkip
		player.spreadingCancer+=toSkip+1
		galaxyReset()
	}
}

var timer = 0
function autoBuyerTick() {

    if (player.masterystudies) if (speedrunMilestonesReached>22&&player.quantum.autobuyer.enabled) if (quarkGain().gte(Decimal.round(player.quantum.autobuyer.limit))) quantum(true, false, 0)

    if (player.eternities >= 100 && player.eternityBuyer.isOn) {
        if (player.autoEterMode === undefined || player.autoEterMode == "amount") {
            if (gainedEternityPoints().gte(player.eternityBuyer.limit)) eternity(false, true)
        } else if (player.autoEterMode == "time") {
            if (player.thisEternity / 10 >= new Decimal(player.eternityBuyer.limit).toNumber()) eternity(false, true)
        } else if (player.autoEterMode == "relative") {
            if (gainedEternityPoints().gte(player.lastTenEternities[0][1].times(player.eternityBuyer.limit))) eternity(false, true)
        } else if (player.autoEterMode == "relativebest") {
            if (gainedEternityPoints().gte(bestEp.times(player.eternityBuyer.limit))) eternity(false, true)
        } else if (player.autoEterMode == "replicanti") {
            if (player.replicanti.amount.gte(player.eternityBuyer.limit)) eternity(false, true)
        } else if (player.peakSpent >= new Decimal(player.eternityBuyer.limit).toNumber()*10 && EPminpeak.gt(0)) eternity(false, true)
    }

    if (player.autobuyers[11]%1 !== 0) {
    if (player.autobuyers[11].ticks*100 >= player.autobuyers[11].interval && player.money.gte(Number.MAX_VALUE)) {
        if (player.autobuyers[11].isOn) {
            if ((!player.autobuyers[11].requireIPPeak || IPminpeak.gt(gainedInfinityPoints().div(player.thisInfinityTime/600))) && player.autobuyers[11].priority) {
                if (player.autoCrunchMode == "amount") {
                    if (!player.break || player.currentChallenge != "" || gainedInfinityPoints().gte(player.autobuyers[11].priority)) {
                        autoS = false;
                        document.getElementById("bigcrunch").click()
                    }
                } else if (player.autoCrunchMode == "time"){
                    if (!player.break || player.currentChallenge != "" || player.thisInfinityTime / 10 >= new Decimal(player.autobuyers[11].priority).toNumber()) {
                        autoS = false;
                        document.getElementById("bigcrunch").click()
                    }
                } else if (player.autoCrunchMode == "replicanti"){
                    if (!player.break || player.currentChallenge != "" || (player.replicanti.galaxies >= (player.autobuyers[11].priority.toString().toLowerCase()=="max"?player.replicanti.gals:Math.round(new Decimal(player.autobuyers[11].priority).toNumber())) && (!player.autobuyers[11].requireMaxReplicanti || player.replicanti.amount.gte(getReplicantiLimit())))) {
                        autoS = false;
                        document.getElementById("bigcrunch").click()
                    }
                } else {
                    if (!player.break || player.currentChallenge != "" || gainedInfinityPoints().gte(player.lastTenRuns[0][1].times(player.autobuyers[11].priority))) {
                        autoS = false;
                       document.getElementById("bigcrunch").click()
                   }
                }
            }
            player.autobuyers[11].ticks = 1;
        }
    } else player.autobuyers[11].ticks += 1;

    }


    if (player.galacticSacrifice) if (player.autobuyers[12]%1 !== 0) {
        if (getGSAmount().gte(player.autobuyers[12].priority) && player.autobuyers[12].isOn) {
            galacticSacrifice(true);
        }
    }

    if (player.autobuyers[10]%1 !== 0) {
        if (player.autobuyers[10].ticks*100 >= player.autobuyers[10].interval && (player.currentChallenge == "challenge4" ? player.sixthBought >= getGalaxyRequirement() : player.eightBought >= getGalaxyRequirement())) {
            if (player.eternities < 9 || player.autobuyers[10].bulk == 0) {
                if (player.autobuyers[10].isOn && player.autobuyers[10].priority > player.galaxies) {
                    autoS = false;
                    document.getElementById("secondSoftReset").click()
                    player.autobuyers[10].ticks = 1;
                }
            } else if (player.autobuyers[10].isOn && (Math.round(timer * 100))%(Math.round(player.autobuyers[10].bulk * 100)) == 0){
                maxBuyGalaxies()
            }
        } else player.autobuyers[10].ticks += 1;
    }


    if (player.autobuyers[9]%1 !== 0) {
        if (player.autobuyers[9].isOn && dimBoolean()) {
            if (player.resets < 4) softReset(1)
            else if (player.eternities < 10) softReset(player.autobuyers[9].bulk)
            else if ((Math.round(timer * 100))%(Math.round(player.autobuyers[9].bulk * 100)) == 0 && player.eightBought >= getShiftRequirement(0).amount) maxBuyDimBoosts()
            player.autobuyers[9].ticks = 0
        }
        player.autobuyers[9].ticks += 1;
    }

    if (player.autoSacrifice%1 !== 0) {
        if (calcSacrificeBoost().gte(player.autoSacrifice.priority) && player.autoSacrifice.isOn) {
            sacrifice(true)
        }
    }




    for (var i=0; i<priority.length; i++) {
        if (priority[i].ticks*100 >= priority[i].interval || priority[i].interval == 100) {
            if ((priority[i].isOn && canBuyDimension(priority[i].tier)) ) {
                if (priority[i] == player.autobuyers[8] ) {
                    if (player.currentChallenge !== "challenge14") {
                        if (priority[i].target == 10) buyMaxTickSpeed()
                        else buyTickSpeed()
                    }
                } else {
                    if (priority[i].target > 10) {

                        if (player.options.bulkOn) buyManyDimensionAutobuyer(priority[i].target-10, priority[i].bulk)
                        else buyManyDimensionAutobuyer(priority[i].target-10, 1)
                    }
                    else {
                        buyOneDimension(priority[i].target)
                    }
                }
                priority[i].ticks = 0;
            }
        } else priority[i].ticks += 1;
    }
    updateCosts()

}


setInterval(function() {
    timer += 0.05
    if (!player.infinityUpgrades.includes("autoBuyerUpgrade")) autoBuyerTick()
}, 100)

setInterval(function() {
    if (player.infinityUpgrades.includes("autoBuyerUpgrade")) autoBuyerTick()
}, 50)

document.getElementById("challenge2").onclick = function () {
  startChallenge("challenge2", Number.MAX_VALUE)
}

document.getElementById("challenge3").onclick = function () {
  startChallenge("challenge3", Number.MAX_VALUE)
}

document.getElementById("challenge4").onclick = function () {
  startChallenge("challenge4", Number.MAX_VALUE)
}

document.getElementById("challenge5").onclick = function () {
  startChallenge("challenge5", Number.MAX_VALUE);
}

document.getElementById("challenge6").onclick = function () {
  startChallenge("challenge6", Number.MAX_VALUE);
}

document.getElementById("challenge7").onclick = function () {
  startChallenge("challenge7", Number.MAX_VALUE);
}

document.getElementById("challenge8").onclick = function () {
  startChallenge("challenge8", Number.MAX_VALUE);
}

document.getElementById("challenge9").onclick = function () {
  startChallenge("challenge9", Number.MAX_VALUE);
}

document.getElementById("challenge10").onclick = function () {
  startChallenge("challenge10", Number.MAX_VALUE);
}

document.getElementById("challenge11").onclick = function () {
    startChallenge("challenge11", Number.MAX_VALUE);
  }

document.getElementById("challenge12").onclick = function () {
  startChallenge("challenge12", Number.MAX_VALUE);
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
    if (document.getElementById("dimensions").style.display !== "none" && player.aarexModifications.progressBar && (tabName === 'antimatterdimensions' || tabName === 'metadimensions')) document.getElementById("progress").style.display = "block"
    else document.getElementById("progress").style.display = "none"
}

function toggleProgressBar() {
	player.aarexModifications.progressBar=!player.aarexModifications.progressBar
	document.getElementById("progressBarBtn").textContent = (player.aarexModifications.progressBar?"Hide":"Show")+" progress bar"	
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
}

function showEternityTab(tabName, init) {
    if (tabName=="timestudies"&&player.boughtDims) tabName="ers_"+tabName
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
    if ((tabName === 'timestudies' || tabName === 'ers_timestudies' || tabName === 'masterystudies') && !init) document.getElementById("TTbuttons").style.display = "block"
    else document.getElementById("TTbuttons").style.display = "none"
    if (tabName != oldTab) {
        if (tabName === 'timestudies' || tabName === 'masterystudies' || tabName === 'dilation') resizeCanvas()
        if (tabName === "dilation") requestAnimationFrame(drawAnimations)
    }
	closeToolTip()
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
    closeToolTip()
}

function closeToolTip() {
    var elements = document.getElementsByClassName("popup")
    for (var i=0; i<elements.length; i++) if (elements[i].id!='welcome') elements[i].style.display = "none"
}

setInterval(function () {
    save_game()
}, 30000);


function initGame() {
    //setup the onclick callbacks for the buttons
    document.getElementById('dimensionsbtn').onclick = function () {
        showTab('dimensions');
    };
    document.getElementById('optionsbtn').onclick = function () {
        showTab('options');
    };
    document.getElementById('statisticsbtn').onclick = function () {
        showTab('statistics');
    };
    document.getElementById('achievementsbtn').onclick = function () {
        showTab('achievements');
    };
    document.getElementById('challengesbtn').onclick=function () {
      showTab('challenges');
    };
    document.getElementById('infinitybtn').onclick = function () {
        showTab('infinity');
    };
    document.getElementById("eternitystorebtn").onclick = function () {
        showTab('eternitystore')
    }
    //show one tab during init or they'll all start hidden
    showTab('dimensions')
    showInfTab('preinf')
    showStatsTab('stats')
    showDimTab('antimatterdimensions')
    showChallengesTab('challenges')
    showEternityTab('timestudies', true)
    showQuantumTab('uquarks')
    setupText()
    initiateMetaSave()
    migrateOldSaves()
    localStorage.setItem('AD_aarexModifications', btoa(JSON.stringify(metaSave)))
    load_game();
    if (player.aarexModifications.progressBar) document.getElementById("progress").style.display = "block"
    else document.getElementById("progress").style.display = "none"
    updateTickSpeed();
    updateAutobuyers();
    updateChallengeTimes()
    clearInterval(stuckTimeout)
    setTimeout(function(){
        document.getElementById("container").style.display = "block"
        document.getElementById("loading").style.display = "none"
    },1000)
}

window.addEventListener('keydown', function(event) {
    if (keySequence == 0 && event.keyCode == 38) {
        keySequence++
    } else if (keySequence == 1 && event.keyCode == 38) {
        keySequence++
    } else if (keySequence == 2 && event.keyCode == 40) {
        keySequence++
    } else if (keySequence == 3 && event.keyCode == 40) {
        keySequence++
    } else if (keySequence == 4 && event.keyCode == 37) {
        keySequence++
    } else if (keySequence == 5 && event.keyCode == 39) {
        keySequence++
    } else if (keySequence == 6 && event.keyCode == 37) {
        keySequence++
    } else if (keySequence == 7 && event.keyCode == 39) {
        keySequence++
    } else if (keySequence == 8 && event.keyCode == 66) {
        keySequence++
    } else if (keySequence == 9 && event.keyCode == 65) {
        giveAchievement("30 Lives")
    } else {
        keySequence = 0;
    }
    if (event.keyCode == 17) controlDown = true;
    if (event.keyCode == 16) {
        shiftDown = true;
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
    if (!player.options.hotkeys || controlDown === true || document.activeElement.type === "text" || onImport) return false
    const tmp = event.keyCode;
    if (tmp >= 49 && tmp <= 56) {
        if (shiftDown) buyOneDimension(tmp-48)
        else buyManyDimension(tmp-48)
        return false;
    } else if (tmp >= 97 && tmp <= 104) {
        if (shiftDown) buyOneDimension(tmp-96)
        else buyManyDimension(tmp-96)
        return false;
    }
    switch (event.keyCode) {
        case 65: // A
            toggleAutoBuyers();
        break;

        case 68: // D
            document.getElementById("softReset").onclick()
        break;

        case 71: // G
            document.getElementById("secondSoftReset").onclick()
        break;

        case 77: // M
            document.getElementById("maxall").onclick()
        break;

        case 83: // S
            document.getElementById("sacrifice").onclick()
        break;

        case 84: // T
            if (shiftDown) buyTickSpeed()
            else buyMaxTickSpeed()
        break;

        case 82: //R
            replicantiGalaxy()
        break;
    }
  }, false);

  window.addEventListener('keyup', function(event) {
    if (event.keyCode === 70) {
        $.notify("Paying respects", "info")
        giveAchievement("It pays to have respect")
    }
    if (!player.options.hotkeys || controlDown === true || document.activeElement.type === "text") return false
    switch (event.keyCode) {
        case 67: // C
            document.getElementById("bigcrunch").onclick()
        break;

        case 69: // E, also, nice.
        document.getElementById("eternitybtn").onclick();
        break;
	
        case 81: // Q, for quantum.
        if (player.meta) quantum(false,false,0)
        break;
    }
  }, false);


function getUnspentBonus() {
	x = player.infinityPoints
	if (player.galacticSacrifice) return x.pow(Math.max(Math.min(Math.pow(x.max(1).log(10), 1 / 3) * 3, 8), 1)).plus(1);
	else return x.dividedBy(2).pow(1.5).plus(1)
}

var totalMult = 1
var currentMult = 1
var infinitiedMult = 1
var achievementMult = 1
var challengeMult = 1
var unspentBonus = 1
var mult18 = 1
var ec10bonus = new Decimal(1)
var QC4Reward
function updatePowers() {
    totalMult = Math.pow(player.totalmoney.e+1, player.galacticSacrifice?2:0.5)
    currentMult = Math.pow(player.money.e+1, player.galacticSacrifice?2:0.5)
    infinitiedMult = getInfinitiedMult()
    achievementMult = Math.max(Math.pow((player.achievements.length-(player.galacticSacrifice?10:30)-getSecretAchAmount()), player.galacticSacrifice?5:3)/40,1)
    challengeMult = Decimal.pow(worstChallengeBonus, player.galacticSacrifice?2:1)
    unspentBonus = getUnspentBonus()
    mult18 = getDimensionFinalMultiplier(1).times(getDimensionFinalMultiplier(8)).pow(0.02)
    if (player.currentEternityChall == "eterc10") {
        ec10bonus = Decimal.pow(getInfinitied(), 1000).max(1)
        if (player.timestudy.studies.includes(31)) ec10bonus = ec10bonus.pow(4)
    } else {
        ec10bonus = new Decimal(1)
    }
}
setInterval(updatePowers, 100)

function switchDecimalMode() {
	if (confirm('This option switch the Decimal library to '+(player.aarexModifications.breakInfinity?'logarithmica_numerus_lite':'break_infinity.min')+'.js. Are you sure you want to do that?')) {
		player.aarexModifications.breakInfinity = !player.aarexModifications.breakInfinity
		save_game(true)
		document.location.reload(true)
	}
}
