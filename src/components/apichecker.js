import React,{Component} from 'react';


class ApiChecker extends Component{
    state = {
        data: {}
    }

    componentDidMount(){
        fetch('https://coronavirus-tracker-api.herokuapp.com/all')
        .then(res => res.json())
        .then(result => 
            this.setState({ data: result })
        )
        .catch(err => console.log(err))
    }

    render(){
        let res= this.state.data;
        console.log(res.latest, res.last_updated, res);
        return (
            <div>
                <h1>Heina</h1>
            </div>
        );
    }

}

export default ApiChecker;