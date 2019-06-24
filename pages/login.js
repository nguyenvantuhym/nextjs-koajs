import React from 'react'
import Link from 'next/link'
import axios from 'axios'
import Css from './../components/css';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

class LoginForm extends React.Component {
 constructor(props)
 {
  super(props);
   this.state={
     username:'',
     password:''
   }
   this.changeUsername = this.changeUsername.bind(this)
   this.changePassWord = this.changePassWord.bind(this);
   this.submitData = this.submitData.bind(this);
   
 }
  changeUsername()
  {
    return(
      (event)=>{
        
        console.log(this.state);
        this.setState({
          ...this.state,
          username:event.target.value
        })

      }
    )
  }
  changePassWord()
  {
    return(
      (event)=>{
        
        console.log(this.state);
        this.setState({
          ...this.state,
          password:event.target.value
        })

      }
    )
  }
  submitData()
  {
    console.log("suvmit");
    if(this.state.username !== '' && this.state.password !== '')
    {

      axios({
        method:'post',
        url:'/signin',
        data:this.state
      }).then((res)=>{
        console.log(res.data);
      });
    }
  }

  render(){
  return(
    <div>
     <Css/>
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            <Image src='https://react.semantic-ui.com/logo.png' /> Log-in to your account
          </Header>
          <Form size='large'>
            <Segment stacked>
              <Form.Input 
              fluid 
              icon='user' 
              iconPosition='left' 
              placeholder='E-mail address' 
              onChange={this.changeUsername()}
              value={this.state.username} 
              />

              <Form.Input
                value={this.state.password}
                onChange={this.changePassWord()}
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                type='password'
              />

              <Button color='teal' fluid size='large' onClick={this.submitData} >
                Login
              </Button>
            </Segment>
          </Form>
          <Message>
            New to us? <Link href="/signup"><a>Sign Up</a></Link>
          </Message>
        </Grid.Column>
      </Grid>
      </div>)
  }
}



export default LoginForm