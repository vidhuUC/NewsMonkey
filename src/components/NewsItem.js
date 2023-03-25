import React, { Component } from 'react'

export class NewsItem extends Component {

    render() {
        const { title, description, urlToImage, newsUrl,author,date } = this.props;
        return (
            <div className="my-3">
                <div className="card" style={{ width: "18rem" }}>
                    <img src={urlToImage} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p class="card-text"><small class="text-body-secondary">By {author?author:"Unknown" } on {new Date(date).toGMTString()}</small></p>
                        <a href={newsUrl} className="btn btn-sm btn-dark btn-primary">Read more</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
