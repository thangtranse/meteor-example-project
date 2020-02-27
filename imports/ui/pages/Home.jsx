import React from 'react';

export default class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            number: -1
        }
    }
    getRandomNumber = () =>  {
        Meteor.call('find.random_number',(err, number) => {
           this.setState({number})
        });
    };

    submit = (data) => {
        Meteor.call('method.checkString', data.myValue, (err, result) => {
            if(err) {
                return alert(err.details);
            }
            console.log(result);
        });
    };

    render() {
        const {number} = this.state;

        return (
            <div className="home">
                <button onClick={this.getRandomNumber}>Get Random number</button>
                <p>My random number: {number}</p>
            </div>
        )
    }
}
