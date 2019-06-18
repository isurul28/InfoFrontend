import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            total: this.props.location.total,
            REACT_APP_EMAILJS_USERID: 'user_17Y3yksLiJyYnOXq04djD',
            templateId: 'template_IldEFUEB',
            receiverEmail: '',
            formSubmitted: false,
            feedback: 'Test'
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.sendFeedback = this.sendFeedback.bind(this);
        this.addPaymentDetails = this.addPaymentDetails.bind(this);
    }

    onSubmit(event) {

        event.preventDefault();

        const feedback = {
            fname: this.refs.fname.value,
            lname: this.refs.lname.value,
            email: this.refs.email.value,
            postcode: this.refs.postcode.value,
            
        }
        
        

        const { templateId, receiverEmail } = this.state;
        
        console.log(feedback, 'onSubmit')
        

            this.sendFeedback(
                templateId,
                this.sender,
                this.refs.email.value,
                this.state.feedback,
                this.refs.lname.value,
                this.refs.fname.value,
                feedback.cost
                


            );

            this.setState({
                formSubmitted: true
            });
            
            this.addPaymentDetails(feedback);
        
    }
    
    
    sendFeedback(templateId, senderEmail, receiverEmail, feedback,lname,fname) {
        window.emailjs
            .send('mailgun', templateId, {
                senderEmail,
                receiverEmail,
                feedback,
                lname,
                fname,
                
                
                
            })
            .then(res => {
                console.log('MAIL SENT!')
                this.setState({
                    formEmailSent: true
                });
            })
            // Handle errors here however you like
            .catch(err => console.error('Failed to send feedback. Error: ', err));
    }

    addPaymentDetails(userdetail) {
        
        
            axios.request({
                method: 'post',
                url: 'http://localhost:3000/api/buyers',
                data: userdetail
            }).then(response => {
                alert("Payment Successful!");
                this.props.history.push('/');

            }).catch(err => console.log(err));
        
    }

    render() {


    




        return (
            <div>

                <br />



                <div className="row">

                    <form id="myform" className="col s12" onSubmit={this.onSubmit}>
                        <Link className="btn blue darken-3" to="/">Back</Link>
                        <ul className="collection">
                            <li className="collection-item">Register</li>
                            <li className="collection-item">

                                <div className="input-field col s6">
                                    <i className="material-icons prefix">face</i>
                                    <input id="firstname" type="text" className="validate" ref="fname" required />
                                    <label htmlFor="first_name">Frist Name</label>

                                </div>
                                <div className="input-field col s6">
                                    <i className="material-icons prefix">face</i>
                                    <input id="lastname" type="text" className="validate" ref="lname" name="lname" required />
                                    <label htmlFor="last_name">Last Name</label>

                                </div>


                                <div className="input-field col s6">
                                    <i className="material-icons prefix">email</i>
                                    <input id="email" type="email" className="validate" ref="email" required />
                                    <label htmlFor="email">Email</label>
                                </div>

                               

                                <div className="input-field col s6">
                                    <i className="material-icons prefix">credit_card</i>
                                    <input id="card_number" type="number" className="validate" required onInput={(e)=>{ 
                                        e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)}} min={10}  />
                                    <label htmlFor="card_number">Student ID Number </label>

                                </div>

                                <div className="input-field col s6">
                                    <i className="material-icons prefix">lock</i>
                                    <input id="password" type="password" className="validate"  />
                                    <label htmlFor="password">Password</label>

                                </div>

                                <div className="input-field col s6">
                                    <i className="material-icons prefix">lock</i>
                                    <input id="repassword" type="password" className="validate" />
                                    <label htmlFor="repass"> Re-Type Password</label>

                                </div>





                               
                            </li>

                        </ul>
                        <input type="submit" className="btn green" value="Sign Up" />






                    </form>
                </div>

            </div>
        )
    }
}



export default Register;
