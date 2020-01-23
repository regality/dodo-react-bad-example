import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  onAddTweet (tweet) {
    this.setState({ newTweet: tweet })
  }

  onTweetAdded () {
    this.setState({ newTweet: null })
  }

  render () {
    return (
      <div className="App">
        <header className="App-header">
          <AddTweet onAddTweet={this.onAddTweet.bind(this)} />
          <TweetList newTweet={this.state.newTweet} onTweetAdded={this.onTweetAdded.bind(this)} />
        </header>
      </div>
    )
  }
}

class AddTweet extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return <div>
      <input value={this.state.tweet} onChange={e => this.setState({ tweet: e.target.value })} />
      <button onClick={this.props.onAddTweet.bind(this, this.state.tweet)}>tweet!</button>
    </div>
  }
}

class TweetList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tweets: [ 'first tweet' ]
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.newTweet) {
      axios('/add', { tweet: nextProps.newTweet }).then(() => {
        this.props.onTweetAdded()
        this.setState({ tweets: [ ...this.state.tweets, nextProps.newTweet ] })
      })
    }
  }

  render () {
    return <ul>
      {this.state.tweets.map(tweet => <li>{tweet}</li>)}
    </ul>
  }
}

export default App;


// fake ajax helper
function axios(url) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, 100)
  })
}
