import React from "react";
import Colors from "./Category";
import { shallow } from "enzyme";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Category />, div);
  ReactDOM.unmountComponentAtNode(div);
});
