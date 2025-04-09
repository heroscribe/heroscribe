function* createId(id) { 
  while (++id) 
    yield id; 
}

var id = createId(0);

var definitions2 = {
"rooms": [
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
  {x: 14, y: 13, w: 4, h: 5},
  {x: 17, y: 10, w: 4, h: 4},
  {x: 18, y: 14, w: 3, h: 4},
  {x: 21, y: 10, w: 4, h: 4},
  {x: 21, y: 14, w: 4, h: 4},
],
"passages":  [],
"objects": {},
};

var stats = {
"EU":{
  "Goblin": {a: 3, d: 2, mv: 10, iq: 1},
  "Orc": {a: 3, d: 2, mv: 8, iq: 2},
  "Fimir": {a: 3, d: 3, mv: 6, iq: 3},
  "Skeleton": {a: 2, d: 2, mv: 6, iq: 0},
  "Zombie": {a: 2, d: 3, mv: 4, iq: 0},
  "Mummy": {a: 3, d: 4, mv: 4, iq: 0},
  "ChaosWarrior": {a: 3, d: 4, mv: 6, iq: 3},
  "Gargoyle": {a: 4, d: 4, mv: 6, iq: 4},
  "OgreWarrior": {a: 5, d: 5, mv: 6, iq: 1, hp: "variable"},
  "OgreChampion": {a: 5, d: 5, mv: 6, iq: 1, hp: "variable"},
  "OgreChieftain": {a: 6, d: 6, mv: 4, iq: 2, hp: "variable"},
  "OgreLord": {a: 6, d: 6, mv: 4, iq: 5, hp: "variable"},
  "ElvenWarrior": {mv: 6, a: 4, d: 3, hp: 3, iq: 2},
  "ElvenArcher": {mv: 6, a: "4(1)", d: 2, hp: 3, iq: 2, special: "Elven Archers roll 4 combat dice when attacking non-adjacent targets in their line of sight. They roll only 1 combat die attacking adjacent targets."},
  "GiantWolf": {mv: 9, a: 6, d: 3, hp: 5, iq: 1},
  "Ogre": {mv: 4, a: 6, d: 4, hp: 10, iq: 2},
  "IceGremlin": {mv: 10, a: 2, d: 3, hp: 3, iq: 3, special: "Special Ability: Steal items"},
  "Yeti": {mv: 8, a: 3, d: 3, hp: 5, iq: 2, special: "Special Ability: Hug attack"},
  "PolarWarbear": {mv: 6, a: "4/4", d: 3, hp: 6, iq: 2, special: "Special Ability: Two attacks"},
  "FrozenHorror": {mv: 8, a: 5, d: 4, hp: 6, iq: 4, special: "Special Ability: Spellcaster"},
  "Halberdier": {mv: 6, a: 3, d: 3, iq: 2, cost: 75, special: "Special Ability: Can make diagonal attacks"},
  "Swordsman": {mv: 5, a: 4, d: 5, iq: 2, cost: 100},
  "Scout": {mv: 9, a: 2, d: 3, iq: 2, cost: 50},
  "Crossbowman": {mv: 6, a: 3, d: 3, iq: 2, cost: 75, special: "Special Ability: Wields a crossbow"},
},
"US": {
  "Goblin": {a: 3, d: 2, mv: 10, iq: 1},
  "Orc": {a: 3, d: 2, mv: 8, iq: 2},
  "Fimir": {a: 3, d: 3, mv: 6, iq: 3, hp: 2},
  "Skeleton": {a: 2, d: 2, mv: 6, iq: 0},
  "Zombie": {a: 2, d: 3, mv: 5, iq: 0},
  "Mummy": {a: 3, d: 4, mv: 4, iq: 0, hp: 2},
  "ChaosWarrior": {a: 3, d: 4, mv: 7, iq: 3, hp: 3},
  "Gargoyle": {a: 4, d: 5, mv: 6, iq: 4, hp: 3},
  "OgreWarrior": {a: 5, d: 5, mv: 6, iq: 1, hp: "variable"},
  "OgreChampion": {a: 5, d: 5, mv: 6, iq: 1, hp: "variable"},
  "OgreChieftain": {a: 6, d: 6, mv: 4, iq: 2, hp: "variable"},
  "OgreLord": {a: 6, d: 6, mv: 4, iq: 5, hp: "variable"},
  "ElvenWarrior": {mv: 6, a: 4, d: 3, hp: 3, iq: 2},
  "ElvenArcher": {mv: 6, a: "4(1)", d: 2, hp: 3, iq: 2, special: "Elven Archers roll 4 combat dice when attacking non-adjacent targets in their line of sight. They roll only 1 combat die attacking adjacent targets."},
  "GiantWolf": {mv: 9, a: 6, d: 3, hp: 5, iq: 1},
  "Ogre": {mv: 4, a: 6, d: 4, hp: 10, iq: 2},
  "IceGremlin": {mv: 10, a: 2, d: 3, hp: 3, iq: 3, special: "Special Ability: Steal items"},
  "Yeti": {mv: 8, a: 3, d: 3, hp: 5, iq: 2, special: "Special Ability: Hug attack"},
  "PolarWarbear": {mv: 6, a: "4/4", d: 3, hp: 6, iq: 2, special: "Special Ability: Two attacks"},
  "FrozenHorror": {mv: 8, a: 5, d: 4, hp: 6, iq: 4, special: "Special Ability: Spellcaster"},
  "Halberdier": {mv: 6, a: 3, d: 3, hp: 2, iq: 2, cost: 75, special: "Special Ability: Can make diagonal attacks"},
  "Swordsman": {mv: 5, a: 4, d: 5, hp: 2, iq: 2, cost: 100},
  "Scout": {mv: 9, a: 2, d: 3, hp: 2, iq: 2, cost: 50},
  "Crossbowman": {mv: 6, a: 3, d: 3, hp: 2, iq: 2, cost: 75, special: "Special Ability: Wields a crossbow"},

},
};

boards = {};
var map = [];
ui = new UI();

class Card extends UIElement {
  constructor(card, set, stats) {
    super();
    this.name = card.name || card.title;
    for (let c of ["The ", " ", "'", "!", "-"])
        this.name = this.name.replaceAll(c, "");
    this.set = set;
    this.title = card.title;
    this.text = card.text;
    this.image = card.image;
    this.cost = card.cost;
    this.wizard = card.wizard;
    this.type = card.type;
    this.stats = stats[this.name];
    this.id = "card" + this.name;
  }
}
class Set extends UIElement {
  constructor(set, edition) {
    super();
    this.name = set.name
    this.region = set.region;
    this.edition = edition;
    this.type = set.type;
    this.id = set.name;
    this.cards = [];
    for (const card of set.cards)
      this.cards.push(new Card(card, this.type, stats[this.region]));
  }
}
class Piece extends UIElement {
  constructor(piece, fields, objects) {
    super();
    this.stats = stats[piece.type];
    this.availableFields = fields;
    if (piece instanceof Piece) {
      ["type", "icons", "w", "h", "z", "xoffset", "yoffset", "kind", "angle"].forEach(p => this[p] = piece[p]);
      this.place(objects);
      this.id = piece.id;
      return;
    }
    this.type = piece.type;
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
    this.place(fields.filter(f => f.id == piece.field)[0]);
    this.id = this.type + this.angle + this.fields[0].id;
  }
  async moveAlong(path) {
    if (!path[0])
      return;
    let field = path.pop();
    this.place(field);
    new Promise(r => setTimeout(r, 50)).then(r => this.moveAlong(path));
  }
  async moveTo(field) {
    this.moveAlong(field.path());
  }
  place(field) {
    if (this.fields)
      this.fields.forEach(f => {
        f.objects = f.objects.filter(o => o != this)
        f.links = f.links.filter(l => l != this)
      });
    if (!field)
      return;
    let w = this.angle % 180 ? this.h : this.w;
    let h = this.angle % 180 ? this.w : this.h;
    this.fields = [field, ...this.availableFields.filter(f => f != field && f.x >= field.x && f.x < field.x + w && f.y >= field.y && f.y < field.y + h)];
    if (this.type.includes("SecretDoor")) {
      let x = -(this.angle / 90 % 4 - 2) % 2;
      let y = (this.angle / 90 % 4 - 1) % 2;
      this.fields.push(this.availableFields.filter(f => f.x == field.x + x && f.y == field.y +y)[0]);
    }
    this.fields.forEach(f => f.objects.push(this));
    if (this.kind == "door" || this.type.includes("SecretDoor"))
      this.fields.forEach(f => f.links.push(this));
  }
  rotate() {
    if (this.kind == "mark")
      return;
    if (["hero", "monster", "man-at-arms"].some(k => this.kind == k) && this.w == 1 && this.h == 1)
      return;
    this.angle += 90;
    this.place(this.fields[0]);
  }
  letsPass(object) {
    return this.kind != "furniture" && !this.sealsOff();
  }
  sealsOff() {
    return this.type.includes("BlockedSquare");
  }
  isOpen() {
    return true;
  }
  die() {
    this.place(undefined);
    this.id = undefined;
  }
  canAttack(opponent) {
    if (!this.stats || !opponent.stats)
      return false;
    return this.fields.filter(f => opponent.fields.some(n => n.isNeighbor(f)))[0]
  }
  attack(opponent) {
    console.log(this.id, "attacks", opponent.id);
    if (!this.canAttack(opponent))
      return
    this.opponent = opponent;
//    opponent.die();
  }
}

class Dice extends Piece {
  constructor(piece, fields, objects) {
    super(piece, fields, objects);
    this.rolled = 6;
  }
  rotate() {
    this.rolled = Math.floor(Math.random() * 6) + 1;
  }
}

class Dark extends UIElement {
  constructor(piece, fields) {
    super();
    this.type = piece.type;
    this.field = fields.filter(f => f.id == piece.field)[0] || fields[0];
    this.field.revealed = false;
    this.id = this.type + this.field.id;
  }
}

class Field extends UIElement {
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.areas = [];
    this.links = [];
    this.objects = [];
    this.id = String.fromCharCode("a".charCodeAt(0) + x) + (y + 1);
    this.revealed = true;
  }
  reveal(state) {
    this.revealed = state == undefined ? !this.revealed : state;
    this.neighbors().filter(n => !n.objects.some(o => o.sealsOff()) && n.revealed != this.revealed).forEach(n => n.reveal(this.revealed));
  }
  isBlocked() {
    return this.objects.some(o => o.id.includes("BlockedSquare"));
  }
  isNeighbor(n) {
    return Math.abs(this.x - n.x) + Math.abs(this.y - n.y) == 1;
  }
  neighbors() {
    return this.links.filter(l => l.isOpen()).map(l => l.fields.filter(f => f.id != this.id)[0]).filter(f => f);
  }
  reach(i, distance=0) {
    if (!i || distance > i || distance >= this.distance)
      return;
    this.distance = distance;
    this.neighbors().filter(n => n.objects.every(o => o.letsPass())).forEach(n => n.reach(i, distance + 1));
  }
  path(ret = []) {
    ret.push(this);
    let n = this.neighbors().filter(n => n.distance < this.distance)[0];
    if (n)
      n.path(ret);
    return ret;
  }
} 

class Link extends UIElement {
  constructor(f1, f2) {
    super();
    if (!f1 || !f2)
      return;
    this.fields = [f1, f2];
    f1.links.push(this);
    f2.links.push(this);
    this.id = "link" + f1.id + f2.id
  }
  isOpen() {
    return true;
  }
}
class Wall extends Link {
  constructor(f1, f2) {
    super(f1, f2);
    this.id = "wall" + f1.id + f2.id;
  }
  isOpen() {
    return false;
  }
}
class Area {
  constructor(x1, y1, w, h, fields, share=true) {
    this.fields = []
    this.revealed = true;
    for (let x = x1; x < x1 + w; x++)
      for (let y = y1; y < y1 + h; y++) {
        let f = fields.filter(f => f.x == x && f.y == y)[0];
        if (f && f.areas[0] && !share)
          continue;
        if (!f)
          f = this.createField(x, y, fields);
        f.areas.push(this);
        this.fields.push(f);
      }
    this.setNeighbors();
  }
  setNeighbors() {
    this.fields.forEach(f => this.fields.filter(n => n.isNeighbor(f)).forEach(n => this.addLink(f, n)));
  }
  addLink(f1, f2) {
    if (!f1.links.some(l => l.fields.includes(f2)))
      new Link(f1, f2);
  }
  reveal(state) {
    this.revealed = state == undefined ? !this.revealed : state;
    for (let f of this.fields)
      f.reveal(this.revealed);
  }
  createField(x, y, fields) {
    let f = new Field(x, y);
    fields.push(f);
    return f;
  }
}
class Room extends Area {
  constructor(x1, y1, w, h, fields) {
    super(x1, y1, w, h, fields, false);
    this.fields.filter(f => f.areas.some(a => a != this)).forEach(f => {
      console.log(this, f);
    });
    this.fields.filter(f => f.x == x1).forEach(f => this.addWall(f, fields, -1, 0));
    this.fields.filter(f => f.x == x1 + w - 1).forEach(f => this.addWall(f, fields, 1, 0));
    this.fields.filter(f => f.y == y1).forEach(f => this.addWall(f, fields, 0, -1));
    this.fields.filter(f => f.y == y1 + h - 1).forEach(f => this.addWall(f, fields, 0, 1));
  }
  addWall(f, fields, x, y) {
    let f2 = fields.filter(f2 => f2.y == f.y + y && f2.x == f.x + x)[0];
    f2 = f2 || this.createField(f.x + x, f.y + y, fields);
    if (f.links.some(l => [f, f2].every(f => l.fields.includes(f))))
      return;
    if (f2.x < f.x || f2.y < f.y)
      new Wall(f, f2);
    else
      new Wall(f2, f);
  }
}
class Passage extends Area {
  constructor(x1, y1, w, h, fields) {
    super(x1, y1, w, h, fields);
  }
}
class Board extends UIElement {
  constructor(definitions, pieces, region) {
    super();
    this.w = 26;
    this.h = 19;
    this.region = region;
    this.id = "board" + id.next().value;
    this.areas = [];
    this.fields = [];
    this.objects = [];
    definitions["passages"].forEach(r => this.addArea(new Passage(r.x, r.y, r.w, r.h, this.fields)));
    definitions["rooms"].forEach(r => this.addArea(new Room(r.x, r.y, r.w, r.h, this.fields)));
    this.addArea(new Area(-1, 0, 1, this.h, this.fields));
    this.addArea(new Area(this.w, 0, 1, this.h, this.fields));
    this.addArea(new Area(0, -1, this.w, 1, this.fields));
    this.addArea(new Area(0, this.h, this.w, 1, this.fields));
    pieces.forEach(p => this.addObject(p));
  }
  addArea(a) {
      this.areas.push(a);
  }
  addObject(o, def=definitions["objects"]) {
    if (o.category == "dark")
      this.objects.push(new Dark(o, this.fields));
    else if (o.type == "Dice")
      this.objects.push(new Dice(o, this.fields, def));
    else
      this.objects.push(new Piece(o, this.fields, def));
  }
  cloneObject(o, f) {
    this.addObject(o, f);
  }
  removeObject(o) {
    o.place(undefined);
    this.objects = this.objects.filter(o2 => o2 != o);
    o.id = undefined;
  }
}

function fieldId(x, y) {
  return String.fromCharCode("a".charCodeAt(0) + x) + (y + 1)
}
class Quest extends UIElement {
  constructor(xml) {
    super();
    this.fromXml(xml);
  }
  fromXml(xml) {
    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(xml, "text/xml");
    this.id = "quest";
    this.region = xmlDoc.getElementsByTagName("quest")[0].getAttribute("region");
    for (const b of xmlDoc.getElementsByTagName("board"))
      this.addBoard(b);
    this.title = xmlDoc.getElementsByTagName("quest")[0].getAttribute("name");
    let speech = xmlDoc.getElementsByTagName("speech")[0];
    this.speech = speech && speech.innerHTML;
    this.notes = Array.prototype.slice.call(xmlDoc.getElementsByTagName("note")).map(n => n.innerHTML);
  }
  addBoard(b) {
    this.map = [];
    let objects = Array.prototype.slice.call(b.getElementsByTagName("object"));
    objects.forEach(o => this.addObject(o, map));
    let dark = Array.prototype.slice.call(b.getElementsByTagName("dark"));
    dark.forEach(o => o.id = "Dark");
    dark.forEach(o => this.addObject(o, map));
    let board = new Board(definitions, this.map, this.region);
    boards[board.id] = board;
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
    for (const i of o.children) {
      if (i.tagName == "icon") {
        this.icons[i.getAttribute("region")] = i.getAttribute("path");
        if (i.hasAttribute("xoffset")) {
          this.xoffset = this.xoffset || {};
          this.xoffset[i.getAttribute("region")] = parseFloat(i.getAttribute("xoffset"));
        }
        if (i.hasAttribute("yoffset")) {
          this.yoffset = this.yoffset || {};
          this.yoffset[i.getAttribute("region")] = parseFloat(i.getAttribute("yoffset"));
        }
      }
    }
  }
  addIcon(i) {

  }
}

function readFile(input) {
  let file = input.files[0];
  Array.prototype.slice.call(input.files).reverse().forEach(f => {
    let reader = new FileReader();
    reader.readAsText(f);
    reader.onload = function() {
      new Quest(reader.result);
    };
    reader.onerror = function() {
      console.log(reader.error);
    };
  });
}


async function loadQuest(quest, campaign, region) {
  for (let c of [" ", "'", "!", "-"])
    campaign = campaign.replaceAll(c, "");
  url = campaign + "_" + region + "/" + campaign
  if (quest)
    url += "-" + quest
  url += "_" + region + ".xml";
  await fetch(url).then(response => response.text()).then(str => new Quest(str));
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

function addCampaignText(text, type="") {
  if (!text)
    return;
  let div = document.createElement("div");
  div.innerHTML = text;
  addClass(div, type);
  document.getElementById("maps").appendChild(div);
}

async function loadCampaign(campaign, region, map) {
  if (!campaign)
    return;
  if (!map) {
    addCampaignText(campaign.name, "title");
    addCampaignText(campaign.instructions);
    addCampaignText(campaign.intro, "speech intro");
  }
  clearBoards();
  map = campaign.quests[map]
  quests = map ? [map] : campaign.quests;
  for (const q of quests)
    await loadQuest(q, campaign.name, region)
  if (!map)
    addCampaignText(campaign.outro, "speech outro");
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
  parent = document.getElementById("campaigns")
  parent = parent || document.getElementsByTagName("body")[0];
  parent.appendChild(div);   
}

function addLinks(campaign2) {
  for (const [region, c] of Object.entries(campaigns)) {
    for (const [abbrev, c2] of Object.entries(c).filter(([abbrev, c2]) => !campaign2 || c2 == campaign2)) {
      addLink(abbrev, region, c2.name + " " + region);
      if (campaign2)
        for (const [i, m] of c2.quests.entries())
          addLink(abbrev, region, m, i);
    }
  }
}

function setExtraDefinitions() {
  definitions.objects["Dice"] = {id: "Dice", name: "Dice", kind: "dice", h: 1, w: 1, icons: {Europe: "Dice", USA: "Dice"}, xoffset: {"Europe": 0.1, "USA": 0.1}, yoffset: {"Europe": 0.1, "USA": 0.1}};
}

function loadCards() {
  for (const set of sets[params.e] || [])
    new Set(set, params.e);
}
function loadCampaigns() {
  c = campaigns[params.r]
  c = c && c[params.c];
  addFileDialog();
  addLinks(c);
  loadCampaign(c, params.r, params.m);
}

var params = []
function setParams() {
  let idx = document.URL.indexOf('?');
  if (idx != -1) {
    let pairs = document.URL.substring(idx+1, document.URL.length).split('&');
    for (let i=0; i<pairs.length; i++) {
      nameVal = pairs[i].split('=');
      params[nameVal[0]] = nameVal[1];
    }
  }
}

async function init() { 
  setParams();
  setExtraDefinitions();
//  await loadObjects();
  
}
