<template>
<div id="app">
  <div class="content">
    <router-view />
    <div id='footer'>
    <div class='footer-item'>
    <a href="https://github.com/choir1997/KetoSuccess">GitHub Repository</a>
    </div>
  </div>
  </div>
</div>
</template>

<style>
@import 'https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300';
/* green yellow red orange */
/* 96ceb4 ffeead d9534f ffad60 */
body {
  margin: 0px;
  background: #7B6D8D;
  width: auto;
  height: auto;
}

#app {
  color: #ffffff;
  font-family: 'Open Sans Condensed', sans-serif;
  padding: 10px;
}

.main {
  padding: 20px 60px;
}

input {
  color: #000000;
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
  background-color: #7B6D8D;
  color: #FFFFF;
  background-size: cover;
  height: 20px;
  width: 1700px;
  padding: 10px;
  margin-left: 50px;
  flex: 1;
}

.footer-two {
  text-align: center;
}

@media only screen and (min-width: 300px) and (max-width: 960px) {
  body {
    width: auto;
  }

  #footer {
    justify-content: center;
  }
  .footer-item {
    width: auto;
    text-align: center;
    margin-left: 0px;
  }

}
</style>
