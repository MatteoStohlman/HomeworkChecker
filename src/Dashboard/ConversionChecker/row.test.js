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
})
