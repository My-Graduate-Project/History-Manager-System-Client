import * as React from 'react'
import { Component } from 'react'

interface ArticleWriteProps {}

interface ArticleWriteState {}

class ArticleWrite extends Component<ArticleWriteProps, ArticleWriteState> {
  constructor(props: ArticleWriteProps) {
    super(props)
  }
  render() {
    return (
      <div>
        <h1>Write Article</h1>
      </div>
    )
  }
}

export default ArticleWrite
