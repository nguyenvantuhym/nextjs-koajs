import React from 'react'
import Router from 'next/router'
import Css from './../components/css'
import axios from 'axios';
import { Icon, Table,Container,Grid } from 'semantic-ui-react'


export default class index extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            listUser:[]};
    }

    static async getInitialProps() {

      
        const ls = ['van tu','duy manh'];
        return {listuser:ls};
    
    }

    componentDidMount = async()=>
    {
        let res = await axios({
            method:'get',
            url:'/api/getalluser'
        });
        console.log(res.data);
        if(res.data.success ===true)
            this.setState({...this.state,listUser:res.data.data});
        else
        {
            Router.push("/login");
        }


    }
    

    render() {
        return (
            <div>
                <Css/>
                <h2>Country list</h2>
                <Container fluid>
                    {
                        this.state.listUser.map((user,i)=>{
                            return(
                                <li  key={'name-' + i} >{user.username}</li>
                            )
                           
                        })
                    }
                </Container>
            </div>
        )
    }
}
