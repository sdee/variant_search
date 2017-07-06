import React from 'react';
import { mount, render, shallow } from 'enzyme';
import { Route, MemoryRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom';
import ResultsTable from '../../components/Results/ResultsTable';

const TestUtils = require('react-dom/test-utils');
const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

import getMuiTheme from 'material-ui/styles/getMuiTheme';

// This sets the mock adapter on the default instance
const mock = new MockAdapter(axios);

const ReactDataGrid = require('react-data-grid');

const expect = require('expect.js');

//https://github.com/ReactTraining/react-router/issues/2121

const muiTheme = getMuiTheme();

mock.onGet('/api/variants/EYS').reply(200,
[{"Inferred Classification": "Pathogenic", "Nucleotide Change": "", "Source": "ClinVar", "Chr": null, "Ref": null, "Reported Ref": null, "Protein Change": "", "Assembly": null, "Reported Alt": null, "Genomic Start": null, "Genomic Stop": null, "Other Mappings": "", "Submitter Comment": "", "URL": "https://www.ncbi.nlm.nih.gov/clinvar/RCV000000569", "Last Updated": "2017-04-25", "Region": "", "Reported Classification": "Pathogenic", "Alias": "", "Transcripts": "", "Gene": "EYS", "Last Evaluated": "2008-11-01", "Accession": null, "Alt": null}, {"Inferred Classification": "Pathogenic", "Nucleotide Change": "NM_001142800.1:c.1767-24596_2023+238135del", "Source": "ClinVar", "Chr": null, "Ref": null, "Reported Ref": null, "Protein Change": "", "Assembly": null, "Reported Alt": null, "Genomic Start": null, "Genomic Stop": null, "Other Mappings": "NM_001142800.1:c.1767-24596_2023+238135del,NC_000006.12:g.65057728_65320715del", "Submitter Comment": "", "URL": "https://www.ncbi.nlm.nih.gov/clinvar/RCV000000566", "Last Updated": "2017-04-25", "Region": "", "Reported Classification": "Pathogenic", "Alias": "", "Transcripts": "NM_001142800.1,NC_000006.12", "Gene": "EYS", "Last Evaluated": "2008-11-01", "Accession": null, "Alt": null}, {"Inferred Classification": "Pathogenic", "Nucleotide Change": "NM_001142800.1:c.2260-51191_2992+45990del", "Source": "ClinVar", "Chr": null, "Ref": null, "Reported Ref": null, "Protein Change": "", "Assembly": null, "Reported Alt": null, "Genomic Start": null, "Genomic Stop": null, "Other Mappings": "NM_001142800.1:c.2260-51191_2992+45990del,NC_000006.12:g.64840707_64997105del", "Submitter Comment": "", "URL": "https://www.ncbi.nlm.nih.gov/clinvar/RCV000000565", "Last Updated": "2017-04-25", "Region": "", "Reported Classification": "Pathogenic", "Alias": "", "Transcripts": "NM_001142800.1,NC_000006.12", "Gene": "EYS", "Last Evaluated": "2008-11-01", 'Accession': null, 'Alt': null}]);


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
            {
                context: { muiTheme },
                childContextTypes: { muiTheme: React.PropTypes.object },
            },
      );

        // const table2 = TestUtils.renderIntoDocument(
        //     <ResultsTable
        //       params={{
        //           geneName: 'EYS',
        //       }}
        //     />);

        const table3 = render(
            <ResultsTable
              params={{
                  geneName: 'EYS',
              }}
            />, {
                context: { muiTheme },
                childContextTypes: { muiTheme: React.PropTypes.object },
            });

        console.log(table.debug());
        // console.log(table2.debug());
        console.log(table3.text())

        expect(table.find(ReactDataGrid).length).equal(1);
        expect(table3.text()).to.contain('Variants for EYS');
    });
});
