
class Auth {
    constructor() {
        this.logged = window.localStorage.getItem('logged');
        this.logged ? this.authenticated = true : this.authenticated  = false;
    }
    login() {
       this.authenticated = true;
       window.localStorage.setItem('logged' ,JSON.stringify(true));
    }
    logout() {
        this.authenticated = false;
        window.localStorage.removeItem('logged');
    }
    isAuthenticated() {
        return this.authenticated
    }
}
export default new Auth();
