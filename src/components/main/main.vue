<template>
    <Layout style="height: 100%" class="main">
        <Sider hide-trigger collapsible :width="256" :collapsed-width="64" v-model="collapsed" class="left-sider" :style="{overflow:'hidden'}">

        </Sider>
    </Layout>
</template>

<script>
    import 'main.less'

    export default {
        name: "Main",
        components:{

        },
        data (){
            return {
                collapsed:false,
                minLogo

            }
        }
    }
</script>

<style scoped>

</style>