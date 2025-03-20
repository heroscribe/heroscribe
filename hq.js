function addCard(parent, content, type) {
  console.log(content["image"])
  let card = document.createElement("div");
  card.className = "card " + content["type"]
  parent.appendChild(card)
  let title = document.createElement("div");
  title.innerHTML = content["title"];
  title.className = "title";
  card.appendChild(title);
  let img = document.createElement("div");
  card.appendChild(img);
  img.className = "image";
  img.style = "background-image: url('" + content["image"] + ".png');"
  let text = document.createElement("div");
  text.innerHTML = content["text"];
  text.className = "text";
  card.appendChild(text);
}


rooms = [
  {x: 1, y: 1, w: 4, h: 3},
  {x: 1, y: 4, w: 4, h: 5},
  {x: 5, y: 1, w: 4, h: 3},
  {x: 5, y: 4, w: 4, h: 5},
  {x: 9, y: 1, w: 3, h: 5},
  {x: 1, y: 10, w: 4, h: 4},
  {x: 1, y: 14, w: 4, h: 4},
  {x: 5, y: 10, w: 2, h: 3},
  {x: 7, y: 10, w: 2, h: 3},
  {x: 5, y: 13, w: 4, h: 5},
  {x: 9, y: 13, w: 3, h: 5},
  {x: 10, y: 7, w: 6, h: 5},
  {x: 14, y: 1, w: 3, h: 5},
  {x: 17, y: 1, w: 4, h: 4},
  {x: 17, y: 5, w: 4, h: 4},
  {x: 21, y: 5, w: 4, h: 4},
  {x: 21, y: 1, w: 4, h: 4},
  {x: 17, y: 10, w: 4, h: 4},
  {x: 18, y: 14, w: 3, h: 4},
  {x: 14, y: 13, w: 4, h: 5},
  {x: 21, y: 10, w: 4, h: 4},
  {x: 21, y: 14, w: 4, h: 4},
];
passages = [
  {x: 0, y: 0, w: 26, h: 1},
  {x: 9, y: 6, w: 8, h: 1},
  {x: 0, y: 9, w: 10, h: 1},
  {x: 9, y: 12, w: 8, h: 1},
  {x: 16, y: 9, w: 10, h: 1},
  {x: 0, y: 18, w: 26, h: 1},
  {x: 0, y: 0, w: 1, h: 19},
  {x: 9, y: 6, w: 1, h: 7},
  {x: 12, y: 0, w: 2, h: 7},
  {x: 12, y: 12, w: 2, h: 7},
  {x: 16, y: 6, w: 1, h: 7},
  {x: 25, y: 0, w: 1, h: 19},
]
monsters = [
  "Goblin", "Orc", "Fimir", "Skeleton", "Zombie", "Mummy", "ChaosWarrior", "Gargoyle",
]
multisquare = {
  "SingleBlockedSquare": {w: 1, h: 1},
  "DoubleBlockedSquare": {w: 2, h: 1},
  "TreasureChest": {w: 1, h: 1},
  "Throne": {w: 1, h: 1},
  "Table": {w: 3, h: 2},
  "Rack": {w: 2, h: 3},
  "AlchemistsBench": {w: 3, h: 2},
  "SorcerersTable": {w: 3, h: 2},
  "Tomb": {w: 2, h: 3},
  "WeaponsRack": {w: 3, h: 1},
  "Fireplace": {w: 3, h: 1},
  "Bookcase": {w: 3, h: 1},
  "Cupboard": {w: 3, h: 1},
  "Stairway": {w: 2, h: 2},
//KK
  "CliffCorridor": {w: 8, h: 1},
  "DwarvenForge": {w: 3, h: 1},
  "CloudOfChaos": {w: 3, h: 4},
  "LongStairway": {w: 1, h: 5},
  "ShortStairway": {w: 1, h: 3},
//RotWL
  "RevolvingRoom": {w: 4, h: 4},
  "Coffin": {w: 1, h: 2},
  "ThroneRoom": {w: 5, h: 6},

//AtOH
  "PitRoom": {w: 4, h: 5},
  "BattleRoom": {w: 4, h: 5},
  "CarpetRoom": {w: 4, h: 4},
  "SunEyeRoom": {w: 4, h: 4},
  "ChaosRoom": {w: 8, h: 7},
  "Surface": {w: 8, h: 5},
//FH
  "BottomlessChasm": {w: 4, h: 4},
  "CageRoom": {w: 4, h: 4},
  "FrozenCryptRoom": {w: 3, h: 5},
  "FrozenHorror": {w: 2, h: 1},
  "IceGremlinTreasureRoom": {w: 3, h: 4},
  "IceCaveEntrance": {w: 6, h: 5},
  "IceLedge": {w: 3, h: 5},
  "IceSlide": {w: 1, h: 8},
  "IceVault2x3": {w: 2, h: 3},
  "IceVault3x4": {w: 3, h: 4},
  "IcyRiver1x3": {w: 1, h: 3},
  "IcyRiver1x8": {w: 1, h: 8},
  "LivingFogRoom": {w: 4, h: 4},
  "ScepterRoom": {w: 4, h: 4},
  "SeatOfPower": {w: 5, h: 6},
  "SlipperyIce2x1": {w: 2, h: 1},
  "SlipperyIce2x3": {w: 2, h: 3},
  "SlipperyIce3x1": {w: 3, h: 1},
//MotM
  "GiantWolf": {w: 2, h: 1},
  "InnerSanctum": {w: 5, h: 6},
  "Quicksand": {w: 5, h: 6},
  "LongPitTrap": {w: 2, h: 1},
}
gs_us = [
  "01-TheTrial", "02-TheRescueofSirRagnar", "03-LairoftheOrcWarlord",
  "04-PrinceMagnusGold", "05-MelarsMaze", "06-LegacyoftheOrcWarlord", "07-TheLostWizard",
  "08-TheFireMage", "09-RaceAgainstTime", "10-CastleofMystery", "11-BastionofChaos",
  "12-BarakTor-BarrowoftheWitchLord", "13-QuestfortheSpiritBlade", "14-ReturntoBarakTor",
];
gs_eu = [
  "00-TheMaze", "01-TheTrial", "02-TheRescueofSirRagnar", "03-LairoftheOrcWarlord",
  "04-PrinceMagnusGold", "05-MelarsMaze", "06-LegacyoftheOrcWarlord", "07-TheStoneHunter",
  "08-TheFireMage", "09-RaceAgainstTime", "10-CastleofMystery", "11-BastionofChaos",
  "12-BarakTor-BarrowoftheWitchLord", "13-QuestfortheSpiritBlade", "14-ReturntoBarakTor",
];
kk = [
  "01-TheGreatGate", "02-TheWarriorHalls", "03-TheSpiralPassage", "04-TheDwarvenForge",
  "05-HallofDwarvenKings", "06-TheGreatCitadel", "07-TheEasternPassage", "08-BelornsMine",
  "09-TheEastGate", "10-GrinsCrag",
]
rotwl = [
  "01-TheGateofDoom", "02-TheColdHalls", "03-TheSilentPassages", "04-HallsofVision",
  "05-TheGateofBellthor", "06-HallsoftheDead", "07-TheForgottenLegion",
  "08-TheForbiddenCity", "09-TheLastGate", "10-TheCourtoftheWitchLord",
]
atoh = [
   "01-SearchfortheOgreFortress", "02-TheOuterCaves", "03-LairoftheOgreHorde",
   "04-TheCarrionHalls", "05-ThePitofChaos", "06-FortressoftheOgreLord",
   "07-FighttotheSurface",
]
wom = [
  "01-TheToweroftheHighMage", "02-CryptoftheNecromancer", "03-EyrieoftheStormMaster",
  "04-LairoftheOrcShaman", "05-TheFinalConflict",
]
dc = [""]
fh = [
  "01-XanonPass", "02-TrialbyIce", "03-TheRescue", "04-TheGlacialGate", "05-TheDeadlyDepths",
  "06-TheFrostedPath", "07-TheHallsofKelvinos", "08-TheSearchfortheScepter",
  "09-TheHeartofIcePartI", "10-TheHeartofIcePartII",
]
mm = [
  "01-TheAvengerReturns", "02-OnSacredGround", "03-TerelliasMaze", "04-TheElvenProspector",
  "05-TheAlchemistsLaboratory", "06-TormuksGuests", "07-GlinessFen",
  "08-TheGatheringStorm", "09-HiddenRealmsPartI", "10-HiddenRealmsPartII",
]
sq = [
  "AGrowlofThunder", "RunningtheGauntlet",
]
custom = ["01-ANewBeginning", "02-CozyHome", "03-CarpetsforSale"]

campaigns = {
  "EU": {
    "ADC": {name: "AdventureDesignKit", quests: custom},
    "GS": {name: "HQBase", quests: gs_eu},
    "KK": {name: "KellarsKeep", quests: kk},
    "RotWL": {name: "ReturnOfTheWitchLord", quests: rotwl},
    "AtOH": {name: "AgainstTheOgreHorde", quests: atoh},
    "WoM": {name: "WizardsOfMorcar", quests: wom},
    "DC": {name: "TheDarkCompany", quests: dc},
    "SQ": {name: "SoloQuests", quests: sq},
  },
  "US": {
    "ADC": {name: "AdventureDesignKit", quests: custom},
    "GS": {name: "HQBase", quests: gs_us},
    "KK": {name: "KellarsKeep", quests: kk},
    "RotWL": {name: "ReturnOfTheWitchLord", quests: rotwl},
    "FH": {name: "TheFrozenHorror", quests: fh},
    "MM": {name: "TheMageOfTheMirror", quests: mm},
  },
}

cards = [
    {title: "Gold!", image: "logo", text: "some length text", gold:"25"},
    {title: "Title2", image: "logo", text: "some length text",},
    {title: "Titlexxx", image: "logo", text: "some length text",},
];
var map = [];
ui = new UI();
class Field extends UIElement {
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.id = String.fromCharCode("a".charCodeAt(0) + x) + (y + 1)
  }
} 

class Wall extends UIElement {
  constructor(x, y, w, h) {
    super();
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.id = "wall" + x + y + w + h;
  }
}
class Area {
  constructor(x1, y1, w, h) {
    this.fields = []
    for (let x = x1; x < x1 + w; x++)
      for (let y = y1; y < y1 + h; y++)
        this.fields.push(new Field(x, y));
  }
}
class Room extends Area {
  constructor(x1, y1, w, h) {
    super(x1, y1, w, h);
    new Wall(x1, y1, w, 0);
    new Wall(x1, y1 + h, w, 0);
    new Wall(x1, y1, 0, h);
    new Wall(x1 + w, y1, 0, h);
  }
}
class Passage extends Area {
  constructor(x1, y1, w, h) {
    super(x1, y1, w, h);
  }
}
class Piece extends UIElement {
  constructor(piece, fields) {
    super();
    this.type = piece.type;
    this.field = fields[piece.field] || fields["a1"];
    if (multisquare[this.type]) {
      this.w = multisquare[this.type].w
      this.h = multisquare[this.type].h;
    }
    this.r = piece.rotation;
    this.id = this.type + this.field.id + this.r;
  }
}
class Dark extends UIElement {
  constructor(piece, fields) {
    super();
    this.type = piece.type;
    this.field = fields[piece.field];
    this.id = this.type + this.field.id;
  }
}
class PieceFactory {
  create(piece, fields) {
    if (piece.category == "dark")
      return new Dark(piece, fields);
    return new Piece(piece, fields);
  }
}
class Board extends UIElement {
  constructor(rooms, passages, pieces, region, name, speech) {
    super();
    this.w = 26;
    this.h = 19;
    this.region = region;
    this.name = name;
    this.speech = speech;
    this.id = "board";
    this.areas = [];
    this.fields = {};
    passages.forEach(r => this.areas.push(new Passage(r.x, r.y, r.w, r.h)))
    rooms.forEach(r => this.areas.push(new Room(r.x, r.y, r.w, r.h)))
    this.areas.push(new Area(-1, 0, 1, this.h));
    this.areas.push(new Area(this.w, 0, 1, this.h));
    this.areas.push(new Area(0, -1, this.w, 1));
    this.areas.push(new Area(0, this.h, this.w, 1));
    this.areas.forEach(a => a.fields.forEach(f => this.fields[f.id] = f));
    let factory = new PieceFactory();
    pieces.forEach(p => factory.create(p, this.fields));
  }
}

function fieldId(x, y) {
  return String.fromCharCode("a".charCodeAt(0) + x) + (y + 1)
}
class Map {
  constructor(xml) {
    this.fromXml(xml);
  }
  fromXml(xml) {
    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(xml, "text/xml");
    this.region = xmlDoc.getElementsByTagName("quest")[0].getAttribute("region");
    this.name = xmlDoc.getElementsByTagName("quest")[0].getAttribute("name");
    this.speech = xmlDoc.getElementsByTagName("speech")[0];
    this.speech = this.speech && this.speech.innerHTML;
    Array.prototype.slice.call(xmlDoc.getElementsByTagName("board")).forEach(b => this.addBoard(b));
  }
  addBoard(b) {
    this.map = [];
    let objects = Array.prototype.slice.call(b.getElementsByTagName("object"));
    objects.forEach(o => this.addObject(o, map));
    let dark = Array.prototype.slice.call(b.getElementsByTagName("dark"));
    dark.forEach(o => o.id = "Dark");
    dark.forEach(o => this.addObject(o, map));
    new Board(rooms, passages, this.map, this.region, this.name, this.speech);
  }
  addObject(o) {
    let x = Math.round(parseFloat(o.getAttribute("left")));
    let y = Math.round(parseFloat(o.getAttribute("top")));
    let r = o.getAttribute("rotation") || "downward";
    let field = fieldId(x - 1, y - 1)
    let type = o.id;
    let category = type == "Dark" ? "dark" : "generic";
    this.map.push({type: type, field: field, category: category, rotation: r});
  }
}

function readFile(input) {
  let file = input.files[0];
  Array.prototype.slice.call(input.files).reverse().forEach(f => {
    let reader = new FileReader();
    reader.readAsText(f);
    reader.onload = function() {
      new Map(reader.result);
    };
    reader.onerror = function() {
      console.log(reader.error);
    };
  });
}


async function loadMap(quest, campaign, region) {
  url = campaign + "_" + region + "/" + campaign
  if (quest)
    url += "-" + quest
  url += "_" + region + ".xml";
  await fetch(url).then(response => response.text()).then(str => new Map(str));
}

function clearBoards() {
  boards = Array.prototype.slice.call(document.getElementsByClassName("board"));
  boards.forEach(b => b.remove());
}

function addFileDialog() {
  let input = document.createElement("input");
  input.setAttribute("type", "file");
  input.setAttribute("onchange", "readFile(this)");
  input.setAttribute("multiple", "");
  document.getElementsByTagName("body")[0].appendChild(input);
  let b = document.createElement("button");
  b.setAttribute("type", "button");
  b.setAttribute("onclick", "clearBoards()");
  b.innerHTML = "Clear";
  document.getElementsByTagName("body")[0].appendChild(b);
}

async function loadCampaign(campaign, region, map) {
  if (!campaign)
    return;
  clearBoards();
  map = campaign.quests[map]
  quests = map ? [map] : campaign.quests;
  for (const q of quests)
    await loadMap(q, campaign.name, region)
}


function addLink(abbrev, region, name, index) {
  let div = document.createElement("div");
  let link = document.createElement("a");
  link.innerHTML = name;
  href = "hq.html?c=" + abbrev + "&r=" + region
  if (index != undefined) {
    href += "&m=" + index
    addClass(div, "map");
  }
  link.setAttribute("href", href);
  div.appendChild(link);
  document.getElementsByTagName("body")[0].appendChild(div);   
}

function addLinks(campaign2) {
  for (const [region, c] of Object.entries(campaigns)) {
    for (const [abbrev, c2] of Object.entries(c).filter(([abbrev, c2]) => !campaign2 || c2 == campaign2)) {
      addLink(abbrev, region, c2.name + " " + region);
      for (const [i, m] of c2.quests.entries())
          addLink(abbrev, region, m, i);
      //if (campaign2 && c2.quests.length == 0)
      //  addFileDialog();
    }
  }
}

function init() { 
  let idx = document.URL.indexOf('?');
  let params = new Array();
  if (idx != -1) {
    let pairs = document.URL.substring(idx+1, document.URL.length).split('&');
    for (let i=0; i<pairs.length; i++) {
      nameVal = pairs[i].split('=');
      params[nameVal[0]] = nameVal[1];
    }
  }
  c = campaigns[params.r]
  c = c && c[params.c];
  addFileDialog();
  addLinks(c);
  loadCampaign(c, params.r, params.m);
}
