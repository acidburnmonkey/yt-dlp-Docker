'use strict';
import '../style.css';

function Item({ arg }) {
    return (
        <div className="item">
            <h3 className="itemName">{arg.name}</h3>
            <p> {arg.mDate} </p>
            <div className="item-overlay">
                <button className="item-rename">  </button>
            </div>
        </div>
    );
}

export default Item;
