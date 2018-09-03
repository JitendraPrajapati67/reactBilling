import React from "react";
import Colors from "./Invoice";
import { shallow } from "enzyme";

it("renders without crashing", () => {
  shallow(<Invoice />);
});
