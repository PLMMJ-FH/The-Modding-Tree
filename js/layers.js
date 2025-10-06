addLayer("w", {
    name: "waves", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "W", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        best: new Decimal(0),
        total: new Decimal(0),
    }},
    color: "#FFFFFF",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "waves", // Name of prestige currency
    baseResource: "coins", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        if (hasUpgrade('w', 12)) mult = mult.times(upgradeEffect('w', 12))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "w", description: "W: Wave reset", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades: {
        11: {
    title: "Coins / Wave",
    description: "Triple your coin gain.",
    cost: new Decimal(10),
        },
        12: {
    title: "Workshop",
    description: "Coins boost wave generation.",
    cost: new Decimal(15),
    effect() {
        return player.points.add(1).pow(0.15)
    },
    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        13: {
    title: "Coins / Kill Bonus",
    description: "Waves boost coin generation.",
    cost: new Decimal(40),
    effect() {
        return player[this.layer].points.add(1).pow(0.5)
    },
    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
    },
})
addLayer("g", {
    name: "gems", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "G", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        best: new Decimal(0),
        total: new Decimal(0),
    }},
    color: "#FF23ED",
    requires: new Decimal(400), // Can be a function that takes requirement increases into account
    resource: "gems", // Name of prestige currency
    baseResource: "coins", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.75, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        if (hasUpgrade('g', 11)) mult = mult.times(upgradeEffect('g', 11))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "g", description: "G: gem reset", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades: {
        11: {
    title: "Floating Gems",
    description: "Waves boost gem earnings.",
    cost: new Decimal(2),
    effect() {
        return player.w.points.add(1).pow(0.2)
    },
    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
    },
})
addLayer("a", {
    symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
    startData() { return {
        unlocked: true,
    }},
    color: "#FFFF00",
    row: "side", // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},
    tooltip() { // Optional, tooltip displays when the layer is locked
        return ("Achievements")
    },
    achievements: {
        rows: 12,
        cols: 4,
        11: {
            name: "Tier 2",
		    done() { return player.w.points.gte(100) },
		    tooltip: "Reach 100 waves. Reward: Coins gain an extra x1.8 multiplier.",
        },
    },
	tabFormat: [
		"blank", 
		["display-text", function() { return "Achievements: "+player.a.achievements.length+"/"+(Object.keys(tmp.a.achievements).length-2) }], 
		"blank", "blank",
		"achievements",
	],
})