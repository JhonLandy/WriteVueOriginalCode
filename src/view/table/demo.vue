<template>
    <net-table
        :data="list"
        :total="total"
        :column.sync="column"
        :page.sync="page"
        :limit.sync="limit"
        border
        :checked="checked"
        @row-dblclick="dbClick"
        @test="doRecover"
        :provide="{ad: 2}"
    >
        <template v-slot:toolbarT>
            <el-button size="small" @click="doRefresh">刷新</el-button>
        </template>
        <template v-slot:toolbarB>
            <el-button size="small" @click="doDel">删除</el-button>
        </template>
    </net-table>
</template>

<script>
    //请开启vue内置的编译器，vue.config.js runtimeCompiler: true,
     import NetTable from './components/Index'
     const Table = {
        name: 'tables',
        data() {
            return {
                isAdmin: true,
                page: 1,
                limit: 10,
                total: 100,
                checked: {
                    attrs: {
                        width: ' 50',
                        align: 'center',
                        prop: 'checked',
                    }
                },
                column: [
                    {
                        id: 1,
                        attrs: {
                            label: '序号',
                            prop: 'order',
                        },
                        template: `
                             <el-tag type="warning" size="small">{{scope.row.order}}</el-tag>
                        `
                    },
                    {
                        id: 2,
                        attrs: {
                            label: '申请人',
                            prop: 'name'
                        },
                        template: function () {
                            //可以直接写字符串, 需要用到表格数据使用函数方式
                            return `
                                <div>
                                    {{scope.row.name}}
                                    <el-tag type="success" size="small">当前登录的账号有管理员权限</el-tag>
                                </div>
                            `
                        }
                    },
                    {
                        id: 3,
                        attrs: {
                            label: 'ip地址',
                            prop: 'ip'
                        },
                        template: function (scope) {
                            //可以直接写字符串, 需要用到表格数据使用函数方式
                            return `
                                <div>
                                    ${scope.row.ip}
                                    <el-tag type="info" size="small">异常状态</el-tag>
                                </div>
                            `
                        }
                    },
                    {
                        id: 4,
                        attrs: {
                            label: '流程状态',
                            prop: 'status'
                        },
                        template: function () {
                            //可以直接写字符串, 需要用到表格数据使用函数方式
                            return `
                                <div>
                                    <el-tag type="success" v-if="scope.row.status === '1'" size="small">通过</el-tag>
                                    <el-tag type="danger" v-else size="small">不通过</el-tag>
                                </div>
                            `
                        }
                    },
                    {
                        id: 5,
                        attrs: {
                            label: '操作',
                            prop: 'operation',
                        },
                        template: function () {
                            //可以直接写字符串, 需要用到表格数据使用函数方式
                            return `
                                <div>
                                    <el-button type="success" @click="doRecover(scope)" size="medium">通过</el-button>
                                    <el-button type="danger" size="medium" @click="doDel(scope)">删除</el-button>
                                </div>
                            `
                        },
                        methods: {
                            doRecover: this.doRecover,
                            doDel: this.doDel
                        }
                    }
                ],
                data: [],
                list: []
            }
        },
         computed: {
             ok() {
                 return this.$store.getters.shit
             }
         },
         watch: {
            page: function (val) {
                this.getData(val, this.limit)
            },
             limit: function (val) {
                 this.getData(this.page, val)
             }
         },
         created() {
            for (let i = 0;i < 100;i++) {
                this.data.push({
                    checked: "",
                    order: i,
                    name: "小明"+i,
                    ip: '192.168.'+(i +1),
                    status: '0'
                })
            }
             this.getData = (page, size) => {
                 let start = (page-1)*size
                 let end = page*size - 1
                 let temp = []
                 for (let i = start;i <= end;i++) {
                    temp.push(this.data[i])
                }
                this.list = temp
            }
            this.getData(this.page, this.limit)
         },
         components: {
                NetTable
            },
         methods: {
            doDel(scope) {
                this.$message({
                    message: '删除成功！',
                    type: 'error'
                })
                console.log(scope)
            },
             doRecover({row}) {
                row.status = '1'//地址引用问题，可触发子组件table更新,一般情况可用，特殊情况不推荐
                this.$message({
                    message: '通过审批！',
                    type: 'success'
                })
             },
             dbClick() {
                console.log(this)
                 this.$message({
                     message: '你双击了！',
                     type: 'success'
                 })
             },
             doRefresh(data) {
                 console.log(data)
             }
         }
     }
    export default Table;
</script>
