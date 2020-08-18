export function updateArticle(state, article) {
    const { id, title, category, isPublic, articleState, tags, publishTime, content } = article
    state.id = id
    state.title = title
    state.category = category
    state.isPublic = isPublic
    state.articleState = articleState
    state.tags = tags
    state.publishTime = publishTime
    state.content = content
}