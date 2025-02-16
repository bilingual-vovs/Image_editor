class Layer {
    constructor() {
    }

    objects = []

    sublayers = [
        this.selfLayer
    ];

    addSublayer(sublayer) {
        this.sublayers.push(sublayer);
    }
    
    get selfLayer() {
        return new Layer(this.objects);
    }
}
export default Layer;