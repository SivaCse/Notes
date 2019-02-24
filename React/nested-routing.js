/*Use the url/path match obtained from props this.props.match.path to get the path that is set to a component.

Define your main routes as below*/

<Router>
  <div>
    <Route exact path="/" component={DummyIndex} /> {/* Note-1 */}
    <Route path="/login" component={Login} />
    <Route path="/home" component={Home} />
    <Route path="/about" component={About} />
    <Route path="/etc" component={Etc} />
  </div>
</Router>
//Then in Home Component, define your routes

class Home extends Component {
  render() {
    return <div>
      <Route exact path={this.props.match.path} component={HomeDefault} />
      <Route path={`${this.props.match.path}/one`} component={HomePageOne} />
      <Route path={`${this.props.match.path}/two`} component={HomePageTwo} />
    </div>
  }
}
/*The defined routes are as below

/login
/home
/home/one
/home/two
/about
/etc*/