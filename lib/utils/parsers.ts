export function storageToClass(s:number) {
	const c = new ClassObject(s)
	return c;
}

interface Data {
    primary_weapon: number;
    secondary_weapon: number;
    character: number;
    hat: number;
    perk: number;
}

export class ClassObject {
    
    private data: Data 

    constructor(s: number) {
        this.data = {
			primary_weapon: (s >> 24) & 255,
			secondary_weapon: (s >> 16) & 255,
			character: (s >> 8) & 255,
			hat: s & 255,
			perk: s & 15
		}

    }

    public get primaryWeapon() {
        return weaponNames[this.data.primary_weapon];
    }

    public get secondaryWeapon() {
        return weaponNames[this.data.secondary_weapon];
    }

    public get character() {
        return characterNames[this.data.character];
    }

    public get hat() {
        return getHatModel(this.data.hat) ?? "Unknown";
    }

    public get perk() {
        return perkNames[this.data.perk];
    }

    public toString() {
        return `${this.primaryWeapon}, ${this.secondaryWeapon}, ${this.character}, ${this.hat}, ${this.perk}`;
    }
}

const weaponNames: string[] = [];

weaponNames.push("Grease Gun");
weaponNames[1] = "M1 Carbine";
weaponNames[2] = "M1 Garand";
weaponNames[3] = "Springfield Sniper";
weaponNames[4] = "Thompson";
weaponNames[5] = "BAR";
weaponNames[6] = "Sten";
weaponNames[7] = "Lee Enfield";
weaponNames[8] = "Lee Enfield Sniper";
weaponNames[9] = "BREN";
weaponNames[10] = "PPS42";
weaponNames[11] = "Mosin Nagant";
weaponNames[12] = "SVT40";
weaponNames[13] = "Mosin Nagant Sniper";
weaponNames[14] = "PPSH";
weaponNames[15] = "MP 40";
weaponNames[16] = "Kar 98k";
weaponNames[17] = "Gewehr 43";
weaponNames[18] = "Kar 98k Sniper";
weaponNames[19] = "MP 44";
weaponNames[20] = "Trench Gun";
weaponNames[21] = "frag grenade";
weaponNames[22] = "smoke grenade";
weaponNames[23] = "Colt 45";
weaponNames[24] = "Nambu";
weaponNames[25] = "Luger";
weaponNames[26] = "Walther P38";
weaponNames[27] = "TT 30";
weaponNames[28] = "Webley Revolver";
weaponNames[29] = "Springfield";
weaponNames[30] = "SVT 40 Scoped";
weaponNames[31] = "M1 Carbine Scoped";
weaponNames[32] = "Gewehr 43 Scoped";
weaponNames[33] = "M1 Garand Scoped";
weaponNames[34] = "MP 44 Scoped";
weaponNames[35] = "Chainsaw";
weaponNames[36] = "Magnum .375";
weaponNames[37] = "Browning 30cal";
weaponNames[38] = "Flamethrower";
weaponNames[39] = "Remington 870";
weaponNames[40] = "Double-barreled Shotgun";
weaponNames[41] = "Zombie knife";
weaponNames[42] = "AK-47";
weaponNames[43] = "AVT 40";
weaponNames[44] = "De Lisle";
weaponNames[48] = "MAB 38";
weaponNames[46] = "FG42";
weaponNames[47] = "Tommy Gun";
weaponNames[49] = "PTRS 41";
weaponNames[45] = "DP 28";

const characterNames: string[] = [];

characterNames[0] = "Default";
characterNames[1] = "Captain McGregor";
characterNames[2] = "Commissar Letlev";
characterNames[3] = "Captain Price";
characterNames[4] = "Danny";
characterNames[5] = "Special";
characterNames[6] = "Duke";

const perkNames: string[] = [];
	
perkNames[0] = "No perk";
perkNames[1] = "Recon";
perkNames[2] = "Knockback";
perkNames[3] = "Elite Hitman";
perkNames[4] = "Hardline";
perkNames[5] = "Resilience";
perkNames[6] = "Scavenger";
perkNames[7] = "Ghost";
perkNames[8] = "Overkill";
perkNames[9] = "Zooka";

const getHatModel = (n: number) => {
	switch(n) {
		case 0:
		return "No hat";
		
		case 1:
			const caps: string[] =[];
			caps[caps.length] = "Sidecap Camo";
			caps[caps.length] = "Sidecap Darkgrey";
			caps[caps.length] = "Sidecap Green";
			caps[caps.length] = "Sidecap Khaki";
			caps[caps.length] = "Sidecap Lightgrey";
			return caps[randomInt(caps.length)];
		
		case 2:
			const berets: string[] = [];
			berets[berets.length] = "Blue Beret";
	        berets[berets.length] = "Green Beret";
			berets[berets.length] = "Red Beret";
			return berets[randomInt(berets.length)];
		
		case 3:
			return "American Baseball Cap";
		case 4:
			return "American Boonie";
		case 5:
			return "Winter Bonnet";
		case 6:
			return "American Baseball Cap (dark)";
		case 7:
			return "Russian Winter Bonnet";
		case 8:
			return "Unknown Hat";
		case 9:
			return "Cowboy Hat";
	}
	return undefined;
}


function randomInt(length: number) {
    return Math.floor(Math.random() * length - 1);
}

