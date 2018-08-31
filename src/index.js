import React, { PureComponent } from 'React'

class RenderPure extends PureComponent {
  render() {
    const { children, ...props } = this.props
    return children(props)
  }
}

export default function(RenderProps, mapRenderPropsToProps = props => props) {
  return Component => props => (
    <RenderProps>
      {renderProps => (
        <RenderPure {...mapRenderPropsToProps(renderProps, props)}>
          {selectedProps => <Component {...props} {...selectedProps} />}
        </RenderPure>
      )}
    </RenderProps>
  )
}
