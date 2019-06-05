import React from 'react';
import { mount , shallow} from 'enzyme';
import renderer from 'react-test-renderer';
import ConversionChecker from './index';

test('basic ConversionChecker renders and snapshot', () => {
  shallow(<ConversionChecker/>)
  const picker = renderer.create(
    <ConversionChecker/>
  );
  expect(picker.toJSON()).toMatchSnapshot();
});

test('add row functionality works',() => {
  const checker = mount(<ConversionChecker/>)
  let firstRowCount = checker.find("ConversionRow").length
  checker.find('#addRowButton').first().simulate('click')
  let secondRowCount = checker.find("ConversionRow").length
  expect(firstRowCount+1===secondRowCount).toBe(true)
})

test('remove row functionality works',() => {
  const checker = mount(<ConversionChecker/>)
  let firstRowCount = checker.find("ConversionRow").length
  checker.find('DeleteIcon').first().simulate('click')
  let secondRowCount = checker.find("ConversionRow").length
  expect(firstRowCount-1===secondRowCount).toBe(true)
})
