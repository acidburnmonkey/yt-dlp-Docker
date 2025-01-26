"use strict";
import { useState } from "react";

import Item from "./components/items.jsx";
import { readFiles } from "./serverSide.js";

function Home() {
  return (
    <div className="home">
      <div className="listBox">
        <div className="listItem">
          <Item arg={something} />
        </div>
      </div>
    </div>
  );
}

export default Home;
