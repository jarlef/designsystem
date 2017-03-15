import { expect } from 'chai';
import sortData from './sort-data';

const columns = [
    { key: 'name', header: 'Name' },
    { key: 'age', header: 'Age' },
    { key: 'id', header: 'Employee-id' },
    { key: 'rand', header: 'A random number with thousand separator needs a custom compare', compare: (a, b) => a.replace(/\s/g, '') - b.replace(/\s/g, '') }
];

const data = [
    { name: 'Zombie Mountain', age: 36, id: 2, rand: '69 873' },
    { name: 'Daenerys Targaryen', age: 16, id: 4, rand: '9 156' },
    { name: 'Ned Stark', age: 48, id: 3, rand: '3 863 914' },
    { name: 'Jon Snow', age: 20, id: 1, rand: '145 678' }
];

describe('sortData', () => {

    it('should sort data in descending order' , () => {
        const ascendingTableData = sortData(columns, data, 'age', true);
        for (let i = 1; i > ascendingTableData.length; i++) {
            expect(ascendingTableData[i].id).to.be.below(ascendingTableData[i-1].id);
        }
    });

    it('should sort data in ascending order' , () => {
        const ascendingTableData = sortData(columns, data, 'age', false);
        for (let i = 1; i > ascendingTableData.length; i++) {
            expect(ascendingTableData[i].id).to.be.above(ascendingTableData[i-1].id);
        }
    });

    it('should sort data based on `sortBy` parameter' , () => {
        const tableData = sortData(columns, data, 'age', true);
        expect(tableData[0].age).to.equal(48);
        expect(tableData[1].age).to.equal(36);
        expect(tableData[2].age).to.equal(20);
        expect(tableData[3].age).to.equal(16);
    });

    it('should sort data with a custom compare function when provided' , () => {
        const tableData = sortData(columns, data, 'rand', false);
        expect(tableData[0].rand).to.equal('9 156');
        expect(tableData[1].rand).to.equal('69 873');
        expect(tableData[2].rand).to.equal('145 678');
        expect(tableData[3].rand).to.equal('3 863 914');
    });

});
