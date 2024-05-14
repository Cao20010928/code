<template>
    <check-box :is-read="true"></check-box>
    <check-box :is-read="false"></check-box>
    <check-box :is-read="true"></check-box>
</template>

<script>
    import checkBox from "@/components/checkBox";
    export default {
        name: "testBug",
        components: {
            checkBox
        }
    }
</script>

<style scoped>

</style>