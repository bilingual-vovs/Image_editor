class LayerObj {
    constructor(props) {
        for(let key in props){
            this[key] = props[key]
        }
        if (!(props.uid + 1)) throw new Error('Uid for layer is not specified')
    }

    objects = []

    sublayers = [
        this.selfLayer
    ];

    addSublayer(sublayer) {
        this.sublayers.push(sublayer);
    }
    
    // get selfLayer() {
    //     return new LayerObj(this.objects);
    // }
}
export default LayerObj;