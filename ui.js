function* createId(id) { 
  while (++id) 
    yield id; 
}
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
    this.id = createId(0);
    this.region = "Europe";
    this.fields = {};
  }
  deleteSelected() {
    if (this.selected)
      this.selected.remove();
    this.selected = undefined;
  }
  addElement(id, type) {
    let div = document.createElement("div");
    div.id = id;
    div.className = type;
    this.board.appendChild(div);
    return div;
  }
  addField(field) {
    let rule = "left: " + (16 + 21 * field.x) + "px; top: " + (16 + 21 * field.y) + "px;";
    addCSSRule(document.styleSheets[0], "div[pos='" + field.id + "']", rule);
    let div = this.addElement(field.id, "field")
    if (field.x < 0 || field.x >= this.w || field.y < 0 || field.y >= this.h)
      addClass(div, "border");
    div.setAttribute("pos", field.id);
    addClass(div, "revealed");
    this.fields[field.id] = div;
    div.setAttribute("type", "Field");
    div.setAttribute("onclick", "ui.selectField(this)");
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
    removeClass(div, "selected");
    if (field.parentNode != div.parentNode)
      div = field.parentNode.appendChild(div.cloneNode(true));
    div.setAttribute("pos", field.getAttribute("pos"));
    removeClass(div, "selected");
    this.selected = undefined;
  }
  selectField(div) {
    if (this.selected)
      this.place(this.selected, div);
    else
      toggleClass(div, "revealed");
    removeClass(this.selected, "selected");
    this.selected = undefined;
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
  selectObject(div) {
    removeClass(this.selected, "selected");
    if (this.selected == div) {
        this.rotate(div);
        this.selected = undefined;
    } else if (["door", "room"].some(t => hasClass(this.selected, t))) {
      this.place(this.selected, div);
    } else {
      this.selected = div;
      addClass(this.selected, "selected");
    }
  }
  addObject(obj, category) {
    let div = this.addElement(obj.id, category);
    div.setAttribute("pos", obj.field.id);
    div.style["z-index"] = 10 + (obj.z || 0);
    div.style["background-image"] = "url('Icons/Raster/" + obj.icons[this.region] + ".png')";
    let xoffset = obj.xoffset[this.region] || 0;
    div.setAttribute("xoffset", 20 * xoffset);
    let yoffset = obj.yoffset[this.region] || 0;
    div.setAttribute("yoffset", 20 * yoffset);
    if (obj.w > 1)
      div.style["width"] = 21 * obj.w + "px";
    if (obj.h > 1)
      div.style["height"] = 21 * obj.h + "px";
    if (obj.h > 1 || obj.w > 1)
      addClass(div, "large");
    div.setAttribute("angle", obj.angle);
    addClass(div, obj.type);
    addClass(div, obj.kind);
    div.setAttribute("type", obj.type);
    div.setAttribute("onclick", "ui.selectObject(this)");
    this.update(div);
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
    this.board.id = "board";
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
    div.style.width = (21 * this.w - 1) + "px";
    div.style.top = "10px";
    div.style.left = "10px";
    div.style.height = (21 * this.h - 1) + "px";
    this.board.appendChild(div);
    this.board.style = "width: " + (20 + 21 * obj.w) + "px; height: " + (25 + 20 + 21 * obj.h) + "px;"
    document.getElementById("maps").appendChild(this.board);
  }
  set(obj, prop, value) {
    //console.log(obj, prop, value);
    var type = obj.constructor ? obj.constructor.name : undefined;
    var ret = Reflect.set(...arguments);
    if (prop == "id")
        this["add" + type] && this["add" + type](obj);
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
