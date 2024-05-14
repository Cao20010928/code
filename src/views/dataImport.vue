<template>
    <div class="upload">
        <div style="position: absolute; margin-left: 5px">批量导入技术人员</div>
        <input type="file" style="width: 100%; height: 100%" @change="readExcel">
    </div>

</template>

<script>
    import * as XLSX from 'xlsx'
    export default {
        name: "dataImport",
        methods: {
            readExcel(e){
                let fileObj = e.target.files[0]
                const fileReader = new FileReader()
                fileReader.readAsArrayBuffer(fileObj)
                fileReader.onload = (event) => {
                    const fileData = event.target.result
                    const workbook = XLSX.read(fileData,{
                        type: 'binary',
                    })
                    const wsname = workbook.SheetNames[0]
                    const sheetJSON = XLSX.utils.sheet_to_json(workbook.Sheets[wsname])
                    for(let item in sheetJSON){

                        sheetJSON[item].password = sheetJSON[item].password.toString()
                        sheetJSON[item].telephone = sheetJSON[item].telephone.toString()
                    }
                    const jsonData = {
                        user_list: sheetJSON
                    }
                    this.$axios({
                        method: "post",
                        url: this.$store.state.address + "user/insert_users",
                        data: jsonData
                    })
                        .then(res=>{
                            console.log(res)
                        })
                        .catch(err=>{
                            console.log(err)
                        })
                }
            }
        },
        computed: {

        }
    }
</script>

<style scoped>

    input{
        opacity: 0;
        /*color: #333333;*/
    }
    .upload{
        margin: auto;
        background-color: white;
        /*border: #333333;*/
        border-style: solid;
        border-radius: 5px;
        text-align: center;
        line-height: 50px;
        width: 140px;
        height: 50px;
        cursor: pointer;
    }
    .upload:hover{
        background-color: #c2c2c2;
    }
    .upload:active{
        background-color: #9494b8;
        color: white;
    }
</style>