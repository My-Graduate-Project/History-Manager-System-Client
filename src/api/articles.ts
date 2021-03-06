import request from "../common/axios"

/** 用户添加文章
 * 
 * @param userInfo { Object }
 * @returns 
 */
// 定义获取过来的数据类型
class articleClass {
  title: string
  description: string
  content: string
  category_id: number
  views: number
  article_status: string
  create_time: string
}
export function addArticle(articleInfo: articleClass) {
  return request('/addArticle', 'post', articleInfo);
}

/** 展示用户文章列表
 * 
 * @returns 
 */
export function showArticleList(pageNum: number, pageSize: number) {
  return request('/showArticleList', 'post', { pageNum: 0, pageSize: 100 });
}

/** 删除文章
 * 
 * @param id Number
 * @returns 
 */
export function removeSingleArticle(id: number) {
  return request('/removeArticle', 'post', { id: id });
}

export function findArticle(title: string, start: string, end: string) {
  return request('/findArticle', 'post', { title: title, dateStart: start, dateEnd: end });
}