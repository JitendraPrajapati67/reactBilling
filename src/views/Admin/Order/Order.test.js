import React from "react";
import Colors from "./Order";
import { shallow } from "enzyme";

it("renders without crashing", () => {
  shallow(<Order />);
});
