import React, {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    }
});

class Register extends Component {
    constructor() {
        super();
        this.state = {
            error: {
                fname: {
                    value: false,
                    content: ""
                },
                lname: {
                    value: false,
                    content: ""
                },
                email: {
                    value: false,
                    content: ""
                },
                password: {
                    value: false,
                    content: ""
                }
            }
        }
    }

    onSubmit = (data) => {
        data.preventDefault();
        if (data.target.firstName.value.trim().length === 0 ||
            !(/^[a-zA-Z]+$/).test(data.target.firstName.value.trim())) {
            this.setState({
                ...this.state,
                error: {
                    ...this.state.error,
                    fname: {
                        value: true,
                        content: "Vui lòng kiểm tra lại 'First Name'"
                    }
                }
            });
            return;
        }

        if (data.target.lastName.value.trim().length === 0 ||
            !(/^[a-zA-Z]+$/).test(data.target.lastName.value.trim())) {
            this.setState({
                ...this.state,
                error: {
                    ...this.state.error,
                    lname: {
                        value: true,
                        content: "Vui lòng kiểm tra lại 'Last Name'"
                    }
                }
            });
            return;
        }

        if (data.target.email.value.trim().length === 0 ||
            !(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(data.target.email.value.trim())) {
            this.setState({
                ...this.state,
                error: {
                    ...this.state.error,
                    email: {
                        value: true,
                        content: "Vui lòng kiểm tra lại"
                    }
                }
            });
            return;
        }

        if (data.target.password.value.trim().length < 3) {
            this.setState({
                ...this.state,
                error: {
                    ...this.state.error,
                    password: {
                        value: true,
                        content: "Mật khẩu bạn phải trên 3 ký tự!"
                    }
                }
            });
            return;
        }

        let value = {
            email: data.target.email.value.trim(),
            password: data.target.password.value.trim(),
            lastName: data.target.lastName.value.trim(),
            firstName: data.target.firstName.value.trim()
        };

        Meteor.call('user.register', value, (err) => {
            if (!err) {
                Meteor.loginWithPassword(value.email, value.password, (err) => {
                    if (!err) {
                        return FlowRouter.go("/")
                    }
                })
            }
        });
    };


    render() {
        const {classes} = this.props;
        return (
            <div className="authentication">
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={this.onSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="fname"
                                    name="firstName"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    error={this.state.error.fname.value}
                                    helperText={this.state.error.fname.content}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="lname"
                                    error={this.state.error.lname.value}
                                    helperText={this.state.error.lname.content}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    error={this.state.error.email.value}
                                    helperText={this.state.error.email.content}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    error={this.state.error.password.value}
                                    helperText={this.state.error.password.content}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary"/>}
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign Up
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(Register);
