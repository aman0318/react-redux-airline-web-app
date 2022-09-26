import React from 'react';
import { shallow,mount } from 'enzyme';
import Header from "../modules/home/header"
import { BrowserRouter } from 'react-router-dom';
describe("rendering components", () => {
  it("renders App component without crashing", () => {
    shallow(<BrowserRouter> <Header /></BrowserRouter>
   );
  });
})
