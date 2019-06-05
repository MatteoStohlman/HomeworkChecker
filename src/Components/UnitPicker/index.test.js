import React from 'react';
import { mount , shallow} from 'enzyme';
import renderer from 'react-test-renderer';
import UnitPicker from './index';

test('basic UnitPicker renders and snapshot', () => {
  shallow(<UnitPicker/>)
  const picker = renderer.create(
    <UnitPicker/>
  );
  expect(picker.toJSON()).toMatchSnapshot();
});

test('test temperature only unit picker',() => {
  const checker = mount(<UnitPicker units='temperature'/>)
  checker.find('input').simulate('change', { target: { value: '' } })
  expect(checker.contains('Celsius')).toBe(true)
  expect(checker.contains('Gallons')).toBe(false)
})

test('test volume only unit picker',() => {
  const checker = mount(<UnitPicker units='volume'/>)
  checker.find('input').simulate('change', { target: { value: '' } })
  expect(checker.contains('Celsius')).toBe(false)
  expect(checker.contains('Gallons')).toBe(true)
})
