<script setup lang="ts">
useHead({
  script: [
    {
      children:
        "!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src='https://weatherwidget.io/js/widget.min.js';fjs.parentNode.insertBefore(js,fjs);}}(document,'script','weatherwidget-io-js');",
    },
  ],
});
</script>
<template>
  <div>
    <a
      class="weatherwidget-io rounded-md shadow"
      href="https://forecast7.com/es/n33d40n71d13/curacavi/"
      data-label_1="CURACAVÍ"
      data-label_2="CLIMA"
      data-days="5"
      data-theme="sky"
      data-shadow="rgba(0, 0, 0, 0.5)"
      >CURACAVÍ CLIMA</a
    >
  </div>
</template>
