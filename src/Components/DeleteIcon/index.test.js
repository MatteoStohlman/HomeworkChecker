import React from 'react';
import { mount , shallow} from 'enzyme';
import renderer from 'react-test-renderer';
import DeleteIcon from './index';

describe('Delete Icon',() => {
  test('basic DeleteIcon renders and snapshot', () => {
    shallow(<DeleteIcon/>)
    const DefaultIcon = renderer.create(
      <DeleteIcon/>
    );
    expect(DefaultIcon.toJSON()).toMatchSnapshot();

    //Test case where valid icon name prop is passed
    const CustomIcon = renderer.create(
      <DeleteIcon iconName='close'/>
    );
    expect(CustomIcon.toJSON()).toMatchSnapshot();

    //Test case where invalid icon name prop is passed
    const BadCustomIcon = renderer.create(
      <DeleteIcon iconName='failing'/>
    );
    expect(BadCustomIcon.toJSON()).toMatchSnapshot();
  });

  test('DeleteIcon handles a non function in onClick',() => {
    const icon = mount(<DeleteIcon onClick='green'/>)
    icon.find('DeleteIcon').simulate('click')
  })

  test('DeleteIcon calls back the onClick prop',()=>{
    const mockCallBack = jest.fn();
    const icon = mount((<DeleteIcon onClick={mockCallBack}/>))
    icon.find('DeleteIcon').simulate('click')

    expect(mockCallBack.mock.calls.length).toEqual(1)
  })
})
