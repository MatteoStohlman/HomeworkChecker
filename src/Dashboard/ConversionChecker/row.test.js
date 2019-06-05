import React from 'react';
import { mount , shallow} from 'enzyme';
import renderer from 'react-test-renderer';
import Row from './row';

describe('ConversionTableRow',() => {
  test('basic Row renders and snapshot', () => {
    shallow(<Row/>)
    const picker = renderer.create(
      <Row/>
    );
    expect(picker.toJSON()).toMatchSnapshot();
  });

  test('row calculates to value',() => {
    const row = mount(<table><tbody><Row/></tbody></table>)
    row.find('.fromInput').first().find('input').first().props().onChange({target:{value:'32'}})
    row.find('UnitPicker').first().props().onChange({type:'temperature',value:'fahrenheit'})
    row.find('UnitPicker').at(1).props().onChange({type:'temperature',value:'celsius'})
    row.update()
    console.log(row.debug());
  })
})
