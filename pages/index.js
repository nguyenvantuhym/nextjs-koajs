import React from 'react'
import Link from 'next/link'
import Css from './../components/css'
import 'isomorphic-unfetch'
import { Icon, Table,Container,Grid } from 'semantic-ui-react'


export default class index extends React.Component {
    static async getInitialProps() {
        let res = await fetch('https://cloudreports.net/sample/api/countries.json')
        let contriesObj = await res.json()
        console.log(contriesObj)
        return {countries: contriesObj}
    }

    render() {
        return (
            <div>
                <Css/>
                <h2>Country list</h2>
                <Container fluid>
                    {this.props.countries.map((country, i) => {
                        return (
                            <Table celled striped key={'country-' + i}>
                                <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell colSpan='3'>{country.name}</Table.HeaderCell>
                                </Table.Row>
                                </Table.Header>
                            </Table>
                            
                        )
                    })}
                </Container>
            </div>
        )
    }
}
