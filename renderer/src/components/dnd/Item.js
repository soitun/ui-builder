import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getComponent } from '../../utils/componentMapper'
import * as layoutActions from '../../actions/layoutActions'

const Container = styled.div`
  transition: all 250ms ease-in-out;
  margin-bottom: 24px;
  transition: background-color 0.2s ease;
  background-color: ${props => (props.isDragDisabled ? 'lightgrey' : props.isDragging ? 'lightgreen' : 'transparent')};
  border-radius: 5px;
  border: ${props => (props.focused ? 2 : 0)}px dashed rgba(0, 0, 0, 0.25);
  padding: ${props => (props.focused ? 1 : 0)}px;
`

const Item = ({
  index, item, onItemClick, selectedComponent, selectComponent, ...rest
}) => {
  const Component = getComponent(item.name)
  const focused = selectedComponent ? item.id === selectedComponent.id : false

  const onClick = (evt) => {
    // Stopping the propagation is necessary
    // since the item can be a child of another Item
    evt.stopPropagation()
    selectComponent(item)
    onItemClick(evt, item)
  }

  return (
    <Draggable key={item.id} draggableId={item.id} index={index} {...rest}>
      {(provided, snapshot) => (
        <Container
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          isDragging={snapshot.isDragging}
          onClick={onClick}
          focused={focused}
        >
          <Component {...item.props} children={item.children} />
          {provided.placeholder}
        </Container>
      )}
    </Draggable>
  )
}

Item.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  onItemClick: PropTypes.func,
  selectedComponent: PropTypes.object,
}

Item.defaultProps = {
  onItemClick: () => {},
  selectedComponent: null,
}

function mapStateToProps (state) {
  return {
    selectedComponent: state.layout.selectedComponent,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ ...layoutActions }, dispatch)
}

// Connect the Item to redux since
// we need the currently selected item for the focus state
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Item)
