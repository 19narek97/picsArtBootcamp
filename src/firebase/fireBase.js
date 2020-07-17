import app from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyBidIf59EZCwU1lkuE_tt3eqa58gzyMK4c",
    authDomain: "picsart-bootcamp.firebaseapp.com",
    databaseURL: "https://picsart-bootcamp.firebaseio.com",
    projectId: "picsart-bootcamp",
    storageBucket: "picsart-bootcamp.appspot.com",
    messagingSenderId: "125192590761",
    appId: "1:125192590761:web:3f0bc0ddab358a01dea0b8"
};


class FireBase {
    constructor() {
        app.initializeApp(firebaseConfig)

        this.db = app.database();
        this.storage = app.storage();
    }


}

export default FireBase