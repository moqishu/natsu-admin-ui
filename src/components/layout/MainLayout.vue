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
                        <Dropdown ref="dropdown" v-if="item.children" @on-click="handleClick" transfer placement="right-start">
                            <!-- 缩小的父级菜单 -->
                            <a class="drop-menu-a" type="text" @mouseover="handleMousemove($event, children)" :style="{textAlign: !hideTitle ? 'left' : ''}">
                                <component :is="iconType" :type="iconName" :color="iconColor" :size="iconSize"></component>
                                <span class="menu-title" v-if="!hideTitle">{{ item.title }}</span>
                                <Icon style="float: right;" v-if="!hideTitle" type="ios-arrow-forward" :size="16"/>
                            </a>
                            <!-- 子菜单列表显示 -->
                            <DropdownMenu ref="dropdown" slot="list">
                                <template v-for="child in item.children">
                                    <DropdownItem v-else :key="`drop-${child.name}`" :name="child.name">
                                        <component :is="iconType" :size="iconSize" :type="child.icon"></component>
                                        <span class="menu-title">{{ child.title }}</span>
                                    </DropdownItem>
                                </template>
                            </DropdownMenu>
                        </Dropdown>
                        <!-- 后台设计偏少存在主菜单无二级菜单 -->
                        <Tooltip transfer v-else :content="item.title" placement="right" :key="`drop-menu-${item.name}`">
                            <a @click="handleSelect(getNameOrHref(item, true))" class="drop-menu-a" :style="{textAlign: 'center'}">
                                <component :size="rootIconSize" :color="textColor" :type="item.icon"></component>
                            </a>
                        </Tooltip>
                    </template>
                </div>
            </Sider>
        </div>
        <Layout>
            <Header class="header-con">
                <div class="header-bar">
                    <!-- 缩小侧边栏按钮 -->
                    <a @click="handleChange" type="text" :class="['sider-trigger-a', collapsed ? 'collapsed' : '']"><Icon :type="icon" :size="size" /></a>
                    <!-- 面包屑菜单可不使用 -->
                    <div class="custom-bread-crumb">
                        <Breadcrumb :style="{fontSize: `${fontSize}px`}">
                            <BreadcrumbItem v-for="item in list" :to="item.to" :key="`bread-crumb-${item.name}`">
                                <component style="margin-right: 4px;" :type="item.icon || ''"/>
                                {{ item.title }}
                            </BreadcrumbItem>
                        </Breadcrumb>
                    </div>
                    <div class="custom-content-con">
                        <user :message-unread-count="unreadCount" :user-avatar="userAvatar"/>
                        <language v-if="$config.useI18n" @on-lang-change="setLocal" style="margin-right: 10px;" :lang="local"/>
                        <error-store v-if="$config.plugin['error-store'] && $config.plugin['error-store'].showInHeader" :has-read="hasReadErrorPage" :count="errorCount"></error-store>
                        <fullscreen v-model="isFullscreen" style="margin-right: 10px;"/>
                    </div>
                </div>
                <header-bar :collapsed="collapsed" @on-coll-change="handleCollapsedChange">
                    <user :message-unread-count="unreadCount" :user-avatar="userAvatar"/>
                    <language v-if="$config.useI18n" @on-lang-change="setLocal" style="margin-right: 10px;" :lang="local"/>
                    <error-store v-if="$config.plugin['error-store'] && $config.plugin['error-store'].showInHeader" :has-read="hasReadErrorPage" :count="errorCount"></error-store>
                    <fullscreen v-model="isFullscreen" style="margin-right: 10px;"/>
                </header-bar>
            </Header>
        </Layout>
    </Layout>
</template>

<script>

    import "./main2.less"
    // import './MainLayout.css'

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
                hideTitle: true

            }
        },
        methods: {
            handleClick() {

            },
            handleMousemove (event, children) {

            }
        }
    }
</script>

<style scoped>

</style>