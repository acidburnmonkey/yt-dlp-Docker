"use strict";

function Item({ arg }) {
  return (
    <div>
      <h2 className="item">{arg.name}</h2>
      <p>{arg.date}</p>
    </div>
  );
}

export default Item;
