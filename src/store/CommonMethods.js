import store from './index'
export function useCommonMethods() {
    const dateToImage = (name, date) => {
        let url = ''
        if(name.length===1)
            url = name
        else{
            let array = name.split(' ')
            for(let i in array){
                url += array[i]
                if(i < (array.length-1))
                    url += '_'
            }
        }
        date = date.replace(/-/g, '_').replace(/ /g, '_').replace(/:/g, '_')
        url = store.state.address + 'image/pre_pic/' + url + '_' + date + '.jpg'
        // console.log(url)
        return url
    }
    const handleImage = (name) => {
        let url = ''
        if(name.length===1)
            url = name
        else{
            let array = name.split(' ')
            for(let i in array){
                url += array[i]
                if(i < (array.length-1))
                    url += '_'
            }
        }
        url = store.state.address + 'image/portraits/' + url + '.jpg'
        console.log(url)
        return checkImage(url)
    };
    const checkImage = (imgUrl) => {
        return new Promise(function(resolve, reject) {
            var imgObj = new Image();
            imgObj.src = imgUrl;
            imgObj.onload = () => resolve(imgUrl);
            imgObj.onerror = () => reject(require('../assets/images/工作人员.png'));
        })
    }
    const renameKey = (array, oldKey, newKey) => {
        // console.log(obj)
        for(let i in array){
            let obj = array[i]
            if (oldKey !== newKey) {                   // 检查旧键名和新键名是否相同
                Object.defineProperty(obj, newKey,     // 定义新键
                    Object.getOwnPropertyDescriptor(obj, oldKey)); // 复制旧键的属性描述符到新键
                delete obj[oldKey];                    // 删除旧键
            }
        }
    }
    const formatDateTime = (date) => {
        const y = date.getFullYear();
        const m = date.getMonth() + 1;
        const d = date.getDate();
        const h = date.getHours();
        const mi = date.getMinutes();
        const s = date.getSeconds();

        return `${y}-${m.toString().padStart(2, '0')}-${d.toString().padStart(2, '0')} ${h.toString()
            .padStart(2, '0')}:${mi.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
    return { handleImage, renameKey, formatDateTime, dateToImage};
}