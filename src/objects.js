import NativeLayer from "./Components/Layer/NativeLayer";

class ObjectObj {
    constructor (jsx, ofx=0, ofy=0){
        this.jsx = jsx
        this.ofx = ofx
        this.ofy = ofy
    }
    render = (key) => {
        return (
            <div key={key} style={{position: "relative", top: this.ofy + "px", left: this.ofx + "px"}}>
                {this.jsx}
            </div>
        )
    }
}

class LayerObj {
    constructor(props) {
        for(let key in props){
            this[key] = props[key]
        }
        if (!(props.uid + 1)) throw new Error('Uid for layer is not specified')
    }

    objects = [new ObjectObj((<div>sadsad</div>), 100, 100)]

    sublayers = [
        this.selfLayer
    ];

    addSublayer = (sublayer) => {
        this.sublayers.push(sublayer);
    }

    addObject = (obj) => {
        console.log(typeof obj)
    }
    
    get selfLayer() {
        return (<NativeLayer uid={this.uid} objs={this.objects} />)
    }

}
export default { LayerObj, ObjectObj};