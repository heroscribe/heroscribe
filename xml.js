function xcoord(id) {
    return id.charCodeAt(0) - "a1".charCodeAt(0) + 1;
}
function ycoord(id) {
    return parseInt(id.slice(1));
}
function saveFile(filename, text) {
    let type = "text/plain;charset=utf-8;";
    let serializer = new XMLSerializer();
    let file = new Blob([text], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
      window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
      let a = document.createElement("a");
      let url = URL.createObjectURL(file);
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      setTimeout(function() {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 0);
    }
}

class Xml {
  constructor(board) {
    if (!board)
      return;
    let board2 = board.getElementsByClassName("board")[0];
    let parchment = board.getElementsByClassName("parchment")[0];
    this.name = parchment.getElementsByClassName("title")[0].textContent;
    this.region = board2.getAttribute("region");
    let objects = board2.getElementsByTagName("div");
    this.xml = document.implementation.createDocument(null, "quest");
    this.quest = this.xml.getElementsByTagName("quest")[0];
    this.quest.setAttribute("name", this.name);
    this.quest.setAttribute("region", this.region);
    this.quest.setAttribute("version", "1.0");
    this.quest.setAttribute("width", "1");
    this.quest.setAttribute("height", "1");
    this.board = this.xml.createElement("board");
    this.quest.appendChild(this.board);
    for (const o of objects)
      if (o.getAttribute("type") == "Field")
        this.addField(o);
      else
        this.addObject(o);
    this.addSpeech(parchment.getElementsByClassName("speech")[0].textContent);
    for (const note of board.getElementsByClassName("notes")[0].getElementsByTagName("div"))
      this.addNote(note.textContent);
    this.save();
  }
  addSpeech(text) {
    let speech = this.xml.createElement("speech");
    speech.appendChild(document.createTextNode(text));
    this.quest.appendChild(speech);
  }
  addNote(text) {
    let note = this.xml.createElement("note");
    note.appendChild(document.createTextNode(text));
    this.quest.appendChild(note);
  }
  addObject(o) {
    let type = o.getAttribute("type");
    if (!type)
      return;
    let object = this.xml.createElement("object");
    this.board.appendChild(object);
    object.setAttribute("id", type);
    let pos = o.getAttribute("pos");
    object.setAttribute("left", xcoord(pos) + ".0");
    object.setAttribute("top", ycoord(pos) + ".0");
    let rotations = ["downward", "leftward", "upward", "rightward"];
    let angle = parseInt(o.getAttribute("angle"));
    object.setAttribute("rotation", rotations[Math.abs(angle / 90) % 4])
    object.setAttribute("zorder", "0.0");
  }
  addField(f) {
    if (hasClass(f, "revealed"))
      return;
    let dark = this.xml.createElement("dark");
    this.board.appendChild(dark);
    let pos = f.getAttribute("pos");
    dark.setAttribute("left", xcoord(pos));
    dark.setAttribute("top", ycoord(pos));
    dark.setAttribute("height", 1);
    dark.setAttribute("width", 1);
  }
  save() {
    name = this.name.replaceAll(" ", "").replaceAll("'", "") || "Quest"
    let serializer = new XMLSerializer();
    let xml = serializer.serializeToString(this.xml); 
    let header = '<?xml version="1.0"?>\n'
    header += '<!DOCTYPE quest PUBLIC\n'
    header += '"-//org.lightless//HeroScribe Quest 1.4//EN"\n'
    header += '"http://lightless.org/files/xml/quest-1.4.dtd">\n\n'
    xml = header + xml.replaceAll(">",">\n")
    saveFile(name + ".xml", xml);
  }
}

async function loadObjects() {
  xml = await fetch("Objects.xml").then(response => response.text());
  let parser = new DOMParser();
  let xmlDoc = parser.parseFromString(xml, "text/xml");
  for (const o of xmlDoc.getElementsByTagName("object")) {
    let o2 = new Object2(o);
    definitions["objects"][o2.id] = o2;
  }
  for (const o of xmlDoc.getElementsByTagName("corridor")) {
    let x = parseInt(o.getAttribute("left")) - 1;
    let y = parseInt(o.getAttribute("top")) - 1;
    let w = parseInt(o.getAttribute("width"));
    let h = parseInt(o.getAttribute("height"));
    definitions["passages"].push({x: x, y: y, w: w, h: h});
  }
  saveFile("objects.js", JSON.stringify(definitions, null, 0));
}
