
class Auth {
    constructor() {
        this.authenticated = false
    }
    login() {
       this.authenticated = true;
    }
    logout(callback) {
        this.authenticated = false;
        callback();
    }
    isAuthenticated() {
        return this.authenticated
    }
}
export default new Auth();
