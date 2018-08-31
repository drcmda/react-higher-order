<span class="badge-patreon"><a href="https://www.patreon.com/0xca0a" title="Donate to this project using Patreon"><img src="https://img.shields.io/badge/patreon-donate-yellow.svg" alt="Patreon donate button" /></a></span> [![Build Status](https://travis-ci.org/drcmda/react-higher-order.svg?branch=master)](https://travis-ci.org/drcmda/react-higher-order) [![npm version](https://badge.fury.io/js/react-higher-order.svg)](https://badge.fury.io/js/react-higher-order) ![react version](https://badgen.now.sh/badge/react/16/green)

    npm install react-higher-order

## The old problem ...

```jsx
const RenderProps = ({ children }) => children({ value: 123 })

class Test extends React.Component {
  componentDidUpdate() {
    // How the hell do i access render props in here???
  }
  render() {
    return <RenderProps>{props => props.value}</RenderProps>
  }
}
```

## And the solution ...

```jsx
import hoc from 'react-higher-order'

const RenderProps = ({ children }) => children({ value: 123 })

@hoc(RenderProps, (props, ownProps) => ({ number: props[ownProps.accessor] }))
class Test extends React.Component {
  componentDidUpdate() {
    console.log(this.props.number)
  }
  render() {
    return this.props.number
  }
}

ReactDOM.render(<Test accessor="value" />, document.querySelector('#root'))
```

## API

    hoc(RenderPropsComponent, mapRenderPropsToProps = props => props)(WrappedComponent)

- `RenderPropsComponent` is the component you want to fold into
- `mapRenderPropsToProps` is optional and defaults to `props => props`, use it to pick the props you are interested in. You can also use this to selectively access only a portion of the RenderPropComponent's props, your own component will then only render if these props change. You have access to the components own-props as a second argument.
- `WrappedComponent` is the component that is going to receive the props.

## Contributions

All my open source projects are done in my free time, if you like any of them, consider helping out, all contributions are welcome as well as donations, for instance through [Patreon](https://www.patreon.com/0xca0a).
