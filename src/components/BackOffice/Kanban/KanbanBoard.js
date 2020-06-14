import React from 'react';
import {connect} from "react-redux";
import {taskEtatPATCH} from "../../../redux/actions/actions";

const mapStateToProps = state => ({
  userData: state.auth.userData
});

const mapDispatchToProps = {
  taskEtatPATCH
};

class KanbanBoard extends React.Component {

  drop = (e) => {
      e.preventDefault();
      const card_id = e.dataTransfer.getData('card_id');

      const card = document.getElementById(card_id);
      card.style.display = 'block';

      e.target.appendChild(card);

      console.log(e.currentTarget.attributes["id"].nodeValue);
      console.log(card.attributes["data-source"].nodeValue);
      if( card.attributes["data-source"].nodeValue !== e.currentTarget.attributes["id"].nodeValue ){

          //set doing state and date
          taskEtatPATCH(card.attributes["data-id"].nodeValue,e.currentTarget.attributes["id"].nodeValue);

          card.attributes["data-source"].nodeValue = e.currentTarget.attributes["id"].nodeValue;

          //Change card Color
          card.style.background = e.currentTarget.attributes["databackgroundcolor"].nodeValue;
          
      }
  }

  dragOver = (e) => {
    e.preventDefault();
    //console.log(e);
  }

  render() {
    return (
      <div className={this.props.className}
          id={this.props.id}
          databackgroundColor={this.props.databackgroundColor}
          onDrop={this.drop}
          onDragOver={this.dragOver}>
            { this.props.children }
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(KanbanBoard);