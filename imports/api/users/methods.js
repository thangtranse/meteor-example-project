import {Meteor} from 'meteor/meteor'
import {check} from "meteor/check";

import {Users} from '/db';

Meteor.methods({
    'user.register'(data) {
        const user = Users.findOne({'emails.0.address': data.email});
        if (user) {
            throw new Meteor.Error(500, 'email_already_taken',
                'Email already taken');
        }

        check(data, {
            email: String,
            password: String,
            firstName: String,
            lastName: String
        });

        return Accounts.createUser({
            email: data.email,
            password: data.password,
            profile: {
                firstName: data.firstName,
                lastName: data.lastName,
            }
        });
    },

});
