<template>
  <div>
    <div class="top-bar">
      <nav class="top-bar__menu contextual-menu">
        <ul>
          <li class="contextual-menu__item">
            <a class="contextual-menu__button" href="https://grantnav.threesixtygiving.org/" title="GrantNav">GrantNav</a>
          </li>
          <li class="contextual-menu__item">
            <a class="contextual-menu__button" href="https://insights.threesixtygiving.org/" title="Insights">Insights</a>
          </li>
          <li class="contextual-menu__item">
            <a class="contextual-menu__button" href="https://threesixtygiving.org/about/" title="About 360Giving">About 360Giving</a>
          </li>
          <li class="contextual-menu__item">
            <a class="contextual-menu__button" href="https://www.threesixtygiving.org/why-publish/" title="Why Publish">Why Publish?</a>
          </li>
          <li class="contextual-menu__item">
            <a class="contextual-menu__button" href="https://www.threesixtygiving.org/technical-users/" title="Technical Users">Technical Users</a>
          </li>
        </ul>
      </nav>
    </div>

    <div class="nav-bar nav-bar--minimal">
      <a class="nav-bar__home-button" href="/">
        <img src="@/assets/images/360-logos/360dataqualitydashboard-color.svg" alt="360DataQualityDashboard" style="width: unset; height:94px">
      </a>

      <nav class="nav-bar__nav-menu">
        <ul>
          <li class="nav-menu__item">
            Based on data published by UK grantmakers in the 360Giving Data Standard
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseNav",
}
</script>
