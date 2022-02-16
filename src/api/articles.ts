import request from "../common/axios"

/** 用户注册信息
 * 
 * @param userInfo { Object }
 * @returns 
 */
class articleClass {
  title: string
  description: string
  content: string
  category_id: number
  views: number
  article_status: string
  create_time: string
  is_deleted: string
}
export function addArticle(articleInfo: articleClass) {
  return request('/addArticle', 'post', articleInfo);
}
