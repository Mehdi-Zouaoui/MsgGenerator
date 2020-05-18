class Flow {
    constructor(authorArray, message) {
        this.message = message;
        this.authorArray = authorArray;
        this.isStarted = false
    }

    start() {
        this.isStarted = true;
        console.log('Flow started');
        while (this.isStarted) {
            this.author = this.authorArray[Math.floor(Math.random() * this.authorArray.length)];
            console.log(this.author + ' / ' + this.message)
        }
    }

    stop() {
        this.isStarted = false;
        console.log('Flow stopped');
    }
}

module.exports = Flow;
