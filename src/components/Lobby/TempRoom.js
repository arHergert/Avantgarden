import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {Progress} from "reactstrap";
import axios from "axios";
import ip from "../ipConfig";


class TempRoom extends Component {

    constructor(props) {
        super(props);
        this.state = {
            order: -1,
            canvasLoaded: false,
            currUser: null,
            //Eigenes gemaltes Bild
            ownDrawing: null,

            //Wurde bereits gemalt und muss nur noch zusammengesetzt werden?
            composingMode: false,

            //Zusammengesetztes Bild
            composedImage: null
        };
    }



    // Aendert die Farbe des Stiftes
    changeColor = (e) => {
        canvas.freeDrawingBrush.color = event.target.value;

    };

    // Aendert die Art des Pinsels
    changeBrush = (e) => {
        canvas.freeDrawingBrush = new fabric[event.target.value + 'Brush'](canvas);
    };

    // Aendert die Dicke des Pinsels
    changeLineWidth = (e) => {
        canvas.freeDrawingBrush.width = parseInt(event.target.value, 10) || 1;
    };


    getCanvasData = (drawOrder, roomId) => {
        if(this.state.ownDrawing === null){

            /*if(window.canvas === null) {
                //Canvas zum zeichenen (der obere)
                window.canvas = new fabric.Canvas('c');

                // Hilfsablage fuer den Copyschritt
                window._clipboard = null;
                this.setState({canvasLoaded: true})
            }*/


            let canvasTemp;

            try {
                console.log("Aufruf getCanvasData");
                if(sessionStorage.getItem("drawOrder") > 1){
                    axios.get(`${ip.client}/api/rooms/canvas/${roomId}/get/${drawOrder}`)
                        .then( res => {
                            canvasTemp = res.data;
                            /*console.log("RES: ",canvasTemp);*/

                        })
                        /*.then( () => this.setState({oneDrawing: canvasTemp.first}))
                        .then( () => this.setState({composedImage: canvasTemp.second}))*/
                        .then(() => this.state.ownDrawing = canvasTemp.first )
                        .then(() => this.state.composedImage = canvasTemp.second )
                        .then( () => console.log("Fetched Canvas Objects!"))
                        .catch(err => console.error(err));
                }
                /*console.log("Eigenes: ",this.state.ownDrawing);
                console.log("Vorheriges: ",this.state.composedImage);*/
                //canvas.add(this.state.ownDrawing);
                //canvas.add(this.state.composedImage);
            }catch (e) {
                console.error(e);
            }
        } else {

           if(!this.state.canvasLoaded){
               fabric.loadSVGFromString(this.state.ownDrawing, function (objects, options) {
                   var obj = fabric.util.groupSVGElements(objects, options);
                   canvas.add(obj).renderAll();
               });

               fabric.loadSVGFromString(this.state.composedImage, function (objects, options) {
                   var obj = fabric.util.groupSVGElements(objects, options);
                   canvas.add(obj).renderAll();
               });
               this.state.canvasLoaded = true;
           }

        }

    };

    setCurrentUser = () => {
        this.props.room.users.forEach( user => {
            if(user._id === this.props.userId){
                this.state.currUser = user;
            }
        });
    };

    componentDidMount() {

        try{
            this.setCurrentUser();

            if(sessionStorage.getItem("drawOrder") != -1){
                sessionStorage.setItem("drawOrder", this.state.currUser.drawOrder);
            }
        }catch (e) {

        }

        //Canvas zum zeichenen (der obere)
        window.canvas = new fabric.Canvas('c');

        // Hilfsablage fuer den Copyschritt
        window._clipboard = null;

        //"Ablage-"Canvas um das eigene und das Vorgaengerbild auszuwaehlen
        window.canvas2 = new fabric.Canvas('c1');
    }

    // Kopiere von den einen Canvas in den anderen (An der Stelle nur mit Canvas
    // Objekten da an anderer Stelle die SVG Objekte aus
    // den State in Canvas Objekte gewandelt werden)
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
    };

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
        }
    };

    // Hilfsmethode fuer den Download der Zeichnungen
    dataURLtoBlob = (dataurl) => {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
    };


    // Ausgewaeltes Objekt aus dem Canvas loeschen
    deleteElement = (e) => canvas.remove(canvas.getActiveObject());

    // Kompletten Canvas leeren
    deleteCompleteCanvas = (e) => canvas.clear();

    // Komposition speichern
    //
    saveComposition = (e) => {

        // Sicherheitsabfrage
        var result = confirm(
            'Möchtest du diese Komposition abgeben?\nDer Raum wird anschließend geschlossen und das Bild wird heruntergeladen!'
        );
        if (!result) {
            return;
        }

        // Canvas in SVG speichern
        let canvasAsSVG = canvas.toSVG();

        console.log(canvasAsSVG);

        this.downloadCanvas();



        /* // Wenn Bereits im Zusammenstell Modus (Der Zeichenschritt wurde bereits durchgefuehrt und gespeichert)
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
         );*/
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

    };


    // Kosmetik
    disableButtons = () => {
        this.refs.drawingMode.style.display = 'none';
        // Finales Speichern der Komposition besser bennant
        this.refs.saveCanvas.innerHTML =
            ' <i className="fas fa-pen"></i> Bild Zusammenstellung Speichern und beenden';

    };

    // Download Funktion fuer den zusammengebauten Canvas / Nur am Ende benutzbar / momentan noch in Arbeit
    downloadCanvas = () => {

        /*canvas.clear();
        fabric.loadSVGFromString(this.state.composedImage, function (objects, options) {
            var obj = fabric.util.groupSVGElements(objects, options);
            canvas.add(obj).renderAll();
        });*/

        var link = document.createElement("a");
        var imgData = canvas.toDataURL({
            format: 'image/jpeg',
            multiplier: 4
        });
        var strDataURI = imgData.substr(22, imgData.length);
        var blob = this.dataURLtoBlob(imgData);
        var objurl = URL.createObjectURL(blob);

        link.download = "Drawing.png";

        link.href = objurl;

        link.click();
        this.props.startEndRoom();

    };

    getLayers = () => {
        /*//Canvas zum zeichenen (der obere)
        window.canvas = new fabric.Canvas('c');

        // Hilfsablage fuer den Copyschritt
        window._clipboard = null;

        //"Ablage-"Canvas um das eigene und das Vorgaengerbild auszuwaehlen
        window.canvas2 = new fabric.Canvas('c1');*/
        //canvas.add(this.state.ownDrawing);
        //canvas.add(this.state.composedImage);

        fabric.loadSVGFromString(this.state.ownDrawing, function (objects, options) {
            var obj = fabric.util.groupSVGElements(objects, options);
            canvas.add(obj).renderAll();
        });

        fabric.loadSVGFromString(this.state.composedImage, function (objects, options) {
            var obj = fabric.util.groupSVGElements(objects, options);
            canvas.add(obj).renderAll();
        });

    };

    render() {
      if(sessionStorage.getItem("drawOrder") < 2){
          return (
              <div className={"draw-room_content-load"}>
                  <div className={"draw-room_text"}>
                      {/*{sessionStorage.getItem("drawOrder")}*/}
                      Bitte warten! Du bist bald dran :)
                  </div>
                  <div className={"draw-room_load"}>
                      <Progress animated color="success" value={100}/>
                  </div>
              </div>
          );
      }
        return (
            <Fragment>
                {this.getCanvasData(sessionStorage.getItem("drawOrder"), this.props.room._id)}
               {/* <button
                    onClick={() => this.getLayers}> Canvas Laden</button>*/}
                <div className="container draw-area">
                    <div className="d-flex justify-content-around bd-highlight">
                        <div className="p-2 bd-highlight">
                            <canvas id="c" width="1280" height="700">Sorry, your browser doesn't support the &lt;canvas&gt; element.</canvas>
                        </div>
                        <div className="p-2 bd-highlight draw-area_tools">
                            <div className={"draw-area_tools-title"}>Tools</div>
                            <div className="controll-area">
                                {/*<button
                                    name="TestName4"
                                    value="Testvalue4"
                                    text="TEs4"
                                    ref="copy"
                                    className="btn-draw btn-info"
                                    onClick={this.copy} ><i className="fas fa-paste"></i> Objekt
                                    einfuegen</button>*/}

                                {/*<button
                                    name="TestName"
                                    value="Testvalue"
                                    text="Test"
                                    ref="drawingMode"
                                    className="btn-draw btn-info"
                                    onClick={this.toggleDrawing} ><i className="fas fa-pen"></i> Zeichnen </button>*/}

                                {/*<button
                                    name="TestName2"
                                    value="Testvalue2"
                                    text="TEs2"
                                    ref="deleteElement"
                                    className="btn-draw btn-warning"
                                    onClick={this.deleteElement} ><i className="fas fa-eraser"></i> Element loeschen</button>
*/}

                                {/*<button
                                    name="TestName3"
                                    value="Testvalue3"
                                    text="TEs3"
                                    ref="deleteCompleteCanvas"
                                    className="btn-draw btn-danger"
                                    onClick={this.deleteCompleteCanvas} ><i className="fas fa-ban"></i> Zeichnenbereich leeren</button>*/}


                                <button
                                    name="TestName4"
                                    value="Testvalue4"
                                    text="TEs4"
                                    ref="saveCanvas"
                                    className="btn-draw btn-success"
                                    onClick={this.saveComposition} ><i className="fas fa-save"></i> Zeichnen beenden</button>


                                <button
                                    name="TestName4"
                                    value="Testvalue4"
                                    text="TEs4"

                                    ref="downloadCanvas"
                                    className="btn-draw btn-success d-none"
                                    onClick={this.downloadCanvas} ><i className="fas fa-download"></i> Komposition Downloaden</button>

                                <div id="drawing-mode-options" ref="drawingModeOptions" style={{ display: 'none' }}>
                                    <label htmlFor="drawing-mode-selector"> Brush:</label>
                                    <select id="drawing-mode-selector" onChange={this.changeBrush}>
                                        <option>Stift</option>
                                        <option>Kreis</option>
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
            </Fragment >
        );
    }
}

TempRoom.propTypes = {
    room: PropTypes.object,
    userId: PropTypes.string,
    userDrawOrder: PropTypes.number,
    startEndRoom: PropTypes.func
};


export default TempRoom;
