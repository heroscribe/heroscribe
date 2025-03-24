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
    this.id = "ui";//createId(0);
    this.region = "Europe";
    this.fields = {};
  }
  deleteSelected() {
    let div = this.selected;
    this.unselect();
    if (div)
      div.remove();
  }
  addElement(id, type) {
    let div = document.createElement("div");
    div.id = id;
    div.className = type;
    this.board.appendChild(div);
    return div;
  }
  addField(field) {
    let div = this.addElement(field.id, "field")
    div.obj = field;
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
    let div = this.addElement(wall.id, "wall")
    let style = "top: " + (14 + 21 * wall.y) + "px; left: " + (14 + 21 * wall.x) + "px;"
    if (wall.w)
      style += "width: " + (3 + 21 * wall.w) + "px;";
    if (wall.h)
      style += "height: " + (3 + 21 * wall.h) + "px;";
    div.style = style;
  }
  place(div, field) {
    if (!div)
      return;
    this.unselect();
    if (field.parentNode != div.parentNode) {
      div = field.parentNode.appendChild(div.cloneNode(true));
      div.style["opacity"] = 0.5;
      removeClass(div, "selected");
      removeClass(div, "transparent");
      div.setAttribute("pos", field.getAttribute("pos"));
      this.update(div);
      div.offsetWidth;//triggers reflow -> fade in
      div.style["opacity"] = 1;
    } else {
      div.setAttribute("pos", field.getAttribute("pos"));
      this.update(div);
    }
    this.revealAreas(field, true);
  }
  selectField(div) {
    if (this.selected)
      this.place(this.selected, div);
    else {
      let field = div.parentNode.obj.fields.filter(f => f.id == div.id)[0];
      console.log(field);
      if (!field.revealed)
        div.parentNode.obj.fields.filter(f => f.id == div.id).forEach(f => f.reveal(true));
      else
        this.revealAreas(div, false);
    }
    this.unselect();
  }
  update(div) {
    let angle = parseInt(div.getAttribute("angle"));
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
    if (hasClass(div, "mark"))
        return;
    if (["hero", "monster", "man-at-arms"].some(t => hasClass(div, t)) && ! hasClass(div, "large"))
      return;
    let angle = parseInt(div.getAttribute("angle"));
    div.setAttribute("angle", angle + 90);
    this.update(div);
  }
  select(div) {
    for (const o of document.getElementsByClassName("object"))
      addClass(o, "transparent");
    this.selected = div;
    removeClass(div, "transparent");
    addClass(div, "selected");
  }
  unselect() {
    if (!this.selected)
      return;
    for (const o of document.getElementsByClassName("object"))
      removeClass(o, "transparent");
    removeClass(this.selected, "selected");
    this.selected = undefined;
  }
  selectObject(div) {
    removeClass(this.selected, "selected");
    if (this.selected == div) {
        this.rotate(div);
        this.unselect();
    } else if (["door", "room"].some(t => hasClass(this.selected, t))) {
      this.place(this.selected, div);
    } else {
      this.select(div);
    }
  }
  revealAreas(div, state) {
    let areas = div.parentNode.obj.areas.filter(a => a.fields.some(f => f.id == div.getAttribute("pos")));
    areas.forEach(a => a.reveal(state));
  }
  addObject(obj, category) {
    let div = this.addElement(obj.id, category);
    div.setAttribute("pos", obj.field.id);
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
    this.update(div);
    this.revealAreas(div, true);
    return div
  }
  addDark(obj) {
    removeClass(this.fields[obj.field.id], "revealed");
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
  addBoard(obj) {
    this.board = document.createElement("div");
    this.board.id = obj.id;
    this.board.obj = obj;
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
  }
  reveal(obj, state) {
    addClassIf(obj.div, "revealed", state);
  }
  set(obj, prop, value) {
    //console.log(obj, prop, value);
    var type = obj.constructor ? obj.constructor.name : undefined;
    var ret = Reflect.set(...arguments);
    if (prop == "id")
        this["add" + type] && this["add" + type](obj);
    if (prop == "revealed")
      this.reveal(obj, value);
    return ret;
  }
}

class UIElement {
  constructor() {
    return ui ? new Proxy(this, ui) : this;
  }
  uiId() {
    return ui? ui.id.next().value : 0;
  }
}
