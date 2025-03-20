function xcoord(id) {
    return id.charCodeAt(0) - "a1".charCodeAt(0) + 1;
}
function ycoord(id) {
    return parseInt(id.slice(1));
}
class Xml {
  constructor(board) {
    if (!board)
      return;
    this.name = board.getElementsByClassName("intro")[0].textContent;
    this.region = board.getAttribute("region");
    let objects = board.getElementsByTagName("div");
    this.xml = document.implementation.createDocument(null, "quest");
    let quest = this.xml.getElementsByTagName("quest")[0];
    quest.setAttribute("name", this.name);
    quest.setAttribute("region", this.region);
    quest.setAttribute("version", "1.0");
    quest.setAttribute("width", "1");
    quest.setAttribute("height", "1");
    this.board = this.xml.createElement("board");
    quest.appendChild(this.board);
    for (const o of objects) {
      if (o.getAttribute("type") == "Field")
        this.addField(o);
      else
        this.addObject(o);
    }
    quest.appendChild(this.xml.createElement("speech"));
    this.save();
  }
  addObject(o) {
    let type = o.getAttribute("type");
    if (!type)
      return;
    let object = this.xml.createElement("object");
    this.board.appendChild(object);
    object.setAttribute("id", type);
    let pos = o.getAttribute("pos");
    let rot = o.getAttribute("rot");
    object.setAttribute("left", xcoord(pos) + ".0");
    object.setAttribute("top", ycoord(pos) + ".0");
    object.setAttribute("rotation", o.getAttribute("rot"));
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
    let filename = name + ".xml";
    let type = "text/plain;charset=utf-8;";
    let serializer = new XMLSerializer();
    let xml = serializer.serializeToString(this.xml); 
    let header = '<?xml version="1.0"?>\n'
    header += '<!DOCTYPE quest PUBLIC\n'
    header += '"-//org.lightless//HeroScribe Quest 1.4//EN"\n'
    header += '"http://lightless.org/files/xml/quest-1.4.dtd">\n\n'
    xml = header + xml.replaceAll(">",">\n")
    let file = new Blob([xml], {type: type});
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
}
