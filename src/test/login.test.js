import React from 'react';
import { shallow,mount } from 'enzyme';
import Login from "../modules/home/loginForTest"
import { BrowserRouter } from 'react-router-dom';
describe("rendering components", () => {
  it("renders App component without crashing", () => {
    shallow(<BrowserRouter> <Login /></BrowserRouter>
   );
  });
})
