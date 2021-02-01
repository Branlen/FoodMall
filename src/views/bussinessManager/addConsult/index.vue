<template>
  <div class="editor">
    <div class="submit">
      <el-button type="primary" @click="submit('formInfo')">提交</el-button>
    </div>
    <div class="form">
      <el-form
        @submit.native.prevent
        :model="formInfo"
        ref="formInfo"
        :rules="rules"
        label-width="100px"
      >
        <el-form-item
          label="标题："
          prop="title"
          :rules="[
            { required: true, message: '标题不能为空', trigger: 'blur' },
          ]"
        >
          <el-input v-model="formInfo.title" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item
          label="状态："
          prop="type"
          :rules="[{ required: true, message: '不能为空', trigger: 'blur' }]"
        >
          <el-radio v-model="formInfo.type" label="1">轮播图</el-radio>
          <el-radio v-model="formInfo.type" label="0">普通推文</el-radio>
        </el-form-item>
        <el-form-item
          label="显示照片："
          prop="pic"
          :rules="[
            {
              required: true,
              type: 'string',
              message: '文件不能为空',
              trigger: 'change',
            },
          ]"
          label-width="100px"
        >
          <el-upload
            class="upload-demo"
            action="/o2o/sys/file/uploadPic"
            :on-success="handleUpload"
            :limit="1"
            accept=".jpg, .png, .jpeg"
            list-type="picture"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
    </div>
    <mavon-editor
      v-model="formInfo.content"
      ref="md"
      @change="changeContent"
      @imgAdd="$imgAdd"
    ></mavon-editor>
  </div>
</template>

<script>
import { uploadPic } from "@/api/file";
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import { addPush, updatePush } from "@/api/shop";
//注意
const defaultInfo = { content: "", shopId: 1, title: "", pic: "", type: "1" };
export default {
  components: {
    mavonEditor,
    // or 'mavon-editor': mavonEditor
  },
  data() {
    return {
      baseUrl: "http://116.62.26.61:8003/o2o/",
      content: "",
      formInfo: Object.assign({}, defaultInfo),
      renderContent: "",
      isEdit: false,
      rules: {
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change",
          },
        ],
      },
    };
  },
  created() {
    console.log(this.$route.query);
    if (this.$route.query !== {} || this.$route.query.content !== "") {
      this.formInfo = this.$route.query;
      this.isEdit = true;
    }
  },
  methods: {
    submit(ref) {
      //判断信息是否为空
      this.$refs[ref].validate((valid) => {
        if (valid) {
          if (this.formInfo.content !== "") {
            console.log(this.isEdit);
            this.formInfo.content = this.$refs.md.markdownIt.render(
              this.formInfo.content
            );
            if (this.isEdit) {
              if (this.formInfo.pic.indexOf("http") !== -1) {
                this.formInfo.pic = this.formInfo.pic.slice(30);
              }
              updatePush(this.formInfo)
                .then((result) => {
                  this.$message({
                    type: "success",
                    message: "修改成功",
                  });
                  this.$router.push("/doaap/consult");
                })
                .catch((err) => {});
            } else {
              this.formInfo.shopId = this.$store.getters.shopId;
              addPush(this.formInfo)
                .then((result) => {
                  this.$message({
                    type: "success",
                    message: "新增成功",
                  });
                })
                .catch((err) => {});
            }
          } else {
            this.$message({
              type: "warning",
              message: "推文内容未填写",
            });
          }
        } else {
          this.$message({
            type: "warning",
            message: "信息未填完整",
          });
          return false;
        }
      });
      //
    },
    //获得Markdown解析后的结果
    changeContent(value, render) {
      this.renderContent = render;
    },
    //上传照片
    handleUpload(response, file, fileList) {
      //console.log(response);
      this.formInfo.pic = response.data;
    },
    //增加图片
    $imgAdd(pos, $file) {
      //console.log(pos, $file);
      // 第一步.将图片上传到服务器.
      var formdata = new FormData();
      formdata.append("file", $file);
      uploadPic(formdata).then((result) => {
        var url = "http://116.62.26.61:8003/o2o/" + result.data;
        // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
        // $vm.$img2Url 详情见本页末尾
        this.$refs.md.$img2Url(pos, url);
      });
    },
  },
};
</script>

<style lang="less" scoped>
.editor {
  width: 99%;
  height: 600px;
  padding: 10px;
  position: relative;
  .v-note-wrapper {
    height: 700px;

    margin: 0 auto;
  }
}
.submit {
  position: absolute;
  width: 100px;
  height: 40px;
  right: 20px;
  top: 10px;
  z-index: 1;
}
// .form{
//   width: 60%;
// }
</style>
