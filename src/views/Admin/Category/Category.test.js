import React from "react";
import Colors from "./Category";
import { shallow } from "enzyme";

it("renders without crashing", () => {
  shallow(<Category />);
});
