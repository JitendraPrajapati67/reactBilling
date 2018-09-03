import React from "react";
import Colors from "./Product";
import { shallow } from "enzyme";

it("renders without crashing", () => {
  shallow(<Product />);
});
