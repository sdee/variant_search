import React from 'react';
import PropTypes from 'prop-types';
import { mount } from 'enzyme';
import { MemoryRouter as Router } from 'react-router-dom';
import ResultsTable from '../../components/Results/ResultsTable';

const ReactDataGrid = require('react-data-grid');

var expect = require('expect.js');

describe('renders', t => {
    const mountWithRouter = node => mount(<Router>{node}</Router>);

    const wrappedResults = mountWithRouter(<ResultsTable />);
    // it('Something', function() {
    //     assert(pathMap['nurse/authorization']).toBe(ResultsTable);
    // });
    it('renders three <Foo /> components', () => {
        const wrapper = shallow(<ResultsTable />);
        expect(wrapper.find(ReactDataGrid)).to.be.ok();
 });
});
