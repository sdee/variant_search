import React from 'react';
import { mount, render, shallow } from 'enzyme';
import { Route, MemoryRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom';
import ResultsTable from '../../components/Results/ResultsTable';
import SearchField from '../../components/Search/SearchField';
var TestUtils = require('react-dom/test-utils')

const ReactDataGrid = require('react-data-grid');

const expect = require('expect.js');

describe('renders', (t) => {
    it('renders variants table', () => {

        const table = mount(
            <Router initialEntries={['/gene/EYS']}>
                <ResultsTable
                  params={{
                      geneName: 'EYS',
                  }}
                />
            </Router>,
      );

        const table2 = TestUtils.renderIntoDocument(
            <ResultsTable
              params={{
                  geneName: 'EYS',
              }}
            />);

        const table3 = render(
                <ResultsTable
                  params={{
                      geneName: 'EYS',
                  }}
                />);

        console.log(table.debug());
        console.log(table3.text())

        expect(table.find(ReactDataGrid).length).equal(1);
        expect(table3.text()).to.contain('Variants for EYS');
    });
});
