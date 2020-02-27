import {Meteor} from 'meteor/meteor';
import {Users} from "../../../db/index";

Meteor.publish('Users', () => {
    return Users.find();
});
