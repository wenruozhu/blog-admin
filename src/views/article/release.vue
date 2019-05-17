<template>
    <div class="release">
        <div class="articleInfo">
            <h6>发布文章</h6>
                <ul>
                    <li>
                        <span>标题：</span>
                        <input type="text" name="title" v-model="title" placeholder="文章标题">
                        <span>{{title}}</span>
                    </li>
                    <li>
                        <span>分类：</span>
                        <div class="category">
                            <input type="radio" name="category" checked value="code" v-model="category" id="code">
                            <label for="code">Code</label>
                            <input type="radio" name="category" value="life" v-model="category" id="life">
                            <label for="life">Life</label>
                            <span>{{category}}</span>
                        </div>
                    </li>
                    <li>
                        <span>公开：</span>
                        <div class="public">
                            <input type="radio" name="public" checked value="public" v-model="show" id="public">
                            <label for="public">公开</label>
                            <input type="radio" name="public" value="private" v-model="show" id="private">
                            <label for="private">私密</label>
                            <span>{{show}}</span>
                        </div>
                    </li>
                    <li>
                        <span>状态：</span>
                        <div class="state">
                            <input type="radio" name="state" checked value="published" v-model="state"  id="published">
                            <label for="published">发布</label>
                            <input type="radio" name="state" value="draft" v-model="state"  id="draft">
                            <label for="draft">草稿</label>
                            <span>{{state}}</span>
                        </div>
                    </li>
                    <li>
                        <span>tag：</span>
                        <div class="tag">
                            <input type="checkbox" name="tag" value="css" id="css" v-model="tag">
                            <label for="css">CSS</label>
                            <input type="checkbox" name="tag" value="js" id="js" v-model="tag">
                            <label for="js">JavaScript</label>
                            <input type="checkbox" name="tag" value="vue" id="vue" v-model="tag">
                            <label for="vue">Vue</label>
                            <input type="checkbox" name="tag" value="react" id="react" v-model="tag">
                            <label for="react">React</label>
                            <input type="checkbox" name="tag" value="http" id="http" v-model="tag">
                            <label for="http">Http</label>
                            <input type="checkbox" name="tag" value="node" id="node" v-model="tag">
                            <label for="node">Node</label>
                            <span>{{tag}}</span>
                        </div>
                    </li>
                    <li class="btn">
                        <!-- <input type="reset" value="重置"> -->
                        <button @click="getContent()">发布</button>
                    </li>
                </ul>
                <p>{{text}}</p>
            <Editor></Editor>
        </div>
    </div>
</template>

<script>
import Editor from '@/components/common/Editor.vue'
export default {
    name: 'release',
    props: ['content'],
    data() {
        return {
            title: '',
            category: 'code',
            show: 'public',
            state: 'published',
            tag: [],
            text: this.content
        }
    },
    components:{
        Editor
    },
    methods: {
        getContent() {
            this.content = this.editor.getData()
        }
    },
}
</script>

<style lang="less">
.release{
    padding: 16px;
    min-height: 100%;
    .articleInfo{
        position: relative;
        background-color: #fff;
        border-radius: 6px;
        padding: 28px;
        h6{
            font-size: 16px;
            font-weight: 400;
            color: #6b6b6b;
            padding-bottom: 28px;
        }
        ul {
            li {
                height: 50px;
                position: relative;
                .category,.public,.state,.tag{
                    position: absolute;
                    top: 0;
                    left: 72px;
                    label{
                        margin: 12px;
                    }
                }
                span {
                font-size: 12px;
                color: #8f97a4;
                }
                input[type="text"] {
                width: 320px;
                height: 28px;
                text-indent: 8px;
                position: absolute;
                left: 72px;
                border: 1px solid #d2d9e4;
                border-radius: 6px;
                }
                &.btn{
                    input,button{
                        font-size: 12px;
                        padding: 8px 18px;
                        color: #fff;
                        border-radius: 6px;
                        background-color: #f56c6c;
                        margin-right: 12px;
                    }
                    button{
                        background-color: #409eff;
                    }
                }
            }
        }
        .editor{
            #editor{
                min-height: 520px;
                overflow: auto;
                border: 1px solid #c6c6c6;
                border-top: none;
                .ck-editor__main{
                    height: 100%;
                    .ck-editor__editable:not(.ck-focused){
                        height: 100%;
                    }
                }
            }
        }
    }
}
</style>
