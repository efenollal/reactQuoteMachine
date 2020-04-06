import React from 'react';
import './QuoteBox.scss';

class QuoteBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            quotes: [],
            quote: {
                newQuote: '',
                author: ''
            }
        };

        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        // api call for quotes
        this.fetchData()
    }

    fetchData() {
        fetch(
            "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
        )
        .then(response => response.json())
        .then((response) => this.setState((prevState) => ({
            ...prevState,
            quotes: response.quotes,
            quote: {
                ...prevState.quote,
                newQuote: response.quotes[0].quote,
                author: response.quotes[0].author
            }
        })))
        .catch(err => console.error(err))
    }

    handleClick() {
        const randQuote = this.state.quotes[Math.floor(Math.random() * this.state.quotes.length)]
        this.setState(prevState => ({
            quote:{
                ...prevState.quote,
                newQuote: randQuote.quote,
                author: randQuote.author
            }
        }));   
    }

    render() {
        const {quote} = this.state;
        return (
            <div id="quote-box">
                <div className="quote-text">
                    <i className="fa fa-quote-left"> </i>
                    <span id="text">{quote.newQuote} </span>
                    <i className="fa fa-quote-right"></i>
                </div>
                <div className="quote-author">
                    - {quote.author}
                    <span id="author"></span>
                </div>
                <div className="row">
                    <div className="row">
                        <div className="col-md-6 pull-right">
                            <a
                                href="twitter.com/intent/tweet"
                                className="btn btn-primary"
                                id="tweet-quote"
                                title="Tweet this quote!"
                                target="_blank"
                            >
                                <i className="fa fa-twitter"></i>
                            </a>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <button
                            className="btn btn-primary"
                            id="new-quote"
                            onClick={this.handleClick}
                        >
                            New quote
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
export default QuoteBox;

