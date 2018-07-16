<template>
    <div class="over-feedback">
        <div class="feedback">
            <div class="animated flip content">
                <i data-feather="message-square"></i>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  created() {
    if (process.browser) {
      $(function () {
        feather.replace()
      })
    }
  }
}
</script>
<style>
.over-feedback {
    position: absolute;
    height: 100%;
    width: 100%;
}
.feedback {
    position: relative;

    width: 150px;
    height: 150px;

    margin-top: 10%;
}
.feedback .content {
    background: #fff;
    border-radius: 50%;
    box-shadow: 0 0 30px rgba(115,128,157,.5)!important;

    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;
}
.feedback .content .feather {
    stroke: #777;
    width: 30px;
    height: 30px;
}
</style>
