import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native/dist/styled-components.native.cjs'

import { Text, View, Image } from 'react-native'
import { getComponent } from '../../utils/componentMapper'
import Item from '../dnd/Item'

const StyledCard = styled.View`
  flex: 1;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.18);
  margin: 4px;
  /* android */
  elevation: 4;

  /* ios */
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.18;
  shadow-radius: 6px;
`

const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #222;
`

const Content = styled.View`
  padding: 8px;
`

const StyledImage = styled.Image`
  height: 240px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`

const ChildWrapper = styled.View`
  position: relative;
  z-index: 100 !important;
`

const CardComponent = ({
  title, children, image, ...rest
}) => (
  <StyledCard {...rest}>
    {image && (
      <StyledImage
        source={{
          uri: image,
        }}
        resizeMode="cover"
      />
    )}
    <Content>
      {title && <Title>{title}</Title>}
      {children.map((child, index) => (
        <Item index={index} item={child} key={`child-item-${index}`} />
      ))}
    </Content>
  </StyledCard>
)

export default CardComponent