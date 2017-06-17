const Card = (props) => {
	return (
  	<div style={{margin:10}}>
      <img width="100" src={props.avatar_url} />
      <div style={{display:'inline-block', marginLeft:10}}>
          <div style={{fontWeight:'bold'}}>
            {props.name}
          </div>
          <div>
            {props.company}
          </div>
      </div> 
    </div>
  )
}



const CardList = (props) => {
	return (
  	<div>
      {props.cards.map( card => <Card {...card} /> )}
    </div>
  )
}

class Form extends React.Component{
	
  	state = {
    	userName: ''
    }

		handleSubmit = (event) => {
    		event.preventDefault();
        axios.get(`https://api.github.com/users/${this.state.userName}`)
        .then(response => {
        		this.props.onNewRecord(response.data);
        })
    }

    render(){
        return (
          <form onSubmit={this.handleSubmit}>
            <input value={this.state.userName} 
            onChange={(event)=> { this.setState({userName: event.target.value}) } }
            type="text" placeholder="github username" required/>
            <input type="submit" value="Fetch" />
          </form>
        )
    }	
}

class App extends React.Component{
	
  state = {
  	cards: 
    		[
				]
  }
  
  addNewRecord = (record) => {
  		
      this.setState(prevState => ({
      	cards: prevState.cards.concat(record)
      }))
  }

	render(){
  
  	
  
  	return (
        <div>
          <Form onNewRecord={this.addNewRecord} />
          <CardList cards={this.state.cards} />
        </div>
        )
  }
}

ReactDOM.render(<App /> , mountNode);