import React from 'react';
import { render } from 'react-dom';
import PropTypes from "prop-types";

class List extends React.Component {
  static propTypes = {
    render: PropTypes.func.isRequired,
    url: PropTypes.string.isRequired,
  };

  state = {
    list: [],
    isLoading: false,
  };

  _fetch = async () => {
    const res = await fetch(this.props.url);
    const json = await res.json();

    this.setState({
      list: json,
      isLoading: false,
    });
  }

  componentDidMount() {
    this.setState({ isLoading: true }, this._fetch);
  }

  render() {
    return this.props.render(this.state);
  }
}

const App = () => (
  <div>
    <List 
      url="https://api.github.com/users/JoaoCnh/repos"
      render={({ list, isLoading }) => (
        <div>
          <h2>My repos</h2>
          {isLoading && <h2>Loading...</h2>}

          <ul>
            {list.length > 0 && list.map(repo => (
              <li key={repo.id}>
                {repo.full_name}
              </li>
            ))}
          </ul>
        </div>
      )} />
    
    <hr />

    <List
      url="https://api.github.com/repos/JoaoCnh/react-native-android-voice/contributors"
      render={({ list, isLoading }) => (
        <div>
          <h2>react-native-android-voice contributors</h2>
          {isLoading && <h2>Loading...</h2>}

          <ul>
            {list.length > 0 && list.map(dude => (
              <li key={dude.id}>
                {dude.login}
              </li>
            ))}
          </ul>
        </div>
      )} />
  </div>
);

render(<App />, document.getElementById('root'));