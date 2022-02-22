import * as React from 'react'
import { Component } from 'react'

interface ArticleListProps {}

interface ArticleListState {}

class ArticleList extends Component<ArticleListProps, ArticleListState> {
  constructor(props: ArticleListProps) {
    super(props)
    this.state = {}
  }
  render() {
    return <div>ArtworkList</div>
  }
}

export default ArticleList
