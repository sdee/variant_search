import React from 'react';
import { mount } from 'enzyme';
import LinearProgress from 'material-ui/LinearProgress';
import { Link } from 'react-router';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
  TableRow,
} from 'material-ui/Table';
import ResultsPage from '../../components/Results/ResultsPage';
import ResultsTable from '../../components/Results/ResultsTable';

const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

const mock = new MockAdapter(axios);
const expect = require('expect.js');

const muiTheme = getMuiTheme();

mock.onGet('/api/variants/EYS').reply(200,
[{"Inferred Classification": "Pathogenic", "Nucleotide Change": "", "Source": "ClinVar", "Chr": null, "Ref": null, "Reported Ref": null, "Protein Change": "", "Assembly": null, "Reported Alt": null, "Genomic Start": null, "Genomic Stop": null, "Other Mappings": "", "Submitter Comment": "", "URL": "https://www.ncbi.nlm.nih.gov/clinvar/RCV000000569", "Last Updated": "2017-04-25", "Region": "", "Reported Classification": "Pathogenic", "Alias": "", "Transcripts": "", "Gene": "EYS", "Last Evaluated": "2008-11-01", "Accession": null, "Alt": null}, {"Inferred Classification": "Pathogenic", "Nucleotide Change": "NM_001142800.1:c.1767-24596_2023+238135del", "Source": "ClinVar", "Chr": null, "Ref": null, "Reported Ref": null, "Protein Change": "", "Assembly": null, "Reported Alt": null, "Genomic Start": null, "Genomic Stop": null, "Other Mappings": "NM_001142800.1:c.1767-24596_2023+238135del,NC_000006.12:g.65057728_65320715del", "Submitter Comment": "", "URL": "https://www.ncbi.nlm.nih.gov/clinvar/RCV000000566", "Last Updated": "2017-04-25", "Region": "", "Reported Classification": "Pathogenic", "Alias": "", "Transcripts": "NM_001142800.1,NC_000006.12", "Gene": "EYS", "Last Evaluated": "2008-11-01", "Accession": null, "Alt": null}, {"Inferred Classification": "Pathogenic", "Nucleotide Change": "NM_001142800.1:c.2260-51191_2992+45990del", "Source": "ClinVar", "Chr": null, "Ref": null, "Reported Ref": null, "Protein Change": "", "Assembly": null, "Reported Alt": null, "Genomic Start": null, "Genomic Stop": null, "Other Mappings": "NM_001142800.1:c.2260-51191_2992+45990del,NC_000006.12:g.64840707_64997105del", "Submitter Comment": "", "URL": "https://www.ncbi.nlm.nih.gov/clinvar/RCV000000565", "Last Updated": "2017-04-25", "Region": "", "Reported Classification": "Pathogenic", "Alias": "", "Transcripts": "NM_001142800.1,NC_000006.12", "Gene": "EYS", "Last Evaluated": "2008-11-01", 'Accession': null, 'Alt': null}]);

describe('results page', (t) => {
    it('renders properly', () => {
        const page = mount(
            <ResultsPage
              params={{
                  geneName: 'EYS',
              }}
            />,
            {
                context: { muiTheme },
                childContextTypes: { muiTheme: React.PropTypes.object },
            },
      );
        expect(page.find(Link).length).equal(1);
        expect(page.find(LinearProgress).length).equal(1);

    });
});

describe('results table', (t) => {
    it('renders properly', () => {

        const columns = ['Gene', 'Nucleotide Change'];
        const rows = [{ Gene: 'CYP2A6', 'Nucleotide Change': 'NM_000762.5:c.479T>A' },
                      { Gene: 'ACADVL', 'Nucleotide Change': 'NM_000018.3:c.1182+1G>A' }];

        const table = mount(
            <ResultsTable

              columns={columns} rows={rows}

            />,
            {
                context: { muiTheme },
                childContextTypes: { muiTheme: React.PropTypes.object },
            },
      );
        expect(table.find(TableRow).length).equal(3);

    });
});
