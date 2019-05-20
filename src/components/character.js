import React, { Component } from 'react';
import CharacterDescription from './characterDescription';
import CharacterPicture from './characterPicture';
import './character.css';
import axios from 'axios';

const mortiApi = axios.create({
    baseURL: 'https://rickandmortyapi.com/api/character/',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default class Character extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isLoaded: false,
            error: null,
            max: 493
        }
    }

    takeHeroes(queryString) {
        fetch("https://rickandmortyapi.com/api/character/" + queryString)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    this.setState({
                        isLoaded: true,
                        items: result,
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.

                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )

        fetch('https://rickandmortyapi.com/api/character/')
            .then(res => { return res.json() })
            .then((res) => {
                this.setState({
                    max: res.info.count
                })
            });
    }

    formQueryString(from, to) {
        const array = [];

        while (from <= to) {
            array.push(from);
            from++;
        }
        return array.join();
    }

    async getMaxHeroId() {
        const response = await mortiApi.get();
        const maxId = response.data.info.count;
        return maxId;
    }

    componentDidMount() {
        this.takeHeroes(this.formQueryString(1, 9));
    }

    takePrev = () => {
        const firstElementId = this.state.items[0].id;
        if (firstElementId <= 1) {

        } else {
            const from = firstElementId - 9;
            const to = firstElementId - 1;
            const queryString = this.formQueryString(from, to);
            this.takeHeroes(queryString);
            console.log('show from', from, 'to', to);
        }

    }

    takeNext = () => {
        const lastElementId = this.state.items[this.state.items.length - 1].id;
        if (lastElementId < this.state.max) {
            const from = lastElementId + 1;
            const to = lastElementId + 9;
            const queryString = this.formQueryString(from, to);
            this.takeHeroes(queryString);
            console.log('show from', from, 'to', to);
        }
    }

    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div className="preloaderContainer">
                <div className="preloader"></div>
            </div>;
        } else {

            return (

                <div>
                    <header>Rick And Morty Heroes</header>
                    <ul className="heroContainer">

                        {items.map(item => (

                            <li key={item.name + item.id} className="heroItem" >
                                <CharacterDescription name={item.name} />
                                <CharacterPicture imageSrc={item.image} />
                            </li>
                        ))}

                    </ul>
                    <div className="buttonBlock">

                        {(this.state.items[0].id === 1) ?

                            <button className="btn" onClick={this.takePrev} disabled>&#60; PREV</button>
                            :
                            <button className="btn" onClick={this.takePrev}>&#60; PREV</button>
                        }

                        {(this.state.items[this.state.items.length - 1].id < this.state.max) ?

                            <button className="btn" onClick={this.takeNext}>NEXT &#62;</button>
                            :
                            <button className="btn" onClick={this.takeNext} disabled>NEXT &#62;</button>
                        }
                    </div>
                </div>
            );
        }
    }
}

