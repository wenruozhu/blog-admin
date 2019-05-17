<template>
    <div class="editor">
        <div id="toolbar-container"></div>
        <div id="editor">
            <p></p>
        </div>
        <!-- <button @click="getContent()">发布</button> -->
    </div>
</template>

<script>
import CKEditor from '@ckeditor/ckeditor5-build-decoupled-document'
import axios from 'axios';
export default {
    name:'editor',
    props: ['content'],
    data() {
        return {
            editor: null,
            content:''
        }
    },
    mounted() {
        this.initCKEditor()
    },
    methods: {
        initCKEditor() {
            class uploadAdapter{
                constructor(loader){
                    this.loader = loader
                }
                upload() {
                    return new Promise((resolve, reject) => {
                        const data = new FormData();
                        data.append('upload', this.loader.file);
                        data.append('allowSize', 10)//允许图片上传的大小10兆
                        /* axios.post('/uploadImage',{
                            data: data
                        }).then(data => {
                            if(data.res){
                                resolve({
                                    default: data.url
                                });
                            }else{
                                reject(data.msg);
                            }
                        }) */
                    })
                }
                abort(){

                }
            }
            /* , {
            ckfinder: {
                uploadUrl: '/admin/Upload/uploadUrl'
                //后端处理上传逻辑返回json数据,包括uploaded(选项true/false)和url两个字段
            }
            }) */
            CKEditor.create(document.querySelector('#editor')).
            then(editor => {
                const toolbarContainer = document.querySelector('#toolbar-container');
                toolbarContainer.appendChild(editor.ui.view.toolbar.element);
                this.editor = editor //将编辑器保存起来，用来随时获取编辑器中的内容等，执行一些操作
                editor.plugins.get('FileRepository').createUploadAdapter = (loader)=>{
                    return new uploadAdapter(loader);
                };
            }).catch(error => {
                alert(error);
            });
        },
        getContent() {
            this.content = this.editor.getData()
        }
    },
}
</script>

<style>

</style>
