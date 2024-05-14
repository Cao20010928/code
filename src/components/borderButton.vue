<template>
    <div class="btn-gradient">
        <div class="border-gradient" >
            <div class="wrapper" :style="{padding: upDown, leftRight}">
                {{content}}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "borderButton",
        props: ['content', 'upDown', 'leftRight']
    }
</script>

<style scoped lang="scss">
    .btn-gradient {
        cursor: pointer;
        align-items: center;
        color: #000;
        display: inline-flex;
        justify-conent: center;
        text-decoration: none;

        width: fit-content;

    &:hover .border-gradient {
         background-position: 100% center;
     }
    }

    .border-gradient {

        background-image: linear-gradient(90deg, #000, #fff);
        background-size: 250%;
        border-radius: 10px;
        display: inline-block;
        padding: 3px;
        position: relative;
        transition: background-position .5s;
        width: fit-content;
    }

    .wrapper {
        align-items: center;
        background-color: white;
        border-radius: 8px;
        box-shadow: rgba(37, 39, 41, 0.4) 0 5px 15px;
        display: flex;
        font-family: "Open Sans", sans-serif;

        font-weight: 900;

    }
</style>