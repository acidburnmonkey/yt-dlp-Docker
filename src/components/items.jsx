'use strict';
import '../css/style.css';
import '../css/items.css';

function Item({ arg }) {
  return (
    <div className="item">
      <h3 className="itemName">{arg.name}</h3>
      <div className="date">
        <p> {arg.mDate} </p>
      </div>
      <div className="item-rename">
        <button className="item-rename">  </button>
      </div>
    </div>
  );
}

export default Item;
