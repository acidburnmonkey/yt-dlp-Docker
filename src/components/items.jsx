'use strict';
import '../css/items.css';

function Item({ arg }) {
  const rename = () => {
    alert(arg.name);
  };

  return (
    <div className="item">
      <h3 className="itemName">{arg.name}</h3>
      <div className="date">
        <p> {arg.mDate} </p>
      </div>
      <div className="item-rename">
        <button className="button-rename" onClick={rename}>
          
        </button>
      </div>
    </div>
  );
}

export default Item;
