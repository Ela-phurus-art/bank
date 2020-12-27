<template>
  <div class="app-container">
    <div class="panel-style">
      <el-form :inline="true" label-width="120px" @submit.native.prevent>
        <el-form-item class="timeDatePicker" label="申请时间">
              <el-date-picker v-model="dateRange" type="date" placeholder="选择日期">
              </el-date-picker>
        </el-form-item>
         <span class="time-range">~</span>
        <el-form-item >
          <el-date-picker v-model="dateRange" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="申请任务名称">
          <el-input v-model="listQuery.gdqd" placeholder="请输入申请任务名称" clearable />
        </el-form-item>
        <el-form-item label="申请部门">
          <el-select v-model="listQuery.tzfx" placeholder="请选择申请部门" filterable clearable>
            <el-option label="部门一" value="0" />
            <el-option label="部门二" value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="申请科室">
          <el-select v-model="listQuery.tzfx" placeholder="请选择申请科室" filterable clearable>
            <el-option label="科室一" value="0" />
            <el-option label="科室二" value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="申请人">
          <el-input v-model="listQuery.sqr" placeholder="请输入申请人" clearable />
        </el-form-item>
        <el-form-item label="审批人">
          <el-input v-model="listQuery.kh" placeholder="请输入审批人" clearable />
        </el-form-item>
        <el-form-item label="申请编号">
          <el-input v-model="listQuery.kh" placeholder="请输入申请编号" clearable />
        </el-form-item>
        <el-form-item class="el-form--button">
          <el-button type="primary" class="search-btn" @click="handleSearch" style="width:100px">查询</el-button>
          <el-button  @click="temp" style="width:100px">重置</el-button>
        </el-form-item>
      </el-form>
      <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.6)"
        style="width: 100%"
        fit
        highlight-current-row
                ref="TopicTable"
                :row-key="getRowKeys"
                :expand-row-keys="expands"
                @current-change="toggleRowExpansion"
      >
        <el-table-column type="expand" label="批量申请编号"  class="reference-number">             
          <template slot-scope="scope">
            <i class="el-icon-plus"  @click="referenceData(scope.row.id)" style="color:#409EFF"></i> 
            <span style="margin-left: 5px">{{scope.row.num}}</span>
          </template>
        </el-table-column>
        <el-table-column label="批量申请名称" prop="wybs">
          <template slot-scope="scope">
            <span>{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column label="申请笔数" prop="nfsqsj">
          <template slot-scope="scope">
            <span>{{scope.row.count}}</span>
          </template>
        </el-table-column>
        <el-table-column label="调减总额" prop="bz">
                    <template slot-scope="scope">
            <span>{{scope.row.money}}</span>
          </template>
        </el-table-column>
        <el-table-column label="申请时间" prop="sqsj">
                    <template slot-scope="scope">
            <span>{{scope.row.time}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="80px">
          <template slot-scope="scope">
            <div class="look" @click="handleShow(scope.row)">{{scope.row.action}}</div>
            <!-- <el-button type="primary" plain title="详情" @click="handleShow(scope.row)">详情</el-button> -->
          </template>
        </el-table-column>
      </el-table>

           <el-table
           v-if="isShow"
        ref="table-ref"
        v-loading="listLoading"
        :data="hiddenList"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.6)"
        style="width: 100%"
        fit
        highlight-current-row
      >
        <el-table-column  label="序号">             
          <template slot-scope="scope">
            <span>{{scope.row.xh}}</span>
          </template>
        </el-table-column>
        <el-table-column label="卡号">
          <template slot-scope="scope">
            <span>{{scope.row.kh}}</span>
          </template>
        </el-table-column>
        <el-table-column label="唯一标识">
          <template slot-scope="scope">
            <span>{{scope.row.wybs}}</span>
          </template>
        </el-table-column>
        <el-table-column label="年费收取时间">
                    <template slot-scope="scope">
            <span>{{scope.row.nfsqsj}}</span>
          </template>
        </el-table-column>
        <el-table-column label="调减方向">
                    <template slot-scope="scope">
            <span>{{scope.row.tjfx}}</span>
          </template>
        </el-table-column>
                <el-table-column label="调减政策">
                    <template slot-scope="scope">
            <span>{{scope.row.tjzc}}</span>
          </template>
        </el-table-column>
                <el-table-column label="调减金额">
                    <template slot-scope="scope">
            <span>{{scope.row.tjje}}</span>
          </template>
        </el-table-column>
                <el-table-column label="申请时间" >
                    <template slot-scope="scope">
            <span>{{scope.row.sqsj}}</span>
          </template>
        </el-table-column>
                <el-table-column label="申请部门/科室/申请人" >
                    <template slot-scope="scope">
            <span>{{scope.row.sqbm}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="80px">
          <template slot-scope="scope">
            <div class="look" @click="handleShow(scope.row)">{{scope.row.cz}}</div>
            <!-- <el-button type="primary" plain title="详情" @click="handleShow(scope.row)">详情</el-button> -->
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" :page.sync="listQuery.pageNo" :limit.sync="listQuery.pageSize" @pagination="getList" />

      <el-dialog :visible.sync="softsFlag" width="60%" :close-on-click-modal="false">

        <!-- <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item title="基本信息" name="1"> -->
        <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="基本批量申请信息" name="first">
            <el-form ref="softForm" label-width="125px" :model="softObj" :inline="true">
              <el-form-item label="批量申请流水编号" prop="kh">           
                <el-input v-model="softObj.kh" clearable :readonly="showFlag" />
              </el-form-item>
              <el-form-item label="批量申请状态" prop="wybs">
                <el-input v-model="softObj.wybs" :readonly="showFlag" clearable />
              </el-form-item>
              <el-form-item label="反馈状态" prop="nfsqsj">
                <el-input v-model="softObj.nfsqsj" :readonly="showFlag" clearable />
              </el-form-item>
              <el-form-item label="申请渠道" prop="tjzc">
                <el-input v-model="softObj.softwareNo" :readonly="showFlag" clearable />
              </el-form-item>
              <el-form-item label="批量申请名称">
                <el-input v-model="softObj.tjje" :readonly="showFlag" />
              </el-form-item>
              <el-form-item label="申请总笔数">
                <el-input v-model="softObj.gdqd" :readonly="showFlag" />
              </el-form-item>
              <el-form-item label="调减总额">
                <el-input v-model="softObj.sqsj" :readonly="showFlag" />
              </el-form-item>
              <el-form-item label="申请时间">
                <el-input v-model="softObj.sqr" :readonly="showFlag" />
              </el-form-item>
            </el-form>
          <!-- </el-collapse-item>
          <el-collapse-item title="列表信息" name="2"> -->
        </el-tab-pane>
        <el-tab-pane label="附件" name="second"></el-tab-pane>
        </el-tabs>
            <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="审批信息" name="first">
                <el-table
                  v-loading="listLoading"
                  :data="tList1"
                  element-loading-text="拼命加载中"
                  element-loading-spinner="el-icon-loading"
                  element-loading-background="rgba(0, 0, 0, 0.6)"
                  style="width: 100%"
                  fit
                  highlight-current-row
                >
                  <el-table-column label="序号" prop="xh"></el-table-column>
                  <el-table-column label="审批时间" prop="spsj"></el-table-column>
                  <el-table-column label="审批人" prop="spr"></el-table-column>
                  <el-table-column label="审批结果" prop="spjg"></el-table-column>
                  <el-table-column label="备注" prop="beiz"></el-table-column>
                </el-table>
                <pagination v-show="total > 0" :total="total" :page.sync="listQuery.pageNo" :limit.sync="listQuery.pageSize" @pagination="getList" />
              </el-tab-pane>
              <el-tab-pane label="调账信息" name="second">
                <el-table
                  v-loading="listLoading"
                  :data="tList2"
                  element-loading-text="拼命加载中"
                  element-loading-spinner="el-icon-loading"
                  element-loading-background="rgba(0, 0, 0, 0.6)"
                  style="width: 100%"
                  fit
                  highlight-current-row
                >
                  <el-table-column label="序号" prop="xh"></el-table-column>
                  <el-table-column label="调账时间" prop="spsj"></el-table-column>
                  <el-table-column label="调账人" prop="spr"></el-table-column>
                  <el-table-column label="调账结果" prop="spjg"></el-table-column>
                  <el-table-column label="备注" prop="beiz"></el-table-column>
                </el-table>
                <pagination v-show="total > 0" :total="total" :page.sync="listQuery.pageNo" :limit.sync="listQuery.pageSize" @pagination="getList" />
              </el-tab-pane>
              <el-tab-pane label="反馈信息" name="third">
                <el-table
                  v-loading="listLoading"
                  :data="tList3"
                  element-loading-text="拼命加载中"
                  element-loading-spinner="el-icon-loading"
                  element-loading-background="rgba(0, 0, 0, 0.6)"
                  style="width: 100%"
                  fit
                  highlight-current-row
                >
                  <el-table-column label="序号" prop="xh"></el-table-column>
                  <el-table-column label="反馈时间" prop="spsj"></el-table-column>
                  <el-table-column label="反馈类型" prop="spr"></el-table-column>
                  <el-table-column label="反馈结果" prop="spjg"></el-table-column>
                  <el-table-column label="备注" prop="beiz"></el-table-column>
                </el-table>
                <pagination v-show="total > 0" :total="total" :page.sync="listQuery.pageNo" :limit.sync="listQuery.pageSize" @pagination="getList" />
              </el-tab-pane>
            </el-tabs>
          </el-collapse-item>
        </el-collapse> -->
        <div style="text-align: center" :class="{ 'btn-disabled': showFlag }">
          <el-button  plain @click="softsFlag = false">返回</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
  // import { checkPermission } from '@/utils/permission'
  export default {
    name: 'StandardWorkOrder',
    components: { Pagination },
    data() {
      return {
        isShow:true,
        hiddenList:[
          {
          xh:1, 
          kh: '2984793480',
          wybs: 'aaa',
          nfsqsj: 'aaa',
          tjfx:'aaa',
          tjzc: 'aaa',
          tjje: 'aaa',
          sqsj: 'aaa',
          sqbm: 'aaa',
          cz:'详情'
          },
          {
          xh:2,
          kh: '3295794385',
          wybs: 'bbb',
          nfsqsj: 'bbb',
          tjfx:'bbb',
          tjzc: 'bbb',
          tjje: 'bbb',
          sqsj: 'bbb',
          sqbm: 'bbb',
          cz:'详情'
        }
        ],
        listQuery: {
          pageNo: 1,
          pageSize: 10,
          sqr: '',
          kh: '',
          gdqd: '',
          jtzc: '',
          sqsj: ''
        },
        softObj: {
          kh: '',
          wybs: '',
          nfsqsj: '',
          tjzc: '',
          tjje: '',
          gdqd: '',
          sqsj: '',
          sqr: ''
        },
        total: 1,
        list: [],
        dateRange: [],
        softsFlag: false,
        showFlag: true,
        listLoading: false,
        activeNames: '1',
        activeName: 'first',
        tList1: [],
        tList2: [],
        tList3: []
      }
    },
    mounted() {
    
      this.getList()
    },
    methods: {
      temp() {
        this.listQuery = {
          sqr: '',
          kh: '',
          gdqd: '',
          jtzc: '',
          sqsj: ''
        }
      },
      getList() {
        this.list = [
        {
          id:1,
          num:'CN001',
          name:'001',
          count:59,
          money:20000,
          time:'2020-10-01',
          action:'查看'
        },{
          id:2,
          num:'CN002',
          name:'002',
          count:50,
          money:30000,
          time:'2020-11-01',
          action:'查看'
        }
        ]
        this.tList1 = [
          {
            xh: '1',
            spsj: '2020-11-10',
            spr: '张三',
            spjg: '通过',
            beiz: '无'
          }
        ]
        this.tList2 = [
          {
            xh: '1',
            spsj: '2020-11-10',
            spr: '张三',
            spjg: '通过',
            beiz: '无'
          }
        ]
        this.tList3 = [
          {
            xh: '1',
            spsj: '2020-11-10',
            spr: '邮件',
            spjg: '通过',
            beiz: '无'
          }
        ]
      },
    
      handleSearch() {
        console.log('...')
      },
      handleChange(val) {
        console.log('获取折叠面板')
      },
      handleClick(ac) {
        console.log('获取tab页签')
      },
      handleShow(row) {
        this.softsFlag = true
        this.softObj = row
      },
      referenceData(id){//批量申请编号显示隐藏
      console.log(this.hiddenList[id].xh);
        if( id = this.hiddenList.index[id-1].xh){
          this.isShow = true
        }
      }
    }
  }
</script>
<style lang="scss" >
.el-dialog__wrapper .el-dialog .el-dialog__header{
  border-bottom:none;
}
  .search-btn{
    margin-left:125px;
  }
  .look{
    color:#409EFF;
    cursor:pointer;
  }
 .time-range{
   margin-left:52px;
   margin-right:52px;
   margin-top:35px;
   overflow:hidden;
 }
  .btn-disabled {
    margin-top: 20px;
  }
  .panel-style {
    height: calc(100vh - 220px);
  }
</style>
