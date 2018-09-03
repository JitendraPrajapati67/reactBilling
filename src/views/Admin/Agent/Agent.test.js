import React from "react";
import Colors from "./Agent";
import { shallow } from "enzyme";

it("renders without crashing", () => {
  shallow(<Agent />);
});
