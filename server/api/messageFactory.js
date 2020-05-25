 class MessageFactory{

    constructor(keywords , model , minNumber , maxNumber){
        this.keywords = keywords;
        this.model = model;
        this.min = minNumber;
        this.max = maxNumber;
        this.generatedMessage = '';
    }

    generateMessage() {
        this.generatedMessage = '';
        this.model.forEach(model => {
            if(model === '[number]'){
                this.generatedMessage += Math.floor(Math.floor(Math.random() * (this.max - this.min)+this.min));;
            }
            if(model === '[word]'){
                this.generatedMessage += this.keywords[Math.floor(Math.random() * this.keywords.length)];
            }
        });
        return this.generatedMessage;
    }
}

module.exports = MessageFactory;
