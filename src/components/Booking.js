import React, { Component } from 'react';
import Select from 'react-select'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from 'react-time-picker';

const weekdays = [1, 2, 3, 4, 5];
const weekends = [0, 6]

export default class Booking extends Component {

    constructor(props) {
        super(props) 

        this.state = {
            numberOfHoursOptions: [
                { value: 1, label: '1' },
                { value: 2, label: '2' },
                { value: 3, label: '3' },
                { value: 4, label: '4' },
                { value: 5, label: '5' },
                { value: 6, label: '6' },
                { value: 7, label: '7' },
                { value: 8, label: '8' },
            ],
            selectedHours: { value: 0 },
            dateOfBooking: new Date(),
            timeOfBooking: '10:00',
            bookings: []
        }
    }

    submitBooking = (id) => {
        this.setState(prevState => ({
            bookings:[...prevState.bookings, {
                id: id,
                numberOfHours: this.state.selectedHours.value,
                dateOfBooking: this.state.dateOfBooking,
                timeOfBooking: this.state.timeOfBooking
            }]
        }))

        console.log(this.state.bookings)
    }

    handleHoursChange = (selectedHours) => {
        this.setState({ selectedHours });
    }

    handleDateChange = (date) => {
        this.setState({ dateOfBooking: date })
    }

    render() {
        return (
        <div className='flex justify-center items-center h-screen'>
            <div className='bg-white rounded-lg p-5 w-[475px] h-[517.87px]'>
                
                <div className='text-5xl font-semibold mb-3'>
                    Booking
                </div>

                <div className='flex gap-x-4 justify-center'>
                    <div>
                        <div className='flex items-center gap-x-2 mb-1'>
                            <label>
                                How long are you booking for?
                            </label>
                            <Select options={this.state.numberOfHoursOptions}
                            onChange={this.handleHoursChange}
                            value={this.state.selectedHours} />
                        </div>

                        <div className='flex items-center gap-x-2 mb-1'>
                            <label>
                                Date of booking:
                            </label>
                            <div>
                                <DatePicker selected={this.state.dateOfBooking} 
                                onChange={this.handleDateChange}
                                dateFormat={"dd/M/yyyy"}
                                className='border-[1px] w-[100px] border-gray-500 text-center outline-0'
                                />
                            </div>
                        </div>

                        <div className='flex items-center gap-x-2'>
                            <div>
                                Time of Booking:
                            </div>
                            
                            <div>
                                <TimePicker
                                    onChange={time => this.setState({timeOfBooking: time})}
                                    value={this.state.timeOfBooking}
                                />
                            </div>
                        </div>
                    </div>

                    <div className='bg-gray-200 p-2 rounded'>
                        <h1 className='font-semibold'>
                            Receipt
                        </h1>

                        <div>
                            {weekdays.includes(this.state.dateOfBooking.getDay()) && 
                            <div>
                                <div>
                                    $100 x {this.state.selectedHours.value} hours
                                </div>

                                <div className='text-red-600 font-semibold'>
                                    Total ${100 * this.state.selectedHours.value}
                                </div>
                            </div>
                            }

                            {weekends.includes(this.state.dateOfBooking.getDay()) && 
                            <div>
                                $150 x {this.state.selectedHours.value} hours
                            </div>
                            }
                        </div>
                    </div>

                </div>


                <div>
                    <button className='p-2 bg-blue-500 text-white rounded w-full mt-5'
                    onClick={() => this.submitBooking(this.state.bookings.length)}>
                        Book
                    </button>
                </div> 

                <hr className='mt-4 mb-2'/>

                <div>
                    <h1 className='text-center font-semibold text-xl mb-1'>
                        Your Bookings
                    </h1>

                    {this.state.bookings.length !== 0 ? 
                    <div className='max-h-[200px] overflow-y-scroll'>
                        {this.state.bookings.map((booking) => (
                            <div key={booking.id} className='text-center bg-gray-300 rounded py-2 mb-1'>

                                <div className='font-semibold'>
                                    {booking.dateOfBooking.getDate()}/{booking.dateOfBooking.getMonth() + 1}/{booking.dateOfBooking.getFullYear()}
                                </div>
                                <div className=''>
                                    Booked for {booking.numberOfHours} {booking.numberOfHours > 1 ? "hours" : "hour"}
                                </div>
                                
                                <div>
                                    Booking starts at {booking.timeOfBooking}
                                </div>
                            </div>
                        ))}
                    </div> : null}
                </div>

            </div>
        </div>
        )
    }
}