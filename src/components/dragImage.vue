<template>
    <div class="form-group">
        <div class="dropbox">
            <input class="drag-file" type="file" ref="image" :name="name" :disabled="isSaving" @change="fileChange" accept="image/*">
            <p v-if="isInitial">
                拖放图片开始上传<br>或者点击选择图片上传
            </p>
            <p v-if="isSaving">
                图片上传中...
            </p>
        </div>
        <div v-if="isSuccess">
            <div class="alert alert-success" role="alert">
                图片上传成功！<a href="javascript:void(0)" @click="reset()">重新上传</a>
            </div>
        </div>
        <div v-if="isFailed">
            <div class="alert alert-danger" role="alert">
                图片上传失败！<a href="javascript:void(0)" @click="reset()">重新上传</a>
            </div>
        </div>
        <InputText type="hidden" :name="field" v-model="filePath"></InputText>
        <img :src="filePath" class="img-responsive img-thumbnail" style="width: 50%;" v-if="filePath">
    </div>
</template>

<script>
    const STATUS_INITIAL = 0, STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3;
    export default {
        name: "dragImage",
        props: ['name', 'field', 'path'],
        data() {
            return {
                currentStatus: null,
                filePath: this.path
            }
        },
        computed: {
            isInitial() {
                return this.currentStatus === STATUS_INITIAL;
            },
            isSaving() {
                return this.currentStatus === STATUS_SAVING;
            },
            isSuccess() {
                return this.currentStatus === STATUS_SUCCESS;
            },
            isFailed() {
                return this.currentStatus === STATUS_FAILED;
            }
        },
        mounted() {
            this.reset();
        },
        methods: {
            reset() {
                // 重置状态字段值
                this.currentStatus = STATUS_INITIAL;
                this.$emit('clear');  //  清理父级作用域报错信息
            },
            fileChange() {
                // 上传文件后才会执行后续步骤
                if (this.$refs.image.files.length === 0) {
                    return;
                }

                // 清理父级作用域错误信息
                this.$emit('clear');

                // 填充表单数据
                const formData = new FormData();
                formData.append(this.name, this.$refs.image.files[0]);

                // 开始上传
                // this.currentStatus = STATUS_SAVING;
                // axios.post('/image/upload', formData, {
                //     headers: {
                //         'Content-Type': 'multipart/form-data'
                //     }
                // }).then(resp => {
                //     this.currentStatus = STATUS_SUCCESS;
                //     this.filePath = resp.data.path;
                //     this.$emit('success', this.field, this.filePath);
                // }).catch(error => {
                //     this.currentStatus = STATUS_FAILED;
                //     let errors = {};
                //     errors[this.field] = error.response.data.errors[this.name];
                //     this.$emit('error', errors);
                // });
            }
        }
    }
</script>

<style scoped>
    .dropbox {
        outline: 2px dashed grey;
        outline-offset: -10px;
        background: lightcyan;
        color: dimgray;
        padding: 10px 10px;
        min-height: 200px;
        position: relative;
        cursor: pointer;
    }

    .drag-file {
        opacity: 0;
        width: 100%;
        height: 200px;
        position: absolute;
        cursor: pointer;
    }

    .dropbox:hover {
        background: lightblue;
    }

    .dropbox p {
        font-size: 1.2em;
        text-align: center;
        padding: 50px 0;
    }

    .alert {
        margin-top: 10px;
    }
</style>