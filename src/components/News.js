/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'

export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general'
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    constructor() {
        super();
        console.log("Hello I am a constructor from News Component");
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0

        }
    }

    handleNextClick = async () => {
        if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) {
            return;
        }
        this.setState({ loading: true })
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e8bb0c5899e843249c337710b7d8ebe1&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
        const data = await fetch(url);
        const parsedData = await data.json();
        this.setState({ loading: false })
        this.setState({ articles: parsedData.articles })
        this.setState({ page: this.state.page + 1 })
    }

    handlePrevClick = async () => {
        this.setState({ loading: true })
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e8bb0c5899e843249c337710b7d8ebe1&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
        const data = await fetch(url);
        const parsedData = await data.json();
        this.setState({ loading: false })
        this.setState({ articles: parsedData.articles })
        this.setState({ page: this.state.page - 1 })
    }

    async componentDidMount() {
        this.setState({ loading: true })
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e8bb0c5899e843249c337710b7d8ebe1&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        const data = await fetch(url);
        const parsedData = await data.json();
        this.setState({ loading: false })
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults })
    }
    render() {
        return (
            <>
                <div className='container my-3'>
                    <h2 className='text-center'>NewsMonkey - Top Headlines</h2>
                    {this.state.loading && <Spinner />}
                    <div className="row">
                        {!this.state.loading && this.state.articles.map((element) => {

                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} urlToImage={element.urlToImage} newsUrl={element.url}  author={element.author} date={element.publishedAt}/>
                            </div>

                        })}
                    </div>
                </div>
                <div className='container my-3'>
                    <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-end">
                            <li className={`page-item ${this.state.page <= 1 ? "disabled" : ""}`}><a className="page-link" href="#" onClick={this.handlePrevClick}>&larr; Previous</a></li>
                            <li className={`page-item ${this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize) ? "disabled" : ""}`}><a className="page-link" onClick={this.handleNextClick} href="#">Next &rarr;</a></li>
                        </ul>
                    </nav>
                </div>
            </>
        )
    }
}

export default News
