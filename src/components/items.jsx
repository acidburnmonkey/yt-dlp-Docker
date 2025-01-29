'use strict';

function Item({ arg }) {
  return (
    <div>
      <h3 className="item">{arg.name}</h3>
      <p> {arg.mDate} </p>
      <div className="item-overlay">
        <button className="item-rename"> </button>
      </div>
    </div>
  );
}

export default Item;
