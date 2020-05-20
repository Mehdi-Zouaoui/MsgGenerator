const MessageFactory = require('./messageFactory');

class Flow {
    constructor(authorArray , speed , socialNetwork , keywords , model , minNumber , maxNumber) {

        this.minNumber = minNumber;
        this.maxNumber = maxNumber;
        this.authorArray = authorArray;
        this.speed = speed;
        this.socialNetwork = socialNetwork;
        this.keywords = keywords;
        this.model = model.split('\n');
        this.message = new MessageFactory(this.keywords, this.model , this.minNumber , this.maxNumber);
        this.timeout = null;
        console.log('flow model' ,this.model);

    }

    start() {
        this.author = this.authorArray[Math.floor(Math.random() * this.authorArray.length)];
        console.log(this.author + ' / ' + this.message.generateMessage());
        this.timeout = setTimeout(this.start.bind(this), this.speed*1000);

    }

    stop() {
        clearTimeout(this.timeout);
        console.log('Flow stopped');
    }
}

module.exports = Flow;
