import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap'
import { Nav } from 'react-bootstrap'

import "./App.css"

const cities = {
  Paris: {
    name: "Paris"
  },

  Tokyo: {
    name: "Tokyo"
  },

  Madrid: {
    name: "Madrid"
  },

  Moscow: {
    name: "Moscow"
  },

  Dublin: {
    name: "Dublin"
  },

  NewYork: {
    name: "New York"
  },

  Shanghai: {
    name: "Shanghai"
  },

  Sydney: {
    name: "Sydney"
  },

  KualaLumpur: {
    name: "Kuala Lumpur"
  },

  Seoul: {
    name: "Seoul"
  },
}



export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      weatherResult: null

    }
  }


  getCurrentWeather = async (lon, lat) => {
    let apiKey = process.env.REACT_APP_APIKEY
    console.log("heyheyhey", apiKey)
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    console.log(url)
    let data = await fetch(url)
    let result = await data.json()
    console.log("what is the result", result)
    this.setState({ weatherResult: result })
  }

  getCurrentCity = async (city) => {
    let apiKey = process.env.REACT_APP_APIKEY
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    console.log("hello hugo", url)
    let data = await fetch(url)
    let result = await data.json()
    console.log("what is the result", result)
    this.setState({ weatherResult: result })

  }

  getLocation = () => {
    navigator.geolocation.getCurrentPosition((post) => {
      this.getCurrentWeather(post.coords.longitude, post.coords.latitude)
    })
  }

  componentDidMount() {
    console.log("open your app already")
    this.getLocation()
  }

  render() {
    if (this.state.weatherResult == null) {
      return (<div> Loading</div >)
    }
    return (


      <div className="container-fluid text-white my-auto ">

        <div>
          <Nav className="mr-auto" >
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features" onClick={() => this.getCurrentCity("Paris")} >Paris</Nav.Link>
            <Nav.Link href="#pricing" onClick={() => this.getCurrentCity("Tokyo")}>Tokyo</Nav.Link>
            <Nav.Link href="#pricing" onClick={() => this.getCurrentCity("Madrid")}>Madrid</Nav.Link>
            <Nav.Link href="#pricing" onClick={() => this.getCurrentCity("Moscow")}>Moscow</Nav.Link>
            <Nav.Link href="#pricing" onClick={() => this.getCurrentCity("Dublin")}>Dublin</Nav.Link>
            <Nav.Link href="#pricing" onClick={() => this.getCurrentCity("New York")}>New-York</Nav.Link>
            <Nav.Link href="#pricing" onClick={() => this.getCurrentCity("Shanghai")}>Shanghai</Nav.Link>
            <Nav.Link href="#pricing" onClick={() => this.getCurrentCity("Sydney")}>Sydney</Nav.Link>
            <Nav.Link href="#pricing" onClick={() => this.getCurrentCity("Kuala Lumpur")}>Kuala-Lumpur</Nav.Link>
            <Nav.Link href="#pricing" onClick={() => this.getCurrentCity("Seoul")}>Seoul</Nav.Link>



          </Nav>


        </div>



        <div className="container mx-auto my-4 py-4 border rounded-circle">
          <div className="row justify-content-center text-center">
            <h1 className="col-12 display-4 my-2 py-3 text-success">What's the weather like today ?</h1>
            <h2 className="col-12">{this.state.weatherResult.name}</h2>
            <h3 className="col-12 text-danger">{this.state.weatherResult.main.temp}C</h3>
            <h3 className="col-12">{this.state.weatherResult.weather[0].description}</h3>

            <Button variant="primary btn-lg" >Hey do not click here</Button>{' '}
          </div>
        </div>
      </div >

    )
  }
}


