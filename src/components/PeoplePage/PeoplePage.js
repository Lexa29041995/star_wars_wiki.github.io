import React from 'react';
import ItemsList from '../ItemsList'
import DetailsInfo from '../DetailsInfo'

import './PeoplePage.css'
import ErrorComponent from '../ErrorComponent';
import SwapiServices from '../../services/SwapiServices';

const Row = ({ left, right}) => {
    return (
        <div className = 'Row d-flex row '>
            <div className= 'col'>
                {left}
            </div>
            <div className = 'col'>
                {right}
            </div>
        </div>
    );
}

export default class PeoplePage extends React.Component {

    swapi = new SwapiServices();

    state = {
        selectedPerson: 3,
        error: false,
    }

    componentDidCatch() {
        this.setState({ error: true});
    }

    onPersonSelect = (id) => {
        this.setState({
            selectedPerson: id
        });
      }

    render () {
        if (this.state.error) {
            return <ErrorComponent />
        }

        const itemsList = (
            <ItemsList 
                    onItemClick = {this.onPersonSelect} 
                    getData = {this.swapi.getAllPeople}
                    renderItem = {(item) =>
                         `${item.name}
                            (${item.gender}, ${item.mass}kg)`
                    }
                />
        )

        const detailInfo = (
            <DetailsInfo 
                    personId = {this.state.selectedPerson}
            />
        )

        return (
            <div className ='PeoplePage'>
                <Row left = {itemsList} right = {detailInfo} />
            </div>
        )
    }
}
