function addClass(e, className) {
  if (!e)
    return;
  if (!e.className.includes(className))
    e.className += " " + className;
}
function removeClass (e, className) {
  if (!e)
    return;
  e.className = e.className.replace(className, "").trim();
}
function addClassIf(e, className, cond) {
  if (cond)
    addClass(e, className);
  else
    removeClass(e, className);
}
function toggleClass(e, className) {
  if (!e)
    return;
  if (!e.className.includes(className))
    e.className += " " + className;
  else
    removeClass(e, className);
}
function hasClass(e, className) {
  if (!e)
    return;
  return Array.prototype.slice.call(e.classList).includes(className);
} 
function addCSSRule(sheet, selector, rules, index) {
  if("insertRule" in sheet)
    sheet.insertRule(selector + "{" + rules + "}", index);
  else if("addRule" in sheet)
    sheet.addRule(selector, rules, index);
}

class UI {
  constructor(style) {
    this.id = "ui";
    this.region = "Europe";
    this.fields = {};
  }
  deleteSelected() {
    let div = this.selected;
    this.unselect();
    div.parentNode.obj.removeObject(div.obj);
  }
  addElement(id, type) {
    let div = document.createElement("div");
    div.className = type;
    let parent 
    this.board.appendChild(div);
    return div;
  }
  addField(field) {
    let div = this.addElement(field.id, "field")
    div.obj = field.proxy;
    field.div = div;
    if (field.x < 0 || field.x >= this.w || field.y < 0 || field.y >= this.h)
      addClass(div, "border");
    div.setAttribute("pos", field.id);
    addClass(div, "revealed");
    this.fields[field.id] = div;
    div.setAttribute("type", "Field");
    div.setAttribute("onclick", "ui.selectField(this)");
    div.style["left"] = (16 + 21 * field.x) + "px";
    div.style["top"] = (16 + 21 * field.y) + "px";
  }
  addWall(wall) {
    if (!wall.fields)
      return;
    let div = this.addElement(wall.id, "wall")
    div.style["top"] = (15 + 21 * wall.fields[0].y) + "px";
    div.style["left"] = (15 + 21 * wall.fields[0].x) + "px"
    if (wall.fields[0].x == wall.fields[1].x)
      div.style["width"] = "24px";
    if (wall.fields[0].y == wall.fields[1].y)
      div.style["height"] = "24px";
  }
  place(div, field) {
    if (!div)
      return;
    if (field.parentNode != div.parentNode) {
      this.board = field.parentNode;
      field.parentNode.obj.cloneObject(div.obj, field.obj);
    } else {
      div.obj.moveTo(field.obj);
      this.unselect();
    }
    this.revealAreas(field, true);
  }
  selectField(div) {
    if (this.selected)
      this.place(this.selected, div);
    else {
      let field = div.parentNode.obj.fields.filter(f => f.id == div.getAttribute("pos"))[0];
      if (!field.revealed)
        this.revealAreas(div, true);
        //div.parentNode.obj.fields.filter(f => f.id == div.getAttribute("pos")).forEach(f => f.reveal(true));
      else
        this.revealAreas(div, false);
    }
    this.unselect();
  }
  update(div) {
    let angle = div.obj.angle;
    let x = [50, 50, -50, -50][(angle / 90) % 4]
    let y = [50, -50, -50, 50][(angle / 90) % 4]
    let xoffset = Math.round(parseFloat(div.getAttribute("xoffset")));
    let yoffset = Math.round(parseFloat(div.getAttribute("yoffset")));
    if (hasClass(div, "mark")) {
      xoffset += 2;
      yoffset += 2;
    }
    let offset = "translate(" + xoffset + "px, " + yoffset + "px)"
    let rotate = "rotate(" + angle + "deg) "
    let shiftBack = "translate(" + x + "%, " + y + "%) "
    let scale = "scale(0.8, 0.8) "
    div.style["transform"] = "translate(-50%, -50%) " + rotate + shiftBack + offset;
    let pos = div.getAttribute("pos");
    x = pos.charCodeAt(0) - "a1".charCodeAt(0) + 1;
    y = parseInt(pos.slice(1))
    div.style["left"] = (-5 + 21 * x) + "px";
    div.style["top"] = (-5 + 21 * y) + "px";
  }
  rotate(div) {
    div.obj.rotate();
  }
  select(div) {
    addClass(document.getElementById("maps"), "selected");
    this.selected = div;
    addClass(div, "selected");
  }
  unselect() {
    if (!this.selected)
      return;
    removeClass(document.getElementById("maps"), "selected");
    removeClass(this.selected, "selected");
    this.selected.parentNode.obj.fields.filter(f => f.distance != undefined).forEach(f => f.distance = undefined);
    this.selected = undefined;
  }
  selectObject(div) {
    removeClass(this.selected, "selected");
    if (this.selected == div) {
        this.rotate(div);
        this.unselect();
    } else if (["door", "room"].some(t => hasClass(this.selected, t))) {
      this.place(this.selected, div);
    } else if (this.selected) {
      this.selected.obj.attack(div.obj);
      this.unselect();
    } else {
      this.unselect();
      this.select(div);
//      div.obj.fields[0].reach(div.obj.stats && div.obj.stats.mv);
    }
  }
  revealAreas(div, state) {
    div.obj.reveal(state);
  }
  addObject(obj, category) {
    let div = this.addElement(obj.id, category);
    div.obj = obj.proxy;
    obj.div = div;
    div.setAttribute("pos", obj.fields[0].id);
    div.style["z-index"] = 10 + (obj.z || 0);
      div.style["background-image"] = "url('Icons/Raster/" + obj.icons[this.region] + ".png')";
    let xoffset = obj.xoffset && obj.xoffset[this.region] || 0;
    div.setAttribute("xoffset", 20 * xoffset);
    let yoffset = obj.yoffset && obj.yoffset[this.region] || 0;
    div.setAttribute("yoffset", 20 * yoffset);
    if (obj.w > 1)
      div.style["width"] = 21 * obj.w + "px";
    if (obj.h > 1)
      div.style["height"] = 21 * obj.h + "px";
    if (obj.h > 1 || obj.w > 1)
      addClass(div, "large");
    div.setAttribute("angle", obj.angle);
    addClass(div, obj.type);
    addClass(div, "object");
    addClass(div, obj.kind);
    div.setAttribute("type", obj.type);
    div.setAttribute("onclick", "ui.selectObject(this)");
    div.style["opacity"] = 0;
    this.update(div);
    div.offsetWidth;
    div.style["opacity"] = 1;
//    this.revealAreas(div, true);
    return div
  }
  addPiece(obj) {
    this.addObject(obj, "piece");
  }
  addFurniture(obj) {
    this.addObject(obj, "furniture");
  }
  addButton(text, action) {
    let b = document.createElement("button");
    b.setAttribute("type", "button");
    b.setAttribute("onclick", action);
    b.innerHTML = text;
    this.board.appendChild(b);
  }
  addSpeech(speech) {
    let div = document.createElement("div");
    div.innerHTML = speech;
    div.className = "speech";
    div.setAttribute("contentEditable", "true");
    this.board.appendChild(div);
  }
  addFight() {
    this.fight = this.addElement("fight", "fight");
    let div = document.createElement("div");
    addClass(div, "dice");
    this.fight.appendChild(div);
    div.setAttribute("onclick", "ui.rollDice(this)");
    div.setAttribute("rolled", 1);
  }
  rollDice(div) {
    console.log(div);
    toggleClass(div, "rolled");
    let rolled = parseInt(div.getAttribute("rolled"));
    rolled -= 6 + Math.floor(Math.random() * 6) + 1;
    console.log(6 + rolled % 6 + 1);
    div.setAttribute("rolled", rolled);
    div.style["background-position"] = "0% " + 120 * rolled / 6 + "%";
    
  }
  setRolled(obj) {
    let current = parseInt(obj.getAttribute("rolled")) || 0;
    current -= 6 + obj.obj.rolled;
    obj.setAttribute("rolled", current);
    obj.style["background-position"] = "0% " + 120 * current / 6 + "%";
  }
  addDice(obj) {
    this.addObject(obj, "object");
  }
  addCard(obj) {
    let card = document.createElement("div");
    addClass(card, "card");
    let title = document.createElement("div");
    title.innerHTML = obj.title;
    title.className = "title";
    card.appendChild(title);
    let img = document.createElement("div");
    card.appendChild(img);
    img.className = "image";
    let image = obj.type == "scroll" ? "scroll" : (obj.image || obj.title.toLowerCase());
    for (let c of [" ", "'", "!", "-"])
        image = image.replaceAll(c, "");
    img.style = "background-image: url('Images/Cards/pic_" + obj.set + "_" + image + ".jpg');"
    let text = document.createElement("div");
    let scrollText = " May be used by any Hero. Scroll crumbles to dust after it is used."
    text.innerHTML = obj.text + (obj.type == "scroll" ? scrollText : "");
    text.className = "text";
    card.appendChild(text);
    let cost = document.createElement("div");
    cost.innerHTML = obj.cost ? "Cost " + obj.cost + " gold coins." : "";
    cost.className = "text";
    card.appendChild(cost);
    let wizard = document.createElement("div");
    wizard.innerHTML = obj.wizard == true ? "May only be used by Wizard" : obj.wizard == false ? "May not be used by Wizard" : "";
    wizard.className = "text";
    card.appendChild(wizard);
    let type = document.createElement("div");
    type.innerHTML = obj.type && obj.type != "scroll" ? obj.type.toUpperCase() : "";
    type.className = "text type";
    card.appendChild(type);
    this.board.appendChild(card);
  }
  addSet(obj) {
    let div = document.createElement("div");
    div.innerHTML = obj.region + " " + obj.name;
    document.getElementById("cards").appendChild(div);
    this.board = document.createElement("div");
    this.board.id = obj.id
    addClass(this.board, "set");
    addClass(this.board, obj.region);
    document.getElementById("cards").appendChild(this.board);
  }
  addBoard(obj) {
    this.board = document.createElement("div");
    this.board.id = obj.id;
    this.board.obj = obj.proxy;
    obj.div = this.board;
    this.region = obj.region;
    this.board.setAttribute("region", obj.region);
    this.w = obj.w;
    this.h = obj.h;
    this.board.className = "board";
    this.addButton("Save", "new Xml(this.parentNode)");
    this.addButton("Close", "this.parentNode.remove()");
    this.addButton("Delete", "ui.deleteSelected()");
    let div = document.createElement("div");
    div.innerHTML = obj.name;
    div.className = "intro";
    div.setAttribute("contentEditable", "true");
    this.board.appendChild(div);
    //this.addSpeech(obj.speech);
    div = document.createElement("div");
    div.className = "frame";
    div.style.width = (21 * this.w - 0) + "px";
    div.style.top = "10px";
    div.style.left = "10px";
    div.style.height = (21 * this.h - 0) + "px";
    this.board.appendChild(div);
    this.board.style = "width: " + (20 + 21 * obj.w) + "px; height: " + (25 + 20 + 21 * obj.h) + "px;"
    document.getElementById("maps").appendChild(this.board);
//    this.addFight();
  }
  setRevealed(obj, state) {
    addClassIf(obj, "revealed", state);
  }
  setDistance(obj, value) {
    addClassIf(obj, "reach", value != undefined);
  }
  setFields(obj, value) {
    if (!obj || !value || !value[0])
      return;
    obj.setAttribute("pos", value[0].id);
    this.update(obj);
  }
  setAngle(obj, value) {
    if (!obj)
      return;
    obj.setAttribute("angle", value);
    this.update(obj);
  }
  setOpponent(obj, value) {
    console.log("xxx");
    this.fight.style["width"] = 21 * obj.obj.stats.a + "px";
    this.fight.style["left"] = obj.style["left"];
  }
  set(obj, prop, value) {
    //console.log(obj, prop, value);
    var type = obj.constructor ? obj.constructor.name : undefined;
    var ret = Reflect.set(...arguments);
    let method = "set" + prop[0].toUpperCase() + prop.slice(1);
    if (prop == "id" && value == undefined)
      obj.div.remove();
    else if (prop == "id")
      this["add" + type] && this["add" + type](obj);
    else if (this[method])
      this[method](obj.div, value);
    return ret;
  }
}

class UIElement {
  constructor() {
    if (!ui)
      return this;
    this.proxy = new Proxy(this, ui);
    return this.proxy;
  }
  uiId() {
    return ui? ui.id.next().value : 0;
  }
}
