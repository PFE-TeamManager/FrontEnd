import React from 'react';

class Formulaire extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            placeholder : '',
            valeur : ''
        }
    }

    //event : fine tra l'evenement dyal change
    //event.target.value : valeur dyal hadak li tra fih l'evenment change
    handleChange = (event) => {
        this.setState(
            {
                valeur : event.target.value.toUpperCase()
            }
        )
    }

    handleCIN = (event) => {
        if( event.target.value.length < 2 ){
            this.setState(
                {
                    placeholder : "CIN INVALIDE"
                }
            )
        } else {
            this.setState(
                {
                    valeur : event.target.value
                }
            )
        }
    }

    render(){
        return (
            <form>
                <label>
                    Nom : 
                    {/* onChange : evenment comme onClick , sauf que onChange traite 
                                    les changements qui sont arrivés dans l'input */}
                    <input type="text" name="nom" 
                        value={this.state.valeur} 
                        onChange={this.handleChange} />
                </label>
                <label>
                    CIN : 
                    {/* onChange : evenment comme onClick , sauf que onChange traite 
                                    les changements qui sont arrivés dans l'input */}
                    <input type="text" name="cin"
                        placeholder={this.state.placeholder}
                        value={this.state.valeur} 
                        onChange={this.handleCIN} />
                </label>
                <input type="submit" value="Envoyer" />
            </form>
        );
    }
}

export default Formulaire;