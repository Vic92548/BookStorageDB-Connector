// import { Database } from './db.js';

const addr = '127.0.0.1';
const port = 42600;
const username = 'anonymous';
const password = '';        
const room = 'room_1';
let user;

let db = new Database(addr, port, async () => {

    console.log(`Connected to ${addr}:${port}`);

    await db.connect(username, password);

    console.log(`Connected to database with ${username}`);

    // await db.create('users');
    
    await db.open('users');

    /*db.get('room2').then(value => {
        console.log('get value: ' + value);
        document.getElementById('message').textContent = value;
    });
    
    db.sync('room1').then(value => {
        console.log('room1 message: ' + value);
        document.getElementById('1').textContent = value;
    });
    
    db.sync('room2').then(value => {
        console.log('room2 message: ' + value);
        document.getElementById('2').textContent = value;
    });*/

    user = new User('Dylan');
    // let userNameKeyPath = `${room}/${user.id}/name`;
    
    await db.set('users', user.name);
    
    // Bind user name to database
    db.bind(user, 'name', 'users');
    
    // Synchronize user name
    db.sync('users').then(value => {
        user.name = value;
        document.getElementById('1').textContent = value;
    });
    
});

class User {

    constructor(name) {
        this.name = name;
        this.id = User.id;
    }

    static get id() {
        return User._id = 'user_' + (User._id | 0) + 1;
    }
}