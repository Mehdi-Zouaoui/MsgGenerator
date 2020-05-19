 class MessageFactory{

    constructor(keywords , model){
        this.keywords = keywords;
        this.model = model;
        this.message = "";
        this.timeout = null;
        console.log(this.keywords)
    }


    generateMessage() {
        this.message = this.keywords[Math.floor(Math.random() * this.keywords.length)] ;
        return this.message;
    }
}

module.exports = MessageFactory;
