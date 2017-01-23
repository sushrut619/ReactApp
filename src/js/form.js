/**
 * Created by sushr on 20-Dec-16.
 */
import React, {Component} from 'react';
var request = require('superagent');

var data = {
    getAppointments: function (appointment, callback) {
        request
            .get('/doctors/' + appointment.name + '/' + appointment.date)
            .set('Accept', 'application/json')
            .end(function (err, res) {
                callback(err, res.body);
            });
    },

    makeAppointment: function (appointment, callback) {
        request
            .post('/appointment/new')
            .type('form')
            .send(appointment)
            .end(function (err, res) {
                callback(err, res.body);
            });
    },

    changeAppointment: function (appointment, callback) {
        request
            .put('/appointment/edit')
            .type('form')
            .send(appointment)
            .end(function (err, res) {
                callback(err, res.body);
            });
    },

    deleteAppointment: function (appointment, callback) {
        request
            .delete('/remove/' + appointment.name + '/' + appointment.subject)
            .end(function (err, res) {
                callback(err, res.body);
            });
    }

};


class AppointmentForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "Doctor name",
            time: {
                hour: "00",
                minutes: "00",
                second: "00"
            },
            date: {
                year: "2016",
                month: "12",
                day: "20"
            },
            subject: "new patient",
            notes: "",
            message: "Appointment details appear here",
            validData: false
        };
        this.updateState = this.updateState.bind(this);
        this.displayResponse = this.displayResponse.bind(this);
        this.makeAppointment = this.makeAppointment.bind(this);
        this.editAppointment = this.editAppointment.bind(this);
        this.viewAll = this.viewAll.bind(this);
        this.deleteAppointment = this.deleteAppointment.bind(this);

        this.updateDoctor = this.updateDoctor.bind(this);
        this.updateDate = this.updateDate.bind(this);
        this.updateTime = this.updateTime.bind(this);
        this.updateSubject = this.updateSubject.bind(this);
        this.updateNotes = this.updateNotes.bind(this);
    };

    updateState(appointmentData, callback) {

        if (this.state.date.day <= 31 && this.state.date.day > 0 && this.state.date.month > 0 && this.state.date.year < 3000 && this.state.date.year >= 2016) {
            if (this.state.time.hour < 24 && this.state.time.hour >= 0 && this.state.time.minutes < 60 && this.state.time.minutes >= 0) {
                this.setState({
                    validData: true,
                    message: ""
                });
                callback(appointmentData, this.displayResponse);
            } else {
                this.setState({
                    validData: false,
                    message: "Invalid data !"
                });
            }
        } else {
            this.setState({
                validData: false,
                message: "Invalid data !"
            });
        }
    }

    displayResponse(err, messageText) {
        var newMessage = "got this " + JSON.stringify(messageText, null, 2);
        console.log("response received");
        this.setState({
            message: newMessage
        });
    }

    makeAppointment() {
        var newAppointment = {
            name: this.state.name,
            date: this.state.date.year + '-' + this.state.date.month + '-' + this.state.date.day,
            time: this.state.time.hour + ':' + this.state.time.minutes + ':' + this.state.time.second,
            subject: this.state.subject,
            notes: this.state.notes
        };

        this.updateState(newAppointment,data.makeAppointment);

    }

    editAppointment() {
        var newAppointment = {
            name: this.state.name,
            date: this.state.date.year + '-' + this.state.date.month + '-' + this.state.date.day,
            time: this.state.time.hour + ':' + this.state.time.minutes + ':' + this.state.time.second,
            subject: this.state.subject,
            notes: this.state.notes
        };

        this.updateState(newAppointment, data.changeAppointment);

    }

    viewAll() {
        var appointmentData = {
            name: this.state.name,
            date: this.state.date.year + '-' + this.state.date.month + '-' + this.state.date.day
        };

        this.updateState(appointmentData, data.getAppointments);

    }

    deleteAppointment() {

        var appointmentData = {
            name: this.state.name,
            subject: this.state.subject
        };

        this.updateState(appointmentData, data.deleteAppointment);

    }

    updateDoctor(event) {
        this.setState({
            name: event.target.value
        });
    }

    updateDate() {
        this.setState({
            date: {
                year: this.year.value,
                month: this.month.value,
                day: this.day.value
            }

        });
    }

    updateTime() {
        this.setState({
            time: {
                hour: this.hour.value,
                minutes: this.minutes.value,
                second: "00"
            }
        });
    }

    updateSubject(event) {
        this.setState({
            subject: event.target.value
        });
    }

    updateNotes(event) {
        this.setState({
            notes: event.target.value
        });
    }

    render() {
        return (
            <div className="container">
                <textarea readOnly="true" ref={(ref) => this.message = ref} className="form"
                          value={this.state.message}/>
                <div className="form">
                    <button type="submit" onClick={this.makeAppointment} className="button-success">New</button>
                    {"  "}
                    <button onClick={this.editAppointment} className="button-primary">Update</button>
                    {"  "}
                    <button onClick={this.viewAll} className="button-primary">View</button>
                    {"  "}
                    <button onClick={this.deleteAppointment} className="button-danger">Delete</button>
                    <p></p>
                    <br></br>
                    <p></p>

                    <form id="contactform">
                        <label>Name
                            <input ref={(ref) => this.doctorName = ref} value={this.state.name}
                                   onChange={this.updateDoctor}></input>
                        </label>

                        <fieldset>
                            <label>Date</label>
                            <label className="month">
                                <select ref={(ref) => this.month = ref} value={this.state.date.month}
                                        onChange={this.updateDate} className="select-style">
                                    <option value="00">Month</option>
                                    <option value="01">January</option>
                                    <option value="02">February</option>
                                    <option value="03">March</option>
                                    <option value="04">April</option>
                                    <option value="05">May</option>
                                    <option value="06">June</option>
                                    <option value="07">July</option>
                                    <option value="08">August</option>
                                    <option value="09">September</option>
                                    <option value="10">October</option>
                                    <option value="11">November</option>
                                    <option value="12">December</option>
                                </select>
                                {" "}
                                <label><input ref={(ref) => this.day = ref} className="birthday" style={{textAlign:'right'}}
                                              onChange={this.updateDate} value={this.state.date.day}></input>Day</label>
                                {" "}
                                <label><input ref={(ref) => this.year = ref} className="birthday" style={{textAlign:'right'}}
                                              onChange={this.updateDate}
                                              value={this.state.date.year}></input>Year</label>
                            </label>
                        </fieldset>
                        <fieldset>
                            <label>Time
                                <label><input ref={(ref) => this.hour = ref} className="birthday" style={{textAlign:'right'}}
                                              onChange={this.updateTime}
                                              value={this.state.time.hour}></input>Hour</label>
                                {" "}
                                <label><input ref={(ref) => this.minutes = ref} className="birthday" style={{textAlign:'right'}}
                                              onChange={this.updateTime} value={this.state.time.minutes}></input>Minutes</label>
                            </label>
                        </fieldset>
                        <label>Subject
                            <input ref={(ref) => this.subject = ref} value={this.state.subject}
                                   onChange={this.updateSubject}></input>
                        </label>

                        <label>Notes
                            <input ref={(ref) => this.notes = ref} value={this.state.notes}
                                   onChange={this.updateNotes}></input>
                        </label>
                    </form>
                </div>
            </div>
        );
    }
}


export default AppointmentForm;
