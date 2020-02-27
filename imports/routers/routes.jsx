import React from 'react'
import {FlowRouter} from 'meteor/kadira:flow-router'
import {mount} from 'react-mounter'

import TemplateVistor from '../ui/layouts/TemplateVisitor'
import Template from '../ui/layouts/Template'

import NotFound404 from '../ui/pages/NotFound404'
import Login from '../ui/pages/Users/Login'
import Register from '../ui/pages/Users/Register'
import Home from '../ui/pages/Home'

const trackRouteEntry = (context, redirect) => {
    if (!Meteor.userId()) {
        redirect("/login");
    }
};

const userAuthen = FlowRouter.group({
    prefix: "/",
    name: "Home",
    triggersEnter: [trackRouteEntry],
});

userAuthen.route('/', {
    action() {
        mount(Template, {
            content: <Home/>
        })
    }
});

FlowRouter.route('/login', {
    name: 'Login',
    triggersEnter: [(context, redirect) => {
        if (Meteor.userId()) {
            redirect("/");
        }
    }],
    action() {
        mount(TemplateVistor, {
            content: <Login/>
        })
    }
});

FlowRouter.route('/register', {
    name: 'register',
    triggersEnter: [(context, redirect) => {
        if (Meteor.userId()) {
            redirect("/");
        }
    }],
    action() {
        mount(TemplateVistor, {
            content: <Register/>
        })
    }
});

FlowRouter.notFound = {
    action() {
        mount(Template, {
            content: <NotFound404/>
        })
    }
};
