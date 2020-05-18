

class Flow {
    constructor(authorArray, message , speed , socialNetwork) {
        this.message = message;
        this.authorArray = authorArray;
        this.timeout = null;
        console.log(this.authorArray.length);

    }

    start() {
        console.log('Flow started');
        this.author = this.authorArray[Math.floor(Math.random() * this.authorArray.length)];
        console.log(this.author + ' / ' + this.message);
        this.timeout = setTimeout(this.start.bind(this), 2000)
    }

    stop() {
        clearTimeout(this.timeout);
        console.log('Flow stopped');
    }
}

module.exports = Flow;
