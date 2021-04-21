<template>
<div id="app">
  <div class="content">
    <router-view />
    <div id='footer'>
    <div class='footer-item'>
    <a href="https://github.com/BYU-CS-260-Winter-2021/lab-3b-grocery-store-choir1997/tree/main">GitHub Repository</a>
    </div>
  </div>
  </div>
</div>
</template>

<style>
/* green yellow red orange */
/* 96ceb4 ffeead d9534f ffad60 */
body {
  margin: 0px;
  background: #F7F5F7;
  background-color: #f0ffff;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}


.brand {
  display: flex;
  background: #96ceb4;
  padding: 5px 10px;
}

.brand h1 {
  display: inline-block;
  background: #DB9964;
  padding: 10px;
  border-radius: 30px;
  font-size: 14px;
}

.brand h2 {
  font-size: 12px;
  padding: 10px;
  margin-top: 12px;
}

.main {
  padding: 20px 100px;
}

.pure-button {
  font-size: 10px;
}

h1 {
  font-size: 16px;
}

h2 {
  font-size: 12px;
}

.space-right {
  margin-right: 10px;
}


#footer {
  display: flex;
  position: relative;
  min-height: 70vh;
  justify-content: flex-start;
  padding: 0px !important;
  margin: -50px -50px !important;
}

.footer-item {
  position: absolute;
  bottom: 0;
  background-color: #8FBC8F;
  color: #FFFFF;
  background-size: cover;
  height: 20px;
  width: 3000px;
  padding: 20px;
  margin-left: 50px;
  flex: 1;
}

.footer-two {
  text-align: center;
}
</style>
