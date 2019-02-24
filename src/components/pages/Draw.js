import React, { Component, Fragment } from 'react';
import Header from '../App/Headers/Header';


class Draw extends Component {

  constructor(props) {
    super(props);
    this.state = {
      //Eigenes gemaltes Bild
      ownDrawing: [],

      //Wurde bereits gemalt und muss nur noch zusammengesetzt werden?
      composingMode: false,

      //Zusammengesetztes Bild
      composedImage: []
    };
  }

  /* Objekt in ownDrawing/composedImage sieht z.B so aus (typ: String)
 
  "<?xml version="1.0" encoding="UTF-8" standalone="no" ?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="800" height="600" viewBox="0 0 800 600" xml:space="preserve">
<desc>Created with Fabric.js 2.6.0</desc>
<defs>
</defs>
<g transform="matrix(1 0 0 1 587.39 289.85)"  >
<path style="stroke: rgb(0,0,0); stroke-width: 1; stroke-dasharray: none; stroke-linecap: round; stroke-dashoffset: 0; stroke-linejoin: round; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;"  transform=" translate(-587.39, -289.85)" d="M 496.389625 210 Q 496.390625 210 497.390625 210 Q 498.390625 210 500.390625 208.5 Q 502.390625 207 509.890625 203 Q 517.390625 199 533.890625 195.5 Q 550.390625 192 567.890625 186.5 Q 585.390625 181 603.390625 174.5 Q 621.390625 168 633.390625 163.5 Q 645.390625 159 652.890625 156 Q 660.390625 153 662.390625 153 Q 664.390625 153 665.390625 153 Q 666.390625 153 666.890625 155 Q 667.390625 157 669.890625 164.5 Q 672.390625 172 672.890625 182.5 Q 673.390625 193 673.390625 208.5 Q 673.390625 224 671.390625 243.5 Q 669.390625 263 667.390625 288 Q 665.390625 313 664.390625 333 Q 663.390625 353 665.390625 372 Q 667.390625 391 670.390625 403 Q 673.390625 415 675.890625 421 Q 678.390625 427 678.390625 426.5 Q 678.390625 426 678.390625 422 L 678.390625 417.999" stroke-linecap="round" />
</g>
</svg>"
 
 
  */

  // Aendert die Farbe des Stiftes
  changeColor = (e) => {
    canvas.freeDrawingBrush.color = event.target.value;

  }

  // Aendert die Art des Pinsels
  changeBrush = (e) => {
    canvas.freeDrawingBrush = new fabric[event.target.value + 'Brush'](canvas);
  }

  // Aendert die Dicke des Pinsels
  changeLineWidth = (e) => {
    canvas.freeDrawingBrush.width = parseInt(event.target.value, 10) || 1;
  }


  componentDidMount() {
    //Canvas zum zeichenen (der obere)
    window.canvas = new fabric.Canvas('c');

    // Hilfsablage fuer den Copyschritt
    window._clipboard = null;

    //"Ablage-"Canvas um das eigene und das Vorgaengerbild auszuwaehlen
    window.canvas2 = new fabric.Canvas('c1');
  }

  // Kopiere von den einen Canvas in den anderen (An der Stelle nur mit Canvas Objekten da an anderer Stelle die SVG Objekte aus den State in Canvas Objekte gewandelt werden)
  copy = (e) => {

    // Debug Hilfe
    /*console.log(this.state.ownDrawing, 'Own Drawing');
    console.log(this.state.composedImage, 'composedImage');
    console.log(this.state.composingMode, 'Composing Mode');
*/

    // clone what are you copying since you
    // may want copy and paste on different moment.
    // and you do not want the changes happened
    // later to reflect on the copy.

    // Check ob ein Objekt zum kopieren unten ausgewaelt wurde
    if (canvas2.getActiveObject() == null) {
      alert('Bitte das einzufuegende Bild in der Galerie auswaehlen!');
      return;
    }
    canvas2.getActiveObject().clone(function (cloned) {
      _clipboard = cloned;
    });

    // clone again, so you can do multiple copies.
    _clipboard.clone(function (clonedObj) {
      canvas2.discardActiveObject();
      clonedObj.set({
        left: clonedObj.left + 10,
        top: clonedObj.top + 10,
        evented: true,
      });

      if (clonedObj.type === 'activeSelection') {
        // active selection needs a reference to the canvas.
        clonedObj.canvas2 = canvas2;
        clonedObj.forEachObject(function (obj) {
          canvas.add(obj);
        });
        // this should solve the unselectability
        clonedObj.setCoords();
      } else {
        canvas.add(clonedObj);
      }
      _clipboard.top += 10;
      _clipboard.left += 10;
      canvas.setActiveObject(clonedObj);
      canvas.requestRenderAll();
    });
  }

  // Umschalten auf Zeichnenmodus
  toggleDrawing = (e) => {
    canvas.isDrawingMode = !canvas.isDrawingMode;
    if (canvas.isDrawingMode) {

      // Buttons umschalten sowie ungebrauchte ausblenden
      this.refs.drawingMode.innerHTML =
        ' <i className="fas fa-arrows-alt"></i> Pick Modus betreten';
      this.refs.drawingModeOptions.style.display = '';
      this.refs.saveCanvas.style.display = 'none';
      this.refs.deleteElement.style.display = 'none';
      this.refs.copy.style.display = 'none';
    } else {
      this.refs.drawingMode.innerHTML =
        ' <i className="fas fa-pen"></i> Zeichenbereich betreten';
      this.refs.drawingModeOptions.style.display = 'none';
      this.refs.saveCanvas.style.display = '';
      this.refs.deleteElement.style.display = '';
      this.refs.copy.style.display = '';
    };
  };

  // Hilfsmethode fuer den Download der Zeichnungen
  dataURLtoBlob = (dataurl) => {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }


  // Ausgewaeltes Objekt aus dem Canvas loeschen
  deleteElement = (e) => canvas.remove(canvas.getActiveObject());

  // Kompletten Canvas leeren
  deleteCompleteCanvas = (e) => canvas.clear();

  // Canvas speichern
  //
  saveCanvas = (e) => {

    // Sicherheitsabfrage
    var result = confirm(
      'Bist du wirklich mit der Bearbeitung fertig?\nDu kannst dein Bild nachher nicht mehr bearbeiten'
    );
    if (!result) {
      return;
    }

    // Canvas in SVG speichern
    let canvasAsSVG = canvas.toSVG();

    // Wenn Bereits im Zusammenstell Modus (Der Zeichenschritt wurde bereits durchgefuehrt und gespeichert)
    if (this.state.composingMode) {

      // Zusammenstellung im State speichern
      this.setState({ composedImage: canvasAsSVG })

      // Undwichtige Buttonns/Bereiche ausblenden / Kosmetik
      this.refs.extendetArea.style.display = 'none';
      this.refs.copy.style.display = 'none';
      this.refs.deleteElement.style.display = 'none';
      this.refs.saveCanvas.style.display = 'none';
      this.refs.deleteCompleteCanvas.style.display = 'none';
      this.refs.downloadCanvas.disabled = false;

      // Download Button einbinden
      this.refs.downloadCanvas.classList.remove("d-none");

      // Hier hat der Nutzer alle Schritte durchlaufen und muss ggf. zum kompletten Endresultat geleitet werden
      alert("Ende");
      return;
      // Ende des Prozesses
    }

    // Nutzer speichert zum ersten mal nur seine Zeichung 

    // MIttels Callback die eigene Zeichnung im State speichern
    this.setState(
      { ownDrawing: canvasAsSVG },
      () => {

        // Gespeicherten Objekt aus State in zweitem Canvas Darstellen
        fabric.loadSVGFromString(this.state.ownDrawing, function (objects, options) {
          var obj = fabric.util.groupSVGElements(objects, options);
          canvas2.add(obj).renderAll();
        });

        // Oberen Canvas leeren
        canvas.clear();
        this.refs.extendetArea.style.display = '';

        // Hier angeben das nur noch Zusammengeschoben werden muss
        this.setState({ composingMode: true })
        // Kosmetik
        this.disableButtons();

        // ToDO: Check ob dran ist!
        // Wenn die Person dran ist, muss im composedImage State zwingend das Canvas vom vordermann sein
        // Dann kann hier dieses Canvas in den unteren Bereich geladen werden
        this.loadExternalCanvas();

      }
    );
  };

  // Gespeicherten Objekt in zweitem Canvas Darstellen
  loadExternalCanvas = () => {

    // Sicherheit, falls kein Canvas/SVG vom Vordermann im State ist, dann abbruch
    if (this.state.composedImage.length == 0) {
      return;
    }

    // SVG zu Canvas und in den unteren Canvas rein
    fabric.loadSVGFromString(this.state.composedImage, function (objects, options) {
      var obj = fabric.util.groupSVGElements(objects, options);
      canvas2.add(obj).renderAll();
    });

  }


  // Kosmetik
  disableButtons = () => {
    this.refs.drawingMode.style.display = 'none';
    // Finales Speichern der Komposition besser bennant
    this.refs.saveCanvas.innerHTML =
      ' <i className="fas fa-pen"></i> Bild Zusammenstellung Speichern und beenden';

  }

  // Download Funktion fuer den zusammengebauten Canvas / Nur am Ende benutzbar / momentan noch in Arbeit
  downloadCanvas = () => {

    canvas.clear();
    fabric.loadSVGFromString(this.state.composedImage, function (objects, options) {
      var obj = fabric.util.groupSVGElements(objects, options);
      canvas.add(obj).renderAll();
    });

    var link = document.createElement("a");
    var imgData = canvas.toDataURL({
      format: 'png',
      multiplier: 4
    });
    var strDataURI = imgData.substr(22, imgData.length);
    var blob = this.dataURLtoBlob(imgData);
    var objurl = URL.createObjectURL(blob);

    link.download = "Drawing.png";

    link.href = objurl;

    link.click();

  }



  render() {
    return (
      <Fragment>
        <Header />
        <article className={'mainsec'}>

          <div className="container draw-area">
            <div className="d-flex justify-content-around bd-highlight">
              <div className="p-2 bd-highlight">
                <canvas id="c" width="800" height="600">Sorry, your browser doesn't support the &lt;canvas&gt; element.</canvas>
              </div>
              <div className="p-2 bd-highlight">
                <h2>Zeichenbereich</h2>
                <div className="controll-area">
                  <button
                    name="TestName4"
                    value="Testvalue4"
                    text="TEs4"
                    ref="copy"
                    className="btn btn-info"
                    onClick={this.copy} ><i className="fas fa-paste"></i> Objekt
            einfuegen</button>

                  <button
                    name="TestName"
                    value="Testvalue"
                    text="Test"
                    ref="drawingMode"
                    className="btn btn-info"
                    onClick={this.toggleDrawing} ><i className="fas fa-pen"></i> Zeichenbereich betreten</button>

                  <button
                    name="TestName2"
                    value="Testvalue2"
                    text="TEs2"
                    ref="deleteElement"
                    className="btn btn-warning"
                    onClick={this.deleteElement} ><i className="fas fa-eraser"></i> Element loeschen</button>


                  <button
                    name="TestName3"
                    value="Testvalue3"
                    text="TEs3"
                    ref="deleteCompleteCanvas"
                    className="btn btn-danger"
                    onClick={this.deleteCompleteCanvas} ><i className="fas fa-ban"></i> Zeichnenbereich leeren</button>


                  <button
                    name="TestName4"
                    value="Testvalue4"
                    text="TEs4"
                    ref="saveCanvas"
                    className="btn btn-success"
                    onClick={this.saveCanvas} ><i className="fas fa-save"></i> Bild final
                    abspeichern</button>


                  <button
                    name="TestName4"
                    value="Testvalue4"
                    text="TEs4"

                    ref="downloadCanvas"
                    className="btn btn-success d-none"
                    onClick={this.downloadCanvas} ><i className="fas fa-download"></i> Komposition Downloaden</button>

                  <div id="drawing-mode-options" ref="drawingModeOptions" style={{ display: 'none' }}>>
                    <label htmlFor="drawing-mode-selector">Mode:</label>
                    <select id="drawing-mode-selector" onChange={this.changeBrush}>
                      <option>Pencil</option>
                      <option>Circle</option>
                      <option>Spray</option>
                    </select><br></br>

                    <label htmlFor="drawing-line-width">Linienstaerke</label>
                    <input onChange={this.changeLineWidth} type="range" min="0" max="150" id="drawing-line-width"></input><br></br>

                    <label htmlFor="drawing-color">Schriftfarbe:</label>
                    <input type="color" onChange={this.changeColor} id="drawing-color"></input><br></br>
                  </div>
                </div>
              </div>



            </div>
          </div>


          <div ref="extendetArea" style={{ display: 'none' }}>
            <div className="main-galerie d-flex justify-content-center bd-highlight mb-2" style={{ display: 'none' }}>

              <div className="p-2 bd-highlight"><canvas height="600px" width="800px" id="c1"></canvas></div>
              <h2>Vorgaenger-Zeichnung </h2>
            </div>
          </div>
        </article>
      </Fragment >
    );
  }
}

export default Draw;
