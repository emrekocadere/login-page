import React from "react";
import axios from 'axios';

class registerForm extends React.Component {
    state = {
        name: "",
        password: "",
        againPassword: "",
        response: -1
    } 
    nameChanged = (event) => {
        this.setState({ name: event.target.value })
    }
    passwordChanged = (event) => {
        this.setState({ password: event.target.value })
    }
    againPasswordChanged = (event) => {
        this.setState({ againPassword: event.target.value })
    }
    sendRequest=async()=>{ //--> bak buna
        const request = {
            "name": this.state.name,
            "password": this.state.password
        }
        if(this.state.password==this.state.againPassword)
        {
            let responeSayi;
            await axios.post("http://localhost:5000/WeatherForecast/deneme", request)
            .then(response => {
                console.log(response) 
                responeSayi=response.data.sayi;
            })
            this.setState({response:responeSayi})
          
        }
        else
        this.setState({response:4})
    }
    submit(event)
    {
        event.preventDefault();
    }
    render() {
        const alert = () => { // neden const yazmazsak hata veriyor.

             if (this.state.response == 4) {
                return (<div class="alert alert-danger" role="alert">
                    <b>sifreler ayni degil</b>
                </div>)

            }
            else if (this.state.response == 2) {
                return (<div class="alert alert-success" role="alert">
                    <b>basariyla kayit olundu </b>
                </div>)

            }
        }
        return (
            <div>
                  {alert()}
            <form  onSubmit={this.submit}>
                <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"onChange={this.nameChanged} />
                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"onChange={this.passwordChanged} />
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Again Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword2" placeholder="Again Password" onChange={this.againPasswordChanged}/>
                </div>

                <button type="submit" class="btn btn-primary" onClick={this.sendRequest}>Submit</button>
            </form>

            </div>
          
        )
    } 
}
export default registerForm;