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
        <el-form-item label="调整政策">
          <el-select v-model="listQuery.tzzc" placeholder="抱怨销卡" filterable clearable>
            <el-option label="抱怨销卡" value="0" />
            <el-option label="销卡退费" value="1" />
            <el-option label="补刷完成" value="2" />
            <el-option label="补转分期" value="3" />
            <el-option label="权限申请" value="4" />
            <el-option label="其它" value="5" />
          </el-select>
        </el-form-item>
        <el-form-item label="录入形式">
          <el-select v-model="listQuery.lrxs" placeholder="单笔工单" filterable clearable>
            <el-option label="单笔工单" value="0" />
            <el-option label="多笔工单" value="1" />
            <el-option label="全部" value="2" />
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="工单渠道">
          <el-select v-model="listQuery.gdqd" placeholder="请选择工单渠道" filterable clearable>
            <el-option label="客服" value="0" />
            <el-option label="电销" value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="调整方向">
          <el-select v-model="listQuery.tzfx" placeholder="请选择工单渠道" filterable clearable>
            <el-option label="方向一" value="0" />
            <el-option label="方向二" value="1" />
          </el-select>
        </el-form-item> -->
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
        <el-form-item label="年费唯一标识">
          <el-input v-model="listQuery.kh" placeholder="请输入卡号" clearable />
        </el-form-item>
        <el-form-item label="年费卡号">
          <el-input v-model="listQuery.kh" placeholder="请输入卡号" clearable />
        </el-form-item>
        <el-form-item label="审批人">
          <el-input v-model="listQuery.spr" placeholder="请输入审批人" clearable />
        </el-form-item>
        <el-form-item class="el-form--button">
          <el-button type="primary" class="search-btn" @click="handleSearch" style="width:100px">查询</el-button>
          <el-button  @click="temp" style="width:100px">重置</el-button>
        </el-form-item>
      </el-form>
      <div class="add-btn">
        <el-button type="primary" icon="el-icon-plus" style="width:100px">新增</el-button>
        <el-button style="width:120px">导出PDF文件</el-button>
      </div>
      <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.6)"
        style="width: 100%"
        fit
        highlight-current-row
      >
        <el-table-column label="卡号" prop="kh" width="90"></el-table-column>
        <el-table-column label="唯一标识" prop="wybs" width="80"></el-table-column>
        <el-table-column label="年费收取时间" prop="nfsqsj"  width="105"></el-table-column>
        <el-table-column label="币种" prop="bz" width="72"></el-table-column>
        <el-table-column label="调整方向" prop="tzfx" width="82"></el-table-column>
        <el-table-column label="调减政策" prop="tjzc" width="82"></el-table-column>
        <el-table-column label="调减金额" prop="tjje" width="82"></el-table-column>
        <el-table-column label="申请渠道" prop="gdqd" width="82"></el-table-column>
        <el-table-column label="申请时间" prop="sqsj" width="92"></el-table-column>
        <el-table-column label="申请部门/申请科室/申请人" prop="sqbm" width="140"></el-table-column>
        <!-- <el-table-column label="申请科室" prop="sqks"></el-table-column>
        <el-table-column label="申请人" prop="sqr"></el-table-column> -->
        <el-table-column label="操作" >
          <template slot-scope="scope">
            <!-- <el-button type="primary" plain title="详情" @click="handleShow(scope.row)">详情</el-button> -->
            <div class="look" @click="handleShow(scope.row)">编辑</div>
            <div class="look" >删除</div>
            <div class="look" @click="handleShow(scope.row)">查看</div>
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
        </el-tab-pane>
        <el-tab-pane label="附件" name="second"></el-tab-pane>
        </el-tabs>
        <div style="text-align: center" :class="{ 'btn-disabled': showFlag }">
          <el-button  plain @click="softsFlag = false">返回</el-button>
        </div>
      </el-dialog>


      <!-- <el-dialog title="年费人工单笔工单" :visible.sync="softsFlag" width="50%" :close-on-click-modal="false" top="10vh">
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item title="基本信息" name="1">
            <el-form ref="softForm" label-width="120px" :model="softObj" :inline="true">
              <el-form-item label="工单流水编号" prop="kh">
                <el-input v-model="softObj.kh" clearable :readonly="showFlag" />
              </el-form-item>
              <el-form-item label="工单状态" prop="wybs">
                <el-input v-model="softObj.wybs" :readonly="showFlag" clearable />
              </el-form-item>
              <el-form-item label="反馈状态" prop="nfsqsj">
                <el-input v-model="softObj.nfsqsj" :readonly="showFlag" clearable />
              </el-form-item>
              <el-form-item label="工单渠道" prop="tjzc">
                <el-input v-model="softObj.softwareNo" :readonly="showFlag" clearable />
              </el-form-item>
              <el-form-item label="年费卡号">
                <el-input v-model="softObj.tjje" :readonly="showFlag" />
              </el-form-item>
              <el-form-item label="年费收取时间">
                <el-input v-model="softObj.gdqd" :readonly="showFlag" />
              </el-form-item>
              <el-form-item label="年费金额">
                <el-input v-model="softObj.sqsj" :readonly="showFlag" />
              </el-form-item>
              <el-form-item label="币种">
                <el-input v-model="softObj.sqr" :readonly="showFlag" />
              </el-form-item>
              <el-form-item label="调整方向">
                <el-input v-model="softObj.sqr" :readonly="showFlag" />
              </el-form-item>
              <el-form-item label="卡产品类型">
                <el-input v-model="softObj.sqr" :readonly="showFlag" />
              </el-form-item>
              <el-form-item label="年费唯一标识">
                <el-input v-model="softObj.sqr" :readonly="showFlag" />
              </el-form-item>
              <el-form-item label="调整原因">
                <el-input v-model="softObj.sqr" :readonly="showFlag" />
              </el-form-item>
              <el-form-item label="是否销卡">
                <el-input v-model="softObj.sqr" :readonly="showFlag" />
              </el-form-item>
              <el-form-item label="补刷时间周期">
                <el-input v-model="softObj.sqr" :readonly="showFlag" />
              </el-form-item>
              <el-form-item label="补转时间周期">
                <el-input v-model="softObj.sqr" :readonly="showFlag" />
              </el-form-item>
              <el-form-item label="调减金额">
                <el-input v-model="softObj.sqr" :readonly="showFlag" />
              </el-form-item>
              <el-form-item label="申请部门">
                <el-input v-model="softObj.sqr" :readonly="showFlag" />
              </el-form-item>
              <el-form-item label="申请科室">
                <el-input v-model="softObj.sqr" :readonly="showFlag" />
              </el-form-item>
              <el-form-item label="录入人">
                <el-input v-model="softObj.sqr" :readonly="showFlag" />
              </el-form-item>
              <el-form-item label="审批人">
                <el-input v-model="softObj.sqr" :readonly="showFlag" />
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="softObj.sqr" :readonly="showFlag" type="textarea" />
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <el-collapse-item title="附件信息" name="3">
            <el-table
              v-loading="listLoading"
              :data="tList4"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.6)"
              style="width: 100%"
              fit
              highlight-current-row
            >
              <el-table-column label="序号" prop="xh"></el-table-column>
              <el-table-column label="文件名称" prop="wjmc"></el-table-column>
              <el-table-column label="操作" width="80px">
                <template slot-scope="scope">
                  <el-button type="primary" plain @click="handleShow(scope.row)">下载</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-collapse-item>
          <el-collapse-item title="列表信息" name="2">
            <el-tabs v-model="activeName" @tab-click="handleClick">
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
        </el-collapse>
        <div style="text-align: center" :class="{ 'btn-disabled': showFlag }">
          <el-button icon="el-icon-close" plain @click="softsFlag = false">关闭</el-button>
        </div>
      </el-dialog> -->
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
        listQuery: {
          pageNo: 1,
          pageSize: 10,
          sqr: '',
          kh: '',
          gdqd: '',
          jtzc: '',
          lrxs:'',
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
        tList3: [],
        tList4: []
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
            kh: 'CN020207',
            wybs: '00003',
            bz: '人民币',
            tzfx: '方向一',
            sqbm: '部门一/科室一/张三',
            sqks: '科室一',
            nfsqsj: '2020-11-29',
            tjzc: '抱怨销卡',
            tjje: '1011',
            gdqd: '客服',
            sqsj: '2020-09-29',
            sqr: '张三',
            fj: '附件文件.doc'
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
        this.tList4 = [
          {
            xh: '1',
            wjmc: '附件名称一'
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
      }
    }
  }
</script>
<style lang="scss" >
.el-dialog__wrapper .el-dialog .el-dialog__header{
  border-bottom:none;
}
.add-btn{
  margin-top:20px;
  margin-bottom: 20px;
}
  .search-btn{
    margin-left:125px;
  }
  .look{
    color:#409EFF;
    cursor:pointer;
    float:left;
    margin-right:5px;
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
