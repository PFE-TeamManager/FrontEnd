import React from 'react';

export class BugCards extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          startBoard : '',
          overBoard: ''
        }
    }

    dragStart = (e) => {
        const target = e.target;
        const id = e.target.attributes["data-id"].nodeValue;
        e.dataTransfer.setData('card_id',target.id);

        // setTimeout(()=>{
        //     target.style.display= "none";
        // }, 0);
        //console.log(e.currentTarget.parentNode.attributes["id"].nodeValue);
    }

    dragOver = (e) => {
        e.stopPropagation();
    }

    render() {
        return (
            <div className={this.props.className}
                id={this.props.id}
                data-id={this.props.dataid}
                data-source={this.props.datasource}
                draggable={this.props.draggable}
                onDragOver={this.dragOver}
                onDragStart={this.dragStart}
                style={{backgroundColor: this.props.backgroundColor}}>
                { this.props.children }
            </div>
        )
    }
}
