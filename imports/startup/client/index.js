import '/imports/routers';

import {DDP} from 'meteor/ddp-client'
import {Meteor} from 'meteor/meteor'

const data2 = DDP.connect("localhost:9000");
const CnxCurContents = new Mongo.Collection('RocketChat', {connection: data2});

console.log("Data", data2.status());

const userLogin = data2.call("login", {
    "user": {"username": "thangtm"},
    "password": {
        "digest": "1e343799be34307652b42c7e5a70656807e9e751a5b57b463e03db26ab772d0a",
        "algorithm": "sha-256"
    }
}, (error, data) => {
    if (!error) {
        data2.subscribe('stream-room-messages', "GENERAL", {"useCollection":false,"args":[]}, (error, data) => {
            console.log("general", error);
            console.log("general", data)
        });
    }
});


console.log("userLogin", userLogin)
console.log("CnxCurContents", CnxCurContents);

Meteor.publish('RocketChat', function () {
    return CnxCurContents.find();
});
