import react from "react";
import axios from 'axios';
class form extends react.Component {
    state = {
        name: "",
        password: "",
        responsee: -1
    }
    emailChanged = (event) => {
        this.setState({ name: event.target.value })
    }
    passwordChanged = (event) => {
        this.setState({ password: event.target.value })
    }
    deneme = (degisken) => {
        this.setState({ response: degisken.data })
    }
    submit(event) {
        event.preventDefault();
    }
    button = async () => {
        let responseSayi = 10;
        const request = {
            "name": this.state.name,
            "password": this.state.password
        }

        console.log("once")
        await axios.post("http://localhost:5000/WeatherForecast", request)
            .then(respone => {
                console.log(respone.data.sayi)
                responseSayi = respone.data.sayi;


            })


        this.setState({ responsee: responseSayi })
    }




    render() {
        const alert = () => { // neden const yazmazsak hata veriyor.
            if (this.state.responsee == 0) {
                return (<div class="alert alert-danger" role="alert">
                    kullanici adi hatali <a href="#" class="alert-link">an example link</a>. Give it a click if you like.
                </div>)

            }
            else if (this.state.responsee == 1) {
                return (<div class="alert alert-danger" role="alert">
                    sifre hatali <a href="#" class="alert-link">an example link</a>. Give it a click if you like.
                </div>)

            }
            else if (this.state.responsee == 2) {
                return (<div class="alert alert-success" role="alert">
                    giris basarili <a href="#" class="alert-link">an example link</a>. Give it a click if you like.
                </div>)

            }
        }

        return (
            <div>
                {alert()}
                <form onSubmit={this.submit} width="10" >
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Email address</label>
                        <input type="text" onChange={this.emailChanged} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input type="password" onChange={this.passwordChanged} class="form-control" id="exampleInputPassword1" />
                    </div>
                    <button type="submit" class="btn btn-primary" onClick={this.button}>Submit</button>
                </form>
            </div>
        )
    }
}
export default form;