<template>
    <Layout class="">
        <div class="side-menu-wrapper">
            <!-- 侧边菜单栏 -->
            <Sider ref="sidebar" class="" hide-trigger collapsible width="230" :collapsed-width="78" v-model.trim="">
                <!-- 系统logo -->
                <div class="login-con">
                    <img v-show="!collapsed" :src="maxLogo" key="max-logo" />
                    <img v-show="collapsed" :src="minLogo" key="min-logo" />
                </div>
                <!-- 菜单列表 -->
                <Menu ref="menu" v-show="!collapsed" :active-name="activeName" :open-names="openedNames" :accordion="accordion" :theme="theme" width="auto" @on-select="">
                    <template v-for="menu in menuList">
                        <!-- 存在子菜单，此格式只支持二级菜单 -->
                        <template v-if="menu.children">
                            <Submenu :name="menu.name" :key="menu.id" >
                                <template slot="title">
                                    <Icon :type="menu.icon"></Icon>
                                    <span>{{menu.title}}</span>
                                </template>
                                <MenuItem v-for="child in menu.children" :name="child.name" :key="child.id">
                                    <Icon :type="child.icon"></Icon>
                                    <span>{{child.title}}</span>
                                </MenuItem>
                            </Submenu>
                        </template>
                        <template v-else>
                            <MenuItem  :name="menu.name" :key="menu.id">
                                <Icon :type="menu.icon"></Icon>
                                <span>{{menu.title}}</span>
                            </MenuItem>
                        </template>
                    </template>
                </Menu>
                <!-- 侧边栏缩进显示 -->
                <!-- 单页面则Tooltip，包含子菜单则Dropdown -->
                <div class="menu-collapsed" v-show="collapsed" :list="menuList">
                    <template v-for="item in menuList">
                        <Dropdown ref="dropdown" @on-click="handleClick" :class="hideTitle ? '' : 'collased-menu-dropdown'" :transfer="hideTitle" :placement="placement">
                            <!-- 缩小的父级菜单 -->
                            <a class="drop-menu-a" type="text" @mouseover="handleMousemove($event, children)" :style="{textAlign: !hideTitle ? 'left' : ''}">
                                <common-icon :size="rootIconSize" :color="textColor" :type="parentItem.icon"/>
                                <span class="menu-title" v-if="!hideTitle">{{ showTitle(parentItem) }}</span>
                                <Icon style="float: right;" v-if="!hideTitle" type="ios-arrow-forward" :size="16"/>
                            </a>
                            <!-- 子菜单列表显示 -->
                            <DropdownMenu ref="dropdown" slot="list">
                                <template v-for="child in children">
                                    <collapsed-menu v-if="showChildren(child)" :icon-size="iconSize" :parent-item="child" :key="`drop-${child.name}`"></collapsed-menu>
                                    <DropdownItem v-else :key="`drop-${child.name}`" :name="child.name"><common-icon :size="iconSize" :type="child.icon"/><span class="menu-title">{{ showTitle(child) }}</span></DropdownItem>
                                </template>
                            </DropdownMenu>
                        </Dropdown>
                        <collapsed-menu v-if="item.children && item.children.length > 1" @on-click="handleSelect" hide-title :root-icon-size="rootIconSize" :icon-size="iconSize" :theme="theme" :parent-item="item" :key="`drop-menu-${item.name}`"></collapsed-menu>
                        <Tooltip transfer v-else :content="showTitle(item.children && item.children[0] ? item.children[0] : item)" placement="right" :key="`drop-menu-${item.name}`">
                            <a @click="handleSelect(getNameOrHref(item, true))" class="drop-menu-a" :style="{textAlign: 'center'}"><common-icon :size="rootIconSize" :color="textColor" :type="item.icon || (item.children && item.children[0].icon)"/></a>
                        </Tooltip>
                    </template>
                </div>
            </Sider>
        </div>
    </Layout>
</template>

<script>

    import Vue from 'vue'
    import './MainLayout.css'

    export default {
        name: "MainLayout",
        data() {
            return {
                collapsed: false,
                activeName: '',
                openedNames: [],
                accordion: false,
                theme: 'dark',
                menuList: [],
                maxLogo: '',

            }
        },
        methods: {
            handleClick() {

            }
        }
    }
</script>

<style scoped>

</style>