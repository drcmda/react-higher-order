    npm install react-higher-order

## The old problem ...

```jsx
const RenderProps = ({ children }) => children({ test: 123 })

class Test extends React.Component {
  componentDidUpdate() {
    // How the hell do i access render props in here???
  }
  render() {
    return <RenderProps>{props => props.test}</RenderProps>
  }
}
```

## And the solution ...

```jsx
import hoc from 'react-higher-order'

const RenderProps = ({ children }) => children({ test: 123 })

@hoc(RenderProps, (renderProps, ownProps) => ({
  hello: renderProps[ownProps.accessor],
}))
class Test extends React.Component {
  componentDidUpdate() {
    console.log(this.props.hello)
  }
  render() {
    return this.props.hello
  }
}

ReactDOM.render(<Test accessor="test" />, document.querySelector('#root'))
```

## API

    hoc(RenderPropsComponent, mapRenderPropsToProps)(WrappedComponent)

- `RenderPropsComponent` is the component you want to fold into
- `mapRenderPropsToProps` is optional and defaults to `props => props`, use it to pick the props you are interested in. You can also use this to selectively access only a portion of the RenderPropComponent's props, your own component will then only render if these props change. You have access to the components own-props as a second argument.
- `WrappedComponent` is the component that is going to receive the props.
