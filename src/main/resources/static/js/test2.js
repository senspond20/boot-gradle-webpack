class Size {
    #width;
    #height;

    constructor(w, h) {
        this.#width = w;
        this.#height = h;
    }

    getWidth() {
        return this.#width;
    }

    getHeight() {
        return this.#height;
    }
}

function start() {
    var mySize = new Size(40, 60);
    JavaMethods.printWidthOf(mySize);
}

