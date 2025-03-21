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
passages = []
var multisquare = {}
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
  constructor(piece, fields, objects) {
    super();
    this.type = piece.type;
    this.field = fields[piece.field] || fields["a1"];
    if (objects[this.type]) {
      this.w = objects[this.type].w
      this.h = objects[this.type].h;
      this.z = objects[this.type].z;
      this.icons = objects[this.type].icons;
      this.xoffset = objects[this.type].xoffset;
      this.yoffset = objects[this.type].yoffset;
      this.kind = objects[this.type].kind;
      if (this.kind == "doorx")
        this.h = this.w = 1;
    }
    let rotations = ["downward", "leftward", "upward", "rightward"];
    this.angle = 90 * rotations.indexOf(piece.rotation);
    this.id = this.type + this.angle + this.field.id;
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
  create(piece, fields, objects) {
    if (piece.category == "dark")
      return new Dark(piece, fields);
    return new Piece(piece, fields, objects);
  }
}
class Board extends UIElement {
  constructor(objects, rooms, passages, pieces, region, name, speech) {
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
    pieces.forEach(p => factory.create(p, this.fields, objects));
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
    new Board(multisquare, rooms, passages, this.map, this.region, this.name, this.speech);
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

class Object2 {
  constructor(o) {
    this.id = o.getAttribute("id");
    this.name = o.getAttribute("name");
    this.kind = o.getAttribute("kind");
    this.w = parseInt(o.getAttribute("width"));
    this.h = parseInt(o.getAttribute("height"));
    this.z = Math.round(parseInt(o.getAttribute("zorder")));
    this.icons = {};
    this.xoffset = {}
    this.yoffset = {}
    for (const i of o.children) {
      this.icons[i.getAttribute("region")] = i.getAttribute("path");
      this.xoffset[i.getAttribute("region")] = parseFloat(i.getAttribute("xoffset"));
      this.yoffset[i.getAttribute("region")] = parseFloat(i.getAttribute("yoffset"));
    }
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
  document.getElementsByClassName("menu")[0].appendChild(input);
  let b = document.createElement("button");
  b.setAttribute("type", "button");
  b.setAttribute("onclick", "clearBoards()");
  b.innerHTML = "Clear";
  document.getElementsByClassName("menu")[0].appendChild(b);
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

async function loadObjects() {
  xml = await fetch("Objects.xml").then(response => response.text());
  let parser = new DOMParser();
  let xmlDoc = parser.parseFromString(xml, "text/xml");
  for (const o of xmlDoc.getElementsByTagName("object")) {
    let o2 = new Object2(o);
    multisquare[o2.id] = o2;
  }
  for (const o of xmlDoc.getElementsByTagName("corridor")) {
    let x = parseInt(o.getAttribute("left")) - 1;
    let y = parseInt(o.getAttribute("top")) - 1;
    let w = parseInt(o.getAttribute("width"));
    let h = parseInt(o.getAttribute("height"));
    passages.push({x: x, y: y, w: w, h: h});
  }
}


function addLink(abbrev, region, name, index) {
  let div = document.createElement("div");
  let link = document.createElement("a");
  link.innerHTML = name;
  href = ".?c=" + abbrev + "&r=" + region
  if (index != undefined) {
    href += "&m=" + index
    addClass(div, "map");
  }
  link.setAttribute("href", href);
  div.appendChild(link);
  parent = document.getElementById("campaigns" + region)
  parent = parent || document.getElementsByTagName("body")[0];
  parent.appendChild(div);   
}

function addLinks(campaign2) {
  for (const [region, c] of Object.entries(campaigns)) {
    for (const [abbrev, c2] of Object.entries(c).filter(([abbrev, c2]) => !campaign2 || c2 == campaign2)) {
      addLink(abbrev, region, c2.name + " " + region);
      for (const [i, m] of c2.quests.entries())
          addLink(abbrev, region, m, i);
    }
  }
}

async function init() { 
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
  await loadObjects();
  loadCampaign(c, params.r, params.m);
}
