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
          <el-input v-model="listQuery.spr" placeholder="请输入审批人" clearable />
        </el-form-item>
                <el-form-item label="申请编号">
          <el-input v-model="listQuery.kh" placeholder="请输入申请编号" clearable />
        </el-form-item>
        <el-form-item class="el-form--button">
          <el-button type="primary" class="search-btn" @click="handleSearch" style="width:100px">查询</el-button>
          <el-button  @click="temp" style="width:100px">重置</el-button>
        </el-form-item>
      </el-form>
            <div class="add-btn">
        <el-button type="primary" icon="el-icon-plus" style="width:100px">新增</el-button>
        <el-button style="width:130px">EXCEL模板下载</el-button>
        <el-button style="width:130px">EXCEL模板导入</el-button>
        <el-button style="width:130px">导出PDF文件</el-button>
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
                :row-key="getRowKeys"
                :expand-row-keys="expands"
                @current-change="toggleRowExpansion"
      >
        <el-table-column  label="批量申请编号"  class="reference-number">             
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
        <el-table-column label="操作" width="150px">
          <template slot-scope="scope">
            <div class="look" @click="handleShow(scope.row)">编辑</div>
            <div class="look" >删除</div>
            <div class="look" @click="handleShow(scope.row)">查看</div>
            <!-- <el-button type="primary" plain title="详情" @click="handleShow(scope.row)">详情</el-button> -->
          </template>
        </el-table-column>
      </el-table>


      <!-- <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.6)"
        style="width: 100%"
        fit
        highlight-current-row
      >
        <el-table-column label="批量工单编号" prop="kh"></el-table-column>
        <el-table-column label="批量工单名称" prop="wybs"></el-table-column>
        <el-table-column label="工单笔数" prop="nfsqsj"></el-table-column>
        <el-table-column label="调减总额" prop="tjje"></el-table-column>
        <el-table-column label="工单时间" prop="sqsj"></el-table-column>
        <el-table-column label="操作" width="80px">
          <template slot-scope="scope">
            <el-button type="primary" plain title="详情" @click="handleShow(scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table> -->
      <pagination v-show="total > 0" :total="total" :page.sync="listQuery.pageNo" :limit.sync="listQuery.pageSize" @pagination="getList" />
      <el-dialog title="年费人工批量工单" :visible.sync="softsFlag" width="80%" :close-on-click-modal="false" top="10vh">
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item title="基本信息" name="1">
            <el-form ref="softForm" label-width="160px" :model="softObj" :inline="true">
              <el-form-item label="批量工单流水编号" prop="kh">
                <el-input v-model="softObj.kh" clearable :readonly="showFlag" />
              </el-form-item>
              <el-form-item label="批量工单状态" prop="wybs">
                <el-input v-model="softObj.wybs" :readonly="showFlag" clearable />
              </el-form-item>
              <el-form-item label="反馈状态" prop="nfsqsj">
                <el-input v-model="softObj.nfsqsj" :readonly="showFlag" clearable />
              </el-form-item>
              <el-form-item label="工单渠道" prop="tjzc">
                <el-input v-model="softObj.softwareNo" :readonly="showFlag" clearable />
              </el-form-item>
              <el-form-item label="批量工单名称">
                <el-input v-model="softObj.tjje" :readonly="showFlag" />
              </el-form-item>
              <el-form-item label="工单总笔数">
                <el-input v-model="softObj.gdqd" :readonly="showFlag" />
              </el-form-item>
              <el-form-item label="调减总额">
                <el-input v-model="softObj.sqsj" :readonly="showFlag" />
              </el-form-item>
              <el-form-item label="工单时间">
                <el-input v-model="softObj.sqr" :readonly="showFlag" />
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
          <el-collapse-item title="工单明细" name="2">
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
              <el-table-column label="卡号" prop="kh"></el-table-column>
              <el-table-column label="唯一标识" prop="wybs"></el-table-column>
              <el-table-column label="年费收取时间" prop="nfsqsj"></el-table-column>
              <el-table-column label="币种" prop="bz"></el-table-column>
              <el-table-column label="调整方向" prop="tzfx"></el-table-column>
              <el-table-column label="调减政策" prop="tjzc"></el-table-column>
              <el-table-column label="调减金额" prop="tjje"></el-table-column>
              <el-table-column label="工单时间" prop="gdsj"></el-table-column>
              <el-table-column label="申请部门" prop="sqbm"></el-table-column>
              <el-table-column label="申请科室" prop="sqks"></el-table-column>
              <el-table-column label="申请人" prop="sqr"></el-table-column>
              <el-table-column label="操作" width="80px">
                <template slot-scope="scope">
                  <el-button type="primary" plain @click="handleShow1(scope.row)">详情</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-collapse-item>
        </el-collapse>
        <div style="text-align: center" :class="{ 'btn-disabled': showFlag }">
          <el-button icon="el-icon-close" plain @click="softsFlag = false">关闭</el-button>
        </div>
      </el-dialog>
      <el-dialog title="工单详情" :visible.sync="softsFlag1" width="80%" :close-on-click-modal="false" top="10vh">
        <el-form ref="softForm1" label-width="160px" :model="softObj" :inline="true">
          <el-form-item label="序号" prop="kh">
            <el-input v-model="softObj1.kh" clearable :readonly="showFlag" />
          </el-form-item>
          <el-form-item label="年费卡号" prop="wybs">
            <el-input v-model="softObj1.wybs" :readonly="showFlag" clearable />
          </el-form-item>
          <el-form-item label="年费收取时间" prop="nfsqsj">
            <el-input v-model="softObj1.nfsqsj" :readonly="showFlag" clearable />
          </el-form-item>
          <el-form-item label="年费金额" prop="tjzc">
            <el-input v-model="softObj1.softwareNo" :readonly="showFlag" clearable />
          </el-form-item>
          <el-form-item label="币种">
            <el-input v-model="softObj1.tjje" :readonly="showFlag" />
          </el-form-item>
          <el-form-item label="调整方向">
            <el-input v-model="softObj1.gdqd" :readonly="showFlag" />
          </el-form-item>
          <el-form-item label="卡产品类型">
            <el-input v-model="softObj1.sqsj" :readonly="showFlag" />
          </el-form-item>
          <el-form-item label="年费唯一标识">
            <el-input v-model="softObj1.sqr" :readonly="showFlag" />
          </el-form-item>
          <el-form-item label="调整原因">
            <el-input v-model="softObj1.sqsj" :readonly="showFlag" />
          </el-form-item>
          <el-form-item label="补刷时间周期">
            <el-input v-model="softObj1.sqsj" :readonly="showFlag" />
          </el-form-item>
          <el-form-item label="补转时间周期">
            <el-input v-model="softObj1.sqsj" :readonly="showFlag" />
          </el-form-item>
          <el-form-item label="调减金额">
            <el-input v-model="softObj1.sqsj" :readonly="showFlag" />
          </el-form-item>
          <el-form-item label="申请部门">
            <el-input v-model="softObj1.sqsj" :readonly="showFlag" />
          </el-form-item>
          <el-form-item label="申请科室">
            <el-input v-model="softObj1.sqsj" :readonly="showFlag" />
          </el-form-item>
          <el-form-item label="录入人">
            <el-input v-model="softObj1.sqsj" :readonly="showFlag" />
          </el-form-item>
          <el-form-item label="审批人">
            <el-input v-model="softObj1.sqsj" :readonly="showFlag" />
          </el-form-item>
          <el-form-item label="工单状态">
            <el-input v-model="softObj1.sqsj" :readonly="showFlag" />
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="softObj1.sqsj" type="textarea" :readonly="showFlag" />
          </el-form-item>
        </el-form>
        <div style="text-align: center" :class="{ 'btn-disabled': showFlag }">
          <el-button icon="el-icon-close" plain @click="softsFlag1 = false">关闭</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
  // import { checkPermission } from '@/utils/permission'
  export default {
    name: 'AnnualFeeManualBatchWorkOrder',
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
        softObj1: {
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
        softsFlag1: false,
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
          id:1,
          num:'CN001',
          name:'001',
          count:59,
          money:20000,
          time:'2020-10-01',
        },{
          id:2,
          num:'CN002',
          name:'002',
          count:50,
          money:30000,
          time:'2020-11-01',      
        }
          // {
          //   kh: 'CN020207',
          //   wybs: '00003',
          //   bz: '人民币',
          //   tzfx: '方向一',
          //   sqbm: '部门一',
          //   sqks: '科室一',
          //   nfsqsj: '2020-11-29',
          //   tjzc: '抱怨销卡',
          //   tjje: '1011',
          //   gdqd: '客服',
          //   sqsj: '2020-09-29',
          //   sqr: '张三',
          //   fj: '附件文件.doc'
          // }
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
            kh: '248934972932',
            wybs: 'W0899',
            nfsqsj: '2020-10-09',
            bz: '人民币',
            tzfx: '调整方向',
            tjzc: '调减政策',
            gdsj: '2020-09-09',
            dqbm: '部门一',
            sqks: '科室一',
            sqr: '申请人'
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
      },
      handleShow1(row) {
        this.softsFlag1 = true
        this.softObj1 = row
      }
    }
  }
</script>
<style lang="scss" scoped>
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
    margin-right:8px;
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
