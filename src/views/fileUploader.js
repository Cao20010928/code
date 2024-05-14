export const TASK_STATUS = {
    PROCESSING: 1,
    SUCCESS: 2,
    ERROR: 3,
}
import store from '../store/index'
import axios from "axios";
export default class FileUploader {
    $store = store;
    $axios = axios;
    constructor({
                    element,
                    uploadUrl,
                    taskRenderer
                }) {
        if (element instanceof HTMLElement) {
            this.element = element;
        } else {
            throw new Error('element should be an HTMLElement')
        }
        this.uploadUrl = uploadUrl;
        this.taskRenderer = taskRenderer;
        this.#init();
    }

    // public props
    tasks = [];

    // private methods
    #init = () => {
        this.#listenToEvents();
    }

    #listenToEvents = () => {
        const dropAreaDOM = this.element.querySelector('.drop-area');
        dropAreaDOM.addEventListener('drop', this.#handleDrop);
        dropAreaDOM.addEventListener('dragover', this.#handleDragover);
    }

    #handleDrop = (e) => {
        // Prevent file from being opened
        e.preventDefault();

        if (e.dataTransfer.items) {
            // Use DataTransferItemList interface to access files
            for (const item of e.dataTransfer.items) {
                console.log(item)
                if (item.kind === 'file') {
                    const file = item.getAsFile();
                    // console.log('file: ', file);
                    this.#upload(file);
                }
            }
        } else {
            // Use DataTransfer interface to access the files
            for (const file of e.dataTransfer.files) {
                // console.log('file: ', file);
                this.#upload(file);
            }
        }
    }

    #handleDragover = (e) => {
        // Prevent file from being opened
        e.preventDefault();
    }

    #upload = (file) => {
        let data = new FormData();
        let name = JSON.parse(sessionStorage.getItem('baseInfo')).username
        data.append('name', name)
        data.append('pre_pic', file);
        console.log(data.get("pre_pic"))
        this.$axios({
            method: 'post',
            url: this.$store.state.address + 'pic/up_pre_pic',
            data: data,
            headers: {
                'Content-Type': 'multipart/form-data'
                // 'content-type': "application/json;charset=UTF-8"
            }
        })
            .then(res=>{
            console.log(res)
        })
            .catch(err=>{
                console.log(err)
            })
        // const task = {
        //     id: this.tasks.length,
        //     name: file.name,
        //     status: TASK_STATUS.PROCESSING,
        //     progress: 0
        // }
        // this.tasks.unshift(task);
        // const xhr = new XMLHttpRequest();
        // xhr.open('POST', this.uploadUrl);
        // xhr.setRequestHeader('x-file-name', encodeURIComponent(file.name));
        // xhr.upload.addEventListener('progress', (e) => {
        //     const { loaded, total } = e;
        //     const progress = Math.round(loaded / total * 100);
        //     task.progress = progress;
        //     this.#updateTask(task);
        // });
        // xhr.addEventListener('load', () => {
        //     task.status = TASK_STATUS.SUCCESS;
        //     const response = JSON.parse(xhr.response);
        //     console.log('response', response);
        //     const { url } = response;
        //     task.url = url;
        //     this.#updateTask(task);
        // });
        // xhr.addEventListener('error', () => {
        //     task.status = TASK_STATUS.ERROR;
        //     this.#updateTask(task);
        // });
        // xhr.send(data);
    }

    #updateTask = (task) => {
        const taskList = this.element.querySelector('.task-list');
        const id = `task-${task.id}`;
        let taskBox = taskList.querySelector(`#${id}`);
        if (!taskBox) {
            taskBox = document.createElement('div');
            taskBox.id = id;
            taskList.prepend(taskBox);
        }
        taskBox.innerHTML = '';
        taskBox.append(this.taskRenderer(task));
    }
}